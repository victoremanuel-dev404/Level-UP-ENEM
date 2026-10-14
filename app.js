"use strict";

/* =========================================================
   Level UP ENEM — lógica do protótipo
   Depende de js/questoes.js (que define a lista MATERIAS).
   ========================================================= */

// ---------- Regras do jogo (fáceis de mudar aqui) ----------
const CHAVE_STORAGE = "levelup-enem:v1"; // nome da "gaveta" no armazenamento do navegador
const XP_POR_ACERTO = 10;
const XP_POR_NIVEL = 50;
const LETRAS = ["A", "B", "C", "D", "E"];

// ---------- Estado da aplicação ----------
let estado = carregarEstado(); // progresso salvo (XP e questões respondidas)
let telaAtual = "estudo"; // "estudo" | "progresso" | "sobre"
let materiaAtualId = MATERIAS[0].id;
let indiceQuestao = 0;
let jaRespondeuNaTela = false; // impede responder duas vezes a mesma questão

// Atalho para pegar elementos do HTML pelo id
const $ = (id) => document.getElementById(id);

// =========================================================
// 1. PERSISTÊNCIA (localStorage)
// =========================================================

function estadoInicial() {
  const novo = { versao: 1, materias: {} };
  MATERIAS.forEach((m) => {
    novo.materias[m.id] = { xp: 0, respondidas: {} };
  });
  return novo;
}

function carregarEstado() {
  const padrao = estadoInicial();
  try {
    const bruto = localStorage.getItem(CHAVE_STORAGE);
    if (!bruto) return padrao;
    const lido = JSON.parse(bruto);
    // Só aceitamos dados com o formato esperado; o resto fica no valor padrão
    MATERIAS.forEach((m) => {
      const salvo = lido && lido.materias && lido.materias[m.id];
      if (
        salvo &&
        Number.isFinite(salvo.xp) &&
        salvo.xp >= 0 &&
        salvo.respondidas &&
        typeof salvo.respondidas === "object"
      ) {
        padrao.materias[m.id] = {
          xp: salvo.xp,
          respondidas: salvo.respondidas,
        };
      }
    });
  } catch (erro) {
    console.warn("Não foi possível ler o progresso salvo.", erro);
  }
  return padrao;
}

function salvarEstado() {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(estado));
  } catch (erro) {
    console.warn("Não foi possível salvar o progresso.", erro);
  }
}

// =========================================================
// 2. FUNÇÕES AUXILIARES
// =========================================================

function buscarMateria(id) {
  return MATERIAS.find((m) => m.id === id);
}

function nivelDe(xp) {
  return Math.floor(xp / XP_POR_NIVEL) + 1;
}

// Verifica se uma questão já foi respondida alguma vez
function jaRespondida(dados, idQuestao) {
  return Object.prototype.hasOwnProperty.call(dados.respondidas, idQuestao);
}

function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto; // textContent: nunca interpreta HTML
  return el;
}

// =========================================================
// 3. MENU LATERAL
// =========================================================

function montarMenu() {
  const lista = $("menu-materias");
  lista.textContent = "";

  MATERIAS.forEach((m) => {
    const li = document.createElement("li");
    const botao = criarElemento("button", "nav-item");
    botao.type = "button";
    botao.dataset.materia = m.id;

    const icone = criarElemento("span", "nav-icone", m.icone);
    icone.setAttribute("aria-hidden", "true");
    const nome = criarElemento("span", "nav-nome", m.nome);
    const nivel = criarElemento("span", "nav-nivel");

    botao.append(icone, nome, nivel);
    botao.addEventListener("click", () => {
      abrirMateria(m.id);
      fecharMenu();
    });

    li.append(botao);
    lista.append(li);
  });
}

// Atualiza o "Nv X" de cada matéria e destaca o item da tela atual
function atualizarMenu() {
  document.querySelectorAll("[data-materia]").forEach((botao) => {
    const dados = estado.materias[botao.dataset.materia];
    botao.querySelector(".nav-nivel").textContent = "Nv " + nivelDe(dados.xp);
    marcarAtivo(
      botao,
      telaAtual === "estudo" && botao.dataset.materia === materiaAtualId,
    );
  });

  document.querySelectorAll("[data-view]").forEach((botao) => {
    marcarAtivo(botao, telaAtual === botao.dataset.view);
  });
}

function marcarAtivo(botao, ativo) {
  botao.classList.toggle("ativo", ativo);
  if (ativo) botao.setAttribute("aria-current", "page");
  else botao.removeAttribute("aria-current");
}

// Menu em formato de gaveta (celular)
function abrirMenu() {
  document.body.classList.add("menu-aberto");
  $("btn-menu").setAttribute("aria-expanded", "true");
}

function fecharMenu() {
  document.body.classList.remove("menu-aberto");
  $("btn-menu").setAttribute("aria-expanded", "false");
}

// =========================================================
// 4. TROCA DE TELAS
// =========================================================

function mostrarTela(nome) {
  const telas = {
    estudo: $("view-estudo"),
    progresso: $("view-progresso"),
    sobre: $("view-sobre"),
  };
  Object.keys(telas).forEach((chave) => {
    telas[chave].hidden = chave !== nome;
  });
  telaAtual = nome;

  if (nome === "progresso") renderProgresso();
  atualizarMenu();

  window.scrollTo(0, 0);
  $("conteudo").focus({ preventScroll: true });
}

function abrirMateria(id) {
  materiaAtualId = id;
  const materia = buscarMateria(id);
  const dados = estado.materias[id];

  // Começa na primeira questão ainda não respondida (ou na primeira, se todas foram)
  const primeiraNova = materia.questoes.findIndex(
    (q) => !jaRespondida(dados, q.id),
  );
  indiceQuestao = primeiraNova === -1 ? 0 : primeiraNova;

  mostrarTela("estudo");
  renderCabecalho();
  renderQuestao();
}

// =========================================================
// 5. TELA DE ESTUDO
// =========================================================

// Título (matéria + nível) e barra de XP
function renderCabecalho() {
  const materia = buscarMateria(materiaAtualId);
  const xp = estado.materias[materia.id].xp;
  const xpNoNivel = xp % XP_POR_NIVEL;

  $("titulo-materia").textContent = materia.nome;
  $("selo-nivel").textContent = "Nível " + nivelDe(xp);
  $("xp-texto").textContent = xpNoNivel + " / " + XP_POR_NIVEL + " XP";
  $("xp-falta").textContent =
    "Faltam " +
    (XP_POR_NIVEL - xpNoNivel) +
    " XP para o nível " +
    (nivelDe(xp) + 1);

  $("barra").setAttribute("aria-valuenow", String(xpNoNivel));
  $("barra-preenchida").style.width = (xpNoNivel / XP_POR_NIVEL) * 100 + "%";
}

// Desenha a questão atual e suas alternativas
function renderQuestao() {
  const materia = buscarMateria(materiaAtualId);
  const questao = materia.questoes[indiceQuestao];
  const dados = estado.materias[materia.id];

  jaRespondeuNaTela = false;
  $("contador").textContent =
    "Questão " + (indiceQuestao + 1) + " de " + materia.questoes.length;
  $("enunciado").textContent = questao.enunciado;

  const caixa = $("alternativas");
  caixa.textContent = "";
  questao.alternativas.forEach((texto, i) => {
    const rotulo = criarElemento("label", "alternativa");
    const entrada = document.createElement("input");
    entrada.type = "radio";
    entrada.name = "alternativa";
    entrada.value = String(i);

    rotulo.append(
      entrada,
      criarElemento("span", "letra", LETRAS[i] + ")"),
      criarElemento("span", "texto", texto),
    );
    caixa.append(rotulo);
  });

  $("btn-responder").disabled = false;
  $("btn-proxima").hidden = true;
  limparFeedback();

  if (jaRespondida(dados, questao.id)) {
    mostrarFeedback("info", [
      "Você já respondeu esta questão antes. Pode revisar, mas ela não rende XP de novo.",
    ]);
  }
}

function responder(evento) {
  evento.preventDefault(); // evita que o formulário recarregue a página
  if (jaRespondeuNaTela) return;

  const marcada = document.querySelector('input[name="alternativa"]:checked');
  if (!marcada) {
    mostrarFeedback("aviso", ["Escolha uma alternativa antes de responder."]);
    return;
  }

  const materia = buscarMateria(materiaAtualId);
  const questao = materia.questoes[indiceQuestao];
  const dados = estado.materias[materia.id];
  const escolhida = Number(marcada.value);
  const acertou = escolhida === questao.correta;
  const primeiraVez = !jaRespondida(dados, questao.id);

  jaRespondeuNaTela = true;
  let subiuDeNivel = false;

  // XP só é concedido na primeira tentativa de cada questão.
  // Como isso fica salvo, recarregar a página não permite ganhar XP de novo.
  if (primeiraVez) {
    const nivelAntes = nivelDe(dados.xp);
    dados.respondidas[questao.id] = acertou;
    if (acertou) dados.xp += XP_POR_ACERTO;
    subiuDeNivel = nivelDe(dados.xp) > nivelAntes;
    salvarEstado();
  }

  marcarAlternativas(escolhida, questao.correta);

  const mensagens = [];
  if (acertou) {
    mensagens.push(
      primeiraVez
        ? "Correto! +" + XP_POR_ACERTO + " XP"
        : "Correto! (sem XP: você já tinha respondido esta questão)",
    );
  } else {
    mensagens.push(
      "Não foi dessa vez. A resposta certa é a letra " +
        LETRAS[questao.correta] +
        ".",
    );
  }
  mensagens.push(questao.explicacao);
  if (subiuDeNivel) {
    mensagens.push(
      "Level up! Você chegou ao nível " +
        nivelDe(dados.xp) +
        " em " +
        materia.nome +
        ".",
    );
  }
  mostrarFeedback(acertou ? "ok" : "erro", mensagens);

  renderCabecalho();
  atualizarMenu();
  if (subiuDeNivel) animarSelo();

  $("btn-responder").disabled = true;
  $("btn-proxima").hidden = false;
  $("btn-proxima").focus();
}

// Pinta a alternativa certa e a errada, e trava as opções
function marcarAlternativas(escolhida, correta) {
  document.querySelectorAll(".alternativa").forEach((rotulo, i) => {
    rotulo.classList.add("bloqueada");
    rotulo.querySelector("input").disabled = true;
    if (i === correta) rotulo.classList.add("correta");
    else if (i === escolhida) rotulo.classList.add("errada");
  });
}

function proximaQuestao() {
  const materia = buscarMateria(materiaAtualId);
  indiceQuestao = (indiceQuestao + 1) % materia.questoes.length;
  renderQuestao();
}

// ---------- Feedback ----------
function limparFeedback() {
  const caixa = $("feedback");
  caixa.textContent = "";
  caixa.className = "feedback";
}

// tipo: "ok" | "erro" | "aviso" | "info"; mensagens: lista de textos
function mostrarFeedback(tipo, mensagens) {
  const caixa = $("feedback");
  caixa.textContent = "";
  caixa.className = "feedback";
  if (tipo === "ok" || tipo === "erro") caixa.classList.add("feedback-" + tipo);

  mensagens.forEach((texto, i) => {
    const p = criarElemento("p");
    if (i === 0) p.append(criarElemento("strong", "", texto));
    else p.textContent = texto;
    caixa.append(p);
  });
}

function animarSelo() {
  const selo = $("selo-nivel");
  selo.classList.remove("subiu");
  void selo.offsetWidth; // força o navegador a reiniciar a animação
  selo.classList.add("subiu");
}

// =========================================================
// 6. TELA DE PROGRESSO
// =========================================================

function renderProgresso() {
  const lista = $("lista-progresso");
  lista.textContent = "";

  let totalXp = 0;
  let totalAcertos = 0;
  let totalRespondidas = 0;

  MATERIAS.forEach((m) => {
    const dados = estado.materias[m.id];
    const respondidas = m.questoes.filter((q) =>
      jaRespondida(dados, q.id),
    ).length;
    const acertos = m.questoes.filter(
      (q) => dados.respondidas[q.id] === true,
    ).length;
    const xpNoNivel = dados.xp % XP_POR_NIVEL;

    totalXp += dados.xp;
    totalAcertos += acertos;
    totalRespondidas += respondidas;

    const item = criarElemento("li", "prog-item");
    const titulo = criarElemento("h2");
    titulo.append(
      criarElemento("span", "", m.nome),
      criarElemento("span", "selo-nivel", "Nível " + nivelDe(dados.xp)),
    );

    const barra = criarElemento("div", "barra");
    barra.setAttribute("aria-hidden", "true"); // o texto abaixo já diz tudo
    const preenchida = criarElemento("div", "barra-preenchida");
    preenchida.style.width = (xpNoNivel / XP_POR_NIVEL) * 100 + "%";
    barra.append(preenchida);

    const detalhe = criarElemento(
      "p",
      "",
      xpNoNivel +
        " / " +
        XP_POR_NIVEL +
        " XP · " +
        respondidas +
        " de " +
        m.questoes.length +
        " respondidas · " +
        acertos +
        " acertos",
    );

    item.append(titulo, barra, detalhe);
    lista.append(item);
  });

  $("resumo-total").textContent =
    "Total: " +
    totalXp +
    " XP · " +
    totalRespondidas +
    " questões respondidas · " +
    totalAcertos +
    " acertos";
}

function zerarProgresso() {
  const certeza = confirm(
    "Tem certeza? Todo o seu XP e histórico de respostas será apagado.",
  );
  if (!certeza) return;

  estado = estadoInicial();
  salvarEstado();
  renderProgresso();
  atualizarMenu();
}

// =========================================================
// 7. INICIALIZAÇÃO: liga os botões às funções
// =========================================================

montarMenu();

document.querySelectorAll("[data-view]").forEach((botao) => {
  botao.addEventListener("click", () => {
    mostrarTela(botao.dataset.view);
    fecharMenu();
  });
});

$("form-resposta").addEventListener("submit", responder);
$("btn-proxima").addEventListener("click", proximaQuestao);
$("btn-zerar").addEventListener("click", zerarProgresso);

$("btn-menu").addEventListener("click", () => {
  if (document.body.classList.contains("menu-aberto")) fecharMenu();
  else abrirMenu();
});
$("overlay").addEventListener("click", fecharMenu);
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") fecharMenu();
});

abrirMateria(MATERIAS[0].id);
