document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-registro");
    const campoContrasena = document.getElementById("contrasena");
    const botonAlternar = document.getElementById("boton-alternar-contrasena");

    botonAlternar?.addEventListener("click", () => {
        const esPassword = campoContrasena.getAttribute("type") === "password";
        campoContrasena.setAttribute("type", esPassword ? "text" : "password");
        document.getElementById("icono-visibilidad-contrasena").textContent = esPassword ? "visibility" : "visibility_off";
    });

    formulario?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datosUsuario = {
            nombre_completo: document.getElementById("nombre_completo").value.trim(),
            correo_electronico: document.getElementById("correo_electronico").value.trim(),
            contrasena_hash: campoContrasena.value
        };

        if(datosUsuario.contrasena_hash.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        // Listo para enviar por POST a la API que guardará en Workbench
        console.log("Datos listos para la base de datos:", datosUsuario);
        alert("¡Cuenta creada con éxito!");
        window.location.href = "Iniciar-Sesion.html";
    });
});