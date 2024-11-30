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

    const url = `https://api.adzuna.com/v1/api/jobs/es/search/${currentPage}?app_id=def323be&app_key=91e6dd50eb9779648a646f2b425a27a5&what=${tecnologiasQuery}&where=${encodeURIComponent(ciudad)}`;

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

    // Mueve el scroll hacia el contenedor principal
    document.getElementById('empleos').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });

    obtenerEmpleos();
}
