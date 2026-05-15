document.addEventListener("DOMContentLoaded", () => {
    // Inicializar los iconos de Lucide
    lucide.createIcons();

    const editForm = document.getElementById("edit-product-form");
    const btnCancelar = document.getElementById("btn-cancelar");

    // Evento al enviar el formulario (Actualizar Producto)
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Recolección de los datos modificados
        const updatedData = {
            codigo: document.getElementById("codigo").value,
            codigoBarras: document.getElementById("codigo-barras").value,
            nombre: document.getElementById("nombre").value,
            categoria: document.getElementById("categoria").value,
            unidad: document.getElementById("unidad").value,
            precioVenta: document.getElementById("precio-venta").value,
            precioCompra: document.getElementById("precio-compra").value,
            stockActual: document.getElementById("stock-actual").value,
            stockMinimo: document.getElementById("stock-minimo").value,
            estado: document.querySelector('input[name="estado"]:checked').value
        };

        console.log("Datos actualizados listos para sincronizar:", updatedData);
        Swal.fire({
            text: `¡El producto "${updatedData.nombre}" (Código: ${updatedData.codigo}) se ha actualizado con éxito!`,
            icon: 'success',
            confirmButtonColor: '#437c43',
        });
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