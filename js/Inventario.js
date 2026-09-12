document.addEventListener("DOMContentLoaded", () => {
    const inputBuscar = document.getElementById("inputBuscar");
    const botonesFiltro = document.querySelectorAll(".boton-filtro");
    const tarjetasProductos = document.querySelectorAll(".tarjeta-producto");
    const btnAgregarProducto = document.getElementById("btnAgregarProducto");

    // Lógica de Filtro por Categorías
    botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {
            // Actualizar clase activa del botón
            botonesFiltro.forEach((b) => b.classList.remove("activo"));
            boton.classList.add("activo");

            const categoriaSeleccionada = boton.getAttribute("data-categoria");

            // Filtrar tarjetas según dataset
            tarjetasProductos.forEach((tarjeta) => {
                const categoriaTarjeta = tarjeta.getAttribute("data-categoria");

                if (categoriaSeleccionada === "todos" || categoriaTarjeta === categoriaSeleccionada) {
                    tarjeta.style.display = "flex";
                } else {
                    tarjeta.style.display = "none";
                }
            });
        });
    });

    // Búsqueda en tiempo real (por texto)
    if (inputBuscar) {
        inputBuscar.addEventListener("input", (e) => {
            const busqueda = e.target.value.toLowerCase().trim();

            tarjetasProductos.forEach((tarjeta) => {
                const nombre = tarjeta.querySelector(".nombre-producto").textContent.toLowerCase();

                if (nombre.includes(busqueda)) {
                    tarjeta.style.display = "flex";
                } else {
                    tarjeta.style.display = "none";
                }
            });
        });
    }

    // Modal / Evento para agregar producto a BD
    if (btnAgregarProducto) {
        btnAgregarProducto.addEventListener("click", () => {
            console.log("Conectando con base de datos para registrar un nuevo producto en el inventario...");
            // Aquí puedes desplegar un modal o hacer un fetch() POST al backend.
        });
    }
});