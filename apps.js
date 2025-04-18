// App launching functionality
function launchApp(appName) {
    console.log("Launching app:", appName);
    
    const app = document.createElement('iframe');
    app.style.position = 'fixed';
    app.style.top = '0';
    app.style.left = '0';
    app.style.width = '100%';
    app.style.height = '100%';
    app.style.border = 'none';
    app.style.zIndex = '2000';
    app.style.transition = 'transform 0.3s ease';
    app.style.transform = 'translateY(100%)';
    
    // Set the appropriate app URL
    switch(appName.toLowerCase()) {
        case 'camera':
            app.src = 'apps/camera.html';
            break;
        case 'messages':
            app.src = 'apps/messages.html';
            break;
        case 'photos':
            alert('Photos app would launch here');
            return;
        case 'music':
            alert('Music app would launch here');
            return;
        default:
            alert('App not implemented yet');
            return;
    }
    
    document.body.appendChild(app);
    
    // Force reflow
    app.getBoundingClientRect();
    
    // Trigger animation
    setTimeout(function() {
        app.style.transform = 'translateY(0)';
    }, 10);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'fixed';
    closeButton.style.top = '30px';
    closeButton.style.right = '20px';
    closeButton.style.zIndex = '2001';
    closeButton.style.padding = '8px 16px';
    closeButton.style.backgroundColor = 'rgba(0,0,0,0.5)';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '20px';
    closeButton.style.fontSize = '16px';
    
    closeButton.onclick = function() {
        app.style.transform = 'translateY(100%)';
        setTimeout(function() {
            app.remove();
            closeButton.remove();
        }, 300);
    };
    
    document.body.appendChild(closeButton);
}

// Add click handlers to app icons
document.addEventListener('DOMContentLoaded', () => {
    // Handle main grid app icons
    document.querySelectorAll('.app-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const appName = this.querySelector('.app-name').textContent;
            launchApp(appName);
        });
    });

    // Handle dock app icons
    document.querySelectorAll('.dock-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            launchApp(appName);
        });
    });
});