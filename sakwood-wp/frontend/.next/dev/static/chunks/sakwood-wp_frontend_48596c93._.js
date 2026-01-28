(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Breadcrumbs",
    ()=>Breadcrumbs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function Breadcrumbs({ items, lang }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "py-4 px-6 bg-slate-50 border-b border-slate-200",
        "aria-label": "Breadcrumb navigation",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "flex items-center gap-2 text-sm text-slate-600",
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex items-center gap-2",
                        children: [
                            index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-400",
                                "aria-hidden": "true",
                                children: "/"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
                                lineNumber: 22,
                                columnNumber: 17
                            }, this),
                            index === items.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-slate-900",
                                "aria-current": "page",
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
                                lineNumber: 25,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "hover:text-blue-600 transition-colors",
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
                                lineNumber: 29,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item.href, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
                        lineNumber: 20,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = Breadcrumbs;
var _c;
__turbopack_context__.k.register(_c, "Breadcrumbs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/services/promptpayService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * PromptPay QR Code Generator Service
 * Follows EMVCo standard for Thai PromptPay QR codes
 */ __turbopack_context__.s([
    "formatPhoneNumber",
    ()=>formatPhoneNumber,
    "formatTaxId",
    ()=>formatTaxId,
    "generatePromptPayPayload",
    ()=>generatePromptPayPayload,
    "validatePromptPayId",
    ()=>validatePromptPayId
]);
/**
 * Generate EMVCo TLV (Tag-Length-Value) data
 */ function generateTLV(tag, value) {
    const length = value.length.toString().padStart(2, '0');
    return tag + length + value;
}
/**
 * Calculate CRC-16/CCITT-FALSE checksum
 */ function calculateCRC16(data) {
    let crc = 0xFFFF;
    for(let i = 0; i < data.length; i++){
        const byte = data.charCodeAt(i);
        crc ^= byte << 8;
        for(let j = 0; j < 8; j++){
            if (crc & 0x8000) {
                crc = crc << 1 ^ 0x1021;
            } else {
                crc = crc << 1;
            }
            crc &= 0xFFFF;
        }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
}
function generatePromptPayPayload(options) {
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
    const merchantAccountInfo = generateTLV('29', generateTLV('00', guid) + generateTLV('01', cleanMerchantId));
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
function validatePromptPayId(merchantId) {
    const cleanId = merchantId.replace(/[-\s]/g, '');
    // Check for phone number (10 digits, starts with 0)
    if (/^0\d{9}$/.test(cleanId)) {
        return {
            valid: true,
            type: 'phone'
        };
    }
    // Check for tax ID (13 digits)
    if (/^\d{13}$/.test(cleanId)) {
        return {
            valid: true,
            type: 'taxId'
        };
    }
    return {
        valid: false,
        error: 'Invalid PromptPay ID. Must be a 10-digit phone number (e.g., 0812345678) or 13-digit tax ID.'
    };
}
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/[-\s]/g, '');
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
}
function formatTaxId(taxId) {
    const cleaned = taxId.replace(/[-\s]/g, '');
    if (cleaned.length === 13) {
        return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9, 12)} ${cleaned.slice(12)}`;
    }
    return taxId;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PromptPayQR",
    ()=>PromptPayQR
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$qrcode$2f$lib$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/qrcode/lib/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$promptpayService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/promptpayService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PromptPayQR({ merchantId, amount, size = 280, showMerchantInfo = true, className = '', orderRef = '' }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [qrDataUrl, setQrDataUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PromptPayQR.useEffect": ()=>{
            const generateQR = {
                "PromptPayQR.useEffect.generateQR": async ()=>{
                    setLoading(true);
                    try {
                        // Validate merchant ID
                        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$promptpayService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validatePromptPayId"])(merchantId);
                        if (!validation.valid) {
                            setError(validation.error || 'Invalid PromptPay ID');
                            setLoading(false);
                            return;
                        }
                        // Generate PromptPay payload
                        const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$promptpayService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generatePromptPayPayload"])({
                            merchantId,
                            amount,
                            isStatic: false
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
                        const qrDataUrl = await __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$qrcode$2f$lib$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toDataURL(payload, {
                            width: qrSize,
                            margin: 0,
                            color: {
                                dark: '#000000',
                                light: '#ffffff'
                            },
                            errorCorrectionLevel: 'H'
                        });
                        // Draw QR code on canvas
                        const qrImage = new Image();
                        qrImage.onload = ({
                            "PromptPayQR.useEffect.generateQR": ()=>{
                                // Draw QR code
                                ctx.drawImage(qrImage, 0, 0, qrSize, qrSize);
                                // Draw white background for logo
                                const logoX = (qrSize - logoSize) / 2;
                                const logoY = (qrSize - logoSize) / 2;
                                ctx.fillStyle = '#ffffff';
                                ctx.fillRect(logoX - logoPadding, logoY - logoPadding, logoSize + logoPadding * 2, logoSize + logoPadding * 2);
                                // Draw PromptPay logo (red and white shield)
                                drawPromptPayLogo(ctx, logoX, logoY, logoSize);
                                // Convert to data URL
                                const finalDataUrl = canvas.toDataURL('image/png');
                                setQrDataUrl(finalDataUrl);
                                setLoading(false);
                                setError('');
                            }
                        })["PromptPayQR.useEffect.generateQR"];
                        qrImage.onerror = ({
                            "PromptPayQR.useEffect.generateQR": ()=>{
                                setError('Failed to generate QR code');
                                setLoading(false);
                            }
                        })["PromptPayQR.useEffect.generateQR"];
                        qrImage.src = qrDataUrl;
                    } catch (err) {
                        console.error('Error generating PromptPay QR code:', err);
                        setError('Failed to generate QR code');
                        setLoading(false);
                    }
                }
            }["PromptPayQR.useEffect.generateQR"];
            generateQR();
        }
    }["PromptPayQR.useEffect"], [
        merchantId,
        amount,
        size
    ]);
    // Draw PromptPay logo on canvas
    const drawPromptPayLogo = (ctx, x, y, size)=>{
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
    const handleDownload = ()=>{
        if (!qrDataUrl) return;
        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = `promptpay-qr-${orderRef || Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleCopyMerchantId = async ()=>{
        const cleanId = merchantId.replace(/[-\s]/g, '');
        try {
            await navigator.clipboard.writeText(cleanId);
            setCopied(true);
            setTimeout(()=>setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$promptpayService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validatePromptPayId"])(merchantId);
    const formattedId = validation.type === 'phone' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$promptpayService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPhoneNumber"])(merchantId) : validation.type === 'taxId' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$promptpayService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTaxId"])(merchantId) : merchantId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col items-center ${className}`,
        children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                        lineNumber: 190,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium",
                                children: "Error"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                lineNumber: 192,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                lineNumber: 193,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                        lineNumber: 191,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                lineNumber: 189,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
            lineNumber: 188,
            columnNumber: 9
        }, this) : loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full flex justify-center items-center",
            style: {
                height: size + 32
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-pulse flex flex-col items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 bg-gray-200 rounded"
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                        lineNumber: 200,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 bg-gray-200 rounded w-32"
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                        lineNumber: 201,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                lineNumber: 199,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
            lineNumber: 198,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-4 rounded-lg shadow-md border-2 border-blue-900 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: qrDataUrl,
                            alt: "PromptPay QR Code",
                            className: "block",
                            style: {
                                width: size,
                                height: size
                            }
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1 rounded-full shadow-lg flex items-center gap-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold",
                                children: "PromptPay"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                lineNumber: 217,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                            lineNumber: 216,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                    lineNumber: 207,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 mt-6 w-full max-w-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleDownload,
                            className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                    lineNumber: 227,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold",
                                    children: "Save"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                            lineNumber: 223,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCopyMerchantId,
                            className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-all shadow-md hover:shadow-lg",
                            children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-4 h-4 text-green-600"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                        lineNumber: 236,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold",
                                        children: "Copied!"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                        lineNumber: 237,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                        lineNumber: 241,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold",
                                        children: "Copy ID"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                        lineNumber: 242,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                    lineNumber: 222,
                    columnNumber: 11
                }, this),
                showMerchantInfo && validation.valid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 w-full max-w-xs space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-blue-700 font-semibold uppercase tracking-wide mb-1",
                                    children: validation.type === 'phone' ? 'PromptPay Phone Number' : 'PromptPay Tax ID'
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                    lineNumber: 252,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-bold text-blue-900",
                                    children: formattedId
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                    lineNumber: 255,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                            lineNumber: 251,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-green-700 font-semibold uppercase tracking-wide mb-1",
                                    children: "Total Amount"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                    lineNumber: 259,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-3xl font-bold text-green-700",
                                    children: [
                                        "฿",
                                        amount.toLocaleString('th-TH', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                    lineNumber: 262,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                            lineNumber: 258,
                            columnNumber: 15
                        }, this),
                        orderRef && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 p-3 rounded-lg border border-gray-200 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 mb-1",
                                    children: "Order Reference"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                    lineNumber: 269,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-mono font-semibold text-gray-700",
                                    children: orderRef
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                                    lineNumber: 270,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                            lineNumber: 268,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
                    lineNumber: 250,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx",
        lineNumber: 186,
        columnNumber: 5
    }, this);
}
_s(PromptPayQR, "JTQpkGumNVcFj2PaTHJwSgMIM64=");
_c = PromptPayQR;
var _c;
__turbopack_context__.k.register(_c, "PromptPayQR");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/services/orderStatusService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOrderStatus",
    ()=>getOrderStatus,
    "getPaymentStatusMessage",
    ()=>getPaymentStatusMessage,
    "isOrderPaid",
    ()=>isOrderPaid,
    "pollOrderStatus",
    ()=>pollOrderStatus,
    "verifyWebhookSignature",
    ()=>verifyWebhookSignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Order Status Service for checking payment verification
 *
 * SECURITY: Now uses internal API route (/api/orders/[id]) to hide
 * WooCommerce credentials from client-side code. Credentials are only
 * used server-side in the API route.
 */ // Use internal API route instead of direct WooCommerce API
const INTERNAL_API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_APP_URL || '' + '/api/orders';
async function getOrderStatus(orderId) {
    const baseUrl = INTERNAL_API_URL.startsWith('http') ? INTERNAL_API_URL : `${window.location.origin}${INTERNAL_API_URL}`;
    const response = await fetch(`${baseUrl}/${orderId}`, {
        next: {
            revalidate: 10
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch order status: ${response.statusText}`);
    }
    return await response.json();
}
function isOrderPaid(status) {
    return status === 'processing' || status === 'completed';
}
function getPaymentStatusMessage(status) {
    const statusMessages = {
        pending: {
            paid: false,
            status: 'pending',
            message: 'Waiting for payment confirmation. We will notify you when payment is received.'
        },
        processing: {
            paid: true,
            status: 'processing',
            message: 'Payment received! Your order is being processed.'
        },
        completed: {
            paid: true,
            status: 'completed',
            message: 'Payment confirmed and order completed!'
        },
        cancelled: {
            paid: false,
            status: 'cancelled',
            message: 'This order has been cancelled.'
        },
        failed: {
            paid: false,
            status: 'failed',
            message: 'Payment failed. Please contact support.'
        },
        refunded: {
            paid: false,
            status: 'refunded',
            message: 'Payment has been refunded.'
        },
        on_hold: {
            paid: false,
            status: 'on_hold',
            message: 'Order is on hold.'
        }
    };
    return statusMessages[status] || {
        paid: false,
        status: 'unknown',
        message: 'Unable to determine payment status.'
    };
}
async function pollOrderStatus(orderId, maxAttempts = 60, interval = 5000, onStatusChange, abortSignal) {
    let attempts = 0;
    while(attempts < maxAttempts){
        // Check if aborted
        if (abortSignal?.aborted) {
            throw new Error('Polling aborted');
        }
        try {
            const order = await getOrderStatus(orderId);
            const result = getPaymentStatusMessage(order.status);
            // Call callback with current status
            if (onStatusChange) {
                onStatusChange(result);
            }
            // If order is paid or in a final state, return immediately
            if (result.paid || [
                'completed',
                'cancelled',
                'failed',
                'refunded'
            ].includes(order.status)) {
                return result;
            }
            attempts++;
            // Wait before next attempt with abort check
            if (attempts < maxAttempts) {
                await new Promise((resolve, reject)=>{
                    const timeout = setTimeout(resolve, interval);
                    abortSignal?.addEventListener('abort', ()=>{
                        clearTimeout(timeout);
                        reject(new Error('Polling aborted'));
                    });
                });
            }
        } catch (error) {
            if (abortSignal?.aborted || error instanceof Error && error.message === 'Polling aborted') {
                throw new Error('Polling aborted');
            }
            console.error(`Error polling order status (attempt ${attempts + 1}):`, error);
            attempts++;
            // Continue polling even if there's an error
            if (attempts < maxAttempts) {
                await new Promise((resolve, reject)=>{
                    const timeout = setTimeout(resolve, interval);
                    abortSignal?.addEventListener('abort', ()=>{
                        clearTimeout(timeout);
                        reject(new Error('Polling aborted'));
                    });
                });
            }
        }
    }
    // Max attempts reached
    return {
        paid: false,
        status: 'timeout',
        message: 'Payment verification timed out. Please check your email for confirmation or contact support.'
    };
}
function verifyWebhookSignature(payload, signature, secret) {
    const hmac = __turbopack_context__.r("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)").createHmac('sha256', secret).update(payload).digest('base64');
    return hmac === signature;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PaymentVerification",
    ()=>PaymentVerification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$orderStatusService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/orderStatusService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function PaymentVerification({ orderId, onComplete, className = '' }) {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('checking');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Checking payment status...');
    const [attempts, setAttempts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [maxAttempts, setMaxAttempts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(60);
    const [isPolling, setIsPolling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentVerification.useEffect": ()=>{
            const abortController = new AbortController();
            const checkPayment = {
                "PaymentVerification.useEffect.checkPayment": async ()=>{
                    try {
                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$orderStatusService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pollOrderStatus"])(orderId, 60, 5000, {
                            "PaymentVerification.useEffect.checkPayment": (update)=>{
                                if (!abortController.signal.aborted) {
                                    setMessage(update.message);
                                    setAttempts({
                                        "PaymentVerification.useEffect.checkPayment": (prev)=>prev + 1
                                    }["PaymentVerification.useEffect.checkPayment"]);
                                    // Update status based on payment status
                                    if (update.paid) {
                                        setStatus('paid');
                                        setIsPolling(false);
                                    } else if ([
                                        'cancelled',
                                        'failed',
                                        'refunded'
                                    ].includes(update.status)) {
                                        setStatus('failed');
                                        setIsPolling(false);
                                    }
                                }
                            }
                        }["PaymentVerification.useEffect.checkPayment"], abortController.signal);
                        if (!abortController.signal.aborted) {
                            if (result.paid) {
                                setStatus('paid');
                                onComplete?.(true);
                            } else if (result.status === 'timeout') {
                                setStatus('timeout');
                                setMessage(result.message);
                                setIsPolling(false);
                            } else if ([
                                'cancelled',
                                'failed',
                                'refunded'
                            ].includes(result.status)) {
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
                }
            }["PaymentVerification.useEffect.checkPayment"];
            checkPayment();
            return ({
                "PaymentVerification.useEffect": ()=>{
                    abortController.abort();
                }
            })["PaymentVerification.useEffect"];
        }
    }["PaymentVerification.useEffect"], [
        orderId,
        onComplete
    ]);
    const handleRetry = ()=>{
        setStatus('checking');
        setMessage('Checking payment status...');
        setAttempts(0);
        setIsPolling(true);
    };
    const getStatusIcon = ()=>{
        switch(status){
            case 'paid':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    className: "w-16 h-16 text-green-600"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                    lineNumber: 97,
                    columnNumber: 16
                }, this);
            case 'failed':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                    className: "w-16 h-16 text-red-600"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                    lineNumber: 99,
                    columnNumber: 16
                }, this);
            case 'timeout':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: "w-16 h-16 text-amber-600"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                    lineNumber: 101,
                    columnNumber: 16
                }, this);
            case 'checking':
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "w-16 h-16 text-blue-600 animate-spin"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                    lineNumber: 104,
                    columnNumber: 16
                }, this);
        }
    };
    const getBackgroundColor = ()=>{
        switch(status){
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-gradient-to-br ${getBackgroundColor()} rounded-lg border-2 p-6 ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center text-center space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 bg-white rounded-full shadow-md",
                    children: getStatusIcon()
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold text-gray-900",
                            children: [
                                status === 'paid' && 'Payment Successful!',
                                status === 'failed' && 'Payment Failed',
                                status === 'timeout' && 'Verification Timeout',
                                status === 'checking' && 'Verifying Payment...'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700",
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this),
                status === 'checking' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-xs space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between text-sm text-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Checking payment status..."
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        Math.min(attempts, maxAttempts),
                                        " / ",
                                        maxAttempts
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                            lineNumber: 144,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full bg-gray-200 rounded-full h-2 overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-600 h-full transition-all duration-300 ease-out",
                                style: {
                                    width: `${attempts / maxAttempts * 100}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                            lineNumber: 148,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500",
                            children: "This may take a few minutes. You can leave this page and check your email."
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                    lineNumber: 143,
                    columnNumber: 11
                }, this),
                status === 'timeout' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleRetry,
                            className: "flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all font-semibold shadow-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                                    lineNumber: 167,
                                    columnNumber: 15
                                }, this),
                                "Check Again"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                            lineNumber: 163,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-600 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Or contact our support team:"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://lin.ee/v86CTkq",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-blue-600 hover:text-blue-800 font-semibold",
                                    children: "LINE: @Sakwood"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                    lineNumber: 162,
                    columnNumber: 11
                }, this),
                status === 'paid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-gray-600 space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold",
                            children: [
                                "Order Number: #",
                                orderId
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "You will receive an email confirmation shortly."
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                            lineNumber: 188,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
                    lineNumber: 186,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
            lineNumber: 124,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_s(PaymentVerification, "z8N+5RYZLXXibQ/J/tujKCGplhU=");
_c = PaymentVerification;
var _c;
__turbopack_context__.k.register(_c, "PaymentVerification");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderSuccess",
    ()=>OrderSuccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$PaymentVerification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/checkout/PaymentVerification.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function OrderSuccess({ lang, dictionary, orderId }) {
    _s();
    const { common, order_success } = dictionary;
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paymentVerified, setPaymentVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderSuccess.useEffect": ()=>{
            setMounted(true);
        }
    }["OrderSuccess.useEffect"], []);
    if (!mounted) {
        return null;
    }
    const breadcrumbItems = [
        {
            name: common.home,
            href: `/${lang}`
        },
        {
            name: order_success.page_title,
            href: `/${lang}/checkout/success`
        }
    ];
    const numericOrderId = orderId ? parseInt(orderId) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Breadcrumbs"], {
                items: breadcrumbItems,
                lang: lang
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-3xl mx-auto px-6 space-y-6",
                children: [
                    numericOrderId && !paymentVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$PaymentVerification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentVerification"], {
                        orderId: numericOrderId,
                        onComplete: (paid)=>setPaymentVerified(paid)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow-lg p-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-10 h-10 text-green-600",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M5 13l4 4L19 7"
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                            lineNumber: 73,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl md:text-4xl font-bold text-blue-900 mb-4",
                                children: order_success.thank_you
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl text-gray-600 mb-8",
                                children: order_success.order_placed
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            orderId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50 rounded-lg p-6 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 mb-2",
                                        children: order_success.order_number
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold text-blue-900",
                                        children: [
                                            "#",
                                            orderId
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mb-8",
                                children: order_success.email_confirmation
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-4 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/${lang}`,
                                        className: "px-8 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none",
                                        children: order_success.continue_shopping
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    orderId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/${lang}/order-details/${orderId}`,
                                        className: "px-8 py-3 border-2 border-blue-900 text-blue-900 font-bold hover:bg-blue-50 transition-all uppercase tracking-wide rounded-none",
                                        children: order_success.view_order
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-8 text-sm text-gray-500",
                                children: order_success.contact_support
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(OrderSuccess, "GVbXWR08dqh/zu7Jtixy0mmjdbw=");
_c = OrderSuccess;
var _c;
__turbopack_context__.k.register(_c, "OrderSuccess");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/components/checkout/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$PromptPayQR$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$OrderSuccess$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/checkout/OrderSuccess.tsx [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PromptPayInstructions",
    ()=>PromptPayInstructions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scan$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/scan.js [app-client] (ecmascript) <export default as Scan>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
'use client';
;
;
function PromptPayInstructions({ className = '' }) {
    const steps = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                lineNumber: 12,
                columnNumber: 13
            }, this),
            title: 'Open your banking app',
            description: 'Launch your mobile banking app (e.g., K Plus, SCB Easy, Krungthai NEXT)'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scan$3e$__["Scan"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, this),
            title: 'Scan the QR code',
            description: 'Select "Scan QR" or "PromptPay" in your app and scan the code above'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            title: 'Confirm payment',
            description: 'Verify the amount and merchant details, then confirm the transaction'
        }
    ];
    const apps = [
        {
            name: 'K Plus',
            color: 'bg-green-600'
        },
        {
            name: 'SCB Easy',
            color: 'bg-purple-600'
        },
        {
            name: 'Krungthai NEXT',
            color: 'bg-red-600'
        },
        {
            name: 'Bualuang mBanking',
            color: 'bg-blue-600'
        },
        {
            name: 'Krungsri Mobile',
            color: 'bg-yellow-500'
        },
        {
            name: 'CIMB Clicks',
            color: 'bg-red-500'
        },
        {
            name: 'GSB Super App',
            color: 'bg-blue-500'
        },
        {
            name: 'TTB Touch',
            color: 'bg-orange-500'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `space-y-4 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-blue-900 mb-4 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            "How to Pay with PromptPay"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: steps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm",
                                        children: index + 1
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-0.5 text-blue-700",
                                                    children: step.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                                    lineNumber: 56,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-semibold text-blue-900",
                                                            children: step.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                                            lineNumber: 60,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: step.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                                            lineNumber: 61,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                            lineNumber: 55,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg p-4 border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3 text-center",
                        children: "Supported Banking Apps"
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 justify-center",
                        children: apps.map((app)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `px-3 py-1.5 ${app.color} text-white text-xs font-medium rounded-full shadow-sm`,
                                children: app.name
                            }, app.name, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-amber-50 border border-amber-200 rounded-lg p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold text-amber-800 mb-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            "Important Notice"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "text-sm text-amber-700 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "• QR code is valid for this transaction only"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "• Please ensure the amount matches before confirming"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "• Payment confirmation may take 1-3 business days"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "• Keep your payment slip for reference"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = PromptPayInstructions;
var _c;
__turbopack_context__.k.register(_c, "PromptPayInstructions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProvinceSearch",
    ()=>ProvinceSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ProvinceSearch({ provinces, value, onChange, placeholder = 'Search province...', lang = 'th', disabled = false }) {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [highlightedIndex, setHighlightedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Display name for selected value
    const displayName = value || '';
    // Filter provinces based on search query
    const filteredProvinces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProvinceSearch.useCallback[filteredProvinces]": ()=>{
            if (!searchQuery) {
                return provinces.slice(0, 10); // Show first 10 when no search
            }
            const query = searchQuery.toLowerCase();
            return provinces.filter({
                "ProvinceSearch.useCallback[filteredProvinces]": (province)=>province.toLowerCase().includes(query)
            }["ProvinceSearch.useCallback[filteredProvinces]"]).slice(0, 10); // Max 10 results
        }
    }["ProvinceSearch.useCallback[filteredProvinces]"], [
        provinces,
        searchQuery
    ]);
    const results = filteredProvinces();
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProvinceSearch.useEffect": ()=>{
            const handleClickOutside = {
                "ProvinceSearch.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !inputRef.current?.contains(event.target)) {
                        setIsOpen(false);
                    }
                }
            }["ProvinceSearch.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "ProvinceSearch.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["ProvinceSearch.useEffect"];
        }
    }["ProvinceSearch.useEffect"], []);
    // Handle keyboard navigation
    const handleKeyDown = (e)=>{
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                setIsOpen(true);
                e.preventDefault();
            }
            return;
        }
        switch(e.key){
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev)=>prev < results.length - 1 ? prev + 1 : prev);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev)=>prev > 0 ? prev - 1 : 0);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && results[highlightedIndex]) {
                    handleSelect(results[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
        }
    };
    // Handle selecting a province
    const handleSelect = (province)=>{
        onChange(province);
        setSearchQuery('');
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
    };
    // Handle clearing selection
    const handleClear = ()=>{
        onChange('');
        setSearchQuery('');
        inputRef.current?.focus();
    };
    // Handle input focus
    const handleFocus = ()=>{
        if (!disabled) {
            setIsOpen(true);
        }
    };
    // Highlight matching text
    const highlightMatch = (text, query)=>{
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index)=>regex.test(part) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mark", {
                className: "bg-yellow-200 text-gray-900 rounded px-0.5",
                children: part
            }, index, false, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this) : part);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "h-4 w-4 text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "text",
                        value: isOpen ? searchQuery : displayName,
                        onChange: (e)=>setSearchQuery(e.target.value),
                        onFocus: handleFocus,
                        onKeyDown: handleKeyDown,
                        disabled: disabled,
                        placeholder: placeholder,
                        className: "w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 placeholder:text-gray-400",
                        autoComplete: "off"
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    value && !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleClear,
                        className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this),
                    !value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            className: "h-4 w-4 text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto",
                children: results.length > 0 ? results.map((province, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>handleSelect(province),
                        onMouseEnter: ()=>setHighlightedIndex(index),
                        className: `w-full px-4 py-2 text-left text-sm transition-colors ${highlightedIndex === index ? 'bg-blue-50 text-blue-900' : value === province ? 'bg-green-50 text-green-900 font-medium' : 'text-gray-900 hover:bg-gray-50'}`,
                        children: highlightMatch(province, searchQuery)
                    }, province, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                        lineNumber: 182,
                        columnNumber: 15
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-3 text-sm text-gray-500 text-center",
                    children: lang === 'th' ? 'ไม่พบจังหวัด' : 'No provinces found'
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                    lineNumber: 199,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                lineNumber: 179,
                columnNumber: 9
            }, this),
            value && !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "hidden",
                name: "province",
                value: value
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
                lineNumber: 208,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s(ProvinceSearch, "oFYj9NtRPrIexaokGzq2KttAWJw=");
_c = ProvinceSearch;
var _c;
__turbopack_context__.k.register(_c, "ProvinceSearch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/services/deliveryService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Delivery rate calculation service
// Warehouse location: Pathumtani, Thailand
// Rates are loaded from DeliveryRate.csv
__turbopack_context__.s([
    "TruckType",
    ()=>TruckType,
    "calculateShippingCost",
    ()=>calculateShippingCost,
    "determineTruckType",
    ()=>determineTruckType,
    "getAllProvinces",
    ()=>getAllProvinces,
    "getShippingRate",
    ()=>getShippingRate,
    "getShippingZones",
    ()=>getShippingZones,
    "getTruckTypeName",
    ()=>getTruckTypeName,
    "getTruckTypeSurcharge",
    ()=>getTruckTypeSurcharge
]);
var TruckType = /*#__PURE__*/ function(TruckType) {
    TruckType["SMALL"] = "small";
    TruckType["MEDIUM"] = "medium";
    TruckType["LARGE"] = "large";
    return TruckType;
}({});
// Parsed delivery rates from CSV
const DELIVERY_RATES = [
    // Zone 1: Bangkok Metropolitan Area (6W)
    {
        province: 'Pathumtani',
        rate: 5000,
        estimatedDays: '1'
    },
    {
        province: 'Nonthaburi',
        rate: 5000,
        estimatedDays: '1-2'
    },
    {
        province: 'Samut Prakan',
        rate: 5000,
        estimatedDays: '1-2'
    },
    {
        province: 'Nakhon Pathom',
        rate: 5000,
        estimatedDays: '1-2'
    },
    {
        province: 'Samut Sakhon',
        rate: 5000,
        estimatedDays: '1-2'
    },
    {
        province: 'Phra Nakhon Si Ayutthaya',
        rate: 6500,
        estimatedDays: '2-3'
    },
    {
        province: 'Ang Thong',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Lopburi',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Saraburi',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Sing Buri',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Chai Nat',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Suphan Buri',
        rate: 2000,
        estimatedDays: '2-3'
    },
    // Zone 2: Central Region (10W)
    {
        province: 'Kanchanaburi',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Ratchaburi',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Phetchaburi',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Prachuap Khiri Khan',
        rate: 3000,
        estimatedDays: '3-4'
    },
    {
        province: 'Chonburi',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Rayong',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Chanthaburi',
        rate: 3000,
        estimatedDays: '3-4'
    },
    {
        province: 'Trat',
        rate: 3000,
        estimatedDays: '3-4'
    },
    {
        province: 'Chachoengsao',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Prachinburi',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Sa Kaeo',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Nakhon Nayok',
        rate: 2000,
        estimatedDays: '2-3'
    },
    // Zone 3: Northern Region (6W)
    {
        province: 'Kamphaeng Phet',
        rate: 4000,
        estimatedDays: '3-4'
    },
    {
        province: 'Tak',
        rate: 4000,
        estimatedDays: '3-4'
    },
    {
        province: 'Uthai Thani',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Nakhon Sawan',
        rate: 3000,
        estimatedDays: '2-3'
    },
    {
        province: 'Phichit',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Phitsanulok',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Phichai',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Phetchabun',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Chiang Mai',
        rate: 7500,
        estimatedDays: '4-5'
    },
    {
        province: 'Lamphun',
        rate: 7500,
        estimatedDays: '4-5'
    },
    {
        province: 'Lampang',
        rate: 7500,
        estimatedDays: '4-5'
    },
    {
        province: 'Uttaradit',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Phrae',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Nan',
        rate: 7500,
        estimatedDays: '4-5'
    },
    {
        province: 'Phayao',
        rate: 7500,
        estimatedDays: '4-5'
    },
    {
        province: 'Chiang Rai',
        rate: 9000,
        estimatedDays: '4-5'
    },
    {
        province: 'Mae Hong Son',
        rate: 10000,
        estimatedDays: '5-6'
    },
    // Zone 4: Northeastern Region (6W)
    {
        province: 'Nakhon Ratchasima',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Buri Ram',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Surin',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Sisaket',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Ubon Ratchathani',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Yasothon',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Chaiyaphum',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Amnat Charoen',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Nong Bua Lamphu',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Khon Kaen',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Udon Thani',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Loei',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Nong Khai',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Maha Sarakham',
        rate: 5000,
        estimatedDays: '4-5'
    },
    {
        province: 'Roi Et',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Kalasin',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Sakon Nakhon',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Nakhon Phanom',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Mukdahan',
        rate: 4000,
        estimatedDays: '4-5'
    },
    // Zone 5: Southern Region (6W)
    {
        province: 'Chumphon',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Ranong',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Surat Thani',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Phangnga',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Phuket',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Krabi',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Phatthalung',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Trang',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Satun',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Songkhla',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Yala',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Narathiwat',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Pattani',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Nakhon Si Thammarat',
        rate: 4500,
        estimatedDays: '4-5'
    }
];
function getShippingRate(province) {
    const normalizedProvince = province.toLowerCase().trim();
    const rate = DELIVERY_RATES.find((r)=>r.province.toLowerCase() === normalizedProvince);
    return rate || {
        province,
        rate: 6000,
        estimatedDays: '5-7'
    };
}
function getAllProvinces() {
    return DELIVERY_RATES.map((rate)=>rate.province).sort();
}
function determineTruckType(items) {
    let totalLength = 0;
    let totalVolume = 0;
    items.forEach((item)=>{
        const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : item.length || 0;
        const volume = item.volume || 0;
        totalLength += length * item.quantity;
        totalVolume += volume * item.quantity;
    });
    // Large truck needed if:
    // - Any single item is 6 meters or longer, OR
    // - Total length exceeds 12 meters, OR
    // - Total volume exceeds 5 cubic meters
    const hasLongItem = items.some((item)=>{
        const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : item.length || 0;
        return length >= 6;
    });
    const totalLengthExceedsLimit = totalLength > 12;
    const totalVolumeExceedsLimit = totalVolume > 5;
    if (hasLongItem || totalLengthExceedsLimit || totalVolumeExceedsLimit) {
        return "large";
    }
    // Medium truck needed if:
    // - Any single item is 3-6 meters, OR
    // - Total length exceeds 6 meters, OR
    // - Total volume exceeds 2 cubic meters
    const hasMediumItem = items.some((item)=>{
        const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : item.length || 0;
        return length >= 3 && length < 6;
    });
    const totalLengthExceedsMedium = totalLength > 6;
    const totalVolumeExceedsMedium = totalVolume > 2;
    if (hasMediumItem || totalLengthExceedsMedium || totalVolumeExceedsMedium) {
        return "medium";
    }
    return "small";
}
function getTruckTypeSurcharge(truckType) {
    switch(truckType){
        case "small":
            return 0;
        case "medium":
            return 500;
        case "large":
            return 1500;
        default:
            return 0;
    }
}
function getTruckTypeName(truckType) {
    switch(truckType){
        case "small":
            return 'Small Truck (6-wheel)';
        case "medium":
            return 'Medium Truck (10-wheel)';
        case "large":
            return 'Large Truck (10-wheel)';
        default:
            return 'Standard Truck';
    }
}
/**
 * Get price tier based on order value
 * @param cartTotal - Total cart value
 * @returns Price tier multiplier
 */ function getPriceTier(cartTotal) {
    if (cartTotal >= 250000) return 0.9; // 250k-300k: 10% discount
    if (cartTotal >= 200000) return 0.95; // 200k-250k: 5% discount
    if (cartTotal >= 150000) return 1.0; // 150k-200k: no discount
    if (cartTotal >= 100000) return 1.05; // 100k-150k: 5% surcharge
    if (cartTotal >= 75000) return 1.1; // 75k-100k: 10% surcharge
    if (cartTotal >= 50000) return 1.15; // 50k-75k: 15% surcharge
    if (cartTotal >= 25000) return 1.2; // 25k-50k: 20% surcharge
    if (cartTotal >= 10000) return 1.25; // 10k-25k: 25% surcharge
    return 1.0; // 0-10k: 25% surcharge
}
function calculateShippingCost(province, cartTotal, items) {
    const rate = getShippingRate(province);
    const truckType = items ? determineTruckType(items) : "small";
    const truckSurcharge = getTruckTypeSurcharge(truckType);
    const priceTier = cartTotal ? getPriceTier(cartTotal) : 1.0;
    // Free shipping for orders over 10,000 THB
    if (cartTotal && cartTotal >= 10000) {
        return {
            cost: 0,
            truckType,
            truckTypeName: getTruckTypeName(truckType),
            priceTier: 'Free'
        };
    }
    const baseCost = rate.rate + truckSurcharge;
    const totalCost = baseCost * priceTier;
    return {
        cost: totalCost,
        truckType,
        truckTypeName: getTruckTypeName(truckType),
        priceTier: priceTier === 1.0 ? 'Standard' : `${Math.round((1 - priceTier) * 100)}% ${priceTier < 1 ? 'Discount' : 'Surcharge'}`
    };
}
function getShippingZones() {
    const zones = [
        {
            name: 'Bangkok Metropolitan Area',
            rate: 5000,
            days: '1-2'
        },
        {
            name: 'Central Region',
            rate: 2500,
            days: '2-3'
        },
        {
            name: 'Northern Region',
            rate: 7500,
            days: '4-5'
        },
        {
            name: 'Northeastern Region',
            rate: 4000,
            days: '4-5'
        },
        {
            name: 'Southern Region',
            rate: 5000,
            days: '5-6'
        }
    ];
    return zones.map((zone)=>({
            zone: zone.name,
            provinces: DELIVERY_RATES.filter((r)=>r.rate === zone.rate).map((r)=>r.province),
            rate: zone.rate,
            estimatedDays: zone.days
        }));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/hooks/useFormPersistence.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isLocalStorageAvailable",
    ()=>isLocalStorageAvailable,
    "useFormPersistence",
    ()=>useFormPersistence
]);
/**
 * Form persistence hook for auto-saving checkout data to localStorage
 * Prevents data loss if user navigates away or page reloads
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const STORAGE_VERSION = 1;
const DEFAULT_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
function useFormPersistence(formKey, expiryMs = DEFAULT_EXPIRY_MS) {
    _s();
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /**
   * Save form data to localStorage with timestamp
   */ const saveForm = (data)=>{
        try {
            const storageData = {
                data: {
                    ...data,
                    timestamp: Date.now()
                },
                version: STORAGE_VERSION
            };
            localStorage.setItem(formKey, JSON.stringify(storageData));
        } catch (error) {
            // Silently fail if localStorage is not available
            console.warn('Failed to save form data to localStorage:', error);
        }
    };
    /**
   * Load form data from localStorage if not expired
   */ const loadForm = ()=>{
        try {
            const stored = localStorage.getItem(formKey);
            if (!stored) {
                return null;
            }
            const parsed = JSON.parse(stored);
            // Check version compatibility
            if (parsed.version !== STORAGE_VERSION) {
                clearForm();
                return null;
            }
            // Check expiration
            const age = Date.now() - parsed.data.timestamp;
            if (age > expiryMs) {
                clearForm();
                return null;
            }
            // Return data without timestamp
            const { timestamp, ...formData } = parsed.data;
            return formData;
        } catch (error) {
            console.warn('Failed to load form data from localStorage:', error);
            clearForm();
            return null;
        }
    };
    /**
   * Clear saved form data from localStorage
   */ const clearForm = ()=>{
        try {
            localStorage.removeItem(formKey);
        } catch (error) {
            console.warn('Failed to clear form data from localStorage:', error);
        }
    };
    /**
   * Check if saved form data exists and is valid
   */ const hasSavedForm = ()=>{
        try {
            const stored = localStorage.getItem(formKey);
            if (!stored) {
                return false;
            }
            const parsed = JSON.parse(stored);
            // Check version compatibility
            if (parsed.version !== STORAGE_VERSION) {
                return false;
            }
            // Check expiration
            const age = Date.now() - parsed.data.timestamp;
            return age <= expiryMs;
        } catch (error) {
            return false;
        }
    };
    /**
   * Get age of saved form data in minutes
   */ const getFormAge = ()=>{
        try {
            const stored = localStorage.getItem(formKey);
            if (!stored) {
                return null;
            }
            const parsed = JSON.parse(stored);
            return Math.floor((Date.now() - parsed.data.timestamp) / (1000 * 60)); // minutes
        } catch (error) {
            return null;
        }
    };
    return {
        saveForm,
        loadForm,
        clearForm,
        hasSavedForm,
        getFormAge,
        isLoaded,
        setIsLoaded
    };
}
_s(useFormPersistence, "IYJBVyHsXBw9t28YX/YBiMCcttM=");
function isLocalStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch  {
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/utils/formValidation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Form validation utilities for Sakwood checkout
 * Thai-specific validation for phone numbers and postal codes
 */ __turbopack_context__.s([
    "validateEmail",
    ()=>validateEmail,
    "validateField",
    ()=>validateField,
    "validateMaxLength",
    ()=>validateMaxLength,
    "validateMinLength",
    ()=>validateMinLength,
    "validateRequired",
    ()=>validateRequired,
    "validateThaiPhone",
    ()=>validateThaiPhone,
    "validateThaiPostalCode",
    ()=>validateThaiPostalCode
]);
function validateEmail(email) {
    if (!email || email.trim() === '') {
        return {
            valid: false,
            error: 'Email is required'
        };
    }
    // Standard email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            valid: false,
            error: 'Please enter a valid email address'
        };
    }
    return {
        valid: true
    };
}
function validateThaiPhone(phone) {
    if (!phone || phone.trim() === '') {
        return {
            valid: false,
            error: 'Phone number is required'
        };
    }
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    // Must be exactly 10 digits
    if (digitsOnly.length !== 10) {
        return {
            valid: false,
            error: 'Please enter a valid Thai phone number (10 digits)'
        };
    }
    // Must start with 0
    if (!digitsOnly.startsWith('0')) {
        return {
            valid: false,
            error: 'Phone number must start with 0'
        };
    }
    return {
        valid: true
    };
}
function validateThaiPostalCode(postalCode) {
    if (!postalCode || postalCode.trim() === '') {
        return {
            valid: false,
            error: 'Postal code is required'
        };
    }
    // Remove all non-digit characters
    const digitsOnly = postalCode.replace(/\D/g, '');
    // Must be exactly 5 digits
    if (digitsOnly.length !== 5) {
        return {
            valid: false,
            error: 'Please enter a 5-digit postal code'
        };
    }
    return {
        valid: true
    };
}
function validateRequired(value, fieldName = 'This field') {
    if (!value || value.trim() === '') {
        return {
            valid: false,
            error: `${fieldName} is required`
        };
    }
    return {
        valid: true
    };
}
function validateMinLength(value, minLength, fieldName = 'This field') {
    if (!value || value.length < minLength) {
        return {
            valid: false,
            error: `${fieldName} must be at least ${minLength} characters`
        };
    }
    return {
        valid: true
    };
}
function validateMaxLength(value, maxLength, fieldName = 'This field') {
    if (value && value.length > maxLength) {
        return {
            valid: false,
            error: `${fieldName} must not exceed ${maxLength} characters`
        };
    }
    return {
        valid: true
    };
}
function validateField(value, validators) {
    for (const validator of validators){
        const result = validator(value);
        if (!result.valid) {
            return result;
        }
    }
    return {
        valid: true
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/services/woocommerceService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// WooCommerce API Service for Sakwood
// Using custom WordPress endpoints - no API keys needed
__turbopack_context__.s([
    "createWooCommerceOrder",
    ()=>createWooCommerceOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
async function createWooCommerceOrder(orderData) {
    try {
        // Use custom endpoint that bypasses WooCommerce REST API authentication
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:8006/wp-json/sakwood/v1") || 'http://localhost:8006/wp-json/sakwood/v1';
        const url = `${baseUrl}/create-order`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Order creation error - Status:', response.status);
            console.error('Order creation error - Response:', errorText);
            // Try to parse error as JSON
            try {
                const errorJson = JSON.parse(errorText);
                console.error('Parsed error JSON:', errorJson);
                throw new Error(errorJson.message || errorJson.code || `HTTP error! status: ${response.status}`);
            } catch  {
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }
        }
        const data = await response.json();
        console.log('Order created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating WooCommerce order:', error);
        throw error;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckoutPage",
    ()=>CheckoutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/checkout/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$PromptPayQR$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/checkout/PromptPayQR.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$PromptPayInstructions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/checkout/PromptPayInstructions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$ProvinceSearch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/checkout/ProvinceSearch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/context/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$deliveryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/deliveryService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$hooks$2f$useFormPersistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/hooks/useFormPersistence.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$utils$2f$formValidation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/utils/formValidation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$woocommerceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/woocommerceService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
function CheckoutPage({ lang, dictionary }) {
    _s();
    const { common, cart, checkout } = dictionary;
    const { items, getCartTotal, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const formInitializedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Form persistence hook
    const { saveForm, loadForm, clearForm, hasSavedForm } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$hooks$2f$useFormPersistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormPersistence"])('sakwood-checkout');
    // Validation state
    const [fieldErrors, setFieldErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [touchedFields, setTouchedFields] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            setMounted(true);
        }
    }["CheckoutPage.useEffect"], []);
    const [selectedProvince, setSelectedProvince] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [paymentConfirmed, setPaymentConfirmed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paymentError, setPaymentError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        lineId: '',
        phone: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        notes: '',
        paymentMethod: 'bank_transfer'
    });
    // Load saved form data on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (mounted && !formInitializedRef.current) {
                const saved = loadForm();
                if (saved) {
                    setFormData({
                        email: saved.email || '',
                        lineId: saved.lineId || '',
                        phone: saved.phone || '',
                        firstName: saved.firstName || '',
                        lastName: saved.lastName || '',
                        address: saved.address || '',
                        city: saved.city || '',
                        postalCode: saved.postalCode || '',
                        notes: saved.notes || '',
                        paymentMethod: saved.paymentMethod || 'bank_transfer'
                    });
                    setSelectedProvince(saved.province || '');
                }
                formInitializedRef.current = true;
            }
        }
    }["CheckoutPage.useEffect"], [
        mounted,
        loadForm
    ]);
    // Auto-save form data on change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (mounted && formInitializedRef.current) {
                saveForm({
                    ...formData,
                    province: selectedProvince
                });
            }
        }
    }["CheckoutPage.useEffect"], [
        formData,
        selectedProvince,
        mounted,
        saveForm
    ]);
    const subtotal = getCartTotal();
    const shippingResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CheckoutPage.useMemo[shippingResult]": ()=>{
            if (selectedProvince) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$deliveryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateShippingCost"])(selectedProvince, subtotal, items);
            }
            return {
                cost: 0,
                truckType: __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$deliveryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TruckType"].SMALL,
                truckTypeName: 'Small Truck (6-wheel)',
                priceTier: 'Standard'
            };
        }
    }["CheckoutPage.useMemo[shippingResult]"], [
        selectedProvince,
        subtotal,
        items
    ]);
    const shippingCost = shippingResult.cost;
    const truckType = shippingResult.truckType;
    const truckTypeName = shippingResult.truckTypeName;
    const priceTier = shippingResult.priceTier;
    const total = subtotal + shippingCost;
    const shippingInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CheckoutPage.useMemo[shippingInfo]": ()=>{
            if (selectedProvince) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$deliveryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getShippingRate"])(selectedProvince);
            }
            return null;
        }
    }["CheckoutPage.useMemo[shippingInfo]"], [
        selectedProvince
    ]);
    const provinces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$deliveryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllProvinces"])();
    // Field validation function
    const validateField = (name, value)=>{
        // Use dictionary keys for error messages if available
        const errorMessages = {
            email: checkout.invalid_email || 'Please enter a valid email address',
            phone: checkout.invalid_phone || 'Please enter a valid Thai phone number (e.g., 081-234-5678)',
            postalCode: checkout.invalid_postal_code || 'Please enter a 5-digit postal code',
            firstName: checkout.field_required?.replace('This field', 'First name') || 'First name is required',
            lastName: checkout.field_required?.replace('This field', 'Last name') || 'Last name is required',
            address: checkout.field_required?.replace('This field', 'Address') || 'Address is required',
            city: checkout.field_required?.replace('This field', 'City') || 'City is required'
        };
        switch(name){
            case 'email':
                const emailResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$utils$2f$formValidation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateEmail"])(value);
                return emailResult.valid ? null : errorMessages.email;
            case 'phone':
                const phoneResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$utils$2f$formValidation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateThaiPhone"])(value);
                return phoneResult.valid ? null : errorMessages.phone;
            case 'postalCode':
                const postalResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$utils$2f$formValidation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateThaiPostalCode"])(value);
                return postalResult.valid ? null : errorMessages.postalCode;
            case 'firstName':
            case 'lastName':
            case 'address':
            case 'city':
                {
                    const requiredResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$utils$2f$formValidation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateRequired"])(value, name === 'firstName' ? 'First name' : name === 'lastName' ? 'Last name' : name);
                    return requiredResult.valid ? null : errorMessages[name];
                }
            default:
                return null;
        }
    };
    // Handle blur validation
    const handleBlur = (fieldName)=>{
        setTouchedFields((prev)=>new Set(prev).add(fieldName));
        const error = validateField(fieldName, formData[fieldName]);
        setFieldErrors((prev)=>({
                ...prev,
                [fieldName]: error || ''
            }));
    };
    const handleProvinceChange = (province)=>{
        setSelectedProvince(province);
    };
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error for this field if user is typing
        if (touchedFields.has(name)) {
            const error = validateField(name, value);
            setFieldErrors((prev)=>({
                    ...prev,
                    [name]: error || ''
                }));
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // Prevent double submission
        if (isSubmitting) {
            return;
        }
        // Validate all required fields
        const requiredFields = [
            'email',
            'phone',
            'firstName',
            'lastName',
            'address',
            'city',
            'postalCode'
        ];
        const errors = {};
        for (const field of requiredFields){
            const error = validateField(field, formData[field]);
            if (error) {
                errors[field] = error;
            }
        }
        // Validate province
        if (!selectedProvince) {
            errors.province = checkout.field_required?.replace('This field', 'Province') || 'Please select a province';
        }
        // Validate PromptPay confirmation
        if (formData.paymentMethod === 'promptpay' && !paymentConfirmed) {
            setPaymentError(checkout.confirm_payment_error);
            return;
        }
        // Set all fields as touched
        setTouchedFields(new Set(requiredFields));
        // If there are errors, display them and prevent submission
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            // Scroll to first error
            const firstErrorField = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
            if (firstErrorField) {
                firstErrorField.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                firstErrorField.focus();
            }
            return;
        }
        // Clear any previous payment error
        setPaymentError('');
        setIsSubmitting(true);
        // Map payment method to WooCommerce payment method
        const paymentMethodMap = {
            'bank_transfer': {
                method: 'bacs',
                title: 'Bank Transfer'
            },
            'cash_on_delivery': {
                method: 'cod',
                title: 'Cash on Delivery'
            },
            'promptpay': {
                method: 'promptpay',
                title: 'PromptPay'
            }
        };
        const paymentInfo = paymentMethodMap[formData.paymentMethod] || {
            method: 'bacs',
            title: 'Bank Transfer'
        };
        // Create WooCommerce order data object
        const orderData = {
            payment_method: paymentInfo.method,
            payment_method_title: paymentInfo.title,
            set_paid: false,
            billing: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                address_1: formData.address,
                city: formData.city,
                state: selectedProvince,
                postcode: formData.postalCode,
                email: formData.email,
                phone: formData.phone
            },
            shipping: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                address_1: formData.address,
                city: formData.city,
                state: selectedProvince,
                postcode: formData.postalCode
            },
            line_items: items.map((item)=>({
                    product_id: item.databaseId,
                    quantity: item.quantity
                })),
            shipping_lines: [
                {
                    method_id: 'flat_rate',
                    method_title: truckTypeName || 'Standard Shipping',
                    total: shippingCost.toFixed(2)
                }
            ],
            customer_note: formData.notes + (formData.lineId ? `\n\nLINE ID: ${formData.lineId}` : '')
        };
        try {
            // Submit to WooCommerce API
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$woocommerceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWooCommerceOrder"])(orderData);
            // Clear saved form data and cart after successful order
            clearForm();
            clearCart();
            // Redirect to order success page
            router.push(`/${lang}/checkout/success?orderId=${result.id}`);
        } catch (error) {
            console.error('Error submitting order:', error);
            // Better error messages based on error type
            let errorMessage = 'Failed to submit order. Please try again.';
            if (error instanceof Error) {
                const errorLower = error.message.toLowerCase();
                if (errorLower.includes('network') || errorLower.includes('fetch')) {
                    errorMessage = checkout.network_error || 'Network error. Please check your connection and try again.';
                } else if (errorLower.includes('timeout')) {
                    errorMessage = checkout.timeout_error || 'Request timed out. Please try again.';
                } else {
                    errorMessage = error.message;
                }
            }
            setPaymentError(errorMessage);
            setIsSubmitting(false);
            // Scroll to error message
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };
    const breadcrumbItems = [
        {
            name: common.home,
            href: `/${lang}`
        },
        {
            name: cart.page_title,
            href: `/${lang}/cart`
        },
        {
            name: checkout.page_title,
            href: `/${lang}/checkout`
        }
    ];
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Breadcrumbs"], {
                    items: breadcrumbItems,
                    lang: lang
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                    lineNumber: 366,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg p-12 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-pulse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                    lineNumber: 370,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-4 bg-gray-200 rounded w-1/2 mx-auto"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                    lineNumber: 371,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                        lineNumber: 368,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                    lineNumber: 367,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
            lineNumber: 365,
            columnNumber: 7
        }, this);
    }
    if (items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Breadcrumbs"], {
                    items: breadcrumbItems,
                    lang: lang
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                    lineNumber: 382,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 rounded-lg p-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-gray-600 mb-4",
                                children: "Your cart is empty"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `/${lang}/shop`,
                                className: "inline-block px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all rounded-none uppercase tracking-wide",
                                children: "Continue Shopping"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                        lineNumber: 384,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                    lineNumber: 383,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
            lineNumber: 381,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Breadcrumbs"], {
                items: breadcrumbItems,
                lang: lang
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                lineNumber: 402,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl md:text-4xl font-bold text-blue-900 mb-8",
                        children: checkout.page_title
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this),
                    hasSavedForm() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                                    clipRule: "evenodd"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                    lineNumber: 413,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                lineNumber: 412,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-yellow-800",
                                children: checkout.restore_draft || 'We found your unfinished order. Your information has been restored.'
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                lineNumber: 415,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                        lineNumber: 411,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid lg:grid-cols-3 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-2 space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white rounded-lg shadow-md p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-blue-900 mb-4",
                                                    children: checkout.contact_info
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                    lineNumber: 427,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "email",
                                                                    className: "block text-sm font-semibold text-gray-700 mb-1",
                                                                    children: "Email *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 432,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "email",
                                                                    id: "email",
                                                                    name: "email",
                                                                    required: true,
                                                                    value: formData.email,
                                                                    onChange: handleInputChange,
                                                                    onBlur: ()=>handleBlur('email'),
                                                                    className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${fieldErrors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`,
                                                                    placeholder: "your@email.com"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 435,
                                                                    columnNumber: 21
                                                                }, this),
                                                                touchedFields.has('email') && fieldErrors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-sm text-red-600",
                                                                    children: fieldErrors.email
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 449,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 431,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "lineId",
                                                                    className: "block text-sm font-semibold text-gray-700 mb-1",
                                                                    children: "LINE ID"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 453,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    id: "lineId",
                                                                    name: "lineId",
                                                                    value: formData.lineId,
                                                                    onChange: handleInputChange,
                                                                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
                                                                    placeholder: "your_line_id"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 456,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "phone",
                                                                    className: "block text-sm font-semibold text-gray-700 mb-1",
                                                                    children: [
                                                                        checkout.phone,
                                                                        " *"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 467,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "tel",
                                                                    id: "phone",
                                                                    name: "phone",
                                                                    required: true,
                                                                    value: formData.phone,
                                                                    onChange: handleInputChange,
                                                                    onBlur: ()=>handleBlur('phone'),
                                                                    className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${fieldErrors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`,
                                                                    placeholder: "081-234-5678"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 470,
                                                                    columnNumber: 21
                                                                }, this),
                                                                touchedFields.has('phone') && fieldErrors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-sm text-red-600",
                                                                    children: fieldErrors.phone
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 484,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 466,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                    lineNumber: 430,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                            lineNumber: 426,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white rounded-lg shadow-md p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-blue-900 mb-4",
                                                    children: checkout.shipping_info
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid md:grid-cols-2 gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            htmlFor: "firstName",
                                                                            className: "block text-sm font-semibold text-gray-700 mb-1",
                                                                            children: [
                                                                                checkout.first_name,
                                                                                " *"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 498,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            id: "firstName",
                                                                            name: "firstName",
                                                                            required: true,
                                                                            value: formData.firstName,
                                                                            onChange: handleInputChange,
                                                                            onBlur: ()=>handleBlur('firstName'),
                                                                            className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${fieldErrors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`,
                                                                            placeholder: "John"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 501,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        touchedFields.has('firstName') && fieldErrors.firstName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 text-sm text-red-600",
                                                                            children: fieldErrors.firstName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 515,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 497,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            htmlFor: "lastName",
                                                                            className: "block text-sm font-semibold text-gray-700 mb-1",
                                                                            children: [
                                                                                checkout.last_name,
                                                                                " *"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 519,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            id: "lastName",
                                                                            name: "lastName",
                                                                            required: true,
                                                                            value: formData.lastName,
                                                                            onChange: handleInputChange,
                                                                            onBlur: ()=>handleBlur('lastName'),
                                                                            className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${fieldErrors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`,
                                                                            placeholder: "Doe"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 522,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        touchedFields.has('lastName') && fieldErrors.lastName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 text-sm text-red-600",
                                                                            children: fieldErrors.lastName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 536,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 518,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 496,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "address",
                                                                    className: "block text-sm font-semibold text-gray-700 mb-1",
                                                                    children: [
                                                                        checkout.address,
                                                                        " *"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 541,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    id: "address",
                                                                    name: "address",
                                                                    required: true,
                                                                    value: formData.address,
                                                                    onChange: handleInputChange,
                                                                    onBlur: ()=>handleBlur('address'),
                                                                    className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${fieldErrors.address ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`,
                                                                    placeholder: "123 Street Name"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 544,
                                                                    columnNumber: 21
                                                                }, this),
                                                                touchedFields.has('address') && fieldErrors.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-sm text-red-600",
                                                                    children: fieldErrors.address
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 558,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 540,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "city",
                                                                    className: "block text-sm font-semibold text-gray-700 mb-1",
                                                                    children: [
                                                                        checkout.city,
                                                                        " *"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 562,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    id: "city",
                                                                    name: "city",
                                                                    required: true,
                                                                    value: formData.city,
                                                                    onChange: handleInputChange,
                                                                    onBlur: ()=>handleBlur('city'),
                                                                    className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${fieldErrors.city ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`,
                                                                    placeholder: "Bangkok"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 565,
                                                                    columnNumber: 21
                                                                }, this),
                                                                touchedFields.has('city') && fieldErrors.city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-sm text-red-600",
                                                                    children: fieldErrors.city
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 579,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 561,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid md:grid-cols-2 gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            htmlFor: "province",
                                                                            className: "block text-sm font-semibold text-gray-700 mb-1",
                                                                            children: [
                                                                                checkout.province,
                                                                                " *"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 584,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$ProvinceSearch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProvinceSearch"], {
                                                                            provinces: provinces,
                                                                            value: selectedProvince,
                                                                            onChange: handleProvinceChange,
                                                                            placeholder: checkout.search_province || checkout.select_province,
                                                                            lang: lang
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 587,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        fieldErrors.province && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 text-sm text-red-600",
                                                                            children: fieldErrors.province
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 595,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 583,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            htmlFor: "postalCode",
                                                                            className: "block text-sm font-semibold text-gray-700 mb-1",
                                                                            children: [
                                                                                checkout.postal_code,
                                                                                " *"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 599,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            id: "postalCode",
                                                                            name: "postalCode",
                                                                            required: true,
                                                                            value: formData.postalCode,
                                                                            onChange: handleInputChange,
                                                                            onBlur: ()=>handleBlur('postalCode'),
                                                                            className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${fieldErrors.postalCode ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`,
                                                                            placeholder: "10110"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 602,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        touchedFields.has('postalCode') && fieldErrors.postalCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 text-sm text-red-600",
                                                                            children: fieldErrors.postalCode
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 616,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 598,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "notes",
                                                                    className: "block text-sm font-semibold text-gray-700 mb-1",
                                                                    children: checkout.notes
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 621,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                    id: "notes",
                                                                    name: "notes",
                                                                    rows: 3,
                                                                    value: formData.notes,
                                                                    onChange: handleInputChange,
                                                                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none",
                                                                    placeholder: "Special instructions for delivery..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 624,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 620,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                            lineNumber: 491,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white rounded-lg shadow-md p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-blue-900 mb-4",
                                                    children: checkout.payment_method
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "radio",
                                                                    name: "payment",
                                                                    value: "bank_transfer",
                                                                    checked: formData.paymentMethod === 'bank_transfer',
                                                                    onChange: ()=>setFormData({
                                                                            ...formData,
                                                                            paymentMethod: 'bank_transfer'
                                                                        }),
                                                                    className: "w-4 h-4 text-blue-900 focus:ring-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 644,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold text-gray-900",
                                                                            children: checkout.bank_transfer
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 653,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-gray-500",
                                                                            children: checkout.bank_transfer_desc
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 654,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 652,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 643,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "radio",
                                                                    name: "payment",
                                                                    value: "cash_on_delivery",
                                                                    checked: formData.paymentMethod === 'cash_on_delivery',
                                                                    onChange: ()=>setFormData({
                                                                            ...formData,
                                                                            paymentMethod: 'cash_on_delivery'
                                                                        }),
                                                                    className: "w-4 h-4 text-blue-900 focus:ring-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 658,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold text-gray-900",
                                                                            children: checkout.cash_on_delivery
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 667,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-gray-500",
                                                                            children: checkout.cash_on_delivery_desc
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 668,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 666,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 657,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "radio",
                                                                    name: "payment",
                                                                    value: "promptpay",
                                                                    checked: formData.paymentMethod === 'promptpay',
                                                                    onChange: ()=>setFormData({
                                                                            ...formData,
                                                                            paymentMethod: 'promptpay'
                                                                        }),
                                                                    className: "w-4 h-4 text-blue-900 focus:ring-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 672,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold text-gray-900",
                                                                            children: checkout.promptpay
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 681,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-gray-500",
                                                                            children: checkout.promptpay_desc
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 682,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 680,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 671,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                    lineNumber: 642,
                                                    columnNumber: 17
                                                }, this),
                                                formData.paymentMethod === 'promptpay' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 space-y-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 border border-blue-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-lg font-bold text-blue-900 mb-4 text-center",
                                                                    children: checkout.scan_qr
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 691,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$PromptPayQR$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PromptPayQR"], {
                                                                        merchantId: "0225559000467",
                                                                        amount: total,
                                                                        size: 280,
                                                                        showMerchantInfo: true,
                                                                        orderRef: `ORDER-${Date.now()}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                        lineNumber: 693,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 692,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 690,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$checkout$2f$PromptPayInstructions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PromptPayInstructions"], {}, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 704,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-white rounded-lg p-4 border border-gray-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "flex items-start gap-3 cursor-pointer",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "checkbox",
                                                                            checked: paymentConfirmed,
                                                                            onChange: (e)=>{
                                                                                setPaymentConfirmed(e.target.checked);
                                                                                if (e.target.checked) {
                                                                                    setPaymentError('');
                                                                                }
                                                                            },
                                                                            className: "mt-1 w-5 h-5 text-blue-900 focus:ring-blue-500 rounded"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 709,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm text-gray-700",
                                                                            children: checkout.confirm_payment
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                            lineNumber: 720,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 708,
                                                                    columnNumber: 23
                                                                }, this),
                                                                paymentError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-3 text-sm text-red-600 font-semibold bg-red-50 p-2 rounded",
                                                                    children: paymentError
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 725,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 707,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                    lineNumber: 689,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                            lineNumber: 638,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-lg shadow-md p-6 sticky top-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-bold text-blue-900 mb-4",
                                                children: cart.order_summary
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                lineNumber: 738,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-600",
                                                                children: [
                                                                    cart.subtotal,
                                                                    ":"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                lineNumber: 744,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-blue-900",
                                                                children: subtotal.toFixed(2)
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                lineNumber: 745,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                        lineNumber: 743,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-600",
                                                                children: [
                                                                    cart.shipping,
                                                                    ":"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                lineNumber: 751,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-blue-900",
                                                                children: shippingCost === 0 && subtotal >= 10000 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-green-600",
                                                                    children: checkout.free_shipping
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                    lineNumber: 754,
                                                                    columnNumber: 25
                                                                }, this) : `${shippingCost.toFixed(2)}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                lineNumber: 752,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                        lineNumber: 750,
                                                        columnNumber: 19
                                                    }, this),
                                                    priceTier && priceTier !== 'Standard' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-green-600 bg-green-50 p-2 rounded",
                                                        children: priceTier === 'Free' ? checkout.free_shipping : `${checkout.price_tier}: ${priceTier}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 21
                                                    }, this),
                                                    truckTypeName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-blue-600 bg-blue-50 p-2 rounded",
                                                        children: [
                                                            "Truck Type: ",
                                                            truckTypeName
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                        lineNumber: 768,
                                                        columnNumber: 21
                                                    }, this),
                                                    shippingInfo && shippingInfo.estimatedDays && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-500 bg-blue-50 p-2 rounded",
                                                        children: [
                                                            checkout.estimated_delivery,
                                                            ": ",
                                                            shippingInfo.estimatedDays,
                                                            " days"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                        lineNumber: 774,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border-t border-gray-200 pt-3 flex justify-between items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg font-bold text-blue-900",
                                                                children: [
                                                                    cart.total,
                                                                    ":"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                lineNumber: 780,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl font-bold text-blue-900",
                                                                children: total.toFixed(2)
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                lineNumber: 781,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                        lineNumber: 779,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-4 pt-3 border-t border-gray-200 flex justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://lin.ee/v86CTkq",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "inline-block w-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: "https://scdn.line-apps.com/n/line_add_friends/btn/th.png",
                                                                alt: checkout.add_line_friend,
                                                                className: "h-16 w-full object-contain"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                                lineNumber: 793,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                            lineNumber: 787,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                        lineNumber: 786,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                lineNumber: 742,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: isSubmitting,
                                                className: "w-full px-6 py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none disabled:bg-gray-400 disabled:cursor-not-allowed",
                                                children: isSubmitting ? 'Processing...' : checkout.place_order
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                lineNumber: 802,
                                                columnNumber: 17
                                            }, this),
                                            paymentError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: "Order Failed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                        lineNumber: 812,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm",
                                                        children: paymentError
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                        lineNumber: 813,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                lineNumber: 811,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `/${lang}/cart`,
                                                className: "block text-center mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-colors",
                                                children: checkout.back_to_cart
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                                lineNumber: 817,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                        lineNumber: 737,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                                    lineNumber: 736,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                            lineNumber: 422,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
                lineNumber: 404,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/app/[lang]/checkout/CheckoutPage.tsx",
        lineNumber: 401,
        columnNumber: 5
    }, this);
}
_s(CheckoutPage, "iytBPH6XWrOwdHHiJrmi+D6lcxk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$hooks$2f$useFormPersistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormPersistence"]
    ];
});
_c = CheckoutPage;
var _c;
__turbopack_context__.k.register(_c, "CheckoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=sakwood-wp_frontend_48596c93._.js.map