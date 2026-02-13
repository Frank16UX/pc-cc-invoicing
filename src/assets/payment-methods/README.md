# Payment Method Assets

This directory contains payment method logos organized by brand, with three size variants for each.

## Structure

```
payment-methods/
├── affirm/
│   ├── affirm-sm.svg
│   ├── affirm-md.svg
│   └── affirm-lg.svg
├── amex/
│   ├── amex-sm.svg
│   ├── amex-md.svg
│   └── amex-lg.svg
├── apple-pay/
│   ├── apple-pay-sm.svg
│   ├── apple-pay-md.svg
│   └── apple-pay-lg.svg
├── mastercard/
│   ├── mastercard-sm.svg
│   ├── mastercard-md.svg
│   └── mastercard-lg.svg
├── paypal/
│   ├── paypal-sm.svg
│   ├── paypal-md.svg
│   └── paypal-lg.svg
├── visa/
│   ├── visa-sm.svg
│   ├── visa-md.svg
│   └── visa-lg.svg
└── ... (and 33 more brands)
```

## Available Brands

- **Credit Cards**: amex, diners-club, discover, elo, jcb, maestro, mastercard, visa
- **Digital Wallets**: apple-pay, google-pay, paypal, shop-pay
- **BNPL Services**: affirm, klarna
- **Bank Transfers**: bancontact, forbrugsforeningen, giropay, ideal, interac, sepa, sofort
- **E-commerce**: amazon, alipay, stripe, we-chat
- **Cryptocurrency**: bitcoin, bitcoin-cash, bitpay, etherium, lightcoin
- **Other Processors**: citadele, payoneer, paysafe, qiwi, skrill, union-pay, verifone, webmoney, yandex

## Size Guidelines

- **sm**: Small variant (typically for compact UI elements)
- **md**: Medium variant (default size for most use cases)
- **lg**: Large variant (for prominent display or high-DPI screens)

## Usage Examples

### React/TypeScript Import

```tsx
import mastercard from '@/assets/payment-methods/mastercard/mastercard-md.svg';

<img src={mastercard} alt="Mastercard" />
```

### Dynamic Import

```tsx
const getPaymentLogo = (brand: string, size: 'sm' | 'md' | 'lg' = 'md') => {
  return `/src/assets/payment-methods/${brand}/${brand}-${size}.svg`;
};

<img src={getPaymentLogo('visa', 'lg')} alt="Visa" />
```

## Naming Convention

- **Folder names**: lowercase with hyphens (e.g., `apple-pay`, `bitcoin-cash`)
- **File names**: `{brand}-{size}.svg` (e.g., `mastercard-md.svg`)
- All files are SVG format for scalability

## Total Assets

- **39 brands** × **3 sizes** = **117 total files**
