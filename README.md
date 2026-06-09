# Quiz do Casal 💕

App web romântico e gamificado para o Dia dos Namorados. React + Vite + Zustand + Framer Motion — tudo local, sem backend.

## Rodar localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Publicar na Vercel + QR Code

### 1. Deploy na Vercel

1. Conecte o repositório GitHub em [vercel.com/new](https://vercel.com/new)
2. Framework: **Vite** (detectado automaticamente)
3. Build: `npm run build` · Output: `dist`
4. Deploy — a URL ficará algo como `https://couple-quiz-henna.vercel.app`

O arquivo `vercel.json` já está configurado para o app React.

### 2. Gerar o QR Code (Vercel)

Depois do deploy, com a URL publicada:

```bash
npm run qrcode -- https://couple-quiz-henna.vercel.app
```

Ou copie e edite o config:

```bash
copy deploy.config.example.json deploy.config.json
# edite vercelUrl com sua URL da Vercel
npm run qrcode
```

Isso cria:

- **`qrcode.png`** — imprima ou envie para ela
- **`qrcode.html`** — abra no navegador para ver o QR em tela cheia

---

## GitHub Pages (opcional)

Se preferir GitHub Pages em vez da Vercel, use **Settings → Pages → GitHub Actions** no repositório. A URL será `https://SEU-USUARIO.github.io/couple-quiz/`.

## Personalizar

| O quê | Onde |
| --- | --- |
| Nome, carta final, vídeo | `src/data/content.js` |
| Perguntas, fotos e cartas | `src/data/questions.js` |
| Fotos | `src/assets/fotos/` |
| Vídeo da carta final | `src/assets/videos/video.mp4` |
| Música | `src/assets/music.mp3` |
| Cores e layout | `src/styles/index.css` |

## Stack

- Vite + React
- Zustand
- Framer Motion
- CSS puro

Feito com carinho.
