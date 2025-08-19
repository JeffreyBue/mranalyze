(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Visual Comparison JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
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
    'whitepages': 'WhitePages'
  };
  return siteMap[siteName.toLowerCase()] || siteName.charAt(0).toUpperCase() + siteName.slice(1);
}

// Initialize score circles with color coding
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

  // Set grade colors
  var gradeElements = document.querySelectorAll('[data-grade]');
  gradeElements.forEach(function (element) {
    var score = parseFloat(element.getAttribute('data-grade'));
    var color = getScoreColor(score);
    element.style.color = color;
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

// Format visual file names for display
function formatVisualFileNames() {
  // This would be used if we need to format filenames in JavaScript
  // For now, we'll rely on the Mustache helper function
}

// Add staggered animation delays
function addAnimationDelays() {
  var metricCards = document.querySelectorAll('.metric-card');
  metricCards.forEach(function (card, index) {
    card.style.animationDelay = "".concat((index + 1) * 0.1, "s");
  });
  var insightItems = document.querySelectorAll('.insight-item');
  insightItems.forEach(function (item, index) {
    item.style.animationDelay = "".concat((index + 1) * 0.15, "s");
  });
}

// Enhanced hover effects for metric cards
function enhanceMetricCards() {
  var metricCards = document.querySelectorAll('.metric-card');
  metricCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      var fill = this.querySelector('.metric-fill');
      var score = this.querySelector('.metric-score');
      if (fill && score) {
        fill.style.transform = 'scaleY(1.2)';
        score.style.transform = 'scale(1.1)';
      }
    });
    card.addEventListener('mouseleave', function () {
      var fill = this.querySelector('.metric-fill');
      var score = this.querySelector('.metric-score');
      if (fill && score) {
        fill.style.transform = 'scaleY(1)';
        score.style.transform = 'scale(1)';
      }
    });
  });
}

// Initialize intersection observer for animations
function initializeScrollAnimations() {
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        // Trigger metric bar animations
        if (entry.target.classList.contains('metric-card')) {
          var fill = entry.target.querySelector('.metric-fill');
          if (fill && !fill.dataset.animated) {
            setTimeout(function () {
              fill.style.width = fill.style.width; // Trigger animation
              fill.dataset.animated = 'true';
            }, 300);
          }
        }
      }
    });
  }, observerOptions);

  // Observe all animated elements
  var observeElements = document.querySelectorAll('.metric-card, .insight-item, .report-item');
  observeElements.forEach(function (element) {
    return observer.observe(element);
  });
}

// Print optimization
function optimizeForPrint() {
  // Ensure all metric bars are visible at full width
  var metricFills = document.querySelectorAll('.metric-fill');
  metricFills.forEach(function (fill) {
    fill.style.transition = 'none';
  });

  // Expand any collapsed elements
  var reportItems = document.querySelectorAll('.report-item');
  reportItems.forEach(function (item) {
    item.style.display = 'block';
  });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Accessibility enhancements
function enhanceAccessibility() {
  // Add ARIA labels to metric elements
  var metricCards = document.querySelectorAll('.metric-card');
  metricCards.forEach(function (card) {
    var label = card.querySelector('.metric-label').textContent;
    var score = card.querySelector('.metric-score').textContent;
    var fill = card.querySelector('.metric-fill');
    if (fill) {
      fill.setAttribute('role', 'progressbar');
      fill.setAttribute('aria-label', "".concat(label, ": ").concat(score));
      fill.setAttribute('aria-valuenow', score.replace('%', ''));
      fill.setAttribute('aria-valuemin', '0');
      fill.setAttribute('aria-valuemax', '100');
    }
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
  });

  // Add role attributes to insight items
  var insightItems = document.querySelectorAll('.insight-item');
  insightItems.forEach(function (item) {
    item.setAttribute('role', 'article');
    item.setAttribute('tabindex', '0');
  });

  // Enhance link accessibility
  var reportLinks = document.querySelectorAll('.report-link');
  reportLinks.forEach(function (link) {
    var title = link.querySelector('.report-title').textContent;
    link.setAttribute('aria-label', "View detailed visual analysis for ".concat(title));
  });
}

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
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
    window.addEventListener('load', function () {
      var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log("Visual comparison page load time: ".concat(loadTime, "ms"));
    });
  }
}

// Export functionality
function exportComparisonData() {
  var _document$querySelect, _document$querySelect2;
  var comparisonData = {
    timestamp: new Date().toISOString(),
    comparison: ((_document$querySelect = document.querySelector('[data-comparison]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('data-comparison')) || '',
    overallScore: ((_document$querySelect2 = document.querySelector('.score-percentage')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent) || '',
    metrics: {},
    insights: []
  };

  // Extract metric data
  var metricCards = document.querySelectorAll('.metric-card');
  metricCards.forEach(function (card) {
    var _card$querySelector, _card$querySelector2;
    var label = ((_card$querySelector = card.querySelector('.metric-label')) === null || _card$querySelector === void 0 ? void 0 : _card$querySelector.textContent) || '';
    var score = ((_card$querySelector2 = card.querySelector('.metric-score')) === null || _card$querySelector2 === void 0 ? void 0 : _card$querySelector2.textContent) || '';
    var metricKey = label.toLowerCase().replace(/\s+/g, '_');
    comparisonData.metrics[metricKey] = score;
  });

  // Extract insights
  var insightItems = document.querySelectorAll('.insight-text');
  insightItems.forEach(function (item) {
    comparisonData.insights.push(item.textContent);
  });

  // Download as JSON
  var dataStr = JSON.stringify(comparisonData, null, 2);
  var dataBlob = new Blob([dataStr], {
    type: 'application/json'
  });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = "visual-comparison-".concat(new Date().toISOString().split('T')[0], ".json");
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
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (e.matches) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  });
}

// Metric comparison highlighting
function highlightMetricComparisons() {
  var metricCards = document.querySelectorAll('.metric-card');
  var scores = [];

  // Collect all scores
  metricCards.forEach(function (card) {
    var scoreText = card.querySelector('.metric-score').textContent;
    var score = parseFloat(scoreText.replace('%', ''));
    scores.push({
      card: card,
      score: score
    });
  });

  // Find highest and lowest scores
  var sortedScores = scores.sort(function (a, b) {
    return b.score - a.score;
  });
  var highest = sortedScores[0];
  var lowest = sortedScores[sortedScores.length - 1];

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
document.addEventListener('DOMContentLoaded', function () {
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzcmMvdmlzdWFsX2NvbXBhcmlzb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBO0FBQ0EsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsY0FBYyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsU0FBUyxjQUFjLENBQUEsRUFBRztFQUN0QjtFQUNBLGdCQUFnQixDQUFDLENBQUM7O0VBRWxCO0VBQ0EscUJBQXFCLENBQUMsQ0FBQzs7RUFFdkI7RUFDQSxzQkFBc0IsQ0FBQyxDQUFDOztFQUV4QjtFQUNBLGtCQUFrQixDQUFDLENBQUM7O0VBRXBCO0VBQ0EscUJBQXFCLENBQUMsQ0FBQztBQUMzQjs7QUFFQTtBQUNBLFNBQVMsZ0JBQWdCLENBQUEsRUFBRztFQUN4QixJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztFQUN2RSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLEVBQUk7SUFDakMsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztJQUN4RCxJQUFJLFNBQVMsRUFBRTtNQUNYLElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztNQUNoQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFO1FBQy9DLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLE1BQU07UUFDYixHQUFHLEVBQUUsU0FBUztRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTSxFQUFFO01BQ1osQ0FBQyxDQUFDO01BQ0YsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTO0lBQ25DO0VBQ0osQ0FBQyxDQUFDO0FBQ047O0FBRUE7QUFDQSxTQUFTLHFCQUFxQixDQUFB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QUFFLDBCQUEwQixDQUFDO0VBQ2xFO0VBRUEsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUU7SUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztJQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsMkNBQTJDLENBQUM7RUFDbEY7QUFDSjs7QUFFQTtBQUNBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELGNBQWMsQ0FBQyxDQUFDO0VBQ2hCLDBCQUEwQixDQUFDLENBQUM7RUFDNUIsb0JBQW9CLENBQUMsQ0FBQztFQUN0QixrQkFBa0IsQ0FBQyxDQUFDO0VBQ3BCLGdCQUFnQixDQUFDLENBQUM7RUFDbEIsa0JBQWtCLENBQUMsQ0FBQztFQUNwQiwwQkFBMEIsQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQzs7QUFFRjtBQUNBLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBWaXN1YWwgQ29tcGFyaXNvbiBKYXZhU2NyaXB0XG5cbi8vIEluaXRpYWxpemUgcGFnZSB3aGVuIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBpbml0aWFsaXplUGFnZSgpO1xufSk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQYWdlKCkge1xuICAgIC8vIEZvcm1hdCB0aW1lc3RhbXBzXG4gICAgZm9ybWF0VGltZXN0YW1wcygpO1xuICAgIFxuICAgIC8vIEZvcm1hdCBjb21wYXJpc29uIG5hbWVzXG4gICAgZm9ybWF0Q29tcGFyaXNvbk5hbWVzKCk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSBzY29yZSBjaXJjbGVzXG4gICAgaW5pdGlhbGl6ZVNjb3JlQ2lyY2xlcygpO1xuICAgIFxuICAgIC8vIEFkZCBhbmltYXRpb24gZGVsYXlzXG4gICAgYWRkQW5pbWF0aW9uRGVsYXlzKCk7XG4gICAgXG4gICAgLy8gRm9ybWF0IHZpc3VhbCBmaWxlIG5hbWVzXG4gICAgZm9ybWF0VmlzdWFsRmlsZU5hbWVzKCk7XG59XG5cbi8vIEZvcm1hdCB0aW1lc3RhbXBzIHRvIHJlYWRhYmxlIGRhdGVzXG5mdW5jdGlvbiBmb3JtYXRUaW1lc3RhbXBzKCkge1xuICAgIGNvbnN0IHRpbWVzdGFtcEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGltZXN0YW1wXScpO1xuICAgIHRpbWVzdGFtcEVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRpbWVzdGFtcCcpO1xuICAgICAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgICAgICAgICAgbWludXRlOiAnMi1kaWdpdCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBGb3JtYXQgY29tcGFyaXNvbiBuYW1lcyBmcm9tIHRlY2huaWNhbCBmb3JtYXRcbmZ1bmN0aW9uIGZvcm1hdENvbXBhcmlzb25OYW1lcygpIHtcbiAgICBjb25zdCBjb21wYXJpc29uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb21wYXJpc29uXScpO1xuICAgIGNvbXBhcmlzb25FbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCBjb21wYXJpc29uID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29tcGFyaXNvbicpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSBmb3JtYXRDb21wYXJpc29uTmFtZShjb21wYXJpc29uKTtcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZDtcbiAgICB9KTtcbn1cblxuLy8gRm9ybWF0IGNvbXBhcmlzb24gc3RyaW5nIHRvIHJlYWRhYmxlIGZvcm1hdFxuZnVuY3Rpb24gZm9ybWF0Q29tcGFyaXNvbk5hbWUoY29tcGFyaXNvbikge1xuICAgIGlmICghY29tcGFyaXNvbikgcmV0dXJuICcnO1xuICAgIFxuICAgIC8vIFNwbGl0IGJ5IF92c18gYW5kIGZvcm1hdCBlYWNoIHNpdGUgbmFtZVxuICAgIGNvbnN0IHBhcnRzID0gY29tcGFyaXNvbi5zcGxpdCgnX3ZzXycpO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29uc3Qgc2l0ZTEgPSBmb3JtYXRTaXRlTmFtZShwYXJ0c1swXSk7XG4gICAgICAgIGNvbnN0IHNpdGUyID0gZm9ybWF0U2l0ZU5hbWUocGFydHNbMV0pO1xuICAgICAgICByZXR1cm4gYCR7c2l0ZTF9IHZzICR7c2l0ZTJ9YDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGNvbXBhcmlzb247XG59XG5cbi8vIEZvcm1hdCB0ZWNobmljYWwgc2l0ZSBuYW1lIHRvIHJlYWRhYmxlIGZvcm1hdFxuZnVuY3Rpb24gZm9ybWF0U2l0ZU5hbWUodGVjaG5pY2FsTmFtZSkge1xuICAgIGlmICghdGVjaG5pY2FsTmFtZSkgcmV0dXJuICcnO1xuICAgIFxuICAgIC8vIFJlbW92ZSB0aW1lc3RhbXAgYW5kIGNvbnZlcnQgdG8gcmVhZGFibGUgZm9ybWF0XG4gICAgY29uc3Qgc2l0ZU5hbWUgPSB0ZWNobmljYWxOYW1lLnNwbGl0KCdfJylbMF07XG4gICAgXG4gICAgLy8gQ29udmVydCB0byB0aXRsZSBjYXNlIGFuZCBoYW5kbGUgY29tbW9uIHNpdGUgbmFtZXNcbiAgICBjb25zdCBzaXRlTWFwID0ge1xuICAgICAgICAnaW5zdGFudGNoZWNrbWF0ZSc6ICdJbnN0YW50Q2hlY2ttYXRlJyxcbiAgICAgICAgJ3RydXRoZmluZGVyJzogJ1RydXRoRmluZGVyJyxcbiAgICAgICAgJ2ludGVsaXVzJzogJ0ludGVsaXVzJyxcbiAgICAgICAgJ3doaXRlcGFnZXMnOiAnV2hpdGVQYWdlcydcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiBzaXRlTWFwW3NpdGVOYW1lLnRvTG93ZXJDYXNlKCldIHx8IFxuICAgICAgICAgICBzaXRlTmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHNpdGVOYW1lLnNsaWNlKDEpO1xufVxuXG4vLyBJbml0aWFsaXplIHNjb3JlIGNpcmNsZXMgd2l0aCBjb2xvciBjb2RpbmdcbmZ1bmN0aW9uIGluaXRpYWxpemVTY29yZUNpcmNsZXMoKSB7XG4gICAgY29uc3Qgc2NvcmVDaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjb3JlLWNpcmNsZVtkYXRhLXNjb3JlXScpO1xuICAgIHNjb3JlQ2lyY2xlcy5mb3JFYWNoKGNpcmNsZSA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gcGFyc2VGbG9hdChjaXJjbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXNjb3JlJykpO1xuICAgICAgICBjb25zdCBjb2xvciA9IGdldFNjb3JlQ29sb3Ioc2NvcmUpO1xuICAgICAgICBjaXJjbGUuc3R5bGUuYm9yZGVyQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBwdWxzaW5nIGFuaW1hdGlvbiBmb3IgdmVyeSBoaWdoIG9yIHZlcnkgbG93IHNjb3Jlc1xuICAgICAgICBpZiAoc2NvcmUgPiAwLjkgfHwgc2NvcmUgPCAwLjMpIHtcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5hbmltYXRpb24gPSAncHVsc2UgMnMgaW5maW5pdGUnO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gU2V0IGdyYWRlIGNvbG9yc1xuICAgIGNvbnN0IGdyYWRlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ncmFkZV0nKTtcbiAgICBncmFkZUVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gcGFyc2VGbG9hdChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1ncmFkZScpKTtcbiAgICAgICAgY29uc3QgY29sb3IgPSBnZXRTY29yZUNvbG9yKHNjb3JlKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IGNvbG9yO1xuICAgIH0pO1xufVxuXG4vLyBHZXQgY29sb3IgYmFzZWQgb24gc2NvcmVcbmZ1bmN0aW9uIGdldFNjb3JlQ29sb3Ioc2NvcmUpIHtcbiAgICBpZiAoc2NvcmUgPj0gMC45KSByZXR1cm4gJyNlNzRjM2MnOyAgICAgIC8vIFJlZCAtIEhpZ2ggc2ltaWxhcml0eVxuICAgIGlmIChzY29yZSA+PSAwLjgpIHJldHVybiAnI2YzOWMxMic7ICAgICAgLy8gT3JhbmdlIC0gR29vZCBzaW1pbGFyaXR5XG4gICAgaWYgKHNjb3JlID49IDAuNykgcmV0dXJuICcjZjFjNDBmJzsgICAgICAvLyBZZWxsb3cgLSBNb2RlcmF0ZSBzaW1pbGFyaXR5XG4gICAgaWYgKHNjb3JlID49IDAuNikgcmV0dXJuICcjYzlmMTBmJzsgICAgICAvLyBZZWxsb3dpc2hHcmVlbiAtIE1vZGVyYXRlLWxvdyBzaW1pbGFyaXR5XG4gICAgcmV0dXJuICcjMjdhZTYwJzsgICAgICAgICAgICAgICAgICAgICAgICAvLyBHcmVlbiAtIExvdyBzaW1pbGFyaXR5XG59XG5cbi8vIEZvcm1hdCB2aXN1YWwgZmlsZSBuYW1lcyBmb3IgZGlzcGxheVxuZnVuY3Rpb24gZm9ybWF0VmlzdWFsRmlsZU5hbWVzKCkge1xuICAgIC8vIFRoaXMgd291bGQgYmUgdXNlZCBpZiB3ZSBuZWVkIHRvIGZvcm1hdCBmaWxlbmFtZXMgaW4gSmF2YVNjcmlwdFxuICAgIC8vIEZvciBub3csIHdlJ2xsIHJlbHkgb24gdGhlIE11c3RhY2hlIGhlbHBlciBmdW5jdGlvblxufVxuXG4vLyBBZGQgc3RhZ2dlcmVkIGFuaW1hdGlvbiBkZWxheXNcbmZ1bmN0aW9uIGFkZEFuaW1hdGlvbkRlbGF5cygpIHtcbiAgICBjb25zdCBtZXRyaWNDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXRyaWMtY2FyZCcpO1xuICAgIG1ldHJpY0NhcmRzLmZvckVhY2goKGNhcmQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNhcmQuc3R5bGUuYW5pbWF0aW9uRGVsYXkgPSBgJHsoaW5kZXggKyAxKSAqIDAuMX1zYDtcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBpbnNpZ2h0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zaWdodC1pdGVtJyk7XG4gICAgaW5zaWdodEl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGl0ZW0uc3R5bGUuYW5pbWF0aW9uRGVsYXkgPSBgJHsoaW5kZXggKyAxKSAqIDAuMTV9c2A7XG4gICAgfSk7XG59XG5cbi8vIEVuaGFuY2VkIGhvdmVyIGVmZmVjdHMgZm9yIG1ldHJpYyBjYXJkc1xuZnVuY3Rpb24gZW5oYW5jZU1ldHJpY0NhcmRzKCkge1xuICAgIGNvbnN0IG1ldHJpY0NhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1ldHJpYy1jYXJkJyk7XG4gICAgbWV0cmljQ2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWV0cmljLWZpbGwnKTtcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWV0cmljLXNjb3JlJyk7XG4gICAgICAgICAgICBpZiAoZmlsbCAmJiBzY29yZSkge1xuICAgICAgICAgICAgICAgIGZpbGwuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlWSgxLjIpJztcbiAgICAgICAgICAgICAgICBzY29yZS5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxsID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWV0cmljLWZpbGwnKTtcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWV0cmljLXNjb3JlJyk7XG4gICAgICAgICAgICBpZiAoZmlsbCAmJiBzY29yZSkge1xuICAgICAgICAgICAgICAgIGZpbGwuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlWSgxKSc7XG4gICAgICAgICAgICAgICAgc2NvcmUuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgaW50ZXJzZWN0aW9uIG9ic2VydmVyIGZvciBhbmltYXRpb25zXG5mdW5jdGlvbiBpbml0aWFsaXplU2Nyb2xsQW5pbWF0aW9ucygpIHtcbiAgICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XG4gICAgICAgIHRocmVzaG9sZDogMC4xLFxuICAgICAgICByb290TWFyZ2luOiAnMHB4IDBweCAtNTBweCAwcHgnXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtaW4nKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIG1ldHJpYyBiYXIgYW5pbWF0aW9uc1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZXRyaWMtY2FyZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGwgPSBlbnRyeS50YXJnZXQucXVlcnlTZWxlY3RvcignLm1ldHJpYy1maWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxsICYmICFmaWxsLmRhdGFzZXQuYW5pbWF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGwuc3R5bGUud2lkdGggPSBmaWxsLnN0eWxlLndpZHRoOyAvLyBUcmlnZ2VyIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGwuZGF0YXNldC5hbmltYXRlZCA9ICd0cnVlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIG9ic2VydmVyT3B0aW9ucyk7XG4gICAgXG4gICAgLy8gT2JzZXJ2ZSBhbGwgYW5pbWF0ZWQgZWxlbWVudHNcbiAgICBjb25zdCBvYnNlcnZlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljLWNhcmQsIC5pbnNpZ2h0LWl0ZW0sIC5yZXBvcnQtaXRlbScpO1xuICAgIG9ic2VydmVFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KSk7XG59XG5cbi8vIFByaW50IG9wdGltaXphdGlvblxuZnVuY3Rpb24gb3B0aW1pemVGb3JQcmludCgpIHtcbiAgICAvLyBFbnN1cmUgYWxsIG1ldHJpYyBiYXJzIGFyZSB2aXNpYmxlIGF0IGZ1bGwgd2lkdGhcbiAgICBjb25zdCBtZXRyaWNGaWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXRyaWMtZmlsbCcpO1xuICAgIG1ldHJpY0ZpbGxzLmZvckVhY2goZmlsbCA9PiB7XG4gICAgICAgIGZpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcbiAgICB9KTtcbiAgICBcbiAgICAvLyBFeHBhbmQgYW55IGNvbGxhcHNlZCBlbGVtZW50c1xuICAgIGNvbnN0IHJlcG9ydEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlcG9ydC1pdGVtJyk7XG4gICAgcmVwb3J0SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBwcmludCBoYW5kbGluZ1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXByaW50Jywgb3B0aW1pemVGb3JQcmludCk7XG5cbi8vIEFjY2Vzc2liaWxpdHkgZW5oYW5jZW1lbnRzXG5mdW5jdGlvbiBlbmhhbmNlQWNjZXNzaWJpbGl0eSgpIHtcbiAgICAvLyBBZGQgQVJJQSBsYWJlbHMgdG8gbWV0cmljIGVsZW1lbnRzXG4gICAgY29uc3QgbWV0cmljQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljLWNhcmQnKTtcbiAgICBtZXRyaWNDYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICBjb25zdCBsYWJlbCA9IGNhcmQucXVlcnlTZWxlY3RvcignLm1ldHJpYy1sYWJlbCcpLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBzY29yZSA9IGNhcmQucXVlcnlTZWxlY3RvcignLm1ldHJpYy1zY29yZScpLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBmaWxsID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcubWV0cmljLWZpbGwnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgICAgICBmaWxsLnNldEF0dHJpYnV0ZSgncm9sZScsICdwcm9ncmVzc2JhcicpO1xuICAgICAgICAgICAgZmlsbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgJHtsYWJlbH06ICR7c2NvcmV9YCk7XG4gICAgICAgICAgICBmaWxsLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIHNjb3JlLnJlcGxhY2UoJyUnLCAnJykpO1xuICAgICAgICAgICAgZmlsbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtaW4nLCAnMCcpO1xuICAgICAgICAgICAgZmlsbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtYXgnLCAnMTAwJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNhcmQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FydGljbGUnKTtcbiAgICAgICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBBZGQgcm9sZSBhdHRyaWJ1dGVzIHRvIGluc2lnaHQgaXRlbXNcbiAgICBjb25zdCBpbnNpZ2h0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zaWdodC1pdGVtJyk7XG4gICAgaW5zaWdodEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FydGljbGUnKTtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBFbmhhbmNlIGxpbmsgYWNjZXNzaWJpbGl0eVxuICAgIGNvbnN0IHJlcG9ydExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlcG9ydC1saW5rJyk7XG4gICAgcmVwb3J0TGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBsaW5rLnF1ZXJ5U2VsZWN0b3IoJy5yZXBvcnQtdGl0bGUnKS50ZXh0Q29udGVudDtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgVmlldyBkZXRhaWxlZCB2aXN1YWwgYW5hbHlzaXMgZm9yICR7dGl0bGV9YCk7XG4gICAgfSk7XG59XG5cbi8vIEtleWJvYXJkIG5hdmlnYXRpb24gc3VwcG9ydFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAvLyBFU0Mga2V5IGZ1bmN0aW9uYWxpdHkgaWYgbmVlZGVkXG4gICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAvLyBDbG9zZSBhbnkgZXhwYW5kZWQgZWxlbWVudHMgb3IgbW9kYWxzXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgIH1cbiAgICBcbiAgICAvLyBFbnRlciBrZXkgdG8gYWN0aXZhdGUgZm9jdXNlZCBlbGVtZW50c1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21ldHJpYy1jYXJkJykpIHtcbiAgICAgICAgLy8gQ291bGQgdHJpZ2dlciBkZXRhaWxlZCBtZXRyaWMgdmlldyBpZiBpbXBsZW1lbnRlZFxuICAgICAgICBjb25zb2xlLmxvZygnTWV0cmljIGNhcmQgYWN0aXZhdGVkOicsIGUudGFyZ2V0KTtcbiAgICB9XG59KTtcblxuLy8gUGVyZm9ybWFuY2UgbW9uaXRvcmluZ1xuZnVuY3Rpb24gdHJhY2tQZXJmb3JtYW5jZSgpIHtcbiAgICBpZiAoJ3BlcmZvcm1hbmNlJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvYWRUaW1lID0gcGVyZm9ybWFuY2UudGltaW5nLmxvYWRFdmVudEVuZCAtIHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVmlzdWFsIGNvbXBhcmlzb24gcGFnZSBsb2FkIHRpbWU6ICR7bG9hZFRpbWV9bXNgKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLyBFeHBvcnQgZnVuY3Rpb25hbGl0eVxuZnVuY3Rpb24gZXhwb3J0Q29tcGFyaXNvbkRhdGEoKSB7XG4gICAgY29uc3QgY29tcGFyaXNvbkRhdGEgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBjb21wYXJpc29uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21wYXJpc29uXScpPy5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29tcGFyaXNvbicpIHx8ICcnLFxuICAgICAgICBvdmVyYWxsU2NvcmU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZS1wZXJjZW50YWdlJyk/LnRleHRDb250ZW50IHx8ICcnLFxuICAgICAgICBtZXRyaWNzOiB7fSxcbiAgICAgICAgaW5zaWdodHM6IFtdXG4gICAgfTtcbiAgICBcbiAgICAvLyBFeHRyYWN0IG1ldHJpYyBkYXRhXG4gICAgY29uc3QgbWV0cmljQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljLWNhcmQnKTtcbiAgICBtZXRyaWNDYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICBjb25zdCBsYWJlbCA9IGNhcmQucXVlcnlTZWxlY3RvcignLm1ldHJpYy1sYWJlbCcpPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgY29uc3Qgc2NvcmUgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5tZXRyaWMtc2NvcmUnKT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgIGNvbnN0IG1ldHJpY0tleSA9IGxhYmVsLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCAnXycpO1xuICAgICAgICBjb21wYXJpc29uRGF0YS5tZXRyaWNzW21ldHJpY0tleV0gPSBzY29yZTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBFeHRyYWN0IGluc2lnaHRzXG4gICAgY29uc3QgaW5zaWdodEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluc2lnaHQtdGV4dCcpO1xuICAgIGluc2lnaHRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb21wYXJpc29uRGF0YS5pbnNpZ2h0cy5wdXNoKGl0ZW0udGV4dENvbnRlbnQpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIERvd25sb2FkIGFzIEpTT05cbiAgICBjb25zdCBkYXRhU3RyID0gSlNPTi5zdHJpbmdpZnkoY29tcGFyaXNvbkRhdGEsIG51bGwsIDIpO1xuICAgIGNvbnN0IGRhdGFCbG9iID0gbmV3IEJsb2IoW2RhdGFTdHJdLCB7dHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG4gICAgXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGRhdGFCbG9iKTtcbiAgICBsaW5rLmRvd25sb2FkID0gYHZpc3VhbC1jb21wYXJpc29uLSR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19Lmpzb25gO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG59XG5cbi8vIFRoZW1lIGFkYXB0YXRpb25cbmZ1bmN0aW9uIGFkYXB0VG9TeXN0ZW1UaGVtZSgpIHtcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay10aGVtZScpO1xuICAgIH1cbiAgICBcbiAgICAvLyBMaXN0ZW4gZm9yIHRoZW1lIGNoYW5nZXNcbiAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBpZiAoZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstdGhlbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGFyay10aGVtZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIE1ldHJpYyBjb21wYXJpc29uIGhpZ2hsaWdodGluZ1xuZnVuY3Rpb24gaGlnaGxpZ2h0TWV0cmljQ29tcGFyaXNvbnMoKSB7XG4gICAgY29uc3QgbWV0cmljQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWV0cmljLWNhcmQnKTtcbiAgICBjb25zdCBzY29yZXMgPSBbXTtcbiAgICBcbiAgICAvLyBDb2xsZWN0IGFsbCBzY29yZXNcbiAgICBtZXRyaWNDYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICBjb25zdCBzY29yZVRleHQgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5tZXRyaWMtc2NvcmUnKS50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSBwYXJzZUZsb2F0KHNjb3JlVGV4dC5yZXBsYWNlKCclJywgJycpKTtcbiAgICAgICAgc2NvcmVzLnB1c2goeyBjYXJkLCBzY29yZSB9KTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBGaW5kIGhpZ2hlc3QgYW5kIGxvd2VzdCBzY29yZXNcbiAgICBjb25zdCBzb3J0ZWRTY29yZXMgPSBzY29yZXMuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuICAgIGNvbnN0IGhpZ2hlc3QgPSBzb3J0ZWRTY29yZXNbMF07XG4gICAgY29uc3QgbG93ZXN0ID0gc29ydGVkU2NvcmVzW3NvcnRlZFNjb3Jlcy5sZW5ndGggLSAxXTtcbiAgICBcbiAgICAvLyBBZGQgdmlzdWFsIGluZGljYXRvcnNcbiAgICBpZiAoaGlnaGVzdCAmJiBoaWdoZXN0LnNjb3JlID4gODApIHtcbiAgICAgICAgaGlnaGVzdC5jYXJkLmNsYXNzTGlzdC5hZGQoJ2hpZ2hlc3Qtc2NvcmUnKTtcbiAgICAgICAgaGlnaGVzdC5jYXJkLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnSGlnaGVzdCBzaW1pbGFyaXR5IHNjb3JlJyk7XG4gICAgfVxuICAgIFxuICAgIGlmIChsb3dlc3QgJiYgbG93ZXN0LnNjb3JlIDwgNTApIHtcbiAgICAgICAgbG93ZXN0LmNhcmQuY2xhc3NMaXN0LmFkZCgnbG93ZXN0LXNjb3JlJyk7XG4gICAgICAgIGxvd2VzdC5jYXJkLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnTG93ZXN0IHNpbWlsYXJpdHkgc2NvcmUgLSBuZWVkcyBhdHRlbnRpb24nKTtcbiAgICB9XG59XG5cbi8vIEluaXRpYWxpemUgYWxsIGZ1bmN0aW9uYWxpdHlcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBpbml0aWFsaXplUGFnZSgpO1xuICAgIGluaXRpYWxpemVTY3JvbGxBbmltYXRpb25zKCk7XG4gICAgZW5oYW5jZUFjY2Vzc2liaWxpdHkoKTtcbiAgICBlbmhhbmNlTWV0cmljQ2FyZHMoKTtcbiAgICB0cmFja1BlcmZvcm1hbmNlKCk7XG4gICAgYWRhcHRUb1N5c3RlbVRoZW1lKCk7XG4gICAgaGlnaGxpZ2h0TWV0cmljQ29tcGFyaXNvbnMoKTtcbn0pO1xuXG4vLyBNYWtlIGZ1bmN0aW9ucyBhdmFpbGFibGUgZ2xvYmFsbHlcbndpbmRvdy5leHBvcnRDb21wYXJpc29uRGF0YSA9IGV4cG9ydENvbXBhcmlzb25EYXRhOyJdfQ==
