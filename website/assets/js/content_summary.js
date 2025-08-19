(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Content Master Summary JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
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

// Calculate average scores for each algorithm
function calculateAlgorithmAverages() {
  var algorithmData = {
    jaccard: [],
    cosine: [],
    fingerprint: [],
    semantic: [],
    topic: []
  };

  // Collect all scores for each algorithm
  var metricCards = document.querySelectorAll('.similarity-card');
  metricCards.forEach(function (card) {
    var metrics = extractMetricsFromCard(card);
    if (metrics) {
      algorithmData.jaccard.push(metrics.jaccard);
      algorithmData.cosine.push(metrics.cosine);
      algorithmData.fingerprint.push(metrics.fingerprint);
      algorithmData.semantic.push(metrics.semantic);
      algorithmData.topic.push(metrics.topic);
    }
  });

  // Calculate and display averages
  Object.keys(algorithmData).forEach(function (algorithm) {
    var scores = algorithmData[algorithm];
    if (scores.length > 0) {
      var average = scores.reduce(function (sum, score) {
        return sum + score;
      }, 0) / scores.length;
      var avgElement = document.getElementById("".concat(algorithm, "-avg"));
      if (avgElement) {
        avgElement.textContent = Math.round(average * 100) + '%';

        // Add color coding based on similarity level
        var colorClass = getSimilarityClass(average);
        avgElement.className = "algorithm-avg ".concat(colorClass);
      }
    }
  });
}

// Extract metrics from a similarity card
function extractMetricsFromCard(card) {
  var metricValues = card.querySelectorAll('.metric-value');
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
    var countElement = document.querySelector("#".concat(risk, "-count .risk-number"));
    if (countElement) {
      countElement.textContent = riskCounts[risk];
      countElement.className = "risk-number ".concat(risk);
    }
  });
}

// Calculate algorithm performance metrics
function calculateAlgorithmPerformance() {
  var algorithms = ['jaccard', 'cosine', 'fingerprint', 'semantic', 'topic'];
  var algorithmAverages = {};

  // Get average scores for each algorithm
  algorithms.forEach(function (algorithm) {
    var avgElement = document.getElementById("".concat(algorithm, "-avg"));
    if (avgElement) {
      var score = parseFloat(avgElement.textContent.replace('%', '')) / 100;
      algorithmAverages[algorithm] = score;
    }
  });

  // Find most and least sensitive algorithms
  var mostSensitive = '';
  var leastSensitive = '';
  var highestScore = -1;
  var lowestScore = 2;
  Object.keys(algorithmAverages).forEach(function (algorithm) {
    var score = algorithmAverages[algorithm];
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
  var mostSensitiveElement = document.getElementById('most-sensitive');
  var leastSensitiveElement = document.getElementById('least-sensitive');
  var bestDetectorElement = document.getElementById('best-detector');
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
  var comparisons = document.querySelectorAll('.similarity-card');
  var highestSimilarity = 0;
  var topConcernComparison = '';
  var lowestSimilarity = 1;
  var mostUniqueComparison = '';
  comparisons.forEach(function (card) {
    var scoreElement = card.querySelector('.overall-score .score-number');
    var titleElement = card.querySelector('.comparison-title');
    if (scoreElement && titleElement) {
      var score = parseFloat(scoreElement.textContent.replace('%', '')) / 100;
      var title = titleElement.textContent;
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
  var topConcernElement = document.getElementById('top-concern');
  var uniqueContentElement = document.getElementById('unique-content');
  var clusterAnalysisElement = document.getElementById('cluster-analysis');
  if (topConcernElement && topConcernComparison) {
    var formattedComparison = formatComparisonName(topConcernComparison);
    topConcernElement.textContent = "".concat(formattedComparison, " shows highest similarity (").concat(Math.round(highestSimilarity * 100), "%)");
  }
  if (uniqueContentElement && mostUniqueComparison) {
    var sites = mostUniqueComparison.split('_vs_');
    if (sites.length === 2) {
      var site1 = formatSiteName(sites[0]);
      var site2 = formatSiteName(sites[1]);
      uniqueContentElement.textContent = "".concat(site1, " and ").concat(site2, " show good content uniqueness");
    }
  }
  if (clusterAnalysisElement) {
    // Count high similarity pairs (>50%)
    var highSimilarityCount = 0;
    comparisons.forEach(function (card) {
      var scoreElement = card.querySelector('.overall-score .score-number');
      if (scoreElement) {
        var score = parseFloat(scoreElement.textContent.replace('%', '')) / 100;
        if (score > 0.5) {
          highSimilarityCount++;
        }
      }
    });
    clusterAnalysisElement.textContent = "".concat(highSimilarityCount, " site pairs show concerning similarity levels");
  }
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

// Format algorithm names for display
function formatAlgorithmName(algorithm) {
  var algorithmNames = {
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
  var animatableElements = document.querySelectorAll('.similarity-card, .insight-card, .algorithm-card');
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
      console.log("Animating bar ".concat(index + 1, " to width: ").concat(targetWidth));
      bar.style.width = '0%';
      setTimeout(function () {
        bar.style.width = targetWidth;
      }, 250);
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
  var cards = document.querySelectorAll('.similarity-card, .insight-card, .algorithm-card');
  cards.forEach(function (card) {
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
  });

  // Enhance tooltip accessibility
  var tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
  tooltipTriggers.forEach(function (trigger) {
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-label', 'Show algorithm explanation');
    trigger.setAttribute('tabindex', '0');

    // Add keyboard support
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var tooltipId = this.getAttribute('data-tooltip');
        showTooltip(tooltipId, {
          clientX: this.offsetLeft,
          clientY: this.offsetTop
        });
      }
    });
  });
}

// Export functionality for analysis data
function exportContentAnalysis() {
  var analysisData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalComparisons: document.querySelectorAll('.similarity-card').length,
      algorithms: ['jaccard', 'cosine', 'fingerprint', 'semantic', 'topic'],
      riskAssessment: {}
    },
    comparisons: []
  };

  // Extract risk assessment data
  var riskLevels = ['critical', 'high', 'moderate', 'low'];
  riskLevels.forEach(function (level) {
    var countElement = document.querySelector("#".concat(level, "-count .risk-number"));
    analysisData.summary.riskAssessment[level] = countElement ? parseInt(countElement.textContent) : 0;
  });

  // Extract comparison data
  var comparisonCards = document.querySelectorAll('.similarity-card');
  comparisonCards.forEach(function (card) {
    var _card$querySelector, _card$querySelector2;
    var title = ((_card$querySelector = card.querySelector('.comparison-title')) === null || _card$querySelector === void 0 ? void 0 : _card$querySelector.textContent) || '';
    var overallScore = ((_card$querySelector2 = card.querySelector('.overall-score .score-number')) === null || _card$querySelector2 === void 0 ? void 0 : _card$querySelector2.textContent) || '';
    var metrics = extractMetricsFromCard(card);
    analysisData.comparisons.push({
      comparison: title,
      overallScore: overallScore,
      metrics: metrics
    });
  });

  // Download as JSON
  var dataStr = JSON.stringify(analysisData, null, 2);
  var dataBlob = new Blob([dataStr], {
    type: 'application/json'
  });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = "content-analysis-".concat(new Date().toISOString().split('T')[0], ".json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', function () {
      var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log("Content analysis page load time: ".concat(loadTime, "ms"));
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
window.exportContentAnalysis = exportContentAnalysis;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzcmMvY29udGVudF9zdW1tYXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELGNBQWMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLFNBQVMsY0FBYyxDQUFBLEVBQUc7RUFDdEI7RUFDQSxnQkFBZ0IsQ0FBQyxDQUFDOztFQUVsQjtFQUNBLDBCQUEwQixDQUFDLENBQUM7O0VBRTVCO0VBQ0EsdUJBQXVCLENBQUMsQ0FBQzs7RUFFekI7RUFDQSw2QkFBNkIsQ0FBQyxDQUFDOztFQUUvQjtFQUNBLHVCQUF1QixDQUFDLENBQUM7O0VBRXpCO0VBQ0EscUJBQXFCLENBQUMsQ0FBQzs7RUFFdkI7RUFDQSxrQkFBa0IsQ0FBQyxDQUFDOztFQUVwQjtFQUNBLG9CQUFvQixDQUFDLENBQUM7O0VBRXRCO0VBQ0Esb0JBQW9CLENBQUMsQ0FBQztBQUMxQjs7QUFFQTtBQUNBLFNBQVMsZ0JBQWdCLENBQUEsRUFBRztFQUN4QixJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztFQUN2RSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLEVBQUk7SUFDakMsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztJQUN4RCxJQUFJLFNBQVMsRUFBRTtNQUNYLElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztNQUNoQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFO1FBQy9DLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLE1BQU07UUFDYixHQUFHLEVBQUUsU0FBUztRQUNkLElBQUksRUFBRSxTQUFT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RUY7QUFDQSxNQUFNLENBQUMscUJBQXFCLEdBQUcscUJBQXFCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gQ29udGVudCBNYXN0ZXIgU3VtbWFyeSBKYXZhU2NyaXB0XG5cbi8vIEluaXRpYWxpemUgcGFnZSB3aGVuIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBpbml0aWFsaXplUGFnZSgpO1xufSk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQYWdlKCkge1xuICAgIC8vIEZvcm1hdCB0aW1lc3RhbXBzXG4gICAgZm9ybWF0VGltZXN0YW1wcygpO1xuICAgIFxuICAgIC8vIENhbGN1bGF0ZSBhbGdvcml0aG0gYXZlcmFnZXNcbiAgICBjYWxjdWxhdGVBbGdvcml0aG1BdmVyYWdlcygpO1xuICAgIFxuICAgIC8vIENhbGN1bGF0ZSByaXNrIGFzc2Vzc21lbnRzXG4gICAgY2FsY3VsYXRlUmlza0Fzc2Vzc21lbnQoKTtcbiAgICBcbiAgICAvLyBDYWxjdWxhdGUgYWxnb3JpdGhtIHBlcmZvcm1hbmNlXG4gICAgY2FsY3VsYXRlQWxnb3JpdGhtUGVyZm9ybWFuY2UoKTtcbiAgICBcbiAgICAvLyBHZW5lcmF0ZSBjb250ZW50IGluc2lnaHRzXG4gICAgZ2VuZXJhdGVDb250ZW50SW5zaWdodHMoKTtcbiAgICBcbiAgICAvLyBGb3JtYXQgY29tcGFyaXNvbiBuYW1lc1xuICAgIGZvcm1hdENvbXBhcmlzb25OYW1lcygpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgdG9vbHRpcHNcbiAgICBpbml0aWFsaXplVG9vbHRpcHMoKTtcbiAgICBcbiAgICAvLyBBZGQgYWNjZXNzaWJpbGl0eSBmZWF0dXJlc1xuICAgIGVuaGFuY2VBY2Nlc3NpYmlsaXR5KCk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSBhbmltYXRpb25zXG4gICAgaW5pdGlhbGl6ZUFuaW1hdGlvbnMoKTtcbn1cblxuLy8gRm9ybWF0IHRpbWVzdGFtcHMgdG8gcmVhZGFibGUgZGF0ZXNcbmZ1bmN0aW9uIGZvcm1hdFRpbWVzdGFtcHMoKSB7XG4gICAgY29uc3QgdGltZXN0YW1wRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10aW1lc3RhbXBdJyk7XG4gICAgdGltZXN0YW1wRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgdGltZXN0YW1wID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZXN0YW1wJyk7XG4gICAgICAgIGlmICh0aW1lc3RhbXApIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXApO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkID0gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICBtb250aDogJ2xvbmcnLFxuICAgICAgICAgICAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIGhvdXI6ICcyLWRpZ2l0JyxcbiAgICAgICAgICAgICAgICBtaW51dGU6ICcyLWRpZ2l0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0dGVkO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIENhbGN1bGF0ZSBhdmVyYWdlIHNjb3JlcyBmb3IgZWFjaCBhbGdvcml0aG1cbmZ1bmN0aW9uIGNhbGN1bGF0ZUFsZ29yaXRobUF2ZXJhZ2VzKCkge1xuICAgIGNvbnN0IGFsZ29yaXRobURhdGEgPSB7XG4gICAgICAgIGphY2NhcmQ6IFtdLFxuICAgICAgICBjb3NpbmU6IFtdLFxuICAgICAgICBmaW5nZXJwcmludDogW10sXG4gICAgICAgIHNlbWFudGljOiBbXSxcbiAgICAgICAgdG9waWM6IFtdXG4gICAgfTtcbiAgICBcbiAgICAvLyBDb2xsZWN0IGFsbCBzY29yZXMgZm9yIGVhY2ggYWxnb3JpdGhtXG4gICAgY29uc3QgbWV0cmljQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2ltaWxhcml0eS1jYXJkJyk7XG4gICAgbWV0cmljQ2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgY29uc3QgbWV0cmljcyA9IGV4dHJhY3RNZXRyaWNzRnJvbUNhcmQoY2FyZCk7XG4gICAgICAgIGlmIChtZXRyaWNzKSB7XG4gICAgICAgICAgICBhbGdvcml0aG1EYXRhLmphY2NhcmQucHVzaChtZXRyaWNzLmphY2NhcmQpO1xuICAgICAgICAgICAgYWxnb3JpdGhtRGF0YS5jb3NpbmUucHVzaChtZXRyaWNzLmNvc2luZSk7XG4gICAgICAgICAgICBhbGdvcml0aG1EYXRhLmZpbmdlcnByaW50LnB1c2gobWV0cmljcy5maW5nZXJwcmludCk7XG4gICAgICAgICAgICBhbGdvcml0aG1EYXRhLnNlbWFudGljLnB1c2gobWV0cmljcy5zZW1hbnRpYyk7XG4gICAgICAgICAgICBhbGdvcml0aG1EYXRhLnRvcGljLnB1c2gobWV0cmljcy50b3BpYyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBDYWxjdWxhdGUgYW5kIGRpc3BsYXkgYXZlcmFnZXNcbiAgICBPYmplY3Qua2V5cyhhbGdvcml0aG1EYXRhKS5mb3JFYWNoKGFsZ29yaXRobSA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3JlcyA9IGFsZ29yaXRobURhdGFbYWxnb3JpdGhtXTtcbiAgICAgICAgaWYgKHNjb3Jlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBhdmVyYWdlID0gc2NvcmVzLnJlZHVjZSgoc3VtLCBzY29yZSkgPT4gc3VtICsgc2NvcmUsIDApIC8gc2NvcmVzLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGF2Z0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHthbGdvcml0aG19LWF2Z2ApO1xuICAgICAgICAgICAgaWYgKGF2Z0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBhdmdFbGVtZW50LnRleHRDb250ZW50ID0gTWF0aC5yb3VuZChhdmVyYWdlICogMTAwKSArICclJztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBBZGQgY29sb3IgY29kaW5nIGJhc2VkIG9uIHNpbWlsYXJpdHkgbGV2ZWxcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvckNsYXNzID0gZ2V0U2ltaWxhcml0eUNsYXNzKGF2ZXJhZ2UpO1xuICAgICAgICAgICAgICAgIGF2Z0VsZW1lbnQuY2xhc3NOYW1lID0gYGFsZ29yaXRobS1hdmcgJHtjb2xvckNsYXNzfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gRXh0cmFjdCBtZXRyaWNzIGZyb20gYSBzaW1pbGFyaXR5IGNhcmRcbmZ1bmN0aW9uIGV4dHJhY3RNZXRyaWNzRnJvbUNhcmQoY2FyZCkge1xuICAgIGNvbnN0IG1ldHJpY1ZhbHVlcyA9IGNhcmQucXVlcnlTZWxlY3RvckFsbCgnLm1ldHJpYy12YWx1ZScpO1xuICAgIGlmIChtZXRyaWNWYWx1ZXMubGVuZ3RoID49IDUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGphY2NhcmQ6IHBhcnNlRmxvYXQobWV0cmljVmFsdWVzWzBdLnRleHRDb250ZW50LnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwLFxuICAgICAgICAgICAgY29zaW5lOiBwYXJzZUZsb2F0KG1ldHJpY1ZhbHVlc1sxXS50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMCxcbiAgICAgICAgICAgIGZpbmdlcnByaW50OiBwYXJzZUZsb2F0KG1ldHJpY1ZhbHVlc1syXS50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMCxcbiAgICAgICAgICAgIHNlbWFudGljOiBwYXJzZUZsb2F0KG1ldHJpY1ZhbHVlc1szXS50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMCxcbiAgICAgICAgICAgIHRvcGljOiBwYXJzZUZsb2F0KG1ldHJpY1ZhbHVlc1s0XS50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gQ2FsY3VsYXRlIHJpc2sgYXNzZXNzbWVudCBjb3VudHNcbmZ1bmN0aW9uIGNhbGN1bGF0ZVJpc2tBc3Nlc3NtZW50KCkge1xuICAgIGNvbnN0IHJpc2tDb3VudHMgPSB7XG4gICAgICAgIGNyaXRpY2FsOiAwLCAgLy8gNzUlKyBzaW1pbGFyaXR5XG4gICAgICAgIGhpZ2g6IDAsICAgICAgLy8gNTAtNzUlIHNpbWlsYXJpdHkgIFxuICAgICAgICBtb2RlcmF0ZTogMCwgIC8vIDI1LTUwJSBzaW1pbGFyaXR5XG4gICAgICAgIGxvdzogMCAgICAgICAgLy8gMC0yNSUgc2ltaWxhcml0eVxuICAgIH07XG4gICAgXG4gICAgY29uc3Qgb3ZlcmFsbFNjb3JlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vdmVyYWxsLXNjb3JlIC5zY29yZS1udW1iZXInKTtcbiAgICBvdmVyYWxsU2NvcmVzLmZvckVhY2goc2NvcmVFbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSBwYXJzZUZsb2F0KHNjb3JlRWxlbWVudC50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMDtcbiAgICAgICAgXG4gICAgICAgIGlmIChzY29yZSA+PSAwLjc1KSB7XG4gICAgICAgICAgICByaXNrQ291bnRzLmNyaXRpY2FsKys7XG4gICAgICAgIH0gZWxzZSBpZiAoc2NvcmUgPj0gMC41KSB7XG4gICAgICAgICAgICByaXNrQ291bnRzLmhpZ2grKztcbiAgICAgICAgfSBlbHNlIGlmIChzY29yZSA+PSAwLjI1KSB7XG4gICAgICAgICAgICByaXNrQ291bnRzLm1vZGVyYXRlKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByaXNrQ291bnRzLmxvdysrO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gVXBkYXRlIHJpc2sgY291bnQgZGlzcGxheXNcbiAgICBPYmplY3Qua2V5cyhyaXNrQ291bnRzKS5mb3JFYWNoKHJpc2sgPT4ge1xuICAgICAgICBjb25zdCBjb3VudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtyaXNrfS1jb3VudCAucmlzay1udW1iZXJgKTtcbiAgICAgICAgaWYgKGNvdW50RWxlbWVudCkge1xuICAgICAgICAgICAgY291bnRFbGVtZW50LnRleHRDb250ZW50ID0gcmlza0NvdW50c1tyaXNrXTtcbiAgICAgICAgICAgIGNvdW50RWxlbWVudC5jbGFzc05hbWUgPSBgcmlzay1udW1iZXIgJHtyaXNrfWA7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gQ2FsY3VsYXRlIGFsZ29yaXRobSBwZXJmb3JtYW5jZSBtZXRyaWNzXG5mdW5jdGlvbiBjYWxjdWxhdGVBbGdvcml0aG1QZXJmb3JtYW5jZSgpIHtcbiAgICBjb25zdCBhbGdvcml0aG1zID0gWydqYWNjYXJkJywgJ2Nvc2luZScsICdmaW5nZXJwcmludCcsICdzZW1hbnRpYycsICd0b3BpYyddO1xuICAgIGNvbnN0IGFsZ29yaXRobUF2ZXJhZ2VzID0ge307XG4gICAgXG4gICAgLy8gR2V0IGF2ZXJhZ2Ugc2NvcmVzIGZvciBlYWNoIGFsZ29yaXRobVxuICAgIGFsZ29yaXRobXMuZm9yRWFjaChhbGdvcml0aG0gPT4ge1xuICAgICAgICBjb25zdCBhdmdFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7YWxnb3JpdGhtfS1hdmdgKTtcbiAgICAgICAgaWYgKGF2Z0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gcGFyc2VGbG9hdChhdmdFbGVtZW50LnRleHRDb250ZW50LnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwO1xuICAgICAgICAgICAgYWxnb3JpdGhtQXZlcmFnZXNbYWxnb3JpdGhtXSA9IHNjb3JlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gRmluZCBtb3N0IGFuZCBsZWFzdCBzZW5zaXRpdmUgYWxnb3JpdGhtc1xuICAgIGxldCBtb3N0U2Vuc2l0aXZlID0gJyc7XG4gICAgbGV0IGxlYXN0U2Vuc2l0aXZlID0gJyc7XG4gICAgbGV0IGhpZ2hlc3RTY29yZSA9IC0xO1xuICAgIGxldCBsb3dlc3RTY29yZSA9IDI7XG4gICAgXG4gICAgT2JqZWN0LmtleXMoYWxnb3JpdGhtQXZlcmFnZXMpLmZvckVhY2goYWxnb3JpdGhtID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSBhbGdvcml0aG1BdmVyYWdlc1thbGdvcml0aG1dO1xuICAgICAgICBpZiAoc2NvcmUgPiBoaWdoZXN0U2NvcmUpIHtcbiAgICAgICAgICAgIGhpZ2hlc3RTY29yZSA9IHNjb3JlO1xuICAgICAgICAgICAgbW9zdFNlbnNpdGl2ZSA9IGFsZ29yaXRobTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcmUgPCBsb3dlc3RTY29yZSkge1xuICAgICAgICAgICAgbG93ZXN0U2NvcmUgPSBzY29yZTtcbiAgICAgICAgICAgIGxlYXN0U2Vuc2l0aXZlID0gYWxnb3JpdGhtO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gVXBkYXRlIHBlcmZvcm1hbmNlIGRpc3BsYXlzXG4gICAgY29uc3QgbW9zdFNlbnNpdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9zdC1zZW5zaXRpdmUnKTtcbiAgICBjb25zdCBsZWFzdFNlbnNpdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhc3Qtc2Vuc2l0aXZlJyk7XG4gICAgY29uc3QgYmVzdERldGVjdG9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiZXN0LWRldGVjdG9yJyk7XG4gICAgXG4gICAgaWYgKG1vc3RTZW5zaXRpdmVFbGVtZW50KSB7XG4gICAgICAgIG1vc3RTZW5zaXRpdmVFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0QWxnb3JpdGhtTmFtZShtb3N0U2Vuc2l0aXZlKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGxlYXN0U2Vuc2l0aXZlRWxlbWVudCkge1xuICAgICAgICBsZWFzdFNlbnNpdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXRBbGdvcml0aG1OYW1lKGxlYXN0U2Vuc2l0aXZlKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGJlc3REZXRlY3RvckVsZW1lbnQpIHtcbiAgICAgICAgLy8gQmVzdCBkZXRlY3RvciBpcyB0aGUgb25lIHRoYXQgc2hvd3MgbW9zdCB2YXJpYXRpb24gKGdvb2QgZm9yIGRldGVjdGluZyBjb3B5aW5nKVxuICAgICAgICBiZXN0RGV0ZWN0b3JFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0QWxnb3JpdGhtTmFtZShtb3N0U2Vuc2l0aXZlKTtcbiAgICB9XG59XG5cbi8vIEdlbmVyYXRlIGNvbnRlbnQgaW5zaWdodHMgYmFzZWQgb24gZGF0YVxuZnVuY3Rpb24gZ2VuZXJhdGVDb250ZW50SW5zaWdodHMoKSB7XG4gICAgY29uc3QgY29tcGFyaXNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2ltaWxhcml0eS1jYXJkJyk7XG4gICAgbGV0IGhpZ2hlc3RTaW1pbGFyaXR5ID0gMDtcbiAgICBsZXQgdG9wQ29uY2VybkNvbXBhcmlzb24gPSAnJztcbiAgICBsZXQgbG93ZXN0U2ltaWxhcml0eSA9IDE7XG4gICAgbGV0IG1vc3RVbmlxdWVDb21wYXJpc29uID0gJyc7XG4gICAgXG4gICAgY29tcGFyaXNvbnMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcmVFbGVtZW50ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcub3ZlcmFsbC1zY29yZSAuc2NvcmUtbnVtYmVyJyk7XG4gICAgICAgIGNvbnN0IHRpdGxlRWxlbWVudCA9IGNhcmQucXVlcnlTZWxlY3RvcignLmNvbXBhcmlzb24tdGl0bGUnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzY29yZUVsZW1lbnQgJiYgdGl0bGVFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBzY29yZSA9IHBhcnNlRmxvYXQoc2NvcmVFbGVtZW50LnRleHRDb250ZW50LnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwO1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSB0aXRsZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzY29yZSA+IGhpZ2hlc3RTaW1pbGFyaXR5KSB7XG4gICAgICAgICAgICAgICAgaGlnaGVzdFNpbWlsYXJpdHkgPSBzY29yZTtcbiAgICAgICAgICAgICAgICB0b3BDb25jZXJuQ29tcGFyaXNvbiA9IHRpdGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc2NvcmUgPCBsb3dlc3RTaW1pbGFyaXR5KSB7XG4gICAgICAgICAgICAgICAgbG93ZXN0U2ltaWxhcml0eSA9IHNjb3JlO1xuICAgICAgICAgICAgICAgIG1vc3RVbmlxdWVDb21wYXJpc29uID0gdGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBVcGRhdGUgaW5zaWdodCBkaXNwbGF5c1xuICAgIGNvbnN0IHRvcENvbmNlcm5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC1jb25jZXJuJyk7XG4gICAgY29uc3QgdW5pcXVlQ29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5pcXVlLWNvbnRlbnQnKTtcbiAgICBjb25zdCBjbHVzdGVyQW5hbHlzaXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdXN0ZXItYW5hbHlzaXMnKTtcbiAgICBcbiAgICBpZiAodG9wQ29uY2VybkVsZW1lbnQgJiYgdG9wQ29uY2VybkNvbXBhcmlzb24pIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkQ29tcGFyaXNvbiA9IGZvcm1hdENvbXBhcmlzb25OYW1lKHRvcENvbmNlcm5Db21wYXJpc29uKTtcbiAgICAgICAgdG9wQ29uY2VybkVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtmb3JtYXR0ZWRDb21wYXJpc29ufSBzaG93cyBoaWdoZXN0IHNpbWlsYXJpdHkgKCR7TWF0aC5yb3VuZChoaWdoZXN0U2ltaWxhcml0eSAqIDEwMCl9JSlgO1xuICAgIH1cbiAgICBcbiAgICBpZiAodW5pcXVlQ29udGVudEVsZW1lbnQgJiYgbW9zdFVuaXF1ZUNvbXBhcmlzb24pIHtcbiAgICAgICAgY29uc3Qgc2l0ZXMgPSBtb3N0VW5pcXVlQ29tcGFyaXNvbi5zcGxpdCgnX3ZzXycpO1xuICAgICAgICBpZiAoc2l0ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBjb25zdCBzaXRlMSA9IGZvcm1hdFNpdGVOYW1lKHNpdGVzWzBdKTtcbiAgICAgICAgICAgIGNvbnN0IHNpdGUyID0gZm9ybWF0U2l0ZU5hbWUoc2l0ZXNbMV0pO1xuICAgICAgICAgICAgdW5pcXVlQ29udGVudEVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtzaXRlMX0gYW5kICR7c2l0ZTJ9IHNob3cgZ29vZCBjb250ZW50IHVuaXF1ZW5lc3NgO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlmIChjbHVzdGVyQW5hbHlzaXNFbGVtZW50KSB7XG4gICAgICAgIC8vIENvdW50IGhpZ2ggc2ltaWxhcml0eSBwYWlycyAoPjUwJSlcbiAgICAgICAgbGV0IGhpZ2hTaW1pbGFyaXR5Q291bnQgPSAwO1xuICAgICAgICBjb21wYXJpc29ucy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2NvcmVFbGVtZW50ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcub3ZlcmFsbC1zY29yZSAuc2NvcmUtbnVtYmVyJyk7XG4gICAgICAgICAgICBpZiAoc2NvcmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSBwYXJzZUZsb2F0KHNjb3JlRWxlbWVudC50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMDtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPiAwLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGlnaFNpbWlsYXJpdHlDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjbHVzdGVyQW5hbHlzaXNFbGVtZW50LnRleHRDb250ZW50ID0gYCR7aGlnaFNpbWlsYXJpdHlDb3VudH0gc2l0ZSBwYWlycyBzaG93IGNvbmNlcm5pbmcgc2ltaWxhcml0eSBsZXZlbHNgO1xuICAgIH1cbn1cblxuLy8gRm9ybWF0IGNvbXBhcmlzb24gbmFtZXMgZnJvbSB0ZWNobmljYWwgZm9ybWF0XG5mdW5jdGlvbiBmb3JtYXRDb21wYXJpc29uTmFtZXMoKSB7XG4gICAgY29uc3QgY29tcGFyaXNvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29tcGFyaXNvbl0nKTtcbiAgICBjb21wYXJpc29uRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgY29tcGFyaXNvbiA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbXBhcmlzb24nKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkID0gZm9ybWF0Q29tcGFyaXNvbk5hbWUoY29tcGFyaXNvbik7XG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWQ7XG4gICAgfSk7XG59XG5cbi8vIEZvcm1hdCBjb21wYXJpc29uIHN0cmluZyB0byByZWFkYWJsZSBmb3JtYXRcbmZ1bmN0aW9uIGZvcm1hdENvbXBhcmlzb25OYW1lKGNvbXBhcmlzb24pIHtcbiAgICBpZiAoIWNvbXBhcmlzb24pIHJldHVybiAnJztcbiAgICBcbiAgICAvLyBTcGxpdCBieSBfdnNfIGFuZCBmb3JtYXQgZWFjaCBzaXRlIG5hbWVcbiAgICBjb25zdCBwYXJ0cyA9IGNvbXBhcmlzb24uc3BsaXQoJ192c18nKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGNvbnN0IHNpdGUxID0gZm9ybWF0U2l0ZU5hbWUocGFydHNbMF0pO1xuICAgICAgICBjb25zdCBzaXRlMiA9IGZvcm1hdFNpdGVOYW1lKHBhcnRzWzFdKTtcbiAgICAgICAgcmV0dXJuIGAke3NpdGUxfSB2cyAke3NpdGUyfWA7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBjb21wYXJpc29uO1xufVxuXG4vLyBGb3JtYXQgdGVjaG5pY2FsIHNpdGUgbmFtZSB0byByZWFkYWJsZSBmb3JtYXRcbmZ1bmN0aW9uIGZvcm1hdFNpdGVOYW1lKHRlY2huaWNhbE5hbWUpIHtcbiAgICBpZiAoIXRlY2huaWNhbE5hbWUpIHJldHVybiAnJztcbiAgICBcbiAgICAvLyBSZW1vdmUgdGltZXN0YW1wIGFuZCBjb252ZXJ0IHRvIHJlYWRhYmxlIGZvcm1hdFxuICAgIGNvbnN0IHNpdGVOYW1lID0gdGVjaG5pY2FsTmFtZS5zcGxpdCgnXycpWzBdO1xuICAgIFxuICAgIC8vIENvbnZlcnQgdG8gdGl0bGUgY2FzZSBhbmQgaGFuZGxlIGNvbW1vbiBzaXRlIG5hbWVzXG4gICAgY29uc3Qgc2l0ZU1hcCA9IHtcbiAgICAgICAgJ2luc3RhbnRjaGVja21hdGUnOiAnSW5zdGFudENoZWNrbWF0ZScsXG4gICAgICAgICd0cnV0aGZpbmRlcic6ICdUcnV0aEZpbmRlcicsXG4gICAgICAgICdpbnRlbGl1cyc6ICdJbnRlbGl1cycsXG4gICAgICAgICd3aGl0ZXBhZ2VzJzogJ1doaXRlUGFnZXMnLFxuICAgICAgICAnYmVlbnZlcmlmaWVkJzogJ0JlZW5WZXJpZmllZCcsXG4gICAgICAgICd0cnVlcGVvcGxlc2VhcmNoJzogJ1RydWVQZW9wbGVTZWFyY2gnXG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4gc2l0ZU1hcFtzaXRlTmFtZS50b0xvd2VyQ2FzZSgpXSB8fCBcbiAgICAgICAgICAgc2l0ZU5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzaXRlTmFtZS5zbGljZSgxKTtcbn1cblxuLy8gRm9ybWF0IGFsZ29yaXRobSBuYW1lcyBmb3IgZGlzcGxheVxuZnVuY3Rpb24gZm9ybWF0QWxnb3JpdGhtTmFtZShhbGdvcml0aG0pIHtcbiAgICBjb25zdCBhbGdvcml0aG1OYW1lcyA9IHtcbiAgICAgICAgJ2phY2NhcmQnOiAnSmFjY2FyZCcsXG4gICAgICAgICdjb3NpbmUnOiAnQ29zaW5lJyxcbiAgICAgICAgJ2ZpbmdlcnByaW50JzogJ0ZpbmdlcnByaW50JyxcbiAgICAgICAgJ3NlbWFudGljJzogJ1NlbWFudGljJyxcbiAgICAgICAgJ3RvcGljJzogJ1RvcGljJ1xuICAgIH07XG4gICAgcmV0dXJuIGFsZ29yaXRobU5hbWVzW2FsZ29yaXRobV0gfHwgYWxnb3JpdGhtO1xufVxuXG4vLyBHZXQgc2ltaWxhcml0eSBjbGFzcyBiYXNlZCBvbiBzY29yZVxuZnVuY3Rpb24gZ2V0U2ltaWxhcml0eUNsYXNzKHNjb3JlKSB7XG4gICAgaWYgKHNjb3JlID49IDAuNzUpIHJldHVybiAnZXJyb3InOyAgICAgIC8vIEhpZ2ggc2ltaWxhcml0eSA9IGJhZFxuICAgIGlmIChzY29yZSA+PSAwLjUpIHJldHVybiAnd2FybmluZyc7ICAgICAvLyBNb2RlcmF0ZSBzaW1pbGFyaXR5ID0gd2FybmluZ1xuICAgIGlmIChzY29yZSA+PSAwLjI1KSByZXR1cm4gJ2dvb2QnOyAgICAgICAvLyBMb3cgc2ltaWxhcml0eSA9IGdvb2RcbiAgICByZXR1cm4gJ2V4Y2VsbGVudCc7ICAgICAgICAgICAgICAgICAgICAgLy8gVmVyeSBsb3cgc2ltaWxhcml0eSA9IGV4Y2VsbGVudFxufVxuXG4vLyBJbml0aWFsaXplIHRvb2x0aXAgc3lzdGVtXG5mdW5jdGlvbiBpbml0aWFsaXplVG9vbHRpcHMoKSB7XG4gICAgY29uc3QgdG9vbHRpcFRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2x0aXAtdHJpZ2dlcicpO1xuICAgIFxuICAgIHRvb2x0aXBUcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBjb25zdCB0b29sdGlwSWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJyk7XG4gICAgICAgICAgICBzaG93VG9vbHRpcCh0b29sdGlwSWQsIGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaGlkZUFsbFRvb2x0aXBzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBjb25zdCB0b29sdGlwSWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJyk7XG4gICAgICAgICAgICB1cGRhdGVUb29sdGlwUG9zaXRpb24odG9vbHRpcElkLCBlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gSGlkZSB0b29sdGlwcyB3aGVuIGNsaWNraW5nIGVsc2V3aGVyZVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZUFsbFRvb2x0aXBzKTtcbn1cblxuLy8gU2hvdyB0b29sdGlwXG5mdW5jdGlvbiBzaG93VG9vbHRpcCh0b29sdGlwSWQsIGV2ZW50KSB7XG4gICAgaGlkZUFsbFRvb2x0aXBzKCk7XG4gICAgXG4gICAgY29uc3QgdG9vbHRpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0b29sdGlwLSR7dG9vbHRpcElkfWApO1xuICAgIGlmICh0b29sdGlwKSB7XG4gICAgICAgIHRvb2x0aXAuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuICAgICAgICB1cGRhdGVUb29sdGlwUG9zaXRpb24odG9vbHRpcElkLCBldmVudCk7XG4gICAgfVxufVxuXG4vLyBVcGRhdGUgdG9vbHRpcCBwb3NpdGlvblxuZnVuY3Rpb24gdXBkYXRlVG9vbHRpcFBvc2l0aW9uKHRvb2x0aXBJZCwgZXZlbnQpIHtcbiAgICBjb25zdCB0b29sdGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRvb2x0aXAtJHt0b29sdGlwSWR9YCk7XG4gICAgaWYgKHRvb2x0aXAgJiYgdG9vbHRpcC5jbGFzc0xpc3QuY29udGFpbnMoJ3Zpc2libGUnKSkge1xuICAgICAgICBjb25zdCByZWN0ID0gdG9vbHRpcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCArIHNjcm9sbExlZnQgLSByZWN0LndpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgKyBzY3JvbGxUb3AgLSByZWN0LmhlaWdodCAtIDIwO1xuICAgICAgICBcbiAgICAgICAgdG9vbHRpcC5zdHlsZS5sZWZ0ID0gTWF0aC5tYXgoMTAsIE1hdGgubWluKHgsIHdpbmRvdy5pbm5lcldpZHRoICsgc2Nyb2xsTGVmdCAtIHJlY3Qud2lkdGggLSAxMCkpICsgJ3B4JztcbiAgICAgICAgdG9vbHRpcC5zdHlsZS50b3AgPSBNYXRoLm1heChzY3JvbGxUb3AgKyAxMCwgeSkgKyAncHgnO1xuICAgIH1cbn1cblxuLy8gSGlkZSBhbGwgdG9vbHRpcHNcbmZ1bmN0aW9uIGhpZGVBbGxUb29sdGlwcygpIHtcbiAgICBjb25zdCB0b29sdGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29sdGlwJyk7XG4gICAgdG9vbHRpcHMuZm9yRWFjaCh0b29sdGlwID0+IHtcbiAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgc2Nyb2xsLXRyaWdnZXJlZCBhbmltYXRpb25zXG5mdW5jdGlvbiBpbml0aWFsaXplQW5pbWF0aW9ucygpIHtcbiAgICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XG4gICAgICAgIHRocmVzaG9sZDogMC4xLFxuICAgICAgICByb290TWFyZ2luOiAnMHB4IDBweCAtNTBweCAwcHgnXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtaW4nKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIG1ldHJpYyBiYXIgYW5pbWF0aW9uc1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaW1pbGFyaXR5LWNhcmQnKSkge1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlTWV0cmljQmFycyhlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgb2JzZXJ2ZXJPcHRpb25zKTtcbiAgICBcbiAgICAvLyBPYnNlcnZlIGFsbCBhbmltYXRhYmxlIGVsZW1lbnRzXG4gICAgY29uc3QgYW5pbWF0YWJsZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgJy5zaW1pbGFyaXR5LWNhcmQsIC5pbnNpZ2h0LWNhcmQsIC5hbGdvcml0aG0tY2FyZCdcbiAgICApO1xuICAgIGFuaW1hdGFibGVFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KSk7XG59XG5cbi8vIEFuaW1hdGUgbWV0cmljIGJhcnMgaW4gc2ltaWxhcml0eSBjYXJkc1xuZnVuY3Rpb24gYW5pbWF0ZU1ldHJpY0JhcnMoY2FyZCkge1xuICAgIGNvbnN0IG1ldHJpY0JhcnMgPSBjYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXRyaWMtZmlsbCcpO1xuICAgIG1ldHJpY0JhcnMuZm9yRWFjaCgoYmFyLCBpbmRleCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldFdpZHRoID0gYmFyLmRhdGFzZXQud2lkdGg7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQW5pbWF0aW5nIGJhciAke2luZGV4ICsgMX0gdG8gd2lkdGg6ICR7dGFyZ2V0V2lkdGh9YCk7XG4gICAgICAgICAgICBiYXIuc3R5bGUud2lkdGggPSAnMCUnO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgYmFyLnN0eWxlLndpZHRoID0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICB9LCAyNTApO1xuICAgICAgICB9LCBpbmRleCAqIDE1MCk7XG4gICAgfSk7XG59XG5cbi8vIEVuaGFuY2UgYWNjZXNzaWJpbGl0eVxuZnVuY3Rpb24gZW5oYW5jZUFjY2Vzc2liaWxpdHkoKSB7XG4gICAgLy8gQWRkIEFSSUEgbGFiZWxzIHRvIG1ldHJpYyBiYXJzXG4gICAgY29uc3QgbWV0cmljQmFycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXRyaWMtZmlsbCcpO1xuICAgIG1ldHJpY0JhcnMuZm9yRWFjaChiYXIgPT4ge1xuICAgICAgICBjb25zdCBtZXRyaWNJdGVtID0gYmFyLmNsb3Nlc3QoJy5tZXRyaWMtaXRlbScpO1xuICAgICAgICBpZiAobWV0cmljSXRlbSkge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBtZXRyaWNJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5tZXRyaWMtbmFtZScpPy50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbWV0cmljSXRlbS5xdWVyeVNlbGVjdG9yKCcubWV0cmljLXZhbHVlJyk/LnRleHRDb250ZW50IHx8ICcnO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3Byb2dyZXNzYmFyJyk7XG4gICAgICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYCR7bGFiZWx9OiAke3ZhbHVlfWApO1xuICAgICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIHZhbHVlLnJlcGxhY2UoJyUnLCAnJykpO1xuICAgICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1pbicsICcwJyk7XG4gICAgICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbWF4JywgJzEwMCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gQWRkIHJvbGUgYXR0cmlidXRlcyB0byBjYXJkc1xuICAgIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbWlsYXJpdHktY2FyZCwgLmluc2lnaHQtY2FyZCwgLmFsZ29yaXRobS1jYXJkJyk7XG4gICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYXJ0aWNsZScpO1xuICAgICAgICBjYXJkLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEVuaGFuY2UgdG9vbHRpcCBhY2Nlc3NpYmlsaXR5XG4gICAgY29uc3QgdG9vbHRpcFRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2x0aXAtdHJpZ2dlcicpO1xuICAgIHRvb2x0aXBUcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xuICAgICAgICB0cmlnZ2VyLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcbiAgICAgICAgdHJpZ2dlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnU2hvdyBhbGdvcml0aG0gZXhwbGFuYXRpb24nKTtcbiAgICAgICAgdHJpZ2dlci5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBrZXlib2FyZCBzdXBwb3J0XG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyB8fCBlLmtleSA9PT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvb2x0aXBJZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKTtcbiAgICAgICAgICAgICAgICBzaG93VG9vbHRpcCh0b29sdGlwSWQsIHsgY2xpZW50WDogdGhpcy5vZmZzZXRMZWZ0LCBjbGllbnRZOiB0aGlzLm9mZnNldFRvcCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbi8vIEV4cG9ydCBmdW5jdGlvbmFsaXR5IGZvciBhbmFseXNpcyBkYXRhXG5mdW5jdGlvbiBleHBvcnRDb250ZW50QW5hbHlzaXMoKSB7XG4gICAgY29uc3QgYW5hbHlzaXNEYXRhID0ge1xuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgc3VtbWFyeToge1xuICAgICAgICAgICAgdG90YWxDb21wYXJpc29uczogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbWlsYXJpdHktY2FyZCcpLmxlbmd0aCxcbiAgICAgICAgICAgIGFsZ29yaXRobXM6IFsnamFjY2FyZCcsICdjb3NpbmUnLCAnZmluZ2VycHJpbnQnLCAnc2VtYW50aWMnLCAndG9waWMnXSxcbiAgICAgICAgICAgIHJpc2tBc3Nlc3NtZW50OiB7fVxuICAgICAgICB9LFxuICAgICAgICBjb21wYXJpc29uczogW11cbiAgICB9O1xuICAgIFxuICAgIC8vIEV4dHJhY3QgcmlzayBhc3Nlc3NtZW50IGRhdGFcbiAgICBjb25zdCByaXNrTGV2ZWxzID0gWydjcml0aWNhbCcsICdoaWdoJywgJ21vZGVyYXRlJywgJ2xvdyddO1xuICAgIHJpc2tMZXZlbHMuZm9yRWFjaChsZXZlbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2xldmVsfS1jb3VudCAucmlzay1udW1iZXJgKTtcbiAgICAgICAgYW5hbHlzaXNEYXRhLnN1bW1hcnkucmlza0Fzc2Vzc21lbnRbbGV2ZWxdID0gY291bnRFbGVtZW50ID8gXG4gICAgICAgICAgICBwYXJzZUludChjb3VudEVsZW1lbnQudGV4dENvbnRlbnQpIDogMDtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBFeHRyYWN0IGNvbXBhcmlzb24gZGF0YVxuICAgIGNvbnN0IGNvbXBhcmlzb25DYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaW1pbGFyaXR5LWNhcmQnKTtcbiAgICBjb21wYXJpc29uQ2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jb21wYXJpc29uLXRpdGxlJyk/LnRleHRDb250ZW50IHx8ICcnO1xuICAgICAgICBjb25zdCBvdmVyYWxsU2NvcmUgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5vdmVyYWxsLXNjb3JlIC5zY29yZS1udW1iZXInKT8udGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgIGNvbnN0IG1ldHJpY3MgPSBleHRyYWN0TWV0cmljc0Zyb21DYXJkKGNhcmQpO1xuICAgICAgICBcbiAgICAgICAgYW5hbHlzaXNEYXRhLmNvbXBhcmlzb25zLnB1c2goe1xuICAgICAgICAgICAgY29tcGFyaXNvbjogdGl0bGUsXG4gICAgICAgICAgICBvdmVyYWxsU2NvcmUsXG4gICAgICAgICAgICBtZXRyaWNzXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIERvd25sb2FkIGFzIEpTT05cbiAgICBjb25zdCBkYXRhU3RyID0gSlNPTi5zdHJpbmdpZnkoYW5hbHlzaXNEYXRhLCBudWxsLCAyKTtcbiAgICBjb25zdCBkYXRhQmxvYiA9IG5ldyBCbG9iKFtkYXRhU3RyXSwge3R5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgIFxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhQmxvYik7XG4gICAgbGluay5kb3dubG9hZCA9IGBjb250ZW50LWFuYWx5c2lzLSR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19Lmpzb25gO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG59XG5cbi8vIFBlcmZvcm1hbmNlIG1vbml0b3JpbmdcbmZ1bmN0aW9uIHRyYWNrUGVyZm9ybWFuY2UoKSB7XG4gICAgaWYgKCdwZXJmb3JtYW5jZScgaW4gd2luZG93KSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBsb2FkVGltZSA9IHBlcmZvcm1hbmNlLnRpbWluZy5sb2FkRXZlbnRFbmQgLSBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYENvbnRlbnQgYW5hbHlzaXMgcGFnZSBsb2FkIHRpbWU6ICR7bG9hZFRpbWV9bXNgKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLyBUaGVtZSBkZXRlY3Rpb24gYW5kIGFkYXB0YXRpb25cbmZ1bmN0aW9uIGFkYXB0VG9TeXN0ZW1UaGVtZSgpIHtcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay10aGVtZScpO1xuICAgIH1cbiAgICBcbiAgICAvLyBMaXN0ZW4gZm9yIHRoZW1lIGNoYW5nZXNcbiAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBpZiAoZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstdGhlbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGFyay10aGVtZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgYWxsIGZ1bmN0aW9uYWxpdHkgd2hlbiBwYWdlIGxvYWRzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaW5pdGlhbGl6ZVBhZ2UoKTtcbiAgICB0cmFja1BlcmZvcm1hbmNlKCk7XG4gICAgYWRhcHRUb1N5c3RlbVRoZW1lKCk7XG59KTtcblxuLy8gTWFrZSBmdW5jdGlvbnMgYXZhaWxhYmxlIGdsb2JhbGx5IGZvciBvbmNsaWNrIGhhbmRsZXJzXG53aW5kb3cuZXhwb3J0Q29udGVudEFuYWx5c2lzID0gZXhwb3J0Q29udGVudEFuYWx5c2lzOyJdfQ==
