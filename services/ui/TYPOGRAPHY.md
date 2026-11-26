# Sistema tipográfico · Pairfy

Fuente: Inter Variable. Base de lectura: `0.9375rem = 15px`. Los tokens viven en
`src/assets/css/main.css` y se aplican con clases `type-*`. La jerarquía toma
como referencia Fibonacci (13, 21 y 34 px), con tamaños intermedios para
mantener legibilidad y una separación clara entre roles.

| Token | Tamaño / interlineado | Peso | Tracking | Ejemplo de uso |
| --- | --- | ---: | ---: | --- |
| `display` | 34 / 42 px (`2.125 / 2.625rem`) | 700 | `-0.025em` | `2.400` — cifra destacada |
| `title-1` | 26 / 34 px (`1.625 / 2.125rem`) | 700 | `-0.02em` | Tu inicio |
| `title-2` | 21 / 29 px (`1.3125 / 1.8125rem`) | 600 | `-0.015em` | Temas en auge |
| `body-lg` | 18 / 26 px (`1.125 / 1.625rem`) | 400 | `-0.01em` | Texto de una publicación en detalle |
| `body` | 15 / 22 px (`0.9375 / 1.375rem`) | 400 | `-0.009em` | Un buen diseño no pide atención. |
| `label` | 15 / 20 px (`0.9375 / 1.25rem`) | 600 | `-0.009em` | Lucía Martín · Para ti |
| `caption` | 13 / 18 px (`0.8125 / 1.125rem`) | 400 | `-0.003em` | `@lucia.martin · 12 min` |
| `micro` | 11 / 14 px (`0.6875 / 0.875rem`) | 500 | `+0.008em` | COMUNIDAD · DISEÑO |

Los contadores usan `font-variant-numeric: tabular-nums`. Los campos de entrada
se mantienen en `1rem` (16 px) para evitar el zoom automático de iOS. Los
colores semánticos de texto y superficie están definidos para mantener contraste
WCAG AA tanto en claro como en oscuro.

## Escala de tamaños

El espaciado y los tamaños de componentes usan una escala basada en Fibonacci:
`5, 8, 13, 21, 34, 55, 89 px` (`fib-1` a `fib-7`). Los tokens Tailwind viven
en `src/assets/css/main.css`; se priorizan tamaños mayores para áreas táctiles
y tamaños intermedios para separación y padding. La escala tipográfica se
mantiene independiente de la escala de espaciado para favorecer la legibilidad,
pero toma Fibonacci como referencia para crear jerarquía.
