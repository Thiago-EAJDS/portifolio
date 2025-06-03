
function startTypingAnimation() {
    const fullName = "Thiago Emanuel Araújo Jorge de Sá";
    const displayElement = document.getElementById('display-name');
    const cursorElement = document.getElementById('cursor');
    
    if (!displayElement || !cursorElement) return;
    
    createTypingEffect(displayElement, fullName, 100, () => {
        cursorElement.style.display = 'none';
    });
}

function initHomePage() {
    startTypingAnimation();
    
    const profilePhoto = document.getElementById('profile-photo');
    if (profilePhoto) {
        loadProfileImage(
            profilePhoto, 
            '../assets/ftoperfil.jpeg', 
            'https://via.placeholder.com/220x220/3f0068/ffffff?text=Thiago'
        );
    }
    
    addSocialIconsListeners();
    
    createScrollObserver();
}

function addSocialIconsListeners() {
    const socialIcons = document.querySelectorAll('.icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        icon.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }, 100);
            
            if (this.getAttribute('href').includes('mailto:')) {
                e.preventDefault();
                const email = 'thiagoeajds@gmail.com';
                copyToClipboard(email);
                showToast('E-mail copiado para a área de transferência!', 'success');
                
             
                setTimeout(() => {
                    window.location.href = `mailto:${email}`;
                }, 1000);
            }
        });
    });
}

function addPhotoEffects() {
    const photo = document.querySelector('.photo img');
    
    if (photo) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            photo.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px) scale(1)`;
        });
        
        document.addEventListener('mouseleave', () => {
            photo.style.transform = 'translate(0px, 0px) scale(1)';
        });
    }
}

function animateHomeElements() {
    const elements = [
        { selector: '.name', delay: 500 },
        { selector: '.icons', delay: 1000 },
        { selector: '.photo', delay: 1500 }
    ];
    
    elements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
    });
}

function addEasterEgg() {
    let sequence = [];
    const targetSequence = ['t', 'h', 'i', 'a', 'g', 'o'];
    
    document.addEventListener('keydown', (e) => {
        sequence.push(e.key.toLowerCase());
        
        if (sequence.length > targetSequence.length) {
            sequence.shift();
        }
        
        if (JSON.stringify(sequence) === JSON.stringify(targetSequence)) {
            showToast('faz o T agora, Samuel', 'sucesso', 4000);
            
            const photo = document.querySelector('.photo img');
            if (photo) {
                photo.style.animation = 'spin 2s ease-in-out';
                setTimeout(() => {
                    photo.style.animation = '';
                }, 2000);
            }
            
            sequence = [];
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initHomePage();
        animateHomeElements();
        addPhotoEffects();
        addEasterEgg();
    }, 100);
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        initHomePage();
    }
});