// Banco de questões do protótipo.
// Todas as questões abaixo são AUTORAIS (criadas para este protótipo),
// não são questões oficiais do ENEM.
//
// "correta" é a posição da alternativa certa na lista:
// 0 = A, 1 = B, 2 = C, 3 = D, 4 = E.
// Cada "id" precisa ser único: ele é usado para lembrar o que já foi respondido.

const MATERIAS = [
  {
    id: "matematica",
    nome: "Matemática",
    icone: "∑",
    questoes: [
      {
        id: "mat-1",
        enunciado:
          "Uma camiseta custa R$ 80,00. Em uma promoção, o preço foi reduzido em 25%. Qual é o novo preço da camiseta?",
        alternativas: [
          "R$ 55,00",
          "R$ 60,00",
          "R$ 65,00",
          "R$ 70,00",
          "R$ 75,00",
        ],
        correta: 1,
        explicacao: "25% de 80 é 20. Então 80 − 20 = 60.",
      },
      {
        id: "mat-2",
        enunciado:
          "Um carro mantém velocidade média constante de 80 km/h. Quantos quilômetros ele percorre em 2 horas e 30 minutos?",
        alternativas: ["160 km", "180 km", "190 km", "200 km", "240 km"],
        correta: 3,
        explicacao: "2 h 30 min = 2,5 h. Distância = 80 × 2,5 = 200 km.",
      },
      {
        id: "mat-3",
        enunciado: "Qual é o valor de x na equação 3x + 5 = 20?",
        alternativas: ["5", "4", "3", "6", "7"],
        correta: 0,
        explicacao: "3x = 20 − 5 = 15, então x = 15 ÷ 3 = 5.",
      },
    ],
  },
  {
    id: "linguagens",
    nome: "Linguagens",
    icone: "Aa",
    questoes: [
      {
        id: "lin-1",
        enunciado:
          'Na frase "Seus olhos são dois oceanos", qual figura de linguagem foi utilizada?',
        alternativas: [
          "Metonímia",
          "Metáfora",
          "Ironia",
          "Hipérbole",
          "Antítese",
        ],
        correta: 1,
        explicacao:
          'Os olhos são identificados diretamente com oceanos, sem usar "como". Isso é uma metáfora.',
      },
      {
        id: "lin-2",
        enunciado:
          'Na frase "Prefiro café, mas ela prefere chá", a palavra "mas" expressa ideia de:',
        alternativas: [
          "Causa",
          "Adição",
          "Oposição",
          "Conclusão",
          "Finalidade",
        ],
        correta: 2,
        explicacao:
          '"Mas" é uma conjunção adversativa: liga duas ideias que se opõem.',
      },
      {
        id: "lin-3",
        enunciado:
          "Assinale a alternativa que está de acordo com a norma-padrão da língua portuguesa.",
        alternativas: [
          "Houveram muitos problemas na reunião.",
          "Fazem dois anos que ele viajou.",
          "Haviam várias pessoas na fila.",
          "Existe vários motivos para isso.",
          "Faz dois anos que ele viajou.",
        ],
        correta: 4,
        explicacao:
          'Os verbos "haver" (no sentido de existir) e "fazer" (indicando tempo) são impessoais e ficam no singular. Já "existir" concorda com o sujeito ("existem vários motivos").',
      },
    ],
  },
  {
    id: "natureza",
    nome: "Ciências da Natureza",
    icone: "⚛",
    questoes: [
      {
        id: "nat-1",
        enunciado:
          "Qual organela celular é a principal responsável pela produção de energia (ATP) na respiração celular?",
        alternativas: [
          "Núcleo",
          "Ribossomo",
          "Lisossomo",
          "Mitocôndria",
          "Complexo golgiense",
        ],
        correta: 3,
        explicacao:
          "A mitocôndria é onde ocorre a maior parte da respiração celular aeróbica, liberando energia na forma de ATP.",
      },
      {
        id: "nat-2",
        enunciado:
          "Em um circuito, a tensão elétrica é de 12 V e a resistência é de 4 Ω. Qual é a corrente elétrica, segundo a Lei de Ohm (U = R × i)?",
        alternativas: ["0,33 A", "3 A", "8 A", "16 A", "48 A"],
        correta: 1,
        explicacao: "i = U ÷ R = 12 ÷ 4 = 3 A.",
      },
      {
        id: "nat-3",
        enunciado:
          "Qual gás é o principal liberado na queima de combustíveis fósseis e contribui para intensificar o efeito estufa?",
        alternativas: [
          "Oxigênio",
          "Nitrogênio",
          "Dióxido de carbono",
          "Hélio",
          "Argônio",
        ],
        correta: 2,
        explicacao:
          "A queima de combustíveis fósseis libera dióxido de carbono (CO₂), um dos principais gases do efeito estufa.",
      },
    ],
  },
  {
    id: "humanas",
    nome: "Ciências Humanas",
    icone: "◍",
    questoes: [
      {
        id: "hum-1",
        enunciado:
          "A Revolução Industrial, no século XVIII, teve início em qual país?",
        alternativas: [
          "Estados Unidos",
          "Inglaterra",
          "França",
          "Alemanha",
          "Itália",
        ],
        correta: 1,
        explicacao:
          "A Inglaterra foi pioneira, com mecanização da produção têxtil e uso da máquina a vapor.",
      },
      {
        id: "hum-2",
        enunciado: "Qual é o maior bioma brasileiro em extensão territorial?",
        alternativas: [
          "Cerrado",
          "Mata Atlântica",
          "Amazônia",
          "Caatinga",
          "Pampa",
        ],
        correta: 2,
        explicacao:
          "A Amazônia ocupa cerca de metade do território brasileiro.",
      },
      {
        id: "hum-3",
        enunciado:
          "Em que ano o Brasil declarou a sua independência de Portugal?",
        alternativas: ["1808", "1889", "1822", "1930", "1964"],
        correta: 2,
        explicacao:
          "A independência foi proclamada por Dom Pedro I em 7 de setembro de 1822.",
      },
    ],
  },
];
