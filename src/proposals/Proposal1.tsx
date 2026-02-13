import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@frank16ux/pc-cookbook-legacy'
import { invoiceData, formatCurrency, PaymentMethodType } from '../data/invoiceData'
import ZipValidationGateway from '../components/ZipValidationGateway'
import InvoiceItemList from '../components/InvoiceItemList'
import OrderSummary from '../components/OrderSummary'
import PaymentMethodSelector from '../components/PaymentMethodSelector'
import CreditCardForm from '../components/CreditCardForm'
import PaidConfirmation from '../components/PaidConfirmation'
import TrustSignals from '../components/TrustSignals'

type Step = 'zip' | 'payment' | 'paid'

const Proposal1 = forwardRef<{ insertTestData: () => void }>((_props, ref) => {
  const [step, setStep] = useState<Step>('zip')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credit_card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [detailsOpen, setDetailsOpen] = useState(true)

  const { customer, consultant, totals, invoiceId, items } = invoiceData

  useImperativeHandle(ref, () => ({
    insertTestData: () => {
      setCardNumber('4242 4242 4242 4242')
      setExpiry('12 / 28')
      setCvc('123')
      setPaymentMethod('credit_card')
    }
  }))

  if (step === 'zip') {
    return (
      <div className="invoice-page">
        <ZipValidationGateway
          correctZip={customer.zipCode}
          onValidated={() => setStep('payment')}
        />
      </div>
    )
  }

  if (step === 'paid') {
    return (
      <div className="invoice-page">
        <PaidConfirmation
          amount={totals.total}
          invoiceId={invoiceId}
          date={invoiceData.createdDate}
          paymentMethod="Visa •••• 4242"
          consultantName={`${consultant.firstName} ${consultant.lastName}`}
        />
      </div>
    )
  }

  return (
    <div className="invoice-page">
      {/* Invoice Summary Card */}
      <div className="invoice-card mb-lg">
        <p className="pc-heading-3" style={{ marginBottom: 4 }}>
          {formatCurrency(totals.total)}
        </p>
        <p className="pc-copy-1 pc-color-tertiary" style={{ marginBottom: 24 }}>
          Invoice #{invoiceId}
        </p>

        <div className="mb-lg" style={{ fontSize: 14 }}>
          <div style={{ display: 'flex', gap: 24, marginBottom: 6 }}>
            <span className="pc-color-tertiary" style={{ width: 48 }}>To</span>
            <span className="pc-copy-strong-1">{customer.firstName} {customer.lastName}</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span className="pc-color-tertiary" style={{ width: 48 }}>From</span>
            <span className="pc-copy-strong-1">{consultant.firstName} {consultant.lastName}</span>
          </div>
        </div>

        <hr className="section-divider" />

        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '8px 0',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 600,
            color: '#2f3031',
          }}
        >
          <span>Order Details</span>
          <span style={{ transform: detailsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            &#9660;
          </span>
        </button>

        {detailsOpen && (
          <div>
            <InvoiceItemList items={items} />
            <hr className="section-divider" />
            <OrderSummary totals={totals} />
          </div>
        )}
      </div>

      {/* Payment Card */}
      <div className="invoice-card">
        <p className="pc-copy-strong-2 mb-lg">Select a payment method</p>

        <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />

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
          <div className="mb-lg" style={{ textAlign: 'center', padding: '20px 0', color: '#6b6c70' }}>
            <p className="pc-copy-2">You will be redirected to PayPal to complete your payment.</p>
          </div>
        )}

        {paymentMethod === 'apple_pay' && (
          <div className="mb-lg" style={{ textAlign: 'center', padding: '20px 0', color: '#6b6c70' }}>
            <p className="pc-copy-2">Click below to pay with Apple Pay.</p>
          </div>
        )}

        {paymentMethod === 'bnpl' && (
          <div className="mb-lg" style={{ textAlign: 'center', padding: '20px 0', color: '#6b6c70' }}>
            <p className="pc-copy-2">You will be redirected to complete Buy Now, Pay Later setup.</p>
          </div>
        )}

        <div className="mt-lg">
          <Button variant="primary" onClick={() => setStep('paid')} style={{ width: '100%' }}>
            Pay {formatCurrency(totals.total)}
          </Button>
        </div>

        <TrustSignals />
      </div>
    </div>
  )
})

Proposal1.displayName = 'Proposal1'

export default Proposal1
