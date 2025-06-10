document.addEventListener('DOMContentLoaded', function() {
    initTechFilter();
    initTechCards();
    initLevelBars();
    initStats();
    createScrollObserver();
});


function initTechFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const techCards = document.querySelectorAll('.tech-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {

            filterBtns.forEach(b => b.classList.remove('active'));

            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
           

            techCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
               
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.classList.add('visible');
                    }, index * 100);
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                }
            });
        });
    });
}


function initTechCards() {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    

    

    setTimeout(() => {
        techCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
        });
    }, 300);
}


function initLevelBars() {
    const levelFills = document.querySelectorAll('.level-fill');
    
    const animateLevelBar = (fill) => {
        const level = fill.getAttribute('data-level');
        fill.style.width = level + '%';
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateLevelBar(entry.target);
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    levelFills.forEach(fill => {
        observer.observe(fill);
    });
}

function initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; 
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateNumber(entry.target);
                }, 500);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function createScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const elementsToObserve = document.querySelectorAll('.learning-item, .section-title');
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

function createParticleEffect() {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    });
}

function createParticles(element) {
    const particleCount = 5;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #5800a0, #7a00cc);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
`;
document.head.appendChild(style);

//nao é pra ta funcionadno

function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar tecnologia...';
    searchInput.className = 'tech-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 20px;
        margin: 0 auto 2rem;
        display: block;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 25px;
        color: #fff;
        font-size: 16px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    `;

    const filterTabs = document.querySelector('.filter-tabs');
    filterTabs.parentNode.insertBefore(searchInput, filterTabs);

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const techCards = document.querySelectorAll('.tech-card');
        
        techCards.forEach(card => {
            const techName = card.querySelector('.tech-name').textContent.toLowerCase();
            const techDescription = card.querySelector('.tech-description').textContent.toLowerCase();
            
            if (techName.includes(searchTerm) || techDescription.includes(searchTerm)) {
                card.classList.remove('hidden');
                card.classList.add('visible');
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });
    });
    
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = 'rgba(63, 0, 104, 0.5)';
        this.style.boxShadow = '0 0 20px rgba(63, 0, 104, 0.3)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        this.style.boxShadow = 'none';
    });
}

function resetFilters() {
    const techCards = document.querySelectorAll('.tech-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    
    techCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove('hidden');
            card.classList.add('visible');
        }, index * 50);
    });
}

window.resetTechFilters = resetFilters;