document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       CONFIGURAÇÃO CENTRAL
    =============================== */
    const telefoneDono = "5515996514120";

    function gerarLinkWhats(message = "") {
        const texto = encodeURIComponent(message);
        return `https://wa.me/${telefoneDono}${texto ? `?text=${texto}` : ""}`;
    }

    /* ===============================
       1. HEADER SCROLL
    =============================== */
    const header = document.getElementById('main-header');

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    /* ===============================
       2. MENU MOBILE
    =============================== */
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow =
                navMenu.classList.contains('active') ? 'hidden' : 'initial';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'initial';
            });
        });
    }

    /* ===============================
       3. COOKIES (LGPD)
    =============================== */
    const cookieBanner = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('accept-cookies');

    if (cookieBanner && !localStorage.getItem('business_pro_cookies')) {
        setTimeout(() => {
            cookieBanner.style.display = 'flex';
        }, 2000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('business_pro_cookies', 'true');
            cookieBanner.style.opacity = '0';
            setTimeout(() => cookieBanner.style.display = 'none', 400);
        });
    }

    /* ===============================
       4. FORMULÁRIO → WHATSAPP
    =============================== */
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const nome = document.getElementById('form-nome').value;
            const email = document.getElementById('form-email').value;
            const mensagem = document.getElementById('form-mensagem').value;
            const lgpdCheck = document.getElementById('lgpd-check');

            if (!lgpdCheck.checked) {
                alert("Por favor, aceite os termos da LGPD para continuar.");
                return;
            }

            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerText;

            btn.innerText = 'Redirecionando...';
            btn.disabled = true;

            const textoMensagem =
                `*Novo Orçamento - Business Pro*\n\n` +
                `*Nome:* ${nome}\n` +
                `*E-mail:* ${email}\n` +
                `*Mensagem:* ${mensagem}\n\n` +
                `_O cliente aceitou a Política de Privacidade (LGPD)._`;

            setTimeout(() => {
                window.open(gerarLinkWhats(textoMensagem), '_blank');
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 700);
        });
    }

    /* ===============================
       5. BOTÕES DE WHATSAPP (CTA / FOOTER)
       use data-message no HTML
    =============================== */
    document.querySelectorAll('.js-whatsapp').forEach(link => {
        const message =
            link.dataset.message ||
            "Olá! Vim pelo site e gostaria de entender melhor como você pode ajudar meu negócio.";

        link.setAttribute('href', gerarLinkWhats(message));
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
    });

    /* ===============================
       6. ANIMAÇÃO HERO
    =============================== */
    document.querySelectorAll('.hero-animate').forEach((el, i) => {
        setTimeout(() => el.classList.add('show'), 200 + i * 150);
    });

    /* ===============================
       7. REVEAL SCROLL
    =============================== */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el =>
        revealObserver.observe(el)
    );

    /* ===============================
       8. SIMULA HOVER NOS CARDS MOBILE
    =============================== */
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            card.addEventListener('click', e => {
                e.stopPropagation(); // previne click no body

                // Remove hover dos outros cards
                serviceCards.forEach(c => {
                    if (c !== card) c.classList.remove('hover');
                });

                // Alterna hover no card clicado
                card.classList.toggle('hover');
            });
        });

        // Remove hover ao clicar fora
        document.body.addEventListener('click', () => {
            serviceCards.forEach(card => card.classList.remove('hover'));
        });
    }

});
