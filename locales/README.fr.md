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

# ⭕ Morpion (Accessible et Multilingue) ❌

Un projet *open-source* de jeu de Morpion (Tic-Tac-Toe) développé avec **HTML5, CSS3 et JavaScript pur**. 

L'objectif principal de ce projet est le **design inclusif (Accessibilité / A11y)**, permettant aux personnes aveugles, malvoyantes, daltoniennes ou ayant des limitations motrices de jouer facilement à l'aide de lecteurs d'écran ou uniquement au clavier, tout en proposant un adversaire doté d'une Intelligence Artificielle.

## ✨ Fonctionnalités et Améliorations

### ♿ Accessibilité (A11y)
* **Support des Lecteurs d'Écran :** Utilisation de HTML sémantique (`<button>`, `<dialog>`) associé aux attributs dynamiques `aria-label`, `role="grid"`, `aria-modal` et aux régions `aria-live` pour annoncer les positions, les tours et les résultats en temps réel.
* **Navigation au Clavier :** Prise en charge complète de la touche `Tab` et déplacement intelligent sur la grille à l'aide des **Touches Fléchées (`↑`, `↓`, `←`, `→`)** avec gestion dynamique du `tabindex` et bordures de focus à haute visibilité.
* **Basse Vision et Daltonisme :** Interface unifiée en thème sombre à contraste élevé (`#121212`) avec une palette adaptée aux daltoniens (Cyan `#00ecff` pour le **X** vs. Ambre `#ffb700` pour le **O**).

### 🌍 Internationalisation (i18n)
* Changement dynamique de langue dès l'écran d'accueil chargé depuis un fichier externe `languages.json`.
* Prise en charge de l'**Anglais, du Portugais (BR et PT), de l'Espagnol, du Français et de l'Allemand**.

### 🤖 Modes de Jeu
* **Joueur contre Joueur (PvP) :** Mode multijoueur local classique avec noms personnalisés.
* **Joueur contre IA (PvE) :** Affrontez une Intelligence Artificielle capable de détecter les coups gagnants et de bloquer les menaces du joueur.

## 🚀 Comment Exécuter Localement

Comme le jeu charge les traductions depuis un fichier externe `languages.json` via `fetch()`, ouvrir `index.html` directement dans le navigateur (`file://`) peut être bloqué par les politiques de sécurité (CORS). Pour le lancer sur votre ordinateur :

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com
   ```
2. Ouvrez le dossier du projet dans **VS Code** (ou votre éditeur préféré).
3. Démarrez un serveur local (par exemple, avec l'extension **Live Server** dans VS Code ou en exécutant `npx serve` dans le terminal).

## 🛠️ Technologies Utilisées
* **HTML5** (Balises sémantiques et attributs WAI-ARIA)
* **CSS3** (CSS Grid, Flexbox, Variables CSS, Design Responsive)
* **JavaScript (ES6+)** (Factory Functions, Module Pattern, Fetch API asynchrone)

## 🤝 Crédits et Contributions
* Projet de base original par **Marc Frances**.
* Améliorations d'accessibilité, d'internationalisation et d'IA par **[Votre Nom / Votre GitHub]**.

Les contributions, *issues* et suggestions sont les bienvenues !