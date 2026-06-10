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

// Data em que vocês começaram a namorar (formato AAAA-MM-DD).
// Você informou 28/01/2028 — confira o ano; se for 2020, 2018 etc., edite aqui.
export const relationshipStart = '2018-01-28'

// Timeline dos stories — marcos ano a ano na linha do tempo.
// Campos: year, title (opcional), photo, quote
export const timeline = [
  {
    year: 2018,
    title: 'O começo',
    photo: 'colegio.jpg',
    quote: 'O dia em que nossa história começou. Quem diria que dali viria tudo isso? 💕',
  },
  {
    year: 2019,
    title: 'Primeiro Viagem juntos',
    photo: 'praia.jpeg',
    quote: 'Primeiro Viagem juntos, primeiras memórias guardadas no coração. 🌊',
  },
  {
    year: 2020,
    title: 'Maracaipe',
    photo: 'maracaipe.jpg',
    quote: 'Mais um ano escrevendo capítulos lindos juntos. ☀️',
  },
  {
    year: 2021,
    title: 'Chile',
    photo: 'chile.jpeg',
    quote: 'Viagens, risadas e a certeza de que somos time. 🏔️',
  },
  {
    year: 2022,
    title: 'Nossa trilha sonora',
    photo: 'ferrugem.jpg',
    quote: 'Música, abraços e amor que só cresce. 🎶',
  },
  {
    year: 2023,
    title: 'Eu te escolhi',
    photo: 'teescolhi.jpg',
    quote: 'Eu te escolheria de novo — mil vezes, em qualquer universo. 💖',
  },
  {
    year: 2024,
    title: 'Nossa viagem favorita',
    photo: 'rio.jpg',
    quote: 'Viagens, risadas e a certeza de que somos time. 🏔️',
  },
  {
    year: 2025,
    title: 'Nossa viagem favorita',
    photo: 'rio.jpg',
    quote: 'Viagens, risadas e a certeza de que somos time. 🏔️',
  },
  {
    year: 2026,
    title: 'Nossa viagem favorita',
    photo: 'rio.jpg',
    quote: 'Viagens, risadas e a certeza de que somos time. 🏔️',
  },
]

// Mapa de viagens — lugares marcados no story do mapa.
// lat/lng: coordenadas (Google Maps → clique direito → copiar coordenadas).
// photo: arquivo em src/assets/fotos/
export const travelPlaces = [
  {
    id: 'recife',
    name: 'Recife',
    lat: -8.0476,
    lng: -34.877,
    photo: 'colegio.jpg',
    memory: 'Onde nos conhecemos. O começo de tudo. 💕',
  },
  {
    id: 'maracaipe',
    name: 'Maracaípe',
    lat: -8.6279,
    lng: -35.0425,
    photo: 'maracaipe.jpg',
    memory: 'Sol, mar e momentos que ficaram pra sempre. ☀️',
  },
  {
    id: 'Gramado',
    name: 'Gramado',
    lat: -8.5044,
    lng: -35.0044,
    photo: 'gramado.jpg',
    memory: 'Primeiro Viagem juntos na areia. 🌊',
  },
  {
    id: 'chile',
    name: 'Chile',
    lat: -33.4489,
    lng: -70.6693,
    photo: 'chile.jpeg',
    memory: 'Neve, montanhas e a gente descobrindo o mundo. ChiChilele🏔️',
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    lat: -22.9068,
    lng: -43.1729,
    photo: 'rio.jpg',
    memory: 'Cidade maravilhosa, memórias maravilhosas. 🌆',
  },
  {
    id: 'show',
    name: 'Nosso show',
    lat: -23.5505,
    lng: -46.6333,
    photo: 'ferrugem.jpg',
    memory: 'Música, Ferrugem e a trilha sonora do nosso amor. 🎶',
  },
]

// Caça aos corações — mini-jogo nos stories.
// x e y: posição em % dentro da área do jogo (0–100).
export const heartHuntItems = [
  { id: 'h1', x: 14, y: 22, message: 'Seu sorriso ilumina meus dias. 😊' },
  { id: 'h2', x: 78, y: 18, message: 'Você é meu lugar favorito no mundo. 🏠' },
  { id: 'h3', x: 22, y: 52, message: 'Cada viagem com você vira memória eterna. ✈️' },
  { id: 'h4', x: 68, y: 48, message: 'Seu abraço é meu refúgio. 🤗' },
  { id: 'h5', x: 44, y: 34, message: 'Te escolheria em todas as vidas. 💕' },
  { id: 'h6', x: 12, y: 78, message: 'Você me faz querer ser melhor. 🌟' },
  { id: 'h7', x: 82, y: 72, message: 'Nossa história é a minha favorita. 📖' },
  { id: 'h8', x: 52, y: 68, message: 'Feliz Dia dos Namorados, meu amor! 💖' },
]

// Roleta da sorte do amor — prêmios simbólicos (cupom na tela).
// label: texto do prêmio no cupom · shortLabel: texto curto na roleta · emoji: ícone
export const loveWheelPrizes = [
  {
    id: 'hug',
    label: '1 abraço extra',
    shortLabel: 'Abraço',
    emoji: '🤗',
    couponDetail: 'Resgate quando quiser — sem limite de validade emocional.',
  },
  {
    id: 'dinner',
    label: 'Jantar à sua escolha',
    shortLabel: 'Jantar',
    emoji: '🍽️',
    couponDetail: 'Você escolhe o lugar. Eu pago as contas (e os elogios).',
  },
  {
    id: 'movie',
    label: 'Filme que você escolhe',
    shortLabel: 'Filme',
    emoji: '🎬',
    couponDetail: 'Pipoca, coberta e zero reclamação sobre o gênero.',
  },
  {
    id: 'dessert',
    label: 'Sobremesa da sua escolha',
    shortLabel: 'Doce',
    emoji: '🍰',
    couponDetail: 'Docinho, sorvete ou brigadeiro — você manda.',
  },
  {
    id: 'massage',
    label: 'Massagem relaxante',
    shortLabel: 'Massagem',
    emoji: '💆',
    couponDetail: '15 minutos de massagem nas costas, sem pressa.',
  },
  {
    id: 'viagem',
    label: 'Viagem que você escolhe',
    shortLabel: 'Viagem',
    emoji: '✈️',
    couponDetail: 'Você escolhe o lugar. Eu pago as contas (e os elogios).',
  },
]

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

export function resolveTimelinePhoto(entry) {
  const key = stem(entry.photo || String(entry.year))
  if (key && photoByStem[key]) return photoByStem[key]
  return makePlaceholder(String(entry.year))
}

export function resolveTravelPhoto(place) {
  const key = stem(place.photo || place.id)
  if (key && photoByStem[key]) return photoByStem[key]
  return makePlaceholder(place.name || 'Nossa viagem')
}

export function formatRelationshipDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
