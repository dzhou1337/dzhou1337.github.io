const images = [
  "https://www.baseball-reference.com/req/202610290/images/headshots/2/270bfa31_mlbam.jpg",
  "https://www.baseball-reference.com/req/202610290/images/headshots/f/fb781ccd_mlbam.jpg",
  "https://www.baseball-reference.com/req/202610290/images/headshots/0/08c68ab4_milb.jpg",
  "https://www.baseball-reference.com/req/202610290/images/headshots/1/12bcaeab_mlbam.jpg",
  "https://www.baseball-reference.com/req/202610290/images/headshots/7/733df4eb_mlbam.jpg",
  "https://www.baseball-reference.com/req/202610290/images/headshots/e/ec2d4e51_mlbam.jpg",
  "https://www.baseball-reference.com/req/202610290/images/headshots/5/5dbce5bf_npb.jpg",
  "https://www.baseball-reference.com/req/202610290/images/headshots/1/1625da35_mlbam.jpg",
  "https://www.baseball-reference.com/req/202610290/images/headshots/3/301d1d26_br.jpg",
  "https://www.baseball-reference.com/req/202610290/images/headshots/f/f265b378_milb.jpg"
];

const size = 80;   // portrait size in px (match the CSS)
const speed = 2; // pixels per frame at 60fps

const container = document.getElementById("bouncers");

const sprites = images.map(src => {
  const el = document.createElement("img");
  el.src = src;
  el.className = "bouncer";
  el.alt = "";
  container.appendChild(el);

  const angle = Math.random() * Math.PI * 2;
  return {
    el,
    x: Math.random() * (window.innerWidth - size),
    y: Math.random() * (window.innerHeight - size),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed
  };
});

function collide(a, b) {
  // Centers of each circle
  let dx = (b.x + size / 2) - (a.x + size / 2);
  let dy = (b.y + size / 2) - (a.y + size / 2);
  let dist = Math.hypot(dx, dy);

  if (dist >= size) return; // not touching (circles of diameter `size`)

  // Avoid divide-by-zero if two sprites spawn exactly on top of each other
  if (dist === 0) { dx = 1; dy = 0; dist = 1; }

  // Collision normal: unit vector pointing from a to b
  const nx = dx / dist;
  const ny = dy / dist;

  // Push them apart so they don't stay overlapped and stick together
  const overlap = size - dist;
  a.x -= nx * overlap / 2;
  a.y -= ny * overlap / 2;
  b.x += nx * overlap / 2;
  b.y += ny * overlap / 2;

  // How fast they're closing in on each other along the normal
  const closing = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
  if (closing <= 0) return; // already moving apart

  // Equal masses: swap velocity components along the normal
  a.vx -= closing * nx;
  a.vy -= closing * ny;
  b.vx += closing * nx;
  b.vy += closing * ny;
}

let last = performance.now();

function tick(now) {
  const dt = Math.min((now - last) / 16.67, 3); // cap so a background tab doesn't cause a huge jump
  last = now;

  const maxX = window.innerWidth - size;
  const maxY = window.innerHeight - size;

  // 1. Move and bounce off walls
  for (const s of sprites) {
    s.x += s.vx * dt;
    s.y += s.vy * dt;

    if (s.x <= 0)         { s.x = 0;    s.vx =  Math.abs(s.vx); }
    else if (s.x >= maxX) { s.x = maxX; s.vx = -Math.abs(s.vx); }

    if (s.y <= 0)         { s.y = 0;    s.vy =  Math.abs(s.vy); }
    else if (s.y >= maxY) { s.y = maxY; s.vy = -Math.abs(s.vy); }
  }

  // 2. Check every pair once for collisions
  for (let i = 0; i < sprites.length; i++) {
    for (let j = i + 1; j < sprites.length; j++) {
      collide(sprites[i], sprites[j]);
    }
  }

  // 3. Draw
  for (const s of sprites) {
    s.el.style.transform = `translate(${s.x}px, ${s.y}px)`;
  }

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);