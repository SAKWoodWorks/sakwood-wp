'use client';

'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { generatePromptPayPayload, formatPhoneNumber, formatTaxId, validatePromptPayId } from '@/lib/services/promptpayService';

interface PromptPayQRProps {
  /** Merchant ID (phone number or tax ID) */
  merchantId: string;
  /** Transaction amount in Baht */
  amount: number;
  /** QR code size in pixels */
  size?: number;
  /** Whether to show merchant info */
  showMerchantInfo?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function PromptPayQR({
  merchantId,
  amount,
  size = 256,
  showMerchantInfo = true,
  className = '',
}: PromptPayQRProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        // Validate merchant ID
        const validation = validatePromptPayId(merchantId);
        if (!validation.valid) {
          setError(validation.error || 'Invalid PromptPay ID');
          return;
        }

        // Generate PromptPay payload
        const payload = generatePromptPayPayload({
          merchantId,
          amount,
          isStatic: false,
        });

        // Generate QR code
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, payload, {
            width: size,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#ffffff',
            },
            errorCorrectionLevel: 'M',
          });
          setError('');
        }
      } catch (err) {
        console.error('Error generating PromptPay QR code:', err);
        setError('Failed to generate QR code');
      }
    };

    generateQR();
  }, [merchantId, amount, size]);

  const validation = validatePromptPayId(merchantId);
  const formattedId = validation.type === 'phone' 
    ? formatPhoneNumber(merchantId) 
    : validation.type === 'taxId' 
    ? formatTaxId(merchantId) 
    : merchantId;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <canvas ref={canvasRef} className="block" />
          </div>
          
          {showMerchantInfo && validation.valid && (
            <div className="mt-4 text-center space-y-1">
              <p className="text-sm text-gray-600">
                {validation.type === 'phone' ? 'PromptPay Phone Number' : 'PromptPay Tax ID'}
              </p>
              <p className="font-bold text-blue-900">{formattedId}</p>
              <p className="text-2xl font-bold text-green-600">
                ฿{amount.toFixed(2)}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
