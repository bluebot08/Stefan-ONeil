// Main JavaScript for Cyberpunk Portfolio
class CyberPortfolio {
    constructor() {
        this.currentTheme = 'cyberpunk';
        this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
        this.konamiIndex = 0;
        this.skillsAnimated = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupThemeToggle();
        this.setupKonamiCode();
        this.setupSmoothScrolling();
        this.setupProjectModals();
        this.setupParticleEffects();
        
        // Initialize skill bars animation when page loads
        setTimeout(() => {
            this.animateSkillBars();
        }, 2000);
    }
    
    setupEventListeners() {
        // Navigation smooth scrolling
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Project card hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverGlow(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverGlow(card);
            });
        });
        
        // Cyber button effects
        document.querySelectorAll('.cyber-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.addClickEffect(btn);
            });
        });
        
        // Easter egg activation
        document.addEventListener('easterEggActivated', () => {
            this.showEasterEgg();
        });
        
        // Matrix loading completion
        document.addEventListener('matrixLoadingComplete', () => {
            this.onLoadingComplete();
        });
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    
                    // Special handling for skills section
                    if (entry.target.id === 'about' && !this.skillsAnimated) {
                        setTimeout(() => {
                            this.animateSkillBars();
                        }, 500);
                    }
                }
            });
        }, observerOptions);
        
        // Observe sections for scroll animations
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-in-on-scroll');
            observer.observe(section);
        });
        
        // Observe project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.classList.add('scale-in-on-scroll');
            card.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(card);
        });
        
        // Observe skill items
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.classList.add('slide-in-right-on-scroll');
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
                
                // Update icon
                if (this.currentTheme === 'matrix') {
                    themeIcon.textContent = '🟢';
                } else {
                    themeIcon.textContent = '🔋';
                }
                
                // Add click effect
                this.addClickEffect(themeToggle);
            });
        }
    }
    
    toggleTheme() {
        const body = document.body;
        
        if (this.currentTheme === 'cyberpunk') {
            body.classList.add('matrix-theme');
            this.currentTheme = 'matrix';
            this.showNotification('Matrix theme activated', 'success');
        } else {
            body.classList.remove('matrix-theme');
            this.currentTheme = 'cyberpunk';
            this.showNotification('Cyberpunk theme activated', 'success');
        }
        
        // Add screen flash effect
        this.addScreenFlash();
    }
    
    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activateKonamiCode();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }
    
    activateKonamiCode() {
        this.showEasterEgg();
        this.addScreenShake();
        this.showNotification('Konami Code activated! 🕶️', 'success');
        
        // Add some special effects
        this.createElectricSparks();
        
        // Play Matrix theme for 10 seconds
        const originalTheme = this.currentTheme;
        if (this.currentTheme !== 'matrix') {
            this.toggleTheme();
            
            setTimeout(() => {
                if (this.currentTheme !== originalTheme) {
                    this.toggleTheme();
                }
            }, 10000);
        }
    }
    
    setupSmoothScrolling() {
        // Smooth scroll for access button
        window.scrollToTerminal = () => {
            document.querySelector('#terminal').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        };
        
        // Smooth scroll for project navigation
        window.scrollToProjects = () => {
            document.querySelector('#projects').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        };
    }
    
    setupProjectModals() {
        // Project modal functionality
        window.openProjectDemo = (projectId) => {
            this.showProjectModal(projectId);
        };
        
        window.closeProjectModal = () => {
            this.hideProjectModal();
        };
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideProjectModal();
                this.hideEasterEgg();
            }
        });
    }
    
    showProjectModal(projectId) {
        const modal = document.getElementById('project-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal) return;
        
        const projects = {
            'neural-qa': {
                title: 'NEURAL QA MATRIX',
                content: `
                    <h4>Advanced LLM Agent System</h4>
                    <p>A comprehensive solution for media content analysis using intelligent agents.</p>
                    
                    <h5>Key Features:</h5>
                    <ul>
                        <li>🧠 <strong>Content Analysis:</strong> Deep semantic understanding of media content</li>
                        <li>🔍 <strong>Accuracy Verification:</strong> Automated fact-checking and validation</li>
                        <li>🌐 <strong>Translation QA:</strong> Quality assessment for multilingual content</li>
                        <li>⚡ <strong>Functional Testing:</strong> Automated QA workflows</li>
                        <li>📊 <strong>Real-time Reporting:</strong> Detailed analysis dashboards</li>
                    </ul>
                    
                    <h5>Technology Stack:</h5>
                    <div class="tech-tags">
                        <span class="tech-tag">Python</span>
                        <span class="tech-tag">OpenAI GPT</span>
                        <span class="tech-tag">LangChain</span>
                        <span class="tech-tag">FastAPI</span>
                        <span class="tech-tag">PostgreSQL</span>
                    </div>
                    
                    <h5>Current Status:</h5>
                    <p>🟢 <strong>Active Development</strong> - Beta testing with enterprise clients</p>
                `
            },
            'lead-nexus': {
                title: 'LEAD NEXUS SYSTEM',
                content: `
                    <h4>Integrated AI Agent Platform</h4>
                    <p>Unified ecosystem combining lead generation, CRM, and email automation.</p>
                    
                    <h5>System Modules:</h5>
                    <ul>
                        <li>🎯 <strong>Lead Generator:</strong> AI-powered prospect identification</li>
                        <li>👥 <strong>CRM Integration:</strong> Intelligent customer relationship management</li>
                        <li>📧 <strong>Email Automation:</strong> Personalized outreach campaigns</li>
                        <li>📈 <strong>Analytics Engine:</strong> Performance tracking and optimization</li>
                        <li>🔄 <strong>Agent Orchestration:</strong> Coordinated AI workflows</li>
                    </ul>
                    
                    <h5>Technology Stack:</h5>
                    <div class="tech-tags">
                        <span class="tech-tag">TypeScript</span>
                        <span class="tech-tag">Node.js</span>
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">MongoDB</span>
                        <span class="tech-tag">Redis</span>
                    </div>
                    
                    <h5>Current Status:</h5>
                    <p>🟡 <strong>In Development</strong> - Core architecture complete, integrating modules</p>
                `
            },
            'portfolio': {
                title: 'CYBERPUNK PORTFOLIO',
                content: `
                    <h4>Interactive Portfolio Experience</h4>
                    <p>A Matrix-inspired showcase of modern web development techniques.</p>
                    
                    <h5>Features:</h5>
                    <ul>
                        <li>🌧️ <strong>Matrix Rain:</strong> Authentic digital rain loading animation</li>
                        <li>💻 <strong>Interactive Terminal:</strong> Fully functional command interface</li>
                        <li>🎨 <strong>Cyberpunk Design:</strong> Neon aesthetics with smooth animations</li>
                        <li>📱 <strong>Responsive Layout:</strong> Optimized for all devices</li>
                        <li>🎮 <strong>Easter Eggs:</strong> Hidden features and Konami code</li>
                    </ul>
                    
                    <h5>Technology Stack:</h5>
                    <div class="tech-tags">
                        <span class="tech-tag">HTML5</span>
                        <span class="tech-tag">CSS3</span>
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">Three.js</span>
                        <span class="tech-tag">GSAP</span>
                    </div>
                    
                    <h5>Current Status:</h5>
                    <p>🟢 <strong>Live</strong> - You're experiencing it right now!</p>
                    
                    <div style="margin-top: 20px;">
                        <a href="https://github.com/bluebot08/Stefan-ONeil" target="_blank" class="cyber-btn-outline">
                            View Source Code
                        </a>
                    </div>
                `
            }
        };
        
        const project = projects[projectId];
        if (project) {
            modalTitle.textContent = project.title;
            modalBody.innerHTML = project.content;
            modal.classList.remove('hidden');
            
            // Add show animation
            setTimeout(() => {
                modal.querySelector('.modal-content').style.transform = 'scale(1)';
                modal.querySelector('.modal-content').style.opacity = '1';
            }, 10);
        }
    }
    
    hideProjectModal() {
        const modal = document.getElementById('project-modal');
        if (modal && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    }
    
    animateSkillBars() {
        if (this.skillsAnimated) return;
        
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            
            setTimeout(() => {
                bar.style.width = `${progress}%`;
            }, index * 200);
        });
        
        this.skillsAnimated = true;
    }
    
    setupParticleEffects() {
        // Add floating particles to hero section
        this.createFloatingParticles();
        
        // Add scan line effect
        this.createScanLine();
    }
    
    createFloatingParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;
        
        // Add more particles dynamically
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    createScanLine() {
        const scanLine = document.createElement('div');
        scanLine.classList.add('scanline');
        document.body.appendChild(scanLine);
        
        // Remove after animation
        setTimeout(() => {
            if (scanLine.parentNode) {
                scanLine.parentNode.removeChild(scanLine);
            }
        }, 3000);
    }
    
    createElectricSparks() {
        const sparksContainer = document.createElement('div');
        sparksContainer.style.position = 'fixed';
        sparksContainer.style.top = '0';
        sparksContainer.style.left = '0';
        sparksContainer.style.width = '100%';
        sparksContainer.style.height = '100%';
        sparksContainer.style.pointerEvents = 'none';
        sparksContainer.style.zIndex = '999';
        
        for (let i = 0; i < 20; i++) {
            const spark = document.createElement('div');
            spark.classList.add('electric-spark');
            spark.style.left = Math.random() * 100 + '%';
            spark.style.top = Math.random() * 100 + '%';
            spark.style.animationDelay = Math.random() * 2 + 's';
            sparksContainer.appendChild(spark);
        }
        
        document.body.appendChild(sparksContainer);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (sparksContainer.parentNode) {
                sparksContainer.parentNode.removeChild(sparksContainer);
            }
        }, 3000);
    }
    
    addHoverGlow(element) {
        element.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
        element.style.transform = 'translateY(-10px) scale(1.02)';
    }
    
    removeHoverGlow(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }
    
    addClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    addScreenFlash() {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.background = 'rgba(0, 255, 255, 0.1)';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '9998';
        flash.style.opacity = '1';
        flash.style.transition = 'opacity 0.3s ease-out';
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => {
                if (flash.parentNode) {
                    flash.parentNode.removeChild(flash);
                }
            }, 300);
        }, 100);
    }
    
    addScreenShake() {
        document.body.classList.add('screen-shake');
        
        setTimeout(() => {
            document.body.classList.remove('screen-shake');
        }, 500);
    }
    
    showEasterEgg() {
        const easterEgg = document.getElementById('easter-egg');
        if (easterEgg) {
            easterEgg.classList.remove('hidden');
        }
    }
    
    hideEasterEgg() {
        const easterEgg = document.getElementById('easter-egg');
        if (easterEgg && !easterEgg.classList.contains('hidden')) {
            easterEgg.classList.add('hidden');
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = type === 'success' ? 'rgba(0, 255, 65, 0.9)' : 'rgba(0, 255, 255, 0.9)';
        notification.style.color = '#000';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.fontFamily = 'Share Tech Mono, monospace';
        notification.style.fontSize = '14px';
        notification.style.fontWeight = 'bold';
        notification.style.zIndex = '10000';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'transform 0.3s ease-out';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Slide out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    onLoadingComplete() {
        // Any additional setup after loading is complete
        this.showNotification('Neural network online', 'success');
        
        // Start ambient effects
        this.startAmbientEffects();
    }
    
    startAmbientEffects() {
        // Add periodic scan lines
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createScanLine();
            }
        }, 10000);
        
        // Add periodic particle bursts
        setInterval(() => {
            if (Math.random() > 0.8) {
                this.createElectricSparks();
            }
        }, 15000);
    }
}

// Global functions for HTML onclick handlers
window.closeEasterEgg = function() {
    const easterEgg = document.getElementById('easter-egg');
    if (easterEgg) {
        easterEgg.classList.add('hidden');
    }
};

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cyberPortfolio = new CyberPortfolio();
});

// Add CSS for ripple effect
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Export for external use
window.CyberPortfolio = CyberPortfolio;
