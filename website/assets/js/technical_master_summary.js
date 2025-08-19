(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Technical Master Summary JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
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

// Calculate average scores for each technical component
function calculateComponentAverages() {
  var componentData = {
    htmlStructure: [],
    metaTags: [],
    frameworks: []
  };

  // Collect all scores for each component
  var similarityCards = document.querySelectorAll('.similarity-card');
  similarityCards.forEach(function (card) {
    var metrics = extractTechnicalMetricsFromCard(card);
    if (metrics) {
      componentData.htmlStructure.push(metrics.htmlStructure);
      componentData.metaTags.push(metrics.metaTags);
      componentData.frameworks.push(metrics.frameworks);
    }
  });

  // Calculate and display averages
  Object.keys(componentData).forEach(function (component) {
    var scores = componentData[component];
    if (scores.length > 0) {
      var average = scores.reduce(function (sum, score) {
        return sum + score;
      }, 0) / scores.length;

      // Update header overview metrics
      var overviewElement = document.getElementById(getOverviewElementId(component));
      if (overviewElement) {
        overviewElement.textContent = Math.round(average * 100) + '%';
      }

      // Update component cards
      var componentElement = document.getElementById(getComponentElementId(component));
      if (componentElement) {
        componentElement.textContent = Math.round(average * 100) + '%';

        // Add color coding based on similarity level
        var colorClass = getSimilarityClass(average);
        componentElement.className = "component-avg ".concat(colorClass);
      }
    }
  });
}

// Extract technical metrics from a similarity card
function extractTechnicalMetricsFromCard(card) {
  var metricValues = card.querySelectorAll('.metric-value');
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
  var mapping = {
    'htmlStructure': 'html-avg',
    'metaTags': 'meta-avg',
    'frameworks': 'frameworks-avg'
  };
  return mapping[component];
}

// Get component element ID
function getComponentElementId(component) {
  var mapping = {
    'htmlStructure': 'html-structure-avg',
    'metaTags': 'meta-tags-avg',
    'frameworks': 'frameworks-avg-display'
  };
  return mapping[component];
}

// Calculate technical risk assessment counts
function calculateTechnicalRiskAssessment() {
  var riskCounts = {
    critical: 0,
    // 75%+ similarity
    high: 0,
    // 50-75% similarity  
    moderate: 0,
    // 25-50% similarity
    low: 0 // 0-25% similarity
  };
  var overallScores = document.querySelectorAll('.overall-score .score-number');
  overallScores.forEach(function (scoreElement) {
    var score = parseFloat(scoreElement.textContent.replace('%', '')) / 100;
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
  Object.keys(riskCounts).forEach(function (risk) {
    var countElement = document.querySelector("#tech-".concat(risk, "-count .risk-number"));
    if (countElement) {
      countElement.textContent = riskCounts[risk];
      countElement.className = "risk-number ".concat(risk);
    }
  });
}

// Calculate component analysis metrics
function calculateComponentAnalysis() {
  var components = ['htmlStructure', 'metaTags', 'frameworks'];
  var componentAverages = {};

  // Get average scores for each component
  components.forEach(function (component) {
    var avgElement = document.getElementById(getComponentElementId(component));
    if (avgElement) {
      var score = parseFloat(avgElement.textContent.replace('%', '')) / 100;
      componentAverages[component] = score;
    }
  });

  // Find most and least similar components
  var mostSimilar = '';
  var leastSimilar = '';
  var highestScore = -1;
  var lowestScore = 2;
  var highestVariance = '';
  Object.keys(componentAverages).forEach(function (component) {
    var score = componentAverages[component];
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
  var sortedComponents = Object.keys(componentAverages).sort(function (a, b) {
    return componentAverages[b] - componentAverages[a];
  });
  highestVariance = sortedComponents[1] || sortedComponents[0];

  // Update component analysis displays
  var mostSimilarElement = document.getElementById('most-similar-component');
  var leastSimilarElement = document.getElementById('least-similar-component');
  var highestVarianceElement = document.getElementById('highest-variance');
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
  var htmlAvg = getComponentAverage('htmlStructure');
  var metaAvg = getComponentAverage('metaTags');
  var frameworksAvg = getComponentAverage('frameworks');

  // Update pattern insights
  var htmlPatternElement = document.getElementById('html-pattern');
  var frameworkPatternElement = document.getElementById('framework-pattern');
  var metaPatternElement = document.getElementById('meta-pattern');
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
  var element = document.getElementById(getComponentElementId(component));
  if (element) {
    return parseFloat(element.textContent.replace('%', '')) / 100;
  }
  return 0;
}

// Format comparison names from technical format
function formatComparisonNames() {
  var comparisonElements = document.querySelectorAll('[data-comparison]');
  comparisonElements.forEach(function (element) {
    var comparison = element.getAttribute('data-comparison');
    var formatted = formatComparisonName(comparison);
    element.textContent = formatted;
  });
}

// Format comparison string to readable format
function formatComparisonName(comparison) {
  if (!comparison) return '';

  // Split by _vs_ and format each site name
  var parts = comparison.split('_vs_');
  if (parts.length === 2) {
    var site1 = formatSiteName(parts[0]);
    var site2 = formatSiteName(parts[1]);
    return "".concat(site1, " vs ").concat(site2);
  }
  return comparison;
}

// Format technical site name to readable format
function formatSiteName(technicalName) {
  if (!technicalName) return '';

  // Remove timestamp and convert to readable format
  var siteName = technicalName.split('_')[0];

  // Convert to title case and handle common site names
  var siteMap = {
    'instantcheckmate': 'InstantCheckmate',
    'truthfinder': 'TruthFinder',
    'intelius': 'Intelius',
    'whitepages': 'WhitePages',
    'beenverified': 'BeenVerified',
    'truepeoplesearch': 'TruePeopleSearch'
  };
  return siteMap[siteName.toLowerCase()] || siteName.charAt(0).toUpperCase() + siteName.slice(1);
}

// Format component names for display
function formatComponentName(component) {
  var componentNames = {
    'htmlStructure': 'HTML Structure',
    'metaTags': 'Meta Tags',
    'frameworks': 'Frameworks'
  };
  return componentNames[component] || component;
}

// Get similarity class based on score
function getSimilarityClass(score) {
  if (score >= 0.75) return 'error'; // High similarity = bad
  if (score >= 0.5) return 'warning'; // Moderate similarity = warning
  if (score >= 0.25) return 'good'; // Low similarity = good
  return 'excellent'; // Very low similarity = excellent
}

// Initialize tooltip system
function initializeTooltips() {
  var tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
  tooltipTriggers.forEach(function (trigger) {
    trigger.addEventListener('mouseenter', function (e) {
      var tooltipId = this.getAttribute('data-tooltip');
      showTooltip(tooltipId, e);
    });
    trigger.addEventListener('mouseleave', function () {
      hideAllTooltips();
    });
    trigger.addEventListener('mousemove', function (e) {
      var tooltipId = this.getAttribute('data-tooltip');
      updateTooltipPosition(tooltipId, e);
    });
  });

  // Hide tooltips when clicking elsewhere
  document.addEventListener('click', hideAllTooltips);
}

// Show tooltip
function showTooltip(tooltipId, event) {
  hideAllTooltips();
  var tooltip = document.getElementById("tooltip-".concat(tooltipId));
  if (tooltip) {
    tooltip.classList.add('visible');
    updateTooltipPosition(tooltipId, event);
  }
}

// Update tooltip position
function updateTooltipPosition(tooltipId, event) {
  var tooltip = document.getElementById("tooltip-".concat(tooltipId));
  if (tooltip && tooltip.classList.contains('visible')) {
    var rect = tooltip.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var x = event.clientX + scrollLeft - rect.width / 2;
    var y = event.clientY + scrollTop - rect.height - 20;
    tooltip.style.left = Math.max(10, Math.min(x, window.innerWidth + scrollLeft - rect.width - 10)) + 'px';
    tooltip.style.top = Math.max(scrollTop + 10, y) + 'px';
  }
}

// Hide all tooltips
function hideAllTooltips() {
  var tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(function (tooltip) {
    tooltip.classList.remove('visible');
  });
}

// Initialize scroll-triggered animations
function initializeAnimations() {
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
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
  var animatableElements = document.querySelectorAll('.similarity-card, .insight-card, .component-card');
  animatableElements.forEach(function (element) {
    return observer.observe(element);
  });
}

// Animate metric bars in similarity cards
function animateMetricBars(card) {
  var metricBars = card.querySelectorAll('.metric-fill');
  metricBars.forEach(function (bar, index) {
    setTimeout(function () {
      var targetWidth = bar.dataset.width;
      bar.style.width = '0%';
      setTimeout(function () {
        bar.style.width = targetWidth;
      }, 50);
    }, index * 150);
  });
}

// Enhance accessibility
function enhanceAccessibility() {
  // Add ARIA labels to metric bars
  var metricBars = document.querySelectorAll('.metric-fill');
  metricBars.forEach(function (bar) {
    var metricItem = bar.closest('.metric-item');
    if (metricItem) {
      var _metricItem$querySele, _metricItem$querySele2;
      var label = ((_metricItem$querySele = metricItem.querySelector('.metric-name')) === null || _metricItem$querySele === void 0 ? void 0 : _metricItem$querySele.textContent) || '';
      var value = ((_metricItem$querySele2 = metricItem.querySelector('.metric-value')) === null || _metricItem$querySele2 === void 0 ? void 0 : _metricItem$querySele2.textContent) || '';
      bar.setAttribute('role', 'progressbar');
      bar.setAttribute('aria-label', "".concat(label, ": ").concat(value));
      bar.setAttribute('aria-valuenow', value.replace('%', ''));
      bar.setAttribute('aria-valuemin', '0');
      bar.setAttribute('aria-valuemax', '100');
    }
  });

  // Add role attributes to cards
  var cards = document.querySelectorAll('.similarity-card, .insight-card, .component-card');
  cards.forEach(function (card) {
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
  });

  // Enhance tooltip accessibility
  var tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
  tooltipTriggers.forEach(function (trigger) {
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-label', 'Show technical explanation');
    trigger.setAttribute('tabindex', '0');

    // Add keyboard support
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var tooltipId = this.getAttribute('data-tooltip');
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
  var analysisData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalComparisons: document.querySelectorAll('.similarity-card').length,
      components: ['htmlStructure', 'metaTags', 'frameworks'],
      riskAssessment: {}
    },
    comparisons: []
  };

  // Extract risk assessment data
  var riskLevels = ['critical', 'high', 'moderate', 'low'];
  riskLevels.forEach(function (level) {
    var countElement = document.querySelector("#tech-".concat(level, "-count .risk-number"));
    analysisData.summary.riskAssessment[level] = countElement ? parseInt(countElement.textContent) : 0;
  });

  // Extract comparison data
  var comparisonCards = document.querySelectorAll('.similarity-card');
  comparisonCards.forEach(function (card) {
    var _card$querySelector, _card$querySelector2;
    var title = ((_card$querySelector = card.querySelector('.comparison-title')) === null || _card$querySelector === void 0 ? void 0 : _card$querySelector.textContent) || '';
    var overallScore = ((_card$querySelector2 = card.querySelector('.overall-score .score-number')) === null || _card$querySelector2 === void 0 ? void 0 : _card$querySelector2.textContent) || '';
    var metrics = extractTechnicalMetricsFromCard(card);
    analysisData.comparisons.push({
      comparison: title,
      overallScore: overallScore,
      technicalMetrics: metrics
    });
  });

  // Download as JSON
  var dataStr = JSON.stringify(analysisData, null, 2);
  var dataBlob = new Blob([dataStr], {
    type: 'application/json'
  });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = "technical-analysis-".concat(new Date().toISOString().split('T')[0], ".json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', function () {
      var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log("Technical analysis page load time: ".concat(loadTime, "ms"));
    });
  }
}

// Theme detection and adaptation
function adaptToSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
  }

  // Listen for theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (e.matches) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  });
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function () {
  initializePage();
  trackPerformance();
  adaptToSystemTheme();
});

// Make functions available globally for onclick handlers
window.exportTechnicalAnalysis = exportTechnicalAnalysis;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzcmMvdGVjaG5pY2FsX21hc3Rlcl9zdW1tYXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELGNBQWMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLFNBQVMsY0FBYyxDQUFBLEVBQUc7RUFDdEI7RUFDQSxnQkFBZ0IsQ0FBQyxDQUFDOztFQUVsQjtFQUNBLDBCQUEwQixDQUFDLENBQUM7O0VBRTVCO0VBQ0EsZ0NBQWdDLENBQUMsQ0FBQzs7RUFFbEM7RUFDQSwwQkFBMEIsQ0FBQyxDQUFDOztFQUU1QjtFQUNBLHlCQUF5QixDQUFDLENBQUM7O0VBRTNCO0VBQ0EscUJBQXFCLENBQUMsQ0FBQzs7RUFFdkI7RUFDQSxrQkFBa0IsQ0FBQyxDQUFDOztFQUVwQjtFQUNBLG9CQUFvQixDQUFDLENBQUM7O0VBRXRCO0VBQ0Esb0JBQW9CLENBQUMsQ0FBQztBQUMxQjs7QUFFQTtBQUNBLFNBQVMsZ0JBQWdCLENBQUEsRUFBRztFQUN4QixJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztFQUN2RSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLEVBQUk7SUFDakMsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztJQUN4RCxJQUFJLFNBQVMsRUFBRTtNQUNYLElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztNQUNoQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFO1FBQy9DLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLE1BQU07UUFDYixHQUFHLEVBQUUsU0FBUztRQUNkLElBQUks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ZUFBZTtNQUNyRixPQUFPLENBQUMsR0FBRyx1Q0FBQSxNQUFBLENBQXVDLFFBQVEsT0FBSSxDQUFDO0lBQ25FLENBQUMsQ0FBQztFQUNOO0FBQ0o7O0FBRUE7QUFDQSxTQUFTLGtCQUFrQixDQUFBLEVBQUc7RUFDMUIsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQyxPQUFPLEVBQUU7SUFDaEYsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztFQUM3Qzs7RUFFQTtFQUNBLE1BQU0sQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBQSxDQUFDLEVBQUk7SUFDOUUsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO01BQ1gsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztJQUM3QyxDQUFDLE1BQU07TUFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ2hEO0VBQ0osQ0FBQyxDQUFDO0FBQ047O0FBRUE7QUFDQSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUNyRCxjQUFjLENBQUMsQ0FBQztFQUNoQixnQkFBZ0IsQ0FBQyxDQUFDO0VBQ2xCLGtCQUFrQixDQUFDLENBQUM7QUFDeEIsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsTUFBTSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFRlY2huaWNhbCBNYXN0ZXIgU3VtbWFyeSBKYXZhU2NyaXB0XG5cbi8vIEluaXRpYWxpemUgcGFnZSB3aGVuIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBpbml0aWFsaXplUGFnZSgpO1xufSk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQYWdlKCkge1xuICAgIC8vIEZvcm1hdCB0aW1lc3RhbXBzXG4gICAgZm9ybWF0VGltZXN0YW1wcygpO1xuICAgIFxuICAgIC8vIENhbGN1bGF0ZSBjb21wb25lbnQgYXZlcmFnZXNcbiAgICBjYWxjdWxhdGVDb21wb25lbnRBdmVyYWdlcygpO1xuICAgIFxuICAgIC8vIENhbGN1bGF0ZSByaXNrIGFzc2Vzc21lbnRzXG4gICAgY2FsY3VsYXRlVGVjaG5pY2FsUmlza0Fzc2Vzc21lbnQoKTtcbiAgICBcbiAgICAvLyBDYWxjdWxhdGUgY29tcG9uZW50IGFuYWx5c2lzXG4gICAgY2FsY3VsYXRlQ29tcG9uZW50QW5hbHlzaXMoKTtcbiAgICBcbiAgICAvLyBHZW5lcmF0ZSB0ZWNobmljYWwgaW5zaWdodHNcbiAgICBnZW5lcmF0ZVRlY2huaWNhbEluc2lnaHRzKCk7XG4gICAgXG4gICAgLy8gRm9ybWF0IGNvbXBhcmlzb24gbmFtZXNcbiAgICBmb3JtYXRDb21wYXJpc29uTmFtZXMoKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIHRvb2x0aXBzXG4gICAgaW5pdGlhbGl6ZVRvb2x0aXBzKCk7XG4gICAgXG4gICAgLy8gQWRkIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXNcbiAgICBlbmhhbmNlQWNjZXNzaWJpbGl0eSgpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgYW5pbWF0aW9uc1xuICAgIGluaXRpYWxpemVBbmltYXRpb25zKCk7XG59XG5cbi8vIEZvcm1hdCB0aW1lc3RhbXBzIHRvIHJlYWRhYmxlIGRhdGVzXG5mdW5jdGlvbiBmb3JtYXRUaW1lc3RhbXBzKCkge1xuICAgIGNvbnN0IHRpbWVzdGFtcEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGltZXN0YW1wXScpO1xuICAgIHRpbWVzdGFtcEVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRpbWVzdGFtcCcpO1xuICAgICAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgICAgICAgICAgbWludXRlOiAnMi1kaWdpdCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBDYWxjdWxhdGUgYXZlcmFnZSBzY29yZXMgZm9yIGVhY2ggdGVjaG5pY2FsIGNvbXBvbmVudFxuZnVuY3Rpb24gY2FsY3VsYXRlQ29tcG9uZW50QXZlcmFnZXMoKSB7XG4gICAgY29uc3QgY29tcG9uZW50RGF0YSA9IHtcbiAgICAgICAgaHRtbFN0cnVjdHVyZTogW10sXG4gICAgICAgIG1ldGFUYWdzOiBbXSxcbiAgICAgICAgZnJhbWV3b3JrczogW11cbiAgICB9O1xuICAgIFxuICAgIC8vIENvbGxlY3QgYWxsIHNjb3JlcyBmb3IgZWFjaCBjb21wb25lbnRcbiAgICBjb25zdCBzaW1pbGFyaXR5Q2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2ltaWxhcml0eS1jYXJkJyk7XG4gICAgc2ltaWxhcml0eUNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgIGNvbnN0IG1ldHJpY3MgPSBleHRyYWN0VGVjaG5pY2FsTWV0cmljc0Zyb21DYXJkKGNhcmQpO1xuICAgICAgICBpZiAobWV0cmljcykge1xuICAgICAgICAgICAgY29tcG9uZW50RGF0YS5odG1sU3RydWN0dXJlLnB1c2gobWV0cmljcy5odG1sU3RydWN0dXJlKTtcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGEubWV0YVRhZ3MucHVzaChtZXRyaWNzLm1ldGFUYWdzKTtcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGEuZnJhbWV3b3Jrcy5wdXNoKG1ldHJpY3MuZnJhbWV3b3Jrcyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBDYWxjdWxhdGUgYW5kIGRpc3BsYXkgYXZlcmFnZXNcbiAgICBPYmplY3Qua2V5cyhjb21wb25lbnREYXRhKS5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3JlcyA9IGNvbXBvbmVudERhdGFbY29tcG9uZW50XTtcbiAgICAgICAgaWYgKHNjb3Jlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBhdmVyYWdlID0gc2NvcmVzLnJlZHVjZSgoc3VtLCBzY29yZSkgPT4gc3VtICsgc2NvcmUsIDApIC8gc2NvcmVzLmxlbmd0aDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIGhlYWRlciBvdmVydmlldyBtZXRyaWNzXG4gICAgICAgICAgICBjb25zdCBvdmVydmlld0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChnZXRPdmVydmlld0VsZW1lbnRJZChjb21wb25lbnQpKTtcbiAgICAgICAgICAgIGlmIChvdmVydmlld0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBvdmVydmlld0VsZW1lbnQudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKGF2ZXJhZ2UgKiAxMDApICsgJyUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBVcGRhdGUgY29tcG9uZW50IGNhcmRzXG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2V0Q29tcG9uZW50RWxlbWVudElkKGNvbXBvbmVudCkpO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRFbGVtZW50LnRleHRDb250ZW50ID0gTWF0aC5yb3VuZChhdmVyYWdlICogMTAwKSArICclJztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBBZGQgY29sb3IgY29kaW5nIGJhc2VkIG9uIHNpbWlsYXJpdHkgbGV2ZWxcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvckNsYXNzID0gZ2V0U2ltaWxhcml0eUNsYXNzKGF2ZXJhZ2UpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudEVsZW1lbnQuY2xhc3NOYW1lID0gYGNvbXBvbmVudC1hdmcgJHtjb2xvckNsYXNzfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gRXh0cmFjdCB0ZWNobmljYWwgbWV0cmljcyBmcm9tIGEgc2ltaWxhcml0eSBjYXJkXG5mdW5jdGlvbiBleHRyYWN0VGVjaG5pY2FsTWV0cmljc0Zyb21DYXJkKGNhcmQpIHtcbiAgICBjb25zdCBtZXRyaWNWYWx1ZXMgPSBjYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXRyaWMtdmFsdWUnKTtcbiAgICBpZiAobWV0cmljVmFsdWVzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBodG1sU3RydWN0dXJlOiBwYXJzZUZsb2F0KG1ldHJpY1ZhbHVlc1swXS50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMCxcbiAgICAgICAgICAgIG1ldGFUYWdzOiBwYXJzZUZsb2F0KG1ldHJpY1ZhbHVlc1sxXS50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMCxcbiAgICAgICAgICAgIGZyYW1ld29ya3M6IHBhcnNlRmxvYXQobWV0cmljVmFsdWVzWzJdLnRleHRDb250ZW50LnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG4vLyBHZXQgb3ZlcnZpZXcgZWxlbWVudCBJRCBmb3IgY29tcG9uZW50XG5mdW5jdGlvbiBnZXRPdmVydmlld0VsZW1lbnRJZChjb21wb25lbnQpIHtcbiAgICBjb25zdCBtYXBwaW5nID0ge1xuICAgICAgICAnaHRtbFN0cnVjdHVyZSc6ICdodG1sLWF2ZycsXG4gICAgICAgICdtZXRhVGFncyc6ICdtZXRhLWF2ZycsXG4gICAgICAgICdmcmFtZXdvcmtzJzogJ2ZyYW1ld29ya3MtYXZnJ1xuICAgIH07XG4gICAgcmV0dXJuIG1hcHBpbmdbY29tcG9uZW50XTtcbn1cblxuLy8gR2V0IGNvbXBvbmVudCBlbGVtZW50IElEXG5mdW5jdGlvbiBnZXRDb21wb25lbnRFbGVtZW50SWQoY29tcG9uZW50KSB7XG4gICAgY29uc3QgbWFwcGluZyA9IHtcbiAgICAgICAgJ2h0bWxTdHJ1Y3R1cmUnOiAnaHRtbC1zdHJ1Y3R1cmUtYXZnJyxcbiAgICAgICAgJ21ldGFUYWdzJzogJ21ldGEtdGFncy1hdmcnLFxuICAgICAgICAnZnJhbWV3b3Jrcyc6ICdmcmFtZXdvcmtzLWF2Zy1kaXNwbGF5J1xuICAgIH07XG4gICAgcmV0dXJuIG1hcHBpbmdbY29tcG9uZW50XTtcbn1cblxuLy8gQ2FsY3VsYXRlIHRlY2huaWNhbCByaXNrIGFzc2Vzc21lbnQgY291bnRzXG5mdW5jdGlvbiBjYWxjdWxhdGVUZWNobmljYWxSaXNrQXNzZXNzbWVudCgpIHtcbiAgICBjb25zdCByaXNrQ291bnRzID0ge1xuICAgICAgICBjcml0aWNhbDogMCwgIC8vIDc1JSsgc2ltaWxhcml0eVxuICAgICAgICBoaWdoOiAwLCAgICAgIC8vIDUwLTc1JSBzaW1pbGFyaXR5ICBcbiAgICAgICAgbW9kZXJhdGU6IDAsICAvLyAyNS01MCUgc2ltaWxhcml0eVxuICAgICAgICBsb3c6IDAgICAgICAgIC8vIDAtMjUlIHNpbWlsYXJpdHlcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IG92ZXJhbGxTY29yZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3ZlcmFsbC1zY29yZSAuc2NvcmUtbnVtYmVyJyk7XG4gICAgb3ZlcmFsbFNjb3Jlcy5mb3JFYWNoKHNjb3JlRWxlbWVudCA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gcGFyc2VGbG9hdChzY29yZUVsZW1lbnQudGV4dENvbnRlbnQucmVwbGFjZSgnJScsICcnKSkgLyAxMDA7XG4gICAgICAgIFxuICAgICAgICBpZiAoc2NvcmUgPj0gMC43NSkge1xuICAgICAgICAgICAgcmlza0NvdW50cy5jcml0aWNhbCsrO1xuICAgICAgICB9IGVsc2UgaWYgKHNjb3JlID49IDAuNSkge1xuICAgICAgICAgICAgcmlza0NvdW50cy5oaWdoKys7XG4gICAgICAgIH0gZWxzZSBpZiAoc2NvcmUgPj0gMC4yNSkge1xuICAgICAgICAgICAgcmlza0NvdW50cy5tb2RlcmF0ZSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmlza0NvdW50cy5sb3crKztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIFVwZGF0ZSByaXNrIGNvdW50IGRpc3BsYXlzXG4gICAgT2JqZWN0LmtleXMocmlza0NvdW50cykuZm9yRWFjaChyaXNrID0+IHtcbiAgICAgICAgY29uc3QgY291bnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3RlY2gtJHtyaXNrfS1jb3VudCAucmlzay1udW1iZXJgKTtcbiAgICAgICAgaWYgKGNvdW50RWxlbWVudCkge1xuICAgICAgICAgICAgY291bnRFbGVtZW50LnRleHRDb250ZW50ID0gcmlza0NvdW50c1tyaXNrXTtcbiAgICAgICAgICAgIGNvdW50RWxlbWVudC5jbGFzc05hbWUgPSBgcmlzay1udW1iZXIgJHtyaXNrfWA7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gQ2FsY3VsYXRlIGNvbXBvbmVudCBhbmFseXNpcyBtZXRyaWNzXG5mdW5jdGlvbiBjYWxjdWxhdGVDb21wb25lbnRBbmFseXNpcygpIHtcbiAgICBjb25zdCBjb21wb25lbnRzID0gWydodG1sU3RydWN0dXJlJywgJ21ldGFUYWdzJywgJ2ZyYW1ld29ya3MnXTtcbiAgICBjb25zdCBjb21wb25lbnRBdmVyYWdlcyA9IHt9O1xuICAgIFxuICAgIC8vIEdldCBhdmVyYWdlIHNjb3JlcyBmb3IgZWFjaCBjb21wb25lbnRcbiAgICBjb21wb25lbnRzLmZvckVhY2goY29tcG9uZW50ID0+IHtcbiAgICAgICAgY29uc3QgYXZnRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGdldENvbXBvbmVudEVsZW1lbnRJZChjb21wb25lbnQpKTtcbiAgICAgICAgaWYgKGF2Z0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gcGFyc2VGbG9hdChhdmdFbGVtZW50LnRleHRDb250ZW50LnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwO1xuICAgICAgICAgICAgY29tcG9uZW50QXZlcmFnZXNbY29tcG9uZW50XSA9IHNjb3JlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gRmluZCBtb3N0IGFuZCBsZWFzdCBzaW1pbGFyIGNvbXBvbmVudHNcbiAgICBsZXQgbW9zdFNpbWlsYXIgPSAnJztcbiAgICBsZXQgbGVhc3RTaW1pbGFyID0gJyc7XG4gICAgbGV0IGhpZ2hlc3RTY29yZSA9IC0xO1xuICAgIGxldCBsb3dlc3RTY29yZSA9IDI7XG4gICAgbGV0IGhpZ2hlc3RWYXJpYW5jZSA9ICcnO1xuICAgIFxuICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudEF2ZXJhZ2VzKS5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gY29tcG9uZW50QXZlcmFnZXNbY29tcG9uZW50XTtcbiAgICAgICAgaWYgKHNjb3JlID4gaGlnaGVzdFNjb3JlKSB7XG4gICAgICAgICAgICBoaWdoZXN0U2NvcmUgPSBzY29yZTtcbiAgICAgICAgICAgIG1vc3RTaW1pbGFyID0gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29yZSA8IGxvd2VzdFNjb3JlKSB7XG4gICAgICAgICAgICBsb3dlc3RTY29yZSA9IHNjb3JlO1xuICAgICAgICAgICAgbGVhc3RTaW1pbGFyID0gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gQ2FsY3VsYXRlIHZhcmlhbmNlIChzaW1wbGlmaWVkIC0gY29tcG9uZW50IHdpdGggbWlkZGxlIHNjb3JlIGhhcyBtb3N0IHZhcmlhbmNlKVxuICAgIGNvbnN0IHNvcnRlZENvbXBvbmVudHMgPSBPYmplY3Qua2V5cyhjb21wb25lbnRBdmVyYWdlcykuc29ydCgoYSwgYikgPT4gXG4gICAgICAgIGNvbXBvbmVudEF2ZXJhZ2VzW2JdIC0gY29tcG9uZW50QXZlcmFnZXNbYV1cbiAgICApO1xuICAgIGhpZ2hlc3RWYXJpYW5jZSA9IHNvcnRlZENvbXBvbmVudHNbMV0gfHwgc29ydGVkQ29tcG9uZW50c1swXTtcbiAgICBcbiAgICAvLyBVcGRhdGUgY29tcG9uZW50IGFuYWx5c2lzIGRpc3BsYXlzXG4gICAgY29uc3QgbW9zdFNpbWlsYXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vc3Qtc2ltaWxhci1jb21wb25lbnQnKTtcbiAgICBjb25zdCBsZWFzdFNpbWlsYXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYXN0LXNpbWlsYXItY29tcG9uZW50Jyk7XG4gICAgY29uc3QgaGlnaGVzdFZhcmlhbmNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWdoZXN0LXZhcmlhbmNlJyk7XG4gICAgXG4gICAgaWYgKG1vc3RTaW1pbGFyRWxlbWVudCkge1xuICAgICAgICBtb3N0U2ltaWxhckVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXRDb21wb25lbnROYW1lKG1vc3RTaW1pbGFyKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGxlYXN0U2ltaWxhckVsZW1lbnQpIHtcbiAgICAgICAgbGVhc3RTaW1pbGFyRWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdENvbXBvbmVudE5hbWUobGVhc3RTaW1pbGFyKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGhpZ2hlc3RWYXJpYW5jZUVsZW1lbnQpIHtcbiAgICAgICAgaGlnaGVzdFZhcmlhbmNlRWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdENvbXBvbmVudE5hbWUoaGlnaGVzdFZhcmlhbmNlKTtcbiAgICB9XG59XG5cbi8vIEdlbmVyYXRlIHRlY2huaWNhbCBpbnNpZ2h0cyBiYXNlZCBvbiBkYXRhXG5mdW5jdGlvbiBnZW5lcmF0ZVRlY2huaWNhbEluc2lnaHRzKCkge1xuICAgIGNvbnN0IGh0bWxBdmcgPSBnZXRDb21wb25lbnRBdmVyYWdlKCdodG1sU3RydWN0dXJlJyk7XG4gICAgY29uc3QgbWV0YUF2ZyA9IGdldENvbXBvbmVudEF2ZXJhZ2UoJ21ldGFUYWdzJyk7XG4gICAgY29uc3QgZnJhbWV3b3Jrc0F2ZyA9IGdldENvbXBvbmVudEF2ZXJhZ2UoJ2ZyYW1ld29ya3MnKTtcbiAgICBcbiAgICAvLyBVcGRhdGUgcGF0dGVybiBpbnNpZ2h0c1xuICAgIGNvbnN0IGh0bWxQYXR0ZXJuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodG1sLXBhdHRlcm4nKTtcbiAgICBjb25zdCBmcmFtZXdvcmtQYXR0ZXJuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcmFtZXdvcmstcGF0dGVybicpO1xuICAgIGNvbnN0IG1ldGFQYXR0ZXJuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXRhLXBhdHRlcm4nKTtcbiAgICBcbiAgICBpZiAoaHRtbFBhdHRlcm5FbGVtZW50KSB7XG4gICAgICAgIGlmIChodG1sQXZnID4gMC44KSB7XG4gICAgICAgICAgICBodG1sUGF0dGVybkVsZW1lbnQudGV4dENvbnRlbnQgPSAnRXh0cmVtZWx5IGhpZ2ggSFRNTCBzdHJ1Y3R1cmUgc2ltaWxhcml0eSBzdWdnZXN0cyB3aWRlc3ByZWFkIHRlbXBsYXRlIHJldXNlJztcbiAgICAgICAgfSBlbHNlIGlmIChodG1sQXZnID4gMC42KSB7XG4gICAgICAgICAgICBodG1sUGF0dGVybkVsZW1lbnQudGV4dENvbnRlbnQgPSAnSGlnaCBIVE1MIHN0cnVjdHVyZSBzaW1pbGFyaXR5IHN1Z2dlc3RzIHRlbXBsYXRlIHJldXNlIG9yIGNvcHlpbmcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaHRtbFBhdHRlcm5FbGVtZW50LnRleHRDb250ZW50ID0gJ0hUTUwgc3RydWN0dXJlcyBzaG93IGdvb2QgZGl2ZXJzaXR5IGFjcm9zcyBzaXRlcyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaWYgKGZyYW1ld29ya1BhdHRlcm5FbGVtZW50KSB7XG4gICAgICAgIGlmIChmcmFtZXdvcmtzQXZnID4gMC44KSB7XG4gICAgICAgICAgICBmcmFtZXdvcmtQYXR0ZXJuRWxlbWVudC50ZXh0Q29udGVudCA9ICdJZGVudGljYWwgZnJhbWV3b3JrcyBkZXRlY3RlZCAtIHBvc3NpYmxlIHNoYXJlZCBkZXZlbG9wbWVudCBvciBjb3B5aW5nJztcbiAgICAgICAgfSBlbHNlIGlmIChmcmFtZXdvcmtzQXZnID4gMC41KSB7XG4gICAgICAgICAgICBmcmFtZXdvcmtQYXR0ZXJuRWxlbWVudC50ZXh0Q29udGVudCA9ICdDb21tb24gZnJhbWV3b3JrcyBpbmRpY2F0ZSBzaW1pbGFyIGRldmVsb3BtZW50IHByYWN0aWNlcyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcmFtZXdvcmtQYXR0ZXJuRWxlbWVudC50ZXh0Q29udGVudCA9ICdEaXZlcnNlIGZyYW1ld29yayB1c2FnZSBzaG93cyBpbmRlcGVuZGVudCBkZXZlbG9wbWVudCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaWYgKG1ldGFQYXR0ZXJuRWxlbWVudCkge1xuICAgICAgICBpZiAobWV0YUF2ZyA+IDAuNykge1xuICAgICAgICAgICAgbWV0YVBhdHRlcm5FbGVtZW50LnRleHRDb250ZW50ID0gJ0hpZ2ggbWV0YSB0YWcgc2ltaWxhcml0eSBtYXkgaW5kaWNhdGUgU0VPIHN0cmF0ZWd5IGNvcHlpbmcnO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGFBdmcgPiAwLjQpIHtcbiAgICAgICAgICAgIG1ldGFQYXR0ZXJuRWxlbWVudC50ZXh0Q29udGVudCA9ICdNZXRhIHRhZyB2YXJpYXRpb25zIHNob3cgZGlmZmVyZW50IFNFTyBzdHJhdGVnaWVzJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1ldGFQYXR0ZXJuRWxlbWVudC50ZXh0Q29udGVudCA9ICdNZXRhIHRhZ3Mgc2hvdyBnb29kIHVuaXF1ZW5lc3MgYWNyb3NzIHNpdGVzJztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gR2V0IGNvbXBvbmVudCBhdmVyYWdlIGZyb20gZGlzcGxheWVkIHZhbHVlXG5mdW5jdGlvbiBnZXRDb21wb25lbnRBdmVyYWdlKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChnZXRDb21wb25lbnRFbGVtZW50SWQoY29tcG9uZW50KSk7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoZWxlbWVudC50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMDtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG5cbi8vIEZvcm1hdCBjb21wYXJpc29uIG5hbWVzIGZyb20gdGVjaG5pY2FsIGZvcm1hdFxuZnVuY3Rpb24gZm9ybWF0Q29tcGFyaXNvbk5hbWVzKCkge1xuICAgIGNvbnN0IGNvbXBhcmlzb25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbXBhcmlzb25dJyk7XG4gICAgY29tcGFyaXNvbkVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBhcmlzb24gPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1jb21wYXJpc29uJyk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IGZvcm1hdENvbXBhcmlzb25OYW1lKGNvbXBhcmlzb24pO1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0dGVkO1xuICAgIH0pO1xufVxuXG4vLyBGb3JtYXQgY29tcGFyaXNvbiBzdHJpbmcgdG8gcmVhZGFibGUgZm9ybWF0XG5mdW5jdGlvbiBmb3JtYXRDb21wYXJpc29uTmFtZShjb21wYXJpc29uKSB7XG4gICAgaWYgKCFjb21wYXJpc29uKSByZXR1cm4gJyc7XG4gICAgXG4gICAgLy8gU3BsaXQgYnkgX3ZzXyBhbmQgZm9ybWF0IGVhY2ggc2l0ZSBuYW1lXG4gICAgY29uc3QgcGFydHMgPSBjb21wYXJpc29uLnNwbGl0KCdfdnNfJyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCBzaXRlMSA9IGZvcm1hdFNpdGVOYW1lKHBhcnRzWzBdKTtcbiAgICAgICAgY29uc3Qgc2l0ZTIgPSBmb3JtYXRTaXRlTmFtZShwYXJ0c1sxXSk7XG4gICAgICAgIHJldHVybiBgJHtzaXRlMX0gdnMgJHtzaXRlMn1gO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gY29tcGFyaXNvbjtcbn1cblxuLy8gRm9ybWF0IHRlY2huaWNhbCBzaXRlIG5hbWUgdG8gcmVhZGFibGUgZm9ybWF0XG5mdW5jdGlvbiBmb3JtYXRTaXRlTmFtZSh0ZWNobmljYWxOYW1lKSB7XG4gICAgaWYgKCF0ZWNobmljYWxOYW1lKSByZXR1cm4gJyc7XG4gICAgXG4gICAgLy8gUmVtb3ZlIHRpbWVzdGFtcCBhbmQgY29udmVydCB0byByZWFkYWJsZSBmb3JtYXRcbiAgICBjb25zdCBzaXRlTmFtZSA9IHRlY2huaWNhbE5hbWUuc3BsaXQoJ18nKVswXTtcbiAgICBcbiAgICAvLyBDb252ZXJ0IHRvIHRpdGxlIGNhc2UgYW5kIGhhbmRsZSBjb21tb24gc2l0ZSBuYW1lc1xuICAgIGNvbnN0IHNpdGVNYXAgPSB7XG4gICAgICAgICdpbnN0YW50Y2hlY2ttYXRlJzogJ0luc3RhbnRDaGVja21hdGUnLFxuICAgICAgICAndHJ1dGhmaW5kZXInOiAnVHJ1dGhGaW5kZXInLFxuICAgICAgICAnaW50ZWxpdXMnOiAnSW50ZWxpdXMnLFxuICAgICAgICAnd2hpdGVwYWdlcyc6ICdXaGl0ZVBhZ2VzJyxcbiAgICAgICAgJ2JlZW52ZXJpZmllZCc6ICdCZWVuVmVyaWZpZWQnLFxuICAgICAgICAndHJ1ZXBlb3BsZXNlYXJjaCc6ICdUcnVlUGVvcGxlU2VhcmNoJ1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIHNpdGVNYXBbc2l0ZU5hbWUudG9Mb3dlckNhc2UoKV0gfHwgXG4gICAgICAgICAgIHNpdGVOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc2l0ZU5hbWUuc2xpY2UoMSk7XG59XG5cbi8vIEZvcm1hdCBjb21wb25lbnQgbmFtZXMgZm9yIGRpc3BsYXlcbmZ1bmN0aW9uIGZvcm1hdENvbXBvbmVudE5hbWUoY29tcG9uZW50KSB7XG4gICAgY29uc3QgY29tcG9uZW50TmFtZXMgPSB7XG4gICAgICAgICdodG1sU3RydWN0dXJlJzogJ0hUTUwgU3RydWN0dXJlJyxcbiAgICAgICAgJ21ldGFUYWdzJzogJ01ldGEgVGFncycsXG4gICAgICAgICdmcmFtZXdvcmtzJzogJ0ZyYW1ld29ya3MnXG4gICAgfTtcbiAgICByZXR1cm4gY29tcG9uZW50TmFtZXNbY29tcG9uZW50XSB8fCBjb21wb25lbnQ7XG59XG5cbi8vIEdldCBzaW1pbGFyaXR5IGNsYXNzIGJhc2VkIG9uIHNjb3JlXG5mdW5jdGlvbiBnZXRTaW1pbGFyaXR5Q2xhc3Moc2NvcmUpIHtcbiAgICBpZiAoc2NvcmUgPj0gMC43NSkgcmV0dXJuICdlcnJvcic7ICAgICAgLy8gSGlnaCBzaW1pbGFyaXR5ID0gYmFkXG4gICAgaWYgKHNjb3JlID49IDAuNSkgcmV0dXJuICd3YXJuaW5nJzsgICAgIC8vIE1vZGVyYXRlIHNpbWlsYXJpdHkgPSB3YXJuaW5nXG4gICAgaWYgKHNjb3JlID49IDAuMjUpIHJldHVybiAnZ29vZCc7ICAgICAgIC8vIExvdyBzaW1pbGFyaXR5ID0gZ29vZFxuICAgIHJldHVybiAnZXhjZWxsZW50JzsgICAgICAgICAgICAgICAgICAgICAvLyBWZXJ5IGxvdyBzaW1pbGFyaXR5ID0gZXhjZWxsZW50XG59XG5cbi8vIEluaXRpYWxpemUgdG9vbHRpcCBzeXN0ZW1cbmZ1bmN0aW9uIGluaXRpYWxpemVUb29sdGlwcygpIHtcbiAgICBjb25zdCB0b29sdGlwVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vbHRpcC10cmlnZ2VyJyk7XG4gICAgXG4gICAgdG9vbHRpcFRyaWdnZXJzLmZvckVhY2godHJpZ2dlciA9PiB7XG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvb2x0aXBJZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcbiAgICAgICAgICAgIHNob3dUb29sdGlwKHRvb2x0aXBJZCwgZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBoaWRlQWxsVG9vbHRpcHMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvb2x0aXBJZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcbiAgICAgICAgICAgIHVwZGF0ZVRvb2x0aXBQb3NpdGlvbih0b29sdGlwSWQsIGUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBIaWRlIHRvb2x0aXBzIHdoZW4gY2xpY2tpbmcgZWxzZXdoZXJlXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlQWxsVG9vbHRpcHMpO1xufVxuXG4vLyBTaG93IHRvb2x0aXBcbmZ1bmN0aW9uIHNob3dUb29sdGlwKHRvb2x0aXBJZCwgZXZlbnQpIHtcbiAgICBoaWRlQWxsVG9vbHRpcHMoKTtcbiAgICBcbiAgICBjb25zdCB0b29sdGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRvb2x0aXAtJHt0b29sdGlwSWR9YCk7XG4gICAgaWYgKHRvb2x0aXApIHtcbiAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG4gICAgICAgIHVwZGF0ZVRvb2x0aXBQb3NpdGlvbih0b29sdGlwSWQsIGV2ZW50KTtcbiAgICB9XG59XG5cbi8vIFVwZGF0ZSB0b29sdGlwIHBvc2l0aW9uXG5mdW5jdGlvbiB1cGRhdGVUb29sdGlwUG9zaXRpb24odG9vbHRpcElkLCBldmVudCkge1xuICAgIGNvbnN0IHRvb2x0aXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdG9vbHRpcC0ke3Rvb2x0aXBJZH1gKTtcbiAgICBpZiAodG9vbHRpcCAmJiB0b29sdGlwLmNsYXNzTGlzdC5jb250YWlucygndmlzaWJsZScpKSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0b29sdGlwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3Qgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYICsgc2Nyb2xsTGVmdCAtIHJlY3Qud2lkdGggLyAyO1xuICAgICAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSArIHNjcm9sbFRvcCAtIHJlY3QuaGVpZ2h0IC0gMjA7XG4gICAgICAgIFxuICAgICAgICB0b29sdGlwLnN0eWxlLmxlZnQgPSBNYXRoLm1heCgxMCwgTWF0aC5taW4oeCwgd2luZG93LmlubmVyV2lkdGggKyBzY3JvbGxMZWZ0IC0gcmVjdC53aWR0aCAtIDEwKSkgKyAncHgnO1xuICAgICAgICB0b29sdGlwLnN0eWxlLnRvcCA9IE1hdGgubWF4KHNjcm9sbFRvcCArIDEwLCB5KSArICdweCc7XG4gICAgfVxufVxuXG4vLyBIaWRlIGFsbCB0b29sdGlwc1xuZnVuY3Rpb24gaGlkZUFsbFRvb2x0aXBzKCkge1xuICAgIGNvbnN0IHRvb2x0aXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2x0aXAnKTtcbiAgICB0b29sdGlwcy5mb3JFYWNoKHRvb2x0aXAgPT4ge1xuICAgICAgICB0b29sdGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBzY3JvbGwtdHJpZ2dlcmVkIGFuaW1hdGlvbnNcbmZ1bmN0aW9uIGluaXRpYWxpemVBbmltYXRpb25zKCkge1xuICAgIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcbiAgICAgICAgdGhyZXNob2xkOiAwLjEsXG4gICAgICAgIHJvb3RNYXJnaW46ICcwcHggMHB4IC01MHB4IDBweCdcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1pbicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgbWV0cmljIGJhciBhbmltYXRpb25zXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NpbWlsYXJpdHktY2FyZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVNZXRyaWNCYXJzKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCBvYnNlcnZlck9wdGlvbnMpO1xuICAgIFxuICAgIC8vIE9ic2VydmUgYWxsIGFuaW1hdGFibGUgZWxlbWVudHNcbiAgICBjb25zdCBhbmltYXRhYmxlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAnLnNpbWlsYXJpdHktY2FyZCwgLmluc2lnaHQtY2FyZCwgLmNvbXBvbmVudC1jYXJkJ1xuICAgICk7XG4gICAgYW5pbWF0YWJsZUVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpKTtcbn1cblxuLy8gQW5pbWF0ZSBtZXRyaWMgYmFycyBpbiBzaW1pbGFyaXR5IGNhcmRzXG5mdW5jdGlvbiBhbmltYXRlTWV0cmljQmFycyhjYXJkKSB7XG4gICAgY29uc3QgbWV0cmljQmFycyA9IGNhcmQucXVlcnlTZWxlY3RvckFsbCgnLm1ldHJpYy1maWxsJyk7XG4gICAgbWV0cmljQmFycy5mb3JFYWNoKChiYXIsIGluZGV4KSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0V2lkdGggPSBiYXIuZGF0YXNldC53aWR0aDtcbiAgICAgICAgICAgIGJhci5zdHlsZS53aWR0aCA9ICcwJSc7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBiYXIuc3R5bGUud2lkdGggPSB0YXJnZXRXaWR0aDtcbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSwgaW5kZXggKiAxNTApO1xuICAgIH0pO1xufVxuXG4vLyBFbmhhbmNlIGFjY2Vzc2liaWxpdHlcbmZ1bmN0aW9uIGVuaGFuY2VBY2Nlc3NpYmlsaXR5KCkge1xuICAgIC8vIEFkZCBBUklBIGxhYmVscyB0byBtZXRyaWMgYmFyc1xuICAgIGNvbnN0IG1ldHJpY0JhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljLWZpbGwnKTtcbiAgICBtZXRyaWNCYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgY29uc3QgbWV0cmljSXRlbSA9IGJhci5jbG9zZXN0KCcubWV0cmljLWl0ZW0nKTtcbiAgICAgICAgaWYgKG1ldHJpY0l0ZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gbWV0cmljSXRlbS5xdWVyeVNlbGVjdG9yKCcubWV0cmljLW5hbWUnKT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG1ldHJpY0l0ZW0ucXVlcnlTZWxlY3RvcignLm1ldHJpYy12YWx1ZScpPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgncm9sZScsICdwcm9ncmVzc2JhcicpO1xuICAgICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGAke2xhYmVsfTogJHt2YWx1ZX1gKTtcbiAgICAgICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLCB2YWx1ZS5yZXBsYWNlKCclJywgJycpKTtcbiAgICAgICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtaW4nLCAnMCcpO1xuICAgICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1heCcsICcxMDAnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIEFkZCByb2xlIGF0dHJpYnV0ZXMgdG8gY2FyZHNcbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaW1pbGFyaXR5LWNhcmQsIC5pbnNpZ2h0LWNhcmQsIC5jb21wb25lbnQtY2FyZCcpO1xuICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgIGNhcmQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FydGljbGUnKTtcbiAgICAgICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBFbmhhbmNlIHRvb2x0aXAgYWNjZXNzaWJpbGl0eVxuICAgIGNvbnN0IHRvb2x0aXBUcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29sdGlwLXRyaWdnZXInKTtcbiAgICB0b29sdGlwVHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHtcbiAgICAgICAgdHJpZ2dlci5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIHRyaWdnZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1Nob3cgdGVjaG5pY2FsIGV4cGxhbmF0aW9uJyk7XG4gICAgICAgIHRyaWdnZXIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQga2V5Ym9hcmQgc3VwcG9ydFxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgfHwgZS5rZXkgPT09ICcgJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b29sdGlwSWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJyk7XG4gICAgICAgICAgICAgICAgc2hvd1Rvb2x0aXAodG9vbHRpcElkLCB7IFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRYOiB0aGlzLm9mZnNldExlZnQgKyB0aGlzLm9mZnNldFdpZHRoIC8gMiwgXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFk6IHRoaXMub2Zmc2V0VG9wIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gRXhwb3J0IGZ1bmN0aW9uYWxpdHkgZm9yIHRlY2huaWNhbCBhbmFseXNpcyBkYXRhXG5mdW5jdGlvbiBleHBvcnRUZWNobmljYWxBbmFseXNpcygpIHtcbiAgICBjb25zdCBhbmFseXNpc0RhdGEgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBzdW1tYXJ5OiB7XG4gICAgICAgICAgICB0b3RhbENvbXBhcmlzb25zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2ltaWxhcml0eS1jYXJkJykubGVuZ3RoLFxuICAgICAgICAgICAgY29tcG9uZW50czogWydodG1sU3RydWN0dXJlJywgJ21ldGFUYWdzJywgJ2ZyYW1ld29ya3MnXSxcbiAgICAgICAgICAgIHJpc2tBc3Nlc3NtZW50OiB7fVxuICAgICAgICB9LFxuICAgICAgICBjb21wYXJpc29uczogW11cbiAgICB9O1xuICAgIFxuICAgIC8vIEV4dHJhY3QgcmlzayBhc3Nlc3NtZW50IGRhdGFcbiAgICBjb25zdCByaXNrTGV2ZWxzID0gWydjcml0aWNhbCcsICdoaWdoJywgJ21vZGVyYXRlJywgJ2xvdyddO1xuICAgIHJpc2tMZXZlbHMuZm9yRWFjaChsZXZlbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCN0ZWNoLSR7bGV2ZWx9LWNvdW50IC5yaXNrLW51bWJlcmApO1xuICAgICAgICBhbmFseXNpc0RhdGEuc3VtbWFyeS5yaXNrQXNzZXNzbWVudFtsZXZlbF0gPSBjb3VudEVsZW1lbnQgPyBcbiAgICAgICAgICAgIHBhcnNlSW50KGNvdW50RWxlbWVudC50ZXh0Q29udGVudCkgOiAwO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEV4dHJhY3QgY29tcGFyaXNvbiBkYXRhXG4gICAgY29uc3QgY29tcGFyaXNvbkNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbWlsYXJpdHktY2FyZCcpO1xuICAgIGNvbXBhcmlzb25DYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICBjb25zdCB0aXRsZSA9IGNhcmQucXVlcnlTZWxlY3RvcignLmNvbXBhcmlzb24tdGl0bGUnKT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgIGNvbnN0IG92ZXJhbGxTY29yZSA9IGNhcmQucXVlcnlTZWxlY3RvcignLm92ZXJhbGwtc2NvcmUgLnNjb3JlLW51bWJlcicpPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgY29uc3QgbWV0cmljcyA9IGV4dHJhY3RUZWNobmljYWxNZXRyaWNzRnJvbUNhcmQoY2FyZCk7XG4gICAgICAgIFxuICAgICAgICBhbmFseXNpc0RhdGEuY29tcGFyaXNvbnMucHVzaCh7XG4gICAgICAgICAgICBjb21wYXJpc29uOiB0aXRsZSxcbiAgICAgICAgICAgIG92ZXJhbGxTY29yZSxcbiAgICAgICAgICAgIHRlY2huaWNhbE1ldHJpY3M6IG1ldHJpY3NcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gRG93bmxvYWQgYXMgSlNPTlxuICAgIGNvbnN0IGRhdGFTdHIgPSBKU09OLnN0cmluZ2lmeShhbmFseXNpc0RhdGEsIG51bGwsIDIpO1xuICAgIGNvbnN0IGRhdGFCbG9iID0gbmV3IEJsb2IoW2RhdGFTdHJdLCB7dHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG4gICAgXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGRhdGFCbG9iKTtcbiAgICBsaW5rLmRvd25sb2FkID0gYHRlY2huaWNhbC1hbmFseXNpcy0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS5qc29uYDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xufVxuXG4vLyBQZXJmb3JtYW5jZSBtb25pdG9yaW5nXG5mdW5jdGlvbiB0cmFja1BlcmZvcm1hbmNlKCkge1xuICAgIGlmICgncGVyZm9ybWFuY2UnIGluIHdpbmRvdykge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgbG9hZFRpbWUgPSBwZXJmb3JtYW5jZS50aW1pbmcubG9hZEV2ZW50RW5kIC0gcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUZWNobmljYWwgYW5hbHlzaXMgcGFnZSBsb2FkIHRpbWU6ICR7bG9hZFRpbWV9bXNgKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLyBUaGVtZSBkZXRlY3Rpb24gYW5kIGFkYXB0YXRpb25cbmZ1bmN0aW9uIGFkYXB0VG9TeXN0ZW1UaGVtZSgpIHtcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay10aGVtZScpO1xuICAgIH1cbiAgICBcbiAgICAvLyBMaXN0ZW4gZm9yIHRoZW1lIGNoYW5nZXNcbiAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBpZiAoZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstdGhlbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGFyay10aGVtZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgYWxsIGZ1bmN0aW9uYWxpdHkgd2hlbiBwYWdlIGxvYWRzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaW5pdGlhbGl6ZVBhZ2UoKTtcbiAgICB0cmFja1BlcmZvcm1hbmNlKCk7XG4gICAgYWRhcHRUb1N5c3RlbVRoZW1lKCk7XG59KTtcblxuLy8gTWFrZSBmdW5jdGlvbnMgYXZhaWxhYmxlIGdsb2JhbGx5IGZvciBvbmNsaWNrIGhhbmRsZXJzXG53aW5kb3cuZXhwb3J0VGVjaG5pY2FsQW5hbHlzaXMgPSBleHBvcnRUZWNobmljYWxBbmFseXNpczsiXX0=
