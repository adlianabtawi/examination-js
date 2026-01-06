# ABA Furniture 🛋️

En enkel och responsiv webbshop för möbler byggd med HTML, CSS och JavaScript. Projektet visar en produktkatalog i grid-format och låter användaren öppna produktdetaljer och hantera en varukorg via en modal.

## Funktioner
* **Produktgrid:** Katalog som renderas dynamiskt med JavaScript.
* **Produktkort:** Smidig hantering med plus/minus för att lägga till eller ta bort produkter.
* **Varukorg:** Modal-baserad varukorg som öppnas via kundvagnsikonen.
* **Hantering:** Ändra antal (+/−), ta bort enskilda produkter eller rensa hela varukorgen.
* **Badge:** Visar antal produkter i varukorgen i realtid.
* **Responsiv design:** Header med hamburgermeny för mobilanvändare.
* **Ikoner:** Använder Lucide Icons via CDN.

## Kom igång lokalt

### Alternativ A: VS Code + Live Server (rekommenderas)
1. Ladda ner projektet (ZIP) eller klona repot.
2. Öppna mappen i **Visual Studio Code**.
3. Installera tillägget **Live Server**.
4. Högerklicka på `index.html` och välj **Open with Live Server**.

### Alternativ B: Öppna i webbläsaren
1. Ladda ner projektet.
2. Dubbelklicka på `index.html`.

> **Tips:** Live Server ger snabbare uppdateringar och minskar risken för cache-problem under utveckling.

---

## Teknisk stack
* **HTML5 & CSS3**
* **JavaScript (ES6+)**
* **OOP-struktur:** Använder klasser som `Product`, `ShoppingCart` och `App`.
* **Lucide Icons:** Ikonbibliotek via CDN (menu, shopping-cart, plus, minus, x).

## Projektstruktur
* `index.html` – Sidstruktur (header, main, footer, modal).
* `style.css` – Styling och responsiv layout.
* `app.js` – Logik (OOP), rendering, event listeners och varukorgslogik.
* `logo.png` – Projektets logotyp.

## Så fungerar projektet
* **Product:** Representerar en produkt och renderar dess kort via `renderCard()`.
* **ShoppingCart:** Håller data och logik (items, total, count, update/clear).
* **App:** Kopplar ihop UI och logik; renderar listor, hanterar klick och styr modaler.

---

## Gruppmedlemmar
* Bleart
* Adli
* Anmar

## Licens
Detta är ett skolprojekt och används endast för utbildningssyfte.
