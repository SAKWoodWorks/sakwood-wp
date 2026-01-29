'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import type { Locale } from '@/i18n-config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui';
import { getCustomerAddresses, createCustomerAddress, updateCustomerAddress, deleteCustomerAddress } from '@/lib/services/customerAddressService';
import { getCRMProfile } from '@/lib/services/crmService';
import { CRMProfile, CRMStats } from '@/components/crm';
import type { CRMCustomer } from '@/lib/types';

interface AccountDashboardProps {
  lang: Locale;
  dictionary: {
    account: any;
    common: any;
    auth: any;
    crm: any;
  };
}

export function AccountDashboard({ lang, dictionary }: AccountDashboardProps) {
  const { account, common, auth, crm } = dictionary;
  const { user, isLoading, logout, changePassword, refreshUser } = useAuth();
  const { getCartCount } = useCart();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'details' | 'addresses'>('overview');

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  // Address form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [addressForm, setAddressForm] = useState({
    first_name: '',
    last_name: '',
    company: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'TH',
    phone: '',
  });
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [addressSuccess, setAddressSuccess] = useState('');
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);

  // CRM state
  const [crmProfile, setCrmProfile] = useState<CRMCustomer | null>(null);
  const [crmLoading, setCrmLoading] = useState(false);

  // Load addresses
  const loadAddresses = async () => {
    setAddressLoading(true);
    setAddressError('');

    const result = await getCustomerAddresses(user?.id);

    if (result.addresses) {
      setAddresses(result.addresses);
    } else {
      setAddressError('Failed to load addresses');
    }

    setAddressLoading(false);
  };

  // Load CRM data
  const loadCRMData = async () => {
    if (!user?.id) return;

    setCrmLoading(true);

    const profileResult = await getCRMProfile(user.id);

    if (profileResult.success && profileResult.data) {
      setCrmProfile(profileResult.data);
    }

    setCrmLoading(false);
  };

  // Refresh user data once when loaded to get fresh data with firstName/lastName
  useEffect(() => {
    if (!isLoading && user && !hasRefreshed && refreshUser) {
      refreshUser();
      setHasRefreshed(true);
    }
  }, [isLoading, user, refreshUser, hasRefreshed]);

  // Load addresses when switching to addresses tab
  useEffect(() => {
    if (activeTab === 'addresses' && !addressLoading && user?.id) {
      loadAddresses();
    }
  }, [activeTab, user?.id]);

  // Load CRM data when switching to Details tab
  useEffect(() => {
    if (activeTab === 'details' && !crmLoading && user?.id) {
      loadCRMData();
    }
  }, [activeTab, user?.id]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/${lang}/login`);
    }
  }, [isLoading, user, lang, router]);

  // Mock orders - replace with actual orders from your backend
  const orders: any[] = [];

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(account.password_mismatch || 'Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError(account.password_too_short || 'Password must be at least 8 characters');
      return;
    }

    setIsSubmittingPassword(true);

    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);

    setIsSubmittingPassword(false);

    if (result.success) {
      setPasswordSuccess(account.password_success || 'Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      // Clear success message after 3 seconds
      setTimeout(() => setPasswordSuccess(''), 3000);
    } else {
      setPasswordError(result.error || 'Failed to change password');
    }
  };

  // Handle add new address
  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      first_name: user?.firstName || '',
      last_name: user?.lastName || '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'TH',
      phone: '',
    });
    setShowAddressForm(true);
  };

  // Handle edit address
  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setAddressForm(address);
    setShowAddressForm(true);
  };

  // Handle save address
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressError('');
    setAddressSuccess('');
    setIsSubmittingAddress(true);

    try {
      let result;

      if (editingAddress) {
        // Update existing address
        result = await updateCustomerAddress(editingAddress.id, addressForm, user?.id);
      } else {
        // Create new address
        result = await createCustomerAddress(addressForm, user?.id);
      }

      if (result.success) {
        setAddressSuccess(editingAddress ? 'Address updated successfully' : 'Address added successfully');
        setShowAddressForm(false);
        setEditingAddress(null);
        setAddressForm({
          first_name: '',
          last_name: '',
          company: '',
          address_1: '',
          address_2: '',
          city: '',
          state: '',
          postcode: '',
          country: 'TH',
          phone: '',
        });

        // Reload addresses
        await loadAddresses();

        // Clear success message after 3 seconds
        setTimeout(() => setAddressSuccess(''), 3000);
      } else {
        setAddressError(result.error || 'Failed to save address');
      }
    } catch (err) {
      setAddressError('Failed to save address');
    } finally {
      setIsSubmittingAddress(false);
    }
  };

  // Handle cancel address form
  const handleCancelAddress = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressForm({
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'TH',
      phone: '',
    });
  };

  // Handle delete address
  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }

    const result = await deleteCustomerAddress(addressId, user?.id);

    if (result.success) {
      setAddressSuccess('Address deleted successfully');
      await loadAddresses();
      setTimeout(() => setAddressSuccess(''), 3000);
    } else {
      setAddressError(result.error || 'Failed to delete address');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: account.my_account, href: `/${lang}/account` }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang} />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {account.welcome}, {user?.firstName || user?.displayName}!
            </h1>
            <p className="mt-2 text-gray-600">
              {account.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'overview'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {account.overview}
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'orders'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {account.my_orders}
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'details'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {account.account_details}
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'addresses'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {account.addresses}
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    {auth.logout}
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{account.overview}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-blue-50 rounded-lg p-6">
                        <div className="text-3xl font-bold text-blue-600">{orders.length}</div>
                        <div className="text-sm text-gray-600 mt-1">{account.my_orders}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-6">
                        <div className="text-3xl font-bold text-green-600">{getCartCount()}</div>
                        <div className="text-sm text-gray-600 mt-1">{common.products}</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-6">
                        <div className="text-3xl font-bold text-purple-600">0</div>
                        <div className="text-sm text-gray-600 mt-1">{account.addresses}</div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{account.personal_info}</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">{auth.first_name}:</span>
                        <span className="ml-2 text-gray-900">{user?.firstName}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">{auth.last_name}:</span>
                        <span className="ml-2 text-gray-900">{user?.lastName}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">{auth.email}:</span>
                        <span className="ml-2 text-gray-900">{user?.email}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{account.my_orders}</h2>
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">{account.no_orders}</h3>
                        <p className="mt-1 text-sm text-gray-500">{account.no_orders_desc}</p>
                        <div className="mt-6">
                          <Link href={`/${lang}/shop`}>
                            <Button variant="primary" size="md">
                              {account.start_shopping}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order: any) => (
                          <div key={order.id} className="border rounded-lg p-4">
                            {/* Order item */}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'details' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{account.account_details}</h2>

                    {crmLoading ? (
                      <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading...</p>
                      </div>
                    ) : (
                      <>
                        {/* Customer Type Badge */}
                        {crmProfile && (
                          <div className="mb-6">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              crmProfile.customerType === 'vip' ? 'bg-purple-100 text-purple-800' :
                              crmProfile.customerType === 'wholesale' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {crmProfile.customerType === 'vip' ? (crm.vip || 'VIP') :
                               crmProfile.customerType === 'wholesale' ? (crm.wholesale || 'Wholesale') :
                               (crm.retail || 'Retail')}
                            </span>
                          </div>
                        )}

                        {/* Order Statistics */}
                        {crmProfile && (
                          <CRMStats
                            stats={{
                              total_orders: crmProfile.totalOrders,
                              total_spent: crmProfile.totalSpent,
                              avg_order_value: crmProfile.avgOrderValue,
                              member_since: crmProfile.memberSince,
                            }}
                            labels={{
                              total_orders: crm.total_orders,
                              total_spent: crm.total_spent,
                              avg_order_value: crm.avg_order_value,
                              member_since: crm.member_since,
                            }}
                          />
                        )}

                        <hr className="my-8" />

                        {/* Basic Profile */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{account.personal_info}</h3>
                        <form className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {auth.first_name}
                              </label>
                              <input
                                type="text"
                                defaultValue={user?.firstName}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {auth.last_name}
                              </label>
                              <input
                                type="text"
                                defaultValue={user?.lastName}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {auth.email}
                            </label>
                            <input
                              type="email"
                              defaultValue={user?.email}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                              disabled
                              title="Email cannot be changed"
                            />
                            <p className="text-sm text-gray-500 mt-1">Contact support to change email</p>
                          </div>
                        </form>

                        {/* Extended Profile */}
                        {crmProfile && (
                          <CRMProfile
                            profile={crmProfile}
                            userId={user?.id}
                            labels={{
                              customer_type: crm.customer_type,
                              phone: crm.phone,
                              line_id: crm.line_id,
                              company: crm.company,
                              tax_id: crm.tax_id,
                              edit: crm.edit,
                              save: crm.save,
                              cancel: crm.cancel,
                              retail: crm.retail,
                              wholesale: crm.wholesale,
                              vip: crm.vip,
                              profile_title: crm.profile_title,
                            }}
                            onUpdate={loadCRMData}
                          />
                        )}

                        {/* Tax ID Display */}
                        {crmProfile?.taxId && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {crm.tax_id || 'Tax ID'}
                            </label>
                            <p className="text-gray-900 font-mono">{crmProfile.taxId}</p>
                            <p className="text-sm text-gray-500 mt-1">Tax ID is read-only. Contact support to update.</p>
                          </div>
                        )}

                        <hr className="my-8" />

                        {/* Password Change */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{account.change_password}</h3>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                          {passwordError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                              {passwordError}
                            </div>
                          )}
                          {passwordSuccess && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                              {passwordSuccess}
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {account.current_password}
                            </label>
                            <input
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {account.new_password}
                            </label>
                            <input
                              type="password"
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                              minLength={8}
                            />
                            <p className="text-sm text-gray-500 mt-1">Minimum 8 characters</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {account.confirm_password || 'Confirm New Password'}
                            </label>
                            <input
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                              minLength={8}
                            />
                          </div>
                          <Button
                            variant="primary"
                            size="md"
                            type="submit"
                            disabled={isSubmittingPassword}
                          >
                            {isSubmittingPassword ? (account.changing || 'Changing...') : (account.save || 'Save')}
                          </Button>
                        </form>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'addresses' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">{account.addresses}</h2>
                      {!showAddressForm && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={handleAddAddress}
                        >
                          {account.add_address || 'Add Address'}
                        </Button>
                      )}
                    </div>

                    {/* Success/Error Messages */}
                    {addressSuccess && (
                      <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                        {addressSuccess}
                      </div>
                    )}
                    {addressError && (
                      <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {addressError}
                      </div>
                    )}

                    {/* Address Form */}
                    {showAddressForm && (
                      <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {editingAddress ? (account.edit_address || 'Edit Address') : (account.add_address || 'Add Address')}
                        </h3>
                        <form onSubmit={handleSaveAddress} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {auth.first_name} *
                              </label>
                              <input
                                type="text"
                                value={addressForm.first_name}
                                onChange={(e) => setAddressForm({ ...addressForm, first_name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {auth.last_name} *
                              </label>
                              <input
                                type="text"
                                value={addressForm.last_name}
                                onChange={(e) => setAddressForm({ ...addressForm, last_name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {account.company || 'Company'}
                            </label>
                            <input
                              type="text"
                              value={addressForm.company}
                              onChange={(e) => setAddressForm({ ...addressForm, company: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {account.address_1 || 'Address'} *
                            </label>
                            <input
                              type="text"
                              value={addressForm.address_1}
                              onChange={(e) => setAddressForm({ ...addressForm, address_1: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {account.address_2 || 'Apartment, suite, etc.'}
                            </label>
                            <input
                              type="text"
                              value={addressForm.address_2}
                              onChange={(e) => setAddressForm({ ...addressForm, address_2: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {account.city || 'City'} *
                              </label>
                              <input
                                type="text"
                                value={addressForm.city}
                                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {account.state || 'Province'} *
                              </label>
                              <input
                                type="text"
                                value={addressForm.state}
                                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {account.postcode || 'Postcode'} *
                              </label>
                              <input
                                type="text"
                                value={addressForm.postcode}
                                onChange={(e) => setAddressForm({ ...addressForm, postcode: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {account.phone || 'Phone'}
                            </label>
                            <input
                              type="tel"
                              value={addressForm.phone}
                              onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="flex gap-4">
                            <Button
                              variant="primary"
                              size="md"
                              type="submit"
                              disabled={isSubmittingAddress}
                            >
                              {isSubmittingAddress ? (account.saving || 'Saving...') : (account.save || 'Save')}
                            </Button>
                            <Button
                              variant="secondary"
                              size="md"
                              type="button"
                              onClick={handleCancelAddress}
                              disabled={isSubmittingAddress}
                            >
                              {account.cancel || 'Cancel'}
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Addresses List */}
                    {addressLoading ? (
                      <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">{account.loading_addresses || 'Loading addresses...'}</p>
                      </div>
                    ) : addresses.length === 0 && !showAddressForm ? (
                      <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No addresses found</h3>
                        <p className="mt-1 text-sm text-gray-500">Add your first address to get started</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((address) => (
                          <div key={address.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{address.first_name} {address.last_name}</p>
                                {address.company && <p className="text-sm text-gray-600">{address.company}</p>}
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditAddress(address)}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  {account.edit || 'Edit'}
                                </button>
                                <button
                                  onClick={() => handleDeleteAddress(address.id)}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  {account.delete || 'Delete'}
                                </button>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>{address.address_1}</p>
                              {address.address_2 && <p>{address.address_2}</p>}
                              <p>{address.city}, {address.state} {address.postcode}</p>
                              {address.phone && <p>{account.phone}: {address.phone}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
