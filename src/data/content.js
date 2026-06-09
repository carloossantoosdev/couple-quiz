// ============================================================
//  CONTEUDO DA SURPRESA FINAL - carta final e fotos.
// ------------------------------------------------------------
//  AGORA cada FOTO e cada CARTA ficam dentro de cada pergunta,
//  em src/data/questions.js (campos "photo" e "card").
//  Ao acertar uma pergunta, a foto + carta dela sao reveladas.
//
//  COMO ADICIONAR AS FOTOS (zero codigo):
//  1. Coloque as imagens em:  src/assets/fotos/
//     (formatos: jpg, jpeg, png, webp, gif, avif)
//  2. Em cada pergunta (questions.js), aponte o campo "photo"
//     para o NOME do arquivo (ex.: photo: 'foto2.jpg').
//  3. Reinicie o npm run dev para as novas fotos serem detectadas.
//
//  COMO ADICIONAR O VIDEO DA CARTA FINAL (zero codigo):
//  1. Coloque o arquivo em:  src/assets/videos/
//     (formatos: mp4, webm, mov)
//  2. Nome sugerido: video.mp4  (ou qualquer nome — o app
//     detecta automaticamente; se houver varios, prioriza "video.*")
//  3. Reinicie o npm run dev se o arquivo foi adicionado com o
//     servidor ja rodando.
//
//  Aqui ficam: nome dela, carta final, video e assinatura.
// ============================================================

import { makePlaceholder } from '../assets/placeholderPhoto.js'

// Nome dela (aparece na tela inicial e nas mensagens)
export const coupleName = 'Meu Amor'

// Assinatura da carta final
export const signature = 'Com todo o meu amor,\nVocê-sabe-quem 💌'

// Carta final (aparece depois de revelar as lembrancas).
export const letter = `Meu amor,

Cada lembrança que voce desbloqueou é um pedacinho de nós.
Obrigado por lembrar, por estar, por ser o meu lugar favorito.

Feliz Dia dos Namorados! 💕`

// Legenda opcional abaixo do video na carta final (deixe '' para ocultar).
export const letterVideoCaption = 'Um pedacinho nosso 🎬'

// Video da carta final — detectado em src/assets/videos/.
const letterVideoModules = import.meta.glob(
  '../assets/videos/*.{mp4,webm,mov,MP4,WEBM,MOV}',
  { eager: true, query: '?url', import: 'default' },
)

function resolveLetterVideo() {
  for (const [path, url] of Object.entries(letterVideoModules)) {
    const name = path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase()
    if (name === 'video') return url
  }
  return Object.values(letterVideoModules)[0] || ''
}

export const letterVideo = resolveLetterVideo()

// Mapa das fotos em src/assets/fotos/, detectado automaticamente.
const photoModules = import.meta.glob(
  '../assets/fotos/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP,GIF,AVIF}',
  { eager: true, query: '?url', import: 'default' },
)

// Normaliza um nome para comparar (sem extensao, minusculo, sem espacos extras).
function stem(value) {
  return String(value || '')
    .replace(/\.[^.]+$/, '')
    .trim()
    .toLowerCase()
}

// Indexa as fotos pelo "stem" (nome sem extensao) para casar de
// forma flexivel com o numero da pergunta ou o texto da resposta.
const photoByStem = {}
for (const [path, url] of Object.entries(photoModules)) {
  const name = path.split('/').pop()
  photoByStem[stem(name)] = url
}

// Resolve a foto de uma pergunta tentando, nesta ordem:
//   1) o campo "photo" da pergunta (ex.: 'praia.jpeg')
//   2) o numero da pergunta        (ex.: arquivo '1.jpg')
//   3) o texto da resposta correta (ex.: 'No colégio.jpg')
// Se nada casar, usa um placeholder bonito (nunca quebra).
export function resolveQuestionPhoto(q) {
  const correctOption = q.options ? q.options[q.correctIndex] : ''
  const candidates = [q.photo, String(q.id), correctOption]
  for (const c of candidates) {
    const key = stem(c)
    if (key && photoByStem[key]) return photoByStem[key]
  }
  return makePlaceholder(q.question || 'Nossa lembrança')
}
