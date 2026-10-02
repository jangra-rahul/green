# Step 09 — Payments & Collections Management

## Goal
Extend the existing Green Horizon CRM with a compact operational finance layer for receivables, payment schedules, payment processing, collection follow-up, escalation, reporting, and audit history. The current shell and design system remain unchanged.

## What will be built

### 1. Payments navigation and shared finance records
- Activate the existing **Payments** sidebar item at `/payments`.
- Add canonical linked records for customer accounts, schedule versions, installments, payments, proof-of-payment files, receipts, allocations, follow-ups, call logs, promises, reminders, escalations, ERP sync, finance clearance, and audit history.
- Keep schedules derived from the existing Sales Offer → Reservation → SPA chain; formal amendments create a new schedule version without overwriting payment history.

### 2. Collections overview
- Build `/payments` with the requested KPI strip, six-month due-versus-received trend, status distribution, action center, current receivables, and restrained management summaries.
- Add Export and Record payment actions using existing CRM controls.

### 3. Accounts and Payment 360
- Build `/payments/accounts` with search, advanced filters, quick filters, responsive financial table, bulk owner/reminder/export actions, and empty/loading/error presentations.
- Build `/payments/accounts/$accountId` with summary metrics and tabs for Overview, Payment schedule, Payments, Receipts / POP, Follow-ups, Promises, Communication, Activity, and History.
- Include linked Customer, Unit, SPA, Reservation, Oqood, payment plan, salesperson, broker, collection owner, ERP state, and reusable payment-clearance status.
- Open installment detail as a focused drawer with allocation history and context-aware actions.

### 4. Payment operations and finance control
- Add a validated Record payment flow with amount/date/method/reference/currency/POP/notes, installment or unallocated destination, configurable payment methods, and duplicate-payment warning.
- Add payment allocation with running totals and blocking over-allocation validation.
- Add proof-of-payment review, rejection/return reasons, verification, configurable finance approval, clearance, receipt preview, and ERP sync/retry states.
- Add controlled payment reversal as a historical transaction; never delete the original payment. Refunds remain future-compatible only.

### 5. Collections operations
- Build `/payments/overdue` with overdue KPIs, aging filters, priority, assignment, bulk reminder/export actions, and overdue accounts.
- Add follow-up and call-log workflows, payment promises and broken-promise state, manual reminder channels and history, owner reassignment, and configurable escalation triggers.
- Build `/payments/escalations` and `/payments/escalations/$escalationId` with assignment, notes, related financial context, communication history, and required resolution notes.
- Channel states will be represented without claiming real Email, SMS, or WhatsApp delivery integrations.

### 6. Reporting
- Build `/payments/projects` for project collection performance.
- Build `/payments/reports` with customer-wise collections, outstanding balances, overdue aging, collection rate, and minimal project comparison charts.

### 7. Existing-module integration
- Add payment summaries and typed links to Customer 360 and Unit 360.
- Add finance data links/status to SPA and Oqood details without duplicating the canonical payment schedule.
- Preserve existing Reservation and Sales Offer source linkage.
- Do not build Resale/NOC, Assignment, Handover, Snagging, Customer Care, payment gateway checkout, or full automation settings.

## Validation and safety
- Validate all editable fields with Zod, including amounts, dates, references, notes, rejection/reversal reasons, promises, allocations, follow-ups, reminders, assignments, and escalation resolution.
- Enforce amount and allocation limits in the UI state; preserve immutable audit/history examples.
- Keep sensitive bank references, POP, finance notes, and ERP details out of list views.
- This step remains frontend module-state architecture because no persistent backend is connected; no actual reminder delivery, ERP sync, or gateway payment will be claimed.

## Verification
- Run TypeScript validation.
- Exercise payment, allocation, duplicate warning, verification/rejection, reversal, reminder, promise, follow-up, reassignment, escalation, and cross-module navigation flows.
- Verify all new routes at desktop and narrow mobile sizes for headings, active sidebar state, table/tab scrolling, hidden native scrollbars, overflow, and browser console errors.
