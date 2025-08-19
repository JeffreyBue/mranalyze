(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Technical Site Comparison JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
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

// Initialize metric bar animations using the fixed data-width pattern
function initializeMetricBarAnimations() {
  var metricBars = document.querySelectorAll('.metric-fill');
  metricBars.forEach(function (bar, index) {
    // Use the fixed data-width pattern from the corrected approach
    var targetWidth = bar.dataset.width;
    if (targetWidth) {
      // Set initial width to 0%
      bar.style.width = '0%';

      // Animate to target width with staggered delay
      setTimeout(function () {
        bar.style.width = targetWidth;
      }, 500 + index * 200);
    }
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
  var animatableElements = document.querySelectorAll('.summary-card, .page-link-bubble');
  animatableElements.forEach(function (element) {
    return observer.observe(element);
  });
}

// Animate summary cards
function animateSummaryCard(card) {
  // Add a subtle entrance effect
  card.style.transform = 'translateY(20px)';
  card.style.opacity = '0';
  setTimeout(function () {
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
  setTimeout(function () {
    bubble.style.transform = 'translateX(0)';
    bubble.style.opacity = '1';
    bubble.style.transition = 'all 0.4s ease-out';
  }, 100);
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
      var value = ((_metricItem$querySele2 = metricItem.querySelector('.metric-score')) === null || _metricItem$querySele2 === void 0 ? void 0 : _metricItem$querySele2.textContent) || '';
      bar.setAttribute('role', 'progressbar');
      bar.setAttribute('aria-label', "".concat(label, ": ").concat(value));
      bar.setAttribute('aria-valuenow', value.replace('%', ''));
      bar.setAttribute('aria-valuemin', '0');
      bar.setAttribute('aria-valuemax', '100');
    }
  });

  // Add role attributes to cards
  var cards = document.querySelectorAll('.summary-card, .page-link-bubble');
  cards.forEach(function (card) {
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
  });

  // Add ARIA label to overall score
  var overallScore = document.querySelector('.overall-score');
  if (overallScore) {
    var _overallScore$querySe;
    var scoreValue = ((_overallScore$querySe = overallScore.querySelector('.score-percentage')) === null || _overallScore$querySe === void 0 ? void 0 : _overallScore$querySe.textContent) || '';
    overallScore.setAttribute('role', 'progressbar');
    overallScore.setAttribute('aria-label', "Overall technical similarity: ".concat(scoreValue));
    overallScore.setAttribute('aria-valuenow', scoreValue.replace('%', ''));
    overallScore.setAttribute('aria-valuemin', '0');
    overallScore.setAttribute('aria-valuemax', '100');
  }
}

// Enhanced hover effects for interactive elements
function enhanceInteractivity() {
  // Page bubble hover effects
  var pageBubbles = document.querySelectorAll('.page-link-bubble');
  pageBubbles.forEach(function (bubble) {
    bubble.addEventListener('mouseenter', function () {
      var arrow = this.querySelector('.bubble-arrow');
      if (arrow) {
        arrow.style.transform = 'translateX(5px)';
        arrow.style.opacity = '1';
      }
    });
    bubble.addEventListener('mouseleave', function () {
      var arrow = this.querySelector('.bubble-arrow');
      if (arrow) {
        arrow.style.transform = 'translateX(0)';
        arrow.style.opacity = '0.5';
      }
    });
  });

  // Summary card interactions
  var summaryCards = document.querySelectorAll('.summary-card');
  summaryCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 12px 35px rgba(44, 62, 80, 0.2)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 4px 20px rgba(44, 62, 80, 0.1)';
    });
  });
}

// Print optimization
function optimizeForPrint() {
  // Ensure all metric bars are fully visible for printing
  var metricBars = document.querySelectorAll('.metric-fill');
  metricBars.forEach(function (bar) {
    var targetWidth = bar.dataset.width;
    if (targetWidth) {
      bar.style.width = targetWidth;
      bar.style.transition = 'none';
    }
  });

  // Remove animations for print
  var animatedElements = document.querySelectorAll('[style*="transition"]');
  animatedElements.forEach(function (element) {
    element.style.transition = 'none';
  });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Export functionality for technical comparison data
function exportTechnicalComparison() {
  var _document$querySelect, _document$querySelect2;
  var comparisonData = {
    timestamp: new Date().toISOString(),
    comparison: ((_document$querySelect = document.querySelector('[data-comparison]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('data-comparison')) || '',
    overallScore: ((_document$querySelect2 = document.querySelector('.score-percentage')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent) || '',
    technicalMetrics: {
      htmlStructure: '',
      metaTags: '',
      frameworks: ''
    },
    riskAssessment: '',
    recommendations: []
  };

  // Extract technical metrics
  var metricItems = document.querySelectorAll('.metric-item');
  metricItems.forEach(function (item, index) {
    var _item$querySelector, _item$querySelector2;
    var score = ((_item$querySelector = item.querySelector('.metric-score')) === null || _item$querySelector === void 0 ? void 0 : _item$querySelector.textContent) || '';
    var name = ((_item$querySelector2 = item.querySelector('.metric-name')) === null || _item$querySelector2 === void 0 ? void 0 : _item$querySelector2.textContent.toLowerCase()) || '';
    if (name.includes('html')) {
      comparisonData.technicalMetrics.htmlStructure = score;
    } else if (name.includes('meta')) {
      comparisonData.technicalMetrics.metaTags = score;
    } else if (name.includes('framework')) {
      comparisonData.technicalMetrics.frameworks = score;
    }
  });

  // Extract risk assessment
  var riskIndicator = document.querySelector('.risk-indicator');
  if (riskIndicator) {
    comparisonData.riskAssessment = riskIndicator.textContent;
  }

  // Extract recommendations
  var recommendations = document.querySelectorAll('.recommendation-item .rec-text');
  recommendations.forEach(function (rec) {
    comparisonData.recommendations.push(rec.textContent);
  });

  // Download as JSON
  var dataStr = JSON.stringify(comparisonData, null, 2);
  var dataBlob = new Blob([dataStr], {
    type: 'application/json'
  });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = "technical-comparison-".concat(new Date().toISOString().split('T')[0], ".json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', function () {
      var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log("Technical comparison page load time: ".concat(loadTime, "ms"));

      // Track metric bar animation performance
      var animationStart = performance.now();
      setTimeout(function () {
        var animationEnd = performance.now();
        console.log("Metric bar animations completed in: ".concat(animationEnd - animationStart, "ms"));
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
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (e.matches) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  });
}

// Utility function to get similarity class based on score
function getSimilarityClass(score) {
  var numericScore = typeof score === 'string' ? parseFloat(score.replace('%', '')) / 100 : score;
  if (numericScore >= 0.75) return 'error'; // High similarity = bad
  if (numericScore >= 0.5) return 'warning'; // Moderate similarity = warning
  if (numericScore >= 0.25) return 'good'; // Low similarity = good
  return 'excellent'; // Very low similarity = excellent
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function () {
  initializePage();
  enhanceInteractivity();
  trackPerformance();
  adaptToSystemTheme();
});

// Make functions available globally for onclick handlers
window.exportTechnicalComparison = exportTechnicalComparison;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzcmMvdGVjaG5pY2FsX2NvbXBhcmlzb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBO0FBQ0EsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsY0FBYyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsU0FBUyxjQUFjLENBQUEsRUFBRztFQUN0QjtFQUNBLGdCQUFnQixDQUFDLENBQUM7O0VBRWxCO0VBQ0EscUJBQXFCLENBQUMsQ0FBQzs7RUFFdkI7RUFDQSw2QkFBNkIsQ0FBQyxDQUFDOztFQUUvQjtFQUNBLG9CQUFvQixDQUFDLENBQUM7O0VBRXRCO0VBQ0Esb0JBQW9CLENBQUMsQ0FBQztBQUMxQjs7QUFFQTtBQUNBLFNBQVMsZ0JBQWdCLENBQUEsRUFBRztFQUN4QixJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztFQUN2RSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLEVBQUk7SUFDakMsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztJQUN4RCxJQUFJLFNBQVMsRUFBRTtNQUNYLElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztNQUNoQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFO1FBQy9DLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLE1BQU07UUFDYixHQUFHLEVBQUUsU0FBUztRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTSxFQUFFO01BQ1osQ0FBQyxDQUFDO01BQ0YsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTO0lBQ25DO0VBQ0osQ0FBQyxDQUFDO0FBQ047O0FBRUE7QUFDQSxTQUFTLHFCQUFxQixD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LENBQUMsQ0FBTztFQUMvQyxPQUFPLFdBQVcsQ0FBQyxDQUE0QjtBQUNuRDs7QUFFQTtBQUNBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELGNBQWMsQ0FBQyxDQUFDO0VBQ2hCLG9CQUFvQixDQUFDLENBQUM7RUFDdEIsZ0JBQWdCLENBQUMsQ0FBQztFQUNsQixrQkFBa0IsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQzs7QUFFRjtBQUNBLE1BQU0sQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBUZWNobmljYWwgU2l0ZSBDb21wYXJpc29uIEphdmFTY3JpcHRcblxuLy8gSW5pdGlhbGl6ZSBwYWdlIHdoZW4gRE9NIGlzIGxvYWRlZFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGluaXRpYWxpemVQYWdlKCk7XG59KTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBhZ2UoKSB7XG4gICAgLy8gRm9ybWF0IHRpbWVzdGFtcHNcbiAgICBmb3JtYXRUaW1lc3RhbXBzKCk7XG4gICAgXG4gICAgLy8gRm9ybWF0IGNvbXBhcmlzb24gbmFtZXNcbiAgICBmb3JtYXRDb21wYXJpc29uTmFtZXMoKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIG1ldHJpYyBiYXIgYW5pbWF0aW9uc1xuICAgIGluaXRpYWxpemVNZXRyaWNCYXJBbmltYXRpb25zKCk7XG4gICAgXG4gICAgLy8gQWRkIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXNcbiAgICBlbmhhbmNlQWNjZXNzaWJpbGl0eSgpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgYW5pbWF0aW9uc1xuICAgIGluaXRpYWxpemVBbmltYXRpb25zKCk7XG59XG5cbi8vIEZvcm1hdCB0aW1lc3RhbXBzIHRvIHJlYWRhYmxlIGRhdGVzXG5mdW5jdGlvbiBmb3JtYXRUaW1lc3RhbXBzKCkge1xuICAgIGNvbnN0IHRpbWVzdGFtcEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGltZXN0YW1wXScpO1xuICAgIHRpbWVzdGFtcEVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRpbWVzdGFtcCcpO1xuICAgICAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgICAgICAgICAgbWludXRlOiAnMi1kaWdpdCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBGb3JtYXQgY29tcGFyaXNvbiBuYW1lcyBmcm9tIHRlY2huaWNhbCBmb3JtYXRcbmZ1bmN0aW9uIGZvcm1hdENvbXBhcmlzb25OYW1lcygpIHtcbiAgICBjb25zdCBjb21wYXJpc29uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb21wYXJpc29uXScpO1xuICAgIGNvbXBhcmlzb25FbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCBjb21wYXJpc29uID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29tcGFyaXNvbicpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSBmb3JtYXRDb21wYXJpc29uTmFtZShjb21wYXJpc29uKTtcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZDtcbiAgICB9KTtcbn1cblxuLy8gRm9ybWF0IGNvbXBhcmlzb24gc3RyaW5nIHRvIHJlYWRhYmxlIGZvcm1hdFxuZnVuY3Rpb24gZm9ybWF0Q29tcGFyaXNvbk5hbWUoY29tcGFyaXNvbikge1xuICAgIGlmICghY29tcGFyaXNvbikgcmV0dXJuICcnO1xuICAgIFxuICAgIC8vIFNwbGl0IGJ5IF92c18gYW5kIGZvcm1hdCBlYWNoIHNpdGUgbmFtZVxuICAgIGNvbnN0IHBhcnRzID0gY29tcGFyaXNvbi5zcGxpdCgnX3ZzXycpO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29uc3Qgc2l0ZTEgPSBmb3JtYXRTaXRlTmFtZShwYXJ0c1swXSk7XG4gICAgICAgIGNvbnN0IHNpdGUyID0gZm9ybWF0U2l0ZU5hbWUocGFydHNbMV0pO1xuICAgICAgICByZXR1cm4gYCR7c2l0ZTF9IHZzICR7c2l0ZTJ9YDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGNvbXBhcmlzb247XG59XG5cbi8vIEZvcm1hdCB0ZWNobmljYWwgc2l0ZSBuYW1lIHRvIHJlYWRhYmxlIGZvcm1hdFxuZnVuY3Rpb24gZm9ybWF0U2l0ZU5hbWUodGVjaG5pY2FsTmFtZSkge1xuICAgIGlmICghdGVjaG5pY2FsTmFtZSkgcmV0dXJuICcnO1xuICAgIFxuICAgIC8vIFJlbW92ZSB0aW1lc3RhbXAgYW5kIGNvbnZlcnQgdG8gcmVhZGFibGUgZm9ybWF0XG4gICAgY29uc3Qgc2l0ZU5hbWUgPSB0ZWNobmljYWxOYW1lLnNwbGl0KCdfJylbMF07XG4gICAgXG4gICAgLy8gQ29udmVydCB0byB0aXRsZSBjYXNlIGFuZCBoYW5kbGUgY29tbW9uIHNpdGUgbmFtZXNcbiAgICBjb25zdCBzaXRlTWFwID0ge1xuICAgICAgICAnaW5zdGFudGNoZWNrbWF0ZSc6ICdJbnN0YW50Q2hlY2ttYXRlJyxcbiAgICAgICAgJ3RydXRoZmluZGVyJzogJ1RydXRoRmluZGVyJyxcbiAgICAgICAgJ2ludGVsaXVzJzogJ0ludGVsaXVzJyxcbiAgICAgICAgJ3doaXRlcGFnZXMnOiAnV2hpdGVQYWdlcycsXG4gICAgICAgICdiZWVudmVyaWZpZWQnOiAnQmVlblZlcmlmaWVkJyxcbiAgICAgICAgJ3RydWVwZW9wbGVzZWFyY2gnOiAnVHJ1ZVBlb3BsZVNlYXJjaCdcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiBzaXRlTWFwW3NpdGVOYW1lLnRvTG93ZXJDYXNlKCldIHx8IFxuICAgICAgICAgICBzaXRlTmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHNpdGVOYW1lLnNsaWNlKDEpO1xufVxuXG4vLyBJbml0aWFsaXplIG1ldHJpYyBiYXIgYW5pbWF0aW9ucyB1c2luZyB0aGUgZml4ZWQgZGF0YS13aWR0aCBwYXR0ZXJuXG5mdW5jdGlvbiBpbml0aWFsaXplTWV0cmljQmFyQW5pbWF0aW9ucygpIHtcbiAgICBjb25zdCBtZXRyaWNCYXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ldHJpYy1maWxsJyk7XG4gICAgXG4gICAgbWV0cmljQmFycy5mb3JFYWNoKChiYXIsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIFVzZSB0aGUgZml4ZWQgZGF0YS13aWR0aCBwYXR0ZXJuIGZyb20gdGhlIGNvcnJlY3RlZCBhcHByb2FjaFxuICAgICAgICBjb25zdCB0YXJnZXRXaWR0aCA9IGJhci5kYXRhc2V0LndpZHRoO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRhcmdldFdpZHRoKSB7XG4gICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB3aWR0aCB0byAwJVxuICAgICAgICAgICAgYmFyLnN0eWxlLndpZHRoID0gJzAlJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQW5pbWF0ZSB0byB0YXJnZXQgd2lkdGggd2l0aCBzdGFnZ2VyZWQgZGVsYXlcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJhci5zdHlsZS53aWR0aCA9IHRhcmdldFdpZHRoO1xuICAgICAgICAgICAgfSwgNTAwICsgKGluZGV4ICogMjAwKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBzY3JvbGwtdHJpZ2dlcmVkIGFuaW1hdGlvbnNcbmZ1bmN0aW9uIGluaXRpYWxpemVBbmltYXRpb25zKCkge1xuICAgIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcbiAgICAgICAgdGhyZXNob2xkOiAwLjEsXG4gICAgICAgIHJvb3RNYXJnaW46ICcwcHggMHB4IC01MHB4IDBweCdcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1pbicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgc3BlY2lmaWMgYW5pbWF0aW9ucyBmb3IgZGlmZmVyZW50IGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3N1bW1hcnktY2FyZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTdW1tYXJ5Q2FyZChlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGFnZS1saW5rLWJ1YmJsZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVQYWdlQnViYmxlKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCBvYnNlcnZlck9wdGlvbnMpO1xuICAgIFxuICAgIC8vIE9ic2VydmUgYWxsIGFuaW1hdGFibGUgZWxlbWVudHNcbiAgICBjb25zdCBhbmltYXRhYmxlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAnLnN1bW1hcnktY2FyZCwgLnBhZ2UtbGluay1idWJibGUnXG4gICAgKTtcbiAgICBhbmltYXRhYmxlRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCkpO1xufVxuXG4vLyBBbmltYXRlIHN1bW1hcnkgY2FyZHNcbmZ1bmN0aW9uIGFuaW1hdGVTdW1tYXJ5Q2FyZChjYXJkKSB7XG4gICAgLy8gQWRkIGEgc3VidGxlIGVudHJhbmNlIGVmZmVjdFxuICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoMjBweCknO1xuICAgIGNhcmQuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgwKSc7XG4gICAgICAgIGNhcmQuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgY2FyZC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjZzIGVhc2Utb3V0JztcbiAgICB9LCAxMDApO1xufVxuXG4vLyBBbmltYXRlIHBhZ2UgYnViYmxlIGxpbmtzXG5mdW5jdGlvbiBhbmltYXRlUGFnZUJ1YmJsZShidWJibGUpIHtcbiAgICAvLyBBZGQgYSBzbGlkZS1pbiBlZmZlY3RcbiAgICBidWJibGUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLTIwcHgpJztcbiAgICBidWJibGUuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgYnViYmxlLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDApJztcbiAgICAgICAgYnViYmxlLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgIGJ1YmJsZS5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjRzIGVhc2Utb3V0JztcbiAgICB9LCAxMDApO1xufVxuXG4vLyBFbmhhbmNlIGFjY2Vzc2liaWxpdHlcbmZ1bmN0aW9uIGVuaGFuY2VBY2Nlc3NpYmlsaXR5KCkge1xuICAgIC8vIEFkZCBBUklBIGxhYmVscyB0byBtZXRyaWMgYmFyc1xuICAgIGNvbnN0IG1ldHJpY0JhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljLWZpbGwnKTtcbiAgICBtZXRyaWNCYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgY29uc3QgbWV0cmljSXRlbSA9IGJhci5jbG9zZXN0KCcubWV0cmljLWl0ZW0nKTtcbiAgICAgICAgaWYgKG1ldHJpY0l0ZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gbWV0cmljSXRlbS5xdWVyeVNlbGVjdG9yKCcubWV0cmljLW5hbWUnKT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG1ldHJpY0l0ZW0ucXVlcnlTZWxlY3RvcignLm1ldHJpYy1zY29yZScpPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgncm9sZScsICdwcm9ncmVzc2JhcicpO1xuICAgICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGAke2xhYmVsfTogJHt2YWx1ZX1gKTtcbiAgICAgICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLCB2YWx1ZS5yZXBsYWNlKCclJywgJycpKTtcbiAgICAgICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtaW4nLCAnMCcpO1xuICAgICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1heCcsICcxMDAnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIEFkZCByb2xlIGF0dHJpYnV0ZXMgdG8gY2FyZHNcbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdW1tYXJ5LWNhcmQsIC5wYWdlLWxpbmstYnViYmxlJyk7XG4gICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYXJ0aWNsZScpO1xuICAgICAgICBjYXJkLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEFkZCBBUklBIGxhYmVsIHRvIG92ZXJhbGwgc2NvcmVcbiAgICBjb25zdCBvdmVyYWxsU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmFsbC1zY29yZScpO1xuICAgIGlmIChvdmVyYWxsU2NvcmUpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVWYWx1ZSA9IG92ZXJhbGxTY29yZS5xdWVyeVNlbGVjdG9yKCcuc2NvcmUtcGVyY2VudGFnZScpPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgb3ZlcmFsbFNjb3JlLnNldEF0dHJpYnV0ZSgncm9sZScsICdwcm9ncmVzc2JhcicpO1xuICAgICAgICBvdmVyYWxsU2NvcmUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYE92ZXJhbGwgdGVjaG5pY2FsIHNpbWlsYXJpdHk6ICR7c2NvcmVWYWx1ZX1gKTtcbiAgICAgICAgb3ZlcmFsbFNjb3JlLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIHNjb3JlVmFsdWUucmVwbGFjZSgnJScsICcnKSk7XG4gICAgICAgIG92ZXJhbGxTY29yZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtaW4nLCAnMCcpO1xuICAgICAgICBvdmVyYWxsU2NvcmUuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbWF4JywgJzEwMCcpO1xuICAgIH1cbn1cblxuLy8gRW5oYW5jZWQgaG92ZXIgZWZmZWN0cyBmb3IgaW50ZXJhY3RpdmUgZWxlbWVudHNcbmZ1bmN0aW9uIGVuaGFuY2VJbnRlcmFjdGl2aXR5KCkge1xuICAgIC8vIFBhZ2UgYnViYmxlIGhvdmVyIGVmZmVjdHNcbiAgICBjb25zdCBwYWdlQnViYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdlLWxpbmstYnViYmxlJyk7XG4gICAgcGFnZUJ1YmJsZXMuZm9yRWFjaChidWJibGUgPT4ge1xuICAgICAgICBidWJibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJyb3cgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5idWJibGUtYXJyb3cnKTtcbiAgICAgICAgICAgIGlmIChhcnJvdykge1xuICAgICAgICAgICAgICAgIGFycm93LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDVweCknO1xuICAgICAgICAgICAgICAgIGFycm93LnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgYnViYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFycm93ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuYnViYmxlLWFycm93Jyk7XG4gICAgICAgICAgICBpZiAoYXJyb3cpIHtcbiAgICAgICAgICAgICAgICBhcnJvdy5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwKSc7XG4gICAgICAgICAgICAgICAgYXJyb3cuc3R5bGUub3BhY2l0eSA9ICcwLjUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBTdW1tYXJ5IGNhcmQgaW50ZXJhY3Rpb25zXG4gICAgY29uc3Qgc3VtbWFyeUNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN1bW1hcnktY2FyZCcpO1xuICAgIHN1bW1hcnlDYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoLThweCknO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5ib3hTaGFkb3cgPSAnMCAxMnB4IDM1cHggcmdiYSg0NCwgNjIsIDgwLCAwLjIpJztcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoLTVweCknO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5ib3hTaGFkb3cgPSAnMCA0cHggMjBweCByZ2JhKDQ0LCA2MiwgODAsIDAuMSknO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gUHJpbnQgb3B0aW1pemF0aW9uXG5mdW5jdGlvbiBvcHRpbWl6ZUZvclByaW50KCkge1xuICAgIC8vIEVuc3VyZSBhbGwgbWV0cmljIGJhcnMgYXJlIGZ1bGx5IHZpc2libGUgZm9yIHByaW50aW5nXG4gICAgY29uc3QgbWV0cmljQmFycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXRyaWMtZmlsbCcpO1xuICAgIG1ldHJpY0JhcnMuZm9yRWFjaChiYXIgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRXaWR0aCA9IGJhci5kYXRhc2V0LndpZHRoO1xuICAgICAgICBpZiAodGFyZ2V0V2lkdGgpIHtcbiAgICAgICAgICAgIGJhci5zdHlsZS53aWR0aCA9IHRhcmdldFdpZHRoO1xuICAgICAgICAgICAgYmFyLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBSZW1vdmUgYW5pbWF0aW9ucyBmb3IgcHJpbnRcbiAgICBjb25zdCBhbmltYXRlZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3N0eWxlKj1cInRyYW5zaXRpb25cIl0nKTtcbiAgICBhbmltYXRlZEVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBwcmludCBoYW5kbGluZ1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXByaW50Jywgb3B0aW1pemVGb3JQcmludCk7XG5cbi8vIEV4cG9ydCBmdW5jdGlvbmFsaXR5IGZvciB0ZWNobmljYWwgY29tcGFyaXNvbiBkYXRhXG5mdW5jdGlvbiBleHBvcnRUZWNobmljYWxDb21wYXJpc29uKCkge1xuICAgIGNvbnN0IGNvbXBhcmlzb25EYXRhID0ge1xuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgY29tcGFyaXNvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29tcGFyaXNvbl0nKT8uZ2V0QXR0cmlidXRlKCdkYXRhLWNvbXBhcmlzb24nKSB8fCAnJyxcbiAgICAgICAgb3ZlcmFsbFNjb3JlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUtcGVyY2VudGFnZScpPy50ZXh0Q29udGVudCB8fCAnJyxcbiAgICAgICAgdGVjaG5pY2FsTWV0cmljczoge1xuICAgICAgICAgICAgaHRtbFN0cnVjdHVyZTogJycsXG4gICAgICAgICAgICBtZXRhVGFnczogJycsXG4gICAgICAgICAgICBmcmFtZXdvcmtzOiAnJ1xuICAgICAgICB9LFxuICAgICAgICByaXNrQXNzZXNzbWVudDogJycsXG4gICAgICAgIHJlY29tbWVuZGF0aW9uczogW11cbiAgICB9O1xuICAgIFxuICAgIC8vIEV4dHJhY3QgdGVjaG5pY2FsIG1ldHJpY3NcbiAgICBjb25zdCBtZXRyaWNJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXRyaWMtaXRlbScpO1xuICAgIG1ldHJpY0l0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcubWV0cmljLXNjb3JlJyk/LnRleHRDb250ZW50IHx8ICcnO1xuICAgICAgICBjb25zdCBuYW1lID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcubWV0cmljLW5hbWUnKT8udGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKSB8fCAnJztcbiAgICAgICAgXG4gICAgICAgIGlmIChuYW1lLmluY2x1ZGVzKCdodG1sJykpIHtcbiAgICAgICAgICAgIGNvbXBhcmlzb25EYXRhLnRlY2huaWNhbE1ldHJpY3MuaHRtbFN0cnVjdHVyZSA9IHNjb3JlO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5jbHVkZXMoJ21ldGEnKSkge1xuICAgICAgICAgICAgY29tcGFyaXNvbkRhdGEudGVjaG5pY2FsTWV0cmljcy5tZXRhVGFncyA9IHNjb3JlO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5jbHVkZXMoJ2ZyYW1ld29yaycpKSB7XG4gICAgICAgICAgICBjb21wYXJpc29uRGF0YS50ZWNobmljYWxNZXRyaWNzLmZyYW1ld29ya3MgPSBzY29yZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIEV4dHJhY3QgcmlzayBhc3Nlc3NtZW50XG4gICAgY29uc3Qgcmlza0luZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaXNrLWluZGljYXRvcicpO1xuICAgIGlmIChyaXNrSW5kaWNhdG9yKSB7XG4gICAgICAgIGNvbXBhcmlzb25EYXRhLnJpc2tBc3Nlc3NtZW50ID0gcmlza0luZGljYXRvci50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgXG4gICAgLy8gRXh0cmFjdCByZWNvbW1lbmRhdGlvbnNcbiAgICBjb25zdCByZWNvbW1lbmRhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVjb21tZW5kYXRpb24taXRlbSAucmVjLXRleHQnKTtcbiAgICByZWNvbW1lbmRhdGlvbnMuZm9yRWFjaChyZWMgPT4ge1xuICAgICAgICBjb21wYXJpc29uRGF0YS5yZWNvbW1lbmRhdGlvbnMucHVzaChyZWMudGV4dENvbnRlbnQpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIERvd25sb2FkIGFzIEpTT05cbiAgICBjb25zdCBkYXRhU3RyID0gSlNPTi5zdHJpbmdpZnkoY29tcGFyaXNvbkRhdGEsIG51bGwsIDIpO1xuICAgIGNvbnN0IGRhdGFCbG9iID0gbmV3IEJsb2IoW2RhdGFTdHJdLCB7dHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG4gICAgXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGRhdGFCbG9iKTtcbiAgICBsaW5rLmRvd25sb2FkID0gYHRlY2huaWNhbC1jb21wYXJpc29uLSR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19Lmpzb25gO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG59XG5cbi8vIFBlcmZvcm1hbmNlIG1vbml0b3JpbmdcbmZ1bmN0aW9uIHRyYWNrUGVyZm9ybWFuY2UoKSB7XG4gICAgaWYgKCdwZXJmb3JtYW5jZScgaW4gd2luZG93KSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBsb2FkVGltZSA9IHBlcmZvcm1hbmNlLnRpbWluZy5sb2FkRXZlbnRFbmQgLSBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFRlY2huaWNhbCBjb21wYXJpc29uIHBhZ2UgbG9hZCB0aW1lOiAke2xvYWRUaW1lfW1zYCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFRyYWNrIG1ldHJpYyBiYXIgYW5pbWF0aW9uIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb25TdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uRW5kID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE1ldHJpYyBiYXIgYW5pbWF0aW9ucyBjb21wbGV0ZWQgaW46ICR7YW5pbWF0aW9uRW5kIC0gYW5pbWF0aW9uU3RhcnR9bXNgKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vIFRoZW1lIGRldGVjdGlvbiBhbmQgYWRhcHRhdGlvblxuZnVuY3Rpb24gYWRhcHRUb1N5c3RlbVRoZW1lKCkge1xuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLXRoZW1lJyk7XG4gICAgfVxuICAgIFxuICAgIC8vIExpc3RlbiBmb3IgdGhlbWUgY2hhbmdlc1xuICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIGlmIChlLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay10aGVtZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrLXRoZW1lJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gVXRpbGl0eSBmdW5jdGlvbiB0byBnZXQgc2ltaWxhcml0eSBjbGFzcyBiYXNlZCBvbiBzY29yZVxuZnVuY3Rpb24gZ2V0U2ltaWxhcml0eUNsYXNzKHNjb3JlKSB7XG4gICAgY29uc3QgbnVtZXJpY1Njb3JlID0gdHlwZW9mIHNjb3JlID09PSAnc3RyaW5nJyA/IFxuICAgICAgICBwYXJzZUZsb2F0KHNjb3JlLnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwIDogc2NvcmU7XG4gICAgXG4gICAgaWYgKG51bWVyaWNTY29yZSA+PSAwLjc1KSByZXR1cm4gJ2Vycm9yJzsgICAgICAvLyBIaWdoIHNpbWlsYXJpdHkgPSBiYWRcbiAgICBpZiAobnVtZXJpY1Njb3JlID49IDAuNSkgcmV0dXJuICd3YXJuaW5nJzsgICAgIC8vIE1vZGVyYXRlIHNpbWlsYXJpdHkgPSB3YXJuaW5nXG4gICAgaWYgKG51bWVyaWNTY29yZSA+PSAwLjI1KSByZXR1cm4gJ2dvb2QnOyAgICAgICAvLyBMb3cgc2ltaWxhcml0eSA9IGdvb2RcbiAgICByZXR1cm4gJ2V4Y2VsbGVudCc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZlcnkgbG93IHNpbWlsYXJpdHkgPSBleGNlbGxlbnRcbn1cblxuLy8gSW5pdGlhbGl6ZSBhbGwgZnVuY3Rpb25hbGl0eSB3aGVuIHBhZ2UgbG9hZHNcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBpbml0aWFsaXplUGFnZSgpO1xuICAgIGVuaGFuY2VJbnRlcmFjdGl2aXR5KCk7XG4gICAgdHJhY2tQZXJmb3JtYW5jZSgpO1xuICAgIGFkYXB0VG9TeXN0ZW1UaGVtZSgpO1xufSk7XG5cbi8vIE1ha2UgZnVuY3Rpb25zIGF2YWlsYWJsZSBnbG9iYWxseSBmb3Igb25jbGljayBoYW5kbGVyc1xud2luZG93LmV4cG9ydFRlY2huaWNhbENvbXBhcmlzb24gPSBleHBvcnRUZWNobmljYWxDb21wYXJpc29uOyJdfQ==
