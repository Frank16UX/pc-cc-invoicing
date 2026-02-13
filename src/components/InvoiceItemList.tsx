import { CartItem, formatCurrency } from '../data/invoiceData'

interface InvoiceItemListProps {
  items: CartItem[]
}

export default function InvoiceItemList({ items }: InvoiceItemListProps) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item-list__item">
          <div>
            <div className="item-list__name pc-copy-2">{item.name}</div>
            <div className="item-list__meta">Qty: {item.quantity}</div>
          </div>
          <div className="item-list__price pc-copy-2">
            {formatCurrency(item.unitPrice * item.quantity)}
          </div>
        </div>
      ))}
    </div>
  )
}
