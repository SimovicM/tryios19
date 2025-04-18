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