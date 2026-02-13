import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@frank16ux/pc-cookbook-legacy'
import { invoiceData, formatCurrency, PaymentMethodType } from '../data/invoiceData'
import InvoiceItemList from '../components/InvoiceItemList'
import OrderSummary from '../components/OrderSummary'
import PaymentMethodSelector from '../components/PaymentMethodSelector'
import CreditCardForm from '../components/CreditCardForm'
import ZipValidationInline from '../components/ZipValidationInline'
import PaidConfirmation from '../components/PaidConfirmation'
import TrustSignals from '../components/TrustSignals'

const Proposal2 = forwardRef<{ insertTestData: () => void }>((_props, ref) => {
  const [zipVerified, setZipVerified] = useState(false)
  const [paid, setPaid] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credit_card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const { customer, consultant, totals, invoiceId, items, createdDate } = invoiceData

  useImperativeHandle(ref, () => ({
    insertTestData: () => {
      setCardNumber('4242 4242 4242 4242')
      setExpiry('12 / 28')
      setCvc('123')
      setPaymentMethod('credit_card')
    }
  }))

  if (paid) {
    return (
      <div className="invoice-page">
        <PaidConfirmation
          amount={totals.total}
          invoiceId={invoiceId}
          date={createdDate}
          paymentMethod="Visa •••• 4242"
          consultantName={`${consultant.firstName} ${consultant.lastName}`}
        />
      </div>
    )
  }

  return (
    <div className="invoice-page">
      <div className="two-col">
        {/* Left: Order Details */}
        <div className="two-col__left">
          <div className="invoice-card" style={{ maxWidth: 'none' }}>
            <p className="pc-copy-strong-2 mb-sm">Invoice #{invoiceId}</p>
            <p className="pc-copy-1 pc-color-tertiary mb-lg">
              From: {consultant.firstName} {consultant.lastName}
            </p>

            <p className="pc-copy-strong-1 mb-sm">Items</p>
            <InvoiceItemList items={items} />

            <hr className="section-divider" />
            <OrderSummary totals={totals} />
          </div>
        </div>

        {/* Right: Payment */}
        <div className="two-col__right">
          <div className="invoice-card" style={{ maxWidth: 'none' }}>
            <ZipValidationInline
              correctZip={customer.zipCode}
              onValidated={() => setZipVerified(true)}
              verified={zipVerified}
            />

            <div className={!zipVerified ? 'payment-locked' : ''}>
              <p className="pc-copy-strong-2 mb-md">Select payment method</p>

              <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} variant="vertical" />

              {paymentMethod === 'credit_card' && (
                <CreditCardForm
                  cardNumber={cardNumber}
                  expiry={expiry}
                  cvc={cvc}
                  onCardNumberChange={setCardNumber}
                  onExpiryChange={setExpiry}
                  onCvcChange={setCvc}
                />
              )}

              {paymentMethod === 'paypal' && (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#6b6c70' }}>
                  <p className="pc-copy-2">You will be redirected to PayPal.</p>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#6b6c70' }}>
                  <p className="pc-copy-2">Click below to pay with Apple Pay.</p>
                </div>
              )}

              {paymentMethod === 'bnpl' && (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#6b6c70' }}>
                  <p className="pc-copy-2">You will be redirected for BNPL setup.</p>
                </div>
              )}

              <div className="mt-lg">
                <Button variant="primary" onClick={() => setPaid(true)} style={{ width: '100%' }}>
                  Pay {formatCurrency(totals.total)}
                </Button>
              </div>

              <TrustSignals />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

Proposal2.displayName = 'Proposal2'

export default Proposal2
