# Architecture — Landing de la fábrica

## Summary

La home lee un módulo de copy por idioma (`getLanding`). El idioma sale de la cookie `ix_locale` (default `es`) en el layout, que fija `lang` y entrega los mensajes de cromo a un provider de cliente. El flujo de la fábrica es un client island: lista ordenada de botones más un panel. El formulario de contacto no cambia de contrato; muestra etiquetas según el idioma.

## Context diagram

```text
Visitante
  → cookie ix_locale (ausente = es)
  → layout (lang, metadata)
      → AppShell + mensajes
      → Home (getLanding)
          → FactoryFlow (paso activo)
          → ContactForm → POST /api/contact (enum de interés sin cambios)
```

## Components

| Component | Responsibility | Notes |
| --------- | -------------- | ----- |
| `getLocale` / `getMessages` | Idioma y cromo | Cookie http solo leída en servidor |
| `I18nProvider` | Mensajes para header, cookies, formulario, assessment | Default español si falta provider |
| `LanguageSwitch` | Escribe `ix_locale` y refresca | `aria-pressed` |
| `getLanding` | Copy de la home ES/EN | Sin stack ni métricas |
| `FactoryFlow` | Imagen de la fábrica según idioma, lightbox y recorrido de seis pasos | WebP en `public/media/`; diálogo nativo para ampliar |
| Home sections | Hero, problema, beneficios, automejora, equipo, casos, cierre | Server components con copy por props |
| Nav | Enlaces planos al ancla o a contacto | Ya no usa el mega-menú de servicios |

## Data

- **Stored:** cookie `ix_locale` (`es` \| `en`). Consentimiento de cookies, igual que antes.
- **Sensitive:** el lead sigue saliendo solo por el adaptador de servidor. Esta landing no agrega datos nuevos.
- **Flows:** el contenido de marketing no se hardcodea en el JSX de las secciones; vive en `src/content/landing.ts` y `src/i18n/`.

## Key decisions

| Decision | Choice | Why |
| -------- | ------ | --- |
| Idioma | Cookie + render de servidor | El HTML ya nace en español o inglés, sin parpadeo |
| Diagrama | HTML + CSS, no un canvas | Se lee, se enfoca y se reacomoda |
| Paleta | Tokens globales índigo | El cromo existente hereda el acento |
| Repo fábrica | No citado en la UI | No hubo acceso; el copy usa solo las metodologías pedidas |
| Páginas internas | Rutas vivas, fuera del menú | Evita mezclar el relato nuevo con el catálogo en inglés |

## Risks

- Copy de automejora genérico hasta poder leer la fábrica → marcado TBD; no se rellenó con herramientas.
- Páginas `/services` y `/industries` siguen en inglés si alguien entra por URL → decisión abierta.
- `cookies()` vuelve dinámica la app → aceptable para una landing con idioma.
