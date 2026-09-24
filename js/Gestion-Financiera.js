document.addEventListener('DOMContentLoaded', () => {
    // Manejo de interacción para el botón flotante (FAB)
    const fabButton = document.getElementById('fabBtn');
    if (fabButton) {
        fabButton.addEventListener('click', () => {
            console.log('Botón de registro rápido presionado');
            // Aquí puedes conectar esto con tu modal "modal-gasto" de Inicio-Rapido
            // Por ejemplo: abrirModal('modal-gasto');
            alert('Función para registrar nuevo ingreso o gasto próximamente.');
        });
    }

    // Interactividad simple para las transacciones recientes
    const transactionItems = document.querySelectorAll('.cursor-pointer');
    transactionItems.forEach((item, index) => {
        // Filtramos para asegurar que el clic es en un item de transacción
        if(item.querySelector('.material-symbols-outlined')){
             item.addEventListener('click', () => {
                console.log(`Clic en la transacción número ${index + 1}`);
            });
        }
    });
});