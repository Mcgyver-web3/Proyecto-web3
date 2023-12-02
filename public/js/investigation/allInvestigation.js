var db = firebase.apps[0].firestore();
const tabla = document.querySelector('#tablaAllInvestigation');

// Llama a cargarCategorias directamente cuando la página se carga
cargarCategorias();

function cargarCategorias() {
    db.collection("datosInvestigacion").get().then(querySnapshot => {
        tabla.innerHTML = "";
        let investigaciones = [];

        querySnapshot.forEach(doc => {
            let datosInvestigacion = doc.data();
            if (datosInvestigacion.userId) {
                // Buscar el documento de usuario correspondiente por su idemp (que debe ser igual al userId)
                let promesaUsuario = db.collection("datosUsuarios").where("idemp", "==", datosInvestigacion.userId).get();
                investigaciones.push(promesaUsuario.then(querySnapshotUsuario => {
                    // Verificar que encontramos un usuario
                    if (!querySnapshotUsuario.empty) {
                        let datosUsuario = querySnapshotUsuario.docs[0].data(); // Tomar el primer documento ya que idemp es único
                        let gradoAcademico = datosUsuario.gradoAcademico || 'Grado no especificado';
                        return construirTarjetaInvestigacion(datosInvestigacion, gradoAcademico);
                    } else {
                        console.error(`No se encontró el usuario con userId: ${datosInvestigacion.userId}`);
                        return construirTarjetaInvestigacion(datosInvestigacion, 'Grado no especificado');
                    }
                }));
            } else {
                console.error(`La investigación con ID: ${doc.id} no tiene userId asociado.`);
            }
        });

        Promise.all(investigaciones).then(investigacionesHtml => {
            tabla.innerHTML = `<div class="row">${investigacionesHtml.join('')}</div>`;
        }).catch(error => {
            console.error("Error al cargar las investigaciones: ", error);
            tabla.innerHTML = '<p>Error al cargar las investigaciones.</p>';
        });
    }).catch(error => {
        console.error("Error al obtener investigaciones: ", error);
        tabla.innerHTML = '<p>Error al cargar las investigaciones.</p>';
    });
}

function construirTarjetaInvestigacion(datosInvestigacion, gradoAcademico) {
    return `
        <div class="col-md-2">
            <div class="card mb-4 shadow-sm">
            <div class="card-header-custom">
            <h5 class="card-title">${datosInvestigacion.titulo}</h5>
            </div>
                <div class="card-body-custom">
                    <h6 class="card-subtitle mb-4 text-muted">Grado académico: ${gradoAcademico}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Área de interes: ${datosInvestigacion.area}</h6>
                    <p class="card-text">${datosInvestigacion.descripcion}</p>
                </div>
            </div>
        </div>
    `;
}

