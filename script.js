// 🌙 Modo oscuro (Versión con interruptor)
const themeSwitch = document.getElementById("theme-switch"); // Referenciamos el checkbox

const aplicarModoOscuro = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    if(themeSwitch) { // Comprueba si el interruptor existe antes de cambiarlo
        themeSwitch.checked = true; // Asegura que el interruptor esté en 'checked'
    }
  } else {
    document.body.classList.remove("dark-mode");
    if(themeSwitch) {
        themeSwitch.checked = false; // Asegura que el interruptor esté en 'unchecked'
    }
  }
};

// Evento para el checkbox
if(themeSwitch) {
    themeSwitch.addEventListener("change", () => {
      if (themeSwitch.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
      }
    });
}

// Aplicar el modo oscuro guardado al cargar la página
document.addEventListener("DOMContentLoaded", aplicarModoOscuro);


// --- NO TOCAR EL CÓDIGO ANTIGUO DEL MODO OSCURO (YA ESTÁ ELIMINADO DE AQUÍ) ---


// 🎯 Referencias de modales
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const forgotModal = document.getElementById("forgotModal");
const welcomeModal = document.getElementById("welcomeModal");

// Botones abrir y cerrar
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.onclick = () => loginModal.classList.remove("hidden");
}

document.querySelectorAll(".close").forEach(btn =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
  })
);

// Navegación entre modales
const registerLink = document.getElementById("registerLink");
if (registerLink) {
    registerLink.onclick = (e) => {
      e.preventDefault();
      loginModal.classList.add("hidden");
      registerModal.classList.remove("hidden");
    };
}

const forgotLink = document.getElementById("forgotLink");
if (forgotLink) {
    forgotLink.onclick = (e) => {
      e.preventDefault();
      loginModal.classList.add("hidden");
      forgotModal.classList.remove("hidden");
    };
}

// 🧾 Registro
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("newUser").value;
      const p = document.getElementById("newPass").value;
      localStorage.setItem(u, p);
      document.getElementById("registerMsg").innerText = "✅ Usuario registrado con éxito";
      e.target.reset(); 
    });
}

// 🔑 Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("username").value;
      const p = document.getElementById("password").value;
      const saved = localStorage.getItem(u);

      if (saved && saved === p) {
        loginModal.classList.add("hidden");
        welcomeModal.classList.remove("hidden");
        document.getElementById("welcomeUser").innerText = `Hola, ${u}`;
        e.target.reset();
        document.getElementById("loginMsg").innerText = "";
      } else {
        document.getElementById("loginMsg").innerText = "❌ Usuario o contraseña incorrectos";
      }
    });
}

// 🔄 Recuperar contraseña
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("recoverUser").value;
      const saved = localStorage.getItem(u);
      document.getElementById("forgotMsg").innerText = saved
        ? `Tu contraseña es: ${saved}`
        : "❌ Usuario no encontrado";
      e.target.reset();
    });
}

// 🚪 Cerrar sesión
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.onclick = () => {
      welcomeModal.classList.add("hidden");
    };
}

// 🎯 Observador de Secciones para el menú activo
const secciones = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

if (secciones.length > 0 && navLinks.length > 0) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) { 
          navLinks.forEach(link => link.classList.remove("active"));
          
          const id = entrada.target.id;
          const linkActivo = document.querySelector(`nav a[href="#${id}"]`);
          if(linkActivo) {
            linkActivo.classList.add("active");
          }
        }
      });
    }, { threshold: 0.5 });

    secciones.forEach(seccion => observador.observe(seccion));
}

// 🕹️ Lógica del botón "Volver Arriba"
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    window.onscroll = () => {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        scrollTopBtn.classList.remove("hidden");
      } else {
        scrollTopBtn.classList.add("hidden");
      }
    };
}

// 🌟 Observador de Animaciones al hacer Scroll
const elementosParaAnimar = document.querySelectorAll('.animate-on-scroll');

if (elementosParaAnimar.length > 0) {
    const observadorAnimacion = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('is-visible');
                // Opcional: deja de observar el elemento una vez animado
                observadorAnimacion.unobserve(entrada.target);
            }
            // Opcional: para que la animación se repita al salir y volver a entrar
             else {
                entrada.target.classList.remove('is-visible');
              }
        });
    }, {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    });

    elementosParaAnimar.forEach(elemento => {
        observadorAnimacion.observe(elemento);
    });
}