/* ======================================================
   LOCAL GROWTH – SCRIPT PRINCIPAL
====================================================== */

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

/* =====================
   HEADER & SCROLL
===================== */
const header = $(".site-header");
let headerHeight = header ? header.offsetHeight : 80;

window.addEventListener("scroll", () => {
    if (!header) return;
    window.scrollY > 20
        ? header.classList.add("scrolled")
        : header.classList.remove("scrolled");
});

window.addEventListener("resize", () => {
    headerHeight = header ? header.offsetHeight : 80;
});

/* =====================
   MOBILE NAV / HAMBURGER
===================== */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        hamburger.classList.toggle('active'); // animação do X

        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
    });
}

/* =====================
   SMOOTH SCROLL
===================== */
$$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const targetId = link.getAttribute("href");
        const target = $(targetId);
        if (!target) return;
        e.preventDefault();

        // Atualiza headerHeight antes do scroll
        headerHeight = header ? header.offsetHeight : 80;

        // Usa getBoundingClientRect para cálculo mais preciso
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const offsetTop = rect.top + scrollTop - headerHeight - 10; // margem extra

        window.scrollTo({ top: offsetTop, behavior: "smooth" });

        // Fecha menu mobile ao clicar
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

/* =====================
   SCROLL ANIMATIONS (GERAL)
===================== */
const animatedItems = $$(".solution-card, .service-box, .stat-item, .process-steps li, .footer-col");

const generalObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            generalObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

animatedItems.forEach(item => generalObserver.observe(item));

/* =====================
   CHART ANIMATION (GRÁFICO)
===================== */
const chartBars = $(".chart-bars");

if (chartBars) {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar');
                bars.forEach((bar, index) => {
                    const h = bar.getAttribute('data-height');
                    setTimeout(() => {
                        bar.style.height = h;
                    }, index * 100);
                });
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    chartObserver.observe(chartBars);
}

/* =====================
   WHATSAPP & FORM UX
===================== */
$$(".js-whatsapp").forEach(button => {
    button.addEventListener("click", () => {
        const phone = "5515996514120";
        const message = button.dataset.message || "Olá! Vim pelo site.";
        window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, "_blank");
    });
});

const form = $(".contact-form");
if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const btn = form.querySelector("button");
        const originalText = btn.textContent;
        btn.textContent = "Enviando...";

        // Simulação de envio
        setTimeout(() => {
            btn.textContent = originalText;
            form.reset();
            alert("Mensagem enviada com sucesso!");
        }, 1200);
    });
}

/* =====================
   FLOATING CARD SLIDER (HERO)
===================== */
const setupFloatingSlider = () => {
    const card = $(".floating-card");
    const dots = $$(".dot");
    const slides = $$(".card-content");
    let inactivityTimer = null;

    if (!card || dots.length === 0) return;

    const setActiveSlide = (index) => {
        clearTimeout(inactivityTimer);

        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add("active-slide");
            } else {
                slide.classList.remove("active-slide");
            }
        });

        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add("active-dot");
            } else {
                dot.classList.remove("active-dot");
            }
        });

        inactivityTimer = setTimeout(() => {
            resumeAutoAnimation();
        }, 5000);
    };

    const resumeAutoAnimation = () => {
        slides.forEach(slide => {
            slide.classList.remove("active-slide");
        });
        dots.forEach(dot => {
            dot.classList.remove("active-dot");
        });
    };

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => setActiveSlide(index));
    });

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) resumeAutoAnimation();
    });
};

setupFloatingSlider();
