// Gera uma imagem placeholder bonita (data URI SVG) enquanto
// as fotos reais do casal nao sao adicionadas.
// Quando tiver as fotos, importe os arquivos em src/data/content.js
// e substitua as chamadas makePlaceholder(...) pelos imports.

export function makePlaceholder(label, colorA = '#ff8fb1', colorB = '#ff5c8a') {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${colorA}"/>
      <stop offset="1" stop-color="${colorB}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#g)"/>
  <path d="M300 430s-150-97-150-180c0-45 36-78 78-78 28 0 53 16 72 47 19-31 44-47 72-47 42 0 78 33 78 78 0 83-150 180-150 180z" fill="rgba(255,255,255,0.85)"/>
  <text x="300" y="520" font-family="Poppins, Arial, sans-serif" font-size="34" font-weight="600" fill="#fff" text-anchor="middle">${label}</text>
</svg>`.trim()
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
