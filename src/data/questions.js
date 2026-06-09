// ============================================================
//  PERGUNTAS DO QUIZ - edite livremente este arquivo.
// ------------------------------------------------------------
//  Cada pergunta segue o modelo:
//  {
//    id: 1,
//    question: "Texto da pergunta?",
//    options: ["Opcao A", "Opcao B", "Opcao C", "Opcao D"],
//    correctIndex: 0,            // indice (0-3) da resposta certa
//    successMessage: "Mostrada quando ela acerta",
//    failMessage: "Mostrada quando ela erra",
//    photo: "recente.jpeg",      // arquivo em src/assets/fotos/
//    card: "Carta/recadinho dessa pergunta (revelado ao acertar)"
//  }
//
//  COMO FUNCIONA A SURPRESA:
//  - Ao ACERTAR uma pergunta, a FOTO e a CARTA dela sao reveladas
//    no final. Perguntas erradas ficam bloqueadas (ate jogar de novo).
//  - card: o textinho/carta referente aquela pergunta e resposta.
//  - FOTO: coloque o arquivo em src/assets/fotos/. O app encontra
//    a foto automaticamente se o NOME do arquivo for um destes:
//      a) o texto da RESPOSTA CORRETA  (ex.: "No colégio.jpg")
//      b) o NUMERO da pergunta         (ex.: "1.jpg")
//      c) o que voce escrever no campo "photo" abaixo (ex.: "praia.jpeg")
//    (a extensao pode ser jpg, jpeg, png, webp, gif ou avif)
//    Depois de adicionar fotos, reinicie o npm run dev.
//
//  Dica: para adicionar perguntas, copie um bloco e mude os campos.
// ============================================================

export const questions = [
  {
    id: 1,
    question: 'Onde nos nos conhecemos?',
    options: [
      'Numa festa de amigos',
      'No colégio',
      'Pela internet',
      'Na faculdade',
    ],
    correctIndex: 1,
    successMessage: 'Voce lembra! Foi ali que tudo comecou 💕',
    failMessage: 'Ah nao... mas eu nunca vou esquecer esse dia 😄',
    photo: 'colegio.jpg',
    card: 'Foi nesse lugar que a nossa historia comecou. Quem diria que dali sairia tudo isso que a gente vive hoje? 💕',
  },
  {
    id: 2,
    question: 'Nossa viagem favorita?',
    options: ['Rio de Janeiro', 'Maracaípe', 'Gramado', 'Chile'],
    correctIndex: 3,
    successMessage: 'Exatamente! Nossa viagem foi incrivel 😋',
    failMessage: 'Quase! Mas foi uma viagem incrivel. 😄',
    photo: 'chile.jpeg',
    card: 'Foi uma viagem incrivel. Foi um momento que ficou pra sempre. �',
  },
  {
    id: 3,
    question: 'Quem disse "eu te amo" primeiro?',
    options: ['Eu', 'Voce', 'Os dois ao mesmo tempo', 'Nao lembramos'],
    correctIndex: 1,
    successMessage: 'Isso mesmo! Um momento que ficou pra sempre 🥰',
    failMessage: 'Hmm... mas o que importa e que a gente disse 💞',
    photo: 'teescolhi.jpeg',
    card: 'O dia que eu disse "eu te amo" foi o dia que tudo ficou mais leve. E eu repetiria mil vezes. 🥰',
  },
  {
    id: 4,
    question: 'Qual foi a nossa primeira viagem de 1 ano juntos?',
    options: [
      'Gramado',
      'Maracaípe',
      'Rio de Janeiro',
      'Porto de galinhas',
    ],
    correctIndex: 1,
    successMessage: 'Exatamente! Foi uma viagem incrivel 😋',
    failMessage: 'Quase! Mas foi uma viagem incrivel. 💕',
    photo: 'maracaipe.jpeg',
    card: 'Foi uma viagem incrivel. Foi um momento que ficou pra sempre. 💕',
  },
  {
    id: 5,
    question: 'Qual música me faz lembrar de você?',
    options: [
      'A nossa musica especial',
      'Aquela do primeiro show',
      'A que toca no carro',
      'Ferrugem - Pra Voce Acreditar',
    ],
    correctIndex: 3,
    successMessage: 'Exatamente! Ferrugem é a melhor música 🎶',
    failMessage: 'Quase! Mas no fundo, todas me lembram de você 🎶',
    photo: 'ferrugem.jpeg',
    card: 'Toda vez que essa musica toca, eu penso em voce. Virou a trilha sonora do nosso amor. 🎶',
  },
]
