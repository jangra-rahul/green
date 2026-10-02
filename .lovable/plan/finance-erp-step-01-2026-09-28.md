# Finance ERP Step 01

## Scope
- Extend the existing Green Horizon CRM with one Finance ERP sidebar group containing Finance overview, Receivables, and Payables.
- Preserve the current shell, compact density, typography, colors, cards, tables, controls, hidden-scrollbar behavior, and responsive patterns without redesigning existing modules.
- Use frontend module-state data and existing CRM customers, projects, units, reservations, payment records, permissions, workflows, documents, and audit patterns.

## Finance overview
- Build the requested connected KPI strip, six-month receivables-versus-receipts chart, payables distribution, finance action center, and recent receipts/payables tabs.
- Add project and period filters, export controls, and a new-transaction action using existing components.

## Accounts receivable
- Build searchable/filterable receivables, KPI summary, quick filters, aging views, basic reports, Excel/PDF export choices, and CRM source indicators.
- Add Customer AR 360 and receivable detail pages with financial summary, invoices, receipt history, multi-receivable allocation, unallocated and partial states, documents, activity, and immutable audit history.
- Add validated receipt recording and verification workflows while linking to the existing customer, unit, reservation, and Payment 360 records rather than duplicating them.

## Accounts payable
- Build searchable/filterable payables, KPI summary, basic reports, Excel/PDF export choices, and simple supplier records.
- Add Supplier 360 and payable detail pages with line items, configurable approval stages, return/reject remarks, payment requests, partial payments, documents, activity, and immutable audit history.
- Add validated payable creation, duplicate-invoice warnings, supplier payment recording, and masked bank details with permission-aware reveal behavior.

## Cross-system integration
- Extend global search with finance references and suppliers.
- Add Finance ERP permissions and approval workflow entries to existing Settings, plus AR/AP reporting access from centralized Reports.
- Keep integrations represented honestly as reference/configuration states; do not build Cash & Bank, General Ledger, tax, budgeting, expenses, profitability, procurement, or the full CRM–Finance synchronization engine.

## Verification
- Add unique metadata to every new content route.
- Verify type safety, validation, typed navigation, desktop and mobile rendering, hidden scrollbars, table overflow, core dialogs/actions, and browser console/runtime behavior.
