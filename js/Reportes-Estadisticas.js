document.addEventListener('DOMContentLoaded', () => {
    
    // Manejo de pestañas de periodo (Mensual, Trimestral, Anual)
    const periodTabs = document.querySelectorAll('.period-tab');
    
    periodTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Remover estilos activos de todas las pestañas
            periodTabs.forEach(t => {
                t.classList.remove('active', 'bg-white', 'text-gray-900', 'shadow-sm');
                t.classList.add('text-gray-500');
            });
            
            // Agregar estilos activos a la pestaña seleccionada
            e.target.classList.add('active', 'bg-white', 'text-gray-900', 'shadow-sm');
            e.target.classList.remove('text-gray-500');
            
            // Registrar periodo seleccionado
            const selectedPeriod = e.target.getAttribute('data-period');
            console.log(`Periodo seleccionado en Mi Hogar 360: ${selectedPeriod}`);
        });
    });

    // Simulación de exportación a PDF
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', () => {
            alert('Generando reporte en PDF para Mi Hogar 360...');
        });
    }

});