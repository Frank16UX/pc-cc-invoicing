import { InvoiceTotals, formatCurrency } from '../data/invoiceData'

interface OrderSummaryProps {
  totals: InvoiceTotals
}

export default function OrderSummary({ totals }: OrderSummaryProps) {
  return (
    <div className="order-summary">
      <div className="order-summary__row">
        <span>Subtotal</span>
        <span>{formatCurrency(totals.subtotal)}</span>
      </div>
      <div className="order-summary__row">
        <span>Tax</span>
        <span>{formatCurrency(totals.tax)}</span>
      </div>
      <div className="order-summary__row">
        <span>Shipping</span>
        <span>{totals.shipping === 0 ? 'FREE' : formatCurrency(totals.shipping)}</span>
      </div>
      <hr className="order-summary__divider" />
      <div className="order-summary__row order-summary__total">
        <span>Total</span>
        <span>{formatCurrency(totals.total)}</span>
      </div>
    </div>
  )
}
