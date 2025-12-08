const products = [
    {
        id: 1,
        name: "Modern Chair",
        price: 299,
        image: "https://images.unsplash.com/photo-1760716478137-d861d5b354e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description:
            "Elegant modern chair with premium fabric upholstery. Perfect for any contemporary living space. Features ergonomic design for maximum comfort.",
    },
    {
        id: 2,
        name: "Designer Lamp",
        price: 149,
        image: "https://images.unsplash.com/photo-1702505973200-cce1a216f92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description:
            "Contemporary designer lamp with adjustable brightness. Adds a touch of sophistication to your workspace or bedroom. Energy-efficient LED technology.",
    },
    {
        id: 3,
        name: "Ceramic Vase",
        price: 79,
        image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description:
            "Handcrafted ceramic vase with minimalist design. Perfect for displaying fresh flowers or as a standalone decorative piece. Made by local artisans.",
    },
    {
        id: 4,
        name: "Coffee Table",
        price: 499,
        image: "https://images.unsplash.com/photo-1617638924751-cc232f82ecf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description:
            "Solid wood coffee table with modern finish. Sturdy construction with clean lines. Perfect centerpiece for your living room.",
    },
    {
        id: 5,
        name: "Wall Clock",
        price: 89,
        image: "https://images.unsplash.com/photo-1566663409293-585e129d2e71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description:
            "Minimalist wall clock with silent movement. Features clean design that complements any interior. Battery operated for easy installation.",
    },
    {
        id: 6,
        name: "Decorative Set",
        price: 199,
        image: "https://images.unsplash.com/photo-1711564354293-30760984899e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description:
            "Curated decorative set including multiple pieces. Each item carefully selected to create a cohesive aesthetic. Perfect for styling shelves and surfaces.",
    },
];

const app = {
    cart: [],
    currentPage: "home",
    selectedProduct: null,
    menuOpen: false,

    init() {
        this.renderProducts();
        this.updateCartBadge();
    },

    navigateTo(page) {
        document
            .querySelectorAll(".page")
            .forEach(p => p.classList.remove("active"));
        document.getElementById(`${page}-page`).classList.add("active");
        this.currentPage = page;

        if (page === "cart") {
            this.renderCart();
        }

        window.scrollTo(0, 0);
    },

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
        const menu = document.getElementById("mobile-menu");
        const icon = document.getElementById("menu-icon");

        if (this.menuOpen) {
            menu.classList.add("open");
            icon.innerHTML =
                '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
        } else {
            menu.classList.remove("open");
            icon.innerHTML =
                '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>';
        }
    },

    renderProducts() {
        const grid = document.getElementById("product-grid");
        grid.innerHTML = products
            .map(
                product => `
                    <button class="product-card" onclick="app.viewProduct(${product.id})">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">$${product.price}</div>
                    </button>
                `
            )
            .join("");
    },

    viewProduct(productId) {
        this.selectedProduct = products.find(p => p.id === productId);
        this.renderProductDetail();
        this.navigateTo("product");
    },

    renderProductDetail() {
        const product = this.selectedProduct;
        document.getElementById("product-detail").innerHTML = `
                    <div class="product-detail">
                        <div class="product-detail-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h1>${product.name}</h1>
                            <div class="price">$${product.price}</div>
                            <div class="product-description">
                                <p>${product.description}</p>
                            </div>
                            <div class="features">
                                <h3>Features</h3>
                                <ul>
                                    <li>• Premium quality materials</li>
                                    <li>• Carefully crafted design</li>
                                    <li>• Durable construction</li>
                                    <li>• Easy to maintain</li>
                                </ul>
                            </div>
                            <button class="add-to-cart-button" onclick="app.addToCart(${product.id})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
    },

    addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = this.cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.updateCartBadge();
        alert("Added to cart!");
    },

    updateQuantity(productId, quantity) {
        if (quantity === 0) {
            this.removeFromCart(productId);
        } else {
            const item = this.cart.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
                this.updateCartBadge();
                this.renderCart();
            }
        }
    },

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartBadge();
        this.renderCart();
    },

    updateCartBadge() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cart-badge-desktop").textContent = count;
        document.getElementById("cart-badge-mobile").textContent = count;
        document.getElementById("cart-count-menu").textContent = count;
    },

    renderCart() {
        const container = document.getElementById("cart-content");

        if (this.cart.length === 0) {
            container.innerHTML = `
                        <div class="empty-cart">
                            <p>Your cart is empty</p>
                            <button class="add-to-cart-button" onclick="app.navigateTo('home')">
                                Continue Shopping
                            </button>
                        </div>
                    `;
            return;
        }

        const subtotal = this.cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        const shipping = 15;
        const total = subtotal + shipping;

        container.innerHTML = `
                    <div class="cart-layout">
                        <div class="cart-items">
                            ${this.cart
                                .map(
                                    item => `
                                <div class="cart-item">
                                    <div class="cart-item-image">
                                        <img src="${item.image}" alt="${
                                        item.name
                                    }">
                                    </div>
                                    <div class="cart-item-info">
                                        <div class="cart-item-name">${
                                            item.name
                                        }</div>
                                        <div class="cart-item-price">$${
                                            item.price
                                        }</div>
                                        <div class="quantity-controls">
                                            <button class="quantity-button" onclick="app.updateQuantity(${
                                                item.id
                                            }, ${item.quantity - 1})">
                                                <svg class="icon" style="width: 16px; height: 16px;" viewBox="0 0 24 24">
                                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                                </svg>
                                            </button>
                                            <div class="quantity-display">${
                                                item.quantity
                                            }</div>
                                            <button class="quantity-button" onclick="app.updateQuantity(${
                                                item.id
                                            }, ${item.quantity + 1})">
                                                <svg class="icon" style="width: 16px; height: 16px;" viewBox="0 0 24 24">
                                                    <line x1="12" y1="5" x2="12" y2="19"/>
                                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="cart-item-actions">
                                        <button class="remove-button" onclick="app.removeFromCart(${
                                            item.id
                                        })">
                                            <svg class="icon" viewBox="0 0 24 24">
                                                <polyline points="3 6 5 6 21 6"/>
                                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                                            </svg>
                                        </button>
                                        <div class="cart-item-total">$${(
                                            item.price * item.quantity
                                        ).toFixed(2)}</div>
                                    </div>
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                        <div class="order-summary">
                            <h2>Order Summary</h2>
                            <div class="summary-line">
                                <span>Subtotal</span>
                                <span>$${subtotal.toFixed(2)}</span>
                            </div>
                            <div class="summary-line">
                                <span>Shipping</span>
                                <span>$${shipping.toFixed(2)}</span>
                            </div>
                            <div class="summary-line total">
                                <span>Total</span>
                                <span>$${total.toFixed(2)}</span>
                            </div>
                            <button class="checkout-button" onclick="alert('Checkout functionality would go here!')">
                                Checkout
                            </button>
                            <button class="continue-shopping-button" onclick="app.navigateTo('home')">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                `;
    },
};

// Initialize app
app.init();
