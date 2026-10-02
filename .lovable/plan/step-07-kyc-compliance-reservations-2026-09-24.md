# Step 07 — KYC, Compliance & Reservations

## Goal
Extend the existing Green Horizon CRM with a complete KYC-to-reservation workflow while preserving the approved shell, compact density, hidden scrollbars, components, and visual language.

## Build scope

### Shared workflow data and state
- Add typed KYC, document, verification, approval, reservation, signature, payment, communication, activity, and audit records using realistic UAE data.
- Reuse Customer IDs, Sales Offer and EOI references, broker attribution, payment plans, and Step 06 inventory units rather than duplicating records.
- Keep state consistent with the current CRM architecture: shared in-app state for status changes, payments, approvals, cancellations, and unit availability updates.
- Add strict client-side schemas and field limits for KYC, document, approval, cancellation, sharing, and payment forms.

### KYC and compliance
- Add `/sales/kyc` for KPI summary, search, filters, quick states, queue, empty/loading/error demonstrations, and review actions.
- Add `/sales/kyc/$kycId` as Customer KYC 360 with Overview, Individual/Company Details, Documents, Verification, Approval, Activity, and History.
- Add individual and corporate KYC edit flows with separate field sets, masked identity numbers, expiry indicators, and reusable customer data.
- Build reusable document checklist, missing-document alert, upload/request modals, verification panel, return-for-correction flow, approval decisions, and immutable-looking history.
- Add KYC access from Customer 360 without changing the sidebar.

### Reservations
- Make Reservations active in Sales & bookings navigation and add `/sales/reservations`, `/sales/reservations/create`, and `/sales/reservations/$reservationId`.
- Build the reservation list with compact KPIs, search, full filters, quick states, status badges, pagination, and row actions.
- Build accepted-Sales-Offer creation with auto-populated customer, purchasers, unit, pricing, payment plan, EOI, KYC, salesperson, and broker data.
- Add pre-reservation checks for approved KYC, accepted/valid offer, approved terms, and live inventory status; block duplicate active reservations.
- Add Reservation Form preview, internal approval, customer sharing, signature tracking, signed documents, full/partial payment recording, expiry, cancellation, termination, and authorized unit release.
- Build Reservation 360 tabs for overview, purchasers, payment plan, documents, approval, payment, communication, activity, and audit history.
- Add the Ready for SPA checklist and placeholder confirmation only; SPA remains unbuilt.

### Existing-module integration
- Replace the Sales Offer reservation placeholder with navigation into the functional reservation creation flow.
- Preserve Agency → Broker → Lead → Customer → EOI → Sales Offer → Reservation attribution and show authorization/audit warnings for changes.
- Update inventory status from Available/On Hold to Reserved only after the appropriate reservation workflow; use the existing release workflow after cancellation.
- Surface purchaser KYC states in Reservation 360 and block progression where mandatory purchaser KYC is incomplete.

## Technical details
- Add focused files under `src/components/kyc/` and `src/components/reservations/` for data, UI, and workflow dialogs.
- Reuse `AppShell`, `DashboardCard`, `Button`, `Tabs`, `StatusBadge`, `ModalShell`, tables, timelines, document previews, and approval patterns.
- Use TanStack file routes with route-specific title, description, Open Graph, and Twitter metadata.
- Keep native form semantics, required-field feedback, accessible labels, keyboard-safe dialogs, and masked sensitive fields.
- Do not add backend services, new sidebar items, a new theme, CSS scaling, gradients, glass effects, or full SPA/collections behavior.

## Verification
- Run strict TypeScript checks.
- Exercise KYC review, missing-document, approval/return, reservation validation, duplicate-unit prevention, preview, approval, sharing, payment, cancellation/release, and SPA-ready interactions.
- Check every new and touched screen at desktop and mobile sizes for layout, hidden-scrollbar scrolling, horizontal overflow, route errors, and browser console errors.
