# Architecture — Fondo 3D del hero

## Summary

`SceneBackdrop` es un client island del hero. Después del paint hace `next/dynamic` con `ssr: false` de `HeroScene`. La escena crea un canvas WebGL (Three.js): paneles, aristas, nodos y grilla. El bucle lee refs de scroll y puntero para no reiniciar el contexto en cada evento.

## Context diagram

```text
Hero
  → SceneBackdrop (cliente, lazy)
      → HeroScene (three)
      → scroll / pointer → refs
  → copy y CTAs (encima, sin cambios)
```

## Components

| Component | Responsibility | Notes |
| --------- | -------------- | ----- |
| `SceneBackdrop` | Capa absoluta, media queries, listeners | No se monta en el servidor |
| `HeroScene` | Renderer, mallas, rotación y parallax | Aislado: si WebGL falla, el hero de texto sigue |
| `Hero` | Compone la capa detrás del grid actual | Sigue recibiendo el copy por props |

## Data

- **Stored:** nada.
- **Sensitive:** nada.
- **Flows:** `scrollY / innerHeight` y el puntero normalizado (−1…1) viven en refs. En `detail=low` o movimiento reducido no hay listeners ni `requestAnimationFrame`.

## Key decisions

| Decision | Choice | Why |
| -------- | ------ | --- |
| Librería | `three`, la de antes | El pedido pide el mismo enfoque |
| Carga | `dynamic(..., { ssr: false })` | El export estático no ejecuta WebGL; los chunks respetan `basePath` |
| Móvil | 3 paneles, sin grilla, pixel ratio 1, un solo render | Menos GPU |
| Paleta | Índigo / cian sobre materiales transparentes | El verde anterior choca con los tokens actuales |
| Parallax | Rotación y cámara, no transformar el texto | El copy queda quieto y legible |

## Risks

- WebGL ausente → el `catch` deja el hero de texto; no hay fallback de imagen nuevo.
- El canvas en un viewport alto cuesta GPU → en estrecho no hay bucle.
