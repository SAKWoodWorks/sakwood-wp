'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui';
import { useAuth } from '@/lib/context/AuthContext';
import { getDealerApplicationStatus } from '@/lib/services/dealerService';
import type { Dictionary } from '@/lib/types/dictionary';

interface DealerStatusPageProps {
  lang: Locale;
  dictionary: Dictionary;
}

interface ApplicationData {
  status: string;
  applicationId: string;
  submittedDate: string;
  businessName: string;
  reviewedDate?: string;
  assignedTier?: string;
  assignedTerritories?: string[];
  adminNotes?: string;
}

export function DealerStatusPage({ lang, dictionary }: DealerStatusPageProps) {
  const { user, isDealer } = useAuth();
  const router = useRouter();
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [apiData, setApiData] = useState<ApplicationData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for SSR-safe component mounting
    setMounted(true);
    let isMounted = true;

    async function loadData() {
      if (isMounted) {
        // Load application data from localStorage
        const stored = localStorage.getItem('dealer_application');
        if (stored) {
          try {
            const data = JSON.parse(stored);
            // Validate data structure
            if (data && data.applicationId && data.status) {
              setApplicationData(data);

              // Fetch fresh data from API
              const result = await getDealerApplicationStatus(data.applicationId);
              if (result.success && result.data) {
                // Map API response to ApplicationData format
                setApiData({
                  applicationId: result.data.application_id,
                  submittedDate: result.data.submitted_date,
                  businessName: result.data.business_registration || 'N/A',
                  status: result.data.status,
                  reviewedDate: result.data.reviewed_date || undefined,
                  assignedTier: result.data.requested_tier_id ? result.data.requested_tier_id.toString() : undefined,
                  assignedTerritories: result.data.assigned_territories ? result.data.assigned_territories.split(',') : undefined,
                  adminNotes: result.data.admin_notes || undefined,
                });
              }
            } else {
              console.error('Invalid stored application data structure');
              localStorage.removeItem('dealer_application');
            }
          } catch (error) {
            console.error('Failed to parse stored application data:', error);
            localStorage.removeItem('dealer_application');
          }
        }
      }
    }
    loadData();

    return () => {
      isMounted = false;
    };
  }, [lang]);

  const { dealer, common } = dictionary;

  // If already a dealer, show dealer dashboard (simplified for now)
  if (isDealer) {
    return (
      <>
        <Breadcrumbs
          items={[
            { name: common.home, href: `/${lang}` },
            { name: dealer.dashboard_title, href: `/${lang}/dealer/status` },
          ]}
          lang={lang}
        />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {dealer.dashboard_title}
              </h1>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  {dealer.status_approved}
                </h2>
                <p className="text-green-700">
                  {dealer.welcome_message.replace('{name}', user?.displayName || 'Dealer')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{dealer.my_tier}</h3>
                  <p className="text-2xl font-bold text-blue-900">
                    {user?.dealerInfo?.tierName ? dealer[`tier_${user.dealerInfo.tierName}` as keyof typeof dealer] : 'N/A'}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{dealer.my_discount}</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {user?.dealerInfo?.discountPercentage ? `${user.dealerInfo.discountPercentage}%` : 'N/A'}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{dealer.min_order_amount}</h3>
                  <p className="text-xl font-semibold text-gray-900">
                    {user?.dealerInfo?.minOrderAmount
                      ? `${user.dealerInfo.minOrderAmount.toLocaleString()} THB`
                      : 'N/A'}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{dealer.min_order_quantity}</h3>
                  <p className="text-xl font-semibold text-gray-900">
                    {user?.dealerInfo?.minOrderQuantity || 'N/A'} units
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/${lang}/shop`}
                  className="inline-block px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all rounded"
                >
                  {dealer.pricing_title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // If no application data and not a dealer, show friendly message
  if (!applicationData && !isDealer) {
    return (
      <>
        <Breadcrumbs
          items={[
            { name: common.home, href: `/${lang}` },
            { name: dealer.status_title, href: `/${lang}/dealer/status` },
          ]}
          lang={lang}
        />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-6">
                <svg className="mx-auto h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                  No Dealer Application Found
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    {user ? (
                      <>
                        Hello <strong>{user.displayName || user.firstName}</strong>, you haven&apos;t submitted a dealer application yet.
                      </>
                    ) : (
                      'You need to login to view your dealer application status.'
                    )}
                  </p>
                </div>

                {user && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 text-sm font-medium mb-2">
                      Ready to become a dealer? Get exclusive benefits:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✨ Silver: 20% discount, 50k THB min order</li>
                      <li>✨ Gold: 25% discount, 100k THB min order</li>
                      <li>✨ Platinum: 30% discount, 200k THB min order</li>
                    </ul>
                  </div>
                )}

                <div className="flex gap-4">
                  {user ? (
                    <Link href={`/${lang}/dealer/apply`} className="flex-1">
                      <Button variant="primary" size="lg" className="w-full">
                        Apply for Dealer Status
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => router.push(`/${lang}/login`)}
                    >
                      Login to View Status
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                    onClick={() => router.push(`/${lang}`)}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const status = apiData?.status || applicationData?.status || 'pending';
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'approved':
      case 'active':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'rejected':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'pending':
        return dealer.status_pending;
      case 'approved':
      case 'active':
        return dealer.status_approved;
      case 'rejected':
        return dealer.status_rejected;
      default:
        return dealer.status_title;
    }
  };

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: dealer.status_title, href: `/${lang}/dealer/status` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang} />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {dealer.status_title}
            </h1>

            {/* Status Badge */}
            <div
              className={`border rounded-lg p-6 mb-6 ${getStatusColor()}`}
              role="status"
              aria-live="polite"
              aria-label={`Application status: ${status}`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {status === 'pending' && (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {(status === 'approved' || status === 'active') && (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {status === 'rejected' && (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{getStatusMessage()}</h2>
                  <p className="text-sm mt-1">
                    {status === 'pending' && dealer.status_pending_desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600 font-medium">{dealer.application_id}:</span>
                <span className="text-gray-900 font-semibold">{apiData?.applicationId || applicationData?.applicationId}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600 font-medium">{dealer.business_name}:</span>
                <span className="text-gray-900 font-semibold">
                  {apiData?.businessName || applicationData?.businessName}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600 font-medium">{dealer.submitted_date}:</span>
                <span className="text-gray-900">
                  {(() => {
                    const date = apiData?.submittedDate || applicationData?.submittedDate;
                    return date ? new Date(date).toLocaleDateString() : 'N/A';
                  })()}
                </span>
              </div>

              {apiData?.reviewedDate && (
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600 font-medium">{dealer.reviewed_date}:</span>
                  <span className="text-gray-900">
                    {new Date(apiData.reviewedDate).toLocaleDateString()}
                  </span>
                </div>
              )}

              {apiData?.assignedTier && (
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600 font-medium">{dealer.assigned_tier}:</span>
                  <span className="text-gray-900 font-semibold">
                    {apiData.assignedTier}
                  </span>
                </div>
              )}

              {apiData?.assignedTerritories && apiData.assignedTerritories.length > 0 && (
                <div className="py-3 border-b">
                  <span className="text-gray-600 font-medium block mb-2">{dealer.assigned_territories}:</span>
                  <div className="flex flex-wrap gap-2">
                    {apiData.assignedTerritories.map((territory: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {territory}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {apiData?.adminNotes && (
                <div className="py-3">
                  <span className="text-gray-600 font-medium block mb-2">{dealer.admin_notes}:</span>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded">{apiData.adminNotes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              {status === 'pending' && (
                <p className="text-sm text-gray-600 text-center">
                  We will review your application and get back to you within 3-5 business days.
                </p>
              )}

              {(status === 'approved' || status === 'active') && (
                <Link
                  href={`/${lang}/shop`}
                  className="block w-full px-6 py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all rounded text-center"
                >
                  {dealer.pricing_title}
                </Link>
              )}

              {status === 'rejected' && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    You can reapply after 90 days from the submission date.
                  </p>
                  <Link
                    href={`/${lang}/dealer/apply`}
                    className="inline-block px-6 py-3 border border-blue-900 text-blue-900 font-bold hover:bg-blue-50 transition-all rounded"
                  >
                    {dealer.reapply_button}
                  </Link>
                </div>
              )}

              <Link
                href={`/${lang}/account`}
                className="block text-center text-blue-600 hover:text-blue-800 font-semibold"
              >
                ← Back to Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
