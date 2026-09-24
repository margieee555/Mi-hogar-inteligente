document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LÓGICA DEL TEMA OSCURO (Toggle)
    // ==========================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const htmlTag = document.documentElement;
            const isDark = htmlTag.classList.toggle('dark');
            
            const toggleTrack = darkModeToggle.querySelector('.toggle-track');
            const toggleDot = darkModeToggle.querySelector('.toggle-dot');
            
            if (isDark) {
                toggleDot.style.transform = 'translateX(24px)';
                toggleTrack.classList.remove('bg-gray-200');
                toggleTrack.classList.add('bg-blue-600');
            } else {
                toggleDot.style.transform = 'translateX(0px)';
                toggleTrack.classList.remove('bg-blue-600');
                toggleTrack.classList.add('bg-gray-200');
            }
        });
    }

    // ==========================================
    // 2. CONTROLADORES DE MODALES (Abre Detalle Miembro)
    // ==========================================
    const modalButtons = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('[data-close]');
    const modals = document.querySelectorAll('.modal-overlay');

    const abrirModal = (modalId) => {
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
        }
    };

    const cerrarModal = (modalId) => {
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    modalButtons.forEach(btn => btn.addEventListener('click', () => abrirModal(btn.getAttribute('data-modal'))));
    closeButtons.forEach(btn => btn.addEventListener('click', () => cerrarModal(btn.getAttribute('data-close'))));

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => modal.classList.add('hidden'));
            document.body.style.overflow = '';
        }
    });

    // ==========================================
    // 3. INTERACTIVIDAD TAREAS DEL MIEMBRO (Modal)
    // ==========================================
    const taskItems = document.querySelectorAll('.task-modal-item');
    
    taskItems.forEach(item => {
        item.addEventListener('click', () => {
            const checkbox = item.querySelector('.task-checkbox');
            const taskName = item.querySelector('.task-name');
            const isChecked = checkbox.textContent === 'check_circle';
            
            if (isChecked) {
                // Desmarcar
                checkbox.textContent = 'radio_button_unchecked';
                checkbox.classList.remove('text-blue-600');
                checkbox.classList.add('text-gray-400');
                
                taskName.classList.remove('line-through', 'text-gray-400');
                taskName.classList.add('text-gray-800');
                
                item.classList.remove('opacity-60', 'bg-gray-50');
            } else {
                // Marcar como completada
                checkbox.textContent = 'check_circle';
                checkbox.classList.remove('text-gray-400');
                checkbox.classList.add('text-blue-600');
                
                taskName.classList.remove('text-gray-800');
                taskName.classList.add('line-through', 'text-gray-400');
                
                item.classList.add('opacity-60', 'bg-gray-50');
            }
        });
    });

});