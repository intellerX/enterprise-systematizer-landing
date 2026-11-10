# Requirements — Landing de la fábrica

La home de `specs/000-product` (F10–F19) queda reemplazada por esta lista. Contacto, secreto del correo de leads, tema oscuro, accesibilidad y build siguen en `000-product`.

## Functional

| ID | Requirement | Priority | Acceptance |
| ---- | ----------- | -------- | ---------- |
| L1 | Home en este orden: hero, problema/solución, beneficios, flujo de la fábrica, automejora, equipo, casos, cierre y contacto | must | Esas secciones están en la home y el catálogo anterior (métricas, industrias genéricas, insights, agentes de arquitectura) no |
| L2 | Hero con gancho, el mensaje central de adaptación a la AI (automatizaciones, desarrollo ágil, operación más efectiva), el lema de calidad y dos CTAs | must | El mensaje central es visible sin hacer scroll en desktop; un CTA lleva a contacto |
| L3 | Diagrama oficial de la fábrica, en el idioma activo, más el recorrido Descubrimiento → Spec (SDD) → Agentes → QA calidad → Entrega → Automejora continua | must | La imagen cambia con ES/EN; en móvil se puede ampliar; cada paso del recorrido se lee con teclado o puntero |
| L4 | Automejora contada como metodología: Bucle de Auto-Mejora (feedback, aprendizaje, innovación), autodocumentación, tokens/costos, contexto, SDD, patrones agénticos, flujos de optimización de AI, AI enterprise | must | No aparecen nombres de herramientas, modelos ni stack |
| L5 | Equipo: expertos en ingeniería, Arquitectos AI y AI Seniors; acompañan un camino de cambio constante | must | Visible en la home |
| L6 | Casos por sector: Educación, Trading, Certificaciones, Inventario, Taxes en EE.UU., Optimización de cálculos empresariales, Dashboards de reportes. Además, alcance en Estados Unidos, India y México: costos operativos, gasto en la nube y dependencias o librerías de más | must | Texto cualitativo; sin cifras ni nombres de clientes |
| L7 | Español por defecto. Control ES/EN que persiste y vuelve a pintar la home y el cromo (nav, formulario, cookies, 404) | must | Sin cookie, `lang=es` y copy en español; con `ix_locale=en`, copy en inglés |
| L8 | CTAs de header, hero y cierre apuntan a contacto | must | El destino muestra el formulario. En el export estático el envío abre el correo del visitante, o WhatsApp / un formulario externo si el build los configura. No hay `/api/contact`. |
| L10 | Export estático para GitHub Pages, con ES/EN en el cliente y `basePath` `/enterprise-systematizer-landing` configurable | must | `next build` escribe `out/` sin error. El workflow despliega en push a `main`. |
| L9 | Nav principal reducida al relato de la fábrica (proceso, beneficios, casos, contacto). El mega-menú de servicios deja de ser la entrada | must | Esos destinos no se ofrecen en header ni footer |

## Non-functional

| ID | Requirement | Priority | Notes |
| ---- | ----------- | -------- | ----- |
| N1 | Paleta oscura índigo/azul, acento tech, contraste de texto y de botón primario | must | Tema claro sigue fuera |
| N2 | Responsive 360–1280 y foco visible | must | Flujo en columna en móvil y en fila ancha en desktop |
| N3 | `prefers-reduced-motion` ya apaga animaciones globales | must | El flujo no depende del movimiento |
| N4 | Build de producción sin errores | must | `npm run build` |

## Constraints

- No inventar requisitos de producto que el pedido no trae. Lo que el repo de la fábrica no dejó leer queda como TBD, no como detalle falso.
- Los valores del enum de interés del formulario no cambian (el servidor y los tests los exigen). Solo cambian las etiquetas visibles.
- El correo de destino de leads no se muestra.

## Open questions

- [ ] ¿Se podrá leer `FireWare_WebPlatform` para afinar la automejora sin nombrar herramientas?
- [ ] ¿Las páginas de servicios, industrias, insights y legales se traducen o se retiran?
- [ ] ¿El assessment sigue publicado, solo sin promoción en la home?
- [ ] ¿País de referencia del español (copy neutro latino por ahora)?
