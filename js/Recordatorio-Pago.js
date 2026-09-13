// Configuración completa de Tailwind mapeada mediante JavaScript (Reemplaza al @theme)
if (window.tailwind) {
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "on-tertiary-fixed-variant": "#653e00",
          "on-primary-container": "#eeefff",
          "primary-fixed-dim": "#b4c5ff",
          "surface-container-lowest": "#ffffff",
          "on-secondary": "#ffffff",
          "on-tertiary-fixed": "#2a1700",
          "on-background": "#0b1c30",
          "error": "#ba1a1a",
          "on-surface-variant": "#434655",
          "surface-container-highest": "#d3e4fe",
          "secondary": "#006e2f",
          "background": "#f8f9ff",
          "on-secondary-fixed-variant": "#005321",
          "primary": "#004ac6",
          "on-primary": "#ffffff",
          "inverse-surface": "#213145",
          "outline": "#737686",
          "surface-bright": "#f8f9ff",
          "tertiary": "#784b00",
          "tertiary-container": "#996100",
          "on-primary-fixed": "#00174b",
          "surface-container-high": "#dce9ff",
          "on-tertiary": "#ffffff",
          "surface-tint": "#0053db",
          "tertiary-fixed-dim": "#ffb95f",
          "error-container": "#ffdad6",
          "secondary-fixed": "#6bff8f",
          "secondary-container": "#6bff8f",
          "on-tertiary-container": "#ffeedd",
          "tertiary-fixed": "#ffddb8",
          "outline-variant": "#c3c6d7",
          "on-error-container": "#93000a",
          "inverse-primary": "#b4c5ff",
          "surface-container": "#e5eeff",
          "surface-dim": "#cbdbf5",
          "on-secondary-container": "#007432",
          "on-surface": "#0b1c30",
          "surface-variant": "#d3e4fe",
          "secondary-fixed-dim": "#4ae176",
          "surface-container-low": "#eff4ff",
          "surface": "#f8f9ff",
          "on-primary-fixed-variant": "#003ea8",
          "primary-container": "#2563eb",
          "on-secondary-fixed": "#002109",
          "on-error": "#ffffff",
          "inverse-on-surface": "#eaf1ff",
          "primary-fixed": "#dbe1ff"
        },
        spacing: {
          "xl": "48px",
          "container-max": "1280px",
          "base": "4px",
          "gutter": "24px",
          "xs": "8px",
          "lg": "32px",
          "sm": "16px",
          "md": "24px"
        }
      }
    }
  };
}

// Datos simulados listos para conectar con la base de datos
const serviciosPagos = [
  {
    id: 1,
    nombre: "Agua",
    icono: "water_drop",
    monto: 45.50,
    fechaVencimiento: "15 Oct",
    estado: "pendiente",
    claseColorIcono: "bg-error-container text-on-error-container",
    bordeColor: "border-error"
  },
  {
    id: 2,
    nombre: "Luz",
    icono: "bolt",
    monto: 82.30,
    fechaVencimiento: "18 Oct",
    estado: "pendiente",
    claseColorIcono: "bg-tertiary-container/20 text-tertiary-container",
    bordeColor: "border-tertiary-fixed-dim"
  },
  {
    id: 3,
    nombre: "Internet",
    icono: "wifi",
    monto: 59.99,
    fechaPago: "01 Oct",
    estado: "pagado",
    claseColorIcono: "bg-secondary-container/20 text-secondary",
    bordeColor: "border-secondary"
  },
  {
    id: 4,
    nombre: "Arriendo",
    icono: "home_work",
    monto: 1200.00,
    fechaPago: "05 Oct",
    estado: "pagado",
    claseColorIcono: "bg-secondary-container/20 text-secondary",
    bordeColor: "border-secondary"
  }
];

// Función para renderizar dinámicamente las tarjetas de servicios
function renderizarPagos() {
  const contenedor = document.getElementById("contenedor-pagos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  serviciosPagos.forEach(servicio => {
    const esPendiente = servicio.estado === "pendiente";

    const tarjetaHTML = `
      <div class="bg-surface-container-lowest rounded-[24px] p-[24px] shadow-sm hover:shadow-md transition-shadow border-t-4 ${servicio.bordeColor} relative overflow-hidden ${esPendiente ? '' : 'opacity-80'}">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full ${servicio.claseColorIcono} flex items-center justify-center">
              <span class="material-symbols-outlined">${servicio.icono}</span>
            </div>
            <h3 class="font-title-md text-title-md text-on-surface">${servicio.nombre}</h3>
          </div>
          <span class="${esPendiente ? 'bg-error/10 text-error' : 'bg-secondary/10 text-secondary'} px-3 py-1 rounded-full font-label-caps text-label-caps">
            ${esPendiente ? 'Pendiente' : 'Pagado'}
          </span>
        </div>

        <div class="mb-6">
          <p class="font-body-sm text-body-sm text-on-surface-variant mb-1">Monto estimado</p>
          <p class="font-headline-lg text-headline-lg text-on-background ${esPendiente ? '' : 'line-through text-outline'}">
            $${servicio.monto.toFixed(2)}
          </p>
        </div>

        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-2 ${esPendiente ? 'text-on-surface-variant' : 'text-secondary'}">
            <span class="material-symbols-outlined text-[18px]">
              ${esPendiente ? 'event' : 'check_circle'}
            </span>
            <span class="font-body-sm text-body-sm">
              ${esPendiente ? `Vence: ${servicio.fechaVencimiento}` : `Pagado el ${servicio.fechaPago}`}
            </span>
          </div>
        </div>

        <button 
          onclick="procesarPago(${servicio.id})"
          class="w-full font-body-lg text-body-lg font-semibold py-3 rounded-[16px] transition-colors ${
            esPendiente 
              ? 'bg-primary-container text-on-primary-container hover:bg-on-primary-fixed-variant active:scale-[0.98]' 
              : 'bg-transparent border border-outline-variant text-outline cursor-not-allowed'
          }" 
          ${esPendiente ? '' : 'disabled'}>
          ${esPendiente ? 'Pagar ahora' : 'Pagado'}
        </button>
      </div>
    `;

    contenedor.innerHTML += tarjetaHTML;
  });
}

// Función interactiva para marcar pagos (preparada para backend/BD)
function procesarPago(idServicio) {
  const servicio = serviciosPagos.find(s => s.id === idServicio);
  if (servicio && servicio.estado === "pendiente") {
    servicio.estado = "pagado";
    servicio.fechaPago = "Hoy";
    servicio.bordeColor = "border-secondary";
    servicio.claseColorIcono = "bg-secondary-container/20 text-secondary";
    renderizarPagos();
  }
}

// Cargar datos en pantalla al iniciar el documento
document.addEventListener("DOMContentLoaded", renderizarPagos);