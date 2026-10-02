# Step 11 — Key Handover & Snagging Management

## Goal
Extend the existing Green Horizon CRM with a complete handover workflow, using the current compact enterprise design and canonical Customer, Unit, SPA, Oqood, Resale, and Payment records. The module ends at key release and customer acknowledgement; post-handover Customer Care remains a placeholder.

## Build scope

### 1. Canonical handover records and shared UI
- Add frontend module-state data for handover cases, eligibility snapshots, finance certificates, notices, appointments, snag inspections/issues, rectification, reinspections, checklists, access items, documents, acknowledgements, reminders, communication, activity, and audit history.
- Anchor the main scenario to `HND-2026-00182`, Sarah Ahmed, Horizon Residences `A-1204`, `SPA-2026-00142`, `OQD-2026-00108`, and `ACC-2026-00482`.
- Reuse existing cards, tables, tabs, badges, modals, drawers, document patterns, timelines, and approval presentation.
- Add focused handover components only: status/summary, process tracker, eligibility, finance clearance, appointment/calendar, snagging, rectification/reinspection, checklist/access items, acknowledgement, and completion validation.

### 2. Handover navigation and operational screens
- Activate the existing **Handover** sidebar item at `/handover` without changing sidebar structure or dimensions.
- Add internal Handover navigation for Overview, Cases, Calendar, and Reports.
- Build `/handover` with the four KPI cards, finance-pending secondary metric, restrained pipeline, attention center, project-wise view, and recent cases.
- Build `/handover/cases` with search, filters, quick filters, export state, compact table, loading/error/empty presentations, and links to case details.
- Build `/handover/create` with linked-record lookup, auto-populated purchaser/property/legal/finance context, active-case duplicate detection, and existing-case navigation.
- Build `/handover/calendar` with compact Day, Week, and List views plus project/type/team/status filters.
- Build `/handover/reports` with operational report selectors, filters, project-wise statistics, completed handovers, snagging metrics, and export presentation.

### 3. Handover 360 and eligibility/finance controls
- Build `/handover/$handoverId` with the required header, contextual primary action, summary strip, workflow tracker, and tabs for Overview, Eligibility, Appointments, Snagging, Rectification, Checklist, Documents, Communication, Activity, and History.
- Show linked Customer, joint purchasers, Unit, SPA, Oqood, Payment Account, resale awareness, owner, and current delivery stage without duplicating source records.
- Add configurable eligibility checks with Pending, Eligible, Not eligible, and Conditionally eligible results plus immutable eligibility history.
- Consume canonical payment data and display finance clearance certificate `FC-2026-00412`; keep finance processing in Payment 360.
- Add stale-linked-data refresh warnings before eligibility decisions, final appointments, and completion.

### 4. Notice and appointment workflows
- Add approved-template handover notice generation, read-focused preview, immutable version metadata, sharing modal, recipient/channel/message validation, and Sent/Delivered/Viewed/Acknowledged tracking.
- Add reusable scheduling for Snagging, Reinspection, and Final Handover appointments.
- Support Scheduled, Confirmed, Rescheduled, Completed, Customer No-show, and Cancelled states; cancellation affects the appointment only.
- Track invitation, confirmation, reminders, reschedule notices, and cancellations in Communication and Activity.

### 5. Snagging, rectification, and reinspection
- Add a practical inspection workspace with configurable example areas, compact issue counts, issue creation, Low/Medium/High severity, assignments, target dates, notes, and photo/document evidence.
- Add dedicated routes for appointment/inspection/report/issue detail where a focused workspace is needed:
  - `/handover/appointments/$appointmentId`
  - `/handover/inspections/$inspectionId`
  - `/handover/inspections/$inspectionId/report`
  - `/handover/issues/$issueId`
- Generate or upload snagging reports with immutable versions and optional customer sharing status.
- Track each issue independently through Open, Assigned, In Progress, Ready for Review, Rectified, Rejected on Reinspection, and Closed.
- Support rectification updates, subtle overdue warnings, completion evidence, reinspection scheduling, Accepted/Rejected decisions, mandatory rejection reasons, and return to rectification.
- Enable final-handover scheduling only when required snagging work is complete according to the case configuration.

### 6. Final handover, documents, and acknowledgement
- Add pre-handover validation for eligibility, finance/payment clearance, snagging, required documents, appointment, customer data, and checklist.
- Add a configurable handover checklist with Pending, Complete, Not Applicable, and Issue states, including configurable key/access-item quantities.
- Generate and preview an immutable Key Handover Document populated from linked records and checklist/access-item details.
- Aggregate the notice, finance certificate, snag report versions, rectification evidence, key handover document, acknowledgements, and supporting files.
- Support electronic signature, digital acknowledgement, and uploaded signed document states; show purchasers separately when configuration requires multiple acknowledgements and support corporate authorized representatives.
- Add completion confirmation and guards. Completion preserves the full history, records keys released, and shows a non-functional transition to Customer Care.
- Add validated On Hold, owner reassignment, and permission-controlled case cancellation workflows without deleting history.

### 7. Cross-module visibility
- Add Handover status, date, and **View handover** links to Customer 360 and Unit 360 while preserving ownership and transaction history.
- Add linked handover context to Payment 360, SPA 360, Oqood/Registration 360, and relevant resale context.
- Keep canonical finance balances in Payments and avoid introducing legal or registration rules not supplied by configuration.

## Technical details
- Use TanStack file routes and typed `<Link>` navigation; do not edit the generated route tree.
- Keep module state in frontend data/workflow files, matching the existing CRM architecture.
- Use Zod validation for required decisions, hold/cancellation reasons, scheduling, issue creation, reinspection rejection, acknowledgement, and completion actions.
- Every new content route receives unique title, description, Open Graph text, `og:type`, and Twitter card metadata.
- Preserve existing semantic tokens, density, responsive behavior, and global hidden-scrollbar behavior; add no gradients, photos, theme changes, or scaling hacks.

## Verification
- Run TypeScript validation and resolve route/type errors.
- Exercise dashboard, list, create/duplicate prevention, Handover 360 tabs, notice, scheduling, inspection, issue, rectification/reinspection, checklist, acknowledgement, hold/cancel, and completion flows.
- Verify desktop and narrow layouts for overflow, readable controls, hidden native scrollbars, active Handover navigation, and no browser console errors.
- Confirm Customer 360, Unit 360, SPA, Oqood, Payment 360, and resale links resolve to the same canonical records.
