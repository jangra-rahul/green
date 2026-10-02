# Step 04 — Brokers, Agencies & Commission Management

## Goal
Extend the approved Green Horizon CRM with one cohesive channel-management module covering agencies, individual brokers, attribution, compliance, performance, and commissions. Preserve the existing shell and visual system exactly; downstream sales and finance modules remain references only.

## Navigation and routes
- Activate the existing **Brokers & agencies** sidebar item for the `/brokers` section without changing its label or layout.
- Add distinct, metadata-complete routes for:
  - `/brokers` — overview and primary Agencies, Brokers, Sales attribution, and Commissions workspaces.
  - `/brokers/agencies/register` — six-step agency registration form.
  - `/brokers/agencies/$agencyId` — Agency 360, including verification and approval states.
  - `/brokers/individuals/register` — individual broker registration.
  - `/brokers/individuals/$brokerId` — Broker 360.
  - `/brokers/commissions/$commissionId` — commission detail, calculation, approval, payment, statement, and audit history.

## Brokers & agencies overview
- Build the channel-management header and actions, four compact KPIs, six-month broker sales trend, and ranked top-agency panel.
- Use the existing underline tabs as the main workspace switcher.
- Agencies workspace: search, filters, quick filters, selectable enterprise table, expiry/status badges, row actions, bulk actions, pagination, and empty/error/loading presentations.
- Brokers workspace: corresponding broker search, filters, table, bulk actions, registration entry point, and clear agency relationships.
- Sales attribution workspace: persistent Agency → Broker → Lead → Customer → Unit → future Reservation chain, attribution history, change-attribution workflow, and future-stage placeholders only.
- Commissions workspace: KPI summary, search and status filters, commission list, transparent rates and finance states, adjustment entry point, and links to commission detail.

## Agency registration and Agency 360
- Create a compact six-step full-page registration flow: Company details, Contacts, Registration, Documents, Banking, Review.
- Validate required names, license details, dates, UAE phone, email, identifiers, and field lengths with inline errors; surface duplicate agency warnings without silently blocking authorized continuation.
- Build Agency 360 with identity, summary grid, KPIs, nine tabs, company data, contacts, masked bank details, agreement details, compliance checklist, document expiry alerts, recent activity, performance, leads, sales, commissions, and complete audit history.
- Add verification and approval controls with checklist statuses, reviewer remarks, and required reasons for return/rejection.
- Add protected interaction designs for contact/document management and suspension/deactivation confirmations while preserving historical records.

## Broker registration and Broker 360
- Build validated broker registration with agency relationship, registration/identity details, document checklist, duplicate warning, draft, and register actions.
- Build Broker 360 with identity, agency and authorization summary, KPIs, eight tabs, lead/customer/sales attribution, performance, documents and expiry states, activity, and audit history.
- Add broker transfer and inactive-state workflows; explain that historical leads, customers, sales, and commissions remain attached to their original attribution.

## Performance, attribution, and commissions
- Add restrained agency/broker performance metrics, lead-to-conversion funnel, project-wise results, and unit-level drill-down tables using realistic UAE data.
- Keep attribution as linked entities, preserve old assignments, require a reason for changes, and flag commission impact.
- Build Commission 360 with linked entities, calculation formula, agency/broker split, approval panel/history, adjustment workflow, finance readiness/payment states, supporting documents, and audit trail.
- Include a September 2026 agency statement with opening balance, earned commission, adjustments, payments, closing payable, detail rows, and export controls without generating files.

## Shared implementation
- Reuse the existing Button, Badge, Card, Table, Tabs, Drawer, Modal, form, avatar, pagination, and timeline patterns.
- Add only domain-specific reusable pieces: compliance summary, expiry badge, attribution chain, commission calculation, approval panel, and registration steppers.
- Keep data and interactions local to this design step; do not create EOI, offer, reservation, SPA, finance ERP, payment, Oqood, resale/NOC, handover, or customer-care functionality.
- Maintain horizontal table scrolling and stacked detail panels at narrow widths while preserving the existing responsive sidebar.

## Verification
- Type-check all routes and ensure every dynamic navigation uses typed path parameters.
- Exercise agency/broker registration validation and duplicates, verification decisions, suspension, transfer, attribution changes, commission adjustments and approvals, tabs, search, filters, bulk selection, empty states, and row navigation.
- Verify overview, Agency 360, Broker 360, registration, and Commission 360 at desktop and narrow viewports; confirm no browser console errors and no visual drift from Overview, Leads, or Customer 360.
