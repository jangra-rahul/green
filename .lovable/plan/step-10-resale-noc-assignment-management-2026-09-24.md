# Step 10 — Resale / NOC / Assignment Management

## Goal
Extend the existing **Registration & NOC** area with a complete, compact resale and ownership-transfer workflow. The current Green Horizon shell, sidebar, density, responsive behavior, controls, document patterns, approvals, timelines, and audit presentation remain unchanged.

## What will be built

### 1. Registration-area navigation and linked records
- Add shared internal navigation for **Oqood**, **Resale / NOC**, and **Assignments** while keeping the existing sidebar unchanged and **Registration & NOC** active.
- Add canonical frontend records for resale cases, assignees, eligibility decisions, finance clearances, NOCs, configurable document requirements, fees, undertakings, assignment versions/signatures, transfer states, ownership history, communication, reminders, and audit history.
- Link each case to the existing Customer, joint purchasers, Unit, executed SPA, Oqood case, Payment Account, salesperson, and original broker; store resale broker attribution separately.

### 2. Resale overview, list, and reports
- Build `/registration/resale` with requested KPIs, restrained seven-stage pipeline, action center, active cases, and project/status reporting.
- Build `/registration/resale/requests` with search, requested filters and quick filters, compact responsive table, empty state, and export controls.
- Build `/registration/resale/reports` with requested operational metrics, project-wise report, status filters, and Excel/PDF export presentation without inventing SLA targets.

### 3. Create resale request
- Build `/registration/resale/create` as a dedicated validated flow.
- Select an existing CRM property and auto-populate the current owner, joint purchasers, unit, SPA, registration, and canonical payment summary.
- Capture request details, existing or prospective buyer, joint assignees, and optional resale broker while preserving original attribution.
- Block a new request when the selected unit already has an active resale or assignment case, with a typed link to the existing case.

### 4. Resale 360
- Build `/registration/resale/$resaleId` with the requested header, summary strip, contextual action, process tracker, and tabs for Overview, Eligibility, Finance, NOC, Buyer / Assignee, Fees, Documents, Assignment, Communication, Activity, and History.
- Show existing owner and property context immediately; keep sensitive details limited to existing permission-aware patterns.
- Add cancellation and rejection/resubmission controls that preserve all case history.

### 5. Eligibility and finance clearance
- Add a dedicated eligibility checklist using only CRM-available checks: property linkage, SPA, payment status, documents, registration context, and approval readiness.
- Preserve every eligibility decision and require a reason for **Not eligible**.
- Consume the existing Payment Account values rather than creating an independent balance.
- Add finance-clearance request and review workflows with **Clear**, **Return**, **Reject**, and **On Hold** decisions; require remarks for non-clear outcomes and preserve the result reference/history.

### 6. NOC management
- Build `/registration/noc/$nocId` with NOC summary, configurable generic document checklist, approval chain, communication, activity, and audit history.
- Keep Finance, Legal, and Management decisions distinct and traceable while allowing the sequence to remain configurable.
- Add NOC request, generation, preview/download, electronic sharing, and optional signature states. No fixed document names, approval order, expiry policy, or external-authority process will be invented.

### 7. Fees, undertaking, and assignment documents
- Track example configurable fees, payment/receipt linkage, and audited adjustment/waiver requests without creating another payment engine or presenting sample amounts as policy.
- Generate undertaking records from an approved template with version, signatories, preview, sharing, and signature states.
- Build `/registration/assignments` and `/registration/assignments/$assignmentId` for assignment tracking, read-focused preview, configurable approval, multi-signatory execution, immutable versions, and linked NOC/SPA/resale records.
- Aggregate NOC, undertaking, assignment, finance clearance, original SPA, customer documents, fee receipts, and configurable supporting documents in the existing document-table pattern.

### 8. Transfer completion and ownership history
- Add transfer states and an on-hold workflow requiring reason, owner, date, remarks, and next action.
- Before approval, generation, signature, or completion actions, compare current linked Payment, ownership, Unit, SPA, NOC, and document state; block stale actions until refreshed.
- Enable completion only when configured prerequisites pass: eligibility, finance clearance, NOC approval, documents, executed assignment, and required fee satisfaction.
- Confirm the transfer with a final summary, then present the incoming owner as current while retaining the previous owner and full ownership timeline.

### 9. Existing-module integration
- Extend Customer 360 to show outgoing property history/resale completion and incoming acquisitions/assignment references.
- Extend Unit 360 with current owner, prior ownership, resale/assignment records, and transfer dates without overwriting history.
- Add typed resale links and status context to SPA, Oqood, and Payment 360 while leaving the executed SPA and canonical finance data unchanged.

## Validation and safety
- Validate editable fields with Zod, including request details, assignees, eligibility reasons, finance decisions, NOC decisions, fees, document generation/sharing, hold, cancellation, rejection, and completion.
- Use frontend module state only because no persistent backend is connected; sharing, delivery, signature, export, and reminder states will be represented without claiming live integrations.
- Preserve immutable issued/executed document versions and audit entries; never delete cancelled/rejected cases or prior ownership.
- Do not build Handover, Snagging, post-handover Customer Care, role settings, template editors, automation configuration, or unprovided external-authority workflows.

## Verification
- Run TypeScript validation.
- Exercise duplicate prevention, eligibility, finance decisions, NOC approvals, fee adjustment, undertaking/assignment generation and sharing, signatures, hold, cancellation, stale-data refresh, completion validation, and cross-module links.
- Verify all new and integrated routes at desktop and narrow mobile sizes for headings, active sidebar state, table/tab/document scrolling, hidden native scrollbars, overflow, page metadata, and browser console errors.
