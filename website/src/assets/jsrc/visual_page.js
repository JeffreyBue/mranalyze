// Visual Page Comparison JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Format timestamps
    formatTimestamps();
    
    // Initialize dashboard tabs
    initializeDashboardTabs();
    
    // Initialize screenshot tabs
    initializeScreenshotTabs();
    
    // Initialize progress rings
    initializeProgressRings();
    
    // Format comparison names
    formatComparisonNames();
    
    // Add accessibility features
    enhanceAccessibility();
    
    // Initialize animations
    initializeAnimations();
}

// Format timestamps to readable dates
function formatTimestamps() {
    const timestampElements = document.querySelectorAll('[data-timestamp]');
    timestampElements.forEach(element => {
        const timestamp = element.getAttribute('data-timestamp');
        if (timestamp) {
            const date = new Date(timestamp);
            const formatted = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            element.textContent = formatted;
        }
    });
}

// Initialize dashboard tab functionality
function initializeDashboardTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Set first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Trigger animations for newly visible content
                triggerContentAnimations(targetContent);
            }
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize screenshot viewport tabs
function initializeScreenshotTabs() {
    const screenshotTabs = document.querySelectorAll('.screenshot-tab');
    const screenshotViewports = document.querySelectorAll('.screenshot-viewport');
    
    // Set desktop as default active
    const defaultTab = document.querySelector('.screenshot-tab[data-viewport="desktop"]');
    const defaultViewport = document.querySelector('.screenshot-viewport.desktop');
    
    if (defaultTab && defaultViewport) {
        defaultTab.classList.add('active');
        defaultViewport.classList.add('active');
    }
    
    screenshotTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetViewport = this.getAttribute('data-viewport');
            
            // Remove active from all tabs and viewports
            screenshotTabs.forEach(t => t.classList.remove('active'));
            screenshotViewports.forEach(v => v.classList.remove('active'));
            
            // Add active to clicked tab
            this.classList.add('active');
            
            // Show corresponding viewport
            const viewport = document.querySelector(`.screenshot-viewport[data-viewport="${targetViewport}"]`);
            if (viewport) {
                viewport.classList.add('active');
            }
        });
    });
}

// Initialize progress ring animations
function initializeProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring');
    
    progressRings.forEach(ring => {
        const progressValue = ring.getAttribute('data-progress');
        const circle = ring.querySelector('.progress-ring-circle');
        
        if (circle && progressValue) {
            const radius = 45;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (progressValue / 100) * circumference;
            
            circle.style.strokeDashoffset = offset;
            
            // Animate on scroll into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            circle.style.strokeDashoffset = offset;
                        }, 500);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(ring);
        }
    });
}

// Trigger animations for newly visible content
function triggerContentAnimations(content) {
    // Animate metric bars
    const metricBars = content.querySelectorAll('.metric-fill');
    metricBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transform = 'scaleX(1)';
        }, index * 100);
    });
    
    // Animate progress rings
    const progressRings = content.querySelectorAll('.progress-ring');
    progressRings.forEach((ring, index) => {
        setTimeout(() => {
            const progressValue = ring.getAttribute('data-progress');
            const circle = ring.querySelector('.progress-ring-circle');
            
            if (circle && progressValue) {
                const radius = 45;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (progressValue / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }
        }, 200 + (index * 100));
    });
}

// Format comparison names and technical strings
function formatComparisonNames() {
    const comparisonElements = document.querySelectorAll('[data-comparison]');
    comparisonElements.forEach(element => {
        const comparison = element.getAttribute('data-comparison');
        const formatted = formatComparisonName(comparison);
        element.textContent = formatted;
    });
}

// Format comparison string to readable format
function formatComparisonName(comparison) {
    if (!comparison) return '';
    
    // Split by _vs_ and format each site name
    const parts = comparison.split('_vs_');
    if (parts.length === 2) {
        const site1 = formatSiteName(parts[0]);
        const site2 = formatSiteName(parts[1]);
        return `${site1} vs ${site2}`;
    }
    
    return comparison;
}

// Format technical site name to readable format
function formatSiteName(technicalName) {
    if (!technicalName) return '';
    
    // Remove timestamp and convert to readable format
    const siteName = technicalName.split('_')[0];
    
    // Convert to title case and handle common site names
    const siteMap = {
        'instantcheckmate': 'InstantCheckmate',
        'truthfinder': 'TruthFinder',
        'intelius': 'Intelius',
        'whitepages': 'WhitePages'
    };
    
    return siteMap[siteName.toLowerCase()] || 
           siteName.charAt(0).toUpperCase() + siteName.slice(1);
}

// Initialize scroll-triggered animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger specific animations for different elements
                if (entry.target.classList.contains('metric-card')) {
                    animateMetricCard(entry.target);
                }
                
                if (entry.target.classList.contains('color-element-card')) {
                    animateColorCard(entry.target);
                }
                
                if (entry.target.classList.contains('typography-element-card')) {
                    animateTypographyCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.metric-card, .color-element-card, .typography-element-card, .viewport-card, .layout-detail-card'
    );
    animatableElements.forEach(element => observer.observe(element));
}

// Animate metric cards
function animateMetricCard(card) {
    const progressRing = card.querySelector('.progress-ring');
    if (progressRing) {
        const progressValue = progressRing.getAttribute('data-progress');
        const circle = progressRing.querySelector('.progress-ring-circle');
        
        if (circle && progressValue) {
            const radius = 45;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (progressValue / 100) * circumference;
            
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 500);
        }
    }
}

// Animate color cards
function animateColorCard(card) {
    const swatches = card.querySelectorAll('.swatch');
    swatches.forEach((swatch, index) => {
        setTimeout(() => {
            swatch.style.transform = 'scale(1.1)';
            setTimeout(() => {
                swatch.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Animate typography cards
function animateTypographyCard(card) {
    const comparisons = card.querySelectorAll('.typo-comparison');
    comparisons.forEach((comparison, index) => {
        setTimeout(() => {
            comparison.style.transform = 'translateX(10px)';
            setTimeout(() => {
                comparison.style.transform = 'translateX(0)';
            }, 200);
        }, index * 100);
    });
}

// Enhance accessibility
function enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach((button, index) => {
        const tabName = button.getAttribute('data-tab') || button.textContent;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-label', `Switch to ${tabName} analysis`);
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
    
    // Add ARIA labels to screenshot tabs
    const screenshotTabs = document.querySelectorAll('.screenshot-tab');
    screenshotTabs.forEach(tab => {
        const viewport = tab.getAttribute('data-viewport');
        tab.setAttribute('aria-label', `View ${viewport} screenshot comparison`);
    });
    
    // Add ARIA labels to progress rings
    const progressRings = document.querySelectorAll('.progress-ring');
    progressRings.forEach(ring => {
        const progress = ring.getAttribute('data-progress');
        ring.setAttribute('role', 'progressbar');
        ring.setAttribute('aria-valuenow', progress);
        ring.setAttribute('aria-valuemin', '0');
        ring.setAttribute('aria-valuemax', '100');
        ring.setAttribute('aria-label', `Score: ${progress}%`);
    });
    
    // Add focus management for tab navigation
    handleTabNavigation();
}

// Handle keyboard navigation for tabs
function handleTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = (index + 1) % tabButtons.length;
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                    break;
                case 'Home':
                    e.preventDefault();
                    targetIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    targetIndex = tabButtons.length - 1;
                    break;
                default:
                    return;
            }
            
            // Update tabindex and focus
            tabButtons.forEach(btn => btn.setAttribute('tabindex', '-1'));
            tabButtons[targetIndex].setAttribute('tabindex', '0');
            tabButtons[targetIndex].focus();
        });
    });
}

// Enhanced hover effects for interactive elements
function enhanceInteractivity() {
    // Color swatch hover effects
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        const swatchElement = swatch.querySelector('.swatch');
        const colorValue = swatch.querySelector('.color-value');
        
        if (swatchElement && colorValue) {
            swatch.addEventListener('mouseenter', function() {
                swatchElement.style.transform = 'scale(1.2)';
                colorValue.style.fontWeight = '700';
            });
            
            swatch.addEventListener('mouseleave', function() {
                swatchElement.style.transform = 'scale(1)';
                colorValue.style.fontWeight = 'normal';
            });
        }
    });
    
    // Typography comparison hover effects
    const typoComparisons = document.querySelectorAll('.typo-comparison');
    typoComparisons.forEach(comparison => {
        comparison.addEventListener('mouseenter', function() {
            this.style.background = '#f8f9fa';
            this.style.transform = 'translateX(5px)';
        });
        
        comparison.addEventListener('mouseleave', function() {
            this.style.background = '#ecf0f1';
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Layout detail card interactions
    const layoutCards = document.querySelectorAll('.layout-detail-card');
    layoutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const matchIndicator = this.querySelector('.match-indicator');
            if (matchIndicator) {
                matchIndicator.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const matchIndicator = this.querySelector('.match-indicator');
            if (matchIndicator) {
                matchIndicator.style.transform = 'scale(1)';
            }
        });
    });
}

// Print optimization
function optimizeForPrint() {
    // Show all tab contents for printing
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'block';
    });
    
    // Show all screenshot viewports
    const viewports = document.querySelectorAll('.screenshot-viewport');
    viewports.forEach(viewport => {
        viewport.style.display = 'block';
    });
    
    // Ensure all animations are completed
    const animatedElements = document.querySelectorAll('[style*="transition"]');
    animatedElements.forEach(element => {
        element.style.transition = 'none';
    });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Export functionality for analysis data
function exportPageAnalysis() {
    const pageData = {
        timestamp: new Date().toISOString(),
        comparison: document.querySelector('[data-comparison]')?.getAttribute('data-comparison') || '',
        page1: {
            folder: document.querySelector('.page-item .folder-name')?.textContent || '',
            pageId: document.querySelector('.page-item .page-name')?.textContent || ''
        },
        scores: {
            overall: document.querySelector('.score-percentage')?.textContent || '',
            layout: document.querySelector('.metric-card.layout-card .metric-score')?.textContent || '',
            colors: document.querySelector('.metric-card.colors-card .metric-score')?.textContent || '',
            typography: document.querySelector('.metric-card.typography-card .metric-score')?.textContent || '',
            responsive: document.querySelector('.metric-card.responsive-card .metric-score')?.textContent || ''
        }
    };
    
    // Download as JSON
    const dataStr = JSON.stringify(pageData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `page-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Theme detection and adaptation
function adaptToSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    }
    
    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Visual page comparison load time: ${loadTime}ms`);
        });
    }
}

// Utility function to animate score numbers
function animateScore(element, finalScore, duration = 1500) {
    const startScore = 0;
    const startTime = performance.now();
    
    function updateScore(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentScore = Math.floor(startScore + (finalScore - startScore) * progress);
        element.textContent = currentScore + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateScore);
        }
    }
    
    requestAnimationFrame(updateScore);
}

// Initialize score animations on scroll
function initializeScoreAnimations() {
    const scoreElements = document.querySelectorAll('.metric-score, .score-percentage');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const scoreText = entry.target.textContent.replace('%', '');
                const finalScore = parseInt(scoreText);
                
                if (!isNaN(finalScore)) {
                    animateScore(entry.target, finalScore);
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    });
    
    scoreElements.forEach(element => observer.observe(element));
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    enhanceInteractivity();
    initializeScoreAnimations();
    trackPerformance();
    adaptToSystemTheme();
});

// Make functions available globally for onclick handlers
window.exportPageAnalysis = exportPageAnalysis;