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

# ⭕ Tres en Raya (Accesible y Multilingüe) ❌

Un proyecto *open-source* de Tres en Raya desarrollado con **HTML5, CSS3 y JavaScript puro**. 

El enfoque principal de este proyecto es el **diseño inclusivo (Accesibilidad / A11y)**, permitiendo que personas ciegas, con baja visión, daltonismo o limitaciones motoras jueguen fácilmente usando lectores de pantalla o solo el teclado, además de contar con un oponente de Inteligencia Artificial.

## ✨ Características y Mejoras Implementadas

### ♿ Accesibilidad (A11y)
* **Soporte para Lectores de Pantalla:** Uso de HTML semántico (`<button>`, `<dialog>`) combinado con atributos dinámicos `aria-label`, `role="grid"`, `aria-modal` y regiones `aria-live` para anunciar coordenadas, turnos y resultados en tiempo real.
* **Navegación por Teclado:** Soporte completo para la tecla `Tab` y movimiento inteligente por el tablero usando las **Teclas de Dirección (`↑`, `↓`, `←`, `→`)** con gestión dinámica de `tabindex` y bordes de enfoque de alta visibilidad.
* **Baja Visión y Daltonismo:** Interfaz unificada en tema oscuro de alto contraste (`#121212`) con paleta segura para daltónicos (Cian `#00ecff` para la **X** vs. Ámbar `#ffb700` para el **O**).

### 🌍 Internacionalización (i18n)
* Cambio dinámico de idioma en la pantalla inicial cargado desde un archivo externo `languages.json`.
* Soporte para **Inglés, Portugués (BR y PT), Español, Francés y Alemán**.

### 🤖 Modos de Juego
* **Jugador vs. Jugador (PvP):** Modo clásico local con nombres personalizados.
* **Jugador vs. Máquina (PvE):** Enfréntate a una Inteligencia Artificial capaz de detectar jugadas ganadoras y bloquear las amenazas del jugador.

## 🚀 Cómo Ejecutar Localmente

Dado que el juego carga las traducciones desde un archivo `languages.json` externo mediante `fetch()`, abrir el `index.html` directamente en el navegador (`file://`) puede ser bloqueado por políticas de seguridad (CORS). Para ejecutarlo en tu equipo:

1. Clona este repositorio:
   ```bash
   git clone https://github.com
   ```
2. Abre la carpeta del proyecto en **VS Code** (o en tu editor preferido).
3. Inicia un servidor local (por ejemplo, usando la extensión **Live Server** en VS Code o ejecutando `npx serve` en la terminal).

## 🛠️ Tecnologías Utilizadas
* **HTML5** (Etiquetas semánticas y atributos WAI-ARIA)
* **CSS3** (CSS Grid, Flexbox, Variables CSS, Diseño Responsivo)
* **JavaScript (ES6+)** (Factory Functions, Module Pattern, Fetch API asíncrona)

## 🤝 Créditos y Contribuciones
* Proyecto base original por **Marc Frances**.
* Mejoras de accesibilidad, internacionalización e IA por **[Tu Nombre / Tu GitHub]**.

¡Las contribuciones, *issues* y sugerencias son bienvenidas!