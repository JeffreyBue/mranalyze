(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Visual Master Summary JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
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

// Calculate and display summary statistics
function calculateSummaryStats() {
  // Calculate average score across all comparisons
  var scoreElements = document.querySelectorAll('.score-number');
  var totalScore = 0;
  var count = 0;
  scoreElements.forEach(function (element) {
    var scoreText = element.textContent.replace('%', '');
    var score = parseFloat(scoreText);
    if (!isNaN(score)) {
      totalScore += score;
      count++;
    }
  });
  if (count > 0) {
    var avgScore = Math.round(totalScore / count);
    var avgScoreElement = document.getElementById('average-score');
    if (avgScoreElement) {
      avgScoreElement.textContent = avgScore + '%';
    }
  }

  // Calculate total pages across all comparisons
  var pageElements = document.querySelectorAll('.pages-number');
  var totalPages = 0;
  pageElements.forEach(function (element) {
    var pages = parseInt(element.textContent);
    if (!isNaN(pages)) {
      totalPages += pages;
    }
  });
  var totalPagesElement = document.getElementById('total-pages');
  if (totalPagesElement) {
    totalPagesElement.textContent = totalPages;
  }

  // Analyze performance metrics
  analyzePerformanceMetrics();
}

// Analyze performance metrics to find best/worst
function analyzePerformanceMetrics() {
  var metricCategories = ['layout', 'colors', 'typography', 'responsive', 'design-system', 'hierarchy', 'spacing'];
  var metricSums = {};
  var metricCounts = {};

  // Initialize sums and counts
  metricCategories.forEach(function (category) {
    metricSums[category] = 0;
    metricCounts[category] = 0;
  });

  // Sum up all metric values
  metricCategories.forEach(function (category) {
    var bars = document.querySelectorAll(".bar-fill.".concat(category));
    bars.forEach(function (bar) {
      var value = parseFloat(bar.getAttribute('data-value').replace('%', ''));
      if (!isNaN(value)) {
        metricSums[category] += value;
        metricCounts[category]++;
      }
    });
  });

  // Calculate averages and find best/worst
  var metricAverages = {};
  metricCategories.forEach(function (category) {
    if (metricCounts[category] > 0) {
      metricAverages[category] = metricSums[category] / metricCounts[category];
    }
  });

  // Find best and worst metrics
  var bestMetric = '';
  var worstMetric = '';
  var bestScore = -1;
  var worstScore = 101;
  Object.keys(metricAverages).forEach(function (metric) {
    var score = metricAverages[metric];
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
  var bestMetricElement = document.getElementById('best-metric');
  var worstMetricElement = document.getElementById('worst-metric');
  var consistencyElement = document.getElementById('consistency-level');
  if (bestMetricElement && bestMetric) {
    bestMetricElement.textContent = formatMetricName(bestMetric);
    bestMetricElement.className = 'perf-value best';
  }
  if (worstMetricElement && worstMetric) {
    worstMetricElement.textContent = formatMetricName(worstMetric);
    worstMetricElement.className = 'perf-value needs-work';
  }
  if (consistencyElement) {
    var variance = bestScore - worstScore;
    var consistencyLevel = 'High';
    var className = 'perf-value best';
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
  var metricNames = {
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
    'whitepages': 'WhitePages'
  };
  return siteMap[siteName.toLowerCase()] || siteName.charAt(0).toUpperCase() + siteName.slice(1);
}

// Initialize score circles with animated borders
function initializeScoreCircles() {
  var scoreCircles = document.querySelectorAll('.score-circle[data-score]');
  scoreCircles.forEach(function (circle) {
    var score = parseFloat(circle.getAttribute('data-score'));
    var color = getScoreColor(score);
    circle.style.borderColor = color;

    // Add pulsing animation for very high or very low scores
    if (score > 0.9 || score < 0.3) {
      circle.style.animation = 'pulse 2s infinite';
    }
  });
}

// Get color based on score
function getScoreColor(score) {
  if (score >= 0.9) return '#e74c3c'; // Red - High similarity
  if (score >= 0.8) return '#f39c12'; // Orange - Good similarity
  if (score >= 0.7) return '#f1c40f'; // Yellow - Moderate similarity
  if (score >= 0.6) return '#c9f10f'; // YellowishGreen - Moderate-low similarity
  return '#27ae60'; // Green - Low similarity
}

// Toggle metrics detail visibility
function toggleMetricsDetail(button) {
  var card = button.closest('.comparison-card');
  var metricsDetail = card.querySelector('.metrics-detail');
  var buttonText = button.querySelector('span');
  var buttonIcon = button.querySelector('svg path');
  if (metricsDetail.style.display === 'none' || !metricsDetail.style.display) {
    // Show metrics
    metricsDetail.style.display = 'block';
    buttonText.textContent = 'Hide Metrics';
    buttonIcon.setAttribute('d', 'M7 14L12 9L17 14H7Z'); // Up arrow

    // Animate metric bars
    setTimeout(function () {
      var bars = metricsDetail.querySelectorAll('.bar-fill-small');
      bars.forEach(function (bar, index) {
        setTimeout(function () {
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
  var animatedElements = document.querySelectorAll('.metric-card, .insight-card, .comparison-card');
  animatedElements.forEach(function (element, index) {
    element.style.animationDelay = "".concat((index + 1) * 0.1, "s");
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
    element.textContent = current + (element.textContent.includes('%') ? '%' : '');
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }
  requestAnimationFrame(updateNumber);
}

// Initialize intersection observer for scroll animations
function initializeScrollAnimations() {
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        // Trigger number animations for stat cards
        if (entry.target.classList.contains('stat-card')) {
          var numberElement = entry.target.querySelector('.stat-number');
          if (numberElement && !numberElement.dataset.animated) {
            var finalValue = parseInt(numberElement.textContent.replace(/\D/g, ''));
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
  var observeElements = document.querySelectorAll('.stat-card, .metric-card, .insight-card, .comparison-card');
  observeElements.forEach(function (element) {
    return observer.observe(element);
  });
}

// Enhanced hover effects for metric bars
function enhanceMetricBars() {
  var metricBars = document.querySelectorAll('.metric-bar');
  metricBars.forEach(function (bar) {
    bar.addEventListener('mouseenter', function () {
      var fill = this.querySelector('.bar-fill');
      var value = this.querySelector('.metric-value');
      if (fill && value) {
        fill.style.transform = 'scaleY(1.2)';
        value.style.fontWeight = '900';
        value.style.color = '#2c3e50';
      }
    });
    bar.addEventListener('mouseleave', function () {
      var fill = this.querySelector('.bar-fill');
      var value = this.querySelector('.metric-value');
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
  var metricsDetails = document.querySelectorAll('.metrics-detail');
  metricsDetails.forEach(function (detail) {
    detail.style.display = 'block';
  });

  // Ensure all bars are visible with their full width
  var bars = document.querySelectorAll('.bar-fill, .bar-fill-small');
  bars.forEach(function (bar) {
    bar.style.transition = 'none';
  });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
  // ESC key to close expanded metric details
  if (e.key === 'Escape') {
    var expandedMetrics = document.querySelectorAll('.metrics-detail[style*="block"]');
    expandedMetrics.forEach(function (detail) {
      var card = detail.closest('.comparison-card');
      var button = card.querySelector('.action-btn.secondary');
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
  var metricBars = document.querySelectorAll('.metric-bar');
  metricBars.forEach(function (bar) {
    var label = bar.querySelector('.metric-label').textContent;
    var value = bar.querySelector('.metric-value').textContent;
    var barFill = bar.querySelector('.bar-fill');
    if (barFill) {
      barFill.setAttribute('role', 'progressbar');
      barFill.setAttribute('aria-label', "".concat(label, ": ").concat(value));
      barFill.setAttribute('aria-valuenow', value.replace('%', ''));
      barFill.setAttribute('aria-valuemin', '0');
      barFill.setAttribute('aria-valuemax', '100');
    }
  });

  // Add role attributes to cards
  var cards = document.querySelectorAll('.metric-card, .insight-card, .comparison-card');
  cards.forEach(function (card) {
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
  });

  // Enhance button accessibility
  var buttons = document.querySelectorAll('.action-btn');
  buttons.forEach(function (button) {
    if (!button.getAttribute('aria-label')) {
      var text = button.textContent.trim();
      button.setAttribute('aria-label', text);
    }
  });
}

// Performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', function () {
      var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log("Visual analysis page load time: ".concat(loadTime, "ms"));

      // Track specific metrics
      var metricsLoadTime = performance.now();
      console.log("Metrics processing time: ".concat(metricsLoadTime, "ms"));
    });
  }
}

// Search/filter functionality for comparisons
function initializeSearch() {
  var searchInput = document.getElementById('comparison-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var searchTerm = this.value.toLowerCase();
      var comparisonCards = document.querySelectorAll('.comparison-card');
      comparisonCards.forEach(function (card) {
        var comparisonName = card.querySelector('.comparison-name').textContent.toLowerCase();
        var insights = Array.from(card.querySelectorAll('.insight-text')).map(function (el) {
          return el.textContent.toLowerCase();
        }).join(' ');
        var matches = comparisonName.includes(searchTerm) || insights.includes(searchTerm);
        card.style.display = matches ? 'block' : 'none';
      });
    });
  }
}

// Export functionality for data
function exportAnalysisData() {
  var _document$getElementB, _document$getElementB2;
  var analysisData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalComparisons: document.querySelectorAll('.comparison-card').length,
      averageScore: ((_document$getElementB = document.getElementById('average-score')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.textContent) || 'N/A',
      totalPages: ((_document$getElementB2 = document.getElementById('total-pages')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.textContent) || 'N/A'
    },
    comparisons: []
  };

  // Extract comparison data
  var comparisonCards = document.querySelectorAll('.comparison-card');
  comparisonCards.forEach(function (card) {
    var _card$querySelector, _card$querySelector2;
    var name = ((_card$querySelector = card.querySelector('.comparison-name')) === null || _card$querySelector === void 0 ? void 0 : _card$querySelector.textContent) || '';
    var score = ((_card$querySelector2 = card.querySelector('.score-percentage')) === null || _card$querySelector2 === void 0 ? void 0 : _card$querySelector2.textContent) || '';
    var insights = Array.from(card.querySelectorAll('.insight-text')).map(function (el) {
      return el.textContent;
    });
    analysisData.comparisons.push({
      name: name,
      score: score,
      insights: insights
    });
  });

  // Download as JSON
  var dataStr = JSON.stringify(analysisData, null, 2);
  var dataBlob = new Blob([dataStr], {
    type: 'application/json'
  });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = "visual-analysis-".concat(new Date().toISOString().split('T')[0], ".json");
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzcmMvdmlzdWFsX21hc3Rlcl9zdW1tYXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELGNBQWMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLFNBQVMsY0FBYyxDQUFBLEVBQUc7RUFDdEI7RUFDQSxnQkFBZ0IsQ0FBQyxDQUFDOztFQUVsQjtFQUNBLHFCQUFxQixDQUFDLENBQUM7O0VBRXZCO0VBQ0EscUJBQXFCLENBQUMsQ0FBQzs7RUFFdkI7RUFDQSxzQkFBc0IsQ0FBQyxDQUFDOztFQUV4QjtFQUNBLGtCQUFrQixDQUFDLENBQUM7QUFDeEI7O0FBRUE7QUFDQSxTQUFTLGdCQUFnQixDQUFBLEVBQUc7RUFDeEIsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUM7RUFDdkUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTyxFQUFJO0lBQ2pDLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7SUFDeEQsSUFBSSxTQUFTLEVBQUU7TUFDWCxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7TUFDaEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtRQUMvQyxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxNQUFNO1FBQ2IsR0FBRyxFQUFFLFNBQVM7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLE1BQU0sRUFBRTtNQUNaLENBQUMsQ0FBQztNQUNGLE9BQU8sQ0FBQyxXQUFXLEdBQUcsU0FBUztJQUNuQztFQUNKLENBQUMsQ0FBQztBQUNOOztBQUVBO0FBQ0EsU0FBUyxxQkFBcUIs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LFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sRUFBRTtJQUNoRixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0VBQzdDOztFQUVBO0VBQ0EsTUFBTSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFBLENBQUMsRUFBSTtJQUM5RSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7TUFDWCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQzdDLENBQUMsTUFBTTtNQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDaEQ7RUFDSixDQUFDLENBQUM7QUFDTjs7QUFFQTtBQUNBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELGNBQWMsQ0FBQyxDQUFDO0VBQ2hCLDBCQUEwQixDQUFDLENBQUM7RUFDNUIsb0JBQW9CLENBQUMsQ0FBQztFQUN0QixpQkFBaUIsQ0FBQyxDQUFDO0VBQ25CLGdCQUFnQixDQUFDLENBQUM7RUFDbEIsZ0JBQWdCLENBQUMsQ0FBQztFQUNsQixrQkFBa0IsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQzs7QUFFRjtBQUNBLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUI7QUFDaEQsTUFBTSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFZpc3VhbCBNYXN0ZXIgU3VtbWFyeSBKYXZhU2NyaXB0XG5cbi8vIEluaXRpYWxpemUgcGFnZSB3aGVuIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBpbml0aWFsaXplUGFnZSgpO1xufSk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQYWdlKCkge1xuICAgIC8vIEZvcm1hdCB0aW1lc3RhbXBzXG4gICAgZm9ybWF0VGltZXN0YW1wcygpO1xuICAgIFxuICAgIC8vIENhbGN1bGF0ZSBzdW1tYXJ5IHN0YXRpc3RpY3NcbiAgICBjYWxjdWxhdGVTdW1tYXJ5U3RhdHMoKTtcbiAgICBcbiAgICAvLyBGb3JtYXQgc2l0ZSBuYW1lcyBpbiBjb21wYXJpc29uIHRpdGxlc1xuICAgIGZvcm1hdENvbXBhcmlzb25OYW1lcygpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgc2NvcmUgY2lyY2xlc1xuICAgIGluaXRpYWxpemVTY29yZUNpcmNsZXMoKTtcbiAgICBcbiAgICAvLyBBZGQgYW5pbWF0aW9uIGRlbGF5cyB0byBlbGVtZW50c1xuICAgIGFkZEFuaW1hdGlvbkRlbGF5cygpO1xufVxuXG4vLyBGb3JtYXQgdGltZXN0YW1wcyB0byByZWFkYWJsZSBkYXRlc1xuZnVuY3Rpb24gZm9ybWF0VGltZXN0YW1wcygpIHtcbiAgICBjb25zdCB0aW1lc3RhbXBFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRpbWVzdGFtcF0nKTtcbiAgICB0aW1lc3RhbXBFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10aW1lc3RhbXAnKTtcbiAgICAgICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgaG91cjogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgIG1pbnV0ZTogJzItZGlnaXQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWQ7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gQ2FsY3VsYXRlIGFuZCBkaXNwbGF5IHN1bW1hcnkgc3RhdGlzdGljc1xuZnVuY3Rpb24gY2FsY3VsYXRlU3VtbWFyeVN0YXRzKCkge1xuICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlIHNjb3JlIGFjcm9zcyBhbGwgY29tcGFyaXNvbnNcbiAgICBjb25zdCBzY29yZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjb3JlLW51bWJlcicpO1xuICAgIGxldCB0b3RhbFNjb3JlID0gMDtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIFxuICAgIHNjb3JlRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcmVUZXh0ID0gZWxlbWVudC50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpO1xuICAgICAgICBjb25zdCBzY29yZSA9IHBhcnNlRmxvYXQoc2NvcmVUZXh0KTtcbiAgICAgICAgaWYgKCFpc05hTihzY29yZSkpIHtcbiAgICAgICAgICAgIHRvdGFsU2NvcmUgKz0gc2NvcmU7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgICBjb25zdCBhdmdTY29yZSA9IE1hdGgucm91bmQodG90YWxTY29yZSAvIGNvdW50KTtcbiAgICAgICAgY29uc3QgYXZnU2NvcmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F2ZXJhZ2Utc2NvcmUnKTtcbiAgICAgICAgaWYgKGF2Z1Njb3JlRWxlbWVudCkge1xuICAgICAgICAgICAgYXZnU2NvcmVFbGVtZW50LnRleHRDb250ZW50ID0gYXZnU2NvcmUgKyAnJSc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQ2FsY3VsYXRlIHRvdGFsIHBhZ2VzIGFjcm9zcyBhbGwgY29tcGFyaXNvbnNcbiAgICBjb25zdCBwYWdlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFnZXMtbnVtYmVyJyk7XG4gICAgbGV0IHRvdGFsUGFnZXMgPSAwO1xuICAgIFxuICAgIHBhZ2VFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCBwYWdlcyA9IHBhcnNlSW50KGVsZW1lbnQudGV4dENvbnRlbnQpO1xuICAgICAgICBpZiAoIWlzTmFOKHBhZ2VzKSkge1xuICAgICAgICAgICAgdG90YWxQYWdlcyArPSBwYWdlcztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IHRvdGFsUGFnZXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFsLXBhZ2VzJyk7XG4gICAgaWYgKHRvdGFsUGFnZXNFbGVtZW50KSB7XG4gICAgICAgIHRvdGFsUGFnZXNFbGVtZW50LnRleHRDb250ZW50ID0gdG90YWxQYWdlcztcbiAgICB9XG4gICAgXG4gICAgLy8gQW5hbHl6ZSBwZXJmb3JtYW5jZSBtZXRyaWNzXG4gICAgYW5hbHl6ZVBlcmZvcm1hbmNlTWV0cmljcygpO1xufVxuXG4vLyBBbmFseXplIHBlcmZvcm1hbmNlIG1ldHJpY3MgdG8gZmluZCBiZXN0L3dvcnN0XG5mdW5jdGlvbiBhbmFseXplUGVyZm9ybWFuY2VNZXRyaWNzKCkge1xuICAgIGNvbnN0IG1ldHJpY0NhdGVnb3JpZXMgPSBbJ2xheW91dCcsICdjb2xvcnMnLCAndHlwb2dyYXBoeScsICdyZXNwb25zaXZlJywgJ2Rlc2lnbi1zeXN0ZW0nLCAnaGllcmFyY2h5JywgJ3NwYWNpbmcnXTtcbiAgICBjb25zdCBtZXRyaWNTdW1zID0ge307XG4gICAgY29uc3QgbWV0cmljQ291bnRzID0ge307XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSBzdW1zIGFuZCBjb3VudHNcbiAgICBtZXRyaWNDYXRlZ29yaWVzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xuICAgICAgICBtZXRyaWNTdW1zW2NhdGVnb3J5XSA9IDA7XG4gICAgICAgIG1ldHJpY0NvdW50c1tjYXRlZ29yeV0gPSAwO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIFN1bSB1cCBhbGwgbWV0cmljIHZhbHVlc1xuICAgIG1ldHJpY0NhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICAgIGNvbnN0IGJhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuYmFyLWZpbGwuJHtjYXRlZ29yeX1gKTtcbiAgICAgICAgYmFycy5mb3JFYWNoKGJhciA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQoYmFyLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpLnJlcGxhY2UoJyUnLCAnJykpO1xuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBtZXRyaWNTdW1zW2NhdGVnb3J5XSArPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBtZXRyaWNDb3VudHNbY2F0ZWdvcnldKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlcyBhbmQgZmluZCBiZXN0L3dvcnN0XG4gICAgY29uc3QgbWV0cmljQXZlcmFnZXMgPSB7fTtcbiAgICBtZXRyaWNDYXRlZ29yaWVzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xuICAgICAgICBpZiAobWV0cmljQ291bnRzW2NhdGVnb3J5XSA+IDApIHtcbiAgICAgICAgICAgIG1ldHJpY0F2ZXJhZ2VzW2NhdGVnb3J5XSA9IG1ldHJpY1N1bXNbY2F0ZWdvcnldIC8gbWV0cmljQ291bnRzW2NhdGVnb3J5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIEZpbmQgYmVzdCBhbmQgd29yc3QgbWV0cmljc1xuICAgIGxldCBiZXN0TWV0cmljID0gJyc7XG4gICAgbGV0IHdvcnN0TWV0cmljID0gJyc7XG4gICAgbGV0IGJlc3RTY29yZSA9IC0xO1xuICAgIGxldCB3b3JzdFNjb3JlID0gMTAxO1xuICAgIFxuICAgIE9iamVjdC5rZXlzKG1ldHJpY0F2ZXJhZ2VzKS5mb3JFYWNoKG1ldHJpYyA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gbWV0cmljQXZlcmFnZXNbbWV0cmljXTtcbiAgICAgICAgaWYgKHNjb3JlID4gYmVzdFNjb3JlKSB7XG4gICAgICAgICAgICBiZXN0U2NvcmUgPSBzY29yZTtcbiAgICAgICAgICAgIGJlc3RNZXRyaWMgPSBtZXRyaWM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3JlIDwgd29yc3RTY29yZSkge1xuICAgICAgICAgICAgd29yc3RTY29yZSA9IHNjb3JlO1xuICAgICAgICAgICAgd29yc3RNZXRyaWMgPSBtZXRyaWM7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBVcGRhdGUgcGVyZm9ybWFuY2Ugc3VtbWFyeVxuICAgIGNvbnN0IGJlc3RNZXRyaWNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jlc3QtbWV0cmljJyk7XG4gICAgY29uc3Qgd29yc3RNZXRyaWNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcnN0LW1ldHJpYycpO1xuICAgIGNvbnN0IGNvbnNpc3RlbmN5RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25zaXN0ZW5jeS1sZXZlbCcpO1xuICAgIFxuICAgIGlmIChiZXN0TWV0cmljRWxlbWVudCAmJiBiZXN0TWV0cmljKSB7XG4gICAgICAgIGJlc3RNZXRyaWNFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0TWV0cmljTmFtZShiZXN0TWV0cmljKTtcbiAgICAgICAgYmVzdE1ldHJpY0VsZW1lbnQuY2xhc3NOYW1lID0gJ3BlcmYtdmFsdWUgYmVzdCc7XG4gICAgfVxuICAgIFxuICAgIGlmICh3b3JzdE1ldHJpY0VsZW1lbnQgJiYgd29yc3RNZXRyaWMpIHtcbiAgICAgICAgd29yc3RNZXRyaWNFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0TWV0cmljTmFtZSh3b3JzdE1ldHJpYyk7XG4gICAgICAgIHdvcnN0TWV0cmljRWxlbWVudC5jbGFzc05hbWUgPSAncGVyZi12YWx1ZSBuZWVkcy13b3JrJztcbiAgICB9XG4gICAgXG4gICAgaWYgKGNvbnNpc3RlbmN5RWxlbWVudCkge1xuICAgICAgICBjb25zdCB2YXJpYW5jZSA9IGJlc3RTY29yZSAtIHdvcnN0U2NvcmU7XG4gICAgICAgIGxldCBjb25zaXN0ZW5jeUxldmVsID0gJ0hpZ2gnO1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gJ3BlcmYtdmFsdWUgYmVzdCc7XG4gICAgICAgIFxuICAgICAgICBpZiAodmFyaWFuY2UgPiA0MCkge1xuICAgICAgICAgICAgY29uc2lzdGVuY3lMZXZlbCA9ICdMb3cnO1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gJ3BlcmYtdmFsdWUgbmVlZHMtd29yayc7XG4gICAgICAgIH0gZWxzZSBpZiAodmFyaWFuY2UgPiAyMCkge1xuICAgICAgICAgICAgY29uc2lzdGVuY3lMZXZlbCA9ICdNb2RlcmF0ZSc7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSAncGVyZi12YWx1ZSB2YXJpYW5jZSc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnNpc3RlbmN5RWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnNpc3RlbmN5TGV2ZWw7XG4gICAgICAgIGNvbnNpc3RlbmN5RWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgfVxufVxuXG4vLyBGb3JtYXQgbWV0cmljIG5hbWVzIGZvciBkaXNwbGF5XG5mdW5jdGlvbiBmb3JtYXRNZXRyaWNOYW1lKG1ldHJpYykge1xuICAgIGNvbnN0IG1ldHJpY05hbWVzID0ge1xuICAgICAgICAnbGF5b3V0JzogJ0xheW91dCBTdHJ1Y3R1cmUnLFxuICAgICAgICAnY29sb3JzJzogJ0NvbG9yIFNjaGVtZXMnLFxuICAgICAgICAndHlwb2dyYXBoeSc6ICdUeXBvZ3JhcGh5JyxcbiAgICAgICAgJ3Jlc3BvbnNpdmUnOiAnUmVzcG9uc2l2ZSBEZXNpZ24nLFxuICAgICAgICAnZGVzaWduLXN5c3RlbSc6ICdEZXNpZ24gU3lzdGVtJyxcbiAgICAgICAgJ2hpZXJhcmNoeSc6ICdWaXN1YWwgSGllcmFyY2h5JyxcbiAgICAgICAgJ3NwYWNpbmcnOiAnU3BhY2luZydcbiAgICB9O1xuICAgIHJldHVybiBtZXRyaWNOYW1lc1ttZXRyaWNdIHx8IG1ldHJpYztcbn1cblxuLy8gRm9ybWF0IGNvbXBhcmlzb24gbmFtZXMgZnJvbSB0ZWNobmljYWwgZm9ybWF0XG5mdW5jdGlvbiBmb3JtYXRDb21wYXJpc29uTmFtZXMoKSB7XG4gICAgY29uc3QgY29tcGFyaXNvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29tcGFyaXNvbl0nKTtcbiAgICBjb21wYXJpc29uRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgY29tcGFyaXNvbiA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbXBhcmlzb24nKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkID0gZm9ybWF0Q29tcGFyaXNvbk5hbWUoY29tcGFyaXNvbik7XG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWQ7XG4gICAgfSk7XG59XG5cbi8vIEZvcm1hdCBjb21wYXJpc29uIHN0cmluZyB0byByZWFkYWJsZSBmb3JtYXRcbmZ1bmN0aW9uIGZvcm1hdENvbXBhcmlzb25OYW1lKGNvbXBhcmlzb24pIHtcbiAgICBpZiAoIWNvbXBhcmlzb24pIHJldHVybiAnJztcbiAgICBcbiAgICAvLyBTcGxpdCBieSBfdnNfIGFuZCBmb3JtYXQgZWFjaCBzaXRlIG5hbWVcbiAgICBjb25zdCBwYXJ0cyA9IGNvbXBhcmlzb24uc3BsaXQoJ192c18nKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGNvbnN0IHNpdGUxID0gZm9ybWF0U2l0ZU5hbWUocGFydHNbMF0pO1xuICAgICAgICBjb25zdCBzaXRlMiA9IGZvcm1hdFNpdGVOYW1lKHBhcnRzWzFdKTtcbiAgICAgICAgcmV0dXJuIGAke3NpdGUxfSB2cyAke3NpdGUyfWA7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBjb21wYXJpc29uO1xufVxuXG4vLyBGb3JtYXQgdGVjaG5pY2FsIHNpdGUgbmFtZSB0byByZWFkYWJsZSBmb3JtYXRcbmZ1bmN0aW9uIGZvcm1hdFNpdGVOYW1lKHRlY2huaWNhbE5hbWUpIHtcbiAgICBpZiAoIXRlY2huaWNhbE5hbWUpIHJldHVybiAnJztcbiAgICBcbiAgICAvLyBSZW1vdmUgdGltZXN0YW1wIGFuZCBjb252ZXJ0IHRvIHJlYWRhYmxlIGZvcm1hdFxuICAgIGNvbnN0IHNpdGVOYW1lID0gdGVjaG5pY2FsTmFtZS5zcGxpdCgnXycpWzBdO1xuICAgIFxuICAgIC8vIENvbnZlcnQgdG8gdGl0bGUgY2FzZSBhbmQgaGFuZGxlIGNvbW1vbiBzaXRlIG5hbWVzXG4gICAgY29uc3Qgc2l0ZU1hcCA9IHtcbiAgICAgICAgJ2luc3RhbnRjaGVja21hdGUnOiAnSW5zdGFudENoZWNrbWF0ZScsXG4gICAgICAgICd0cnV0aGZpbmRlcic6ICdUcnV0aEZpbmRlcicsXG4gICAgICAgICdpbnRlbGl1cyc6ICdJbnRlbGl1cycsXG4gICAgICAgICd3aGl0ZXBhZ2VzJzogJ1doaXRlUGFnZXMnXG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4gc2l0ZU1hcFtzaXRlTmFtZS50b0xvd2VyQ2FzZSgpXSB8fCBcbiAgICAgICAgICAgc2l0ZU5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzaXRlTmFtZS5zbGljZSgxKTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBzY29yZSBjaXJjbGVzIHdpdGggYW5pbWF0ZWQgYm9yZGVyc1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNjb3JlQ2lyY2xlcygpIHtcbiAgICBjb25zdCBzY29yZUNpcmNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NvcmUtY2lyY2xlW2RhdGEtc2NvcmVdJyk7XG4gICAgc2NvcmVDaXJjbGVzLmZvckVhY2goY2lyY2xlID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSBwYXJzZUZsb2F0KGNpcmNsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2NvcmUnKSk7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gZ2V0U2NvcmVDb2xvcihzY29yZSk7XG4gICAgICAgIGNpcmNsZS5zdHlsZS5ib3JkZXJDb2xvciA9IGNvbG9yO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIHB1bHNpbmcgYW5pbWF0aW9uIGZvciB2ZXJ5IGhpZ2ggb3IgdmVyeSBsb3cgc2NvcmVzXG4gICAgICAgIGlmIChzY29yZSA+IDAuOSB8fCBzY29yZSA8IDAuMykge1xuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLmFuaW1hdGlvbiA9ICdwdWxzZSAycyBpbmZpbml0ZSc7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gR2V0IGNvbG9yIGJhc2VkIG9uIHNjb3JlXG5mdW5jdGlvbiBnZXRTY29yZUNvbG9yKHNjb3JlKSB7XG4gICAgaWYgKHNjb3JlID49IDAuOSkgcmV0dXJuICcjZTc0YzNjJzsgICAgICAvLyBSZWQgLSBIaWdoIHNpbWlsYXJpdHlcbiAgICBpZiAoc2NvcmUgPj0gMC44KSByZXR1cm4gJyNmMzljMTInOyAgICAgIC8vIE9yYW5nZSAtIEdvb2Qgc2ltaWxhcml0eVxuICAgIGlmIChzY29yZSA+PSAwLjcpIHJldHVybiAnI2YxYzQwZic7ICAgICAgLy8gWWVsbG93IC0gTW9kZXJhdGUgc2ltaWxhcml0eVxuICAgIGlmIChzY29yZSA+PSAwLjYpIHJldHVybiAnI2M5ZjEwZic7ICAgICAgLy8gWWVsbG93aXNoR3JlZW4gLSBNb2RlcmF0ZS1sb3cgc2ltaWxhcml0eVxuICAgIHJldHVybiAnIzI3YWU2MCc7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gR3JlZW4gLSBMb3cgc2ltaWxhcml0eVxufVxuXG4vLyBUb2dnbGUgbWV0cmljcyBkZXRhaWwgdmlzaWJpbGl0eVxuZnVuY3Rpb24gdG9nZ2xlTWV0cmljc0RldGFpbChidXR0b24pIHtcbiAgICBjb25zdCBjYXJkID0gYnV0dG9uLmNsb3Nlc3QoJy5jb21wYXJpc29uLWNhcmQnKTtcbiAgICBjb25zdCBtZXRyaWNzRGV0YWlsID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcubWV0cmljcy1kZXRhaWwnKTtcbiAgICBjb25zdCBidXR0b25UZXh0ID0gYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICBjb25zdCBidXR0b25JY29uID0gYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZyBwYXRoJyk7XG4gICAgXG4gICAgaWYgKG1ldHJpY3NEZXRhaWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnIHx8ICFtZXRyaWNzRGV0YWlsLnN0eWxlLmRpc3BsYXkpIHtcbiAgICAgICAgLy8gU2hvdyBtZXRyaWNzXG4gICAgICAgIG1ldHJpY3NEZXRhaWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGJ1dHRvblRleHQudGV4dENvbnRlbnQgPSAnSGlkZSBNZXRyaWNzJztcbiAgICAgICAgYnV0dG9uSWNvbi5zZXRBdHRyaWJ1dGUoJ2QnLCAnTTcgMTRMMTIgOUwxNyAxNEg3WicpOyAvLyBVcCBhcnJvd1xuICAgICAgICBcbiAgICAgICAgLy8gQW5pbWF0ZSBtZXRyaWMgYmFyc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJhcnMgPSBtZXRyaWNzRGV0YWlsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYXItZmlsbC1zbWFsbCcpO1xuICAgICAgICAgICAgYmFycy5mb3JFYWNoKChiYXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGJhci5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGVYKDEpJztcbiAgICAgICAgICAgICAgICB9LCBpbmRleCAqIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIaWRlIG1ldHJpY3NcbiAgICAgICAgbWV0cmljc0RldGFpbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBidXR0b25UZXh0LnRleHRDb250ZW50ID0gJ1Nob3cgTWV0cmljcyc7XG4gICAgICAgIGJ1dHRvbkljb24uc2V0QXR0cmlidXRlKCdkJywgJ003IDEwTDEyIDE1TDE3IDEwSDdaJyk7IC8vIERvd24gYXJyb3dcbiAgICB9XG59XG5cbi8vIEFkZCBzdGFnZ2VyZWQgYW5pbWF0aW9uIGRlbGF5c1xuZnVuY3Rpb24gYWRkQW5pbWF0aW9uRGVsYXlzKCkge1xuICAgIGNvbnN0IGFuaW1hdGVkRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljLWNhcmQsIC5pbnNpZ2h0LWNhcmQsIC5jb21wYXJpc29uLWNhcmQnKTtcbiAgICBhbmltYXRlZEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuYW5pbWF0aW9uRGVsYXkgPSBgJHsoaW5kZXggKyAxKSAqIDAuMX1zYDtcbiAgICB9KTtcbn1cblxuLy8gVXRpbGl0eSBmdW5jdGlvbiB0byBhbmltYXRlIG51bWJlcnNcbmZ1bmN0aW9uIGFuaW1hdGVOdW1iZXIoZWxlbWVudCwgc3RhcnQsIGVuZCwgZHVyYXRpb24gPSAxMDAwKSB7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IGVuZCAtIHN0YXJ0O1xuICAgIFxuICAgIGZ1bmN0aW9uIHVwZGF0ZU51bWJlcihjdXJyZW50VGltZSkge1xuICAgICAgICBjb25zdCBlbGFwc2VkID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5taW4oZWxhcHNlZCAvIGR1cmF0aW9uLCAxKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBNYXRoLmZsb29yKHN0YXJ0ICsgKGRpZmZlcmVuY2UgKiBwcm9ncmVzcykpO1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY3VycmVudCArIChlbGVtZW50LnRleHRDb250ZW50LmluY2x1ZGVzKCclJykgPyAnJScgOiAnJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAocHJvZ3Jlc3MgPCAxKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlTnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlTnVtYmVyKTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIgZm9yIHNjcm9sbCBhbmltYXRpb25zXG5mdW5jdGlvbiBpbml0aWFsaXplU2Nyb2xsQW5pbWF0aW9ucygpIHtcbiAgICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XG4gICAgICAgIHRocmVzaG9sZDogMC4xLFxuICAgICAgICByb290TWFyZ2luOiAnMHB4IDBweCAtNTBweCAwcHgnXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtaW4nKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIG51bWJlciBhbmltYXRpb25zIGZvciBzdGF0IGNhcmRzXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3N0YXQtY2FyZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlckVsZW1lbnQgPSBlbnRyeS50YXJnZXQucXVlcnlTZWxlY3RvcignLnN0YXQtbnVtYmVyJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1iZXJFbGVtZW50ICYmICFudW1iZXJFbGVtZW50LmRhdGFzZXQuYW5pbWF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbmFsVmFsdWUgPSBwYXJzZUludChudW1iZXJFbGVtZW50LnRleHRDb250ZW50LnJlcGxhY2UoL1xcRC9nLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihmaW5hbFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlckVsZW1lbnQudGV4dENvbnRlbnQgPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZU51bWJlcihudW1iZXJFbGVtZW50LCAwLCBmaW5hbFZhbHVlLCAxNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1iZXJFbGVtZW50LmRhdGFzZXQuYW5pbWF0ZWQgPSAndHJ1ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIG9ic2VydmVyT3B0aW9ucyk7XG4gICAgXG4gICAgLy8gT2JzZXJ2ZSBhbGwgY2FyZHMgYW5kIGFuaW1hdGVkIGVsZW1lbnRzXG4gICAgY29uc3Qgb2JzZXJ2ZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXQtY2FyZCwgLm1ldHJpYy1jYXJkLCAuaW5zaWdodC1jYXJkLCAuY29tcGFyaXNvbi1jYXJkJyk7XG4gICAgb2JzZXJ2ZUVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpKTtcbn1cblxuLy8gRW5oYW5jZWQgaG92ZXIgZWZmZWN0cyBmb3IgbWV0cmljIGJhcnNcbmZ1bmN0aW9uIGVuaGFuY2VNZXRyaWNCYXJzKCkge1xuICAgIGNvbnN0IG1ldHJpY0JhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljLWJhcicpO1xuICAgIG1ldHJpY0JhcnMuZm9yRWFjaChiYXIgPT4ge1xuICAgICAgICBiYXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgZmlsbCA9IHRoaXMucXVlcnlTZWxlY3RvcignLmJhci1maWxsJyk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucXVlcnlTZWxlY3RvcignLm1ldHJpYy12YWx1ZScpO1xuICAgICAgICAgICAgaWYgKGZpbGwgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBmaWxsLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZVkoMS4yKSc7XG4gICAgICAgICAgICAgICAgdmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICc5MDAnO1xuICAgICAgICAgICAgICAgIHZhbHVlLnN0eWxlLmNvbG9yID0gJyMyYzNlNTAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGJhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuYmFyLWZpbGwnKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWV0cmljLXZhbHVlJyk7XG4gICAgICAgICAgICBpZiAoZmlsbCAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGZpbGwuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlWSgxKSc7XG4gICAgICAgICAgICAgICAgdmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICc3MDAnO1xuICAgICAgICAgICAgICAgIHZhbHVlLnN0eWxlLmNvbG9yID0gJyMzNDk4ZGInO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gUHJpbnQgb3B0aW1pemF0aW9uXG5mdW5jdGlvbiBvcHRpbWl6ZUZvclByaW50KCkge1xuICAgIC8vIEV4cGFuZCBhbGwgY29sbGFwc2VkIG1ldHJpY3MgZGV0YWlsc1xuICAgIGNvbnN0IG1ldHJpY3NEZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ldHJpY3MtZGV0YWlsJyk7XG4gICAgbWV0cmljc0RldGFpbHMuZm9yRWFjaChkZXRhaWwgPT4ge1xuICAgICAgICBkZXRhaWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gRW5zdXJlIGFsbCBiYXJzIGFyZSB2aXNpYmxlIHdpdGggdGhlaXIgZnVsbCB3aWR0aFxuICAgIGNvbnN0IGJhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFyLWZpbGwsIC5iYXItZmlsbC1zbWFsbCcpO1xuICAgIGJhcnMuZm9yRWFjaChiYXIgPT4ge1xuICAgICAgICBiYXIuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBwcmludCBoYW5kbGluZ1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXByaW50Jywgb3B0aW1pemVGb3JQcmludCk7XG5cbi8vIEtleWJvYXJkIG5hdmlnYXRpb24gc3VwcG9ydFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAvLyBFU0Mga2V5IHRvIGNsb3NlIGV4cGFuZGVkIG1ldHJpYyBkZXRhaWxzXG4gICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICBjb25zdCBleHBhbmRlZE1ldHJpY3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljcy1kZXRhaWxbc3R5bGUqPVwiYmxvY2tcIl0nKTtcbiAgICAgICAgZXhwYW5kZWRNZXRyaWNzLmZvckVhY2goZGV0YWlsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBkZXRhaWwuY2xvc2VzdCgnLmNvbXBhcmlzb24tY2FyZCcpO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuYWN0aW9uLWJ0bi5zZWNvbmRhcnknKTtcbiAgICAgICAgICAgIGlmIChidXR0b24pIHtcbiAgICAgICAgICAgICAgICB0b2dnbGVNZXRyaWNzRGV0YWlsKGJ1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvLyBTcGFjZSBiYXIgdG8gdG9nZ2xlIG1ldHJpY3Mgb24gZm9jdXNlZCBjYXJkc1xuICAgIGlmIChlLmtleSA9PT0gJyAnICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWN0aW9uLWJ0bicpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS50YXJnZXQuY2xpY2soKTtcbiAgICB9XG59KTtcblxuLy8gQWNjZXNzaWJpbGl0eSBlbmhhbmNlbWVudHNcbmZ1bmN0aW9uIGVuaGFuY2VBY2Nlc3NpYmlsaXR5KCkge1xuICAgIC8vIEFkZCBBUklBIGxhYmVscyB0byBtZXRyaWMgYmFyc1xuICAgIGNvbnN0IG1ldHJpY0JhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljLWJhcicpO1xuICAgIG1ldHJpY0JhcnMuZm9yRWFjaChiYXIgPT4ge1xuICAgICAgICBjb25zdCBsYWJlbCA9IGJhci5xdWVyeVNlbGVjdG9yKCcubWV0cmljLWxhYmVsJykudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYmFyLnF1ZXJ5U2VsZWN0b3IoJy5tZXRyaWMtdmFsdWUnKS50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgYmFyRmlsbCA9IGJhci5xdWVyeVNlbGVjdG9yKCcuYmFyLWZpbGwnKTtcbiAgICAgICAgaWYgKGJhckZpbGwpIHtcbiAgICAgICAgICAgIGJhckZpbGwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3Byb2dyZXNzYmFyJyk7XG4gICAgICAgICAgICBiYXJGaWxsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGAke2xhYmVsfTogJHt2YWx1ZX1gKTtcbiAgICAgICAgICAgIGJhckZpbGwuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93JywgdmFsdWUucmVwbGFjZSgnJScsICcnKSk7XG4gICAgICAgICAgICBiYXJGaWxsLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1pbicsICcwJyk7XG4gICAgICAgICAgICBiYXJGaWxsLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1heCcsICcxMDAnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIEFkZCByb2xlIGF0dHJpYnV0ZXMgdG8gY2FyZHNcbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXRyaWMtY2FyZCwgLmluc2lnaHQtY2FyZCwgLmNvbXBhcmlzb24tY2FyZCcpO1xuICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgIGNhcmQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FydGljbGUnKTtcbiAgICAgICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBFbmhhbmNlIGJ1dHRvbiBhY2Nlc3NpYmlsaXR5XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpb24tYnRuJyk7XG4gICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGlmICghYnV0dG9uLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYnV0dG9uLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB0ZXh0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBQZXJmb3JtYW5jZSBtb25pdG9yaW5nXG5mdW5jdGlvbiB0cmFja1BlcmZvcm1hbmNlKCkge1xuICAgIGlmICgncGVyZm9ybWFuY2UnIGluIHdpbmRvdykge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgbG9hZFRpbWUgPSBwZXJmb3JtYW5jZS50aW1pbmcubG9hZEV2ZW50RW5kIC0gcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBWaXN1YWwgYW5hbHlzaXMgcGFnZSBsb2FkIHRpbWU6ICR7bG9hZFRpbWV9bXNgKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVHJhY2sgc3BlY2lmaWMgbWV0cmljc1xuICAgICAgICAgICAgY29uc3QgbWV0cmljc0xvYWRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTWV0cmljcyBwcm9jZXNzaW5nIHRpbWU6ICR7bWV0cmljc0xvYWRUaW1lfW1zYCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gU2VhcmNoL2ZpbHRlciBmdW5jdGlvbmFsaXR5IGZvciBjb21wYXJpc29uc1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNlYXJjaCgpIHtcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wYXJpc29uLXNlYXJjaCcpO1xuICAgIGlmIChzZWFyY2hJbnB1dCkge1xuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRoaXMudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBhcmlzb25DYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wYXJpc29uLWNhcmQnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29tcGFyaXNvbkNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tcGFyaXNvbk5hbWUgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jb21wYXJpc29uLW5hbWUnKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc2lnaHRzID0gQXJyYXkuZnJvbShjYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNpZ2h0LXRleHQnKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChlbCA9PiBlbC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpKS5qb2luKCcgJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGNvbXBhcmlzb25OYW1lLmluY2x1ZGVzKHNlYXJjaFRlcm0pIHx8IGluc2lnaHRzLmluY2x1ZGVzKHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUuZGlzcGxheSA9IG1hdGNoZXMgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gRXhwb3J0IGZ1bmN0aW9uYWxpdHkgZm9yIGRhdGFcbmZ1bmN0aW9uIGV4cG9ydEFuYWx5c2lzRGF0YSgpIHtcbiAgICBjb25zdCBhbmFseXNpc0RhdGEgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBzdW1tYXJ5OiB7XG4gICAgICAgICAgICB0b3RhbENvbXBhcmlzb25zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcGFyaXNvbi1jYXJkJykubGVuZ3RoLFxuICAgICAgICAgICAgYXZlcmFnZVNjb3JlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXZlcmFnZS1zY29yZScpPy50ZXh0Q29udGVudCB8fCAnTi9BJyxcbiAgICAgICAgICAgIHRvdGFsUGFnZXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbC1wYWdlcycpPy50ZXh0Q29udGVudCB8fCAnTi9BJ1xuICAgICAgICB9LFxuICAgICAgICBjb21wYXJpc29uczogW11cbiAgICB9O1xuICAgIFxuICAgIC8vIEV4dHJhY3QgY29tcGFyaXNvbiBkYXRhXG4gICAgY29uc3QgY29tcGFyaXNvbkNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXBhcmlzb24tY2FyZCcpO1xuICAgIGNvbXBhcmlzb25DYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuY29tcGFyaXNvbi1uYW1lJyk/LnRleHRDb250ZW50IHx8ICcnO1xuICAgICAgICBjb25zdCBzY29yZSA9IGNhcmQucXVlcnlTZWxlY3RvcignLnNjb3JlLXBlcmNlbnRhZ2UnKT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgIGNvbnN0IGluc2lnaHRzID0gQXJyYXkuZnJvbShjYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNpZ2h0LXRleHQnKSlcbiAgICAgICAgICAgIC5tYXAoZWwgPT4gZWwudGV4dENvbnRlbnQpO1xuICAgICAgICBcbiAgICAgICAgYW5hbHlzaXNEYXRhLmNvbXBhcmlzb25zLnB1c2goe1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHNjb3JlLFxuICAgICAgICAgICAgaW5zaWdodHNcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gRG93bmxvYWQgYXMgSlNPTlxuICAgIGNvbnN0IGRhdGFTdHIgPSBKU09OLnN0cmluZ2lmeShhbmFseXNpc0RhdGEsIG51bGwsIDIpO1xuICAgIGNvbnN0IGRhdGFCbG9iID0gbmV3IEJsb2IoW2RhdGFTdHJdLCB7dHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG4gICAgXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGRhdGFCbG9iKTtcbiAgICBsaW5rLmRvd25sb2FkID0gYHZpc3VhbC1hbmFseXNpcy0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS5qc29uYDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xufVxuXG4vLyBUaGVtZSBkZXRlY3Rpb24gYW5kIGFkYXB0YXRpb25cbmZ1bmN0aW9uIGFkYXB0VG9TeXN0ZW1UaGVtZSgpIHtcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay10aGVtZScpO1xuICAgIH1cbiAgICBcbiAgICAvLyBMaXN0ZW4gZm9yIHRoZW1lIGNoYW5nZXNcbiAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBpZiAoZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstdGhlbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGFyay10aGVtZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgYWxsIGZ1bmN0aW9uYWxpdHkgd2hlbiBwYWdlIGxvYWRzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaW5pdGlhbGl6ZVBhZ2UoKTtcbiAgICBpbml0aWFsaXplU2Nyb2xsQW5pbWF0aW9ucygpO1xuICAgIGVuaGFuY2VBY2Nlc3NpYmlsaXR5KCk7XG4gICAgZW5oYW5jZU1ldHJpY0JhcnMoKTtcbiAgICB0cmFja1BlcmZvcm1hbmNlKCk7XG4gICAgaW5pdGlhbGl6ZVNlYXJjaCgpO1xuICAgIGFkYXB0VG9TeXN0ZW1UaGVtZSgpO1xufSk7XG5cbi8vIE1ha2UgZnVuY3Rpb25zIGF2YWlsYWJsZSBnbG9iYWxseSBmb3Igb25jbGljayBoYW5kbGVyc1xud2luZG93LnRvZ2dsZU1ldHJpY3NEZXRhaWwgPSB0b2dnbGVNZXRyaWNzRGV0YWlsO1xud2luZG93LmV4cG9ydEFuYWx5c2lzRGF0YSA9IGV4cG9ydEFuYWx5c2lzRGF0YTsiXX0=
