// ============================================================
// storage.js
// Módulo encargado del acceso a LocalStorage.
// Aquí centralizamos leer / guardar / generar IDs.
// ============================================================

const CLAVE_STORAGE = "tareas_academicas";

/**
 * Devuelve el array completo de tareas guardadas.
 * Si no existe, retorna un array vacío.
 */
function obtenerTareas() {
    const datos = localStorage.getItem(CLAVE_STORAGE);
    if (!datos) return [];
    try {
        return JSON.parse(datos);
    } catch (error) {
        console.error("Error al parsear LocalStorage:", error);
        return [];
    }
}

/**
 * Guarda el array completo de tareas en LocalStorage.
 * @param {Array} tareas
 */
function guardarTareas(tareas) {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(tareas));
}

/**
 * Genera un ID único basado en timestamp + aleatorio.
 */
function generarId() {
    return "T" + Date.now() + Math.floor(Math.random() * 1000);
}

/**
 * Agrega una nueva tarea al array y la guarda.
 */
function agregarTareaStorage(tarea) {
    const tareas = obtenerTareas();
    tareas.push(tarea);
    guardarTareas(tareas);
}

/**
 * Actualiza una tarea existente por ID.
 */
function actualizarTareaStorage(tareaActualizada) {
    const tareas = obtenerTareas().map(t =>
        t.id === tareaActualizada.id ? tareaActualizada : t
    );
    guardarTareas(tareas);
}

/**
 * Elimina una tarea por ID.
 */
function eliminarTareaStorage(id) {
    const tareas = obtenerTareas().filter(t => t.id !== id);
    guardarTareas(tareas);
}

/**
 * Busca una tarea por ID.
 */
function buscarTareaStorage(id) {
    return obtenerTareas().find(t => t.id === id) || null;
}