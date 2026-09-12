document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos del DOM
    const botonIniciarSesion = document.getElementById("boton-iniciar-sesion");
    const botonRegistro = document.getElementById("boton-registro");

    // Navegación a Iniciar Sesión
    if (botonIniciarSesion) {
        botonIniciarSesion.addEventListener("click", () => {
            window.location.href = "iniciar-sesion.html";
        });
    }

    // Navegación a Registro
    if (botonRegistro) {
        botonRegistro.addEventListener("click", () => {
            window.location.href = "registro.html";
        });
    }

    // Validación automática si ya existe un token almacenado
    verificarAutenticacionExistente();
});

/**
 * Revisa el estado de la sesión local para evitar el reingreso si el usuario ya se autenticó
 */
function verificarAutenticacionExistente() {
    const token = localStorage.getItem("tokenAutenticacion");
    
    if (token) {
        // Redirige directamente al panel si hay una sesión válida
        console.log("Sesión activa detectada.");
        // window.location.href = "panel-control.html";
    }
}