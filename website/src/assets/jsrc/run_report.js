/**
 * Route Comparison Analysis - JavaScript Functionality
 * Handles dynamic UI, validation, SSE, and user interactions
 */

// const testSource = new EventSource('/api/analysis/test-sse');
// testSource.onmessage = (e) => console.log('Test message:', e.data);

class RouteComparisonManager {
    constructor() {
        this.routeLists = [];
        this.validationState = new Map();
        this.duplicateComparisons = new Set();
        this.processRunning = false;
        this.eventSource = null;
        this.maxLists = 6;
        this.maxRoutesPerList = 30; 
        this.sseConnected = false;
        this.sseConnectionStatus = 'disconnected';
        this.currentTab = 'setup';
        this.reportId = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createInitialLists();
        this.updateValidationSummary();
        this.drawConnectionLines();
    }
    
    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        // Route input validation (on blur)
        document.addEventListener('blur', (e) => {
            if (e.target.classList.contains('route-input')) {
                this.validateRoute(e.target);
            }
        }, true);
        
        // Route input paste detection
        document.addEventListener('paste', (e) => {
            if (e.target.classList.contains('route-input')) {
                setTimeout(() => this.handleRoutePaste(e.target), 10);
            }
        });
        
        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('route-input')) {
                this.addRouteToList(parseInt(e.target.dataset.list));
            }
        });
        
        // Window resize for connection lines
        window.addEventListener('resize', debounce(() => this.drawConnectionLines(), 250));
    }
    
    createInitialLists() {
        // Start with 2 empty lists
        this.routeLists = [
            { name: '', routes: [''], domain: '' },
            { name: '', routes: [''], domain: '' }
        ];
        this.renderAllRouteLists();
    }
    
    // Also update your switchTab method to handle the progress tab better
    switchTab(tabName) {
        if (!this.canSwitchToTab(tabName)) {
            return;
        }
        
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-selected', 'true');
        }
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const activeContent = document.getElementById(`${tabName}-panel`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
        
        this.currentTab = tabName;
        
        // Tab-specific actions
        if (tabName === 'progress') {
            this.initializeProgressTracking();
            // Establish SSE connection when switching to progress tab
            this.establishSSEConnection();
        } else if (tabName === 'setup') {
            // Disconnect SSE when leaving progress tab to save resources
            this.disconnectSSE();
            this.updateValidationSummary();
        } else if (tabName === 'results') {
            this.updateResultsTab();
        }
    }

    canSwitchToTab(tabName) {
        switch (tabName) {
            case 'setup':
                return true;
            case 'progress':
                return this.hasValidRoutes();
            case 'results':
                return this.processCompleted;
            default:
                return false;
        }
    }

    // 10. Enhanced activity monitoring methods
    startActivityMonitoring() {
        this.lastHeartbeat = Date.now();
        this.resetActivityTimeout();
    }

    resetActivityTimeout() {
        if (this.activityTimeout) {
            clearTimeout(this.activityTimeout);
        }
        
        this.activityTimeout = setTimeout(() => {
            console.log('⚠️ SSE activity timeout - no recent data');
            this.addTerminalLine('No recent activity detected - connection may be stalled', 'warning');
            this.updateConnectionStatus('error');
        }, 60000); // 60 seconds of inactivity
    }

    handleSSETimeout(message) {
        console.log('SSE timeout:', message);
        this.addTerminalLine(`⚠️ ${message}`, 'warning');
        this.showNotification(message, 'warning');
        
        // Close the SSE connection
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
        
        this.clearSSETimeouts();
        
        // Don't automatically mark as failed - let user decide
        this.addTerminalLine('You can refresh the page and check analysis status', 'info');
    }

    clearSSETimeouts() {
        if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout);
            this.connectionTimeout = null;
        }
        if (this.activityTimeout) {
            clearTimeout(this.activityTimeout);
            this.activityTimeout = null;
        }
    }

    initializeProgressTracking() {
        // Reset progress indicators
        this.updateOverallProgress(0);
        
        // Reset all step indicators
        const steps = ['scraping', 'visual-analysis', 'content-analysis', 'technical-analysis', 'seo-analysis', 'final-report'];
        steps.forEach(step => {
            this.updateStepProgress(step, 'pending', 0);
        });
        
        // Clear terminal
        const terminal = document.getElementById('terminalOutput');
        if (terminal) {
            terminal.innerHTML = '';
        }
        
        // Add initial message
        this.addTerminalLine('Connecting to analysis service...', 'info');
    }    
    
    updateTabAvailability() {
        const progressTab = document.querySelector('[data-tab="progress"]');
        const resultsTab = document.querySelector('[data-tab="results"]');
        
        if (this.hasValidRoutes()) {
            progressTab.classList.remove('disabled');
            progressTab.removeAttribute('disabled');
        } else {
            progressTab.classList.add('disabled');
            progressTab.setAttribute('disabled', 'true');
        }
        
        if (this.processCompleted) {
            resultsTab.classList.remove('disabled');
            resultsTab.removeAttribute('disabled');
        } else {
            resultsTab.classList.add('disabled');
            resultsTab.setAttribute('disabled', 'true');
        }
    }
    
    addRouteList() {
        if (this.routeLists.length >= this.maxLists) {
            this.showNotification('Maximum number of lists reached (6)', 'warning');
            return;
        }
        
        this.routeLists.push({
            name: '',
            routes: [''],
            domain: ''
        });
        
        this.renderAllRouteLists();
        this.updateValidationSummary();
        this.drawConnectionLines();
    }
    
    removeRouteList(listIndex) {
        if (this.routeLists.length <= 2) {
            this.showNotification('Minimum 2 lists required for comparison', 'warning');
            return;
        }
        
        this.routeLists.splice(listIndex, 1);
        this.renderAllRouteLists();
        this.updateValidationSummary();
        this.drawConnectionLines();
    }
    
    addRoute(listIndex) {
        const list = this.routeLists[listIndex];
        console.log(`Adding route to list ${listIndex}:`, list);
        if (list.routes.length >= this.maxRoutesPerList) {
            this.showNotification(`Maximum routes per list reached (${this.maxRoutesPerList})`, 'warning');
            return;
        }
        
        list.routes.push('');
        this.renderAllRouteLists();
        this.updateValidationSummary();
        this.drawConnectionLines();
    }
    
    removeRoute(listIndex, routeIndex) {
        const list = this.routeLists[listIndex];
        if (list.routes.length <= 1) {
            this.showNotification('At least one route required per list', 'warning');
            return;
        }
        
        list.routes.splice(routeIndex, 1);
        this.renderRouteInputs(listIndex);
        this.updateValidationSummary();
        this.drawConnectionLines();
    }
    
    processBulkInput(listIndex) {
        const textarea = $(`#bulkInput${listIndex}`)[0];
        const urls = textarea.value
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        if (urls.length === 0) {
            this.showNotification('No URLs found in bulk input', 'warning');
            return;
        }
        
        const list = this.routeLists[listIndex];
        const totalRoutes = list.routes.filter(r => r.trim()).length + urls.length;
        
        if (totalRoutes > this.maxRoutesPerList) {
            this.showNotification(`Would exceed maximum routes per list (${this.maxRoutesPerList})`, 'error');
            return;
        }
        
        // Clear empty routes first
        list.routes = list.routes.filter(r => r.trim());
        
        // Add new URLs
        list.routes.push(...urls);
        
        // Clear textarea
        $(`#bulkInput${listIndex}`).val('');
        
        this.renderAllRouteLists();
        this.updateValidationSummary();
        this.drawConnectionLines();
        
        // Validate all new routes
        setTimeout(() => {
            urls.forEach((url, index) => {
                const routeIndex = list.routes.length - urls.length + index;
                const input = $(`.route-input[data-list-index="${listIndex}"][data-route-index="${routeIndex}"]`)[0];
                if (input) {
                    this.validateRoute(input);
                }
            });
        }, 100);
        
        this.showNotification(`Added ${urls.length} URLs to list`, 'success');
    }
    
    handleRoutePaste(input) {
        const value = input.value;
        const lines = value.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        if (lines.length > 1) {
            const listIndex = parseInt(input.dataset.listIndex);
            const routeIndex = parseInt(input.dataset.routeIndex);
            
            // Set first URL in current field
            input.value = lines[0];
            this.routeLists[listIndex].routes[routeIndex] = lines[0];
            
            // Add additional URLs as new routes
            const additionalUrls = lines.slice(1);
            const list = this.routeLists[listIndex];
            
            if (list.routes.length + additionalUrls.length > this.maxRoutesPerList) {
                this.showNotification(`Would exceed maximum routes per list (${this.maxRoutesPerList})`, 'error');
                return;
            }
            
            // Insert additional URLs after current route
            list.routes.splice(routeIndex + 1, 0, ...additionalUrls);
            
            this.renderAllRouteLists();
            this.updateValidationSummary();
            this.drawConnectionLines();
            
            this.showNotification(`Split ${lines.length} URLs into separate fields`, 'success');
        }
    }
    
    validateRoute(input) {
        const url = input.value.trim();
        const listIndex = parseInt(input.dataset.listIndex);
        const routeIndex = parseInt(input.dataset.routeIndex);
        const validationKey = `${listIndex}-${routeIndex}`;
        
        // Update internal state
        this.routeLists[listIndex].routes[routeIndex] = url;
        
        // Clear previous validation state
        $(input).removeClass('valid invalid duplicate');
        this.validationState.delete(validationKey);
        
        const validationMessage = document.getElementById(`validation${listIndex}-${routeIndex}`);
        if (validationMessage) {
            validationMessage.textContent = '';
            validationMessage.classList.remove('show');
        }
        
        if (!url) {
            return; // Empty is neither valid nor invalid
        }
        
        // URL format validation
        const isValidUrl = this.isValidHttpUrl(url);
        if (!isValidUrl) {
            $(input).addClass('invalid');
            this.showValidationError(validationMessage, 'Invalid URL format. Must start with http:// or https://');
            return;
        }
        
        // Duplicate detection
        const isDuplicate = this.checkForDuplicates(url, listIndex, routeIndex);
        if (isDuplicate) {
            $(input).addClass('duplicate');
            this.showValidationError(validationMessage, 'This URL creates duplicate comparisons');
        } else {
            $(input).addClass('valid');
            this.validationState.set(validationKey, { valid: true, url });
        }
        
        // Auto-suggest domain name
        if (isValidUrl && !this.routeLists[listIndex].name) {
            const domain = this.extractDomain(url);
            if (domain) {
                const nameInput = document.getElementById(`listName${listIndex}`);
                if (nameInput && !nameInput.value) {
                    nameInput.value = domain;
                    this.routeLists[listIndex].name = domain;
                }
            }
        }
        
        this.updateValidationSummary();
        this.updateTabAvailability();
        this.drawConnectionLines();
    }
    
    isValidHttpUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }
    
    extractDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch (_) {
            return null;
        }
    }
    
    checkForDuplicates(url, currentListIndex, currentRouteIndex) {
        this.duplicateComparisons.clear();
        
        for (let listIndex = 0; listIndex < this.routeLists.length; listIndex++) {
            const list = this.routeLists[listIndex];
            for (let routeIndex = 0; routeIndex < list.routes.length; routeIndex++) {
                const routeUrl = list.routes[routeIndex];
                
                if (!routeUrl || !this.isValidHttpUrl(routeUrl)) continue;
                if (listIndex === currentListIndex && routeIndex === currentRouteIndex) continue;
                
                // Check if this creates a duplicate comparison
                if (routeUrl === url) {
                    for (let otherListIndex = 0; otherListIndex < this.routeLists.length; otherListIndex++) {
                        if (otherListIndex === listIndex || otherListIndex === currentListIndex) continue;
                        
                        const otherList = this.routeLists[otherListIndex];
                        const correspondingRoute = otherList.routes[routeIndex] || otherList.routes[currentRouteIndex];
                        
                        if (correspondingRoute && this.isValidHttpUrl(correspondingRoute)) {
                            this.duplicateComparisons.add(`${routeUrl} ↔ ${correspondingRoute}`);
                            return true;
                        }
                    }
                }
            }
        }
        
        return false;
    }
    
    showValidationError(messageElement, text) {
        if (messageElement) {
            messageElement.textContent = text;
            messageElement.classList.add('show');
        }
    }
    
    updateListName(listIndex, value) {
        this.routeLists[listIndex].name = value;
    }
    
    hasValidRoutes() {
        return Array.from(this.validationState.values())
            .filter(state => state.valid).length >= 2;
    }
    
    updateValidationSummary() {
        const validRoutes = Array.from(this.validationState.values())
            .filter(state => state.valid).length;
        
        const totalComparisons = this.calculateTotalComparisons();
        const duplicateCount = this.duplicateComparisons.size;
        
        // Update numbers
        const totalRoutesEl = document.getElementById('totalRoutes');
        const totalComparisonsEl = document.getElementById('totalComparisons');
        const duplicateWarningsEl = document.getElementById('duplicateWarnings');
        
        if (totalRoutesEl) totalRoutesEl.textContent = validRoutes;
        if (totalComparisonsEl) totalComparisonsEl.textContent = totalComparisons;
        if (duplicateWarningsEl) duplicateWarningsEl.textContent = duplicateCount;
        
        // Replace the old button update code with this:
        this.updateStartAnalysisButton(); // Use the new centralized method
        
        // Update global validation messages
        this.updateGlobalValidationMessages();
    }
    
    calculateTotalComparisons() {
        if (this.routeLists.length < 2) return 0;
        
        const validRoutesPerList = this.routeLists.map(list => 
            list.routes.filter(route => {
                const validationEntry = Array.from(this.validationState.entries())
                    .find(([key, state]) => state.url === route && state.valid);
                return !!validationEntry;
            }).length
        );
        
        const maxRoutes = Math.max(...validRoutesPerList);
        const numLists = this.routeLists.length;
        
        return maxRoutes * (numLists * (numLists - 1)) / 2;
    }
    
    updateGlobalValidationMessages() {
        const container = document.getElementById('globalValidation');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.duplicateComparisons.forEach(duplicate => {
            const warningEl = document.createElement('div');
            warningEl.className = 'validation-warning';
            warningEl.innerHTML = `
                <span class="warning-icon">⚠️</span>
                Duplicate comparison: ${duplicate}
            `;
            container.appendChild(warningEl);
        });
    }
    
    drawConnectionLines() {
        const container = document.getElementById('connectionLines');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Only draw if we have multiple lists with routes
        if (this.routeLists.length < 2) return;
        
        const routeRows = document.querySelectorAll('.route-input-row');
        const listElements = document.querySelectorAll('.route-list');
        
        if (listElements.length < 2) return;
        
        const maxRoutesShown = Math.max(...this.routeLists.map(list => list.routes.length));
        
        for (let routeIndex = 0; routeIndex < maxRoutesShown; routeIndex++) {
            for (let listIndex = 0; listIndex < this.routeLists.length - 1; listIndex++) {
                const currentList = listElements[listIndex];
                const nextList = listElements[listIndex + 1];
                
                const currentRow = currentList.querySelector(`[data-route-index="${routeIndex}"]`);
                const nextRow = nextList.querySelector(`[data-route-index="${routeIndex}"]`);
                
                if (currentRow && nextRow) {
                    this.createConnectionLine(currentRow, nextRow, routeIndex + 1, container);
                }
            }
        }
    }
    
    createConnectionLine(fromRow, toRow, colorIndex, container) {
        const fromRect = fromRow.getBoundingClientRect();
        const toRect = toRow.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const line = document.createElement('div');
        line.className = `connection-line color-${colorIndex % 6 + 1}`;
        
        const startX = fromRect.right - containerRect.left;
        const endX = toRect.left - containerRect.left;
        const y = (fromRect.top + fromRect.height / 2) - containerRect.top;
        
        const width = endX - startX;
        
        line.style.left = `${startX}px`;
        line.style.top = `${y}px`;
        line.style.width = `${width}px`;
        
        container.appendChild(line);
    }
    
    renderAllRouteLists() {
        const container = $('.route-lists-container');
        container.empty();
        
        this.routeLists.forEach((list, listIndex) => {
            const listElement = this.createRouteListElement(listIndex);
            container.append(listElement);
        });
        
        // Re-attach event listeners after rendering
        this.attachRouteListEventListeners();
    }
    
    createRouteListElement(listIndex) {
        const list = this.routeLists[listIndex];
        const colorClass = `list-color-${listIndex}`;
        const canRemove = this.routeLists.length > 2;
        
        if(this.routeLists.length >= this.maxLists) {
            $(`#addListBtn`).prop('disabled', true);
        } else {
            $(`#addListBtn`).prop('disabled', false);
        }
        
        const routeInputsHtml = list.routes.map((route, routeIndex) => 
            this.createRouteInputRowHtml(listIndex, routeIndex, route)
        ).join('');
        
        const listHtml = `
            <div class="route-list ${colorClass}" data-list-index="${listIndex}">
                <div class="list-header">
                    <div class="list-title-section">
                        <label for="listName${listIndex}" class="list-label">
                            Site ${listIndex + 1} Name
                        </label>
                        <input type="text" 
                               id="listName${listIndex}" 
                               class="list-name-input" 
                               placeholder="${list.domain || 'Enter site name'}"
                               value="${list.name}"
                               aria-describedby="listName${listIndex}-help">
                        <small id="listName${listIndex}-help" class="input-help">
                            Optional: Enter a name for this site
                        </small>
                    </div>
                </div>

                <div class="route-inputs-container" id="routeInputs${listIndex}">
                    ${routeInputsHtml}
                </div>

                <div class="list-footer">
                    <button class="add-route-btn" 
                            data-action="add-route" 
                            data-list-index="${listIndex}"
                            ${list.routes.length >= this.maxRoutesPerList ? 'disabled' : ''}>
                        <span class="btn-icon">➕</span>
                        Add Route (${list.routes.length}/30)
                    </button>
                    
                    <div class="bulk-input-section">
                        <label for="bulkInput${listIndex}" class="bulk-label">
                            Or paste multiple URLs:
                        </label>
                        <textarea id="bulkInput${listIndex}" 
                                  class="bulk-input" 
                                  placeholder="Paste multiple URLs, one per line"
                                  rows="3"
                                  data-list-index="${listIndex}"></textarea>
                        <button class="process-bulk-btn" 
                                data-action="process-bulk" 
                                data-list-index="${listIndex}">
                            Process URLs
                        </button>
                    </div>
                </div>
                <div class="list-actions">
                    ${canRemove ? `
                        <button class="remove-list-btn" data-action="remove-list" data-list-index="${listIndex}">
                            <span class="btn-icon">🗑️</span>
                            Remove
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        return $(listHtml);
    }
    
    createRouteInputRowHtml(listIndex, routeIndex, value = '') {
        const canRemove = this.routeLists[listIndex].routes.length > 1;
        
        return `
            <div class="route-input-row" data-route-index="${routeIndex}">
                <div class="route-number">${routeIndex + 1}</div>
                <div class="input-container">
                    <input type="url" 
                           class="route-input" 
                           placeholder="https://example.com/page"
                           value="${value}"
                           data-list-index="${listIndex}"
                           data-route-index="${routeIndex}"
                           aria-label="Route ${routeIndex + 1} for list ${listIndex + 1}">
                    <div class="validation-message" id="validation${listIndex}-${routeIndex}"></div>
                </div>
                <div class="route-actions">
                    ${canRemove ? `
                        <button class="remove-route-btn" 
                                data-action="remove-route" 
                                data-list-index="${listIndex}"
                                data-route-index="${routeIndex}"
                                aria-label="Remove this route">
                            <span class="btn-icon">✖️</span>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    attachRouteListEventListeners() {
        // List name inputs
        $('.list-name-input').off('input').on('input', (e) => {
            const listIndex = parseInt(e.target.id.replace('listName', ''));
            this.updateListName(listIndex, e.target.value);
        });
        
        // Route inputs - validation on blur
        $('.route-input').off('blur').on('blur', (e) => {
            this.validateRoute(e.target);
        });
        
        // Route inputs - paste detection
        $('.route-input').off('paste').on('paste', (e) => {
            setTimeout(() => this.handleRoutePaste(e.target), 10);
        });
        
        // Route inputs - value changes
        $('.route-input').off('input').on('input', (e) => {
            const listIndex = parseInt(e.target.dataset.listIndex);
            const routeIndex = parseInt(e.target.dataset.routeIndex);
            this.routeLists[listIndex].routes[routeIndex] = e.target.value;
        });
        
        // Button actions using event delegation
        $('#routeListsContainer').off('click').on('click', 'button[data-action]', (e) => {
            const action = e.target.closest('button').dataset.action;
            const listIndex = parseInt(e.target.closest('button').dataset.listIndex);
            const routeIndex = parseInt(e.target.closest('button').dataset.routeIndex);
            
            switch (action) {
                case 'add-list':
                    this.addRouteList();
                    break;
                case 'remove-list':
                    this.removeRouteList(listIndex);
                    break;
                case 'add-route':
                    this.addRoute(listIndex);
                    break;
                case 'remove-route':
                    this.removeRoute(listIndex, routeIndex);
                    break;
                case 'process-bulk':
                    this.processBulkInput(listIndex);
                    break;
            }
        });
        
        // Bulk input textareas
        $('.bulk-input').off('input').on('input', (e) => {
            // Could add real-time URL counting here
        });
        
        // Run Analysis button
        $('#runAnalysisBtn').off('click').on('click', () => {
            this.startAnalysis();
        });
        
        // Cancel Analysis button  
        $('#cancelAnalysisBtn').off('click').on('click', () => {
            this.cancelAnalysis();
        });
        
        // New Analysis button
        $('#newAnalysisBtn').off('click').on('click', () => {
            this.startNewAnalysis();
        });
    }
    
    renderRouteInputs(listIndex) {
        const container = document.getElementById(`routeInputs${listIndex}`);
        if (!container) return;
        
        const list = this.routeLists[listIndex];
        container.innerHTML = '';
        
        list.routes.forEach((route, routeIndex) => {
            const row = this.createRouteInputRow(listIndex, routeIndex, route);
            container.appendChild(row);
        });
    }
    
    createRouteInputRow(listIndex, routeIndex, value = '') {
        const row = document.createElement('div');
        row.className = 'route-input-row';
        row.setAttribute('data-route-index', routeIndex);
        
        row.innerHTML = `
            <div class="route-number">${routeIndex + 1}</div>
            <div class="input-container">
                <input type="url" 
                       class="route-input" 
                       placeholder="https://example.com/page"
                       value="${value}"
                       data-list="${listIndex}"
                       data-route="${routeIndex}"
                       aria-label="Route ${routeIndex + 1} for list ${listIndex + 1}">
                <div class="validation-message" id="validation${listIndex}-${routeIndex}"></div>
            </div>
            <div class="route-actions">
                ${this.routeLists[listIndex].routes.length > 1 ? `
                    <button class="remove-route-btn" 
                            onclick="routeManager.removeRoute(${listIndex}, ${routeIndex})"
                            aria-label="Remove this route">
                        <span class="btn-icon">✖️</span>
                    </button>
                ` : ''}
            </div>
        `;
        
        return row;
    }

    // 3. Add this new method for SSE connection management
    async establishSSEConnection() {
        console.log('🔌 Establishing SSE connection...');
        this.updateConnectionStatus('connecting');
        
        try {
            await this.initializeSSE();
            // initializeSSE will update status to 'connected' when onopen fires
        } catch (error) {
            console.error('Failed to establish SSE connection:', error);
            this.updateConnectionStatus('error');
        }
    }    

    // 4. Add connection status management
    updateConnectionStatus(status) {
        this.sseConnectionStatus = status;
        this.sseConnected = (status === 'connected');
        
        console.log('📡 SSE Connection Status:', status);
        
        // Update UI elements
        this.updateConnectionIndicator(status);
        this.updateStartAnalysisButton();
    }

    // 5. Add connection indicator UI updates
    updateConnectionIndicator(status) {
        // Update connection status indicator in the UI
        const indicator = document.getElementById('sseConnectionIndicator');
        const statusText = document.getElementById('sseConnectionStatus');
        
        if (indicator && statusText) {
            indicator.className = `connection-indicator ${status}`;
            
            const statusMessages = {
                'disconnected': '⚪ Disconnected',
                'connecting': '🟡 Connecting...',
                'connected': '🟢 Connected',
                'error': '🔴 Connection Error'
            };
            
            statusText.textContent = statusMessages[status] || status;
        }
        
        // Also update the terminal if it exists
        const statusMessages = {
            'connecting': 'Establishing connection to analysis service...',
            'connected': 'Connected to analysis service ✅',
            'error': 'Failed to connect to analysis service ❌',
            'disconnected': 'Disconnected from analysis service'
        };
        
        if (statusMessages[status]) {
            this.addTerminalLine(statusMessages[status], status === 'error' ? 'error' : 'info');
        }
    }

    // Replace your updateStartAnalysisButton method with this corrected version
    updateStartAnalysisButton() {
        const startButton = document.getElementById('runAnalysisBtn');
        if (!startButton) return;
        
        const subtitle = startButton.querySelector('.btn-subtitle');
        
        // Only check routes validity - not SSE connection
        if (!this.hasValidRoutes()) {
            startButton.disabled = true;
            if (subtitle) subtitle.textContent = 'Add routes to continue';
            return;
        }
        
        if (this.processRunning) {
            startButton.disabled = true;
            if (subtitle) subtitle.textContent = 'Analysis running...';
            return;
        }
        
        // Enable button when routes are valid, regardless of SSE status
        startButton.disabled = false;
        const totalComparisons = this.calculateTotalComparisons();
        if (subtitle) subtitle.textContent = `Ready - ${totalComparisons} comparison(s)`;
    }

    // Replace your startAnalysis method with this enhanced version
    async startAnalysis() {
        console.log('Starting analysis: startAnalysis()');
        
        // Validate prerequisites
        if (!this.hasValidRoutes() || this.processRunning) {
            return;
        }
        
        // Switch to progress tab first
        this.switchTab('progress');
        
        // Update button to show we're connecting
        const startButton = document.getElementById('runAnalysisBtn');
        const subtitle = startButton.querySelector('.btn-subtitle');
        if (startButton) {
            startButton.disabled = true;
            if (subtitle) subtitle.textContent = 'Connecting to service...';
        }
        
        try {
            // Wait for SSE connection to be established
            if (!this.sseConnected) {
                console.log('Waiting for SSE connection...');
                await this.waitForSSEConnection();
            }
            
            // Check for lock file
            const lockCheck = await fetch('/api/analysis/lock-check');
            const lockStatus = await lockCheck.json();
            
            if (lockStatus.locked) {
                this.showNotification('Another analysis is currently running. Please wait.', 'warning');
                this.updateStartAnalysisButton(); // Reset button state
                return;
            }
            
            console.log('Starting analysis with valid routes:', this.routeLists);
            
            // Start the analysis (SSE already connected)
            const response = await fetch('/api/analysis/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    routeLists: this.routeLists.filter(list => 
                        list.routes.some(route => this.isValidHttpUrl(route))
                    )
                })
            });
            
            
            // get reportId from response
            const data = await response.json();
            console.log('Response from analysis start:', data);
            this.reportId = data.reportId;
            console.log('Report ID:', this.reportId);
            
            if (!response.ok) {
                throw new Error('Failed to start analysis');
            }
            
            this.processRunning = true;
            this.updateProcessStatus('running');
            this.updateStartAnalysisButton(); // Update button state

            this.addTerminalLine(`Analysis started successfully! Report ID: ${this.reportId} 🚀`, 'success');

        } catch (error) {
            console.error('Error starting analysis:', error);
            this.showNotification('Failed to start analysis. Please try again.', 'error');
            this.updateStartAnalysisButton(); // Reset button state
        }
    }

    // Add this new method to wait for SSE connection
    async waitForSSEConnection(timeout = 15000) {
        return new Promise((resolve, reject) => {
            // If already connected, resolve immediately
            if (this.sseConnected) {
                resolve();
                return;
            }
            
            // Set up timeout
            const timeoutId = setTimeout(() => {
                reject(new Error('SSE connection timeout'));
            }, timeout);
            
            // Check connection status periodically
            const checkConnection = setInterval(() => {
                if (this.sseConnected) {
                    clearTimeout(timeoutId);
                    clearInterval(checkConnection);
                    resolve();
                }
            }, 100);
        });
    }    

    // 7. Modified initializeSSE method (remove timeout, add proper status management)
    initializeSSE() {
        console.log('🚀 initializeSSE called - starting SSE setup...');
        
        return new Promise((resolve, reject) => {
            if (this.eventSource) {
                console.log('🔄 Closing existing EventSource...');
                this.eventSource.close();
            }
            
            this.clearSSETimeouts();
            
            console.log('📡 Creating new EventSource for: /api/analysis/progress');
            const source = new EventSource('/api/analysis/progress');
            console.log('📡 EventSource created, readyState:', source.readyState);
                    
            // Set a reasonable connection timeout (10 seconds)
            this.connectionTimeout = setTimeout(() => {
                console.log('⏰ SSE connection timeout');
                this.updateConnectionStatus('error');
                this.addTerminalLine('Connection timeout - please check your network', 'error');
                reject(new Error('SSE connection timeout'));
            }, 10000);
            
            source.onopen = (event) => {
                console.log('🎉 SSE connection opened!');
                
                if (this.connectionTimeout) {
                    clearTimeout(this.connectionTimeout);
                    this.connectionTimeout = null;
                }
                
                this.updateConnectionStatus('connected');
                this.startActivityMonitoring();
                resolve();
            };
            
            source.onmessage = (event) => {            
                try {
                    const data = JSON.parse(event.data);
                    console.log('📨 SSE message received:', data.type);
                    
                    this.lastHeartbeat = Date.now();
                    this.resetActivityTimeout();
                    
                    this.handleProgressUpdate(data);
                } catch (error) {
                    console.error('❌ Error parsing SSE data:', error);
                    console.error('❌ Raw data that failed:', event.data);
                }
            };
            
            source.onerror = (error) => {
                console.error('💥 SSE error:', error);
                
                this.clearSSETimeouts();
                
                if (source.readyState === EventSource.CLOSED) {
                    console.log('🔄 EventSource closed, will attempt reconnect...');
                    this.updateConnectionStatus('error');
                    
                    setTimeout(() => {
                        if (this.currentTab === 'progress') {
                            console.log('🔄 Attempting SSE reconnection...');
                            this.establishSSEConnection();
                        }
                    }, 5000);
                    
                    reject(new Error('SSE connection failed'));
                }
            };

                console.log('📡 Setting this.eventSource to newly created source');
                this.eventSource = source;
                console.log('📡 EventSource initialized successfully');
        });
    }

    // 8. Add disconnect method
    disconnectSSE() {
        console.log('🔌 Disconnecting SSE...');
        
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
        
        this.clearSSETimeouts();
        this.updateConnectionStatus('disconnected');
    }

    handleProgressUpdate(data) {
        switch (data.type) {
            case 'connected':
                this.addTerminalLine(data.message, 'info');
                break;
                
            case 'started':
                this.addTerminalLine('Analysis process started', 'info');
                break;
                
            case 'status':
                // Handle status updates from backend
                if (data.isRunning !== this.processRunning) {
                    this.processRunning = data.isRunning;
                    this.updateProcessStatus(data.isRunning ? 'running' : 'idle');
                }
                break;
                
            case 'progress':
                this.updateOverallProgress(data.percentage);
                break;
                
            case 'step':
                this.updateStepProgress(data.step, data.status, data.percentage);
                break;
                
            case 'terminal':
                this.addTerminalLine(data.content, data.lineType);
                break;
                
            case 'complete':
                this.handleAnalysisComplete(data);
                break;
                
            case 'error':
                this.handleAnalysisError(data);
                break;
                
            case 'finished':
                // Backend is signaling end of SSE stream
                this.addTerminalLine('Analysis session ended', 'info');
                if (this.eventSource) {
                    this.eventSource.close();
                    this.eventSource = null;
                }
                
                this.clearSSETimeouts();

                // Auto-switch to results after a delay
                setTimeout(() => {
                    this.switchTab('results');
                }, 2000);

                break;
                
            case 'heartbeat':
                // Just a keepalive, no action needed
                console.log('Received heartbeat');
                break;
                
            case 'debug':
                // Debug messages from backend
                this.addTerminalLine(`Debug: ${data.message}`, 'info');
                break;
                
            default:
                console.log('Unknown SSE message type:', data.type, data);
        }
    }  

    updateOverallProgress(percentage) {
        const progressBar = document.getElementById('overallProgressBar');
        if (progressBar) {
            const fill = progressBar.querySelector('.progress-fill');
            if (fill) {
                fill.style.width = `${percentage}%`;
            }
            
            const percentageEl = progressBar.parentElement.querySelector('.progress-percentage');
            if (percentageEl) {
                percentageEl.textContent = `${percentage}%`;
            }
        }
    }
    
    updateStepProgress(stepKey, status, percentage = 0) {
        const stepElement = document.querySelector(`[data-step="${stepKey}"]`);
        if (!stepElement) return;
        
        // Remove previous status classes
        stepElement.classList.remove('pending', 'running', 'complete', 'error');
        stepElement.classList.add(status);
        
        // Update progress bar
        const progressFill = stepElement.querySelector('.step-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
    }
    
    addTerminalLine(content, lineType = 'info') {
        const terminal = document.getElementById('terminalOutput');
        if (!terminal) return;
        
        const line = document.createElement('div');
        line.className = `terminal-line ${lineType}`;
        
        const timestamp = new Date().toLocaleTimeString();
        line.innerHTML = `
            <span class="line-timestamp">${timestamp}</span>
            <span class="line-content">${this.escapeHtml(content)}</span>
        `;
        
        terminal.appendChild(line);
        
        // Auto-scroll to bottom
        terminal.scrollTop = terminal.scrollHeight;
        
        // Limit number of lines to prevent memory issues
        if (terminal.children.length > 1000) {
            terminal.removeChild(terminal.firstChild);
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    handleAnalysisComplete(data) {
        this.processRunning = false;
        this.processCompleted = true;
        
        this.updateProcessStatus('complete');
        this.addTerminalLine(`${data.message}`, 'success');

        
        // Enable results tab
        this.updateTabAvailability();
        
        // Show notification
        this.showNotification('SAR completed! View your results.', 'success');      
    }
    
    handleAnalysisError(data) {
        this.processRunning = false;
        this.updateProcessStatus('idle');
        this.addTerminalLine(`❌ Error: ${data.message}`, 'error');
        
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
        
        this.showNotification(`Analysis failed: ${data.message}`, 'error');
    }
    
    async cancelAnalysis() {
        if (!this.processRunning) return;
        
        try {
            this.clearSSETimeouts();

            const response = await fetch('/api/analysis/cancel', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reportId: this.reportId }) });

            console.log('Cancel response:', await response.json());

            if (response.ok) {
                // Close SSE connection first
                if (this.eventSource) {
                    this.eventSource.close();
                    this.eventSource = null;
                }

                this.processRunning = false;
                this.updateProcessStatus('idle');
                this.addTerminalLine('Analysis cancelled by user', 'error');
                
                this.switchTab('setup');
            } else {
                throw new Error('Failed to cancel analysis');
            }
        } catch (error) {
            console.error('Error cancelling analysis:', error);
            this.showNotification('Failed to cancel analysis', 'error');
        }
    }
    
    updateProcessStatus(status) {
        const indicator = document.getElementById('statusIndicator');
        const icon = document.getElementById('statusIcon');
        const text = document.getElementById('statusText');
        
        if (indicator) {
            indicator.className = `status-indicator ${status}`;
        }
        
        const statusConfig = {
            idle: { icon: '⚪', text: 'Ready to Start' },
            running: { icon: '🟡', text: 'Analysis Running' },
            complete: { icon: '🟢', text: 'Analysis Complete' }
        };
        
        const config = statusConfig[status];
        if (config && icon && text) {
            icon.textContent = config.icon;
            text.textContent = config.text;
        }
    }
    
    // Terminal Controls
    toggleTerminal() {
        const tunnel = document.getElementById('terminalTunnel');
        const toggle = document.getElementById('terminalToggle');
        
        if (tunnel && toggle) {
            tunnel.classList.toggle('collapsed');
            toggle.classList.toggle('collapsed');
        }
    }
    
    // Results Functions
    async downloadReport() {
        if (!this.reportId) return;
        
        try {
            const response = await fetch(`/api/reports/${this.reportId}/download`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `route-comparison-${this.reportId}.zip`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error downloading report:', error);
            this.showNotification('Failed to download report', 'error');
        }
    }
    
    startNewAnalysis() {
        // Close SSE if open
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
        this.clearSSETimeouts();
        
        // Reset state
        this.processRunning = false;
        this.processCompleted = false;
        this.reportId = null;
        this.validationState.clear();
        this.duplicateComparisons.clear();
        
        // Reset UI
        this.updateProcessStatus('idle');
        this.updateTabAvailability();
        this.switchTab('setup');
        
        // Clear terminal
        const terminal = document.getElementById('terminalOutput');
        if (terminal) {
            terminal.innerHTML = '';
        }
        
        this.showNotification('Ready for new analysis', 'info');
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add to page
        let container = document.getElementById('notificationContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notificationContainer';
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // updateResultsTab() {
    //     console.log('Updating results tab with report ID:', this.reportId);
    //     const viewReportBtn = document.getElementById('viewReportBtn');
    //     const downloadReportBtn = document.getElementById('downloadReportBtn');

    //     downloadReportBtn.disabled = !this.processCompleted;
    //     viewReportBtn.disabled = !this.processCompleted;
    //     viewReportBtn.href = this.processCompleted ? `/report/${this.reportId}/` : '#';

    //     // Add li to navigation ul li.dropdown ul dropdown-menu
    //     const dropDownMenu = document.querySelector('.dropdown-menu');
    //     if (dropDownMenu) {
    //         const reportLink = document.createElement('li');
    //         reportLink.className = 'nav-item';
    //         reportLink.innerHTML = `
    //             <a class="nav-link" href="/report/${this.reportId}/">
    //                 Analyze ${this.reportId.replace('analyze_', '')}
    //             </a>
    //         `;
    //         dropDownMenu.prepend(reportLink);
    //     }
    // }


    updateResultsTab() {
        console.log('Updating results tab with report ID:', this.reportId);
        
        // Load the actual report data
        if (this.processCompleted && this.reportId) {
            this.loadReportData();
        }

        // Update navigation dropdown (keep existing code)
        const dropDownMenu = document.querySelector('.dropdown-menu');
        if (dropDownMenu && this.reportId) {
            const reportLink = document.createElement('li');
            reportLink.className = 'nav-item';
            reportLink.innerHTML = `
                <a class="nav-link" href="/report/${this.reportId}/">
                    Analyze ${this.reportId.replace('analyze_', '')}
                </a>
            `;
            dropDownMenu.prepend(reportLink);
        }
    }

    async fetchReportSummary() {
        if (!this.reportId) {
            console.error('No report ID available for summary fetch');
            return null;
        }

        try {
            console.log(`Fetching summary data for report: ${this.reportId}`);
            
            const response = await fetch(`/api/analysis/report/${this.reportId}/summary`);
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to fetch report summary:', errorData);
                this.showNotification(`Failed to load report summary: ${errorData.message}`, 'error');
                return null;
            }

            const summaryData = await response.json();
            console.log('Report summary loaded successfully:', summaryData);
            
            return summaryData;
            
        } catch (error) {
            console.error('Error fetching report summary:', error);
            this.showNotification('Failed to load report summary', 'error');
            return null;
        }
    }

    async loadReportData() {
        // Show loading state
        const resultsSection = document.querySelector('.results-section');
        if (resultsSection) {
            resultsSection.innerHTML = '<div class="loading-spinner">Loading report data...</div>';
        }

        // Fetch the summary data
        const summaryData = await this.fetchReportSummary();
        
        if (!summaryData) {
            // Show error state
            if (resultsSection) {
                resultsSection.innerHTML = `
                    <div class="error-state">
                        <h3>⚠️ Unable to Load Report Data</h3>
                        <p>The report analysis may still be processing or the files are not yet available.</p>
                        <button class="btn-secondary" onclick="routeManager.loadReportData()">
                            <span class="btn-icon">🔄</span>
                            Retry Loading
                        </button>
                    </div>
                `;
            }
            return;
        }

        // Store the data for use in rendering
        this.reportSummaryData = summaryData;
        
        // Render the results UI with the loaded data
        this.renderResultsWithData(summaryData);
    }

    renderResultsWithData(summaryData) {
        console.log('Rendering results with data:', summaryData);
        
        const resultsSection = document.querySelector('.results-section');
        if (!resultsSection) return;

        const { data, availableAnalysis, reportId } = summaryData;
        const master = data.masterSummary;
        const seo = data.seoSummary;
        const content = data.contentSummary;
        const visual = data.visualSummary;
        const technical = data.technicalSummary;
        const masterScraping = data.masterScraping;

        resultsSection.innerHTML = `
            <!-- Results Header -->
            <div class="results-header">
                <h2>Analysis Complete</h2>
                <div class="results-meta">
                    <span class="meta-item">
                        <span class="meta-icon">📋</span>
                        Report: ${summaryData.reportId.replace('analyze_', '')}
                    </span>
                    <span class="meta-item">
                        <span class="meta-icon">🕒</span>
                        ${new Date(summaryData.timestamp).toLocaleString()}
                    </span>
                    <span class="meta-item">
                        <span class="meta-icon">🔗</span>
                        ${master?.totalComparisons || 0} Comparisons
                    </span>
                </div>
            </div>

            <!-- Quick Overview Cards -->
            <div class="overview-section">
                <h3 class="section-title">📊 Analysis Overview</h3>
                <div class="overview-cards">
                    <div class="overview-card similarity-card">
                        <div class="card-header">
                            <span class="card-icon">🎯</span>
                            <span class="card-title">Similarity Distribution</span>
                        </div>
                        <div class="similarity-chart">
                            <div class="similarity-bar high" style="height: ${master ? (master.highSimilarity / master.totalComparisons * 100) : 0}%">
                                <span class="bar-value">${master?.highSimilarity || 0}</span>
                                <span class="bar-label">High</span>
                            </div>
                            <div class="similarity-bar moderate" style="height: ${master ? (master.moderateSimilarity / master.totalComparisons * 100) : 0}%">
                                <span class="bar-value">${master?.moderateSimilarity || 0}</span>
                                <span class="bar-label">Moderate</span>
                            </div>
                            <div class="similarity-bar low" style="height: ${master ? (master.lowSimilarity / master.totalComparisons * 100) : 0}%">
                                <span class="bar-value">${master?.lowSimilarity || 0}</span>
                                <span class="bar-label">Low</span>
                            </div>
                        </div>
                    </div>

                    <div class="overview-card seo-card">
                        <div class="card-header">
                            <span class="card-icon">🔍</span>
                            <span class="card-title">SEO Risk Assessment</span>
                        </div>
                        <div class="seo-risk-content">
                            <div class="risk-level ${master?.topSimilarities?.[0]?.seoRisk?.toLowerCase() || 'low'}">
                                ${master?.topSimilarities?.[0]?.seoRisk || 'UNKNOWN'}
                            </div>
                            <div class="risk-details">
                                <div class="risk-stat">
                                    <span class="risk-number">${seo?.overview?.criticalIssues || 0}</span>
                                    <span class="risk-label">Critical Issues</span>
                                </div>
                                <div class="risk-stat">
                                    <span class="risk-number">${seo?.overview?.highPriorityIssues || 0}</span>
                                    <span class="risk-label">High Priority</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="overview-card analysis-completeness-card">
                        <div class="card-header">
                            <span class="card-icon">✅</span>
                            <span class="card-title">Analysis Completeness</span>
                        </div>
                        <div class="completeness-grid">
                            <div class="completeness-item ${availableAnalysis.visual ? 'complete' : 'incomplete'}">
                                <span class="completeness-icon">${availableAnalysis.visual ? '✅' : '❌'}</span>
                                <span class="completeness-label">Visual</span>
                            </div>
                            <div class="completeness-item ${availableAnalysis.content ? 'complete' : 'incomplete'}">
                                <span class="completeness-icon">${availableAnalysis.content ? '✅' : '❌'}</span>
                                <span class="completeness-label">Content</span>
                            </div>
                            <div class="completeness-item ${availableAnalysis.technical ? 'complete' : 'incomplete'}">
                                <span class="completeness-icon">${availableAnalysis.technical ? '✅' : '❌'}</span>
                                <span class="completeness-label">Technical</span>
                            </div>
                            <div class="completeness-item ${availableAnalysis.seo ? 'complete' : 'incomplete'}">
                                <span class="completeness-icon">${availableAnalysis.seo ? '✅' : '❌'}</span>
                                <span class="completeness-label">SEO</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detailed Analysis Scores -->
            <div class="scores-section">
                <h3 class="section-title">📈 Analysis Scores</h3>
                <div class="scores-grid">
                    ${content?.results?.[0] ? `
                    <div class="score-card content-score">
                        <div class="score-header">
                            <span class="score-icon">📝</span>
                            <span class="score-title">Content Analysis</span>
                        </div>
                        <div class="score-value">${Math.round(content.results[0].avgScore * 100)}%</div>
                        <div class="score-breakdown">
                            <div class="breakdown-item">
                                <span class="breakdown-label">Jaccard Similarity</span>
                                <div class="breakdown-bar">
                                    <div class="breakdown-fill" style="width: ${content.results[0].metrics.jaccard * 100}%"></div>
                                </div>
                                <span class="breakdown-value">${Math.round(content.results[0].metrics.jaccard * 100)}%</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="breakdown-label">Semantic Match</span>
                                <div class="breakdown-bar">
                                    <div class="breakdown-fill" style="width: ${content.results[0].metrics.semantic * 100}%"></div>
                                </div>
                                <span class="breakdown-value">${Math.round(content.results[0].metrics.semantic * 100)}%</span>
                            </div>
                        </div>
                    </div>` : ''}

                    ${visual?.results?.[0] ? `
                    <div class="score-card visual-score">
                        <div class="score-header">
                            <span class="score-icon">🎨</span>
                            <span class="score-title">Visual Analysis</span>
                        </div>
                        <div class="score-value">${Math.round(visual.results[0].avgScore * 100)}%</div>
                        <div class="score-breakdown">
                            <div class="breakdown-item">
                                <span class="breakdown-label">Layout Similarity</span>
                                <div class="breakdown-bar">
                                    <div class="breakdown-fill" style="width: ${visual.results[0].metrics.layout * 100}%"></div>
                                </div>
                                <span class="breakdown-value">${Math.round(visual.results[0].metrics.layout * 100)}%</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="breakdown-label">Typography Match</span>
                                <div class="breakdown-bar">
                                    <div class="breakdown-fill" style="width: ${visual.results[0].metrics.typography * 100}%"></div>
                                </div>
                                <span class="breakdown-value">${Math.round(visual.results[0].metrics.typography * 100)}%</span>
                            </div>
                        </div>
                    </div>` : ''}

                    ${technical?.results?.[0] ? `
                    <div class="score-card technical-score">
                        <div class="score-header">
                            <span class="score-icon">⚙️</span>
                            <span class="score-title">Technical Analysis</span>
                        </div>
                        <div class="score-value">${Math.round(technical.results[0].avgScore * 100)}%</div>
                        <div class="score-breakdown">
                            <div class="breakdown-item">
                                <span class="breakdown-label">HTML Structure</span>
                                <div class="breakdown-bar">
                                    <div class="breakdown-fill" style="width: ${technical.results[0].detailedScores.htmlStructure * 100}%"></div>
                                </div>
                                <span class="breakdown-value">${Math.round(technical.results[0].detailedScores.htmlStructure * 100)}%</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="breakdown-label">Meta Tags</span>
                                <div class="breakdown-bar">
                                    <div class="breakdown-fill" style="width: ${technical.results[0].detailedScores.metaTags * 100}%"></div>
                                </div>
                                <span class="breakdown-value">${Math.round(technical.results[0].detailedScores.metaTags * 100)}%</span>
                            </div>
                        </div>
                    </div>` : ''}
                </div>
            </div>

            <!-- Images Section -->
            <div class="images-section">
                <h3 class="section-title">🖼️ Visual Screenshots Comparison</h3>
                <div class="images-grid"> 
                    ${masterScraping.scraped_sites.length ? masterScraping.scraped_sites.map(site => `
                        <div class="image-card"> 
                            <i>${site.directory}</i>               
                            <div class="screenshot-mock">
                                <div class="mock-browser show-scrollbar">
                                    <div class="browser-header">
                                        <div class="browser-controls">
                                            <span class="control red"></span>
                                            <span class="control yellow"></span>
                                            <span class="control green"></span>
                                        </div>
                                        <div class="url-bar">${site.pages[0].pageId}</div>
                                    </div>
                                    <div class="browser-content">
                                        <img
                                            src="/_/report/${reportId}/${site.directory}/${site.pages[0].pageId}/screenshot.png" />
                                    </div>
                                </div>
                            </div>
                        </div>`).join('') : `
                        <div class="no-images">No images available for this report.</div>
                    `}
                </div>
            </div>

            <!-- Key Insights -->
            <div class="insights-section">
                <h3 class="section-title">💡 Key Insights</h3>
                <div class="insights-grid">
                    ${visual?.results?.[0]?.topInsights ? `
                    <div class="insight-card">
                        <div class="insight-header">
                            <span class="insight-icon">🎨</span>
                            <span class="insight-title">Visual Design</span>
                        </div>
                        <ul class="insight-list">
                            ${visual.results[0].topInsights.map(insight => `<li>${insight}</li>`).join('')}
                        </ul>
                    </div>` : ''}

                    ${master?.topSimilarities?.[0] ? `
                    <div class="insight-card">
                        <div class="insight-header">
                            <span class="insight-icon">🔍</span>
                            <span class="insight-title">Similarity Analysis</span>
                        </div>
                        <div class="similarity-insight">
                            <div class="similarity-score">
                                ${Math.round(master.topSimilarities[0].score * 100)}%
                            </div>
                            <div class="similarity-classification">
                                ${master.topSimilarities[0].classification.replace(/_/g, ' ')}
                            </div>
                            <div class="similarity-comparison">
                                ${master.topSimilarities[0].comparison.split('_vs_').map(site => 
                                    site.replace(/_/g, ' ').replace(/com \d+/, '.com')
                                ).join(' vs ')}
                            </div>
                        </div>
                    </div>` : ''}

                    ${content?.globalStats ? `
                    <div class="insight-card">
                        <div class="insight-header">
                            <span class="insight-icon">⚡</span>
                            <span class="insight-title">Performance</span>
                        </div>
                        <div class="performance-stats">
                            <div class="perf-stat">
                                <span class="perf-value">${content.globalStats.totalProcessingTime}s</span>
                                <span class="perf-label">Processing Time</span>
                            </div>
                            <div class="perf-stat">
                                <span class="perf-value">${Math.round(content.globalStats.processingSpeed)}</span>
                                <span class="perf-label">Pages/Min</span>
                            </div>
                        </div>
                    </div>` : ''}
                </div>
            </div>

            <!-- Actions -->
            <div class="results-actions">
                <a href="/report/${summaryData.reportId}/" class="btn-primary view-report-btn" target="_blank">
                    <span class="btn-icon">📄</span>
                    View Full Report
                </a>
                <button class="btn-secondary new-analysis-btn" id="newAnalysisBtn">
                    <span class="btn-icon">🔄</span>
                    New Analysis
                </button>
            </div>
        `;

        // Re-attach event listeners and initialize animations
        this.initializeResultsInteractions();
    }

    // Add this method for animations
    // Add these additional JavaScript functions to run_report.js
    // These enhance the results interface with more interactivity

    // Enhanced animation method with better timing and effects
    animateResults() {
        // Set CSS custom properties for target widths on breakdown bars
        document.querySelectorAll('.breakdown-fill').forEach(fill => {
            const targetWidth = fill.style.width;
            fill.style.setProperty('--target-width', targetWidth);
            fill.style.width = '0'; // Reset to 0 for animation
        });

        // Animate similarity bars with staggered timing
        setTimeout(() => {
            document.querySelectorAll('.similarity-bar').forEach((bar, index) => {
                setTimeout(() => {
                    bar.classList.add('animate-in');
                }, index * 200);
            });
        }, 100);

        // Animate overview cards with staggered entrance
        setTimeout(() => {
            document.querySelectorAll('.overview-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('slide-in');
                }, index * 150);
            });
        }, 300);

        // Animate score cards
        setTimeout(() => {
            document.querySelectorAll('.score-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('slide-in');
                }, index * 200);
            });
        }, 600);

        // Animate breakdown bars after score cards are visible
        setTimeout(() => {
            document.querySelectorAll('.breakdown-fill').forEach((fill, index) => {
                setTimeout(() => {
                    fill.classList.add('animate-in');
                    // Set the target width for animation
                    const targetWidth = fill.getAttribute('style').match(/width:\s*([^;]+)/)?.[1] || '0%';
                    fill.style.width = targetWidth;
                }, index * 100);
            });
        }, 1000);

        // Animate action items
        setTimeout(() => {
            document.querySelectorAll('.action-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('slide-in');
                }, index * 100);
            });
        }, 1200);

        // Animate insight cards
        setTimeout(() => {
            document.querySelectorAll('.insight-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('slide-in');
                }, index * 150);
            });
        }, 1400);
    }

    // Add method to get risk level color classes
    getRiskLevelClass(riskLevel) {
        switch(riskLevel?.toLowerCase()) {
            case 'high':
            case 'critical':
                return 'high';
            case 'medium':
            case 'moderate':
                return 'medium';
            case 'low':
                return 'low';
            default:
                return 'low';
        }
    }

    // Add method to format site names for display
    formatSiteName(siteName) {
        if (!siteName) return 'Unknown Site';
        
        // Remove timestamp and convert underscores to spaces
        return siteName
            .replace(/_\d{4}\d{2}\d{2}_\d{4}$/, '') // Remove timestamp pattern
            .replace(/_/g, ' ')
            .replace(/com$/, '.com')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Add method to get score color based on percentage
    getScoreColor(score) {
        const percentage = Math.round(score * 100);
        if (percentage >= 80) return '#27ae60'; // Green
        if (percentage >= 60) return '#f39c12'; // Orange
        if (percentage >= 40) return '#e67e22'; // Dark orange
        return '#e74c3c'; // Red
    }

    // Add method to create animated counters for numbers
    animateCounter(element, targetValue, duration = 1000, suffix = '') {
        if (!element) return;
        
        const startValue = 0;
        const increment = targetValue / (duration / 16); // 60fps
        let currentValue = startValue;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            const displayValue = Math.round(currentValue);
            element.textContent = displayValue + suffix;
        }, 16);
    }

    // Add method to handle responsive chart adjustments
    adjustChartsForViewport() {
        const isMobile = window.innerWidth <= 480;
        const isTablet = window.innerWidth <= 832;
        
        // Adjust similarity chart height for mobile
        const similarityCharts = document.querySelectorAll('.similarity-chart');
        similarityCharts.forEach(chart => {
            if (isMobile) {
                chart.style.height = '100px';
            } else {
                chart.style.height = '120px';
            }
        });
        
        // Adjust score card font sizes
        const scoreValues = document.querySelectorAll('.score-value');
        scoreValues.forEach(value => {
            if (isMobile) {
                value.style.fontSize = '2.5rem';
            } else {
                value.style.fontSize = '3rem';
            }
        });
    }

    // Add method to create tooltip functionality
    initializeTooltips() {
        // Add tooltips to breakdown bars
        document.querySelectorAll('.breakdown-item').forEach(item => {
            const label = item.querySelector('.breakdown-label');
            const value = item.querySelector('.breakdown-value');
            
            if (label && value) {
                item.title = `${label.textContent}: ${value.textContent}`;
            }
        });
        
        // Add tooltips to similarity bars
        document.querySelectorAll('.similarity-bar').forEach(bar => {
            const value = bar.querySelector('.bar-value');
            const label = bar.querySelector('.bar-label');
            
            if (value && label) {
                bar.title = `${label.textContent} Similarity: ${value.textContent} comparisons`;
            }
        });
    }

    // Add method to handle print-friendly view
    preparePrintView() {
        // Add print styles dynamically
        const printStyles = `
            @media print {
                .results-section {
                    background: white !important;
                    box-shadow: none !important;
                }
                
                .overview-card,
                .score-card,
                .insight-card,
                .action-item {
                    break-inside: avoid;
                    border: 1px solid #ddd !important;
                    box-shadow: none !important;
                }
                
                .results-actions {
                    display: none !important;
                }
                
                .similarity-bar,
                .breakdown-fill {
                    background: #333 !important;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = printStyles;
        document.head.appendChild(styleElement);
    }

    // Update the initializeResultsInteractions method to include new features
    initializeResultsInteractions() {
        // New Analysis button
        document.getElementById('newAnalysisBtn')?.addEventListener('click', () => {
            this.startNewAnalysis();
        });

        // Initialize additional features
        this.adjustChartsForViewport();
        this.initializeTooltips();
        this.preparePrintView();
        
        // Handle window resize for responsive adjustments
        window.addEventListener('resize', debounce(() => {
            this.adjustChartsForViewport();
        }, 250));

        // Animate charts and progress bars on load
        this.animateResults();

        // Add click handlers for expandable sections (if needed in future)
        document.querySelectorAll('.section-title').forEach(title => {
            title.style.cursor = 'default'; // Keep default for now
        });
    }

    // Add method to export results data (for future enhancement)
    exportResultsData(format = 'json') {
        if (!this.reportSummaryData) {
            this.showNotification('No report data available to export', 'warning');
            return;
        }
        
        const data = {
            reportId: this.reportSummaryData.reportId,
            timestamp: this.reportSummaryData.timestamp,
            summary: {
                totalComparisons: this.reportSummaryData.data.masterSummary?.totalComparisons,
                similarityDistribution: {
                    high: this.reportSummaryData.data.masterSummary?.highSimilarity,
                    moderate: this.reportSummaryData.data.masterSummary?.moderateSimilarity,
                    low: this.reportSummaryData.data.masterSummary?.lowSimilarity
                },
                seoRisk: this.reportSummaryData.data.masterSummary?.topSimilarities?.[0]?.seoRisk,
                scores: {
                    content: this.reportSummaryData.data.contentSummary?.results?.[0]?.avgScore,
                    visual: this.reportSummaryData.data.visualSummary?.results?.[0]?.avgScore,
                    technical: this.reportSummaryData.data.technicalSummary?.results?.[0]?.avgScore
                }
            }
        };
        
        if (format === 'json') {
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `${this.reportId}_summary.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            this.showNotification('Results data exported successfully', 'success');
        }
    }
}

// Utility function for debouncing
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

// Global functions for onclick handlers
function addRouteList() {
    routeManager.addRouteList();
}

function removeRouteList(listIndex) {
    routeManager.removeRouteList(listIndex);
}

function addRoute(listIndex) {
    routeManager.addRoute(listIndex);
}

function removeRoute(listIndex, routeIndex) {
    routeManager.removeRoute(listIndex, routeIndex);
}

function processBulkInput(listIndex) {
    routeManager.processBulkInput(listIndex);
}

function startAnalysis() {
    routeManager.startAnalysis();
}

function cancelAnalysis() {
    routeManager.cancelAnalysis();
}

function toggleTerminal() {
    routeManager.toggleTerminal();
}

// Expose to global scope
window.toggleTerminal = toggleTerminal;

function downloadReport() {
    routeManager.downloadReport();
}

function startNewAnalysis() {
    routeManager.startNewAnalysis();
}

// Initialize when DOM is loaded
$(document).ready(() => {
    window.routeManager = new RouteComparisonManager();
});

// Add notification styles if not already present
const notificationStyles = `
.notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    max-width: 400px;
}

.notification {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease;
}

.notification-info {
    background: #d1ecf1;
    border-left: 4px solid #bee5eb;
    color: #0c5460;
}

.notification-success {
    background: #d4edda;
    border-left: 4px solid #c3e6cb;
    color: #155724;
}

.notification-warning {
    background: #fff3cd;
    border-left: 4px solid #ffeeba;
    color: #856404;
}

.notification-error {
    background: #f8d7da;
    border-left: 4px solid #f5c6cb;
    color: #721c24;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0.7;
    margin-left: 1rem;
}

.notification-close:hover {
    opacity: 1;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Inject notification styles
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = notificationStyles;
    document.head.appendChild(style);
}