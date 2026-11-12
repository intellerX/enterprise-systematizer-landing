# Requirements — Fondo 3D del hero

## Functional

| ID | Requirement | Priority | Notes |
| ---- | ----------- | -------- | ----- |
| H1 | El hero muestra la escena Three.js previa al rediseño: paneles flotantes, nodos y una grilla, con rotación del grupo | must | Mismo enfoque que `HeroScene` en `96993d2^` |
| H2 | La escena va detrás del copy y de los CTAs, con opacidad baja para que el texto se lea | must | `pointer-events: none` |
| H3 | En pantallas anchas, el scroll y el puntero desplazan la escena (parallax) | must | Sutil |
| H4 | Con `prefers-reduced-motion: reduce`, la escena queda en un fotograma quieto | must | Sin bucle ni parallax |
| H5 | En viewports estrechos la escena baja de detalle y no anima | must | Umbral 759px, el mismo corte del lightbox |
| H6 | Three.js se carga solo en el cliente, después del primer paint | must | El HTML estático no depende de WebGL |

## Non-functional

| ID | Requirement | Priority | Notes |
| ---- | ----------- | -------- | ----- |
| N1 | Colores alineados a índigo / azul (`--accent`, `--accent-2`) | must | Sustituye el verde del hero anterior |
| N2 | El export estático con `basePath` sigue generando `out/` | must | Sin URLs absolutas de assets nuevas |
| N3 | El copy y el resto de secciones no cambian | must | |

## Constraints

- Librería: `three`, ya en dependencias. No agregar otra librería 3D.
- No reintroducir el video de `HeroMedia`.

## Open questions

- Ninguna que bloquee esta entrega. El nombre “planeta” del pedido no coincide con el código; se restaura el componente que sí existía.
