import { paymentMethods, PaymentMethodType } from '../data/invoiceData'
import creditCardPlaceholder from '../assets/payment-methods/credit-card-placeholder.svg'
import creditCardPlaceholderSelected from '../assets/payment-methods/credit-card-placeholoder-selected.svg'
import paypalLogo from '../assets/payment-methods/paypal/paypal-md.svg'
import applePayLogo from '../assets/payment-methods/apple-pay/apple-pay-md.svg'
import bnplLogo from '../assets/payment-methods/bnpl.svg'

interface PaymentMethodSelectorProps {
  selected: PaymentMethodType
  onSelect: (method: PaymentMethodType) => void
  variant?: 'grid' | 'vertical'
}

export default function PaymentMethodSelector({ selected, onSelect, variant = 'grid' }: PaymentMethodSelectorProps) {
  const getIcon = (method: typeof paymentMethods[number]) => {
    // Use different credit card icon when selected
    if (method.type === 'credit_card') {
      const logo = selected === 'credit_card' ? creditCardPlaceholderSelected : creditCardPlaceholder
      return <img src={logo} alt={method.label} className="payment-methods__logo" />
    }

    // Use SVG logos for all payment methods
    const logoMap = {
      paypal: paypalLogo,
      apple_pay: applePayLogo,
      bnpl: bnplLogo,
    }

    const logo = logoMap[method.type as keyof typeof logoMap]
    const altText = method.label

    return <img src={logo} alt={altText} className="payment-methods__logo" />
  }

  return (
    <div className={`payment-methods ${variant === 'vertical' ? 'payment-methods--vertical' : ''}`}>
      {paymentMethods.map((method) => (
        <button
          key={method.type}
          className={`payment-methods__option ${
            selected === method.type ? 'payment-methods__option--active' : ''
          }`}
          onClick={() => onSelect(method.type)}
        >
          <span className="payment-methods__icon">
            {getIcon(method)}
          </span>
          <span>{method.label}</span>
        </button>
      ))}
    </div>
  )
}
