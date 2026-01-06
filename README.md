ABA Furniture 🛋️
En enkel och responsiv webbshop för möbler byggd med HTML, CSS och JavaScript.  
Projektet visar en produktkatalog i grid-format och låter användaren öppna produktdetaljer och hantera en varukorg via en modal.
Funktioner
–	Produktgrid (katalog) som renderas dynamiskt med JavaScript
–	Produktkort med plus/minus för att lägga till/ta bort produkter
–	Varukorg i modal (öppnas via kundvagnsikonen)
–	Ändra antal i varukorgen (+/−), ta bort en produkt eller rensa hela varukorgen
–	Badge vid kundvagn som visar antal produkter i varukorgen
–	Responsiv header med hamburgermeny på mobil
–	Ikoner via Lucide Icons (CDN)
Kom igång lokalt
Alternativ A: VS Code + Live Server (rekommenderas)
1.	Ladda ner projektet (ZIP) eller klona repot.
2.	Öppna mappen i Visual Studio Code.
3.	Installera tillägget Live Server.
4.	Högerklicka på index.html och välj Open with Live Server.
Alternativ B: Öppna i webbläsaren
1.	Ladda ner projektet.
2.	Dubbelklicka på index.html.
> Tips: Live Server ger snabbare uppdateringar och minskar risken för cache-problem.
Teknisk stack
–	HTML5
–	CSS3
–	JavaScript (ES6+)
–	OOP-struktur (klasser: Product, ShoppingCart, App)
–	Lucide Icons via CDN för ikoner (menu, shopping-cart, plus, minus, x)
Projektstruktur
–	index.html – Sidstruktur (header, main, footer, modal)
–	style.css – Styling + responsiv layout
–	app.js – Logik (OOP), rendering, event listeners, varukorg och modal
–	logo.png – Projektets logotyp
Så fungerar projektet (kort)
–	Product representerar en produkt och kan rendera produktkortet via renderCard().
–	ShoppingCart håller varukorgens data och logik (items, total, count, update/clear).
–	App kopplar ihop UI och logik: renderar produkter, lyssnar på klick och visar modal (detaljvy/varukorg).
Gruppmedlemmar
–	Bleart
–	Adli
–	Anmar
Licens
Detta är ett skolprojekt och används för utbildningssyfte.
