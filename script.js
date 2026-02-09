/* ======================================================
   LOCAL GROWTH – SCRIPT PRINCIPAL
   Profissional • Leve • Escalável
====================================================== */

/* =====================
   HELPERS
===================== */
const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

/* =====================
   HEADER OFFSET (SCROLL)
===================== */
const header = document.querySelector(".site-header");
const headerHeight = header ? header.offsetHeight : 80;

/* =====================
   SMOOTH SCROLL
===================== */
$$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const offsetTop = target.offsetTop - headerHeight + 12;

        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    });
});

/* =====================
   HEADER SHADOW ON SCROLL
===================== */
window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* =====================
   SCROLL ANIMATIONS
===================== */
const animatedItems = document.querySelectorAll(
    ".solution-card, .service-item, .stat-item, .process-steps li, .footer-col, .benefit-item"
);

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

animatedItems.forEach(item => observer.observe(item));

/* =====================
   WHATSAPP BUTTON
===================== */
const whatsappButtons = document.querySelectorAll(".js-whatsapp");

whatsappButtons.forEach(button => {
    button.addEventListener("click", () => {
        const phone = "5515996514120";
        const message =
            button.dataset.message ||
            "Olá! Vim pelo site e gostaria de saber mais sobre os serviços.";

        const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
            message
        )}`;

        window.open(whatsappURL, "_blank");
    });
});

/* =====================
   FORM UX FEEDBACK
===================== */
const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();

        form.classList.add("loading");

        const button = form.querySelector("button");
        const originalText = button.textContent;

        button.textContent = "Enviando...";

        setTimeout(() => {
            form.classList.remove("loading");
            button.textContent = originalText;
            form.reset();
            alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
        }, 1200);
    });
}

/* =====================
   CTA PULSE (SUTIL)
===================== */
const primaryButtons = document.querySelectorAll(".btn-primary");

primaryButtons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-2px)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0)";
    });
});

/* =====================
   OPTIONAL: MOBILE MENU
   (pronto para ativar)
===================== */
// const menuToggle = document.querySelector(".menu-toggle");
// const nav = document.querySelector(".main-nav");

// if (menuToggle && nav) {
//     menuToggle.addEventListener("click", () => {
//         nav.classList.toggle("open");
//         menuToggle.classList.toggle("active");
//     });
// }

/* =====================
   CSS NECESSÁRIO
===================== */
/*
Adicionar no CSS:

.animate {
    animation: fadeUp 0.8s ease forwards;
}

.site-header.scrolled {
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.contact-form.loading button {
    opacity: 0.6;
    pointer-events: none;
}
*/
