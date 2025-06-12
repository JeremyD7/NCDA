const xrall = document.querySelectorAll('.xiaoren-container');

xrall.forEach((container) => {
    container.addEventListener('click', function () {
        const beiElement = this.querySelector('.bei');
        const peopleElement = this.querySelector('.people');

        if (beiElement && peopleElement) {
            const isShowingBei = this.classList.toggle('show-bei');
            if (isShowingBei) {
                peopleElement.style.display = 'none';
                beiElement.style.display = 'block';
            } else {
                peopleElement.style.display = 'block';
                beiElement.style.display = 'none';
            }
        }
    });
});