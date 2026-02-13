# Payment Method Assets - Quick Reference

## 📁 File Paths

All payment logos follow this pattern:
```
/src/assets/payment-methods/{brand}/{brand}-{size}.svg
```

## 🏦 Most Common Payment Methods

### Credit Cards
```tsx
import amexLogo from '@/assets/payment-methods/amex/amex-md.svg';
import discoverLogo from '@/assets/payment-methods/discover/discover-md.svg';
import mastercardLogo from '@/assets/payment-methods/mastercard/mastercard-md.svg';
import visaLogo from '@/assets/payment-methods/visa/visa-md.svg';
```

### Digital Wallets
```tsx
import applePayLogo from '@/assets/payment-methods/apple-pay/apple-pay-md.svg';
import googlePayLogo from '@/assets/payment-methods/google-pay/google-pay-md.svg';
import paypalLogo from '@/assets/payment-methods/paypal/paypal-md.svg';
```

### BNPL (Buy Now, Pay Later)
```tsx
import affirmLogo from '@/assets/payment-methods/affirm/affirm-md.svg';
import klarnaLogo from '@/assets/payment-methods/klarna/klarna-md.svg';
```

## 📏 Size Variants

| Size | Use Case |
|------|----------|
| `sm` | Small UI elements, mobile views, footer badges |
| `md` | **Default** - Forms, checkouts, payment method selectors |
| `lg` | Hero sections, promotional banners, large displays |

## 🔍 Brand Lookup Table

| Brand Name | Folder Name | Type |
|------------|-------------|------|
| American Express | `amex` | Credit Card |
| Apple Pay | `apple-pay` | Digital Wallet |
| Google Pay | `google-pay` | Digital Wallet |
| Mastercard | `mastercard` | Credit Card |
| PayPal | `paypal` | Digital Wallet |
| Visa | `visa` | Credit Card |
| Klarna | `klarna` | BNPL |
| Affirm | `affirm` | BNPL |
| Shop Pay | `shop-pay` | Digital Wallet |
| Discover | `discover` | Credit Card |
| Diners Club | `diners-club` | Credit Card |
| JCB | `jcb` | Credit Card |

## 💡 Usage Tips

### Dynamic Loading
```tsx
// Helper function to load payment logos dynamically
const getPaymentLogo = (
  brand: string,
  size: 'sm' | 'md' | 'lg' = 'md'
): string => {
  return new URL(
    `./payment-methods/${brand}/${brand}-${size}.svg`,
    import.meta.url
  ).href;
};

// Usage
<img src={getPaymentLogo('visa', 'md')} alt="Visa" />
```

### Type-Safe Brand Names
```tsx
type PaymentBrand =
  | 'amex'
  | 'apple-pay'
  | 'google-pay'
  | 'mastercard'
  | 'paypal'
  | 'visa'
  | 'klarna'
  | 'affirm'
  // ... add more as needed

type PaymentSize = 'sm' | 'md' | 'lg';
```

## 📦 Migration from Old Structure

**Before:**
```tsx
import paypalOld from '@/assets/payment-paypal.svg';
import applePayOld from '@/assets/payment-apple-pay.png';
```

**After:**
```tsx
import paypal from '@/assets/payment-methods/paypal/paypal-md.svg';
import applePay from '@/assets/payment-methods/apple-pay/apple-pay-md.svg';
```

## 🎨 Consistent Sizing in CSS

```scss
.payment-logo {
  &--sm {
    max-width: 32px;
    max-height: 20px;
  }

  &--md {
    max-width: 48px;
    max-height: 30px;
  }

  &--lg {
    max-width: 64px;
    max-height: 40px;
  }
}
```
