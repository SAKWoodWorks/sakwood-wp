'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types/dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui';
import { useAuth } from '@/lib/context/AuthContext';

interface WholesaleStatusPageProps {
  lang: Locale;
  dictionary: Pick<Dictionary, 'wholesale' | 'common'>;
}

export function WholesaleStatusPage({ lang, dictionary }: WholesaleStatusPageProps) {
  const { wholesale, common } = dictionary;
  const { user } = useAuth();
  const router = useRouter();

  const [applicationData, setApplicationData] = useState<{
    status: 'pending' | 'approved' | 'rejected' | 'active';
    applicationId: string;
    submittedDate: string;
    businessName?: string;
  } | null>(null);

  useEffect(() => {
    // In production, this would fetch from the API
    // For now, check if user has wholesale status in their profile
    if (user?.wholesaleStatus) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Setting state based on user data on mount
      setApplicationData({
        status: user.wholesaleStatus,
        applicationId: `WSL-${user.id}`,
        submittedDate: new Date().toISOString(),
        businessName: user.businessName,
      });
    } else {
      // Check localStorage for temporary application data
      const savedApplication = localStorage.getItem('wholesale_application');
      if (savedApplication) {
        setApplicationData(JSON.parse(savedApplication));
      } else {
        // No application found - redirect to apply page
        router.push(`/${lang}/wholesale/apply`);
      }
    }
  }, [user, lang, router]);

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: wholesale.page_title, href: `/${lang}/wholesale` },
    { name: wholesale.status_page_title, href: `/${lang}/wholesale/status` }
  ];

  if (!applicationData) {
    return (
      <>
        <Breadcrumbs items={breadcrumbItems} lang={lang} />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const getStatusConfig = () => {
    switch (applicationData.status) {
      case 'pending':
        return {
          icon: (
            <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-900',
          title: wholesale.status_pending,
          description: wholesale.status_pending_desc,
        };
      case 'approved':
      case 'active':
        return {
          icon: (
            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-900',
          title: wholesale.status_approved,
          description: wholesale.status_approved_desc,
        };
      case 'rejected':
        return {
          icon: (
            <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-900',
          title: wholesale.status_rejected,
          description: wholesale.status_rejected_desc,
        };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig();

  if (!statusConfig) {
    return null;
  }

  const formattedDate = new Date(applicationData.submittedDate).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang} />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {wholesale.status_page_title}
            </h1>
            <p className="text-gray-600">
              {wholesale.status_page_subtitle}
            </p>
          </div>

          {/* Status Card */}
          <div className={`rounded-lg shadow-md p-8 border-2 ${statusConfig.borderColor} ${statusConfig.bgColor} mb-6`}>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {statusConfig.icon}
              </div>
              <h2 className={`text-2xl font-bold ${statusConfig.textColor} mb-2`}>
                {statusConfig.title}
              </h2>
              <p className={statusConfig.textColor}>
                {statusConfig.description}
              </p>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Application Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">{wholesale.application_id}:</span>
                <span className="font-semibold text-gray-900">{applicationData.applicationId}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">{wholesale.submitted_date}:</span>
                <span className="font-semibold text-gray-900">{formattedDate}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">{wholesale.current_status}:</span>
                <span className={`font-semibold ${statusConfig.textColor}`}>
                  {statusConfig.title}
                </span>
              </div>
              {applicationData.businessName && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">{wholesale.business_name}:</span>
                  <span className="font-semibold text-gray-900">{applicationData.businessName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link href={`/${lang}/shop`} className="flex-1">
              <Button variant="primary" size="lg" className="w-full">
                Start Shopping
              </Button>
            </Link>
            <Link href={`/${lang}/wholesale`} className="flex-1">
              <Button variant="secondary" size="lg" className="w-full">
                Back to Wholesale Portal
              </Button>
            </Link>
          </div>

          {applicationData.status === 'rejected' && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-900">
                If you have questions about your application, please{' '}
                <Link href={`/${lang}/contact`} className="font-semibold underline hover:text-blue-700">
                  contact our support team
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
