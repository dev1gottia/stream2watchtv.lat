/**
 * STREAM2WATCH - Main JavaScript Interactions & UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCheckoutModal();
  initFaqAccordion();
  initDmcaForm();
});

/* ==========================================================================
   1. Navbar & Mobile Menu Handling
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  // Sticky Navbar Blur On Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile Drawer Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close mobile drawer when clicking links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }
}

/* ==========================================================================
   2. Checkout & VIP Pass Modal
   ========================================================================== */
function initCheckoutModal() {
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutBtn = document.getElementById('closeCheckoutModal');
  const buyBtns = document.querySelectorAll('.btn-buy-pass');

  const modalPlanName = document.getElementById('checkoutPlanTitle');
  const modalPlanPrice = document.getElementById('checkoutPlanPrice');

  buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.getAttribute('data-plan') || 'VIP Access Pass';
      const planPrice = btn.getAttribute('data-price') || '$14.99';

      if (modalPlanName) modalPlanName.textContent = planName;
      if (modalPlanPrice) modalPlanPrice.textContent = planPrice;

      if (checkoutModal) {
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeCheckout() {
    if (checkoutModal) {
      checkoutModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckout);
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckout();
    });
  }

  // Payment Option selection toggle
  const payOptions = document.querySelectorAll('.pay-btn-option');
  payOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      payOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  // Simulate payment submit
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeCheckout();
      showToast('🎉 VIP Pass Activated! You now have instant access to 4K streams.');
    });
  }
}

/* ==========================================================================
   3. FAQ Accordion Logic
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(i => i.classList.remove('active'));

        // Toggle clicked
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   4. DMCA Form Submission & Validation
   ========================================================================== */
function initDmcaForm() {
  const dmcaForm = document.getElementById('dmcaTakedownForm');
  if (!dmcaForm) return;

  dmcaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('dmcaName')?.value.trim();
    const workUrl = document.getElementById('dmcaUrl')?.value.trim();
    const signature = document.getElementById('dmcaSignature')?.value.trim();
    const termsCheck = document.getElementById('dmcaDeclaration')?.checked;

    if (!fullName || !workUrl || !signature || !termsCheck) {
      showToast('⚠️ Please fill all required fields and sign the declaration.');
      return;
    }

    // Success response
    dmcaForm.reset();
    showToast('✅ DMCA Notice Received! Ticket #DMCA-2026-' + Math.floor(1000 + Math.random() * 9000) + ' created.');
  });
}

/* ==========================================================================
   5. Toast Notification System
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--neon);"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
