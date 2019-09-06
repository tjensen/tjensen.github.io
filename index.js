const faces = [];
const container = document.getElementById('faces');

function createFace(x, y, dx, dy) {
  const index = faces.length;
  faces.push({x, y, dx, dy});

  const face = document.createElement('div');
  face.setAttribute('id', `face-${index}`);
  face.setAttribute('class', 'face');
  face.innerHTML = '&#x1f600;';
  face.setAttribute('style', `top: ${x}px; left: ${y}px;`);
  face.addEventListener('click', onClick);
  container.appendChild(face);
}

function onClick(event) {
  const parent = faces[parseInt(event.target.id.slice(5))];
  if (Math.random() >= 0.5) {
    createFace(parent.x, parent.y, -parent.dx, parent.dy + Math.random() - 0.5);
  }
  else
  {
    createFace(parent.x, parent.y, parent.dx + Math.random() - 0.5, -parent.dy);
  }
}

function tick() {
  for (let index = 0; index < faces.length; index++) {
    const face = document.getElementById(`face-${index}`);

    const pos = faces[index];
    pos.x += pos.dx;
    pos.y += pos.dy;

    if (pos.x <= 0 || pos.x >= (window.innerWidth - face.clientWidth)) {
      pos.dx = -pos.dx;
    }
    if (pos.y <= 0 || pos.y >= (window.innerHeight - face.clientHeight)) {
      pos.dy = -pos.dy;
    }

    face.setAttribute('style', `top: ${pos.y}px; left: ${pos.x}px;`);
  }
  setTimeout(tick, 1000/29.97);
}

createFace(window.innerWidth / 2, window.innerHeight / 2, 1, 1);
tick();
