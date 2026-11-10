# Overview — Landing de la fábrica intellerX

## Problem

La landing actual no vende. Habla de “ingeniería pragmática” en inglés, con un catálogo amplio que no engancha a quien necesita adaptar su empresa a la AI. El visitante no entiende la oferta: una fábrica de software potenciada por AI, con calidad por encima de todo.

## Goals

- Rehacer la home para vender la fábrica, en español latino cercano y profesional (idioma por defecto).
- Mantener inglés utilizable y sincronizado en el mismo relato (puede ser más básico).
- Contar el mensaje central, el equipo (ingeniería, Arquitectos AI, AI Seniors) y el lema de calidad.
- Mostrar el flujo de la fábrica y casos por sector, sin métricas inventadas ni nombres de clientes.
- Llevar a contacto con CTAs claros.

## Non-goals

- Nombrar herramientas, modelos o stack. Solo metodologías.
- Inventar cifras, logos, testimonios o nombres de clientes.
- Reescribir el cuerpo de servicios, industrias, insights y páginas legales (siguen en inglés; fuera del menú principal).
- Tema claro o interruptor de tema.

## Users

- Quien decide en una empresa que ya probó AI y no ve cambio en la operación.
- Equipos que necesitan desarrollos complejos y un camino de adopción, no una demo.

## Success metrics

- La home se entiende en el primer pantallazo: qué es intellerX, para quién y cómo se empieza (contacto).
- Build de producción sin errores.
- Contraste y teclado usables en el flujo y en el cambio de idioma.

## Assumptions / Decisions

| Topic | Decision | Notes |
| ----- | -------- | ----- |
| Marca visible | intellerX | Posicionamiento: fábrica de software potenciada por AI |
| Idioma | Español por defecto; inglés por cookie `ix_locale` | `es` si la cookie no es `en` |
| Tema | Oscuro, paleta índigo / azul | Sigue sin tema claro |
| Fuente del relato de fábrica | Metodologías nombradas en el pedido | El repo `intellerX/FireWare_WebPlatform` respondió 404 con las credenciales de este entorno. No se inventan detalles internos. |
| Prueba social | Casos cualitativos por sector | Sin números y sin clientes |
| Conversión | CTAs a `#contacto` y `/contact` | El assessment deja de ser CTA de la home |

## Status

- **Phase:** in-progress (implementado; PR pendiente)
- **Owner:** TBD
- **Related:** `specs/000-product/` (el correo de leads y el tema oscuro siguen vigentes). Esta carpeta manda en la home y en el idioma.
