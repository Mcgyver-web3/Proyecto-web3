// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtCategoryID = document.querySelector('#txtCategoryID');
const txtCategoryName = document.querySelector('#txtCategoryName');
const txtDescription = document.querySelector('#txtDescription');
const txtUrlImage = document.querySelector('#txtUrlImage'); 
const txtUrlPdf = document.querySelector('#txtUrlPdf');
const btnLoad = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function() {
    let archivos = txtUrlImage.files;
    let archivoPdf = txtUrlPdf.files[0];
    let urlsSubidas = [];

    if (!archivoPdf) {
        alert('Debe seleccionar un archivo PDF.');
        return;
    } else if (archivos.length === 0) {
        alert('Debe seleccionar al menos una imagen.');
        return;
    }

    let imagenDeSubida = Array.from(archivos).map(archivo => {
        const nomarch = archivo.name;
        const metadata = {
            contentType: archivo.type
        };
        return container.child('images/' + nomarch).put(archivo, metadata)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                urlsSubidas.push(url); // Guarda las URLs de las imágenes subidas
            });
    });

    let pdfSubido = null;
    if (archivoPdf) {
        const nomarchPdf = archivoPdf.name;
        const metadataPdf = {
            contentType: archivoPdf.type
        };
        pdfSubido = container.child('pdfs/' + nomarchPdf).put(archivoPdf, metadataPdf)
            .then(snapshot => snapshot.ref.getDownloadURL());
    }

    Promise.all([...imagenDeSubida, pdfSubido].filter(Boolean)).then(results => {
        const urlPdf = results[results.length - 1];
        db.collection("Categories").add({
            "CategoryID": parseInt(txtCategoryID.value),
            "CategoryName": txtCategoryName.value,
            "Description": txtDescription.value,
            "urlImages": urlsSubidas,
            "urlPdf": urlPdf
        }).then(function(docRef) {
            alert("ID del registro: " + docRef.id);
            limpiar();
        }).catch(function(FirebaseError) {
            alert("Error al guardar la información en Firestore: " + FirebaseError);
        });
    }).catch(function(error) {
        alert("Error al subir las imágenes: " + error);
    });
});

function limpiar() {
    txtCategoryID.value = '';
    txtCategoryName.value = '';
    txtDescription.value = '';
    txtUrlImage.value = ''; 
    txtUrlPdf.value = '';
    txtCategoryID.focus();
}
