import { useState } from 'react'
import { Button, Input } from '@frank16ux/pc-cookbook-legacy'
import TrustSignals from './TrustSignals'

interface ZipValidationGatewayProps {
  correctZip: string
  onValidated: () => void
}

export default function ZipValidationGateway({ correctZip, onValidated }: ZipValidationGatewayProps) {
  const [zip, setZip] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (zip.trim() === correctZip) {
      setError('')
      onValidated()
    } else {
      setError('The ZIP code you entered doesn\u2019t match our records. Please try again.')
    }
  }

  return (
    <div className="invoice-card" style={{ maxWidth: 420, margin: '0 auto' }}>
      <div className="zip-gateway">
        <div className="zip-gateway__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>

        <h2 className="zip-gateway__title pc-heading-1">Verify Your Identity</h2>
        <p className="zip-gateway__desc">
          To view this invoice, please enter your billing ZIP code.
        </p>

        <form className="zip-gateway__form" onSubmit={handleSubmit}>
          <Input
            id="zip-gateway-input"
            label="ZIP Code"
            type="text"
            value={zip}
            placeholder=" "
            validationState={error ? 'error' : undefined}
            helperText={error || undefined}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, '').slice(0, 5))
              setError('')
            }}
          />
          <Button variant="primary" type="submit">
            View Invoice
          </Button>
        </form>

        <TrustSignals />
      </div>
    </div>
  )
}
