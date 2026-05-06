const SITE_PASSWORD = 'bernard';
let appData = null;
let currentTab = 0;


async function init() {
    try {
        const response = await fetch('program.json');
        appData = await response.json();
        const container = document.getElementById('tab-container');

        // Create Tabs (Showing 'Intro' and 'Snippets')
        appData.days.forEach((day, index) => {
            if (index > 1) return; // Hide Day 3, etc.
            
            const btn = document.createElement('button');
            btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
            btn.innerText = day.title.toUpperCase();
            btn.onclick = () => switchTab(index);
            container.appendChild(btn);
        });

        // Initial Load
        renderContent();
    } catch (error) {
        console.error("Error loading program:", error);
    }
}

function switchTab(index) {
    currentTab = index;
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
    renderContent();
}

function renderContent() {
    const content = document.getElementById('workout-content');
    const day = appData.days[currentTab];
    
    // Scope the wider max-width to the Snippets and Checklist tabs
    content.classList.remove('snippets-wide', 'checklists-wide');

    if (day.title.toLowerCase() === 'written outreach') {
        content.classList.add('checklists-wide');
        renderChecklist(day);
    } else if (day.title.toLowerCase() === 'snippets') {
        content.classList.add('snippets-wide');
        renderSnippets(day);
    } else if (day.title.toLowerCase() === 'intro') {
        renderIntro(day);
    } else {
        renderWorkout(day);
    }
}

function renderSnippets(day) {
    const content = document.getElementById('workout-content');
    content.innerHTML = `
        <div style="text-align:center; margin-bottom: 30px;">
            <h2 style="font-weight:300;">${day.focus}</h2>
            ${day.description ? `<p class="section-description">${day.description}</p>` : ''}
        </div>
        <div class="snippets-container">
            ${day.exercises.map(ex => `
                <div class="snippet-item">
                    <h3>${ex.name}</h3>
                    <p class="snippet-note">${ex.note}</p>
                    <div class="prompt-box">
                        <div class="prompt-header">
                            <span>Boilerplate Snippet</span>
                            <button class="copy-btn">Copy</button>
                        </div>
                        <pre><code>${ex.content}</code></pre>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Re-bind copy buttons for the new content
    bindCopyButtons();
}

function renderChecklist(day) {
    const content = document.getElementById('workout-content');
    let headerHtml = `
        <div style="text-align:center; margin-bottom: 30px;">
            <h2 style="font-weight:300;">${day.focus}</h2>
            ${day.description ? `<p class="section-description">${day.description}</p>` : ''}
        </div>
    `;

    if (day.superGroups) {
        const superGroupsHtml = day.superGroups.map((sg, sgIdx) => {
            const groupsHtml = sg.groups.map((group, gIdx) => `
                <div class="checklist-group">
                    <h3 class="checklist-group-title">${group.name}</h3>
                    <div class="checklist-container">
                        ${group.exercises.map((item, idx) => `
                            <div class="checklist-item">
                                <label class="checkbox-container">
                                    <input type="checkbox" id="check-${sgIdx}-${gIdx}-${idx}">
                                    <span class="checkmark"></span>
                                </label>
                                <div class="checklist-text">
                                    <h4>${item.name}</h4>
                                    <p>${item.note}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
            const fullWidthClass = sg.name === "Subject Line" ? " full-width-card" : "";
            return `
                <div class="checklist-super-group${fullWidthClass}">
                    <h3 class="checklist-super-group-title">${sg.name}</h3>
                    <div class="checklist-groups-wrapper">${groupsHtml}</div>
                </div>
            `;
        }).join('');
        content.innerHTML = headerHtml + `<div class="supergroups-container">${superGroupsHtml}</div>`;
    } else if (day.groups) {
        const groupsHtml = day.groups.map((group, gIdx) => `
            <div class="checklist-group">
                <h3 class="checklist-group-title">${group.name}</h3>
                <div class="checklist-container">
                    ${group.exercises.map((item, idx) => `
                        <div class="checklist-item">
                            <label class="checkbox-container">
                                <input type="checkbox" id="check-${gIdx}-${idx}">
                                <span class="checkmark"></span>
                            </label>
                            <div class="checklist-text">
                                <h4>${item.name}</h4>
                                <p>${item.note}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        content.innerHTML = headerHtml + groupsHtml;
    } else {
        const containerHtml = `
            <div class="checklist-container">
                ${day.exercises.map((item, idx) => `
                    <div class="checklist-item">
                        <label class="checkbox-container">
                            <input type="checkbox" id="check-${idx}">
                            <span class="checkmark"></span>
                        </label>
                        <div class="checklist-text">
                            <h4>${item.name}</h4>
                            <p>${item.note}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        content.innerHTML = headerHtml + containerHtml;
    }
}

function renderWorkout(day) {
    const content = document.getElementById('workout-content');
    content.innerHTML = `
        <div style="text-align:center; margin-bottom: 30px;">
            <h2 style="font-weight:300;">${day.focus}</h2>
            ${day.description ? `<p class="section-description">${day.description}</p>` : ''}
        </div>
    `;

    day.exercises.forEach(ex => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.innerHTML = `
            <div class="meta">${ex.sets} × ${ex.reps}</div>
            <h3>${ex.name}</h3>
            <p class="tips">${ex.note}</p>
        `;
        content.appendChild(card);
    });
}

const drawerContent = {
    0: {
        title: "THE KICKSTART: AI BLUEPRINTING",
        html: `
            <div class="blueprint-layout">
                <section class="blueprint-intro">
                    <p><strong>Goal:</strong> Architect before you build. Generate a detailed No-Code Implementation Plan.</p>
                </section>

                <section class="tcrei-framework">
                    <h4>The T.C.R.E.I. Framework</h4>
                    <p class="framework-subtitle">Tiny Crabs Ride Enormous Iguanas</p>
                    <ul class="framework-list">
                        <li><strong>Task:</strong> Define a specific expert persona tailored to your niche.</li>
                        <li><strong>Context:</strong> Provide the background, project goals, target audience, and specific constraints.</li>
                        <li><strong>Reference:</strong> Provide examples if possible to ground the prompts.</li>
                        <li><strong>Evaluate:</strong> Assess implementation plan.</li>
                        <li><strong>Iterate:</strong> Make small, surgical adjustments to the prompt to refine the plan.</li>
                    </ul>
                </section>

                <section class="master-blueprint">
                    <h4>The "Master Blueprint" Prompt</h4>
                    <p class="minor-instruction">Copy and paste this boilerplate to START your prompt.</p>
                    
                    <div class="pro-tip">
                        <strong>Pro Tip:</strong> Use the "Deep Thinking" model setting (available in Gemini) to generate the plan. If you hit rate limits, switch to the highest performance-tier model available. Enable any "Enhanced Prompt" features if your LLM offers them.
                    </div>

                    <div class="prompt-box">
                        <div class="prompt-header">
                            <span>Boilerplate Prompt</span>
                            <button class="copy-btn">Copy</button>
                        </div>
                        <pre><code>Act as an Expert Software Architect. Your task is to create a detailed, step-by-step roadmap for a new project. This roadmap must outline features, file structures, and logic—without writing the actual implementation code yet.

Architecture Requirements:
* Modular component structure with separate files for each major section.
* Keep individual files short (approx. 600 lines max) to simplify future refactoring.
* Prioritize robust, reusable code blocks for future scalability.
* Use placeholders for complex state management; focus on logic flow.
* Suggest best practices and a tech stack.
* Format the entire output in Markdown for easy copying.</code></pre>
                    </div>

                    <p class="workflow-marker">Copy and paste this to complete the initial prompt</p>

                    <div class="prompt-box">
                        <div class="prompt-header">
                            <span>Personalized Prompt</span>
                            <button class="copy-btn">Copy</button>
                        </div>
                        <pre><code>The Project Specifics:
Now, apply the requirements above to the following project:
* Goal: [e.g., ETL + Data Cleaning + Basic Data Analysis for a CDC Project focused on Census Demographics]
* Tech Stack: [e.g., I want to use the R language exclusively.]
* Sample Data: [Paste your sample data or schema here]</code></pre>
                    </div>
                </section>
                <p class="workflow-marker final-instruction">Evaluate, Iterate, Complete</p>
            </div>
        `
    },
    1: {
        title: "2. THE IMPLEMENTATION: ANTI-GRAVITY (IDX)",
        html: `
            <div class="implementation-placeholder">
                <div class="placeholder-watermark">02</div>
                <div class="heartbeat-pulse"></div>
                <div class="placeholder-content-wrapper">
                    <h3>PAUSING PROGRESS</h3>
                    <p>Construction will resume once the <strong>The Kickstart</strong> plan is complete.</p>
                </div>
            </div>
        `
    },
    2: {
        title: "3. THE REVIEW: STRATEGIC FEEDBACK",
        html: `
            <div class="implementation-placeholder">
                <div class="placeholder-watermark">03</div>
                <div class="heartbeat-pulse"></div>
                <div class="placeholder-content-wrapper">
                    <h3>PAUSING PROGRESS</h3>
                    <p>Evaluation will resume once the <strong>Implementation</strong> phase is initiated.</p>
                </div>
            </div>
        `
    },
    3: {
        title: "4. THE ITERATION: REFINE AND REPEAT",
        html: `
            <div class="implementation-placeholder">
                <div class="placeholder-watermark">04</div>
                <div class="heartbeat-pulse"></div>
                <div class="placeholder-content-wrapper">
                    <h3>PAUSING PROGRESS</h3>
                    <p>Refinement loop will activate once the <strong>initial development cycle</strong> is established.</p>
                </div>
            </div>
        `
    }
};

function renderIntro(day) {
    const content = document.getElementById('workout-content');
    
    const innerContent = `
        <div class="intro-container layout-bento">
            <div class="grid-wrapper">
                ${day.exercises.map((ex, idx) => `
                    <div class="bento-card ${[0, 1, 2, 3].includes(idx) ? 'clickable-card' : ''}" 
                         ${[0, 1, 2, 3].includes(idx) ? `onclick="openDrawer(${idx})"` : ''}>
                        <h3>${ex.name.split(':')[0]}</h3>
                        <p class="step-note">${ex.note}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const mindset = `
        <div class="mindset-quote">
            ${day.mindset}
        </div>
    `;

    content.innerHTML = `
        <div style="text-align:center; margin-bottom: 30px;">
            <h2 style="font-weight:300;">${day.focus}</h2>
            <p class="section-description">${day.description}</p>
        </div>
        ${innerContent}
        ${mindset}
    `;
}


function openDrawer(index) {
    const content = drawerContent[index];
    if (!content) return;

    document.getElementById('drawer-title').innerText = content.title;
    document.getElementById('drawer-dynamic-content').innerHTML = content.html;

    document.getElementById('side-drawer').classList.add('active');
    document.getElementById('drawer-overlay').classList.add('active');
    document.body.classList.add('drawer-open');
    
    // Re-bind copy buttons for the new content
    bindCopyButtons();
}

function closeDrawer() {
    document.getElementById('side-drawer').classList.remove('active');
    document.getElementById('drawer-overlay').classList.remove('active');
    document.body.classList.remove('drawer-open');
}

// Global Event Listeners for Closing
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-drawer');
    const overlay = document.getElementById('drawer-overlay');

    if (closeBtn) closeBtn.onclick = closeDrawer;
    if (overlay) overlay.onclick = closeDrawer;

    // Setup Copy Buttons
    bindCopyButtons();

    window.onkeydown = (e) => {
        if (e.key === 'Escape') closeDrawer();
    };

    // Password Protection Logic
    const passwordOverlay = document.getElementById('password-overlay');
    
    if (window.APP_CONFIG && !window.APP_CONFIG.features.passwordProtection) {
        if (passwordOverlay) passwordOverlay.classList.add('hidden');
        return;
    }

    const passwordInput = document.getElementById('site-password-input');
    const passwordSubmit = document.getElementById('submit-password');
    const passwordError = document.getElementById('password-error');

    if (passwordSubmit && passwordInput) {
        const handlePasswordSubmit = () => {
            if (passwordInput.value === SITE_PASSWORD) {
                passwordOverlay.classList.add('hidden');
                passwordError.style.display = 'none';
                // Optional: Store in session storage if we want to remember it for the session
                // sessionStorage.setItem('site_unlocked', 'true');
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
        
        // Auto-focus password input
        passwordInput.focus();
    }
});

function bindCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(copyBtn => {
        copyBtn.onclick = async () => {
            const codeElement = copyBtn.closest('.prompt-box').querySelector('code');
            if (!codeElement) return;
            
            const text = codeElement.innerText;
            
            // 1. Try Modern Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                try {
                    await navigator.clipboard.writeText(text);
                    handleCopySuccess(copyBtn);
                    return;
                } catch (err) {
                    console.warn('Modern clipboard failed, trying fallback...', err);
                }
            }

            // 2. Legacy Fallback (execCommand)
            try {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                if (successful) {
                    handleCopySuccess(copyBtn);
                }
            } catch (err) {
                console.error('Fallback copy failed: ', err);
            }
        };
    });
}

function handleCopySuccess(btn) {
    const originalText = btn.innerText;
    btn.innerText = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove('copied');
    }, 2000);
}

window.onload = init;
