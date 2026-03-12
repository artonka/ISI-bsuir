const container = document.getElementById("details");
const index = localStorage.getItem("selectedShirtIndex");

if (index === null || !shirts[index]) {
  container.textContent = "Shirt not found";
} else {
  const shirt = shirts[index];

  let currentSide = "front";
  let currentColor = null;

  // ---------- Название ----------
  const title = document.createElement("h2");
  title.textContent = shirt.name || "Unnamed shirt";

  // ---------- Цена ----------
  const price = document.createElement("p");
  price.textContent = shirt.price || "Price not available";
  
  // ---------- Описание ----------
  const description = document.createElement("p");
  description.textContent = shirt.description || "No description available";

  // ---------- Картинка ----------
  const img = document.createElement("img");

  // начальный цвет
  if (shirt.colors && Object.keys(shirt.colors).length > 0) {
    currentColor = Object.keys(shirt.colors)[0];
    img.src = shirt.colors[currentColor][currentSide];
  } else if (shirt.default) {
    img.src = shirt.default[currentSide];
  }

  // ---------- Вид ----------
  const sideBlock = document.createElement("div");
  const sideLabel = document.createElement("span");
  sideLabel.textContent = "SIDE: ";

  const frontBtn = document.createElement("button");
  frontBtn.textContent = "FRONT";

  const backBtn = document.createElement("button");
  backBtn.textContent = "BACK";

  frontBtn.addEventListener("click", () => {
    currentSide = "front";

    if (currentColor && shirt.colors[currentColor]) {
      img.src = shirt.colors[currentColor].front;
    } else if (shirt.default) {
      img.src = shirt.default.front;
    }
  });

  backBtn.addEventListener("click", () => {
    currentSide = "back";

    if (currentColor && shirt.colors[currentColor]) {
      img.src = shirt.colors[currentColor].back;
    } else if (shirt.default) {
      img.src = shirt.default.back;
    }
  });

  sideBlock.appendChild(sideLabel);
  sideBlock.appendChild(frontBtn);
  sideBlock.appendChild(backBtn);

  // ---------- Цвета ----------
  const colorsBlock = document.createElement("div");
  const colorsLabel = document.createElement("span");
  colorsLabel.textContent = "COLOR: ";

  colorsBlock.appendChild(colorsLabel);

  if (shirt.colors) {
    Object.keys(shirt.colors).forEach(color => {
      const colorBtn = document.createElement("button");

      colorBtn.textContent = color;
      colorBtn.style.backgroundColor = color;

      colorBtn.addEventListener("click", () => {
        currentColor = color;

        if (shirt.colors[color][currentSide]) {
          img.src = shirt.colors[color][currentSide];
        }
      });

      colorsBlock.appendChild(colorBtn);
    });
  }

  // ---------- Сборка ----------
  container.appendChild(title);
  container.appendChild(img);
  container.appendChild(price);
  container.appendChild(description);
  container.appendChild(sideBlock);
  container.appendChild(colorsBlock);
}
