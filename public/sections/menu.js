class Menu extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=` <nav class="navbar navbar-expand-lg navbar-light fondo-menu fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="img/logo/logo-oficial.png" alt="" width="65%" class="d-inline-block align-text-top">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="fw-bold collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="index.html">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"  href="categories.html">Investigaciones</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="suppliers.html">Subir investigaciones</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="customers.html#">Sobre nosotros</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                <li class="nav-item text-center">
    <img id="userPhoto" src="img/logo/perfil.png" alt="User Photo" 
    style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid black;">
    <a class="nav-link" href="#" onclick="salir()" style="display: block;">Cerrar sesión</a>
</li>
            </ul>
            </div>
        </div>
    </nav>`
    }

   

    updateUserPhoto(url) {
        const userPhotoElement = this.querySelector('#userPhoto');
        if (userPhotoElement) {
            userPhotoElement.src = url;
            userPhotoElement.hidden = false; // Asegúrate de mostrar la imagen
            // Asegúrate de que el estilo display sea el apropiado para tu diseño
            userPhotoElement.style.display = 'inline-block'; 
        }
    }
}




customElements.define('menu-component', Menu);

