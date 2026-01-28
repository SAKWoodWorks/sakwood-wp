'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, FileText, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { updateCRMProfile } from '@/lib/services/crmService';
import { cn } from '@/lib/utils';
import type { CRMCustomer } from '@/lib/types';

interface CRMProfileProps {
  profile: CRMCustomer;
  userId?: number;
  labels: {
    profile_title: string;
    customer_type: string;
    phone: string;
    line_id: string;
    company: string;
    tax_id: string;
    edit: string;
    save: string;
    cancel: string;
    retail: string;
    wholesale: string;
    vip: string;
  };
  onUpdate?: () => void;
}

export function CRMProfile({ profile, userId, labels, onUpdate }: CRMProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: profile.phone || '',
    lineId: profile.lineId || '',
    company: profile.company || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    const result = await updateCRMProfile(formData, userId);

    setIsSaving(false);

    if (result.success) {
      setSaveStatus('success');
      setIsEditing(false);
      onUpdate?.();

      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      setSaveStatus('error');
    }
  };

  const handleCancel = () => {
    setFormData({
      phone: profile.phone || '',
      lineId: profile.lineId || '',
      company: profile.company || '',
    });
    setIsEditing(false);
    setSaveStatus('idle');
  };

  const getCustomerTypeLabel = () => {
    switch (profile.customerType) {
      case 'retail':
        return labels.retail;
      case 'wholesale':
        return labels.wholesale;
      case 'vip':
        return labels.vip;
      default:
        return profile.customerType;
    }
  };

  const getCustomerTypeBadge = () => {
    switch (profile.customerType) {
      case 'retail':
        return 'bg-gray-100 text-gray-800';
      case 'wholesale':
        return 'bg-blue-100 text-blue-800';
      case 'vip':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            {labels.profile_title}
          </h2>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            {labels.edit}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Customer Type Badge */}
        <div className="mb-6">
          <span className={cn(
            'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold',
            getCustomerTypeBadge()
          )}>
            {labels.customer_type}: {getCustomerTypeLabel()}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email (Read-only) */}
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="font-medium text-gray-900">{profile.email}</p>
            </div>
          </div>

          {/* Phone (Editable) */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{labels.phone}</p>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter phone number"
                />
              ) : (
                <p className="font-medium text-gray-900">
                  {profile.phone || '-'}
                </p>
              )}
            </div>
          </div>

          {/* LINE ID (Editable) */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{labels.line_id}</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.lineId}
                  onChange={(e) => setFormData({ ...formData, lineId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter LINE ID"
                />
              ) : (
                <p className="font-medium text-gray-900">
                  {profile.lineId || '-'}
                </p>
              )}
            </div>
          </div>

          {/* Company (Editable) */}
          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{labels.company}</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter company name"
                />
              ) : (
                <p className="font-medium text-gray-900">
                  {profile.company || '-'}
                </p>
              )}
            </div>
          </div>

          {/* Tax ID (Read-only) */}
          {profile.taxId && (
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{labels.tax_id}</p>
                <p className="font-medium text-gray-900">{profile.taxId}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="mt-6 flex items-center gap-3 pt-6 border-t border-gray-200">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? (
                'Saving...'
              ) : (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  {labels.save}
                </>
              )}
            </Button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              {labels.cancel}
            </button>
          </div>
        )}

        {/* Save Status Messages */}
        {saveStatus === 'success' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
            <Check className="w-4 h-4" />
            Profile updated successfully
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
            <X className="w-4 h-4" />
            Failed to update profile
          </div>
        )}
      </div>
    </div>
  );
}
