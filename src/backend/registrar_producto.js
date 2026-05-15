document.addEventListener("DOMContentLoaded", () => {
    // Inicializar los iconos de Lucide
    lucide.createIcons();

    const productForm = document.getElementById("product-form");
    const btnCancelar = document.getElementById("btn-cancelar");

    // Evento al enviar el formulario (Guardar Producto)
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Captura de datos básica del formulario
        const formData = {
            codigo: document.getElementById("codigo").value,
            codigoBarras: document.getElementById("codigo-barras").value,
            nombre: document.getElementById("nombre").value,
            categoria: document.getElementById("categoria").value,
            unidad: document.getElementById("unidad").value,
            precioVenta: document.getElementById("precio-venta").value,
            precioCompra: document.getElementById("precio-compra").value,
            stockInicial: document.getElementById("stock-inicial").value,
            stockMinimo: document.getElementById("stock-minimo").value,
            estado: document.querySelector('input[name="estado"]:checked').value
        };

        console.log("Datos del producto listo para enviar:", formData);
        Swal.fire({
            text: `¡Producto "${formData.nombre || 'Sin nombre'}" guardado con éxito con estado: ${formData.estado}!`,
            icon: 'success',
            confirmButtonColor: '#437c43',
        })
        
        // Aquí podrás conectar más adelante tu lógica de backend/Supabase
    });

    // Acción del botón Cancelar
    btnCancelar.addEventListener("click", () => {
        Swal.fire({
            title: '¿Estás seguro de que deseas regresar?',
            text: '¡Se perderán los cambios!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#437c43',
            cancelButtonColor: '#6d6d6dff',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cerrar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "productos.html";
            }
        });
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