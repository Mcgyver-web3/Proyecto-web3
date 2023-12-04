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
                        detallesContainer.innerHTML = construirDetallesInvestigacion(datosInvestigacion, datosUsuario.gradoAcademico, datosUsuario.email);
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

function construirDetallesInvestigacion(datosInvestigacion, gradoAcademico, email) {
    return `
        <h2>${datosInvestigacion.titulo}</h2>
 
        <div class="container-fluid mt-4">
        <div class="row">
          <!-- DISCIPLINA Column -->
          <div class="col-md-3 d-flex flex-column">
            <div class="card shadow">
              <div class="card-header alert-link ">INFORMACIÓN GENERAL</div>
              <div class="card-body">
                <p>Área de interés: ${datosInvestigacion.area}</p>
                <p>Grado académico: ${gradoAcademico || 'Información no disponible'}</p>
              </div>
            </div>
            <div class="card flex mt-4 shadow fade-in-cardMiddle">
                <div class="card-header alert-link">INVESTIGACIÓN</div>
                <div class="card-body">
                    <img src="img/listInvest/pdf.png" alt="PDF" class="categoria-imagen"> 
                    <!-- More content can be added here -->
                </div>
            </div>
            <div class="card flex-fill mt-4 shadow fade-in-cardMiddle">
                <div class="card-header alert-link">DESCRIPCIÓN</div>
                <div class="card-body">
                <p>${datosInvestigacion.descripcion}</p>
                  
                </div>
            </div>
            <div class="card flex mt-4 shadow fade-in-cardMiddle">
                <div class="card-header alert-link">INFORMACIÓN DE CONTACTO:</div>
                <div class="card-body">
                <p>Email: ${email || 'Información no disponible'}</p>
                </div>
            </div>
          </div>
          
          <!-- MAIN CONTENT Middle Column, ajustado a col-md-6 para totalizar 12 columnas en la fila -->
          <div class="col-md-6 d-flex-fill flex-column">
            <!-- Existing Card -->
            <div class="card mb-3 shadow">
              <img src="img/principal/circulo1.jpeg" class="card-img-top img-fluid" alt="Descripción de la imagen">
              
              <!-- Image content here -->
            </div>
          </div>
          
          <!-- Right Column, ajustado a col-md-3 para igualar al de la DISCIPLINA Column -->
<div class="col-md-3">
<div class="d-flex flex-column h-100">
  <!-- CONCLUSIÓN Card -->
  <div class="card shadow mb-2 flex-fill"> <!-- mb-2 para un pequeño margen entre los cards -->
    <div class="card-header alert-link">CONCLUSIÓN:</div>
    <div class="card-body">
      <!-- Content here -->
    </div>
  </div>
  <!-- RECOMENDACIÓN Card -->
  <div class="card shadow flex-fill mt-3">
    <div class="card-header alert-link">RECOMENDACIÓN:</div>
    <div class="card-body">
      GFDGGGGGGGGG
    </div>
  </div>
</div>
</div>

          
        </div>
      </div>
    `;
}
