
 $(document).ready(function() {
    // Función para filtrar investigaciones
    function filtrarInvestigaciones() {
        var filtroTitulo = $("#filtroTitulo").val().toLowerCase(); // Convertir a minúsculas
    
        // Filtrar las investigaciones en función del título
        $(".card-title").each(function() {
            var tituloInvestigacion = $(this).text().toLowerCase(); // Convertir a minúsculas
            var tarjetaInvestigacion = $(this).closest(".card");
    
            if (tituloInvestigacion.includes(filtroTitulo)) {
                tarjetaInvestigacion.show(); // Mostrar tarjeta si coincide
            } else {
                tarjetaInvestigacion.hide(); // Ocultar tarjeta si no coincide
            }
        });
    }
    
 // Escuchar cambios en el campo de entrada
    $("#filtroTitulo").on("input", function() {
    filtrarInvestigaciones();
    });
    
// Filtrar inicialmente al cargar la página
    filtrarInvestigaciones();
    });