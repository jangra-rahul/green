# Green Horizon CRM — Lead Management

## Scope
Build the complete Lead Management module on the approved Step 01 shell without changing its visual language. The module remains frontend-only in this step, using realistic seeded UAE real-estate data and interactive local UI states.

## Pages and navigation
- Make the shared sidebar route-aware so Overview and Leads receive the same active treatment, and make the Leads item navigate to `/leads`.
- Make the shared top bar accept contextual breadcrumbs while preserving its dimensions and search/actions.
- Add `/leads` for the lead dashboard/list and `/leads/$leadId` for Lead 360.
- Keep downstream Customer, Broker, Inventory, and Sales modules as non-navigating references only.

## Leads list
- Add the approved page heading, import/new-lead actions, four compact KPI cards, search/filter/sort toolbar, quick filters, bulk actions, enterprise table, pagination, and compact source/campaign insight.
- Add working filtering, quick-filter selection, row selection, three-dot actions, and row navigation to Lead 360.
- Include restrained loading, empty, and error presentations within the table area.

## Lead creation and workflow dialogs
- Replace the Step 01 placeholder with a wide create-lead drawer using the requested contact, lead, assignment, broker, and notes sections.
- Validate required fields, email format, and UAE phone format inline before submission.
- Add duplicate detection with a warning and a side-by-side duplicate review flow.
- Add reusable dialogs for assignment/reassignment, qualification, status changes with required loss reasons, activity logging, follow-up scheduling, editing, and customer conversion with success confirmation.

## Lead 360
- Build the Sarah Ahmed detail view with identity/actions, summary details, route-local tabs, overview information, lead score/status, next follow-up, and activity timeline.
- Implement Activity, Follow-ups, Documents, Communication, and History tabs with realistic records and appropriate empty states.
- Keep broker attribution, assignment origin, ownership, last action, next action, and conversion readiness visible and scannable.

## Shared components
- Extend existing controls rather than duplicating them: drawer shell, field errors, richer status badges, lead table patterns, timelines, follow-up card, communication row, audit row, duplicate warning, lead score, skeletons, and compact errors.
- Preserve existing Green Horizon tokens, spacing, typography, borders, icons, and interaction timing.

## Validation
- Verify `/`, `/leads`, and `/leads/LD-2026-01248` render without console errors at desktop and narrow widths.
- Exercise search/filtering, selection/bulk actions, row navigation, tabs, create validation, duplicate review, assignment, qualification, status change, activity/follow-up forms, edit, and conversion flows.
