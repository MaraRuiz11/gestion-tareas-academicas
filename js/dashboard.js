// ============================================================
// dashboard.js
// Calcula los contadores y muestra las próximas entregas.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    const tareas = obtenerTareas();

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const total        = tareas.length;
    const completadas  = tareas.filter(t => t.estado === "completada").length;
    const pendientes   = tareas.filter(t => t.estado === "pendiente").length;
    const vencidas     = tareas.filter(t => {
        if (t.estado === "completada") return false;
        const fecha = new Date(t.fecha + "T00:00:00");
        return fecha < hoy;
    }).length;

    document.getElementById("stat-total").textContent       = total;
    document.getElementById("stat-completadas").textContent = completadas;
    document.getElementById("stat-pendientes").textContent  = pendientes;
    document.getElementById("stat-vencidas").textContent    = vencidas;

    // Próximas entregas (pendientes, ordenadas por fecha)
    const proximas = tareas
        .filter(t => t.estado === "pendiente")
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(0, 5);

    const contenedor = document.getElementById("lista-proximas");

    if (proximas.length === 0) {
        contenedor.innerHTML = `<p class="text-muted mb-0">No tienes entregas pendientes. ¡Buen trabajo! 🎉</p>`;
        return;
    }

    contenedor.innerHTML = `
        <ul class="list-group list-group-flush">
            ${proximas.map(t => `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${t.titulo}</strong>
                        <span class="text-muted small"> — ${t.curso}</span>
                    </div>
                    <span class="badge bg-primary">${formatearFechaDash(t.fecha)}</span>
                </li>
            `).join("")}
        </ul>
    `;
});

function formatearFechaDash(fechaISO) {
    const [a, m, d] = fechaISO.split("-");
    return `${d}/${m}/${a}`;
}