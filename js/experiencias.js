document.addEventListener('DOMContentLoaded', function() {

    createScrollObserver();

    initExperienceAnimations();
});

function initExperienceAnimations() {

    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
  
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });


    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        experienceObserver.observe(item);
    });


    const infoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    const infoSections = document.querySelectorAll('.info-section');
    infoSections.forEach(section => {
        infoObserver.observe(section);
    });

    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const timeline = document.querySelector('.experiences-timeline::before');
        
        if (timeline) {
            const rate = scrolled * -0.5;
            timeline.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }

    function requestParallax() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestParallax);

    const experienceCards = document.querySelectorAll('.experience-content');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(63, 0, 104, 0.5)';
            this.style.boxShadow = '0 15px 50px rgba(63, 0, 104, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });

    const descriptions = document.querySelectorAll('.experience-description');
    descriptions.forEach(desc => {
        const text = desc.querySelector('p');
        if (text && text.textContent.length > 200) {
            const fullText = text.textContent;
            const shortText = fullText.substring(0, 150) + '...';
            
            text.textContent = shortText;
            
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Ver mais';
            toggleBtn.className = 'toggle-btn';
            toggleBtn.style.cssText = `
                background: none;
                border: 1px solid rgba(63, 0, 104, 0.5);
                color: #5800a0;
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                cursor: pointer;
                font-size: 0.8rem;
                margin-top: 0.5rem;
                transition: all 0.3s ease;
            `;
            
            let isExpanded = false;
            
            toggleBtn.addEventListener('click', function() {
                if (isExpanded) {
                    text.textContent = shortText;
                    this.textContent = 'Ver mais';
                } else {
                    text.textContent = fullText;
                    this.textContent = 'Ver menos';
                }
                isExpanded = !isExpanded;
            });
            
            toggleBtn.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(63, 0, 104, 0.2)';
                this.style.transform = 'scale(1.05)';
            });
            
            toggleBtn.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.transform = 'scale(1)';
            });
            
            desc.appendChild(toggleBtn);
        }
    });
}