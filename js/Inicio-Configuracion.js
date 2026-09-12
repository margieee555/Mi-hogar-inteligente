document.addEventListener("DOMContentLoaded", () => {
    const btnComenzar = document.getElementById("btnComenzar");
    const btnOmitir = document.getElementById("btnOmitir");

    if (btnComenzar) {
        btnComenzar.addEventListener("click", () => {
            console.log("Iniciando flujo de configuración de Hogar Inteligente...");
        });
    }

    if (btnOmitir) {
        btnOmitir.addEventListener("click", () => {
            console.log("Configuración omitida por el usuario.");
        });
    }
});