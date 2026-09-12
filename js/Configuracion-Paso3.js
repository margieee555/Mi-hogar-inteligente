// URL base para el Backend API
const API_URL = "http://localhost:3000/api";

// Referencias al DOM
const formulario = document.getElementById("formulario-paso3");
const mensajeErrorZonas = document.getElementById("mensaje-error-zonas");
const botonFinalizar = document.getElementById("boton-finalizar");
const textoBoton = document.getElementById("texto-boton");

// Envío y Validación del Formulario Paso 3
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    mensajeErrorZonas.textContent = "";

    // 1. Obtener zonas seleccionadas
    const checkboxesZonas = formulario.querySelectorAll('input[name="zonas[]"]:checked');
    const zonasSeleccionadas = Array.from(checkboxesZonas).map(cb => cb.value);

    // Validación: Al menos 1 zona seleccionada
    if (zonasSeleccionadas.length === 0) {
        mensajeErrorZonas.textContent = "Debes seleccionar al menos una zona para tu hogar.";
        return;
    }

    // 2. Recuperar información acumulada de Pasos 1 y 2 desde sessionStorage
    const datosPaso1 = JSON.parse(sessionStorage.getItem("datosHogarPaso1")) || {};
    const datosPaso2 = JSON.parse(sessionStorage.getItem("datosHogarPaso2")) || {};

    // 3. Estructura completa de datos para enviar a la Base de Datos
    const payloadCompletoHogar = {
        nombreHogar: datosPaso1.nombreHogar || "",
        tipoVivienda: datosPaso1.tipoVivienda || "",
        direccionHogar: datosPaso2.direccion || "",
        invitados: datosPaso2.invitados || [],
        zonas: zonasSeleccionadas
    };

    // 4. Procesar y guardar en Backend
    await guardarHogarCompleto(payloadCompletoHogar);
});

// Enviar todo el objeto del hogar al Servidor / API
async function guardarHogarCompleto(datosConsolidados) {
    try {
        botonFinalizar.disabled = true;
        if (textoBoton) textoBoton.textContent = "Finalizando...";

        /* 
        // Descomentar al conectar con tu API Node.js / Express / Laravel / Python
        const respuesta = await fetch(`${API_URL}/hogares/completar-configuracion`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}` // Si usas JWT
            },
            body: JSON.stringify(datosConsolidados)
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar el hogar en el servidor.');
        }
        */

        console.log("Payload final listo para Base de Datos:", datosConsolidados);

        // Limpieza de caché temporal tras guardar con éxito
        sessionStorage.removeItem("datosHogarPaso1");
        sessionStorage.removeItem("datosHogarPaso2");

        // Redirección al Dashboard o Panel Principal
        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Error al guardar la configuración:", error);
        mensajeErrorZonas.textContent = "Hubo un fallo al guardar la configuración. Inténtalo de nuevo.";
    } finally {
        botonFinalizar.disabled = false;
        if (textoBoton) textoBoton.textContent = "Finalizar configuración";
    }
}