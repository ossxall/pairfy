# Sistema tipográfico · Pairfy

Fuente: Inter Variable. Base de cálculo: `1rem = 16px`. Los tokens viven en
`src/assets/css/main.css` y se aplican con clases `type-*`.

| Token | Tamaño / interlineado | Peso | Tracking | Ejemplo de uso |
| --- | --- | ---: | ---: | --- |
| `display` | 30 / 36 px (`1.875 / 2.25rem`) | 700 | `-0.022em` | `2.400` — cifra destacada |
| `title-1` | 24 / 32 px (`1.5 / 2rem`) | 700 | `-0.019em` | Tu inicio |
| `title-2` | 20 / 28 px (`1.25 / 1.75rem`) | 600 | `-0.017em` | Temas en auge |
| `body-lg` | 17 / 24 px (`1.0625 / 1.5rem`) | 400 | `-0.013em` | Texto de una publicación en detalle |
| `body` | 15 / 22 px (`0.9375 / 1.375rem`) | 400 | `-0.009em` | Un buen diseño no pide atención. |
| `label` | 15 / 20 px (`0.9375 / 1.25rem`) | 600 | `-0.009em` | Lucía Martín · Para ti |
| `caption` | 13 / 18 px (`0.8125 / 1.125rem`) | 400 | `-0.003em` | `@lucia.martin · 12 min` |
| `micro` | 11 / 16 px (`0.6875 / 1rem`) | 500 | `+0.005em` | COMUNIDAD · DISEÑO |

Los contadores usan `font-variant-numeric: tabular-nums`. Los campos de entrada
se fijan en `1rem` (16 px) para evitar el zoom automático de iOS. Los colores
semánticos de texto y superficie están definidos para mantener contraste WCAG
AA tanto en claro como en oscuro.

## Escala de tamaños

El espaciado y los tamaños de componentes usan una escala basada en Fibonacci:
`5, 8, 13, 21, 34, 55, 89 px` (`fib-1` a `fib-7`). Los tokens Tailwind viven
en `src/assets/css/main.css`; se priorizan tamaños mayores para áreas táctiles
y tamaños intermedios para separación y padding. La escala tipográfica se
mantiene independiente para favorecer la legibilidad.
