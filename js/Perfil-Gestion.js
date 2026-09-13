document.addEventListener('DOMContentLoaded', () => {
    // Interacción simple para el interruptor de Tema Oscuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const htmlTag = document.documentElement;
            const isDark = htmlTag.classList.toggle('dark');
            
            // Opcional: ajustar estilos visuales del switch si se desea persistencia
            const toggleDot = darkModeToggle.querySelector('.toggle-dot');
            if (isDark) {
                toggleDot.style.transform = 'translateX(20px)';
                darkModeToggle.querySelector('.toggle-switch').style.backgroundColor = 'var(--primary)';
            } else {
                toggleDot.style.transform = 'translateX(0px)';
                darkModeToggle.querySelector('.toggle-switch').style.backgroundColor = 'var(--outline-variant)';
            }
        });
    }
});