document.addEventListener("DOMContentLoaded", () => {
    // Inicializar iconos de Lucide
    lucide.createIcons();

    const searchInput = document.getElementById("search-user");
    const filterRole = document.getElementById("filter-role");
    const tableBody = document.getElementById("table-body");
    const btnNuevoUsuario = document.getElementById("btn-nuevo-usuario");

    // Función unificada para filtrar los usuarios en tiempo real
    function filtrarUsuarios() {
        const textSearch = searchInput.value.toLowerCase();
        const selectedRole = filterRole.value;
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {
            const userName = row.cells[0].textContent.toLowerCase();
            const userEmail = row.cells[1].textContent.toLowerCase();
            const userRole = row.cells[3].querySelector(".role-badge").textContent;

            const matchText = userName.includes(textSearch) || userEmail.includes(textSearch);
            const matchRole = (selectedRole === "todos" || userRole === selectedRole);

            if (matchText && matchRole) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filtrarUsuarios);
    filterRole.addEventListener("change", filtrarUsuarios);

    // Interactividad en las acciones de la tabla (Habilitar / Deshabilitar)
    tableBody.addEventListener("click", (e) => {
        const button = e.target.closest(".btn-action");
        if (!button) return;

        const row = button.closest("tr");
        const userName = row.cells[0].textContent;
        const statusBadge = row.cells[4].querySelector(".status-badge");

        if (button.classList.contains("btn-disable")) {
            if (confirm(`¿Estás seguro de suspender el acceso de ${userName}?`)) {
                statusBadge.textContent = "Inactivo";
                statusBadge.className = "status-badge inactive";
                
                button.textContent = "Habilitar";
                button.className = "btn-action btn-enable";
            }
        } else if (button.classList.contains("btn-enable")) {
            statusBadge.textContent = "Activo";
            statusBadge.className = "status-badge active";

            button.textContent = "Deshabilitar";
            button.className = "btn-action btn-disable";
        }
    });

    btnNuevoUsuario.addEventListener("click", () => {
        alert("Abriendo formulario para registrar un nuevo Administrador o Empleado...");
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