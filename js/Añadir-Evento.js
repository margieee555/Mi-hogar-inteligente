document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del DOM
    const formularioEvento = document.getElementById("formularioEvento");
    const inputTitulo = document.getElementById("tituloEvento");
    const inputFechaHora = document.getElementById("fechaHoraEvento");
    const inputUbicacion = document.getElementById("ubicacionEvento");
    const textareaNotas = document.getElementById("notasEvento");
    const toggleRecordatorio = document.getElementById("toggleRecordatorio");
    const contenedorChips = document.getElementById("contenedorTipoEvento");
    
    const btnCerrar = document.getElementById("btnCerrar");
    const btnCancelar = document.getElementById("btnCancelar");
    const btnNotificaciones = document.getElementById("btnNotificaciones");

    let tipoEventoSeleccionado = "pagos"; // Valor por defecto

    // Selección interactiva de chips (Tipo de evento)
    if (contenedorChips) {
        contenedorChips.addEventListener("click", (e) => {
            const botonChip = e.target.closest(".boton-chip");
            if (!botonChip) return;

            // Restablecer estado de los chips
            const todosLosChips = contenedorChips.querySelectorAll(".boton-chip");
            todosLosChips.forEach(chip => {
                chip.classList.remove("chip-activo");
                chip.classList.add("chip-inactivo");
            });

            // Activar chip seleccionado
            botonChip.classList.remove("chip-inactivo");
            botonChip.classList.add("chip-activo");

            // Guardar tipo
            tipoEventoSeleccionado = botonChip.getAttribute("data-tipo");
        });
    }

    // Botones de Navegación
    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => window.history.back());
    }

    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => window.history.back());
    }

    if (btnNotificaciones) {
        btnNotificaciones.addEventListener("click", () => {
            alert("No tienes nuevas notificaciones.");
        });
    }

    // Envío a la Base de Datos
    if (formularioEvento) {
        formularioEvento.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Estructura lista para base de datos (SQL / NoSQL / API)
            const nuevoEvento = {
                titulo: inputTitulo.value.trim(),
                tipo: tipoEventoSeleccionado,
                fechaHora: inputFechaHora.value,
                ubicacion: inputUbicacion.value.trim() || null,
                notas: textareaNotas.value.trim() || null,
                recordatorio: toggleRecordatorio.checked,
                creadoEn: new Date().toISOString()
            };

            console.log("Enviando evento a la base de datos...", nuevoEvento);

            try {
                /*
                    Llamada API (Ejemplo):
                    const respuesta = await fetch('/api/eventos', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(nuevoEvento)
                    });
                    if (!respuesta.ok) throw new Error("Error en el registro");
                */

                alert("¡Evento registrado con éxito en Mi Hogar Inteligente!");
                formularioEvento.reset();
                window.history.back();

            } catch (error) {
                console.error("Error al registrar el evento:", error);
                alert("Ocurrió un problema al guardar el evento.");
            }
        });
    }
});