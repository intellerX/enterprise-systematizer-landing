# Overview — Fondo 3D del hero

## Problem

El rediseño de la fábrica (PR #4) dejó el hero plano. Antes, la home tenía un objeto 3D animado detrás del contenido y eso le daba movimiento. Quien recuerda la página lo describe como un planeta que rota; en el repo el objeto es otro.

## Goals

- Volver a mostrar ese objeto como capa de fondo del hero, con la misma librería y el mismo enfoque visual.
- Adaptar los colores a la paleta índigo actual sin tapar el texto.
- Parallax sutil con scroll y puntero en pantallas grandes.

## Non-goals

- Cambiar copy, orden de secciones o el relato de la fábrica.
- Volver al video de ambiente ni a la paleta verde anterior.
- Inventar un planeta nuevo: el historial no tiene una malla de planeta.

## Users

- Quien llega a la home y ve el primer pantallazo.

## Success metrics

- En desktop el hero muestra el objeto 3D rotando, con parallax, detrás del texto.
- `npm run build` (export estático) termina sin error.

## Assumptions / Decisions

| Topic | Decision | Notes |
| ----- | -------- | ----- |
| Objeto real | `HeroScene`: paneles y nodos de vidrio en Three.js, el grupo rota y el scroll lo desplaza | `specs/001-design-improvements/` y `HeroScene.tsx` antes de `96993d2`. No hay commit con “planet”. |
| Dónde vive | Fondo del hero actual, no un hero nuevo | El copy y el panel de highlights siguen |
| Pantallas chicas | Menos geometría y un fotograma estático | Rendimiento móvil |
| Movimiento reducido | Un fotograma estático, sin parallax | `prefers-reduced-motion` |

## Status

- **Phase:** done
- **Owner:** TBD
- **Related:** `specs/001-design-improvements/`, `specs/002-factory-landing/`
