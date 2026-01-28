/**
 * PromptPay QR Code Generator Service
 * Follows EMVCo standard for Thai PromptPay QR codes
 */

export interface PromptPayOptions {
  /** Merchant ID (phone number or tax ID) */
  merchantId: string;
  /** Transaction amount in Baht */
  amount: number;
  /** Whether this is a static QR (no amount) or dynamic QR (with amount) */
  isStatic?: boolean;
}

/**
 * Generate EMVCo TLV (Tag-Length-Value) data
 */
function generateTLV(tag: string, value: string): string {
  const length = value.length.toString().padStart(2, '0');
  return tag + length + value;
}

/**
 * Calculate CRC-16/CCITT-FALSE checksum
 */
function calculateCRC16(data: string): string {
  let crc = 0xFFFF;
  
  for (let i = 0; i < data.length; i++) {
    const byte = data.charCodeAt(i);
    crc ^= byte << 8;
    
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
      crc &= 0xFFFF;
    }
  }
  
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Generate PromptPay QR code payload following EMVCo standard
 */
export function generatePromptPayPayload(options: PromptPayOptions): string {
  const { merchantId, amount, isStatic = false } = options;

  // Clean merchant ID (remove dashes, spaces, etc.)
  const cleanMerchantId = merchantId.replace(/[-\s]/g, '');

  // 00: Payload Format Indicator (always 01 for EMVCo)
  const payloadFormat = generateTLV('00', '01');

  // 01: Point of Initiation Method
  // 11 = Static (no amount), 12 = Dynamic (with amount)
  const pointOfInitiation = generateTLV('01', isStatic ? '11' : '12');

  // 29-51: Merchant Account Information
  // For PromptPay, we use ID 29 with sub-IDs:
  // - 00: Globally Unique Identifier (PromptPay ID: "A000000677010111")
  // - 01: Merchant Account Number (phone or tax ID)
  const guid = 'A000000677010111'; // PromptPay GUID
  const merchantAccountInfo = generateTLV(
    '29',
    generateTLV('00', guid) + generateTLV('01', cleanMerchantId)
  );

  // 52: Merchant Category Code (optional, defaults to 0000)
  // 53: Transaction Currency (764 = Thai Baht)
  const currencyCode = generateTLV('53', '764');

  // 54: Transaction Amount (only for dynamic QR)
  const transactionAmount = isStatic ? '' : generateTLV('54', amount.toFixed(2));

  // 58: Country Code (TH = Thailand)
  const countryCode = generateTLV('58', 'TH');

  // 59: Merchant Name (optional)
  // 60: Merchant City (optional)
  // 61: Postal Code (optional)

  // 62: Additional Data Field Template
  // For PromptPay, we use sub-ID 05 for Bill Number (optional)
  const additionalData = generateTLV('62', '');

  // Build the payload without CRC first
  let payloadWithoutCRC = payloadFormat + pointOfInitiation + merchantAccountInfo + currencyCode;

  if (!isStatic) {
    payloadWithoutCRC += transactionAmount;
  }

  payloadWithoutCRC += countryCode + additionalData;

  // 63: CRC (Checksum)
  const crc = calculateCRC16(payloadWithoutCRC + '6304');
  const crcTLV = generateTLV('63', crc);

  // Final payload
  return payloadWithoutCRC + crcTLV;
}

/**
 * Validate PromptPay merchant ID
 * - Phone number: 10 digits starting with 0
 * - Tax ID: 13 digits
 */
export function validatePromptPayId(merchantId: string): { valid: boolean; type?: 'phone' | 'taxId'; error?: string } {
  const cleanId = merchantId.replace(/[-\s]/g, '');

  // Check for phone number (10 digits, starts with 0)
  if (/^0\d{9}$/.test(cleanId)) {
    return { valid: true, type: 'phone' };
  }

  // Check for tax ID (13 digits)
  if (/^\d{13}$/.test(cleanId)) {
    return { valid: true, type: 'taxId' };
  }

  return {
    valid: false,
    error: 'Invalid PromptPay ID. Must be a 10-digit phone number (e.g., 0812345678) or 13-digit tax ID.',
  };
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[-\s]/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

/**
 * Format tax ID for display
 */
export function formatTaxId(taxId: string): string {
  const cleaned = taxId.replace(/[-\s]/g, '');
  if (cleaned.length === 13) {
    return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9, 12)} ${cleaned.slice(12)}`;
  }
  return taxId;
}
