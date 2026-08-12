/* ============================================================
   script.js
   Shared logic: WhatsApp config, cart (localStorage), rendering
   helpers used across all pages.
   ============================================================ */

/* ---------------------------------------------------------
   1. STORE CONFIGURATION
   Edit these three values whenever you need to update contact info.
--------------------------------------------------------- */
const CONFIG = {
  whatsappNumber: "919999999999", // digits only, country code first, no +/spaces
  instagramUsername: "velocrochet",
  email: "velocrochet@example.com"
};

/* ---------------------------------------------------------
   2. CART STORAGE HELPERS
   Cart is an array of: { id, name, price, image, qty }
--------------------------------------------------------- */
const CART_KEY = "velocrochet_cart";

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCountBadges();
}

function findProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

/* ---------------------------------------------------------
   3. CART ACTIONS
--------------------------------------------------------- */
function addToCart(productId, qty = 1) {
  const product = findProductById(productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: qty
    });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  if (typeof renderCartPage === "function") renderCartPage();
}

function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart(cart);
  if (typeof renderCartPage === "function") renderCartPage();
}

function clearCart() {
  saveCart([]);
  if (typeof renderCartPage === "function") renderCartPage();
}

function cartItemCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.qty * item.price, 0);
}

/* ---------------------------------------------------------
   4. CART COUNT BADGE (appears in navbar on every page)
--------------------------------------------------------- */
function updateCartCountBadges() {
  const badges = document.querySelectorAll(".cart-count");
  const count = cartItemCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  });
}

/* ---------------------------------------------------------
   5. TOAST (small confirmation message)
--------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById("vc-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "vc-toast";
    toast.className = "vc-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------------------------------------------------------
   6. WHATSAPP ORDER MESSAGE
   Built dynamically from the current cart. Never hard-coded.
--------------------------------------------------------- */
function buildWhatsAppMessage() {
  const cart = getCart();
  let message = "Hi Velocrochet! 🧶\n\nI'd like to order:\n\n";

  cart.forEach((item, index) => {
    const lineTotal = item.qty * item.price;
    message += `${index + 1}. ${item.name} x ${item.qty} — ₹${lineTotal}\n`;
  });

  message += `\nSubtotal: ₹${cartSubtotal()}\n\n`;
  message += "Please confirm availability and delivery charges.\n\n";
  message += "Thank you! 💗";

  return message;
}

function orderOnWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty — add a product first 💗");
    return;
  }
  const text = encodeURIComponent(buildWhatsAppMessage());
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  window.open(url, "_blank");
}

/* Quick single-product "Buy on WhatsApp" from the product page,
   without needing to add to cart first. */
function buyProductOnWhatsApp(productId, qty) {
  const product = findProductById(productId);
  if (!product) return;
  const lineTotal = product.price * qty;
  let message = "Hi Velocrochet! 🧶\n\nI'd like to order:\n\n";
  message += `1. ${product.name} x ${qty} — ₹${lineTotal}\n\n`;
  message += `Subtotal: ₹${lineTotal}\n\n`;
  message += "Please confirm availability and delivery charges.\n\n";
  message += "Thank you! 💗";
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* ---------------------------------------------------------
   7. SHOP PAGE: render product grid, filters, sorting
--------------------------------------------------------- */
function renderShopGrid(filter = "all", sort = "none") {
  const grid = document.getElementById("shop-grid");
  if (!grid) return;

  let items = PRODUCTS.slice();

  if (filter !== "all") {
    items = items.filter(p => p.category === filter || (p.tags && p.tags.includes(filter)));
  }

  if (sort === "low-high") items.sort((a, b) => a.price - b.price);
  if (sort === "high-low") items.sort((a, b) => b.price - a.price);

  grid.innerHTML = items.map(productCardHTML).join("");
}

function productCardHTML(p) {
  return `
    <article class="product-card">
      <a href="product.html?id=${p.id}" class="product-card__image-link">
        <img src="${p.image1 || p.images[0]}" alt="${p.name}" loading="lazy" class="product-card__image">
      </a>
      <div class="product-card__body">
        <p class="product-card__category">${categoryLabel(p.category)}</p>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__price">₹${p.price}</p>
        <div class="product-card__actions">
          <button class="btn btn--outline btn--sm" onclick="addToCart('${p.id}')">Add to Cart</button>
          <a href="product.html?id=${p.id}" class="btn btn--text btn--sm">View Product</a>
        </div>
      </div>
    </article>
  `;
}

function categoryLabel(cat) {
  const map = {
    flowers: "Crochet Flowers",
    keychains: "Keychains",
    "hair-accessories": "Hair Accessories",
    bouquets: "Bouquets",
    gifts: "Gifts"
  };
  return map[cat] || cat;
}

/* Fix: use p.images[0] consistently */
function productCardImage(p) {
  return p.images && p.images[0] ? p.images[0] : "assets/images/placeholder.jpg";
}

/* ---------------------------------------------------------
   8. HOME PAGE: featured & bestseller rows
--------------------------------------------------------- */
function renderHomeSections() {
  const featuredEl = document.getElementById("featured-products");
  const bestsellerEl = document.getElementById("bestseller-products");

  if (featuredEl) {
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
    featuredEl.innerHTML = featured.map(productCardHTML).join("");
  }
  if (bestsellerEl) {
    const bestsellers = PRODUCTS.filter(p => p.bestseller).slice(0, 4);
    bestsellerEl.innerHTML = bestsellers.map(productCardHTML).join("");
  }
}

/* ---------------------------------------------------------
   9. PRODUCT PAGE
--------------------------------------------------------- */
function renderProductPage() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = findProductById(id);

  if (!product) {
    container.innerHTML = `<p>Product not found. <a href="shop.html">Back to shop</a></p>`;
    return;
  }

  document.title = `${product.name} | Velocrochet`;

  const thumbs = product.images.map((img, i) =>
    `<button class="thumb ${i === 0 ? "active" : ""}" data-img="${img}" aria-label="View image ${i + 1}">
       <img src="${img}" alt="${product.name} thumbnail ${i + 1}">
     </button>`
  ).join("");

  const colors = product.colors.map(c => `<span class="color-pill">${c}</span>`).join("");

  container.innerHTML = `
    <div class="product-detail__gallery">
      <img id="main-product-image" src="${product.images[0]}" alt="${product.name}" class="product-detail__main-image">
      <div class="product-detail__thumbs">${thumbs}</div>
    </div>
    <div class="product-detail__info">
      <p class="product-detail__category">${categoryLabel(product.category)}</p>
      <h1 class="product-detail__name">${product.name}</h1>
      <p class="product-detail__price">₹${product.price}</p>
      <p class="product-detail__description">${product.description}</p>
      <div class="product-detail__colors">
        <span class="label">Available colours:</span>
        ${colors}
      </div>
      <div class="qty-selector">
        <button type="button" onclick="stepQty(-1)" aria-label="Decrease quantity">−</button>
        <input id="product-qty" type="number" value="1" min="1" readonly>
        <button type="button" onclick="stepQty(1)" aria-label="Increase quantity">+</button>
      </div>
      <div class="product-detail__actions">
        <button class="btn btn--outline" onclick="addFromProductPage('${product.id}')">Add to Cart</button>
        <button class="btn btn--whatsapp" onclick="buyFromProductPage('${product.id}')">Order on WhatsApp</button>
      </div>
    </div>
  `;

  document.querySelectorAll(".thumb").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("main-product-image").src = btn.dataset.img;
      document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

function stepQty(delta) {
  const input = document.getElementById("product-qty");
  let val = parseInt(input.value, 10) + delta;
  if (val < 1) val = 1;
  input.value = val;
}

function addFromProductPage(id) {
  const qty = parseInt(document.getElementById("product-qty").value, 10);
  addToCart(id, qty);
}

function buyFromProductPage(id) {
  const qty = parseInt(document.getElementById("product-qty").value, 10);
  buyProductOnWhatsApp(id, qty);
}

/* ---------------------------------------------------------
   10. CART PAGE
--------------------------------------------------------- */
function renderCartPage() {
  const container = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  if (!container || !summary) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-cart">Your cart is empty. <a href="shop.html">Browse the shop →</a></p>`;
    summary.innerHTML = "";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-row">
      <img src="${item.image}" alt="${item.name}" class="cart-row__image">
      <div class="cart-row__info">
        <p class="cart-row__name">${item.name}</p>
        <p class="cart-row__price">₹${item.price} each</p>
      </div>
      <div class="qty-selector">
        <button type="button" onclick="changeQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
        <span>${item.qty}</span>
        <button type="button" onclick="changeQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
      </div>
      <p class="cart-row__total">₹${item.qty * item.price}</p>
      <button class="cart-row__remove" onclick="removeFromCart('${item.id}')" aria-label="Remove ${item.name}">✕</button>
    </div>
  `).join("");

  summary.innerHTML = `
    <div class="cart-summary__row">
      <span>Items</span><span>${cartItemCount()}</span>
    </div>
    <div class="cart-summary__row cart-summary__row--total">
      <span>Subtotal</span><span>₹${cartSubtotal()}</span>
    </div>
    <button class="btn btn--whatsapp btn--block" onclick="orderOnWhatsApp()">Order on WhatsApp</button>
    <button class="btn btn--text btn--block" onclick="clearCart()">Clear Cart</button>
  `;
}

/* ---------------------------------------------------------
   11. INIT — runs on every page load
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCountBadges();
  renderHomeSections();
  renderProductPage();
  renderCartPage();

  // Shop page filter/sort wiring
  const filterButtons = document.querySelectorAll("[data-filter]");
  const sortSelect = document.getElementById("sort-select");

  if (document.getElementById("shop-grid")) {
    let activeFilter = "all";
    renderShopGrid(activeFilter, sortSelect ? sortSelect.value : "none");

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        renderShopGrid(activeFilter, sortSelect ? sortSelect.value : "none");
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        renderShopGrid(activeFilter, sortSelect.value);
      });
    }
  }

  // Wire contact/footer placeholders to CONFIG
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    el.href = `https://wa.me/${CONFIG.whatsappNumber}`;
  });
  document.querySelectorAll("[data-instagram-link]").forEach(el => {
    el.href = `https://instagram.com/${CONFIG.instagramUsername}`;
    if (el.dataset.showHandle) el.textContent = `@${CONFIG.instagramUsername}`;
  });
  document.querySelectorAll("[data-email-link]").forEach(el => {
    el.href = `mailto:${CONFIG.email}`;
    if (el.dataset.showEmail) el.textContent = CONFIG.email;
  });
});
