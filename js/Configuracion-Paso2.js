// URL base para el Backend (Mantenemos la convención del Paso 1)
const API_URL = "http://localhost:3000/api";

// Referencias al DOM
const formulario = document.getElementById("formulario-paso2");
const direccionInput = document.getElementById("direccion-hogar");
const contenedorInvitados = document.getElementById("lista-invitados");
const botonAgregar = document.getElementById("boton-agregar-invitado");
const mensajeInvitados = document.getElementById("mensaje-invitados");
const botonSiguiente = document.getElementById("boton-siguiente");
const textoBoton = document.getElementById("texto-boton");

// Estado local del formulario
let estadoFormularioPaso2 = {
    direccion: "",
    invitados: []
};

// 1. Agregar nuevo campo de correo
botonAgregar.addEventListener("click", () => {
    const nuevaFila = document.createElement("div");
    nuevaFila.classList.add("fila-invitado");
    nuevaFila.innerHTML = `
        <input 
            type="email" 
            class="correo-invitado" 
            name="correosInvitados[]"
            placeholder="Ej: familiar@ejemplo.com" 
            autocomplete="off"
        >
        <button type="button" class="boton-eliminar-invitado" aria-label="Eliminar invitado">
            <span class="material-symbols-outlined">close</span>
        </button>
    `;

    contenedorInvitados.appendChild(nuevaFila);
    actualizarBotonesEliminar();
});

// 2. Evento para eliminar campo de correo (Delegación de eventos)
contenedorInvitados.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".boton-eliminar-invitado");
    if (botonEliminar) {
        const fila = botonEliminar.closest(".fila-invitado");
        fila.remove();
        actualizarBotonesEliminar();
    }
});

// 3. Controlar visibilidad del botón eliminar (ocultar si solo hay 1 campo)
function actualizarBotonesEliminar() {
    const filas = contenedorInvitados.querySelectorAll(".fila-invitado");
    filas.forEach(fila => {
        const boton = fila.querySelector(".boton-eliminar-invitado");
        if (boton) {
            boton.style.display = filas.length > 1 ? "flex" : "none";
        }
    });
}

// 4. Envío y Validación del Formulario Paso 2
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    mensajeInvitados.textContent = "";

    const inputsCorreos = contenedorInvitados.querySelectorAll(".correo-invitado");
    const correos = Array.from(inputsCorreos)
        .map(input => input.value.trim())
        .filter(correo => correo !== "");

    // Expresión regular simple para validar correos
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const correosInvalidos = correos.some(correo => !regexEmail.test(correo));

    if (correosInvalidos) {
        mensajeInvitados.textContent = "Por favor, introduce correos electrónicos válidos.";
        return;
    }

    estadoFormularioPaso2.direccion = direccionInput.value.trim();
    estadoFormularioPaso2.invitados = correos;

    sessionStorage.setItem("datosHogarPaso2", JSON.stringify(estadoFormularioPaso2));

    await guardarPaso2(estadoFormularioPaso2);
});

// 5. Integración Backend / API
async function guardarPaso2(datos) {
    try {
        botonSiguiente.disabled = true;
        if (textoBoton) textoBoton.textContent = "Guardando...";

        /* Descomentar al integrar el Backend real
        const respuesta = await fetch(`${API_URL}/hogares/paso2`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) throw new Error('Error al guardar el paso 2.');
        */

        console.log("Datos del paso 2 del hogar:", datos);
        window.location.href = "Configuracion-paso3.html";

    } catch (error) {
        console.error("Error API:", error);
        mensajeInvitados.textContent = "No se pudo conectar con el servidor.";
    } finally {
        botonSiguiente.disabled = false;
        if (textoBoton) textoBoton.textContent = "Siguiente paso";
    }
}