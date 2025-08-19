(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// SEO Master Summary JavaScript

// Global data object (will be populated by your Mustache rendering)
var seoData = null;

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
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
  var timestampElements = document.querySelectorAll('[data-timestamp]');
  timestampElements.forEach(function (element) {
    var timestamp = element.getAttribute('data-timestamp');
    if (timestamp) {
      var date = new Date(timestamp);
      var formatted = date.toLocaleDateString('en-US', {
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
  var riskCircles = document.querySelectorAll('.risk-score-circle[data-score]');
  riskCircles.forEach(function (circle) {
    var score = parseFloat(circle.getAttribute('data-score'));
    var percentage = Math.round(score * 100);
    var scoreValue = circle.querySelector('.score-value');
    if (scoreValue) {
      scoreValue.textContent = percentage + '%';
    }

    // Animate the circle border color based on score
    animateRiskCircle(circle, score);
  });
}

// Initialize SEO score circles
function initializeSEOScores() {
  var seoCircles = document.querySelectorAll('.score-circle[data-score]');
  seoCircles.forEach(function (circle) {
    var score = parseFloat(circle.getAttribute('data-score'));
    var percentage = Math.round(score * 100);
    var scorePercentage = circle.querySelector('.score-percentage');
    if (scorePercentage) {
      scorePercentage.textContent = percentage + '%';
    }

    // Color the circle based on score
    var borderColor = getScoreColor(score);
    circle.style.borderColor = borderColor;
  });
}

// Animate risk circle based on score
function animateRiskCircle(circle, score) {
  var colors = {
    high: '#e74c3c',
    // Red for high risk
    medium: '#f39c12',
    // Orange for medium risk
    low: '#27ae60' // Green for low risk
  };
  var color;
  if (score > 0.7) color = colors.high;else if (score > 0.4) color = colors.medium;else color = colors.low;
  circle.style.borderColor = color;

  // Animate with a pulse effect for high risk
  if (score > 0.7) {
    circle.style.animation = 'pulse 2s infinite';
  }
}

// Get color based on SEO score
function getScoreColor(score) {
  if (score >= 0.9) return '#27ae60'; // Excellent - Green
  if (score >= 0.7) return '#3498db'; // Good - Blue
  if (score >= 0.5) return '#f39c12'; // Moderate - Orange
  return '#e74c3c'; // Poor - Red
}

// Calculate and display summary statistics
function calculateSummaryStats() {
  // These would normally be calculated from the actual data
  // For now, we'll use placeholder logic that can be enhanced

  // Average SEO Score calculation
  var seoScoreElements = document.querySelectorAll('[data-score]');
  if (seoScoreElements.length > 0) {
    var totalScore = 0;
    var count = 0;
    seoScoreElements.forEach(function (element) {
      var score = parseFloat(element.getAttribute('data-score'));
      if (!isNaN(score)) {
        totalScore += score;
        count++;
      }
    });
    if (count > 0) {
      var avgScore = Math.round(totalScore / count * 100);
      var avgElement = document.getElementById('avg-seo-score');
      if (avgElement) {
        avgElement.textContent = avgScore + '%';
      }
    }
  }

  // High risk sites count
  var highRiskElements = document.querySelectorAll('.risk-card.HIGH');
  var highRiskCount = document.getElementById('high-risk-sites');
  if (highRiskCount) {
    highRiskCount.textContent = highRiskElements.length;
  }

  // Estimated completion (placeholder logic)
  var completionElement = document.getElementById('completion-estimate');
  if (completionElement) {
    completionElement.textContent = '8-12 weeks';
  }
}

// Initialize category tabs functionality
function initializeCategoryTabs() {
  var tabButtons = document.querySelectorAll('.tab-button[data-category]');
  var categoryContent = document.querySelector('.category-content');
  if (!categoryContent) return;

  // Store reference to action cards data (would come from your data)
  // This is a placeholder - you'd populate this from your actual data structure

  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      tabButtons.forEach(function (btn) {
        return btn.classList.remove('active');
      });

      // Add active class to clicked button
      this.classList.add('active');

      // Get selected category
      var selectedCategory = this.getAttribute('data-category');

      // Update content based on selected category
      updateCategoryContent(selectedCategory);
    });
  });

  // Initialize with "all" category
  updateCategoryContent('all');
}

// Update category content based on selection
function updateCategoryContent(category) {
  var categoryContent = document.querySelector('.category-content');
  if (!categoryContent) return;

  // This would filter and display actions based on the selected category
  // For now, showing a placeholder message
  var content = '';
  if (category === 'all') {
    content = "\n            <div class=\"category-summary\">\n                <h3>All Categories Overview</h3>\n                <p>Displaying all action items across all categories. Use the tabs above to filter by specific category.</p>\n                <div class=\"category-stats\">\n                    <div class=\"stat-item\">\n                        <span class=\"stat-number\">19</span>\n                        <span class=\"stat-label\">High Priority Items</span>\n                    </div>\n                    <div class=\"stat-item\">\n                        <span class=\"stat-number\">21</span>\n                        <span class=\"stat-label\">Medium Priority Items</span>\n                    </div>\n                </div>\n            </div>\n        ";
  } else {
    content = "\n            <div class=\"category-summary\">\n                <h3>".concat(category, " Actions</h3>\n                <p>Showing actions specifically related to ").concat(category.toLowerCase(), ".</p>\n                <div class=\"filtered-actions\">\n                    <!-- Action items for ").concat(category, " would be displayed here -->\n                    <p class=\"placeholder\">Action items for ").concat(category, " will be displayed here when integrated with your data structure.</p>\n                </div>\n            </div>\n        ");
  }
  categoryContent.innerHTML = content;
}

// Initialize phase tabs functionality
function initializePhaseTabs() {
  var phaseButtons = document.querySelectorAll('.phase-tab[data-phase]');
  var phaseContent = document.querySelector('.phase-content');
  if (!phaseContent) return;
  phaseButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      phaseButtons.forEach(function (btn) {
        return btn.classList.remove('active');
      });

      // Add active class to clicked button
      this.classList.add('active');

      // Get selected phase
      var selectedPhase = this.getAttribute('data-phase');

      // Update content based on selected phase
      updatePhaseContent(selectedPhase);
    });
  });

  // Initialize with phase 1
  updatePhaseContent('phase1_immediate');
}

// Update phase content based on selection
function updatePhaseContent(phase) {
  var phaseContent = document.querySelector('.phase-content');
  if (!phaseContent) return;
  var phaseInfo = {
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
  var info = phaseInfo[phase] || phaseInfo['phase1_immediate'];
  var content = "\n        <div class=\"phase-summary\">\n            <h3>".concat(info.title, "</h3>\n            <p class=\"phase-timeline\"><strong>Timeline:</strong> ").concat(info.timeline, "</p>\n            <p class=\"phase-description\">").concat(info.description, "</p>\n            \n            <div class=\"phase-actions-list\">\n                <!-- Detailed phase actions would be displayed here -->\n                <p class=\"placeholder\">Detailed actions for ").concat(info.title, " will be displayed here when integrated with your roadmap data.</p>\n            </div>\n        </div>\n    ");
  phaseContent.innerHTML = content;
}

// Format site names from technical format to readable format
function formatSiteNames() {
  var siteNameElements = document.querySelectorAll('[data-site-name]');
  siteNameElements.forEach(function (element) {
    var technicalName = element.getAttribute('data-site-name');
    var readableName = formatSiteName(technicalName);
    element.textContent = readableName; // This line is correct
  });
  var comparisonElements = document.querySelectorAll('[data-site]');
  comparisonElements.forEach(function (element) {
    var comparison = element.getAttribute('data-site');
    // Only update if the element is specifically meant for comparison display
    if (element.classList.contains('site-name') || element.classList.contains('risk-comparison')) {
      var formatted = formatComparisonName(comparison);
      element.textContent = formatted;
    }
  });
}

// Format technical site name to readable format
function formatSiteName(technicalName) {
  if (!technicalName) return '';

  // Remove timestamp and convert to readable format
  // Example: "instantcheckmate_20250708_2040" -> "InstantCheckmate"
  var siteName = technicalName.split('_')[0];

  // Convert to title case and handle common site names
  var siteMap = {
    'instantcheckmate': 'InstantCheckmate',
    'truthfinder': 'TruthFinder',
    'intelius': 'Intelius'
  };
  return siteMap[siteName.toLowerCase()] || siteName.charAt(0).toUpperCase() + siteName.slice(1);
}

// Format comparison string to readable format
function formatComparisonName(comparison) {
  if (!comparison) return '';

  // Example: "instantcheckmate_20250708_2040_vs_truthfinder_20250708_2041"
  // -> "InstantCheckmate vs TruthFinder"
  var parts = comparison.split('_vs_');
  if (parts.length === 2) {
    var site1 = formatSiteName(parts[0]);
    var site2 = formatSiteName(parts[1]);
    return "".concat(site1, " vs ").concat(site2);
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
  var cards = document.querySelectorAll('.overview-card, .risk-card, .action-card, .site-card, .phase-card, .stat-card');
  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
  var collapsibleHeaders = document.querySelectorAll('.collapsible-header');
  collapsibleHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      var content = this.nextElementSibling;
      var isExpanded = content.style.display !== 'none';
      content.style.display = isExpanded ? 'none' : 'block';
      this.classList.toggle('expanded', !isExpanded);
    });
  });
}

// Add expandable handlers for action items
function addExpandableHandlers() {
  var actionCards = document.querySelectorAll('.action-card');
  actionCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      // Don't expand if clicking on a link
      if (e.target.tagName === 'A') return;
      this.classList.toggle('expanded');
    });
  });
}

// Initialize tooltips for technical terms
function initializeTooltips() {
  var tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(function (element) {
    element.addEventListener('mouseenter', function () {
      var tooltipText = this.getAttribute('data-tooltip');
      showTooltip(this, tooltipText);
    });
    element.addEventListener('mouseleave', function () {
      hideTooltip();
    });
  });
}

// Show tooltip
function showTooltip(element, text) {
  var tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  document.body.appendChild(tooltip);
  var rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
  setTimeout(function () {
    return tooltip.classList.add('visible');
  }, 10);
}

// Hide tooltip
function hideTooltip() {
  var tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    tooltip.remove();
  }
}

// Export functionality
function exportData() {
  var _document$querySelect, _document$querySelect2, _document$querySelect3, _document$querySelect4;
  // Create a simplified version of the data for export
  var exportData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalSites: ((_document$querySelect = document.querySelector('.overview-card.sites .card-number')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.textContent) || '0',
      totalPages: ((_document$querySelect2 = document.querySelector('.overview-card.pages .card-number')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent) || '0',
      totalComparisons: ((_document$querySelect3 = document.querySelector('.overview-card.comparisons .card-number')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.textContent) || '0',
      totalActions: ((_document$querySelect4 = document.querySelector('.overview-card.actions .card-number')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.textContent) || '0'
    },
    riskAssessment: Array.from(document.querySelectorAll('.risk-card')).map(function (card) {
      var _card$querySelector, _card$querySelector2;
      return {
        comparison: ((_card$querySelector = card.querySelector('.site-name')) === null || _card$querySelector === void 0 ? void 0 : _card$querySelector.textContent) || '',
        riskLevel: card.classList.contains('HIGH') ? 'HIGH' : card.classList.contains('MEDIUM') ? 'MEDIUM' : 'LOW',
        riskScore: ((_card$querySelector2 = card.querySelector('.score-value')) === null || _card$querySelector2 === void 0 ? void 0 : _card$querySelector2.textContent) || '0%'
      };
    })
  };

  // Convert to JSON and download
  var dataStr = JSON.stringify(exportData, null, 2);
  var dataBlob = new Blob([dataStr], {
    type: 'application/json'
  });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = "seo-analysis-summary-".concat(new Date().toISOString().split('T')[0], ".json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Filter actions by priority
function filterActionsByPriority(priority) {
  var actionCards = document.querySelectorAll('.action-card');
  actionCards.forEach(function (card) {
    if (priority === 'all' || card.classList.contains(priority)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Search functionality
function searchActions(query) {
  var actionCards = document.querySelectorAll('.action-card');
  var searchTerm = query.toLowerCase();
  actionCards.forEach(function (card) {
    var _card$querySelector3, _card$querySelector4, _card$getAttribute;
    var title = ((_card$querySelector3 = card.querySelector('.action-title')) === null || _card$querySelector3 === void 0 ? void 0 : _card$querySelector3.textContent.toLowerCase()) || '';
    var description = ((_card$querySelector4 = card.querySelector('.action-description')) === null || _card$querySelector4 === void 0 ? void 0 : _card$querySelector4.textContent.toLowerCase()) || '';
    var category = ((_card$getAttribute = card.getAttribute('data-category')) === null || _card$getAttribute === void 0 ? void 0 : _card$getAttribute.toLowerCase()) || '';
    var matches = title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm);
    card.style.display = matches ? 'block' : 'none';
  });
}

// Utility function to animate numbers
function animateNumber(element, start, end) {
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
  var startTime = performance.now();
  var difference = end - start;
  function updateNumber(currentTime) {
    var elapsed = currentTime - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var current = Math.floor(start + difference * progress);
    element.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }
  requestAnimationFrame(updateNumber);
}

// Animate elements on scroll
function initializeScrollAnimations() {
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all cards
  var cards = document.querySelectorAll('.overview-card, .risk-card, .action-card, .site-card, .phase-card, .stat-card');
  cards.forEach(function (card) {
    return observer.observe(card);
  });
}

// Print optimization
function optimizeForPrint() {
  // Expand all collapsible sections for printing
  var collapsibleContent = document.querySelectorAll('.collapsible-content');
  collapsibleContent.forEach(function (content) {
    content.style.display = 'block';
  });

  // Ensure all action cards are visible
  var actionCards = document.querySelectorAll('.action-card');
  actionCards.forEach(function (card) {
    card.style.display = 'block';
  });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
  // ESC key to close expanded elements
  if (e.key === 'Escape') {
    var expandedCards = document.querySelectorAll('.action-card.expanded');
    expandedCards.forEach(function (card) {
      return card.classList.remove('expanded');
    });
    hideTooltip();
  }

  // Ctrl+F for search (if search functionality is implemented)
  if (e.ctrlKey && e.key === 'f') {
    var searchInput = document.querySelector('#search-input');
    if (searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  }
});

// Accessibility enhancements
function enhanceAccessibility() {
  // Add ARIA labels to interactive elements
  var buttons = document.querySelectorAll('button');
  buttons.forEach(function (button) {
    if (!button.getAttribute('aria-label') && button.textContent) {
      button.setAttribute('aria-label', button.textContent.trim());
    }
  });

  // Add role attributes to card elements
  var cards = document.querySelectorAll('.overview-card, .risk-card, .action-card, .site-card');
  cards.forEach(function (card) {
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
  });

  // Ensure proper heading hierarchy
  var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach(function (heading) {
    if (!heading.getAttribute('id')) {
      var id = heading.textContent.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
      heading.setAttribute('id', id);
    }
  });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', function () {
  initializeScrollAnimations();
  enhanceAccessibility();
});

// Performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', function () {
      var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log("Page load time: ".concat(loadTime, "ms"));
    });
  }
}

// Initialize performance tracking
trackPerformance();

// Make functions available globally for HTML onclick handlers
window.exportData = exportData;
window.filterActionsByPriority = filterActionsByPriority;
window.searchActions = searchActions;
$(function () {
  // Toggle individual action card
  function toggleActionCard(headerElement) {
    var actionCard = headerElement.closest('.action-card');
    actionCard.classList.toggle('collapsed');
  }

  // Expand all action cards
  function expandAllActions() {
    var actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(function (card) {
      card.classList.remove('collapsed');
    });
  }

  // Collapse all action cards
  function collapseAllActions() {
    var actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(function (card) {
      card.classList.add('collapsed');
    });
  }
  $('.action-header').on('click', function () {
    toggleActionCard(this);
  });
  $('.control-button.expand-all').on('click', function () {
    expandAllActions();
  });
  $('.control-button.collapse-all').on('click', function () {
    collapseAllActions();
  });
});

// Initialize all cards as collapsed on page load
document.addEventListener('DOMContentLoaded', function () {
  var actionCards = document.querySelectorAll('.action-card');
  actionCards.forEach(function (card) {
    card.classList.add('collapsed');
  });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzcmMvc2VvX21hc3Rlcl9zdW1tYXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBLElBQUksT0FBTyxHQUFHLElBQUk7O0FBRWxCO0FBQ0EsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsY0FBYyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsU0FBUyxjQUFjLENBQUEsRUFBRztFQUN0QjtFQUNBLGdCQUFnQixDQUFDLENBQUM7O0VBRWxCO0VBQ0Esb0JBQW9CLENBQUMsQ0FBQzs7RUFFdEI7RUFDQSxtQkFBbUIsQ0FBQyxDQUFDOztFQUVyQjtFQUNBLHFCQUFxQixDQUFDLENBQUM7O0VBRXZCO0VBQ0Esc0JBQXNCLENBQUMsQ0FBQzs7RUFFeEI7RUFDQSxtQkFBbUIsQ0FBQyxDQUFDOztFQUVyQjtFQUNBLGVBQWUsQ0FBQyxDQUFDOztFQUVqQjtFQUNBLDZCQUE2QixDQUFDLENBQUM7QUFDbkM7O0FBRUE7QUFDQSxTQUFTLGdCQUFnQixDQUFBLEVBQUc7RUFDeEIsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUM7RUFDdkUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTyxFQUFJO0lBQ2pDLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7SUFDeEQsSUFBSSxTQUFTLEVBQUU7TUFDWCxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7TUFDaEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtRQUMvQyxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxNQUFNO1FBQ2IsR0FBRyxFQUFFLFNBQVM7UUFDZCxJQUFJLEVBQUUs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QUM7RUFFRixDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVc7SUFDbkQsZ0JBQWdCLENBQUMsQ0FBQztFQUN0QixDQUFDLENBQUM7RUFFRixDQUFDLENBQUMsOEJBQThCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVc7SUFDckQsa0JBQWtCLENBQUMsQ0FBQztFQUN4QixDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7O0FBRUY7QUFDQSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUNyRCxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO0VBQzdELFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUk7SUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO0VBQ25DLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFNFTyBNYXN0ZXIgU3VtbWFyeSBKYXZhU2NyaXB0XG5cbi8vIEdsb2JhbCBkYXRhIG9iamVjdCAod2lsbCBiZSBwb3B1bGF0ZWQgYnkgeW91ciBNdXN0YWNoZSByZW5kZXJpbmcpXG5sZXQgc2VvRGF0YSA9IG51bGw7XG5cbi8vIEluaXRpYWxpemUgdGhlIHBhZ2Ugd2hlbiBET00gaXMgbG9hZGVkXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaW5pdGlhbGl6ZVBhZ2UoKTtcbn0pO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplUGFnZSgpIHtcbiAgICAvLyBGb3JtYXQgdGltZXN0YW1wc1xuICAgIGZvcm1hdFRpbWVzdGFtcHMoKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIHJpc2sgc2NvcmUgY2lyY2xlc1xuICAgIGluaXRpYWxpemVSaXNrU2NvcmVzKCk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSBTRU8gc2NvcmUgY2lyY2xlc1xuICAgIGluaXRpYWxpemVTRU9TY29yZXMoKTtcbiAgICBcbiAgICAvLyBDYWxjdWxhdGUgYW5kIGRpc3BsYXkgc3VtbWFyeSBzdGF0aXN0aWNzXG4gICAgY2FsY3VsYXRlU3VtbWFyeVN0YXRzKCk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSBjYXRlZ29yeSB0YWJzXG4gICAgaW5pdGlhbGl6ZUNhdGVnb3J5VGFicygpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgcGhhc2UgdGFic1xuICAgIGluaXRpYWxpemVQaGFzZVRhYnMoKTtcbiAgICBcbiAgICAvLyBGb3JtYXQgc2l0ZSBuYW1lc1xuICAgIGZvcm1hdFNpdGVOYW1lcygpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgaW50ZXJhY3RpdmUgZWxlbWVudHNcbiAgICBpbml0aWFsaXplSW50ZXJhY3RpdmVFbGVtZW50cygpO1xufVxuXG4vLyBGb3JtYXQgdGltZXN0YW1wcyB0byByZWFkYWJsZSBkYXRlc1xuZnVuY3Rpb24gZm9ybWF0VGltZXN0YW1wcygpIHtcbiAgICBjb25zdCB0aW1lc3RhbXBFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRpbWVzdGFtcF0nKTtcbiAgICB0aW1lc3RhbXBFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10aW1lc3RhbXAnKTtcbiAgICAgICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgaG91cjogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgIG1pbnV0ZTogJzItZGlnaXQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWQ7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSByaXNrIHNjb3JlIGNpcmNsZXMgd2l0aCBhbmltYXRlZCBwcm9ncmVzc1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVJpc2tTY29yZXMoKSB7XG4gICAgY29uc3Qgcmlza0NpcmNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmlzay1zY29yZS1jaXJjbGVbZGF0YS1zY29yZV0nKTtcbiAgICByaXNrQ2lyY2xlcy5mb3JFYWNoKGNpcmNsZSA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gcGFyc2VGbG9hdChjaXJjbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXNjb3JlJykpO1xuICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gTWF0aC5yb3VuZChzY29yZSAqIDEwMCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzY29yZVZhbHVlID0gY2lyY2xlLnF1ZXJ5U2VsZWN0b3IoJy5zY29yZS12YWx1ZScpO1xuICAgICAgICBpZiAoc2NvcmVWYWx1ZSkge1xuICAgICAgICAgICAgc2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IHBlcmNlbnRhZ2UgKyAnJSc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEFuaW1hdGUgdGhlIGNpcmNsZSBib3JkZXIgY29sb3IgYmFzZWQgb24gc2NvcmVcbiAgICAgICAgYW5pbWF0ZVJpc2tDaXJjbGUoY2lyY2xlLCBzY29yZSk7XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgU0VPIHNjb3JlIGNpcmNsZXNcbmZ1bmN0aW9uIGluaXRpYWxpemVTRU9TY29yZXMoKSB7XG4gICAgY29uc3Qgc2VvQ2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY29yZS1jaXJjbGVbZGF0YS1zY29yZV0nKTtcbiAgICBzZW9DaXJjbGVzLmZvckVhY2goY2lyY2xlID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSBwYXJzZUZsb2F0KGNpcmNsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2NvcmUnKSk7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBNYXRoLnJvdW5kKHNjb3JlICogMTAwKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNjb3JlUGVyY2VudGFnZSA9IGNpcmNsZS5xdWVyeVNlbGVjdG9yKCcuc2NvcmUtcGVyY2VudGFnZScpO1xuICAgICAgICBpZiAoc2NvcmVQZXJjZW50YWdlKSB7XG4gICAgICAgICAgICBzY29yZVBlcmNlbnRhZ2UudGV4dENvbnRlbnQgPSBwZXJjZW50YWdlICsgJyUnO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBDb2xvciB0aGUgY2lyY2xlIGJhc2VkIG9uIHNjb3JlXG4gICAgICAgIGNvbnN0IGJvcmRlckNvbG9yID0gZ2V0U2NvcmVDb2xvcihzY29yZSk7XG4gICAgICAgIGNpcmNsZS5zdHlsZS5ib3JkZXJDb2xvciA9IGJvcmRlckNvbG9yO1xuICAgIH0pO1xufVxuXG4vLyBBbmltYXRlIHJpc2sgY2lyY2xlIGJhc2VkIG9uIHNjb3JlXG5mdW5jdGlvbiBhbmltYXRlUmlza0NpcmNsZShjaXJjbGUsIHNjb3JlKSB7XG4gICAgY29uc3QgY29sb3JzID0ge1xuICAgICAgICBoaWdoOiAnI2U3NGMzYycsICAgIC8vIFJlZCBmb3IgaGlnaCByaXNrXG4gICAgICAgIG1lZGl1bTogJyNmMzljMTInLCAgLy8gT3JhbmdlIGZvciBtZWRpdW0gcmlza1xuICAgICAgICBsb3c6ICcjMjdhZTYwJyAgICAgIC8vIEdyZWVuIGZvciBsb3cgcmlza1xuICAgIH07XG4gICAgXG4gICAgbGV0IGNvbG9yO1xuICAgIGlmIChzY29yZSA+IDAuNykgY29sb3IgPSBjb2xvcnMuaGlnaDtcbiAgICBlbHNlIGlmIChzY29yZSA+IDAuNCkgY29sb3IgPSBjb2xvcnMubWVkaXVtO1xuICAgIGVsc2UgY29sb3IgPSBjb2xvcnMubG93O1xuICAgIFxuICAgIGNpcmNsZS5zdHlsZS5ib3JkZXJDb2xvciA9IGNvbG9yO1xuICAgIFxuICAgIC8vIEFuaW1hdGUgd2l0aCBhIHB1bHNlIGVmZmVjdCBmb3IgaGlnaCByaXNrXG4gICAgaWYgKHNjb3JlID4gMC43KSB7XG4gICAgICAgIGNpcmNsZS5zdHlsZS5hbmltYXRpb24gPSAncHVsc2UgMnMgaW5maW5pdGUnO1xuICAgIH1cbn1cblxuLy8gR2V0IGNvbG9yIGJhc2VkIG9uIFNFTyBzY29yZVxuZnVuY3Rpb24gZ2V0U2NvcmVDb2xvcihzY29yZSkge1xuICAgIGlmIChzY29yZSA+PSAwLjkpIHJldHVybiAnIzI3YWU2MCc7ICAgICAgLy8gRXhjZWxsZW50IC0gR3JlZW5cbiAgICBpZiAoc2NvcmUgPj0gMC43KSByZXR1cm4gJyMzNDk4ZGInOyAgICAgIC8vIEdvb2QgLSBCbHVlXG4gICAgaWYgKHNjb3JlID49IDAuNSkgcmV0dXJuICcjZjM5YzEyJzsgICAgICAvLyBNb2RlcmF0ZSAtIE9yYW5nZVxuICAgIHJldHVybiAnI2U3NGMzYyc7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9vciAtIFJlZFxufVxuXG4vLyBDYWxjdWxhdGUgYW5kIGRpc3BsYXkgc3VtbWFyeSBzdGF0aXN0aWNzXG5mdW5jdGlvbiBjYWxjdWxhdGVTdW1tYXJ5U3RhdHMoKSB7XG4gICAgLy8gVGhlc2Ugd291bGQgbm9ybWFsbHkgYmUgY2FsY3VsYXRlZCBmcm9tIHRoZSBhY3R1YWwgZGF0YVxuICAgIC8vIEZvciBub3csIHdlJ2xsIHVzZSBwbGFjZWhvbGRlciBsb2dpYyB0aGF0IGNhbiBiZSBlbmhhbmNlZFxuICAgIFxuICAgIC8vIEF2ZXJhZ2UgU0VPIFNjb3JlIGNhbGN1bGF0aW9uXG4gICAgY29uc3Qgc2VvU2NvcmVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNjb3JlXScpO1xuICAgIGlmIChzZW9TY29yZUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHRvdGFsU2NvcmUgPSAwO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBcbiAgICAgICAgc2VvU2NvcmVFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSBwYXJzZUZsb2F0KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNjb3JlJykpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihzY29yZSkpIHtcbiAgICAgICAgICAgICAgICB0b3RhbFNjb3JlICs9IHNjb3JlO1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgICAgICAgY29uc3QgYXZnU2NvcmUgPSBNYXRoLnJvdW5kKCh0b3RhbFNjb3JlIC8gY291bnQpICogMTAwKTtcbiAgICAgICAgICAgIGNvbnN0IGF2Z0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXZnLXNlby1zY29yZScpO1xuICAgICAgICAgICAgaWYgKGF2Z0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBhdmdFbGVtZW50LnRleHRDb250ZW50ID0gYXZnU2NvcmUgKyAnJSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gSGlnaCByaXNrIHNpdGVzIGNvdW50XG4gICAgY29uc3QgaGlnaFJpc2tFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaXNrLWNhcmQuSElHSCcpO1xuICAgIGNvbnN0IGhpZ2hSaXNrQ291bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlnaC1yaXNrLXNpdGVzJyk7XG4gICAgaWYgKGhpZ2hSaXNrQ291bnQpIHtcbiAgICAgICAgaGlnaFJpc2tDb3VudC50ZXh0Q29udGVudCA9IGhpZ2hSaXNrRWxlbWVudHMubGVuZ3RoO1xuICAgIH1cbiAgICBcbiAgICAvLyBFc3RpbWF0ZWQgY29tcGxldGlvbiAocGxhY2Vob2xkZXIgbG9naWMpXG4gICAgY29uc3QgY29tcGxldGlvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcGxldGlvbi1lc3RpbWF0ZScpO1xuICAgIGlmIChjb21wbGV0aW9uRWxlbWVudCkge1xuICAgICAgICBjb21wbGV0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9ICc4LTEyIHdlZWtzJztcbiAgICB9XG59XG5cbi8vIEluaXRpYWxpemUgY2F0ZWdvcnkgdGFicyBmdW5jdGlvbmFsaXR5XG5mdW5jdGlvbiBpbml0aWFsaXplQ2F0ZWdvcnlUYWJzKCkge1xuICAgIGNvbnN0IHRhYkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWJ1dHRvbltkYXRhLWNhdGVnb3J5XScpO1xuICAgIGNvbnN0IGNhdGVnb3J5Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yeS1jb250ZW50Jyk7XG4gICAgXG4gICAgaWYgKCFjYXRlZ29yeUNvbnRlbnQpIHJldHVybjtcbiAgICBcbiAgICAvLyBTdG9yZSByZWZlcmVuY2UgdG8gYWN0aW9uIGNhcmRzIGRhdGEgKHdvdWxkIGNvbWUgZnJvbSB5b3VyIGRhdGEpXG4gICAgLy8gVGhpcyBpcyBhIHBsYWNlaG9sZGVyIC0geW91J2QgcG9wdWxhdGUgdGhpcyBmcm9tIHlvdXIgYWN0dWFsIGRhdGEgc3RydWN0dXJlXG4gICAgXG4gICAgdGFiQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBidXR0b25zXG4gICAgICAgICAgICB0YWJCdXR0b25zLmZvckVhY2goYnRuID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY2xpY2tlZCBidXR0b25cbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEdldCBzZWxlY3RlZCBjYXRlZ29yeVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDYXRlZ29yeSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWNhdGVnb3J5Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBjb250ZW50IGJhc2VkIG9uIHNlbGVjdGVkIGNhdGVnb3J5XG4gICAgICAgICAgICB1cGRhdGVDYXRlZ29yeUNvbnRlbnQoc2VsZWN0ZWRDYXRlZ29yeSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgd2l0aCBcImFsbFwiIGNhdGVnb3J5XG4gICAgdXBkYXRlQ2F0ZWdvcnlDb250ZW50KCdhbGwnKTtcbn1cblxuLy8gVXBkYXRlIGNhdGVnb3J5IGNvbnRlbnQgYmFzZWQgb24gc2VsZWN0aW9uXG5mdW5jdGlvbiB1cGRhdGVDYXRlZ29yeUNvbnRlbnQoY2F0ZWdvcnkpIHtcbiAgICBjb25zdCBjYXRlZ29yeUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcnktY29udGVudCcpO1xuICAgIGlmICghY2F0ZWdvcnlDb250ZW50KSByZXR1cm47XG4gICAgXG4gICAgLy8gVGhpcyB3b3VsZCBmaWx0ZXIgYW5kIGRpc3BsYXkgYWN0aW9ucyBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgY2F0ZWdvcnlcbiAgICAvLyBGb3Igbm93LCBzaG93aW5nIGEgcGxhY2Vob2xkZXIgbWVzc2FnZVxuICAgIGxldCBjb250ZW50ID0gJyc7XG4gICAgXG4gICAgaWYgKGNhdGVnb3J5ID09PSAnYWxsJykge1xuICAgICAgICBjb250ZW50ID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGVnb3J5LXN1bW1hcnlcIj5cbiAgICAgICAgICAgICAgICA8aDM+QWxsIENhdGVnb3JpZXMgT3ZlcnZpZXc8L2gzPlxuICAgICAgICAgICAgICAgIDxwPkRpc3BsYXlpbmcgYWxsIGFjdGlvbiBpdGVtcyBhY3Jvc3MgYWxsIGNhdGVnb3JpZXMuIFVzZSB0aGUgdGFicyBhYm92ZSB0byBmaWx0ZXIgYnkgc3BlY2lmaWMgY2F0ZWdvcnkuPC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRlZ29yeS1zdGF0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN0YXQtbnVtYmVyXCI+MTk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN0YXQtbGFiZWxcIj5IaWdoIFByaW9yaXR5IEl0ZW1zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdGF0LW51bWJlclwiPjIxPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdGF0LWxhYmVsXCI+TWVkaXVtIFByaW9yaXR5IEl0ZW1zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnktc3VtbWFyeVwiPlxuICAgICAgICAgICAgICAgIDxoMz4ke2NhdGVnb3J5fSBBY3Rpb25zPC9oMz5cbiAgICAgICAgICAgICAgICA8cD5TaG93aW5nIGFjdGlvbnMgc3BlY2lmaWNhbGx5IHJlbGF0ZWQgdG8gJHtjYXRlZ29yeS50b0xvd2VyQ2FzZSgpfS48L3A+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlcmVkLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBBY3Rpb24gaXRlbXMgZm9yICR7Y2F0ZWdvcnl9IHdvdWxkIGJlIGRpc3BsYXllZCBoZXJlIC0tPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBsYWNlaG9sZGVyXCI+QWN0aW9uIGl0ZW1zIGZvciAke2NhdGVnb3J5fSB3aWxsIGJlIGRpc3BsYXllZCBoZXJlIHdoZW4gaW50ZWdyYXRlZCB3aXRoIHlvdXIgZGF0YSBzdHJ1Y3R1cmUuPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfVxuICAgIFxuICAgIGNhdGVnb3J5Q29udGVudC5pbm5lckhUTUwgPSBjb250ZW50O1xufVxuXG4vLyBJbml0aWFsaXplIHBoYXNlIHRhYnMgZnVuY3Rpb25hbGl0eVxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBoYXNlVGFicygpIHtcbiAgICBjb25zdCBwaGFzZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGhhc2UtdGFiW2RhdGEtcGhhc2VdJyk7XG4gICAgY29uc3QgcGhhc2VDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBoYXNlLWNvbnRlbnQnKTtcbiAgICBcbiAgICBpZiAoIXBoYXNlQ29udGVudCkgcmV0dXJuO1xuICAgIFxuICAgIHBoYXNlQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBidXR0b25zXG4gICAgICAgICAgICBwaGFzZUJ1dHRvbnMuZm9yRWFjaChidG4gPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjbGlja2VkIGJ1dHRvblxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gR2V0IHNlbGVjdGVkIHBoYXNlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFBoYXNlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGhhc2UnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIGNvbnRlbnQgYmFzZWQgb24gc2VsZWN0ZWQgcGhhc2VcbiAgICAgICAgICAgIHVwZGF0ZVBoYXNlQ29udGVudChzZWxlY3RlZFBoYXNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSB3aXRoIHBoYXNlIDFcbiAgICB1cGRhdGVQaGFzZUNvbnRlbnQoJ3BoYXNlMV9pbW1lZGlhdGUnKTtcbn1cblxuLy8gVXBkYXRlIHBoYXNlIGNvbnRlbnQgYmFzZWQgb24gc2VsZWN0aW9uXG5mdW5jdGlvbiB1cGRhdGVQaGFzZUNvbnRlbnQocGhhc2UpIHtcbiAgICBjb25zdCBwaGFzZUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGhhc2UtY29udGVudCcpO1xuICAgIGlmICghcGhhc2VDb250ZW50KSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgcGhhc2VJbmZvID0ge1xuICAgICAgICAncGhhc2UxX2ltbWVkaWF0ZSc6IHtcbiAgICAgICAgICAgIHRpdGxlOiAnUGhhc2UgMTogSW1tZWRpYXRlIEFjdGlvbnMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDcml0aWNhbCBkdXBsaWNhdGUgY29udGVudCBhbmQgU0VPIHZpb2xhdGlvbnMgdGhhdCBuZWVkIGltbWVkaWF0ZSBhdHRlbnRpb24uJyxcbiAgICAgICAgICAgIHRpbWVsaW5lOiAnMS0yIHdlZWtzJ1xuICAgICAgICB9LFxuICAgICAgICAncGhhc2UyX2hpZ2hfaW1wYWN0Jzoge1xuICAgICAgICAgICAgdGl0bGU6ICdQaGFzZSAyOiBIaWdoIEltcGFjdCBBY3Rpb25zJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSGlnaC1pbXBhY3QgU0VPIGltcHJvdmVtZW50cyBhbmQgdW5pcXVlbmVzcyBlbmhhbmNlbWVudHMuJyxcbiAgICAgICAgICAgIHRpbWVsaW5lOiAnMi00IHdlZWtzJ1xuICAgICAgICB9LFxuICAgICAgICAncGhhc2UzX29wdGltaXphdGlvbic6IHtcbiAgICAgICAgICAgIHRpdGxlOiAnUGhhc2UgMzogT3B0aW1pemF0aW9uIEFjdGlvbnMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDb250ZW50IG9wdGltaXphdGlvbiBhbmQgYWRkaXRpb25hbCBTRU8gZW5oYW5jZW1lbnRzLicsXG4gICAgICAgICAgICB0aW1lbGluZTogJzEtMiBtb250aHMnXG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGluZm8gPSBwaGFzZUluZm9bcGhhc2VdIHx8IHBoYXNlSW5mb1sncGhhc2UxX2ltbWVkaWF0ZSddO1xuICAgIFxuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaGFzZS1zdW1tYXJ5XCI+XG4gICAgICAgICAgICA8aDM+JHtpbmZvLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInBoYXNlLXRpbWVsaW5lXCI+PHN0cm9uZz5UaW1lbGluZTo8L3N0cm9uZz4gJHtpbmZvLnRpbWVsaW5lfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicGhhc2UtZGVzY3JpcHRpb25cIj4ke2luZm8uZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhhc2UtYWN0aW9ucy1saXN0XCI+XG4gICAgICAgICAgICAgICAgPCEtLSBEZXRhaWxlZCBwaGFzZSBhY3Rpb25zIHdvdWxkIGJlIGRpc3BsYXllZCBoZXJlIC0tPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGxhY2Vob2xkZXJcIj5EZXRhaWxlZCBhY3Rpb25zIGZvciAke2luZm8udGl0bGV9IHdpbGwgYmUgZGlzcGxheWVkIGhlcmUgd2hlbiBpbnRlZ3JhdGVkIHdpdGggeW91ciByb2FkbWFwIGRhdGEuPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgXG4gICAgcGhhc2VDb250ZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XG59XG5cbi8vIEZvcm1hdCBzaXRlIG5hbWVzIGZyb20gdGVjaG5pY2FsIGZvcm1hdCB0byByZWFkYWJsZSBmb3JtYXRcbmZ1bmN0aW9uIGZvcm1hdFNpdGVOYW1lcygpIHtcbiAgICBjb25zdCBzaXRlTmFtZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2l0ZS1uYW1lXScpO1xuICAgIHNpdGVOYW1lRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgdGVjaG5pY2FsTmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNpdGUtbmFtZScpO1xuICAgICAgICBjb25zdCByZWFkYWJsZU5hbWUgPSBmb3JtYXRTaXRlTmFtZSh0ZWNobmljYWxOYW1lKTtcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHJlYWRhYmxlTmFtZTsgLy8gVGhpcyBsaW5lIGlzIGNvcnJlY3RcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBjb21wYXJpc29uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaXRlXScpO1xuICAgIGNvbXBhcmlzb25FbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCBjb21wYXJpc29uID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l0ZScpO1xuICAgICAgICAvLyBPbmx5IHVwZGF0ZSBpZiB0aGUgZWxlbWVudCBpcyBzcGVjaWZpY2FsbHkgbWVhbnQgZm9yIGNvbXBhcmlzb24gZGlzcGxheVxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3NpdGUtbmFtZScpIHx8IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyaXNrLWNvbXBhcmlzb24nKSkge1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkID0gZm9ybWF0Q29tcGFyaXNvbk5hbWUoY29tcGFyaXNvbik7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0dGVkO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIEZvcm1hdCB0ZWNobmljYWwgc2l0ZSBuYW1lIHRvIHJlYWRhYmxlIGZvcm1hdFxuZnVuY3Rpb24gZm9ybWF0U2l0ZU5hbWUodGVjaG5pY2FsTmFtZSkge1xuICAgIGlmICghdGVjaG5pY2FsTmFtZSkgcmV0dXJuICcnO1xuICAgIFxuICAgIC8vIFJlbW92ZSB0aW1lc3RhbXAgYW5kIGNvbnZlcnQgdG8gcmVhZGFibGUgZm9ybWF0XG4gICAgLy8gRXhhbXBsZTogXCJpbnN0YW50Y2hlY2ttYXRlXzIwMjUwNzA4XzIwNDBcIiAtPiBcIkluc3RhbnRDaGVja21hdGVcIlxuICAgIGNvbnN0IHNpdGVOYW1lID0gdGVjaG5pY2FsTmFtZS5zcGxpdCgnXycpWzBdO1xuICAgIFxuICAgIC8vIENvbnZlcnQgdG8gdGl0bGUgY2FzZSBhbmQgaGFuZGxlIGNvbW1vbiBzaXRlIG5hbWVzXG4gICAgY29uc3Qgc2l0ZU1hcCA9IHtcbiAgICAgICAgJ2luc3RhbnRjaGVja21hdGUnOiAnSW5zdGFudENoZWNrbWF0ZScsXG4gICAgICAgICd0cnV0aGZpbmRlcic6ICdUcnV0aEZpbmRlcicsXG4gICAgICAgICdpbnRlbGl1cyc6ICdJbnRlbGl1cydcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiBzaXRlTWFwW3NpdGVOYW1lLnRvTG93ZXJDYXNlKCldIHx8IFxuICAgICAgICAgICBzaXRlTmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHNpdGVOYW1lLnNsaWNlKDEpO1xufVxuXG4vLyBGb3JtYXQgY29tcGFyaXNvbiBzdHJpbmcgdG8gcmVhZGFibGUgZm9ybWF0XG5mdW5jdGlvbiBmb3JtYXRDb21wYXJpc29uTmFtZShjb21wYXJpc29uKSB7XG4gICAgaWYgKCFjb21wYXJpc29uKSByZXR1cm4gJyc7XG4gICAgXG4gICAgLy8gRXhhbXBsZTogXCJpbnN0YW50Y2hlY2ttYXRlXzIwMjUwNzA4XzIwNDBfdnNfdHJ1dGhmaW5kZXJfMjAyNTA3MDhfMjA0MVwiXG4gICAgLy8gLT4gXCJJbnN0YW50Q2hlY2ttYXRlIHZzIFRydXRoRmluZGVyXCJcbiAgICBjb25zdCBwYXJ0cyA9IGNvbXBhcmlzb24uc3BsaXQoJ192c18nKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGNvbnN0IHNpdGUxID0gZm9ybWF0U2l0ZU5hbWUocGFydHNbMF0pO1xuICAgICAgICBjb25zdCBzaXRlMiA9IGZvcm1hdFNpdGVOYW1lKHBhcnRzWzFdKTtcbiAgICAgICAgcmV0dXJuIGAke3NpdGUxfSB2cyAke3NpdGUyfWA7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBjb21wYXJpc29uO1xufVxuXG4vLyBJbml0aWFsaXplIGludGVyYWN0aXZlIGVsZW1lbnRzXG5mdW5jdGlvbiBpbml0aWFsaXplSW50ZXJhY3RpdmVFbGVtZW50cygpIHtcbiAgICAvLyBBZGQgaG92ZXIgZWZmZWN0cyB0byBjYXJkc1xuICAgIGFkZENhcmRIb3ZlckVmZmVjdHMoKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIGNvbGxhcHNpYmxlIHNlY3Rpb25zXG4gICAgaW5pdGlhbGl6ZUNvbGxhcHNpYmxlU2VjdGlvbnMoKTtcbiAgICBcbiAgICAvLyBBZGQgY2xpY2sgaGFuZGxlcnMgZm9yIGV4cGFuZGFibGUgY29udGVudFxuICAgIGFkZEV4cGFuZGFibGVIYW5kbGVycygpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgdG9vbHRpcHNcbiAgICBpbml0aWFsaXplVG9vbHRpcHMoKTtcbn1cblxuLy8gQWRkIGhvdmVyIGVmZmVjdHMgdG8gY2FyZHNcbmZ1bmN0aW9uIGFkZENhcmRIb3ZlckVmZmVjdHMoKSB7XG4gICAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3ZlcnZpZXctY2FyZCwgLnJpc2stY2FyZCwgLmFjdGlvbi1jYXJkLCAuc2l0ZS1jYXJkLCAucGhhc2UtY2FyZCwgLnN0YXQtY2FyZCcpO1xuICAgIFxuICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtNXB4KSc7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDApJztcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgY29sbGFwc2libGUgc2VjdGlvbnNcbmZ1bmN0aW9uIGluaXRpYWxpemVDb2xsYXBzaWJsZVNlY3Rpb25zKCkge1xuICAgIGNvbnN0IGNvbGxhcHNpYmxlSGVhZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2xsYXBzaWJsZS1oZWFkZXInKTtcbiAgICBcbiAgICBjb2xsYXBzaWJsZUhlYWRlcnMuZm9yRWFjaChoZWFkZXIgPT4ge1xuICAgICAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGNvbnN0IGlzRXhwYW5kZWQgPSBjb250ZW50LnN0eWxlLmRpc3BsYXkgIT09ICdub25lJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gaXNFeHBhbmRlZCA/ICdub25lJyA6ICdibG9jayc7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2V4cGFuZGVkJywgIWlzRXhwYW5kZWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gQWRkIGV4cGFuZGFibGUgaGFuZGxlcnMgZm9yIGFjdGlvbiBpdGVtc1xuZnVuY3Rpb24gYWRkRXhwYW5kYWJsZUhhbmRsZXJzKCkge1xuICAgIGNvbnN0IGFjdGlvbkNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGlvbi1jYXJkJyk7XG4gICAgXG4gICAgYWN0aW9uQ2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIERvbid0IGV4cGFuZCBpZiBjbGlja2luZyBvbiBhIGxpbmtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnQScpIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdleHBhbmRlZCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSB0b29sdGlwcyBmb3IgdGVjaG5pY2FsIHRlcm1zXG5mdW5jdGlvbiBpbml0aWFsaXplVG9vbHRpcHMoKSB7XG4gICAgY29uc3QgdG9vbHRpcEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9vbHRpcF0nKTtcbiAgICBcbiAgICB0b29sdGlwRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCB0b29sdGlwVGV4dCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcbiAgICAgICAgICAgIHNob3dUb29sdGlwKHRoaXMsIHRvb2x0aXBUZXh0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGhpZGVUb29sdGlwKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vLyBTaG93IHRvb2x0aXBcbmZ1bmN0aW9uIHNob3dUb29sdGlwKGVsZW1lbnQsIHRleHQpIHtcbiAgICBjb25zdCB0b29sdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9vbHRpcC5jbGFzc05hbWUgPSAndG9vbHRpcCc7XG4gICAgdG9vbHRpcC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwKTtcbiAgICBcbiAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0b29sdGlwLnN0eWxlLmxlZnQgPSByZWN0LmxlZnQgKyAocmVjdC53aWR0aCAvIDIpIC0gKHRvb2x0aXAub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XG4gICAgdG9vbHRpcC5zdHlsZS50b3AgPSByZWN0LnRvcCAtIHRvb2x0aXAub2Zmc2V0SGVpZ2h0IC0gNSArICdweCc7XG4gICAgXG4gICAgc2V0VGltZW91dCgoKSA9PiB0b29sdGlwLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKSwgMTApO1xufVxuXG4vLyBIaWRlIHRvb2x0aXBcbmZ1bmN0aW9uIGhpZGVUb29sdGlwKCkge1xuICAgIGNvbnN0IHRvb2x0aXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbHRpcCcpO1xuICAgIGlmICh0b29sdGlwKSB7XG4gICAgICAgIHRvb2x0aXAucmVtb3ZlKCk7XG4gICAgfVxufVxuXG4vLyBFeHBvcnQgZnVuY3Rpb25hbGl0eVxuZnVuY3Rpb24gZXhwb3J0RGF0YSgpIHtcbiAgICAvLyBDcmVhdGUgYSBzaW1wbGlmaWVkIHZlcnNpb24gb2YgdGhlIGRhdGEgZm9yIGV4cG9ydFxuICAgIGNvbnN0IGV4cG9ydERhdGEgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBzdW1tYXJ5OiB7XG4gICAgICAgICAgICB0b3RhbFNpdGVzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcnZpZXctY2FyZC5zaXRlcyAuY2FyZC1udW1iZXInKT8udGV4dENvbnRlbnQgfHwgJzAnLFxuICAgICAgICAgICAgdG90YWxQYWdlczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJ2aWV3LWNhcmQucGFnZXMgLmNhcmQtbnVtYmVyJyk/LnRleHRDb250ZW50IHx8ICcwJyxcbiAgICAgICAgICAgIHRvdGFsQ29tcGFyaXNvbnM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVydmlldy1jYXJkLmNvbXBhcmlzb25zIC5jYXJkLW51bWJlcicpPy50ZXh0Q29udGVudCB8fCAnMCcsXG4gICAgICAgICAgICB0b3RhbEFjdGlvbnM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVydmlldy1jYXJkLmFjdGlvbnMgLmNhcmQtbnVtYmVyJyk/LnRleHRDb250ZW50IHx8ICcwJ1xuICAgICAgICB9LFxuICAgICAgICByaXNrQXNzZXNzbWVudDogQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmlzay1jYXJkJykpLm1hcChjYXJkID0+ICh7XG4gICAgICAgICAgICBjb21wYXJpc29uOiBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLW5hbWUnKT8udGV4dENvbnRlbnQgfHwgJycsXG4gICAgICAgICAgICByaXNrTGV2ZWw6IGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKCdISUdIJykgPyAnSElHSCcgOiBcbiAgICAgICAgICAgICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5jb250YWlucygnTUVESVVNJykgPyAnTUVESVVNJyA6ICdMT1cnLFxuICAgICAgICAgICAgcmlza1Njb3JlOiBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5zY29yZS12YWx1ZScpPy50ZXh0Q29udGVudCB8fCAnMCUnXG4gICAgICAgIH0pKVxuICAgIH07XG4gICAgXG4gICAgLy8gQ29udmVydCB0byBKU09OIGFuZCBkb3dubG9hZFxuICAgIGNvbnN0IGRhdGFTdHIgPSBKU09OLnN0cmluZ2lmeShleHBvcnREYXRhLCBudWxsLCAyKTtcbiAgICBjb25zdCBkYXRhQmxvYiA9IG5ldyBCbG9iKFtkYXRhU3RyXSwge3R5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgIFxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhQmxvYik7XG4gICAgbGluay5kb3dubG9hZCA9IGBzZW8tYW5hbHlzaXMtc3VtbWFyeS0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS5qc29uYDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xufVxuXG4vLyBGaWx0ZXIgYWN0aW9ucyBieSBwcmlvcml0eVxuZnVuY3Rpb24gZmlsdGVyQWN0aW9uc0J5UHJpb3JpdHkocHJpb3JpdHkpIHtcbiAgICBjb25zdCBhY3Rpb25DYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpb24tY2FyZCcpO1xuICAgIFxuICAgIGFjdGlvbkNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgIGlmIChwcmlvcml0eSA9PT0gJ2FsbCcgfHwgY2FyZC5jbGFzc0xpc3QuY29udGFpbnMocHJpb3JpdHkpKSB7XG4gICAgICAgICAgICBjYXJkLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FyZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIFNlYXJjaCBmdW5jdGlvbmFsaXR5XG5mdW5jdGlvbiBzZWFyY2hBY3Rpb25zKHF1ZXJ5KSB7XG4gICAgY29uc3QgYWN0aW9uQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aW9uLWNhcmQnKTtcbiAgICBjb25zdCBzZWFyY2hUZXJtID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcbiAgICBcbiAgICBhY3Rpb25DYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICBjb25zdCB0aXRsZSA9IGNhcmQucXVlcnlTZWxlY3RvcignLmFjdGlvbi10aXRsZScpPy50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGNhcmQucXVlcnlTZWxlY3RvcignLmFjdGlvbi1kZXNjcmlwdGlvbicpPy50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IGNhcmQuZ2V0QXR0cmlidXRlKCdkYXRhLWNhdGVnb3J5Jyk/LnRvTG93ZXJDYXNlKCkgfHwgJyc7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGl0bGUuaW5jbHVkZXMoc2VhcmNoVGVybSkgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLmluY2x1ZGVzKHNlYXJjaFRlcm0pIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeS5pbmNsdWRlcyhzZWFyY2hUZXJtKTtcbiAgICAgICAgXG4gICAgICAgIGNhcmQuc3R5bGUuZGlzcGxheSA9IG1hdGNoZXMgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIH0pO1xufVxuXG4vLyBVdGlsaXR5IGZ1bmN0aW9uIHRvIGFuaW1hdGUgbnVtYmVyc1xuZnVuY3Rpb24gYW5pbWF0ZU51bWJlcihlbGVtZW50LCBzdGFydCwgZW5kLCBkdXJhdGlvbiA9IDEwMDApIHtcbiAgICBjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gZW5kIC0gc3RhcnQ7XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlTnVtYmVyKGN1cnJlbnRUaW1lKSB7XG4gICAgICAgIGNvbnN0IGVsYXBzZWQgPSBjdXJyZW50VGltZSAtIHN0YXJ0VGltZTtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1pbihlbGFwc2VkIC8gZHVyYXRpb24sIDEpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY3VycmVudCA9IE1hdGguZmxvb3Ioc3RhcnQgKyAoZGlmZmVyZW5jZSAqIHByb2dyZXNzKSk7XG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50O1xuICAgICAgICBcbiAgICAgICAgaWYgKHByb2dyZXNzIDwgMSkge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZU51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZU51bWJlcik7XG59XG5cbi8vIEFuaW1hdGUgZWxlbWVudHMgb24gc2Nyb2xsXG5mdW5jdGlvbiBpbml0aWFsaXplU2Nyb2xsQW5pbWF0aW9ucygpIHtcbiAgICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XG4gICAgICAgIHRocmVzaG9sZDogMC4xLFxuICAgICAgICByb290TWFyZ2luOiAnMHB4IDBweCAtNTBweCAwcHgnXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtaW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgb2JzZXJ2ZXJPcHRpb25zKTtcbiAgICBcbiAgICAvLyBPYnNlcnZlIGFsbCBjYXJkc1xuICAgIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm92ZXJ2aWV3LWNhcmQsIC5yaXNrLWNhcmQsIC5hY3Rpb24tY2FyZCwgLnNpdGUtY2FyZCwgLnBoYXNlLWNhcmQsIC5zdGF0LWNhcmQnKTtcbiAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4gb2JzZXJ2ZXIub2JzZXJ2ZShjYXJkKSk7XG59XG5cbi8vIFByaW50IG9wdGltaXphdGlvblxuZnVuY3Rpb24gb3B0aW1pemVGb3JQcmludCgpIHtcbiAgICAvLyBFeHBhbmQgYWxsIGNvbGxhcHNpYmxlIHNlY3Rpb25zIGZvciBwcmludGluZ1xuICAgIGNvbnN0IGNvbGxhcHNpYmxlQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2xsYXBzaWJsZS1jb250ZW50Jyk7XG4gICAgY29sbGFwc2libGVDb250ZW50LmZvckVhY2goY29udGVudCA9PiB7XG4gICAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gRW5zdXJlIGFsbCBhY3Rpb24gY2FyZHMgYXJlIHZpc2libGVcbiAgICBjb25zdCBhY3Rpb25DYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpb24tY2FyZCcpO1xuICAgIGFjdGlvbkNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgIGNhcmQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgcHJpbnQgaGFuZGxpbmdcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVwcmludCcsIG9wdGltaXplRm9yUHJpbnQpO1xuXG4vLyBLZXlib2FyZCBuYXZpZ2F0aW9uIHN1cHBvcnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgLy8gRVNDIGtleSB0byBjbG9zZSBleHBhbmRlZCBlbGVtZW50c1xuICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgY29uc3QgZXhwYW5kZWRDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpb24tY2FyZC5leHBhbmRlZCcpO1xuICAgICAgICBleHBhbmRlZENhcmRzLmZvckVhY2goY2FyZCA9PiBjYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZGVkJykpO1xuICAgICAgICBoaWRlVG9vbHRpcCgpO1xuICAgIH1cbiAgICBcbiAgICAvLyBDdHJsK0YgZm9yIHNlYXJjaCAoaWYgc2VhcmNoIGZ1bmN0aW9uYWxpdHkgaXMgaW1wbGVtZW50ZWQpXG4gICAgaWYgKGUuY3RybEtleSAmJiBlLmtleSA9PT0gJ2YnKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1pbnB1dCcpO1xuICAgICAgICBpZiAoc2VhcmNoSW5wdXQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLy8gQWNjZXNzaWJpbGl0eSBlbmhhbmNlbWVudHNcbmZ1bmN0aW9uIGVuaGFuY2VBY2Nlc3NpYmlsaXR5KCkge1xuICAgIC8vIEFkZCBBUklBIGxhYmVscyB0byBpbnRlcmFjdGl2ZSBlbGVtZW50c1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgaWYgKCFidXR0b24uZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgJiYgYnV0dG9uLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYnV0dG9uLnRleHRDb250ZW50LnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBBZGQgcm9sZSBhdHRyaWJ1dGVzIHRvIGNhcmQgZWxlbWVudHNcbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vdmVydmlldy1jYXJkLCAucmlzay1jYXJkLCAuYWN0aW9uLWNhcmQsIC5zaXRlLWNhcmQnKTtcbiAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICBjYXJkLnNldEF0dHJpYnV0ZSgncm9sZScsICdhcnRpY2xlJyk7XG4gICAgICAgIGNhcmQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gRW5zdXJlIHByb3BlciBoZWFkaW5nIGhpZXJhcmNoeVxuICAgIGNvbnN0IGhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaDEsIGgyLCBoMywgaDQsIGg1LCBoNicpO1xuICAgIGhlYWRpbmdzLmZvckVhY2goaGVhZGluZyA9PiB7XG4gICAgICAgIGlmICghaGVhZGluZy5nZXRBdHRyaWJ1dGUoJ2lkJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gaGVhZGluZy50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1teYS16MC05XFxzXS9nLCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCAnLScpO1xuICAgICAgICAgICAgaGVhZGluZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgc2Nyb2xsIGFuaW1hdGlvbnMgd2hlbiBwYWdlIGxvYWRzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaW5pdGlhbGl6ZVNjcm9sbEFuaW1hdGlvbnMoKTtcbiAgICBlbmhhbmNlQWNjZXNzaWJpbGl0eSgpO1xufSk7XG5cbi8vIFBlcmZvcm1hbmNlIG1vbml0b3JpbmdcbmZ1bmN0aW9uIHRyYWNrUGVyZm9ybWFuY2UoKSB7XG4gICAgaWYgKCdwZXJmb3JtYW5jZScgaW4gd2luZG93KSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBsb2FkVGltZSA9IHBlcmZvcm1hbmNlLnRpbWluZy5sb2FkRXZlbnRFbmQgLSBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBhZ2UgbG9hZCB0aW1lOiAke2xvYWRUaW1lfW1zYCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSBwZXJmb3JtYW5jZSB0cmFja2luZ1xudHJhY2tQZXJmb3JtYW5jZSgpO1xuXG4vLyBNYWtlIGZ1bmN0aW9ucyBhdmFpbGFibGUgZ2xvYmFsbHkgZm9yIEhUTUwgb25jbGljayBoYW5kbGVyc1xud2luZG93LmV4cG9ydERhdGEgPSBleHBvcnREYXRhO1xud2luZG93LmZpbHRlckFjdGlvbnNCeVByaW9yaXR5ID0gZmlsdGVyQWN0aW9uc0J5UHJpb3JpdHk7XG53aW5kb3cuc2VhcmNoQWN0aW9ucyA9IHNlYXJjaEFjdGlvbnM7XG5cbiQoKCkgPT4ge1xuICAgIC8vIFRvZ2dsZSBpbmRpdmlkdWFsIGFjdGlvbiBjYXJkXG4gICAgZnVuY3Rpb24gdG9nZ2xlQWN0aW9uQ2FyZChoZWFkZXJFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbkNhcmQgPSBoZWFkZXJFbGVtZW50LmNsb3Nlc3QoJy5hY3Rpb24tY2FyZCcpO1xuICAgICAgICBhY3Rpb25DYXJkLmNsYXNzTGlzdC50b2dnbGUoJ2NvbGxhcHNlZCcpO1xuICAgIH1cblxuICAgIC8vIEV4cGFuZCBhbGwgYWN0aW9uIGNhcmRzXG4gICAgZnVuY3Rpb24gZXhwYW5kQWxsQWN0aW9ucygpIHtcbiAgICAgICAgY29uc3QgYWN0aW9uQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aW9uLWNhcmQnKTtcbiAgICAgICAgYWN0aW9uQ2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2VkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIENvbGxhcHNlIGFsbCBhY3Rpb24gY2FyZHNcbiAgICBmdW5jdGlvbiBjb2xsYXBzZUFsbEFjdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbkNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGlvbi1jYXJkJyk7XG4gICAgICAgIGFjdGlvbkNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKCcuYWN0aW9uLWhlYWRlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0b2dnbGVBY3Rpb25DYXJkKHRoaXMpO1xuICAgIH0pO1xuXG4gICAgJCgnLmNvbnRyb2wtYnV0dG9uLmV4cGFuZC1hbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwYW5kQWxsQWN0aW9ucygpO1xuICAgIH0pO1xuXG4gICAgJCgnLmNvbnRyb2wtYnV0dG9uLmNvbGxhcHNlLWFsbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb2xsYXBzZUFsbEFjdGlvbnMoKTtcbiAgICB9KTtcbn0pXG5cbi8vIEluaXRpYWxpemUgYWxsIGNhcmRzIGFzIGNvbGxhcHNlZCBvbiBwYWdlIGxvYWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBhY3Rpb25DYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpb24tY2FyZCcpO1xuICAgIGFjdGlvbkNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2VkJyk7XG4gICAgfSk7XG59KTtcbiJdfQ==
