# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a prototype React application showcasing 3 different UX proposals for Pampered Chef's Consultant's Corner invoice payment page (UXD-260). Each proposal demonstrates a complete customer payment flow: ZIP validation → payment details → paid confirmation.

**Tech Stack:**
- React 19 + TypeScript + Vite 6
- SCSS with modern-compiler API
- `@frank16ux/pc-cookbook-legacy` design system (v1.0.4)
- Feather Icons React for iconography

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:5173

# Type checking
npx tsc --noEmit    # Type-check without building

# Build
npm run build       # Type-check + Vite production build
npm run preview     # Preview production build
```

## Architecture

### Proposal System

The app renders 3 competing UX proposals side-by-side via a DevBar tab switcher:

1. **Proposal 1 (Single-Column Card)**: Gateway ZIP screen → consolidated invoice/payment card
2. **Proposal 2 (Two-Column Split)**: Side-by-side layout with inline ZIP (order details left, payment right)
3. **Proposal 3 (Stepper/Accordion)**: Multi-step progressive flow with inline ZIP

All proposals:
- Share the same mock data from `src/data/invoiceData.ts` (correct ZIP: `60523`)
- Use shared components from `src/components/`
- Follow identical state flows: `zip validation` → `payment` → `paid confirmation`

### Design System Integration

**PC Cookbook Legacy** is the single source of truth for UI primitives:

- **Components**: `<Button>`, `<Input>`, `<Card>` imported from `@frank16ux/pc-cookbook-legacy`
- **SCSS Variables**: Import via `@use '@frank16ux/pc-cookbook-legacy/scss/{color-variables, breakpoint-variables, font-mixins, spacing}'`
- **Pre-built CSS**: Main stylesheet imported in `src/main.tsx` as `@frank16ux/pc-cookbook-legacy/styles`
- **Typography**:
  - Headings use `.pc-heading-1` through `.pc-heading-5` (Antonio font)
  - Body text uses `.pc-copy-1` through `.pc-copy-5` (Inter font)
  - Bold text uses `.pc-copy-strong-1` through `.pc-copy-strong-5`
- **Colors**: `$color-base-01` (teal #1a5962), `$color-ui-02` (background #f3f6f6), `$color-text-01` (dark grey)
- **Spacing**: `--pc-spacer-sm` (10px), `--pc-spacer-md` (16px), `--pc-spacer-lg` (24px), etc.
- **Breakpoints**: `$breakpoint-sm-max` (479px), `$breakpoint-md` (640px), `$breakpoint-lg` (768px), `$breakpoint-xl` (992px)

### Component Architecture

**Shared Components** (`src/components/`):
- `DevBar.tsx` - Development tab switcher (not part of actual design)
- `TopBar.tsx` - PC logo header
- `InvoiceItemList.tsx` - Cart items display
- `OrderSummary.tsx` - Subtotal/tax/shipping/total breakdown
- `PaymentMethodSelector.tsx` - 4-option payment method grid (Card, PayPal, Apple Pay, BNPL)
- `CreditCardForm.tsx` - Card number + expiry + CVC inputs with formatting
- `ZipValidationGateway.tsx` - Full-screen ZIP entry (Proposal 1 only)
- `ZipValidationInline.tsx` - Inline ZIP field with verify button (Proposals 2 & 3)
- `PaidConfirmation.tsx` - Success screen with animated checkmark
- `TrustSignals.tsx` - Lock icon + "Secure payment by Pampered Chef"

**Proposal Files** (`src/proposals/`):
Each proposal is a self-contained React component managing its own state machine. They import shared components but implement distinct layouts and flows.

### Payment Method Icons

Payment icons use a hybrid approach:
- **Credit Card**: Feather `CreditCard` icon
- **PayPal**: `src/assets/payment-paypal.svg`
- **Apple Pay**: `src/assets/payment-apple-pay.png`
- **BNPL**: Feather `Calendar` icon

Logo sizing is constrained via `.payment-methods__logo` class (max-width: 32px, max-height: 20px).

### Styling System

`src/styles/global.scss` is the centralized stylesheet:
- Imports DS SCSS variables at the top
- Uses BEM-style naming (`.component__element--modifier`)
- Includes CSS animations (fadeInUp, fadeIn, scaleIn, checkPop)
- Responsive breakpoints via SCSS media queries referencing DS variables
- Form spacing standardized to `var(--pc-spacer-md)` (16px) for gaps

**Critical Spacing Rules:**
- Credit card form row gap: `var(--pc-spacer-md)` between expiry and CVC fields
- Payment methods grid gap: `12px` between tiles
- Input wrapper bottom margin: `var(--pc-spacer-md)` for vertical spacing

### Mock Data Structure

`src/data/invoiceData.ts` exports:
- `invoiceData` object with customer, consultant, items, totals, invoice metadata
- `paymentMethods` array defining available payment options with icons
- `formatCurrency()` and `formatDate()` utility functions
- TypeScript interfaces for all data shapes

The correct ZIP code for validation is `"60523"` (customer's billing ZIP).

## Key Patterns

**ZIP Validation:**
- Gateway (Proposal 1): Separate screen, blocks access until validated
- Inline (Proposals 2 & 3): Field within payment flow, disables "Continue" button until validated
- Error handling uses DS `validationState="error"` on `<Input>` component

**State Management:**
Each proposal manages its own state with `useState`:
- Proposal 1: `'zip' | 'payment' | 'paid'`
- Proposal 2: `boolean` flags for `zipVerified` and `paid`
- Proposal 3: `1 | 2 | 3 | 'paid'` step numbers

**Payment Method Switching:**
All proposals use controlled `<PaymentMethodSelector>` with conditional rendering for payment-specific UI (credit card form vs. redirect messages for PayPal/Apple Pay/BNPL).

## Important Constraints

- **Never modify the design system dependency** - `@frank16ux/pc-cookbook-legacy` is externally maintained
- **Preserve all 3 proposals** - they are intentionally different UX approaches for stakeholder comparison
- **Maintain mock data consistency** - all proposals must use identical `invoiceData` to ensure fair comparison
- **Keep animations CSS-only** - no JavaScript animation libraries, leverage DS and SCSS
- **DS components first** - always use DS `<Button>`, `<Input>`, `<Card>` instead of custom implementations
