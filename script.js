// ========== Navbar Scroll ==========
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== Hamburger Menu ==========
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

// ========== Scroll Reveal ==========
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.skill-card, .project-card, .reveal, .timeline-item').forEach(el => {
    revealObserver.observe(el);
});

// ========== Staggered card reveal ==========
document.querySelectorAll('.skill-card, .project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});

// ========== Progress Bars Animation ==========
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress-fill').forEach(bar => {
                bar.classList.add('animated');
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-list').forEach(list => {
    progressObserver.observe(list);
});

// ========== Contact Form ==========
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML = '<span>Envoi en cours...</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        const data = new FormData(contactForm);
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                btn.innerHTML = '<span>Message envoyé !</span> <i class="fas fa-check"></i>';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            } else {
                btn.innerHTML = '<span>Erreur, réessayez</span> <i class="fas fa-times"></i>';
                btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }
        } catch {
            btn.innerHTML = '<span>Erreur réseau</span> <i class="fas fa-times"></i>';
            btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }
    });
}

// ========== AI Chat Widget ==========
const aiResponses = [
    {
        keywords: ['bonjour', 'salut', 'hello', 'bonsoir', 'hey', 'coucou'],
        reply: '👋 Bonjour ! Je suis l\'assistant IA de ce portfolio. Comment puis-je vous aider ? Vous pouvez me poser des questions sur les compétences, les projets, le CV ou le contact.'
    },
    {
        keywords: ['compétence', 'competence', 'skill', 'technologie', 'maitrise', 'maîtrise', 'sait', 'connais'],
        reply: '💡 Il maîtrise un large éventail de technologies : HTML, CSS, JavaScript, React, Node.js, Python, SQL, ainsi que des outils d\'IA (TensorFlow, Scikit-learn). <a href="skills.html" style="color:#a78bfa">Voir toutes les compétences →</a>'
    },
    {
        keywords: ['projet', 'réalisation', 'realisation', 'travail', 'portfolio', 'application', 'site'],
        reply: '🚀 Parmi les projets réalisés : un Site Web (ivoiretechnocom.ci), un Site E-commerce Mode, et une Application Web Moderne de suivi de matériels. <a href="projects.html" style="color:#a78bfa">Voir les projets →</a>'
    },
    {
        keywords: ['contact', 'contacter', 'joindre', 'email', 'mail', 'message', 'écrire'],
        reply: '📩 Vous pouvez envoyer un message directement via le formulaire de contact ou par email à <strong>oseepohonin07@gmail.com</strong>. <a href="contact.html" style="color:#a78bfa">Aller au contact →</a>'
    },
    {
        keywords: ['cv', 'curriculum', 'vitae', 'parcours', 'formation', 'expérience', 'experience'],
        reply: '📄 Son CV complet est disponible en ligne avec son parcours et ses expériences professionnelles. <a href="cv.html" style="color:#a78bfa">Voir le CV →</a>'
    },
    {
        keywords: ['ia', 'intelligence artificielle', 'machine learning', 'ml', 'deep learning', 'tensorflow', 'python'],
        reply: '🧠 Il dispose de compétences en Intelligence Artificielle : Python, TensorFlow, Scikit-learn et intégration de solutions LLM dans des applications web.'
    },
    {
        keywords: ['backend', 'back-end', 'serveur', 'api', 'node', 'sql', 'base de données', 'database'],
        reply: '🖥️ Côté backend, il travaille avec Node.js, Python, SQL et la conception d\'API REST robustes pour des applications full-stack.'
    },
    {
        keywords: ['frontend', 'front-end', 'interface', 'react', 'html', 'css', 'design', 'responsive'],
        reply: '🎨 En frontend, il crée des interfaces modernes et responsives avec HTML5, CSS3, JavaScript et React, avec une attention particulière à l\'UI/UX.'
    },
    {
        keywords: ['linkedin', 'github', 'réseau', 'reseau', 'social'],
        reply: '🔗 Retrouvez-le sur <a href="https://github.com/joel87-Hosy" target="_blank" style="color:#a78bfa">GitHub</a> et <a href="https://linkedin.com/in/joel-osée-pohonin-b0944133a" target="_blank" style="color:#a78bfa">LinkedIn</a>.'
    },
    {
        keywords: ['disponible', 'disponibilité', 'embauche', 'freelance', 'mission', 'collaboration'],
        reply: '✅ Il est disponible du lundi au vendredi pour de nouvelles collaborations, missions freelance ou opportunités d\'emploi. N\'hésitez pas à le <a href="contact.html" style="color:#a78bfa">contacter</a> !'
    },
    {
        keywords: ['tarif', 'prix', 'coût', 'cout', 'devis'],
        reply: '💬 Pour un devis personnalisé, contactez-le directement via le <a href="contact.html" style="color:#a78bfa">formulaire de contact</a> en décrivant votre projet.'
    },
    {
        keywords: ['qui', 'présente', 'présentation', 'about', 'propos', 'profil'],
        reply: '👤 Joël Osée Pohonin est un développeur web Full-Stack passionné, spécialisé en développement frontend, backend et Intelligence Artificielle. <a href="about.html" style="color:#a78bfa">En savoir plus →</a>'
    }
];

const defaultReply = '🤖 Je n\'ai pas bien compris votre question. Vous pouvez me demander des infos sur les <b>compétences</b>, les <b>projets</b>, le <b>CV</b>, ou comment le <b>contacter</b>.';

function getAIReply(userMsg) {
    const msg = userMsg.toLowerCase();
    for (const item of aiResponses) {
        if (item.keywords.some(kw => msg.includes(kw))) {
            return item.reply;
        }
    }
    return defaultReply;
}

function addMessage(text, type, container) {
    const msg = document.createElement('div');
    msg.className = `ai-msg ${type}`;
    if (type === 'bot') {
        msg.innerHTML = `<div class="ai-msg-icon"><i class="fas fa-robot"></i></div><div class="ai-msg-bubble">${text}</div>`;
    } else {
        msg.innerHTML = `<div class="ai-msg-bubble">${text}</div>`;
    }
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}

function showTyping(container) {
    const typing = document.createElement('div');
    typing.className = 'ai-msg bot';
    typing.id = 'ai-typing';
    typing.innerHTML = `<div class="ai-msg-icon"><i class="fas fa-robot"></i></div><div class="ai-typing"><span></span><span></span><span></span></div>`;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById('ai-typing');
    if (t) t.remove();
}

function initAIChat() {
    const btn = document.getElementById('ai-chat-btn');
    const panel = document.getElementById('ai-chat-panel');
    const closeBtn = document.getElementById('ai-close-btn');
    const messagesContainer = document.getElementById('ai-chat-messages');
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-send-btn');
    const suggestions = document.querySelectorAll('.ai-suggestion-btn');

    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
        panel.classList.toggle('open');
        if (panel.classList.contains('open') && messagesContainer.children.length === 0) {
            setTimeout(() => {
                addMessage('👋 Bonjour ! Je suis l\'assistant IA du portfolio de <strong>Joël Osée Pohonin</strong>.<br>Comment puis-je vous aider ?', 'bot', messagesContainer);
            }, 300);
        }
    });

    closeBtn.addEventListener('click', () => panel.classList.remove('open'));

    function sendMessage(text) {
        const userText = text || input.value.trim();
        if (!userText) return;
        addMessage(userText, 'user', messagesContainer);
        input.value = '';
        showTyping(messagesContainer);
        setTimeout(() => {
            removeTyping();
            addMessage(getAIReply(userText), 'bot', messagesContainer);
        }, 900);
    }

    sendBtn.addEventListener('click', () => sendMessage());
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
    suggestions.forEach(s => {
        s.addEventListener('click', () => sendMessage(s.textContent));
    });
}

initAIChat();
