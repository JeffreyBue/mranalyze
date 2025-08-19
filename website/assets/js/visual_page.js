(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Visual Page Comparison JavaScript

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initializePage();
});
function initializePage() {
  // Format timestamps
  formatTimestamps();

  // Initialize dashboard tabs
  initializeDashboardTabs();

  // Initialize screenshot tabs
  initializeScreenshotTabs();

  // Initialize progress rings
  initializeProgressRings();

  // Format comparison names
  formatComparisonNames();

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

// Initialize dashboard tab functionality
function initializeDashboardTabs() {
  var tabButtons = document.querySelectorAll('.tab-button');
  var tabContents = document.querySelectorAll('.tab-content');

  // Set first tab as active by default
  if (tabButtons.length > 0) {
    tabButtons[0].classList.add('active');
    tabContents[0].classList.add('active');
  }
  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var targetTab = this.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(function (btn) {
        return btn.classList.remove('active');
      });
      tabContents.forEach(function (content) {
        return content.classList.remove('active');
      });

      // Add active class to clicked button
      this.classList.add('active');

      // Show corresponding content
      var targetContent = document.getElementById(targetTab + '-tab');
      if (targetContent) {
        targetContent.classList.add('active');

        // Trigger animations for newly visible content
        triggerContentAnimations(targetContent);
      }
    });

    // Add keyboard support
    button.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Initialize screenshot viewport tabs
function initializeScreenshotTabs() {
  var screenshotTabs = document.querySelectorAll('.screenshot-tab');
  var screenshotViewports = document.querySelectorAll('.screenshot-viewport');

  // Set desktop as default active
  var defaultTab = document.querySelector('.screenshot-tab[data-viewport="desktop"]');
  var defaultViewport = document.querySelector('.screenshot-viewport.desktop');
  if (defaultTab && defaultViewport) {
    defaultTab.classList.add('active');
    defaultViewport.classList.add('active');
  }
  screenshotTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetViewport = this.getAttribute('data-viewport');

      // Remove active from all tabs and viewports
      screenshotTabs.forEach(function (t) {
        return t.classList.remove('active');
      });
      screenshotViewports.forEach(function (v) {
        return v.classList.remove('active');
      });

      // Add active to clicked tab
      this.classList.add('active');

      // Show corresponding viewport
      var viewport = document.querySelector(".screenshot-viewport[data-viewport=\"".concat(targetViewport, "\"]"));
      if (viewport) {
        viewport.classList.add('active');
      }
    });
  });
}

// Initialize progress ring animations
function initializeProgressRings() {
  var progressRings = document.querySelectorAll('.progress-ring');
  progressRings.forEach(function (ring) {
    var progressValue = ring.getAttribute('data-progress');
    var circle = ring.querySelector('.progress-ring-circle');
    if (circle && progressValue) {
      var radius = 45;
      var circumference = 2 * Math.PI * radius;
      var offset = circumference - progressValue / 100 * circumference;
      circle.style.strokeDashoffset = offset;

      // Animate on scroll into view
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              circle.style.strokeDashoffset = offset;
            }, 500);
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(ring);
    }
  });
}

// Trigger animations for newly visible content
function triggerContentAnimations(content) {
  // Animate metric bars
  var metricBars = content.querySelectorAll('.metric-fill');
  metricBars.forEach(function (bar, index) {
    setTimeout(function () {
      bar.style.transform = 'scaleX(1)';
    }, index * 100);
  });

  // Animate progress rings
  var progressRings = content.querySelectorAll('.progress-ring');
  progressRings.forEach(function (ring, index) {
    setTimeout(function () {
      var progressValue = ring.getAttribute('data-progress');
      var circle = ring.querySelector('.progress-ring-circle');
      if (circle && progressValue) {
        var radius = 45;
        var circumference = 2 * Math.PI * radius;
        var offset = circumference - progressValue / 100 * circumference;
        circle.style.strokeDashoffset = offset;
      }
    }, 200 + index * 100);
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

        // Trigger specific animations for different elements
        if (entry.target.classList.contains('metric-card')) {
          animateMetricCard(entry.target);
        }
        if (entry.target.classList.contains('color-element-card')) {
          animateColorCard(entry.target);
        }
        if (entry.target.classList.contains('typography-element-card')) {
          animateTypographyCard(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  var animatableElements = document.querySelectorAll('.metric-card, .color-element-card, .typography-element-card, .viewport-card, .layout-detail-card');
  animatableElements.forEach(function (element) {
    return observer.observe(element);
  });
}

// Animate metric cards
function animateMetricCard(card) {
  var progressRing = card.querySelector('.progress-ring');
  if (progressRing) {
    var progressValue = progressRing.getAttribute('data-progress');
    var circle = progressRing.querySelector('.progress-ring-circle');
    if (circle && progressValue) {
      var radius = 45;
      var circumference = 2 * Math.PI * radius;
      var offset = circumference - progressValue / 100 * circumference;
      setTimeout(function () {
        circle.style.strokeDashoffset = offset;
      }, 500);
    }
  }
}

// Animate color cards
function animateColorCard(card) {
  var swatches = card.querySelectorAll('.swatch');
  swatches.forEach(function (swatch, index) {
    setTimeout(function () {
      swatch.style.transform = 'scale(1.1)';
      setTimeout(function () {
        swatch.style.transform = 'scale(1)';
      }, 200);
    }, index * 100);
  });
}

// Animate typography cards
function animateTypographyCard(card) {
  var comparisons = card.querySelectorAll('.typo-comparison');
  comparisons.forEach(function (comparison, index) {
    setTimeout(function () {
      comparison.style.transform = 'translateX(10px)';
      setTimeout(function () {
        comparison.style.transform = 'translateX(0)';
      }, 200);
    }, index * 100);
  });
}

// Enhance accessibility
function enhanceAccessibility() {
  // Add ARIA labels to interactive elements
  var tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(function (button, index) {
    var tabName = button.getAttribute('data-tab') || button.textContent;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-label', "Switch to ".concat(tabName, " analysis"));
    button.setAttribute('tabindex', index === 0 ? '0' : '-1');
  });

  // Add ARIA labels to screenshot tabs
  var screenshotTabs = document.querySelectorAll('.screenshot-tab');
  screenshotTabs.forEach(function (tab) {
    var viewport = tab.getAttribute('data-viewport');
    tab.setAttribute('aria-label', "View ".concat(viewport, " screenshot comparison"));
  });

  // Add ARIA labels to progress rings
  var progressRings = document.querySelectorAll('.progress-ring');
  progressRings.forEach(function (ring) {
    var progress = ring.getAttribute('data-progress');
    ring.setAttribute('role', 'progressbar');
    ring.setAttribute('aria-valuenow', progress);
    ring.setAttribute('aria-valuemin', '0');
    ring.setAttribute('aria-valuemax', '100');
    ring.setAttribute('aria-label', "Score: ".concat(progress, "%"));
  });

  // Add focus management for tab navigation
  handleTabNavigation();
}

// Handle keyboard navigation for tabs
function handleTabNavigation() {
  var tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(function (button, index) {
    button.addEventListener('keydown', function (e) {
      var targetIndex;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = (index + 1) % tabButtons.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = tabButtons.length - 1;
          break;
        default:
          return;
      }

      // Update tabindex and focus
      tabButtons.forEach(function (btn) {
        return btn.setAttribute('tabindex', '-1');
      });
      tabButtons[targetIndex].setAttribute('tabindex', '0');
      tabButtons[targetIndex].focus();
    });
  });
}

// Enhanced hover effects for interactive elements
function enhanceInteractivity() {
  // Color swatch hover effects
  var colorSwatches = document.querySelectorAll('.color-swatch');
  colorSwatches.forEach(function (swatch) {
    var swatchElement = swatch.querySelector('.swatch');
    var colorValue = swatch.querySelector('.color-value');
    if (swatchElement && colorValue) {
      swatch.addEventListener('mouseenter', function () {
        swatchElement.style.transform = 'scale(1.2)';
        colorValue.style.fontWeight = '700';
      });
      swatch.addEventListener('mouseleave', function () {
        swatchElement.style.transform = 'scale(1)';
        colorValue.style.fontWeight = 'normal';
      });
    }
  });

  // Typography comparison hover effects
  var typoComparisons = document.querySelectorAll('.typo-comparison');
  typoComparisons.forEach(function (comparison) {
    comparison.addEventListener('mouseenter', function () {
      this.style.background = '#f8f9fa';
      this.style.transform = 'translateX(5px)';
    });
    comparison.addEventListener('mouseleave', function () {
      this.style.background = '#ecf0f1';
      this.style.transform = 'translateX(0)';
    });
  });

  // Layout detail card interactions
  var layoutCards = document.querySelectorAll('.layout-detail-card');
  layoutCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      var matchIndicator = this.querySelector('.match-indicator');
      if (matchIndicator) {
        matchIndicator.style.transform = 'scale(1.1)';
      }
    });
    card.addEventListener('mouseleave', function () {
      var matchIndicator = this.querySelector('.match-indicator');
      if (matchIndicator) {
        matchIndicator.style.transform = 'scale(1)';
      }
    });
  });
}

// Print optimization
function optimizeForPrint() {
  // Show all tab contents for printing
  var tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(function (content) {
    content.style.display = 'block';
  });

  // Show all screenshot viewports
  var viewports = document.querySelectorAll('.screenshot-viewport');
  viewports.forEach(function (viewport) {
    viewport.style.display = 'block';
  });

  // Ensure all animations are completed
  var animatedElements = document.querySelectorAll('[style*="transition"]');
  animatedElements.forEach(function (element) {
    element.style.transition = 'none';
  });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Export functionality for analysis data
function exportPageAnalysis() {
  var _document$querySelect, _document$querySelect2, _document$querySelect3, _document$querySelect4, _document$querySelect5, _document$querySelect6, _document$querySelect7, _document$querySelect8;
  var pageData = {
    timestamp: new Date().toISOString(),
    comparison: ((_document$querySelect = document.querySelector('[data-comparison]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('data-comparison')) || '',
    page1: {
      folder: ((_document$querySelect2 = document.querySelector('.page-item .folder-name')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent) || '',
      pageId: ((_document$querySelect3 = document.querySelector('.page-item .page-name')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.textContent) || ''
    },
    scores: {
      overall: ((_document$querySelect4 = document.querySelector('.score-percentage')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.textContent) || '',
      layout: ((_document$querySelect5 = document.querySelector('.metric-card.layout-card .metric-score')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.textContent) || '',
      colors: ((_document$querySelect6 = document.querySelector('.metric-card.colors-card .metric-score')) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.textContent) || '',
      typography: ((_document$querySelect7 = document.querySelector('.metric-card.typography-card .metric-score')) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7.textContent) || '',
      responsive: ((_document$querySelect8 = document.querySelector('.metric-card.responsive-card .metric-score')) === null || _document$querySelect8 === void 0 ? void 0 : _document$querySelect8.textContent) || ''
    }
  };

  // Download as JSON
  var dataStr = JSON.stringify(pageData, null, 2);
  var dataBlob = new Blob([dataStr], {
    type: 'application/json'
  });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = "page-analysis-".concat(new Date().toISOString().split('T')[0], ".json");
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

// Performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', function () {
      var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log("Visual page comparison load time: ".concat(loadTime, "ms"));
    });
  }
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

// Initialize score animations on scroll
function initializeScoreAnimations() {
  var scoreElements = document.querySelectorAll('.metric-score, .score-percentage');
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

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function () {
  initializePage();
  enhanceInteractivity();
  initializeScoreAnimations();
  trackPerformance();
  adaptToSystemTheme();
});

// Make functions available globally for onclick handlers
window.exportPageAnalysis = exportPageAnalysis;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzcmMvdmlzdWFsX3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBO0FBQ0EsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsY0FBYyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsU0FBUyxjQUFjLENBQUEsRUFBRztFQUN0QjtFQUNBLGdCQUFnQixDQUFDLENBQUM7O0VBRWxCO0VBQ0EsdUJBQXVCLENBQUMsQ0FBQzs7RUFFekI7RUFDQSx3QkFBd0IsQ0FBQyxDQUFDOztFQUUxQjtFQUNBLHVCQUF1QixDQUFDLENBQUM7O0VBRXpCO0VBQ0EscUJBQXFCLENBQUMsQ0FBQzs7RUFFdkI7RUFDQSxvQkFBb0IsQ0FBQyxDQUFDOztFQUV0QjtFQUNBLG9CQUFvQixDQUFDLENBQUM7QUFDMUI7O0FBRUE7QUFDQSxTQUFTLGdCQUFnQixDQUFBLEVBQUc7RUFDeEIsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUM7RUFDdkUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTyxFQUFJO0lBQ2pDLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7SUFDeEQsSUFBSSxTQUFTLEVBQUU7TUFDWCxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7TUFDaEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtRQUMvQyxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxNQUFNO1FBQ2IsR0FBRyxFQUFFLFNBQVM7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLE1BQU0sRUFBRTtNQUNaLENBQUMsQ0FBQztNQUNGLE9BQU8sQ0FBQyxXQUFXLEdBQUcsU0FBUztJ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O0VBQ2hCLG9CQUFvQixDQUFDLENBQUM7RUFDdEIseUJBQXlCLENBQUMsQ0FBQztFQUMzQixnQkFBZ0IsQ0FBQyxDQUFDO0VBQ2xCLGtCQUFrQixDQUFDLENBQUM7QUFDeEIsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsTUFBTSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFZpc3VhbCBQYWdlIENvbXBhcmlzb24gSmF2YVNjcmlwdFxuXG4vLyBJbml0aWFsaXplIHBhZ2Ugd2hlbiBET00gaXMgbG9hZGVkXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaW5pdGlhbGl6ZVBhZ2UoKTtcbn0pO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplUGFnZSgpIHtcbiAgICAvLyBGb3JtYXQgdGltZXN0YW1wc1xuICAgIGZvcm1hdFRpbWVzdGFtcHMoKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIGRhc2hib2FyZCB0YWJzXG4gICAgaW5pdGlhbGl6ZURhc2hib2FyZFRhYnMoKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIHNjcmVlbnNob3QgdGFic1xuICAgIGluaXRpYWxpemVTY3JlZW5zaG90VGFicygpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgcHJvZ3Jlc3MgcmluZ3NcbiAgICBpbml0aWFsaXplUHJvZ3Jlc3NSaW5ncygpO1xuICAgIFxuICAgIC8vIEZvcm1hdCBjb21wYXJpc29uIG5hbWVzXG4gICAgZm9ybWF0Q29tcGFyaXNvbk5hbWVzKCk7XG4gICAgXG4gICAgLy8gQWRkIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXNcbiAgICBlbmhhbmNlQWNjZXNzaWJpbGl0eSgpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUgYW5pbWF0aW9uc1xuICAgIGluaXRpYWxpemVBbmltYXRpb25zKCk7XG59XG5cbi8vIEZvcm1hdCB0aW1lc3RhbXBzIHRvIHJlYWRhYmxlIGRhdGVzXG5mdW5jdGlvbiBmb3JtYXRUaW1lc3RhbXBzKCkge1xuICAgIGNvbnN0IHRpbWVzdGFtcEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGltZXN0YW1wXScpO1xuICAgIHRpbWVzdGFtcEVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRpbWVzdGFtcCcpO1xuICAgICAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgICAgICAgICAgbWludXRlOiAnMi1kaWdpdCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBJbml0aWFsaXplIGRhc2hib2FyZCB0YWIgZnVuY3Rpb25hbGl0eVxuZnVuY3Rpb24gaW5pdGlhbGl6ZURhc2hib2FyZFRhYnMoKSB7XG4gICAgY29uc3QgdGFiQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItYnV0dG9uJyk7XG4gICAgY29uc3QgdGFiQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWNvbnRlbnQnKTtcbiAgICBcbiAgICAvLyBTZXQgZmlyc3QgdGFiIGFzIGFjdGl2ZSBieSBkZWZhdWx0XG4gICAgaWYgKHRhYkJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0YWJCdXR0b25zWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB0YWJDb250ZW50c1swXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgXG4gICAgdGFiQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0VGFiID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgYnV0dG9ucyBhbmQgY29udGVudHNcbiAgICAgICAgICAgIHRhYkJ1dHRvbnMuZm9yRWFjaChidG4gPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgICAgIHRhYkNvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjbGlja2VkIGJ1dHRvblxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU2hvdyBjb3JyZXNwb25kaW5nIGNvbnRlbnRcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRUYWIgKyAnLXRhYicpO1xuICAgICAgICAgICAgaWYgKHRhcmdldENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgYW5pbWF0aW9ucyBmb3IgbmV3bHkgdmlzaWJsZSBjb250ZW50XG4gICAgICAgICAgICAgICAgdHJpZ2dlckNvbnRlbnRBbmltYXRpb25zKHRhcmdldENvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBrZXlib2FyZCBzdXBwb3J0XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInIHx8IGUua2V5ID09PSAnICcpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBzY3JlZW5zaG90IHZpZXdwb3J0IHRhYnNcbmZ1bmN0aW9uIGluaXRpYWxpemVTY3JlZW5zaG90VGFicygpIHtcbiAgICBjb25zdCBzY3JlZW5zaG90VGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY3JlZW5zaG90LXRhYicpO1xuICAgIGNvbnN0IHNjcmVlbnNob3RWaWV3cG9ydHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NyZWVuc2hvdC12aWV3cG9ydCcpO1xuICAgIFxuICAgIC8vIFNldCBkZXNrdG9wIGFzIGRlZmF1bHQgYWN0aXZlXG4gICAgY29uc3QgZGVmYXVsdFRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JlZW5zaG90LXRhYltkYXRhLXZpZXdwb3J0PVwiZGVza3RvcFwiXScpO1xuICAgIGNvbnN0IGRlZmF1bHRWaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JlZW5zaG90LXZpZXdwb3J0LmRlc2t0b3AnKTtcbiAgICBcbiAgICBpZiAoZGVmYXVsdFRhYiAmJiBkZWZhdWx0Vmlld3BvcnQpIHtcbiAgICAgICAgZGVmYXVsdFRhYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgZGVmYXVsdFZpZXdwb3J0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBcbiAgICBzY3JlZW5zaG90VGFicy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Vmlld3BvcnQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS12aWV3cG9ydCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBSZW1vdmUgYWN0aXZlIGZyb20gYWxsIHRhYnMgYW5kIHZpZXdwb3J0c1xuICAgICAgICAgICAgc2NyZWVuc2hvdFRhYnMuZm9yRWFjaCh0ID0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgICAgICAgICAgc2NyZWVuc2hvdFZpZXdwb3J0cy5mb3JFYWNoKHYgPT4gdi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEFkZCBhY3RpdmUgdG8gY2xpY2tlZCB0YWJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNob3cgY29ycmVzcG9uZGluZyB2aWV3cG9ydFxuICAgICAgICAgICAgY29uc3Qgdmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2NyZWVuc2hvdC12aWV3cG9ydFtkYXRhLXZpZXdwb3J0PVwiJHt0YXJnZXRWaWV3cG9ydH1cIl1gKTtcbiAgICAgICAgICAgIGlmICh2aWV3cG9ydCkge1xuICAgICAgICAgICAgICAgIHZpZXdwb3J0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBwcm9ncmVzcyByaW5nIGFuaW1hdGlvbnNcbmZ1bmN0aW9uIGluaXRpYWxpemVQcm9ncmVzc1JpbmdzKCkge1xuICAgIGNvbnN0IHByb2dyZXNzUmluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZ3Jlc3MtcmluZycpO1xuICAgIFxuICAgIHByb2dyZXNzUmluZ3MuZm9yRWFjaChyaW5nID0+IHtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NWYWx1ZSA9IHJpbmcuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2dyZXNzJyk7XG4gICAgICAgIGNvbnN0IGNpcmNsZSA9IHJpbmcucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLXJpbmctY2lyY2xlJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoY2lyY2xlICYmIHByb2dyZXNzVmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IDQ1O1xuICAgICAgICAgICAgY29uc3QgY2lyY3VtZmVyZW5jZSA9IDIgKiBNYXRoLlBJICogcmFkaXVzO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gY2lyY3VtZmVyZW5jZSAtIChwcm9ncmVzc1ZhbHVlIC8gMTAwKSAqIGNpcmN1bWZlcmVuY2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBbmltYXRlIG9uIHNjcm9sbCBpbnRvIHZpZXdcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUocmluZyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gVHJpZ2dlciBhbmltYXRpb25zIGZvciBuZXdseSB2aXNpYmxlIGNvbnRlbnRcbmZ1bmN0aW9uIHRyaWdnZXJDb250ZW50QW5pbWF0aW9ucyhjb250ZW50KSB7XG4gICAgLy8gQW5pbWF0ZSBtZXRyaWMgYmFyc1xuICAgIGNvbnN0IG1ldHJpY0JhcnMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXRyaWMtZmlsbCcpO1xuICAgIG1ldHJpY0JhcnMuZm9yRWFjaCgoYmFyLCBpbmRleCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGJhci5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGVYKDEpJztcbiAgICAgICAgfSwgaW5kZXggKiAxMDApO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEFuaW1hdGUgcHJvZ3Jlc3MgcmluZ3NcbiAgICBjb25zdCBwcm9ncmVzc1JpbmdzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZ3Jlc3MtcmluZycpO1xuICAgIHByb2dyZXNzUmluZ3MuZm9yRWFjaCgocmluZywgaW5kZXgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzc1ZhbHVlID0gcmluZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MnKTtcbiAgICAgICAgICAgIGNvbnN0IGNpcmNsZSA9IHJpbmcucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLXJpbmctY2lyY2xlJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjaXJjbGUgJiYgcHJvZ3Jlc3NWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IDQ1O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNpcmN1bWZlcmVuY2UgPSAyICogTWF0aC5QSSAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBjaXJjdW1mZXJlbmNlIC0gKHByb2dyZXNzVmFsdWUgLyAxMDApICogY2lyY3VtZmVyZW5jZTtcbiAgICAgICAgICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwICsgKGluZGV4ICogMTAwKSk7XG4gICAgfSk7XG59XG5cbi8vIEZvcm1hdCBjb21wYXJpc29uIG5hbWVzIGFuZCB0ZWNobmljYWwgc3RyaW5nc1xuZnVuY3Rpb24gZm9ybWF0Q29tcGFyaXNvbk5hbWVzKCkge1xuICAgIGNvbnN0IGNvbXBhcmlzb25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbXBhcmlzb25dJyk7XG4gICAgY29tcGFyaXNvbkVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBhcmlzb24gPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1jb21wYXJpc29uJyk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IGZvcm1hdENvbXBhcmlzb25OYW1lKGNvbXBhcmlzb24pO1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0dGVkO1xuICAgIH0pO1xufVxuXG4vLyBGb3JtYXQgY29tcGFyaXNvbiBzdHJpbmcgdG8gcmVhZGFibGUgZm9ybWF0XG5mdW5jdGlvbiBmb3JtYXRDb21wYXJpc29uTmFtZShjb21wYXJpc29uKSB7XG4gICAgaWYgKCFjb21wYXJpc29uKSByZXR1cm4gJyc7XG4gICAgXG4gICAgLy8gU3BsaXQgYnkgX3ZzXyBhbmQgZm9ybWF0IGVhY2ggc2l0ZSBuYW1lXG4gICAgY29uc3QgcGFydHMgPSBjb21wYXJpc29uLnNwbGl0KCdfdnNfJyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCBzaXRlMSA9IGZvcm1hdFNpdGVOYW1lKHBhcnRzWzBdKTtcbiAgICAgICAgY29uc3Qgc2l0ZTIgPSBmb3JtYXRTaXRlTmFtZShwYXJ0c1sxXSk7XG4gICAgICAgIHJldHVybiBgJHtzaXRlMX0gdnMgJHtzaXRlMn1gO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gY29tcGFyaXNvbjtcbn1cblxuLy8gRm9ybWF0IHRlY2huaWNhbCBzaXRlIG5hbWUgdG8gcmVhZGFibGUgZm9ybWF0XG5mdW5jdGlvbiBmb3JtYXRTaXRlTmFtZSh0ZWNobmljYWxOYW1lKSB7XG4gICAgaWYgKCF0ZWNobmljYWxOYW1lKSByZXR1cm4gJyc7XG4gICAgXG4gICAgLy8gUmVtb3ZlIHRpbWVzdGFtcCBhbmQgY29udmVydCB0byByZWFkYWJsZSBmb3JtYXRcbiAgICBjb25zdCBzaXRlTmFtZSA9IHRlY2huaWNhbE5hbWUuc3BsaXQoJ18nKVswXTtcbiAgICBcbiAgICAvLyBDb252ZXJ0IHRvIHRpdGxlIGNhc2UgYW5kIGhhbmRsZSBjb21tb24gc2l0ZSBuYW1lc1xuICAgIGNvbnN0IHNpdGVNYXAgPSB7XG4gICAgICAgICdpbnN0YW50Y2hlY2ttYXRlJzogJ0luc3RhbnRDaGVja21hdGUnLFxuICAgICAgICAndHJ1dGhmaW5kZXInOiAnVHJ1dGhGaW5kZXInLFxuICAgICAgICAnaW50ZWxpdXMnOiAnSW50ZWxpdXMnLFxuICAgICAgICAnd2hpdGVwYWdlcyc6ICdXaGl0ZVBhZ2VzJ1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIHNpdGVNYXBbc2l0ZU5hbWUudG9Mb3dlckNhc2UoKV0gfHwgXG4gICAgICAgICAgIHNpdGVOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc2l0ZU5hbWUuc2xpY2UoMSk7XG59XG5cbi8vIEluaXRpYWxpemUgc2Nyb2xsLXRyaWdnZXJlZCBhbmltYXRpb25zXG5mdW5jdGlvbiBpbml0aWFsaXplQW5pbWF0aW9ucygpIHtcbiAgICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XG4gICAgICAgIHRocmVzaG9sZDogMC4xLFxuICAgICAgICByb290TWFyZ2luOiAnMHB4IDBweCAtNTBweCAwcHgnXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtaW4nKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHNwZWNpZmljIGFuaW1hdGlvbnMgZm9yIGRpZmZlcmVudCBlbGVtZW50c1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZXRyaWMtY2FyZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVNZXRyaWNDYXJkKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xvci1lbGVtZW50LWNhcmQnKSkge1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlQ29sb3JDYXJkKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0eXBvZ3JhcGh5LWVsZW1lbnQtY2FyZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVUeXBvZ3JhcGh5Q2FyZChlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgb2JzZXJ2ZXJPcHRpb25zKTtcbiAgICBcbiAgICAvLyBPYnNlcnZlIGFsbCBhbmltYXRhYmxlIGVsZW1lbnRzXG4gICAgY29uc3QgYW5pbWF0YWJsZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgJy5tZXRyaWMtY2FyZCwgLmNvbG9yLWVsZW1lbnQtY2FyZCwgLnR5cG9ncmFwaHktZWxlbWVudC1jYXJkLCAudmlld3BvcnQtY2FyZCwgLmxheW91dC1kZXRhaWwtY2FyZCdcbiAgICApO1xuICAgIGFuaW1hdGFibGVFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KSk7XG59XG5cbi8vIEFuaW1hdGUgbWV0cmljIGNhcmRzXG5mdW5jdGlvbiBhbmltYXRlTWV0cmljQ2FyZChjYXJkKSB7XG4gICAgY29uc3QgcHJvZ3Jlc3NSaW5nID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MtcmluZycpO1xuICAgIGlmIChwcm9ncmVzc1JpbmcpIHtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NWYWx1ZSA9IHByb2dyZXNzUmluZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MnKTtcbiAgICAgICAgY29uc3QgY2lyY2xlID0gcHJvZ3Jlc3NSaW5nLnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1yaW5nLWNpcmNsZScpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNpcmNsZSAmJiBwcm9ncmVzc1ZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCByYWRpdXMgPSA0NTtcbiAgICAgICAgICAgIGNvbnN0IGNpcmN1bWZlcmVuY2UgPSAyICogTWF0aC5QSSAqIHJhZGl1cztcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IGNpcmN1bWZlcmVuY2UgLSAocHJvZ3Jlc3NWYWx1ZSAvIDEwMCkgKiBjaXJjdW1mZXJlbmNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIEFuaW1hdGUgY29sb3IgY2FyZHNcbmZ1bmN0aW9uIGFuaW1hdGVDb2xvckNhcmQoY2FyZCkge1xuICAgIGNvbnN0IHN3YXRjaGVzID0gY2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcuc3dhdGNoJyk7XG4gICAgc3dhdGNoZXMuZm9yRWFjaCgoc3dhdGNoLCBpbmRleCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHN3YXRjaC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBzd2F0Y2guc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH0sIGluZGV4ICogMTAwKTtcbiAgICB9KTtcbn1cblxuLy8gQW5pbWF0ZSB0eXBvZ3JhcGh5IGNhcmRzXG5mdW5jdGlvbiBhbmltYXRlVHlwb2dyYXBoeUNhcmQoY2FyZCkge1xuICAgIGNvbnN0IGNvbXBhcmlzb25zID0gY2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwby1jb21wYXJpc29uJyk7XG4gICAgY29tcGFyaXNvbnMuZm9yRWFjaCgoY29tcGFyaXNvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb21wYXJpc29uLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDEwcHgpJztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbXBhcmlzb24uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMCknO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfSwgaW5kZXggKiAxMDApO1xuICAgIH0pO1xufVxuXG4vLyBFbmhhbmNlIGFjY2Vzc2liaWxpdHlcbmZ1bmN0aW9uIGVuaGFuY2VBY2Nlc3NpYmlsaXR5KCkge1xuICAgIC8vIEFkZCBBUklBIGxhYmVscyB0byBpbnRlcmFjdGl2ZSBlbGVtZW50c1xuICAgIGNvbnN0IHRhYkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWJ1dHRvbicpO1xuICAgIHRhYkJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB0YWJOYW1lID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKSB8fCBidXR0b24udGV4dENvbnRlbnQ7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgU3dpdGNoIHRvICR7dGFiTmFtZX0gYW5hbHlzaXNgKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCBpbmRleCA9PT0gMCA/ICcwJyA6ICctMScpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEFkZCBBUklBIGxhYmVscyB0byBzY3JlZW5zaG90IHRhYnNcbiAgICBjb25zdCBzY3JlZW5zaG90VGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY3JlZW5zaG90LXRhYicpO1xuICAgIHNjcmVlbnNob3RUYWJzLmZvckVhY2godGFiID0+IHtcbiAgICAgICAgY29uc3Qgdmlld3BvcnQgPSB0YWIuZ2V0QXR0cmlidXRlKCdkYXRhLXZpZXdwb3J0Jyk7XG4gICAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgVmlldyAke3ZpZXdwb3J0fSBzY3JlZW5zaG90IGNvbXBhcmlzb25gKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBBZGQgQVJJQSBsYWJlbHMgdG8gcHJvZ3Jlc3MgcmluZ3NcbiAgICBjb25zdCBwcm9ncmVzc1JpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2dyZXNzLXJpbmcnKTtcbiAgICBwcm9ncmVzc1JpbmdzLmZvckVhY2gocmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gcmluZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MnKTtcbiAgICAgICAgcmluZy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJvZ3Jlc3NiYXInKTtcbiAgICAgICAgcmluZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLCBwcm9ncmVzcyk7XG4gICAgICAgIHJpbmcuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbWluJywgJzAnKTtcbiAgICAgICAgcmluZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtYXgnLCAnMTAwJyk7XG4gICAgICAgIHJpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYFNjb3JlOiAke3Byb2dyZXNzfSVgKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBBZGQgZm9jdXMgbWFuYWdlbWVudCBmb3IgdGFiIG5hdmlnYXRpb25cbiAgICBoYW5kbGVUYWJOYXZpZ2F0aW9uKCk7XG59XG5cbi8vIEhhbmRsZSBrZXlib2FyZCBuYXZpZ2F0aW9uIGZvciB0YWJzXG5mdW5jdGlvbiBoYW5kbGVUYWJOYXZpZ2F0aW9uKCkge1xuICAgIGNvbnN0IHRhYkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWJ1dHRvbicpO1xuICAgIFxuICAgIHRhYkJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRJbmRleDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3dpdGNoKGUua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCA9IChpbmRleCArIDEpICUgdGFiQnV0dG9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSAoaW5kZXggLSAxICsgdGFiQnV0dG9ucy5sZW5ndGgpICUgdGFiQnV0dG9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCA9IHRhYkJ1dHRvbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGFiaW5kZXggYW5kIGZvY3VzXG4gICAgICAgICAgICB0YWJCdXR0b25zLmZvckVhY2goYnRuID0+IGJ0bi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJykpO1xuICAgICAgICAgICAgdGFiQnV0dG9uc1t0YXJnZXRJbmRleF0uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgICAgICB0YWJCdXR0b25zW3RhcmdldEluZGV4XS5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gRW5oYW5jZWQgaG92ZXIgZWZmZWN0cyBmb3IgaW50ZXJhY3RpdmUgZWxlbWVudHNcbmZ1bmN0aW9uIGVuaGFuY2VJbnRlcmFjdGl2aXR5KCkge1xuICAgIC8vIENvbG9yIHN3YXRjaCBob3ZlciBlZmZlY3RzXG4gICAgY29uc3QgY29sb3JTd2F0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2xvci1zd2F0Y2gnKTtcbiAgICBjb2xvclN3YXRjaGVzLmZvckVhY2goc3dhdGNoID0+IHtcbiAgICAgICAgY29uc3Qgc3dhdGNoRWxlbWVudCA9IHN3YXRjaC5xdWVyeVNlbGVjdG9yKCcuc3dhdGNoJyk7XG4gICAgICAgIGNvbnN0IGNvbG9yVmFsdWUgPSBzd2F0Y2gucXVlcnlTZWxlY3RvcignLmNvbG9yLXZhbHVlJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoc3dhdGNoRWxlbWVudCAmJiBjb2xvclZhbHVlKSB7XG4gICAgICAgICAgICBzd2F0Y2guYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHN3YXRjaEVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEuMiknO1xuICAgICAgICAgICAgICAgIGNvbG9yVmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICc3MDAnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHN3YXRjaC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc3dhdGNoRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xuICAgICAgICAgICAgICAgIGNvbG9yVmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdub3JtYWwnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBUeXBvZ3JhcGh5IGNvbXBhcmlzb24gaG92ZXIgZWZmZWN0c1xuICAgIGNvbnN0IHR5cG9Db21wYXJpc29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50eXBvLWNvbXBhcmlzb24nKTtcbiAgICB0eXBvQ29tcGFyaXNvbnMuZm9yRWFjaChjb21wYXJpc29uID0+IHtcbiAgICAgICAgY29tcGFyaXNvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLmJhY2tncm91bmQgPSAnI2Y4ZjlmYSc7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDVweCknO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbXBhcmlzb24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNlY2YwZjEnO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwKSc7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIExheW91dCBkZXRhaWwgY2FyZCBpbnRlcmFjdGlvbnNcbiAgICBjb25zdCBsYXlvdXRDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sYXlvdXQtZGV0YWlsLWNhcmQnKTtcbiAgICBsYXlvdXRDYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kaWNhdG9yID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWF0Y2gtaW5kaWNhdG9yJyk7XG4gICAgICAgICAgICBpZiAobWF0Y2hJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgICAgICBtYXRjaEluZGljYXRvci5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaEluZGljYXRvciA9IHRoaXMucXVlcnlTZWxlY3RvcignLm1hdGNoLWluZGljYXRvcicpO1xuICAgICAgICAgICAgaWYgKG1hdGNoSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hJbmRpY2F0b3Iuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbi8vIFByaW50IG9wdGltaXphdGlvblxuZnVuY3Rpb24gb3B0aW1pemVGb3JQcmludCgpIHtcbiAgICAvLyBTaG93IGFsbCB0YWIgY29udGVudHMgZm9yIHByaW50aW5nXG4gICAgY29uc3QgdGFiQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWNvbnRlbnQnKTtcbiAgICB0YWJDb250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4ge1xuICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIFNob3cgYWxsIHNjcmVlbnNob3Qgdmlld3BvcnRzXG4gICAgY29uc3Qgdmlld3BvcnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjcmVlbnNob3Qtdmlld3BvcnQnKTtcbiAgICB2aWV3cG9ydHMuZm9yRWFjaCh2aWV3cG9ydCA9PiB7XG4gICAgICAgIHZpZXdwb3J0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIEVuc3VyZSBhbGwgYW5pbWF0aW9ucyBhcmUgY29tcGxldGVkXG4gICAgY29uc3QgYW5pbWF0ZWRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tzdHlsZSo9XCJ0cmFuc2l0aW9uXCJdJyk7XG4gICAgYW5pbWF0ZWRFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgfSk7XG59XG5cbi8vIEluaXRpYWxpemUgcHJpbnQgaGFuZGxpbmdcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVwcmludCcsIG9wdGltaXplRm9yUHJpbnQpO1xuXG4vLyBFeHBvcnQgZnVuY3Rpb25hbGl0eSBmb3IgYW5hbHlzaXMgZGF0YVxuZnVuY3Rpb24gZXhwb3J0UGFnZUFuYWx5c2lzKCkge1xuICAgIGNvbnN0IHBhZ2VEYXRhID0ge1xuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgY29tcGFyaXNvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29tcGFyaXNvbl0nKT8uZ2V0QXR0cmlidXRlKCdkYXRhLWNvbXBhcmlzb24nKSB8fCAnJyxcbiAgICAgICAgcGFnZTE6IHtcbiAgICAgICAgICAgIGZvbGRlcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaXRlbSAuZm9sZGVyLW5hbWUnKT8udGV4dENvbnRlbnQgfHwgJycsXG4gICAgICAgICAgICBwYWdlSWQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWl0ZW0gLnBhZ2UtbmFtZScpPy50ZXh0Q29udGVudCB8fCAnJ1xuICAgICAgICB9LFxuICAgICAgICBzY29yZXM6IHtcbiAgICAgICAgICAgIG92ZXJhbGw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZS1wZXJjZW50YWdlJyk/LnRleHRDb250ZW50IHx8ICcnLFxuICAgICAgICAgICAgbGF5b3V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWV0cmljLWNhcmQubGF5b3V0LWNhcmQgLm1ldHJpYy1zY29yZScpPy50ZXh0Q29udGVudCB8fCAnJyxcbiAgICAgICAgICAgIGNvbG9yczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1ldHJpYy1jYXJkLmNvbG9ycy1jYXJkIC5tZXRyaWMtc2NvcmUnKT8udGV4dENvbnRlbnQgfHwgJycsXG4gICAgICAgICAgICB0eXBvZ3JhcGh5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWV0cmljLWNhcmQudHlwb2dyYXBoeS1jYXJkIC5tZXRyaWMtc2NvcmUnKT8udGV4dENvbnRlbnQgfHwgJycsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWV0cmljLWNhcmQucmVzcG9uc2l2ZS1jYXJkIC5tZXRyaWMtc2NvcmUnKT8udGV4dENvbnRlbnQgfHwgJydcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgLy8gRG93bmxvYWQgYXMgSlNPTlxuICAgIGNvbnN0IGRhdGFTdHIgPSBKU09OLnN0cmluZ2lmeShwYWdlRGF0YSwgbnVsbCwgMik7XG4gICAgY29uc3QgZGF0YUJsb2IgPSBuZXcgQmxvYihbZGF0YVN0cl0sIHt0eXBlOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgICBcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZGF0YUJsb2IpO1xuICAgIGxpbmsuZG93bmxvYWQgPSBgcGFnZS1hbmFseXNpcy0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS5qc29uYDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xufVxuXG4vLyBUaGVtZSBkZXRlY3Rpb24gYW5kIGFkYXB0YXRpb25cbmZ1bmN0aW9uIGFkYXB0VG9TeXN0ZW1UaGVtZSgpIHtcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay10aGVtZScpO1xuICAgIH1cbiAgICBcbiAgICAvLyBMaXN0ZW4gZm9yIHRoZW1lIGNoYW5nZXNcbiAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBpZiAoZS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstdGhlbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGFyay10aGVtZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIFBlcmZvcm1hbmNlIG1vbml0b3JpbmdcbmZ1bmN0aW9uIHRyYWNrUGVyZm9ybWFuY2UoKSB7XG4gICAgaWYgKCdwZXJmb3JtYW5jZScgaW4gd2luZG93KSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBsb2FkVGltZSA9IHBlcmZvcm1hbmNlLnRpbWluZy5sb2FkRXZlbnRFbmQgLSBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFZpc3VhbCBwYWdlIGNvbXBhcmlzb24gbG9hZCB0aW1lOiAke2xvYWRUaW1lfW1zYCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gVXRpbGl0eSBmdW5jdGlvbiB0byBhbmltYXRlIHNjb3JlIG51bWJlcnNcbmZ1bmN0aW9uIGFuaW1hdGVTY29yZShlbGVtZW50LCBmaW5hbFNjb3JlLCBkdXJhdGlvbiA9IDE1MDApIHtcbiAgICBjb25zdCBzdGFydFNjb3JlID0gMDtcbiAgICBjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBcbiAgICBmdW5jdGlvbiB1cGRhdGVTY29yZShjdXJyZW50VGltZSkge1xuICAgICAgICBjb25zdCBlbGFwc2VkID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5taW4oZWxhcHNlZCAvIGR1cmF0aW9uLCAxKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTY29yZSA9IE1hdGguZmxvb3Ioc3RhcnRTY29yZSArIChmaW5hbFNjb3JlIC0gc3RhcnRTY29yZSkgKiBwcm9ncmVzcyk7XG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50U2NvcmUgKyAnJSc7XG4gICAgICAgIFxuICAgICAgICBpZiAocHJvZ3Jlc3MgPCAxKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlU2NvcmUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVTY29yZSk7XG59XG5cbi8vIEluaXRpYWxpemUgc2NvcmUgYW5pbWF0aW9ucyBvbiBzY3JvbGxcbmZ1bmN0aW9uIGluaXRpYWxpemVTY29yZUFuaW1hdGlvbnMoKSB7XG4gICAgY29uc3Qgc2NvcmVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXRyaWMtc2NvcmUsIC5zY29yZS1wZXJjZW50YWdlJyk7XG4gICAgXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZyAmJiAhZW50cnkudGFyZ2V0LmRhdGFzZXQuYW5pbWF0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZVRleHQgPSBlbnRyeS50YXJnZXQudGV4dENvbnRlbnQucmVwbGFjZSgnJScsICcnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5hbFNjb3JlID0gcGFyc2VJbnQoc2NvcmVUZXh0KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKGZpbmFsU2NvcmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY29yZShlbnRyeS50YXJnZXQsIGZpbmFsU2NvcmUpO1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuZGF0YXNldC5hbmltYXRlZCA9ICd0cnVlJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIHNjb3JlRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCkpO1xufVxuXG4vLyBJbml0aWFsaXplIGFsbCBmdW5jdGlvbmFsaXR5IHdoZW4gcGFnZSBsb2Fkc1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGluaXRpYWxpemVQYWdlKCk7XG4gICAgZW5oYW5jZUludGVyYWN0aXZpdHkoKTtcbiAgICBpbml0aWFsaXplU2NvcmVBbmltYXRpb25zKCk7XG4gICAgdHJhY2tQZXJmb3JtYW5jZSgpO1xuICAgIGFkYXB0VG9TeXN0ZW1UaGVtZSgpO1xufSk7XG5cbi8vIE1ha2UgZnVuY3Rpb25zIGF2YWlsYWJsZSBnbG9iYWxseSBmb3Igb25jbGljayBoYW5kbGVyc1xud2luZG93LmV4cG9ydFBhZ2VBbmFseXNpcyA9IGV4cG9ydFBhZ2VBbmFseXNpczsiXX0=
