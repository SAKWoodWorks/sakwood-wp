'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check, AlertCircle } from 'lucide-react';
import { generatePromptPayPayload, formatPhoneNumber, formatTaxId, validatePromptPayId } from '@/lib/services/promptpayService';
import { cn } from '@/lib/utils';

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
  /** Order reference for tracking */
  orderRef?: string;
}

export function PromptPayQR({
  merchantId,
  amount,
  size = 280,
  showMerchantInfo = true,
  className = '',
  orderRef = '',
}: PromptPayQRProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generateQR = async () => {
      setLoading(true);
      try {
        // Validate merchant ID
        const validation = validatePromptPayId(merchantId);
        if (!validation.valid) {
          setError(validation.error || 'Invalid PromptPay ID');
          setLoading(false);
          return;
        }

        // Generate PromptPay payload
        const payload = generatePromptPayPayload({
          merchantId,
          amount,
          isStatic: false,
        });

        // Create a canvas for QR code with logo
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }

        const qrSize = size;
        const logoSize = qrSize * 0.2; // Logo is 20% of QR size
        const logoPadding = qrSize * 0.02;

        canvas.width = qrSize;
        canvas.height = qrSize;

        // Generate QR code to data URL first
        const qrDataUrl = await QRCode.toDataURL(payload, {
          width: qrSize,
          margin: 0,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'H', // High error correction for logo overlay
        });

        // Draw QR code on canvas
        const qrImage = new Image();
        qrImage.onload = () => {
          // Draw QR code
          ctx.drawImage(qrImage, 0, 0, qrSize, qrSize);

          // Draw white background for logo
          const logoX = (qrSize - logoSize) / 2;
          const logoY = (qrSize - logoSize) / 2;

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(
            logoX - logoPadding,
            logoY - logoPadding,
            logoSize + logoPadding * 2,
            logoSize + logoPadding * 2
          );

          // Draw PromptPay logo (red and white shield)
          drawPromptPayLogo(ctx, logoX, logoY, logoSize);

          // Convert to data URL
          const finalDataUrl = canvas.toDataURL('image/png');
          setQrDataUrl(finalDataUrl);
          setLoading(false);
          setError('');
        };
        qrImage.onerror = () => {
          setError('Failed to generate QR code');
          setLoading(false);
        };
        qrImage.src = qrDataUrl;
      } catch (err) {
        console.error('Error generating PromptPay QR code:', err);
        setError('Failed to generate QR code');
        setLoading(false);
      }
    };

    generateQR();
  }, [merchantId, amount, size]);

  // Draw PromptPay logo on canvas
  const drawPromptPayLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    const center = size / 2;

    // Save context state
    ctx.save();

    // Draw shield shape (background)
    ctx.fillStyle = '#A31F34'; // PromptPay red
    ctx.beginPath();
    ctx.moveTo(x + size * 0.1, y + size * 0.05);
    ctx.lineTo(x + size * 0.9, y + size * 0.05);
    ctx.lineTo(x + size * 0.9, y + size * 0.55);
    ctx.quadraticCurveTo(x + size * 0.9, y + size * 0.75, x + center, y + size * 0.95);
    ctx.quadraticCurveTo(x + size * 0.1, y + size * 0.75, x + size * 0.1, y + size * 0.55);
    ctx.closePath();
    ctx.fill();

    // Draw "PP" text
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size * 0.35}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PP', x + center, y + size * 0.4);

    // Draw "PromptPay" text smaller
    ctx.font = `${size * 0.1}px Arial`;
    ctx.fillText('PromptPay', x + center, y + size * 0.7);

    // Restore context state
    ctx.restore();
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `promptpay-qr-${orderRef || Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyMerchantId = async () => {
    const cleanId = merchantId.replace(/[-\s]/g, '');
    try {
      await navigator.clipboard.writeText(cleanId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const validation = validatePromptPayId(merchantId);
  const formattedId = validation.type === 'phone'
    ? formatPhoneNumber(merchantId)
    : validation.type === 'taxId'
    ? formatTaxId(merchantId)
    : merchantId;

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg w-full">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full flex justify-center items-center" style={{ height: size + 32 }}>
          <div className="animate-pulse flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      ) : (
        <>
          {/* QR Code */}
          <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-900 relative">
            <img
              src={qrDataUrl}
              alt="PromptPay QR Code"
              className="block"
              style={{ width: size, height: size }}
            />

            {/* PromptPay Badge */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
              <span className="text-xs font-bold">PromptPay</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6 w-full max-w-xs">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-semibold">Save</span>
            </button>
            <button
              onClick={handleCopyMerchantId}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm font-semibold">Copy ID</span>
                </>
              )}
            </button>
          </div>

          {/* Merchant Info */}
          {showMerchantInfo && validation.valid && (
            <div className="mt-6 w-full max-w-xs space-y-3">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 font-semibold uppercase tracking-wide mb-1">
                  {validation.type === 'phone' ? 'PromptPay Phone Number' : 'PromptPay Tax ID'}
                </p>
                <p className="text-lg font-bold text-blue-900">{formattedId}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <p className="text-xs text-green-700 font-semibold uppercase tracking-wide mb-1">
                  Total Amount
                </p>
                <p className="text-3xl font-bold text-green-700">
                  ฿{amount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              {orderRef && (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
                  <p className="text-xs text-gray-500 mb-1">Order Reference</p>
                  <p className="text-sm font-mono font-semibold text-gray-700">{orderRef}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
