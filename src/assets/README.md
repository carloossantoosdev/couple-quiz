# Pasta de assets (fotos e musica)

Coloque aqui os arquivos que voce vai usar no quiz.

## Musica

1. Salve o arquivo nesta pasta como `music.mp3` (ex.: a musica "Ferrugem").
2. Abra `src/components/MusicPlayer.jsx` e:
   - descomente a linha `import musicFile from '../assets/music.mp3'`
   - apague (ou comente) a linha `const musicFile = ''`
3. Pronto: a musica toca em loop a partir do clique em "Comecar".

> Navegadores bloqueiam autoplay, por isso a musica so inicia depois do primeiro clique.

## Fotos

1. Salve as fotos nesta pasta (ex.: `foto1.jpg`, `foto2.jpg`, ...).
2. Abra `src/data/content.js` e, no topo, importe cada foto:

   import foto1 from '../assets/foto1.jpg'
   import foto2 from '../assets/foto2.jpg'

3. Substitua os placeholders na lista `photos`:

   export const photos = [
     { src: foto1, caption: 'Onde tudo comecou' },
     { src: foto2, caption: 'O nosso primeiro programa' },
   ]

Cada foto e desbloqueada conforme os acertos no quiz.
