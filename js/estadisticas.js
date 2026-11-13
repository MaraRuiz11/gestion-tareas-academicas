// ============================================================
// estadisticas.js
// Genera estadísticas simples en HTML (sin librerías externas).
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    const tareas = obtenerTareas();

    if (tareas.length === 0) {
        document.getElementById("stats-curso").innerHTML    = "<p class='text-muted'>Sin datos.</p>";
        document.getElementById("stats-prioridad").innerHTML = "<p class='text-muted'>Sin datos.</p>";
        document.getElementById("detalle-progreso").textContent = "Sin tareas registradas.";
        return;
    }

    // ====== POR CURSO ======
    const porCurso = agrupar(tareas, "curso");
    document.getElementById("stats-curso").innerHTML = generarBarras(porCurso, "bg-primary", tareas.length);

    // ====== POR PRIORIDAD ======
    const porPrioridad = agrupar(tareas, "prioridad");
    document.getElementById("stats-prioridad").innerHTML = generarBarras(porPrioridad, "bg-warning", tareas.length);

    // ====== PROGRESO ======
    const completadas = tareas.filter(t => t.estado === "completada").length;
    const porcentaje  = Math.round((completadas / tareas.length) * 100);
    const barra       = document.getElementById("barra-progreso");

    barra.style.width = porcentaje + "%";
    barra.textContent = porcentaje + "%";
    document.getElementById("texto-progreso").textContent = porcentaje + "%";
    document.getElementById("detalle-progreso").textContent =
        `${completadas} de ${tareas.length} tareas completadas.`;
});

function agrupar(array, clave) {
    return array.reduce((acc, item) => {
        acc[item[clave]] = (acc[item[clave]] || 0) + 1;
        return acc;
    }, {});
}

function generarBarras(datos, colorClase, total) {
    return Object.entries(datos)
        .map(([clave, cantidad]) => {
            const porcentaje = Math.round((cantidad / total) * 100);
            return `
                <div class="mb-2">
                    <div class="d-flex justify-content-between mb-1">
                        <span>${clave}</span>
                        <span class="fw-bold">${cantidad}</span>
                    </div>
                    <div class="progress" style="height: 14px;">
                        <div class="progress-bar ${colorClase}" style="width: ${porcentaje}%"></div>
                    </div>
                </div>
            `;
        })
        .join("");
}