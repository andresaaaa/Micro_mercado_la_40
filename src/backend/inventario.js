document.addEventListener("DOMContentLoaded", () => {
    // Inicializar los iconos de Lucide
    lucide.createIcons();

    const searchInput = document.getElementById("search-inventario");
    const filterStock = document.getElementById("filter-stock");
    const btnExportar = document.getElementById("btn-exportar");

    // Función unificada para filtrar la tabla
    function filtrarTabla() {
        const textSearch = searchInput.value.toLowerCase();
        const stockCriteria = filterStock.value;
        const rows = document.querySelectorAll("#table-body tr");

        rows.forEach(row => {
            const productName = row.cells[1].textContent.toLowerCase();
            const productCode = row.cells[0].textContent.toLowerCase();
            const alertBadge = row.cells[6].querySelector(".alert-badge");
            
            // Determinar tipo de alerta
            let matchStock = false;
            if (stockCriteria === "todos") {
                matchStock = true;
            } else if (stockCriteria === "bajo" && (alertBadge.classList.contains("status-low") || alertBadge.classList.contains("status-critical"))) {
                matchStock = true;
            } else if (stockCriteria === "ok" && alertBadge.classList.contains("status-ok")) {
                matchStock = true;
            }

            const matchText = productName.includes(textSearch) || productCode.includes(textSearch);

            // Mostrar u ocultar la fila según ambas condiciones
            if (matchText && matchStock) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    // Escuchadores de eventos para los filtros
    searchInput.addEventListener("input", filtrarTabla);
    filterStock.addEventListener("change", filtrarTabla);

    // Simulación de exportación de reporte
    btnExportar.addEventListener("click", () => {
        alert("Generando y descargando el reporte de inventarios en formato Excel/PDF...");
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