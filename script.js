let currentPage = 1;
let sortByDate = false; // Inicialmente no se ordena por fecha

$(document).ready(function () {
    const commonConfig = {
        placeholder: "Selecciona una opción",
        allowClear: true,
        closeOnSelect: false,
        minimumResultsForSearch: Infinity,
    };

    $('#ciudad').select2({ ...commonConfig, closeOnSelect: true });
    $('#technologies').select2(commonConfig);

    // Cambiar el estado de la ordenación por fecha
    $('#sortByDate').on('change', function () {
        sortByDate = $(this).is(':checked');  // Cambia el valor de sortByDate según el checkbox
        obtenerEmpleos();  // Llama a obtenerEmpleos después de cambiar la opción
    });

    $(document).on('click touchstart', (e) => {
        if (!$(e.target).closest('.select2-container').length) {
            $('#technologies, #ciudad').select2('close');
        }
    });

    $('#prevPage, #nextPage').on('click', function () {
        cambiarPagina($(this).attr('id') === 'nextPage' ? 1 : -1);
    });
});


function obtenerEmpleos() {
    const ciudad = $('#ciudad').val();
    const tecnologias = $('#technologies').val();

    if (!tecnologias || tecnologias.length === 0) {
        alert('Selecciona al menos una tecnología.');
        return;
    }

    // Unir tecnologías en una cadena separada por " AND "
    const tecnologiasQuery = tecnologias.map((t) => `"${t}"`).join(' AND ');

    // Normalizar y codificar la ciudad
    const ciudadNormalizada = ciudad.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const url = `https://api.adzuna.com/v1/api/jobs/es/search/${currentPage}?app_id=def323be&app_key=91e6dd50eb9779648a646f2b425a27a5&what=${tecnologiasQuery}&where=${encodeURIComponent(ciudadNormalizada)}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const empleos = data.results || [];
            const lista = $('#empleos').empty();

            if (empleos.length === 0) {
                lista.append('<p>No se encontraron empleos.</p>');
                return;
            }

            // Ordenar por fecha si la opción está activada
            if (sortByDate) {
                empleos.sort((a, b) => new Date(b.created) - new Date(a.created));
            }

            // Renderizar resultados
            empleos.forEach((empleo) => {
                lista.append(`
                    <div class="oferta">
                        <h3><a href="${empleo.redirect_url}" target="_blank">${empleo.title}</a></h3>
                        <p><strong>Empresa:</strong> ${empleo.company.display_name || 'No disponible'}</p>
                        <p><strong>Ubicación:</strong> ${empleo.location.display_name || 'No disponible'}</p>
                        <p><strong>Fecha:</strong> ${new Date(empleo.created).toLocaleDateString()}</p>
                    </div>
                `);
            });

            $('#prevPage').prop('disabled', currentPage <= 1);
            $('#nextPage').prop('disabled', empleos.length < 10); // Asume 10 por página
        })
        .catch((error) => console.error('Error:', error));
}


function cambiarPagina(increment) {
    currentPage += increment;

    // Desplazamiento suave hacia el contenedor principal de empleos
    const scrollContainer = document.getElementById('empleos');

    // Función para realizar un desplazamiento suave con easing
    function smoothScrollTo(target, duration) {
        const start = window.pageYOffset;  // Posición actual
        const end = target.offsetTop;  // Posición final
        const distance = end - start;  // Distancia a recorrer
        const startTime = performance.now();  // Marca de tiempo de inicio

        // Función de easing para un desplazamiento más natural
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Easing (suaviza el movimiento)
        }

        function scroll() {
            const currentTime = performance.now();  // Marca de tiempo actual
            const timeElapsed = currentTime - startTime;
            const progress = timeElapsed / duration;  // Progreso de la animación

            if (progress < 1) {
                const easedProgress = easeInOutQuad(progress); // Aplica easing
                window.scrollTo(0, start + (distance * easedProgress));  // Desplazamiento suave
                requestAnimationFrame(scroll);  // Continuar la animación
            } else {
                window.scrollTo(0, end);  // Asegura que llega al destino
            }
        }

        scroll();  // Iniciar desplazamiento
    }

    // Llama a la función de desplazamiento suave
    smoothScrollTo(scrollContainer, 1000);  // 1000ms para un desplazamiento más suave
    obtenerEmpleos();
}
