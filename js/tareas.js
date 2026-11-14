// ============================================================
// tareas.js
// Lógica del CRUD de tareas, render de la tabla y filtros.
// ============================================================

const formTarea = document.getElementById("form-tarea");
const tbodyTareas = document.getElementById("tbody-tareas");
const tituloForm = document.getElementById("form-titulo");

// Inputs del formulario
const inpTitulo = document.getElementById("titulo");
const inpCurso = document.getElementById("curso");
const inpFecha = document.getElementById("fecha");
const inpPrioridad = document.getElementById("prioridad");
const inpEstado = document.getElementById("estado");
const inpDescripcion = document.getElementById("descripcion");
const inpTareaId = document.getElementById("tarea-id");

// Filtros
const filtroCurso = document.getElementById("filtro-curso");
const filtroPrioridad = document.getElementById("filtro-prioridad");
const filtroEstado = document.getElementById("filtro-estado");
const filtroFecha = document.getElementById("filtro-fecha");

// Variables para confirmar eliminación
let idAEliminar = null;
const modalEliminarEl = document.getElementById("modalEliminar");
const modalEliminar = new bootstrap.Modal(modalEliminarEl);
const btnConfirmarEliminar = document.getElementById("btn-confirmar-eliminar");

// =====================================================
// RENDERIZAR TABLA
// =====================================================
function renderizarTareas() {
    const tareas = aplicarFiltros(obtenerTareas());
    tbodyTareas.innerHTML = "";

    if (tareas.length === 0) {
        tbodyTareas.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                    No hay tareas para mostrar.
                </td>
            </tr>`;
        return;
    }

    tareas.forEach(tarea => {
        const fila = document.createElement("tr");
        const clasesPrioridad = {
            "Alta": "badge-prioridad-alta",
            "Media": "badge-prioridad-media",
            "Baja": "badge-prioridad-baja"
        };

        const claseTitulo = tarea.estado === "completada" ? "tarea-completada" : "";

        fila.innerHTML = `
            <td class="${claseTitulo}">${tarea.titulo}</td>
            <td>${tarea.curso}</td>
            <td>${formatearFecha(tarea.fecha)}</td>
            <td><span class="badge ${clasesPrioridad[tarea.prioridad]}">${tarea.prioridad}</span></td>
            <td>
                <span class="badge ${tarea.estado === 'completada' ? 'bg-success' : 'bg-warning text-dark'}">
                    ${tarea.estado === 'completada' ? 'Completada' : 'Pendiente'}
                </span>
            </td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-success me-1" data-accion="toggle" data-id="${tarea.id}" title="Cambiar estado">
                    <i class="bi bi-arrow-repeat"></i>
                </button>
                <button class="btn btn-sm btn-outline-primary me-1" data-accion="editar" data-id="${tarea.id}" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" data-accion="eliminar" data-id="${tarea.id}" title="Eliminar">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbodyTareas.appendChild(fila);
    });
}

// =====================================================
// FORMATEAR FECHA (YYYY-MM-DD -> DD/MM/YYYY)
// =====================================================
function formatearFecha(fechaISO) {
    if (!fechaISO) return "-";
    const [anio, mes, dia] = fechaISO.split("-");
    return `${dia}/${mes}/${anio}`;
}

// =====================================================
// FILTROS
// =====================================================
function aplicarFiltros(tareas) {
    return tareas.filter(t => {
        const coincideCurso = !filtroCurso.value || t.curso === filtroCurso.value;
        const coincidePrioridad = !filtroPrioridad.value || t.prioridad === filtroPrioridad.value;
        const coincideEstado = !filtroEstado.value || t.estado === filtroEstado.value;
        const coincideFecha = !filtroFecha.value || t.fecha === filtroFecha.value;
        return coincideCurso && coincidePrioridad && coincideEstado && coincideFecha;
    });
}

// =====================================================
// GUARDAR (crear o actualizar)
// =====================================================
formTarea.addEventListener("submit", (e) => {
    e.preventDefault();

    const formularioValido = validarFormulario(formTarea);

    if (!formularioValido) {
        return;
    }

    const tarea = {
        id: inpTareaId.value || generarId(),
        titulo: inpTitulo.value.trim(),
        curso: inpCurso.value,
        fecha: inpFecha.value,
        prioridad: inpPrioridad.value,
        estado: inpEstado.value,
        descripcion: inpDescripcion.value.trim()
    };

    if (inpTareaId.value) {
        actualizarTareaStorage(tarea);
        mostrarAlerta("Tarea actualizada correctamente.", "success");
    } else {
        agregarTareaStorage(tarea);
        mostrarAlerta("Tarea registrada correctamente.", "success");
    }

    resetearFormulario();
    renderizarTareas();
});

// =====================================================
// RESETEAR FORMULARIO
// =====================================================
function resetearFormulario() {
    formTarea.reset();
    inpTareaId.value = "";
    tituloForm.textContent = "Registrar nueva tarea";
    limpiarValidaciones(formTarea);
}

document.getElementById("btn-limpiar").addEventListener("click", resetearFormulario);

// =====================================================
// ACCIONES DE LA TABLA (delegación de eventos)
// =====================================================
tbodyTareas.addEventListener("click", (e) => {
    const boton = e.target.closest("button[data-accion]");
    if (!boton) return;

    const accion = boton.dataset.accion;
    const id = boton.dataset.id;

    if (accion === "editar") cargarTareaEnFormulario(id);
    if (accion === "eliminar") abrirModalEliminar(id);
    if (accion === "toggle") cambiarEstado(id);
});

// =====================================================
// CARGAR TAREA EN EL FORMULARIO (modo edición)
// =====================================================
function cargarTareaEnFormulario(id) {
    const tarea = buscarTareaStorage(id);
    if (!tarea) return;

    inpTareaId.value = tarea.id;
    inpTitulo.value = tarea.titulo;
    inpCurso.value = tarea.curso;
    inpFecha.value = tarea.fecha;
    inpPrioridad.value = tarea.prioridad;
    inpEstado.value = tarea.estado;
    inpDescripcion.value = tarea.descripcion || "";

    tituloForm.textContent = "Editar tarea";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// =====================================================
// CAMBIAR ESTADO RÁPIDO
// =====================================================
function cambiarEstado(id) {
    const tarea = buscarTareaStorage(id);
    if (!tarea) return;
    tarea.estado = tarea.estado === "completada" ? "pendiente" : "completada";
    actualizarTareaStorage(tarea);
    renderizarTareas();
}

// =====================================================
// MODAL ELIMINAR
// =====================================================
function abrirModalEliminar(id) {
    idAEliminar = id;
    modalEliminar.show();
}

btnConfirmarEliminar.addEventListener("click", () => {
    if (!idAEliminar) return;
    eliminarTareaStorage(idAEliminar);
    idAEliminar = null;
    modalEliminar.hide();
    renderizarTareas();
    mostrarAlerta("Tarea eliminada.", "danger");
});

// =====================================================