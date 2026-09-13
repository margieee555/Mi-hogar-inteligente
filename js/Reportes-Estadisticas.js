document.addEventListener('DOMContentLoaded', () => {
    // Manejo de pestañas de periodo (Mensual, Trimestral, Anual)
    const periodTabs = document.querySelectorAll('.period-tab');
    periodTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            periodTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            const selectedPeriod = e.target.getAttribute('data-period');
            console.log(`Periodo seleccionado: ${selectedPeriod}`);
            // Aquí puedes conectar lógica adicional para actualizar los reportes según el periodo
        });
    });

    // Simulación de exportación a PDF
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', () => {
            alert('Generando reporte en PDF para Mi Hogar Inteligente...');
        });
    }

    // Interactividad en elementos de la barra inferior móvil
    const mobileNavItems = document.querySelectorAll('.mobile-bottom-nav .bottom-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Ejemplo de navegación fluida opcional
            mobileNavItems.forEach(nav => nav.classList.remove('active'));
            // Mantener activo visualmente si se desea
        });
    });
});