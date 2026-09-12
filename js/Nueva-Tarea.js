document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del DOM
    const formularioTarea = document.getElementById("formularioTarea");
    const inputNombreTarea = document.getElementById("nombreTarea");
    const inputFechaVencimiento = document.getElementById("fechaVencimiento");
    const inputHoraVencimiento = document.getElementById("horaVencimiento");
    const selectAsignadoA = document.getElementById("asignadoA");
    const btnVolver = document.getElementById("btnVolver");
    const btnNotificaciones = document.getElementById("btnNotificaciones");

    // Asignar fecha actual por defecto
    const hoy = new Date().toISOString().split("T")[0];
    if (inputFechaVencimiento) {
        inputFechaVencimiento.value = hoy;
    }

    // Navegación del botón Volver
    if (btnVolver) {
        btnVolver.addEventListener("click", () => {
            window.history.back();
        });
    }

    // Acción para notificaciones
    if (btnNotificaciones) {
        btnNotificaciones.addEventListener("click", () => {
            alert("No tienes nuevas notificaciones.");
        });
    }

    // Procesar el envío del formulario y registro en base de datos
    if (formularioTarea) {
        formularioTarea.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Captura de datos seleccionados
            const categoriaSeleccionada = document.querySelector('input[name="categoria"]:checked')?.value;
            const prioridadSeleccionada = document.querySelector('input[name="prioridad"]:checked')?.value;

            // Objeto listo para persistir en la base de datos
            const datosTarea = {
                nombre: inputNombreTarea.value.trim(),
                categoria: categoriaSeleccionada,
                fechaVencimiento: inputFechaVencimiento.value,
                horaVencimiento: inputHoraVencimiento.value,
                prioridad: prioridadSeleccionada,
                asignadoA: selectAsignadoA.value,
                completada: false,
                creadoEn: new Date().toISOString()
            };

            console.log("Enviando nueva tarea a la base de datos...", datosTarea);

            try {
                /*
                    Llamada de integración a la Base de Datos API (Ejemplo):
                    
                    const respuesta = await fetch('/api/tareas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(datosTarea)
                    });

                    if (!respuesta.ok) throw new Error("Error en la petición");
                */

                alert("¡Tarea creada exitosamente en Mi Hogar Inteligente!");
                formularioTarea.reset();
                inputFechaVencimiento.value = hoy;

            } catch (error) {
                console.error("Error al registrar la tarea en la base de datos:", error);
                alert("Ocurrió un error al intentar guardar la tarea.");
            }
        });
    }
});