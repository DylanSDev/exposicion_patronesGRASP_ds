// Función para copiar el código al portapapeles
function copyCode() {
  const codeContent = document.getElementById("code-content");
  const textToCopy = codeContent.textContent || codeContent.innerText;

  // Crear un elemento temporal para copiar el texto
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);

  // Seleccionar y copiar el texto
  tempTextArea.select();
  tempTextArea.setSelectionRange(0, 99999); // Para dispositivos móviles

  try {
    document.execCommand("copy");
    showCopyFeedback();
  } catch (err) {
    console.error("Error al copiar:", err);
    // Fallback para navegadores modernos
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          showCopyFeedback();
        })
        .catch((err) => {
          console.error("Error al copiar con clipboard API:", err);
        });
    }
  }

  // Remover el elemento temporal
  document.body.removeChild(tempTextArea);
}

// Mostrar feedback visual cuando se copia el código
function showCopyFeedback() {
  const copyButton = document.querySelector(".copy-button");
  const originalText = copyButton.innerHTML;

  // Cambiar temporalmente el texto del botón
  copyButton.innerHTML = '<span class="copy-icon">✓</span>¡Copiado!';
  copyButton.style.backgroundColor = "#10b981";

  // Restaurar el texto original después de 2 segundos
  setTimeout(() => {
    copyButton.innerHTML = originalText;
    copyButton.style.backgroundColor = "";
  }, 2000);
}

// Animaciones suaves al hacer scroll
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observar todas las tarjetas
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Mejorar la experiencia de navegación
function enhanceNavigation() {
  // Agregar efecto de hover suave a los elementos interactivos
  const interactiveElements = document.querySelectorAll(
    ".flow-box, .copy-button"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s ease";
    });
  });
}

// Función para manejar el redimensionamiento de la ventana
function handleResize() {
  // Ajustar el tamaño de fuente del código en dispositivos pequeños
  const codeBlocks = document.querySelectorAll(".code-block");
  const isMobile = window.innerWidth < 768;

  codeBlocks.forEach((block) => {
    if (isMobile) {
      block.style.fontSize = "0.75rem";
    } else {
      block.style.fontSize = "0.9rem";
    }
  });
}

// Función para mejorar la accesibilidad del teclado
function enhanceKeyboardNavigation() {
  const copyButton = document.querySelector(".copy-button");

  copyButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copyCode();
    }
  });
}

// Inicializar todas las funcionalidades cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  observeElements();
  enhanceNavigation();
  enhanceKeyboardNavigation();
  handleResize();

  // Escuchar cambios en el tamaño de la ventana
  window.addEventListener("resize", handleResize);

  // Agregar un pequeño delay para las animaciones iniciales
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Función para scroll suave a secciones (si se agregan enlaces de navegación)
function smoothScrollTo(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Prevenir el comportamiento por defecto del arrastrar en las imágenes
document.addEventListener("dragstart", (e) => {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});

// Mejorar la experiencia en dispositivos táctiles
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device");

  // Agregar estilos específicos para dispositivos táctiles
  const style = document.createElement("style");
  style.textContent = `
        .touch-device .card:hover {
            transform: none;
        }
        
        .touch-device .flow-box:hover {
            transform: none;
        }
    `;
  document.head.appendChild(style);
}
