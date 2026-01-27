document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito de Scroll no Header
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Menu Mobile (Hambúrguer)
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Previne o scroll do corpo quando o menu está aberto
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'initial';
        });

        // Fecha o menu ao clicar em qualquer link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'initial';
            });
        });
    }

    // 3. Gestão de Consentimento de Cookies (LGPD)
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

    // 4. Envio Real para WhatsApp
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // --- CONFIGURAÇÃO DO CLIENTE ---
            const telefoneDono = "5515996514120"; 
            // -------------------------------

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

            const textoMensagem = `*Novo Orçamento - Business Pro*%0A%0A` +
                                  `*Nome:* ${nome}%0A` +
                                  `*E-mail:* ${email}%0A` +
                                  `*Mensagem:* ${mensagem}`;

            const urlWhatsApp = `https://api.whatsapp.com/send?phone=${telefoneDono}&text=${textoMensagem}`;

            setTimeout(() => {
                window.open(urlWhatsApp, '_blank');
                form.reset();
                btn.innerText = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 800);
        });
    }

    // 5. Animação de Entrada (Intersection Observer)
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .about-content, .about-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});