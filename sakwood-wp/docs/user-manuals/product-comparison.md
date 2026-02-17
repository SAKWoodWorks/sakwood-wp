# Product Comparison Feature

## Overview

The Product Comparison feature allows customers to compare up to 4 products side-by-side, viewing specifications, prices, dimensions, and images to make informed purchasing decisions.

## For Customers

### How to Use Product Comparison

#### Adding Products to Comparison

1. **Browse Products**: Navigate to the shop page (`/shop` or `/th/shop`)

2. **Add to Compare**: Click the "Add to Compare" button on any product card
   - Button shows scale icon when not added
   - Button changes to checkmark when added
   - Maximum 4 products can be compared

3. **View Comparison**: Click the compare icon in the header (shows count badge)

#### Comparing Products

The comparison page displays:

- **Product Images**: Visual comparison
- **Product Names**: Quick identification
- **Prices**: Including regular and sale prices
- **Dimensions**: Length × Width × Thickness
- **Surface Area**: Calculated square meters
- **Unique Differences**: Highlighted in different colors

#### Managing Comparison

- **Remove Single Product**: Click "Remove" button below any product
- **Clear All**: Click "Clear All" button to remove all products
- **Back to Shopping**: Link returns to shop page

#### Mobile Experience

On mobile devices (< 1024px):
- Products display in stacked layout
- Swipe up/down to view all details
- Full horizontal scroll for specs

### Features

- **Smart Comparison**: Automatically highlights differences between products
- **Persistent Storage**: Comparison saved in browser (persists across sessions)
- **Quick Add**: One-click add from product cards
- **Visual Indicators**: Clear icons show comparison status
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Tips

- Compare similar products (e.g., same category)
- Use comparison to see price differences
- Check dimensions for your project needs
- Surface area helps calculate quantity needed

---

## For Developers

### Architecture

#### Tech Stack
- **State Management**: React Context (CompareContext)
- **Storage**: localStorage (client-side only)
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS
- **Language**: TypeScript (strict mode)

#### File Structure

```
frontend/
├── lib/
│   └── context/
│       └── CompareContext.tsx          # State management
├── components/
│   └── products/
│       ├── AddToCompareButton.tsx      # Compare button component
│       └── ProductCompareTable.tsx     # Comparison view
├── app/
│   └── [lang]/
│       └── compare/
│           └── page.tsx                # Comparison page
└── __tests__/
    ├── unit/
    │   ├── CompareContext.test.tsx     # Context tests
    │   └── AddToCompareButton.test.tsx # Component tests
    └── e2e/
        └── compare.spec.ts             # E2E tests
```

### API Reference

#### CompareContext

**Location:** `lib/context/CompareContext.tsx`

**Interface:**
```typescript
interface CompareContextType {
  compareItems: Product[];           // Products in comparison
  addToCompare: (product) => void;   // Add product
  removeFromCompare: (id) => void;   // Remove product
  clearCompare: () => void;          // Clear all
  isInCompare: (id) => boolean;      // Check if added
  isFull: boolean;                   // Max 4 reached
}
```

**Usage:**
```typescript
import { useCompare } from '@/lib/context/CompareContext';

function MyComponent() {
  const { compareItems, addToCompare, isFull } = useCompare();

  return (
    <button
      onClick={() => addToCompare(product)}
      disabled={isFull}
    >
      Add to Compare
    </button>
  );
}
```

#### AddToCompareButton Component

**Props:**
```typescript
interface AddToCompareButtonProps {
  product: Product;                   // Product to add
  variant?: 'default' | 'small' | 'icon';  // Button style
  className?: string;                 // Additional CSS classes
  dictionary?: Dictionary;            // Translations
}
```

**Variants:**
- `default`: Full button with text and icon
- `small`: Compact button with text
- `icon`: Icon-only button

#### ProductCompareTable Component

**Props:**
```typescript
interface ProductCompareTableProps {
  lang: string;                       // Language code
  dictionary: {
    compare?: CompareTranslations;    // Translation strings
    common?: CommonTranslations;
  };
}
```

**Features:**
- Side-by-side comparison on desktop
- Stacked layout on mobile
- Difference highlighting
- Empty state handling
- Breadcrumbs navigation

### Data Flow

```
User clicks "Add to Compare"
  ↓
AddToCompareButton onClick
  ↓
CompareContext.addToCompare(product)
  ↓
Validate: max 4, not duplicate
  ↓
Update compareItems state
  ↓
Save to localStorage (sakwood-compare)
  ↓
UI re-renders with new state
```

### SSR Safety

**Mounted State Pattern:**
```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null; // Prevent hydration mismatch
```

**Why Required:**
- localStorage only available in browser
- Prevents React hydration errors
- Ensures consistent server/client rendering

### Translations

**Keys Required:**
```json
{
  "compare": {
    "add_to_compare": "Add to Compare",
    "added": "Added",
    "max_items": "Maximum 4 products",
    "compare_products": "Compare Products",
    "remove": "Remove",
    "clear_all": "Clear All",
    "no_products": "No products to compare",
    "back_to_shopping": "Back to Shopping"
  }
}
```

**Languages:**
- English: `dictionaries/en.json`
- Thai: `dictionaries/th.json`

### Testing

#### Run Unit Tests
```bash
cd frontend
npm test -- CompareContext
npm test -- AddToCompareButton
npm test -- compare  # Run all compare tests
```

#### Run E2E Tests
```bash
cd frontend
npm run test:e2e -- compare.spec.ts
```

#### Test Coverage
```bash
npm run test:coverage
```

### Common Patterns

#### Add Compare Button to Product Card
```typescript
import { AddToCompareButton } from '@/components/products/AddToCompareButton';

<ProductCard>
  {/* ... other content */}
  <AddToCompareButton
    product={product}
    variant="icon"
    dictionary={dictionary}
  />
</ProductCard>
```

#### Check if Product is in Comparison
```typescript
const { isInCompare } = useCompare();

const isAdded = isInCompare(product.id);
```

#### Get Comparison Count
```typescript
const { compareItems } = useCompare();

const count = compareItems.length;
```

### Performance Optimizations

1. **useMemo** for expensive calculations
   - Price parsing
   - Surface area calculations
   - Difference highlighting

2. **Callback memoization** with `useCallback`
   - addToCompare
   - removeFromCompare
   - clearCompare

3. **Lazy loading** for product images
   - Next.js Image component
   - Blur placeholders

### Known Issues & Limitations

1. **Client-side only**: Comparison data stored in localStorage (not synced to server)
2. **Maximum 4 products**: UI limitation to prevent overflow
3. **Language switching**: Comparison cleared when switching languages (by design)
4. **Browser compatibility**: Requires localStorage support

### Troubleshooting

**Issue:** Products not persisting across page reloads
**Solution:** Check browser localStorage is enabled

**Issue:** Cannot add more than 4 products
**Expected behavior:** Maximum limit enforced

**Issue:** Hydration errors in console
**Solution:** Ensure mounted state pattern is used

**Issue:** Compare button not responding
**Solution:** Verify CompareProvider wraps app in layout.tsx

### Future Enhancements

- [ ] Server-side sync for logged-in users
- [ ] Share comparison links
- [ ] Export comparison to PDF
- [ ] Add notes to comparison
- [ ] Price history comparison
- [ ] Similar products suggestions

---

## Related Documentation

- **CartContext**: Shopping cart functionality
- **AuthContext**: User authentication
- **Product Types**: Product data structure
- **Translation Guide**: Adding new languages
- **Testing Guide**: Running tests

## Changelog

### Version 1.0.0 (Current)
- Initial release
- Support for up to 4 products
- SSR-safe implementation
- Mobile responsive design
- Thai/English translations
- Comprehensive test coverage

---

**Last Updated:** 2026-02-16
**Maintained By:** Sakwood Development Team
