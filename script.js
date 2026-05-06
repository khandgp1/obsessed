const SITE_PASSWORD = 'bernard';
let appData = null;
let currentSlide = 0;

async function init() {
    try {
        const response = await fetch('slides.json');
        appData = await response.json();
        
        if (appData && appData.length > 0) {
            renderSlideshow();
            setupNavigation();
        }
    } catch (error) {
        console.error("Error loading slides:", error);
    }
}

function renderSlideshow() {
    const content = document.getElementById('workout-content');
    const slide = appData[currentSlide];
    
    if (!slide) return;

    content.innerHTML = `
        <div class="slide-container">
            <div class="slide-content">
                <div class="slide-title">${slide.title}</div>
                <div class="slide-text">${slide.content}</div>
            </div>
        </div>
        
        <div class="progress-container">
            <div class="progress-bar" style="width: ${((currentSlide + 1) / appData.length) * 100}%"></div>
        </div>

        <div class="nav-controls">
            <button class="nav-btn" id="prev-btn" ${currentSlide === 0 ? 'disabled' : ''}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button class="nav-btn" id="next-btn" ${currentSlide === appData.length - 1 ? 'disabled' : ''}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
        </div>
    `;

    // Re-setup navigation event listeners after re-render
    setupNavigation();
}

function setupNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const switchSlide = (newIndex) => {
        const container = document.querySelector('.slide-container');
        if (container) {
            container.classList.add('fade-out');
            setTimeout(() => {
                currentSlide = newIndex;
                renderSlideshow();
            }, 400); // Match CSS transition
        } else {
            currentSlide = newIndex;
            renderSlideshow();
        }
    };

    if (prevBtn) {
        prevBtn.onclick = () => {
            if (currentSlide > 0) {
                switchSlide(currentSlide - 1);
            }
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            if (currentSlide < appData.length - 1) {
                switchSlide(currentSlide + 1);
            }
        };
    }
}

// Global Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Keyboard Navigation
    window.onkeydown = (e) => {
        const switchSlide = (newIndex) => {
            const container = document.querySelector('.slide-container');
            if (container) {
                container.classList.add('fade-out');
                setTimeout(() => {
                    currentSlide = newIndex;
                    renderSlideshow();
                }, 400);
            } else {
                currentSlide = newIndex;
                renderSlideshow();
            }
        };

        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (appData && currentSlide < appData.length - 1) {
                switchSlide(currentSlide + 1);
            }
        } else if (e.key === 'ArrowLeft') {
            if (appData && currentSlide > 0) {
                switchSlide(currentSlide - 1);
            }
        }
    };

    // Password Protection Logic
    const passwordOverlay = document.getElementById('password-overlay');
    const passwordInput = document.getElementById('site-password-input');
    const passwordSubmit = document.getElementById('submit-password');
    const passwordError = document.getElementById('password-error');

    // Check if password protection is enabled in config
    if (window.APP_CONFIG && !window.APP_CONFIG.features.passwordProtection) {
        if (passwordOverlay) passwordOverlay.classList.add('hidden');
        return;
    }

    if (passwordSubmit && passwordInput) {
        const handlePasswordSubmit = () => {
            if (passwordInput.value === SITE_PASSWORD) {
                passwordOverlay.classList.add('hidden');
                passwordError.style.display = 'none';
                init(); // Start the app after unlocking
            } else {
                passwordError.style.display = 'block';
                passwordInput.value = '';
                passwordInput.focus();
            }
        };

        passwordSubmit.onclick = handlePasswordSubmit;
        passwordInput.onkeydown = (e) => {
            if (e.key === 'Enter') handlePasswordSubmit();
        };
        
        passwordInput.focus();
    }
});

// Start if not password protected
if (!window.APP_CONFIG || !window.APP_CONFIG.features.passwordProtection) {
    window.onload = init;
}
