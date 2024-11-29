# Web Móvil de Empleos IT en España

## Descripción

Este proyecto es una aplicación web diseñada para dispositivos móviles que permite a los usuarios buscar ofertas de empleo en el sector IT en España, filtrando por ciudad y tecnologías deseadas. Los resultados se obtienen desde la API pública de Adzuna y muestran enlaces directos a las ofertas reales.

## Características

-   Filtros avanzados: Selección de ciudad y tecnologías IT.
-   Lista interactiva: Ofertas de empleo presentadas en tarjetas con enlaces a Adzuna.
-   Paginación: Navega entre múltiples páginas de resultados.
-   Predicción de empleos: Genera un análisis de las tecnologías más demandadas utilizando la API de OpenAI.

## Tecnologías utilizadas

-   HTML5: Para la estructura de la aplicación.
-   CSS3: Para los estilos responsivos y personalizados.
-   JavaScript (ES6+): Para la lógica de conexión con la API y la manipulación del DOM.
-   API de Adzuna: Para obtener datos de empleos en tiempo real.
-   API de OpenAI: Para analizar las ofertas obtenidas.

## Instrucciones de uso

1.  Clona este repositorio:  
    git clone  [https://github.com/tu-usuario/web-movil-api.git](https://github.com/tu-usuario/web-movil-api.git)
2.  Copia y pega la API KEY que he adjuntado en aules en ->script.js ->const apiKey.
3.  Abre el archivo index.html en un navegador.
4.  Selecciona una ciudad y las tecnologías de tu interés.
5.  Haz clic en "Obtener Ofertas" para cargar las vacantes disponibles.
6.  Usa los botones "Anterior" y "Siguiente" para navegar entre páginas.
7.  Haz clic en un empleo para ir a su página oficial en Adzuna.
8.  Utiliza el botón "Predecir empleo" para recibir un análisis rápido de las tecnologías más demandadas.

## Cómo contribuir

1.  Haz un fork del repositorio.
2.  Crea una rama para tus cambios:  
    git checkout -b feature/nueva-funcion
3.  Realiza un pull request describiendo tus cambios.

## Créditos

-   Desarrollador: Javier Mengual
-   API utilizada: Adzuna
-   Estilo inspirado en: Diseño minimalista para dispositivos móviles.

**Licencia**  
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más información.
