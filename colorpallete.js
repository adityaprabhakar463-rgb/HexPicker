const COLOR_COUNT = 5;
const palette = document.getElementById('Pallete');
const generateBtn = document.getElementById('Generate');

function randomHex() {
  return '#'+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6, '0');
}

function isLight(hex) {
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  return (0.2126*r + 0.7152*g + 0.0722*b) > 180;
}

function applyColors(colors) {
  const boxes = palette.querySelectorAll('.Box');
  const labels = palette.querySelectorAll('.Label');
  const lockButtons = palette.querySelectorAll('.Lock');

  const generated = colors || Array.from({ length: COLOR_COUNT }, () => randomHex());

  for (let i = 0; i < COLOR_COUNT; i++) {
    if (lockButtons[i].classList.contains('locked')) continue;

    const color = generated[i];
    const box = boxes[i];
    const label = labels[i];

    box.style.backgroundColor = color;
    box.dataset.color = color;
    label.textContent = color;
    label.style.color = '#162535';
    label.style.background = '#f8fafc';
    label.style.borderRadius = '4px';
    label.style.padding = '4px 6px';
    label.style.display = 'inline-block';
  }

  const savedColors = Array.from(boxes).map(b => b.dataset.color || randomHex());
  localStorage.setItem('palette', JSON.stringify(savedColors));
}

function generatePalette() {
  const colors = Array.from({ length: COLOR_COUNT }, () => randomHex());
  applyColors(colors);

  // Set body background to radial gradient of the new colors
  const boxes = palette.querySelectorAll('.Box');
  const currentColors = Array.from(boxes).map(box => box.dataset.color);
  document.body.style.background = `radial-gradient(${currentColors.join(', ')})`;
}

function loadPalette() {
  const saved = localStorage.getItem('palette');
  if (!saved) {
    generatePalette();
    return;
  }

  try {
    const colors = JSON.parse(saved);
    if (Array.isArray(colors) && colors.length === COLOR_COUNT) {
      applyColors(colors);
    } else {
      generatePalette();
    }
  } catch (e) {
    generatePalette();
  }
}

function setupEvents() {
  generateBtn.addEventListener('click', generatePalette);

  palette.querySelectorAll('.Lock').forEach((lockBtn, i) => {
    lockBtn.addEventListener('click', () => {
      const wasLocked = lockBtn.classList.toggle('locked');
      lockBtn.textContent = wasLocked ? 'Unlock' : 'Lock';
      lockBtn.style.opacity = wasLocked ? '0.65' : '1';
    });
  });

  palette.querySelectorAll('.Label').forEach(label => {
    label.style.cursor = 'pointer';
    label.addEventListener('click', async () => {
      const text = label.textContent;
      try {
        await navigator.clipboard.writeText(text);
        const old = label.textContent;
        label.textContent = 'Copied!';
        setTimeout(() => { label.textContent = old; }, 900);
      } catch (error) {
        console.error('Clipboard write failed', error);
      }
    });
  });
}

function init() {
  if (!palette || !generateBtn) {
    console.error('Missing palette root or generate button.');
    return;
  }

  setupEvents();
  loadPalette();
}

init();
