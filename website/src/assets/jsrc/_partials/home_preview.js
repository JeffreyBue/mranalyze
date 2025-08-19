// Home Preview Analysis Component JavaScript - Animations & Interactivity Only

$(document).ready(function() {
    initializeHomePreview();
});

function initializeHomePreview() {
    // Initialize tab functionality
    initializePreviewTabs();
    
    // Initialize progress bar animations
    initializeProgressBars();
    
    // Initialize score circle animations
    initializeScoreCircles();
    
    // Format timestamps
    formatTimestamps();
}

// Initialize tab switching functionality
function initializePreviewTabs() {
    const $tabs = $('.preview-tabs .tab');
    const $tabContents = $('.tab-content');

    // Set the first tab as active by default
    $($tabs[0]).addClass('active');
    $($tabs[0]).attr('aria-selected', 'true');
    $($tabContents[0]).addClass('active');
        
    $tabs.on('click', function() {
        const analysisType = $(this).data('analysis');
        
        // Update tab states
        $tabs.removeClass('active').attr('aria-selected', 'false');
        $(this).addClass('active').attr('aria-selected', 'true');
        
        // Update content visibility
        $tabContents.removeClass('active');
        $(`#${analysisType}-content`).addClass('active');
        
        // Animate progress bars for the new tab
        setTimeout(() => {
            animateProgressBars($(`#${analysisType}-content`));
        }, 100);
        
        // Animate score circle
        animateScoreCircle($(`#${analysisType}-content`));
    });
    
    // Keyboard navigation for tabs
    $tabs.on('keydown', function(e) {
        const $currentTab = $(this);
        let $targetTab;
        
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                $targetTab = $currentTab.next('.tab').length ? 
                    $currentTab.next('.tab') : $('.tab').first();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                $targetTab = $currentTab.prev('.tab').length ? 
                    $currentTab.prev('.tab') : $('.tab').last();
                break;
            case 'Home':
                e.preventDefault();
                $targetTab = $('.tab').first();
                break;
            case 'End':
                e.preventDefault();
                $targetTab = $('.tab').last();
                break;
            default:
                return;
        }
        
        if ($targetTab) {
            $targetTab.focus().click();
        }
    });
}

// Initialize progress bar animations
function initializeProgressBars() {
    // Set initial width to 0
    $('.progress-fill[data-width]').css('width', '0%');
    
    // Create intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the active tab's progress bars
                const $activeTabContent = $('.tab-content.active');
                animateProgressBars($activeTabContent);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe the analysis preview container
    const previewElement = document.getElementById('analysisPreview');
    if (previewElement) {
        observer.observe(previewElement);
    }
}

// Animate progress bars within a container
function animateProgressBars($container) {
    const $progressBars = $container.find('.progress-fill[data-width]');
    
    $progressBars.each(function(index) {
        const $bar = $(this);
        const targetWidth = $bar.data('width');
        
        setTimeout(() => {
            $bar.css('width', targetWidth);
        }, index * 150); // Stagger animations
    });
}

// Initialize score circle animations
function initializeScoreCircles() {
    $('.score-circle[data-score]').each(function() {
        const $circle = $(this);
        const score = parseInt($circle.data('score'));
        
        // Set initial state
        $circle.find('.score-value').text('0%');
        
        // Set up for animation on scroll
        updateScoreCircleColor($circle, score);
    });
    
    // Animate the active score circle on page load
    setTimeout(() => {
        const $activeTabContent = $('.tab-content.active');
        animateScoreCircle($activeTabContent);
    }, 500);
}

// Animate score circle for active tab
function animateScoreCircle($tabContent) {
    const $scoreCircle = $tabContent.find('.score-circle[data-score]');
    if ($scoreCircle.length) {
        const score = parseInt($scoreCircle.data('score'));
        animateScoreNumber($scoreCircle.find('.score-value'), score);
    }
}

// Update score circle color based on score
function updateScoreCircleColor($circle, score) {
    // Remove existing color classes
    $circle.removeClass('critical high moderate low');
    
    // Add appropriate class based on score (high similarity = bad)
    if (score >= 90) {
        $circle.addClass('critical');
    } else if (score >= 75) {
        $circle.addClass('high');
    } else if (score >= 50) {
        $circle.addClass('moderate');
    } else {
        $circle.addClass('low');
    }
}

// Animate score number counting up
function animateScoreNumber($element, finalScore, duration = 1500) {
    const startScore = 0;
    const startTime = performance.now();
    
    function updateScore(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentScore = Math.floor(startScore + (finalScore - startScore) * progress);
        $element.text(currentScore + '%');
        
        if (progress < 1) {
            requestAnimationFrame(updateScore);
        }
    }
    
    requestAnimationFrame(updateScore);
}

// Format timestamps to readable dates
function formatTimestamps() {
    const $timestampElements = $('[data-timestamp]');
    $timestampElements.each(function() {
        const $element = $(this);
        const timestamp = $element.data('timestamp');
        if (timestamp) {
            const date = new Date(timestamp);
            const formatted = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            // Only update if it's not already formatted
            if ($element.text().includes('T')) {
                $element.text(formatted);
            }
        }
    });
}

// Add hover effects to comparison items
$(document).on('mouseenter', '.comparison-item', function() {
    $(this).addClass('hovered');
});

$(document).on('mouseleave', '.comparison-item', function() {
    $(this).removeClass('hovered');
});

// Add click effects to analysis preview
$(document).on('click', '.analysis-preview', function() {
    $(this).addClass('clicked');
    setTimeout(() => {
        $(this).removeClass('clicked');
    }, 200);
});

// Export functions for potential external use
window.homePreview = {
    animateProgressBars: animateProgressBars,
    animateScoreCircle: animateScoreCircle,
    formatTimestamps: formatTimestamps
};