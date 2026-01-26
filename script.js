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

    // 2. Gestão de Consentimento de Cookies (LGPD)
    const cookieBanner = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('business_pro_cookies')) {
        setTimeout(() => {
            cookieBanner.style.display = 'flex';
        }, 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('business_pro_cookies', 'true');
        cookieBanner.style.opacity = '0';
        setTimeout(() => cookieBanner.style.display = 'none', 400);
    });

    // 3. Validação e Envio do Formulário (Simulação)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerText;
        
        // Simulação de carregamento
        btn.innerText = 'Enviando...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
            alert('Solicitação de orçamento enviada com sucesso! Nossa equipe entrará em contato.');
            form.reset();
            btn.innerText = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        }, 1500);
    });

    // 4. Animação de Entrada dos Cards de Serviço
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});