'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui';
import { useAuth } from '@/lib/context/AuthContext';
import { submitWholesaleApplication } from '@/lib/services/wholesaleService';

interface WholesaleApplyPageProps {
  lang: Locale;
  dictionary: {
    wholesale: any;
    common: any;
  };
}

export function WholesaleApplyForm({ lang, dictionary }: WholesaleApplyPageProps) {
  const { wholesale, common } = dictionary;
  const { user, token } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: '',
    taxId: '',
    businessType: '',
    businessAddress: '',
    businessCity: '',
    businessProvince: '',
    businessPostalCode: '',
    businessPhone: '',
    estimatedMonthlyVolume: '',
    references: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.companyName || !formData.taxId || !formData.businessType) {
      setError('Please fill in all required fields');
      return;
    }

    // Tax ID validation (13 digits for Thailand)
    const taxIdClean = formData.taxId.replace(/\D/g, '');
    if (taxIdClean.length !== 13) {
      setError('Tax ID must be 13 digits');
      return;
    }

    setIsLoading(true);

    try {
      const result = await submitWholesaleApplication(
        {
          companyName: formData.companyName,
          taxId: formData.taxId,
          businessType: formData.businessType,
          businessAddress: formData.businessAddress,
          businessCity: formData.businessCity,
          businessProvince: formData.businessProvince,
          businessPostalCode: formData.businessPostalCode,
          businessPhone: formData.businessPhone,
          estimatedMonthlyVolume: formData.estimatedMonthlyVolume,
          references: formData.references,
        },
        token || undefined
      );

      if (result.success) {
        // Save application data to localStorage for status page
        const applicationData = {
          status: 'pending' as const,
          applicationId: result.applicationId || `WSL-${Date.now()}`,
          submittedDate: new Date().toISOString(),
          businessName: formData.companyName,
        };
        localStorage.setItem('wholesale_application', JSON.stringify(applicationData));

        setSuccess(true);
        // Redirect to status page after 2 seconds
        setTimeout(() => {
          router.push(`/${lang}/wholesale/status`);
        }, 2000);
      } else {
        setError(result.error || wholesale.error_message);
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: wholesale.page_title, href: `/${lang}/wholesale` },
    { name: wholesale.apply_now, href: `/${lang}/wholesale/apply` }
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
                {wholesale.success_title}
              </h2>
              <p className="text-gray-600 mb-6">
                {wholesale.success_message}
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {wholesale.form_title}
            </h1>
            <p className="text-gray-600">
              {wholesale.form_subtitle}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
            {/* Business Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
                {wholesale.business_info}
              </h2>

              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    {wholesale.company_name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                    placeholder={wholesale.company_name_placeholder}
                  />
                </div>

                {/* Tax ID */}
                <div>
                  <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                    {wholesale.tax_id} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="taxId"
                    type="text"
                    required
                    maxLength={13}
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                    placeholder={wholesale.tax_id_placeholder}
                  />
                  <p className="mt-1 text-xs text-gray-500">13 digits</p>
                </div>

                {/* Business Type */}
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                    {wholesale.business_type} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="businessType"
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                  >
                    <option value="">Select business type</option>
                    <option value="retailer">{wholesale.business_type_retailer}</option>
                    <option value="contractor">{wholesale.business_type_contractor}</option>
                    <option value="manufacturer">{wholesale.business_type_manufacturer}</option>
                    <option value="distributor">{wholesale.business_type_distributor}</option>
                    <option value="other">{wholesale.business_type_other}</option>
                  </select>
                </div>

                {/* Business Address */}
                <div>
                  <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    {wholesale.business_address} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="businessAddress"
                    type="text"
                    required
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                    placeholder={wholesale.business_address_placeholder}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* City */}
                  <div>
                    <label htmlFor="businessCity" className="block text-sm font-medium text-gray-700 mb-1">
                      {wholesale.business_city} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="businessCity"
                      type="text"
                      required
                      value={formData.businessCity}
                      onChange={(e) => setFormData({ ...formData, businessCity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                      placeholder={wholesale.business_city_placeholder}
                    />
                  </div>

                  {/* Province */}
                  <div>
                    <label htmlFor="businessProvince" className="block text-sm font-medium text-gray-700 mb-1">
                      {wholesale.business_province} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="businessProvince"
                      type="text"
                      required
                      value={formData.businessProvince}
                      onChange={(e) => setFormData({ ...formData, businessProvince: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                      placeholder={wholesale.business_province_placeholder}
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label htmlFor="businessPostalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      {wholesale.business_postal_code} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="businessPostalCode"
                      type="text"
                      required
                      maxLength={5}
                      value={formData.businessPostalCode}
                      onChange={(e) => setFormData({ ...formData, businessPostalCode: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                      placeholder={wholesale.business_postal_code_placeholder}
                    />
                  </div>
                </div>

                {/* Business Phone */}
                <div>
                  <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    {wholesale.business_phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="businessPhone"
                    type="tel"
                    required
                    value={formData.businessPhone}
                    onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                    placeholder={wholesale.business_phone_placeholder}
                  />
                </div>

                {/* Estimated Monthly Volume */}
                <div>
                  <label htmlFor="estimatedVolume" className="block text-sm font-medium text-gray-700 mb-1">
                    {wholesale.estimated_volume} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="estimatedVolume"
                    required
                    value={formData.estimatedMonthlyVolume}
                    onChange={(e) => setFormData({ ...formData, estimatedMonthlyVolume: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                  >
                    <option value="">{wholesale.estimated_volume_placeholder}</option>
                    <option value="10k">{wholesale.estimated_volume_10k}</option>
                    <option value="50k">{wholesale.estimated_volume_50k}</option>
                    <option value="100k">{wholesale.estimated_volume_100k}</option>
                    <option value="500k">{wholesale.estimated_volume_500k}</option>
                    <option value="1m">{wholesale.estimated_volume_1m}</option>
                  </select>
                </div>

                {/* References (Optional) */}
                <div>
                  <label htmlFor="references" className="block text-sm font-medium text-gray-700 mb-1">
                    {wholesale.references}
                  </label>
                  <textarea
                    id="references"
                    rows={3}
                    value={formData.references}
                    onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                    placeholder={wholesale.references_placeholder}
                  />
                  <p className="mt-1 text-xs text-gray-500">{wholesale.references_optional}</p>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                {wholesale.terms_agree}{' '}
                <Link href={`/${lang}/terms`} className="text-blue-600 hover:text-blue-500">
                  {wholesale.terms_link}
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? wholesale.submitting : wholesale.submit_application}
              </Button>
              <Link href={`/${lang}/wholesale`} className="flex-1">
                <Button
                  variant="secondary"
                  size="lg"
                  type="button"
                  disabled={isLoading}
                  className="w-full"
                >
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
