// Technical Site Comparison JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Format timestamps
    formatTimestamps();
    
    // Format comparison names
    formatComparisonNames();
    
    // Initialize metric bar animations
    initializeMetricBarAnimations();
    
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

// Format comparison names from technical format
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
        'whitepages': 'WhitePages',
        'beenverified': 'BeenVerified',
        'truepeoplesearch': 'TruePeopleSearch'
    };
    
    return siteMap[siteName.toLowerCase()] || 
           siteName.charAt(0).toUpperCase() + siteName.slice(1);
}

// Initialize metric bar animations using the fixed data-width pattern
function initializeMetricBarAnimations() {
    const metricBars = document.querySelectorAll('.metric-fill');
    
    metricBars.forEach((bar, index) => {
        // Use the fixed data-width pattern from the corrected approach
        const targetWidth = bar.dataset.width;
        
        if (targetWidth) {
            // Set initial width to 0%
            bar.style.width = '0%';
            
            // Animate to target width with staggered delay
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500 + (index * 200));
        }
    });
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
                if (entry.target.classList.contains('summary-card')) {
                    animateSummaryCard(entry.target);
                }
                
                if (entry.target.classList.contains('page-link-bubble')) {
                    animatePageBubble(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.summary-card, .page-link-bubble'
    );
    animatableElements.forEach(element => observer.observe(element));
}

// Animate summary cards
function animateSummaryCard(card) {
    // Add a subtle entrance effect
    card.style.transform = 'translateY(20px)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        card.style.transition = 'all 0.6s ease-out';
    }, 100);
}

// Animate page bubble links
function animatePageBubble(bubble) {
    // Add a slide-in effect
    bubble.style.transform = 'translateX(-20px)';
    bubble.style.opacity = '0';
    
    setTimeout(() => {
        bubble.style.transform = 'translateX(0)';
        bubble.style.opacity = '1';
        bubble.style.transition = 'all 0.4s ease-out';
    }, 100);
}

// Enhance accessibility
function enhanceAccessibility() {
    // Add ARIA labels to metric bars
    const metricBars = document.querySelectorAll('.metric-fill');
    metricBars.forEach(bar => {
        const metricItem = bar.closest('.metric-item');
        if (metricItem) {
            const label = metricItem.querySelector('.metric-name')?.textContent || '';
            const value = metricItem.querySelector('.metric-score')?.textContent || '';
            
            bar.setAttribute('role', 'progressbar');
            bar.setAttribute('aria-label', `${label}: ${value}`);
            bar.setAttribute('aria-valuenow', value.replace('%', ''));
            bar.setAttribute('aria-valuemin', '0');
            bar.setAttribute('aria-valuemax', '100');
        }
    });
    
    // Add role attributes to cards
    const cards = document.querySelectorAll('.summary-card, .page-link-bubble');
    cards.forEach(card => {
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
    });
    
    // Add ARIA label to overall score
    const overallScore = document.querySelector('.overall-score');
    if (overallScore) {
        const scoreValue = overallScore.querySelector('.score-percentage')?.textContent || '';
        overallScore.setAttribute('role', 'progressbar');
        overallScore.setAttribute('aria-label', `Overall technical similarity: ${scoreValue}`);
        overallScore.setAttribute('aria-valuenow', scoreValue.replace('%', ''));
        overallScore.setAttribute('aria-valuemin', '0');
        overallScore.setAttribute('aria-valuemax', '100');
    }
}

// Enhanced hover effects for interactive elements
function enhanceInteractivity() {
    // Page bubble hover effects
    const pageBubbles = document.querySelectorAll('.page-link-bubble');
    pageBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('.bubble-arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(5px)';
                arrow.style.opacity = '1';
            }
        });
        
        bubble.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('.bubble-arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(0)';
                arrow.style.opacity = '0.5';
            }
        });
    });
    
    // Summary card interactions
    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 35px rgba(44, 62, 80, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 20px rgba(44, 62, 80, 0.1)';
        });
    });
}

// Print optimization
function optimizeForPrint() {
    // Ensure all metric bars are fully visible for printing
    const metricBars = document.querySelectorAll('.metric-fill');
    metricBars.forEach(bar => {
        const targetWidth = bar.dataset.width;
        if (targetWidth) {
            bar.style.width = targetWidth;
            bar.style.transition = 'none';
        }
    });
    
    // Remove animations for print
    const animatedElements = document.querySelectorAll('[style*="transition"]');
    animatedElements.forEach(element => {
        element.style.transition = 'none';
    });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Export functionality for technical comparison data
function exportTechnicalComparison() {
    const comparisonData = {
        timestamp: new Date().toISOString(),
        comparison: document.querySelector('[data-comparison]')?.getAttribute('data-comparison') || '',
        overallScore: document.querySelector('.score-percentage')?.textContent || '',
        technicalMetrics: {
            htmlStructure: '',
            metaTags: '',
            frameworks: ''
        },
        riskAssessment: '',
        recommendations: []
    };
    
    // Extract technical metrics
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach((item, index) => {
        const score = item.querySelector('.metric-score')?.textContent || '';
        const name = item.querySelector('.metric-name')?.textContent.toLowerCase() || '';
        
        if (name.includes('html')) {
            comparisonData.technicalMetrics.htmlStructure = score;
        } else if (name.includes('meta')) {
            comparisonData.technicalMetrics.metaTags = score;
        } else if (name.includes('framework')) {
            comparisonData.technicalMetrics.frameworks = score;
        }
    });
    
    // Extract risk assessment
    const riskIndicator = document.querySelector('.risk-indicator');
    if (riskIndicator) {
        comparisonData.riskAssessment = riskIndicator.textContent;
    }
    
    // Extract recommendations
    const recommendations = document.querySelectorAll('.recommendation-item .rec-text');
    recommendations.forEach(rec => {
        comparisonData.recommendations.push(rec.textContent);
    });
    
    // Download as JSON
    const dataStr = JSON.stringify(comparisonData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `technical-comparison-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Technical comparison page load time: ${loadTime}ms`);
            
            // Track metric bar animation performance
            const animationStart = performance.now();
            setTimeout(() => {
                const animationEnd = performance.now();
                console.log(`Metric bar animations completed in: ${animationEnd - animationStart}ms`);
            }, 2000);
        });
    }
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

// Utility function to get similarity class based on score
function getSimilarityClass(score) {
    const numericScore = typeof score === 'string' ? 
        parseFloat(score.replace('%', '')) / 100 : score;
    
    if (numericScore >= 0.75) return 'error';      // High similarity = bad
    if (numericScore >= 0.5) return 'warning';     // Moderate similarity = warning
    if (numericScore >= 0.25) return 'good';       // Low similarity = good
    return 'excellent';                            // Very low similarity = excellent
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    enhanceInteractivity();
    trackPerformance();
    adaptToSystemTheme();
});

// Make functions available globally for onclick handlers
window.exportTechnicalComparison = exportTechnicalComparison;