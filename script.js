document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURAÇÃO CENTRALIZADA ---
    const telefoneDono = "5515996514120";
    // ---------------------------------

    /* ===============================
       1. EFEITO DE SCROLL NO HEADER
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
            btn.style.opacity = '0.7';
            btn.disabled = true;

            const textoMensagem = encodeURIComponent(
                `*Novo Orçamento - Business Pro*\n\n` +
                `*Nome:* ${nome}\n` +
                `*E-mail:* ${email}\n` +
                `*Mensagem:* ${mensagem}\n\n` +
                `_O cliente declarou aceitar a Política de Privacidade (LGPD)._`
            );

            const urlWhatsApp =
                `https://api.whatsapp.com/send?phone=${telefoneDono}&text=${textoMensagem}`;

            setTimeout(() => {
                window.open(urlWhatsApp, '_blank');
                form.reset();
                btn.innerText = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 800);
        });
    }

    /* ===============================
       5. ATUALIZA LINKS DE WHATSAPP
    =============================== */
    document.querySelectorAll('a[href*="api.whatsapp.com"]').forEach(link => {
        try {
            const currentUrl = new URL(link.href);
            const textParam = currentUrl.searchParams.get('text') || "";
            link.href =
                `https://api.whatsapp.com/send?phone=${telefoneDono}&text=${encodeURIComponent(textParam)}`;
        } catch {
            link.href = `https://api.whatsapp.com/send?phone=${telefoneDono}`;
        }
    });

    /* ===============================
       6. ANIMAÇÃO DO HERO (ON LOAD)
    =============================== */
    const heroElements = document.querySelectorAll('.hero-animate');

    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('show');
        }, 200 + index * 150);
    });

    /* ===============================
       7. ANIMAÇÕES AO DESCER A TELA
       (exceto footer)
    =============================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach(el => revealObserver.observe(el));

});
