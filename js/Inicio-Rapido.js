/**
 * Lógica integral para Mi Hogar 360
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema Mi Hogar 360 inicializado.");

    // ==========================================
    // LÓGICA DE RECORDATORIO DE PAGOS (COMPACTO)
    // ==========================================
    const serviciosPagos = [
        { id: 1, nombre: "Agua", icono: "water_drop", monto: 45.50, fecha: "15 Oct", estado: "pendiente", colorIcono: "bg-red-50 text-red-600", colorBorde: "border-red-500", colorBadge: "bg-red-50 text-red-600" },
        { id: 2, nombre: "Luz", icono: "bolt", monto: 82.30, fecha: "18 Oct", estado: "pendiente", colorIcono: "bg-orange-50 text-orange-500", colorBorde: "border-orange-400", colorBadge: "bg-orange-50 text-orange-600" },
        { id: 3, nombre: "Internet", icono: "wifi", monto: 59.99, fecha: "01 Oct", estado: "pagado", colorIcono: "bg-green-50 text-green-600", colorBorde: "border-green-500", colorBadge: "bg-green-50 text-green-600" },
        { id: 4, nombre: "Arriendo", icono: "home_work", monto: 1200.00, fecha: "05 Oct", estado: "pagado", colorIcono: "bg-green-50 text-green-600", colorBorde: "border-green-500", colorBadge: "bg-green-50 text-green-600" }
    ];

    const contenedorPagos = document.getElementById("contenedor-pagos-dashboard");

    function renderizarPagos() {
        if (!contenedorPagos) return;
        contenedorPagos.innerHTML = "";

        serviciosPagos.forEach(servicio => {
            const esPendiente = servicio.estado === "pendiente";
            const textoEstado = esPendiente ? "Pendiente" : "Pagado";
            const opacidad = esPendiente ? "opacity-100 hover:shadow-md" : "opacity-60 cursor-default";
            const pointerEvent = esPendiente ? `onclick="procesarPago(${servicio.id})" class="cursor-pointer bg-white border border-gray-100 border-l-4 ${servicio.colorBorde} rounded-2xl p-4 shadow-sm flex flex-col justify-between transition-all ${opacidad}"` : `class="bg-white border border-gray-100 border-l-4 ${servicio.colorBorde} rounded-2xl p-4 shadow-sm flex flex-col justify-between transition-all ${opacidad}"`;

            const tarjetaHTML = `
                <div ${pointerEvent}>
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full ${servicio.colorIcono} flex items-center justify-center">
                                <span class="material-symbols-outlined text-[16px]">${servicio.icono}</span>
                            </div>
                            <h3 class="font-semibold text-gray-900 text-sm">${servicio.nombre}</h3>
                        </div>
                        <span class="text-[10px] font-bold ${servicio.colorBadge} px-2 py-0.5 rounded-full uppercase tracking-wider">${textoEstado}</span>
                    </div>
                    <div class="mt-2 flex justify-between items-end">
                        <span class="text-xs text-gray-500 font-medium flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px]">${esPendiente ? 'event' : 'check_circle'}</span> ${servicio.fecha}
                        </span>
                        <span class="text-lg font-bold text-gray-900 ${esPendiente ? '' : 'line-through text-gray-400'}">$${servicio.monto.toFixed(2)}</span>
                    </div>
                </div>
            `;
            contenedorPagos.innerHTML += tarjetaHTML;
        });
    }

    // Exponemos la función al entorno global para el onclick en el HTML
    window.procesarPago = function(idServicio) {
        const servicio = serviciosPagos.find(s => s.id === idServicio);
        if (servicio && servicio.estado === "pendiente") {
            servicio.estado = "pagado";
            servicio.colorIcono = "bg-green-50 text-green-600";
            servicio.colorBorde = "border-green-500";
            servicio.colorBadge = "bg-green-50 text-green-600";
            renderizarPagos();
        }
    };

    renderizarPagos();

    // ==========================================
    // CONTROLADORES DE MODALES
    // ==========================================
    const modalButtons = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('[data-close]');
    const modals = document.querySelectorAll('.modal-overlay');

    const abrirModal = (modalId) => {
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    const cerrarModal = (modalId) => {
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    modalButtons.forEach(btn => btn.addEventListener('click', () => abrirModal(btn.getAttribute('data-modal'))));
    closeButtons.forEach(btn => btn.addEventListener('click', () => cerrarModal(btn.getAttribute('data-close'))));

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => modal.classList.add('hidden'));
            document.body.style.overflow = '';
        }
    });

    // ==========================================
    // FORMULARIO 1: NUEVA TAREA
    // ==========================================
    const formTarea = document.getElementById('formularioTarea');
    const chipsPrioridad = document.querySelectorAll('.chip-prioridad');

    chipsPrioridad.forEach(chip => {
        chip.addEventListener('click', () => {
            chipsPrioridad.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            chip.querySelector('input[type="radio"]').checked = true;
        });
    });

    if (formTarea) {
        const inputFechaTarea = document.getElementById('fechaVencimiento');
        if (inputFechaTarea) inputFechaTarea.value = new Date().toISOString().split('T')[0];

        formTarea.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formTarea);
            const tareaData = {
                nombre: formData.get('nombreTarea'),
                categoria: formData.get('categoriaTarea'),
                fecha: formData.get('fechaVencimiento'),
                hora: formData.get('horaVencimiento'),
                prioridad: formData.get('prioridad'),
                asignadoA: formData.get('asignadoA')
            };
            console.log("Guardando en Mi Hogar 360 -> Tarea:", tareaData);
            alert("¡Tarea creada con éxito en Mi Hogar 360!");
            formTarea.reset();
            cerrarModal('modal-tarea');
        });
    }

    // ==========================================
    // FORMULARIO 2: REGISTRAR GASTO
    // ==========================================
    const formGasto = document.getElementById('formularioGasto');
    const inputFechaGasto = document.getElementById('inputFechaGasto');
    const catItemsGasto = document.querySelectorAll('.tarjeta-cat-item');
    const hiddenCatGasto = document.getElementById('categoriaSeleccionadaGasto');
    const btnAdjuntarRecibo = document.getElementById('btnAdjuntarReciboModal');
    const inputRecibo = document.getElementById('inputReciboModal');
    const lblArchivoRecibo = document.getElementById('nombreArchivoReciboModal');

    if (inputFechaGasto) inputFechaGasto.value = new Date().toISOString().split('T')[0];

    catItemsGasto.forEach(btn => {
        btn.addEventListener('click', () => {
            catItemsGasto.forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');
            if (hiddenCatGasto) hiddenCatGasto.value = btn.dataset.categoria;
        });
    });

    if (btnAdjuntarRecibo && inputRecibo) {
        btnAdjuntarRecibo.addEventListener('click', () => inputRecibo.click());
        inputRecibo.addEventListener('change', (e) => {
            lblArchivoRecibo.textContent = e.target.files.length > 0 ? `Adjuntado: ${e.target.files[0].name}` : '';
        });
    }

    if (formGasto) {
        formGasto.addEventListener('submit', (e) => {
            e.preventDefault();
            const gastoData = {
                monto: parseFloat(document.getElementById('inputMonto').value),
                categoria: hiddenCatGasto.value,
                fecha: inputFechaGasto.value,
                descripcion: document.getElementById('inputDescripcionGasto').value,
                recibo: inputRecibo.files[0] ? inputRecibo.files[0].name : null
            };
            console.log("Guardando en Mi Hogar 360 -> Gasto:", gastoData);
            alert("¡Gasto guardado correctamente en Mi Hogar 360!");
            formGasto.reset();
            lblArchivoRecibo.textContent = '';
            cerrarModal('modal-gasto');
        });
    }

    // ==========================================
    // FORMULARIO 3: INVITAR MIEMBRO
    // ==========================================
    const formMiembro = document.getElementById('formularioMiembro');
    const avatarButtons = document.querySelectorAll('.avatar-btn');
    const inputHiddenAvatar = document.getElementById('avatarSeleccionado');
    const permissionCards = document.querySelectorAll('.permission-card-modal');

    avatarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            avatarButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            if (inputHiddenAvatar) inputHiddenAvatar.value = btn.dataset.avatar;
        });
    });

    permissionCards.forEach(card => {
        card.addEventListener('click', () => {
            permissionCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            card.querySelector('input[type="radio"]').checked = true;
        });
    });

    if (formMiembro) {
        formMiembro.addEventListener('submit', (e) => {
            e.preventDefault();
            const miembroData = {
                nombre: document.getElementById('memberName').value,
                avatar: inputHiddenAvatar.value,
                permiso: formMiembro.querySelector('input[name="permission"]:checked').value,
                notas: document.getElementById('memberNotes').value
            };
            console.log("Guardando en Mi Hogar 360 -> Miembro:", miembroData);
            alert("¡Miembro invitado con éxito a Mi Hogar 360!");
            formMiembro.reset();
            cerrarModal('modal-miembro');
        });
    }

    // Notificaciones Generales
    const notifBtn = document.getElementById('btnNotificacionesGenerales');
    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            alert('No tienes notificaciones pendientes en Mi Hogar 360.');
        });
    }

    // ==========================================
    // LÓGICA DEL CALENDARIO INTEGRADO
    // ==========================================
    const today = new Date();
    const optionsMonth = { month: 'long', year: 'numeric' };
    const optionsDay = { weekday: 'long', day: 'numeric', month: 'long' };
    
    let currentMonthYearStr = today.toLocaleDateString('es-ES', optionsMonth);
    currentMonthYearStr = currentMonthYearStr.charAt(0).toUpperCase() + currentMonthYearStr.slice(1);

    let currentDayStr = today.toLocaleDateString('es-ES', optionsDay);
    currentDayStr = currentDayStr.charAt(0).toUpperCase() + currentDayStr.slice(1);

    const monthYearLabel = document.getElementById("current-month-year");
    if (monthYearLabel) monthYearLabel.textContent = currentMonthYearStr;

    const dateLabel = document.getElementById("selected-date-label");
    if (dateLabel) dateLabel.textContent = currentDayStr;

    // Sincronización
    const syncBtn = document.getElementById("sync-btn");
    if (syncBtn) {
        syncBtn.addEventListener("click", () => {
            alert("Conectando y sincronizando eventos con Google Calendar...");
        });
    }

    // Interactividad de los días del calendario
    const days = document.querySelectorAll("#calendar-days-grid .cal-day");
    days.forEach(day => {
        day.addEventListener("click", () => {
            days.forEach(d => d.classList.remove("active-day", "border-2", "border-blue-600", "bg-blue-50"));
            day.classList.add("active-day");
            
            const selectedDate = day.getAttribute("data-date");
            if (dateLabel && selectedDate) {
                dateLabel.textContent = `Fecha seleccionada: ${selectedDate}`;
            }
        });
    });
});