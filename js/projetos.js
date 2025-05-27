document.addEventListener('DOMContentLoaded', function() {
            createScrollObserver();

            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    projectCards.forEach(card => {
                        const cardCategories = card.getAttribute('data-category');
                        
                        if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(30px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
            
            projectCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    if (!e.target.closest('.project-link')) {
                        const title = this.querySelector('.project-title').textContent.trim();
                        showToast(`Projeto: ${title.split('\n')[0]}`, 'info', 2000);
                    }
                });
            });
        });