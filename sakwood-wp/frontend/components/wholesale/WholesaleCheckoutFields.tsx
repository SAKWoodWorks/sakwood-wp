'use client';

import { useAuth } from '@/lib/context/AuthContext';

interface WholesaleCheckoutFieldsProps {
  formData: {
    poNumber?: string;
    paymentMethod: string;
  };
  onFormDataChange: (data: { poNumber?: string }) => void;
  dictionary: {
    wholesale: {
      po_number: string;
      po_number_placeholder: string;
      net30_available: string;
      net30_remaining: string;
      benefit_credit: string;
      benefit_credit_desc: string;
    };
  };
}

export function WholesaleCheckoutFields({
  formData,
  onFormDataChange,
  dictionary,
}: WholesaleCheckoutFieldsProps) {
  const { isWholesale, canPurchaseOnCredit, user } = useAuth();

  if (!isWholesale) {
    return null;
  }

  return (
    <>
      {/* PO Number - Required for wholesale */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="font-semibold text-blue-900">Wholesale Information</h3>
        </div>

        {/* PO Number */}
        <div className="mb-3">
          <label htmlFor="poNumber" className="block text-sm font-medium text-gray-700 mb-1">
            {dictionary.wholesale.po_number} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="poNumber"
            name="poNumber"
            required
            value={formData.poNumber || ''}
            onChange={(e) => onFormDataChange({ poNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder={dictionary.wholesale.po_number_placeholder}
          />
          <p className="mt-1 text-xs text-gray-500">Enter your Purchase Order number for invoicing</p>
        </div>

        {/* Business Name Display */}
        {user?.businessName && (
          <div className="bg-white rounded p-3 text-sm">
            <span className="font-medium text-gray-700">Billing to: </span>
            <span className="text-gray-900">{user.businessName}</span>
            {user.taxId && (
              <>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-600">Tax ID: {user.taxId}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Credit Info - Show if user has Net-30 */}
      {canPurchaseOnCredit && (
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h4 className="font-semibold text-green-900">{dictionary.wholesale.benefit_credit}</h4>
          </div>
          <p className="text-sm text-green-800">{dictionary.wholesale.benefit_credit_desc}</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded p-2">
              <span className="text-gray-600">{dictionary.wholesale.net30_available}:</span>
              <span className="ml-2 font-semibold text-green-700">
                ี{(user?.creditLimit || 0).toLocaleString()}
              </span>
            </div>
            <div className="bg-white rounded p-2">
              <span className="text-gray-600">{dictionary.wholesale.net30_remaining}:</span>
              <span className="ml-2 font-semibold text-green-700">
                ี{((user?.creditLimit || 0) - (user?.remainingCredit || 0)).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WholesaleCheckoutFields;
