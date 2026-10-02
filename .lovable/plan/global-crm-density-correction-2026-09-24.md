# Global CRM density correction

## Scope
- Tune centralized sizing tokens and shared primitives so native 100% browser rendering matches the compact enterprise density of the supplied 80% reference.
- Reduce the shell, typography, controls, cards, tables, tabs, forms, dialogs, and drawers by roughly 15–20% where appropriate without using zoom, transforms, or root-font shortcuts.
- Rebalance desktop breakpoints and dashboard proportions so common 1366–1920px widths use the intended desktop layout and show more useful content above the fold.
- Preserve all colors, navigation, information architecture, workflows, modal positioning, table overflow, and hidden-scrollbar behavior.

## Implementation
- Add semantic density tokens for sidebar, topbar, page spacing, card spacing, controls, rows, headings, and metrics.
- Update shared CRM components and the app shell first, then normalize route-level outliers that bypass shared sizing.
- Keep readable touch targets and existing responsive stacking on narrow screens.

## Verification
- Compare Business Overview at 100% rendering against the supplied target at 1440–1728px desktop sizes.
- Check every existing module route at desktop and mobile for overflow, clipping, spacing regressions, and interaction positioning.
- Verify tables, tabs, sidebar, dialogs, drawers, and scrolling remain functional with no console errors.
