import { Input } from '@frank16ux/pc-cookbook-legacy'

interface CreditCardFormProps {
  cardNumber: string
  expiry: string
  cvc: string
  onCardNumberChange: (v: string) => void
  onExpiryChange: (v: string) => void
  onCvcChange: (v: string) => void
}

export default function CreditCardForm({
  cardNumber,
  expiry,
  cvc,
  onCardNumberChange,
  onExpiryChange,
  onCvcChange,
}: CreditCardFormProps) {
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) {
      return digits.slice(0, 2) + ' / ' + digits.slice(2)
    }
    return digits
  }

  return (
    <div className="cc-form">
      <p className="pc-copy-strong-1 mb-sm">Card information</p>
      <Input
        id="card-number"
        label="Card number"
        type="text"
        value={cardNumber}
        placeholder=" "
        onChange={(e) => onCardNumberChange(formatCardNumber(e.target.value))}
      />
      <div className="cc-form__row">
        <Input
          id="card-expiry"
          label="MM / YY"
          type="text"
          value={expiry}
          placeholder=" "
          onChange={(e) => onExpiryChange(formatExpiry(e.target.value))}
        />
        <Input
          id="card-cvc"
          label="CVC"
          type="text"
          value={cvc}
          placeholder=" "
          onChange={(e) => onCvcChange(e.target.value.replace(/\D/g, '').slice(0, 4))}
        />
      </div>
    </div>
  )
}
