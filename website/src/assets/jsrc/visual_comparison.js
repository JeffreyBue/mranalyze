// Visual Comparison JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Format timestamps
    formatTimestamps();
    
    // Format comparison names
    formatComparisonNames();
    
    // Initialize score circles
    initializeScoreCircles();
    
    // Add animation delays
    addAnimationDelays();
    
    // Format visual file names
    formatVisualFileNames();
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
        'whitepages': 'WhitePages'
    };
    
    return siteMap[siteName.toLowerCase()] || 
           siteName.charAt(0).toUpperCase() + siteName.slice(1);
}

// Initialize score circles with color coding
function initializeScoreCircles() {
    const scoreCircles = document.querySelectorAll('.score-circle[data-score]');
    scoreCircles.forEach(circle => {
        const score = parseFloat(circle.getAttribute('data-score'));
        const color = getScoreColor(score);
        circle.style.borderColor = color;
        
        // Add pulsing animation for very high or very low scores
        if (score > 0.9 || score < 0.3) {
            circle.style.animation = 'pulse 2s infinite';
        }
    });
    
    // Set grade colors
    const gradeElements = document.querySelectorAll('[data-grade]');
    gradeElements.forEach(element => {
        const score = parseFloat(element.getAttribute('data-grade'));
        const color = getScoreColor(score);
        element.style.color = color;
    });
}

// Get color based on score
function getScoreColor(score) {
    if (score >= 0.9) return '#e74c3c';      // Red - High similarity
    if (score >= 0.8) return '#f39c12';      // Orange - Good similarity
    if (score >= 0.7) return '#f1c40f';      // Yellow - Moderate similarity
    if (score >= 0.6) return '#c9f10f';      // YellowishGreen - Moderate-low similarity
    return '#27ae60';                        // Green - Low similarity
}

// Format visual file names for display
function formatVisualFileNames() {
    // This would be used if we need to format filenames in JavaScript
    // For now, we'll rely on the Mustache helper function
}

// Add staggered animation delays
function addAnimationDelays() {
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    const insightItems = document.querySelectorAll('.insight-item');
    insightItems.forEach((item, index) => {
        item.style.animationDelay = `${(index + 1) * 0.15}s`;
    });
}

// Enhanced hover effects for metric cards
function enhanceMetricCards() {
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const fill = this.querySelector('.metric-fill');
            const score = this.querySelector('.metric-score');
            if (fill && score) {
                fill.style.transform = 'scaleY(1.2)';
                score.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const fill = this.querySelector('.metric-fill');
            const score = this.querySelector('.metric-score');
            if (fill && score) {
                fill.style.transform = 'scaleY(1)';
                score.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize intersection observer for animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger metric bar animations
                if (entry.target.classList.contains('metric-card')) {
                    const fill = entry.target.querySelector('.metric-fill');
                    if (fill && !fill.dataset.animated) {
                        setTimeout(() => {
                            fill.style.width = fill.style.width; // Trigger animation
                            fill.dataset.animated = 'true';
                        }, 300);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const observeElements = document.querySelectorAll('.metric-card, .insight-item, .report-item');
    observeElements.forEach(element => observer.observe(element));
}

// Print optimization
function optimizeForPrint() {
    // Ensure all metric bars are visible at full width
    const metricFills = document.querySelectorAll('.metric-fill');
    metricFills.forEach(fill => {
        fill.style.transition = 'none';
    });
    
    // Expand any collapsed elements
    const reportItems = document.querySelectorAll('.report-item');
    reportItems.forEach(item => {
        item.style.display = 'block';
    });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels to metric elements
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        const label = card.querySelector('.metric-label').textContent;
        const score = card.querySelector('.metric-score').textContent;
        const fill = card.querySelector('.metric-fill');
        
        if (fill) {
            fill.setAttribute('role', 'progressbar');
            fill.setAttribute('aria-label', `${label}: ${score}`);
            fill.setAttribute('aria-valuenow', score.replace('%', ''));
            fill.setAttribute('aria-valuemin', '0');
            fill.setAttribute('aria-valuemax', '100');
        }
        
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
    });
    
    // Add role attributes to insight items
    const insightItems = document.querySelectorAll('.insight-item');
    insightItems.forEach(item => {
        item.setAttribute('role', 'article');
        item.setAttribute('tabindex', '0');
    });
    
    // Enhance link accessibility
    const reportLinks = document.querySelectorAll('.report-link');
    reportLinks.forEach(link => {
        const title = link.querySelector('.report-title').textContent;
        link.setAttribute('aria-label', `View detailed visual analysis for ${title}`);
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key functionality if needed
    if (e.key === 'Escape') {
        // Close any expanded elements or modals
        document.activeElement.blur();
    }
    
    // Enter key to activate focused elements
    if (e.key === 'Enter' && e.target.classList.contains('metric-card')) {
        // Could trigger detailed metric view if implemented
        console.log('Metric card activated:', e.target);
    }
});

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Visual comparison page load time: ${loadTime}ms`);
        });
    }
}

// Export functionality
function exportComparisonData() {
    const comparisonData = {
        timestamp: new Date().toISOString(),
        comparison: document.querySelector('[data-comparison]')?.getAttribute('data-comparison') || '',
        overallScore: document.querySelector('.score-percentage')?.textContent || '',
        metrics: {},
        insights: []
    };
    
    // Extract metric data
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        const label = card.querySelector('.metric-label')?.textContent || '';
        const score = card.querySelector('.metric-score')?.textContent || '';
        const metricKey = label.toLowerCase().replace(/\s+/g, '_');
        comparisonData.metrics[metricKey] = score;
    });
    
    // Extract insights
    const insightItems = document.querySelectorAll('.insight-text');
    insightItems.forEach(item => {
        comparisonData.insights.push(item.textContent);
    });
    
    // Download as JSON
    const dataStr = JSON.stringify(comparisonData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `visual-comparison-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Theme adaptation
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

// Metric comparison highlighting
function highlightMetricComparisons() {
    const metricCards = document.querySelectorAll('.metric-card');
    const scores = [];
    
    // Collect all scores
    metricCards.forEach(card => {
        const scoreText = card.querySelector('.metric-score').textContent;
        const score = parseFloat(scoreText.replace('%', ''));
        scores.push({ card, score });
    });
    
    // Find highest and lowest scores
    const sortedScores = scores.sort((a, b) => b.score - a.score);
    const highest = sortedScores[0];
    const lowest = sortedScores[sortedScores.length - 1];
    
    // Add visual indicators
    if (highest && highest.score > 80) {
        highest.card.classList.add('highest-score');
        highest.card.setAttribute('title', 'Highest similarity score');
    }
    
    if (lowest && lowest.score < 50) {
        lowest.card.classList.add('lowest-score');
        lowest.card.setAttribute('title', 'Lowest similarity score - needs attention');
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    initializeScrollAnimations();
    enhanceAccessibility();
    enhanceMetricCards();
    trackPerformance();
    adaptToSystemTheme();
    highlightMetricComparisons();
});

// Make functions available globally
window.exportComparisonData = exportComparisonData;