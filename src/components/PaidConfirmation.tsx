import { formatCurrency, formatDate } from '../data/invoiceData'
import TrustSignals from './TrustSignals'

interface PaidConfirmationProps {
  amount: number
  invoiceId: string
  date: string
  paymentMethod: string
  consultantName: string
}

export default function PaidConfirmation({
  amount,
  invoiceId,
  date,
  paymentMethod,
  consultantName,
}: PaidConfirmationProps) {
  return (
    <div className="invoice-card" style={{ maxWidth: 440, margin: '0 auto' }}>
      <div className="paid-confirmation">
        <div className="paid-confirmation__icon">
          <div className="paid-confirmation__doc-icon" />
          <div className="paid-confirmation__check">&#10003;</div>
        </div>

        <p className="paid-confirmation__title">Invoice Paid</p>
        <p className="paid-confirmation__amount">{formatCurrency(amount)}</p>

        <div className="paid-confirmation__details">
          <div className="paid-confirmation__detail-row">
            <span className="paid-confirmation__detail-row-label">Invoice number</span>
            <span className="paid-confirmation__detail-row-value">{invoiceId}</span>
          </div>
          <div className="paid-confirmation__detail-row">
            <span className="paid-confirmation__detail-row-label">Payment date</span>
            <span className="paid-confirmation__detail-row-value">{formatDate(date)}</span>
          </div>
          <div className="paid-confirmation__detail-row">
            <span className="paid-confirmation__detail-row-label">Payment method</span>
            <span className="paid-confirmation__detail-row-value">{paymentMethod}</span>
          </div>
        </div>

        <p className="paid-confirmation__message">
          Thank you for your payment! Your consultant {consultantName} has been notified.
        </p>
      </div>
      <TrustSignals />
    </div>
  )
}
