// URL base para el Backend (Actualizar con el App Service cuando esté en Azure)
const API_URL = "http://localhost:3000/api";

// Configuración de límites
const MIN_RESIDENTES = 1;
const MAX_RESIDENTES = 20;

// Referencias al DOM
const formulario = document.getElementById("formulario-paso1");
const tarjetasVivienda = document.querySelectorAll(".tarjeta-vivienda");
const botonDisminuir = document.getElementById("boton-disminuir");
const botonAumentar = document.getElementById("boton-aumentar");
const cantidadResidentes = document.getElementById("cantidad-residentes");
const nombreHogarInput = document.getElementById("nombre-hogar");
const mensajeNombre = document.getElementById("mensaje-nombre");
const botonSiguiente = document.getElementById("boton-siguiente");
const textoBoton = document.getElementById("texto-boton");

// Estado del formulario
let estadoFormulario = {
    nombre: "",
    tipoVivienda: "Casa",
    numeroResidentes: 1
};

// 1. Selección de Tipo de Vivienda
tarjetasVivienda.forEach(tarjeta => {
    tarjeta.addEventListener("click", () => {
        tarjetasVivienda.forEach(t => {
            t.classList.remove("seleccionada");
            t.setAttribute("aria-checked", "false");
        });

        tarjeta.classList.add("seleccionada");
        tarjeta.setAttribute("aria-checked", "true");

        estadoFormulario.tipoVivienda = tarjeta.dataset.vivienda;
    });
});

// 2. Control de Residentes (Sumar / Restar)
botonAumentar.addEventListener("click", () => {
    if (estadoFormulario.numeroResidentes < MAX_RESIDENTES) {
        estadoFormulario.numeroResidentes++;
        actualizarContador();
    }
});

botonDisminuir.addEventListener("click", () => {
    if (estadoFormulario.numeroResidentes > MIN_RESIDENTES) {
        estadoFormulario.numeroResidentes--;
        actualizarContador();
    }
});

function actualizarContador() {
    cantidadResidentes.textContent = estadoFormulario.numeroResidentes;
    
    // Habilitar o deshabilitar botones según los límites
    botonDisminuir.disabled = estadoFormulario.numeroResidentes === MIN_RESIDENTES;
    botonAumentar.disabled = estadoFormulario.numeroResidentes === MAX_RESIDENTES;
}

// 3. Validación en tiempo real del input
nombreHogarInput.addEventListener("input", () => {
    if (nombreHogarInput.value.trim() !== "") {
        mensajeNombre.textContent = "";
        nombreHogarInput.classList.remove("error-input");
    }
});

// 4. Envío del Formulario
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombreValido = nombreHogarInput.value.trim();

    if (nombreValido === "") {
        mensajeNombre.textContent = "Por favor, escribe un nombre para tu hogar.";
        nombreHogarInput.classList.add("error-input");
        nombreHogarInput.focus();
        return;
    }

    estadoFormulario.nombre = nombreValido;

    // Guardar temporalmente en sesión local por si falla la red o para usar en el Paso 2
    sessionStorage.setItem("datosHogarPaso1", JSON.stringify(estadoFormulario));

    // Procesar envío hacia el backend
    await guardarConfiguracionHogar(estadoFormulario);
});

// 5. Integración con el Backend / Azure API
async function guardarConfiguracionHogar(datos) {
    try {
        // UI Feedback: estado de carga
        botonSiguiente.disabled = true;
        textoBoton.textContent = "Guardando...";

        /* 
        // Descomentar cuando el Backend (Node.js, .NET, Python, etc.) esté activo
        const respuesta = await fetch(`${API_URL}/hogares`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error('Error al guardar la información del hogar.');
        }

        const dataRespuesta = await respuesta.json();
        console.log("Hogar guardado en la BD con ID:", dataRespuesta.id);
        */

        // Simulación de respuesta exitosa mientras configuras el backend
        console.log("Datos listos para enviar a MySQL:", datos);

        // Redireccionar al Paso 2
        window.location.href = "Configuracion-Paso2.html";

    } catch (error) {
        console.error("Error al conectar con la API:", error);
        mensajeNombre.textContent = "No se pudo conectar con el servidor. Inténtalo más tarde.";
    } finally {
        botonSiguiente.disabled = false;
        textoBoton.textContent = "Siguiente paso";
    }
}