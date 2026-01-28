'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { pollOrderStatus, getPaymentStatusMessage } from '@/lib/services/orderStatusService';

interface PaymentVerificationProps {
  orderId: number;
  onComplete?: (paid: boolean) => void;
  className?: string;
}

export function PaymentVerification({
  orderId,
  onComplete,
  className = '',
}: PaymentVerificationProps) {
  const [status, setStatus] = useState<'checking' | 'paid' | 'pending' | 'failed' | 'timeout'>('checking');
  const [message, setMessage] = useState('Checking payment status...');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(60);
  const [isPolling, setIsPolling] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const checkPayment = async () => {
      try {
        const result = await pollOrderStatus(
          orderId,
          60, // 5 minutes max (60 attempts * 5 seconds)
          5000, // Check every 5 seconds
          (update) => {
            if (!abortController.signal.aborted) {
              setMessage(update.message);
              setAttempts((prev) => prev + 1);

              // Update status based on payment status
              if (update.paid) {
                setStatus('paid');
                setIsPolling(false);
              } else if (['cancelled', 'failed', 'refunded'].includes(update.status)) {
                setStatus('failed');
                setIsPolling(false);
              }
            }
          },
          abortController.signal
        );

        if (!abortController.signal.aborted) {
          if (result.paid) {
            setStatus('paid');
            onComplete?.(true);
          } else if (result.status === 'timeout') {
            setStatus('timeout');
            setMessage(result.message);
            setIsPolling(false);
          } else if (['cancelled', 'failed', 'refunded'].includes(result.status)) {
            setStatus('failed');
            setMessage(result.message);
            setIsPolling(false);
            onComplete?.(false);
          }
        }
      } catch (error) {
        if (error instanceof Error && error.message === 'Polling aborted') {
          // Polling was cancelled, ignore error
          return;
        }
        console.error('Payment verification error:', error);
        if (!abortController.signal.aborted) {
          setStatus('timeout');
          setMessage('Unable to verify payment status. Please contact support.');
          setIsPolling(false);
        }
      }
    };

    checkPayment();

    return () => {
      abortController.abort();
    };
  }, [orderId, onComplete]);

  const handleRetry = () => {
    setStatus('checking');
    setMessage('Checking payment status...');
    setAttempts(0);
    setIsPolling(true);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="w-16 h-16 text-green-600" />;
      case 'failed':
        return <XCircle className="w-16 h-16 text-red-600" />;
      case 'timeout':
        return <Clock className="w-16 h-16 text-amber-600" />;
      case 'checking':
      default:
        return <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />;
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case 'paid':
        return 'from-green-50 to-emerald-50 border-green-200';
      case 'failed':
        return 'from-red-50 to-rose-50 border-red-200';
      case 'timeout':
        return 'from-amber-50 to-yellow-50 border-amber-200';
      case 'checking':
      default:
        return 'from-blue-50 to-indigo-50 border-blue-200';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getBackgroundColor()} rounded-lg border-2 p-6 ${className}`}>
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Status Icon */}
        <div className="p-4 bg-white rounded-full shadow-md">
          {getStatusIcon()}
        </div>

        {/* Status Message */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">
            {status === 'paid' && 'Payment Successful!'}
            {status === 'failed' && 'Payment Failed'}
            {status === 'timeout' && 'Verification Timeout'}
            {status === 'checking' && 'Verifying Payment...'}
          </h3>
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Progress for checking state */}
        {status === 'checking' && (
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Checking payment status...</span>
              <span>{Math.min(attempts, maxAttempts)} / {maxAttempts}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${(attempts / maxAttempts) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              This may take a few minutes. You can leave this page and check your email.
            </p>
          </div>
        )}

        {/* Action buttons */}
        {status === 'timeout' && (
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all font-semibold shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              Check Again
            </button>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Or contact our support team:</p>
              <a
                href="https://lin.ee/v86CTkq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                LINE: @Sakwood
              </a>
            </div>
          </div>
        )}

        {/* Info for paid status */}
        {status === 'paid' && (
          <div className="text-sm text-gray-600 space-y-2">
            <p className="font-semibold">Order Number: #{orderId}</p>
            <p>You will receive an email confirmation shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
