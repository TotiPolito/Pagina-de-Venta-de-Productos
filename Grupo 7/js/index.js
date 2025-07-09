
import items from "../data/items.json" with { type: 'json' };
if (localStorage.getItem("modo") == null) {
    localStorage.setItem("modo", "false");
}

let itemsCarrousel = [];

items.forEach ((item) => {
    itemsCarrousel.push(item);
})

/* ----------------------- Modo oscuro --------------------------- */

let linksCategorias = document.querySelectorAll("a.tab-categoria");

function darkMode() {

    document.body.classList.toggle('body-oscuro');
    document.getElementById('encabezado-principal').classList.toggle('encabezado-principal-dark');
    document.getElementById('modo-vista').classList.toggle('modo-vista-dark');
    document.getElementById('heart').classList.toggle('modo-vista-dark');
    document.getElementById('login').classList.toggle('login-dark');
    document.getElementById('contenedor-carrousel').classList.toggle('contenedor-carrousel-dark');
    document.getElementById('contenedor-carrousel').classList.toggle('slider-nav-dark');
    document.getElementById('contenedor-carrousel').classList.toggle('slider-indicators-dark');
    
    let modo = document.getElementById('modo');
    let buscar = document.getElementById('icono-buscar');

    if (localStorage.getItem("modo") == "true") {
        modo.src = './assets/img/light-mode.svg';
        buscar.src = "./assets/img/search.svg";
    } else {
        modo.src = './assets/img/dark-mode.svg';
        buscar.src = "./assets/img/search-dark.svg";
    }

    document.getElementById('input-buscar').classList.toggle('input-buscar-dark');
    document.getElementById('navegacion-categoria').classList.toggle('navegacion-categoria-dark');
    document.getElementById('encabezado-secundario').classList.toggle('encabezado-secundario-dark');

    let articulos = document.getElementsByClassName('articulo-categoria');
    let a;

    for (a of articulos) {
        a.classList.toggle('articulo-categoria-dark');
    }


    if (localStorage.getItem("modo") == "false") {

        localStorage.setItem("modo", "true");
        linksCategorias.forEach(l => {
            if (l.classList.contains("navegacion-activo")) {
                l.classList.remove('navegacion-activo');
                l.classList.add("navegacion-activo-dark");
            }
        });
    } else {

        localStorage.setItem("modo", "false");
        linksCategorias.forEach(l => {
            if (l.classList.contains("navegacion-activo-dark")) {
                l.classList.remove('navegacion-activo-dark');
                l.classList.add("navegacion-activo");
            }
        });

    }


}

let botonModo = document.getElementById('modo');
botonModo.addEventListener('click', () => {
    darkMode();
})


/* ----------------------- Carruosel --------------------------- */

let slide1 = document.getElementById("slide1");
let slide2 = document.getElementById("slide2");
let slide3 = document.getElementById("slide3");
let slide4 = document.getElementById("slide4");
let slide5 = document.getElementById("slide5");



let resultado = [];

for (let i = 0; i < 5; i++) {
    let indice = Math.floor(Math.random() * (itemsCarrousel.length + 1));
    resultado.push(itemsCarrousel[indice]);
    itemsCarrousel.splice(indice, 1);
}



slide1.innerHTML = `<img src="${resultado[0].Portada}" alt=""><p>${resultado[0].Nombre}</p>`;
slide2.innerHTML = `<img src="${resultado[1].Portada}" alt=""><p>${resultado[1].Nombre}</p>`;
slide3.innerHTML = `<img src="${resultado[2].Portada}" alt=""><p>${resultado[2].Nombre}</p>`;
slide4.innerHTML = `<img src="${resultado[3].Portada}" alt=""><p>${resultado[3].Nombre}</p>`;
slide5.innerHTML = `<img src="${resultado[4].Portada}" alt=""><p>${resultado[4].Nombre}</p>`;

