// Advanced Animations and Effects for Cyberpunk Portfolio
class CyberAnimations {
    constructor() {
        this.isGSAPLoaded = false;
        this.animationQueue = [];
        this.particles = [];
        this.animationFrameId = null;
        
        this.init();
    }
    
    init() {
        this.checkGSAP();
        this.setupAdvancedAnimations();
        this.setupParticleSystem();
        this.setupGlitchEffects();
        this.setupHolographicEffects();
        this.startAnimationLoop();
    }
    
    checkGSAP() {
        if (typeof gsap !== 'undefined') {
            this.isGSAPLoaded = true;
            this.initGSAPAnimations();
        } else {
            console.warn('GSAP not loaded, falling back to CSS animations');
        }
    }
    
    initGSAPAnimations() {
        // GSAP Timeline for complex animations
        this.masterTimeline = gsap.timeline({ paused: true });
        
        // Hero entrance animation
        this.setupHeroAnimation();
        
        // Project cards staggered animation
        this.setupProjectCardsAnimation();
        
        // Skills bars enhanced animation
        this.setupSkillsAnimation();
    }
    
    setupHeroAnimation() {
        if (!this.isGSAPLoaded) return;
        
        const heroElements = {
            title: '.hero-name',
            subtitle: '.hero-subtitle',
            location: '.hero-location',
            description: '.hero-description',
            button: '.access-btn'
        };
        
        const tl = gsap.timeline();
        
        // Set initial states
        gsap.set(Object.values(heroElements), { 
            opacity: 0, 
            y: 50,
            rotationX: -15
        });
        
        // Animate elements in sequence
        tl.to(heroElements.title, {
            duration: 1,
            opacity: 1,
            y: 0,
            rotationX: 0,
            ease: "power3.out"
        })
        .to(heroElements.subtitle, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            rotationX: 0,
            ease: "power3.out"
        }, "-=0.5")
        .to(heroElements.location, {
            duration: 0.6,
            opacity: 1,
            y: 0,
            rotationX: 0,
            ease: "power3.out"
        }, "-=0.4")
        .to(heroElements.description, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            rotationX: 0,
            ease: "power3.out"
        }, "-=0.3")
        .to(heroElements.button, {
            duration: 1,
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            ease: "back.out(1.7)"
        }, "-=0.2");
        
        this.heroTimeline = tl;
    }
    
    setupProjectCardsAnimation() {
        if (!this.isGSAPLoaded) return;
        
        const cards = document.querySelectorAll('.project-card');
        
        gsap.set(cards, {
            opacity: 0,
            y: 100,
            rotationY: -15,
            transformPerspective: 1000
        });
        
        this.projectCardsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.projects-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
        
        this.projectCardsTimeline.to(cards, {
            duration: 1,
            opacity: 1,
            y: 0,
            rotationY: 0,
            stagger: 0.2,
            ease: "power3.out"
        });
    }
    
    setupSkillsAnimation() {
        if (!this.isGSAPLoaded) return;
        
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillItems = document.querySelectorAll('.skill-item');
        
        gsap.set(skillItems, {
            opacity: 0,
            x: -50
        });
        
        gsap.set(skillBars, {
            width: 0
        });
        
        this.skillsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.skills-matrix',
                start: 'top 70%',
                end: 'bottom 30%',
                toggleActions: 'play none none reverse'
            }
        });
        
        this.skillsTimeline
            .to(skillItems, {
                duration: 0.8,
                opacity: 1,
                x: 0,
                stagger: 0.1,
                ease: "power3.out"
            })
            .to(skillBars, {
                duration: 1.5,
                width: (index, element) => element.getAttribute('data-progress') + '%',
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.4");
    }
    
    setupAdvancedAnimations() {
        // Advanced hover effects for project cards
        this.setupProjectCardHoverEffects();
        
        // Terminal typewriter effect enhancement
        this.enhanceTerminalEffects();
        
        // Navigation link active states
        this.setupNavigationEffects();
        
        // Scroll-triggered parallax effects
        this.setupParallaxEffects();
    }
    
    setupProjectCardHoverEffects() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            const icon = card.querySelector('.project-icon');
            const title = card.querySelector('.project-title');
            const description = card.querySelector('.project-description');
            
            card.addEventListener('mouseenter', () => {
                if (this.isGSAPLoaded) {
                    gsap.to(card, {
                        duration: 0.3,
                        y: -10,
                        rotationY: 5,
                        transformPerspective: 1000,
                        ease: "power2.out"
                    });
                    
                    gsap.to(icon, {
                        duration: 0.3,
                        scale: 1.1,
                        rotation: 5,
                        ease: "power2.out"
                    });
                }
                
                this.addHolographicEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                if (this.isGSAPLoaded) {
                    gsap.to(card, {
                        duration: 0.3,
                        y: 0,
                        rotationY: 0,
                        ease: "power2.out"
                    });
                    
                    gsap.to(icon, {
                        duration: 0.3,
                        scale: 1,
                        rotation: 0,
                        ease: "power2.out"
                    });
                }
                
                this.removeHolographicEffect(card);
            });
        });
    }
    
    enhanceTerminalEffects() {
        const terminalWindow = document.querySelector('.terminal-window');
        if (!terminalWindow) return;
        
        // Add terminal glow effect
        terminalWindow.addEventListener('mouseenter', () => {
            if (this.isGSAPLoaded) {
                gsap.to(terminalWindow, {
                    duration: 0.3,
                    boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)',
                    ease: "power2.out"
                });
            }
        });
        
        terminalWindow.addEventListener('mouseleave', () => {
            if (this.isGSAPLoaded) {
                gsap.to(terminalWindow, {
                    duration: 0.3,
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                    ease: "power2.out"
                });
            }
        });
    }
    
    setupNavigationEffects() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (this.isGSAPLoaded) {
                    gsap.to(link, {
                        duration: 0.2,
                        scale: 1.05,
                        color: '#00ffff',
                        ease: "power2.out"
                    });
                }
                
                this.createLinkSpark(link);
            });
            
            link.addEventListener('mouseleave', () => {
                if (this.isGSAPLoaded) {
                    gsap.to(link, {
                        duration: 0.2,
                        scale: 1,
                        color: '#888888',
                        ease: "power2.out"
                    });
                }
            });
        });
    }
    
    setupParallaxEffects() {
        if (!this.isGSAPLoaded) return;
        
        // Parallax for hero particles
        const particles = document.querySelectorAll('.particle');
        
        gsap.to(particles, {
            y: -100,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Parallax for cyberpunk grid
        const cyberGrid = document.querySelector('.cyber-grid');
        
        if (cyberGrid) {
            gsap.to(cyberGrid, {
                backgroundPosition: "0px -200px",
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    }
    
    setupParticleSystem() {
        this.particleCanvas = document.createElement('canvas');
        this.particleCanvas.style.position = 'fixed';
        this.particleCanvas.style.top = '0';
        this.particleCanvas.style.left = '0';
        this.particleCanvas.style.width = '100%';
        this.particleCanvas.style.height = '100%';
        this.particleCanvas.style.pointerEvents = 'none';
        this.particleCanvas.style.zIndex = '1';
        this.particleCanvas.style.opacity = '0.6';
        
        document.body.appendChild(this.particleCanvas);
        
        this.particleCtx = this.particleCanvas.getContext('2d');
        this.resizeParticleCanvas();
        
        // Initialize particles
        for (let i = 0; i < 50; i++) {
            this.particles.push(this.createParticle());
        }
        
        window.addEventListener('resize', () => {
            this.resizeParticleCanvas();
        });
    }
    
    resizeParticleCanvas() {
        this.particleCanvas.width = window.innerWidth;
        this.particleCanvas.height = window.innerHeight;
    }
    
    createParticle() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff'
        };
    }
    
    updateParticles() {
        this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.particleCanvas.width;
            if (particle.x > this.particleCanvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.particleCanvas.height;
            if (particle.y > this.particleCanvas.height) particle.y = 0;
            
            // Draw particle
            this.particleCtx.save();
            this.particleCtx.globalAlpha = particle.opacity;
            this.particleCtx.fillStyle = particle.color;
            this.particleCtx.shadowBlur = 10;
            this.particleCtx.shadowColor = particle.color;
            this.particleCtx.beginPath();
            this.particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.particleCtx.fill();
            this.particleCtx.restore();
        });
    }
    
    setupGlitchEffects() {
        // Random glitch effects on text elements
        const glitchElements = document.querySelectorAll('.glitch');
        
        setInterval(() => {
            if (Math.random() > 0.95) {
                const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
                this.triggerGlitchEffect(randomElement);
            }
        }, 2000);
    }
    
    triggerGlitchEffect(element) {
        if (!element) return;
        
        element.style.animation = 'none';
        
        setTimeout(() => {
            element.style.animation = 'glitch 0.3s infinite';
            
            setTimeout(() => {
                element.style.animation = '';
            }, 300);
        }, 10);
    }
    
    setupHolographicEffects() {
        // Create holographic overlay system
        this.holographicOverlay = document.createElement('div');
        this.holographicOverlay.style.position = 'fixed';
        this.holographicOverlay.style.top = '0';
        this.holographicOverlay.style.left = '0';
        this.holographicOverlay.style.width = '100%';
        this.holographicOverlay.style.height = '100%';
        this.holographicOverlay.style.pointerEvents = 'none';
        this.holographicOverlay.style.zIndex = '999';
        this.holographicOverlay.style.opacity = '0';
        this.holographicOverlay.style.background = `
            radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)
        `;
        
        document.body.appendChild(this.holographicOverlay);
    }
    
    addHolographicEffect(element) {
        if (this.isGSAPLoaded) {
            gsap.to(this.holographicOverlay, {
                duration: 0.3,
                opacity: 1,
                ease: "power2.out"
            });
        }
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const shimmer = document.createElement('div');
        shimmer.style.position = 'absolute';
        shimmer.style.top = '0';
        shimmer.style.left = '-100%';
        shimmer.style.width = '100%';
        shimmer.style.height = '100%';
        shimmer.style.background = 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)';
        shimmer.style.transition = 'left 0.6s ease-out';
        shimmer.classList.add('holographic-shimmer');
        
        element.appendChild(shimmer);
        
        setTimeout(() => {
            shimmer.style.left = '100%';
        }, 10);
    }
    
    removeHolographicEffect(element) {
        if (this.isGSAPLoaded) {
            gsap.to(this.holographicOverlay, {
                duration: 0.3,
                opacity: 0,
                ease: "power2.out"
            });
        }
        
        const shimmer = element.querySelector('.holographic-shimmer');
        if (shimmer) {
            setTimeout(() => {
                if (shimmer.parentNode) {
                    shimmer.parentNode.removeChild(shimmer);
                }
            }, 600);
        }
    }
    
    createLinkSpark(element) {
        const spark = document.createElement('div');
        spark.style.position = 'absolute';
        spark.style.width = '4px';
        spark.style.height = '4px';
        spark.style.background = '#00ffff';
        spark.style.borderRadius = '50%';
        spark.style.boxShadow = '0 0 10px #00ffff';
        spark.style.left = '50%';
        spark.style.top = '50%';
        spark.style.transform = 'translate(-50%, -50%)';
        spark.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.appendChild(spark);
        
        if (this.isGSAPLoaded) {
            gsap.to(spark, {
                duration: 0.6,
                scale: 3,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => {
                    if (spark.parentNode) {
                        spark.parentNode.removeChild(spark);
                    }
                }
            });
        } else {
            setTimeout(() => {
                if (spark.parentNode) {
                    spark.parentNode.removeChild(spark);
                }
            }, 600);
        }
    }
    
    startAnimationLoop() {
        const animate = () => {
            this.updateParticles();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    stopAnimationLoop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    
    // Public methods for external control
    playHeroAnimation() {
        if (this.heroTimeline) {
            this.heroTimeline.play();
        }
    }
    
    playProjectsAnimation() {
        if (this.projectCardsTimeline) {
            this.projectCardsTimeline.play();
        }
    }
    
    playSkillsAnimation() {
        if (this.skillsTimeline) {
            this.skillsTimeline.play();
        }
    }
    
    createCustomGlitch(element, duration = 300) {
        if (!element) return;
        
        const originalTransform = element.style.transform;
        const glitchInterval = setInterval(() => {
            const x = (Math.random() - 0.5) * 4;
            const y = (Math.random() - 0.5) * 4;
            element.style.transform = `translate(${x}px, ${y}px)`;
        }, 50);
        
        setTimeout(() => {
            clearInterval(glitchInterval);
            element.style.transform = originalTransform;
        }, duration);
    }
    
    createElectricArc(startElement, endElement) {
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        
        const arc = document.createElement('div');
        arc.style.position = 'fixed';
        arc.style.left = startRect.left + startRect.width / 2 + 'px';
        arc.style.top = startRect.top + startRect.height / 2 + 'px';
        arc.style.width = '2px';
        arc.style.height = Math.sqrt(
            Math.pow(endRect.left - startRect.left, 2) + 
            Math.pow(endRect.top - startRect.top, 2)
        ) + 'px';
        arc.style.background = 'linear-gradient(to bottom, #00ffff, #ff00ff)';
        arc.style.transformOrigin = 'top';
        arc.style.transform = `rotate(${Math.atan2(
            endRect.top - startRect.top,
            endRect.left - startRect.left
        ) + Math.PI / 2}rad)`;
        arc.style.boxShadow = '0 0 10px #00ffff';
        arc.style.pointerEvents = 'none';
        arc.style.zIndex = '1000';
        
        document.body.appendChild(arc);
        
        if (this.isGSAPLoaded) {
            gsap.fromTo(arc, 
                { scaleY: 0, opacity: 1 },
                { 
                    duration: 0.3,
                    scaleY: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(arc, {
                            duration: 0.3,
                            opacity: 0,
                            onComplete: () => {
                                if (arc.parentNode) {
                                    arc.parentNode.removeChild(arc);
                                }
                            }
                        });
                    }
                }
            );
        } else {
            setTimeout(() => {
                if (arc.parentNode) {
                    arc.parentNode.removeChild(arc);
                }
            }, 600);
        }
    }
    
    destroy() {
        this.stopAnimationLoop();
        
        if (this.particleCanvas && this.particleCanvas.parentNode) {
            this.particleCanvas.parentNode.removeChild(this.particleCanvas);
        }
        
        if (this.holographicOverlay && this.holographicOverlay.parentNode) {
            this.holographicOverlay.parentNode.removeChild(this.holographicOverlay);
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cyberAnimations = new CyberAnimations();
});

// Listen for matrix loading completion to start hero animations
document.addEventListener('matrixLoadingComplete', () => {
    if (window.cyberAnimations) {
        setTimeout(() => {
            window.cyberAnimations.playHeroAnimation();
        }, 500);
    }
});

// Export for external use
window.CyberAnimations = CyberAnimations;
