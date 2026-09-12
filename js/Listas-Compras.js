document.addEventListener("DOMContentLoaded", () => {
    // Referencias DOM
    const inputRapido = document.getElementById("inputRapido");
    const btnAgregarRapido = document.getElementById("btnAgregarRapido");
    const contenedorListas = document.querySelector(".area-listas");

    // Evento de agregado rápido
    if (btnAgregarRapido && inputRapido) {
        btnAgregarRapido.addEventListener("click", () => {
            const texto = inputRapido.value.trim();
            if (texto !== "") {
                console.log("Conectando a BD para agregar producto:", texto);
                inputRapido.value = "";
            }
        });

        inputRapido.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                btnAgregarRapido.click();
            }
        });
    }

    // Listener delegado para los checkboxes (Tachar items / Actualizar en BD)
    if (contenedorListas) {
        contenedorListas.addEventListener("change", (e) => {
            if (e.target.classList.contains("checkbox-producto")) {
                const item = e.target.closest(".item-producto");
                const textoNombre = item.querySelector(".nombre-producto");
                
                if (e.target.checked) {
                    item.classList.add("comprado");
                    textoNombre.classList.add("tachado");
                    console.log("Producto marcado como comprado en BD");
                } else {
                    item.classList.remove("comprado");
                    textoNombre.classList.remove("tachado");
                    console.log("Producto desmarcado en BD");
                }
            }
        });

        // Listener para eliminar elementos
        contenedorListas.addEventListener("click", (e) => {
            const btnEliminar = e.target.closest(".btn-eliminar");
            if (btnEliminar) {
                const item = btnEliminar.closest(".item-producto");
                console.log("Eliminando registro de la BD...");
                item.remove();
            }
        });
    }
});