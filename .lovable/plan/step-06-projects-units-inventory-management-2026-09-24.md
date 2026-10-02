# Step 06 — Projects, Units & Inventory Management

## Goal
Extend the existing Green Horizon CRM with an enterprise inventory workspace that preserves the approved compact density, hidden-scrollbar behavior, shell, colors, and interaction patterns.

## What will be built

### 1. Shared inventory foundation
- Add one canonical inventory dataset for projects, buildings, floors, units, pricing, payment plans, holds, linked customers, EOIs, offers, and immutable history.
- Add a shared inventory state provider so status changes made through hold and release workflows remain consistent across overview, project, floor, availability, and unit views during the session.
- Enforce one active unit status and block conflicting hold/allocation actions with clear stale-status and duplicate-booking warnings.

### 2. Navigation and reusable inventory UI
- Activate the existing **Projects & units** sidebar item for every inventory route without changing sidebar layout.
- Add compact inventory navigation for Projects, Units, Availability, Pricing, and Reports.
- Add only inventory-specific reusable pieces: status badge, distribution bar, project summary, floor selector, unit table/card, matrix, pricing history, payment-plan summary, allocation card, conflict warning, and hold/release dialogs.
- Reuse the current Button, table, tabs, modal, timeline, badge, form, pagination, and empty-state components.

### 3. Projects and inventory overview
- Build `/projects` with the requested breadcrumb, heading, Export and Add project actions, four KPI cards, segmented inventory distribution, project availability/value summary, alerts, recent movements, and primary module navigation.
- Build `/projects/list` with search, project filters, quick states, compact project table, row actions, pagination, bulk selection, and empty/loading/error examples.
- Build `/projects/create` and `/projects/$projectId/edit` as compact project metadata forms with transaction-safe archive messaging.

### 4. Project, building, and floor hierarchy
- Build `/projects/$projectId` as Project 360 with summary metrics and tabs for overview, buildings, units, availability, pricing, payment plans, sales activity, documents, and history.
- Build `/projects/$projectId/buildings/$buildingId` for tower metrics, floor navigation, unit counts, and availability.
- Build `/projects/$projectId/buildings/$buildingId/floors/$floorNumber` with a compact unit grid/list and a minimal floor-by-unit matrix.
- Keep hierarchy links clear: Project → Building/Tower → Floor → Unit.

### 5. Unit inventory and Unit 360
- Build `/projects/units` with broad inventory search, quick status filters, detailed filter controls, sortable compact rows, pagination, selection, and safe bulk actions.
- Build `/projects/units/$unitId` with approved price, specifications, current status, linked customer, active EOI/offer, payment plans, allocations, reservation placeholders, documents, activity, and complete audit/status history.
- Include contextual reserved, sold, blocked, and on-hold panels while keeping future Reservation and SPA workflows as linked placeholders only.

### 6. Unit forms, pricing, and availability workflows
- Build `/projects/units/create` and `/projects/units/$unitId/edit` with hierarchy, specification, pricing, payment-plan, and allowed initial-status sections plus duplicate-unit validation.
- Build `/projects/availability` with live counts, project/building/floor/type/status filters, compact grid/table views, and status-change safeguards.
- Build `/projects/pricing` with approved-price visibility, multiple eligible plans, price history, and an authorized price-update dialog that requires effective date and reason.
- Add functional Hold, Release, Block, and limited quick-status dialogs with expiry, customer/lead references, permissions messaging, audit entries, and conflict checks.

### 7. Reports and bulk import
- Build `/projects/reports` with inventory, availability, movement, pricing, sold/reserved/on-hold/blocked report views, requested filters, project summaries, restrained value visuals, and Excel/PDF export states.
- Build `/projects/import` with CSV/Excel upload presentation, detected-row summary, duplicate/missing/invalid-value validation table, and safe import readiness states.

### 8. Existing sales linkage
- Update existing EOI and Sales Offer unit references to link into Unit 360 and use the shared unit availability concept.
- Preserve approved unit price and eligible payment-plan context in those screens.
- Surface blocking availability conflicts before commercial progression without building Reservation, SPA, Payments, Oqood, Resale/NOC, Handover, KYC, or Customer Care.

## Technical details
- Use TanStack file routes with matching route IDs and unique route metadata for every new content route.
- Keep data as SSR-safe plain objects and centralized typed client state, matching the existing prototype architecture; no new backend or persistence layer is introduced in this step.
- Keep URL-worthy screens as separate routes; use existing tab patterns for detail subsections.
- Preserve 48–52px table density, 42px controls, compact cards, responsive priority columns, hidden native scrollbars, and accessible keyboard scrolling.
- Use pagination and filtered subsets rather than rendering large inventory sets at once.

## Validation
- Type-check the complete application.
- Verify the overview, project list/360, building, floor, units, create/edit, availability, pricing, reports, and import routes at 1728×900, 1366×850, and mobile widths at Chrome 100% rendering.
- Exercise search, filters, tabs, hierarchy links, hold/release, conflict warnings, pricing updates, import validation, and sales-to-unit links.
- Confirm no console errors, horizontal page overflow, visible native scrollbars, clipped dialogs, dead links, or density regressions.
