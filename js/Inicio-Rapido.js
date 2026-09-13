/**
 * Lógica de interacción para mi hogar inteligente
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("mi hogar inteligente cargado correctamente.");

    // Manejo de clics en la barra de navegación inferior móvil
    const mobileNavItems = document.querySelectorAll('.mobile-bottom-nav a');
    
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileNavItems.forEach(nav => nav.classList.remove('active', 'bg-primary-container', 'text-on-primary-container'));
            mobileNavItems.forEach(nav => nav.classList.add('text-on-surface-variant'));

            item.classList.add('active');
            item.classList.remove('text-on-surface-variant');
        });
    });

    // Simulación de interacción para los botones de acciones rápidas
    const actionButtons = document.querySelectorAll('.card-action-btn, .explore-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const actionName = e.target.innerText.trim();
            alert(`Acción seleccionada: "${actionName}" en mi hogar inteligente.`);
        });
    });

    // Botón de notificaciones
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            alert('No tienes notificaciones nuevas en este momento.');
        });
    }
});