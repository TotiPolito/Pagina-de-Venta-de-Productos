let flag = 0;
function darkMode() {
    document.body.classList.toggle('body-oscuro');
    document.getElementById('encabezado-principal').classList.toggle('encabezado-principal-dark');
    document.getElementById('modo-vista').classList.toggle('modo-vista-dark');
    document.getElementById('login').classList.toggle('login-dark');
    let modo = document.getElementById('modo');
    let buscar = document.getElementById('icono-buscar');
    switch (flag) {
        case 0: {
            modo.src = './assets/img/dark-mode.svg';
            buscar.src = "./assets/img/search-dark.svg";
            flag = 1;
            console.log(flag);
            break;
        }
        case 1: {
            modo.src = './assets/img/light-mode.svg';
            buscar.src = "./assets/img/search.svg";
            flag = 0;
            console.log(flag);
            break;
        }
    }
    document.getElementById('input-buscar').classList.toggle('input-buscar-dark');
    document.getElementById('navegacion-categoria').classList.toggle('navegacion-categoria-dark');
    document.getElementById('encabezado-secundario').classList.toggle('encabezado-secundario-dark');
    let articulos = document.getElementsByClassName('articulo-categoria');
    for (a of articulos) {
        a.classList.toggle('articulo-categoria-dark');
    }
    document.getElementById('footer-principal').classList.toggle('footer-principal-dark');

}

let botonModo = document.getElementById('modo');
botonModo.addEventListener('click', () => {
    darkMode();
})
