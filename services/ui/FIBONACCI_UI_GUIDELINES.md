# Fibonacci Sizing Guidelines for the UI

Use these guidelines when adding or changing UI elements in Pairfy. Fibonacci
is a sizing and spacing reference—not a rule to make every value a Fibonacci
number regardless of usability or visual fit.

## Available scale

The shared tokens are defined in `src/assets/css/main.css`:

| Token | Size |
| --- | ---: |
| `fib-1` | 5 px |
| `fib-2` | 8 px |
| `fib-3` | 13 px |
| `fib-4` | 21 px |
| `fib-5` | 34 px |
| `fib-6` | 55 px |
| `fib-7` | 89 px |

Use the generated Tailwind utilities, for example `gap-fib-3`, `p-fib-4`,
`h-fib-5`, and `w-fib-5`. Prefer these shared tokens over one-off spacing or
dimension values when they fit the design.

## Choosing a size

- Use `fib-1` and `fib-2` for tight gaps and compact internal spacing.
- Use `fib-3` and `fib-4` for common gaps, padding, and separation between
  related content.
- Use `fib-5` for compact component dimensions. Feed and composer avatars are
  34 px; keep them at this size unless the design clearly calls for a larger
  avatar.
- Use `fib-6` and `fib-7` sparingly for prominent controls or larger structural
  areas. A larger Fibonacci value is not automatically a better choice: the
  55 px feed avatars felt oversized, so they were reduced to 34 px.

Choose a token based on the element's role, surrounding content, and available
space. Keep visual hierarchy intentional; do not scale every element up just
to use a higher Fibonacci value.

## Accessibility and responsive behavior

- Keep interactive hit areas comfortably usable. If a compact visual element
  is smaller than the target size, provide a larger clickable area with
  padding or a wrapper.
- Check the layout at mobile and desktop widths. Fibonacci sizing must not
  cause clipped text, overflow, crowded navigation, or unnecessarily tall
  screens.
- Preserve safe-area insets and existing responsive breakpoints.
- Exact Fibonacci dimensions are not required for grid columns, breakpoints,
  image aspect ratios, or other values where content and viewport constraints
  are more important.

## Typography and exceptions

Keep typography on the separate type scale documented in `TYPOGRAPHY.md`.
Do not force font sizes or line heights onto this spacing scale; readability
and text hierarchy take priority.

Small functional values such as icon sizes, borders, and focus outlines may
remain outside the scale when required by the component or accessibility.
Introduce a new token only when it solves a recurring need, and define it in
the shared theme rather than scattering new arbitrary values through the UI.

## Validation

After changing sizing, run `npm run build` from `services/ui` and review the
result in light and dark themes at mobile and desktop widths. Confirm that the
generated Fibonacci utility classes are present and that the new dimensions
feel balanced in context.
