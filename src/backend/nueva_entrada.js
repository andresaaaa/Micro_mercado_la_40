import { supabaseClient } from './conexion.js';

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar iconos de Lucide
    lucide.createIcons();

    const tbody = document.getElementById("products-tbody");
    const btnAddItem = document.getElementById("btn-add-item");
    const grandTotalSpan = document.getElementById("grand-total");
    const form = document.getElementById("form-nueva-entrada");

    function formatMoney(amount) {
        return amount.toLocaleString('es-CO');
    }

    // Calcula los subtotales por fila (Cantidad x Precio Compra) y el Gran Total
    function calcularTotales() {
        let totalEntrada = 0;
        const rows = tbody.querySelectorAll("tr");

        rows.forEach(row => {
            const idProducto = row.querySelector(".input-id");
            const select = row.querySelector(".select-product");
            const qtyInput = row.querySelector(".input-qty");
            const unitPriceSpan = row.querySelector(".unit-price");
            const rowTotalSpan = row.querySelector(".row-total");
            const numEntradaInput = document.getElementById("num-entrada");

            const selectedOption = select.options[select.selectedIndex];
            const price = selectedOption && selectedOption.value ? parseFloat(selectedOption.getAttribute("data-price")) : 0;
            const qty = parseFloat(qtyInput.value) || 0;

            const subtotal = price * qty;
            totalEntrada += subtotal;

            unitPriceSpan.textContent = formatMoney(price);
            rowTotalSpan.textContent = formatMoney(subtotal);
        });

        grandTotalSpan.textContent = formatMoney(totalEntrada);
        
    }

    // Escuchar cambios reactivos en los selectores de producto o inputs de cantidad
    tbody.addEventListener("change", (e) => {
        if (e.target.classList.contains("select-product") || e.target.classList.contains("input-qty")) {
            calcularTotales();
        }
    });

    tbody.addEventListener("input", (e) => {
        if (e.target.classList.contains("input-qty")) {
            calcularTotales();
        }
    });

    // Eliminar una fila asegurando dejar al menos una activa
    tbody.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest(".btn-delete-row");
        if (!deleteBtn) return;

        const row = deleteBtn.closest("tr");
        if (tbody.querySelectorAll("tr").length > 1) {
            row.remove();
            calcularTotales();
        } else {
            Swal.fire({
                title: 'La transacción debe contener al menos un producto.',
                text: 'Acción no realizada',
                icon: 'warning',
            });
        }
    });

    // Añadir una nueva fila dinámica con la estructura limpia
    btnAddItem.addEventListener("click", () => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>
                <input type="text" class="input-id" >
            </td>
            <td> 
            <div class="select-wrapper">
                <select class="select-product">
                    <option value="" disabled selected>Selecciona producto</option>
                    <option value="P001" data-price="3500">Arroz Diana (1kg)</option>
                    <option value="P002" data-price="7200">Aceite Girasol (900ml)</option>
                    <option value="P003" data-price="2800">Leche Entera (1L)</option>
                    </select>
                </div>
            </td>
            <td>
                <input type="number" class="input-qty" value="0" min="0">
            </td>
            <td>
                <div class="currency-display">$ <span class="unit-price">0</span></div>
            </td>
            <td>
                <div class="currency-total bold">$ <span class="row-total">0</span></div>
            </td>
            <td class="text-center">
                <button type="button" class="btn-delete-row" title="Eliminar fila">
                    <i data-lucide="trash-2"></i>
                </button>
            </td>
        `;
        tbody.appendChild(newRow);
        lucide.createIcons(); // Volver a procesar iconos insertados
    });

    // Envío e integración del Formulario
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const proveedorSelect = document.getElementById("proveedor");
        if(!proveedorSelect.value) {
            Swal.fire({
                title: 'Por favor, selecciona un proveedor antes de guardar',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#437c43',
                confirmButtonText: 'Continuar'
            });
            return;
        }

        // 1. Recolectar los productos de la tabla
        const rows = tbody.querySelectorAll("tr");
        const entradas_cabecera = [];
        const fechaActual = new Date().toISOString();

        rows.forEach(row => {
            const idInput = row.querySelector(".input-id");
            const select = row.querySelector(".select-product");
            const qtyInput = row.querySelector(".input-qty");
            const numEntradaInput = document.getElementById("num-entrada");
            const numEntrada = numEntradaInput.value;

            // Manejo de filas dinámicas que pueden no tener el input-id
            const idProducto = (idInput && idInput.value) ? idInput.value : (select ? select.value : "");
            
            const selectedOption = select && select.options[select.selectedIndex];
            // Ignorar la opción deshabilitada ("Selecciona producto")
            if (selectedOption && selectedOption.value) {
                const nombre = selectedOption.text;
                const precio = parseFloat(selectedOption.getAttribute("data-price")) || 0;
                const stock = qtyInput ? (parseFloat(qtyInput.value) || 0) : 0;

                if (idProducto && stock > 0) {
                    entradas_cabecera.push({
                        id_producto: idProducto,
                        numero_entrada: numEntrada,
                        nombre: nombre,
                        categoria: categoria,
                        stock: stock,
                        precio_venta: precio,
                        created_at: fechaActual,
                        proveedor: proveedorSelect.value
                    });
                }
            }
        });

        if (entradas_cabecera.length === 0) {
            Swal.fire({
                title: 'La entrada debe contener al menos un producto válido y con cantidad mayor a 0',
                icon: 'warning',
                confirmButtonColor: '#437c43'
            });
            return;
        }

        Swal.fire({
            title: '¿Estás seguro de que deseas guardar esta entrada?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#437c43',
            cancelButtonColor: '#6d6d6dff',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // 2. Insertar los productos en Supabase (Si la tabla se llama 'productos')
                    // Nota: Si los productos ya existen, puede que quieras usar .upsert() en vez de .insert()
                    const { data, error } = await supabaseClient
                        .from('entradas')
                        .insert(entradas_cabecera);

                    if (error) throw error;

                    Swal.fire({
                        text: `¡Entrada de inventario guardada y stock abastecido con éxito!`,
                        icon: 'success',
                        confirmButtonColor: '#437c43',
                    }).then(() => {
                        // Limpiar formulario y reiniciar la vista si es necesario
                        form.reset();
                        // Opcional: tbody.innerHTML = ''; para vaciar la tabla de productos
                        calcularTotales();
                    });
                } catch (err) {
                    console.error("Error al insertar en Supabase:", err);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al guardar los productos: ' + err.message,
                        icon: 'error',
                        confirmButtonColor: '#437c43'
                    });
                }
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