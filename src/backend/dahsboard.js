document.addEventListener("DOMContentLoaded", () => {
    // Inicializa los iconos de Lucide
    lucide.createIcons();

    // Interactividad para el menú de navegación (Sidebar)
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            // Si es un dropdown de inventario, evitamos cambiar la clase activa global de inmediato
            if (item.classList.contains('dropdown')) {
                alert("Abrir menú desplegable de Inventario");
                return;
            }

            // Quitar clase activa al elemento anterior
            document.querySelector(".nav-item.active")?.classList.remove("active");
            
            // Añadir clase activa al elemento clicado
            item.classList.add("active");
        });
    });

    // Acción del botón Cerrar Sesión
    const logoutBtn = document.querySelector(".logout-btn");
    logoutBtn.addEventListener("click", () => {
        alert("Cerrando sesión de Administrador...");
    });

    // Enlaces de "Ver todos"
    const viewAllLinks = document.querySelectorAll(".view-all");
    viewAllLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Redireccionando a la sección completa...");
        });
    });
});