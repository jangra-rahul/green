# Step 05 — EOI & Sales Offer Management

## Goal
Extend the approved Green Horizon CRM with one cohesive Sales & bookings module that moves customers from commercial intent through EOI execution and payment into an approved, accepted sales offer ready for the future Reservation module. Preserve the existing shell, components, density, and visual system exactly.

## Navigation and routes
- Activate the existing **Sales & bookings** sidebar item for `/sales` while keeping all labels and layout unchanged.
- Add the shared Sales & bookings secondary navigation: Pipeline, EOI, Sales offers, Reservations, and SPA; the last two remain clearly marked future stages.
- Add metadata-complete routes for:
  - `/sales` — pipeline landing page.
  - `/sales/eoi` — EOI list and workspace.
  - `/sales/eoi/create` — dedicated EOI creation and preview flow.
  - `/sales/eoi/$eoiId` — EOI 360.
  - `/sales/offers` — sales-offer list and workspace.
  - `/sales/offers/create` — dedicated sales-offer creation and preview flow, supporting an EOI reference.
  - `/sales/offers/$offerId` — Sales Offer 360.

## Sales pipeline and lists
- Build the landing header, four compact KPIs, restrained six-stage pipeline, recent sales activity, and action-center reminders.
- Build EOI and sales-offer pages with compact KPI strips, search, status and business filters, quick filters, horizontally scrollable tables, contextual row actions, pagination, and concise empty/error/loading presentations.
- Seed realistic UAE records for Sarah Ahmed, Mohammed Al Farsi, Aisha Rahman, and Blue Crest Holdings LLC across Horizon Residences and Green Park.

## EOI creation and EOI 360
- Build a dedicated, sectioned EOI form for customer lookup, joint/company purchaser context, project and placeholder unit selection, commercial terms, inherited broker attribution, issue/expiry dates, and template selection.
- Add validation, availability and duplicate/conflict warnings, unusual-expiry guidance, restricted attribution changes with required reasons, and draft versus approval submission actions.
- Add a read-focused EOI document preview with auto-populated customer, unit, amount, attribution, salesperson, dates, and template details.
- Build EOI 360 with compact summary metrics and Overview, Document, Approval, Payment, Communication, Activity, and History tabs.
- Add approval decisions, customer sharing, signature progression, signed-document state, partial/full payment recording, expiry/renewal, cancellation, immutable audit history, and guarded conversion into a prefilled sales offer.

## Sales-offer creation and Sales Offer 360
- Build an EOI-first offer form with authorized manual creation support and duplicate approved-offer warning.
- Auto-carry customer, project, unit, broker, salesperson, EOI reference/payment, and approved list price.
- Add transparent percentage/fixed discount math, authority thresholds, commercial exceptions, standard/custom payment plans, 100% and final-price validation, validity, template selection, and read-focused preview.
- Build Sales Offer 360 with summary metrics and Overview, Pricing, Payment plan, Document, Approval, Customer response, Activity, and History tabs.
- Add reusable multi-level approval status, approver decisions, sharing, response timestamps, acceptance/rejection, expiry/renewal, version history and comparison, revised-offer preservation, and a Ready for Reservation confirmation that stops before reservation creation.

## Shared workflows and safeguards
- Reuse existing Button, Badge, Card, Table, Tabs, Modal, form, metric, timeline, and audit patterns.
- Add only sales-domain pieces: sales secondary navigation, pipeline steps, document preview, approval chain, pricing calculation, payment-plan preview, version history/comparison, signature/response timeline, and payment summary.
- Keep role-aware controls visible only where appropriate; show finance/legal/management context without creating permission settings.
- Preserve Agency → Broker → Lead → Customer → EOI → Sales Offer attribution and record all material changes without overwriting history.
- Keep Inventory, Reservation, SPA, Finance, Oqood, resale/NOC, handover, KYC, and customer care as linked placeholders only.

## Verification
- Type-check all routes and ensure every dynamic navigation uses typed path parameters and every content route has unique metadata.
- Exercise EOI and offer validation, preview, duplicate/unit conflicts, approval, sharing, payment, cancellation, discount authority, custom-plan math, version comparison, customer response, expiry, and reservation placeholder flows.
- Verify landing, lists, create pages, and both 360 pages on desktop and narrow viewports; confirm table scrolling, stacked panels, active sidebar state, and no browser console errors or visual drift.
