/* ═══════════════════════════════════════════
   SILA & BEYOND — main.js
   ═══════════════════════════════════════════ */

let cartQty = 0;

/* ── PAGE NAVIGATION ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Reset add-to-cart button
  const btn = document.getElementById('addCartBtn');
  if (btn) {
    btn.textContent = 'Ajouter au panier';
    btn.classList.remove('added');
  }

  // Close mobile menu
  closeMobileMenu();
}

/* ── MOBILE MENU ── */
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ── CART ── */
function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function addToCart() {
  cartQty++;
  const badge = document.getElementById('cartBadge');
  badge.style.display = 'flex';
  badge.textContent = cartQty;

  document.getElementById('cartEmpty').style.display = 'none';
  document.getElementById('cartItems').style.display = 'block';
  document.getElementById('cartFoot').style.display = 'block';
  document.getElementById('cartQtyVal').textContent = cartQty;
  document.getElementById('cartTotalVal').textContent = (cartQty * 49) + ' €';

  toggleCart();
}

function updateQty(delta) {
  cartQty = Math.max(1, cartQty + delta);
  document.getElementById('cartQtyVal').textContent = cartQty;
  document.getElementById('cartTotalVal').textContent = (cartQty * 49) + ' €';
  document.getElementById('cartBadge').textContent = cartQty;
}

function removeFromCart() {
  cartQty = 0;
  document.getElementById('cartBadge').style.display = 'none';
  document.getElementById('cartEmpty').style.display = 'block';
  document.getElementById('cartItems').style.display = 'none';
  document.getElementById('cartFoot').style.display = 'none';
}

/* ── FAQ ACCORDION ── */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const arrow  = btn.querySelector('.faq-arrow');
  const isOpen = answer.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-a.open').forEach(a => {
    a.classList.remove('open');
    a.previousElementSibling.querySelector('.faq-arrow').textContent = '+';
  });

  // Open clicked (if wasn't already open)
  if (!isOpen) {
    answer.classList.add('open');
    arrow.textContent = '−';
  }
}

/* ── CONTACT FORM ── */
function submitContact() {
  const name    = document.getElementById('name')?.value.trim();
  const email   = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !message) {
    alert('Merci de remplir tous les champs avant d\'envoyer.');
    return;
  }

  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

/* ── NEWSLETTER POPUP ── */
function closeNl() {
  document.getElementById('nlOverlay').classList.remove('open');
  // Remember for session
  sessionStorage.setItem('nlClosed', '1');
}

/* ── NAVBAR SCROLL SHADOW ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
});

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  // Show newsletter after 3s (only once per session)
  if (!sessionStorage.getItem('nlClosed')) {
    setTimeout(() => {
      document.getElementById('nlOverlay')?.classList.add('open');
    }, 3000);
  }
});
