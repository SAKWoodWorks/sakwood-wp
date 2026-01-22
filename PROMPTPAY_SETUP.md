# PromptPay Payment Verification System

This document explains how the automatic PromptPay payment verification works and how to set it up.

## Overview

The PromptPay payment verification system provides three methods for confirming payments:

1. **Automatic Polling** - Frontend automatically checks payment status
2. **Admin Verification** - Manual verification through WordPress admin
3. **Webhook Notifications** - Real-time updates from WooCommerce (optional)

---

## Method 1: Automatic Polling (Frontend)

**How it works:**
- After placing an order, the customer is redirected to the success page
- The `PaymentVerification` component polls the WooCommerce API every 5 seconds
- It checks up to 60 times (5 minutes total)
- When payment is confirmed, the status updates automatically

**User Experience:**
- Shows real-time verification progress
- Displays success message when payment is received
- Allows retry if verification times out
- Can leave page and check email for confirmation

**Files:**
- `lib/services/orderStatusService.ts` - Polling logic
- `components/checkout/PaymentVerification.tsx` - UI component
- `components/checkout/OrderSuccess.tsx` - Success page

---

## Method 2: Admin Verification (Manual)

**How it works:**
- Admin receives notification of new order
- Admin checks bank statement or mobile banking app
- Admin verifies payment matches the order amount
- Admin clicks "Verify Payment" button

**Setup Steps:**

### 1. Install the Plugin

1. Copy `sakwood-integration` folder to WordPress plugins directory:
   ```
   wp-content/plugins/sakwood-integration/
   ```

2. Activate the plugin in WordPress Admin:
   - Go to **Plugins → Installed Plugins**
   - Find "Sakwood Integration"
   - Click **Activate**

### 2. Configure PromptPay Settings

1. Go to **WooCommerce → PromptPay Settings**
2. Enter your PromptPay Merchant ID (phone number or Tax ID)
3. Choose verification options:
   - **Auto-verify**: Not recommended (marks all orders as paid immediately)
   - **Pending status**: Sets orders to "PromptPay Pending" (recommended)

### 3. Verify Payments Manually

When a new order comes in:

1. Go to **WooCommerce → Orders**
2. Click on the order
3. In the "PromptPay Payment Verification" meta box:
   - Review payment details (amount, customer, phone)
   - Check your bank app for the transfer
   - Click **✓ Verify Payment Received**

4. The order status will change to "Processing"
5. Customer will receive email notification
6. Customer's success page will automatically update

### 4. Send Payment Reminders

If payment hasn't been received after 30 minutes:

1. In the order edit screen
2. Click **Send Payment Reminder**
3. Customer receives email with:
   - Order details
   - Amount due
   - Payment instructions

**Files:**
- `wordpress-plugin/sakwood-integration/promptpay-admin.php`
- `wordpress-plugin/sakwood-integration/sakwood-integration.php`

---

## Method 3: Webhook Notifications (Optional)

This requires integration with a payment gateway provider (2C2P, Omise, etc.)

### Setup Webhook in WooCommerce

1. Go to **WooCommerce → Settings → Advanced → Webhooks**
2. Click **Add Webhook**
3. Configure:
   - **Name**: PromptPay Payment Update
   - **Topic**: Order Updated
   - **Delivery URL**: `https://yoursite.com/wp-json/sakwood/v1/webhook/order`
   - **Version**: WP API v3
   - **Secret**: Enter a secret key
4. Save

### Webhook Payload

The webhook receives this data when order status changes:

```json
{
  "id": 123,
  "status": "processing",
  "payment_method": "promptpay",
  "total": "1500.00"
}
```

### Security

Verify webhook signatures using the secret key:

```php
$signature = $_SERVER['HTTP_X_WC_WEBHOOK_SIGNATURE'];
$payload = file_get_contents('php://input');
$valid = hash_hmac('sha256', $payload, $secret) === $signature;
```

**Note**: This requires a payment gateway that supports webhooks. Most Thai banks do not provide this directly. Use Method 1 or 2 instead.

---

## Order Status Flow

```
Order Created
    ↓
[wc-promptpay-pending] PromptPay Pending (if enabled)
    ↓
Customer scans QR and pays
    ↓
[wc-processing] Processing (paid)
    ↓
[wc-completed] Completed (shipped)
```

### Status Meanings

- **Pending**: Order created, waiting for payment
- **PromptPay Pending**: Custom status for PromptPay orders awaiting verification
- **On Hold**: Temporary hold, needs action
- **Processing**: Payment received, order is being prepared
- **Completed**: Order fulfilled and shipped
- **Cancelled**: Order cancelled
- **Refunded**: Payment refunded

---

## Frontend Integration

### Payment Status Polling

The frontend polls the WooCommerce REST API:

```typescript
// lib/services/orderStatusService.ts
export async function pollOrderStatus(
  orderId: number,
  maxAttempts: number = 60,  // 5 minutes
  interval: number = 5000     // 5 seconds
): Promise<OrderCheckResult>
```

### Usage in Component

```tsx
import { PaymentVerification } from '@/components/checkout/PaymentVerification';

<PaymentVerification
  orderId={123}
  onComplete={(paid) => {
    console.log('Payment verified:', paid);
  }}
/>
```

---

## WooCommerce REST API Endpoints

### Get Order Status

```bash
GET /wp-json/wc/v3/orders/{id}
Authorization: Basic {consumer_key}:{consumer_secret}
```

**Response:**
```json
{
  "id": 123,
  "status": "processing",
  "payment_method": "promptpay",
  "payment_method_title": "PromptPay",
  "total": "1500.00",
  "date_created": "2025-01-16T10:30:00"
}
```

---

## Troubleshooting

### Frontend polling not working

1. Check WooCommerce REST API credentials in `.env.local`
2. Ensure CORS is configured correctly
3. Check browser console for errors
4. Verify the API endpoint is accessible

### Admin verification not updating order status

1. Check user has `manage_woocommerce` permission
2. Verify AJAX nonce is valid
3. Check browser console for JavaScript errors
4. Review WooCommerce order logs

### Payment reminders not sending

1. Check WordPress email configuration
2. Verify `wp_mail()` is working
3. Check spam folder
4. Review WooCommerce email settings

---

## Security Best Practices

1. **Never expose consumer secrets** in frontend code
2. **Use environment variables** for API credentials
3. **Verify webhook signatures** when using webhooks
4. **Limit API key permissions** to read-only for status checks
5. **Use HTTPS** for all API communications
6. **Validate payment amounts** before marking as paid
7. **Keep plugin updated** for security patches

---

## Recommended Workflow

### For Small Businesses (Manual)

1. Enable "PromptPay Pending" status
2. Check bank app throughout the day
3. Verify payments in WordPress admin
4. Send reminders for unpaid orders after 24 hours

### For Larger Businesses (Semi-Automatic)

1. Use frontend polling (Method 1)
2. Admin verifies payments in bulk (Method 2)
3. Export order data for accounting
4. Reconcile with bank statements daily

### For Enterprise (Automatic)

1. Integrate with payment gateway API
2. Use webhooks for real-time updates
3. Set up automated reconciliation
4. Use ERP integration

---

## Support

For issues or questions:
- LINE: @Sakwood
- Email: support@sakwood.com
- Documentation: https://docs.sakwood.com

---

## License

Proprietary - Sakwood © 2025
