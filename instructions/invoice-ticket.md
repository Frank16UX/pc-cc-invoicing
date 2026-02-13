# **UXD-260 — CC– Party & Individual Cart Invoicing**

## **Objective**

Enable consultants to generate a **secure, payment‑only invoice link** for eligible Party Carts (guest carts and host carts) and Individual Orders in Consultant’s Corner, allowing customers to submit payment directly while ensuring consultants retain full control of the cart. This supports **BNPL-related workflows** and improves safety around customer payment submission.

This phase focuses on **lightweight concept exploration** for an initial iteration, with detailed UX specification to follow.

---

## **Background & Assumptions**

- Consultants currently manage customer carts in Consultant’s Corner, often performing white‑glove service and collecting payment separately.
- The invoicing capability solves two major needs:
  - Provides a safer, streamlined way for customers to submit payment without sharing sensitive details.
  - Supports **Buy Now, Pay Later** workflows, where payment re‑authorization isn’t possible.
- Consultant behaviors with shared cart/invoice links vary and can lead to accidental misuse.
- A **ZIP code validation step** will reduce accidental wrong-customer access.
- Invoice will be hosted on a verified Pampered Chef domain and use standard payment UI patterns to maintain trust.

---

## **Requirements**

### **Core Requirements (Should-Dos)**

#### **Eligibility & Availability**

- Show **Invoice** action on:
  - Unsubmitted, unlocked guest carts without existing payment
  - Unsubmitted host carts without existing payment
  - Unsubmitted individual orders without existing payment
- Hide/disable Invoice when payment exists.
- Consultants must remove existing payments before Invoice becomes available.

#### **Invoice Behavior**

- Payment‑only experience tied **1:1** to a cart or order.
- Cart ID included in invoice URL.
- One invoice per cart/order.
- Invoice reflects **current order total** and real‑time cart updates.

#### **Customer Experience**

- Display item list and payment total.
- Allowed payment methods:
  - Credit card
  - PayPal (login required)
  - Apple Pay
  - BNPL (login required)
- Customers **cannot** modify items, shipping, promotions, or attribution.
- Require **ZIP code validation**:
  - Must match ZIP stored on the cart/order.
  - Mismatches prevent payment submission and show friendly error messaging.
- Validate credit card data within invoice flow.

#### **Payment Handling**

- Invoice payments **do not overwrite** existing payments.
- Payment is not authorized until consultant submits the order.
- If payments cause imbalance, show clear feedback to prevent submission.

#### **Consultant Feedback & Notifications**

- Send consultant an email when invoice payment is submitted.
- Show a clear indicator in Consultant’s Corner when an invoice payment exists.

#### **Tracking**

- Track consultant interactions with the Invoice action.

---

## **Out of Scope**

- Partial or balance‑due invoicing.
- Automatic payment removal/voiding.
- Consultant-managed invoice payment amounts.

---

## **Design Considerations & Open Questions**

- Prioritize lightweight concept exploration in this phase.
- Explore clear feedback when:
  - Invoice link is generated/copied
  - Payment is submitted
- Evaluate placement of invoice payment indicators (e.g., summary, payment section, list views).
- Benchmark trusted invoicing patterns to increase perceived safety.
- Consider trust signals:
  - Branding
  - Familiar UI patterns
  - Microcopy affirming secure payment
- Pending security approval:
  - Pre‑payment ZIP verification
  - Displaying customer name for confirmation

---
