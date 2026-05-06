let appData = null;
let currentSlide = 0;
let autoPlayTimer = null;

function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
        const nextIndex = currentSlide === appData.length - 1 ? 0 : currentSlide + 1;
        switchSlide(nextIndex);
    }, 5000);
}

function resetAutoPlay() {
    startAutoPlay();
}

function switchSlide(newIndex) {
    const container = document.querySelector('.slide-container');
    if (container) {
        container.classList.add('fade-out');
        setTimeout(() => {
            currentSlide = newIndex;
            renderSlideshow();
            resetAutoPlay();
        }, 400); // Match CSS transition
    } else {
        currentSlide = newIndex;
        renderSlideshow();
        resetAutoPlay();
    }
}

async function init() {
    try {
        const response = await fetch('slides.json');
        appData = await response.json();

        if (appData && appData.length > 0) {
            renderSlideshow();
            setupNavigation();
            startAutoPlay();
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
            <button class="nav-btn" id="prev-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button class="nav-btn" id="next-btn">
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

    if (prevBtn) {
        prevBtn.onclick = () => {
            const newIndex = currentSlide === 0 ? appData.length - 1 : currentSlide - 1;
            switchSlide(newIndex);
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            const newIndex = currentSlide === appData.length - 1 ? 0 : currentSlide + 1;
            switchSlide(newIndex);
        };
    }
}

// Global Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Keyboard Navigation
    window.onkeydown = (e) => {

        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (appData) {
                const newIndex = currentSlide === appData.length - 1 ? 0 : currentSlide + 1;
                switchSlide(newIndex);
            }
        } else if (e.key === 'ArrowLeft') {
            if (appData) {
                const newIndex = currentSlide === 0 ? appData.length - 1 : currentSlide - 1;
                switchSlide(newIndex);
            }
        }
    };

    init();
});


