# Reflexión del Proyecto

## ¿Por qué elegiste esa API?
Elegí la **API de Adzuna** porque ofrece datos en tiempo real sobre ofertas de empleo en España, lo cual está directamente relacionado con el objetivo del proyecto. Además, su documentación es clara y permite aplicar filtros como la localización y palabras clave, lo que enriquece la experiencia del usuario. Este proyecto tiene una gran utilidad, ya que me servirá a futuro como herramienta para buscar empleo.

**"El verdadero valor de la programación radica en crear soluciones que mejoren la vida humana, no en escribir líneas de código por escribir. La tecnología debe ser una herramienta para transformar positivamente el mundo que nos rodea."**

## ¿Qué problemas tuviste y cómo los solucionaste?
### 1. **Interactividad con filtros múltiples:**
   - **Problema:** Inicialmente, tuve problemas para sincronizar los filtros seleccionados (ciudad y tecnologías) con la consulta a la API.
   - **Solución:** Implementé una lógica que recoge las selecciones en tiempo real y valida que haya al menos una tecnología seleccionada antes de realizar la consulta.

### 2. **Paginación:**
   - **Problema:** Al cambiar de página, algunos filtros se perdían.
   - **Solución:** Mantuve los valores seleccionados en variables globales que se actualizan al realizar una nueva consulta.

### 3. **API de predicción (OpenAI/Hugging Face):**
   - **Problema:** Intenté implementar análisis de tecnologías con IA para extraer automáticamente tecnologías y frameworks (como Spring de Java) de las descripciones de ofertas de trabajo mediante APIs como ChatGPT y Hugging Face.
   - **Solución:** Aunque no pude obtener los resultados deseados utilizando ChatGPT debido a los créditos, logré filtrar el texto en el playground de Hugging Face con el modelo **Qwen**. Sin embargo, no conseguí que devolviera los frameworks en el formato necesario para su integración mediante llamadas a APIs.

### 4. **`details.html`:**
   - **Problema:** Decisión sobre el diseño y omisión de la página `details.html`.
   - **Solución:** Opté por que los enlaces de los empleos apunten directamente a la página oficial de Adzuna, ya que la API proporciona un enlace redirigido a la oferta original. Esto mejora la experiencia del usuario, evitando redundancias y garantizando una experiencia más directa.

### 5. **CORS y servidor:**
   - **Problema:** Inicialmente, probé varias APIs diferentes antes de decidirme por Adzuna, y uno de los principales problemas fue el **CORS**.
   - **Solución:** Para resolverlo, creé un servidor backend en Node.js que manejara las solicitudes a las APIs de manera segura. Sin embargo, cuando me decidí por la API de Adzuna, descubrí que no tenía problemas de CORS, ya que su API permite hacer solicitudes directamente desde el navegador. Esto simplificó el proyecto y me permitió mantenerlo como una aplicación estática sin necesidad de un servidor backend. Opté por manejar la API Key directamente en las páginas del frontend.

## Nota y autoevaluación

### **Nota: 8/10**

Me pongo esta nota porque:
- Cumplí con la mayoría de los objetivos planteados.
- La aplicación es funcional y fácil de usar.
- Aprendí a trabajar con múltiples APIs y a manejar errores.
- Sin embargo, aún puedo mejorar en áreas como optimizar el flujo de la aplicación y añadir filtros adicionales (como salario o tipo de contrato).

### ¿Qué podría mejorar?
- Optimizar el código dividiendo la lógica en funciones más pequeñas y reutilizables.
- Aprender más a fondo **JavaScript**, ya que aún tengo dificultades para implementarlo de manera eficiente.
- Mejorar mis habilidades con **CSS**, ya que actualmente es un área en la que soy nefasto.

## Conclusión
Este proyecto me ayudó a mejorar mis habilidades en:
- Conexión con **APIs** y manejo de datos en tiempo real.
- **Diseño responsive** para adaptarse a dispositivos móviles.
- **Manejo de eventos** y manipulación del **DOM** con **JavaScript**.

Y como nota de avaluación me pongo un 8 también 😁.

