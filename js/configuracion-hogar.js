// URL base para el Backend (Actualizar con la API cuando esté lista)
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

// Estado local del formulario
let estadoFormulario = {
  nombre: "",
  tipoVivienda: "Casa",
  numeroResidentes: 1
};

// 1. Selección de Tipo de Vivienda
tarjetasVivienda.forEach(tarjeta => {
  tarjeta.addEventListener("click", () => {
    tarjetasVivienda.forEach(t => {
      t.classList.remove("border-primario", "bg-superficie-contenedor");
      t.classList.add("border-contorno");
      t.setAttribute("aria-checked", "false");
    });

    tarjeta.classList.remove("border-contorno");
    tarjeta.classList.add("border-primario", "bg-superficie-contenedor");
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
  botonDisminuir.disabled = estadoFormulario.numeroResidentes === MIN_RESIDENTES;
  botonAumentar.disabled = estadoFormulario.numeroResidentes === MAX_RESIDENTES;
}

// 3. Validación en tiempo real del campo nombre
nombreHogarInput.addEventListener("input", () => {
  if (nombreHogarInput.value.trim() !== "") {
    mensajeNombre.textContent = "";
    nombreHogarInput.classList.remove("border-error");
  }
});

// 4. Envío del Formulario
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombreValido = nombreHogarInput.value.trim();

  if (nombreValido === "") {
    mensajeNombre.textContent = "Por favor, escribe un nombre para tu hogar.";
    nombreHogarInput.classList.add("border-error");
    nombreHogarInput.focus();
    return;
  }

  estadoFormulario.nombre = nombreValido;
  sessionStorage.setItem("datosHogarPaso1", JSON.stringify(estadoFormulario));

  await guardarConfiguracionHogar(estadoFormulario);
});

// 5. Integración Backend / API
async function guardarConfiguracionHogar(datos) {
  try {
    botonSiguiente.disabled = true;
    if (textoBoton) textoBoton.textContent = "Guardando...";

    /* Descomentar al integrar el Backend real
    const respuesta = await fetch(`${API_URL}/hogares`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (!respuesta.ok) throw new Error('Error al guardar el hogar.');
    */

    console.log("Datos de configuración del hogar:", datos);
    window.location.href = "paso2.html";

  } catch (error) {
    console.error("Error API:", error);
    mensajeNombre.textContent = "No se pudo conectar con el servidor.";
  } finally {
    botonSiguiente.disabled = false;
    if (textoBoton) textoBoton.textContent = "Siguiente paso";
  }
}