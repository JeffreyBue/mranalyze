(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Technical Page Comparison JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
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

// Initialize technical radar chart
function initializeTechnicalRadar() {
  var radarChart = document.getElementById('technicalRadar');
  if (!radarChart) return;
  var svg = radarChart.querySelector('.radar-svg');
  var gridGroup = svg.querySelector('.radar-grid');
  var dataGroup = svg.querySelector('.radar-data');
  var labelsGroup = svg.querySelector('.radar-labels');

  // Extract technical scores from the page
  var scores = extractTechnicalScores();

  // Radar chart configuration
  var config = {
    centerX: 150,
    centerY: 150,
    maxRadius: 120,
    levels: 5,
    metrics: [{
      name: 'HTML Structure',
      value: scores.htmlStructure || 0
    }, {
      name: 'Meta Tags',
      value: scores.metaTags || 0
    }, {
      name: 'Schema Markup',
      value: scores.schemaMarkup || 0
    }, {
      name: 'Frameworks',
      value: scores.frameworks || 0
    }, {
      name: 'Resources',
      value: scores.resources || 0
    }, {
      name: 'Performance',
      value: scores.performance || 0
    }]
  };

  // Draw radar grid
  drawRadarGrid(gridGroup, config);

  // Draw radar data with animation delay
  setTimeout(function () {
    drawRadarData(dataGroup, config);
  }, 500);

  // Draw labels
  drawRadarLabels(labelsGroup, config);
}

// Extract technical scores from DOM
function extractTechnicalScores() {
  var scores = {};

  // HTML Structure score
  var htmlScore = document.querySelector('.html-structure-module .module-score');
  if (htmlScore) {
    scores.htmlStructure = parseFloat(htmlScore.textContent.replace('%', '')) / 100;
  }

  // Meta Tags score
  var metaScore = document.querySelector('.meta-tags-module .module-score');
  if (metaScore) {
    scores.metaTags = parseFloat(metaScore.textContent.replace('%', '')) / 100;
  }

  // Schema Markup score
  var schemaScore = document.querySelector('.schema-module .module-score');
  if (schemaScore) {
    scores.schemaMarkup = parseFloat(schemaScore.textContent.replace('%', '')) / 100;
  }

  // Frameworks score
  var frameworksScore = document.querySelector('.frameworks-module .module-score');
  if (frameworksScore) {
    scores.frameworks = parseFloat(frameworksScore.textContent.replace('%', '')) / 100;
  }

  // Resources score
  var resourcesScore = document.querySelector('.resources-module .module-score');
  if (resourcesScore) {
    scores.resources = parseFloat(resourcesScore.textContent.replace('%', '')) / 100;
  }

  // Performance score
  var performanceScore = document.querySelector('.performance-seo-module .module-score');
  if (performanceScore) {
    scores.performance = parseFloat(performanceScore.textContent.replace('%', '')) / 100;
  }
  return scores;
}

// Draw radar chart grid
function drawRadarGrid(gridGroup, config) {
  var centerX = config.centerX,
    centerY = config.centerY,
    maxRadius = config.maxRadius,
    levels = config.levels;

  // Clear existing grid
  gridGroup.innerHTML = '';

  // Draw concentric circles
  for (var i = 1; i <= levels; i++) {
    var radius = maxRadius / levels * i;
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', centerX);
    circle.setAttribute('cy', centerY);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'rgba(188, 195, 199, 0.3)');
    circle.setAttribute('stroke-width', '1');
    gridGroup.appendChild(circle);
  }

  // Draw axis lines
  var angleStep = 2 * Math.PI / config.metrics.length;
  for (var _i = 0; _i < config.metrics.length; _i++) {
    var angle = _i * angleStep - Math.PI / 2;
    var x2 = centerX + maxRadius * Math.cos(angle);
    var y2 = centerY + maxRadius * Math.sin(angle);
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
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
  var centerX = config.centerX,
    centerY = config.centerY,
    maxRadius = config.maxRadius,
    metrics = config.metrics;

  // Clear existing data
  dataGroup.innerHTML = '';

  // Calculate points for the polygon
  var points = [];
  var angleStep = 2 * Math.PI / metrics.length;
  metrics.forEach(function (metric, index) {
    var angle = index * angleStep - Math.PI / 2;
    var radius = maxRadius * metric.value;
    var x = centerX + radius * Math.cos(angle);
    var y = centerY + radius * Math.sin(angle);
    points.push("".concat(x, ",").concat(y));
  });

  // Create polygon
  var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', points.join(' '));
  polygon.setAttribute('fill', 'rgba(52, 152, 219, 0.3)');
  polygon.setAttribute('stroke', '#3498db');
  polygon.setAttribute('stroke-width', '2');
  polygon.style.opacity = '0';
  dataGroup.appendChild(polygon);

  // Add data points
  metrics.forEach(function (metric, index) {
    var angle = index * angleStep - Math.PI / 2;
    var radius = maxRadius * metric.value;
    var x = centerX + radius * Math.cos(angle);
    var y = centerY + radius * Math.sin(angle);
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
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
  var centerX = config.centerX,
    centerY = config.centerY,
    maxRadius = config.maxRadius,
    metrics = config.metrics;

  // Clear existing labels
  labelsGroup.innerHTML = '';
  var angleStep = 2 * Math.PI / metrics.length;
  metrics.forEach(function (metric, index) {
    var angle = index * angleStep - Math.PI / 2;
    var labelRadius = maxRadius + 20;
    var x = centerX + labelRadius * Math.cos(angle);
    var y = centerY + labelRadius * Math.sin(angle);
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
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
    var percentText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    percentText.setAttribute('x', x);
    percentText.setAttribute('y', y + 12);
    percentText.setAttribute('text-anchor', 'middle');
    percentText.setAttribute('dominant-baseline', 'middle');
    percentText.setAttribute('fill', 'rgba(255, 255, 255, 0.8)');
    percentText.setAttribute('font-size', '9');
    percentText.textContent = "".concat(Math.round(metric.value * 100), "%");
    labelsGroup.appendChild(percentText);
  });
}

// Animate radar chart data
function animateRadarData(dataGroup) {
  var polygon = dataGroup.querySelector('polygon');
  var circles = dataGroup.querySelectorAll('circle');

  // Animate polygon
  if (polygon) {
    polygon.style.transition = 'opacity 0.8s ease-out';
    polygon.style.opacity = '1';
  }

  // Animate points with stagger
  circles.forEach(function (circle, index) {
    setTimeout(function () {
      circle.style.transition = 'opacity 0.5s ease-out';
      circle.style.opacity = '1';
    }, index * 100);
  });
}

// Initialize progress bars with data-width pattern
function initializeProgressBars() {
  var progressBars = document.querySelectorAll('.bar-fill, .progress-fill');

  // Set initial width to 0 and animate to data-width
  progressBars.forEach(function (bar) {
    var targetWidth = bar.getAttribute('data-width');
    if (targetWidth) {
      bar.style.width = '0%';
      bar.style.transition = 'width 1.5s ease-out';
    }
  });

  // Animate on scroll into view
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var bar = entry.target;
        var targetWidth = bar.getAttribute('data-width');
        if (targetWidth && !bar.dataset.animated) {
          setTimeout(function () {
            bar.style.width = targetWidth;
            bar.dataset.animated = 'true';
          }, 200);
        }
        observer.unobserve(entry.target);
      }
    });
  });
  progressBars.forEach(function (bar) {
    return observer.observe(bar);
  });
}

// Initialize circular progress indicators
function initializeCircularProgress() {
  var progressCircles = document.querySelectorAll('.circle-progress');
  progressCircles.forEach(function (circle) {
    var progressValue = circle.getAttribute('data-progress');
    if (progressValue) {
      // Create animated border effect
      var rotation = progressValue / 100 * 360;
      circle.style.background = "conic-gradient(\n                #3498db 0deg,\n                #3498db ".concat(rotation, "deg,\n                #bdc3c7 ").concat(rotation, "deg,\n                #bdc3c7 360deg\n            )");

      // Animate on scroll
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
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
  var currentProgress = 0;
  var duration = 1500;
  var startTime = performance.now();
  function animate(currentTime) {
    var elapsed = currentTime - startTime;
    var progress = Math.min(elapsed / duration, 1);
    currentProgress = targetProgress * progress;
    var rotation = currentProgress / 100 * 360;
    element.style.background = "conic-gradient(\n            #3498db 0deg,\n            #3498db ".concat(rotation, "deg,\n            #bdc3c7 ").concat(rotation, "deg,\n            #bdc3c7 360deg\n        )");
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

// Initialize framework cards interactivity
function initializeFrameworkCards() {
  var frameworkCards = document.querySelectorAll('.framework-item');
  frameworkCards.forEach(function (card) {
    // Add hover effects
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) scale(1.02)';
      this.style.boxShadow = '0 8px 25px rgba(44, 62, 80, 0.2)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'none';
    });

    // Add click effects for accessibility
    card.addEventListener('click', function () {
      var _this = this;
      this.style.transform = 'scale(0.98)';
      setTimeout(function () {
        _this.style.transform = 'translateY(-5px) scale(1.02)';
      }, 100);
    });

    // Add keyboard support
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Initialize resources breakdown animations
function initializeResourcesBreakdown() {
  var resourceCards = document.querySelectorAll('.resource-type');
  resourceCards.forEach(function (card, index) {
    // Stagger animation entrance
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(function () {
      card.style.transition = 'all 0.6s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);

    // Add hover effects
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 6px 20px rgba(44, 62, 80, 0.15)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
}

// Format comparison names and technical strings
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
  var animatableElements = document.querySelectorAll('.analysis-module, .summary-card, .framework-item, .resource-type');
  animatableElements.forEach(function (element) {
    return observer.observe(element);
  });
}

// Animate analysis modules
function animateAnalysisModule(module) {
  var header = module.querySelector('.module-header');
  var content = module.querySelector('.module-content');
  if (header) {
    header.style.transform = 'translateX(-20px)';
    header.style.opacity = '0.8';
    setTimeout(function () {
      header.style.transition = 'all 0.5s ease-out';
      header.style.transform = 'translateX(0)';
      header.style.opacity = '1';
    }, 100);
  }
  if (content) {
    setTimeout(function () {
      content.style.transform = 'translateY(10px)';
      content.style.opacity = '0.9';
      setTimeout(function () {
        content.style.transition = 'all 0.5s ease-out';
        content.style.transform = 'translateY(0)';
        content.style.opacity = '1';
      }, 50);
    }, 200);
  }
}

// Animate summary cards
function animateSummaryCard(card) {
  var items = card.querySelectorAll('.insight-item, .recommendation-item, .risk-level');
  items.forEach(function (item, index) {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-15px)';
    setTimeout(function () {
      item.style.transition = 'all 0.4s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, index * 100);
  });
}

// Enhance accessibility
function enhanceAccessibility() {
  // Add ARIA labels to interactive elements
  var frameworkCards = document.querySelectorAll('.framework-item');
  frameworkCards.forEach(function (card) {
    var _card$querySelector;
    var frameworkName = ((_card$querySelector = card.querySelector('.framework-name')) === null || _card$querySelector === void 0 ? void 0 : _card$querySelector.textContent) || 'Framework';
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', "".concat(frameworkName, " framework comparison details"));
  });

  // Add ARIA labels to progress elements
  var progressBars = document.querySelectorAll('.bar-fill, .progress-fill');
  progressBars.forEach(function (bar) {
    var width = bar.getAttribute('data-width') || '0%';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuenow', parseInt(width));
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    bar.setAttribute('aria-label', "Progress: ".concat(width));
  });

  // Add ARIA labels to circular progress
  var circularProgress = document.querySelectorAll('.circle-progress');
  circularProgress.forEach(function (circle) {
    var progress = circle.getAttribute('data-progress') || '0';
    circle.setAttribute('role', 'progressbar');
    circle.setAttribute('aria-valuenow', progress);
    circle.setAttribute('aria-valuemin', '0');
    circle.setAttribute('aria-valuemax', '100');
    circle.setAttribute('aria-label', "Score: ".concat(progress, "%"));
  });

  // Add ARIA labels to radar chart
  var radarChart = document.getElementById('technicalRadar');
  if (radarChart) {
    radarChart.setAttribute('role', 'img');
    radarChart.setAttribute('aria-label', 'Technical similarity radar chart showing scores across multiple categories');
  }
}

// Enhanced hover effects for interactive elements
function enhanceInteractivity() {
  // Module score hover effects
  var moduleScores = document.querySelectorAll('.module-score');
  moduleScores.forEach(function (score) {
    score.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });
    score.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
  });

  // Schema type hover effects
  var schemaTypes = document.querySelectorAll('.schema-type');
  schemaTypes.forEach(function (type) {
    type.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    });
    type.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
  });

  // Performance pattern tags hover effects
  var patternTags = document.querySelectorAll('.pattern-tag');
  patternTags.forEach(function (tag) {
    tag.addEventListener('mouseenter', function () {
      this.style.backgroundColor = '#2980b9';
      this.style.transform = 'translateY(-2px)';
    });
    tag.addEventListener('mouseleave', function () {
      this.style.backgroundColor = '#3498db';
      this.style.transform = 'translateY(0)';
    });
  });

  // Risk badge interactions
  var riskBadges = document.querySelectorAll('.risk-badge');
  riskBadges.forEach(function (badge) {
    badge.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
    });
    badge.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  });
}

// Initialize score animations
function initializeScoreAnimations() {
  var scoreElements = document.querySelectorAll('.module-score');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        var scoreText = entry.target.textContent.replace('%', '');
        var finalScore = parseInt(scoreText);
        if (!isNaN(finalScore)) {
          animateScore(entry.target, finalScore);
          entry.target.dataset.animated = 'true';
        }
      }
    });
  });
  scoreElements.forEach(function (element) {
    return observer.observe(element);
  });
}

// Utility function to animate score numbers
function animateScore(element, finalScore) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1500;
  var startScore = 0;
  var startTime = performance.now();
  function updateScore(currentTime) {
    var elapsed = currentTime - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var currentScore = Math.floor(startScore + (finalScore - startScore) * progress);
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
  var hiddenElements = document.querySelectorAll('[style*="display: none"]');
  hiddenElements.forEach(function (element) {
    element.style.display = 'block';
  });

  // Ensure all animations are completed
  var animatedElements = document.querySelectorAll('[style*="transition"]');
  animatedElements.forEach(function (element) {
    element.style.transition = 'none';
  });

  // Set all progress bars to their final values
  var progressBars = document.querySelectorAll('.bar-fill, .progress-fill');
  progressBars.forEach(function (bar) {
    var targetWidth = bar.getAttribute('data-width');
    if (targetWidth) {
      bar.style.width = targetWidth;
    }
  });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Export functionality for technical analysis data
function exportTechnicalAnalysis() {
  var _document$querySelect, _document$querySelect2, _document$querySelect3, _document$querySelect4, _document$querySelect5;
  var technicalData = {
    timestamp: new Date().toISOString(),
    comparison: ((_document$querySelect = document.querySelector('[data-comparison]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('data-comparison')) || '',
    page1: {
      folder: ((_document$querySelect2 = document.querySelectorAll('.page-item .folder-name')[0]) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent) || '',
      pageId: ((_document$querySelect3 = document.querySelectorAll('.page-item .page-name')[0]) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.textContent) || ''
    },
    page2: {
      folder: ((_document$querySelect4 = document.querySelectorAll('.page-item .folder-name')[1]) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.textContent) || '',
      pageId: ((_document$querySelect5 = document.querySelectorAll('.page-item .page-name')[1]) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.textContent) || ''
    },
    scores: extractTechnicalScores(),
    radarData: extractRadarChartData()
  };

  // Download as JSON
  var dataStr = JSON.stringify(technicalData, null, 2);
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

// Extract radar chart data for export
function extractRadarChartData() {
  var radarChart = document.getElementById('technicalRadar');
  if (!radarChart) return null;
  var dataGroup = radarChart.querySelector('.radar-data');
  var polygon = dataGroup === null || dataGroup === void 0 ? void 0 : dataGroup.querySelector('polygon');
  return {
    points: (polygon === null || polygon === void 0 ? void 0 : polygon.getAttribute('points')) || '',
    metrics: extractTechnicalScores()
  };
}

// Theme detection and adaptation
function adaptToSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');

    // Adjust radar chart colors for dark theme
    var radarSvg = document.querySelector('.radar-svg');
    if (radarSvg) {
      var gridElements = radarSvg.querySelectorAll('.radar-grid *');
      gridElements.forEach(function (el) {
        if (el.getAttribute('stroke') === 'rgba(188, 195, 199, 0.3)') {
          el.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
        }
      });
    }
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

// Performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', function () {
      var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log("Technical page comparison load time: ".concat(loadTime, "ms"));

      // Track radar chart rendering performance
      var radarStart = performance.now();
      initializeTechnicalRadar();
      var radarEnd = performance.now();
      console.log("Radar chart rendering time: ".concat(radarEnd - radarStart, "ms"));
    });
  }
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function () {
  initializePage();
  initializeScoreAnimations();
  trackPerformance();
  adaptToSystemTheme();
});

// Make functions available globally for onclick handlers
window.exportTechnicalAnalysis = exportTechnicalAnalysis;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzcmMvdGVjaG5pY2FsX3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBO0FBQ0EsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsY0FBYyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsU0FBUyxjQUFjLENBQUEsRUFBRztFQUN0QjtFQUNBLGdCQUFnQixDQUFDLENBQUM7O0VBRWxCO0VBQ0Esd0JBQXdCLENBQUMsQ0FBQzs7RUFFMUI7RUFDQSxzQkFBc0IsQ0FBQyxDQUFDOztFQUV4QjtFQUNBLDBCQUEwQixDQUFDLENBQUM7O0VBRTVCO0VBQ0Esd0JBQXdCLENBQUMsQ0FBQzs7RUFFMUI7RUFDQSw0QkFBNEIsQ0FBQyxDQUFDOztFQUU5QjtFQUNBLHFCQUFxQixDQUFDLENBQUM7O0VBRXZCO0VBQ0Esb0JBQW9CLENBQUMsQ0FBQzs7RUFFdEI7RUFDQSxvQkFBb0IsQ0FBQyxDQUFDOztFQUV0QjtFQUNBLG9CQUFvQixDQUFDLENBQUM7QUFDMUI7O0FBRUE7QUFDQSxTQUFTLGdCQUFnQixDQUFBLEVBQUc7RUFDeEIsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUM7RUFDdkUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTyxFQUFJO0lBQ2pDLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7SUFDeEQsSUFBSSxTQUFTLEVBQUU7TUFDWCxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7TUFDaEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtRQUMvQyxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxNQUFNO1FBQ2IsR0FBRyxF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QixDQUFDLENBQUM7O0FBRUY7QUFDQSxNQUFNLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gVGVjaG5pY2FsIFBhZ2UgQ29tcGFyaXNvbiBKYXZhU2NyaXB0XG5cbi8vIEluaXRpYWxpemUgcGFnZSB3aGVuIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBpbml0aWFsaXplUGFnZSgpO1xufSk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQYWdlKCkge1xuICAgIC8vIEZvcm1hdCB0aW1lc3RhbXBzXG4gICAgZm9ybWF0VGltZXN0YW1wcygpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgdGVjaG5pY2FsIHJhZGFyIGNoYXJ0XG4gICAgaW5pdGlhbGl6ZVRlY2huaWNhbFJhZGFyKCk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSBwcm9ncmVzcyBiYXJzIHdpdGggZGF0YS13aWR0aCBwYXR0ZXJuXG4gICAgaW5pdGlhbGl6ZVByb2dyZXNzQmFycygpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgY2lyY3VsYXIgcHJvZ3Jlc3MgaW5kaWNhdG9yc1xuICAgIGluaXRpYWxpemVDaXJjdWxhclByb2dyZXNzKCk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSBmcmFtZXdvcmsgY2FyZHNcbiAgICBpbml0aWFsaXplRnJhbWV3b3JrQ2FyZHMoKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIHJlc291cmNlcyBicmVha2Rvd25cbiAgICBpbml0aWFsaXplUmVzb3VyY2VzQnJlYWtkb3duKCk7XG4gICAgXG4gICAgLy8gRm9ybWF0IGNvbXBhcmlzb24gbmFtZXNcbiAgICBmb3JtYXRDb21wYXJpc29uTmFtZXMoKTtcbiAgICBcbiAgICAvLyBBZGQgYWNjZXNzaWJpbGl0eSBmZWF0dXJlc1xuICAgIGVuaGFuY2VBY2Nlc3NpYmlsaXR5KCk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSBhbmltYXRpb25zXG4gICAgaW5pdGlhbGl6ZUFuaW1hdGlvbnMoKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIGhvdmVyIGVmZmVjdHNcbiAgICBlbmhhbmNlSW50ZXJhY3Rpdml0eSgpO1xufVxuXG4vLyBGb3JtYXQgdGltZXN0YW1wcyB0byByZWFkYWJsZSBkYXRlc1xuZnVuY3Rpb24gZm9ybWF0VGltZXN0YW1wcygpIHtcbiAgICBjb25zdCB0aW1lc3RhbXBFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRpbWVzdGFtcF0nKTtcbiAgICB0aW1lc3RhbXBFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10aW1lc3RhbXAnKTtcbiAgICAgICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgaG91cjogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgIG1pbnV0ZTogJzItZGlnaXQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWQ7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSB0ZWNobmljYWwgcmFkYXIgY2hhcnRcbmZ1bmN0aW9uIGluaXRpYWxpemVUZWNobmljYWxSYWRhcigpIHtcbiAgICBjb25zdCByYWRhckNoYXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlY2huaWNhbFJhZGFyJyk7XG4gICAgaWYgKCFyYWRhckNoYXJ0KSByZXR1cm47XG4gICAgXG4gICAgY29uc3Qgc3ZnID0gcmFkYXJDaGFydC5xdWVyeVNlbGVjdG9yKCcucmFkYXItc3ZnJyk7XG4gICAgY29uc3QgZ3JpZEdyb3VwID0gc3ZnLnF1ZXJ5U2VsZWN0b3IoJy5yYWRhci1ncmlkJyk7XG4gICAgY29uc3QgZGF0YUdyb3VwID0gc3ZnLnF1ZXJ5U2VsZWN0b3IoJy5yYWRhci1kYXRhJyk7XG4gICAgY29uc3QgbGFiZWxzR3JvdXAgPSBzdmcucXVlcnlTZWxlY3RvcignLnJhZGFyLWxhYmVscycpO1xuICAgIFxuICAgIC8vIEV4dHJhY3QgdGVjaG5pY2FsIHNjb3JlcyBmcm9tIHRoZSBwYWdlXG4gICAgY29uc3Qgc2NvcmVzID0gZXh0cmFjdFRlY2huaWNhbFNjb3JlcygpO1xuICAgIFxuICAgIC8vIFJhZGFyIGNoYXJ0IGNvbmZpZ3VyYXRpb25cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgIGNlbnRlclg6IDE1MCxcbiAgICAgICAgY2VudGVyWTogMTUwLFxuICAgICAgICBtYXhSYWRpdXM6IDEyMCxcbiAgICAgICAgbGV2ZWxzOiA1LFxuICAgICAgICBtZXRyaWNzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdIVE1MIFN0cnVjdHVyZScsIHZhbHVlOiBzY29yZXMuaHRtbFN0cnVjdHVyZSB8fCAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdNZXRhIFRhZ3MnLCB2YWx1ZTogc2NvcmVzLm1ldGFUYWdzIHx8IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ1NjaGVtYSBNYXJrdXAnLCB2YWx1ZTogc2NvcmVzLnNjaGVtYU1hcmt1cCB8fCAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdGcmFtZXdvcmtzJywgdmFsdWU6IHNjb3Jlcy5mcmFtZXdvcmtzIHx8IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ1Jlc291cmNlcycsIHZhbHVlOiBzY29yZXMucmVzb3VyY2VzIHx8IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ1BlcmZvcm1hbmNlJywgdmFsdWU6IHNjb3Jlcy5wZXJmb3JtYW5jZSB8fCAwIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgXG4gICAgLy8gRHJhdyByYWRhciBncmlkXG4gICAgZHJhd1JhZGFyR3JpZChncmlkR3JvdXAsIGNvbmZpZyk7XG4gICAgXG4gICAgLy8gRHJhdyByYWRhciBkYXRhIHdpdGggYW5pbWF0aW9uIGRlbGF5XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRyYXdSYWRhckRhdGEoZGF0YUdyb3VwLCBjb25maWcpO1xuICAgIH0sIDUwMCk7XG4gICAgXG4gICAgLy8gRHJhdyBsYWJlbHNcbiAgICBkcmF3UmFkYXJMYWJlbHMobGFiZWxzR3JvdXAsIGNvbmZpZyk7XG59XG5cbi8vIEV4dHJhY3QgdGVjaG5pY2FsIHNjb3JlcyBmcm9tIERPTVxuZnVuY3Rpb24gZXh0cmFjdFRlY2huaWNhbFNjb3JlcygpIHtcbiAgICBjb25zdCBzY29yZXMgPSB7fTtcbiAgICBcbiAgICAvLyBIVE1MIFN0cnVjdHVyZSBzY29yZVxuICAgIGNvbnN0IGh0bWxTY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odG1sLXN0cnVjdHVyZS1tb2R1bGUgLm1vZHVsZS1zY29yZScpO1xuICAgIGlmIChodG1sU2NvcmUpIHtcbiAgICAgICAgc2NvcmVzLmh0bWxTdHJ1Y3R1cmUgPSBwYXJzZUZsb2F0KGh0bWxTY29yZS50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMDtcbiAgICB9XG4gICAgXG4gICAgLy8gTWV0YSBUYWdzIHNjb3JlXG4gICAgY29uc3QgbWV0YVNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ldGEtdGFncy1tb2R1bGUgLm1vZHVsZS1zY29yZScpO1xuICAgIGlmIChtZXRhU2NvcmUpIHtcbiAgICAgICAgc2NvcmVzLm1ldGFUYWdzID0gcGFyc2VGbG9hdChtZXRhU2NvcmUudGV4dENvbnRlbnQucmVwbGFjZSgnJScsICcnKSkgLyAxMDA7XG4gICAgfVxuICAgIFxuICAgIC8vIFNjaGVtYSBNYXJrdXAgc2NvcmVcbiAgICBjb25zdCBzY2hlbWFTY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2hlbWEtbW9kdWxlIC5tb2R1bGUtc2NvcmUnKTtcbiAgICBpZiAoc2NoZW1hU2NvcmUpIHtcbiAgICAgICAgc2NvcmVzLnNjaGVtYU1hcmt1cCA9IHBhcnNlRmxvYXQoc2NoZW1hU2NvcmUudGV4dENvbnRlbnQucmVwbGFjZSgnJScsICcnKSkgLyAxMDA7XG4gICAgfVxuICAgIFxuICAgIC8vIEZyYW1ld29ya3Mgc2NvcmVcbiAgICBjb25zdCBmcmFtZXdvcmtzU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJhbWV3b3Jrcy1tb2R1bGUgLm1vZHVsZS1zY29yZScpO1xuICAgIGlmIChmcmFtZXdvcmtzU2NvcmUpIHtcbiAgICAgICAgc2NvcmVzLmZyYW1ld29ya3MgPSBwYXJzZUZsb2F0KGZyYW1ld29ya3NTY29yZS50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpKSAvIDEwMDtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVzb3VyY2VzIHNjb3JlXG4gICAgY29uc3QgcmVzb3VyY2VzU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzb3VyY2VzLW1vZHVsZSAubW9kdWxlLXNjb3JlJyk7XG4gICAgaWYgKHJlc291cmNlc1Njb3JlKSB7XG4gICAgICAgIHNjb3Jlcy5yZXNvdXJjZXMgPSBwYXJzZUZsb2F0KHJlc291cmNlc1Njb3JlLnRleHRDb250ZW50LnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwO1xuICAgIH1cbiAgICBcbiAgICAvLyBQZXJmb3JtYW5jZSBzY29yZVxuICAgIGNvbnN0IHBlcmZvcm1hbmNlU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVyZm9ybWFuY2Utc2VvLW1vZHVsZSAubW9kdWxlLXNjb3JlJyk7XG4gICAgaWYgKHBlcmZvcm1hbmNlU2NvcmUpIHtcbiAgICAgICAgc2NvcmVzLnBlcmZvcm1hbmNlID0gcGFyc2VGbG9hdChwZXJmb3JtYW5jZVNjb3JlLnRleHRDb250ZW50LnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc2NvcmVzO1xufVxuXG4vLyBEcmF3IHJhZGFyIGNoYXJ0IGdyaWRcbmZ1bmN0aW9uIGRyYXdSYWRhckdyaWQoZ3JpZEdyb3VwLCBjb25maWcpIHtcbiAgICBjb25zdCB7IGNlbnRlclgsIGNlbnRlclksIG1heFJhZGl1cywgbGV2ZWxzIH0gPSBjb25maWc7XG4gICAgXG4gICAgLy8gQ2xlYXIgZXhpc3RpbmcgZ3JpZFxuICAgIGdyaWRHcm91cC5pbm5lckhUTUwgPSAnJztcbiAgICBcbiAgICAvLyBEcmF3IGNvbmNlbnRyaWMgY2lyY2xlc1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxldmVsczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IChtYXhSYWRpdXMgLyBsZXZlbHMpICogaTtcbiAgICAgICAgY29uc3QgY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdjaXJjbGUnKTtcbiAgICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZSgnY3gnLCBjZW50ZXJYKTtcbiAgICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZSgnY3knLCBjZW50ZXJZKTtcbiAgICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZSgncicsIHJhZGl1cyk7XG4gICAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgICAgICBjaXJjbGUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAncmdiYSgxODgsIDE5NSwgMTk5LCAwLjMpJyk7XG4gICAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcxJyk7XG4gICAgICAgIGdyaWRHcm91cC5hcHBlbmRDaGlsZChjaXJjbGUpO1xuICAgIH1cbiAgICBcbiAgICAvLyBEcmF3IGF4aXMgbGluZXNcbiAgICBjb25zdCBhbmdsZVN0ZXAgPSAoMiAqIE1hdGguUEkpIC8gY29uZmlnLm1ldHJpY3MubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLm1ldHJpY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSBpICogYW5nbGVTdGVwIC0gTWF0aC5QSSAvIDI7XG4gICAgICAgIGNvbnN0IHgyID0gY2VudGVyWCArIG1heFJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgY29uc3QgeTIgPSBjZW50ZXJZICsgbWF4UmFkaXVzICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnbGluZScpO1xuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneDEnLCBjZW50ZXJYKTtcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgY2VudGVyWSk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd4MicsIHgyKTtcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgeTIpO1xuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ3JnYmEoMTg4LCAxOTUsIDE5OSwgMC4zKScpO1xuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgJzEnKTtcbiAgICAgICAgZ3JpZEdyb3VwLmFwcGVuZENoaWxkKGxpbmUpO1xuICAgIH1cbn1cblxuLy8gRHJhdyByYWRhciBjaGFydCBkYXRhXG5mdW5jdGlvbiBkcmF3UmFkYXJEYXRhKGRhdGFHcm91cCwgY29uZmlnKSB7XG4gICAgY29uc3QgeyBjZW50ZXJYLCBjZW50ZXJZLCBtYXhSYWRpdXMsIG1ldHJpY3MgfSA9IGNvbmZpZztcbiAgICBcbiAgICAvLyBDbGVhciBleGlzdGluZyBkYXRhXG4gICAgZGF0YUdyb3VwLmlubmVySFRNTCA9ICcnO1xuICAgIFxuICAgIC8vIENhbGN1bGF0ZSBwb2ludHMgZm9yIHRoZSBwb2x5Z29uXG4gICAgY29uc3QgcG9pbnRzID0gW107XG4gICAgY29uc3QgYW5nbGVTdGVwID0gKDIgKiBNYXRoLlBJKSAvIG1ldHJpY3MubGVuZ3RoO1xuICAgIFxuICAgIG1ldHJpY3MuZm9yRWFjaCgobWV0cmljLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBhbmdsZSA9IGluZGV4ICogYW5nbGVTdGVwIC0gTWF0aC5QSSAvIDI7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IG1heFJhZGl1cyAqIG1ldHJpYy52YWx1ZTtcbiAgICAgICAgY29uc3QgeCA9IGNlbnRlclggKyByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIGNvbnN0IHkgPSBjZW50ZXJZICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICBwb2ludHMucHVzaChgJHt4fSwke3l9YCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gQ3JlYXRlIHBvbHlnb25cbiAgICBjb25zdCBwb2x5Z29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdwb2x5Z29uJyk7XG4gICAgcG9seWdvbi5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIHBvaW50cy5qb2luKCcgJykpO1xuICAgIHBvbHlnb24uc2V0QXR0cmlidXRlKCdmaWxsJywgJ3JnYmEoNTIsIDE1MiwgMjE5LCAwLjMpJyk7XG4gICAgcG9seWdvbi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjMzQ5OGRiJyk7XG4gICAgcG9seWdvbi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJyk7XG4gICAgcG9seWdvbi5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgIGRhdGFHcm91cC5hcHBlbmRDaGlsZChwb2x5Z29uKTtcbiAgICBcbiAgICAvLyBBZGQgZGF0YSBwb2ludHNcbiAgICBtZXRyaWNzLmZvckVhY2goKG1ldHJpYywgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSBpbmRleCAqIGFuZ2xlU3RlcCAtIE1hdGguUEkgLyAyO1xuICAgICAgICBjb25zdCByYWRpdXMgPSBtYXhSYWRpdXMgKiBtZXRyaWMudmFsdWU7XG4gICAgICAgIGNvbnN0IHggPSBjZW50ZXJYICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICBjb25zdCB5ID0gY2VudGVyWSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnY2lyY2xlJyk7XG4gICAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ2N4JywgeCk7XG4gICAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ2N5JywgeSk7XG4gICAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ3InLCAnNCcpO1xuICAgICAgICBjaXJjbGUuc2V0QXR0cmlidXRlKCdmaWxsJywgJyMzNDk4ZGInKTtcbiAgICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJyNmZmZmZmYnKTtcbiAgICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgJzInKTtcbiAgICAgICAgY2lyY2xlLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgIGRhdGFHcm91cC5hcHBlbmRDaGlsZChjaXJjbGUpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEFuaW1hdGUgdGhlIHBvbHlnb24gYW5kIHBvaW50c1xuICAgIGFuaW1hdGVSYWRhckRhdGEoZGF0YUdyb3VwKTtcbn1cblxuLy8gRHJhdyByYWRhciBjaGFydCBsYWJlbHNcbmZ1bmN0aW9uIGRyYXdSYWRhckxhYmVscyhsYWJlbHNHcm91cCwgY29uZmlnKSB7XG4gICAgY29uc3QgeyBjZW50ZXJYLCBjZW50ZXJZLCBtYXhSYWRpdXMsIG1ldHJpY3MgfSA9IGNvbmZpZztcbiAgICBcbiAgICAvLyBDbGVhciBleGlzdGluZyBsYWJlbHNcbiAgICBsYWJlbHNHcm91cC5pbm5lckhUTUwgPSAnJztcbiAgICBcbiAgICBjb25zdCBhbmdsZVN0ZXAgPSAoMiAqIE1hdGguUEkpIC8gbWV0cmljcy5sZW5ndGg7XG4gICAgXG4gICAgbWV0cmljcy5mb3JFYWNoKChtZXRyaWMsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gaW5kZXggKiBhbmdsZVN0ZXAgLSBNYXRoLlBJIC8gMjtcbiAgICAgICAgY29uc3QgbGFiZWxSYWRpdXMgPSBtYXhSYWRpdXMgKyAyMDtcbiAgICAgICAgY29uc3QgeCA9IGNlbnRlclggKyBsYWJlbFJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgY29uc3QgeSA9IGNlbnRlclkgKyBsYWJlbFJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3RleHQnKTtcbiAgICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoJ3gnLCB4KTtcbiAgICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoJ3knLCB5KTtcbiAgICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpO1xuICAgICAgICB0ZXh0LnNldEF0dHJpYnV0ZSgnZG9taW5hbnQtYmFzZWxpbmUnLCAnbWlkZGxlJyk7XG4gICAgICAgIHRleHQuc2V0QXR0cmlidXRlKCdmaWxsJywgJyNmZmZmZmYnKTtcbiAgICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoJ2ZvbnQtc2l6ZScsICcxMScpO1xuICAgICAgICB0ZXh0LnNldEF0dHJpYnV0ZSgnZm9udC13ZWlnaHQnLCAnNjAwJyk7XG4gICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBtZXRyaWMubmFtZTtcbiAgICAgICAgbGFiZWxzR3JvdXAuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgcGVyY2VudGFnZSB0ZXh0XG4gICAgICAgIGNvbnN0IHBlcmNlbnRUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICd0ZXh0Jyk7XG4gICAgICAgIHBlcmNlbnRUZXh0LnNldEF0dHJpYnV0ZSgneCcsIHgpO1xuICAgICAgICBwZXJjZW50VGV4dC5zZXRBdHRyaWJ1dGUoJ3knLCB5ICsgMTIpO1xuICAgICAgICBwZXJjZW50VGV4dC5zZXRBdHRyaWJ1dGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpO1xuICAgICAgICBwZXJjZW50VGV4dC5zZXRBdHRyaWJ1dGUoJ2RvbWluYW50LWJhc2VsaW5lJywgJ21pZGRsZScpO1xuICAgICAgICBwZXJjZW50VGV4dC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpJyk7XG4gICAgICAgIHBlcmNlbnRUZXh0LnNldEF0dHJpYnV0ZSgnZm9udC1zaXplJywgJzknKTtcbiAgICAgICAgcGVyY2VudFRleHQudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKG1ldHJpYy52YWx1ZSAqIDEwMCl9JWA7XG4gICAgICAgIGxhYmVsc0dyb3VwLmFwcGVuZENoaWxkKHBlcmNlbnRUZXh0KTtcbiAgICB9KTtcbn1cblxuLy8gQW5pbWF0ZSByYWRhciBjaGFydCBkYXRhXG5mdW5jdGlvbiBhbmltYXRlUmFkYXJEYXRhKGRhdGFHcm91cCkge1xuICAgIGNvbnN0IHBvbHlnb24gPSBkYXRhR3JvdXAucXVlcnlTZWxlY3RvcigncG9seWdvbicpO1xuICAgIGNvbnN0IGNpcmNsZXMgPSBkYXRhR3JvdXAucXVlcnlTZWxlY3RvckFsbCgnY2lyY2xlJyk7XG4gICAgXG4gICAgLy8gQW5pbWF0ZSBwb2x5Z29uXG4gICAgaWYgKHBvbHlnb24pIHtcbiAgICAgICAgcG9seWdvbi5zdHlsZS50cmFuc2l0aW9uID0gJ29wYWNpdHkgMC44cyBlYXNlLW91dCc7XG4gICAgICAgIHBvbHlnb24uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICB9XG4gICAgXG4gICAgLy8gQW5pbWF0ZSBwb2ludHMgd2l0aCBzdGFnZ2VyXG4gICAgY2lyY2xlcy5mb3JFYWNoKChjaXJjbGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLnRyYW5zaXRpb24gPSAnb3BhY2l0eSAwLjVzIGVhc2Utb3V0JztcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICB9LCBpbmRleCAqIDEwMCk7XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgcHJvZ3Jlc3MgYmFycyB3aXRoIGRhdGEtd2lkdGggcGF0dGVyblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVByb2dyZXNzQmFycygpIHtcbiAgICBjb25zdCBwcm9ncmVzc0JhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFyLWZpbGwsIC5wcm9ncmVzcy1maWxsJyk7XG4gICAgXG4gICAgLy8gU2V0IGluaXRpYWwgd2lkdGggdG8gMCBhbmQgYW5pbWF0ZSB0byBkYXRhLXdpZHRoXG4gICAgcHJvZ3Jlc3NCYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0V2lkdGggPSBiYXIuZ2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJyk7XG4gICAgICAgIGlmICh0YXJnZXRXaWR0aCkge1xuICAgICAgICAgICAgYmFyLnN0eWxlLndpZHRoID0gJzAlJztcbiAgICAgICAgICAgIGJhci5zdHlsZS50cmFuc2l0aW9uID0gJ3dpZHRoIDEuNXMgZWFzZS1vdXQnO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gQW5pbWF0ZSBvbiBzY3JvbGwgaW50byB2aWV3XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhciA9IGVudHJ5LnRhcmdldDtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRXaWR0aCA9IGJhci5nZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0V2lkdGggJiYgIWJhci5kYXRhc2V0LmFuaW1hdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFyLnN0eWxlLndpZHRoID0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXIuZGF0YXNldC5hbmltYXRlZCA9ICd0cnVlJztcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIHByb2dyZXNzQmFycy5mb3JFYWNoKGJhciA9PiBvYnNlcnZlci5vYnNlcnZlKGJhcikpO1xufVxuXG4vLyBJbml0aWFsaXplIGNpcmN1bGFyIHByb2dyZXNzIGluZGljYXRvcnNcbmZ1bmN0aW9uIGluaXRpYWxpemVDaXJjdWxhclByb2dyZXNzKCkge1xuICAgIGNvbnN0IHByb2dyZXNzQ2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaXJjbGUtcHJvZ3Jlc3MnKTtcbiAgICBcbiAgICBwcm9ncmVzc0NpcmNsZXMuZm9yRWFjaChjaXJjbGUgPT4ge1xuICAgICAgICBjb25zdCBwcm9ncmVzc1ZhbHVlID0gY2lyY2xlLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzcycpO1xuICAgICAgICBpZiAocHJvZ3Jlc3NWYWx1ZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuaW1hdGVkIGJvcmRlciBlZmZlY3RcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0aW9uID0gKHByb2dyZXNzVmFsdWUgLyAxMDApICogMzYwO1xuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLmJhY2tncm91bmQgPSBgY29uaWMtZ3JhZGllbnQoXG4gICAgICAgICAgICAgICAgIzM0OThkYiAwZGVnLFxuICAgICAgICAgICAgICAgICMzNDk4ZGIgJHtyb3RhdGlvbn1kZWcsXG4gICAgICAgICAgICAgICAgI2JkYzNjNyAke3JvdGF0aW9ufWRlZyxcbiAgICAgICAgICAgICAgICAjYmRjM2M3IDM2MGRlZ1xuICAgICAgICAgICAgKWA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEFuaW1hdGUgb24gc2Nyb2xsXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZyAmJiAhZW50cnkudGFyZ2V0LmRhdGFzZXQuYW5pbWF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVDaXJjdWxhclByb2dyZXNzKGVudHJ5LnRhcmdldCwgcHJvZ3Jlc3NWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuZGF0YXNldC5hbmltYXRlZCA9ICd0cnVlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShjaXJjbGUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIEFuaW1hdGUgY2lyY3VsYXIgcHJvZ3Jlc3NcbmZ1bmN0aW9uIGFuaW1hdGVDaXJjdWxhclByb2dyZXNzKGVsZW1lbnQsIHRhcmdldFByb2dyZXNzKSB7XG4gICAgbGV0IGN1cnJlbnRQcm9ncmVzcyA9IDA7XG4gICAgY29uc3QgZHVyYXRpb24gPSAxNTAwO1xuICAgIGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGFuaW1hdGUoY3VycmVudFRpbWUpIHtcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lO1xuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWluKGVsYXBzZWQgLyBkdXJhdGlvbiwgMSk7XG4gICAgICAgIFxuICAgICAgICBjdXJyZW50UHJvZ3Jlc3MgPSB0YXJnZXRQcm9ncmVzcyAqIHByb2dyZXNzO1xuICAgICAgICBjb25zdCByb3RhdGlvbiA9IChjdXJyZW50UHJvZ3Jlc3MgLyAxMDApICogMzYwO1xuICAgICAgICBcbiAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gYGNvbmljLWdyYWRpZW50KFxuICAgICAgICAgICAgIzM0OThkYiAwZGVnLFxuICAgICAgICAgICAgIzM0OThkYiAke3JvdGF0aW9ufWRlZyxcbiAgICAgICAgICAgICNiZGMzYzcgJHtyb3RhdGlvbn1kZWcsXG4gICAgICAgICAgICAjYmRjM2M3IDM2MGRlZ1xuICAgICAgICApYDtcbiAgICAgICAgXG4gICAgICAgIGlmIChwcm9ncmVzcyA8IDEpIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG59XG5cbi8vIEluaXRpYWxpemUgZnJhbWV3b3JrIGNhcmRzIGludGVyYWN0aXZpdHlcbmZ1bmN0aW9uIGluaXRpYWxpemVGcmFtZXdvcmtDYXJkcygpIHtcbiAgICBjb25zdCBmcmFtZXdvcmtDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mcmFtZXdvcmstaXRlbScpO1xuICAgIFxuICAgIGZyYW1ld29ya0NhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgIC8vIEFkZCBob3ZlciBlZmZlY3RzXG4gICAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtNXB4KSBzY2FsZSgxLjAyKSc7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLmJveFNoYWRvdyA9ICcwIDhweCAyNXB4IHJnYmEoNDQsIDYyLCA4MCwgMC4yKSc7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDApIHNjYWxlKDEpJztcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuYm94U2hhZG93ID0gJ25vbmUnO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBjbGljayBlZmZlY3RzIGZvciBhY2Nlc3NpYmlsaXR5XG4gICAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDAuOTgpJztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoLTVweCkgc2NhbGUoMS4wMiknO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQga2V5Ym9hcmQgc3VwcG9ydFxuICAgICAgICBjYXJkLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgfHwgZS5rZXkgPT09ICcgJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vLyBJbml0aWFsaXplIHJlc291cmNlcyBicmVha2Rvd24gYW5pbWF0aW9uc1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVJlc291cmNlc0JyZWFrZG93bigpIHtcbiAgICBjb25zdCByZXNvdXJjZUNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc291cmNlLXR5cGUnKTtcbiAgICBcbiAgICByZXNvdXJjZUNhcmRzLmZvckVhY2goKGNhcmQsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIFN0YWdnZXIgYW5pbWF0aW9uIGVudHJhbmNlXG4gICAgICAgIGNhcmQuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgzMHB4KSc7XG4gICAgICAgIFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMC42cyBlYXNlLW91dCc7XG4gICAgICAgICAgICBjYXJkLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDApJztcbiAgICAgICAgfSwgaW5kZXggKiAyMDApO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIGhvdmVyIGVmZmVjdHNcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKC0zcHgpJztcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuYm94U2hhZG93ID0gJzAgNnB4IDIwcHggcmdiYSg0NCwgNjIsIDgwLCAwLjE1KSc7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDApJztcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuYm94U2hhZG93ID0gJ25vbmUnO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gRm9ybWF0IGNvbXBhcmlzb24gbmFtZXMgYW5kIHRlY2huaWNhbCBzdHJpbmdzXG5mdW5jdGlvbiBmb3JtYXRDb21wYXJpc29uTmFtZXMoKSB7XG4gICAgY29uc3QgY29tcGFyaXNvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29tcGFyaXNvbl0nKTtcbiAgICBjb21wYXJpc29uRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgY29tcGFyaXNvbiA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbXBhcmlzb24nKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkID0gZm9ybWF0Q29tcGFyaXNvbk5hbWUoY29tcGFyaXNvbik7XG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWQ7XG4gICAgfSk7XG59XG5cbi8vIEZvcm1hdCBjb21wYXJpc29uIHN0cmluZyB0byByZWFkYWJsZSBmb3JtYXRcbmZ1bmN0aW9uIGZvcm1hdENvbXBhcmlzb25OYW1lKGNvbXBhcmlzb24pIHtcbiAgICBpZiAoIWNvbXBhcmlzb24pIHJldHVybiAnJztcbiAgICBcbiAgICAvLyBTcGxpdCBieSBfdnNfIGFuZCBmb3JtYXQgZWFjaCBzaXRlIG5hbWVcbiAgICBjb25zdCBwYXJ0cyA9IGNvbXBhcmlzb24uc3BsaXQoJ192c18nKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGNvbnN0IHNpdGUxID0gZm9ybWF0U2l0ZU5hbWUocGFydHNbMF0pO1xuICAgICAgICBjb25zdCBzaXRlMiA9IGZvcm1hdFNpdGVOYW1lKHBhcnRzWzFdKTtcbiAgICAgICAgcmV0dXJuIGAke3NpdGUxfSB2cyAke3NpdGUyfWA7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBjb21wYXJpc29uO1xufVxuXG4vLyBGb3JtYXQgdGVjaG5pY2FsIHNpdGUgbmFtZSB0byByZWFkYWJsZSBmb3JtYXRcbmZ1bmN0aW9uIGZvcm1hdFNpdGVOYW1lKHRlY2huaWNhbE5hbWUpIHtcbiAgICBpZiAoIXRlY2huaWNhbE5hbWUpIHJldHVybiAnJztcbiAgICBcbiAgICAvLyBSZW1vdmUgdGltZXN0YW1wIGFuZCBjb252ZXJ0IHRvIHJlYWRhYmxlIGZvcm1hdFxuICAgIGNvbnN0IHNpdGVOYW1lID0gdGVjaG5pY2FsTmFtZS5zcGxpdCgnXycpWzBdO1xuICAgIFxuICAgIC8vIENvbnZlcnQgdG8gdGl0bGUgY2FzZSBhbmQgaGFuZGxlIGNvbW1vbiBzaXRlIG5hbWVzXG4gICAgY29uc3Qgc2l0ZU1hcCA9IHtcbiAgICAgICAgJ2luc3RhbnRjaGVja21hdGUnOiAnSW5zdGFudENoZWNrbWF0ZScsXG4gICAgICAgICd0cnV0aGZpbmRlcic6ICdUcnV0aEZpbmRlcicsXG4gICAgICAgICdpbnRlbGl1cyc6ICdJbnRlbGl1cycsXG4gICAgICAgICd3aGl0ZXBhZ2VzJzogJ1doaXRlUGFnZXMnXG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4gc2l0ZU1hcFtzaXRlTmFtZS50b0xvd2VyQ2FzZSgpXSB8fCBcbiAgICAgICAgICAgc2l0ZU5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzaXRlTmFtZS5zbGljZSgxKTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBzY3JvbGwtdHJpZ2dlcmVkIGFuaW1hdGlvbnNcbmZ1bmN0aW9uIGluaXRpYWxpemVBbmltYXRpb25zKCkge1xuICAgIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcbiAgICAgICAgdGhyZXNob2xkOiAwLjEsXG4gICAgICAgIHJvb3RNYXJnaW46ICcwcHggMHB4IC01MHB4IDBweCdcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1pbicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgc3BlY2lmaWMgYW5pbWF0aW9ucyBmb3IgZGlmZmVyZW50IG1vZHVsZXNcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYW5hbHlzaXMtbW9kdWxlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZUFuYWx5c2lzTW9kdWxlKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdW1tYXJ5LWNhcmQnKSkge1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU3VtbWFyeUNhcmQoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIG9ic2VydmVyT3B0aW9ucyk7XG4gICAgXG4gICAgLy8gT2JzZXJ2ZSBhbGwgYW5pbWF0YWJsZSBlbGVtZW50c1xuICAgIGNvbnN0IGFuaW1hdGFibGVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICcuYW5hbHlzaXMtbW9kdWxlLCAuc3VtbWFyeS1jYXJkLCAuZnJhbWV3b3JrLWl0ZW0sIC5yZXNvdXJjZS10eXBlJ1xuICAgICk7XG4gICAgYW5pbWF0YWJsZUVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpKTtcbn1cblxuLy8gQW5pbWF0ZSBhbmFseXNpcyBtb2R1bGVzXG5mdW5jdGlvbiBhbmltYXRlQW5hbHlzaXNNb2R1bGUobW9kdWxlKSB7XG4gICAgY29uc3QgaGVhZGVyID0gbW9kdWxlLnF1ZXJ5U2VsZWN0b3IoJy5tb2R1bGUtaGVhZGVyJyk7XG4gICAgY29uc3QgY29udGVudCA9IG1vZHVsZS5xdWVyeVNlbGVjdG9yKCcubW9kdWxlLWNvbnRlbnQnKTtcbiAgICBcbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICAgIGhlYWRlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtMjBweCknO1xuICAgICAgICBoZWFkZXIuc3R5bGUub3BhY2l0eSA9ICcwLjgnO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGhlYWRlci5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjVzIGVhc2Utb3V0JztcbiAgICAgICAgICAgIGhlYWRlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwKSc7XG4gICAgICAgICAgICBoZWFkZXIuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDEwcHgpJztcbiAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUub3BhY2l0eSA9ICcwLjknO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udGVudC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjVzIGVhc2Utb3V0JztcbiAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDApJztcbiAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH0sIDIwMCk7XG4gICAgfVxufVxuXG4vLyBBbmltYXRlIHN1bW1hcnkgY2FyZHNcbmZ1bmN0aW9uIGFuaW1hdGVTdW1tYXJ5Q2FyZChjYXJkKSB7XG4gICAgY29uc3QgaXRlbXMgPSBjYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNpZ2h0LWl0ZW0sIC5yZWNvbW1lbmRhdGlvbi1pdGVtLCAucmlzay1sZXZlbCcpO1xuICAgIFxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgaXRlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtMTVweCknO1xuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuNHMgZWFzZS1vdXQnO1xuICAgICAgICAgICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgaXRlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwKSc7XG4gICAgICAgIH0sIGluZGV4ICogMTAwKTtcbiAgICB9KTtcbn1cblxuLy8gRW5oYW5jZSBhY2Nlc3NpYmlsaXR5XG5mdW5jdGlvbiBlbmhhbmNlQWNjZXNzaWJpbGl0eSgpIHtcbiAgICAvLyBBZGQgQVJJQSBsYWJlbHMgdG8gaW50ZXJhY3RpdmUgZWxlbWVudHNcbiAgICBjb25zdCBmcmFtZXdvcmtDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mcmFtZXdvcmstaXRlbScpO1xuICAgIGZyYW1ld29ya0NhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgIGNvbnN0IGZyYW1ld29ya05hbWUgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5mcmFtZXdvcmstbmFtZScpPy50ZXh0Q29udGVudCB8fCAnRnJhbWV3b3JrJztcbiAgICAgICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIGNhcmQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYCR7ZnJhbWV3b3JrTmFtZX0gZnJhbWV3b3JrIGNvbXBhcmlzb24gZGV0YWlsc2ApO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEFkZCBBUklBIGxhYmVscyB0byBwcm9ncmVzcyBlbGVtZW50c1xuICAgIGNvbnN0IHByb2dyZXNzQmFycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYXItZmlsbCwgLnByb2dyZXNzLWZpbGwnKTtcbiAgICBwcm9ncmVzc0JhcnMuZm9yRWFjaChiYXIgPT4ge1xuICAgICAgICBjb25zdCB3aWR0aCA9IGJhci5nZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnKSB8fCAnMCUnO1xuICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3Byb2dyZXNzYmFyJyk7XG4gICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLCBwYXJzZUludCh3aWR0aCkpO1xuICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbWluJywgJzAnKTtcbiAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1heCcsICcxMDAnKTtcbiAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGBQcm9ncmVzczogJHt3aWR0aH1gKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBBZGQgQVJJQSBsYWJlbHMgdG8gY2lyY3VsYXIgcHJvZ3Jlc3NcbiAgICBjb25zdCBjaXJjdWxhclByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNpcmNsZS1wcm9ncmVzcycpO1xuICAgIGNpcmN1bGFyUHJvZ3Jlc3MuZm9yRWFjaChjaXJjbGUgPT4ge1xuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IGNpcmNsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MnKSB8fCAnMCc7XG4gICAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJvZ3Jlc3NiYXInKTtcbiAgICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIHByb2dyZXNzKTtcbiAgICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1pbicsICcwJyk7XG4gICAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtYXgnLCAnMTAwJyk7XG4gICAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgU2NvcmU6ICR7cHJvZ3Jlc3N9JWApO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEFkZCBBUklBIGxhYmVscyB0byByYWRhciBjaGFydFxuICAgIGNvbnN0IHJhZGFyQ2hhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVjaG5pY2FsUmFkYXInKTtcbiAgICBpZiAocmFkYXJDaGFydCkge1xuICAgICAgICByYWRhckNoYXJ0LnNldEF0dHJpYnV0ZSgncm9sZScsICdpbWcnKTtcbiAgICAgICAgcmFkYXJDaGFydC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVGVjaG5pY2FsIHNpbWlsYXJpdHkgcmFkYXIgY2hhcnQgc2hvd2luZyBzY29yZXMgYWNyb3NzIG11bHRpcGxlIGNhdGVnb3JpZXMnKTtcbiAgICB9XG59XG5cbi8vIEVuaGFuY2VkIGhvdmVyIGVmZmVjdHMgZm9yIGludGVyYWN0aXZlIGVsZW1lbnRzXG5mdW5jdGlvbiBlbmhhbmNlSW50ZXJhY3Rpdml0eSgpIHtcbiAgICAvLyBNb2R1bGUgc2NvcmUgaG92ZXIgZWZmZWN0c1xuICAgIGNvbnN0IG1vZHVsZVNjb3JlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2R1bGUtc2NvcmUnKTtcbiAgICBtb2R1bGVTY29yZXMuZm9yRWFjaChzY29yZSA9PiB7XG4gICAgICAgIHNjb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEuMSknO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5ib3hTaGFkb3cgPSAnMCA0cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMiknO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHNjb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuYm94U2hhZG93ID0gJ25vbmUnO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBTY2hlbWEgdHlwZSBob3ZlciBlZmZlY3RzXG4gICAgY29uc3Qgc2NoZW1hVHlwZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NoZW1hLXR5cGUnKTtcbiAgICBzY2hlbWFUeXBlcy5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgICB0eXBlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEuMDUpJztcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuYm94U2hhZG93ID0gJzAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSknO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHR5cGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5ib3hTaGFkb3cgPSAnbm9uZSc7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIFBlcmZvcm1hbmNlIHBhdHRlcm4gdGFncyBob3ZlciBlZmZlY3RzXG4gICAgY29uc3QgcGF0dGVyblRhZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGF0dGVybi10YWcnKTtcbiAgICBwYXR0ZXJuVGFncy5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMjk4MGI5JztcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoLTJweCknO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMzQ5OGRiJztcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoMCknO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBSaXNrIGJhZGdlIGludGVyYWN0aW9uc1xuICAgIGNvbnN0IHJpc2tCYWRnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmlzay1iYWRnZScpO1xuICAgIHJpc2tCYWRnZXMuZm9yRWFjaChiYWRnZSA9PiB7XG4gICAgICAgIGJhZGdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEuMDUpJztcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBiYWRnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgxKSc7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vLyBJbml0aWFsaXplIHNjb3JlIGFuaW1hdGlvbnNcbmZ1bmN0aW9uIGluaXRpYWxpemVTY29yZUFuaW1hdGlvbnMoKSB7XG4gICAgY29uc3Qgc2NvcmVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2R1bGUtc2NvcmUnKTtcbiAgICBcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmICFlbnRyeS50YXJnZXQuZGF0YXNldC5hbmltYXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlVGV4dCA9IGVudHJ5LnRhcmdldC50ZXh0Q29udGVudC5yZXBsYWNlKCclJywgJycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmFsU2NvcmUgPSBwYXJzZUludChzY29yZVRleHQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oZmluYWxTY29yZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjb3JlKGVudHJ5LnRhcmdldCwgZmluYWxTY29yZSk7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LnRhcmdldC5kYXRhc2V0LmFuaW1hdGVkID0gJ3RydWUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgc2NvcmVFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KSk7XG59XG5cbi8vIFV0aWxpdHkgZnVuY3Rpb24gdG8gYW5pbWF0ZSBzY29yZSBudW1iZXJzXG5mdW5jdGlvbiBhbmltYXRlU2NvcmUoZWxlbWVudCwgZmluYWxTY29yZSwgZHVyYXRpb24gPSAxNTAwKSB7XG4gICAgY29uc3Qgc3RhcnRTY29yZSA9IDA7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlU2NvcmUoY3VycmVudFRpbWUpIHtcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lO1xuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWluKGVsYXBzZWQgLyBkdXJhdGlvbiwgMSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjdXJyZW50U2NvcmUgPSBNYXRoLmZsb29yKHN0YXJ0U2NvcmUgKyAoZmluYWxTY29yZSAtIHN0YXJ0U2NvcmUpICogcHJvZ3Jlc3MpO1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY3VycmVudFNjb3JlICsgJyUnO1xuICAgICAgICBcbiAgICAgICAgaWYgKHByb2dyZXNzIDwgMSkge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVNjb3JlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlU2NvcmUpO1xufVxuXG4vLyBQcmludCBvcHRpbWl6YXRpb25cbmZ1bmN0aW9uIG9wdGltaXplRm9yUHJpbnQoKSB7XG4gICAgLy8gU2hvdyBhbGwgY29udGVudCBmb3IgcHJpbnRpbmdcbiAgICBjb25zdCBoaWRkZW5FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tzdHlsZSo9XCJkaXNwbGF5OiBub25lXCJdJyk7XG4gICAgaGlkZGVuRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9KTtcbiAgICBcbiAgICAvLyBFbnN1cmUgYWxsIGFuaW1hdGlvbnMgYXJlIGNvbXBsZXRlZFxuICAgIGNvbnN0IGFuaW1hdGVkRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbc3R5bGUqPVwidHJhbnNpdGlvblwiXScpO1xuICAgIGFuaW1hdGVkRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIFNldCBhbGwgcHJvZ3Jlc3MgYmFycyB0byB0aGVpciBmaW5hbCB2YWx1ZXNcbiAgICBjb25zdCBwcm9ncmVzc0JhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFyLWZpbGwsIC5wcm9ncmVzcy1maWxsJyk7XG4gICAgcHJvZ3Jlc3NCYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0V2lkdGggPSBiYXIuZ2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJyk7XG4gICAgICAgIGlmICh0YXJnZXRXaWR0aCkge1xuICAgICAgICAgICAgYmFyLnN0eWxlLndpZHRoID0gdGFyZ2V0V2lkdGg7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBwcmludCBoYW5kbGluZ1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXByaW50Jywgb3B0aW1pemVGb3JQcmludCk7XG5cbi8vIEV4cG9ydCBmdW5jdGlvbmFsaXR5IGZvciB0ZWNobmljYWwgYW5hbHlzaXMgZGF0YVxuZnVuY3Rpb24gZXhwb3J0VGVjaG5pY2FsQW5hbHlzaXMoKSB7XG4gICAgY29uc3QgdGVjaG5pY2FsRGF0YSA9IHtcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIGNvbXBhcmlzb246IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbXBhcmlzb25dJyk/LmdldEF0dHJpYnV0ZSgnZGF0YS1jb21wYXJpc29uJykgfHwgJycsXG4gICAgICAgIHBhZ2UxOiB7XG4gICAgICAgICAgICBmb2xkZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdlLWl0ZW0gLmZvbGRlci1uYW1lJylbMF0/LnRleHRDb250ZW50IHx8ICcnLFxuICAgICAgICAgICAgcGFnZUlkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFnZS1pdGVtIC5wYWdlLW5hbWUnKVswXT8udGV4dENvbnRlbnQgfHwgJydcbiAgICAgICAgfSxcbiAgICAgICAgcGFnZTI6IHtcbiAgICAgICAgICAgIGZvbGRlcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2UtaXRlbSAuZm9sZGVyLW5hbWUnKVsxXT8udGV4dENvbnRlbnQgfHwgJycsXG4gICAgICAgICAgICBwYWdlSWQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdlLWl0ZW0gLnBhZ2UtbmFtZScpWzFdPy50ZXh0Q29udGVudCB8fCAnJ1xuICAgICAgICB9LFxuICAgICAgICBzY29yZXM6IGV4dHJhY3RUZWNobmljYWxTY29yZXMoKSxcbiAgICAgICAgcmFkYXJEYXRhOiBleHRyYWN0UmFkYXJDaGFydERhdGEoKVxuICAgIH07XG4gICAgXG4gICAgLy8gRG93bmxvYWQgYXMgSlNPTlxuICAgIGNvbnN0IGRhdGFTdHIgPSBKU09OLnN0cmluZ2lmeSh0ZWNobmljYWxEYXRhLCBudWxsLCAyKTtcbiAgICBjb25zdCBkYXRhQmxvYiA9IG5ldyBCbG9iKFtkYXRhU3RyXSwge3R5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgIFxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhQmxvYik7XG4gICAgbGluay5kb3dubG9hZCA9IGB0ZWNobmljYWwtYW5hbHlzaXMtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0uanNvbmA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICBsaW5rLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbn1cblxuLy8gRXh0cmFjdCByYWRhciBjaGFydCBkYXRhIGZvciBleHBvcnRcbmZ1bmN0aW9uIGV4dHJhY3RSYWRhckNoYXJ0RGF0YSgpIHtcbiAgICBjb25zdCByYWRhckNoYXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlY2huaWNhbFJhZGFyJyk7XG4gICAgaWYgKCFyYWRhckNoYXJ0KSByZXR1cm4gbnVsbDtcbiAgICBcbiAgICBjb25zdCBkYXRhR3JvdXAgPSByYWRhckNoYXJ0LnF1ZXJ5U2VsZWN0b3IoJy5yYWRhci1kYXRhJyk7XG4gICAgY29uc3QgcG9seWdvbiA9IGRhdGFHcm91cD8ucXVlcnlTZWxlY3RvcigncG9seWdvbicpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHBvaW50czogcG9seWdvbj8uZ2V0QXR0cmlidXRlKCdwb2ludHMnKSB8fCAnJyxcbiAgICAgICAgbWV0cmljczogZXh0cmFjdFRlY2huaWNhbFNjb3JlcygpXG4gICAgfTtcbn1cblxuLy8gVGhlbWUgZGV0ZWN0aW9uIGFuZCBhZGFwdGF0aW9uXG5mdW5jdGlvbiBhZGFwdFRvU3lzdGVtVGhlbWUoKSB7XG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcykge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstdGhlbWUnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkanVzdCByYWRhciBjaGFydCBjb2xvcnMgZm9yIGRhcmsgdGhlbWVcbiAgICAgICAgY29uc3QgcmFkYXJTdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFkYXItc3ZnJyk7XG4gICAgICAgIGlmIChyYWRhclN2Zykge1xuICAgICAgICAgICAgY29uc3QgZ3JpZEVsZW1lbnRzID0gcmFkYXJTdmcucXVlcnlTZWxlY3RvckFsbCgnLnJhZGFyLWdyaWQgKicpO1xuICAgICAgICAgICAgZ3JpZEVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ3N0cm9rZScpID09PSAncmdiYSgxODgsIDE5NSwgMTk5LCAwLjMpJykge1xuICAgICAgICAgICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBMaXN0ZW4gZm9yIHRoZW1lIGNoYW5nZXNcbiAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBpZiAoZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstdGhlbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGFyay10aGVtZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIFBlcmZvcm1hbmNlIG1vbml0b3JpbmdcbmZ1bmN0aW9uIHRyYWNrUGVyZm9ybWFuY2UoKSB7XG4gICAgaWYgKCdwZXJmb3JtYW5jZScgaW4gd2luZG93KSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBsb2FkVGltZSA9IHBlcmZvcm1hbmNlLnRpbWluZy5sb2FkRXZlbnRFbmQgLSBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFRlY2huaWNhbCBwYWdlIGNvbXBhcmlzb24gbG9hZCB0aW1lOiAke2xvYWRUaW1lfW1zYCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFRyYWNrIHJhZGFyIGNoYXJ0IHJlbmRlcmluZyBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgY29uc3QgcmFkYXJTdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgaW5pdGlhbGl6ZVRlY2huaWNhbFJhZGFyKCk7XG4gICAgICAgICAgICBjb25zdCByYWRhckVuZCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFJhZGFyIGNoYXJ0IHJlbmRlcmluZyB0aW1lOiAke3JhZGFyRW5kIC0gcmFkYXJTdGFydH1tc2ApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vIEluaXRpYWxpemUgYWxsIGZ1bmN0aW9uYWxpdHkgd2hlbiBwYWdlIGxvYWRzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaW5pdGlhbGl6ZVBhZ2UoKTtcbiAgICBpbml0aWFsaXplU2NvcmVBbmltYXRpb25zKCk7XG4gICAgdHJhY2tQZXJmb3JtYW5jZSgpO1xuICAgIGFkYXB0VG9TeXN0ZW1UaGVtZSgpO1xufSk7XG5cbi8vIE1ha2UgZnVuY3Rpb25zIGF2YWlsYWJsZSBnbG9iYWxseSBmb3Igb25jbGljayBoYW5kbGVyc1xud2luZG93LmV4cG9ydFRlY2huaWNhbEFuYWx5c2lzID0gZXhwb3J0VGVjaG5pY2FsQW5hbHlzaXM7Il19
