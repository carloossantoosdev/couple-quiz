import { makePlaceholder } from '../assets/placeholderPhoto.js'

// Nome dela (aparece na tela inicial e nas mensagens)
export const coupleName = 'Meu Amor'

// Nome do app (aba do navegador, titulos visuais)
export const appTitle = 'Lovebox'

// Titulo do ultimo story (fase do quiz)
export const quizStoryTitle = 'Quiz'

// Data em que vocês começaram a namorar (formato AAAA-MM-DD).
// Você informou 28/01/2028 — confira o ano; se for 2020, 2018 etc., edite aqui.
export const relationshipStart = '2018-01-28'

// Timeline dos stories — marcos ano a ano na linha do tempo.
// Campos: id (único), year, title (opcional), photo, quote
// Fotos em src/assets/fotos/ — o ano no nome do arquivo define a ordem.
export const timeline = [
  {
    id: '2018-pedido',
    year: 2018,
    title: 'Pedido de namoro',
    photo: '2018pedidonamoro.jpeg',
    quote: 'O dia em que nossa história começou de verdade. Quem diria que dali viria tudo isso? 💕',
  },
  {
    id: '2018-fimdeano',
    year: 2018,
    title: 'Fim de ano',
    photo: '2018fimdeano.jpeg',
    quote: 'Nosso primeiro fim de ano juntos, cheio de planos e carinho. 🎆',
  },
  {
    id: '2019-primeira-viagem',
    year: 2019,
    title: 'Primeira viagem',
    photo: '2019primeiraviagem.jpeg',
    quote: 'Maracaípe, mar e sorrisos bobos — o primeiro de muitos capítulos juntos. 🌊',
  },
  {
    id: '2020-uniao',
    year: 2020,
    title: 'União estável',
    photo: '2020uniaoestavel.jpeg',
    quote: 'Oficialmente nós, para todo sempre. 💍',
  },
  {
    id: '2021-pandemia',
    year: 2021,
    title: 'Juntos em casa',
    photo: '2021pandemia.jpeg',
    quote: 'Mesmo na pandemia, nosso lar virou o lugar mais seguro do mundo. 🏠',
  },
  {
    id: '2022-maragogi',
    year: 2022,
    title: 'Maragogi',
    photo: '2022maragogi2.jpeg',
    quote: 'Piscinas naturais e memórias azuis demais. 🐠',
  },
  {
    id: '2023-pipa',
    year: 2023,
    title: 'Pipa',
    photo: '2023pipa.jpeg',
    quote: 'Falésias, pôr do sol e amor no ar. 🌅',
  },
  {
    id: '2023-pipa2',
    year: 2023,
    title: 'Pipa de novo',
    photo: '2023pipa2.jpeg',
    quote: 'Voltar para Pipa só provou que a gente nunca se cansa desse lugar. 💕',
  },
  {
    id: '2023-pipa3',
    year: 2023,
    title: 'Mais um dia em Pipa',
    photo: '2023pipa3.jpeg',
    quote: 'Cada foto aqui é um pedacinho de felicidade guardado. 📸',
  },
  {
    id: '2023-gravata',
    year: 2023,
    title: 'Gravatá',
    photo: '2023gravata.jpeg',
    quote: 'Frio gostoso, serra e abraço apertado. ☁️',
  },
  {
    id: '2023-corrida',
    year: 2023,
    title: 'Corrida 5 km',
    photo: '2023corrida5km.jpeg',
    quote: 'Correndo lado a lado — nossa meta é sempre chegar juntos. 🏃‍♂️💕',
  },
  {
    id: 'piranhas-alagoas',
    year: 2024,
    title: 'Piranhas Alagoas',
    photo: 'piranhasAlagoas.jpeg',
    quote: 'Viagem para Piranhas Alagoas, uma das melhores viagens que já fizemos juntos.',
  },
  {
    id: '2024-belo-horizonte',
    year: 2024,
    title: 'Belo Horizonte',
    photo: 'BhprimeiraviagemAviao.jpeg',
    quote: 'A primeira viagem de aviãom, Obrigado por ser a pessoa que voce é. 💕',
  },
  {
    id: '2024-belo-horizonte1',
    year: 2024,
    title: 'Belo Horizonte',
    photo: 'bh.jpeg',
    quote: 'Belo Horizonte, novamente.',
  },
  {
    id: '2024-gramado',
    year: 2024,
    title: 'Gramado',
    photo: 'gramado.jpeg',
    quote: 'Viagem para Gramado, uma das melhores viagens que já fizemos juntos.',
  },
  {
    id: '2024-gramado2',
    year: 2024,
    title: 'Gramado de novo',
    photo: 'gramadopedidocasamento.jpeg',
    quote: 'Gramado, gramado, gramado... De novo?',
  },
  {
    id: '2025-chile',
    year: 2025,
    title: 'Chile',
    photo: 'chile.jpeg',
    quote: 'Neve, montanhas e a gente descobrindo o mundo juntos. 🏔️',
  },
  {
    id: '2026',
    year: 2026,
    title: '2026',
    photo: '2026.jpeg',
    quote: '2026, 2026, 2026... De novo?',
  }
]

// Mapa de viagens — lugares marcados no story do mapa.
// lat/lng: coordenadas (Google Maps → clique direito → copiar coordenadas).
// photo: arquivo em src/assets/fotos/ (use o nome exato do arquivo).
export const travelPlaces = [
  
  {
    id: 'chile',
    name: 'Chile',
    lat: -33.4489,
    lng: -70.6693,
    photo: 'chile.jpeg',
    memory: 'Neve, montanhas e a gente descobrindo o mundo juntos. 🏔️',
  },
  {
    id: 'maragogi',
    name: 'Maragogi',
    lat: -9.0122,
    lng: -35.2227,
    photo: '2022maragogi2.jpeg',
    memory: 'Piscinas naturais e memórias azuis demais. 🐠',
  },
  {
    id: 'pipa2',
    name: 'Pipa',
    lat: -6.2294,
    lng: -35.0489,
    photo: '2023pipa2.jpeg',
    memory: 'Falésias, pôr do sol e amor no ar. 🌅',
  },
  {
    id: 'pipa3',
    name: 'Pipa',
    lat: -6.2210,
    lng: -35.0410,
    photo: '2023pipa3.jpeg',
    memory: 'Pipa, pipa, pipa... De novo?',
  },
  {
    id: 'gravata',
    name: 'Gravatá',
    lat: -8.2011,
    lng: -35.5647,
    photo: '2023gravata.jpeg',
    memory: 'Frio gostoso, serra e abraço apertado. ☁️',
  },
  {
    id: 'corrida-5km',
    name: 'Recife',
    lat: -8.0476,
    lng: -34.877,
    photo: '2023corrida5km.jpeg',
    memory: 'Correndo lado a lado — nossa meta é sempre chegar juntos. 🏃‍♂️💕',
  },
  {
    id: 'primeira-viagem',
    name: 'Maracaípe',
    lat: -8.5131,
    lng: -35.0421,
    photo: '2019primeiraviagem.jpeg',
    memory: 'Essa foto representa bem nosso primeiro ano de namoro. Sorrisos bobos que me trouxeram uma felicidade imensa. Obrigado por ser tanto da minha vida. Eu te amo 💕',
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

// Quebra-cabeça com foto do casal (story interativo).
// Coloque a imagem em src/assets/fotos/ e aponte "photo" para o nome do arquivo.
export const jigsawPuzzle = {
  photo: 'fotomaisespecial.jpg',
  rows: 4,
  cols: 4,
  title: 'Quebra-cabeça do amor',
  subtitle: 'Arraste e solte em outra peça — ou toque duas para trocar 🧩',
  completionMessage: 'Prontinho! Mais uma memória nossa montada com amor 💕',
}

// Desbloqueio progressivo dos stories (Dia dos Namorados).
export const valentinesDay = '2026-06-12'

// Fallback local quando VITE_UNLOCK_MODE=local (dev sem Supabase).
// Horarios em America/Sao_Paulo (BRT).
export const storySchedule = [
  { storyId: 'time', title: 'Tempo juntos', sortOrder: 1, unlockAt: '2026-06-12T00:00:00-03:00' },
  { storyId: 'timeline', title: 'Timeline', sortOrder: 2, unlockAt: '2026-06-12T08:00:00-03:00' },
  { storyId: 'map', title: 'Mapa', sortOrder: 3, unlockAt: '2026-06-12T11:00:00-03:00' },
  { storyId: 'hearts', title: 'Caça aos corações', sortOrder: 4, unlockAt: '2026-06-12T14:00:00-03:00' },
  { storyId: 'puzzle', title: 'Quebra-cabeça', sortOrder: 5, unlockAt: '2026-06-12T15:30:00-03:00' },
  { storyId: 'wheel', title: 'Roleta da sorte', sortOrder: 6, unlockAt: '2026-06-12T17:00:00-03:00' },
  { storyId: 'quiz', title: 'Quiz', sortOrder: 7, unlockAt: '2026-06-12T20:00:00-03:00' },
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

export function resolvePuzzlePhoto(config) {
  const key = stem(config?.photo || 'puzzle')
  if (key && photoByStem[key]) return photoByStem[key]
  return makePlaceholder(config?.title || 'Nossa foto')
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
