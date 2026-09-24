let baseDatosTareas = [
  {
    id: 1,
    titulo: "Limpiar cocina",
    estado: "pendiente",
    prioridad: "Alta",
    colorBorde: "border-red-500",
    badgeClase: "bg-red-50 text-red-600",
    iconoPrioridad: "priority_high",
    fecha: "Hoy, 18:00",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkVQqlqCzxVAWGEWYq_zDM2i1eqj-Incr8AjJKY2JgswZgXLp1obObqyffk6g9byBvpT1tCRhl8yemZ0owpKE8BVE0i4v76VnA_FjIdvagvxrYhu-D7jz35l43TqPhacx_iPyV_OQmp60c9CN9H7rS76WBseL_6EfV-VxCcr27JqdmlM4Fp4ua3PRA4RbeYZD0zg_iZ-2wC67Vd67HeKmShWIYO67uxPN8W-2Vr0N3Gt3Ae3JxRwggkw"
  },
  {
    id: 2,
    titulo: "Sacar basura",
    estado: "pendiente",
    prioridad: "Media",
    colorBorde: "border-orange-400",
    badgeClase: "bg-orange-50 text-orange-600",
    iconoPrioridad: "schedule",
    fecha: "Mañana, 08:00",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPJHSlPMSxvYZOd7pbFikpIN3j9Wph9trqIx16s_VhxKVGDVr6ZtRXhb1S24flFFJxlBLiYk-9txouXoWZkepnnDIbS2g_2WVIzXX688K2rlZLIE_z6ogiJJ6iBoPzYWpLOF3ATZnX8u0Z93gVmIF25KHZdg_rB9DoimVP6cO5__qrTUw5uduMLEg_xWp7EC1Ke1Dik4iQxr1_xhaZ3mAfDlbw5VNpQIEVSC2b9ezpkN4pX2GAq6kZww"
  },
  {
    id: 3,
    titulo: "Lavar ropa",
    estado: "proceso",
    prioridad: "Baja",
    colorBorde: "border-green-400",
    badgeClase: "bg-green-50 text-green-700",
    iconoPrioridad: "low_priority",
    fecha: "Viernes, 10:00",
    avatar: null
  }
];

let filtroActual = "pendiente";

function filtrarTareas(estado) {
  filtroActual = estado;
  
  // Lógica para cambiar estilos de los botones de filtro con Tailwind
  ['pendiente', 'proceso', 'completado'].forEach(f => {
    const btn = document.getElementById(`btn-${f}`);
    if (btn) {
      if (f === estado) {
          btn.className = "filter-btn activo whitespace-nowrap px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-colors bg-blue-600 text-white";
      } else {
          btn.className = "filter-btn whitespace-nowrap px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-colors bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200";
      }
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
      <div class="col-span-1 md:col-span-2 lg:col-span-3 py-16 text-center text-gray-400 flex flex-col items-center">
        <span class="material-symbols-outlined text-5xl mb-3">task_alt</span>
        <p class="text-lg font-semibold text-gray-500 m-0">No hay tareas en esta categoría</p>
      </div>
    `;
    return;
  }

  tareasFiltradas.forEach(tarea => {
    let avatarHTML = tarea.avatar 
      ? `<img class="w-full h-full object-cover" src="${tarea.avatar}" alt="Avatar">`
      : `<span class="material-symbols-outlined text-gray-400 text-xl">person</span>`;

    let botonAccionHTML = "";
    if (tarea.estado === "pendiente") {
      botonAccionHTML = `
        <button onclick="cambiarEstado(${tarea.id}, 'proceso')" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
          <span class="material-symbols-outlined text-[18px]">play_arrow</span> Iniciar proceso
        </button>`;
    } else if (tarea.estado === "proceso") {
      botonAccionHTML = `
        <button onclick="cambiarEstado(${tarea.id}, 'completado')" class="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
          <span class="material-symbols-outlined text-[18px]">check_circle</span> Completar
        </button>`;
    } else {
      botonAccionHTML = `
        <div class="w-full text-center py-3 text-xs font-bold uppercase tracking-wider text-green-600 flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-[18px]">done_all</span> Tarea Finalizada
        </div>`;
    }

    const tarjetaHTML = `
      <div class="bg-white border border-gray-100 border-t-4 ${tarea.colorBorde} rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start mb-4">
            <div class="${tarea.badgeClase} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">${tarea.iconoPrioridad}</span> ${tarea.prioridad}
            </div>
            <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm">
              ${avatarHTML}
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">${tarea.titulo}</h3>
          <div class="flex items-center gap-1.5 text-sm font-medium text-gray-500 mb-6">
            <span class="material-symbols-outlined text-[16px]">event</span>
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
      tarea.colorBorde = "border-green-600";
      tarea.badgeClase = "bg-green-50 text-green-600";
    } else if (nuevoEstado === 'proceso') {
      tarea.colorBorde = "border-blue-600";
      tarea.badgeClase = "bg-blue-50 text-blue-600";
    }
    renderizarTareas();
  }
}

// Cargar la vista por defecto
document.addEventListener("DOMContentLoaded", renderizarTareas);

// Exportar la función para que funcione el onclick del HTML
window.filtrarTareas = filtrarTareas;
window.cambiarEstado = cambiarEstado;