// InvestigationDetails.js
document.addEventListener('DOMContentLoaded', function() {
    const idInvestigacion = obtenerIdDesdeURL();
    if (idInvestigacion) {
        cargarDetallesInvestigacion(idInvestigacion);
    } else {
        document.getElementById('detalleInvestigacion').innerHTML = '<p>No se ha proporcionado ID de investigación.</p>';
    }
});

function obtenerIdDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Esto obtiene el ID de la URL.
}

function cargarDetallesInvestigacion(id) {
    const detallesContainer = document.getElementById('detalleInvestigacion');
    var db = firebase.firestore(); // Asegúrate de que firebase está inicializado antes de este script

    db.collection("datosInvestigacion").doc(id).get().then(doc => {
        if (doc.exists) {
            const datosInvestigacion = doc.data();
            if (datosInvestigacion.userId) {
                // Ahora buscamos los datos del usuario asociado con la investigación
                db.collection("datosUsuarios").where("idemp", "==", datosInvestigacion.userId).get().then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        const datosUsuario = querySnapshot.docs[0].data();
                        detallesContainer.innerHTML = construirDetallesInvestigacion(datosInvestigacion, datosUsuario.gradoAcademico);
                    } else {
                        detallesContainer.innerHTML = '<p>Detalles del usuario no encontrados para la investigación con ID: ' + id + '.</p>';
                    }
                }).catch(error => {
                    console.error("Error al obtener detalles del usuario: ", error);
                    detallesContainer.innerHTML = '<p>Error al cargar los detalles del usuario.</p>';
                });
            } else {
                detallesContainer.innerHTML = '<p>La investigación no tiene un userId asociado.</p>';
            }
        } else {
            detallesContainer.innerHTML = '<p>Investigación no encontrada.</p>';
        }
    }).catch(error => {
        console.error("Error al obtener detalles de la investigación: ", error);
        detallesContainer.innerHTML = '<p>Error al cargar los detalles de la investigación.</p>';
    });
}

function construirDetallesInvestigacion(datosInvestigacion, gradoAcademico) {
    return `
        <h2>${datosInvestigacion.titulo}</h2>
        <p>${datosInvestigacion.descripcion}</p>
        <p>Área de interés: ${datosInvestigacion.area}</p>
        <p>Grado académico: ${gradoAcademico || 'Información no disponible'}</p>
        <!-- Agrega aquí más campos si son necesarios -->
    `;
}
