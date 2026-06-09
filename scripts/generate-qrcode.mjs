import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const configPath = path.join(root, 'deploy.config.json')

function loadUrl() {
  const fromArg = process.argv[2]
  if (fromArg) return fromArg.replace(/\/$/, '') + '/'

  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    const user = config.githubUser?.trim()
    const repo = (config.repoName || 'couple-quiz').trim()
    if (user) return `https://${user}.github.io/${repo}/`
  }

  console.error(`
Informe a URL publicada do quiz.

Opcao 1 — argumento:
  npm run qrcode -- https://SEU-USUARIO.github.io/couple-quiz/

Opcao 2 — arquivo deploy.config.json (copie deploy.config.example.json):
  { "githubUser": "SEU-USUARIO", "repoName": "couple-quiz" }
`)
  process.exit(1)
}

const url = loadUrl()
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=900x900&margin=24&data=${encodeURIComponent(url)}`

const res = await fetch(qrUrl)
if (!res.ok) {
  console.error('Falha ao gerar QR code:', res.status, res.statusText)
  process.exit(1)
}

const png = Buffer.from(await res.arrayBuffer())
const outPng = path.join(root, 'qrcode.png')
const outHtml = path.join(root, 'qrcode.html')

fs.writeFileSync(outPng, png)

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QR Code — Quiz do Casal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100dvh;
      display: grid;
      place-items: center;
      padding: 24px;
      font-family: system-ui, sans-serif;
      background: linear-gradient(160deg, #ffd9e6, #ffb3cd 45%, #ff8fb1);
      color: #5a2740;
    }
    .card {
      max-width: 420px;
      width: 100%;
      background: rgba(255,255,255,.95);
      border-radius: 22px;
      padding: 28px 24px 32px;
      text-align: center;
      box-shadow: 0 18px 40px rgba(214, 59, 110, .22);
    }
    h1 { font-size: 1.5rem; margin-bottom: 8px; }
    p { color: #8a5a72; margin-bottom: 18px; line-height: 1.5; }
    img { width: min(100%, 320px); border-radius: 16px; }
    a {
      display: inline-block;
      margin-top: 16px;
      color: #e84a7f;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Quiz do Casal 💕</h1>
    <p>Escaneie para abrir o quiz no celular</p>
    <img src="qrcode.png" alt="QR Code do quiz" />
    <a href="${url}">${url}</a>
  </div>
</body>
</html>
`

fs.writeFileSync(outHtml, html)

console.log('QR code gerado!')
console.log('URL:', url)
console.log('Arquivos: qrcode.png, qrcode.html')
