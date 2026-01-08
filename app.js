/**
 * REPRESENTERAR EN PRODUKT
 * @class Product
 */
class Product {
    /** @param {Object} data */
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.image = data.image;
        this.desc = data.desc;
    }

    /**
     * Skapar HTML för ett produktkort
     * @param {number} qty - antal av produkten i varukorgen
     * @returns {string}
     */
    renderCard(qty) {
        return `
      <div class="product-card" data-id="${this.id}">
        <div class="product-image">
          <img src="${this.image}" alt="${this.name}">
          <div class="product-controls">
            ${
                qty > 0
                    ? `
                  <button class="action-btn qty-change" data-id="${this.id}" data-change="-1">
                    <i data-lucide="minus" style="width:16px;"></i>
                  </button>
                  <span style="padding:0 8px; font-weight:600;">${qty}</span>
                `
                    : ""
            }

            <button class="action-btn qty-change" data-id="${
                this.id
            }" data-change="1">
              <i data-lucide="plus" style="width:16px;"></i>
            </button>
          </div>
        </div>

        <div style="font-weight:600; margin-top:10px;">${this.name}</div>
        <div style="color:#666;">${this.price} kr</div>
      </div>
    `;
    }
}

/**
 * HANTERAR VARUKORGENS LOGIK
 * @class ShoppingCart
 */
class ShoppingCart {
    /**
     * Shopping cart container.
     * @constructor
     */
    constructor() {
        /** @type {Array<{id:number, name:string, price:number, image:string, desc:string, qty:number}>} */
        this.items = [];
    }

    /**
     * Uppdaterar varukorgen genom att lägga till/ta bort antal av en produkt
     * @param {Product} product
     * @param {number} change - t.ex. +1, -1 eller -qty för "ta bort"
     */
    update(product, change) {
        // Hitta om produkten redan finns i varukorgen
        const item = this.items.find(i => i.id === product.id);

        // Om produkten INTE finns och change är negativt -> inget att göra
        if (!item && change <= 0) return;

        // Om produkten inte finns och change är positivt -> lägg in den
        if (!item && change > 0) {
            this.items.push({ ...product, qty: 1 });
            return;
        }

        // Om produkten finns -> uppdatera mängden
        item.qty += change;

        // Om mängden blir 0 eller mindre -> ta bort produkten helt
        if (item.qty <= 0) {
            this.items = this.items.filter(i => i.id !== product.id);
        }
    }

    /**
     * Rensar hela vagnen.
     * @returns {void}
     */
    clear() {
        this.items = [];
    }

    /**
     * Beräknar totalsumman för varukorgen.
     * @type {number}
     */
    get total() {
        return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    }

    /**
     * Totalt antal produkter i varukorgen (summa av qty).
     * @type {number}
     */
    get count() {
        return this.items.reduce((sum, item) => sum + item.qty, 0);
    }
}

/**
 * HUVUDAPPLIKATION (Controller)
 * @class App
 */
class App {
    /**
     * Main application controller.
     * @param {Array<{id:number,name:string,price:number,image:string,desc:string}>} data - raw product data
     */
    constructor(data) {
        // Skapa Product-objekt av rådata
        this.products = data.map(p => new Product(p));

        // Skapa varukorg
        this.cart = new ShoppingCart();

        // Cachea DOM-element (slipper querySelector överallt)
        this.modal = document.querySelector("#app-modal");
        this.modalBody = document.querySelector("#modal-body");
        this.productGrid = document.querySelector("#product-grid");
        this.cartBadge = document.querySelector("#cart-badge");
        this.navMenu = document.querySelector("#nav-menu");

        this.init();
    }

    /**
     * Startar appen: renderar butik och sätter upp event listeners.
     * @returns {void}
     */
    init() {
        this.renderStore();
        this.setupListeners();
    }

    /**
     * Hämta en produkt utifrån id.
     * @param {number} id
     * @returns {Product|undefined}
     */
    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    /**
     * Hämta antalet (qty) av en produkt i varukorgen.
     * @param {number} productId
     * @returns {number} quantity in cart
     */
    getQtyInCart(productId) {
        const item = this.cart.items.find(i => i.id === productId);
        return item ? item.qty : 0;
    }

    /**
     * Öppnar modalen och (åter)renderar ikoner.
     * @returns {void}
     */
    openModal() {
        this.modal.classList.remove("hidden");
        if (window.lucide && typeof lucide.createIcons === "function")
            lucide.createIcons();
    }

    /**
     * Stänger modalen.
     * @returns {void}
     */
    closeModal() {
        this.modal.classList.add("hidden");
    }

    /**
     * Sätter upp event listeners för hela applikationen.
     * Event delegation används för dynamiskt genererad innehåll.
     * @returns {void}
     */
    setupListeners() {
        // Header: hamburgermeny (mobil)
        document.querySelector("#menu-toggle").addEventListener("click", () => {
            this.navMenu.classList.toggle("open");
        });

        // Header: öppna varukorgen
        document.querySelector("#cart-btn").addEventListener("click", () => {
            this.showCart();
        });

        // Modal: stäng (X)
        document.querySelector("#close-modal").addEventListener("click", () => {
            this.closeModal();
        });

        // Produktgrid (event delegation)
        this.productGrid.addEventListener("click", e => {
            const btn = e.target.closest(".qty-change");
            const card = e.target.closest(".product-card");

            // Klick på plus/minus
            if (btn) {
                e.stopPropagation();

                const productId = parseInt(btn.dataset.id);
                const change = parseInt(btn.dataset.change);

                const product = this.getProductById(productId);
                this.cart.update(product, change);

                this.renderStore();
                return;
            }

            // Klick på kortet -> detaljvy
            if (card) {
                const productId = parseInt(card.dataset.id);
                this.showDetail(productId);
            }
        });

        // Modal-body (event delegation)
        this.modalBody.addEventListener("click", e => {
            // Stäng via "Fortsätt handla" osv
            if (e.target.closest(".close-modal-trigger")) {
                this.closeModal();
                return;
            }

            // Rensa hela varukorgen
            if (e.target.id === "clear-cart-btn") {
                if (confirm("Vill du rensa hela varukorgen?")) {
                    this.cart.clear();
                    this.showCart();
                    this.renderStore();
                }
                return;
            }

            // +/- i varukorgen eller "lägg i varukorg" i detaljvy
            const btn = e.target.closest(".qty-mod");
            if (btn) {
                const productId = parseInt(btn.dataset.id);
                const change = parseInt(btn.dataset.change);

                const product = this.getProductById(productId);
                this.cart.update(product, change);

                // Om vi står i cart-view, rendera om varukorgen direkt
                if (document.querySelector("#cart-view")) {
                    this.showCart();
                }

                this.renderStore();
            }
        });
    }

    /**
     * Renderar produktgrid och uppdaterar cart-badge.
     * @returns {void}
     */
    renderStore() {
        this.cartBadge.innerText = this.cart.count;

        this.productGrid.innerHTML = this.products
            .map(p => p.renderCard(this.getQtyInCart(p.id)))
            .join("");

        // Lucide måste köras efter att HTML lagts in
        if (window.lucide && typeof lucide.createIcons === "function")
            lucide.createIcons();
    }

    /**
     * Template för detaljvy.
     * @param {Product} p
     * @returns {string} HTML
     */
    detailTemplate(p) {
        return `
      <div style="display:flex; gap:30px; flex-wrap:wrap;">
        <img src="${p.image}" style="width:100%; max-width:300px; border-radius:8px;">
        <div style="flex:1; min-width:250px;">
          <h2 style="margin-bottom:10px;">${p.name}</h2>
          <p style="font-weight:bold; font-size:1.5em; margin-bottom:15px;">${p.price} kr</p>
          <p style="color:#666; margin-bottom:25px;">${p.desc}</p>
          <button class="checkout-btn qty-mod" data-id="${p.id}" data-change="1">LÄGG I VARUKORG</button>
        </div>
      </div>
    `;
    }

    /**
     * Visar detaljvy i modal för produkt med angivet id.
     * @param {number} id
     * @returns {void}
     */
    showDetail(id) {
        const p = this.getProductById(id);
        if (!p) return console.warn("Produkt saknas", id);
        this.modalBody.innerHTML = this.detailTemplate(p);
        this.openModal();
    }

    /**
     * Template för tom varukorg.
     * @returns {string} HTML
     */
    emptyCartTemplate() {
        return `
      <div id='cart-view' style='text-align:center; padding:60px 20px;'>
        <h3 style="margin-bottom:15px;">Din varukorg är tom</h3>
        <button class="continue-btn close-modal-trigger" style="max-width:250px;">BÖRJA HANDLA</button>
      </div>
    `;
    }

    /**
     * Template för varukorg med items.
     * @param {string} itemsHtml - redan renderad HTML för cart items
     * @returns {string} HTML
     */
    cartTemplate(itemsHtml) {
        return `
      <div id="cart-view">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px; border-bottom: 2px solid #000; padding-bottom: 10px;">
          <h2 style="margin:0;">Varukorg</h2>
          <button id="clear-cart-btn" class="btn-link-red">RENSA ALLT</button>
        </div>

        <div>${itemsHtml}</div>

        <div class="summary">
          <div class="summary-row"><span>Delsumma</span><span>${
              this.cart.total
          } kr</span></div>
          <div class="summary-row"><span>Frakt</span><span>150 kr</span></div>
          <div class="summary-row" style="font-weight:bold; font-size:1.2em; border-top:1px solid #ddd; padding-top:15px; margin-top:10px;">
            <span>Total</span><span>${this.cart.total + 150} kr</span>
          </div>
          <button class="checkout-btn">GÅ TILL KASSAN</button>
          <button class="continue-btn close-modal-trigger">FORTSÄTT HANDLA</button>
        </div>
      </div>
    `;
    }

    /**
     * Visar varukorgen i modalen. Om tom visas en tom‑template.
     * @returns {void}
     */
    showCart() {
        if (this.cart.items.length === 0) {
            this.modalBody.innerHTML = this.emptyCartTemplate();
            this.openModal();
            return;
        }

        const itemsHtml = this.cart.items
            .map(
                item => `
          <div class="cart-item">
            <img src="${item.image}">
            <div class="cart-item-info">
              <div style="font-weight:600; font-size:1.1em;">${item.name}</div>
              <div style="color:#666;">${item.price} kr</div>

              <div style="margin-top:15px; display:flex; gap:12px; align-items:center;">
                <button class="qty-btn-small qty-mod" data-id="${
                    item.id
                }" data-change="-1">-</button>
                <span style="font-weight:bold; min-width:20px; text-align:center;">${
                    item.qty
                }</span>
                <button class="qty-btn-small qty-mod" data-id="${
                    item.id
                }" data-change="1">+</button>
              </div>
            </div>

            <div style="text-align:right;">
              <div style="font-weight:bold;">${item.price * item.qty} kr</div>
              <button class="btn-link-red qty-mod" data-id="${
                  item.id
              }" data-change="-${item.qty}">Ta bort</button>
            </div>
          </div>
        `
            )
            .join("");

        this.modalBody.innerHTML = this.cartTemplate(itemsHtml);
        this.openModal();
    }
}

// PRODUKTDATA
const furnitureData = [
    {
        id: 1,
        name: "Modern Stol",
        price: 3135,
        image: "https://images.unsplash.com/photo-1760716478137-d861d5b354e8?w=800",
        desc: "Minimalistisk stol för det moderna hemmet.",
    },
    {
        id: 2,
        name: "Designer Lampa",
        price: 1564,
        image: "https://images.unsplash.com/photo-1702505973200-cce1a216f92b?w=800",
        desc: "Skapar ett varmt och behagligt sken i rummet.",
    },
    {
        id: 3,
        name: "Keramisk Vas",
        price: 830,
        image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800",
        desc: "Handgjord vas med unik textur.",
    },
    {
        id: 4,
        name: "Soffbord i Ek",
        price: 5235,
        image: "https://images.unsplash.com/photo-1617638924751-cc232f82ecf9?w=800",
        desc: "Massiv ek som håller i generationer.",
    },
    {
        id: 5,
        name: "Väggklocka",
        price: 935,
        image: "https://images.unsplash.com/photo-1566663409293-585e129d2e71?w=800",
        desc: "Tyst urverk i stilren design.",
    },
    {
        id: 6,
        name: "Dekor-set",
        price: 2090,
        image: "https://images.unsplash.com/photo-1711564354293-30760984899e?w=800",
        desc: "Noggrant utvalda detaljer för bokhyllan.",
    },
    {
        id: 7,
        name: "Loungestol Sammet",
        price: 4120,
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800",
        desc: "Lyxig komfort i mjuk sammet.",
    },
    {
        id: 8,
        name: "Vägghylla Duo",
        price: 1250,
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800",
        desc: "Smidig förvaring med industriell touch.",
    },
];

// Start
const furnitureApp = new App(furnitureData);
