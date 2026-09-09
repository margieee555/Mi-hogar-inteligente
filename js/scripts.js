
const tarjetasVivienda =
    document.querySelectorAll(".tarjeta-vivienda");

const botonDisminuir =
    document.getElementById("boton-disminuir");

const botonAumentar =
    document.getElementById("boton-aumentar");

const cantidadResidentes =
    document.getElementById("cantidad-residentes");

const nombreHogar =
    document.getElementById("nombre-hogar");

const mensajeNombre =
    document.getElementById("mensaje-nombre");

const botonSiguiente =
    document.getElementById("boton-siguiente");


/* ==========================================
   CONFIGURACIÓN INICIAL
========================================== */

let numeroResidentes = 1;

let viviendaSeleccionada = "Casa";


/* ==========================================
   SELECCIONAR TIPO DE VIVIENDA
========================================== */

tarjetasVivienda.forEach(tarjeta => {

    tarjeta.addEventListener("click", () => {

        // Quitar selección anterior
        tarjetasVivienda.forEach(tarjetaActual => {

            tarjetaActual.classList.remove("seleccionada");

        });


        // Seleccionar nueva tarjeta
        tarjeta.classList.add("seleccionada");


        // Guardar vivienda
        viviendaSeleccionada =
            tarjeta.dataset.vivienda;

    });

});


/* ==========================================
   AUMENTAR RESIDENTES
========================================== */

botonAumentar.addEventListener("click", () => {

    if (numeroResidentes < 20) {

        numeroResidentes++;

        actualizarContador();

    }

});


/* ==========================================
   DISMINUIR RESIDENTES
========================================== */

botonDisminuir.addEventListener("click", () => {

    if (numeroResidentes > 1) {

        numeroResidentes--;

        actualizarContador();

    }

});


/* ==========================================
   ACTUALIZAR CONTADOR
========================================== */

function actualizarContador() {

    cantidadResidentes.textContent =
        numeroResidentes;

}


/* ==========================================
   VALIDAR NOMBRE
========================================== */

nombreHogar.addEventListener("input", () => {

    if (nombreHogar.value.trim() !== "") {

        mensajeNombre.textContent = "";

    }

});


/* ==========================================
   BOTÓN SIGUIENTE
========================================== */

botonSiguiente.addEventListener("click", () => {

    const nombre =
        nombreHogar.value.trim();


    // Validar nombre
    if (nombre === "") {

        mensajeNombre.textContent =
            "Por favor, escribe un nombre para tu hogar.";

        nombreHogar.focus();

        return;

    }


    // Mostrar información temporal
    alert(
        "¡Configuración completada!\n\n" +

        "Hogar: " + nombre + "\n" +

        "Vivienda: " + viviendaSeleccionada + "\n" +

        "Residentes: " + numeroResidentes
    );


    /*
        FUTURA ITERACIÓN:

        Aquí posteriormente podremos pasar
        al PASO 2 de la configuración.

        Por ejemplo:

        cargarHabitaciones();

        Esta función será desarrollada
        en la siguiente evolución del sistema.
    */

});