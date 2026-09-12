document.addEventListener('DOMContentLoaded', () => {
  // Configuración dinámica de Tailwind Theme
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
          borderRadius: {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "1rem",
            "2xl": "1.5rem",
            "full": "9999px"
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
          },
          fontFamily: {
            "headline-lg": ["Inter"],
            "body-lg": ["Inter"],
            "display-lg": ["Inter"],
            "label-caps": ["Inter"],
            "title-md": ["Inter"],
            "headline-lg-mobile": ["Inter"],
            "body-sm": ["Inter"]
          },
          fontSize: {
            "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
            "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
            "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
            "title-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
            "headline-lg-mobile": ["24px", { lineHeight: "32px", fontWeight: "600" }],
            "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }]
          }
        }
      }
    };
  }

  // Interacción del botón para mostrar/ocultar contraseña
  const togglePasswordBtn = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.getElementById('toggleIcon');

  if (togglePasswordBtn && passwordInput && toggleIcon) {
    togglePasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleIcon.textContent = isPassword ? 'visibility' : 'visibility_off';
    });
  }

  // Envío de formulario preparado para API / Backend (Base de Datos)
  const registerForm = document.getElementById('registerForm');
  const submitBtn = document.getElementById('submitBtn');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm_password').value;

      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      // Estructura de datos a enviar al backend
      const userData = {
        nombre: name,
        correo: email,
        password: password
      };

      try {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Registrando...';

        /* 
           CONEXIÓN A BASE DE DATOS / API
           Reemplaza 'https://tu-api.com/api/registro' por el endpoint real de tu backend (Node.js, PHP, Python, etc.)
        */
        /*
        const response = await fetch('https://tu-api.com/api/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
          alert('¡Cuenta creada exitosamente!');
          registerForm.reset();
        } else {
          alert('Error: ' + (result.mensaje || 'No se pudo completar el registro'));
        }
        */

        // Simulación temporal para pruebas
        console.log('Datos listos para enviar a la base de datos:', userData);
        setTimeout(() => {
          alert('Registro simulado con éxito.');
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Crear cuenta';
          registerForm.reset();
        }, 1000);

      } catch (error) {
        console.error('Error en el registro:', error);
        alert('Ocurrió un error al conectar con el servidor.');
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Crear cuenta';
      }
    });
  }
});