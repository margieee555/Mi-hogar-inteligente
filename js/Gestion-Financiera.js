document.addEventListener('DOMContentLoaded', () => {
    // Manejo de interacción para el botón flotante (FAB)
    const fabButton = document.getElementById('fabBtn');
    if (fabButton) {
        fabButton.addEventListener('click', () => {
            console.log('Botón de registro rápido presionado');
            // Aquí puedes agregar la lógica para abrir un modal de registro de transacciones
            alert('Función para registrar nuevo ingreso o gasto próximamente.');
        });
    }

    // Interactividad simple para las transacciones recientes
    const transactionItems = document.querySelectorAll('.transaction-item');
    transactionItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(`Clic en la transacción número ${index + 1}`);
        });
    });

    // Interactividad para los botones de navegación inferior
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(nav => {
        nav.addEventListener('click', (e) => {
            // Ejemplo básico para cambiar la clase activa si se desea manejar por JS
            navItems.forEach(n => n.classList.remove('active'));
            // Nota: Se deja preventDefault opcional si deseas que recarguen o naveguen.
        });
    });
});