<p align="center">
  <a href="README.md">
    <img src="https://flagcdn.com" alt="English"> English
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="locales/README.pt-BR.md">
    <img src="https://flagcdn.com" alt="Português (Brasil)"> Português (BR)
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="locales/README.pt-PT.md">
    <img src="https://flagcdn.com" alt="Português (Portugal)"> Português (PT)
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="locales/README.es.md">
    <img src="https://flagcdn.com" alt="Español"> Español
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="locales/README.fr.md">
    <img src="https://flagcdn.com" alt="Français"> Français
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="locales/README.de.md">
    <img src="https://flagcdn.com" alt="Deutsch"> Deutsch
  </a>
</p>

---

# ⭕ Tic-Tac-Toe (Accessible & Multilingual) ❌

An open-source, accessible, and multilingual Tic-Tac-Toe web game built with pure **HTML5, CSS3, and Vanilla JavaScript**. 

This project focuses on **inclusive design (A11y)**, allowing players with visual impairments, color blindness, or motor limitations to play seamlessly using screen readers or keyboard-only navigation, alongside a smart AI opponent.

## ✨ Key Features & Improvements

### ♿ Accessibility (A11y)
* **Screen Reader Support:** Semantic HTML (`<button>`, `<dialog>`) paired with dynamic `aria-label`, `role="grid"`, `aria-modal`, and `aria-live` regions to announce board coordinates, cell states, turns, and game results in real time.
* **Keyboard Navigation:** Full support for `Tab` navigation and custom **Arrow Key (`↑`, `↓`, `←`, `→`)** grid movement with dynamic `tabindex` management and high-visibility focus rings.
* **Visual & Color Blindness Friendly:** High-contrast dark theme by default (`#121212` background) using a color-blind-safe palette (Cyan `#00ecff` for **X** vs. Amber `#ffb700` for **O**).

### 🌍 Internationalization (i18n)
* Dynamic language switching on startup via an external `languages.json` dictionary.
* Supports **English, Portuguese (BR & PT), Spanish, French, and German**.

### 🤖 Game Modes
* **Player vs. Player (PvP):** Classic local multiplayer with custom player names.
* **Player vs. AI (PvE):** Play against a smart computer opponent capable of detecting winning moves and blocking the player's threats.

## 🚀 How to Run Locally

Because this project fetches translations from an external `languages.json` file, running it directly via `file://` may trigger browser CORS restrictions. To run it locally:

1. Clone this repository:
   ```bash
   git clone https://github.com
   ```
2. Open the project folder in **VS Code** (or your preferred editor).
3. Start a local server (e.g., using the **Live Server** extension in VS Code or running `npx serve` in the terminal).

## 🛠️ Technologies Used
* **HTML5** (Semantic tags & WAI-ARIA attributes)
* **CSS3** (CSS Grid, Flexbox, Custom Properties, Responsive Design)
* **JavaScript (ES6+)** (Factory Functions, Module Pattern, Async/Await Fetch API)

## 🤝 Credits & Contributing
* Original base project by **Marc Frances**.
* Accessibility, i18n, and AI features contributed by **[Your Name/GitHub Handle]**.

Contributions, issues, and feature requests are welcome!