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

type Step = 1 | 2 | 3 | 'paid'

const Proposal3 = forwardRef<{ insertTestData: () => void }>((_props, ref) => {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [zipVerified, setZipVerified] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credit_card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const { customer, consultant, totals, invoiceId, items, createdDate } = invoiceData
  const itemCount = items.length

  useImperativeHandle(ref, () => ({
    insertTestData: () => {
      setCardNumber('4242 4242 4242 4242')
      setExpiry('12 / 28')
      setCvc('123')
      setPaymentMethod('credit_card')
    }
  }))

  if (currentStep === 'paid') {
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

  const stepDone = (step: number) =>
    currentStep === 'paid' || (currentStep !== 'paid' && (currentStep as number) > step)

  return (
    <div className="invoice-page">
      <div className="invoice-card invoice-card--wide">
        {/* Progress Indicator */}
        <div className="stepper__progress">
          {[
            { num: 1, label: 'Review' },
            { num: 2, label: 'Payment' },
            { num: 3, label: 'Confirm' },
          ].map(({ num, label }) => (
            <div
              key={num}
              className={`stepper__step ${
                currentStep === num ? 'stepper__step--active' : ''
              } ${stepDone(num) ? 'stepper__step--done' : ''}`}
            >
              <div className="stepper__dot" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Review Order */}
        <div className="stepper__section">
          <div
            className={`stepper__section-header ${
              stepDone(1) ? 'stepper__section-header--done' : ''
            }`}
          >
            <span>
              {stepDone(1) ? '✓ ' : '1. '}Review Your Order
              {stepDone(1) && (
                <span className="stepper__section-summary">
                  {' '}&mdash; {formatCurrency(totals.total)} · {itemCount} items
                </span>
              )}
            </span>
            {stepDone(1) && (
              <button
                onClick={() => setCurrentStep(1)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2d7e8b', fontSize: 13, fontFamily: 'Inter' }}
              >
                Edit
              </button>
            )}
          </div>

          {currentStep === 1 && (
            <div className="stepper__section-body">
              <p className="pc-copy-1 pc-color-tertiary mb-md">
                Invoice #{invoiceId} &middot; From: {consultant.firstName} {consultant.lastName}
              </p>

              <InvoiceItemList items={items} />
              <hr className="section-divider" />
              <OrderSummary totals={totals} />
              <hr className="section-divider" />

              <ZipValidationInline
                correctZip={customer.zipCode}
                onValidated={() => setZipVerified(true)}
                verified={zipVerified}
              />

              <div className="mt-lg">
                <Button
                  variant="primary"
                  onClick={() => setCurrentStep(2)}
                  disabled={!zipVerified}
                  style={{ width: '100%' }}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Payment */}
        <div className="stepper__section">
          <div
            className={`stepper__section-header ${
              !stepDone(1) && currentStep !== 2 ? 'stepper__section-header--locked' : ''
            } ${stepDone(2) ? 'stepper__section-header--done' : ''}`}
          >
            <span>
              {stepDone(2) ? '✓ ' : '2. '}Payment Method
              {stepDone(2) && (
                <span className="stepper__section-summary"> &mdash; Visa •••• 4242</span>
              )}
            </span>
            {!stepDone(1) && currentStep !== 2 && (
              <span className="stepper__section-badge">Locked</span>
            )}
            {stepDone(2) && (
              <button
                onClick={() => setCurrentStep(2)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2d7e8b', fontSize: 13, fontFamily: 'Inter' }}
              >
                Edit
              </button>
            )}
          </div>

          {currentStep === 2 && (
            <div className="stepper__section-body">
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
                <Button variant="primary" onClick={() => setCurrentStep(3)} style={{ width: '100%' }}>
                  Continue to Review
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Confirm & Pay */}
        <div className="stepper__section">
          <div
            className={`stepper__section-header ${
              currentStep !== 3 && !stepDone(2) ? 'stepper__section-header--locked' : ''
            }`}
          >
            <span>3. Confirm & Pay</span>
            {currentStep !== 3 && !stepDone(2) && (
              <span className="stepper__section-badge">Locked</span>
            )}
          </div>

          {currentStep === 3 && (
            <div className="stepper__section-body">
              <p className="pc-copy-strong-2 mb-md">Order Summary</p>
              <OrderSummary totals={totals} />

              <hr className="section-divider" />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                <span className="pc-color-tertiary">Paying with</span>
                <span className="pc-copy-strong-1">Visa •••• 4242</span>
              </div>

              <div className="mt-xl">
                <Button variant="primary" onClick={() => setCurrentStep('paid')} style={{ width: '100%' }}>
                  Pay {formatCurrency(totals.total)}
                </Button>
              </div>
            </div>
          )}
        </div>

        <TrustSignals />
      </div>
    </div>
  )
})

Proposal3.displayName = 'Proposal3'

export default Proposal3
