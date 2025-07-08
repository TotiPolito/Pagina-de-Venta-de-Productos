//Validación de LOGIN:
const FORM = document.getElementById("loginForm");
const CORREO = document.getElementById("correo");
const mailRegex = /^[\w-]+@[a-zA-Z0-9]+\.[a-zA-Z]{3,}$/;
let errorMail = document.getElementById("errorMail");
const CONTRA = document.getElementById("contrasenia");
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;
let errorPass = document.getElementById("errorPass");

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
        errorPass.textContent = "La contraseña debe tener al menos una minúscula, una mayúscula, un número y un carácter especial";
        errorPass.style.color = "red";
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

//FORTALEZA DE CONTRASEÑA
CONTRA.addEventListener("input", function(){
    if (CONTRA.value.length>=6&&CONTRA.value.length<10) {
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