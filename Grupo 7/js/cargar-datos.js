// import items from "../../data/items.json" with { type: 'json' };
import items from "../data/items.json" with { type: 'json' };
// import configuracion from "../../config/configuracion.json" with { type: 'json' };
import configuracion from "../config/configuracion.json" with { type: 'json' };

let favoritos = []
if (!localStorage.getItem("favoritos")) {
   localStorage.setItem("favoritos", JSON.stringify(favoritos));
} else {
   favoritos = JSON.parse(localStorage.getItem("favoritos"));
}

/* ----------------------- Carga de datos --------------------------- */

let mostrarInfo = document.getElementById("mostrarInfo");
let portadas;
const tabCategoria1 = document.getElementById("tab-categoria-1");
//console.log (items);
let linksCategorias = document.querySelectorAll("a.tab-categoria");
//console.log(linksCategorias)
let contenedorCards = document.getElementById("seccion-categoria");

linksCategorias.forEach((linkCategoria) => {

   linkCategoria.addEventListener("click", function () {
      contenedorCards.innerHTML = '';
      linksCategorias.forEach(l => {
         l.classList.remove('navegacion-activo');
         l.classList.remove('navegacion-activo-dark');
      });

      if (localStorage.getItem("modo") == "true") {
         this.classList.add('navegacion-activo-dark');
      } else {
         this.classList.add('navegacion-activo');
      }

      items.forEach((item, index) => {
         const { Categoria, Id, Nombre, Autor, Portada, Descripcion, Rating } = item;

         if (linkCategoria.innerText != Categoria) return;
         
         if (localStorage.getItem("modo") == "true") {
            contenedorCards.innerHTML += `<article id="${Id}" class="articulo-categoria articulo-categoria-dark">
            <header class="header-articulo">
               <p class="item-valor-nombre"><span id="span_${Id}" class="nombre-span">${Nombre}</span></p>
               <p class="item-valor-autor">${Autor}</span>
               </p>
               <img class="item-valor-portada" src='${Portada}' id='${Id.split("-")[0] + "_" + Id.split("-")[1]}' alt='Imagen de Portada'>
               <p class="item-valor-descripcion" id="descripcion_${Id}">${Descripcion}</p>
               
            </header>
            
            <div id="rating-${Id}" class="item-valor-rating">
                  ${calcularRating(Rating, Id)}
            </div>
            <img  src="" id="fav_${Id}" class="fav" alt="Favorito">
         </article>`
            cargarFavoritos(Id)

            document.body.classList.add('body-oscuro');
            document.getElementById('encabezado-principal').classList.add('encabezado-principal-dark');
            document.getElementById('modo-vista').classList.add('modo-vista-dark');
            document.getElementById('heart').classList.add('modo-vista-dark');
            document.getElementById('login').classList.add('login-dark');
            document.getElementById('contenedor-carrousel').classList.add('contenedor-carrousel-dark');
            document.getElementById('contenedor-carrousel').classList.remove('slider-nav-dark');
            document.getElementById('contenedor-carrousel').classList.remove('slider-indicators-dark');
            let modo = document.getElementById('modo');
            let buscar = document.getElementById('icono-buscar');

            if (localStorage.getItem("modo") == "false") {
               modo.src = './assets/img/light-mode.svg';
               buscar.src = "./assets/img/search.svg";
            } else {
               modo.src = './assets/img/dark-mode.svg';
               buscar.src = "./assets/img/search-dark.svg";
            }

            document.getElementById('input-buscar').classList.add('input-buscar-dark');
            document.getElementById('navegacion-categoria').classList.add('navegacion-categoria-dark');
            document.getElementById('encabezado-secundario').classList.add('encabezado-secundario-dark');
            let articulos = document.getElementsByClassName('articulo-categoria');
            let a;
            for (a of articulos) {
               a.classList.add('articulo-categoria-dark');
            }
            document.getElementById('footer-principal').classList.add('footer-principal-dark');

            linksCategorias.forEach(l => {
               if (l.classList.contains("navegacion-activo")) {
                  l.classList.remove('navegacion-activo');
                  l.classList.add("navegacion-activo-dark");
               }
            })


         } else {

            contenedorCards.innerHTML += `<article id="${Id}" class="articulo-categoria">
            <header class="header-articulo">
               <p class="item-valor-nombre"><span id="span_${Id}" class="nombre-span">${Nombre}</span></p>
               <p class="item-valor-autor">${Autor}</span>
               </p>
               <img class="item-valor-portada" src='${Portada}' id='${Id.split("-")[0] + "_" + Id.split("-")[1]}' alt='Imagen de Portada'>
               <p class="item-valor-descripcion" id="descripcion_${Id}">${Descripcion}</p>
            </header>
           
            <div id="rating-${Id}" class="item-valor-rating">
                  ${calcularRating(Rating, Id)}
            </div>
            <img  src="" id="fav_${Id}" class="fav" alt="Favorito">
         </article>`
            cargarFavoritos(Id);
         }
      });
      actualizarPortadas();
      actualizarHearts();
      actualizarNombreSpan();

   });

});

if (configuracion["modo-test-prod"] === "prod") {
   tabCategoria1.click();
};

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
        <img src="./assets/img/cross-dark.svg" id="close-popup" alt="">
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
        <img src="./assets/img/cross-light.svg" id="close-popup" alt="">
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
            this.src = "./assets/img/heart.png";
            console.log(favoritos);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
         } else {
            favoritos.push(idFav);
            console.log(favoritos);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            this.src = "./assets/img/heart-full.png";
         }
      })
   });
}

function cargarFavoritos(id) {
   let favoritos = JSON.parse(localStorage.getItem("favoritos"));

   if (favoritos.includes(id)) {
      document.getElementById(`fav_${id}`).src = "./assets/img/heart-full.png";
   } else {
      document.getElementById(`fav_${id}`).src = "./assets/img/heart.png";
   }

}

/* ----------------------- Rating --------------------------- */

function calcularRating(rating) {
   let ratingText = "";
   for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
         ratingText += '<img src="assets/img/star-full.png" alt="estrella_llena"> '
      } else {
         ratingText += '<img src="assets/img/star.png" alt="estrella_vacia"></img> '
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

/* ----------------------- Buscador --------------------------- */

let buscador = document.getElementById("input-buscar");


buscador.addEventListener("keyup", function () {

   if (buscador.value.length > 2) {
      contenedorCards.innerHTML = "";
      const itemsBuscados = items.filter(item => item.Nombre.toUpperCase().startsWith(buscador.value.toUpperCase()) || item.Autor.toUpperCase().startsWith(buscador.value.toUpperCase()));
      console.log(itemsBuscados);

      itemsBuscados.forEach((item, index) => {

         const { Categoria, Id, Nombre, Autor, Portada, Descripcion, Rating } = item;
         if (localStorage.getItem("modo") == "true") {
            contenedorCards.innerHTML += `<article id="${Id}" class="articulo-categoria articulo-categoria-dark">
            <header class="header-articulo">
               <p class="item-valor-nombre"><span id="span_${Id}" class="nombre-span">${Nombre}</span></p>
               <p class="item-valor-autor">${Autor}</span>
               </p>
               <img class="item-valor-portada" src='${Portada}' id='${Id.split("-")[0] + "_" + Id.split("-")[1]}' alt='Imagen de Portada'>
               <p class="item-valor-descripcion" id="descripcion_${Id}">${Descripcion}</p>
               
            </header>
            
            <div id="rating-${Id}" class="item-valor-rating">
                  ${calcularRating(Rating, Id)}
            </div>
            <svg  src="assets/img/heart.png" id="fav_${Id}" alt="Favorito">
         </article>`

            document.body.classList.add('body-oscuro');
            document.getElementById('encabezado-principal').classList.add('encabezado-principal-dark');
            document.getElementById('modo-vista').classList.add('modo-vista-dark');
            document.getElementById('login').classList.add('login-dark');
            let modo = document.getElementById('modo');
            let buscar = document.getElementById('icono-buscar');

            if (localStorage.getItem("modo") == "false") {
               modo.src = './assets/img/light-mode.svg';
               buscar.src = "./assets/img/search.svg";
            } else {
               modo.src = './assets/img/dark-mode.svg';
               buscar.src = "./assets/img/search-dark.svg";
            }

            document.getElementById('input-buscar').classList.add('input-buscar-dark');
            document.getElementById('navegacion-categoria').classList.add('navegacion-categoria-dark');
            document.getElementById('encabezado-secundario').classList.add('encabezado-secundario-dark');
            let articulos = document.getElementsByClassName('articulo-categoria');
            let a;
            for (a of articulos) {
               a.classList.add('articulo-categoria-dark');
            }
            document.getElementById('footer-principal').classList.add('footer-principal-dark');

            linksCategorias.forEach(l => {
               if (l.classList.contains("navegacion-activo")) {
                  l.classList.remove('navegacion-activo');
                  l.classList.add("navegacion-activo-dark");
               }
            })


         } else {

            contenedorCards.innerHTML += `<article id="${Id}" class="articulo-categoria">
            <header class="header-articulo">
               <p class="item-valor-nombre"><span id="span_${Id}" class="nombre-span">${Nombre}</span></p>
               <p class="item-valor-autor">${Autor}</span>
               </p>
               <img class="item-valor-portada" src='${Portada}' id='${Id.split("-")[0] + "_" + Id.split("-")[1]}' alt='Imagen de Portada'>
               <p class="item-valor-descripcion" id="descripcion_${Id}">${Descripcion}</p>
            </header>
           
            <div id="rating-${Id}" class="item-valor-rating">
                  ${calcularRating(Rating, Id)}
            </div>
            <img src="./assets/img/heart.png" id="fav_${Id}" class="fav" alt="Favorito">
         </article>`
         }
      });
      actualizarPortadas();
      actualizarHearts();
      actualizarNombreSpan();
   }


   if (buscador.value == "") {

      linksCategorias.forEach(l => {
         if (l.classList.contains("navegacion-activo") || l.classList.contains("navegacion-activo-dark")) {
            l.click();
         }
      });
   }
})







