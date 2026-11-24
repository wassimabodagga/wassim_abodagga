/* ============================================================
   وسيم ابودقة — منطق المتجر
   ============================================================ */

const products = [
  {
    id: 1,
    name: "مسك الأندلس",
    category: "عطور",
    desc: "عطر شرقي دافئ بمزيج المسك والعنبر، ثبات يدوم طوال اليوم.",
    price: 480, oldPrice: 620, rating: 4.9, badge: "الأكثر مبيعاً", icon: "🧴",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "أوروبا كلاسيك",
    category: "ساعات",
    desc: "ساعة يد كلاسيكية بهيكل معدني وحركة دقيقة وتصميم خالد.",
    price: 1250, oldPrice: 1590, rating: 4.8, badge: "جديد", icon: "⌚",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "نورا الجلدية",
    category: "حقائب",
    desc: "حقيبة يد أنيقة من الجلد الطبيعي بمساحة واسعة وتفاصيل ذهبية.",
    price: 890, oldPrice: 1100, rating: 4.7, badge: "", icon: "👜",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "لؤلؤة البحر",
    category: "مجوهرات",
    desc: "قلادة لؤلؤ طبيعي بسلسلة مطلية بالذهب عيار 18، هدية مثالية.",
    price: 640, oldPrice: 780, rating: 4.9, badge: "هدايا", icon: "📿",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "عود الملك",
    category: "عطور",
    desc: "نفحات العود الفاخر الممزوج بالزعفران لطلة مهيبة لا تُنسى.",
    price: 720, oldPrice: 950, rating: 4.8, badge: "-24%", icon: "🧴",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "شمس الأفق",
    category: "نظارات",
    desc: "نظارة شمسية بإطار معدني رفيع وعدسات بحماية كاملة من الأشعة.",
    price: 390, oldPrice: 520, rating: 4.6, badge: "", icon: "🕶️",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "ليل الألماس",
    category: "ساعات",
    desc: "ساعة فاخرة بتطعيم كريستالي وحركة أوتوماتيكية بتصميم مسائي.",
    price: 2100, oldPrice: 2600, rating: 5.0, badge: "حصري", icon: "⌚",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "مسائية سوداء",
    category: "حقائب",
    desc: "حقيبة صغيرة أنيقة للمناسبات الخاصة، بتفاصيل مخيطة يدوياً.",
    price: 760, oldPrice: 990, rating: 4.7, badge: "", icon: "👝",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80&sat=-40"
  },
  {
    id: 9,
    name: "قمر صغير",
    category: "مجوهرات",
    desc: "أقراط ذهبية بتصميم الهلال، خفيفة وأنيقة لكل يوم.",
    price: 320, oldPrice: 450, rating: 4.5, badge: "-29%", icon: "💎",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
  }
];

const categories = [
  { name: "الكل", icon: "✦", bg: "linear-gradient(135deg,#3a3018,#141416)" },
  { name: "عطور", icon: "🧴", bg: "linear-gradient(135deg,#4a3518,#16120e)" },
  { name: "ساعات", icon: "⌚", bg: "linear-gradient(135deg,#1d3440,#0f1418)" },
  { name: "حقائب", icon: "👜", bg: "linear-gradient(135deg,#3c2730,#141014)" },
  { name: "مجوهرات", icon: "💎", bg: "linear-gradient(135deg,#2c3a33,#101614)" },
  { name: "نظارات", icon: "🕶️", bg: "linear-gradient(135deg,#332c40,#131016)" }
];

const CART_KEY = "dar-al-anaka-cart";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const money = (value) => new Intl.NumberFormat("en-US").format(value) + " ر.س";

let cart = loadCart();
let activeCategory = "الكل";
let searchQuery = "";
let sortBy = "featured";
let toastTimer;

/* ---------- أدوات عامة ---------- */
function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* تجاهل */ }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function getProduct(id) {
  return products.find((product) => product.id === Number(id));
}

function discountOf(product) {
  if (!product.oldPrice) return 0;
  return Math.round((1 - product.price / product.oldPrice) * 100);
}

function handleImageErrors(root = document) {
  $$("img[data-image]", root).forEach((img) => {
    img.addEventListener("error", () => img.remove(), { once: true });
  });
}

/* ---------- التصنيفات والفلاتر ---------- */
function renderCategories() {
  $("#categoriesGrid").innerHTML = categories.map((cat) => `
    <button class="category-card" type="button" data-category="${cat.name}" style="--cat-bg:${cat.bg}">
      <span class="category-icon" aria-hidden="true">${cat.icon}</span>
      <h3>${cat.name}</h3>
      <span>${cat.name === "الكل" ? "جميع المنتجات" : products.filter((p) => p.category === cat.name).length + " منتجات"}</span>
    </button>
  `).join("");
}

function renderFilters() {
  $("#filters").innerHTML = categories.map((cat) => `
    <button class="filter-btn ${cat.name === activeCategory ? "active" : ""}" type="button" data-filter="${cat.name}">
      ${cat.name}
    </button>
  `).join("");
}

/* ---------- المنتجات ---------- */
function visibleProducts() {
  let list = products.filter((product) => {
    const inCategory = activeCategory === "الكل" || product.category === activeCategory;
    const inSearch = !searchQuery ||
      product.name.includes(searchQuery) ||
      product.desc.includes(searchQuery) ||
      product.category.includes(searchQuery);
    return inCategory && inSearch;
  });

  if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  if (sortBy === "discount") list = [...list].sort((a, b) => discountOf(b) - discountOf(a));
  return list;
}

function priceMarkup(product) {
  const discount = discountOf(product);
  return `
    <span class="price">${money(product.price)}</span>
    ${product.oldPrice ? `<span class="old-price">${money(product.oldPrice)}</span>` : ""}
    ${discount ? `<span class="discount">خصم ${discount}%</span>` : ""}
  `;
}

function renderProducts() {
  const list = visibleProducts();
  $("#emptyState").hidden = list.length > 0;

  $("#productsGrid").innerHTML = list.map((product, index) => `
    <article class="product-card" style="animation-delay:${index * 45}ms">
      <div class="product-image">
        <div class="img-fallback" aria-hidden="true">${product.icon}</div>
        <img src="${product.image}" alt="${product.name}" loading="lazy" data-image />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <button class="fav-btn" type="button" data-fav="${product.id}" aria-label="أضف للمفضلة">♡</button>
        <button class="quick-btn" type="button" data-quick="${product.id}" aria-label="عرض التفاصيل">◎</button>
      </div>
      <div class="product-body">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <div class="rating-line"><span class="stars">★★★★★</span><span>${product.rating.toFixed(1)} / 5</span></div>
        <div class="price-line">${priceMarkup(product)}</div>
        <button class="add-btn" type="button" data-add="${product.id}">أضف إلى السلة ✦</button>
      </div>
    </article>
  `).join("");

  handleImageErrors($("#productsGrid"));
}

/* ---------- السلة ---------- */
function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function updateCartBadge() {
  const badge = $("#cartCount");
  badge.textContent = cartCount();
  badge.style.display = cartCount() ? "grid" : "none";
}

function addToCart(id) {
  const product = getProduct(id);
  if (!product) return;
  const existing = cart.find((item) => item.id === product.id);
  if (existing) existing.qty += 1;
  else cart.push({ id: product.id, qty: 1 });
  saveCart();
  renderCart();
  showToast(`تمت إضافة «${product.name}» إلى السلة ✦`);
}

function changeQty(id, delta) {
  const item = cart.find((entry) => entry.id === Number(id));
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((entry) => entry.id !== Number(id));
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((entry) => entry.id !== Number(id));
  saveCart();
  renderCart();
  showToast("تم حذف المنتج من السلة");
}

function renderCart() {
  const container = $("#cartItems");
  const total = cartTotal();

  updateCartBadge();
  $("#cartTotal").textContent = money(total);
  $("#checkoutBtn").disabled = cart.length === 0;
  $("#checkoutSummary").textContent = `${cartCount()} منتج • المجموع: ${money(total)}`;

  if (!cart.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <span class="empty-icon">🛍️</span>
        <h3>سلتك فارغة</h3>
        <p>لم تختر أي منتج بعد. اكتشف تشكيلتنا الفاخرة!</p>
        <button class="btn btn-outline" type="button" id="emptyShopBtn">ابدأ التسوق</button>
      </div>`;
    $("#emptyShopBtn").addEventListener("click", closeOverlay);
    return;
  }

  container.innerHTML = cart.map((item) => {
    const product = getProduct(item.id);
    if (!product) return "";
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <div class="img-fallback" aria-hidden="true">${product.icon}</div>
          <img src="${product.image}" alt="${product.name}" data-image />
        </div>
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <span class="unit-price">${money(product.price)}</span>
          <div class="qty-control">
            <button type="button" data-qty="-1" data-id="${product.id}" aria-label="تقليل الكمية">−</button>
            <span>${item.qty}</span>
            <button type="button" data-qty="1" data-id="${product.id}" aria-label="زيادة الكمية">+</button>
          </div>
        </div>
        <button class="remove-btn" type="button" data-remove="${product.id}" aria-label="حذف المنتج">✕</button>
      </div>`;
  }).join("");

  handleImageErrors(container);
}

/* ---------- السلة / الطبقة / النوافذ ---------- */
function openOverlay() {
  $("#overlay").hidden = false;
  requestAnimationFrame(() => $("#overlay").classList.add("show"));
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  $("#overlay").classList.remove("show");
  document.body.style.overflow = "";
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
  $$(".modal").forEach((modal) => { modal.hidden = true; });
  setTimeout(() => { if (!$("#overlay").classList.contains("show")) $("#overlay").hidden = true; }, 300);
}

function openCart() {
  renderCart();
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  openOverlay();
}

/* ---------- نافذة تفاصيل المنتج ---------- */
function openQuickView(id) {
  const product = getProduct(id);
  if (!product) return;
  const img = $("#quickImg");
  img.src = product.image;
  img.alt = product.name;
  img.hidden = false;
  $("#quickFallback").textContent = product.icon;
  $("#quickCategory").textContent = product.category;
  $("#quickName").textContent = product.name;
  $("#quickDesc").textContent = product.desc;
  $("#quickRating").textContent = `${product.rating.toFixed(1)} / 5` +
    (product.badge ? ` • ${product.badge}` : "");
  $("#quickPrice").innerHTML = priceMarkup(product);
  $("#quickAdd").dataset.id = product.id;
  img.onerror = () => { img.hidden = true; };
  $("#quickView").hidden = false;
  openOverlay();
}

/* ---------- النشرة والإعداد ---------- */
function setupEvents() {
  // شبكة المنتجات
  $("#productsGrid").addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");
    if (addButton) return addToCart(addButton.dataset.add);

    const quickButton = event.target.closest("[data-quick]");
    if (quickButton) return openQuickView(quickButton.dataset.quick);

    const favButton = event.target.closest("[data-fav]");
    if (favButton) {
      favButton.classList.toggle("is-fav");
      favButton.textContent = favButton.classList.contains("is-fav") ? "♥" : "♡";
      showToast(favButton.classList.contains("is-fav") ? "أُضيف إلى المفضلة ♥" : "أُزيل من المفضلة");
    }
  });

  // التصنيفات والفلاتر
  $("#filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeCategory = button.dataset.filter;
    renderFilters();
    renderProducts();
  });

  $("#categoriesGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-category]");
    if (!card) return;
    activeCategory = card.dataset.category;
    searchQuery = "";
    $("#searchInput").value = "";
    renderFilters();
    renderProducts();
    $("#products").scrollIntoView({ behavior: "smooth" });
  });

  $("#searchInput").addEventListener("input", (event) => {
    searchQuery = event.target.value.trim();
    renderProducts();
  });

  $("#sortSelect").addEventListener("change", (event) => {
    sortBy = event.target.value;
    renderProducts();
  });

  // السلة
  $("#openCart").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeOverlay);
  $("#overlay").addEventListener("click", closeOverlay);
  $$(".modal-close").forEach((button) => button.addEventListener("click", closeOverlay));

  $("#cartItems").addEventListener("click", (event) => {
    const qtyButton = event.target.closest("[data-qty]");
    if (qtyButton) return changeQty(qtyButton.dataset.id, Number(qtyButton.dataset.qty));
    const removeButton = event.target.closest("[data-remove]");
    if (removeButton) removeFromCart(removeButton.dataset.remove);
  });

  $("#clearCart").addEventListener("click", () => {
    if (!cart.length) return;
    cart = [];
    saveCart();
    renderCart();
    showToast("تم تفريغ السلة");
  });

  $("#quickAdd").addEventListener("click", (event) => {
    addToCart(event.currentTarget.dataset.id);
    closeOverlay();
  });

  // إتمام الطلب
  $("#checkoutBtn").addEventListener("click", () => {
    if (!cart.length) return;
    closeOverlay();
    $("#checkoutFormWrap").hidden = false;
    $("#checkoutSuccess").hidden = true;
    $("#checkoutForm").reset();
    $("#checkoutModal").hidden = false;
    openOverlay();
  });

  $("#checkoutForm").addEventListener("submit", (event) => {
    event.preventDefault();
    cart = [];
    saveCart();
    renderCart();
    $("#checkoutFormWrap").hidden = true;
    $("#checkoutSuccess").hidden = false;
    showToast("شكراً لك! تم تأكيد طلبك ✦");
  });

  // النشرة البريدية
  $("#newsletterForm").addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("تم اشتراكك بنجاح! خصم 10% بانتظارك ✦");
    event.target.reset();
  });

  // القائمة على الجوال
  $("#menuToggle").addEventListener("click", (event) => {
    const nav = $("#mainNav");
    nav.classList.toggle("open");
    event.currentTarget.setAttribute("aria-expanded", nav.classList.contains("open"));
  });

  // إغلاق بـ Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      $("#mainNav").classList.remove("open");
      closeOverlay();
    }
  });

  // تأثير الهيدر عند التمرير
  window.addEventListener("scroll", () => {
    $("#header").classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // صورة الهيرو الاحتياطية
  $("#heroImg").addEventListener("error", () => { $("#heroImg").hidden = true; }, { once: true });
}

function setupReveal() {
  const elements = $$("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach((element) => observer.observe(element));
}

/* ---------- التشغيل ---------- */
renderCategories();
renderFilters();
renderProducts();
renderCart();
setupEvents();
setupReveal();
