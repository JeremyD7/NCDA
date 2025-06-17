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

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有的 people 盒子
    const peopleElements = document.querySelectorAll('.people');

    peopleElements.forEach(function(peopleElement) {
        // 生成 -floatRange 到 0 之间的随机初始位置
        const floatRange = 12; 
        let position = Math.floor(Math.random() * (floatRange + 1)) - floatRange; 
        let isUp = Math.random() < 0.5; // 随机决定初始运动方向
        const floatSpeed = 0.2; // 浮动速度

        // 定义浮动动画函数
        function floatAnimation() {
            if (isUp) {
                if (position <= -floatRange) {
                    isUp = false;
                }
                position -= floatSpeed;
            } else {
                if (position >= 0) {
                    isUp = true;
                }
                position += floatSpeed;
            }
            // 更新 people 盒子的位置
            peopleElement.style.transform = `translateY(${position}px)`;
            requestAnimationFrame(floatAnimation);
        }

        // 启动浮动动画
        floatAnimation();
    });
});

// Modal functionality
const modal = document.getElementById('infoModal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.querySelector('.modal-title');
const modalBody = document.querySelector('.modal-body');

// Function to open modal
function openModal(title, content) {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Function to close modal
function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking the close button
closeModal.addEventListener('click', closeModalFunc);

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModalFunc();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
    }
});















