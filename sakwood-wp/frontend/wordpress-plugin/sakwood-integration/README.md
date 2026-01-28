# Sakwood Integration Plugin

WordPress plugin for Sakwood - handles orders, quotes, and custom post types.

## Features

- **Custom Post Types**:
  - `sakwood_quote` - Quote requests from customers
  - `sakwood_order` - Order submissions from customers

- **REST API Endpoints**:
  - `POST /wp-json/sakwood/v1/quotes` - Submit a new quote
  - `GET /wp-json/sakwood/v1/quotes` - Get all quotes (admin only)
  - `POST /wp-json/sakwood/v1/orders` - Submit a new order
  - `GET /wp-json/sakwood/v1/orders` - Get all orders (admin only)

- **Admin Pages**:
  - Sakwood Quotes - View and manage quote requests
  - Sakwood Orders - View and manage orders

## Installation

1. Copy the `sakwood-integration` folder to your WordPress plugins directory:
   ```
   wp-content/plugins/sakwood-integration/
   ```

2. Activate the plugin from WordPress Admin:
   - Go to Plugins → Installed Plugins
   - Click "Activate" under "Sakwood Integration"

3. The plugin will automatically:
   - Register custom post types
   - Register REST API endpoints
   - Add admin menu pages

## REST API Usage

### Submit Quote

```bash
POST /wp-json/sakwood/v1/quotes
Content-Type: application/json

{
  "id": "QT-1234567890",
  "date": "2024-01-14T10:00:00.000Z",
  "status": "pending",
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "081-234-5678",
    "company": "Company Name"
  },
  "project": {
    "type": "residential",
    "estimatedBudget": "100000",
    "timeline": "flexible"
  },
  "products": [
    {
      "id": "prod-1",
      "name": "Pine Wood Board",
      "quantity": 10,
      "specifications": ""
    }
  ],
  "additionalNotes": "Special delivery requirements..."
}
```

### Submit Order

```bash
POST /wp-json/sakwood/v1/orders
Content-Type: application/json

{
  "id": "ORD-1234567890",
  "date": "2024-01-14T10:00:00.000Z",
  "status": "pending",
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "081-234-5678"
  },
  "shipping": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "Bangkok",
    "province": "Bangkok",
    "postalCode": "10100"
  },
  "products": [
    {
      "id": "prod-1",
      "name": "Pine Wood Board",
      "quantity": 10,
      "price": 500
    }
  ],
  "paymentMethod": "promptpay",
  "totalAmount": 5000,
  "notes": "Delivery instructions..."
}
```

### Get Quotes (Admin Only)

```bash
GET /wp-json/sakwood/v1/quotes
Authorization: Requires WordPress admin session
```

### Get Orders (Admin Only)

```bash
GET /wp-json/sakwood/v1/orders
Authorization: Requires WordPress admin session
```

## Data Storage

All quote and order data is stored as:
- **Post Content**: JSON string of the full data object
- **Post Meta**: Individual fields for easier querying

### Quote Meta Fields
- `_quote_id` - Unique quote identifier
- `_quote_date` - Quote submission date
- `_quote_status` - Quote status (pending, approved, rejected)
- `_customer_data` - Customer information object
- `_project_data` - Project details object
- `_products_data` - Products array
- `_additional_notes` - Customer notes

### Order Meta Fields
- `_order_id` - Unique order identifier
- `_order_date` - Order submission date
- `_order_status` - Order status (pending, processing, shipped, delivered)
- `_customer_data` - Customer information object
- `_shipping_data` - Shipping details object
- `_products_data` - Products array
- `_payment_method` - Payment method used
- `_total_amount` - Order total

## Frontend Integration

The Next.js frontend connects to this plugin using the WordPress REST API:

```typescript
import { submitQuote, submitOrder } from '@/lib/services/wordpressService';

// Submit a quote
await submitQuote(quoteData);

// Submit an order
await submitOrder(orderData);
```

## Docker Setup

The plugin is automatically mounted to the WordPress container via docker-compose.yml:

```yaml
wordpress:
  volumes:
    - ./wordpress-plugin:/var/www/html/wp-content/plugins/sakwood-integration
```

After starting the containers with `docker-compose up -d`, the plugin will be available in WordPress.

## Development

To make changes to the plugin:
1. Edit files in the `wordpress-plugin/` directory
2. The changes are automatically reflected in the running WordPress container
3. No need to rebuild containers

## License

This plugin is proprietary to Sakwood.
