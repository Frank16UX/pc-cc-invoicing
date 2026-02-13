import { useState } from 'react'
import { Button, Input } from '@frank16ux/pc-cookbook-legacy'

interface ZipValidationInlineProps {
  correctZip: string
  onValidated: () => void
  verified: boolean
}

export default function ZipValidationInline({ correctZip, onValidated, verified }: ZipValidationInlineProps) {
  const [zip, setZip] = useState('')
  const [error, setError] = useState('')

  const handleVerify = () => {
    if (zip.trim() === correctZip) {
      setError('')
      onValidated()
    } else {
      setError('ZIP code doesn\u2019t match. Please try again.')
    }
  }

  if (verified) {
    return (
      <div className="zip-inline zip-inline--verified">
        <div className="zip-inline__success">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#42af00">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>ZIP code verified</span>
        </div>
      </div>
    )
  }

  return (
    <div className="zip-inline">
      <p className="zip-inline__label">Verify your ZIP code to continue</p>
      <div className="zip-inline__row">
        <Input
          id="zip-inline-input"
          label="ZIP Code"
          type="text"
          value={zip}
          placeholder=" "
          validationState={error ? 'error' : undefined}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, '').slice(0, 5))
            setError('')
          }}
        />
        <Button variant="secondary" onClick={handleVerify}>
          Verify
        </Button>
      </div>
      {error && <p className="zip-inline__error">{error}</p>}
    </div>
  )
}
