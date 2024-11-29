# Reflexión del Proyecto

## ¿Por qué elegiste esa API?
Elegí la API de Adzuna porque ofrece datos en tiempo real sobre ofertas de empleo en España, lo cual está directamente relacionado con el objetivo del proyecto. Además, su documentación es clara y permite aplicar filtros como la localización y palabras clave, que enriquecen la experiencia del usuario.

## ¿Qué problemas tuviste y cómo los solucionaste?
### Problemas principales:
1. **Interactividad con filtros múltiples:** Inicialmente, tuve problemas para sincronizar los filtros seleccionados (ciudad y tecnologías) con la consulta a la API.
   - **Solución:** Implementé una lógica que recolecta las selecciones en tiempo real y valida que haya al menos una tecnología seleccionada antes de realizar la consulta.

2. **Paginación:** Al cambiar de página, algunos filtros se perdían.
   - **Solución:** Mantuve los valores seleccionados en variables globales que se actualizan al realizar una nueva consulta.

3. **API de predicción (OpenAI):** Fue un reto integrar una funcionalidad que analizara las descripciones obtenidas de Adzuna.
   - **Solución:** Usé una llamada adicional a la API de OpenAI para generar una predicción basada en las descripciones y la mostré en la interfaz.
    
4. **details.html:** Justificación de la elección del diseño y omisión de details.html.
   - **Solución:** "He decidido que los enlaces de los empleos apunten directamente a la página oficial de Adzuna, ya que la API proporciona un enlace redirigido a la oferta original. Esto garantiza una experiencia de usuario directa y evita redundancias.".

## Nota y autoevaluación
### Nota: **7.95/10**
Me pongo esta nota porque:
- Cumplí con la mayoría de los objetivos planteados.
- La aplicación es funcional y fácil de usar.
- Aprendí a trabajar con múltiples APIs y a manejar errores.
- Sin embargo, podría haber optimizado el flujo de la aplicación añadiendo filtros adicionales para afinar aún más la búsqueda de empleos, como por ejemplo, filtros por salario o tipo de contrato.

### ¿Qué podrías mejorar?
- Optimizar el código dividiendo la lógica en funciones más pequeñas y reutilizables.
- Aprender JavaScript en profundidad, ya que aún no entiendo completamente algunos aspectos del lenguaje y me cuesta implementarlo de manera eficiente.
- Mis habilidades con CSS son bastante nefastas, y es un área en la que definitivamente necesito mejorar.

## Conclusión
Este proyecto me ayudó a mejorar mis habilidades en:
- Conexión con APIs.
- Diseño responsive para móviles.
- Manejo de eventos y manipulación del DOM con JavaScript.
