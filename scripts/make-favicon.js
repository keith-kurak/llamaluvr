// Renders the 1-bit pixel llama (components/icons.tsx LlamaLogo) to crisp PNGs
// at integer scales, so no resampling ever softens the pixels.
const zlib = require("zlib");
const fs = require("fs");

const GRID = [
  "XX.X........",
  "XXXX........",
  ".XXX........",
  "..XX........",
  "..XX........",
  ".XXX........",
  ".XXXX.......",
  "XXXXXXXX....",
  "XXXXXXXXX...",
  "XXXXXXXX.X..",
  "XX...XX.....",
  "XX...XX.....",
];

// 16x16 canvas, llama (10 cols wide, 12 rows tall) centered.
const CANVAS = 16;
const OFF_X = 3;
const OFF_Y = 2;

const BG = [255, 255, 255, 255];
const FG = [0, 0, 0, 255];

function cellAt(cx, cy) {
  const gx = cx - OFF_X;
  const gy = cy - OFF_Y;
  if (gy < 0 || gy >= GRID.length) return false;
  if (gx < 0 || gx >= GRID[gy].length) return false;
  return GRID[gy][gx] === "X";
}

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function png(size) {
  const scale = size / CANVAS;
  const raw = Buffer.alloc(size * (size * 4 + 1));
  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0; // no filter
    for (let x = 0; x < size; x++) {
      const on = cellAt(Math.floor(x / scale), Math.floor(y / scale));
      const c = on ? FG : BG;
      raw[p++] = c[0];
      raw[p++] = c[1];
      raw[p++] = c[2];
      raw[p++] = c[3];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function svg() {
  const rects = [];
  for (let y = 0; y < CANVAS; y++) {
    for (let x = 0; x < CANVAS; x++) {
      if (cellAt(x, y)) rects.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
<rect width="16" height="16" fill="#fff"/>
<g fill="#000">${rects.join("")}</g>
</svg>
`;
}

// Usage: node scripts/make-favicon.js
// Writes the three files the site actually serves. Re-run after editing GRID.
const root = `${__dirname}/..`;
const outputs = [
  // Source for the favicon.ico Expo generates during the web export.
  [`${root}/assets/images/favicon.png`, png(48)],
  // Crisp at any size in browsers that support SVG icons.
  [`${root}/public/favicon.svg`, Buffer.from(svg(), "utf8")],
  // Home screen / bookmark icon.
  [`${root}/public/favicon-192.png`, png(192)],
];
for (const [file, data] of outputs) {
  fs.writeFileSync(file, data);
  console.log("wrote", file);
}
