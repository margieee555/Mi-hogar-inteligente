const API_URL = "http://localhost:3000/api";
const MIN_RESIDENTES = 1;
const MAX_RESIDENTES = 20;

let pasoActual = 1;
let datosHogar = {
    nombreHogar: "",
    tipoVivienda: "Casa",
    numeroResidentes: 1,
    direccionHogar: "",
    invitados: [],
    zonas: []
};

const nombreHogarInput = document.getElementById("nombre-hogar");
const mensajeNombre = document.getElementById("mensaje-nombre");
const tarjetasVivienda = document.querySelectorAll(".tarjeta-vivienda");
const botonDisminuir = document.getElementById("boton-disminuir");
const botonAumentar = document.getElementById("boton-aumentar");
const cantidadResidentes = document.getElementById("cantidad-residentes");

const direccionInput = document.getElementById("direccion-hogar");
const contenedorInvitados = document.getElementById("lista-invitados");
const botonAgregar = document.getElementById("boton-agregar-invitado");
const mensajeInvitados = document.getElementById("mensaje-invitados");

const formulario = document.getElementById("formulario-configuracion");
const mensajeErrorZonas = document.getElementById("mensaje-error-zonas");
const textoBotonFinal = document.getElementById("texto-boton-final");

const prog1 = document.getElementById("progreso-1");
const prog2 = document.getElementById("progreso-2");
const prog3 = document.getElementById("progreso-3");
const lblNumPaso = document.getElementById("etiqueta-numero-paso");
const tituloPaso = document.getElementById("titulo-paso");
const descPaso = document.getElementById("descripcion-paso");

tarjetasVivienda.forEach(tarjeta => {
    tarjeta.addEventListener("click", () => {
        tarjetasVivienda.forEach(t => {
            t.classList.remove("seleccionada");
            t.setAttribute("aria-checked", "false");
        });
        tarjeta.classList.add("seleccionada");
        tarjeta.setAttribute("aria-checked", "true");
        datosHogar.tipoVivienda = tarjeta.dataset.vivienda;
    });
});

botonAumentar.addEventListener("click", () => {
    if (datosHogar.numeroResidentes < MAX_RESIDENTES) {
        datosHogar.numeroResidentes++;
        actualizarContador();
    }
});

botonDisminuir.addEventListener("click", () => {
    if (datosHogar.numeroResidentes > MIN_RESIDENTES) {
        datosHogar.numeroResidentes--;
        actualizarContador();
    }
});

function actualizarContador() {
    cantidadResidentes.textContent = datosHogar.numeroResidentes;
    botonDisminuir.disabled = datosHogar.numeroResidentes === MIN_RESIDENTES;
    botonAumentar.disabled = datosHogar.numeroResidentes === MAX_RESIDENTES;
}

nombreHogarInput.addEventListener("input", () => {
    if (nombreHogarInput.value.trim() !== "") {
        mensajeNombre.textContent = "";
        nombreHogarInput.classList.remove("error-input");
    }
});

botonAgregar.addEventListener("click", () => {
    const nuevaFila = document.createElement("div");
    nuevaFila.classList.add("fila-invitado");
    nuevaFila.innerHTML = `
        <input type="email" class="correo-invitado" name="correosInvitados[]" placeholder="Ej: familiar@ejemplo.com" autocomplete="off">
        <button type="button" class="boton-eliminar-invitado" aria-label="Eliminar invitado">
            <span class="material-symbols-outlined">close</span>
        </button>
    `;
    contenedorInvitados.appendChild(nuevaFila);
    actualizarBotonesEliminar();
});

contenedorInvitados.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".boton-eliminar-invitado");
    if (botonEliminar) {
        botonEliminar.closest(".fila-invitado").remove();
        actualizarBotonesEliminar();
    }
});

function actualizarBotonesEliminar() {
    const filas = contenedorInvitados.querySelectorAll(".fila-invitado");
    filas.forEach(fila => {
        const boton = fila.querySelector(".boton-eliminar-invitado");
        if (boton) boton.style.display = filas.length > 1 ? "flex" : "none";
    });
}

document.getElementById("btn-siguiente-1").addEventListener("click", () => {
    const nombreValido = nombreHogarInput.value.trim();
    if (nombreValido === "") {
        mensajeNombre.textContent = "Por favor, escribe un nombre para tu hogar.";
        nombreHogarInput.classList.add("error-input");
        nombreHogarInput.focus();
        return;
    }
    datosHogar.nombreHogar = nombreValido;
    cambiarPaso(2);
});

document.getElementById("btn-atras-2").addEventListener("click", () => cambiarPaso(1));

document.getElementById("btn-siguiente-2").addEventListener("click", () => {
    mensajeInvitados.textContent = "";
    const inputsCorreos = contenedorInvitados.querySelectorAll(".correo-invitado");
    const correos = Array.from(inputsCorreos).map(i => i.value.trim()).filter(c => c !== "");
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (correos.some(c => !regexEmail.test(c))) {
        mensajeInvitados.textContent = "Por favor, introduce correos electrónicos válidos.";
        return;
    }
    datosHogar.direccionHogar = direccionInput.value.trim();
    datosHogar.invitados = correos;
    cambiarPaso(3);
});

document.getElementById("btn-atras-3").addEventListener("click", () => cambiarPaso(2));

function cambiarPaso(nuevoPaso) {
    document.getElementById(`paso-${pasoActual}`).classList.remove("activo");
    document.getElementById(`paso-${nuevoPaso}`).classList.add("activo");
    pasoActual = nuevoPaso;

    prog1.className = "progreso" + (pasoActual >= 1 ? " activo" : "");
    prog2.className = "progreso" + (pasoActual >= 2 ? " activo" : "");
    prog3.className = "progreso" + (pasoActual >= 3 ? " activo" : "");

    lblNumPaso.textContent = `PASO ${pasoActual} DE 3`;
    if (pasoActual === 1) {
        tituloPaso.textContent = "¡Bienvenido a Mi hogar inteligente!";
        descPaso.textContent = "Vamos a configurar algunos datos básicos de tu hogar.";
    } else if (pasoActual === 2) {
        tituloPaso.textContent = "Invita a tu familia";
        descPaso.textContent = "Añade la dirección de tu vivienda e invita a los miembros que compartirán la gestión del hogar.";
    } else if (pasoActual === 3) {
        tituloPaso.textContent = "Selecciona tus zonas iniciales";
        descPaso.textContent = "Elige las habitaciones o espacios principales que deseas gestionar en tu hogar.";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    mensajeErrorZonas.textContent = "";

    const checkboxesZonas = formulario.querySelectorAll('input[name="zonas[]"]:checked');
    const zonasSeleccionadas = Array.from(checkboxesZonas).map(cb => cb.value);

    if (zonasSeleccionadas.length === 0) {
        mensajeErrorZonas.textContent = "Debes seleccionar al menos una zona para tu hogar.";
        return;
    }

    datosHogar.zonas = zonasSeleccionadas;

    try {
        if (textoBotonFinal) textoBotonFinal.textContent = "Finalizando...";
        console.log("Payload consolidado listo para Base de Datos:", datosHogar);
        
        // Simulación de guardado exitoso
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Error al guardar la configuración:", error);
        mensajeErrorZonas.textContent = "Hubo un fallo al guardar la configuración. Inténtalo de nuevo.";
    } finally {
        if (textoBotonFinal) textoBotonFinal.textContent = "Finalizar configuración";
    }
});