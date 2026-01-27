document.addEventListener('DOMContentLoaded', () => {
    
    // --- CONFIGURAÇÃO CENTRALIZADA ---
    const telefoneDono = "5515996514120"; 
    // ---------------------------------

    // 1. Efeito de Scroll no Header
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Menu Mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'initial';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'initial';
            });
        });
    }

    // 3. Gestão de Cookies (LGPD)
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

    // 4. Envio do Formulário com Confirmação de LGPD
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
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

            // Mensagem formatada com confirmação jurídica
            const textoMensagem = encodeURIComponent(
                `*Novo Orçamento - Business Pro*\n\n` +
                `*Nome:* ${nome}\n` +
                `*E-mail:* ${email}\n` +
                `*Mensagem:* ${mensagem}\n\n` +
                `_O cliente declarou aceitar a Política de Privacidade (LGPD)._`
            );

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

    // 5. Atualização de Links de WhatsApp
    document.querySelectorAll('a[href*="api.whatsapp.com"]').forEach(link => {
        try {
            const currentUrl = new URL(link.href);
            const textParam = currentUrl.searchParams.get('text') || "";
            link.href = `https://api.whatsapp.com/send?phone=${telefoneDono}&text=${encodeURIComponent(textParam)}`;
        } catch (e) {
            // Fallback para links mal formatados
            link.href = `https://api.whatsapp.com/send?phone=${telefoneDono}`;
        }
    });

    // 6. Animações de Entrada Suaves
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.service-card, .about-content, .about-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
});