// Technical Master Summary JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Format timestamps
    formatTimestamps();
    
    // Calculate component averages
    calculateComponentAverages();
    
    // Calculate risk assessments
    calculateTechnicalRiskAssessment();
    
    // Calculate component analysis
    calculateComponentAnalysis();
    
    // Generate technical insights
    generateTechnicalInsights();
    
    // Format comparison names
    formatComparisonNames();
    
    // Initialize tooltips
    initializeTooltips();
    
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

// Calculate average scores for each technical component
function calculateComponentAverages() {
    const componentData = {
        htmlStructure: [],
        metaTags: [],
        frameworks: []
    };
    
    // Collect all scores for each component
    const similarityCards = document.querySelectorAll('.similarity-card');
    similarityCards.forEach(card => {
        const metrics = extractTechnicalMetricsFromCard(card);
        if (metrics) {
            componentData.htmlStructure.push(metrics.htmlStructure);
            componentData.metaTags.push(metrics.metaTags);
            componentData.frameworks.push(metrics.frameworks);
        }
    });
    
    // Calculate and display averages
    Object.keys(componentData).forEach(component => {
        const scores = componentData[component];
        if (scores.length > 0) {
            const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
            
            // Update header overview metrics
            const overviewElement = document.getElementById(getOverviewElementId(component));
            if (overviewElement) {
                overviewElement.textContent = Math.round(average * 100) + '%';
            }
            
            // Update component cards
            const componentElement = document.getElementById(getComponentElementId(component));
            if (componentElement) {
                componentElement.textContent = Math.round(average * 100) + '%';
                
                // Add color coding based on similarity level
                const colorClass = getSimilarityClass(average);
                componentElement.className = `component-avg ${colorClass}`;
            }
        }
    });
}

// Extract technical metrics from a similarity card
function extractTechnicalMetricsFromCard(card) {
    const metricValues = card.querySelectorAll('.metric-value');
    if (metricValues.length >= 3) {
        return {
            htmlStructure: parseFloat(metricValues[0].textContent.replace('%', '')) / 100,
            metaTags: parseFloat(metricValues[1].textContent.replace('%', '')) / 100,
            frameworks: parseFloat(metricValues[2].textContent.replace('%', '')) / 100
        };
    }
    return null;
}

// Get overview element ID for component
function getOverviewElementId(component) {
    const mapping = {
        'htmlStructure': 'html-avg',
        'metaTags': 'meta-avg',
        'frameworks': 'frameworks-avg'
    };
    return mapping[component];
}

// Get component element ID
function getComponentElementId(component) {
    const mapping = {
        'htmlStructure': 'html-structure-avg',
        'metaTags': 'meta-tags-avg',
        'frameworks': 'frameworks-avg-display'
    };
    return mapping[component];
}

// Calculate technical risk assessment counts
function calculateTechnicalRiskAssessment() {
    const riskCounts = {
        critical: 0,  // 75%+ similarity
        high: 0,      // 50-75% similarity  
        moderate: 0,  // 25-50% similarity
        low: 0        // 0-25% similarity
    };
    
    const overallScores = document.querySelectorAll('.overall-score .score-number');
    overallScores.forEach(scoreElement => {
        const score = parseFloat(scoreElement.textContent.replace('%', '')) / 100;
        
        if (score >= 0.75) {
            riskCounts.critical++;
        } else if (score >= 0.5) {
            riskCounts.high++;
        } else if (score >= 0.25) {
            riskCounts.moderate++;
        } else {
            riskCounts.low++;
        }
    });
    
    // Update risk count displays
    Object.keys(riskCounts).forEach(risk => {
        const countElement = document.querySelector(`#tech-${risk}-count .risk-number`);
        if (countElement) {
            countElement.textContent = riskCounts[risk];
            countElement.className = `risk-number ${risk}`;
        }
    });
}

// Calculate component analysis metrics
function calculateComponentAnalysis() {
    const components = ['htmlStructure', 'metaTags', 'frameworks'];
    const componentAverages = {};
    
    // Get average scores for each component
    components.forEach(component => {
        const avgElement = document.getElementById(getComponentElementId(component));
        if (avgElement) {
            const score = parseFloat(avgElement.textContent.replace('%', '')) / 100;
            componentAverages[component] = score;
        }
    });
    
    // Find most and least similar components
    let mostSimilar = '';
    let leastSimilar = '';
    let highestScore = -1;
    let lowestScore = 2;
    let highestVariance = '';
    
    Object.keys(componentAverages).forEach(component => {
        const score = componentAverages[component];
        if (score > highestScore) {
            highestScore = score;
            mostSimilar = component;
        }
        if (score < lowestScore) {
            lowestScore = score;
            leastSimilar = component;
        }
    });
    
    // Calculate variance (simplified - component with middle score has most variance)
    const sortedComponents = Object.keys(componentAverages).sort((a, b) => 
        componentAverages[b] - componentAverages[a]
    );
    highestVariance = sortedComponents[1] || sortedComponents[0];
    
    // Update component analysis displays
    const mostSimilarElement = document.getElementById('most-similar-component');
    const leastSimilarElement = document.getElementById('least-similar-component');
    const highestVarianceElement = document.getElementById('highest-variance');
    
    if (mostSimilarElement) {
        mostSimilarElement.textContent = formatComponentName(mostSimilar);
    }
    
    if (leastSimilarElement) {
        leastSimilarElement.textContent = formatComponentName(leastSimilar);
    }
    
    if (highestVarianceElement) {
        highestVarianceElement.textContent = formatComponentName(highestVariance);
    }
}

// Generate technical insights based on data
function generateTechnicalInsights() {
    const htmlAvg = getComponentAverage('htmlStructure');
    const metaAvg = getComponentAverage('metaTags');
    const frameworksAvg = getComponentAverage('frameworks');
    
    // Update pattern insights
    const htmlPatternElement = document.getElementById('html-pattern');
    const frameworkPatternElement = document.getElementById('framework-pattern');
    const metaPatternElement = document.getElementById('meta-pattern');
    
    if (htmlPatternElement) {
        if (htmlAvg > 0.8) {
            htmlPatternElement.textContent = 'Extremely high HTML structure similarity suggests widespread template reuse';
        } else if (htmlAvg > 0.6) {
            htmlPatternElement.textContent = 'High HTML structure similarity suggests template reuse or copying';
        } else {
            htmlPatternElement.textContent = 'HTML structures show good diversity across sites';
        }
    }
    
    if (frameworkPatternElement) {
        if (frameworksAvg > 0.8) {
            frameworkPatternElement.textContent = 'Identical frameworks detected - possible shared development or copying';
        } else if (frameworksAvg > 0.5) {
            frameworkPatternElement.textContent = 'Common frameworks indicate similar development practices';
        } else {
            frameworkPatternElement.textContent = 'Diverse framework usage shows independent development';
        }
    }
    
    if (metaPatternElement) {
        if (metaAvg > 0.7) {
            metaPatternElement.textContent = 'High meta tag similarity may indicate SEO strategy copying';
        } else if (metaAvg > 0.4) {
            metaPatternElement.textContent = 'Meta tag variations show different SEO strategies';
        } else {
            metaPatternElement.textContent = 'Meta tags show good uniqueness across sites';
        }
    }
}

// Get component average from displayed value
function getComponentAverage(component) {
    const element = document.getElementById(getComponentElementId(component));
    if (element) {
        return parseFloat(element.textContent.replace('%', '')) / 100;
    }
    return 0;
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

// Format component names for display
function formatComponentName(component) {
    const componentNames = {
        'htmlStructure': 'HTML Structure',
        'metaTags': 'Meta Tags',
        'frameworks': 'Frameworks'
    };
    return componentNames[component] || component;
}

// Get similarity class based on score
function getSimilarityClass(score) {
    if (score >= 0.75) return 'error';      // High similarity = bad
    if (score >= 0.5) return 'warning';     // Moderate similarity = warning
    if (score >= 0.25) return 'good';       // Low similarity = good
    return 'excellent';                     // Very low similarity = excellent
}

// Initialize tooltip system
function initializeTooltips() {
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function(e) {
            const tooltipId = this.getAttribute('data-tooltip');
            showTooltip(tooltipId, e);
        });
        
        trigger.addEventListener('mouseleave', function() {
            hideAllTooltips();
        });
        
        trigger.addEventListener('mousemove', function(e) {
            const tooltipId = this.getAttribute('data-tooltip');
            updateTooltipPosition(tooltipId, e);
        });
    });
    
    // Hide tooltips when clicking elsewhere
    document.addEventListener('click', hideAllTooltips);
}

// Show tooltip
function showTooltip(tooltipId, event) {
    hideAllTooltips();
    
    const tooltip = document.getElementById(`tooltip-${tooltipId}`);
    if (tooltip) {
        tooltip.classList.add('visible');
        updateTooltipPosition(tooltipId, event);
    }
}

// Update tooltip position
function updateTooltipPosition(tooltipId, event) {
    const tooltip = document.getElementById(`tooltip-${tooltipId}`);
    if (tooltip && tooltip.classList.contains('visible')) {
        const rect = tooltip.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        const x = event.clientX + scrollLeft - rect.width / 2;
        const y = event.clientY + scrollTop - rect.height - 20;
        
        tooltip.style.left = Math.max(10, Math.min(x, window.innerWidth + scrollLeft - rect.width - 10)) + 'px';
        tooltip.style.top = Math.max(scrollTop + 10, y) + 'px';
    }
}

// Hide all tooltips
function hideAllTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.classList.remove('visible');
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
                
                // Trigger metric bar animations
                if (entry.target.classList.contains('similarity-card')) {
                    animateMetricBars(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.similarity-card, .insight-card, .component-card'
    );
    animatableElements.forEach(element => observer.observe(element));
}

// Animate metric bars in similarity cards
function animateMetricBars(card) {
    const metricBars = card.querySelectorAll('.metric-fill');
    metricBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.dataset.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 50);
        }, index * 150);
    });
}

// Enhance accessibility
function enhanceAccessibility() {
    // Add ARIA labels to metric bars
    const metricBars = document.querySelectorAll('.metric-fill');
    metricBars.forEach(bar => {
        const metricItem = bar.closest('.metric-item');
        if (metricItem) {
            const label = metricItem.querySelector('.metric-name')?.textContent || '';
            const value = metricItem.querySelector('.metric-value')?.textContent || '';
            
            bar.setAttribute('role', 'progressbar');
            bar.setAttribute('aria-label', `${label}: ${value}`);
            bar.setAttribute('aria-valuenow', value.replace('%', ''));
            bar.setAttribute('aria-valuemin', '0');
            bar.setAttribute('aria-valuemax', '100');
        }
    });
    
    // Add role attributes to cards
    const cards = document.querySelectorAll('.similarity-card, .insight-card, .component-card');
    cards.forEach(card => {
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
    });
    
    // Enhance tooltip accessibility
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    tooltipTriggers.forEach(trigger => {
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('aria-label', 'Show technical explanation');
        trigger.setAttribute('tabindex', '0');
        
        // Add keyboard support
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tooltipId = this.getAttribute('data-tooltip');
                showTooltip(tooltipId, { 
                    clientX: this.offsetLeft + this.offsetWidth / 2, 
                    clientY: this.offsetTop 
                });
            }
        });
    });
}

// Export functionality for technical analysis data
function exportTechnicalAnalysis() {
    const analysisData = {
        timestamp: new Date().toISOString(),
        summary: {
            totalComparisons: document.querySelectorAll('.similarity-card').length,
            components: ['htmlStructure', 'metaTags', 'frameworks'],
            riskAssessment: {}
        },
        comparisons: []
    };
    
    // Extract risk assessment data
    const riskLevels = ['critical', 'high', 'moderate', 'low'];
    riskLevels.forEach(level => {
        const countElement = document.querySelector(`#tech-${level}-count .risk-number`);
        analysisData.summary.riskAssessment[level] = countElement ? 
            parseInt(countElement.textContent) : 0;
    });
    
    // Extract comparison data
    const comparisonCards = document.querySelectorAll('.similarity-card');
    comparisonCards.forEach(card => {
        const title = card.querySelector('.comparison-title')?.textContent || '';
        const overallScore = card.querySelector('.overall-score .score-number')?.textContent || '';
        const metrics = extractTechnicalMetricsFromCard(card);
        
        analysisData.comparisons.push({
            comparison: title,
            overallScore,
            technicalMetrics: metrics
        });
    });
    
    // Download as JSON
    const dataStr = JSON.stringify(analysisData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `technical-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Technical analysis page load time: ${loadTime}ms`);
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

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    trackPerformance();
    adaptToSystemTheme();
});

// Make functions available globally for onclick handlers
window.exportTechnicalAnalysis = exportTechnicalAnalysis;