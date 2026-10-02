# Final Combined Build: Customer Care, Reports & Settings

## Goal
Complete the final three sidebar sections inside the existing Green Horizon CRM, preserving the approved shell, compact density, components, colors, typography, tables, tabs, modals, drawers, and hidden-scrollbar behavior.

## Customer Care
- Activate the existing Customer care sidebar item and add internal navigation for overview, cases, SLA/escalations, and reports.
- Create canonical frontend module-state records linked to existing customer, unit, handover, SPA, payment, document, and communication references.
- Build the dashboard with four KPIs, SLA-at-risk indicator, attention center, operational pipeline, recent cases, and project view.
- Build searchable/filterable case list, duplicate-aware case creation, and Case 360 tabs for overview, activity, communication, attachments, related issues, SLA, and history.
- Add validated assignment, communication, escalation, resolution, acknowledgement, closure, and reopen workflows. Service, maintenance, defect, and snag-follow-up details retain links to the original handover/snag records.
- Add Customer Care context to Customer 360 and Unit 360, plus linked navigation from Handover where relevant.

## Reports
- Activate Reports and create a centralized reporting area with internal category navigation for Management, Sales, CRM/Leads, Inventory, Finance, Brokers, EOI, Reservations, SPA, Oqood, Resale/NOC, Handover, Customer Care, and Audit.
- Build a restrained management dashboard with four KPIs, sales/collections trends, inventory and transaction pipeline, project performance, and pending actions.
- Provide reusable advanced filters, compact searchable/sortable tables, pagination, column visibility, saved-view dialog, and Excel/PDF export choices.
- Build focused report pages/views for each requested category, including the cross-system pending-approval report, using existing module figures and linked identifiers rather than duplicating operational records.

## Settings & Administration
- Activate Settings and add internal navigation for General, Users, Roles & permissions, Workflows & approvals, Document templates, Communication, Notifications, Integrations, Projects & sales configuration, Security, and Audit logs.
- Build user administration with create/edit controls, active/inactive/suspended states, department and project access, configurable roles, grouped permission matrix, sensitive-data permissions, and explicit user overrides.
- Build ordered workflow configuration with approvers, required/optional steps, conditions, escalation, return/reject, resubmission, and approval-history behavior—without a visual canvas or fixed business thresholds.
- Build versioned document templates and configurable communication templates/variables without a full document editor.
- Build notification-channel configuration and honest integration states/logs for finance/ERP, inventory, e-signature, email, SMS, WhatsApp, Oqood/external registration, and payments. Unconfigured channels remain visibly unavailable; retry actions are idempotency-aware in the UI.
- Build security settings, centralized audit logs, record-change detail, document access history, user activity, and configurable project/sales lists including SLA rules and Customer Care categories.

## Shared System Integration
- Extend global search with a permission-aware results panel covering all current CRM record types, including Customer Care.
- Extend the Business Overview action center with Customer Care and escalation items without redesigning the dashboard.
- Reuse linked document and communication records across Customer, Unit, transaction, Handover, and Customer Care surfaces; preserve immutable history and audit continuity.
- Keep this implementation frontend-only module state, matching the established project architecture. External services are represented as configuration and health states, not claimed as live connections.

## Validation
- Ensure every new content route has unique title, description, Open Graph, and Twitter metadata.
- Run TypeScript validation and browser checks across desktop and narrow viewports for active sidebar states, routing, tables, drawers/modals, hidden scrolling, overflow, and core workflows.
- Verify no CSS zoom, transform scaling, gradients, glass effects, visible native scrollbars, or disconnected sub-products are introduced.
