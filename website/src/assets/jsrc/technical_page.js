// Technical Page Comparison JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Format timestamps
    formatTimestamps();
    
    // Initialize technical radar chart
    initializeTechnicalRadar();
    
    // Initialize progress bars with data-width pattern
    initializeProgressBars();
    
    // Initialize circular progress indicators
    initializeCircularProgress();
    
    // Initialize framework cards
    initializeFrameworkCards();
    
    // Initialize resources breakdown
    initializeResourcesBreakdown();
    
    // Format comparison names
    formatComparisonNames();
    
    // Add accessibility features
    enhanceAccessibility();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize hover effects
    enhanceInteractivity();
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

// Initialize technical radar chart
function initializeTechnicalRadar() {
    const radarChart = document.getElementById('technicalRadar');
    if (!radarChart) return;
    
    const svg = radarChart.querySelector('.radar-svg');
    const gridGroup = svg.querySelector('.radar-grid');
    const dataGroup = svg.querySelector('.radar-data');
    const labelsGroup = svg.querySelector('.radar-labels');
    
    // Extract technical scores from the page
    const scores = extractTechnicalScores();
    
    // Radar chart configuration
    const config = {
        centerX: 150,
        centerY: 150,
        maxRadius: 120,
        levels: 5,
        metrics: [
            { name: 'HTML Structure', value: scores.htmlStructure || 0 },
            { name: 'Meta Tags', value: scores.metaTags || 0 },
            { name: 'Schema Markup', value: scores.schemaMarkup || 0 },
            { name: 'Frameworks', value: scores.frameworks || 0 },
            { name: 'Resources', value: scores.resources || 0 },
            { name: 'Performance', value: scores.performance || 0 }
        ]
    };
    
    // Draw radar grid
    drawRadarGrid(gridGroup, config);
    
    // Draw radar data with animation delay
    setTimeout(() => {
        drawRadarData(dataGroup, config);
    }, 500);
    
    // Draw labels
    drawRadarLabels(labelsGroup, config);
}

// Extract technical scores from DOM
function extractTechnicalScores() {
    const scores = {};
    
    // HTML Structure score
    const htmlScore = document.querySelector('.html-structure-module .module-score');
    if (htmlScore) {
        scores.htmlStructure = parseFloat(htmlScore.textContent.replace('%', '')) / 100;
    }
    
    // Meta Tags score
    const metaScore = document.querySelector('.meta-tags-module .module-score');
    if (metaScore) {
        scores.metaTags = parseFloat(metaScore.textContent.replace('%', '')) / 100;
    }
    
    // Schema Markup score
    const schemaScore = document.querySelector('.schema-module .module-score');
    if (schemaScore) {
        scores.schemaMarkup = parseFloat(schemaScore.textContent.replace('%', '')) / 100;
    }
    
    // Frameworks score
    const frameworksScore = document.querySelector('.frameworks-module .module-score');
    if (frameworksScore) {
        scores.frameworks = parseFloat(frameworksScore.textContent.replace('%', '')) / 100;
    }
    
    // Resources score
    const resourcesScore = document.querySelector('.resources-module .module-score');
    if (resourcesScore) {
        scores.resources = parseFloat(resourcesScore.textContent.replace('%', '')) / 100;
    }
    
    // Performance score
    const performanceScore = document.querySelector('.performance-seo-module .module-score');
    if (performanceScore) {
        scores.performance = parseFloat(performanceScore.textContent.replace('%', '')) / 100;
    }
    
    return scores;
}

// Draw radar chart grid
function drawRadarGrid(gridGroup, config) {
    const { centerX, centerY, maxRadius, levels } = config;
    
    // Clear existing grid
    gridGroup.innerHTML = '';
    
    // Draw concentric circles
    for (let i = 1; i <= levels; i++) {
        const radius = (maxRadius / levels) * i;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', centerX);
        circle.setAttribute('cy', centerY);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', 'rgba(188, 195, 199, 0.3)');
        circle.setAttribute('stroke-width', '1');
        gridGroup.appendChild(circle);
    }
    
    // Draw axis lines
    const angleStep = (2 * Math.PI) / config.metrics.length;
    for (let i = 0; i < config.metrics.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x2 = centerX + maxRadius * Math.cos(angle);
        const y2 = centerY + maxRadius * Math.sin(angle);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'rgba(188, 195, 199, 0.3)');
        line.setAttribute('stroke-width', '1');
        gridGroup.appendChild(line);
    }
}

// Draw radar chart data
function drawRadarData(dataGroup, config) {
    const { centerX, centerY, maxRadius, metrics } = config;
    
    // Clear existing data
    dataGroup.innerHTML = '';
    
    // Calculate points for the polygon
    const points = [];
    const angleStep = (2 * Math.PI) / metrics.length;
    
    metrics.forEach((metric, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const radius = maxRadius * metric.value;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push(`${x},${y}`);
    });
    
    // Create polygon
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', points.join(' '));
    polygon.setAttribute('fill', 'rgba(52, 152, 219, 0.3)');
    polygon.setAttribute('stroke', '#3498db');
    polygon.setAttribute('stroke-width', '2');
    polygon.style.opacity = '0';
    dataGroup.appendChild(polygon);
    
    // Add data points
    metrics.forEach((metric, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const radius = maxRadius * metric.value;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#3498db');
        circle.setAttribute('stroke', '#ffffff');
        circle.setAttribute('stroke-width', '2');
        circle.style.opacity = '0';
        dataGroup.appendChild(circle);
    });
    
    // Animate the polygon and points
    animateRadarData(dataGroup);
}

// Draw radar chart labels
function drawRadarLabels(labelsGroup, config) {
    const { centerX, centerY, maxRadius, metrics } = config;
    
    // Clear existing labels
    labelsGroup.innerHTML = '';
    
    const angleStep = (2 * Math.PI) / metrics.length;
    
    metrics.forEach((metric, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const labelRadius = maxRadius + 20;
        const x = centerX + labelRadius * Math.cos(angle);
        const y = centerY + labelRadius * Math.sin(angle);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#ffffff');
        text.setAttribute('font-size', '11');
        text.setAttribute('font-weight', '600');
        text.textContent = metric.name;
        labelsGroup.appendChild(text);
        
        // Add percentage text
        const percentText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        percentText.setAttribute('x', x);
        percentText.setAttribute('y', y + 12);
        percentText.setAttribute('text-anchor', 'middle');
        percentText.setAttribute('dominant-baseline', 'middle');
        percentText.setAttribute('fill', 'rgba(255, 255, 255, 0.8)');
        percentText.setAttribute('font-size', '9');
        percentText.textContent = `${Math.round(metric.value * 100)}%`;
        labelsGroup.appendChild(percentText);
    });
}

// Animate radar chart data
function animateRadarData(dataGroup) {
    const polygon = dataGroup.querySelector('polygon');
    const circles = dataGroup.querySelectorAll('circle');
    
    // Animate polygon
    if (polygon) {
        polygon.style.transition = 'opacity 0.8s ease-out';
        polygon.style.opacity = '1';
    }
    
    // Animate points with stagger
    circles.forEach((circle, index) => {
        setTimeout(() => {
            circle.style.transition = 'opacity 0.5s ease-out';
            circle.style.opacity = '1';
        }, index * 100);
    });
}

// Initialize progress bars with data-width pattern
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.bar-fill, .progress-fill');
    
    // Set initial width to 0 and animate to data-width
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
            bar.style.width = '0%';
            bar.style.transition = 'width 1.5s ease-out';
        }
    });
    
    // Animate on scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                if (targetWidth && !bar.dataset.animated) {
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                        bar.dataset.animated = 'true';
                    }, 200);
                }
                observer.unobserve(entry.target);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Initialize circular progress indicators
function initializeCircularProgress() {
    const progressCircles = document.querySelectorAll('.circle-progress');
    
    progressCircles.forEach(circle => {
        const progressValue = circle.getAttribute('data-progress');
        if (progressValue) {
            // Create animated border effect
            const rotation = (progressValue / 100) * 360;
            circle.style.background = `conic-gradient(
                #3498db 0deg,
                #3498db ${rotation}deg,
                #bdc3c7 ${rotation}deg,
                #bdc3c7 360deg
            )`;
            
            // Animate on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.dataset.animated) {
                        animateCircularProgress(entry.target, progressValue);
                        entry.target.dataset.animated = 'true';
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(circle);
        }
    });
}

// Animate circular progress
function animateCircularProgress(element, targetProgress) {
    let currentProgress = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        currentProgress = targetProgress * progress;
        const rotation = (currentProgress / 100) * 360;
        
        element.style.background = `conic-gradient(
            #3498db 0deg,
            #3498db ${rotation}deg,
            #bdc3c7 ${rotation}deg,
            #bdc3c7 360deg
        )`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Initialize framework cards interactivity
function initializeFrameworkCards() {
    const frameworkCards = document.querySelectorAll('.framework-item');
    
    frameworkCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(44, 62, 80, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Add click effects for accessibility
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }, 100);
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize resources breakdown animations
function initializeResourcesBreakdown() {
    const resourceCards = document.querySelectorAll('.resource-type');
    
    resourceCards.forEach((card, index) => {
        // Stagger animation entrance
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 20px rgba(44, 62, 80, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
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
                
                // Trigger specific animations for different modules
                if (entry.target.classList.contains('analysis-module')) {
                    animateAnalysisModule(entry.target);
                }
                
                if (entry.target.classList.contains('summary-card')) {
                    animateSummaryCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.analysis-module, .summary-card, .framework-item, .resource-type'
    );
    animatableElements.forEach(element => observer.observe(element));
}

// Animate analysis modules
function animateAnalysisModule(module) {
    const header = module.querySelector('.module-header');
    const content = module.querySelector('.module-content');
    
    if (header) {
        header.style.transform = 'translateX(-20px)';
        header.style.opacity = '0.8';
        setTimeout(() => {
            header.style.transition = 'all 0.5s ease-out';
            header.style.transform = 'translateX(0)';
            header.style.opacity = '1';
        }, 100);
    }
    
    if (content) {
        setTimeout(() => {
            content.style.transform = 'translateY(10px)';
            content.style.opacity = '0.9';
            setTimeout(() => {
                content.style.transition = 'all 0.5s ease-out';
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';
            }, 50);
        }, 200);
    }
}

// Animate summary cards
function animateSummaryCard(card) {
    const items = card.querySelectorAll('.insight-item, .recommendation-item, .risk-level');
    
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-15px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Enhance accessibility
function enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const frameworkCards = document.querySelectorAll('.framework-item');
    frameworkCards.forEach(card => {
        const frameworkName = card.querySelector('.framework-name')?.textContent || 'Framework';
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${frameworkName} framework comparison details`);
    });
    
    // Add ARIA labels to progress elements
    const progressBars = document.querySelectorAll('.bar-fill, .progress-fill');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || '0%';
        bar.setAttribute('role', 'progressbar');
        bar.setAttribute('aria-valuenow', parseInt(width));
        bar.setAttribute('aria-valuemin', '0');
        bar.setAttribute('aria-valuemax', '100');
        bar.setAttribute('aria-label', `Progress: ${width}`);
    });
    
    // Add ARIA labels to circular progress
    const circularProgress = document.querySelectorAll('.circle-progress');
    circularProgress.forEach(circle => {
        const progress = circle.getAttribute('data-progress') || '0';
        circle.setAttribute('role', 'progressbar');
        circle.setAttribute('aria-valuenow', progress);
        circle.setAttribute('aria-valuemin', '0');
        circle.setAttribute('aria-valuemax', '100');
        circle.setAttribute('aria-label', `Score: ${progress}%`);
    });
    
    // Add ARIA labels to radar chart
    const radarChart = document.getElementById('technicalRadar');
    if (radarChart) {
        radarChart.setAttribute('role', 'img');
        radarChart.setAttribute('aria-label', 'Technical similarity radar chart showing scores across multiple categories');
    }
}

// Enhanced hover effects for interactive elements
function enhanceInteractivity() {
    // Module score hover effects
    const moduleScores = document.querySelectorAll('.module-score');
    moduleScores.forEach(score => {
        score.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
        
        score.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Schema type hover effects
    const schemaTypes = document.querySelectorAll('.schema-type');
    schemaTypes.forEach(type => {
        type.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });
        
        type.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Performance pattern tags hover effects
    const patternTags = document.querySelectorAll('.pattern-tag');
    patternTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#2980b9';
            this.style.transform = 'translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#3498db';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Risk badge interactions
    const riskBadges = document.querySelectorAll('.risk-badge');
    riskBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize score animations
function initializeScoreAnimations() {
    const scoreElements = document.querySelectorAll('.module-score');
    
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

// Print optimization
function optimizeForPrint() {
    // Show all content for printing
    const hiddenElements = document.querySelectorAll('[style*="display: none"]');
    hiddenElements.forEach(element => {
        element.style.display = 'block';
    });
    
    // Ensure all animations are completed
    const animatedElements = document.querySelectorAll('[style*="transition"]');
    animatedElements.forEach(element => {
        element.style.transition = 'none';
    });
    
    // Set all progress bars to their final values
    const progressBars = document.querySelectorAll('.bar-fill, .progress-fill');
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
            bar.style.width = targetWidth;
        }
    });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Export functionality for technical analysis data
function exportTechnicalAnalysis() {
    const technicalData = {
        timestamp: new Date().toISOString(),
        comparison: document.querySelector('[data-comparison]')?.getAttribute('data-comparison') || '',
        page1: {
            folder: document.querySelectorAll('.page-item .folder-name')[0]?.textContent || '',
            pageId: document.querySelectorAll('.page-item .page-name')[0]?.textContent || ''
        },
        page2: {
            folder: document.querySelectorAll('.page-item .folder-name')[1]?.textContent || '',
            pageId: document.querySelectorAll('.page-item .page-name')[1]?.textContent || ''
        },
        scores: extractTechnicalScores(),
        radarData: extractRadarChartData()
    };
    
    // Download as JSON
    const dataStr = JSON.stringify(technicalData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `technical-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Extract radar chart data for export
function extractRadarChartData() {
    const radarChart = document.getElementById('technicalRadar');
    if (!radarChart) return null;
    
    const dataGroup = radarChart.querySelector('.radar-data');
    const polygon = dataGroup?.querySelector('polygon');
    
    return {
        points: polygon?.getAttribute('points') || '',
        metrics: extractTechnicalScores()
    };
}

// Theme detection and adaptation
function adaptToSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
        
        // Adjust radar chart colors for dark theme
        const radarSvg = document.querySelector('.radar-svg');
        if (radarSvg) {
            const gridElements = radarSvg.querySelectorAll('.radar-grid *');
            gridElements.forEach(el => {
                if (el.getAttribute('stroke') === 'rgba(188, 195, 199, 0.3)') {
                    el.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
                }
            });
        }
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
            console.log(`Technical page comparison load time: ${loadTime}ms`);
            
            // Track radar chart rendering performance
            const radarStart = performance.now();
            initializeTechnicalRadar();
            const radarEnd = performance.now();
            console.log(`Radar chart rendering time: ${radarEnd - radarStart}ms`);
        });
    }
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    initializeScoreAnimations();
    trackPerformance();
    adaptToSystemTheme();
});

// Make functions available globally for onclick handlers
window.exportTechnicalAnalysis = exportTechnicalAnalysis;