const formularioLogin = document.getElementById("formulario-login");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const botonMostrarContrasena = document.getElementById("boton-mostrar-contrasena");
const iconoVisibilidad = botonMostrarContrasena.querySelector("span");
const mensajeCorreo = document.getElementById("mensaje-correo");
const mensajeContrasena = document.getElementById("mensaje-contrasena");
const botonGoogle = document.getElementById("boton-google");
const enlaceContrasena = document.getElementById("enlace-contrasena");
const enlaceRegistro = document.getElementById("enlace-registro");

const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

botonMostrarContrasena.addEventListener("click", () => {
    const esPassword = contrasena.type === "password";
    
    contrasena.type = esPassword ? "text" : "password";
    iconoVisibilidad.textContent = esPassword ? "visibility" : "visibility_off";
    botonMostrarContrasena.setAttribute(
        "aria-label", 
        esPassword ? "Ocultar contraseña" : "Mostrar contraseña"
    );
});

formularioLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    mensajeCorreo.textContent = "";
    mensajeContrasena.textContent = "";

    const correoIngresado = correo.value.trim();
    const contrasenaIngresada = contrasena.value.trim();

    if (correoIngresado === "") {
        mensajeCorreo.textContent = "Por favor, escribe tu correo.";
        correo.focus();
        return;
    }

    if (!regexCorreo.test(correoIngresado)) {
        mensajeCorreo.textContent = "Por favor, ingresa un correo válido.";
        correo.focus();
        return;
    }

    if (contrasenaIngresada === "") {
        mensajeContrasena.textContent = "Por favor, escribe tu contraseña.";
        contrasena.focus();
        return;
    }

    alert(
        "Inicio de sesión realizado correctamente.\n\n" +
        "Correo: " + correoIngresado
    );
});

enlaceContrasena.addEventListener("click", (evento) => {
    evento.preventDefault();
    alert("La recuperación de contraseña se implementará posteriormente.");
});

botonGoogle.addEventListener("click", () => {
    alert("El inicio de sesión con Google se implementará posteriormente.");
});

enlaceRegistro.addEventListener("click", (evento) => {
    evento.preventDefault();
    alert("La pantalla de registro se implementará posteriormente.");
});