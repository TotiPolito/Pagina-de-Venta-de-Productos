if (localStorage.getItem("modo") == null) {
    localStorage.setItem("modo", "false");
}

const botonGuardarCambios = document.getElementById("botonGuardarCambios");

// Validacion de Nombre
const Nombre = document.getElementById("nombre");
const errorNombre = document.getElementById("error-nombre");

Nombre.addEventListener("input", function () {
    const valor = Nombre.value;

    if (/^[a-zA-Z\s]*$/.test(valor)) {
        errorNombre.style.visibility = "hidden";
        Nombre.style.border = "1px solid #ccc";
    } else {
        errorNombre.style.visibility = "visible";
        Nombre.style.border = "1px solid red";
    }
});

//Apellido
const Apellido = document.getElementById("apellido");
const ErrorApellido = document.getElementById("error-Apellido");

Apellido.addEventListener("input", function () {
    const valor = Apellido.value;

    if (/^[a-zA-Z\s]*$/.test(valor)) {
        ErrorApellido.style.visibility = "hidden";
        Apellido.style.border = "1px solid #ccc";
    } else {
        ErrorApellido.style.visibility = "visible";
        Apellido.style.border = "1px solid red";
    }
})

// Nro DNI
const NroDNI = document.getElementById("NroDNI");
const ErrorDNI = document.getElementById("error-DNI");

NroDNI.addEventListener("input", function () {
    const valor = NroDNI.value;

    if (/^\d*$/.test(valor)) {
        ErrorDNI.style.visibility = "hidden";
        NroDNI.style.border = "1px solid #ccc";
    } else {
        ErrorDNI.style.visibility = "visible";
        NroDNI.style.border = "1px solid red";
    }

})

//Nro Telefono
const NroTelefono = document.getElementById("NroTelefono");
const ErrorTelefono = document.getElementById("error-Telefono");

NroTelefono.addEventListener("input", function () {
    const valor = NroTelefono.value;

    if (/^\d*$/.test(valor)) {
        ErrorTelefono.style.visibility = "hidden";
        NroTelefono.style.border = "1px solid #ccc";
    } else {
        ErrorTelefono.style.visibility = "visible";
        NroTelefono.style.border = "1px solid red";
    }

})

// Fecha
const FechaNacimiento = document.getElementById("FechaNacimiento");
const ErrorFecha = document.getElementById("error-Fecha");

FechaNacimiento.addEventListener("input", function () {
    const fechaIngresada = new Date(FechaNacimiento.value);
    const hoy = new Date();

    if (fechaIngresada > hoy) {
        ErrorFecha.style.visibility = "visible";
        FechaNacimiento.style.border = "1px solid red";
    } else {
        ErrorFecha.style.visibility = "hidden";
        FechaNacimiento.style.border = "1px solid #ccc";
    }
});

// Correo
const Email = document.getElementById("email");
const EmailSecundario = document.getElementById("EmailSecundario");
const ErrorEmail = document.getElementById("error-Email");
const ErrorEmailSecundario = document.getElementById("error-EmailSecundario");


const mailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarEmail(input, errorElement) {
    const valor = input.value;

    if (valor === "" || mailValido.test(valor)) {
        errorElement.style.visibility = "hidden";
        input.style.border = "1px solid #ccc";
    } else {
        errorElement.style.visibility = "visible";
        input.style.border = "1px solid red";
    }
}

Email.addEventListener("input", function () {
    validarEmail(Email, ErrorEmail);
});

EmailSecundario.addEventListener("input", function () {
    validarEmail(EmailSecundario, ErrorEmailSecundario);
});

// Contraseña

const contraseña = document.getElementById("password");
const errorContraseña = document.getElementById("error-Contraseña");

const ContraseñaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;

contraseña.addEventListener("input", function () {
    const valor = contraseña.value;

    if (ContraseñaValida.test(valor)) {
        errorContraseña.style.visibility = "hidden";
        contraseña.style.border = "1px solid #ccc";
    } else {
        errorContraseña.style.visibility = "visible";
        contraseña.style.border = "1px solid red";
    }
});

//VER Y OCULTAR CONTRASEÑA:
const ojo = document.getElementById("botonVer");

//Ver
ojo.addEventListener("mousedown", function () {
    contraseña.type = "text";
})

//Ocultar
ojo.addEventListener("mouseup", function () {
    contraseña.type = "password";
})


// Modo Oscuro
function darkMode() {
    document.getElementById('encabezado-principal').classList.toggle('encabezado-principal-dark');
    document.getElementById('modo-vista').classList.toggle('modo-vista-dark');
    document.getElementById('main').classList.toggle('main-dark');
    document.getElementById('TodoElFormulario').classList.toggle('TodoElFormulario-dark');
    document.getElementById('botonGuardarCambios').classList.toggle('BotonGuardar-dark');
    document.getElementById('botonGuardarEmail').classList.toggle('BotonGuardar-dark');
    document.querySelectorAll('a.link2').forEach((link) => {
        console.log(link);
        link.classList.toggle('link2-dark');
    })

    let modo = document.getElementById('modo');

    // Cambiar ícono
    if (localStorage.getItem("modo") == "true") {
        modo.src = '../assets/img/light-mode.svg';
    } else {
        modo.src = '../assets/img/dark-mode.svg';
    }

    // Guardar nuevo estado
    if (localStorage.getItem("modo") == "false") {
        localStorage.setItem("modo", "true");
    } else {
        localStorage.setItem("modo", "false");
    }
}

let botonModo = document.getElementById('modo');
botonModo.addEventListener('click', darkMode);

function cargarModoOscuroInicio() {
    if (localStorage.getItem("modo") == "true") {
        document.body.classList.add('body-oscuro');
        document.getElementById('encabezado-principal').classList.add('encabezado-principal-dark');
        document.getElementById('modo-vista').classList.add('modo-vista-dark');
        document.getElementById('login').classList.add('login-dark');
        document.getElementById('main').classList.add('main-dark');
        document.getElementById('TodoElFormulario').classList.add('TodoElFormulario-dark');
        document.getElementById('botonGuardarCambios').classList.add('BotonGuardar-dark');
        document.getElementById('botonGuardarEmail').classList.add('BotonGuardar-dark');
        document.querySelectorAll('a.link2').forEach((link) => {
            link.classList.add('link2-dark');
        })

        let modo = document.getElementById('modo');

        if (localStorage.getItem("modo") == "false") {
            modo.src = '../assets/img/light-mode.svg';
        } else {
            modo.src = '../assets/img/dark-mode.svg';
        }
    }
}

cargarModoOscuroInicio();