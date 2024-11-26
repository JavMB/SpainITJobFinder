let currentPage = 1; // Inicia en la primera página de resultados

// Función para mostrar las tecnologías seleccionadas
function actualizarSeleccion() {
    // Obtiene todas las tecnologías seleccionadas (checkboxes marcados)
    const selectedTechnologies = Array.from(document.querySelectorAll('#options-container input:checked'))
        .map(input => input.value); // Obtiene el valor de cada tecnología seleccionada

    // Muestra las tecnologías seleccionadas en el texto correspondiente
    document.getElementById('selected-technologies').textContent = selectedTechnologies.length > 0
        ? selectedTechnologies.join(', ') // Si hay tecnologías seleccionadas, las muestra separadas por coma
        : 'Selecciona las tecnologías'; // Si no hay ninguna, muestra un mensaje por defecto
}

// Función para obtener los empleos
function obtenerEmpleos() {
    const ciudad = document.getElementById('ciudad').value; // Obtiene la ciudad seleccionada
    const selectedTechnologies = Array.from(document.querySelectorAll('#options-container input:checked'))
        .map(input => input.value) // Obtiene las tecnologías seleccionadas
        .join(','); // Las une con coma

    // URL de la API para obtener los empleos, utilizando la ciudad y las tecnologías seleccionadas
    const url = `https://api.adzuna.com/v1/api/jobs/es/search/${currentPage}?app_id=def323be&app_key=91e6dd50eb9779648a646f2b425a27a5&what=${selectedTechnologies}&where=${ciudad}`;

    // Hace una solicitud HTTP (fetch) para obtener los datos de la API
    fetch(url)
        .then(response => response.json()) // Convierte la respuesta a formato JSON
        .then(data => {
            const empleos = data.results; // Los resultados de los empleos
            const listaEmpleos = document.getElementById('empleos'); // Contenedor donde se mostrarán los empleos
            listaEmpleos.innerHTML = ''; // Limpiar el contenedor antes de agregar los nuevos empleos

            // Itera sobre cada empleo y lo agrega al contenedor
            empleos.forEach(empleo => {
                const oferta = document.createElement('div'); // Crea un nuevo div para cada empleo
                oferta.innerHTML = `
                    <h3><a href="${empleo.redirect_url}" target="_blank">${empleo.title}</a></h3>
                    <p><strong>Empresa:</strong> ${empleo.company.display_name || 'No disponible'}</p>
                    <p><strong>Ciudad:</strong> ${empleo.location.display_name || 'No disponible'}</p>
                    <p><strong>Fecha de publicación:</strong> ${new Date(empleo.created).toLocaleDateString()}</p>
                    <hr>
                `;
                listaEmpleos.appendChild(oferta); // Agrega el empleo al contenedor
            });

            // Habilita o deshabilita los botones de paginación según la página actual
            document.getElementById('prevPage').disabled = currentPage <= 1; // Deshabilitar "Anterior" si estamos en la primera página
            document.getElementById('nextPage').disabled = data.results.length === 0; // Deshabilitar "Siguiente" si no hay más empleos
        })
        .catch(error => {
            console.error('Error al obtener los empleos:', error); // Muestra el error en caso de que algo falle
        });
}

// Función para cambiar de página
function cambiarPagina(increment) {
    currentPage += increment; // Incrementa o decrementa la página actual
    obtenerEmpleos(); // Llama nuevamente a la función para obtener los empleos de la nueva página
}

// Mostrar/ocultar las opciones del select personalizado
document.querySelector('.select-box').addEventListener('click', function () {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.classList.toggle('visible'); // Cambia la visibilidad del contenedor de opciones
});

// Actualizar la selección de tecnologías cuando cambian los checkboxes
document.querySelectorAll('#options-container input').forEach(input => {
    input.addEventListener('change', actualizarSeleccion); // Llama a la función para actualizar la selección cuando cambia un checkbox
});

// Función para mostrar las selecciones de ciudad y tecnologías en el resumen
function mostrarSeleccion() {
    const ciudad = document.getElementById('ciudad').value; // Obtiene la ciudad seleccionada
    const selectedTechnologies = Array.from(document.querySelectorAll('#options-container input:checked'))
        .map(input => input.value)
        .join(', '); // Obtiene las tecnologías seleccionadas y las une con coma

    // Actualiza el texto del resumen con la ciudad seleccionada
    document.getElementById('ciudad-seleccionada').textContent = ciudad || 'Ninguna'; // Si no se ha seleccionado ciudad, muestra 'Ninguna'
    // Actualiza el texto del resumen con las tecnologías seleccionadas
    document.getElementById('tecnologias-seleccionadas').textContent = selectedTechnologies.length > 0 ? selectedTechnologies : 'Ninguna';

    // Muestra u oculta el div con el resumen según haya alguna selección
    if (ciudad || selectedTechnologies.length > 0) {
        document.getElementById('mostrarselects').classList.remove('hidden'); // Muestra el div si hay algo seleccionado
    } else {
        document.getElementById('mostrarselects').classList.add('hidden'); // Oculta el div si no hay selección
    }
}

// Llamar a esta función cada vez que cambie la selección de ciudad o tecnologías
document.getElementById('ciudad').addEventListener('change', mostrarSeleccion); // Al cambiar la ciudad
document.querySelectorAll('#options-container input').forEach(input => {
    input.addEventListener('change', mostrarSeleccion); // Al cambiar una tecnología
});

// Inicializar la página con los primeros empleos
obtenerEmpleos(); // Llama a la función para obtener los empleos al cargar la página
