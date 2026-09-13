document.addEventListener('DOMContentLoaded', () => {
    // Manejador para el botón de retroceso (Volver)
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                alert('No hay página anterior disponible.');
            }
        });
    }

    // Interactividad simple para marcar tareas como completadas al hacer clic en ellas
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        item.addEventListener('click', () => {
            const checkbox = item.querySelector('.task-checkbox');
            const isChecked = checkbox.classList.contains('filled');
            
            if (isChecked) {
                checkbox.classList.remove('filled');
                checkbox.textContent = 'radio_button_unchecked';
                item.style.opacity = '1';
            } else {
                checkbox.classList.add('filled');
                checkbox.textContent = 'check_circle';
                item.style.opacity = '0.6';
            }
        });
    });
});