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

# ⭕ Tic-Tac-Toe (Barrierefrei & Mehrsprachig) ❌

Ein *Open-Source*-Projekt eines barrierefreien und mehrsprachigen Tic-Tac-Toe-Webspiels, entwickelt mit reinem **HTML5, CSS3 und Vanilla JavaScript**. 

Der Schwerpunkt dieses Projekts liegt auf **inklusivem Design (Barrierefreiheit / A11y)**, sodass Menschen mit Sehbehinderungen, Farbenblindheit oder motorischen Einschränkungen das Spiel problemlos mit Screenreadern oder reiner Tastaturnavigation spielen können – ergänzt durch einen intelligenten KI-Gegner.

## ✨ Funktionen & Verbesserungen

### ♿ Barrierefreiheit (A11y)
* **Screenreader-Unterstützung:** Semantisches HTML (`<button>`, `<dialog>`) kombiniert mit dynamischen `aria-label`-, `role="grid"`-, `aria-modal`- und `aria-live`-Attributen, um Spielfeldpositionen, Spielzüge und Ergebnisse in Echtzeit anzusagen.
* **Tastaturnavigation:** Vollständige Unterstützung für die `Tab`-Taste sowie intelligente **Pfeiltasten-Navigation (`↑`, `↓`, `←`, `→`)** innerhalb des Spielfelds mit dynamischer `tabindex`-Verwaltung und gut sichtbaren Fokusrahmen.
* **Sehschwäche & Farbenblindheit:** Einheitliches dunkles Kontrast-Design (`#121212`) mit einer für Farbenblinde optimierten Farbpalette (Cyan `#00ecff` für **X** vs. Bernstein `#ffb700` für **O**).

### 🌍 Internationalisierung (i18n)
* Dynamische Sprachauswahl beim Spielstart über eine externe `languages.json`-Datei.
* Unterstützt **Englisch, Portugiesisch (BR & PT), Spanisch, Französisch und Deutsch**.

### 🤖 Spielmodi
* **Spieler gegen Spieler (PvP):** Klassischer lokaler Mehrspielermodus mit eigenen Spielernamen.
* **Spieler gegen KI (PvE):** Spiele gegen einen Computergegner, der Gewinnzüge erkennt und drohende Niederlagen blockiert.

## 🚀 Lokale Ausführung

Da das Spiel Übersetzungen aus einer externen `languages.json`-Datei über `fetch()` lädt, kann das direkte Öffnen der `index.html` im Browser (`file://`) durch Sicherheitsrichtlinien (CORS) blockiert werden. So startest du es lokal:

1. Klone dieses Repository:
   ```bash
   git clone https://github.com
   ```
2. Öffne den Projektordner in **VS Code** (oder deinem bevorzugten Editor).
3. Starte einen lokalen Server (z. B. mit der **Live Server**-Erweiterung in VS Code oder über `npx serve` im Terminal).

## 🛠️ Verwendete Technologien
* **HTML5** (Semantische Tags & WAI-ARIA-Attribute)
* **CSS3** (CSS Grid, Flexbox, CSS-Variablen, Responsive Design)
* **JavaScript (ES6+)** (Factory Functions, Module Pattern, Asynchrone Fetch API)

## 🤝 Danksagungen & Mitwirken
* Ursprüngliches Basisprojekt von **Marc Frances**.
* Erweiterungen für Barrierefreiheit, Internationalisierung und KI von **[Dein Name / Dein GitHub]**.

Beiträge, *Issues* und Verbesserungsvorschläge sind herzlich willkommen!