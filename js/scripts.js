
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




let numeroResidentes = 1;

let viviendaSeleccionada = "Casa";


tarjetasVivienda.forEach(tarjeta => {

    tarjeta.addEventListener("click", () => {

        tarjetasVivienda.forEach(tarjetaActual => {

            tarjetaActual.classList.remove("seleccionada");

        });


        tarjeta.classList.add("seleccionada");


        // Guardar vivienda
        viviendaSeleccionada =
            tarjeta.dataset.vivienda;

    });

});



botonAumentar.addEventListener("click", () => {

    if (numeroResidentes < 20) {

        numeroResidentes++;

        actualizarContador();

    }

});



botonDisminuir.addEventListener("click", () => {

    if (numeroResidentes > 1) {

        numeroResidentes--;

        actualizarContador();

    }

});



function actualizarContador() {

    cantidadResidentes.textContent =
        numeroResidentes;

}



nombreHogar.addEventListener("input", () => {

    if (nombreHogar.value.trim() !== "") {

        mensajeNombre.textContent = "";

    }

});



botonSiguiente.addEventListener("click", () => {

    const nombre =
        nombreHogar.value.trim();


    if (nombre === "") {

        mensajeNombre.textContent =
            "Por favor, escribe un nombre para tu hogar.";

        nombreHogar.focus();

        return;

    }

    alert(
        "¡Configuración completada!\n\n" +

        "Hogar: " + nombre + "\n" +

        "Vivienda: " + viviendaSeleccionada + "\n" +

        "Residentes: " + numeroResidentes
    );


});