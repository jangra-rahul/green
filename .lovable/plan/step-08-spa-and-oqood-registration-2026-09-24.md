# Step 08 — SPA and Oqood / Registration

## Goal
Extend the existing Green Horizon CRM from approved Reservation through executed SPA and Oqood registration, preserving the current compact visual system, navigation shell, shared records, and audit-first workflows.

## What will be built

### 1. Shared transaction data and reusable UI
- Add realistic UAE SPA, version, amendment, signature, registration, checklist, reminder, and audit datasets linked to existing Reservation, Customer, Unit, Sales Offer, EOI, salesperson, and broker records.
- Add focused reusable components: SPA and Oqood status badges, summary strips, validation panels, read-only SPA document preview, signature progress, version history/comparison, amendment card, registration checklist/timeline, on-hold alert, and registration summary.
- Reuse the existing buttons, cards, tables, tabs, badges, modals, timelines, approval patterns, and document presentation.

### 2. SPA navigation, list, and creation
- Make SPA a working Sales & bookings tab while keeping Pipeline, EOI, Sales offers, KYC, and Reservations intact.
- Build `/sales/spa` with the required KPI strip, search, filters, quick filters, table, status system, empty/loading/error presentations, and export/create actions.
- Build `/sales/spa/create` from approved Reservation `RSV-2026-00182`, with blocking prerequisite checks, source-change warning, auto-populated purchasers/property/commercial terms, locked approved pricing/payment plan, and approved template selection.
- Add read-focused preview and submission for Legal Review without creating a word processor or template settings module.

### 3. SPA 360 and execution workflow
- Build `/sales/spa/$spaId` with header actions, summary strip, and tabs for Overview, Purchasers, Payment plan, Document, Approval, Signatures, Amendments, Communication, Activity, and History.
- Separate Legal Review from Management Approval, require remarks for return/reject, preserve compact approval history, and lock material terms after approval.
- Add customer sharing, multi-purchaser and corporate-signatory progress, signed-document storage, execution timeline, and role-aware actions.
- Replace the Reservation “Start SPA” placeholder with navigation into the real SPA creation flow.

### 4. Versions, amendments, and termination
- Preserve immutable SPA versions and provide a focused side-by-side changed-field comparison.
- Add amendment/addendum creation with reason, effective date, affected terms, supporting documents, linked approval/signature states, and separate addendum records.
- Add permission-aware cancellation/termination with required reason/effective date, optional evidence, configurable approval participants, and non-destructive history.

### 5. Oqood dashboard, cases, and reports
- Activate the existing Registration & NOC sidebar item at `/registration` without changing sidebar structure or styling.
- Build the Oqood dashboard with a compact five-state summary, restrained status distribution, monthly registrations, reminders/escalations, project-wise reporting, and pending-age view.
- Build `/registration/cases`, `/registration/$registrationId`, and `/registration/reports` with search, filters, quick filters, tables, responsive layouts, and route-specific metadata.

### 6. Registration lifecycle
- Add initiation pre-checks for executed SPA, complete customer data, correct unit state, and linked documents.
- Use configurable document categories rather than inventing legal requirements; support Missing, Uploaded, Pending Review, Verified, Rejected, and Expired.
- Implement Not Initiated, Documents Pending, Initiated, Submitted, On Hold, and Approved / Registered states exactly.
- Add submission confirmation, required on-hold reason/remarks/owner/date, issue resolution with retained history, optional external references, registration completion, and official-document upload/storage.

### 7. Cross-module linkage
- Add SPA and Oqood references with direct navigation in Customer 360 and Unit 360.
- Preserve the full attribution chain through Registration and link documents rather than duplicating them.
- Keep the unit transactional state aligned with the executed sale while leaving Payments & Collections, Resale/NOC, Handover, Snagging, and Customer Care as future modules.

## Technical details
- Route files will follow the existing TanStack file-route convention and every new route will receive unique title, description, Open Graph, and Twitter metadata.
- State remains frontend demo state consistent with the existing CRM architecture; no backend or new authentication system will be introduced.
- Forms use the existing modal/drawer system and Zod validation for required remarks, dates, reasons, and controlled workflow transitions.
- All layouts retain compact 100% density, semantic design tokens, hidden scrollbar visuals, accessible controls, and horizontal table scrolling on narrow screens.

## Verification
- Run the TypeScript check.
- Exercise list, create, preview, approval, signature, amendment, termination, initiation, submission, on-hold resolution, and registration completion paths.
- Verify SPA, Oqood, Customer 360, Unit 360, and Reservation links at desktop and mobile sizes.
- Confirm no console errors, route failures, accidental page overflow, visible native scrollbars, clipped dialogs, or broken sidebar highlighting.
