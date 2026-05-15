document.addEventListener("DOMContentLoaded", () => {
    // Inicializar iconos de Lucide
    lucide.createIcons();

    const tbody = document.getElementById("products-tbody");
    const btnAddItem = document.getElementById("btn-add-item");
    const grandTotalSpan = document.getElementById("grand-total");
    const form = document.getElementById("form-nueva-salida");

    // Función para formatear a moneda local (opcional/legibilidad)
    function formatMoney(amount) {
        return amount.toLocaleString('es-CO');
    }

    // Calcula los totales individuales de cada fila y el gran total general
    function calcularTotales() {
        let totalSalida = 0;
        const rows = tbody.querySelectorAll("tr");

        rows.forEach(row => {
            const select = row.querySelector(".select-product");
            const qtyInput = row.querySelector(".input-qty");
            const unitPriceSpan = row.querySelector(".unit-price");
            const rowTotalSpan = row.querySelector(".row-total");

            // Obtener el precio guardado en el atributo de la opción seleccionada
            const selectedOption = select.options[select.selectedIndex];
            const price = selectedOption && selectedOption.value ? parseFloat(selectedOption.getAttribute("data-price")) : 0;
            const qty = parseFloat(qtyInput.value) || 0;

            // Calcular subtotal de la fila
            const subtotal = price * qty;
            totalSalida += subtotal;

            // Renderizar valores en pantalla
            unitPriceSpan.textContent = formatMoney(price);
            rowTotalSpan.textContent = formatMoney(subtotal);
        });

        grandTotalSpan.textContent = formatMoney(totalSalida);
    }

    // Escuchar cambios dinámicos dentro de la tabla (Delegación de eventos)
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

    // Eliminar una fila específica
    tbody.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest(".btn-delete-row");
        if (!deleteBtn) return;

        const row = deleteBtn.closest("tr");
        // Asegurar que quede al menos una fila operativa
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

    // Agregar una nueva fila limpia al presionar el botón inferior
    btnAddItem.addEventListener("click", () => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>
                <div class="select-wrapper">
                    <select class="select-product">
                        <option value="" disabled selected>Selecciona producto</option>
                        <option value="P001" data-price="4200">Arroz Diana (1kg)</option>
                        <option value="P002" data-price="8900">Aceite Girasol (900ml)</option>
                        <option value="P003" data-price="3400">Leche Entera (1L)</option>
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
        // Volver a procesar iconos insertados dinámicamente por JS
        lucide.createIcons();
    });

    // Envío del formulario final
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        Swal.fire({
            text: `¡Salida de inventario guardada y procesada con éxito!`,
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