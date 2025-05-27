
document.addEventListener('DOMContentLoaded', function() {
    const mainElements = document.querySelectorAll('.content-wrapper, .home-content');
    mainElements.forEach(element => {
        if (element) {
            element.classList.add('fade-in');
        }
    });

    setActiveNavLink();
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href').split('/').pop();
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function loadProfileImage(imgElement, imagePath, placeholderUrl) {
    const img = new Image();
    
    img.onload = function() {
        imgElement.src = imagePath;
    };
    
    img.onerror = function() {
        imgElement.src = placeholderUrl || 'https://via.placeholder.com/220x220/3f0068/ffffff?text=Thiago';
        console.log('babababa');
    };
    
    img.src = imagePath;
}


function createTypingEffect(element, text, speed = 100, callback = null) {
    let i = 0;
    element.textContent = '';
    
    const interval = setInterval(() => {
        element.textContent = text.slice(0, i + 1);
        i++;
        
        if (i >= text.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
    
    return interval;
}

function createScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    const animateElements = document.querySelectorAll('.tech-category, .project-card, .experience-item');
    animateElements.forEach(el => observer.observe(el));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(() => {
    console.log('Janela redimensionada');
}, 250));

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'absolute';
        textArea.style.left = '-999999px';
        document.body.prepend(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (error) {
            console.error('Erro ao copiar texto:', error);
        } finally {
            textArea.remove();
        }
    }
}

function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: '#fff',
        fontWeight: '500',
        zIndex: '9999',
        transition: 'all 0.3s ease',
        transform: 'translateX(100%)',
        opacity: '0'
    });
    
    const colors = {
        info: '#3f0068',
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545'
    };
    
    toast.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}