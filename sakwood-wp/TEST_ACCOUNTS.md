# Test Accounts - Sakwood Development

This document contains all test account information for the Sakwood e-commerce platform.

---

## 🚀 Quick Setup - Create All Test Accounts

Run this command to create all test accounts at once:

```bash
# Create Admin
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("admin", "admin123", "admin@sakwood.com");
$user = new WP_User($user_id);
$user->set_role("administrator");
echo "✓ Admin created: admin / admin123\n";
'

# Create Retail Customer
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("retail", "retail123", "retail@sakwood.com");
echo "✓ Retail user created: retail / retail123\n";
'

# Create Wholesale Customer
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("wholesale", "wholesale123", "wholesale@sakwood.com");
update_user_meta($user_id, "wholesale_status", "active");
update_user_meta($user_id, "wholesale_company", "Test Wholesale Co");
$user = new WP_User($user_id);
$user->set_role("wholesale");
echo "✓ Wholesale user created: wholesale / wholesale123\n";
'

# Create Silver Dealer
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("silver", "silver123", "silver@sakwood.com");
update_user_meta($user_id, "dealer_status", "active");
update_user_meta($user_id, "dealer_tier_id", 1);
update_user_meta($user_id, "dealer_territories", json_encode(["Bangkok", "Pathumtani"]));
$user = new WP_User($user_id);
$user->set_role("dealer_silver");
echo "✓ Silver dealer created: silver / silver123\n";
'

# Create Gold Dealer
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("gold", "gold123", "gold@sakwood.com");
update_user_meta($user_id, "dealer_status", "active");
update_user_meta($user_id, "dealer_tier_id", 2);
update_user_meta($user_id, "dealer_territories", json_encode(["Bangkok", "Pathumtani", "Nonthaburi"]));
$user = new WP_User($user_id);
$user->set_role("dealer_gold");
echo "✓ Gold dealer created: gold / gold123\n";
'

# Create Platinum Dealer
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("platinum", "platinum123", "platinum@sakwood.com");
update_user_meta($user_id, "dealer_status", "active");
update_user_meta($user_id, "dealer_tier_id", 3);
update_user_meta($user_id, "dealer_territories", json_encode(["Bangkok", "Pathumtani", "Nonthaburi", "Samut Prakan", "Nakhon Pathom"]));
$user = new WP_User($user_id);
$user->set_role("dealer_platinum");
echo "✓ Platinum dealer created: platinum / platinum123\n";
'
```

---

## 📋 Test Accounts Reference

| Role | Username | Password | Email | Discount | Min Order |
|------|----------|----------|-------|----------|-----------|
| **Admin** | `admin` | `admin123` | admin@sakwood.com | - | - |
| **Retail** | `retail` | `retail123` | retail@sakwood.com | 0% | - |
| **Wholesale** | `wholesale` | `wholesale123` | wholesale@sakwood.com | 15% | - |
| **Silver Dealer** | `silver` | `silver123` | silver@sakwood.com | 20% | 50,000 THB |
| **Gold Dealer** | `gold` | `gold123` | gold@sakwood.com | 25% | 100,000 THB |
| **Platinum Dealer** | `platinum` | `platinum123` | platinum@sakwood.com | 30% | 200,000 THB |

---

## 🔧 Individual Account Creation

### Admin User
**Purpose:** Approve/reject wholesale and dealer applications
```bash
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("admin", "admin123", "admin@sakwood.com");
$user = new WP_User($user_id);
$user->set_role("administrator");
echo "Admin created\n";
'
```

### Retail Customer
**Purpose:** Normal customer with no special pricing
```bash
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("retail", "retail123", "retail@sakwood.com");
echo "Retail user created\n";
'
```

### Wholesale Customer
**Purpose:** Can apply for dealer status
```bash
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("wholesale", "wholesale123", "wholesale@sakwood.com");
update_user_meta($user_id, "wholesale_status", "active");
update_user_meta($user_id, "wholesale_company", "Test Wholesale Co");
update_user_meta($user_id, "wholesale_tax_id", "1234567890123");
$user = new WP_User($user_id);
$user->set_role("wholesale");
echo "Wholesale user created\n";
'
```

### Silver Dealer
**Purpose:** 20% discount, 50k THB minimum order
```bash
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("silver", "silver123", "silver@sakwood.com");
update_user_meta($user_id, "dealer_status", "active");
update_user_meta($user_id, "dealer_tier_id", 1);
update_user_meta($user_id, "dealer_territories", json_encode(["Bangkok", "Pathumtani"]));
update_user_meta($user_id, "dealer_assigned_date", current_time("mysql"));
$user = new WP_User($user_id);
$user->set_role("dealer_silver");
echo "Silver dealer created\n";
'
```

### Gold Dealer
**Purpose:** 25% discount, 100k THB minimum order
```bash
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("gold", "gold123", "gold@sakwood.com");
update_user_meta($user_id, "dealer_status", "active");
update_user_meta($user_id, "dealer_tier_id", 2);
update_user_meta($user_id, "dealer_territories", json_encode(["Bangkok", "Pathumtani", "Nonthaburi"]));
update_user_meta($user_id, "dealer_assigned_date", current_time("mysql"));
$user = new WP_User($user_id);
$user->set_role("dealer_gold");
echo "Gold dealer created\n";
'
```

### Platinum Dealer
**Purpose:** 30% discount, 200k THB minimum order
```bash
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("platinum", "platinum123", "platinum@sakwood.com");
update_user_meta($user_id, "dealer_status", "active");
update_user_meta($user_id, "dealer_tier_id", 3);
update_user_meta($user_id, "dealer_territories", json_encode(["Bangkok", "Pathumtani", "Nonthaburi", "Samut Prakan", "Nakhon Pathom"]));
update_user_meta($user_id, "dealer_assigned_date", current_time("mysql"));
$user = new WP_User($user_id);
$user->set_role("dealer_platinum");
echo "Platinum dealer created\n";
'
```

---

## 🌐 Access URLs

| Service | URL | Login |
|---------|-----|-------|
| **Frontend** | http://localhost:3000 | Use any test account |
| **WordPress Admin** | http://localhost:8006/wp-admin | admin / admin123 |
| **WordPress Site** | http://localhost:8006 | Use any test account |
| **phpMyAdmin** | http://localhost:8888 | root / sakWW099 |
| **GraphQL API** | http://localhost:8006/graphql | N/A |

---

## 🧪 Testing Scenarios

### Scenario 1: Dealer Application Flow
1. Login as **wholesale** user
2. Go to `/dealer/apply`
3. Fill out dealer application form
4. Submit application
5. Logout and login as **admin**
6. Approve application in WordPress admin
7. Logout and login as **wholesale** to see dealer status

### Scenario 2: Dealer Pricing Test
1. Login as **silver** dealer
2. Browse products at `/shop`
3. Verify 20% discount is applied
4. Add products to cart
5. Check cart minimum order warning (< 50,000 THB)
6. Repeat with **gold** (25%) and **platinum** (30%) accounts

### Scenario 3: Wholesale Application Flow
1. Login as **retail** user
2. Go to `/account`
3. Apply for wholesale status
4. Login as **admin** to approve
5. Login as **retail** to see wholesale pricing

---

## 🗄️ Database Access

**phpMyAdmin:**
- URL: http://localhost:8888
- Username: `root`
- Password: `sakWW099`
- Database: `wordpress`

**Useful Tables:**
- `wp_users` - User accounts
- `wp_usermeta` - User metadata (roles, dealer info, wholesale status)
- `wp_sakwood_dealer_tiers` - Dealer tier configurations
- `wp_sakwood_dealer_applications` - Dealer applications
- `wp_sakwood_dealer_territories` - Assigned territories

---

## 📝 Notes

- All passwords are set to `username123` for easy testing
- All dealer accounts have pre-assigned territories in Bangkok area
- Wholesale status is set to "active" for immediate use
- Dealer status is set to "active" for immediate testing

---

## 🔍 Troubleshooting

**User already exists?**
```bash
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user = get_user_by("login", "username");
if ($user) {
    wp_delete_user($user->ID);
    echo "User deleted\n";
}
'
```

**Check existing users:**
```bash
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$users = get_users();
foreach ($users as $user) {
    echo $user->user_login . " - " . $user->user_email . "\n";
}
'
```

**Reset user password:**
```bash
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
wp_set_password("newpassword", "username");
echo "Password reset\n";
'
```

---

*Last Updated: January 28, 2026*
*For: Sakwood E-commerce Platform*
