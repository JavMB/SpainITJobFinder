# Reflexión del Proyecto

## ¿Por qué elegiste esa API?
Elegí la API de Adzuna porque ofrece datos en tiempo real sobre ofertas de empleo en España, lo cual está directamente relacionado con el objetivo del proyecto. Además, su documentación es clara y permite aplicar filtros como la localización y palabras clave, que enriquecen la experiencia del usuario, aparte es un proyecto con utilidad de uso de cara a un futuro que me servira para buscar empleo. 

"El verdadero valor de la programación radica en crear soluciones que mejoren la vida humana, no en escribir líneas de código por escribir. La tecnología debe ser una herramienta para transformar positivamente el mundo que nos rodea." 

## ¿Qué problemas tuviste y cómo los solucionaste?
### Problemas principales:
1. **Interactividad con filtros múltiples:** Inicialmente, tuve problemas para sincronizar los filtros seleccionados (ciudad y tecnologías) con la consulta a la API.
   - **Solución:** Implementé una lógica que recolecta las selecciones en tiempo real y valida que haya al menos una tecnología seleccionada antes de realizar la consulta.

2. **Paginación:** Al cambiar de página, algunos filtros se perdían.
   - **Solución:** Mantuve los valores seleccionados en variables globales que se actualizan al realizar una nueva consulta.

3. **API de predicción (OpenAI/Hugging Face's):** Intento de implementación de análisis de tecnologías con IA:

   Objetivo: Extraer automáticamente tecnologías y frameworks (como Spring de Java) de las descripciones de ofertas de trabajo mediante APIs de modelos IA, como ChatGPT y Hugging Face.

   Problema: A pesar de los intentos con modelos como ChatGPT, estos requieren créditos y no pude. Con modelos de Hugging Face como Qwen, logré filtrar el texto en su playground de la web, pero no    conseguí que devolviera los frameworks en el formato necesario mediante llamadas apis.
    
4. **details.html:** Justificación de la elección del diseño y omisión de details.html.
   - **Solución:** "He decidido que los enlaces de los empleos apunten directamente a la página oficial de Adzuna, ya que la API proporciona un enlace redirigido a la oferta original. Esto garantiza una experiencia de usuario directa y evita redundancias.".
   
5. **CORS y server:** Inicialmente, probé varias APIs diferentes antes de decidirme por este proyecto, y uno de los principales problemas fue el CORS. Para resolver esto, comencé a crear un servidor backend en Node.js que manejara las solicitudes a las APIs de manera segura, evitando los problemas de CORS.

   Sin embargo, cuando decidí utilizar la API de Adzuna, me di cuenta de que no tenía problemas con CORS, ya que su API permite hacer solicitudes directamente desde el       navegador sin restricciones. Esto me permitió simplificar el proyecto y mantenerlo como una aplicación estática, eliminando la necesidad de un servidor backend.
   
 - **Solución:** "Debido a esto, decidí manejar la API Key directamente en las páginas del frontend y no a través de un archivo .env, ya que la API de Adzuna no requiere un servidor intermedio y se puede acceder de forma segura desde el cliente.".  
     

## Nota y autoevaluación
### Nota: **7.99/10**
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
