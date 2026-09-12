document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del DOM
    const formularioGasto = document.getElementById("formularioGasto");
    const inputMonto = document.getElementById("inputMonto");
    const inputFecha = document.getElementById("inputFecha");
    const inputDescripcion = document.getElementById("inputDescripcion");
    const inputCategoria = document.getElementById("categoriaSeleccionada");
    const tarjetasCategorias = document.querySelectorAll(".tarjeta-categoria");
    const btnVolver = document.getElementById("btnVolver");
    
    // Elementos de la subida de archivos
    const inputRecibo = document.getElementById("inputRecibo");
    const btnAdjuntarRecibo = document.getElementById("btnAdjuntarRecibo");
    const nombreArchivoRecibo = document.getElementById("nombreArchivoRecibo");

    // Asignar fecha actual por defecto en el selector
    const hoy = new Date().toISOString().split("T")[0];
    if (inputFecha) {
        inputFecha.value = hoy;
    }

    // Lógica para selección exclusiva de Categorías
    tarjetasCategorias.forEach((tarjeta) => {
        tarjeta.addEventListener("click", () => {
            tarjetasCategorias.forEach((t) => t.classList.remove("activo"));
            tarjeta.classList.add("activo");
            
            const categoria = tarjeta.getAttribute("data-categoria");
            inputCategoria.value = categoria;
        });
    });

    // Evento para abrir el selector de archivos al presionar Adjuntar Recibo
    if (btnAdjuntarRecibo && inputRecibo) {
        btnAdjuntarRecibo.addEventListener("click", () => {
            inputRecibo.click();
        });

        inputRecibo.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                nombreArchivoRecibo.textContent = `Archivo seleccionado: ${e.target.files[0].name}`;
            } else {
                nombreArchivoRecibo.textContent = "";
            }
        });
    }

    // Navegación de retorno
    if (btnVolver) {
        btnVolver.addEventListener("click", () => {
            window.history.back();
        });
    }

    // Manejo de envío del formulario y conexión a Base de Datos
    if (formularioGasto) {
        formularioGasto.addEventListener("submit", async (e) => {
            e.preventDefault();

            const datosGasto = {
                monto: parseFloat(inputMonto.value),
                categoria: inputCategoria.value,
                fecha: inputFecha.value,
                descripcion: inputDescripcion.value.trim(),
                recibo: inputRecibo.files[0] ? inputRecibo.files[0].name : null,
                creadoEn: new Date().toISOString()
            };

            console.log("Enviando registro de gasto a la base de datos...", datosGasto);

            try {
                /* 
                   Ejemplo de llamada API para persistencia en BD:
                   
                   const respuesta = await fetch('/api/gastos', {
                       method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify(datosGasto)
                   });

                   if (respuesta.ok) { ... }
                */

                alert("¡Gasto registrado con éxito!");
                formularioGasto.reset();
                inputFecha.value = hoy;
                nombreArchivoRecibo.textContent = "";
                
            } catch (error) {
                console.error("Error al registrar el gasto en la base de datos:", error);
                alert("Ocurrió un error al guardar el gasto.");
            }
        });
    }
});