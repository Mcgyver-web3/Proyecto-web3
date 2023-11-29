var db = firebase.apps[0].firestore();
const tabla = document.querySelector('#tablaCateg');

// Llama a cargarCategorias directamente cuando la página se carga
cargarCategorias();

function cargarCategorias() { 
    db.collection("datosInvestigacion")
      .get()
      .then(function(query){
          tabla.innerHTML = "";
          var salida = "<table class=\"table table-striped\">" +
                       "    <thead>" +
                       "        <tr>" +
                       "            <td><strong>Titulo de la investigación</strong></td>" +
                       "            <td><strong>Área de interés</strong></td>" +
                       "            <td><strong>Descripción</strong></td>" +
                       "            <td><strong>Imagenes</strong></td>" +
                       "            <td><strong>PDF</strong></td>" +
                       "            <td><strong>Conclusión</strong></td>" +
                       "            <td><strong>Recomendación</strong></td>" +
                       "        </tr>" +
                       "    </thead><tbody>";

          query.forEach(function(doc){
              salida += '<tr>';
              salida += '<td>' + doc.data().titulo + '</td>';
              salida += '<td>' + doc.data().area + '</td>';
              salida += '<td>' + doc.data().descripcion + '</td>';

              // Agregar imágenes
              let imagesHTML = '';
              if (doc.data().urlImages) {
                  doc.data().urlImages.forEach(url => {
                      imagesHTML += '<img src="' + url + '" class="categoria-imagen">';
                  });
              } else {
                  imagesHTML = 'No disponible';
              }
              salida += '<td>' + imagesHTML + '</td>';

              // Agregar PDF
              let pdfHTML = 'No disponible';
              if (doc.data().urlPdf && doc.data().urlPdf.trim() !== "") {
                  pdfHTML = `<a href="${doc.data().urlPdf}" target="_blank">
                                <img src="img/listInvest/pdf.png" alt="PDF" class="categoria-imagen"> 
                                <div>Ver PDF</div>
                             </a>`;
              }
              salida += '<td>' + pdfHTML + '</td>';
              salida += '<td>' + doc.data().conclusion + '</td>';
              salida += '<td>' + doc.data().recomendacion + '</td>';

             
              salida += '</tr>';
          });

          salida += "</tbody></table>";
          tabla.innerHTML = salida;
      });
}
