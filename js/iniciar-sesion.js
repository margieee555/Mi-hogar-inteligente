document.addEventListener("DOMContentLoaded", () => {
  const formularioLogin = document.getElementById("formulario-login");
  const correo = document.getElementById("correo");
  const contrasena = document.getElementById("contrasena");
  const botonMostrarContrasena = document.getElementById("boton-mostrar-contrasena");
  const iconoVisibilidad = document.getElementById("icono-visibilidad");
  const mensajeCorreo = document.getElementById("mensaje-correo");
  const mensajeContrasena = document.getElementById("mensaje-contrasena");
  const enlaceRegistro = document.getElementById("enlace-registro");

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Alternar visibilidad de contraseña
  if (botonMostrarContrasena && contrasena && iconoVisibilidad) {
    botonMostrarContrasena.addEventListener("click", () => {
      const esPassword = contrasena.type === "password";
      contrasena.type = esPassword ? "text" : "password";
      iconoVisibilidad.textContent = esPassword ? "visibility" : "visibility_off";
      botonMostrarContrasena.setAttribute(
        "aria-label",
        esPassword ? "Ocultar contraseña" : "Mostrar contraseña"
      );
    });
  }

  // Validación y envío del formulario
  if (formularioLogin) {
    formularioLogin.addEventListener("submit", async (evento) => {
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
        mensajeCorreo.textContent = "Ingresa un correo electrónico válido.";
        correo.focus();
        return;
      }

      if (contrasenaIngresada === "") {
        mensajeContrasena.textContent = "Por favor, escribe tu contraseña.";
        contrasena.focus();
        return;
      }

      // Datos listos para autenticación con backend
      const credenciales = {
        correo: correoIngresado,
        contrasena: contrasenaIngresada
      };

      console.log("Iniciando sesión con:", credenciales);

      // Redirección directa al panel o paso de configuración tras éxito
      window.location.href = "configuracion-hogar.html";
    });
  }

  // Redirección fluida a la vista de Registro
  if (enlaceRegistro) {
    enlaceRegistro.addEventListener("click", (evento) => {
      evento.preventDefault();
      window.location.href = "registro.html";
    });
  }
});