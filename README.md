# Quiz do Casal 💕

App web romântico e gamificado para o Dia dos Namorados. React + Vite + Zustand + Framer Motion — tudo local, sem backend.

## Acessar o quiz (link + QR Code)

**Link:** [https://couple-quiz-henna.vercel.app](https://couple-quiz-henna.vercel.app)

Escaneie o QR Code no celular para abrir o quiz:

![QR Code do Quiz do Casal](docs/qrcode.png)

### Enviar o QR Code no WhatsApp

**No celular (Android/iPhone):**

1. Abra o WhatsApp e entre na conversa dela
2. Toque no **📎** (anexar)
3. Escolha **Documento** ou **Galeria**
4. Selecione o arquivo **`qrcode.png`** (fica na pasta do projeto, ou em **Arquivos/Downloads** se você salvou antes)
5. Envie — ela escaneia a imagem direto no WhatsApp (toque na foto → menu → **Ler QR code**, ou abra a câmera do celular apontando para a tela)

**No computador (WhatsApp Web):**

1. Abra [web.whatsapp.com](https://web.whatsapp.com) e entre na conversa
2. Clique no **📎** → **Documento**
3. Escolha `qrcode.png` na pasta `couple-quiz`
4. Envie a imagem

**Dica:** também dá para abrir `qrcode.html` no navegador, tirar um print da tela e enviar a captura — funciona igual.

---

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em **http://localhost:5174** (a porta 5174 evita conflito com cache de outros projetos na 5173).

Se aparecer tela branca, limpe o cache do navegador ou abra em aba anônima.

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
