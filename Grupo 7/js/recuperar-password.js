if (localStorage.getItem("modo") == null) {
    localStorage.setItem("modo", "false");
}

//Validación de MAIL:
const FORM = document.getElementById("formRecuperar");
const CORREO = document.getElementById("email");
const mailRegex = /^[\w-]+@[a-zA-Z0-9]+\.[a-zA-Z]{3,}$/;
let errorMail = document.getElementById("errorMail");

FORM.addEventListener("submit", function (event) {
    let valido = true;

    //Correo
    if (!mailRegex.test(CORREO.value)) {
        errorMail.textContent = "Correo no válido";
        errorMail.style.color = "red";
        valido = false;
    } else {
        errorMail.textContent = " ";
    }

    //prevent envío
    if (!valido) {
        event.preventDefault();
    }
})

/* --------------- Modo oscuro --------------------- */

function darkMode() {

    document.body.classList.toggle('body-oscuro');
    document.getElementById('encabezado-principal').classList.toggle('encabezado-principal-dark');
    document.getElementById('modo-vista').classList.toggle('modo-vista-dark');
    document.getElementById('headerButton').classList.toggle('headerButton-dark');
    document.getElementById('main').classList.toggle('main-dark');
    document.getElementById('formRecuperar').classList.toggle('form-dark');


    let modo = document.getElementById('modo');

    if (localStorage.getItem("modo") == "true") {
        modo.src = '../assets/img/light-mode.svg';
    } else {
        modo.src = '../assets/img/dark-mode.svg';
    }


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


function cargarModoOscuroInicio() {
    if (localStorage.getItem("modo") == "true") {
        document.body.classList.add('body-oscuro');
        document.getElementById('encabezado-principal').classList.add('encabezado-principal-dark');
        document.getElementById('modo-vista').classList.add('modo-vista-dark');
        document.getElementById('headerButton').classList.add('headerButton-dark');
        document.getElementById('main').classList.add('main-dark');
        document.getElementById('formRecuperar').classList.add('form-dark');


        let modo = document.getElementById('modo');

        if (localStorage.getItem("modo") == "false") {
            modo.src = '../assets/img/light-mode.svg';
        } else {
            modo.src = '../assets/img/dark-mode.svg';
        }

    }
}
cargarModoOscuroInicio();