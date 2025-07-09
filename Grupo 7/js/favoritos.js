import items from "../data/items.json" with { type: 'json' };
if (localStorage.getItem("modo") == null) {
    localStorage.setItem("modo", "false");
}

let favoritos = []
if (!localStorage.getItem("favoritos")) {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
} else {
    favoritos = JSON.parse(localStorage.getItem("favoritos"));
}

/* ----------------------- Carga de datos --------------------------- */

let mostrarInfo = document.getElementById("mostrarInfo");
let portadas;
//console.log (items);
let contenedorCards = document.getElementById("seccion-categoria");

function favoritosCarga() {

    if (favoritos.length != 0) {
        console.log(favoritos);
        let fav;
        contenedorCards.innerHTML = "";
        favoritos.forEach((favorito) => {

            fav = items.filter(item => item.Id == favorito);
            console.log(fav);
            if (localStorage.getItem("modo") == "true") {
                contenedorCards.innerHTML += `<article id="${fav[0].Id}" class="articulo-categoria articulo-categoria-dark">
            <header class="header-articulo">
               <p class="item-valor-nombre"><span id="span_${fav[0].Id}" class="nombre-span">${fav[0].Nombre}</span></p>
               <p class="item-valor-autor">${fav[0].Autor}</span>
               </p>
               <img class="item-valor-portada" src='${fav[0].Portada}' id='${fav[0].Id.split("-")[0] + "_" + fav[0].Id.split("-")[1]}' alt='Imagen de Portada'>
               <p class="item-valor-descripcion" id="descripcion_${fav[0].Id}">${fav[0].Descripcion}</p>
               
            </header>
            
            <div id="rating-${fav[0].Id}" class="item-valor-rating">
                  ${calcularRating(fav[0].Rating, fav[0].Id)}
            </div>
            <img  src="" id="fav_${fav[0].Id}" class="fav" alt="Favorito">
         </article>`
                cargarFavoritos(fav[0].Id)

                document.body.classList.add('body-oscuro');
                document.getElementById('encabezado-principal').classList.add('encabezado-principal-dark');
                document.getElementById('modo-vista').classList.add('modo-vista-dark');
                document.getElementById('heart').classList.add('modo-vista-dark');
                document.getElementById('login').classList.add('login-dark');
                let modo = document.getElementById('modo');
                let buscar = document.getElementById('icono-buscar');

                if (localStorage.getItem("modo") == "false") {
                    modo.src = '../assets/img/light-mode.svg';
                } else {
                    modo.src = '../assets/img/dark-mode.svg';
                }

                let articulos = document.getElementsByClassName('articulo-categoria');
                let a;
                for (a of articulos) {
                    a.classList.add('articulo-categoria-dark');
                }
                document.getElementById('footer-principal').classList.add('footer-principal-dark');



            } else {

                contenedorCards.innerHTML += `<article id="${fav[0].Id}" class="articulo-categoria">
            <header class="header-articulo">
               <p class="item-valor-nombre"><span id="span_${fav[0].Id}" class="nombre-span">${fav[0].Nombre}</span></p>
               <p class="item-valor-autor">${fav[0].Autor}</span>
               </p>
               <img class="item-valor-portada" src='${fav[0].Portada}' id='${fav[0].Id.split("-")[0] + "_" + fav[0].Id.split("-")[1]}' alt='Imagen de Portada'>
               <p class="item-valor-descripcion" id="descripcion_${fav[0].Id}">${fav[0].Descripcion}</p>
            </header>
           
            <div id="rating-${fav[0].Id}" class="item-valor-rating">
                  ${calcularRating(fav[0].Rating, fav[0].Id)}
            </div>
            <img  src="" id="fav_${fav[0].Id}" class="fav" alt="Favorito">
         </article>`
                cargarFavoritos(fav[0].Id);
            }

            actualizarPortadas();
            actualizarHearts();
            actualizarNombreSpan();

        })

    } else {
        contenedorCards.innerHTML = `<h2 id='h2'>No tiene favoritos agregados</h2>`;
    }
}

favoritosCarga();

/* ----------------------- Pop-Up --------------------------- */

function actualizarPortadas() {
    portadas = document.querySelectorAll("img.item-valor-portada");
    //console.log(portadas);
    portadas.forEach((portada) => {

        portada.addEventListener("click", function () {
            let id = this.id.split("_")[0] + "-" + this.id.split("_")[1];
            console.log(id);
            let data = items.filter(item => item.Id.indexOf(id) > -1);
            console.log(data);
            console.log(localStorage.getItem("modo"));

            if (localStorage.getItem("modo") == "true") {
                mostrarInfo.innerHTML = `
        <article class="articulo-categoria-popup articulo-categoria-popup-dark">
        <img src="../assets/img/cross-dark.svg" id="close-popup" alt="">
            <header class="header-articulo-popup">
               <div class="header-izquierda">
                  <p class="item-valor-nombre negrita-popup">${data[0].Nombre}</p>
                  <p class="item-valor-autor negrita-popup">${data[0].Autor}
                  </p>
                  <img class="item-valor-portada-popup" src='${data[0].Portada}' id="img-popup" alt='Imagen de Portada'>
               </div>

               <div class="header-derecha">
                  <h1 class"negrita-popup">Descripcion:</h1>
                  <p class="popup-valor-descripcion texto-popup">${data[0].Descripcion}</p>
               </div>

            </header>

            <div class="line-popup-dark"></div>

            <div class="detalle-articulo-popup">
               <div class="detalle-izquierda-popup">
                  <h4 class="item-campo-personalizado_1 negrita-popup">Tipo</h4>
                  <p class="item-valor-personalizado_1 texto-popup">${data[0]["personalizado_1.Tipo"]}</p>
                  <h4 class="item-campo-personalizado_2 negrita-popup">Talles:</h4>
                  <p class="item-valor-personalizado_2 texto-popup">${data[0]["personalizado_2.Talles"]}</p>
                  <h4 class="item-campo-personalizado_3 negrita-popup">Género:</h4>
                  <p class="item-valor-personalizado_3 texto-popup">${data[0]["personalizado_3.Genero"]}</p>
               </div>

               <div class="detalle-derecha-popup">
                  <h4 class="item-campo-personalizado_4 negrita-popup">Colores</h4>
                  <p class="item-valor-personalizado_4 texto-popup">${data[0]["personalizado_3.Genero"]}</p>
                  <h4 class="item-campo-personalizado_5 negrita-popup">Material principal</h4>
                  <p class="item-valor-personalizado_5 texto-popup">${data[0]["personalizado_5.Material principal"]}</p>
               </div>
            </div>
         </article>`;
            } else {
                mostrarInfo.innerHTML = `
        <article class="articulo-categoria-popup">
        <img src="../assets/img/cross-light.svg" id="close-popup" alt="">
            <header class="header-articulo-popup">
               <div class="header-izquierda">
                  <p class="item-valor-nombre negrita-popup">${data[0].Nombre}</p>
                  <p class="item-valor-autor negrita-popup">${data[0].Autor}
                  </p>
                  <img class="item-valor-portada-popup" src='${data[0].Portada}' id="img-popup" alt='Imagen de Portada'>
               </div>

               <div class="header-derecha">
                  <h1 class="negrita-popup">Descripcion:</h1>
                  <p class="popup-valor-descripcion texto-popup">${data[0].Descripcion}</p>
               </div>

            </header>

            <div class="line-popup"></div>

            <div class="detalle-articulo-popup">
               <div class="detalle-izquierda-popup">
                  <h4 class="item-campo-personalizado_1 negrita-popup">Tipo:</h4>
                  <p class="item-valor-personalizado_1 texto-popup">${data[0]["personalizado_1.Tipo"]}</p>
                  <h4 class="item-campo-personalizado_2 negrita-popup">Talles:</h4>
                  <p class="item-valor-personalizado_2 texto-popup">${data[0]["personalizado_2.Talles"]}</p>
                  <h4 class="item-campo-personalizado_3 negrita-popup">Género:</h4>
                  <p class="item-valor-personalizado_3 texto-popup">${data[0]["personalizado_3.Genero"]}</p>
               </div>

               <div class="detalle-derecha-popup">
                  <h4 class="item-campo-personalizado_4 negrita-popup">Colores:</h4>
                  <p class="item-valor-personalizado_4 texto-popup">${data[0]["personalizado_4.Colores"]}</p>
                  <h4 class="item-campo-personalizado_5 negrita-popup">Material principal:</h4>
                  <p class="item-valor-personalizado_5 texto-popup">${data[0]["personalizado_5.Material principal"]}</p>
               </div>
            </div>
         </article>`;
            }


            mostrarInfo.classList.add("show-popup");

            document.getElementById("close-popup").addEventListener("click", () => {
                mostrarInfo.classList.remove("show-popup");
            })

            mostrarInfo.addEventListener("click", (event) => {
                if (event.target == mostrarInfo) {
                    mostrarInfo.classList.remove("show-popup");
                }
            })

        })
    });

}



/* ----------------------- Favoritos --------------------------- */

function actualizarHearts() {
    let hearts = document.querySelectorAll("img.fav");

    hearts.forEach(heart => {
        heart.addEventListener("click", function () {
            let idFav = this.id.split("_")[1];
            console.log(favoritos);
            if (favoritos.indexOf(idFav) > -1) {
                favoritos = favoritos.filter(fav => fav != idFav);
                this.src = "../assets/img/heart.png";
                console.log(favoritos);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
            } else {
                favoritos.push(idFav);
                console.log(favoritos);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                this.src = "../assets/img/heart-full.png";
            }
            favoritosCarga()
        })
    });
}

function cargarFavoritos(id) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos"));

    if (favoritos.includes(id)) {
        document.getElementById(`fav_${id}`).src = "../assets/img/heart-full.png";
    } else {
        document.getElementById(`fav_${id}`).src = "../assets/img/heart.png";
    }

}

/* ----------------------- Rating --------------------------- */

function calcularRating(rating) {
    let ratingText = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            ratingText += '<img src="../assets/img/star-full.png" alt="estrella_llena"> '
        } else {
            ratingText += '<img src="../assets/img/star.png" alt="estrella_vacia"></img> '
        }

    }
    return ratingText;
}


/* ----------------------- Nombre Span --------------------------- */

function actualizarNombreSpan() {

    let nombresSpan = document.querySelectorAll("span.nombre-span");

    nombresSpan.forEach(nombre => {

        nombre.addEventListener("click", function () {
            let id = this.id.split("_")[1];

            document.getElementById(`descripcion_${id}`).classList.toggle('show-descripcion')
        })

    });

}

/* ----------------------- Modo oscuro --------------------------- */

function darkMode() {

    document.body.classList.toggle('body-oscuro');
    document.getElementById('encabezado-principal').classList.toggle('encabezado-principal-dark');
    document.getElementById('modo-vista').classList.toggle('modo-vista-dark');
    document.getElementById('heart').classList.toggle('modo-vista-dark');
    document.getElementById('login').classList.toggle('login-dark');

    let modo = document.getElementById('modo');

    if (localStorage.getItem("modo") == "true") {
        modo.src = '../assets/img/light-mode.svg';
    } else {
        modo.src = '../assets/img/dark-mode.svg';
    }

    let articulos = document.getElementsByClassName('articulo-categoria');
    let a;

    for (a of articulos) {

        a.classList.toggle('articulo-categoria-dark');
    }

    document.getElementById('footer-principal').classList.toggle('footer-principal-dark');

    if (localStorage.getItem("modo") == "false") {

        localStorage.setItem("modo", "true");

    } else {

        localStorage.setItem("modo", "false");

    }


}

let botonModo = document.getElementById('modo');
botonModo.addEventListener('click', () => {
    darkMode();
})
