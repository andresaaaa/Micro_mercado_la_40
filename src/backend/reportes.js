document.addEventListener("DOMContentLoaded", () => {
    // Inicializar iconos de Lucide
    lucide.createIcons();

    const btnGenerar = document.getElementById("btn-generar");
    const btnExportarPdf = document.getElementById("btn-exportar-pdf");
    const fechaInicioInput = document.getElementById("fecha-inicio");
    const fechaFinInput = document.getElementById("fecha-fin");

    // Acción para refrescar/actualizar los datos del reporte
    btnGenerar.addEventListener("click", () => {
        const desde = fechaInicioInput.value;
        const hasta = fechaFinInput.value;

        if (!desde || !hasta) {
            alert("Por favor, selecciona un rango de fechas válido.");
            return;
        }

        console.log(`Buscando transacciones en Supabase desde ${desde} hasta ${hasta}...`);
        Swal.fire({
            text: `Métricas actualizadas para el periodo: ${desde} al ${hasta}`,
            icon: 'success',
            confirmButtonColor: '#437c43',
        })
    });

    // Acción para simular la descarga del archivo comprimido o impreso
    btnExportarPdf.addEventListener("click", () => {
        Swal.fire({
            text: `Generando informe analítico estructurado... La descarga del PDF iniciará automáticamente.`,
            icon: 'success',
            confirmButtonColor: '#437c43',
        })
    });

    // Acción del botón Cerrar Sesión
    const logoutBtn = document.querySelector(".logout-btn");
    logoutBtn.addEventListener("click", () => {
        Swal.fire({
            title: '¿Estás seguro de que deseas cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#437c43',
            cancelButtonColor: '#6d6d6dff',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "../../../index.html";
            }
        });    
    });
});