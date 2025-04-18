// Page swipe functionality
let currentPage = 0;
let startX = 0;
let currentX = 0;
const pages = document.querySelectorAll('.app-page');
const dots = document.querySelectorAll('.page-dot');

function updatePagePosition() {
    pages.forEach((page, index) => {
        page.classList.remove('active', 'next', 'prev');
        if (index === currentPage) {
            page.classList.add('active');
        } else if (index > currentPage) {
            page.classList.add('next');
        } else {
            page.classList.add('prev');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
    });
}

document.querySelector('.app-pages').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.app-pages').addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX - startX;
    const activePage = pages[currentPage];
    
    if (currentX > 0 && currentPage > 0) {
        activePage.style.transform = `translateX(${currentX}px)`;
    } else if (currentX < 0 && currentPage < pages.length - 1) {
        activePage.style.transform = `translateX(${currentX}px)`;
    }
});

document.querySelector('.app-pages').addEventListener('touchend', () => {
    const threshold = 100;
    if (Math.abs(currentX) > threshold) {
        if (currentX > 0 && currentPage > 0) {
            currentPage--;
        } else if (currentX < 0 && currentPage < pages.length - 1) {
            currentPage++;
        }
    }
    updatePagePosition();
});

// App launching functionality
function launchApp(appName) {
    const app = document.createElement('iframe');
    app.style.position = 'fixed';
    app.style.top = '0';
    app.style.left = '0';
    app.style.width = '100%';
    app.style.height = '100%';
    app.style.border = 'none';
    app.style.zIndex = '2000';
    app.style.transform = 'translateY(100%)';
    app.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Set the appropriate app URL
    switch(appName.toLowerCase()) {
        case 'camera':
            app.src = 'apps/camera.html';
            break;
        case 'messages':
            app.src = 'apps/messages.html';
            break;
        // Add more apps here
    }
    
    document.body.appendChild(app);
    
    // Trigger animation
    requestAnimationFrame(() => {
        app.style.transform = 'translateY(0)';
    });

    // Add close gesture
    let startY = 0;
    let currentY = 0;
    
    app.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });
    
    app.addEventListener('touchmove', (e) => {
        currentY = e.touches[0].clientY - startY;
        if (currentY > 0) { // Only allow downward swipe
            app.style.transform = `translateY(${currentY}px)`;
        }
    });
    
    app.addEventListener('touchend', () => {
        if (currentY > 100) { // If swiped down enough, close the app
            app.style.transform = 'translateY(100%)';
            setTimeout(() => app.remove(), 300);
        } else {
            app.style.transform = 'translateY(0)';
        }
    });
}

// Update app icon click handlers
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const appName = this.querySelector('.app-name').textContent;
        launchApp(appName);
    });
});

document.querySelectorAll('.dock-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const appName = this.getAttribute('data-app');
        launchApp(appName);
    });
}); 