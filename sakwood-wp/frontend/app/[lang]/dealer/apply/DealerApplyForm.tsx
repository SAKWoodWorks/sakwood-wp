'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui';
import { useAuth } from '@/lib/context/AuthContext';
import { getDealerTiers, type DealerTierInfo } from '@/lib/services/dealerService';
import { getThaiProvinces, submitDealerApplication, validateDealerApplication } from '@/lib/services/dealerApplicationService';
import type { Dictionary } from '@/lib/types/dictionary';

interface DealerApplyPageProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function DealerApplyForm({ lang, dictionary }: DealerApplyPageProps) {
  const { user, token, isWholesale, isDealer, applyForDealer } = useAuth();
  const router = useRouter();
  const [tiers, setTiers] = useState<DealerTierInfo[]>([]);
  const [provinces] = useState<string[]>(getThaiProvinces());

  const [formData, setFormData] = useState({
    requestedTier: '',
    storageFacility: '',
    deliveryVehicles: '',
    salesCapacity: '',
    dealerExperience: '',
    requestedTerritories: [] as string[],
    tradeReferences: [] as Array<{ company: string; contact: string; relationship: string }>,
    businessReferences: [] as Array<{ company: string; contact: string; accountValue: string }>,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for SSR-safe component mounting
    setMounted(true);
    async function loadData() {
      const tiersResult = await getDealerTiers();
      if (tiersResult.success && tiersResult.data) {
        setTiers(tiersResult.data);
      }
    }
    loadData();
  }, [lang]);

  // Redirect if already a dealer
  useEffect(() => {
    if (mounted && isDealer) {
      router.push(`/${lang}/dealer/status`);
    }
  }, [mounted, isDealer, lang, router]);

  // Handle redirect after successful submission
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push(`/${lang}/dealer/status`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, lang, router]);

  const { dealer, common } = dictionary;

  // Show access requirements if not wholesale
  if (!user) {
    return (
      <>
        <Breadcrumbs
          items={[
            { name: common.home, href: `/${lang}` },
            { name: dealer.page_title, href: `/${lang}/dealer/apply` },
          ]}
          lang={lang}
        />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-6">
                <svg className="mx-auto h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                  Authentication Required
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">🔒 Dealer Application Requirements</h3>
                  <p className="text-blue-800 text-sm mb-3">
                    To apply for dealer status, you must first be an <strong>active wholesale customer</strong>.
                  </p>
                  <div className="bg-white rounded p-3 text-sm text-blue-900">
                    <p className="font-medium mb-2">Required Steps:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Register an account</li>
                      <li>Apply for wholesale status</li>
                      <li>Wait for admin approval</li>
                      <li>Then apply for dealer status</li>
                    </ol>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link href={`/${lang}/register`} className="flex-1">
                    <Button variant="primary" size="lg" className="w-full">
                      Register Account
                    </Button>
                  </Link>
                  <Link href={`/${lang}/login`} className="flex-1">
                    <Button variant="secondary" size="lg" className="w-full">
                      Login
                    </Button>
                  </Link>
                </div>

                <Link href={`/${lang}/account`} className="block text-center text-blue-600 hover:text-blue-800">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show access requirements if not wholesale
  if (!isWholesale) {
    return (
      <>
        <Breadcrumbs
          items={[
            { name: common.home, href: `/${lang}` },
            { name: dealer.page_title, href: `/${lang}/dealer/apply` },
          ]}
          lang={lang}
        />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-6">
                <svg className="mx-auto h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                  Wholesale Status Required
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">📋 Dealer Application Requirements</h3>
                  <p className="text-yellow-800 text-sm mb-3">
                    Dear <strong>{user.displayName || user.firstName}</strong>, you must first be an <strong>active wholesale customer</strong> before applying for dealer status.
                  </p>
                  <div className="bg-white rounded p-3 text-sm text-yellow-900">
                    <p className="font-medium mb-2">Your Path to Dealer Status:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>✅ Register account <strong>(Complete)</strong></li>
                      <li className="text-orange-600 font-medium">⏳ Apply for wholesale status</li>
                      <li>⏳ Wait for wholesale approval</li>
                      <li>⏳ Apply for dealer status</li>
                    </ol>
                  </div>
                </div>

                <Link href={`/${lang}/account`} className="block">
                  <Button variant="primary" size="lg" className="w-full">
                    Apply for Wholesale Status
                  </Button>
                </Link>

                <Link href={`/${lang}`} className="block text-center text-blue-600 hover:text-blue-800">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.requestedTier) {
      setError(dealer.select_tier);
      return;
    }

    if (formData.requestedTerritories.length === 0) {
      setError('Please select at least one territory');
      return;
    }

    const validation = validateDealerApplication({
      requestedTier: parseInt(formData.requestedTier),
      storageFacility: formData.storageFacility,
      deliveryVehicles: formData.deliveryVehicles,
      salesCapacity: formData.salesCapacity,
      dealerExperience: formData.dealerExperience,
      requestedTerritories: formData.requestedTerritories,
      tradeReferences: formData.tradeReferences,
      businessReferences: formData.businessReferences,
    });

    if (!validation.valid) {
      setError(validation.errors.join(', '));
      return;
    }

    setIsLoading(true);

    try {
      const result = await applyForDealer({
        requestedTier: parseInt(formData.requestedTier),
        storageFacility: formData.storageFacility,
        deliveryVehicles: formData.deliveryVehicles,
        salesCapacity: formData.salesCapacity,
        dealerExperience: formData.dealerExperience,
        requestedTerritories: formData.requestedTerritories,
        tradeReferences: formData.tradeReferences,
        businessReferences: formData.businessReferences,
      });

      if (result.success) {
        // Save application data to localStorage for status page
        const applicationData = {
          status: 'pending' as const,
          applicationId: result.applicationId || `DLR-${Date.now()}`,
          submittedDate: new Date().toISOString(),
          businessName: user.businessName || user.displayName,
        };

        try {
          localStorage.setItem('dealer_application', JSON.stringify(applicationData));
        } catch (error) {
          console.error('Failed to save application data:', error);
          // Continue anyway - this isn't critical
        }

        setSuccess(true);
        // Redirect to status page after 2 seconds
      } else {
        setError(result.error || dealer.error_application_pending);
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const addTradeReference = () => {
    setFormData({
      ...formData,
      tradeReferences: [...formData.tradeReferences, { company: '', contact: '', relationship: '' }],
    });
  };

  const removeTradeReference = (index: number) => {
    setFormData({
      ...formData,
      tradeReferences: formData.tradeReferences.filter((_, i) => i !== index),
    });
  };

  const updateTradeReference = (index: number, field: string, value: string) => {
    const updated = [...formData.tradeReferences];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, tradeReferences: updated });
  };

  const addBusinessReference = () => {
    setFormData({
      ...formData,
      businessReferences: [...formData.businessReferences, { company: '', contact: '', accountValue: '' }],
    });
  };

  const removeBusinessReference = (index: number) => {
    setFormData({
      ...formData,
      businessReferences: formData.businessReferences.filter((_, i) => i !== index),
    });
  };

  const updateBusinessReference = (index: number, field: string, value: string) => {
    const updated = [...formData.businessReferences];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, businessReferences: updated });
  };
  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: dealer.page_title, href: `/${lang}/dealer/apply` }
  ];

  if (success) {
    return (
      <>
        <Breadcrumbs items={breadcrumbItems} lang={lang} />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {dealer.success_title}
              </h2>
              <p className="text-gray-600 mb-6">
                {dealer.success_message}
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to status page...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang} />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {dealer.application_title}
            </h1>
            <p className="text-gray-600">
              {dealer.application_subtitle}
            </p>
          </div>

          {error && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-8">
            {/* Tier Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
                {dealer.tier_selection}
              </h2>

              <div className="space-y-4">
                {tiers.map((tier) => (
                  <label
                    key={tier.id}
                    className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.requestedTier === tier.id.toString()
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start">
                      <input
                        type="radio"
                        name="tier"
                        value={tier.id}
                        checked={formData.requestedTier === tier.id.toString()}
                        onChange={(e) => setFormData({ ...formData, requestedTier: e.target.value })}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">
                          {tier.tier_name === 'silver' && dealer.tier_silver}
                          {tier.tier_name === 'gold' && dealer.tier_gold}
                          {tier.tier_name === 'platinum' && dealer.tier_platinum}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {tier.tier_name === 'silver' && dealer.tier_silver_desc}
                          {tier.tier_name === 'gold' && dealer.tier_gold_desc}
                          {tier.tier_name === 'platinum' && dealer.tier_platinum_desc}
                        </div>
                        <div className="text-xs text-gray-500">
                          {dealer.requirements_list}:
                        </div>
                        <ul className="text-xs text-gray-600 mt-1 space-y-1">
                          {tier.requirements && tier.requirements.length > 0 ? (
                            tier.requirements.map((req: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>{req}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-red-600">Requirements unavailable</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Dealer Requirements */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
                {dealer.dealer_requirements}
              </h2>

              <div className="space-y-4">
                {/* Storage Facility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dealer.storage_facility} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.storageFacility}
                    onChange={(e) => setFormData({ ...formData, storageFacility: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                    placeholder={dealer.storage_facility_placeholder}
                  />
                </div>

                {/* Delivery Vehicles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dealer.delivery_vehicles} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.deliveryVehicles}
                    onChange={(e) => setFormData({ ...formData, deliveryVehicles: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                    placeholder={dealer.delivery_vehicles_placeholder}
                  />
                </div>

                {/* Sales Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dealer.sales_capacity} *
                  </label>
                  <select
                    required
                    value={formData.salesCapacity}
                    onChange={(e) => setFormData({ ...formData, salesCapacity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                  >
                    <option value="">{dealer.sales_capacity_placeholder}</option>
                    <option value="10k">{dealer.capacity_10k}</option>
                    <option value="50k">{dealer.capacity_50k}</option>
                    <option value="100k">{dealer.capacity_100k}</option>
                    <option value="500k">{dealer.capacity_500k}</option>
                    <option value="1m">{dealer.capacity_1m}</option>
                  </select>
                </div>

                {/* Dealer Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dealer.dealer_experience} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.dealerExperience}
                    onChange={(e) => setFormData({ ...formData, dealerExperience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                    placeholder={dealer.dealer_experience_placeholder}
                  />
                </div>
              </div>
            </div>

            {/* Territory Request */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
                {dealer.territory_request}
              </h2>

              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-2">
                  {dealer.select_provinces}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto border p-4 rounded">
                  {provinces.map((province) => (
                    <label key={province} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.requestedTerritories.includes(province)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              requestedTerritories: [...formData.requestedTerritories, province],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              requestedTerritories: formData.requestedTerritories.filter((p) => p !== province),
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-900">{province}</span>
                    </label>
                  ))}
                </div>

                <p className="text-xs text-gray-500">
                  Selected: {formData.requestedTerritories.length} provinces
                </p>
              </div>
            </div>

            {/* References - Optional */}
            {formData.requestedTier && parseInt(formData.requestedTier) >= 2 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
                  {dealer.references}
                </h2>

                {/* Trade References */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {dealer.trade_references}
                    </label>
                    <button
                      type="button"
                      onClick={addTradeReference}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {dealer.add_reference}
                    </button>
                  </div>

                  {formData.tradeReferences.map((ref, index) => (
                    <div key={index} className="border p-4 rounded mb-2 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-700">
                          {dealer.references} {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeTradeReference(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          {dealer.remove_reference}
                        </button>
                      </div>

                      <input
                        type="text"
                        value={ref.company}
                        onChange={(e) => updateTradeReference(index, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                        placeholder={dealer.company}
                      />
                      <input
                        type="text"
                        value={ref.contact}
                        onChange={(e) => updateTradeReference(index, 'contact', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                        placeholder={dealer.contact}
                      />
                      <input
                        type="text"
                        value={ref.relationship}
                        onChange={(e) => updateTradeReference(index, 'relationship', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                        placeholder={dealer.relationship}
                      />
                    </div>
                  ))}
                </div>

                {/* Business References - Platinum Only */}
                {formData.requestedTier === '3' && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {dealer.business_references}
                      </label>
                      <button
                        type="button"
                        onClick={addBusinessReference}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {dealer.add_reference}
                      </button>
                    </div>

                    {formData.businessReferences.map((ref, index) => (
                      <div key={index} className="border p-4 rounded mb-2 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-gray-700">
                            {dealer.references} {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeBusinessReference(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            {dealer.remove_reference}
                          </button>
                        </div>

                        <input
                          type="text"
                          value={ref.company}
                          onChange={(e) => updateBusinessReference(index, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                          placeholder={dealer.company}
                        />
                        <input
                          type="text"
                          value={ref.contact}
                          onChange={(e) => updateBusinessReference(index, 'contact', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                          placeholder={dealer.contact}
                        />
                        <input
                          type="text"
                          value={ref.accountValue}
                          onChange={(e) => updateBusinessReference(index, 'accountValue', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                          placeholder={dealer.account_value}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? dealer.submitting : dealer.submit_application}
              </Button>
              <Link href={`/${lang}/account`} className="flex-1">
                <Button variant="secondary" size="lg" type="button" disabled={isLoading} className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
