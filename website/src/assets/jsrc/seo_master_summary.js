// SEO Master Summary JavaScript

// Global data object (will be populated by your Mustache rendering)
let seoData = null;

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Format timestamps
    formatTimestamps();
    
    // Initialize risk score circles
    initializeRiskScores();
    
    // Initialize SEO score circles
    initializeSEOScores();
    
    // Calculate and display summary statistics
    calculateSummaryStats();
    
    // Initialize category tabs
    initializeCategoryTabs();
    
    // Initialize phase tabs
    initializePhaseTabs();
    
    // Format site names
    formatSiteNames();
    
    // Initialize interactive elements
    initializeInteractiveElements();
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

// Initialize risk score circles with animated progress
function initializeRiskScores() {
    const riskCircles = document.querySelectorAll('.risk-score-circle[data-score]');
    riskCircles.forEach(circle => {
        const score = parseFloat(circle.getAttribute('data-score'));
        const percentage = Math.round(score * 100);
        
        const scoreValue = circle.querySelector('.score-value');
        if (scoreValue) {
            scoreValue.textContent = percentage + '%';
        }
        
        // Animate the circle border color based on score
        animateRiskCircle(circle, score);
    });
}

// Initialize SEO score circles
function initializeSEOScores() {
    const seoCircles = document.querySelectorAll('.score-circle[data-score]');
    seoCircles.forEach(circle => {
        const score = parseFloat(circle.getAttribute('data-score'));
        const percentage = Math.round(score * 100);
        
        const scorePercentage = circle.querySelector('.score-percentage');
        if (scorePercentage) {
            scorePercentage.textContent = percentage + '%';
        }
        
        // Color the circle based on score
        const borderColor = getScoreColor(score);
        circle.style.borderColor = borderColor;
    });
}

// Animate risk circle based on score
function animateRiskCircle(circle, score) {
    const colors = {
        high: '#e74c3c',    // Red for high risk
        medium: '#f39c12',  // Orange for medium risk
        low: '#27ae60'      // Green for low risk
    };
    
    let color;
    if (score > 0.7) color = colors.high;
    else if (score > 0.4) color = colors.medium;
    else color = colors.low;
    
    circle.style.borderColor = color;
    
    // Animate with a pulse effect for high risk
    if (score > 0.7) {
        circle.style.animation = 'pulse 2s infinite';
    }
}

// Get color based on SEO score
function getScoreColor(score) {
    if (score >= 0.9) return '#27ae60';      // Excellent - Green
    if (score >= 0.7) return '#3498db';      // Good - Blue
    if (score >= 0.5) return '#f39c12';      // Moderate - Orange
    return '#e74c3c';                        // Poor - Red
}

// Calculate and display summary statistics
function calculateSummaryStats() {
    // These would normally be calculated from the actual data
    // For now, we'll use placeholder logic that can be enhanced
    
    // Average SEO Score calculation
    const seoScoreElements = document.querySelectorAll('[data-score]');
    if (seoScoreElements.length > 0) {
        let totalScore = 0;
        let count = 0;
        
        seoScoreElements.forEach(element => {
            const score = parseFloat(element.getAttribute('data-score'));
            if (!isNaN(score)) {
                totalScore += score;
                count++;
            }
        });
        
        if (count > 0) {
            const avgScore = Math.round((totalScore / count) * 100);
            const avgElement = document.getElementById('avg-seo-score');
            if (avgElement) {
                avgElement.textContent = avgScore + '%';
            }
        }
    }
    
    // High risk sites count
    const highRiskElements = document.querySelectorAll('.risk-card.HIGH');
    const highRiskCount = document.getElementById('high-risk-sites');
    if (highRiskCount) {
        highRiskCount.textContent = highRiskElements.length;
    }
    
    // Estimated completion (placeholder logic)
    const completionElement = document.getElementById('completion-estimate');
    if (completionElement) {
        completionElement.textContent = '8-12 weeks';
    }
}

// Initialize category tabs functionality
function initializeCategoryTabs() {
    const tabButtons = document.querySelectorAll('.tab-button[data-category]');
    const categoryContent = document.querySelector('.category-content');
    
    if (!categoryContent) return;
    
    // Store reference to action cards data (would come from your data)
    // This is a placeholder - you'd populate this from your actual data structure
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Update content based on selected category
            updateCategoryContent(selectedCategory);
        });
    });
    
    // Initialize with "all" category
    updateCategoryContent('all');
}

// Update category content based on selection
function updateCategoryContent(category) {
    const categoryContent = document.querySelector('.category-content');
    if (!categoryContent) return;
    
    // This would filter and display actions based on the selected category
    // For now, showing a placeholder message
    let content = '';
    
    if (category === 'all') {
        content = `
            <div class="category-summary">
                <h3>All Categories Overview</h3>
                <p>Displaying all action items across all categories. Use the tabs above to filter by specific category.</p>
                <div class="category-stats">
                    <div class="stat-item">
                        <span class="stat-number">19</span>
                        <span class="stat-label">High Priority Items</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">21</span>
                        <span class="stat-label">Medium Priority Items</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        content = `
            <div class="category-summary">
                <h3>${category} Actions</h3>
                <p>Showing actions specifically related to ${category.toLowerCase()}.</p>
                <div class="filtered-actions">
                    <!-- Action items for ${category} would be displayed here -->
                    <p class="placeholder">Action items for ${category} will be displayed here when integrated with your data structure.</p>
                </div>
            </div>
        `;
    }
    
    categoryContent.innerHTML = content;
}

// Initialize phase tabs functionality
function initializePhaseTabs() {
    const phaseButtons = document.querySelectorAll('.phase-tab[data-phase]');
    const phaseContent = document.querySelector('.phase-content');
    
    if (!phaseContent) return;
    
    phaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            phaseButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected phase
            const selectedPhase = this.getAttribute('data-phase');
            
            // Update content based on selected phase
            updatePhaseContent(selectedPhase);
        });
    });
    
    // Initialize with phase 1
    updatePhaseContent('phase1_immediate');
}

// Update phase content based on selection
function updatePhaseContent(phase) {
    const phaseContent = document.querySelector('.phase-content');
    if (!phaseContent) return;
    
    const phaseInfo = {
        'phase1_immediate': {
            title: 'Phase 1: Immediate Actions',
            description: 'Critical duplicate content and SEO violations that need immediate attention.',
            timeline: '1-2 weeks'
        },
        'phase2_high_impact': {
            title: 'Phase 2: High Impact Actions',
            description: 'High-impact SEO improvements and uniqueness enhancements.',
            timeline: '2-4 weeks'
        },
        'phase3_optimization': {
            title: 'Phase 3: Optimization Actions',
            description: 'Content optimization and additional SEO enhancements.',
            timeline: '1-2 months'
        }
    };
    
    const info = phaseInfo[phase] || phaseInfo['phase1_immediate'];
    
    const content = `
        <div class="phase-summary">
            <h3>${info.title}</h3>
            <p class="phase-timeline"><strong>Timeline:</strong> ${info.timeline}</p>
            <p class="phase-description">${info.description}</p>
            
            <div class="phase-actions-list">
                <!-- Detailed phase actions would be displayed here -->
                <p class="placeholder">Detailed actions for ${info.title} will be displayed here when integrated with your roadmap data.</p>
            </div>
        </div>
    `;
    
    phaseContent.innerHTML = content;
}

// Format site names from technical format to readable format
function formatSiteNames() {
    const siteNameElements = document.querySelectorAll('[data-site-name]');
    siteNameElements.forEach(element => {
        const technicalName = element.getAttribute('data-site-name');
        const readableName = formatSiteName(technicalName);
        element.textContent = readableName; // This line is correct
    });
    
    const comparisonElements = document.querySelectorAll('[data-site]');
    comparisonElements.forEach(element => {
        const comparison = element.getAttribute('data-site');
        // Only update if the element is specifically meant for comparison display
        if (element.classList.contains('site-name') || element.classList.contains('risk-comparison')) {
            const formatted = formatComparisonName(comparison);
            element.textContent = formatted;
        }
    });
}

// Format technical site name to readable format
function formatSiteName(technicalName) {
    if (!technicalName) return '';
    
    // Remove timestamp and convert to readable format
    // Example: "instantcheckmate_20250708_2040" -> "InstantCheckmate"
    const siteName = technicalName.split('_')[0];
    
    // Convert to title case and handle common site names
    const siteMap = {
        'instantcheckmate': 'InstantCheckmate',
        'truthfinder': 'TruthFinder',
        'intelius': 'Intelius'
    };
    
    return siteMap[siteName.toLowerCase()] || 
           siteName.charAt(0).toUpperCase() + siteName.slice(1);
}

// Format comparison string to readable format
function formatComparisonName(comparison) {
    if (!comparison) return '';
    
    // Example: "instantcheckmate_20250708_2040_vs_truthfinder_20250708_2041"
    // -> "InstantCheckmate vs TruthFinder"
    const parts = comparison.split('_vs_');
    if (parts.length === 2) {
        const site1 = formatSiteName(parts[0]);
        const site2 = formatSiteName(parts[1]);
        return `${site1} vs ${site2}`;
    }
    
    return comparison;
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    addCardHoverEffects();
    
    // Initialize collapsible sections
    initializeCollapsibleSections();
    
    // Add click handlers for expandable content
    addExpandableHandlers();
    
    // Initialize tooltips
    initializeTooltips();
}

// Add hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.overview-card, .risk-card, .action-card, .site-card, .phase-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanded = content.style.display !== 'none';
            
            content.style.display = isExpanded ? 'none' : 'block';
            this.classList.toggle('expanded', !isExpanded);
        });
    });
}

// Add expandable handlers for action items
function addExpandableHandlers() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't expand if clicking on a link
            if (e.target.tagName === 'A') return;
            
            this.classList.toggle('expanded');
        });
    });
}

// Initialize tooltips for technical terms
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            showTooltip(this, tooltipText);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// Show tooltip
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    
    setTimeout(() => tooltip.classList.add('visible'), 10);
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Export functionality
function exportData() {
    // Create a simplified version of the data for export
    const exportData = {
        timestamp: new Date().toISOString(),
        summary: {
            totalSites: document.querySelector('.overview-card.sites .card-number')?.textContent || '0',
            totalPages: document.querySelector('.overview-card.pages .card-number')?.textContent || '0',
            totalComparisons: document.querySelector('.overview-card.comparisons .card-number')?.textContent || '0',
            totalActions: document.querySelector('.overview-card.actions .card-number')?.textContent || '0'
        },
        riskAssessment: Array.from(document.querySelectorAll('.risk-card')).map(card => ({
            comparison: card.querySelector('.site-name')?.textContent || '',
            riskLevel: card.classList.contains('HIGH') ? 'HIGH' : 
                      card.classList.contains('MEDIUM') ? 'MEDIUM' : 'LOW',
            riskScore: card.querySelector('.score-value')?.textContent || '0%'
        }))
    };
    
    // Convert to JSON and download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `seo-analysis-summary-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Filter actions by priority
function filterActionsByPriority(priority) {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        if (priority === 'all' || card.classList.contains(priority)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search functionality
function searchActions(query) {
    const actionCards = document.querySelectorAll('.action-card');
    const searchTerm = query.toLowerCase();
    
    actionCards.forEach(card => {
        const title = card.querySelector('.action-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.action-description')?.textContent.toLowerCase() || '';
        const category = card.getAttribute('data-category')?.toLowerCase() || '';
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       category.includes(searchTerm);
        
        card.style.display = matches ? 'block' : 'none';
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
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Animate elements on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.overview-card, .risk-card, .action-card, .site-card, .phase-card, .stat-card');
    cards.forEach(card => observer.observe(card));
}

// Print optimization
function optimizeForPrint() {
    // Expand all collapsible sections for printing
    const collapsibleContent = document.querySelectorAll('.collapsible-content');
    collapsibleContent.forEach(content => {
        content.style.display = 'block';
    });
    
    // Ensure all action cards are visible
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.style.display = 'block';
    });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close expanded elements
    if (e.key === 'Escape') {
        const expandedCards = document.querySelectorAll('.action-card.expanded');
        expandedCards.forEach(card => card.classList.remove('expanded'));
        hideTooltip();
    }
    
    // Ctrl+F for search (if search functionality is implemented)
    if (e.ctrlKey && e.key === 'f') {
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
});

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && button.textContent) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add role attributes to card elements
    const cards = document.querySelectorAll('.overview-card, .risk-card, .action-card, .site-card');
    cards.forEach(card => {
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
    });
    
    // Ensure proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        if (!heading.getAttribute('id')) {
            const id = heading.textContent.toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '-');
            heading.setAttribute('id', id);
        }
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    enhanceAccessibility();
});

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Make functions available globally for HTML onclick handlers
window.exportData = exportData;
window.filterActionsByPriority = filterActionsByPriority;
window.searchActions = searchActions;

$(() => {
    // Toggle individual action card
    function toggleActionCard(headerElement) {
        const actionCard = headerElement.closest('.action-card');
        actionCard.classList.toggle('collapsed');
    }

    // Expand all action cards
    function expandAllActions() {
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.classList.remove('collapsed');
        });
    }

    // Collapse all action cards
    function collapseAllActions() {
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.classList.add('collapsed');
        });
    }

    $('.action-header').on('click', function() {
        toggleActionCard(this);
    });

    $('.control-button.expand-all').on('click', function() {
        expandAllActions();
    });

    $('.control-button.collapse-all').on('click', function() {
        collapseAllActions();
    });
})

// Initialize all cards as collapsed on page load
document.addEventListener('DOMContentLoaded', function() {
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.classList.add('collapsed');
    });
});
