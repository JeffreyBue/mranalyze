// Visual Master Summary JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Format timestamps
    formatTimestamps();
    
    // Calculate summary statistics
    calculateSummaryStats();
    
    // Format site names in comparison titles
    formatComparisonNames();
    
    // Initialize score circles
    initializeScoreCircles();
    
    // Add animation delays to elements
    addAnimationDelays();
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

// Calculate and display summary statistics
function calculateSummaryStats() {
    // Calculate average score across all comparisons
    const scoreElements = document.querySelectorAll('.score-number');
    let totalScore = 0;
    let count = 0;
    
    scoreElements.forEach(element => {
        const scoreText = element.textContent.replace('%', '');
        const score = parseFloat(scoreText);
        if (!isNaN(score)) {
            totalScore += score;
            count++;
        }
    });
    
    if (count > 0) {
        const avgScore = Math.round(totalScore / count);
        const avgScoreElement = document.getElementById('average-score');
        if (avgScoreElement) {
            avgScoreElement.textContent = avgScore + '%';
        }
    }
    
    // Calculate total pages across all comparisons
    const pageElements = document.querySelectorAll('.pages-number');
    let totalPages = 0;
    
    pageElements.forEach(element => {
        const pages = parseInt(element.textContent);
        if (!isNaN(pages)) {
            totalPages += pages;
        }
    });
    
    const totalPagesElement = document.getElementById('total-pages');
    if (totalPagesElement) {
        totalPagesElement.textContent = totalPages;
    }
    
    // Analyze performance metrics
    analyzePerformanceMetrics();
}

// Analyze performance metrics to find best/worst
function analyzePerformanceMetrics() {
    const metricCategories = ['layout', 'colors', 'typography', 'responsive', 'design-system', 'hierarchy', 'spacing'];
    const metricSums = {};
    const metricCounts = {};
    
    // Initialize sums and counts
    metricCategories.forEach(category => {
        metricSums[category] = 0;
        metricCounts[category] = 0;
    });
    
    // Sum up all metric values
    metricCategories.forEach(category => {
        const bars = document.querySelectorAll(`.bar-fill.${category}`);
        bars.forEach(bar => {
            const value = parseFloat(bar.getAttribute('data-value').replace('%', ''));
            if (!isNaN(value)) {
                metricSums[category] += value;
                metricCounts[category]++;
            }
        });
    });
    
    // Calculate averages and find best/worst
    const metricAverages = {};
    metricCategories.forEach(category => {
        if (metricCounts[category] > 0) {
            metricAverages[category] = metricSums[category] / metricCounts[category];
        }
    });
    
    // Find best and worst metrics
    let bestMetric = '';
    let worstMetric = '';
    let bestScore = -1;
    let worstScore = 101;
    
    Object.keys(metricAverages).forEach(metric => {
        const score = metricAverages[metric];
        if (score > bestScore) {
            bestScore = score;
            bestMetric = metric;
        }
        if (score < worstScore) {
            worstScore = score;
            worstMetric = metric;
        }
    });
    
    // Update performance summary
    const bestMetricElement = document.getElementById('best-metric');
    const worstMetricElement = document.getElementById('worst-metric');
    const consistencyElement = document.getElementById('consistency-level');
    
    if (bestMetricElement && bestMetric) {
        bestMetricElement.textContent = formatMetricName(bestMetric);
        bestMetricElement.className = 'perf-value best';
    }
    
    if (worstMetricElement && worstMetric) {
        worstMetricElement.textContent = formatMetricName(worstMetric);
        worstMetricElement.className = 'perf-value needs-work';
    }
    
    if (consistencyElement) {
        const variance = bestScore - worstScore;
        let consistencyLevel = 'High';
        let className = 'perf-value best';
        
        if (variance > 40) {
            consistencyLevel = 'Low';
            className = 'perf-value needs-work';
        } else if (variance > 20) {
            consistencyLevel = 'Moderate';
            className = 'perf-value variance';
        }
        
        consistencyElement.textContent = consistencyLevel;
        consistencyElement.className = className;
    }
}

// Format metric names for display
function formatMetricName(metric) {
    const metricNames = {
        'layout': 'Layout Structure',
        'colors': 'Color Schemes',
        'typography': 'Typography',
        'responsive': 'Responsive Design',
        'design-system': 'Design System',
        'hierarchy': 'Visual Hierarchy',
        'spacing': 'Spacing'
    };
    return metricNames[metric] || metric;
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

// Initialize score circles with animated borders
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
}

// Get color based on score
function getScoreColor(score) {
    if (score >= 0.9) return '#e74c3c';      // Red - High similarity
    if (score >= 0.8) return '#f39c12';      // Orange - Good similarity
    if (score >= 0.7) return '#f1c40f';      // Yellow - Moderate similarity
    if (score >= 0.6) return '#c9f10f';      // YellowishGreen - Moderate-low similarity
    return '#27ae60';                        // Green - Low similarity
}

// Toggle metrics detail visibility
function toggleMetricsDetail(button) {
    const card = button.closest('.comparison-card');
    const metricsDetail = card.querySelector('.metrics-detail');
    const buttonText = button.querySelector('span');
    const buttonIcon = button.querySelector('svg path');
    
    if (metricsDetail.style.display === 'none' || !metricsDetail.style.display) {
        // Show metrics
        metricsDetail.style.display = 'block';
        buttonText.textContent = 'Hide Metrics';
        buttonIcon.setAttribute('d', 'M7 14L12 9L17 14H7Z'); // Up arrow
        
        // Animate metric bars
        setTimeout(() => {
            const bars = metricsDetail.querySelectorAll('.bar-fill-small');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transform = 'scaleX(1)';
                }, index * 100);
            });
        }, 100);
    } else {
        // Hide metrics
        metricsDetail.style.display = 'none';
        buttonText.textContent = 'Show Metrics';
        buttonIcon.setAttribute('d', 'M7 10L12 15L17 10H7Z'); // Down arrow
    }
}

// Add staggered animation delays
function addAnimationDelays() {
    const animatedElements = document.querySelectorAll('.metric-card, .insight-card, .comparison-card');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
}

// Utility function to animate numbers
function animateNumber(element, start, end, duration = 1000) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (difference * progress));
        element.textContent = current + (element.textContent.includes('%') ? '%' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Initialize intersection observer for scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger number animations for stat cards
                if (entry.target.classList.contains('stat-card')) {
                    const numberElement = entry.target.querySelector('.stat-number');
                    if (numberElement && !numberElement.dataset.animated) {
                        const finalValue = parseInt(numberElement.textContent.replace(/\D/g, ''));
                        if (!isNaN(finalValue)) {
                            numberElement.textContent = '0';
                            animateNumber(numberElement, 0, finalValue, 1500);
                            numberElement.dataset.animated = 'true';
                        }
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe all cards and animated elements
    const observeElements = document.querySelectorAll('.stat-card, .metric-card, .insight-card, .comparison-card');
    observeElements.forEach(element => observer.observe(element));
}

// Enhanced hover effects for metric bars
function enhanceMetricBars() {
    const metricBars = document.querySelectorAll('.metric-bar');
    metricBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const fill = this.querySelector('.bar-fill');
            const value = this.querySelector('.metric-value');
            if (fill && value) {
                fill.style.transform = 'scaleY(1.2)';
                value.style.fontWeight = '900';
                value.style.color = '#2c3e50';
            }
        });
        
        bar.addEventListener('mouseleave', function() {
            const fill = this.querySelector('.bar-fill');
            const value = this.querySelector('.metric-value');
            if (fill && value) {
                fill.style.transform = 'scaleY(1)';
                value.style.fontWeight = '700';
                value.style.color = '#3498db';
            }
        });
    });
}

// Print optimization
function optimizeForPrint() {
    // Expand all collapsed metrics details
    const metricsDetails = document.querySelectorAll('.metrics-detail');
    metricsDetails.forEach(detail => {
        detail.style.display = 'block';
    });
    
    // Ensure all bars are visible with their full width
    const bars = document.querySelectorAll('.bar-fill, .bar-fill-small');
    bars.forEach(bar => {
        bar.style.transition = 'none';
    });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close expanded metric details
    if (e.key === 'Escape') {
        const expandedMetrics = document.querySelectorAll('.metrics-detail[style*="block"]');
        expandedMetrics.forEach(detail => {
            const card = detail.closest('.comparison-card');
            const button = card.querySelector('.action-btn.secondary');
            if (button) {
                toggleMetricsDetail(button);
            }
        });
    }
    
    // Space bar to toggle metrics on focused cards
    if (e.key === ' ' && e.target.classList.contains('action-btn')) {
        e.preventDefault();
        e.target.click();
    }
});

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels to metric bars
    const metricBars = document.querySelectorAll('.metric-bar');
    metricBars.forEach(bar => {
        const label = bar.querySelector('.metric-label').textContent;
        const value = bar.querySelector('.metric-value').textContent;
        const barFill = bar.querySelector('.bar-fill');
        if (barFill) {
            barFill.setAttribute('role', 'progressbar');
            barFill.setAttribute('aria-label', `${label}: ${value}`);
            barFill.setAttribute('aria-valuenow', value.replace('%', ''));
            barFill.setAttribute('aria-valuemin', '0');
            barFill.setAttribute('aria-valuemax', '100');
        }
    });
    
    // Add role attributes to cards
    const cards = document.querySelectorAll('.metric-card, .insight-card, .comparison-card');
    cards.forEach(card => {
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
    });
    
    // Enhance button accessibility
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            button.setAttribute('aria-label', text);
        }
    });
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Visual analysis page load time: ${loadTime}ms`);
            
            // Track specific metrics
            const metricsLoadTime = performance.now();
            console.log(`Metrics processing time: ${metricsLoadTime}ms`);
        });
    }
}

// Search/filter functionality for comparisons
function initializeSearch() {
    const searchInput = document.getElementById('comparison-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const comparisonCards = document.querySelectorAll('.comparison-card');
            
            comparisonCards.forEach(card => {
                const comparisonName = card.querySelector('.comparison-name').textContent.toLowerCase();
                const insights = Array.from(card.querySelectorAll('.insight-text'))
                    .map(el => el.textContent.toLowerCase()).join(' ');
                
                const matches = comparisonName.includes(searchTerm) || insights.includes(searchTerm);
                card.style.display = matches ? 'block' : 'none';
            });
        });
    }
}

// Export functionality for data
function exportAnalysisData() {
    const analysisData = {
        timestamp: new Date().toISOString(),
        summary: {
            totalComparisons: document.querySelectorAll('.comparison-card').length,
            averageScore: document.getElementById('average-score')?.textContent || 'N/A',
            totalPages: document.getElementById('total-pages')?.textContent || 'N/A'
        },
        comparisons: []
    };
    
    // Extract comparison data
    const comparisonCards = document.querySelectorAll('.comparison-card');
    comparisonCards.forEach(card => {
        const name = card.querySelector('.comparison-name')?.textContent || '';
        const score = card.querySelector('.score-percentage')?.textContent || '';
        const insights = Array.from(card.querySelectorAll('.insight-text'))
            .map(el => el.textContent);
        
        analysisData.comparisons.push({
            name,
            score,
            insights
        });
    });
    
    // Download as JSON
    const dataStr = JSON.stringify(analysisData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `visual-analysis-${new Date().toISOString().split('T')[0]}.json`;
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

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    initializeScrollAnimations();
    enhanceAccessibility();
    enhanceMetricBars();
    trackPerformance();
    initializeSearch();
    adaptToSystemTheme();
});

// Make functions available globally for onclick handlers
window.toggleMetricsDetail = toggleMetricsDetail;
window.exportAnalysisData = exportAnalysisData;