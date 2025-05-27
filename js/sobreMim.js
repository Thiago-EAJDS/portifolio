document.addEventListener('DOMContentLoaded', function() {
            loadProfileImage(
                document.getElementById('about-photo'),
                '../assets/ftoperfil.jpeg',
                'https://via.placeholder.com/280x350/3f0068/ffffff?text=Thiago'
            );
            
            createScrollObserver();
        });