# Global hidden-scrollbar and overflow cleanup

## Scope
- Add one global cross-browser scrollbar-hiding rule while preserving wheel, trackpad, touch, and keyboard scrolling.
- Apply it automatically to page scrolling and all intentional vertical or horizontal overflow regions, including sidebar, tables, tabs, menus, dialogs, and long panels.
- Audit the application shell for competing page scroll containers and accidental horizontal overflow without changing existing dimensions or layout.
- Preserve table overflow, modal viewport limits, and all existing sticky behavior.

## Verification
- Check every existing module route at desktop and narrow viewport sizes.
- Confirm scroll positions can change while native scrollbar visuals remain hidden.
- Confirm no page-level horizontal overflow, clipped content, console errors, or layout shifts.

## Technical details
- Use standards-based `scrollbar-width: none`, legacy `-ms-overflow-style: none`, and WebKit scrollbar suppression.
- Keep existing `overflow-auto` and `overflow-scroll` behavior intact; do not replace necessary scrolling with clipping.
