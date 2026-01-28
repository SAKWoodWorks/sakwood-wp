'use client';

import { Smartphone, Scan, CheckCircle, Clock } from 'lucide-react';

interface PromptPayInstructionsProps {
  className?: string;
}

export function PromptPayInstructions({ className = '' }: PromptPayInstructionsProps) {
  const steps = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Open your banking app',
      description: 'Launch your mobile banking app (e.g., K Plus, SCB Easy, Krungthai NEXT)',
    },
    {
      icon: <Scan className="w-6 h-6" />,
      title: 'Scan the QR code',
      description: 'Select "Scan QR" or "PromptPay" in your app and scan the code above',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Confirm payment',
      description: 'Verify the amount and merchant details, then confirm the transaction',
    },
  ];

  const apps = [
    { name: 'K Plus', color: 'bg-green-600' },
    { name: 'SCB Easy', color: 'bg-purple-600' },
    { name: 'Krungthai NEXT', color: 'bg-red-600' },
    { name: 'Bualuang mBanking', color: 'bg-blue-600' },
    { name: 'Krungsri Mobile', color: 'bg-yellow-500' },
    { name: 'CIMB Clicks', color: 'bg-red-500' },
    { name: 'GSB Super App', color: 'bg-blue-500' },
    { name: 'TTB Touch', color: 'bg-orange-500' },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* How to pay */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          How to Pay with PromptPay
        </h3>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 text-blue-700">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supported apps */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3 text-center">
          Supported Banking Apps
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {apps.map((app) => (
            <span
              key={app.name}
              className={`px-3 py-1.5 ${app.color} text-white text-xs font-medium rounded-full shadow-sm`}
            >
              {app.name}
            </span>
          ))}
        </div>
      </div>

      {/* Important notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Important Notice
        </h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• QR code is valid for this transaction only</li>
          <li>• Please ensure the amount matches before confirming</li>
          <li>• Payment confirmation may take 1-3 business days</li>
          <li>• Keep your payment slip for reference</li>
        </ul>
      </div>
    </div>
  );
}
