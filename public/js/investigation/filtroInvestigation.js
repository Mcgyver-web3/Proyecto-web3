$(document).ready(function() {
    var db = firebase.apps[0].firestore();

    // Función para cargar las investigaciones desde Firestore
    function cargarCategorias() {
        db.collection("datosInvestigacion").get().then(querySnapshot => {
            const tabla = $('#tablaAllInvestigation');
            tabla.empty(); // Limpia el contenido actual de la tabla
            let investigacionesHtml = [];

            querySnapshot.forEach(doc => {
                let datosInvestigacion = doc.data();
                if (datosInvestigacion.userId) {
                    db.collection("datosUsuarios").where("idemp", "==", datosInvestigacion.userId).get().then(querySnapshotUsuario => {
                        if (!querySnapshotUsuario.empty) {
                            let datosUsuario = querySnapshotUsuario.docs[0].data();
                            let gradoAcademico = datosUsuario.gradoAcademico || 'Grado no especificado';
                            let tarjetaHtml = construirTarjetaInvestigacion(datosInvestigacion, gradoAcademico);
                            investigacionesHtml.push(tarjetaHtml);
                        }
                    });
                }
            });

            Promise.all(investigacionesHtml).then(res => {
                tabla.html(`<div class="row">${res.join('')}</div>`);
            });
        });
    }

    // Función para construir el HTML de cada tarjeta de investigación
    function construirTarjetaInvestigacion(datosInvestigacion, gradoAcademico) {
        return `
            <div class="col-md-4 card">
                <div class="card-header">
                    <h5 class="card-title">${datosInvestigacion.titulo}</h5>
                </div>
                <div class="card-body">
                    <p class="area-interes">${datosInvestigacion.area}</p>
                    <p class="grado-academico">${gradoAcademico}</p>
                    <p class="card-text">${datosInvestigacion.descripcion}</p>
                </div>
            </div>
        `;
    }

    // Función para filtrar investigaciones
    function filtrarInvestigaciones() {
        var filtroArea = $("#filtroArea").val();
        var filtroGrado = $("#filtroGrado").val();

        $(".card").each(function() {
            var tarjeta = $(this);
            var areaInvestigacion = tarjeta.find(".area-interes").text();
            var gradoInvestigacion = tarjeta.find(".grado-academico").text();

            var coincideArea = filtroArea === 'Selecciona un área' || areaInvestigacion === filtroArea;
            var coincideGrado = filtroGrado === 'Selecciona un grado' || gradoInvestigacion === filtroGrado;

            if (coincideArea && coincideGrado) {
                tarjeta.show();
            } else {
                tarjeta.hide();
            }
        });
    }

    // Event listeners para los selectores de filtro
    $("#filtroArea, #filtroGrado").on("change", filtrarInvestigaciones);

    // Cargar investigaciones y aplicar filtrado inicial
    cargarCategorias().then(() => {
        filtrarInvestigaciones();
    });
});
