export interface CartItem {
  id: string
  name: string
  sku: string
  quantity: number
  unitPrice: number
  imageUrl?: string
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  zipCode: string
}

export interface ConsultantInfo {
  firstName: string
  lastName: string
}

export interface InvoiceTotals {
  subtotal: number
  tax: number
  shipping: number
  total: number
}

export interface InvoiceData {
  invoiceId: string
  cartId: string
  createdDate: string
  customer: CustomerInfo
  consultant: ConsultantInfo
  items: CartItem[]
  totals: InvoiceTotals
}

export type PaymentMethodType = 'credit_card' | 'paypal' | 'apple_pay' | 'bnpl'

export const paymentMethods: { type: PaymentMethodType; label: string; icon: string }[] = [
  { type: 'credit_card', label: 'Credit Card', icon: 'CreditCard' },
  { type: 'paypal', label: 'PayPal', icon: 'paypal' },
  { type: 'apple_pay', label: 'Apple Pay', icon: 'apple' },
  { type: 'bnpl', label: 'Buy Now Pay Later', icon: 'Clock' },
]

export const invoiceData: InvoiceData = {
  invoiceId: 'INV-2847',
  cartId: 'CART-9381',
  createdDate: '2026-02-13',
  customer: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    zipCode: '60523',
  },
  consultant: {
    firstName: 'Mary',
    lastName: 'Smith',
  },
  items: [
    {
      id: 'item-1',
      name: 'Deluxe Air Fryer',
      sku: 'PC-100234',
      quantity: 1,
      unitPrice: 89.0,
    },
    {
      id: 'item-2',
      name: 'Seasoning Mix Set',
      sku: 'PC-200456',
      quantity: 1,
      unitPrice: 24.5,
    },
    {
      id: 'item-3',
      name: 'Silicone Spatula Set',
      sku: 'PC-300789',
      quantity: 1,
      unitPrice: 9.5,
    },
  ],
  totals: {
    subtotal: 123.0,
    tax: 9.84,
    shipping: 0,
    total: 132.84,
  },
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
