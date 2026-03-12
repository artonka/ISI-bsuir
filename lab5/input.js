const targets = document.querySelectorAll('.target');

let activeElement = null; // текущий перемещаемый элемент
let offsetX = 0;
let offsetY = 0;

let startLeft = 0; // исходная позиция
let startTop = 0;

let isDragging = false; // перетаскивание мышью или пальцем
let isSticky = false;   // «следует за пальцем» после двойного клика/тапа

// для определения двойного тапа/клика
let lastTapTime = 0;
const DOUBLE_TAP_DELAY = 300;

// вспомогательная функция для позиционирования
function setPosition(el, x, y) {
  el.style.left = x + 'px';
  el.style.top = y + 'px';
}

// === ИНИЦИАЛИЗАЦИЯ ВСЕХ DIV ===
targets.forEach(el => {
  el.style.position = 'absolute';

  // ---- МЫШЬ ----
  el.addEventListener('mousedown', e => {
    if (isSticky) return;

    activeElement = el;
    isDragging = true;

    startLeft = el.offsetLeft;
    startTop = el.offsetTop;

    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
  });

  el.addEventListener('dblclick', e => {
    activeElement = el;
    isSticky = true;

    startLeft = el.offsetLeft;
    startTop = el.offsetTop;

    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;

    el.style.backgroundColor = 'orange';
  });
});

// движение мыши
document.addEventListener('mousemove', e => {
  if (!activeElement) return;
  if (!isDragging && !isSticky) return;

  setPosition(
    activeElement,
    e.clientX - offsetX,
    e.clientY - offsetY
  );
});

// отпускание ЛКМ
document.addEventListener('mouseup', () => {
  isDragging = false;
});

// клик для открепления «приклеенного» элемента
document.addEventListener('click', () => {
  if (!isSticky || !activeElement) return;

  activeElement.style.backgroundColor = '';
  activeElement = null;
  isSticky = false;
});

// ESC — отмена действия
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!activeElement) return;

  setPosition(activeElement, startLeft, startTop);
  activeElement.style.backgroundColor = '';

  isDragging = false;
  isSticky = false;
  activeElement = null;
});

// === TOUCH ===
targets.forEach(el => {
  el.addEventListener('touchstart', e => {
    e.preventDefault();

    // второй палец = ESC
    if (e.touches.length >= 2 && activeElement) {
      setPosition(activeElement, startLeft, startTop);
      activeElement.style.backgroundColor = '';
      activeElement = null;
      isDragging = false;
      isSticky = false;
      return;
    }

    const touch = e.touches[0];
    const now = Date.now();

    // двойной тап
    if (touch.target.classList.contains('target') && now - lastTapTime < DOUBLE_TAP_DELAY) {
      activeElement = touch.target;
      isSticky = true;

      startLeft = activeElement.offsetLeft;
      startTop = activeElement.offsetTop;

      offsetX = touch.clientX - activeElement.offsetLeft;
      offsetY = touch.clientY - activeElement.offsetTop;

      activeElement.style.backgroundColor = 'orange';
    } else if (!isSticky && touch.target.classList.contains('target')) {
      // обычное перетаскивание
      activeElement = touch.target;
      isDragging = true;

      startLeft = activeElement.offsetLeft;
      startTop = activeElement.offsetTop;

      offsetX = touch.clientX - activeElement.offsetLeft;
      offsetY = touch.clientY - activeElement.offsetTop;
    }

    lastTapTime = now;
  });
});

// движение пальца
document.addEventListener('touchmove', e => {
  if (!activeElement) return;

  // второй палец = ESC
  if (e.touches.length >= 2) {
    setPosition(activeElement, startLeft, startTop);
    activeElement.style.backgroundColor = '';
    activeElement = null;
    isDragging = false;
    isSticky = false;
    return;
  }

  const touch = e.touches[0];
  if (!touch) return;

  if (isDragging || isSticky) {
    setPosition(
      activeElement,
      touch.clientX - offsetX,
      touch.clientY - offsetY
    );
  }
});

// окончание касания
document.addEventListener('touchend', e => {
  if (isDragging) {
    isDragging = false;
    return;
  }

  // одиночный короткий тап выключает sticky-режим
  if (isSticky && e.changedTouches.length === 1) {
    const touch = e.changedTouches[0];

    if (
      Math.abs(touch.clientX - (activeElement?.offsetLeft + offsetX)) < 5 &&
      Math.abs(touch.clientY - (activeElement?.offsetTop + offsetY)) < 5
    ) {
      activeElement.style.backgroundColor = '';
      activeElement = null;
      isSticky = false;
    }
  }
});
