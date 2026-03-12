const container = document.getElementById("products");

shirts.forEach((shirt, index) => {
  const card = document.createElement("div");
  card.className = "shirt-card";

  // ---------- Название ----------
  const title = document.createElement("h3");
  title.textContent = shirt.name || "Unnamed shirt";

  // ---------- Картинка ----------
  const img = document.createElement("img");
  let imageSrc = "";

  if (shirt.colors && Object.keys(shirt.colors).length > 0) {
    const firstColor = Object.keys(shirt.colors)[0];
    imageSrc = shirt.colors[firstColor]?.front;
  }

  if (!imageSrc && shirt.default) {
    imageSrc = shirt.default.front;
  }

  if (imageSrc) {
    img.src = imageSrc;
    img.alt = shirt.name || "T-shirt";
  } else {
    img.alt = "Image not available";
    img.style.display = "none";
  }

  // ---------- Количество цветов ----------
  const colorsCount = shirt.colors
    ? Object.keys(shirt.colors).length
    : 0;

  const colorsText = document.createElement("p");
  colorsText.textContent =
    `Available in ${colorsCount} color${colorsCount === 1 ? "" : "s"}`;

  // ---------- Кнопки ----------
  const buttons = document.createElement("div");
  buttons.className = "buttons";

  const quickViewBtn = document.createElement("button");
  quickViewBtn.textContent = "Quick View";

  const seePageBtn = document.createElement("button");
  seePageBtn.textContent = "See Page";
  seePageBtn.addEventListener("click", () => {
  localStorage.setItem("selectedShirtIndex", index);
  window.location.href = "details.html";
});


  buttons.appendChild(quickViewBtn);
  buttons.appendChild(seePageBtn);

  // ---------- Сборка карточки ----------
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(colorsText);
  card.appendChild(buttons);

  container.appendChild(card);
});
