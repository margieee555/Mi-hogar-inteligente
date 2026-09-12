document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-registro");
    const campoContrasena = document.getElementById("contrasena");
    const campoConfirmar = document.getElementById("confirmar_contrasena");
    const botonAlternar = document.getElementById("boton-alternar-contrasena");
    const iconoVisibilidad = document.getElementById("icono-visibilidad-contrasena");

    // Función para ocultar o mostrar la contraseña
    if (botonAlternar && campoContrasena && iconoVisibilidad) {
        botonAlternar.addEventListener("click", () => {
            const tipoActual = campoContrasena.getAttribute("type");
            const esPassword = tipoActual === "password";
            
            campoContrasena.setAttribute("type", esPassword ? "text" : "password");
            iconoVisibilidad.textContent = esPassword ? "visibility" : "visibility_off";
        });
    }

    // Procesamiento del formulario de registro
    if (formulario) {
        formulario.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const contrasena = campoContrasena.value;
            const confirmarContrasena = campoConfirmar.value;

            // Validación básica del frontend
            if (contrasena !== confirmarContrasena) {
                alert("Las contraseñas no coinciden. Por favor verifica.");
                return;
            }

            if (contrasena.length < 8) {
                alert("La contraseña debe tener al menos 8 caracteres.");
                return;
            }

            // Mapeo con la tabla de base de datos 'usuarios'
            const datosUsuario = {
                nombre_completo: nombre,
                correo_electronico: correo,
                contrasena_hash: contrasena
            };

            try {
                const respuesta = await fetch("/api/usuarios/registro", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datosUsuario)
                });

                if (respuesta.ok) {
                    const resultado = await respuesta.json();
                    if (resultado.token) {
                        localStorage.setItem("tokenAutenticacion", resultado.token);
                    }
                    alert("¡Bienvenido a Mi Hogar Inteligente! Tu cuenta ha sido creada.");
                    window.location.href = "panel-control.html";
                } else {
                    const errorData = await respuesta.json();
                    alert(errorData.mensaje || "Ocurrió un error al intentar crear la cuenta.");
                }
            } catch (error) {
                console.error("Error al conectar con el servidor:", error);
                alert("Error de conexión con el servidor.");
            }
        });
    }
});