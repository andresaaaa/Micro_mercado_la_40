document.addEventListener("DOMContentLoaded", () => {
    // Inicializar los iconos de Lucide
    lucide.createIcons();

    // Redirección o simulación al hacer clic en "+ Nuevo Producto"
    const btnNuevoProducto = document.getElementById("btn-nuevo-producto");
    btnNuevoProducto.addEventListener("click", () => {
        window.location.href="../../frontned/pages/registrar_productos.html"
        // Aquí podrías usar: window.location.href = "productos.html";
    });

    // Lógica interactiva básica para el Buscador en tiempo real
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll("#table-body tr");

        tableRows.forEach(row => {
            // Evaluamos la columna del Nombre del Producto (segunda celda indices=1)
            const productName = row.cells[1].textContent.toLowerCase();
            
            if (productName.includes(searchTerm)) {
                row.style.display = ""; // Muestra la fila
            } else {
                row.style.display = "none"; // Oculta la fila
            }
        });
    });

    // Delegación de eventos para los botones de Editar y Desactivar en la tabla
    const tableBody = document.getElementById("table-body");
    tableBody.addEventListener("click", (e) => {
        const button = e.target.closest(".action-btn");
        if (!button) return;

        const row = button.closest("tr");
        const codigoProducto = row.cells[0].textContent;
        const nombreProducto = row.cells[1].textContent;

        if (button.classList.contains("edit")) {
            window.location.href="../../frontned/pages/editar_productos.html";
        } else if (button.classList.contains("disable")) {
            window.location.href="../../frontned/pages/estado_prodcutos.html";
        }
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