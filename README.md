# Nível UP ENEM

O Level UP ENEM é uma aplicação web interativa desenvolvida para auxiliares estudantes na preparação para o Exame Nacional do Ensino Médio em uma mecânica de gamificação.

---

## 1. Visão Geral

Uma plataforma transforma a resolução de questões em um sistema de progresso de nove:
- Cada acerto concede 10 XP na matéria correspondente.
- A cada 50 XP acumulados, o usuário avança de nível na área de conhecimento.
- A pontuação de XP é atribuída às primeiras tentativas de cada questão, evitando pontuações duplicadas.
- O progresso do usuário é mantido via armamento local do navegador (localStorage).

---

## 2. Tecnologias Utilizadas

- HTML5 (Estruturação semântica e acessibilidade)
- CSS3 (Layout flexível/grau, variáveis CSS, suporte natural a preferências de temas do sistema)
- JavaScript ES6+ (Manipulação do DOM e persistência local)

---

## 3. Estrutura do Projeto

- `índice.html`: Documento principal da aplicação e estrutura de interface.
- `css/estilo.css`: Estilização, regras de responsividade e temas (modo claro/escuro).
- `js/questoes.js`: Estrutura de dados contendo como matrizes e o banco de questões automáticas.
- `js/app.js`: Lógica de gamificação, controle de navegação e gerenciamento do estado local.

---

## 4. Funcionalidades Destacadas

- Navegação por disciplinas: Matemática, Linguagens, Ciências da Natureza e Ciências Humanas.
- Papel de progresso geral com visão detalhada do nível e XP real por matéria.
- Interface responsiva adaptada para dispositivos móveis e desktops.
- Suporte a acessibilidade (navegação por tecido e compatibilidade com leitores de tela).
- Operação para reiniciar e limpar todo o progresso armado.

---

## 5. Como Executivo

1. Clone ou baixe os arquivos do repositório.
2. Abra o arquivo `índice.html` em qualquer navegador web moderno. Não é necessária a instalação de dependências externas.
