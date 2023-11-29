var db = firebase.apps[0].firestore();
const tabla = document.querySelector('#tablaCateg');

db.collection("Categories").get().then(function(query){
    tabla.innerHTML = "";
    var salida = "<table class=\"table table-striped\">" +
                 "    <thead>" +
                 "        <tr>" +
                 "            <td><strong>Código</strong></td>" +
                 "            <td><strong>Nombre</strong></td>" +
                 "            <td><strong>Descripción</strong></td>" +
                 "            <td><strong>Imagenes</strong></td>" +
                 "            <td><strong>PDF</strong></td>" +
                 "            <td colspan='2' align='center'><strong>Modificar</strong></td>" +
                 "        </tr>" +
                 "    </thead><tbody>";

    query.forEach(function(doc){
        salida += '<tr>';
        salida += '<td><a href="lstproductos.html?cod=' + doc.data().CategoryID + '">' + doc.data().CategoryID + '</a></td>';
        salida += '<td>' + doc.data().CategoryName + '</td>';
        salida += '<td>' + doc.data().Description + '</td>';

        // Primero agrega las imágenes
        let imagesHTML = '';
        if (doc.data().urlImages) {
            doc.data().urlImages.forEach(url => {
                imagesHTML += '<img src="' + url + '" class="categoria-imagen">';
            });
        } else {
            imagesHTML = 'No disponible';
        }
        salida += '<td>' + imagesHTML + '</td>';

       
        
        let pdfHTML = 'No disponible';
        if (doc.data().urlPdf && doc.data().urlPdf.trim() !== "") {
            pdfHTML = `<a href="${doc.data().urlPdf}" target="_blank">
                          <img src="img/listInvest/pdf.png" alt="PDF" class="categoria-imagen"> 
                          <div>Ver PDF</div>
                       </a>`;
        }
        salida += '<td>' + pdfHTML + '</td>';


        salida += '<td align="center"><a href="modcateg.html?cod=' + doc.data().CategoryID + '">Editar</a></td>';
        salida += '<td align="center"><a href="borcateg.html?cod=' + doc.data().CategoryID + '">Borrar</a></td>';

        salida += '</tr>';
    });

    salida += "</tbody></table>";
    tabla.innerHTML = salida;
});
