// app.js

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.querySelector(".spline-box spline-viewer");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const count = document.getElementById("count");
  const total = document.getElementById("total");
  const cards = document.querySelectorAll(".cards .card");

  // Verificar que los elementos existan
  if (!viewer || !prevBtn || !nextBtn || !count || !total || cards.length === 0) {
    console.error("⚠️ Faltan elementos necesarios en el HTML.");
    return;
  }

  // Configuración inicial
  const totalScenes = cards.length;
  let currentScene = 1;

  // Mostrar total de escenas
  total.textContent = totalScenes.toString().padStart(2, "0");
  count.textContent = currentScene.toString().padStart(2, "0");

  // Función para cambiar escena
  function changeScene(newIndex) {
    if (newIndex < 1) newIndex = totalScenes;
    if (newIndex > totalScenes) newIndex = 1;

    const selectedCard = cards[newIndex - 1];
    const letter = selectedCard.dataset.letter;

    // Actualizar contador
    currentScene = newIndex;
    count.textContent = currentScene.toString().padStart(2, "0");

    // Cambiar escena en el visor de Spline
    if (viewer && viewer.scene && viewer.scene.emitEvent) {
      viewer.scene.emitEvent("keyDown", "Key" + letter.toUpperCase());
    } else {
      console.warn("El viewer de Spline no está listo todavía.");
    }
  }

  // Navegación con botones
  prevBtn.addEventListener("click", () => changeScene(currentScene - 1));
  nextBtn.addEventListener("click", () => changeScene(currentScene + 1));

  // Cargar escena inicial cuando Spline esté listo
  viewer?.addEventListener("load", () => {
    console.log("✅ Spline viewer cargado correctamente");
    changeScene(currentScene);
  });
});
