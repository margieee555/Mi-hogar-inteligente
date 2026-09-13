document.addEventListener("DOMContentLoaded", () => {
    console.log("Aplicación Mi Hogar Inteligente cargada correctamente.");

    // Fecha actual (Septiembre 2026 o la fecha real del sistema)
    const today = new Date();
    const optionsMonth = { month: 'long', year: 'numeric' };
    const optionsDay = { weekday: 'long', day: 'numeric', month: 'long' };
    
    // Capitalizar la primera letra del mes/año
    let currentMonthYearStr = today.toLocaleDateString('es-ES', optionsMonth);
    currentMonthYearStr = currentMonthYearStr.charAt(0).toUpperCase() + currentMonthYearStr.slice(1);

    let currentDayStr = today.toLocaleDateString('es-ES', optionsDay);
    currentDayStr = currentDayStr.charAt(0).toUpperCase() + currentDayStr.slice(1);

    // Actualizar textos en pantalla con la fecha real
    const monthYearLabel = document.getElementById("current-month-year");
    if (monthYearLabel) {
        monthYearLabel.textContent = currentMonthYearStr;
    }

    const dateLabel = document.getElementById("selected-date-label");
    if (dateLabel) {
        dateLabel.textContent = currentDayStr;
    }

    // Sincronización de calendario
    const syncBtn = document.getElementById("sync-btn");
    if (syncBtn) {
        syncBtn.addEventListener("click", () => {
            alert("Conectando y sincronizando con Google Calendar...");
        });
    }

    // Interactividad en los días del calendario
    const days = document.querySelectorAll("#calendar-days-grid [data-date]");

    days.forEach(day => {
        day.addEventListener("click", () => {
            // Remover selección previa
            days.forEach(d => {
                d.classList.remove("border-2", "border-primary", "bg-primary-container/10", "font-bold");
                d.classList.add("border", "border-outline-variant");
            });

            // Aplicar selección actual
            day.classList.remove("border", "border-outline-variant");
            day.classList.add("border-2", "border-primary", "bg-primary-container/10", "font-bold");

            const selectedDate = day.getAttribute("data-date");
            if (dateLabel) {
                dateLabel.textContent = `Fecha seleccionada: ${selectedDate}`;
            }
        });
    });

    // Simulación para añadir evento
    const addEventBtn = document.getElementById("add-event-btn");
    if (addEventBtn) {
        addEventBtn.addEventListener("click", () => {
            const title = prompt("Escribe el nombre del recordatorio o tarea:");
            if (title) {
                alert(`¡ "${title}" ha sido creado con éxito para hoy!`);
            }
        });
    }
});