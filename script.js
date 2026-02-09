/* ======================================================
   LOCAL GROWTH – SCRIPT PRINCIPAL
====================================================== */

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

/* =====================
   HEADER & SCROLL
===================== */
const header = $(".site-header");
const headerHeight = header ? header.offsetHeight : 80;

window.addEventListener("scroll", () => {
    if (!header) return;
    window.scrollY > 20 ? header.classList.add("scrolled") : header.classList.remove("scrolled");
});

/* =====================
   SMOOTH SCROLL
===================== */
$$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const targetId = link.getAttribute("href");
        const target = $(targetId);
        if (!target) return;
        e.preventDefault();
        const offsetTop = target.offsetTop - headerHeight + 12;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
    });
});

/* =====================
   SCROLL ANIMATIONS (GERAL)
===================== */
// Adicionei uma verificação para evitar erros se a classe não existir no HTML
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
                    // Garantindo que a altura seja aplicada com um pequeno delay escalonado
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
    let inactivityTimer;

    if (!card || dots.length === 0) return;

    const setActiveSlide = (index) => {
        clearTimeout(inactivityTimer);

        slides.forEach((slide, i) => {
            slide.style.animation = 'none';

            // Força o estado visual para o slide selecionado
            if (i === index) {
                slide.style.opacity = "1";
                slide.style.transform = "translateY(0)";
                slide.style.pointerEvents = "auto";
                slide.style.visibility = "visible";
            } else {
                slide.style.opacity = "0";
                slide.style.transform = "translateY(-20px)";
                slide.style.pointerEvents = "none";
                slide.style.visibility = "hidden";
            }
        });

        dots.forEach((dot, i) => {
            dot.style.animation = 'none';
            dot.style.background = (i === index) ? "var(--primary)" : "#cbd5e1";
            dot.style.transform = (i === index) ? "scale(1.3)" : "scale(1)";
        });

        // Retoma a animação automática do CSS após 5 segundos de inatividade
        inactivityTimer = setTimeout(() => {
            resumeAutoAnimation();
        }, 5000);
    };

    const resumeAutoAnimation = () => {
        slides.forEach(slide => {
            slide.style.animation = "";
            slide.style.opacity = "";
            slide.style.transform = "";
            slide.style.visibility = "";
        });
        dots.forEach(dot => {
            dot.style.animation = "";
            dot.style.background = "";
            dot.style.transform = "";
        });
    };

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => setActiveSlide(index));
    });

    // Resetar animação se o usuário trocar de aba e voltar
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) resumeAutoAnimation();
    });
};

setupFloatingSlider();