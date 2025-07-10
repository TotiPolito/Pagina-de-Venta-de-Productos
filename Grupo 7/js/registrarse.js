if (localStorage.getItem("modo") == null) {
    localStorage.setItem("modo", "false");
}

//VALIDACIÓN DE REGISTRO:
const FORM = document.getElementById("registrarseForm");

const CORREO = document.getElementById("correo");
const mailRegex = /^[\w-]+@[a-zA-Z0-9]+\.[a-zA-Z]{3,}$/;
let errorMail = document.getElementById("errorMail");

const CONTRA = document.getElementById("contrasenia");
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;
let errorPass = document.getElementById("errorPass");

const CONTRA_CHECK = document.getElementById("contrasenia2");
let errorPass2 = document.getElementById("errorPass2");

const TERMS = document.getElementById("terminos");

//Validación de form
FORM.addEventListener("submit", function(event){
    let valido = true;

    //Correo
    if (!mailRegex.test(CORREO.value)) {
        errorMail.textContent = "Correo no válido";
        errorMail.style.color = "red";
        valido = false;
    } else {
        errorMail.textContent = " ";
    }

    //Contraseña
    if (!passRegex.test(CONTRA.value)) {
        valido = false;
    }

    //Repetir contraseña
    if (CONTRA_CHECK.value!=CONTRA.value) {
        errorPass2.textContent = "Las contraseñas no coinciden";
        errorPass2.style.color = "red";
        valido = false;
    } else {
        errorPass2.textContent = " ";
    }

    //Checkbox terminos
    if (!TERMS.checked) {
        valido = false;
    }

    //prevent envío
    if (!valido) {
        event.preventDefault();
    }
})

//VER Y OCULTAR CONTRASEÑA:
const OJO = document.getElementById("botonVer");

//Ver
OJO.addEventListener("mousedown", function(){
    CONTRA.type = "text";
})

//Ocultar
OJO.addEventListener("mouseup", function(){
    CONTRA.type = "password";
})

//VER Y OCULTAR CONFIRMACIÓN:
const OJO2 = document.getElementById("botonVer2");

//Ver
OJO2.addEventListener("mousedown", function(){
    CONTRA_CHECK.type = "text";
})

//Ocultar
OJO2.addEventListener("mouseup", function(){
    CONTRA_CHECK.type = "password";
})

//FORTALEZA DE CONTRASEÑA
CONTRA.addEventListener("input", function(){
    if (CONTRA.value.length<6) {
        errorPass.textContent = "6 carácteres mínimo";
        errorPass.style.color = "black";
    } else if (CONTRA.value.length>=6&&CONTRA.value.length<10) {
        errorPass.textContent = "Contraseña débil";
        errorPass.style.color = "orange";
    } else if (CONTRA.value.length>=10&&CONTRA.value.length<16) {
        errorPass.textContent = "Contraseña normal";
        errorPass.style.color = "yellow";
    } else if (CONTRA.value.length>=16) {
        errorPass.textContent = "Contraseña fuerte"
        errorPass.style.color = "green";
    } else {
        errorPass.textContent = " "
    }
})

//VALIDAR CARÁCTERES REQUERIDOS:

const minRegex = /[a-z]/;
const mayRegex = /[A-Z]/;
const numRegex = /[0-9]/;
const espRegex = /[\W_]/;

const minCheck = document.getElementById("checkMinuscula");
const mayCheck = document.getElementById("checkMayuscula");
const numCheck = document.getElementById("checkNumero");
const espCheck = document.getElementById("checkEspecial");

CONTRA.addEventListener("input", function(){
    if (minRegex.test(CONTRA.value)==true) {
        minCheck.textContent = "Minúsculas: ✔️";
    } else {
        minCheck.textContent = "Minúsculas: ❌";
    }
    if (mayRegex.test(CONTRA.value)==true) {
        mayCheck.textContent = "Mayúsculas: ✔️";   
    } else {
        mayCheck.textContent = "Mayúsculas: ❌";
    }
    if (numRegex.test(CONTRA.value)==true) {
        numCheck.textContent = "Números: ✔️";   
    } else {
        numCheck.textContent = "Números: ❌";
    }
    if (espRegex.test(CONTRA.value)==true) {
        espCheck.textContent = "Carácteres Especiales: ✔️";   
    } else {
        espCheck.textContent = "Carácteres Especiales: ❌";
    }
});

/* --------------- Modo oscuro --------------------- */

function darkMode() {

    document.body.classList.toggle('body-oscuro');
    document.getElementById('encabezado-principal').classList.toggle('encabezado-principal-dark');
    document.getElementById('modo-vista').classList.toggle('modo-vista-dark');
    document.getElementById('menu').classList.toggle('menu-dark');
    document.getElementById('main').classList.toggle('main-dark');
    document.getElementById('registrarseForm').classList.toggle('form-dark');
    document.getElementById('botonRegistrarse').classList.toggle('boton-dark');


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
        document.getElementById('menu').classList.add('menu-dark');
        document.getElementById('main').classList.add('main-dark');
        document.getElementById('registrarseForm').classList.add('form-dark');
        document.getElementById('botonRegistrarse').classList.add('boton-dark');


        let modo = document.getElementById('modo');

        if (localStorage.getItem("modo") == "false") {
            modo.src = '../assets/img/light-mode.svg';
        } else {
            modo.src = '../assets/img/dark-mode.svg';
        }

    }
}
cargarModoOscuroInicio();