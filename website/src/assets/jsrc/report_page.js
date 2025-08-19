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
    const timestampElements = document.querySelectorAll('[data-timestamp]');
    timestampElements.forEach(element => {
        const timestamp = element.getAttribute('data-timestamp');
        if (timestamp) {
            const date = new Date(timestamp);
            const formatted = date.toLocaleDateString('en-US', {
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
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
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
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetButton = document.querySelector(`[data-tab="${hash}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    
    // toggleButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         toggleSection(this);
    //     });
    // });
}

// Toggle section visibility
function toggleSection(button) {
    console.log('Toggling section:', button);
    const section = button.closest('.content-section, .visual-section, .technical-section');
    const content = section.querySelector('.section-content');
    const icon = button.querySelector('.toggle-icon');
    
    if (content.classList.contains('collapsed')) {
        // Expand
        content.classList.remove('collapsed');
        content.style.display = 'block';
        button.classList.remove('collapsed');
        
        // Animate expansion
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            
            setTimeout(() => {
                content.style.maxHeight = 'none';
                content.style.transition = '';
            }, 300);
        }, 10);
    } else {
        // Collapse
        content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        content.style.maxHeight = content.scrollHeight + 'px';
        
        setTimeout(() => {
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
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
    const scrollableLists = document.querySelectorAll('.paragraph-list, .navigation-list, .css-classes-list, .resource-list');
    
    scrollableLists.forEach(list => {
        const searchInput = document.createElement('input');
        searchInput.id = `search-${list.className}`;
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        searchInput.className = 'search-input';
        
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.appendChild(searchInput);
        if(list.classList.contains('paragraph-list')) console.log(list, searchContainer);
        list.parentNode.insertBefore(searchContainer, list);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const items = list.querySelectorAll('.paragraph-item, .nav-item, .css-class-item, .resource-item');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
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
    document.addEventListener('keydown', function(e) {
        // Tab navigation with arrow keys
        if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            e.preventDefault();
            const activeTab = document.querySelector('.tab-button.active');
            const allTabs = Array.from(document.querySelectorAll('.tab-button'));
            const currentIndex = allTabs.indexOf(activeTab);
            
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
            } else {
                newIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            allTabs[newIndex].click();
        }
        
        // Escape key to close all expanded sections
        if (e.key === 'Escape') {
            const expandedSections = document.querySelectorAll('.section-content:not(.collapsed)');
            expandedSections.forEach(section => {
                const toggleButton = section.parentNode.querySelector('.toggle-button');
                if (toggleButton && !toggleButton.classList.contains('collapsed')) {
                    toggleSection(toggleButton);
                }
            });
        }
        
        // Ctrl+F to focus search inputs
        if (e.ctrlKey && e.key === 'f') {
            const activeTab = document.querySelector('.tab-content.active');
            const searchInput = activeTab.querySelector('.search-input');
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
    const codeBlocks = document.querySelectorAll('.code-block pre');
    codeBlocks.forEach(block => {
        if (!block.parentNode.querySelector('.copy-button')) {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"/>
                </svg>
                Copy
            `;
            
            block.parentNode.appendChild(copyButton);
            
            copyButton.addEventListener('click', function() {
                copyToClipboard(block.textContent);
                showCopyFeedback(this);
            });
        }
    });
}

// Copy snapshot content
function copySnapshot() {
    const snapshotContent = document.getElementById('snapshot-code');
    if (snapshotContent) {
        const text = snapshotContent.textContent;
        copyToClipboard(text);
        
        const copyButton = document.querySelector('.snapshot-actions .copy-button');
        showCopyFeedback(copyButton);
    }
}

// Download snapshot content
function downloadSnapshot() {
    const snapshotContent = document.getElementById('snapshot-code');
    if (snapshotContent) {
        const text = snapshotContent.textContent;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `route-snapshot-${new Date().toISOString().split('T')[0]}.txt`;
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
        const textArea = document.createElement('textarea');
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
    const originalText = button.innerHTML;
    button.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
        </svg>
        Copied!
    `;
    button.style.background = '#27ae60';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}

// Initialize scroll animations
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
    
    // Observe all cards and sections
    const observeElements = document.querySelectorAll('.overview-card, .content-section, .visual-section, .technical-section, .snapshot-section');
    observeElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize responsive tables
function initializeResponsiveTables() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export data functionality
function exportRouteData() {
    const routeData = {
        url: document.querySelector('.route-url')?.textContent || '',
        pageId: document.querySelector('.route-id')?.textContent || '',
        scrapedAt: document.querySelector('.scraped-date')?.textContent || '',
        stats: {
            words: document.querySelector('.stat-item:nth-child(1) .stat-number')?.textContent || '0',
            characters: document.querySelector('.stat-item:nth-child(2) .stat-number')?.textContent || '0',
            images: document.querySelector('.stat-item:nth-child(3) .stat-number')?.textContent || '0',
            links: document.querySelector('.stat-item:nth-child(4) .stat-number')?.textContent || '0'
        },
        exported: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(routeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `route-data-${new Date().toISOString().split('T')[0]}.json`;
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
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
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
    const collapsedSections = document.querySelectorAll('.section-content.collapsed');
    collapsedSections.forEach(section => {
        section.classList.remove('collapsed');
        section.style.display = 'block';
    });
    
    // Show all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.add('active');
    });
}

// Initialize print handling
window.addEventListener('beforeprint', optimizeForPrint);

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Route analysis page load time: ${loadTime}ms`);
        });
    }
}

// Initialize touch gestures for mobile
function initializeTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            const activeTab = document.querySelector('.tab-button.active');
            const allTabs = Array.from(document.querySelectorAll('.tab-button'));
            const currentIndex = allTabs.indexOf(activeTab);
            
            let newIndex;
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
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabContents.forEach(content => {
        const tabId = content.id;
        
        // Restore scroll position
        const savedScrollTop = localStorage.getItem(`scroll-${tabId}`);
        if (savedScrollTop) {
            content.scrollTop = parseInt(savedScrollTop);
        }
        
        // Save scroll position
        content.addEventListener('scroll', debounce(function() {
            localStorage.setItem(`scroll-${tabId}`, this.scrollTop);
        }, 100));
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
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