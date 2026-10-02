# Green Horizon CRM — Customer / Purchaser Management

## Goal
Extend the approved Green Horizon CRM with a complete Customer Management module and Customer 360 experience, preserving the existing shell, typography, spacing, colors, cards, controls, tables, drawers, and interaction patterns.

## What will be built

### Customer list
- Add `/customers` and activate the existing Customers sidebar item for customer routes.
- Build the page header, four connected KPI metrics, customer search, primary and advanced filters, sorting, quick filters, selectable rows, bulk actions, pagination, empty state, and realistic UAE purchaser records.
- Add individual and company rows with soft lifecycle badges and complete row action menus.

### Customer 360
- Add `/customers/$customerId` with one shared architecture supporting individual and company profiles.
- Use Sarah Ahmed as the individual example and Blue Crest Holdings LLC as the company example, selected from their IDs.
- Build the identity header, compact relationship summary, financial metrics, and tabs for Overview, Properties, Transactions, Payments, Documents, Communication, Activity, and History.
- Keep property, financial, next-action, account manager, broker attribution, lead origin, lifecycle, alerts, notes, and joint purchaser details immediately scannable without overcrowding the page.

### Customer records and history
- Properties: current and historical unit relationships, booking stage, ownership role, values, and actions.
- Transactions: active and completed purchase records without removing historical relationships.
- Payments: customer-level totals, next installment, and payment schedule only.
- Documents: document filters, statuses, table actions, empty state, and compact upload modal.
- Communication: channel filters, realistic entries, and add-communication modal.
- Activity: operational timeline with date filtering.
- History: system audit entries with old/new values and remarks.
- Company profile: legal details, primary contact, authorized contacts, and company document placeholders.

### Customer workflows
- Create/edit customer drawer with Individual and Company modes, inline validation, and audit-friendly update context.
- Duplicate detection for mobile, email, similar name, and trade license, with review and continue actions.
- Account manager reassignment modal based on the existing lead assignment pattern.
- Joint purchaser management with existing/new purchaser choices, primary purchaser controls, optional ownership percentages, and 100% validation when percentages are used.
- Add note, add communication, upload document, and placeholder new-transaction entry points.

## Shared components
- Reuse the existing Button, IconButton, DashboardCard, MetricCard, StatusBadge, Avatar, Tabs, SelectMenu, Input, Textarea, ModalShell, Drawer, EmptyState, and table patterns.
- Add only customer-specific reusable pieces where they reduce duplication: customer form/workflow dialogs, lifecycle tracker, property summary, customer activity timeline, document table, communication item, and joint purchaser list.
- Keep all styling on existing semantic design tokens; no new theme, gradients, glass effects, decorative graphics, or heavy shadows.

## Responsive and quality checks
- Preserve desktop density and two-column Customer 360 layouts; stack secondary panels on narrow screens and allow tables to scroll horizontally.
- Verify Overview, Leads, Customers, individual Customer 360, and company Customer 360 at desktop and narrow widths.
- Exercise search, advanced filters, selection, row navigation, tabs, create/edit validation, duplicate review, reassignment, joint purchasers, document upload, communication, notes, and empty states.
- Confirm unique metadata for both new customer routes and no browser console errors.

## Technical notes
- Customer records and workflow outcomes will use realistic seeded client-side data, matching the existing Step 01/02 implementation. No downstream Sales, Payments, KYC, Broker, Handover, or Customer Care module will be built.
- Dynamic customer navigation will use the typed `/customers/$customerId` route with route params.
- Existing shell and shared design-system files will only be extended where necessary; no navigation or theme redesign.
