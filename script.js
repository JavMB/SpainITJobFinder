let currentPage = 1; // Inicia en la primera página de resultados
let isPopupShown = false; // Bandera para controlar si el popup ya fue mostrado

// Función para mostrar las tecnologías seleccionadas
function actualizarSeleccion() {
    const selectedTechnologies = Array.from(document.querySelectorAll('#options-container input:checked'))
        .map(input => input.value);

    document.getElementById('selected-technologies').textContent = selectedTechnologies.length > 0
        ? selectedTechnologies.join(', ') 
        : 'Selecciona las tecnologías'; 
}

// Función para obtener los empleos
function obtenerEmpleos() {
    const ciudad = document.getElementById('ciudad').value;
    const selectedTechnologies = Array.from(document.querySelectorAll('#options-container input:checked'))
        .map(input => input.value);

    if (selectedTechnologies.length === 0) {
        if (!isPopupShown) {
            alert('Por favor, selecciona al menos una tecnología para obtener ofertas de empleo.');
            isPopupShown = true;
        }
        return;
    }

    const technologies = selectedTechnologies.join(',');
    const url = `https://api.adzuna.com/v1/api/jobs/es/search/${currentPage}?app_id=def323be&app_key=91e6dd50eb9779648a646f2b425a27a5&what=${technologies}&where=${ciudad}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const empleos = data.results;
            const listaEmpleos = document.getElementById('empleos');
            listaEmpleos.innerHTML = '';

            empleos.forEach(empleo => {
                const oferta = document.createElement('div');
                oferta.innerHTML = `
                    <h3><a href="${empleo.redirect_url}" target="_blank">${empleo.title}</a></h3>
                    <p><strong>Empresa:</strong> ${empleo.company.display_name || 'No disponible'}</p>
                    <p><strong>Ciudad:</strong> ${empleo.location.display_name || 'No disponible'}</p>
                    <p><strong>Fecha de publicación:</strong> ${new Date(empleo.created).toLocaleDateString()}</p>
                    <hr>
                `;
                listaEmpleos.appendChild(oferta);
            });

            document.getElementById('prevPage').disabled = currentPage <= 1;
            document.getElementById('nextPage').disabled = data.results.length === 0;
        })
        .catch(error => {
            console.error('Error al obtener los empleos:', error);
        });
}

// Cambiar de página
function cambiarPagina(increment) {
    currentPage += increment;
    obtenerEmpleos();
}

// Mostrar/ocultar opciones del select
document.querySelector('.select-box').addEventListener('click', function () {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.classList.toggle('visible');
});

document.querySelectorAll('#options-container input').forEach(input => {
    input.addEventListener('change', actualizarSeleccion);
});

// Mostrar las selecciones de ciudad y tecnologías
function mostrarSeleccion() {
    const ciudad = document.getElementById('ciudad').value;
    const selectedTechnologies = Array.from(document.querySelectorAll('#options-container input:checked'))
        .map(input => input.value)
        .join(', ');

    document.getElementById('ciudad-seleccionada').textContent = ciudad || 'Ninguna';
    document.getElementById('tecnologias-seleccionadas').textContent = selectedTechnologies.length > 0 ? selectedTechnologies : 'Ninguna';

    if (ciudad || selectedTechnologies.length > 0) {
        document.getElementById('mostrarselects').classList.remove('hidden');
    } else {
        document.getElementById('mostrarselects').classList.add('hidden');
    }
}

document.getElementById('ciudad').addEventListener('change', mostrarSeleccion);
document.querySelectorAll('#options-container input').forEach(input => {
    input.addEventListener('change', mostrarSeleccion);
});



async function predecirEmpleo() {
    const listaEmpleos = document.querySelectorAll('#empleos div');
    const descripciones = Array.from(listaEmpleos).map(div => div.innerText).join('\n\n');

    if (descripciones.length === 0) {
        alert('Primero busca empleos antes de usar esta función.');
        return;
    }

    const prompt = `
        Analiza las siguientes descripciones de empleos y responde:
        1. ¿Cuáles son las tecnologías más demandadas?
        2. Da un consejo breve para los candidatos en base a esta información.
        Descripciones:
        ${descripciones}
    `;

    const apiKey = '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';
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 150
        })
    });

    const data = await response.json();
    const prediccion = data.choices[0]?.text || 'No se pudo generar una predicción.';

    document.getElementById('prediccion').innerText = prediccion;
}
