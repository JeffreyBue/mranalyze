// Content Master Summary JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Format timestamps
    formatTimestamps();
    
    // Calculate algorithm averages
    calculateAlgorithmAverages();
    
    // Calculate risk assessments
    calculateRiskAssessment();
    
    // Calculate algorithm performance
    calculateAlgorithmPerformance();
    
    // Generate content insights
    generateContentInsights();
    
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

// Calculate average scores for each algorithm
function calculateAlgorithmAverages() {
    const algorithmData = {
        jaccard: [],
        cosine: [],
        fingerprint: [],
        semantic: [],
        topic: []
    };
    
    // Collect all scores for each algorithm
    const metricCards = document.querySelectorAll('.similarity-card');
    metricCards.forEach(card => {
        const metrics = extractMetricsFromCard(card);
        if (metrics) {
            algorithmData.jaccard.push(metrics.jaccard);
            algorithmData.cosine.push(metrics.cosine);
            algorithmData.fingerprint.push(metrics.fingerprint);
            algorithmData.semantic.push(metrics.semantic);
            algorithmData.topic.push(metrics.topic);
        }
    });
    
    // Calculate and display averages
    Object.keys(algorithmData).forEach(algorithm => {
        const scores = algorithmData[algorithm];
        if (scores.length > 0) {
            const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
            const avgElement = document.getElementById(`${algorithm}-avg`);
            if (avgElement) {
                avgElement.textContent = Math.round(average * 100) + '%';
                
                // Add color coding based on similarity level
                const colorClass = getSimilarityClass(average);
                avgElement.className = `algorithm-avg ${colorClass}`;
            }
        }
    });
}

// Extract metrics from a similarity card
function extractMetricsFromCard(card) {
    const metricValues = card.querySelectorAll('.metric-value');
    if (metricValues.length >= 5) {
        return {
            jaccard: parseFloat(metricValues[0].textContent.replace('%', '')) / 100,
            cosine: parseFloat(metricValues[1].textContent.replace('%', '')) / 100,
            fingerprint: parseFloat(metricValues[2].textContent.replace('%', '')) / 100,
            semantic: parseFloat(metricValues[3].textContent.replace('%', '')) / 100,
            topic: parseFloat(metricValues[4].textContent.replace('%', '')) / 100
        };
    }
    return null;
}

// Calculate risk assessment counts
function calculateRiskAssessment() {
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
        const countElement = document.querySelector(`#${risk}-count .risk-number`);
        if (countElement) {
            countElement.textContent = riskCounts[risk];
            countElement.className = `risk-number ${risk}`;
        }
    });
}

// Calculate algorithm performance metrics
function calculateAlgorithmPerformance() {
    const algorithms = ['jaccard', 'cosine', 'fingerprint', 'semantic', 'topic'];
    const algorithmAverages = {};
    
    // Get average scores for each algorithm
    algorithms.forEach(algorithm => {
        const avgElement = document.getElementById(`${algorithm}-avg`);
        if (avgElement) {
            const score = parseFloat(avgElement.textContent.replace('%', '')) / 100;
            algorithmAverages[algorithm] = score;
        }
    });
    
    // Find most and least sensitive algorithms
    let mostSensitive = '';
    let leastSensitive = '';
    let highestScore = -1;
    let lowestScore = 2;
    
    Object.keys(algorithmAverages).forEach(algorithm => {
        const score = algorithmAverages[algorithm];
        if (score > highestScore) {
            highestScore = score;
            mostSensitive = algorithm;
        }
        if (score < lowestScore) {
            lowestScore = score;
            leastSensitive = algorithm;
        }
    });
    
    // Update performance displays
    const mostSensitiveElement = document.getElementById('most-sensitive');
    const leastSensitiveElement = document.getElementById('least-sensitive');
    const bestDetectorElement = document.getElementById('best-detector');
    
    if (mostSensitiveElement) {
        mostSensitiveElement.textContent = formatAlgorithmName(mostSensitive);
    }
    
    if (leastSensitiveElement) {
        leastSensitiveElement.textContent = formatAlgorithmName(leastSensitive);
    }
    
    if (bestDetectorElement) {
        // Best detector is the one that shows most variation (good for detecting copying)
        bestDetectorElement.textContent = formatAlgorithmName(mostSensitive);
    }
}

// Generate content insights based on data
function generateContentInsights() {
    const comparisons = document.querySelectorAll('.similarity-card');
    let highestSimilarity = 0;
    let topConcernComparison = '';
    let lowestSimilarity = 1;
    let mostUniqueComparison = '';
    
    comparisons.forEach(card => {
        const scoreElement = card.querySelector('.overall-score .score-number');
        const titleElement = card.querySelector('.comparison-title');
        
        if (scoreElement && titleElement) {
            const score = parseFloat(scoreElement.textContent.replace('%', '')) / 100;
            const title = titleElement.textContent;
            
            if (score > highestSimilarity) {
                highestSimilarity = score;
                topConcernComparison = title;
            }
            
            if (score < lowestSimilarity) {
                lowestSimilarity = score;
                mostUniqueComparison = title;
            }
        }
    });
    
    // Update insight displays
    const topConcernElement = document.getElementById('top-concern');
    const uniqueContentElement = document.getElementById('unique-content');
    const clusterAnalysisElement = document.getElementById('cluster-analysis');
    
    if (topConcernElement && topConcernComparison) {
        const formattedComparison = formatComparisonName(topConcernComparison);
        topConcernElement.textContent = `${formattedComparison} shows highest similarity (${Math.round(highestSimilarity * 100)}%)`;
    }
    
    if (uniqueContentElement && mostUniqueComparison) {
        const sites = mostUniqueComparison.split('_vs_');
        if (sites.length === 2) {
            const site1 = formatSiteName(sites[0]);
            const site2 = formatSiteName(sites[1]);
            uniqueContentElement.textContent = `${site1} and ${site2} show good content uniqueness`;
        }
    }
    
    if (clusterAnalysisElement) {
        // Count high similarity pairs (>50%)
        let highSimilarityCount = 0;
        comparisons.forEach(card => {
            const scoreElement = card.querySelector('.overall-score .score-number');
            if (scoreElement) {
                const score = parseFloat(scoreElement.textContent.replace('%', '')) / 100;
                if (score > 0.5) {
                    highSimilarityCount++;
                }
            }
        });
        
        clusterAnalysisElement.textContent = `${highSimilarityCount} site pairs show concerning similarity levels`;
    }
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

// Format algorithm names for display
function formatAlgorithmName(algorithm) {
    const algorithmNames = {
        'jaccard': 'Jaccard',
        'cosine': 'Cosine',
        'fingerprint': 'Fingerprint',
        'semantic': 'Semantic',
        'topic': 'Topic'
    };
    return algorithmNames[algorithm] || algorithm;
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
        '.similarity-card, .insight-card, .algorithm-card'
    );
    animatableElements.forEach(element => observer.observe(element));
}

// Animate metric bars in similarity cards
function animateMetricBars(card) {
    const metricBars = card.querySelectorAll('.metric-fill');
    metricBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.dataset.width;
            console.log(`Animating bar ${index + 1} to width: ${targetWidth}`);
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 250);
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
    const cards = document.querySelectorAll('.similarity-card, .insight-card, .algorithm-card');
    cards.forEach(card => {
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
    });
    
    // Enhance tooltip accessibility
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    tooltipTriggers.forEach(trigger => {
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('aria-label', 'Show algorithm explanation');
        trigger.setAttribute('tabindex', '0');
        
        // Add keyboard support
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tooltipId = this.getAttribute('data-tooltip');
                showTooltip(tooltipId, { clientX: this.offsetLeft, clientY: this.offsetTop });
            }
        });
    });
}

// Export functionality for analysis data
function exportContentAnalysis() {
    const analysisData = {
        timestamp: new Date().toISOString(),
        summary: {
            totalComparisons: document.querySelectorAll('.similarity-card').length,
            algorithms: ['jaccard', 'cosine', 'fingerprint', 'semantic', 'topic'],
            riskAssessment: {}
        },
        comparisons: []
    };
    
    // Extract risk assessment data
    const riskLevels = ['critical', 'high', 'moderate', 'low'];
    riskLevels.forEach(level => {
        const countElement = document.querySelector(`#${level}-count .risk-number`);
        analysisData.summary.riskAssessment[level] = countElement ? 
            parseInt(countElement.textContent) : 0;
    });
    
    // Extract comparison data
    const comparisonCards = document.querySelectorAll('.similarity-card');
    comparisonCards.forEach(card => {
        const title = card.querySelector('.comparison-title')?.textContent || '';
        const overallScore = card.querySelector('.overall-score .score-number')?.textContent || '';
        const metrics = extractMetricsFromCard(card);
        
        analysisData.comparisons.push({
            comparison: title,
            overallScore,
            metrics
        });
    });
    
    // Download as JSON
    const dataStr = JSON.stringify(analysisData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `content-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Content analysis page load time: ${loadTime}ms`);
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
window.exportContentAnalysis = exportContentAnalysis;