(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Scraped Route Analysis JavaScript

// // Initialize page when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     initializePage();
// });

function initializePage() {
  // Format timestamps
  formatTimestamps();

  // Initialize tabs
  initializeTabs();

  // Initialize collapsible sections
  initializeCollapsibleSections();

  // Initialize search functionality
  initializeSearch();
  console.log('Search functionality initialized');

  // Initialize keyboard navigation
  initializeKeyboardNavigation();

  // Initialize copy functionality
  initializeCopyFunctionality();

  // Add scroll animations
  initializeScrollAnimations();

  // Initialize responsive tables
  initializeResponsiveTables();
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
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      element.textContent = formatted;
    }
  });
}

// Initialize tab functionality
function initializeTabs() {
  var tabButtons = document.querySelectorAll('.tab-button');
  var tabContents = document.querySelectorAll('.tab-content');
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

      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      var targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      // Update URL hash
      window.location.hash = targetTab;

      // Trigger resize event for any charts or dynamic content
      window.dispatchEvent(new Event('resize'));
    });
  });

  // Handle initial tab from URL hash
  var hash = window.location.hash.substring(1);
  if (hash) {
    var targetButton = document.querySelector("[data-tab=\"".concat(hash, "\"]"));
    if (targetButton) {
      targetButton.click();
    }
  }
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
  var toggleButtons = document.querySelectorAll('.toggle-button');

  // toggleButtons.forEach(button => {
  //     button.addEventListener('click', function() {
  //         toggleSection(this);
  //     });
  // });
}

// Toggle section visibility
function toggleSection(button) {
  console.log('Toggling section:', button);
  var section = button.closest('.content-section, .visual-section, .technical-section');
  var content = section.querySelector('.section-content');
  var icon = button.querySelector('.toggle-icon');
  if (content.classList.contains('collapsed')) {
    // Expand
    content.classList.remove('collapsed');
    content.style.display = 'block';
    button.classList.remove('collapsed');

    // Animate expansion
    content.style.maxHeight = '0px';
    content.style.opacity = '0';
    setTimeout(function () {
      content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';
      setTimeout(function () {
        content.style.maxHeight = 'none';
        content.style.transition = '';
      }, 300);
    }, 10);
  } else {
    // Collapse
    content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    content.style.maxHeight = content.scrollHeight + 'px';
    setTimeout(function () {
      content.style.maxHeight = '0px';
      content.style.opacity = '0';
    }, 10);
    setTimeout(function () {
      content.classList.add('collapsed');
      content.style.display = 'none';
      button.classList.add('collapsed');
      content.style.transition = '';
    }, 300);
  }
}

// Initialize search functionality
function initializeSearch() {
  // Add search input to each scrollable list
  var scrollableLists = document.querySelectorAll('.paragraph-list, .navigation-list, .css-classes-list, .resource-list');
  scrollableLists.forEach(function (list) {
    var searchInput = document.createElement('input');
    searchInput.id = "search-".concat(list.className);
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.className = 'search-input';
    var searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.appendChild(searchInput);
    if (list.classList.contains('paragraph-list')) console.log(list, searchContainer);
    list.parentNode.insertBefore(searchContainer, list);
    searchInput.addEventListener('input', function () {
      var searchTerm = this.value.toLowerCase();
      var items = list.querySelectorAll('.paragraph-item, .nav-item, .css-class-item, .resource-item');
      items.forEach(function (item) {
        var text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Initialize keyboard navigation
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', function (e) {
    // Tab navigation with arrow keys
    if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      var activeTab = document.querySelector('.tab-button.active');
      var allTabs = Array.from(document.querySelectorAll('.tab-button'));
      var currentIndex = allTabs.indexOf(activeTab);
      var newIndex;
      if (e.key === 'ArrowLeft') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
      } else {
        newIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
      }
      allTabs[newIndex].click();
    }

    // Escape key to close all expanded sections
    if (e.key === 'Escape') {
      var expandedSections = document.querySelectorAll('.section-content:not(.collapsed)');
      expandedSections.forEach(function (section) {
        var toggleButton = section.parentNode.querySelector('.toggle-button');
        if (toggleButton && !toggleButton.classList.contains('collapsed')) {
          toggleSection(toggleButton);
        }
      });
    }

    // Ctrl+F to focus search inputs
    if (e.ctrlKey && e.key === 'f') {
      var _activeTab = document.querySelector('.tab-content.active');
      var searchInput = _activeTab.querySelector('.search-input');
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    }
  });
}

// Initialize copy functionality
function initializeCopyFunctionality() {
  // Add copy buttons to code blocks
  var codeBlocks = document.querySelectorAll('.code-block pre');
  codeBlocks.forEach(function (block) {
    if (!block.parentNode.querySelector('.copy-button')) {
      var copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.innerHTML = "\n                <svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\">\n                    <path d=\"M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z\"/>\n                </svg>\n                Copy\n            ";
      block.parentNode.appendChild(copyButton);
      copyButton.addEventListener('click', function () {
        copyToClipboard(block.textContent);
        showCopyFeedback(this);
      });
    }
  });
}

// Copy snapshot content
function copySnapshot() {
  var snapshotContent = document.getElementById('snapshot-code');
  if (snapshotContent) {
    var text = snapshotContent.textContent;
    copyToClipboard(text);
    var copyButton = document.querySelector('.snapshot-actions .copy-button');
    showCopyFeedback(copyButton);
  }
}

// Download snapshot content
function downloadSnapshot() {
  var snapshotContent = document.getElementById('snapshot-code');
  if (snapshotContent) {
    var text = snapshotContent.textContent;
    var blob = new Blob([text], {
      type: 'text/plain'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = "route-snapshot-".concat(new Date().toISOString().split('T')[0], ".txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Copy text to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  }
}

// Show copy feedback
function showCopyFeedback(button) {
  var originalText = button.innerHTML;
  button.innerHTML = "\n        <svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\">\n            <path d=\"M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z\"/>\n        </svg>\n        Copied!\n    ";
  button.style.background = '#27ae60';
  setTimeout(function () {
    button.innerHTML = originalText;
    button.style.background = '';
  }, 2000);
}

// Initialize scroll animations
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

  // Observe all cards and sections
  var observeElements = document.querySelectorAll('.overview-card, .content-section, .visual-section, .technical-section, .snapshot-section');
  observeElements.forEach(function (element) {
    observer.observe(element);
  });
}

// Initialize responsive tables
function initializeResponsiveTables() {
  var tables = document.querySelectorAll('table');
  tables.forEach(function (table) {
    var wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}

// Utility functions
function debounce(func, wait) {
  var timeout;
  return function executedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var later = function later() {
      clearTimeout(timeout);
      func.apply(void 0, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export data functionality
function exportRouteData() {
  var _document$querySelect, _document$querySelect2, _document$querySelect3, _document$querySelect4, _document$querySelect5, _document$querySelect6, _document$querySelect7;
  var routeData = {
    url: ((_document$querySelect = document.querySelector('.route-url')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.textContent) || '',
    pageId: ((_document$querySelect2 = document.querySelector('.route-id')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent) || '',
    scrapedAt: ((_document$querySelect3 = document.querySelector('.scraped-date')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.textContent) || '',
    stats: {
      words: ((_document$querySelect4 = document.querySelector('.stat-item:nth-child(1) .stat-number')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.textContent) || '0',
      characters: ((_document$querySelect5 = document.querySelector('.stat-item:nth-child(2) .stat-number')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.textContent) || '0',
      images: ((_document$querySelect6 = document.querySelector('.stat-item:nth-child(3) .stat-number')) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.textContent) || '0',
      links: ((_document$querySelect7 = document.querySelector('.stat-item:nth-child(4) .stat-number')) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7.textContent) || '0'
    },
    exported: new Date().toISOString()
  };
  var dataStr = JSON.stringify(routeData, null, 2);
  var dataBlob = new Blob([dataStr], {
    type: 'application/json'
  });
  var url = URL.createObjectURL(dataBlob);
  var a = document.createElement('a');
  a.href = url;
  a.download = "route-data-".concat(new Date().toISOString().split('T')[0], ".json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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

// Print optimization
function optimizeForPrint() {
  // Expand all sections for printing
  var collapsedSections = document.querySelectorAll('.section-content.collapsed');
  collapsedSections.forEach(function (section) {
    section.classList.remove('collapsed');
    section.style.display = 'block';
  });

  // Show all tabs
  var tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(function (content) {
    content.classList.add('active');
  });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', function () {
      var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log("Route analysis page load time: ".concat(loadTime, "ms"));
    });
  }
}

// Initialize touch gestures for mobile
function initializeTouchGestures() {
  var touchStartX = 0;
  var touchEndX = 0;
  document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  function handleSwipe() {
    var swipeThreshold = 50;
    var swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > swipeThreshold) {
      var activeTab = document.querySelector('.tab-button.active');
      var allTabs = Array.from(document.querySelectorAll('.tab-button'));
      var currentIndex = allTabs.indexOf(activeTab);
      var newIndex;
      if (swipeDistance > 0 && currentIndex > 0) {
        // Swipe right - go to previous tab
        newIndex = currentIndex - 1;
      } else if (swipeDistance < 0 && currentIndex < allTabs.length - 1) {
        // Swipe left - go to next tab
        newIndex = currentIndex + 1;
      }
      if (newIndex !== undefined) {
        allTabs[newIndex].click();
      }
    }
  }
}

// Auto-save scroll position
function initializeScrollMemory() {
  var tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(function (content) {
    var tabId = content.id;

    // Restore scroll position
    var savedScrollTop = localStorage.getItem("scroll-".concat(tabId));
    if (savedScrollTop) {
      content.scrollTop = parseInt(savedScrollTop);
    }

    // Save scroll position
    content.addEventListener('scroll', debounce(function () {
      localStorage.setItem("scroll-".concat(tabId), this.scrollTop);
    }, 100));
  });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function () {
  initializePage();
  trackPerformance();
  initializeTouchGestures();
  initializeScrollMemory();
  adaptToSystemTheme();
});

// Make functions available globally
window.toggleSection = toggleSection;
window.copySnapshot = copySnapshot;
window.downloadSnapshot = downloadSnapshot;
window.exportRouteData = exportRouteData;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzcmMvcmVwb3J0X3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVMsY0FBYyxDQUFBLEVBQUc7RUFDdEI7RUFDQSxnQkFBZ0IsQ0FBQyxDQUFDOztFQUVsQjtFQUNBLGNBQWMsQ0FBQyxDQUFDOztFQUVoQjtFQUNBLDZCQUE2QixDQUFDLENBQUM7O0VBRS9CO0VBQ0EsZ0JBQWdCLENBQUMsQ0FBQztFQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDOztFQUUvQztFQUNBLDRCQUE0QixDQUFDLENBQUM7O0VBRTlCO0VBQ0EsMkJBQTJCLENBQUMsQ0FBQzs7RUFFN0I7RUFDQSwwQkFBMEIsQ0FBQyxDQUFDOztFQUU1QjtFQUNBLDBCQUEwQixDQUFDLENBQUM7QUFDaEM7O0FBRUE7QUFDQSxTQUFTLGdCQUFnQixDQUFBLEVBQUc7RUFDeEIsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUM7RUFDdkUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTyxFQUFJO0lBQ2pDLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7SUFDeEQsSUFBSSxTQUFTLEVBQUU7TUFDWCxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7TUFDaEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtRQUMvQyxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxPQUFPO1FBQ2QsR0FBRyxFQUFFLFNBQVM7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLE1BQU0sRUFBRTtNQUNaLENBQUMsQ0FBQztNQUNGLE9BQU8sQ0FBQyxXQUFXLEdBQUcsU0FBUztJ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QWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUNyRCxjQUFjLENBQUMsQ0FBQztFQUNoQixnQkFBZ0IsQ0FBQyxDQUFDO0VBQ2xCLHVCQUF1QixDQUFDLENBQUM7RUFDekIsc0JBQXNCLENBQUMsQ0FBQztFQUN4QixrQkFBa0IsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQzs7QUFFRjtBQUNBLE1BQU0sQ0FBQyxhQUFhLEdBQUcsYUFBYTtBQUNwQyxNQUFNLENBQUMsWUFBWSxHQUFHLFlBQVk7QUFDbEMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQjtBQUMxQyxNQUFNLENBQUMsZUFBZSxHQUFHLGVBQWUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBTY3JhcGVkIFJvdXRlIEFuYWx5c2lzIEphdmFTY3JpcHRcblxuLy8gLy8gSW5pdGlhbGl6ZSBwYWdlIHdoZW4gRE9NIGlzIGxvYWRlZFxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuLy8gICAgIGluaXRpYWxpemVQYWdlKCk7XG4vLyB9KTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBhZ2UoKSB7XG4gICAgLy8gRm9ybWF0IHRpbWVzdGFtcHNcbiAgICBmb3JtYXRUaW1lc3RhbXBzKCk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSB0YWJzXG4gICAgaW5pdGlhbGl6ZVRhYnMoKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIGNvbGxhcHNpYmxlIHNlY3Rpb25zXG4gICAgaW5pdGlhbGl6ZUNvbGxhcHNpYmxlU2VjdGlvbnMoKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIHNlYXJjaCBmdW5jdGlvbmFsaXR5XG4gICAgaW5pdGlhbGl6ZVNlYXJjaCgpO1xuICAgIGNvbnNvbGUubG9nKCdTZWFyY2ggZnVuY3Rpb25hbGl0eSBpbml0aWFsaXplZCcpO1xuICAgIFxuICAgIC8vIEluaXRpYWxpemUga2V5Ym9hcmQgbmF2aWdhdGlvblxuICAgIGluaXRpYWxpemVLZXlib2FyZE5hdmlnYXRpb24oKTtcbiAgICBcbiAgICAvLyBJbml0aWFsaXplIGNvcHkgZnVuY3Rpb25hbGl0eVxuICAgIGluaXRpYWxpemVDb3B5RnVuY3Rpb25hbGl0eSgpO1xuICAgIFxuICAgIC8vIEFkZCBzY3JvbGwgYW5pbWF0aW9uc1xuICAgIGluaXRpYWxpemVTY3JvbGxBbmltYXRpb25zKCk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSByZXNwb25zaXZlIHRhYmxlc1xuICAgIGluaXRpYWxpemVSZXNwb25zaXZlVGFibGVzKCk7XG59XG5cbi8vIEZvcm1hdCB0aW1lc3RhbXBzIHRvIHJlYWRhYmxlIGRhdGVzXG5mdW5jdGlvbiBmb3JtYXRUaW1lc3RhbXBzKCkge1xuICAgIGNvbnN0IHRpbWVzdGFtcEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGltZXN0YW1wXScpO1xuICAgIHRpbWVzdGFtcEVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRpbWVzdGFtcCcpO1xuICAgICAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgaG91cjogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgIG1pbnV0ZTogJzItZGlnaXQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWQ7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSB0YWIgZnVuY3Rpb25hbGl0eVxuZnVuY3Rpb24gaW5pdGlhbGl6ZVRhYnMoKSB7XG4gICAgY29uc3QgdGFiQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItYnV0dG9uJyk7XG4gICAgY29uc3QgdGFiQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWNvbnRlbnQnKTtcbiAgICBcbiAgICB0YWJCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRUYWIgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBidXR0b25zIGFuZCBjb250ZW50c1xuICAgICAgICAgICAgdGFiQnV0dG9ucy5mb3JFYWNoKGJ0biA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgICAgICAgICAgdGFiQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGNsaWNrZWQgYnV0dG9uIGFuZCBjb3JyZXNwb25kaW5nIGNvbnRlbnRcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0VGFiKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Q29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIFVSTCBoYXNoXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHRhcmdldFRhYjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVHJpZ2dlciByZXNpemUgZXZlbnQgZm9yIGFueSBjaGFydHMgb3IgZHluYW1pYyBjb250ZW50XG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gSGFuZGxlIGluaXRpYWwgdGFiIGZyb20gVVJMIGhhc2hcbiAgICBjb25zdCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpO1xuICAgIGlmIChoYXNoKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRhYj1cIiR7aGFzaH1cIl1gKTtcbiAgICAgICAgaWYgKHRhcmdldEJ1dHRvbikge1xuICAgICAgICAgICAgdGFyZ2V0QnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIEluaXRpYWxpemUgY29sbGFwc2libGUgc2VjdGlvbnNcbmZ1bmN0aW9uIGluaXRpYWxpemVDb2xsYXBzaWJsZVNlY3Rpb25zKCkge1xuICAgIGNvbnN0IHRvZ2dsZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9nZ2xlLWJ1dHRvbicpO1xuICAgIFxuICAgIC8vIHRvZ2dsZUJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgIC8vICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgIHRvZ2dsZVNlY3Rpb24odGhpcyk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH0pO1xufVxuXG4vLyBUb2dnbGUgc2VjdGlvbiB2aXNpYmlsaXR5XG5mdW5jdGlvbiB0b2dnbGVTZWN0aW9uKGJ1dHRvbikge1xuICAgIGNvbnNvbGUubG9nKCdUb2dnbGluZyBzZWN0aW9uOicsIGJ1dHRvbik7XG4gICAgY29uc3Qgc2VjdGlvbiA9IGJ1dHRvbi5jbG9zZXN0KCcuY29udGVudC1zZWN0aW9uLCAudmlzdWFsLXNlY3Rpb24sIC50ZWNobmljYWwtc2VjdGlvbicpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLWNvbnRlbnQnKTtcbiAgICBjb25zdCBpY29uID0gYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtaWNvbicpO1xuICAgIFxuICAgIGlmIChjb250ZW50LmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2VkJykpIHtcbiAgICAgICAgLy8gRXhwYW5kXG4gICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2VkJyk7XG4gICAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFuaW1hdGUgZXhwYW5zaW9uXG4gICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzBweCc7XG4gICAgICAgIGNvbnRlbnQuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29udGVudC5zdHlsZS50cmFuc2l0aW9uID0gJ21heC1oZWlnaHQgMC4zcyBlYXNlLCBvcGFjaXR5IDAuM3MgZWFzZSc7XG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgY29udGVudC5zdHlsZS50cmFuc2l0aW9uID0gJyc7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9LCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ29sbGFwc2VcbiAgICAgICAgY29udGVudC5zdHlsZS50cmFuc2l0aW9uID0gJ21heC1oZWlnaHQgMC4zcyBlYXNlLCBvcGFjaXR5IDAuM3MgZWFzZSc7XG4gICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gY29udGVudC5zY3JvbGxIZWlnaHQgKyAncHgnO1xuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9ICcwcHgnO1xuICAgICAgICAgICAgY29udGVudC5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgICB9LCAxMCk7XG4gICAgICAgIFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2VkJyk7XG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnY29sbGFwc2VkJyk7XG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnJztcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9XG59XG5cbi8vIEluaXRpYWxpemUgc2VhcmNoIGZ1bmN0aW9uYWxpdHlcbmZ1bmN0aW9uIGluaXRpYWxpemVTZWFyY2goKSB7XG4gICAgLy8gQWRkIHNlYXJjaCBpbnB1dCB0byBlYWNoIHNjcm9sbGFibGUgbGlzdFxuICAgIGNvbnN0IHNjcm9sbGFibGVMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYXJhZ3JhcGgtbGlzdCwgLm5hdmlnYXRpb24tbGlzdCwgLmNzcy1jbGFzc2VzLWxpc3QsIC5yZXNvdXJjZS1saXN0Jyk7XG4gICAgXG4gICAgc2Nyb2xsYWJsZUxpc3RzLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgc2VhcmNoSW5wdXQuaWQgPSBgc2VhcmNoLSR7bGlzdC5jbGFzc05hbWV9YDtcbiAgICAgICAgc2VhcmNoSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgc2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSAnU2VhcmNoLi4uJztcbiAgICAgICAgc2VhcmNoSW5wdXQuY2xhc3NOYW1lID0gJ3NlYXJjaC1pbnB1dCc7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzZWFyY2hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2VhcmNoQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdzZWFyY2gtY29udGFpbmVyJztcbiAgICAgICAgc2VhcmNoQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlYXJjaElucHV0KTtcbiAgICAgICAgaWYobGlzdC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhcmFncmFwaC1saXN0JykpIGNvbnNvbGUubG9nKGxpc3QsIHNlYXJjaENvbnRhaW5lcik7XG4gICAgICAgIGxpc3QucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VhcmNoQ29udGFpbmVyLCBsaXN0KTtcbiAgICAgICAgXG4gICAgICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gdGhpcy52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYXJhZ3JhcGgtaXRlbSwgLm5hdi1pdGVtLCAuY3NzLWNsYXNzLWl0ZW0sIC5yZXNvdXJjZS1pdGVtJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGl0ZW0udGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5pbmNsdWRlcyhzZWFyY2hUZXJtKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vLyBJbml0aWFsaXplIGtleWJvYXJkIG5hdmlnYXRpb25cbmZ1bmN0aW9uIGluaXRpYWxpemVLZXlib2FyZE5hdmlnYXRpb24oKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgLy8gVGFiIG5hdmlnYXRpb24gd2l0aCBhcnJvdyBrZXlzXG4gICAgICAgIGlmIChlLmFsdEtleSAmJiAoZS5rZXkgPT09ICdBcnJvd0xlZnQnIHx8IGUua2V5ID09PSAnQXJyb3dSaWdodCcpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVUYWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiLWJ1dHRvbi5hY3RpdmUnKTtcbiAgICAgICAgICAgIGNvbnN0IGFsbFRhYnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItYnV0dG9uJykpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gYWxsVGFicy5pbmRleE9mKGFjdGl2ZVRhYik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBuZXdJbmRleDtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IGN1cnJlbnRJbmRleCA+IDAgPyBjdXJyZW50SW5kZXggLSAxIDogYWxsVGFicy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IGN1cnJlbnRJbmRleCA8IGFsbFRhYnMubGVuZ3RoIC0gMSA/IGN1cnJlbnRJbmRleCArIDEgOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBhbGxUYWJzW25ld0luZGV4XS5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBFc2NhcGUga2V5IHRvIGNsb3NlIGFsbCBleHBhbmRlZCBzZWN0aW9uc1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICBjb25zdCBleHBhbmRlZFNlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlY3Rpb24tY29udGVudDpub3QoLmNvbGxhcHNlZCknKTtcbiAgICAgICAgICAgIGV4cGFuZGVkU2VjdGlvbnMuZm9yRWFjaChzZWN0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2dnbGVCdXR0b24gPSBzZWN0aW9uLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1idXR0b24nKTtcbiAgICAgICAgICAgICAgICBpZiAodG9nZ2xlQnV0dG9uICYmICF0b2dnbGVCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVTZWN0aW9uKHRvZ2dsZUJ1dHRvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEN0cmwrRiB0byBmb2N1cyBzZWFyY2ggaW5wdXRzXG4gICAgICAgIGlmIChlLmN0cmxLZXkgJiYgZS5rZXkgPT09ICdmJykge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlVGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYi1jb250ZW50LmFjdGl2ZScpO1xuICAgICAgICAgICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBhY3RpdmVUYWIucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpO1xuICAgICAgICAgICAgaWYgKHNlYXJjaElucHV0KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBjb3B5IGZ1bmN0aW9uYWxpdHlcbmZ1bmN0aW9uIGluaXRpYWxpemVDb3B5RnVuY3Rpb25hbGl0eSgpIHtcbiAgICAvLyBBZGQgY29weSBidXR0b25zIHRvIGNvZGUgYmxvY2tzXG4gICAgY29uc3QgY29kZUJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2RlLWJsb2NrIHByZScpO1xuICAgIGNvZGVCbG9ja3MuZm9yRWFjaChibG9jayA9PiB7XG4gICAgICAgIGlmICghYmxvY2sucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuY29weS1idXR0b24nKSkge1xuICAgICAgICAgICAgY29uc3QgY29weUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY29weUJ1dHRvbi5jbGFzc05hbWUgPSAnY29weS1idXR0b24nO1xuICAgICAgICAgICAgY29weUJ1dHRvbi5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTYgMUg0QzIuOSAxIDIgMS45IDIgM1YxN0g0VjNIMTZWMVpNMTkgNUg4QzYuOSA1IDYgNS45IDYgN1YyMUM2IDIyLjEgNi45IDIzIDggMjNIMTlDMjAuMSAyMyAyMSAyMi4xIDIxIDIxVjdDMjEgNS45IDIwLjEgNSAxOSA1Wk0xOSAyMUg4VjdIMTlWMjFaXCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgIENvcHlcbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJsb2NrLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY29weUJ1dHRvbik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvcHlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb3B5VG9DbGlwYm9hcmQoYmxvY2sudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHNob3dDb3B5RmVlZGJhY2sodGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBDb3B5IHNuYXBzaG90IGNvbnRlbnRcbmZ1bmN0aW9uIGNvcHlTbmFwc2hvdCgpIHtcbiAgICBjb25zdCBzbmFwc2hvdENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc25hcHNob3QtY29kZScpO1xuICAgIGlmIChzbmFwc2hvdENvbnRlbnQpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IHNuYXBzaG90Q29udGVudC50ZXh0Q29udGVudDtcbiAgICAgICAgY29weVRvQ2xpcGJvYXJkKHRleHQpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY29weUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbmFwc2hvdC1hY3Rpb25zIC5jb3B5LWJ1dHRvbicpO1xuICAgICAgICBzaG93Q29weUZlZWRiYWNrKGNvcHlCdXR0b24pO1xuICAgIH1cbn1cblxuLy8gRG93bmxvYWQgc25hcHNob3QgY29udGVudFxuZnVuY3Rpb24gZG93bmxvYWRTbmFwc2hvdCgpIHtcbiAgICBjb25zdCBzbmFwc2hvdENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc25hcHNob3QtY29kZScpO1xuICAgIGlmIChzbmFwc2hvdENvbnRlbnQpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IHNuYXBzaG90Q29udGVudC50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt0ZXh0XSwgeyB0eXBlOiAndGV4dC9wbGFpbicgfSk7XG4gICAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBhLmhyZWYgPSB1cmw7XG4gICAgICAgIGEuZG93bmxvYWQgPSBgcm91dGUtc25hcHNob3QtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0udHh0YDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgYS5jbGljaygpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfVxufVxuXG4vLyBDb3B5IHRleHQgdG8gY2xpcGJvYXJkXG5mdW5jdGlvbiBjb3B5VG9DbGlwYm9hcmQodGV4dCkge1xuICAgIGlmIChuYXZpZ2F0b3IuY2xpcGJvYXJkICYmIHdpbmRvdy5pc1NlY3VyZUNvbnRleHQpIHtcbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRmFsbGJhY2sgZm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSB0ZXh0O1xuICAgICAgICB0ZXh0QXJlYS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgIHRleHRBcmVhLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dEFyZWEpO1xuICAgICAgICB0ZXh0QXJlYS5mb2N1cygpO1xuICAgICAgICB0ZXh0QXJlYS5zZWxlY3QoKTtcbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjb3B5IHRleHQ6ICcsIGVycik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dEFyZWEpO1xuICAgIH1cbn1cblxuLy8gU2hvdyBjb3B5IGZlZWRiYWNrXG5mdW5jdGlvbiBzaG93Q29weUZlZWRiYWNrKGJ1dHRvbikge1xuICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IGJ1dHRvbi5pbm5lckhUTUw7XG4gICAgYnV0dG9uLmlubmVySFRNTCA9IGBcbiAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTkgMTYuMTdMNC44MyAxMkwzLjQxIDEzLjQxTDkgMTlMMjEgN0wxOS41OSA1LjU5TDkgMTYuMTdaXCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgQ29waWVkIVxuICAgIGA7XG4gICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmQgPSAnIzI3YWU2MCc7XG4gICAgXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBvcmlnaW5hbFRleHQ7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgfSwgMjAwMCk7XG59XG5cbi8vIEluaXRpYWxpemUgc2Nyb2xsIGFuaW1hdGlvbnNcbmZ1bmN0aW9uIGluaXRpYWxpemVTY3JvbGxBbmltYXRpb25zKCkge1xuICAgIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcbiAgICAgICAgdGhyZXNob2xkOiAwLjEsXG4gICAgICAgIHJvb3RNYXJnaW46ICcwcHggMHB4IC01MHB4IDBweCdcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1pbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCBvYnNlcnZlck9wdGlvbnMpO1xuICAgIFxuICAgIC8vIE9ic2VydmUgYWxsIGNhcmRzIGFuZCBzZWN0aW9uc1xuICAgIGNvbnN0IG9ic2VydmVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vdmVydmlldy1jYXJkLCAuY29udGVudC1zZWN0aW9uLCAudmlzdWFsLXNlY3Rpb24sIC50ZWNobmljYWwtc2VjdGlvbiwgLnNuYXBzaG90LXNlY3Rpb24nKTtcbiAgICBvYnNlcnZlRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KTtcbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSByZXNwb25zaXZlIHRhYmxlc1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVJlc3BvbnNpdmVUYWJsZXMoKSB7XG4gICAgY29uc3QgdGFibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGFibGUnKTtcbiAgICB0YWJsZXMuZm9yRWFjaCh0YWJsZSA9PiB7XG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSAndGFibGUtd3JhcHBlcic7XG4gICAgICAgIHRhYmxlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIHRhYmxlKTtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gICAgfSk7XG59XG5cbi8vIFV0aWxpdHkgZnVuY3Rpb25zXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG4gICAgbGV0IHRpbWVvdXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGVkRnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgICBjb25zdCBsYXRlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIGZ1bmMoLi4uYXJncyk7XG4gICAgICAgIH07XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgIH07XG59XG5cbi8vIEV4cG9ydCBkYXRhIGZ1bmN0aW9uYWxpdHlcbmZ1bmN0aW9uIGV4cG9ydFJvdXRlRGF0YSgpIHtcbiAgICBjb25zdCByb3V0ZURhdGEgPSB7XG4gICAgICAgIHVybDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdXRlLXVybCcpPy50ZXh0Q29udGVudCB8fCAnJyxcbiAgICAgICAgcGFnZUlkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm91dGUtaWQnKT8udGV4dENvbnRlbnQgfHwgJycsXG4gICAgICAgIHNjcmFwZWRBdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjcmFwZWQtZGF0ZScpPy50ZXh0Q29udGVudCB8fCAnJyxcbiAgICAgICAgc3RhdHM6IHtcbiAgICAgICAgICAgIHdvcmRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdC1pdGVtOm50aC1jaGlsZCgxKSAuc3RhdC1udW1iZXInKT8udGV4dENvbnRlbnQgfHwgJzAnLFxuICAgICAgICAgICAgY2hhcmFjdGVyczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXQtaXRlbTpudGgtY2hpbGQoMikgLnN0YXQtbnVtYmVyJyk/LnRleHRDb250ZW50IHx8ICcwJyxcbiAgICAgICAgICAgIGltYWdlczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXQtaXRlbTpudGgtY2hpbGQoMykgLnN0YXQtbnVtYmVyJyk/LnRleHRDb250ZW50IHx8ICcwJyxcbiAgICAgICAgICAgIGxpbmtzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdC1pdGVtOm50aC1jaGlsZCg0KSAuc3RhdC1udW1iZXInKT8udGV4dENvbnRlbnQgfHwgJzAnXG4gICAgICAgIH0sXG4gICAgICAgIGV4cG9ydGVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGRhdGFTdHIgPSBKU09OLnN0cmluZ2lmeShyb3V0ZURhdGEsIG51bGwsIDIpO1xuICAgIGNvbnN0IGRhdGFCbG9iID0gbmV3IEJsb2IoW2RhdGFTdHJdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGRhdGFCbG9iKTtcbiAgICBcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9IHVybDtcbiAgICBhLmRvd25sb2FkID0gYHJvdXRlLWRhdGEtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0uanNvbmA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG59XG5cbi8vIFRoZW1lIGRldGVjdGlvbiBhbmQgYWRhcHRhdGlvblxuZnVuY3Rpb24gYWRhcHRUb1N5c3RlbVRoZW1lKCkge1xuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLXRoZW1lJyk7XG4gICAgfVxuICAgIFxuICAgIC8vIExpc3RlbiBmb3IgdGhlbWUgY2hhbmdlc1xuICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIGlmIChlLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay10aGVtZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrLXRoZW1lJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gUHJpbnQgb3B0aW1pemF0aW9uXG5mdW5jdGlvbiBvcHRpbWl6ZUZvclByaW50KCkge1xuICAgIC8vIEV4cGFuZCBhbGwgc2VjdGlvbnMgZm9yIHByaW50aW5nXG4gICAgY29uc3QgY29sbGFwc2VkU2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VjdGlvbi1jb250ZW50LmNvbGxhcHNlZCcpO1xuICAgIGNvbGxhcHNlZFNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XG4gICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2VkJyk7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gU2hvdyBhbGwgdGFic1xuICAgIGNvbnN0IHRhYkNvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1jb250ZW50Jyk7XG4gICAgdGFiQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IHtcbiAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBwcmludCBoYW5kbGluZ1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXByaW50Jywgb3B0aW1pemVGb3JQcmludCk7XG5cbi8vIFBlcmZvcm1hbmNlIG1vbml0b3JpbmdcbmZ1bmN0aW9uIHRyYWNrUGVyZm9ybWFuY2UoKSB7XG4gICAgaWYgKCdwZXJmb3JtYW5jZScgaW4gd2luZG93KSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBsb2FkVGltZSA9IHBlcmZvcm1hbmNlLnRpbWluZy5sb2FkRXZlbnRFbmQgLSBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFJvdXRlIGFuYWx5c2lzIHBhZ2UgbG9hZCB0aW1lOiAke2xvYWRUaW1lfW1zYCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSB0b3VjaCBnZXN0dXJlcyBmb3IgbW9iaWxlXG5mdW5jdGlvbiBpbml0aWFsaXplVG91Y2hHZXN0dXJlcygpIHtcbiAgICBsZXQgdG91Y2hTdGFydFggPSAwO1xuICAgIGxldCB0b3VjaEVuZFggPSAwO1xuICAgIFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRvdWNoU3RhcnRYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xuICAgIH0pO1xuICAgIFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB0b3VjaEVuZFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XG4gICAgICAgIGhhbmRsZVN3aXBlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgZnVuY3Rpb24gaGFuZGxlU3dpcGUoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlVGhyZXNob2xkID0gNTA7XG4gICAgICAgIGNvbnN0IHN3aXBlRGlzdGFuY2UgPSB0b3VjaEVuZFggLSB0b3VjaFN0YXJ0WDtcbiAgICAgICAgXG4gICAgICAgIGlmIChNYXRoLmFicyhzd2lwZURpc3RhbmNlKSA+IHN3aXBlVGhyZXNob2xkKSB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVUYWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiLWJ1dHRvbi5hY3RpdmUnKTtcbiAgICAgICAgICAgIGNvbnN0IGFsbFRhYnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItYnV0dG9uJykpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gYWxsVGFicy5pbmRleE9mKGFjdGl2ZVRhYik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBuZXdJbmRleDtcbiAgICAgICAgICAgIGlmIChzd2lwZURpc3RhbmNlID4gMCAmJiBjdXJyZW50SW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU3dpcGUgcmlnaHQgLSBnbyB0byBwcmV2aW91cyB0YWJcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlRGlzdGFuY2UgPCAwICYmIGN1cnJlbnRJbmRleCA8IGFsbFRhYnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIC8vIFN3aXBlIGxlZnQgLSBnbyB0byBuZXh0IHRhYlxuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKG5ld0luZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhbGxUYWJzW25ld0luZGV4XS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBBdXRvLXNhdmUgc2Nyb2xsIHBvc2l0aW9uXG5mdW5jdGlvbiBpbml0aWFsaXplU2Nyb2xsTWVtb3J5KCkge1xuICAgIGNvbnN0IHRhYkNvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1jb250ZW50Jyk7XG4gICAgXG4gICAgdGFiQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IHtcbiAgICAgICAgY29uc3QgdGFiSWQgPSBjb250ZW50LmlkO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVzdG9yZSBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgY29uc3Qgc2F2ZWRTY3JvbGxUb3AgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc2Nyb2xsLSR7dGFiSWR9YCk7XG4gICAgICAgIGlmIChzYXZlZFNjcm9sbFRvcCkge1xuICAgICAgICAgICAgY29udGVudC5zY3JvbGxUb3AgPSBwYXJzZUludChzYXZlZFNjcm9sbFRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFNhdmUgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgc2Nyb2xsLSR7dGFiSWR9YCwgdGhpcy5zY3JvbGxUb3ApO1xuICAgICAgICB9LCAxMDApKTtcbiAgICB9KTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBhbGwgZnVuY3Rpb25hbGl0eVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGluaXRpYWxpemVQYWdlKCk7XG4gICAgdHJhY2tQZXJmb3JtYW5jZSgpO1xuICAgIGluaXRpYWxpemVUb3VjaEdlc3R1cmVzKCk7XG4gICAgaW5pdGlhbGl6ZVNjcm9sbE1lbW9yeSgpO1xuICAgIGFkYXB0VG9TeXN0ZW1UaGVtZSgpO1xufSk7XG5cbi8vIE1ha2UgZnVuY3Rpb25zIGF2YWlsYWJsZSBnbG9iYWxseVxud2luZG93LnRvZ2dsZVNlY3Rpb24gPSB0b2dnbGVTZWN0aW9uO1xud2luZG93LmNvcHlTbmFwc2hvdCA9IGNvcHlTbmFwc2hvdDtcbndpbmRvdy5kb3dubG9hZFNuYXBzaG90ID0gZG93bmxvYWRTbmFwc2hvdDtcbndpbmRvdy5leHBvcnRSb3V0ZURhdGEgPSBleHBvcnRSb3V0ZURhdGE7Il19
