document.addEventListener("DOMContentLoaded", () => {
  const formularioLogin = document.getElementById("formulario-login");
  const contrasena = document.getElementById("contrasena");
  const botonMostrar = document.getElementById("boton-mostrar-contrasena");

  botonMostrar?.addEventListener("click", () => {
    const esPassword = contrasena.type === "password";
    contrasena.type = esPassword ? "text" : "password";
    botonMostrar.querySelector("span").textContent = esPassword ? "visibility" : "visibility_off";
  });

  formularioLogin?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const correo = document.getElementById("correo_electronico").value.trim();
    const pass = contrasena.value.trim();
    
    if(!correo || !pass) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Preparado para conectar con endpoint de autenticación backend / MySQL
    console.log("Autenticando usuario:", { correo_electronico: correo });
    window.location.href = "Configuracion-Hogar.html";
  });
});