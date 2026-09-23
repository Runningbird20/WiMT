# ViMT project instructions

These instructions apply to the entire project.

## Required page behavior

Every page created must participate in the record-spin navigation experience unless the user explicitly states otherwise. Apply this default automatically; do not ask for confirmation for each new page.

- Keep new pages within the shared layout with the rounded, centered header and vinyl record at the bottom of the white screen.
- Navigating to any page must trigger the record's full-turn spin and display the selected page's content.
- Update the record's center label to the selected page's name, including for newly added pages.
- Use the same shared navigation and animation behavior for every page. Do not create a standalone page that bypasses the record transition unless explicitly requested.
- Header navigation, in-app links, and browser back/forward navigation must keep the selected page, active navigation state, and record label synchronized.
- Clicking the already selected header item must replay the record spin.
- Keep navigation in the header. Do not add navigation buttons on the record unless explicitly requested; the center label displays the selected page name.
- Preserve reduced-motion support: page navigation and label updates must work without spinning when the user prefers reduced motion.
- An explicitly requested exception applies only to the specified page or behavior; retain the default for other pages.

## Implementation

- This is a React and TypeScript project built with Vite.
- The current shared page list, hash navigation, selected page state, and rotation state live in `src/App.tsx`.
- Record styling and transitions live in `src/App.css`; global styling lives in `src/index.css`.
- Extend the shared page mechanism when adding pages. If refactoring into routes or separate components, preserve the behavior above.
- Use semantic links, visible keyboard focus, and an accurate `aria-current` state. Keep the header usable on small screens.

## Verification

- Run `npm run build` and `npm run lint` after code changes.
- For navigation changes, verify that selecting the new page updates its content, active header item, and record label, and triggers the spin.
- Check repeat selection, browser back/forward navigation, and reduced-motion behavior when changing the navigation or animation implementation.
- Documentation-only changes do not require build or lint checks.
