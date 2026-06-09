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

## Publicar no GitHub + QR Code

### 1. Criar o repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome sugerido: **`couple-quiz`**
3. Deixe **público** (GitHub Pages gratuito)
4. **Não** marque README/gitignore (já existem no projeto)

No terminal, na pasta do projeto:

```bash
git init
git add .
git commit -m "Quiz do casal — versão final"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/couple-quiz.git
git push -u origin main
```

> Troque `SEU-USUARIO` pelo seu usuário do GitHub.

### 2. Ativar GitHub Pages

1. No GitHub: **Settings → Pages**
2. Em **Build and deployment → Source**, escolha **GitHub Actions**
3. O workflow `.github/workflows/deploy.yml` publica automaticamente a cada push na branch `main`

Aguarde 1–2 minutos. A URL ficará:

```text
https://SEU-USUARIO.github.io/couple-quiz/
```

### 3. Gerar o QR Code

Depois do deploy, gere o QR para ela abrir no celular:

```bash
npm run qrcode -- https://SEU-USUARIO.github.io/couple-quiz/
```

Ou copie o exemplo e edite:

```bash
copy deploy.config.example.json deploy.config.json
# edite githubUser e repoName
npm run qrcode
```

Isso cria:

- **`qrcode.png`** — imagem para imprimir ou enviar
- **`qrcode.html`** — página para abrir no navegador e mostrar o QR

Abra `qrcode.html` no Chrome, imprima ou mande a imagem `qrcode.png` para ela escanear.

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
