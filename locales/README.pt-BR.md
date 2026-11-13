<p align="center">
  <a href="../README.md">
    <img src="https://flagcdn.com" alt="English"> English
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="README.pt-BR.md">
    <img src="https://flagcdn.com" alt="Português (Brasil)"> Português (BR)
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="README.pt-PT.md">
    <img src="https://flagcdn.com" alt="Português (Portugal)"> Português (PT)
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="README.es.md">
    <img src="https://flagcdn.com" alt="Español"> Español
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="README.fr.md">
    <img src="https://flagcdn.com" alt="Français"> Français
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="README.de.md">
    <img src="https://flagcdn.com" alt="Deutsch"> Deutsch
  </a>
</p>

---

# ⭕ Jogo da Velha (Acessível e Multilíngue) ❌

Um projeto open-source de Jogo da Velha desenvolvido com **HTML5, CSS3 e JavaScript puro**. 

O foco principal deste projeto é o **design inclusivo (Acessibilidade / A11y)**, permitindo que pessoas cegas, com baixa visão, daltonismo ou limitações motoras joguem com facilidade usando leitores de tela ou apenas o teclado, além de contar com um modo contra a Inteligência Artificial.

## ✨ Funcionalidades e Melhorias Implementadas

### ♿ Acessibilidade (A11y)
* **Suporte a Leitores de Tela:** Uso de HTML semântico (`<button>`, `<dialog>`) combinado com atributos dinâmicos `aria-label`, `role="grid"`, `aria-modal` e regiões `aria-live` para narrar posições, turnos e resultados em tempo real.
* **Navegação por Teclado:** Suporte completo à tecla `Tab` e movimentação inteligente pelo tabuleiro usando as **Setas Direcionais (`↑`, `↓`, `←`, `→`)** com gerenciamento dinâmico de `tabindex` e bordas de foco de alta visibilidade.
* **Baixa Visão e Daltonismo:** Interface unificada em tema escuro de alto contraste (`#121212`) com paleta segura para daltônicos (Ciano `#00ecff` para o **X** vs. Âmbar `#ffb700` para o **O**).

### 🌍 Internacionalização (i18n)
* Troca dinâmica de idioma na tela inicial carregada a partir de um arquivo externo `languages.json`.
* Suporte para **Inglês, Português (BR e PT), Espanhol, Francês e Alemão**.

### 🤖 Modos de Jogo
* **Jogador vs. Jogador (PvP):** Modo clássico local com nomes personalizados.
* **Jogador vs. Máquina (PvE):** Enfrente uma Inteligência Artificial capaz de identificar jogadas de vitória e bloquear as ameaças do jogador.

## 🚀 Como Executar Localmente

Como o jogo carrega as traduções de um arquivo `languages.json` externo via `fetch()`, abrir o `index.html` diretamente pelo navegador (`file://`) pode ser bloqueado por políticas de segurança (CORS). Para rodar na sua máquina:

1. Clone este repositório:
   ```bash
   git clone https://github.com
   ```
2. Abra a pasta do projeto no **VS Code** (ou no editor de sua preferência).
3. Inicie um servidor local (por exemplo, usando a extensão **Live Server** no VS Code ou rodando `npx serve` no terminal).

## 🛠️ Tecnologias Utilizadas
* **HTML5** (Tags semânticas e atributos WAI-ARIA)
* **CSS3** (CSS Grid, Flexbox, Variáveis CSS, Design Responsivo)
* **JavaScript (ES6+)** (Factory Functions, Module Pattern, Fetch API assíncrona)

## 🤝 Créditos e Contribuições
* Projeto base original por **Marc Frances**.
* Melhorias de acessibilidade, internacionalização e IA por **[Seu Nome / Seu GitHub]**.

Contribuições, *issues* e sugestões de melhorias são muito bem-vindas!