// Matrix Rain Effect for Loading Screen
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        this.charArray = this.chars.split('');
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.setupDrops();
        this.animate();
        
        // Listen for window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.setupDrops();
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
    }
    
    setupDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    draw() {
        // Create fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set text properties
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px 'Share Tech Mono', monospace`;
        this.ctx.textAlign = 'center';
        
        // Draw characters
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            const x = i * this.fontSize + this.fontSize / 2;
            const y = this.drops[i] * this.fontSize;
            
            // Add glow effect for some characters
            if (Math.random() > 0.98) {
                this.ctx.shadowColor = '#00ff41';
                this.ctx.shadowBlur = 10;
            } else {
                this.ctx.shadowBlur = 0;
            }
            
            this.ctx.fillText(char, x, y);
            
            // Reset the drop to top randomly after it reaches bottom
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    destroy() {
        this.stop();
        window.removeEventListener('resize', this.resizeCanvas);
    }
}

// Matrix Loading Sequence
class MatrixLoader {
    constructor() {
        this.loader = document.getElementById('matrix-loader');
        this.mainContent = document.getElementById('main-content');
        this.loadingText = document.querySelector('.loading-text .glitch');
        this.progressBar = document.querySelector('.loading-progress');
        
        this.messages = [
            'INITIALIZING NEURAL NETWORK',
            'CONNECTING TO MAINFRAME',
            'LOADING AI MODULES',
            'ESTABLISHING SECURE CONNECTION',
            'ACCESSING STEFAN.EXE',
            'SYSTEM READY'
        ];
        
        this.currentMessageIndex = 0;
        this.matrixRain = null;
        
        this.init();
    }
    
    init() {
        // Start matrix rain effect
        this.matrixRain = new MatrixRain();
        
        // Start loading sequence
        this.startLoadingSequence();
    }
    
    startLoadingSequence() {
        let progress = 0;
        const duration = 3000; // 3 seconds
        const interval = 100;
        const increment = (interval / duration) * 100;
        
        const loadingInterval = setInterval(() => {
            progress += increment;
            
            // Update progress bar
            this.progressBar.style.width = `${Math.min(progress, 100)}%`;
            
            // Update loading message
            const messageIndex = Math.floor((progress / 100) * this.messages.length);
            if (messageIndex !== this.currentMessageIndex && messageIndex < this.messages.length) {
                this.currentMessageIndex = messageIndex;
                this.updateLoadingMessage(this.messages[messageIndex]);
            }
            
            // Complete loading
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    this.completeLoading();
                }, 500);
            }
        }, interval);
    }
    
    updateLoadingMessage(message) {
        this.loadingText.textContent = message;
        this.loadingText.setAttribute('data-text', message);
        
        // Add glitch effect
        this.loadingText.style.animation = 'none';
        setTimeout(() => {
            this.loadingText.style.animation = 'glitch 0.3s infinite';
        }, 10);
    }
    
    completeLoading() {
        // Add fade out effect to loader
        this.loader.style.transition = 'opacity 1s ease-out';
        this.loader.style.opacity = '0';
        
        setTimeout(() => {
            // Hide loader and show main content
            this.loader.style.display = 'none';
            this.mainContent.classList.remove('hidden');
            
            // Stop matrix rain
            if (this.matrixRain) {
                this.matrixRain.destroy();
                this.matrixRain = null;
            }
            
            // Start main animations
            this.startMainAnimations();
            
            // Dispatch custom event for other components
            document.dispatchEvent(new CustomEvent('matrixLoadingComplete'));
        }, 1000);
    }
    
    startMainAnimations() {
        // Add fade-in animation to hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.transition = 'all 1s ease-out';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 200);
        }
        
        // Start typing animation for hero subtitle
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            this.typeWriter(typingText, 'AI SOLUTIONS ENGINEER', 100);
        }
        
        // Add scroll-triggered animations
        this.setupScrollAnimations();
    }
    
    typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // Remove typing border after completion
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(
            '.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .scale-in-on-scroll'
        );
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
        
        // Add scroll animations to sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.classList.add('fade-in-on-scroll');
            section.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(section);
        });
    }
}

// Auto-start when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only start if we're on the main page and loader exists
    if (document.getElementById('matrix-loader')) {
        new MatrixLoader();
    }
});

// Alternative: Skip loading animation for development/testing
function skipLoadingAnimation() {
    const loader = document.getElementById('matrix-loader');
    const mainContent = document.getElementById('main-content');
    
    if (loader && mainContent) {
        loader.style.display = 'none';
        mainContent.classList.remove('hidden');
        
        // Still run the main animations
        const matrixLoader = new MatrixLoader();
        matrixLoader.startMainAnimations();
    }
}

// Export for potential external use
window.MatrixRain = MatrixRain;
window.MatrixLoader = MatrixLoader;
window.skipLoadingAnimation = skipLoadingAnimation;
