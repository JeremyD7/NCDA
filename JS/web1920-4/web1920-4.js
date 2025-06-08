document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('mouseenter', function(e) {
            if (e.target !== this) return;
            this.style.display = 'none';
            this.parentElement.style.border = '5px solid rgba(0,0,0,1)';
            this.parentElement.style.borderRadius = '199px';
            const pE = this.nextElementSibling;
            if (pE && pElement.tagName === 'P') {
                pE.style.display = 'block';
            }
        });

        img.addEventListener('mouseleave', function(event) {
            if (event.target !== this) return;
            
            this.style.display = 'block';
            this.parentElement.style.border = '';
            this.parentElement.style.borderRadius = '';
            const pE = this.nextElementSibling;
            if (pE && pElement.tagName === 'P') {
                p.style.display = 'none';
            }
        });
    });
});











