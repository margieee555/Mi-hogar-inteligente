let baseDatosTareas = [
  {
    id: 1,
    titulo: "Limpiar cocina",
    estado: "pendiente",
    prioridad: "Alta",
    indicadorClase: "background-color: var(--error);",
    badgeClase: "background-color: rgba(186, 26, 26, 0.1); color: var(--error);",
    iconoPrioridad: "priority_high",
    fecha: "Hoy, 18:00",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkVQqlqCzxVAWGEWYq_zDM2i1eqj-Incr8AjJKY2JgswZgXLp1obObqyffk6g9byBvpT1tCRhl8yemZ0owpKE8BVE0i4v76VnA_FjIdvagvxrYhu-D7jz35l43TqPhacx_iPyV_OQmp60c9CN9H7rS76WBseL_6EfV-VxCcr27JqdmlM4Fp4ua3PRA4RbeYZD0zg_iZ-2wC67Vd67HeKmShWIYO67uxPN8W-2Vr0N3Gt3Ae3JxRwggkw"
  },
  {
    id: 2,
    titulo: "Sacar basura",
    estado: "pendiente",
    prioridad: "Media",
    indicadorClase: "background-color: var(--tertiary-fixed-dim);",
    badgeClase: "background-color: rgba(255, 185, 95, 0.2); color: var(--tertiary);",
    iconoPrioridad: "schedule",
    fecha: "Mañana, 08:00",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPJHSlPMSxvYZOd7pbFikpIN3j9Wph9trqIx16s_VhxKVGDVr6ZtRXhb1S24flFFJxlBLiYk-9txouXoWZkepnnDIbS2g_2WVIzXX688K2rlZLIE_z6ogiJJ6iBoPzYWpLOF3ATZnX8u0Z93gVmIF25KHZdg_rB9DoimVP6cO5__qrTUw5uduMLEg_xWp7EC1Ke1Dik4iQxr1_xhaZ3mAfDlbw5VNpQIEVSC2b9ezpkN4pX2GAq6kZww"
  },
  {
    id: 3,
    titulo: "Lavar ropa",
    estado: "proceso",
    prioridad: "Baja",
    indicadorClase: "background-color: var(--secondary-fixed-dim);",
    badgeClase: "background-color: rgba(74, 225, 118, 0.2); color: #005321;",
    iconoPrioridad: "low_priority",
    fecha: "Viernes, 10:00",
    avatar: null
  }
];

let filtroActual = "pendiente";

function filtrarTareas(estado) {
  filtroActual = estado;
  
  ['pendiente', 'proceso', 'completado'].forEach(f => {
    const btn = document.getElementById(`btn-${f}`);
    if (btn) {
      btn.className = f === estado ? "filter-btn active-filter" : "filter-btn";
    }
  });

  renderizarTareas();
}

function renderizarTareas() {
  const contenedor = document.getElementById("contenedor-tareas");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  const tareasFiltradas = baseDatosTareas.filter(t => t.estado === filtroActual);

  if (tareasFiltradas.length === 0) {
    contenedor.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-outlined" style="font-size: 36px; margin-bottom: 8px;">task_alt</span>
        <p style="font-size: 1rem; font-weight: 600; margin: 0;">No hay tareas en esta categoría</p>
      </div>
    `;
    return;
  }

  tareasFiltradas.forEach(tarea => {
    let avatarHTML = tarea.avatar 
      ? `<img style="width: 100%; height: 100%; object-fit: cover;" src="${tarea.avatar}">`
      : `<span class="material-symbols-outlined text-outline icono-relleno">person</span>`;

    let botonAccionHTML = "";
    if (tarea.estado === "pendiente") {
      botonAccionHTML = `
        <button onclick="cambiarEstado(${tarea.id}, 'proceso')" class="action-btn-primary">
          <span class="material-symbols-outlined" style="font-size: 18px;">play_arrow</span>
          Iniciar proceso
        </button>`;
    } else if (tarea.estado === "proceso") {
      botonAccionHTML = `
        <button onclick="cambiarEstado(${tarea.id}, 'completado')" class="action-btn-secondary">
          <span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span>
          Completar
        </button>`;
    } else {
      botonAccionHTML = `
        <div class="task-finished-text">
          <span class="material-symbols-outlined" style="font-size: 18px;">done_all</span>
          Tarea Finalizada
        </div>`;
    }

    const tarjetaHTML = `
      <div class="task-card">
        <div class="task-card-indicator" style="${tarea.indicadorClase}"></div>
        <div>
          <div class="task-card-header">
            <div class="priority-badge" style="${tarea.badgeClase}">
              <span class="material-symbols-outlined" style="font-size: 14px;">${tarea.iconoPrioridad}</span> ${tarea.prioridad}
            </div>
            <div class="task-avatar">
              ${avatarHTML}
            </div>
          </div>
          <h3 class="task-title">${tarea.titulo}</h3>
          <div class="task-date">
            <span class="material-symbols-outlined" style="font-size: 16px;">event</span>
            <span>${tarea.fecha}</span>
          </div>
        </div>
        <div>
          ${botonAccionHTML}
        </div>
      </div>
    `;

    contenedor.innerHTML += tarjetaHTML;
  });
}

function cambiarEstado(id, nuevoEstado) {
  const tarea = baseDatosTareas.find(t => t.id === id);
  if (tarea) {
    tarea.estado = nuevoEstado;
    if (nuevoEstado === 'completado') {
      tarea.indicadorClase = "background-color: var(--secondary);";
      tarea.badgeClase = "background-color: rgba(0, 110, 47, 0.1); color: var(--secondary);";
    } else if (nuevoEstado === 'proceso') {
      tarea.indicadorClase = "background-color: var(--primary);";
      tarea.badgeClase = "background-color: rgba(0, 74, 198, 0.1); color: var(--primary);";
    }
    renderizarTareas();
  }
}

document.addEventListener("DOMContentLoaded", renderizarTareas);