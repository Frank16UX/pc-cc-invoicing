import { useState, useRef, useEffect } from 'react'
import { invoiceData } from '../data/invoiceData'

interface DevBarProps {
  activeTab: number
  onTabChange: (tab: number) => void
  onInsertTestData?: () => void
}

const tabs = ['Proposal 1: Card', 'Proposal 2: Split', 'Proposal 3: Stepper']

const mockPaymentData = {
  cardNumber: '4242 4242 4242 4242',
  expiry: '12/28',
  cvc: '123',
}

export default function DevBar({ activeTab, onTabChange, onInsertTestData }: DevBarProps) {
  const [copied, setCopied] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showPopover, setShowPopover] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)


  const handleCopyZip = () => {
    navigator.clipboard.writeText(invoiceData.customer.zipCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyField = (value: string, field: string) => {
    navigator.clipboard.writeText(value)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="dev-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="dev-bar__tag">DEV</span>
        <div className="dev-bar__tabs">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`dev-bar__tab ${activeTab === i ? 'dev-bar__tab--active' : ''}`}
              onClick={() => onTabChange(i)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', position: 'relative' }}>
        <span style={{ fontSize: '13px', color: '#e0e0e0', fontWeight: 500 }}>
          Valid ZIP: {invoiceData.customer.zipCode}
        </span>
        <button
          onClick={handleCopyZip}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer',
            color: copied ? '#4ade80' : '#e0e0e0',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease',
          }}
          title="Copy ZIP code"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>

        <div style={{ position: 'relative' }} ref={popoverRef}>
          <button
            onClick={() => setShowPopover(!showPopover)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
              color: '#e0e0e0',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
            }}
            title="Test payment data"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Test Data
          </button>

          {showPopover && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: '#2a2b2e',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '12px',
                minWidth: '280px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', color: '#e0e0e0', fontWeight: 600 }}>
                  Mock Payment Data
                </div>
                <button
                  onClick={() => setShowPopover(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#e0e0e0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                  title="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Card Number */}
              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Card Number</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#e0e0e0', flex: 1, fontFamily: 'monospace' }}>
                    {mockPaymentData.cardNumber}
                  </span>
                  <button
                    onClick={() => handleCopyField(mockPaymentData.cardNumber.replace(/\s/g, ''), 'cardNumber')}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      padding: '4px',
                      cursor: 'pointer',
                      color: copiedField === 'cardNumber' ? '#4ade80' : '#e0e0e0',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    title="Copy card number"
                  >
                    {copiedField === 'cardNumber' ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Expiry Date */}
              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Expiry Date</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#e0e0e0', flex: 1, fontFamily: 'monospace' }}>
                    {mockPaymentData.expiry}
                  </span>
                  <button
                    onClick={() => handleCopyField(mockPaymentData.expiry, 'expiry')}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      padding: '4px',
                      cursor: 'pointer',
                      color: copiedField === 'expiry' ? '#4ade80' : '#e0e0e0',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    title="Copy expiry date"
                  >
                    {copiedField === 'expiry' ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* CVC */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>CVC</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#e0e0e0', flex: 1, fontFamily: 'monospace' }}>
                    {mockPaymentData.cvc}
                  </span>
                  <button
                    onClick={() => handleCopyField(mockPaymentData.cvc, 'cvc')}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      padding: '4px',
                      cursor: 'pointer',
                      color: copiedField === 'cvc' ? '#4ade80' : '#e0e0e0',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    title="Copy CVC"
                  >
                    {copiedField === 'cvc' ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Insert Data Button */}
              {onInsertTestData && (
                <button
                  onClick={() => {
                    onInsertTestData()
                    setShowPopover(false)
                  }}
                  style={{
                    background: '#4f46e5',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#4338ca'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#4f46e5'}
                  title="Insert test data into form"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Insert Data
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
