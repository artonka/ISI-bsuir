const targets = document.querySelectorAll('.target');

let activeElement = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let isSticky = false;

let startLeft = 0;
let startTop = 0;

// вспомогательная функция
function setPosition(el, x, y) {
  el.style.left = x + 'px';
  el.style.top = y + 'px';
}

// инициализация всех div
targets.forEach(el => {
  el.style.position = 'absolute';

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
  isSticky = false;
  activeElement = null;
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
