(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Route Comparison Analysis - JavaScript Functionality
 * Handles dynamic UI, validation, SSE, and user interactions
 */
// const testSource = new EventSource('/api/analysis/test-sse');
// testSource.onmessage = (e) => console.log('Test message:', e.data);
var RouteComparisonManager = /*#__PURE__*/function () {
  function RouteComparisonManager() {
    _classCallCheck(this, RouteComparisonManager);
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
  return _createClass(RouteComparisonManager, [{
    key: "init",
    value: function init() {
      this.setupEventListeners();
      this.createInitialLists();
      this.updateValidationSummary();
      this.drawConnectionLines();
    }
  }, {
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var _this = this;
      // Tab switching
      document.querySelectorAll('.tab-button').forEach(function (button) {
        button.addEventListener('click', function (e) {
          return _this.switchTab(e.target.dataset.tab);
        });
      });

      // Route input validation (on blur)
      document.addEventListener('blur', function (e) {
        if (e.target.classList.contains('route-input')) {
          _this.validateRoute(e.target);
        }
      }, true);

      // Route input paste detection
      document.addEventListener('paste', function (e) {
        if (e.target.classList.contains('route-input')) {
          setTimeout(function () {
            return _this.handleRoutePaste(e.target);
          }, 10);
        }
      });

      // Keyboard accessibility
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.classList.contains('route-input')) {
          _this.addRouteToList(parseInt(e.target.dataset.list));
        }
      });

      // Window resize for connection lines
      window.addEventListener('resize', debounce(function () {
        return _this.drawConnectionLines();
      }, 250));
    }
  }, {
    key: "createInitialLists",
    value: function createInitialLists() {
      // Start with 2 empty lists
      this.routeLists = [{
        name: '',
        routes: [''],
        domain: ''
      }, {
        name: '',
        routes: [''],
        domain: ''
      }];
      this.renderAllRouteLists();
    }

    // Also update your switchTab method to handle the progress tab better
  }, {
    key: "switchTab",
    value: function switchTab(tabName) {
      if (!this.canSwitchToTab(tabName)) {
        return;
      }

      // Update tab buttons
      document.querySelectorAll('.tab-button').forEach(function (btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      var activeButton = document.querySelector("[data-tab=\"".concat(tabName, "\"]"));
      if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-selected', 'true');
      }

      // Update tab content
      document.querySelectorAll('.tab-content').forEach(function (content) {
        content.classList.remove('active');
      });
      var activeContent = document.getElementById("".concat(tabName, "-panel"));
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
  }, {
    key: "canSwitchToTab",
    value: function canSwitchToTab(tabName) {
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
  }, {
    key: "startActivityMonitoring",
    value: function startActivityMonitoring() {
      this.lastHeartbeat = Date.now();
      this.resetActivityTimeout();
    }
  }, {
    key: "resetActivityTimeout",
    value: function resetActivityTimeout() {
      var _this2 = this;
      if (this.activityTimeout) {
        clearTimeout(this.activityTimeout);
      }
      this.activityTimeout = setTimeout(function () {
        console.log('⚠️ SSE activity timeout - no recent data');
        _this2.addTerminalLine('No recent activity detected - connection may be stalled', 'warning');
        _this2.updateConnectionStatus('error');
      }, 60000); // 60 seconds of inactivity
    }
  }, {
    key: "handleSSETimeout",
    value: function handleSSETimeout(message) {
      console.log('SSE timeout:', message);
      this.addTerminalLine("\u26A0\uFE0F ".concat(message), 'warning');
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
  }, {
    key: "clearSSETimeouts",
    value: function clearSSETimeouts() {
      if (this.connectionTimeout) {
        clearTimeout(this.connectionTimeout);
        this.connectionTimeout = null;
      }
      if (this.activityTimeout) {
        clearTimeout(this.activityTimeout);
        this.activityTimeout = null;
      }
    }
  }, {
    key: "initializeProgressTracking",
    value: function initializeProgressTracking() {
      var _this3 = this;
      // Reset progress indicators
      this.updateOverallProgress(0);

      // Reset all step indicators
      var steps = ['scraping', 'visual-analysis', 'content-analysis', 'technical-analysis', 'seo-analysis', 'final-report'];
      steps.forEach(function (step) {
        _this3.updateStepProgress(step, 'pending', 0);
      });

      // Clear terminal
      var terminal = document.getElementById('terminalOutput');
      if (terminal) {
        terminal.innerHTML = '';
      }

      // Add initial message
      this.addTerminalLine('Connecting to analysis service...', 'info');
    }
  }, {
    key: "updateTabAvailability",
    value: function updateTabAvailability() {
      var progressTab = document.querySelector('[data-tab="progress"]');
      var resultsTab = document.querySelector('[data-tab="results"]');
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
  }, {
    key: "addRouteList",
    value: function addRouteList() {
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
  }, {
    key: "removeRouteList",
    value: function removeRouteList(listIndex) {
      if (this.routeLists.length <= 2) {
        this.showNotification('Minimum 2 lists required for comparison', 'warning');
        return;
      }
      this.routeLists.splice(listIndex, 1);
      this.renderAllRouteLists();
      this.updateValidationSummary();
      this.drawConnectionLines();
    }
  }, {
    key: "addRoute",
    value: function addRoute(listIndex) {
      var list = this.routeLists[listIndex];
      console.log("Adding route to list ".concat(listIndex, ":"), list);
      if (list.routes.length >= this.maxRoutesPerList) {
        this.showNotification("Maximum routes per list reached (".concat(this.maxRoutesPerList, ")"), 'warning');
        return;
      }
      list.routes.push('');
      this.renderAllRouteLists();
      this.updateValidationSummary();
      this.drawConnectionLines();
    }
  }, {
    key: "removeRoute",
    value: function removeRoute(listIndex, routeIndex) {
      var list = this.routeLists[listIndex];
      if (list.routes.length <= 1) {
        this.showNotification('At least one route required per list', 'warning');
        return;
      }
      list.routes.splice(routeIndex, 1);
      this.renderRouteInputs(listIndex);
      this.updateValidationSummary();
      this.drawConnectionLines();
    }
  }, {
    key: "processBulkInput",
    value: function processBulkInput(listIndex) {
      var _list$routes,
        _this4 = this;
      var textarea = $("#bulkInput".concat(listIndex))[0];
      var urls = textarea.value.split('\n').map(function (line) {
        return line.trim();
      }).filter(function (line) {
        return line.length > 0;
      });
      if (urls.length === 0) {
        this.showNotification('No URLs found in bulk input', 'warning');
        return;
      }
      var list = this.routeLists[listIndex];
      var totalRoutes = list.routes.filter(function (r) {
        return r.trim();
      }).length + urls.length;
      if (totalRoutes > this.maxRoutesPerList) {
        this.showNotification("Would exceed maximum routes per list (".concat(this.maxRoutesPerList, ")"), 'error');
        return;
      }

      // Clear empty routes first
      list.routes = list.routes.filter(function (r) {
        return r.trim();
      });

      // Add new URLs
      (_list$routes = list.routes).push.apply(_list$routes, _toConsumableArray(urls));

      // Clear textarea
      $("#bulkInput".concat(listIndex)).val('');
      this.renderAllRouteLists();
      this.updateValidationSummary();
      this.drawConnectionLines();

      // Validate all new routes
      setTimeout(function () {
        urls.forEach(function (url, index) {
          var routeIndex = list.routes.length - urls.length + index;
          var input = $(".route-input[data-list-index=\"".concat(listIndex, "\"][data-route-index=\"").concat(routeIndex, "\"]"))[0];
          if (input) {
            _this4.validateRoute(input);
          }
        });
      }, 100);
      this.showNotification("Added ".concat(urls.length, " URLs to list"), 'success');
    }
  }, {
    key: "handleRoutePaste",
    value: function handleRoutePaste(input) {
      var value = input.value;
      var lines = value.split('\n').map(function (line) {
        return line.trim();
      }).filter(function (line) {
        return line.length > 0;
      });
      if (lines.length > 1) {
        var _list$routes2;
        var listIndex = parseInt(input.dataset.listIndex);
        var routeIndex = parseInt(input.dataset.routeIndex);

        // Set first URL in current field
        input.value = lines[0];
        this.routeLists[listIndex].routes[routeIndex] = lines[0];

        // Add additional URLs as new routes
        var additionalUrls = lines.slice(1);
        var list = this.routeLists[listIndex];
        if (list.routes.length + additionalUrls.length > this.maxRoutesPerList) {
          this.showNotification("Would exceed maximum routes per list (".concat(this.maxRoutesPerList, ")"), 'error');
          return;
        }

        // Insert additional URLs after current route
        (_list$routes2 = list.routes).splice.apply(_list$routes2, [routeIndex + 1, 0].concat(_toConsumableArray(additionalUrls)));
        this.renderAllRouteLists();
        this.updateValidationSummary();
        this.drawConnectionLines();
        this.showNotification("Split ".concat(lines.length, " URLs into separate fields"), 'success');
      }
    }
  }, {
    key: "validateRoute",
    value: function validateRoute(input) {
      var url = input.value.trim();
      var listIndex = parseInt(input.dataset.listIndex);
      var routeIndex = parseInt(input.dataset.routeIndex);
      var validationKey = "".concat(listIndex, "-").concat(routeIndex);

      // Update internal state
      this.routeLists[listIndex].routes[routeIndex] = url;

      // Clear previous validation state
      $(input).removeClass('valid invalid duplicate');
      this.validationState["delete"](validationKey);
      var validationMessage = document.getElementById("validation".concat(listIndex, "-").concat(routeIndex));
      if (validationMessage) {
        validationMessage.textContent = '';
        validationMessage.classList.remove('show');
      }
      if (!url) {
        return; // Empty is neither valid nor invalid
      }

      // URL format validation
      var isValidUrl = this.isValidHttpUrl(url);
      if (!isValidUrl) {
        $(input).addClass('invalid');
        this.showValidationError(validationMessage, 'Invalid URL format. Must start with http:// or https://');
        return;
      }

      // Duplicate detection
      var isDuplicate = this.checkForDuplicates(url, listIndex, routeIndex);
      if (isDuplicate) {
        $(input).addClass('duplicate');
        this.showValidationError(validationMessage, 'This URL creates duplicate comparisons');
      } else {
        $(input).addClass('valid');
        this.validationState.set(validationKey, {
          valid: true,
          url: url
        });
      }

      // Auto-suggest domain name
      if (isValidUrl && !this.routeLists[listIndex].name) {
        var domain = this.extractDomain(url);
        if (domain) {
          var nameInput = document.getElementById("listName".concat(listIndex));
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
  }, {
    key: "isValidHttpUrl",
    value: function isValidHttpUrl(string) {
      try {
        var url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
      } catch (_) {
        return false;
      }
    }
  }, {
    key: "extractDomain",
    value: function extractDomain(url) {
      try {
        var urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
      } catch (_) {
        return null;
      }
    }
  }, {
    key: "checkForDuplicates",
    value: function checkForDuplicates(url, currentListIndex, currentRouteIndex) {
      this.duplicateComparisons.clear();
      for (var listIndex = 0; listIndex < this.routeLists.length; listIndex++) {
        var list = this.routeLists[listIndex];
        for (var routeIndex = 0; routeIndex < list.routes.length; routeIndex++) {
          var routeUrl = list.routes[routeIndex];
          if (!routeUrl || !this.isValidHttpUrl(routeUrl)) continue;
          if (listIndex === currentListIndex && routeIndex === currentRouteIndex) continue;

          // Check if this creates a duplicate comparison
          if (routeUrl === url) {
            for (var otherListIndex = 0; otherListIndex < this.routeLists.length; otherListIndex++) {
              if (otherListIndex === listIndex || otherListIndex === currentListIndex) continue;
              var otherList = this.routeLists[otherListIndex];
              var correspondingRoute = otherList.routes[routeIndex] || otherList.routes[currentRouteIndex];
              if (correspondingRoute && this.isValidHttpUrl(correspondingRoute)) {
                this.duplicateComparisons.add("".concat(routeUrl, " \u2194 ").concat(correspondingRoute));
                return true;
              }
            }
          }
        }
      }
      return false;
    }
  }, {
    key: "showValidationError",
    value: function showValidationError(messageElement, text) {
      if (messageElement) {
        messageElement.textContent = text;
        messageElement.classList.add('show');
      }
    }
  }, {
    key: "updateListName",
    value: function updateListName(listIndex, value) {
      this.routeLists[listIndex].name = value;
    }
  }, {
    key: "hasValidRoutes",
    value: function hasValidRoutes() {
      return Array.from(this.validationState.values()).filter(function (state) {
        return state.valid;
      }).length >= 2;
    }
  }, {
    key: "updateValidationSummary",
    value: function updateValidationSummary() {
      var validRoutes = Array.from(this.validationState.values()).filter(function (state) {
        return state.valid;
      }).length;
      var totalComparisons = this.calculateTotalComparisons();
      var duplicateCount = this.duplicateComparisons.size;

      // Update numbers
      var totalRoutesEl = document.getElementById('totalRoutes');
      var totalComparisonsEl = document.getElementById('totalComparisons');
      var duplicateWarningsEl = document.getElementById('duplicateWarnings');
      if (totalRoutesEl) totalRoutesEl.textContent = validRoutes;
      if (totalComparisonsEl) totalComparisonsEl.textContent = totalComparisons;
      if (duplicateWarningsEl) duplicateWarningsEl.textContent = duplicateCount;

      // Replace the old button update code with this:
      this.updateStartAnalysisButton(); // Use the new centralized method

      // Update global validation messages
      this.updateGlobalValidationMessages();
    }
  }, {
    key: "calculateTotalComparisons",
    value: function calculateTotalComparisons() {
      var _this5 = this;
      if (this.routeLists.length < 2) return 0;
      var validRoutesPerList = this.routeLists.map(function (list) {
        return list.routes.filter(function (route) {
          var validationEntry = Array.from(_this5.validationState.entries()).find(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              state = _ref2[1];
            return state.url === route && state.valid;
          });
          return !!validationEntry;
        }).length;
      });
      var maxRoutes = Math.max.apply(Math, _toConsumableArray(validRoutesPerList));
      var numLists = this.routeLists.length;
      return maxRoutes * (numLists * (numLists - 1)) / 2;
    }
  }, {
    key: "updateGlobalValidationMessages",
    value: function updateGlobalValidationMessages() {
      var container = document.getElementById('globalValidation');
      if (!container) return;
      container.innerHTML = '';
      this.duplicateComparisons.forEach(function (duplicate) {
        var warningEl = document.createElement('div');
        warningEl.className = 'validation-warning';
        warningEl.innerHTML = "\n                <span class=\"warning-icon\">\u26A0\uFE0F</span>\n                Duplicate comparison: ".concat(duplicate, "\n            ");
        container.appendChild(warningEl);
      });
    }
  }, {
    key: "drawConnectionLines",
    value: function drawConnectionLines() {
      var container = document.getElementById('connectionLines');
      if (!container) return;
      container.innerHTML = '';

      // Only draw if we have multiple lists with routes
      if (this.routeLists.length < 2) return;
      var routeRows = document.querySelectorAll('.route-input-row');
      var listElements = document.querySelectorAll('.route-list');
      if (listElements.length < 2) return;
      var maxRoutesShown = Math.max.apply(Math, _toConsumableArray(this.routeLists.map(function (list) {
        return list.routes.length;
      })));
      for (var routeIndex = 0; routeIndex < maxRoutesShown; routeIndex++) {
        for (var listIndex = 0; listIndex < this.routeLists.length - 1; listIndex++) {
          var currentList = listElements[listIndex];
          var nextList = listElements[listIndex + 1];
          var currentRow = currentList.querySelector("[data-route-index=\"".concat(routeIndex, "\"]"));
          var nextRow = nextList.querySelector("[data-route-index=\"".concat(routeIndex, "\"]"));
          if (currentRow && nextRow) {
            this.createConnectionLine(currentRow, nextRow, routeIndex + 1, container);
          }
        }
      }
    }
  }, {
    key: "createConnectionLine",
    value: function createConnectionLine(fromRow, toRow, colorIndex, container) {
      var fromRect = fromRow.getBoundingClientRect();
      var toRect = toRow.getBoundingClientRect();
      var containerRect = container.getBoundingClientRect();
      var line = document.createElement('div');
      line.className = "connection-line color-".concat(colorIndex % 6 + 1);
      var startX = fromRect.right - containerRect.left;
      var endX = toRect.left - containerRect.left;
      var y = fromRect.top + fromRect.height / 2 - containerRect.top;
      var width = endX - startX;
      line.style.left = "".concat(startX, "px");
      line.style.top = "".concat(y, "px");
      line.style.width = "".concat(width, "px");
      container.appendChild(line);
    }
  }, {
    key: "renderAllRouteLists",
    value: function renderAllRouteLists() {
      var _this6 = this;
      var container = $('.route-lists-container');
      container.empty();
      this.routeLists.forEach(function (list, listIndex) {
        var listElement = _this6.createRouteListElement(listIndex);
        container.append(listElement);
      });

      // Re-attach event listeners after rendering
      this.attachRouteListEventListeners();
    }
  }, {
    key: "createRouteListElement",
    value: function createRouteListElement(listIndex) {
      var _this7 = this;
      var list = this.routeLists[listIndex];
      var colorClass = "list-color-".concat(listIndex);
      var canRemove = this.routeLists.length > 2;
      if (this.routeLists.length >= this.maxLists) {
        $("#addListBtn").prop('disabled', true);
      } else {
        $("#addListBtn").prop('disabled', false);
      }
      var routeInputsHtml = list.routes.map(function (route, routeIndex) {
        return _this7.createRouteInputRowHtml(listIndex, routeIndex, route);
      }).join('');
      var listHtml = "\n            <div class=\"route-list ".concat(colorClass, "\" data-list-index=\"").concat(listIndex, "\">\n                <div class=\"list-header\">\n                    <div class=\"list-title-section\">\n                        <label for=\"listName").concat(listIndex, "\" class=\"list-label\">\n                            Site ").concat(listIndex + 1, " Name\n                        </label>\n                        <input type=\"text\" \n                               id=\"listName").concat(listIndex, "\" \n                               class=\"list-name-input\" \n                               placeholder=\"").concat(list.domain || 'Enter site name', "\"\n                               value=\"").concat(list.name, "\"\n                               aria-describedby=\"listName").concat(listIndex, "-help\">\n                        <small id=\"listName").concat(listIndex, "-help\" class=\"input-help\">\n                            Optional: Enter a name for this site\n                        </small>\n                    </div>\n                </div>\n\n                <div class=\"route-inputs-container\" id=\"routeInputs").concat(listIndex, "\">\n                    ").concat(routeInputsHtml, "\n                </div>\n\n                <div class=\"list-footer\">\n                    <button class=\"add-route-btn\" \n                            data-action=\"add-route\" \n                            data-list-index=\"").concat(listIndex, "\"\n                            ").concat(list.routes.length >= this.maxRoutesPerList ? 'disabled' : '', ">\n                        <span class=\"btn-icon\">\u2795</span>\n                        Add Route (").concat(list.routes.length, "/30)\n                    </button>\n                    \n                    <div class=\"bulk-input-section\">\n                        <label for=\"bulkInput").concat(listIndex, "\" class=\"bulk-label\">\n                            Or paste multiple URLs:\n                        </label>\n                        <textarea id=\"bulkInput").concat(listIndex, "\" \n                                  class=\"bulk-input\" \n                                  placeholder=\"Paste multiple URLs, one per line\"\n                                  rows=\"3\"\n                                  data-list-index=\"").concat(listIndex, "\"></textarea>\n                        <button class=\"process-bulk-btn\" \n                                data-action=\"process-bulk\" \n                                data-list-index=\"").concat(listIndex, "\">\n                            Process URLs\n                        </button>\n                    </div>\n                </div>\n                <div class=\"list-actions\">\n                    ").concat(canRemove ? "\n                        <button class=\"remove-list-btn\" data-action=\"remove-list\" data-list-index=\"".concat(listIndex, "\">\n                            <span class=\"btn-icon\">\uD83D\uDDD1\uFE0F</span>\n                            Remove\n                        </button>\n                    ") : '', "\n                </div>\n            </div>\n        ");
      return $(listHtml);
    }
  }, {
    key: "createRouteInputRowHtml",
    value: function createRouteInputRowHtml(listIndex, routeIndex) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var canRemove = this.routeLists[listIndex].routes.length > 1;
      return "\n            <div class=\"route-input-row\" data-route-index=\"".concat(routeIndex, "\">\n                <div class=\"route-number\">").concat(routeIndex + 1, "</div>\n                <div class=\"input-container\">\n                    <input type=\"url\" \n                           class=\"route-input\" \n                           placeholder=\"https://example.com/page\"\n                           value=\"").concat(value, "\"\n                           data-list-index=\"").concat(listIndex, "\"\n                           data-route-index=\"").concat(routeIndex, "\"\n                           aria-label=\"Route ").concat(routeIndex + 1, " for list ").concat(listIndex + 1, "\">\n                    <div class=\"validation-message\" id=\"validation").concat(listIndex, "-").concat(routeIndex, "\"></div>\n                </div>\n                <div class=\"route-actions\">\n                    ").concat(canRemove ? "\n                        <button class=\"remove-route-btn\" \n                                data-action=\"remove-route\" \n                                data-list-index=\"".concat(listIndex, "\"\n                                data-route-index=\"").concat(routeIndex, "\"\n                                aria-label=\"Remove this route\">\n                            <span class=\"btn-icon\">\u2716\uFE0F</span>\n                        </button>\n                    ") : '', "\n                </div>\n            </div>\n        ");
    }
  }, {
    key: "attachRouteListEventListeners",
    value: function attachRouteListEventListeners() {
      var _this8 = this;
      // List name inputs
      $('.list-name-input').off('input').on('input', function (e) {
        var listIndex = parseInt(e.target.id.replace('listName', ''));
        _this8.updateListName(listIndex, e.target.value);
      });

      // Route inputs - validation on blur
      $('.route-input').off('blur').on('blur', function (e) {
        _this8.validateRoute(e.target);
      });

      // Route inputs - paste detection
      $('.route-input').off('paste').on('paste', function (e) {
        setTimeout(function () {
          return _this8.handleRoutePaste(e.target);
        }, 10);
      });

      // Route inputs - value changes
      $('.route-input').off('input').on('input', function (e) {
        var listIndex = parseInt(e.target.dataset.listIndex);
        var routeIndex = parseInt(e.target.dataset.routeIndex);
        _this8.routeLists[listIndex].routes[routeIndex] = e.target.value;
      });

      // Button actions using event delegation
      $('#routeListsContainer').off('click').on('click', 'button[data-action]', function (e) {
        var action = e.target.closest('button').dataset.action;
        var listIndex = parseInt(e.target.closest('button').dataset.listIndex);
        var routeIndex = parseInt(e.target.closest('button').dataset.routeIndex);
        switch (action) {
          case 'add-list':
            _this8.addRouteList();
            break;
          case 'remove-list':
            _this8.removeRouteList(listIndex);
            break;
          case 'add-route':
            _this8.addRoute(listIndex);
            break;
          case 'remove-route':
            _this8.removeRoute(listIndex, routeIndex);
            break;
          case 'process-bulk':
            _this8.processBulkInput(listIndex);
            break;
        }
      });

      // Bulk input textareas
      $('.bulk-input').off('input').on('input', function (e) {
        // Could add real-time URL counting here
      });

      // Run Analysis button
      $('#runAnalysisBtn').off('click').on('click', function () {
        _this8.startAnalysis();
      });

      // Cancel Analysis button  
      $('#cancelAnalysisBtn').off('click').on('click', function () {
        _this8.cancelAnalysis();
      });

      // New Analysis button
      $('#newAnalysisBtn').off('click').on('click', function () {
        _this8.startNewAnalysis();
      });
    }
  }, {
    key: "renderRouteInputs",
    value: function renderRouteInputs(listIndex) {
      var _this9 = this;
      var container = document.getElementById("routeInputs".concat(listIndex));
      if (!container) return;
      var list = this.routeLists[listIndex];
      container.innerHTML = '';
      list.routes.forEach(function (route, routeIndex) {
        var row = _this9.createRouteInputRow(listIndex, routeIndex, route);
        container.appendChild(row);
      });
    }
  }, {
    key: "createRouteInputRow",
    value: function createRouteInputRow(listIndex, routeIndex) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var row = document.createElement('div');
      row.className = 'route-input-row';
      row.setAttribute('data-route-index', routeIndex);
      row.innerHTML = "\n            <div class=\"route-number\">".concat(routeIndex + 1, "</div>\n            <div class=\"input-container\">\n                <input type=\"url\" \n                       class=\"route-input\" \n                       placeholder=\"https://example.com/page\"\n                       value=\"").concat(value, "\"\n                       data-list=\"").concat(listIndex, "\"\n                       data-route=\"").concat(routeIndex, "\"\n                       aria-label=\"Route ").concat(routeIndex + 1, " for list ").concat(listIndex + 1, "\">\n                <div class=\"validation-message\" id=\"validation").concat(listIndex, "-").concat(routeIndex, "\"></div>\n            </div>\n            <div class=\"route-actions\">\n                ").concat(this.routeLists[listIndex].routes.length > 1 ? "\n                    <button class=\"remove-route-btn\" \n                            onclick=\"routeManager.removeRoute(".concat(listIndex, ", ").concat(routeIndex, ")\"\n                            aria-label=\"Remove this route\">\n                        <span class=\"btn-icon\">\u2716\uFE0F</span>\n                    </button>\n                ") : '', "\n            </div>\n        ");
      return row;
    }

    // 3. Add this new method for SSE connection management
  }, {
    key: "establishSSEConnection",
    value: function () {
      var _establishSSEConnection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              console.log('🔌 Establishing SSE connection...');
              this.updateConnectionStatus('connecting');
              _context.p = 1;
              _context.n = 2;
              return this.initializeSSE();
            case 2:
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error('Failed to establish SSE connection:', _t);
              this.updateConnectionStatus('error');
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function establishSSEConnection() {
        return _establishSSEConnection.apply(this, arguments);
      }
      return establishSSEConnection;
    }() // 4. Add connection status management
  }, {
    key: "updateConnectionStatus",
    value: function updateConnectionStatus(status) {
      this.sseConnectionStatus = status;
      this.sseConnected = status === 'connected';
      console.log('📡 SSE Connection Status:', status);

      // Update UI elements
      this.updateConnectionIndicator(status);
      this.updateStartAnalysisButton();
    }

    // 5. Add connection indicator UI updates
  }, {
    key: "updateConnectionIndicator",
    value: function updateConnectionIndicator(status) {
      // Update connection status indicator in the UI
      var indicator = document.getElementById('sseConnectionIndicator');
      var statusText = document.getElementById('sseConnectionStatus');
      if (indicator && statusText) {
        indicator.className = "connection-indicator ".concat(status);
        var _statusMessages = {
          'disconnected': '⚪ Disconnected',
          'connecting': '🟡 Connecting...',
          'connected': '🟢 Connected',
          'error': '🔴 Connection Error'
        };
        statusText.textContent = _statusMessages[status] || status;
      }

      // Also update the terminal if it exists
      var statusMessages = {
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
  }, {
    key: "updateStartAnalysisButton",
    value: function updateStartAnalysisButton() {
      var startButton = document.getElementById('runAnalysisBtn');
      if (!startButton) return;
      var subtitle = startButton.querySelector('.btn-subtitle');

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
      var totalComparisons = this.calculateTotalComparisons();
      if (subtitle) subtitle.textContent = "Ready - ".concat(totalComparisons, " comparison(s)");
    }

    // Replace your startAnalysis method with this enhanced version
  }, {
    key: "startAnalysis",
    value: function () {
      var _startAnalysis = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this0 = this;
        var startButton, subtitle, lockCheck, lockStatus, response, data, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              console.log('Starting analysis: startAnalysis()');

              // Validate prerequisites
              if (!(!this.hasValidRoutes() || this.processRunning)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              // Switch to progress tab first
              this.switchTab('progress');

              // Update button to show we're connecting
              startButton = document.getElementById('runAnalysisBtn');
              subtitle = startButton.querySelector('.btn-subtitle');
              if (startButton) {
                startButton.disabled = true;
                if (subtitle) subtitle.textContent = 'Connecting to service...';
              }
              _context2.p = 2;
              if (this.sseConnected) {
                _context2.n = 3;
                break;
              }
              console.log('Waiting for SSE connection...');
              _context2.n = 3;
              return this.waitForSSEConnection();
            case 3:
              _context2.n = 4;
              return fetch('/api/analysis/lock-check');
            case 4:
              lockCheck = _context2.v;
              _context2.n = 5;
              return lockCheck.json();
            case 5:
              lockStatus = _context2.v;
              if (!lockStatus.locked) {
                _context2.n = 6;
                break;
              }
              this.showNotification('Another analysis is currently running. Please wait.', 'warning');
              this.updateStartAnalysisButton(); // Reset button state
              return _context2.a(2);
            case 6:
              console.log('Starting analysis with valid routes:', this.routeLists);

              // Start the analysis (SSE already connected)
              _context2.n = 7;
              return fetch('/api/analysis/start', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  routeLists: this.routeLists.filter(function (list) {
                    return list.routes.some(function (route) {
                      return _this0.isValidHttpUrl(route);
                    });
                  })
                })
              });
            case 7:
              response = _context2.v;
              _context2.n = 8;
              return response.json();
            case 8:
              data = _context2.v;
              console.log('Response from analysis start:', data);
              this.reportId = data.reportId;
              console.log('Report ID:', this.reportId);
              if (response.ok) {
                _context2.n = 9;
                break;
              }
              throw new Error('Failed to start analysis');
            case 9:
              this.processRunning = true;
              this.updateProcessStatus('running');
              this.updateStartAnalysisButton(); // Update button state

              this.addTerminalLine("Analysis started successfully! Report ID: ".concat(this.reportId, " \uD83D\uDE80"), 'success');
              _context2.n = 11;
              break;
            case 10:
              _context2.p = 10;
              _t2 = _context2.v;
              console.error('Error starting analysis:', _t2);
              this.showNotification('Failed to start analysis. Please try again.', 'error');
              this.updateStartAnalysisButton(); // Reset button state
            case 11:
              return _context2.a(2);
          }
        }, _callee2, this, [[2, 10]]);
      }));
      function startAnalysis() {
        return _startAnalysis.apply(this, arguments);
      }
      return startAnalysis;
    }() // Add this new method to wait for SSE connection
  }, {
    key: "waitForSSEConnection",
    value: function () {
      var _waitForSSEConnection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _this1 = this;
        var timeout,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              timeout = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : 15000;
              return _context3.a(2, new Promise(function (resolve, reject) {
                // If already connected, resolve immediately
                if (_this1.sseConnected) {
                  resolve();
                  return;
                }

                // Set up timeout
                var timeoutId = setTimeout(function () {
                  reject(new Error('SSE connection timeout'));
                }, timeout);

                // Check connection status periodically
                var checkConnection = setInterval(function () {
                  if (_this1.sseConnected) {
                    clearTimeout(timeoutId);
                    clearInterval(checkConnection);
                    resolve();
                  }
                }, 100);
              }));
          }
        }, _callee3);
      }));
      function waitForSSEConnection() {
        return _waitForSSEConnection.apply(this, arguments);
      }
      return waitForSSEConnection;
    }() // 7. Modified initializeSSE method (remove timeout, add proper status management)
  }, {
    key: "initializeSSE",
    value: function initializeSSE() {
      var _this10 = this;
      console.log('🚀 initializeSSE called - starting SSE setup...');
      return new Promise(function (resolve, reject) {
        if (_this10.eventSource) {
          console.log('🔄 Closing existing EventSource...');
          _this10.eventSource.close();
        }
        _this10.clearSSETimeouts();
        console.log('📡 Creating new EventSource for: /api/analysis/progress');
        var source = new EventSource('/api/analysis/progress');
        console.log('📡 EventSource created, readyState:', source.readyState);

        // Set a reasonable connection timeout (10 seconds)
        _this10.connectionTimeout = setTimeout(function () {
          console.log('⏰ SSE connection timeout');
          _this10.updateConnectionStatus('error');
          _this10.addTerminalLine('Connection timeout - please check your network', 'error');
          reject(new Error('SSE connection timeout'));
        }, 10000);
        source.onopen = function (event) {
          console.log('🎉 SSE connection opened!');
          if (_this10.connectionTimeout) {
            clearTimeout(_this10.connectionTimeout);
            _this10.connectionTimeout = null;
          }
          _this10.updateConnectionStatus('connected');
          _this10.startActivityMonitoring();
          resolve();
        };
        source.onmessage = function (event) {
          try {
            var data = JSON.parse(event.data);
            console.log('📨 SSE message received:', data.type);
            _this10.lastHeartbeat = Date.now();
            _this10.resetActivityTimeout();
            _this10.handleProgressUpdate(data);
          } catch (error) {
            console.error('❌ Error parsing SSE data:', error);
            console.error('❌ Raw data that failed:', event.data);
          }
        };
        source.onerror = function (error) {
          console.error('💥 SSE error:', error);
          _this10.clearSSETimeouts();
          if (source.readyState === EventSource.CLOSED) {
            console.log('🔄 EventSource closed, will attempt reconnect...');
            _this10.updateConnectionStatus('error');
            setTimeout(function () {
              if (_this10.currentTab === 'progress') {
                console.log('🔄 Attempting SSE reconnection...');
                _this10.establishSSEConnection();
              }
            }, 5000);
            reject(new Error('SSE connection failed'));
          }
        };
        console.log('📡 Setting this.eventSource to newly created source');
        _this10.eventSource = source;
        console.log('📡 EventSource initialized successfully');
      });
    }

    // 8. Add disconnect method
  }, {
    key: "disconnectSSE",
    value: function disconnectSSE() {
      console.log('🔌 Disconnecting SSE...');
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }
      this.clearSSETimeouts();
      this.updateConnectionStatus('disconnected');
    }
  }, {
    key: "handleProgressUpdate",
    value: function handleProgressUpdate(data) {
      var _this11 = this;
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
          setTimeout(function () {
            _this11.switchTab('results');
          }, 2000);
          break;
        case 'heartbeat':
          // Just a keepalive, no action needed
          console.log('Received heartbeat');
          break;
        case 'debug':
          // Debug messages from backend
          this.addTerminalLine("Debug: ".concat(data.message), 'info');
          break;
        default:
          console.log('Unknown SSE message type:', data.type, data);
      }
    }
  }, {
    key: "updateOverallProgress",
    value: function updateOverallProgress(percentage) {
      var progressBar = document.getElementById('overallProgressBar');
      if (progressBar) {
        var fill = progressBar.querySelector('.progress-fill');
        if (fill) {
          fill.style.width = "".concat(percentage, "%");
        }
        var percentageEl = progressBar.parentElement.querySelector('.progress-percentage');
        if (percentageEl) {
          percentageEl.textContent = "".concat(percentage, "%");
        }
      }
    }
  }, {
    key: "updateStepProgress",
    value: function updateStepProgress(stepKey, status) {
      var percentage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var stepElement = document.querySelector("[data-step=\"".concat(stepKey, "\"]"));
      if (!stepElement) return;

      // Remove previous status classes
      stepElement.classList.remove('pending', 'running', 'complete', 'error');
      stepElement.classList.add(status);

      // Update progress bar
      var progressFill = stepElement.querySelector('.step-progress-fill');
      if (progressFill) {
        progressFill.style.width = "".concat(percentage, "%");
      }
    }
  }, {
    key: "addTerminalLine",
    value: function addTerminalLine(content) {
      var lineType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      var terminal = document.getElementById('terminalOutput');
      if (!terminal) return;
      var line = document.createElement('div');
      line.className = "terminal-line ".concat(lineType);
      var timestamp = new Date().toLocaleTimeString();
      line.innerHTML = "\n            <span class=\"line-timestamp\">".concat(timestamp, "</span>\n            <span class=\"line-content\">").concat(this.escapeHtml(content), "</span>\n        ");
      terminal.appendChild(line);

      // Auto-scroll to bottom
      terminal.scrollTop = terminal.scrollHeight;

      // Limit number of lines to prevent memory issues
      if (terminal.children.length > 1000) {
        terminal.removeChild(terminal.firstChild);
      }
    }
  }, {
    key: "escapeHtml",
    value: function escapeHtml(text) {
      var div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }, {
    key: "handleAnalysisComplete",
    value: function handleAnalysisComplete(data) {
      this.processRunning = false;
      this.processCompleted = true;
      this.updateProcessStatus('complete');
      this.addTerminalLine("".concat(data.message), 'success');

      // Enable results tab
      this.updateTabAvailability();

      // Show notification
      this.showNotification('SAR completed! View your results.', 'success');
    }
  }, {
    key: "handleAnalysisError",
    value: function handleAnalysisError(data) {
      this.processRunning = false;
      this.updateProcessStatus('idle');
      this.addTerminalLine("\u274C Error: ".concat(data.message), 'error');
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }
      this.showNotification("Analysis failed: ".concat(data.message), 'error');
    }
  }, {
    key: "cancelAnalysis",
    value: function () {
      var _cancelAnalysis = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var response, _t3, _t4, _t5;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (this.processRunning) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              _context4.p = 1;
              this.clearSSETimeouts();
              _context4.n = 2;
              return fetch('/api/analysis/cancel', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  reportId: this.reportId
                })
              });
            case 2:
              response = _context4.v;
              _t3 = console;
              _context4.n = 3;
              return response.json();
            case 3:
              _t4 = _context4.v;
              _t3.log.call(_t3, 'Cancel response:', _t4);
              if (!response.ok) {
                _context4.n = 4;
                break;
              }
              // Close SSE connection first
              if (this.eventSource) {
                this.eventSource.close();
                this.eventSource = null;
              }
              this.processRunning = false;
              this.updateProcessStatus('idle');
              this.addTerminalLine('Analysis cancelled by user', 'error');
              this.switchTab('setup');
              _context4.n = 5;
              break;
            case 4:
              throw new Error('Failed to cancel analysis');
            case 5:
              _context4.n = 7;
              break;
            case 6:
              _context4.p = 6;
              _t5 = _context4.v;
              console.error('Error cancelling analysis:', _t5);
              this.showNotification('Failed to cancel analysis', 'error');
            case 7:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 6]]);
      }));
      function cancelAnalysis() {
        return _cancelAnalysis.apply(this, arguments);
      }
      return cancelAnalysis;
    }()
  }, {
    key: "updateProcessStatus",
    value: function updateProcessStatus(status) {
      var indicator = document.getElementById('statusIndicator');
      var icon = document.getElementById('statusIcon');
      var text = document.getElementById('statusText');
      if (indicator) {
        indicator.className = "status-indicator ".concat(status);
      }
      var statusConfig = {
        idle: {
          icon: '⚪',
          text: 'Ready to Start'
        },
        running: {
          icon: '🟡',
          text: 'Analysis Running'
        },
        complete: {
          icon: '🟢',
          text: 'Analysis Complete'
        }
      };
      var config = statusConfig[status];
      if (config && icon && text) {
        icon.textContent = config.icon;
        text.textContent = config.text;
      }
    }

    // Terminal Controls
  }, {
    key: "toggleTerminal",
    value: function toggleTerminal() {
      var tunnel = document.getElementById('terminalTunnel');
      var toggle = document.getElementById('terminalToggle');
      if (tunnel && toggle) {
        tunnel.classList.toggle('collapsed');
        toggle.classList.toggle('collapsed');
      }
    }

    // Results Functions
  }, {
    key: "downloadReport",
    value: function () {
      var _downloadReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var response, blob, url, a, _t6;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (this.reportId) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              _context5.p = 1;
              _context5.n = 2;
              return fetch("/api/reports/".concat(this.reportId, "/download"));
            case 2:
              response = _context5.v;
              if (!response.ok) {
                _context5.n = 4;
                break;
              }
              _context5.n = 3;
              return response.blob();
            case 3:
              blob = _context5.v;
              url = window.URL.createObjectURL(blob);
              a = document.createElement('a');
              a.href = url;
              a.download = "route-comparison-".concat(this.reportId, ".zip");
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            case 4:
              _context5.n = 6;
              break;
            case 5:
              _context5.p = 5;
              _t6 = _context5.v;
              console.error('Error downloading report:', _t6);
              this.showNotification('Failed to download report', 'error');
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 5]]);
      }));
      function downloadReport() {
        return _downloadReport.apply(this, arguments);
      }
      return downloadReport;
    }()
  }, {
    key: "startNewAnalysis",
    value: function startNewAnalysis() {
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
      var terminal = document.getElementById('terminalOutput');
      if (terminal) {
        terminal.innerHTML = '';
      }
      this.showNotification('Ready for new analysis', 'info');
    }

    // Utility Functions
  }, {
    key: "showNotification",
    value: function showNotification(message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      // Create notification element
      var notification = document.createElement('div');
      notification.className = "notification notification-".concat(type);
      notification.innerHTML = "\n            <span class=\"notification-message\">".concat(message, "</span>\n            <button class=\"notification-close\" onclick=\"this.parentElement.remove()\">\xD7</button>\n        ");

      // Add to page
      var container = document.getElementById('notificationContainer');
      if (!container) {
        container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
      }
      container.appendChild(notification);

      // Auto-remove after 5 seconds
      setTimeout(function () {
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
  }, {
    key: "updateResultsTab",
    value: function updateResultsTab() {
      console.log('Updating results tab with report ID:', this.reportId);

      // Load the actual report data
      if (this.processCompleted && this.reportId) {
        this.loadReportData();
      }

      // Update navigation dropdown (keep existing code)
      var dropDownMenu = document.querySelector('.dropdown-menu');
      if (dropDownMenu && this.reportId) {
        var reportLink = document.createElement('li');
        reportLink.className = 'nav-item';
        reportLink.innerHTML = "\n                <a class=\"nav-link\" href=\"/report/".concat(this.reportId, "/\">\n                    Analyze ").concat(this.reportId.replace('analyze_', ''), "\n                </a>\n            ");
        dropDownMenu.prepend(reportLink);
      }
    }
  }, {
    key: "fetchReportSummary",
    value: function () {
      var _fetchReportSummary = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var response, errorData, summaryData, _t7;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (this.reportId) {
                _context6.n = 1;
                break;
              }
              console.error('No report ID available for summary fetch');
              return _context6.a(2, null);
            case 1:
              _context6.p = 1;
              console.log("Fetching summary data for report: ".concat(this.reportId));
              _context6.n = 2;
              return fetch("/api/analysis/report/".concat(this.reportId, "/summary"));
            case 2:
              response = _context6.v;
              if (response.ok) {
                _context6.n = 4;
                break;
              }
              _context6.n = 3;
              return response.json();
            case 3:
              errorData = _context6.v;
              console.error('Failed to fetch report summary:', errorData);
              this.showNotification("Failed to load report summary: ".concat(errorData.message), 'error');
              return _context6.a(2, null);
            case 4:
              _context6.n = 5;
              return response.json();
            case 5:
              summaryData = _context6.v;
              console.log('Report summary loaded successfully:', summaryData);
              return _context6.a(2, summaryData);
            case 6:
              _context6.p = 6;
              _t7 = _context6.v;
              console.error('Error fetching report summary:', _t7);
              this.showNotification('Failed to load report summary', 'error');
              return _context6.a(2, null);
          }
        }, _callee6, this, [[1, 6]]);
      }));
      function fetchReportSummary() {
        return _fetchReportSummary.apply(this, arguments);
      }
      return fetchReportSummary;
    }()
  }, {
    key: "loadReportData",
    value: function () {
      var _loadReportData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var resultsSection, summaryData;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              // Show loading state
              resultsSection = document.querySelector('.results-section');
              if (resultsSection) {
                resultsSection.innerHTML = '<div class="loading-spinner">Loading report data...</div>';
              }

              // Fetch the summary data
              _context7.n = 1;
              return this.fetchReportSummary();
            case 1:
              summaryData = _context7.v;
              if (summaryData) {
                _context7.n = 2;
                break;
              }
              // Show error state
              if (resultsSection) {
                resultsSection.innerHTML = "\n                    <div class=\"error-state\">\n                        <h3>\u26A0\uFE0F Unable to Load Report Data</h3>\n                        <p>The report analysis may still be processing or the files are not yet available.</p>\n                        <button class=\"btn-secondary\" onclick=\"routeManager.loadReportData()\">\n                            <span class=\"btn-icon\">\uD83D\uDD04</span>\n                            Retry Loading\n                        </button>\n                    </div>\n                ";
              }
              return _context7.a(2);
            case 2:
              // Store the data for use in rendering
              this.reportSummaryData = summaryData;

              // Render the results UI with the loaded data
              this.renderResultsWithData(summaryData);
            case 3:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function loadReportData() {
        return _loadReportData.apply(this, arguments);
      }
      return loadReportData;
    }()
  }, {
    key: "renderResultsWithData",
    value: function renderResultsWithData(summaryData) {
      var _master$topSimilariti, _master$topSimilariti2, _seo$overview, _seo$overview2, _content$results, _visual$results, _technical$results, _visual$results2, _master$topSimilariti3;
      console.log('Rendering results with data:', summaryData);
      var resultsSection = document.querySelector('.results-section');
      if (!resultsSection) return;
      var data = summaryData.data,
        availableAnalysis = summaryData.availableAnalysis,
        reportId = summaryData.reportId;
      var master = data.masterSummary;
      var seo = data.seoSummary;
      var content = data.contentSummary;
      var visual = data.visualSummary;
      var technical = data.technicalSummary;
      var masterScraping = data.masterScraping;
      resultsSection.innerHTML = "\n            <!-- Results Header -->\n            <div class=\"results-header\">\n                <h2>Analysis Complete</h2>\n                <div class=\"results-meta\">\n                    <span class=\"meta-item\">\n                        <span class=\"meta-icon\">\uD83D\uDCCB</span>\n                        Report: ".concat(summaryData.reportId.replace('analyze_', ''), "\n                    </span>\n                    <span class=\"meta-item\">\n                        <span class=\"meta-icon\">\uD83D\uDD52</span>\n                        ").concat(new Date(summaryData.timestamp).toLocaleString(), "\n                    </span>\n                    <span class=\"meta-item\">\n                        <span class=\"meta-icon\">\uD83D\uDD17</span>\n                        ").concat((master === null || master === void 0 ? void 0 : master.totalComparisons) || 0, " Comparisons\n                    </span>\n                </div>\n            </div>\n\n            <!-- Quick Overview Cards -->\n            <div class=\"overview-section\">\n                <h3 class=\"section-title\">\uD83D\uDCCA Analysis Overview</h3>\n                <div class=\"overview-cards\">\n                    <div class=\"overview-card similarity-card\">\n                        <div class=\"card-header\">\n                            <span class=\"card-icon\">\uD83C\uDFAF</span>\n                            <span class=\"card-title\">Similarity Distribution</span>\n                        </div>\n                        <div class=\"similarity-chart\">\n                            <div class=\"similarity-bar high\" style=\"height: ").concat(master ? master.highSimilarity / master.totalComparisons * 100 : 0, "%\">\n                                <span class=\"bar-value\">").concat((master === null || master === void 0 ? void 0 : master.highSimilarity) || 0, "</span>\n                                <span class=\"bar-label\">High</span>\n                            </div>\n                            <div class=\"similarity-bar moderate\" style=\"height: ").concat(master ? master.moderateSimilarity / master.totalComparisons * 100 : 0, "%\">\n                                <span class=\"bar-value\">").concat((master === null || master === void 0 ? void 0 : master.moderateSimilarity) || 0, "</span>\n                                <span class=\"bar-label\">Moderate</span>\n                            </div>\n                            <div class=\"similarity-bar low\" style=\"height: ").concat(master ? master.lowSimilarity / master.totalComparisons * 100 : 0, "%\">\n                                <span class=\"bar-value\">").concat((master === null || master === void 0 ? void 0 : master.lowSimilarity) || 0, "</span>\n                                <span class=\"bar-label\">Low</span>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"overview-card seo-card\">\n                        <div class=\"card-header\">\n                            <span class=\"card-icon\">\uD83D\uDD0D</span>\n                            <span class=\"card-title\">SEO Risk Assessment</span>\n                        </div>\n                        <div class=\"seo-risk-content\">\n                            <div class=\"risk-level ").concat((master === null || master === void 0 || (_master$topSimilariti = master.topSimilarities) === null || _master$topSimilariti === void 0 || (_master$topSimilariti = _master$topSimilariti[0]) === null || _master$topSimilariti === void 0 || (_master$topSimilariti = _master$topSimilariti.seoRisk) === null || _master$topSimilariti === void 0 ? void 0 : _master$topSimilariti.toLowerCase()) || 'low', "\">\n                                ").concat((master === null || master === void 0 || (_master$topSimilariti2 = master.topSimilarities) === null || _master$topSimilariti2 === void 0 || (_master$topSimilariti2 = _master$topSimilariti2[0]) === null || _master$topSimilariti2 === void 0 ? void 0 : _master$topSimilariti2.seoRisk) || 'UNKNOWN', "\n                            </div>\n                            <div class=\"risk-details\">\n                                <div class=\"risk-stat\">\n                                    <span class=\"risk-number\">").concat((seo === null || seo === void 0 || (_seo$overview = seo.overview) === null || _seo$overview === void 0 ? void 0 : _seo$overview.criticalIssues) || 0, "</span>\n                                    <span class=\"risk-label\">Critical Issues</span>\n                                </div>\n                                <div class=\"risk-stat\">\n                                    <span class=\"risk-number\">").concat((seo === null || seo === void 0 || (_seo$overview2 = seo.overview) === null || _seo$overview2 === void 0 ? void 0 : _seo$overview2.highPriorityIssues) || 0, "</span>\n                                    <span class=\"risk-label\">High Priority</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"overview-card analysis-completeness-card\">\n                        <div class=\"card-header\">\n                            <span class=\"card-icon\">\u2705</span>\n                            <span class=\"card-title\">Analysis Completeness</span>\n                        </div>\n                        <div class=\"completeness-grid\">\n                            <div class=\"completeness-item ").concat(availableAnalysis.visual ? 'complete' : 'incomplete', "\">\n                                <span class=\"completeness-icon\">").concat(availableAnalysis.visual ? '✅' : '❌', "</span>\n                                <span class=\"completeness-label\">Visual</span>\n                            </div>\n                            <div class=\"completeness-item ").concat(availableAnalysis.content ? 'complete' : 'incomplete', "\">\n                                <span class=\"completeness-icon\">").concat(availableAnalysis.content ? '✅' : '❌', "</span>\n                                <span class=\"completeness-label\">Content</span>\n                            </div>\n                            <div class=\"completeness-item ").concat(availableAnalysis.technical ? 'complete' : 'incomplete', "\">\n                                <span class=\"completeness-icon\">").concat(availableAnalysis.technical ? '✅' : '❌', "</span>\n                                <span class=\"completeness-label\">Technical</span>\n                            </div>\n                            <div class=\"completeness-item ").concat(availableAnalysis.seo ? 'complete' : 'incomplete', "\">\n                                <span class=\"completeness-icon\">").concat(availableAnalysis.seo ? '✅' : '❌', "</span>\n                                <span class=\"completeness-label\">SEO</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- Detailed Analysis Scores -->\n            <div class=\"scores-section\">\n                <h3 class=\"section-title\">\uD83D\uDCC8 Analysis Scores</h3>\n                <div class=\"scores-grid\">\n                    ").concat(content !== null && content !== void 0 && (_content$results = content.results) !== null && _content$results !== void 0 && _content$results[0] ? "\n                    <div class=\"score-card content-score\">\n                        <div class=\"score-header\">\n                            <span class=\"score-icon\">\uD83D\uDCDD</span>\n                            <span class=\"score-title\">Content Analysis</span>\n                        </div>\n                        <div class=\"score-value\">".concat(Math.round(content.results[0].avgScore * 100), "%</div>\n                        <div class=\"score-breakdown\">\n                            <div class=\"breakdown-item\">\n                                <span class=\"breakdown-label\">Jaccard Similarity</span>\n                                <div class=\"breakdown-bar\">\n                                    <div class=\"breakdown-fill\" style=\"width: ").concat(content.results[0].metrics.jaccard * 100, "%\"></div>\n                                </div>\n                                <span class=\"breakdown-value\">").concat(Math.round(content.results[0].metrics.jaccard * 100), "%</span>\n                            </div>\n                            <div class=\"breakdown-item\">\n                                <span class=\"breakdown-label\">Semantic Match</span>\n                                <div class=\"breakdown-bar\">\n                                    <div class=\"breakdown-fill\" style=\"width: ").concat(content.results[0].metrics.semantic * 100, "%\"></div>\n                                </div>\n                                <span class=\"breakdown-value\">").concat(Math.round(content.results[0].metrics.semantic * 100), "%</span>\n                            </div>\n                        </div>\n                    </div>") : '', "\n\n                    ").concat(visual !== null && visual !== void 0 && (_visual$results = visual.results) !== null && _visual$results !== void 0 && _visual$results[0] ? "\n                    <div class=\"score-card visual-score\">\n                        <div class=\"score-header\">\n                            <span class=\"score-icon\">\uD83C\uDFA8</span>\n                            <span class=\"score-title\">Visual Analysis</span>\n                        </div>\n                        <div class=\"score-value\">".concat(Math.round(visual.results[0].avgScore * 100), "%</div>\n                        <div class=\"score-breakdown\">\n                            <div class=\"breakdown-item\">\n                                <span class=\"breakdown-label\">Layout Similarity</span>\n                                <div class=\"breakdown-bar\">\n                                    <div class=\"breakdown-fill\" style=\"width: ").concat(visual.results[0].metrics.layout * 100, "%\"></div>\n                                </div>\n                                <span class=\"breakdown-value\">").concat(Math.round(visual.results[0].metrics.layout * 100), "%</span>\n                            </div>\n                            <div class=\"breakdown-item\">\n                                <span class=\"breakdown-label\">Typography Match</span>\n                                <div class=\"breakdown-bar\">\n                                    <div class=\"breakdown-fill\" style=\"width: ").concat(visual.results[0].metrics.typography * 100, "%\"></div>\n                                </div>\n                                <span class=\"breakdown-value\">").concat(Math.round(visual.results[0].metrics.typography * 100), "%</span>\n                            </div>\n                        </div>\n                    </div>") : '', "\n\n                    ").concat(technical !== null && technical !== void 0 && (_technical$results = technical.results) !== null && _technical$results !== void 0 && _technical$results[0] ? "\n                    <div class=\"score-card technical-score\">\n                        <div class=\"score-header\">\n                            <span class=\"score-icon\">\u2699\uFE0F</span>\n                            <span class=\"score-title\">Technical Analysis</span>\n                        </div>\n                        <div class=\"score-value\">".concat(Math.round(technical.results[0].avgScore * 100), "%</div>\n                        <div class=\"score-breakdown\">\n                            <div class=\"breakdown-item\">\n                                <span class=\"breakdown-label\">HTML Structure</span>\n                                <div class=\"breakdown-bar\">\n                                    <div class=\"breakdown-fill\" style=\"width: ").concat(technical.results[0].detailedScores.htmlStructure * 100, "%\"></div>\n                                </div>\n                                <span class=\"breakdown-value\">").concat(Math.round(technical.results[0].detailedScores.htmlStructure * 100), "%</span>\n                            </div>\n                            <div class=\"breakdown-item\">\n                                <span class=\"breakdown-label\">Meta Tags</span>\n                                <div class=\"breakdown-bar\">\n                                    <div class=\"breakdown-fill\" style=\"width: ").concat(technical.results[0].detailedScores.metaTags * 100, "%\"></div>\n                                </div>\n                                <span class=\"breakdown-value\">").concat(Math.round(technical.results[0].detailedScores.metaTags * 100), "%</span>\n                            </div>\n                        </div>\n                    </div>") : '', "\n                </div>\n            </div>\n\n            <!-- Images Section -->\n            <div class=\"images-section\">\n                <h3 class=\"section-title\">\uD83D\uDDBC\uFE0F Visual Screenshots Comparison</h3>\n                <div class=\"images-grid\"> \n                    ").concat(masterScraping.scraped_sites.length ? masterScraping.scraped_sites.map(function (site) {
        return "\n                        <div class=\"image-card\"> \n                            <i>".concat(site.directory, "</i>               \n                            <div class=\"screenshot-mock\">\n                                <div class=\"mock-browser show-scrollbar\">\n                                    <div class=\"browser-header\">\n                                        <div class=\"browser-controls\">\n                                            <span class=\"control red\"></span>\n                                            <span class=\"control yellow\"></span>\n                                            <span class=\"control green\"></span>\n                                        </div>\n                                        <div class=\"url-bar\">").concat(site.pages[0].pageId, "</div>\n                                    </div>\n                                    <div class=\"browser-content\">\n                                        <img\n                                            src=\"/_/report/").concat(reportId, "/").concat(site.directory, "/").concat(site.pages[0].pageId, "/screenshot.png\" />\n                                    </div>\n                                </div>\n                            </div>\n                        </div>");
      }).join('') : "\n                        <div class=\"no-images\">No images available for this report.</div>\n                    ", "\n                </div>\n            </div>\n\n            <!-- Key Insights -->\n            <div class=\"insights-section\">\n                <h3 class=\"section-title\">\uD83D\uDCA1 Key Insights</h3>\n                <div class=\"insights-grid\">\n                    ").concat(visual !== null && visual !== void 0 && (_visual$results2 = visual.results) !== null && _visual$results2 !== void 0 && (_visual$results2 = _visual$results2[0]) !== null && _visual$results2 !== void 0 && _visual$results2.topInsights ? "\n                    <div class=\"insight-card\">\n                        <div class=\"insight-header\">\n                            <span class=\"insight-icon\">\uD83C\uDFA8</span>\n                            <span class=\"insight-title\">Visual Design</span>\n                        </div>\n                        <ul class=\"insight-list\">\n                            ".concat(visual.results[0].topInsights.map(function (insight) {
        return "<li>".concat(insight, "</li>");
      }).join(''), "\n                        </ul>\n                    </div>") : '', "\n\n                    ").concat(master !== null && master !== void 0 && (_master$topSimilariti3 = master.topSimilarities) !== null && _master$topSimilariti3 !== void 0 && _master$topSimilariti3[0] ? "\n                    <div class=\"insight-card\">\n                        <div class=\"insight-header\">\n                            <span class=\"insight-icon\">\uD83D\uDD0D</span>\n                            <span class=\"insight-title\">Similarity Analysis</span>\n                        </div>\n                        <div class=\"similarity-insight\">\n                            <div class=\"similarity-score\">\n                                ".concat(Math.round(master.topSimilarities[0].score * 100), "%\n                            </div>\n                            <div class=\"similarity-classification\">\n                                ").concat(master.topSimilarities[0].classification.replace(/_/g, ' '), "\n                            </div>\n                            <div class=\"similarity-comparison\">\n                                ").concat(master.topSimilarities[0].comparison.split('_vs_').map(function (site) {
        return site.replace(/_/g, ' ').replace(/com \d+/, '.com');
      }).join(' vs '), "\n                            </div>\n                        </div>\n                    </div>") : '', "\n\n                    ").concat(content !== null && content !== void 0 && content.globalStats ? "\n                    <div class=\"insight-card\">\n                        <div class=\"insight-header\">\n                            <span class=\"insight-icon\">\u26A1</span>\n                            <span class=\"insight-title\">Performance</span>\n                        </div>\n                        <div class=\"performance-stats\">\n                            <div class=\"perf-stat\">\n                                <span class=\"perf-value\">".concat(content.globalStats.totalProcessingTime, "s</span>\n                                <span class=\"perf-label\">Processing Time</span>\n                            </div>\n                            <div class=\"perf-stat\">\n                                <span class=\"perf-value\">").concat(Math.round(content.globalStats.processingSpeed), "</span>\n                                <span class=\"perf-label\">Pages/Min</span>\n                            </div>\n                        </div>\n                    </div>") : '', "\n                </div>\n            </div>\n\n            <!-- Actions -->\n            <div class=\"results-actions\">\n                <a href=\"/report/").concat(summaryData.reportId, "/\" class=\"btn-primary view-report-btn\" target=\"_blank\">\n                    <span class=\"btn-icon\">\uD83D\uDCC4</span>\n                    View Full Report\n                </a>\n                <button class=\"btn-secondary new-analysis-btn\" id=\"newAnalysisBtn\">\n                    <span class=\"btn-icon\">\uD83D\uDD04</span>\n                    New Analysis\n                </button>\n            </div>\n        ");

      // Re-attach event listeners and initialize animations
      this.initializeResultsInteractions();
    }

    // Add this method for animations
    // Add these additional JavaScript functions to run_report.js
    // These enhance the results interface with more interactivity

    // Enhanced animation method with better timing and effects
  }, {
    key: "animateResults",
    value: function animateResults() {
      // Set CSS custom properties for target widths on breakdown bars
      document.querySelectorAll('.breakdown-fill').forEach(function (fill) {
        var targetWidth = fill.style.width;
        fill.style.setProperty('--target-width', targetWidth);
        fill.style.width = '0'; // Reset to 0 for animation
      });

      // Animate similarity bars with staggered timing
      setTimeout(function () {
        document.querySelectorAll('.similarity-bar').forEach(function (bar, index) {
          setTimeout(function () {
            bar.classList.add('animate-in');
          }, index * 200);
        });
      }, 100);

      // Animate overview cards with staggered entrance
      setTimeout(function () {
        document.querySelectorAll('.overview-card').forEach(function (card, index) {
          setTimeout(function () {
            card.classList.add('slide-in');
          }, index * 150);
        });
      }, 300);

      // Animate score cards
      setTimeout(function () {
        document.querySelectorAll('.score-card').forEach(function (card, index) {
          setTimeout(function () {
            card.classList.add('slide-in');
          }, index * 200);
        });
      }, 600);

      // Animate breakdown bars after score cards are visible
      setTimeout(function () {
        document.querySelectorAll('.breakdown-fill').forEach(function (fill, index) {
          setTimeout(function () {
            var _fill$getAttribute$ma;
            fill.classList.add('animate-in');
            // Set the target width for animation
            var targetWidth = ((_fill$getAttribute$ma = fill.getAttribute('style').match(/width:\s*([^;]+)/)) === null || _fill$getAttribute$ma === void 0 ? void 0 : _fill$getAttribute$ma[1]) || '0%';
            fill.style.width = targetWidth;
          }, index * 100);
        });
      }, 1000);

      // Animate action items
      setTimeout(function () {
        document.querySelectorAll('.action-item').forEach(function (item, index) {
          setTimeout(function () {
            item.classList.add('slide-in');
          }, index * 100);
        });
      }, 1200);

      // Animate insight cards
      setTimeout(function () {
        document.querySelectorAll('.insight-card').forEach(function (card, index) {
          setTimeout(function () {
            card.classList.add('slide-in');
          }, index * 150);
        });
      }, 1400);
    }

    // Add method to get risk level color classes
  }, {
    key: "getRiskLevelClass",
    value: function getRiskLevelClass(riskLevel) {
      switch (riskLevel === null || riskLevel === void 0 ? void 0 : riskLevel.toLowerCase()) {
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
  }, {
    key: "formatSiteName",
    value: function formatSiteName(siteName) {
      if (!siteName) return 'Unknown Site';

      // Remove timestamp and convert underscores to spaces
      return siteName.replace(/_\d{4}\d{2}\d{2}_\d{4}$/, '') // Remove timestamp pattern
      .replace(/_/g, ' ').replace(/com$/, '.com').split(' ').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    }

    // Add method to get score color based on percentage
  }, {
    key: "getScoreColor",
    value: function getScoreColor(score) {
      var percentage = Math.round(score * 100);
      if (percentage >= 80) return '#27ae60'; // Green
      if (percentage >= 60) return '#f39c12'; // Orange
      if (percentage >= 40) return '#e67e22'; // Dark orange
      return '#e74c3c'; // Red
    }

    // Add method to create animated counters for numbers
  }, {
    key: "animateCounter",
    value: function animateCounter(element, targetValue) {
      var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
      var suffix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      if (!element) return;
      var startValue = 0;
      var increment = targetValue / (duration / 16); // 60fps
      var currentValue = startValue;
      var timer = setInterval(function () {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        var displayValue = Math.round(currentValue);
        element.textContent = displayValue + suffix;
      }, 16);
    }

    // Add method to handle responsive chart adjustments
  }, {
    key: "adjustChartsForViewport",
    value: function adjustChartsForViewport() {
      var isMobile = window.innerWidth <= 480;
      var isTablet = window.innerWidth <= 832;

      // Adjust similarity chart height for mobile
      var similarityCharts = document.querySelectorAll('.similarity-chart');
      similarityCharts.forEach(function (chart) {
        if (isMobile) {
          chart.style.height = '100px';
        } else {
          chart.style.height = '120px';
        }
      });

      // Adjust score card font sizes
      var scoreValues = document.querySelectorAll('.score-value');
      scoreValues.forEach(function (value) {
        if (isMobile) {
          value.style.fontSize = '2.5rem';
        } else {
          value.style.fontSize = '3rem';
        }
      });
    }

    // Add method to create tooltip functionality
  }, {
    key: "initializeTooltips",
    value: function initializeTooltips() {
      // Add tooltips to breakdown bars
      document.querySelectorAll('.breakdown-item').forEach(function (item) {
        var label = item.querySelector('.breakdown-label');
        var value = item.querySelector('.breakdown-value');
        if (label && value) {
          item.title = "".concat(label.textContent, ": ").concat(value.textContent);
        }
      });

      // Add tooltips to similarity bars
      document.querySelectorAll('.similarity-bar').forEach(function (bar) {
        var value = bar.querySelector('.bar-value');
        var label = bar.querySelector('.bar-label');
        if (value && label) {
          bar.title = "".concat(label.textContent, " Similarity: ").concat(value.textContent, " comparisons");
        }
      });
    }

    // Add method to handle print-friendly view
  }, {
    key: "preparePrintView",
    value: function preparePrintView() {
      // Add print styles dynamically
      var printStyles = "\n            @media print {\n                .results-section {\n                    background: white !important;\n                    box-shadow: none !important;\n                }\n                \n                .overview-card,\n                .score-card,\n                .insight-card,\n                .action-item {\n                    break-inside: avoid;\n                    border: 1px solid #ddd !important;\n                    box-shadow: none !important;\n                }\n                \n                .results-actions {\n                    display: none !important;\n                }\n                \n                .similarity-bar,\n                .breakdown-fill {\n                    background: #333 !important;\n                }\n            }\n        ";
      var styleElement = document.createElement('style');
      styleElement.textContent = printStyles;
      document.head.appendChild(styleElement);
    }

    // Update the initializeResultsInteractions method to include new features
  }, {
    key: "initializeResultsInteractions",
    value: function initializeResultsInteractions() {
      var _document$getElementB,
        _this12 = this;
      // New Analysis button
      (_document$getElementB = document.getElementById('newAnalysisBtn')) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener('click', function () {
        _this12.startNewAnalysis();
      });

      // Initialize additional features
      this.adjustChartsForViewport();
      this.initializeTooltips();
      this.preparePrintView();

      // Handle window resize for responsive adjustments
      window.addEventListener('resize', debounce(function () {
        _this12.adjustChartsForViewport();
      }, 250));

      // Animate charts and progress bars on load
      this.animateResults();

      // Add click handlers for expandable sections (if needed in future)
      document.querySelectorAll('.section-title').forEach(function (title) {
        title.style.cursor = 'default'; // Keep default for now
      });
    }

    // Add method to export results data (for future enhancement)
  }, {
    key: "exportResultsData",
    value: function exportResultsData() {
      var _this$reportSummaryDa, _this$reportSummaryDa2, _this$reportSummaryDa3, _this$reportSummaryDa4, _this$reportSummaryDa5, _this$reportSummaryDa6, _this$reportSummaryDa7, _this$reportSummaryDa8;
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'json';
      if (!this.reportSummaryData) {
        this.showNotification('No report data available to export', 'warning');
        return;
      }
      var data = {
        reportId: this.reportSummaryData.reportId,
        timestamp: this.reportSummaryData.timestamp,
        summary: {
          totalComparisons: (_this$reportSummaryDa = this.reportSummaryData.data.masterSummary) === null || _this$reportSummaryDa === void 0 ? void 0 : _this$reportSummaryDa.totalComparisons,
          similarityDistribution: {
            high: (_this$reportSummaryDa2 = this.reportSummaryData.data.masterSummary) === null || _this$reportSummaryDa2 === void 0 ? void 0 : _this$reportSummaryDa2.highSimilarity,
            moderate: (_this$reportSummaryDa3 = this.reportSummaryData.data.masterSummary) === null || _this$reportSummaryDa3 === void 0 ? void 0 : _this$reportSummaryDa3.moderateSimilarity,
            low: (_this$reportSummaryDa4 = this.reportSummaryData.data.masterSummary) === null || _this$reportSummaryDa4 === void 0 ? void 0 : _this$reportSummaryDa4.lowSimilarity
          },
          seoRisk: (_this$reportSummaryDa5 = this.reportSummaryData.data.masterSummary) === null || _this$reportSummaryDa5 === void 0 || (_this$reportSummaryDa5 = _this$reportSummaryDa5.topSimilarities) === null || _this$reportSummaryDa5 === void 0 || (_this$reportSummaryDa5 = _this$reportSummaryDa5[0]) === null || _this$reportSummaryDa5 === void 0 ? void 0 : _this$reportSummaryDa5.seoRisk,
          scores: {
            content: (_this$reportSummaryDa6 = this.reportSummaryData.data.contentSummary) === null || _this$reportSummaryDa6 === void 0 || (_this$reportSummaryDa6 = _this$reportSummaryDa6.results) === null || _this$reportSummaryDa6 === void 0 || (_this$reportSummaryDa6 = _this$reportSummaryDa6[0]) === null || _this$reportSummaryDa6 === void 0 ? void 0 : _this$reportSummaryDa6.avgScore,
            visual: (_this$reportSummaryDa7 = this.reportSummaryData.data.visualSummary) === null || _this$reportSummaryDa7 === void 0 || (_this$reportSummaryDa7 = _this$reportSummaryDa7.results) === null || _this$reportSummaryDa7 === void 0 || (_this$reportSummaryDa7 = _this$reportSummaryDa7[0]) === null || _this$reportSummaryDa7 === void 0 ? void 0 : _this$reportSummaryDa7.avgScore,
            technical: (_this$reportSummaryDa8 = this.reportSummaryData.data.technicalSummary) === null || _this$reportSummaryDa8 === void 0 || (_this$reportSummaryDa8 = _this$reportSummaryDa8.results) === null || _this$reportSummaryDa8 === void 0 || (_this$reportSummaryDa8 = _this$reportSummaryDa8[0]) === null || _this$reportSummaryDa8 === void 0 ? void 0 : _this$reportSummaryDa8.avgScore
          }
        }
      };
      if (format === 'json') {
        var dataStr = JSON.stringify(data, null, 2);
        var dataBlob = new Blob([dataStr], {
          type: 'application/json'
        });
        var url = URL.createObjectURL(dataBlob);
        var link = document.createElement('a');
        link.href = url;
        link.download = "".concat(this.reportId, "_summary.json");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.showNotification('Results data exported successfully', 'success');
      }
    }
  }]);
}(); // Utility function for debouncing
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
$(document).ready(function () {
  window.routeManager = new RouteComparisonManager();
});

// Add notification styles if not already present
var notificationStyles = "\n.notification-container {\n    position: fixed;\n    top: 20px;\n    right: 20px;\n    z-index: 1000;\n    max-width: 400px;\n}\n\n.notification {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 1rem 1.5rem;\n    margin-bottom: 0.5rem;\n    border-radius: 8px;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n    animation: slideIn 0.3s ease;\n}\n\n.notification-info {\n    background: #d1ecf1;\n    border-left: 4px solid #bee5eb;\n    color: #0c5460;\n}\n\n.notification-success {\n    background: #d4edda;\n    border-left: 4px solid #c3e6cb;\n    color: #155724;\n}\n\n.notification-warning {\n    background: #fff3cd;\n    border-left: 4px solid #ffeeba;\n    color: #856404;\n}\n\n.notification-error {\n    background: #f8d7da;\n    border-left: 4px solid #f5c6cb;\n    color: #721c24;\n}\n\n.notification-close {\n    background: none;\n    border: none;\n    font-size: 1.5rem;\n    cursor: pointer;\n    opacity: 0.7;\n    margin-left: 1rem;\n}\n\n.notification-close:hover {\n    opacity: 1;\n}\n\n@keyframes slideIn {\n    from {\n        transform: translateX(100%);\n        opacity: 0;\n    }\n    to {\n        transform: translateX(0);\n        opacity: 1;\n    }\n}\n";

// Inject notification styles
if (!document.getElementById('notification-styles')) {
  var style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = notificationStyles;
  document.head.appendChild(style);
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzcmMvcnVuX3JlcG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OzswQkNDQSx1S0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsd0JBQUEsTUFBQSxHQUFBLE1BQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsa0JBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxXQUFBLDhCQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLFNBQUEsWUFBQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLFNBQUEsRUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxVQUFBLG1CQUFBLENBQUEsQ0FBQSx1QkFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsUUFBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxXQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxnQkFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsWUFBQSxDQUFBLFdBQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLFFBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsUUFBQSxDQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLENBQUEsUUFBQSxDQUFBLE9BQUEsQ0FBQSxxQkFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLFlBQUEsU0FBQSx1Q0FBQSxDQUFBLFVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxRQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxhQUFBLENBQUEsTUFBQSxDQUFBLFFBQUEsQ0FBQSxLQUFBLENBQUEsWUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxVQUFBLFNBQUEsMkNBQUEsQ0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsb0JBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxTQUFBLHVDQUFBLENBQUEsZ0JBQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQSxrQkFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsY0FBQSxDQUFBLG1CQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsU0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsQ0FBQSxnQkFBQSxVQUFBLGNBQUEsa0JBQUEsY0FBQSwyQkFBQSxLQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsbUJBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxpQ0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLDBCQUFBLENBQUEsU0FBQSxHQUFBLFNBQUEsQ0FBQSxTQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLFdBQUEsTUFBQSxDQUFBLGNBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsRUFBQSwwQkFBQSxLQUFBLENBQUEsQ0FBQSxTQUFBLEdBQUEsMEJBQUEsRUFBQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLHlCQUFBLENBQUEsQ0FBQSxTQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxXQUFBLGlCQUFBLENBQUEsU0FBQSxHQUFBLDBCQUFBLEVBQUEsbUJBQUEsQ0FBQSxDQUFBLGlCQUFBLDBCQUFBLEdBQUEsbUJBQUEsQ0FBQSwwQkFBQSxpQkFBQSxpQkFBQSxHQUFBLGlCQUFBLENBQUEsV0FBQSx3QkFBQSxtQkFBQSxDQUFBLDBCQUFBLEVBQUEsQ0FBQSx3QkFBQSxtQkFBQSxDQUFBLENBQUEsR0FBQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGdCQUFBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsaUNBQUEsbUJBQUEsQ0FBQSxDQUFBLDhEQUFBLFlBQUEsWUFBQSxhQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQTtBQUFBLFNBQUEsb0JBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxRQUFBLENBQUEsdUJBQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxtQkFBQSxZQUFBLG1CQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsVUFBQSxHQUFBLENBQUEsRUFBQSxZQUFBLEdBQUEsQ0FBQSxFQUFBLFFBQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsQ0FBQSxZQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFlBQUEsQ0FBQSxnQkFBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxhQUFBLENBQUEsY0FBQSxDQUFBLG9CQUFBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQTtBQUFBLFNBQUEsbUJBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxjQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsV0FBQSxDQUFBLGdCQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQTtBQUFBLFNBQUEsa0JBQUEsQ0FBQSw2QkFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLFNBQUEsYUFBQSxPQUFBLFdBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxZQUFBLE1BQUEsQ0FBQSxJQUFBLGtCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsVUFBQSxDQUFBLGNBQUEsT0FBQSxDQUFBLElBQUEsa0JBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQSxXQUFBLENBQUEsS0FBQSxLQUFBO0FBQUEsU0FBQSxlQUFBLENBQUEsRUFBQSxDQUFBLFdBQUEsZUFBQSxDQUFBLENBQUEsS0FBQSxxQkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEtBQUEsMkJBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxLQUFBLGdCQUFBO0FBQUEsU0FBQSxpQkFBQSxjQUFBLFNBQUE7QUFBQSxTQUFBLHNCQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxXQUFBLENBQUEsZ0NBQUEsTUFBQSxJQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsUUFBQSxLQUFBLENBQUEsNEJBQUEsQ0FBQSxRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsaUJBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxJQUFBLFFBQUEsQ0FBQSxRQUFBLE1BQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxVQUFBLENBQUEsdUJBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxJQUFBLE1BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsaUJBQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSx5QkFBQSxDQUFBLFlBQUEsQ0FBQSxlQUFBLENBQUEsR0FBQSxDQUFBLGNBQUEsTUFBQSxDQUFBLENBQUEsTUFBQSxDQUFBLDJCQUFBLENBQUEsUUFBQSxDQUFBLGFBQUEsQ0FBQTtBQUFBLFNBQUEsZ0JBQUEsQ0FBQSxRQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxVQUFBLENBQUE7QUFBQSxTQUFBLG1CQUFBLENBQUEsV0FBQSxrQkFBQSxDQUFBLENBQUEsS0FBQSxnQkFBQSxDQUFBLENBQUEsS0FBQSwyQkFBQSxDQUFBLENBQUEsS0FBQSxrQkFBQTtBQUFBLFNBQUEsbUJBQUEsY0FBQSxTQUFBO0FBQUEsU0FBQSw0QkFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsMkJBQUEsQ0FBQSxTQUFBLGlCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsS0FBQSw2QkFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLFdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxJQUFBLGFBQUEsQ0FBQSxjQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsb0JBQUEsQ0FBQSwrQ0FBQSxJQUFBLENBQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUE7QUFBQSxTQUFBLGlCQUFBLENBQUEsOEJBQUEsTUFBQSxZQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsUUFBQSxhQUFBLENBQUEsdUJBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0FBQUEsU0FBQSxtQkFBQSxDQUFBLFFBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLFVBQUEsaUJBQUEsQ0FBQSxDQUFBO0FBQUEsU0FBQSxrQkFBQSxDQUFBLEVBQUEsQ0FBQSxhQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsWUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxVQUFBLENBQUE7QUFBQSxTQUFBLGdCQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxZQUFBLENBQUEsYUFBQSxTQUFBO0FBQUEsU0FBQSxrQkFBQSxDQUFBLEVBQUEsQ0FBQSxhQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxRQUFBLENBQUEsQ0FBQSxZQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsUUFBQSxRQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUE7QUFBQSxTQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxJ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QVksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNqQzs7QUFFQTtBQUNBLE1BQU0sQ0FBQyxjQUFjLEdBQUcsY0FBYztBQUV0QyxTQUFTLGNBQWMsQ0FBQSxFQUFHO0VBQ3RCLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNqQztBQUVBLFNBQVMsZ0JBQWdCLENBQUEsRUFBRztFQUN4QixZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNuQzs7QUFFQTtBQUNBLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBTTtFQUNwQixNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksc0JBQXNCLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUM7O0FBRUY7QUFDQSxJQUFNLGtCQUFrQiw0dENBbUV2Qjs7QUFFRDtBQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7RUFDakQsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7RUFDN0MsS0FBSyxDQUFDLEVBQUUsR0FBRyxxQkFBcUI7RUFDaEMsS0FBSyxDQUFDLFdBQVcsR0FBRyxrQkFBa0I7RUFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQ3BDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBSb3V0ZSBDb21wYXJpc29uIEFuYWx5c2lzIC0gSmF2YVNjcmlwdCBGdW5jdGlvbmFsaXR5XG4gKiBIYW5kbGVzIGR5bmFtaWMgVUksIHZhbGlkYXRpb24sIFNTRSwgYW5kIHVzZXIgaW50ZXJhY3Rpb25zXG4gKi9cblxuLy8gY29uc3QgdGVzdFNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL2FwaS9hbmFseXNpcy90ZXN0LXNzZScpO1xuLy8gdGVzdFNvdXJjZS5vbm1lc3NhZ2UgPSAoZSkgPT4gY29uc29sZS5sb2coJ1Rlc3QgbWVzc2FnZTonLCBlLmRhdGEpO1xuXG5jbGFzcyBSb3V0ZUNvbXBhcmlzb25NYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yb3V0ZUxpc3RzID0gW107XG4gICAgICAgIHRoaXMudmFsaWRhdGlvblN0YXRlID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmR1cGxpY2F0ZUNvbXBhcmlzb25zID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLnByb2Nlc3NSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXZlbnRTb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLm1heExpc3RzID0gNjtcbiAgICAgICAgdGhpcy5tYXhSb3V0ZXNQZXJMaXN0ID0gMzA7IFxuICAgICAgICB0aGlzLnNzZUNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNzZUNvbm5lY3Rpb25TdGF0dXMgPSAnZGlzY29ubmVjdGVkJztcbiAgICAgICAgdGhpcy5jdXJyZW50VGFiID0gJ3NldHVwJztcbiAgICAgICAgdGhpcy5yZXBvcnRJZCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlSW5pdGlhbExpc3RzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvblN1bW1hcnkoKTtcbiAgICAgICAgdGhpcy5kcmF3Q29ubmVjdGlvbkxpbmVzKCk7XG4gICAgfVxuICAgIFxuICAgIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIC8vIFRhYiBzd2l0Y2hpbmdcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1idXR0b24nKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5zd2l0Y2hUYWIoZS50YXJnZXQuZGF0YXNldC50YWIpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBSb3V0ZSBpbnB1dCB2YWxpZGF0aW9uIChvbiBibHVyKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JvdXRlLWlucHV0JykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUm91dGUoZS50YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFJvdXRlIGlucHV0IHBhc3RlIGRldGVjdGlvblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyb3V0ZS1pbnB1dCcpKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhhbmRsZVJvdXRlUGFzdGUoZS50YXJnZXQpLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gS2V5Ym9hcmQgYWNjZXNzaWJpbGl0eVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JvdXRlLWlucHV0JykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJvdXRlVG9MaXN0KHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQubGlzdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIFdpbmRvdyByZXNpemUgZm9yIGNvbm5lY3Rpb24gbGluZXNcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKCgpID0+IHRoaXMuZHJhd0Nvbm5lY3Rpb25MaW5lcygpLCAyNTApKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlSW5pdGlhbExpc3RzKCkge1xuICAgICAgICAvLyBTdGFydCB3aXRoIDIgZW1wdHkgbGlzdHNcbiAgICAgICAgdGhpcy5yb3V0ZUxpc3RzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiAnJywgcm91dGVzOiBbJyddLCBkb21haW46ICcnIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICcnLCByb3V0ZXM6IFsnJ10sIGRvbWFpbjogJycgfVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnJlbmRlckFsbFJvdXRlTGlzdHMoKTtcbiAgICB9XG4gICAgXG4gICAgLy8gQWxzbyB1cGRhdGUgeW91ciBzd2l0Y2hUYWIgbWV0aG9kIHRvIGhhbmRsZSB0aGUgcHJvZ3Jlc3MgdGFiIGJldHRlclxuICAgIHN3aXRjaFRhYih0YWJOYW1lKSB7XG4gICAgICAgIGlmICghdGhpcy5jYW5Td2l0Y2hUb1RhYih0YWJOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBVcGRhdGUgdGFiIGJ1dHRvbnNcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1idXR0b24nKS5mb3JFYWNoKGJ0biA9PiB7XG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBidG4uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYWN0aXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFiPVwiJHt0YWJOYW1lfVwiXWApO1xuICAgICAgICBpZiAoYWN0aXZlQnV0dG9uKSB7XG4gICAgICAgICAgICBhY3RpdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBhY3RpdmVCdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gVXBkYXRlIHRhYiBjb250ZW50XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItY29udGVudCcpLmZvckVhY2goY29udGVudCA9PiB7XG4gICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFjdGl2ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0YWJOYW1lfS1wYW5lbGApO1xuICAgICAgICBpZiAoYWN0aXZlQ29udGVudCkge1xuICAgICAgICAgICAgYWN0aXZlQ29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jdXJyZW50VGFiID0gdGFiTmFtZTtcbiAgICAgICAgXG4gICAgICAgIC8vIFRhYi1zcGVjaWZpYyBhY3Rpb25zXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAncHJvZ3Jlc3MnKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVQcm9ncmVzc1RyYWNraW5nKCk7XG4gICAgICAgICAgICAvLyBFc3RhYmxpc2ggU1NFIGNvbm5lY3Rpb24gd2hlbiBzd2l0Y2hpbmcgdG8gcHJvZ3Jlc3MgdGFiXG4gICAgICAgICAgICB0aGlzLmVzdGFibGlzaFNTRUNvbm5lY3Rpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YWJOYW1lID09PSAnc2V0dXAnKSB7XG4gICAgICAgICAgICAvLyBEaXNjb25uZWN0IFNTRSB3aGVuIGxlYXZpbmcgcHJvZ3Jlc3MgdGFiIHRvIHNhdmUgcmVzb3VyY2VzXG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTU0UoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvblN1bW1hcnkoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YWJOYW1lID09PSAncmVzdWx0cycpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUmVzdWx0c1RhYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuU3dpdGNoVG9UYWIodGFiTmFtZSkge1xuICAgICAgICBzd2l0Y2ggKHRhYk5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NldHVwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNWYWxpZFJvdXRlcygpO1xuICAgICAgICAgICAgY2FzZSAncmVzdWx0cyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0NvbXBsZXRlZDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gMTAuIEVuaGFuY2VkIGFjdGl2aXR5IG1vbml0b3JpbmcgbWV0aG9kc1xuICAgIHN0YXJ0QWN0aXZpdHlNb25pdG9yaW5nKCkge1xuICAgICAgICB0aGlzLmxhc3RIZWFydGJlYXQgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZpdHlUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgcmVzZXRBY3Rpdml0eVRpbWVvdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5VGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZpdHlUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5hY3Rpdml0eVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfimqDvuI8gU1NFIGFjdGl2aXR5IHRpbWVvdXQgLSBubyByZWNlbnQgZGF0YScpO1xuICAgICAgICAgICAgdGhpcy5hZGRUZXJtaW5hbExpbmUoJ05vIHJlY2VudCBhY3Rpdml0eSBkZXRlY3RlZCAtIGNvbm5lY3Rpb24gbWF5IGJlIHN0YWxsZWQnLCAnd2FybmluZycpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb25uZWN0aW9uU3RhdHVzKCdlcnJvcicpO1xuICAgICAgICB9LCA2MDAwMCk7IC8vIDYwIHNlY29uZHMgb2YgaW5hY3Rpdml0eVxuICAgIH1cblxuICAgIGhhbmRsZVNTRVRpbWVvdXQobWVzc2FnZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnU1NFIHRpbWVvdXQ6JywgbWVzc2FnZSk7XG4gICAgICAgIHRoaXMuYWRkVGVybWluYWxMaW5lKGDimqDvuI8gJHttZXNzYWdlfWAsICd3YXJuaW5nJyk7XG4gICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbihtZXNzYWdlLCAnd2FybmluZycpO1xuICAgICAgICBcbiAgICAgICAgLy8gQ2xvc2UgdGhlIFNTRSBjb25uZWN0aW9uXG4gICAgICAgIGlmICh0aGlzLmV2ZW50U291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jbGVhclNTRVRpbWVvdXRzKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBEb24ndCBhdXRvbWF0aWNhbGx5IG1hcmsgYXMgZmFpbGVkIC0gbGV0IHVzZXIgZGVjaWRlXG4gICAgICAgIHRoaXMuYWRkVGVybWluYWxMaW5lKCdZb3UgY2FuIHJlZnJlc2ggdGhlIHBhZ2UgYW5kIGNoZWNrIGFuYWx5c2lzIHN0YXR1cycsICdpbmZvJyk7XG4gICAgfVxuXG4gICAgY2xlYXJTU0VUaW1lb3V0cygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNvbm5lY3Rpb25UaW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5VGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZpdHlUaW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRpYWxpemVQcm9ncmVzc1RyYWNraW5nKCkge1xuICAgICAgICAvLyBSZXNldCBwcm9ncmVzcyBpbmRpY2F0b3JzXG4gICAgICAgIHRoaXMudXBkYXRlT3ZlcmFsbFByb2dyZXNzKDApO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVzZXQgYWxsIHN0ZXAgaW5kaWNhdG9yc1xuICAgICAgICBjb25zdCBzdGVwcyA9IFsnc2NyYXBpbmcnLCAndmlzdWFsLWFuYWx5c2lzJywgJ2NvbnRlbnQtYW5hbHlzaXMnLCAndGVjaG5pY2FsLWFuYWx5c2lzJywgJ3Nlby1hbmFseXNpcycsICdmaW5hbC1yZXBvcnQnXTtcbiAgICAgICAgc3RlcHMuZm9yRWFjaChzdGVwID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RlcFByb2dyZXNzKHN0ZXAsICdwZW5kaW5nJywgMCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQ2xlYXIgdGVybWluYWxcbiAgICAgICAgY29uc3QgdGVybWluYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVybWluYWxPdXRwdXQnKTtcbiAgICAgICAgaWYgKHRlcm1pbmFsKSB7XG4gICAgICAgICAgICB0ZXJtaW5hbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQWRkIGluaXRpYWwgbWVzc2FnZVxuICAgICAgICB0aGlzLmFkZFRlcm1pbmFsTGluZSgnQ29ubmVjdGluZyB0byBhbmFseXNpcyBzZXJ2aWNlLi4uJywgJ2luZm8nKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIHVwZGF0ZVRhYkF2YWlsYWJpbGl0eSgpIHtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NUYWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWI9XCJwcm9ncmVzc1wiXScpO1xuICAgICAgICBjb25zdCByZXN1bHRzVGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiPVwicmVzdWx0c1wiXScpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsaWRSb3V0ZXMoKSkge1xuICAgICAgICAgICAgcHJvZ3Jlc3NUYWIuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIHByb2dyZXNzVGFiLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2dyZXNzVGFiLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBwcm9ncmVzc1RhYi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0NvbXBsZXRlZCkge1xuICAgICAgICAgICAgcmVzdWx0c1RhYi5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgcmVzdWx0c1RhYi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzVGFiLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICByZXN1bHRzVGFiLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGFkZFJvdXRlTGlzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucm91dGVMaXN0cy5sZW5ndGggPj0gdGhpcy5tYXhMaXN0cykge1xuICAgICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKCdNYXhpbXVtIG51bWJlciBvZiBsaXN0cyByZWFjaGVkICg2KScsICd3YXJuaW5nJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMucm91dGVMaXN0cy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgcm91dGVzOiBbJyddLFxuICAgICAgICAgICAgZG9tYWluOiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyQWxsUm91dGVMaXN0cygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbGlkYXRpb25TdW1tYXJ5KCk7XG4gICAgICAgIHRoaXMuZHJhd0Nvbm5lY3Rpb25MaW5lcygpO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVSb3V0ZUxpc3QobGlzdEluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnJvdXRlTGlzdHMubGVuZ3RoIDw9IDIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbignTWluaW11bSAyIGxpc3RzIHJlcXVpcmVkIGZvciBjb21wYXJpc29uJywgJ3dhcm5pbmcnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5yb3V0ZUxpc3RzLnNwbGljZShsaXN0SW5kZXgsIDEpO1xuICAgICAgICB0aGlzLnJlbmRlckFsbFJvdXRlTGlzdHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWYWxpZGF0aW9uU3VtbWFyeSgpO1xuICAgICAgICB0aGlzLmRyYXdDb25uZWN0aW9uTGluZXMoKTtcbiAgICB9XG4gICAgXG4gICAgYWRkUm91dGUobGlzdEluZGV4KSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnJvdXRlTGlzdHNbbGlzdEluZGV4XTtcbiAgICAgICAgY29uc29sZS5sb2coYEFkZGluZyByb3V0ZSB0byBsaXN0ICR7bGlzdEluZGV4fTpgLCBsaXN0KTtcbiAgICAgICAgaWYgKGxpc3Qucm91dGVzLmxlbmd0aCA+PSB0aGlzLm1heFJvdXRlc1Blckxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbihgTWF4aW11bSByb3V0ZXMgcGVyIGxpc3QgcmVhY2hlZCAoJHt0aGlzLm1heFJvdXRlc1Blckxpc3R9KWAsICd3YXJuaW5nJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxpc3Qucm91dGVzLnB1c2goJycpO1xuICAgICAgICB0aGlzLnJlbmRlckFsbFJvdXRlTGlzdHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWYWxpZGF0aW9uU3VtbWFyeSgpO1xuICAgICAgICB0aGlzLmRyYXdDb25uZWN0aW9uTGluZXMoKTtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlUm91dGUobGlzdEluZGV4LCByb3V0ZUluZGV4KSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnJvdXRlTGlzdHNbbGlzdEluZGV4XTtcbiAgICAgICAgaWYgKGxpc3Qucm91dGVzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oJ0F0IGxlYXN0IG9uZSByb3V0ZSByZXF1aXJlZCBwZXIgbGlzdCcsICd3YXJuaW5nJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxpc3Qucm91dGVzLnNwbGljZShyb3V0ZUluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5yZW5kZXJSb3V0ZUlucHV0cyhsaXN0SW5kZXgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbGlkYXRpb25TdW1tYXJ5KCk7XG4gICAgICAgIHRoaXMuZHJhd0Nvbm5lY3Rpb25MaW5lcygpO1xuICAgIH1cbiAgICBcbiAgICBwcm9jZXNzQnVsa0lucHV0KGxpc3RJbmRleCkge1xuICAgICAgICBjb25zdCB0ZXh0YXJlYSA9ICQoYCNidWxrSW5wdXQke2xpc3RJbmRleH1gKVswXTtcbiAgICAgICAgY29uc3QgdXJscyA9IHRleHRhcmVhLnZhbHVlXG4gICAgICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICAubWFwKGxpbmUgPT4gbGluZS50cmltKCkpXG4gICAgICAgICAgICAuZmlsdGVyKGxpbmUgPT4gbGluZS5sZW5ndGggPiAwKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKCdObyBVUkxzIGZvdW5kIGluIGJ1bGsgaW5wdXQnLCAnd2FybmluZycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5yb3V0ZUxpc3RzW2xpc3RJbmRleF07XG4gICAgICAgIGNvbnN0IHRvdGFsUm91dGVzID0gbGlzdC5yb3V0ZXMuZmlsdGVyKHIgPT4gci50cmltKCkpLmxlbmd0aCArIHVybHMubGVuZ3RoO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRvdGFsUm91dGVzID4gdGhpcy5tYXhSb3V0ZXNQZXJMaXN0KSB7XG4gICAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oYFdvdWxkIGV4Y2VlZCBtYXhpbXVtIHJvdXRlcyBwZXIgbGlzdCAoJHt0aGlzLm1heFJvdXRlc1Blckxpc3R9KWAsICdlcnJvcicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBDbGVhciBlbXB0eSByb3V0ZXMgZmlyc3RcbiAgICAgICAgbGlzdC5yb3V0ZXMgPSBsaXN0LnJvdXRlcy5maWx0ZXIociA9PiByLnRyaW0oKSk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgbmV3IFVSTHNcbiAgICAgICAgbGlzdC5yb3V0ZXMucHVzaCguLi51cmxzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIENsZWFyIHRleHRhcmVhXG4gICAgICAgICQoYCNidWxrSW5wdXQke2xpc3RJbmRleH1gKS52YWwoJycpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZW5kZXJBbGxSb3V0ZUxpc3RzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvblN1bW1hcnkoKTtcbiAgICAgICAgdGhpcy5kcmF3Q29ubmVjdGlvbkxpbmVzKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBWYWxpZGF0ZSBhbGwgbmV3IHJvdXRlc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHVybHMuZm9yRWFjaCgodXJsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlSW5kZXggPSBsaXN0LnJvdXRlcy5sZW5ndGggLSB1cmxzLmxlbmd0aCArIGluZGV4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gJChgLnJvdXRlLWlucHV0W2RhdGEtbGlzdC1pbmRleD1cIiR7bGlzdEluZGV4fVwiXVtkYXRhLXJvdXRlLWluZGV4PVwiJHtyb3V0ZUluZGV4fVwiXWApWzBdO1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUm91dGUoaW5wdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKGBBZGRlZCAke3VybHMubGVuZ3RofSBVUkxzIHRvIGxpc3RgLCAnc3VjY2VzcycpO1xuICAgIH1cbiAgICBcbiAgICBoYW5kbGVSb3V0ZVBhc3RlKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICAgIGNvbnN0IGxpbmVzID0gdmFsdWUuc3BsaXQoJ1xcbicpLm1hcChsaW5lID0+IGxpbmUudHJpbSgpKS5maWx0ZXIobGluZSA9PiBsaW5lLmxlbmd0aCA+IDApO1xuICAgICAgICBcbiAgICAgICAgaWYgKGxpbmVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJbmRleCA9IHBhcnNlSW50KGlucHV0LmRhdGFzZXQubGlzdEluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlSW5kZXggPSBwYXJzZUludChpbnB1dC5kYXRhc2V0LnJvdXRlSW5kZXgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTZXQgZmlyc3QgVVJMIGluIGN1cnJlbnQgZmllbGRcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gbGluZXNbMF07XG4gICAgICAgICAgICB0aGlzLnJvdXRlTGlzdHNbbGlzdEluZGV4XS5yb3V0ZXNbcm91dGVJbmRleF0gPSBsaW5lc1swXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQWRkIGFkZGl0aW9uYWwgVVJMcyBhcyBuZXcgcm91dGVzXG4gICAgICAgICAgICBjb25zdCBhZGRpdGlvbmFsVXJscyA9IGxpbmVzLnNsaWNlKDEpO1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMucm91dGVMaXN0c1tsaXN0SW5kZXhdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobGlzdC5yb3V0ZXMubGVuZ3RoICsgYWRkaXRpb25hbFVybHMubGVuZ3RoID4gdGhpcy5tYXhSb3V0ZXNQZXJMaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKGBXb3VsZCBleGNlZWQgbWF4aW11bSByb3V0ZXMgcGVyIGxpc3QgKCR7dGhpcy5tYXhSb3V0ZXNQZXJMaXN0fSlgLCAnZXJyb3InKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEluc2VydCBhZGRpdGlvbmFsIFVSTHMgYWZ0ZXIgY3VycmVudCByb3V0ZVxuICAgICAgICAgICAgbGlzdC5yb3V0ZXMuc3BsaWNlKHJvdXRlSW5kZXggKyAxLCAwLCAuLi5hZGRpdGlvbmFsVXJscyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQWxsUm91dGVMaXN0cygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWxpZGF0aW9uU3VtbWFyeSgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3Q29ubmVjdGlvbkxpbmVzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbihgU3BsaXQgJHtsaW5lcy5sZW5ndGh9IFVSTHMgaW50byBzZXBhcmF0ZSBmaWVsZHNgLCAnc3VjY2VzcycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHZhbGlkYXRlUm91dGUoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgdXJsID0gaW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICBjb25zdCBsaXN0SW5kZXggPSBwYXJzZUludChpbnB1dC5kYXRhc2V0Lmxpc3RJbmRleCk7XG4gICAgICAgIGNvbnN0IHJvdXRlSW5kZXggPSBwYXJzZUludChpbnB1dC5kYXRhc2V0LnJvdXRlSW5kZXgpO1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uS2V5ID0gYCR7bGlzdEluZGV4fS0ke3JvdXRlSW5kZXh9YDtcbiAgICAgICAgXG4gICAgICAgIC8vIFVwZGF0ZSBpbnRlcm5hbCBzdGF0ZVxuICAgICAgICB0aGlzLnJvdXRlTGlzdHNbbGlzdEluZGV4XS5yb3V0ZXNbcm91dGVJbmRleF0gPSB1cmw7XG4gICAgICAgIFxuICAgICAgICAvLyBDbGVhciBwcmV2aW91cyB2YWxpZGF0aW9uIHN0YXRlXG4gICAgICAgICQoaW5wdXQpLnJlbW92ZUNsYXNzKCd2YWxpZCBpbnZhbGlkIGR1cGxpY2F0ZScpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25TdGF0ZS5kZWxldGUodmFsaWRhdGlvbktleSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB2YWxpZGF0aW9uJHtsaXN0SW5kZXh9LSR7cm91dGVJbmRleH1gKTtcbiAgICAgICAgaWYgKHZhbGlkYXRpb25NZXNzYWdlKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uTWVzc2FnZS50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBFbXB0eSBpcyBuZWl0aGVyIHZhbGlkIG5vciBpbnZhbGlkXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFVSTCBmb3JtYXQgdmFsaWRhdGlvblxuICAgICAgICBjb25zdCBpc1ZhbGlkVXJsID0gdGhpcy5pc1ZhbGlkSHR0cFVybCh1cmwpO1xuICAgICAgICBpZiAoIWlzVmFsaWRVcmwpIHtcbiAgICAgICAgICAgICQoaW5wdXQpLmFkZENsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UsICdJbnZhbGlkIFVSTCBmb3JtYXQuIE11c3Qgc3RhcnQgd2l0aCBodHRwOi8vIG9yIGh0dHBzOi8vJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIER1cGxpY2F0ZSBkZXRlY3Rpb25cbiAgICAgICAgY29uc3QgaXNEdXBsaWNhdGUgPSB0aGlzLmNoZWNrRm9yRHVwbGljYXRlcyh1cmwsIGxpc3RJbmRleCwgcm91dGVJbmRleCk7XG4gICAgICAgIGlmIChpc0R1cGxpY2F0ZSkge1xuICAgICAgICAgICAgJChpbnB1dCkuYWRkQ2xhc3MoJ2R1cGxpY2F0ZScpO1xuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKHZhbGlkYXRpb25NZXNzYWdlLCAnVGhpcyBVUkwgY3JlYXRlcyBkdXBsaWNhdGUgY29tcGFyaXNvbnMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoaW5wdXQpLmFkZENsYXNzKCd2YWxpZCcpO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uU3RhdGUuc2V0KHZhbGlkYXRpb25LZXksIHsgdmFsaWQ6IHRydWUsIHVybCB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQXV0by1zdWdnZXN0IGRvbWFpbiBuYW1lXG4gICAgICAgIGlmIChpc1ZhbGlkVXJsICYmICF0aGlzLnJvdXRlTGlzdHNbbGlzdEluZGV4XS5uYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBkb21haW4gPSB0aGlzLmV4dHJhY3REb21haW4odXJsKTtcbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdE5hbWUke2xpc3RJbmRleH1gKTtcbiAgICAgICAgICAgICAgICBpZiAobmFtZUlucHV0ICYmICFuYW1lSW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gZG9tYWluO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlTGlzdHNbbGlzdEluZGV4XS5uYW1lID0gZG9tYWluO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy51cGRhdGVWYWxpZGF0aW9uU3VtbWFyeSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRhYkF2YWlsYWJpbGl0eSgpO1xuICAgICAgICB0aGlzLmRyYXdDb25uZWN0aW9uTGluZXMoKTtcbiAgICB9XG4gICAgXG4gICAgaXNWYWxpZEh0dHBVcmwoc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHN0cmluZyk7XG4gICAgICAgICAgICByZXR1cm4gdXJsLnByb3RvY29sID09PSAnaHR0cDonIHx8IHVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBleHRyYWN0RG9tYWluKHVybCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdXJsT2JqID0gbmV3IFVSTCh1cmwpO1xuICAgICAgICAgICAgcmV0dXJuIHVybE9iai5ob3N0bmFtZS5yZXBsYWNlKCd3d3cuJywgJycpO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjaGVja0ZvckR1cGxpY2F0ZXModXJsLCBjdXJyZW50TGlzdEluZGV4LCBjdXJyZW50Um91dGVJbmRleCkge1xuICAgICAgICB0aGlzLmR1cGxpY2F0ZUNvbXBhcmlzb25zLmNsZWFyKCk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBsaXN0SW5kZXggPSAwOyBsaXN0SW5kZXggPCB0aGlzLnJvdXRlTGlzdHMubGVuZ3RoOyBsaXN0SW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMucm91dGVMaXN0c1tsaXN0SW5kZXhdO1xuICAgICAgICAgICAgZm9yIChsZXQgcm91dGVJbmRleCA9IDA7IHJvdXRlSW5kZXggPCBsaXN0LnJvdXRlcy5sZW5ndGg7IHJvdXRlSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlVXJsID0gbGlzdC5yb3V0ZXNbcm91dGVJbmRleF07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFyb3V0ZVVybCB8fCAhdGhpcy5pc1ZhbGlkSHR0cFVybChyb3V0ZVVybCkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0SW5kZXggPT09IGN1cnJlbnRMaXN0SW5kZXggJiYgcm91dGVJbmRleCA9PT0gY3VycmVudFJvdXRlSW5kZXgpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoaXMgY3JlYXRlcyBhIGR1cGxpY2F0ZSBjb21wYXJpc29uXG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlVXJsID09PSB1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgb3RoZXJMaXN0SW5kZXggPSAwOyBvdGhlckxpc3RJbmRleCA8IHRoaXMucm91dGVMaXN0cy5sZW5ndGg7IG90aGVyTGlzdEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlckxpc3RJbmRleCA9PT0gbGlzdEluZGV4IHx8IG90aGVyTGlzdEluZGV4ID09PSBjdXJyZW50TGlzdEluZGV4KSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJMaXN0ID0gdGhpcy5yb3V0ZUxpc3RzW290aGVyTGlzdEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdSb3V0ZSA9IG90aGVyTGlzdC5yb3V0ZXNbcm91dGVJbmRleF0gfHwgb3RoZXJMaXN0LnJvdXRlc1tjdXJyZW50Um91dGVJbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3JyZXNwb25kaW5nUm91dGUgJiYgdGhpcy5pc1ZhbGlkSHR0cFVybChjb3JyZXNwb25kaW5nUm91dGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdXBsaWNhdGVDb21wYXJpc29ucy5hZGQoYCR7cm91dGVVcmx9IOKGlCAke2NvcnJlc3BvbmRpbmdSb3V0ZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKG1lc3NhZ2VFbGVtZW50LCB0ZXh0KSB7XG4gICAgICAgIGlmIChtZXNzYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZUxpc3ROYW1lKGxpc3RJbmRleCwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5yb3V0ZUxpc3RzW2xpc3RJbmRleF0ubmFtZSA9IHZhbHVlO1xuICAgIH1cbiAgICBcbiAgICBoYXNWYWxpZFJvdXRlcygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy52YWxpZGF0aW9uU3RhdGUudmFsdWVzKCkpXG4gICAgICAgICAgICAuZmlsdGVyKHN0YXRlID0+IHN0YXRlLnZhbGlkKS5sZW5ndGggPj0gMjtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlVmFsaWRhdGlvblN1bW1hcnkoKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkUm91dGVzID0gQXJyYXkuZnJvbSh0aGlzLnZhbGlkYXRpb25TdGF0ZS52YWx1ZXMoKSlcbiAgICAgICAgICAgIC5maWx0ZXIoc3RhdGUgPT4gc3RhdGUudmFsaWQpLmxlbmd0aDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRvdGFsQ29tcGFyaXNvbnMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsQ29tcGFyaXNvbnMoKTtcbiAgICAgICAgY29uc3QgZHVwbGljYXRlQ291bnQgPSB0aGlzLmR1cGxpY2F0ZUNvbXBhcmlzb25zLnNpemU7XG4gICAgICAgIFxuICAgICAgICAvLyBVcGRhdGUgbnVtYmVyc1xuICAgICAgICBjb25zdCB0b3RhbFJvdXRlc0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFsUm91dGVzJyk7XG4gICAgICAgIGNvbnN0IHRvdGFsQ29tcGFyaXNvbnNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbENvbXBhcmlzb25zJyk7XG4gICAgICAgIGNvbnN0IGR1cGxpY2F0ZVdhcm5pbmdzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVwbGljYXRlV2FybmluZ3MnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0b3RhbFJvdXRlc0VsKSB0b3RhbFJvdXRlc0VsLnRleHRDb250ZW50ID0gdmFsaWRSb3V0ZXM7XG4gICAgICAgIGlmICh0b3RhbENvbXBhcmlzb25zRWwpIHRvdGFsQ29tcGFyaXNvbnNFbC50ZXh0Q29udGVudCA9IHRvdGFsQ29tcGFyaXNvbnM7XG4gICAgICAgIGlmIChkdXBsaWNhdGVXYXJuaW5nc0VsKSBkdXBsaWNhdGVXYXJuaW5nc0VsLnRleHRDb250ZW50ID0gZHVwbGljYXRlQ291bnQ7XG4gICAgICAgIFxuICAgICAgICAvLyBSZXBsYWNlIHRoZSBvbGQgYnV0dG9uIHVwZGF0ZSBjb2RlIHdpdGggdGhpczpcbiAgICAgICAgdGhpcy51cGRhdGVTdGFydEFuYWx5c2lzQnV0dG9uKCk7IC8vIFVzZSB0aGUgbmV3IGNlbnRyYWxpemVkIG1ldGhvZFxuICAgICAgICBcbiAgICAgICAgLy8gVXBkYXRlIGdsb2JhbCB2YWxpZGF0aW9uIG1lc3NhZ2VzXG4gICAgICAgIHRoaXMudXBkYXRlR2xvYmFsVmFsaWRhdGlvbk1lc3NhZ2VzKCk7XG4gICAgfVxuICAgIFxuICAgIGNhbGN1bGF0ZVRvdGFsQ29tcGFyaXNvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvdXRlTGlzdHMubGVuZ3RoIDwgMikgcmV0dXJuIDA7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB2YWxpZFJvdXRlc1Blckxpc3QgPSB0aGlzLnJvdXRlTGlzdHMubWFwKGxpc3QgPT4gXG4gICAgICAgICAgICBsaXN0LnJvdXRlcy5maWx0ZXIocm91dGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25FbnRyeSA9IEFycmF5LmZyb20odGhpcy52YWxpZGF0aW9uU3RhdGUuZW50cmllcygpKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgoW2tleSwgc3RhdGVdKSA9PiBzdGF0ZS51cmwgPT09IHJvdXRlICYmIHN0YXRlLnZhbGlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISF2YWxpZGF0aW9uRW50cnk7XG4gICAgICAgICAgICB9KS5sZW5ndGhcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1heFJvdXRlcyA9IE1hdGgubWF4KC4uLnZhbGlkUm91dGVzUGVyTGlzdCk7XG4gICAgICAgIGNvbnN0IG51bUxpc3RzID0gdGhpcy5yb3V0ZUxpc3RzLmxlbmd0aDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtYXhSb3V0ZXMgKiAobnVtTGlzdHMgKiAobnVtTGlzdHMgLSAxKSkgLyAyO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVHbG9iYWxWYWxpZGF0aW9uTWVzc2FnZXMoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnbG9iYWxWYWxpZGF0aW9uJyk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmR1cGxpY2F0ZUNvbXBhcmlzb25zLmZvckVhY2goZHVwbGljYXRlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgd2FybmluZ0VsLmNsYXNzTmFtZSA9ICd2YWxpZGF0aW9uLXdhcm5pbmcnO1xuICAgICAgICAgICAgd2FybmluZ0VsLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIndhcm5pbmctaWNvblwiPuKaoO+4jzwvc3Bhbj5cbiAgICAgICAgICAgICAgICBEdXBsaWNhdGUgY29tcGFyaXNvbjogJHtkdXBsaWNhdGV9XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdhcm5pbmdFbCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBkcmF3Q29ubmVjdGlvbkxpbmVzKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdGlvbkxpbmVzJyk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIFxuICAgICAgICAvLyBPbmx5IGRyYXcgaWYgd2UgaGF2ZSBtdWx0aXBsZSBsaXN0cyB3aXRoIHJvdXRlc1xuICAgICAgICBpZiAodGhpcy5yb3V0ZUxpc3RzLmxlbmd0aCA8IDIpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJvdXRlUm93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3V0ZS1pbnB1dC1yb3cnKTtcbiAgICAgICAgY29uc3QgbGlzdEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdXRlLWxpc3QnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChsaXN0RWxlbWVudHMubGVuZ3RoIDwgMikgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbWF4Um91dGVzU2hvd24gPSBNYXRoLm1heCguLi50aGlzLnJvdXRlTGlzdHMubWFwKGxpc3QgPT4gbGlzdC5yb3V0ZXMubGVuZ3RoKSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCByb3V0ZUluZGV4ID0gMDsgcm91dGVJbmRleCA8IG1heFJvdXRlc1Nob3duOyByb3V0ZUluZGV4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGxpc3RJbmRleCA9IDA7IGxpc3RJbmRleCA8IHRoaXMucm91dGVMaXN0cy5sZW5ndGggLSAxOyBsaXN0SW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRMaXN0ID0gbGlzdEVsZW1lbnRzW2xpc3RJbmRleF07XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dExpc3QgPSBsaXN0RWxlbWVudHNbbGlzdEluZGV4ICsgMV07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFJvdyA9IGN1cnJlbnRMaXN0LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdXRlLWluZGV4PVwiJHtyb3V0ZUluZGV4fVwiXWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSb3cgPSBuZXh0TGlzdC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3V0ZS1pbmRleD1cIiR7cm91dGVJbmRleH1cIl1gKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFJvdyAmJiBuZXh0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29ubmVjdGlvbkxpbmUoY3VycmVudFJvdywgbmV4dFJvdywgcm91dGVJbmRleCArIDEsIGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUNvbm5lY3Rpb25MaW5lKGZyb21Sb3csIHRvUm93LCBjb2xvckluZGV4LCBjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgZnJvbVJlY3QgPSBmcm9tUm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB0b1JlY3QgPSB0b1Jvdy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGluZS5jbGFzc05hbWUgPSBgY29ubmVjdGlvbi1saW5lIGNvbG9yLSR7Y29sb3JJbmRleCAlIDYgKyAxfWA7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzdGFydFggPSBmcm9tUmVjdC5yaWdodCAtIGNvbnRhaW5lclJlY3QubGVmdDtcbiAgICAgICAgY29uc3QgZW5kWCA9IHRvUmVjdC5sZWZ0IC0gY29udGFpbmVyUmVjdC5sZWZ0O1xuICAgICAgICBjb25zdCB5ID0gKGZyb21SZWN0LnRvcCArIGZyb21SZWN0LmhlaWdodCAvIDIpIC0gY29udGFpbmVyUmVjdC50b3A7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB3aWR0aCA9IGVuZFggLSBzdGFydFg7XG4gICAgICAgIFxuICAgICAgICBsaW5lLnN0eWxlLmxlZnQgPSBgJHtzdGFydFh9cHhgO1xuICAgICAgICBsaW5lLnN0eWxlLnRvcCA9IGAke3l9cHhgO1xuICAgICAgICBsaW5lLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgICAgICBcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpbmUpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJBbGxSb3V0ZUxpc3RzKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSAkKCcucm91dGUtbGlzdHMtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yb3V0ZUxpc3RzLmZvckVhY2goKGxpc3QsIGxpc3RJbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGlzdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVJvdXRlTGlzdEVsZW1lbnQobGlzdEluZGV4KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQobGlzdEVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIFJlLWF0dGFjaCBldmVudCBsaXN0ZW5lcnMgYWZ0ZXIgcmVuZGVyaW5nXG4gICAgICAgIHRoaXMuYXR0YWNoUm91dGVMaXN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlUm91dGVMaXN0RWxlbWVudChsaXN0SW5kZXgpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMucm91dGVMaXN0c1tsaXN0SW5kZXhdO1xuICAgICAgICBjb25zdCBjb2xvckNsYXNzID0gYGxpc3QtY29sb3ItJHtsaXN0SW5kZXh9YDtcbiAgICAgICAgY29uc3QgY2FuUmVtb3ZlID0gdGhpcy5yb3V0ZUxpc3RzLmxlbmd0aCA+IDI7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLnJvdXRlTGlzdHMubGVuZ3RoID49IHRoaXMubWF4TGlzdHMpIHtcbiAgICAgICAgICAgICQoYCNhZGRMaXN0QnRuYCkucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoYCNhZGRMaXN0QnRuYCkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJvdXRlSW5wdXRzSHRtbCA9IGxpc3Qucm91dGVzLm1hcCgocm91dGUsIHJvdXRlSW5kZXgpID0+IFxuICAgICAgICAgICAgdGhpcy5jcmVhdGVSb3V0ZUlucHV0Um93SHRtbChsaXN0SW5kZXgsIHJvdXRlSW5kZXgsIHJvdXRlKVxuICAgICAgICApLmpvaW4oJycpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGlzdEh0bWwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm91dGUtbGlzdCAke2NvbG9yQ2xhc3N9XCIgZGF0YS1saXN0LWluZGV4PVwiJHtsaXN0SW5kZXh9XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJsaXN0TmFtZSR7bGlzdEluZGV4fVwiIGNsYXNzPVwibGlzdC1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUgJHtsaXN0SW5kZXggKyAxfSBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJsaXN0TmFtZSR7bGlzdEluZGV4fVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibGlzdC1uYW1lLWlucHV0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIke2xpc3QuZG9tYWluIHx8ICdFbnRlciBzaXRlIG5hbWUnfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCIke2xpc3QubmFtZX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJsaXN0TmFtZSR7bGlzdEluZGV4fS1oZWxwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c21hbGwgaWQ9XCJsaXN0TmFtZSR7bGlzdEluZGV4fS1oZWxwXCIgY2xhc3M9XCJpbnB1dC1oZWxwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3B0aW9uYWw6IEVudGVyIGEgbmFtZSBmb3IgdGhpcyBzaXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3V0ZS1pbnB1dHMtY29udGFpbmVyXCIgaWQ9XCJyb3V0ZUlucHV0cyR7bGlzdEluZGV4fVwiPlxuICAgICAgICAgICAgICAgICAgICAke3JvdXRlSW5wdXRzSHRtbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWRkLXJvdXRlLWJ0blwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYWN0aW9uPVwiYWRkLXJvdXRlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1saXN0LWluZGV4PVwiJHtsaXN0SW5kZXh9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2xpc3Qucm91dGVzLmxlbmd0aCA+PSB0aGlzLm1heFJvdXRlc1Blckxpc3QgPyAnZGlzYWJsZWQnIDogJyd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4taWNvblwiPuKelTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFkZCBSb3V0ZSAoJHtsaXN0LnJvdXRlcy5sZW5ndGh9LzMwKVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidWxrLWlucHV0LXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJidWxrSW5wdXQke2xpc3RJbmRleH1cIiBjbGFzcz1cImJ1bGstbGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPciBwYXN0ZSBtdWx0aXBsZSBVUkxzOlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBpZD1cImJ1bGtJbnB1dCR7bGlzdEluZGV4fVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnVsay1pbnB1dFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGFzdGUgbXVsdGlwbGUgVVJMcywgb25lIHBlciBsaW5lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPVwiM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1saXN0LWluZGV4PVwiJHtsaXN0SW5kZXh9XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwcm9jZXNzLWJ1bGstYnRuXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYWN0aW9uPVwicHJvY2Vzcy1idWxrXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtbGlzdC1pbmRleD1cIiR7bGlzdEluZGV4fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb2Nlc3MgVVJMc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgJHtjYW5SZW1vdmUgPyBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlLWxpc3QtYnRuXCIgZGF0YS1hY3Rpb249XCJyZW1vdmUtbGlzdFwiIGRhdGEtbGlzdC1pbmRleD1cIiR7bGlzdEluZGV4fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuLWljb25cIj7wn5eR77iPPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlbW92ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIGAgOiAnJ31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuICQobGlzdEh0bWwpO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVSb3V0ZUlucHV0Um93SHRtbChsaXN0SW5kZXgsIHJvdXRlSW5kZXgsIHZhbHVlID0gJycpIHtcbiAgICAgICAgY29uc3QgY2FuUmVtb3ZlID0gdGhpcy5yb3V0ZUxpc3RzW2xpc3RJbmRleF0ucm91dGVzLmxlbmd0aCA+IDE7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdXRlLWlucHV0LXJvd1wiIGRhdGEtcm91dGUtaW5kZXg9XCIke3JvdXRlSW5kZXh9XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdXRlLW51bWJlclwiPiR7cm91dGVJbmRleCArIDF9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInVybFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJyb3V0ZS1pbnB1dFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJodHRwczovL2V4YW1wbGUuY29tL3BhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCIke3ZhbHVlfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWxpc3QtaW5kZXg9XCIke2xpc3RJbmRleH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1yb3V0ZS1pbmRleD1cIiR7cm91dGVJbmRleH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlJvdXRlICR7cm91dGVJbmRleCArIDF9IGZvciBsaXN0ICR7bGlzdEluZGV4ICsgMX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbGlkYXRpb24tbWVzc2FnZVwiIGlkPVwidmFsaWRhdGlvbiR7bGlzdEluZGV4fS0ke3JvdXRlSW5kZXh9XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdXRlLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgJHtjYW5SZW1vdmUgPyBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlLXJvdXRlLWJ0blwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWFjdGlvbj1cInJlbW92ZS1yb3V0ZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWxpc3QtaW5kZXg9XCIke2xpc3RJbmRleH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXJvdXRlLWluZGV4PVwiJHtyb3V0ZUluZGV4fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJSZW1vdmUgdGhpcyByb3V0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuLWljb25cIj7inJbvuI88L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgYCA6ICcnfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfVxuICAgIFxuICAgIGF0dGFjaFJvdXRlTGlzdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICAvLyBMaXN0IG5hbWUgaW5wdXRzXG4gICAgICAgICQoJy5saXN0LW5hbWUtaW5wdXQnKS5vZmYoJ2lucHV0Jykub24oJ2lucHV0JywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmlkLnJlcGxhY2UoJ2xpc3ROYW1lJywgJycpKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdE5hbWUobGlzdEluZGV4LCBlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gUm91dGUgaW5wdXRzIC0gdmFsaWRhdGlvbiBvbiBibHVyXG4gICAgICAgICQoJy5yb3V0ZS1pbnB1dCcpLm9mZignYmx1cicpLm9uKCdibHVyJywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVSb3V0ZShlLnRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gUm91dGUgaW5wdXRzIC0gcGFzdGUgZGV0ZWN0aW9uXG4gICAgICAgICQoJy5yb3V0ZS1pbnB1dCcpLm9mZigncGFzdGUnKS5vbigncGFzdGUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhhbmRsZVJvdXRlUGFzdGUoZS50YXJnZXQpLCAxMCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gUm91dGUgaW5wdXRzIC0gdmFsdWUgY2hhbmdlc1xuICAgICAgICAkKCcucm91dGUtaW5wdXQnKS5vZmYoJ2lucHV0Jykub24oJ2lucHV0JywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQubGlzdEluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdXRlSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZUxpc3RzW2xpc3RJbmRleF0ucm91dGVzW3JvdXRlSW5kZXhdID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQnV0dG9uIGFjdGlvbnMgdXNpbmcgZXZlbnQgZGVsZWdhdGlvblxuICAgICAgICAkKCcjcm91dGVMaXN0c0NvbnRhaW5lcicpLm9mZignY2xpY2snKS5vbignY2xpY2snLCAnYnV0dG9uW2RhdGEtYWN0aW9uXScsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBlLnRhcmdldC5jbG9zZXN0KCdidXR0b24nKS5kYXRhc2V0LmFjdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbicpLmRhdGFzZXQubGlzdEluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5jbG9zZXN0KCdidXR0b24nKS5kYXRhc2V0LnJvdXRlSW5kZXgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FkZC1saXN0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb3V0ZUxpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlLWxpc3QnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJvdXRlTGlzdChsaXN0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhZGQtcm91dGUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFJvdXRlKGxpc3RJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZS1yb3V0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUm91dGUobGlzdEluZGV4LCByb3V0ZUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJvY2Vzcy1idWxrJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzQnVsa0lucHV0KGxpc3RJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIEJ1bGsgaW5wdXQgdGV4dGFyZWFzXG4gICAgICAgICQoJy5idWxrLWlucHV0Jykub2ZmKCdpbnB1dCcpLm9uKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgICAgICAgICAvLyBDb3VsZCBhZGQgcmVhbC10aW1lIFVSTCBjb3VudGluZyBoZXJlXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gUnVuIEFuYWx5c2lzIGJ1dHRvblxuICAgICAgICAkKCcjcnVuQW5hbHlzaXNCdG4nKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGFydEFuYWx5c2lzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQ2FuY2VsIEFuYWx5c2lzIGJ1dHRvbiAgXG4gICAgICAgICQoJyNjYW5jZWxBbmFseXNpc0J0bicpLm9mZignY2xpY2snKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbEFuYWx5c2lzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gTmV3IEFuYWx5c2lzIGJ1dHRvblxuICAgICAgICAkKCcjbmV3QW5hbHlzaXNCdG4nKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGFydE5ld0FuYWx5c2lzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJSb3V0ZUlucHV0cyhsaXN0SW5kZXgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJvdXRlSW5wdXRzJHtsaXN0SW5kZXh9YCk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5yb3V0ZUxpc3RzW2xpc3RJbmRleF07XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgXG4gICAgICAgIGxpc3Qucm91dGVzLmZvckVhY2goKHJvdXRlLCByb3V0ZUluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZVJvdXRlSW5wdXRSb3cobGlzdEluZGV4LCByb3V0ZUluZGV4LCByb3V0ZSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZVJvdXRlSW5wdXRSb3cobGlzdEluZGV4LCByb3V0ZUluZGV4LCB2YWx1ZSA9ICcnKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByb3cuY2xhc3NOYW1lID0gJ3JvdXRlLWlucHV0LXJvdyc7XG4gICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcm91dGUtaW5kZXgnLCByb3V0ZUluZGV4KTtcbiAgICAgICAgXG4gICAgICAgIHJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm91dGUtbnVtYmVyXCI+JHtyb3V0ZUluZGV4ICsgMX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInVybFwiIFxuICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInJvdXRlLWlucHV0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9leGFtcGxlLmNvbS9wYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCIke3ZhbHVlfVwiXG4gICAgICAgICAgICAgICAgICAgICAgIGRhdGEtbGlzdD1cIiR7bGlzdEluZGV4fVwiXG4gICAgICAgICAgICAgICAgICAgICAgIGRhdGEtcm91dGU9XCIke3JvdXRlSW5kZXh9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlJvdXRlICR7cm91dGVJbmRleCArIDF9IGZvciBsaXN0ICR7bGlzdEluZGV4ICsgMX1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsaWRhdGlvbi1tZXNzYWdlXCIgaWQ9XCJ2YWxpZGF0aW9uJHtsaXN0SW5kZXh9LSR7cm91dGVJbmRleH1cIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdXRlLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAke3RoaXMucm91dGVMaXN0c1tsaXN0SW5kZXhdLnJvdXRlcy5sZW5ndGggPiAxID8gYFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlLXJvdXRlLWJ0blwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9XCJyb3V0ZU1hbmFnZXIucmVtb3ZlUm91dGUoJHtsaXN0SW5kZXh9LCAke3JvdXRlSW5kZXh9KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlJlbW92ZSB0aGlzIHJvdXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0bi1pY29uXCI+4pyW77iPPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICBgIDogJyd9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByb3c7XG4gICAgfVxuXG4gICAgLy8gMy4gQWRkIHRoaXMgbmV3IG1ldGhvZCBmb3IgU1NFIGNvbm5lY3Rpb24gbWFuYWdlbWVudFxuICAgIGFzeW5jIGVzdGFibGlzaFNTRUNvbm5lY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5SMIEVzdGFibGlzaGluZyBTU0UgY29ubmVjdGlvbi4uLicpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbm5lY3Rpb25TdGF0dXMoJ2Nvbm5lY3RpbmcnKTtcbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVTU0UoKTtcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemVTU0Ugd2lsbCB1cGRhdGUgc3RhdHVzIHRvICdjb25uZWN0ZWQnIHdoZW4gb25vcGVuIGZpcmVzXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZXN0YWJsaXNoIFNTRSBjb25uZWN0aW9uOicsIGVycm9yKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29ubmVjdGlvblN0YXR1cygnZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0gICAgXG5cbiAgICAvLyA0LiBBZGQgY29ubmVjdGlvbiBzdGF0dXMgbWFuYWdlbWVudFxuICAgIHVwZGF0ZUNvbm5lY3Rpb25TdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIHRoaXMuc3NlQ29ubmVjdGlvblN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy5zc2VDb25uZWN0ZWQgPSAoc3RhdHVzID09PSAnY29ubmVjdGVkJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygn8J+ToSBTU0UgQ29ubmVjdGlvbiBTdGF0dXM6Jywgc3RhdHVzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVwZGF0ZSBVSSBlbGVtZW50c1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbm5lY3Rpb25JbmRpY2F0b3Ioc3RhdHVzKTtcbiAgICAgICAgdGhpcy51cGRhdGVTdGFydEFuYWx5c2lzQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgLy8gNS4gQWRkIGNvbm5lY3Rpb24gaW5kaWNhdG9yIFVJIHVwZGF0ZXNcbiAgICB1cGRhdGVDb25uZWN0aW9uSW5kaWNhdG9yKHN0YXR1cykge1xuICAgICAgICAvLyBVcGRhdGUgY29ubmVjdGlvbiBzdGF0dXMgaW5kaWNhdG9yIGluIHRoZSBVSVxuICAgICAgICBjb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3NlQ29ubmVjdGlvbkluZGljYXRvcicpO1xuICAgICAgICBjb25zdCBzdGF0dXNUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NzZUNvbm5lY3Rpb25TdGF0dXMnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChpbmRpY2F0b3IgJiYgc3RhdHVzVGV4dCkge1xuICAgICAgICAgICAgaW5kaWNhdG9yLmNsYXNzTmFtZSA9IGBjb25uZWN0aW9uLWluZGljYXRvciAke3N0YXR1c31gO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBzdGF0dXNNZXNzYWdlcyA9IHtcbiAgICAgICAgICAgICAgICAnZGlzY29ubmVjdGVkJzogJ+KaqiBEaXNjb25uZWN0ZWQnLFxuICAgICAgICAgICAgICAgICdjb25uZWN0aW5nJzogJ/Cfn6EgQ29ubmVjdGluZy4uLicsXG4gICAgICAgICAgICAgICAgJ2Nvbm5lY3RlZCc6ICfwn5+iIENvbm5lY3RlZCcsXG4gICAgICAgICAgICAgICAgJ2Vycm9yJzogJ/CflLQgQ29ubmVjdGlvbiBFcnJvcidcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBzdGF0dXNNZXNzYWdlc1tzdGF0dXNdIHx8IHN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQWxzbyB1cGRhdGUgdGhlIHRlcm1pbmFsIGlmIGl0IGV4aXN0c1xuICAgICAgICBjb25zdCBzdGF0dXNNZXNzYWdlcyA9IHtcbiAgICAgICAgICAgICdjb25uZWN0aW5nJzogJ0VzdGFibGlzaGluZyBjb25uZWN0aW9uIHRvIGFuYWx5c2lzIHNlcnZpY2UuLi4nLFxuICAgICAgICAgICAgJ2Nvbm5lY3RlZCc6ICdDb25uZWN0ZWQgdG8gYW5hbHlzaXMgc2VydmljZSDinIUnLFxuICAgICAgICAgICAgJ2Vycm9yJzogJ0ZhaWxlZCB0byBjb25uZWN0IHRvIGFuYWx5c2lzIHNlcnZpY2Ug4p2MJyxcbiAgICAgICAgICAgICdkaXNjb25uZWN0ZWQnOiAnRGlzY29ubmVjdGVkIGZyb20gYW5hbHlzaXMgc2VydmljZSdcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzdGF0dXNNZXNzYWdlc1tzdGF0dXNdKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRlcm1pbmFsTGluZShzdGF0dXNNZXNzYWdlc1tzdGF0dXNdLCBzdGF0dXMgPT09ICdlcnJvcicgPyAnZXJyb3InIDogJ2luZm8nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlcGxhY2UgeW91ciB1cGRhdGVTdGFydEFuYWx5c2lzQnV0dG9uIG1ldGhvZCB3aXRoIHRoaXMgY29ycmVjdGVkIHZlcnNpb25cbiAgICB1cGRhdGVTdGFydEFuYWx5c2lzQnV0dG9uKCkge1xuICAgICAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdydW5BbmFseXNpc0J0bicpO1xuICAgICAgICBpZiAoIXN0YXJ0QnV0dG9uKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IHN0YXJ0QnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc3VidGl0bGUnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIE9ubHkgY2hlY2sgcm91dGVzIHZhbGlkaXR5IC0gbm90IFNTRSBjb25uZWN0aW9uXG4gICAgICAgIGlmICghdGhpcy5oYXNWYWxpZFJvdXRlcygpKSB7XG4gICAgICAgICAgICBzdGFydEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoc3VidGl0bGUpIHN1YnRpdGxlLnRleHRDb250ZW50ID0gJ0FkZCByb3V0ZXMgdG8gY29udGludWUnO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5wcm9jZXNzUnVubmluZykge1xuICAgICAgICAgICAgc3RhcnRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHN1YnRpdGxlKSBzdWJ0aXRsZS50ZXh0Q29udGVudCA9ICdBbmFseXNpcyBydW5uaW5nLi4uJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gRW5hYmxlIGJ1dHRvbiB3aGVuIHJvdXRlcyBhcmUgdmFsaWQsIHJlZ2FyZGxlc3Mgb2YgU1NFIHN0YXR1c1xuICAgICAgICBzdGFydEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB0b3RhbENvbXBhcmlzb25zID0gdGhpcy5jYWxjdWxhdGVUb3RhbENvbXBhcmlzb25zKCk7XG4gICAgICAgIGlmIChzdWJ0aXRsZSkgc3VidGl0bGUudGV4dENvbnRlbnQgPSBgUmVhZHkgLSAke3RvdGFsQ29tcGFyaXNvbnN9IGNvbXBhcmlzb24ocylgO1xuICAgIH1cblxuICAgIC8vIFJlcGxhY2UgeW91ciBzdGFydEFuYWx5c2lzIG1ldGhvZCB3aXRoIHRoaXMgZW5oYW5jZWQgdmVyc2lvblxuICAgIGFzeW5jIHN0YXJ0QW5hbHlzaXMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyBhbmFseXNpczogc3RhcnRBbmFseXNpcygpJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBWYWxpZGF0ZSBwcmVyZXF1aXNpdGVzXG4gICAgICAgIGlmICghdGhpcy5oYXNWYWxpZFJvdXRlcygpIHx8IHRoaXMucHJvY2Vzc1J1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU3dpdGNoIHRvIHByb2dyZXNzIHRhYiBmaXJzdFxuICAgICAgICB0aGlzLnN3aXRjaFRhYigncHJvZ3Jlc3MnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVwZGF0ZSBidXR0b24gdG8gc2hvdyB3ZSdyZSBjb25uZWN0aW5nXG4gICAgICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3J1bkFuYWx5c2lzQnRuJyk7XG4gICAgICAgIGNvbnN0IHN1YnRpdGxlID0gc3RhcnRCdXR0b24ucXVlcnlTZWxlY3RvcignLmJ0bi1zdWJ0aXRsZScpO1xuICAgICAgICBpZiAoc3RhcnRCdXR0b24pIHtcbiAgICAgICAgICAgIHN0YXJ0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzdWJ0aXRsZSkgc3VidGl0bGUudGV4dENvbnRlbnQgPSAnQ29ubmVjdGluZyB0byBzZXJ2aWNlLi4uJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdhaXQgZm9yIFNTRSBjb25uZWN0aW9uIHRvIGJlIGVzdGFibGlzaGVkXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3NlQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dhaXRpbmcgZm9yIFNTRSBjb25uZWN0aW9uLi4uJyk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy53YWl0Rm9yU1NFQ29ubmVjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgbG9jayBmaWxlXG4gICAgICAgICAgICBjb25zdCBsb2NrQ2hlY2sgPSBhd2FpdCBmZXRjaCgnL2FwaS9hbmFseXNpcy9sb2NrLWNoZWNrJyk7XG4gICAgICAgICAgICBjb25zdCBsb2NrU3RhdHVzID0gYXdhaXQgbG9ja0NoZWNrLmpzb24oKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGxvY2tTdGF0dXMubG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKCdBbm90aGVyIGFuYWx5c2lzIGlzIGN1cnJlbnRseSBydW5uaW5nLiBQbGVhc2Ugd2FpdC4nLCAnd2FybmluZycpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhcnRBbmFseXNpc0J1dHRvbigpOyAvLyBSZXNldCBidXR0b24gc3RhdGVcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyBhbmFseXNpcyB3aXRoIHZhbGlkIHJvdXRlczonLCB0aGlzLnJvdXRlTGlzdHMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTdGFydCB0aGUgYW5hbHlzaXMgKFNTRSBhbHJlYWR5IGNvbm5lY3RlZClcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvYW5hbHlzaXMvc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICByb3V0ZUxpc3RzOiB0aGlzLnJvdXRlTGlzdHMuZmlsdGVyKGxpc3QgPT4gXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnJvdXRlcy5zb21lKHJvdXRlID0+IHRoaXMuaXNWYWxpZEh0dHBVcmwocm91dGUpKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGdldCByZXBvcnRJZCBmcm9tIHJlc3BvbnNlXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3BvbnNlIGZyb20gYW5hbHlzaXMgc3RhcnQ6JywgZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydElkID0gZGF0YS5yZXBvcnRJZDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXBvcnQgSUQ6JywgdGhpcy5yZXBvcnRJZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBzdGFydCBhbmFseXNpcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvY2Vzc1N0YXR1cygncnVubmluZycpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGFydEFuYWx5c2lzQnV0dG9uKCk7IC8vIFVwZGF0ZSBidXR0b24gc3RhdGVcblxuICAgICAgICAgICAgdGhpcy5hZGRUZXJtaW5hbExpbmUoYEFuYWx5c2lzIHN0YXJ0ZWQgc3VjY2Vzc2Z1bGx5ISBSZXBvcnQgSUQ6ICR7dGhpcy5yZXBvcnRJZH0g8J+agGAsICdzdWNjZXNzJyk7XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHN0YXJ0aW5nIGFuYWx5c2lzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbignRmFpbGVkIHRvIHN0YXJ0IGFuYWx5c2lzLiBQbGVhc2UgdHJ5IGFnYWluLicsICdlcnJvcicpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGFydEFuYWx5c2lzQnV0dG9uKCk7IC8vIFJlc2V0IGJ1dHRvbiBzdGF0ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoaXMgbmV3IG1ldGhvZCB0byB3YWl0IGZvciBTU0UgY29ubmVjdGlvblxuICAgIGFzeW5jIHdhaXRGb3JTU0VDb25uZWN0aW9uKHRpbWVvdXQgPSAxNTAwMCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgYWxyZWFkeSBjb25uZWN0ZWQsIHJlc29sdmUgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIGlmICh0aGlzLnNzZUNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNldCB1cCB0aW1lb3V0XG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdTU0UgY29ubmVjdGlvbiB0aW1lb3V0JykpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENoZWNrIGNvbm5lY3Rpb24gc3RhdHVzIHBlcmlvZGljYWxseVxuICAgICAgICAgICAgY29uc3QgY2hlY2tDb25uZWN0aW9uID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNzZUNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjaGVja0Nvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgfSAgICBcblxuICAgIC8vIDcuIE1vZGlmaWVkIGluaXRpYWxpemVTU0UgbWV0aG9kIChyZW1vdmUgdGltZW91dCwgYWRkIHByb3BlciBzdGF0dXMgbWFuYWdlbWVudClcbiAgICBpbml0aWFsaXplU1NFKCkge1xuICAgICAgICBjb25zb2xlLmxvZygn8J+agCBpbml0aWFsaXplU1NFIGNhbGxlZCAtIHN0YXJ0aW5nIFNTRSBzZXR1cC4uLicpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50U291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ/CflIQgQ2xvc2luZyBleGlzdGluZyBFdmVudFNvdXJjZS4uLicpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTb3VyY2UuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jbGVhclNTRVRpbWVvdXRzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn5OhIENyZWF0aW5nIG5ldyBFdmVudFNvdXJjZSBmb3I6IC9hcGkvYW5hbHlzaXMvcHJvZ3Jlc3MnKTtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL2FwaS9hbmFseXNpcy9wcm9ncmVzcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ/Cfk6EgRXZlbnRTb3VyY2UgY3JlYXRlZCwgcmVhZHlTdGF0ZTonLCBzb3VyY2UucmVhZHlTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU2V0IGEgcmVhc29uYWJsZSBjb25uZWN0aW9uIHRpbWVvdXQgKDEwIHNlY29uZHMpXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25UaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+KPsCBTU0UgY29ubmVjdGlvbiB0aW1lb3V0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb25uZWN0aW9uU3RhdHVzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVGVybWluYWxMaW5lKCdDb25uZWN0aW9uIHRpbWVvdXQgLSBwbGVhc2UgY2hlY2sgeW91ciBuZXR3b3JrJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignU1NFIGNvbm5lY3Rpb24gdGltZW91dCcpKTtcbiAgICAgICAgICAgIH0sIDEwMDAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc291cmNlLm9ub3BlbiA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn46JIFNTRSBjb25uZWN0aW9uIG9wZW5lZCEnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jb25uZWN0aW9uVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbm5lY3Rpb25TdGF0dXMoJ2Nvbm5lY3RlZCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBY3Rpdml0eU1vbml0b3JpbmcoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzb3VyY2Uub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn5OoIFNTRSBtZXNzYWdlIHJlY2VpdmVkOicsIGRhdGEudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RIZWFydGJlYXQgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZpdHlUaW1lb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVByb2dyZXNzVXBkYXRlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBFcnJvciBwYXJzaW5nIFNTRSBkYXRhOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign4p2MIFJhdyBkYXRhIHRoYXQgZmFpbGVkOicsIGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNvdXJjZS5vbmVycm9yID0gKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign8J+SpSBTU0UgZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJTU0VUaW1lb3V0cygpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UucmVhZHlTdGF0ZSA9PT0gRXZlbnRTb3VyY2UuQ0xPU0VEKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn5SEIEV2ZW50U291cmNlIGNsb3NlZCwgd2lsbCBhdHRlbXB0IHJlY29ubmVjdC4uLicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbm5lY3Rpb25TdGF0dXMoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRUYWIgPT09ICdwcm9ncmVzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn8J+UhCBBdHRlbXB0aW5nIFNTRSByZWNvbm5lY3Rpb24uLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVzdGFibGlzaFNTRUNvbm5lY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdTU0UgY29ubmVjdGlvbiBmYWlsZWQnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn5OhIFNldHRpbmcgdGhpcy5ldmVudFNvdXJjZSB0byBuZXdseSBjcmVhdGVkIHNvdXJjZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ/Cfk6EgRXZlbnRTb3VyY2UgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIDguIEFkZCBkaXNjb25uZWN0IG1ldGhvZFxuICAgIGRpc2Nvbm5lY3RTU0UoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5SMIERpc2Nvbm5lY3RpbmcgU1NFLi4uJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5ldmVudFNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2xlYXJTU0VUaW1lb3V0cygpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbm5lY3Rpb25TdGF0dXMoJ2Rpc2Nvbm5lY3RlZCcpO1xuICAgIH1cblxuICAgIGhhbmRsZVByb2dyZXNzVXBkYXRlKGRhdGEpIHtcbiAgICAgICAgc3dpdGNoIChkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Nvbm5lY3RlZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUZXJtaW5hbExpbmUoZGF0YS5tZXNzYWdlLCAnaW5mbycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAnc3RhcnRlZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUZXJtaW5hbExpbmUoJ0FuYWx5c2lzIHByb2Nlc3Mgc3RhcnRlZCcsICdpbmZvJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlICdzdGF0dXMnOlxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBzdGF0dXMgdXBkYXRlcyBmcm9tIGJhY2tlbmRcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pc1J1bm5pbmcgIT09IHRoaXMucHJvY2Vzc1J1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUnVubmluZyA9IGRhdGEuaXNSdW5uaW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2Nlc3NTdGF0dXMoZGF0YS5pc1J1bm5pbmcgPyAncnVubmluZycgOiAnaWRsZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU92ZXJhbGxQcm9ncmVzcyhkYXRhLnBlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAnc3RlcCc6XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGVwUHJvZ3Jlc3MoZGF0YS5zdGVwLCBkYXRhLnN0YXR1cywgZGF0YS5wZXJjZW50YWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgJ3Rlcm1pbmFsJzpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRlcm1pbmFsTGluZShkYXRhLmNvbnRlbnQsIGRhdGEubGluZVR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAnY29tcGxldGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQW5hbHlzaXNDb21wbGV0ZShkYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFuYWx5c2lzRXJyb3IoZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlICdmaW5pc2hlZCc6XG4gICAgICAgICAgICAgICAgLy8gQmFja2VuZCBpcyBzaWduYWxpbmcgZW5kIG9mIFNTRSBzdHJlYW1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRlcm1pbmFsTGluZSgnQW5hbHlzaXMgc2Vzc2lvbiBlbmRlZCcsICdpbmZvJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclNTRVRpbWVvdXRzKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBBdXRvLXN3aXRjaCB0byByZXN1bHRzIGFmdGVyIGEgZGVsYXlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hUYWIoJ3Jlc3VsdHMnKTtcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAnaGVhcnRiZWF0JzpcbiAgICAgICAgICAgICAgICAvLyBKdXN0IGEga2VlcGFsaXZlLCBubyBhY3Rpb24gbmVlZGVkXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlY2VpdmVkIGhlYXJ0YmVhdCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAnZGVidWcnOlxuICAgICAgICAgICAgICAgIC8vIERlYnVnIG1lc3NhZ2VzIGZyb20gYmFja2VuZFxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVGVybWluYWxMaW5lKGBEZWJ1ZzogJHtkYXRhLm1lc3NhZ2V9YCwgJ2luZm8nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gU1NFIG1lc3NhZ2UgdHlwZTonLCBkYXRhLnR5cGUsIGRhdGEpO1xuICAgICAgICB9XG4gICAgfSAgXG5cbiAgICB1cGRhdGVPdmVyYWxsUHJvZ3Jlc3MocGVyY2VudGFnZSkge1xuICAgICAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVyYWxsUHJvZ3Jlc3NCYXInKTtcbiAgICAgICAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxsID0gcHJvZ3Jlc3NCYXIucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLWZpbGwnKTtcbiAgICAgICAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgICAgICAgICAgZmlsbC5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnRhZ2V9JWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2VFbCA9IHByb2dyZXNzQmFyLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLXBlcmNlbnRhZ2UnKTtcbiAgICAgICAgICAgIGlmIChwZXJjZW50YWdlRWwpIHtcbiAgICAgICAgICAgICAgICBwZXJjZW50YWdlRWwudGV4dENvbnRlbnQgPSBgJHtwZXJjZW50YWdlfSVgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVN0ZXBQcm9ncmVzcyhzdGVwS2V5LCBzdGF0dXMsIHBlcmNlbnRhZ2UgPSAwKSB7XG4gICAgICAgIGNvbnN0IHN0ZXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc3RlcD1cIiR7c3RlcEtleX1cIl1gKTtcbiAgICAgICAgaWYgKCFzdGVwRWxlbWVudCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVtb3ZlIHByZXZpb3VzIHN0YXR1cyBjbGFzc2VzXG4gICAgICAgIHN0ZXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3BlbmRpbmcnLCAncnVubmluZycsICdjb21wbGV0ZScsICdlcnJvcicpO1xuICAgICAgICBzdGVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0YXR1cyk7XG4gICAgICAgIFxuICAgICAgICAvLyBVcGRhdGUgcHJvZ3Jlc3MgYmFyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzRmlsbCA9IHN0ZXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGVwLXByb2dyZXNzLWZpbGwnKTtcbiAgICAgICAgaWYgKHByb2dyZXNzRmlsbCkge1xuICAgICAgICAgICAgcHJvZ3Jlc3NGaWxsLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudGFnZX0lYDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBhZGRUZXJtaW5hbExpbmUoY29udGVudCwgbGluZVR5cGUgPSAnaW5mbycpIHtcbiAgICAgICAgY29uc3QgdGVybWluYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVybWluYWxPdXRwdXQnKTtcbiAgICAgICAgaWYgKCF0ZXJtaW5hbCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsaW5lLmNsYXNzTmFtZSA9IGB0ZXJtaW5hbC1saW5lICR7bGluZVR5cGV9YDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gICAgICAgIGxpbmUuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsaW5lLXRpbWVzdGFtcFwiPiR7dGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGluZS1jb250ZW50XCI+JHt0aGlzLmVzY2FwZUh0bWwoY29udGVudCl9PC9zcGFuPlxuICAgICAgICBgO1xuICAgICAgICBcbiAgICAgICAgdGVybWluYWwuYXBwZW5kQ2hpbGQobGluZSk7XG4gICAgICAgIFxuICAgICAgICAvLyBBdXRvLXNjcm9sbCB0byBib3R0b21cbiAgICAgICAgdGVybWluYWwuc2Nyb2xsVG9wID0gdGVybWluYWwuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICBcbiAgICAgICAgLy8gTGltaXQgbnVtYmVyIG9mIGxpbmVzIHRvIHByZXZlbnQgbWVtb3J5IGlzc3Vlc1xuICAgICAgICBpZiAodGVybWluYWwuY2hpbGRyZW4ubGVuZ3RoID4gMTAwMCkge1xuICAgICAgICAgICAgdGVybWluYWwucmVtb3ZlQ2hpbGQodGVybWluYWwuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZXNjYXBlSHRtbCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQW5hbHlzaXNDb21wbGV0ZShkYXRhKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlUHJvY2Vzc1N0YXR1cygnY29tcGxldGUnKTtcbiAgICAgICAgdGhpcy5hZGRUZXJtaW5hbExpbmUoYCR7ZGF0YS5tZXNzYWdlfWAsICdzdWNjZXNzJyk7XG5cbiAgICAgICAgXG4gICAgICAgIC8vIEVuYWJsZSByZXN1bHRzIHRhYlxuICAgICAgICB0aGlzLnVwZGF0ZVRhYkF2YWlsYWJpbGl0eSgpO1xuICAgICAgICBcbiAgICAgICAgLy8gU2hvdyBub3RpZmljYXRpb25cbiAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKCdTQVIgY29tcGxldGVkISBWaWV3IHlvdXIgcmVzdWx0cy4nLCAnc3VjY2VzcycpOyAgICAgIFxuICAgIH1cbiAgICBcbiAgICBoYW5kbGVBbmFseXNpc0Vycm9yKGRhdGEpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb2Nlc3NTdGF0dXMoJ2lkbGUnKTtcbiAgICAgICAgdGhpcy5hZGRUZXJtaW5hbExpbmUoYOKdjCBFcnJvcjogJHtkYXRhLm1lc3NhZ2V9YCwgJ2Vycm9yJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5ldmVudFNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbihgQW5hbHlzaXMgZmFpbGVkOiAke2RhdGEubWVzc2FnZX1gLCAnZXJyb3InKTtcbiAgICB9XG4gICAgXG4gICAgYXN5bmMgY2FuY2VsQW5hbHlzaXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9jZXNzUnVubmluZykgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTU0VUaW1lb3V0cygpO1xuXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2FuYWx5c2lzL2NhbmNlbCcsIHsgbWV0aG9kOiAnUE9TVCcsIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LCBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHJlcG9ydElkOiB0aGlzLnJlcG9ydElkIH0pIH0pO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2FuY2VsIHJlc3BvbnNlOicsIGF3YWl0IHJlc3BvbnNlLmpzb24oKSk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIC8vIENsb3NlIFNTRSBjb25uZWN0aW9uIGZpcnN0XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9jZXNzU3RhdHVzKCdpZGxlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUZXJtaW5hbExpbmUoJ0FuYWx5c2lzIGNhbmNlbGxlZCBieSB1c2VyJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hUYWIoJ3NldHVwJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGNhbmNlbCBhbmFseXNpcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2FuY2VsbGluZyBhbmFseXNpczonLCBlcnJvcik7XG4gICAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oJ0ZhaWxlZCB0byBjYW5jZWwgYW5hbHlzaXMnLCAnZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1cGRhdGVQcm9jZXNzU3RhdHVzKHN0YXR1cykge1xuICAgICAgICBjb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzSW5kaWNhdG9yJyk7XG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzSWNvbicpO1xuICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXR1c1RleHQnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChpbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGluZGljYXRvci5jbGFzc05hbWUgPSBgc3RhdHVzLWluZGljYXRvciAke3N0YXR1c31gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzdGF0dXNDb25maWcgPSB7XG4gICAgICAgICAgICBpZGxlOiB7IGljb246ICfimqonLCB0ZXh0OiAnUmVhZHkgdG8gU3RhcnQnIH0sXG4gICAgICAgICAgICBydW5uaW5nOiB7IGljb246ICfwn5+hJywgdGV4dDogJ0FuYWx5c2lzIFJ1bm5pbmcnIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogeyBpY29uOiAn8J+foicsIHRleHQ6ICdBbmFseXNpcyBDb21wbGV0ZScgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY29uZmlnID0gc3RhdHVzQ29uZmlnW3N0YXR1c107XG4gICAgICAgIGlmIChjb25maWcgJiYgaWNvbiAmJiB0ZXh0KSB7XG4gICAgICAgICAgICBpY29uLnRleHRDb250ZW50ID0gY29uZmlnLmljb247XG4gICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gY29uZmlnLnRleHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gVGVybWluYWwgQ29udHJvbHNcbiAgICB0b2dnbGVUZXJtaW5hbCgpIHtcbiAgICAgICAgY29uc3QgdHVubmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlcm1pbmFsVHVubmVsJyk7XG4gICAgICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXJtaW5hbFRvZ2dsZScpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR1bm5lbCAmJiB0b2dnbGUpIHtcbiAgICAgICAgICAgIHR1bm5lbC5jbGFzc0xpc3QudG9nZ2xlKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBSZXN1bHRzIEZ1bmN0aW9uc1xuICAgIGFzeW5jIGRvd25sb2FkUmVwb3J0KCkge1xuICAgICAgICBpZiAoIXRoaXMucmVwb3J0SWQpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL3JlcG9ydHMvJHt0aGlzLnJlcG9ydElkfS9kb3dubG9hZGApO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgICAgIGEuaHJlZiA9IHVybDtcbiAgICAgICAgICAgICAgICBhLmRvd25sb2FkID0gYHJvdXRlLWNvbXBhcmlzb24tJHt0aGlzLnJlcG9ydElkfS56aXBgO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICAgICAgICAgICAgYS5jbGljaygpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRvd25sb2FkaW5nIHJlcG9ydDonLCBlcnJvcik7XG4gICAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oJ0ZhaWxlZCB0byBkb3dubG9hZCByZXBvcnQnLCAnZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGFydE5ld0FuYWx5c2lzKCkge1xuICAgICAgICAvLyBDbG9zZSBTU0UgaWYgb3BlblxuICAgICAgICBpZiAodGhpcy5ldmVudFNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhclNTRVRpbWVvdXRzKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBSZXNldCBzdGF0ZVxuICAgICAgICB0aGlzLnByb2Nlc3NSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJvY2Vzc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlcG9ydElkID0gbnVsbDtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uU3RhdGUuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5kdXBsaWNhdGVDb21wYXJpc29ucy5jbGVhcigpO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVzZXQgVUlcbiAgICAgICAgdGhpcy51cGRhdGVQcm9jZXNzU3RhdHVzKCdpZGxlJyk7XG4gICAgICAgIHRoaXMudXBkYXRlVGFiQXZhaWxhYmlsaXR5KCk7XG4gICAgICAgIHRoaXMuc3dpdGNoVGFiKCdzZXR1cCcpO1xuICAgICAgICBcbiAgICAgICAgLy8gQ2xlYXIgdGVybWluYWxcbiAgICAgICAgY29uc3QgdGVybWluYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVybWluYWxPdXRwdXQnKTtcbiAgICAgICAgaWYgKHRlcm1pbmFsKSB7XG4gICAgICAgICAgICB0ZXJtaW5hbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKCdSZWFkeSBmb3IgbmV3IGFuYWx5c2lzJywgJ2luZm8nKTtcbiAgICB9XG5cbiAgICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xuICAgIHNob3dOb3RpZmljYXRpb24obWVzc2FnZSwgdHlwZSA9ICdpbmZvJykge1xuICAgICAgICAvLyBDcmVhdGUgbm90aWZpY2F0aW9uIGVsZW1lbnRcbiAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5jbGFzc05hbWUgPSBgbm90aWZpY2F0aW9uIG5vdGlmaWNhdGlvbi0ke3R5cGV9YDtcbiAgICAgICAgbm90aWZpY2F0aW9uLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibm90aWZpY2F0aW9uLW1lc3NhZ2VcIj4ke21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm5vdGlmaWNhdGlvbi1jbG9zZVwiIG9uY2xpY2s9XCJ0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlKClcIj7DlzwvYnV0dG9uPlxuICAgICAgICBgO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIHRvIHBhZ2VcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdub3RpZmljYXRpb25Db250YWluZXInKTtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29udGFpbmVyLmlkID0gJ25vdGlmaWNhdGlvbkNvbnRhaW5lcic7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ25vdGlmaWNhdGlvbi1jb250YWluZXInO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEF1dG8tcmVtb3ZlIGFmdGVyIDUgc2Vjb25kc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChub3RpZmljYXRpb24ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwMCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlUmVzdWx0c1RhYigpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIHJlc3VsdHMgdGFiIHdpdGggcmVwb3J0IElEOicsIHRoaXMucmVwb3J0SWQpO1xuICAgIC8vICAgICBjb25zdCB2aWV3UmVwb3J0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdSZXBvcnRCdG4nKTtcbiAgICAvLyAgICAgY29uc3QgZG93bmxvYWRSZXBvcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG93bmxvYWRSZXBvcnRCdG4nKTtcblxuICAgIC8vICAgICBkb3dubG9hZFJlcG9ydEJ0bi5kaXNhYmxlZCA9ICF0aGlzLnByb2Nlc3NDb21wbGV0ZWQ7XG4gICAgLy8gICAgIHZpZXdSZXBvcnRCdG4uZGlzYWJsZWQgPSAhdGhpcy5wcm9jZXNzQ29tcGxldGVkO1xuICAgIC8vICAgICB2aWV3UmVwb3J0QnRuLmhyZWYgPSB0aGlzLnByb2Nlc3NDb21wbGV0ZWQgPyBgL3JlcG9ydC8ke3RoaXMucmVwb3J0SWR9L2AgOiAnIyc7XG5cbiAgICAvLyAgICAgLy8gQWRkIGxpIHRvIG5hdmlnYXRpb24gdWwgbGkuZHJvcGRvd24gdWwgZHJvcGRvd24tbWVudVxuICAgIC8vICAgICBjb25zdCBkcm9wRG93bk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbWVudScpO1xuICAgIC8vICAgICBpZiAoZHJvcERvd25NZW51KSB7XG4gICAgLy8gICAgICAgICBjb25zdCByZXBvcnRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAvLyAgICAgICAgIHJlcG9ydExpbmsuY2xhc3NOYW1lID0gJ25hdi1pdGVtJztcbiAgICAvLyAgICAgICAgIHJlcG9ydExpbmsuaW5uZXJIVE1MID0gYFxuICAgIC8vICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiL3JlcG9ydC8ke3RoaXMucmVwb3J0SWR9L1wiPlxuICAgIC8vICAgICAgICAgICAgICAgICBBbmFseXplICR7dGhpcy5yZXBvcnRJZC5yZXBsYWNlKCdhbmFseXplXycsICcnKX1cbiAgICAvLyAgICAgICAgICAgICA8L2E+XG4gICAgLy8gICAgICAgICBgO1xuICAgIC8vICAgICAgICAgZHJvcERvd25NZW51LnByZXBlbmQocmVwb3J0TGluayk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cblxuICAgIHVwZGF0ZVJlc3VsdHNUYWIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGluZyByZXN1bHRzIHRhYiB3aXRoIHJlcG9ydCBJRDonLCB0aGlzLnJlcG9ydElkKTtcbiAgICAgICAgXG4gICAgICAgIC8vIExvYWQgdGhlIGFjdHVhbCByZXBvcnQgZGF0YVxuICAgICAgICBpZiAodGhpcy5wcm9jZXNzQ29tcGxldGVkICYmIHRoaXMucmVwb3J0SWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFJlcG9ydERhdGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSBuYXZpZ2F0aW9uIGRyb3Bkb3duIChrZWVwIGV4aXN0aW5nIGNvZGUpXG4gICAgICAgIGNvbnN0IGRyb3BEb3duTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1tZW51Jyk7XG4gICAgICAgIGlmIChkcm9wRG93bk1lbnUgJiYgdGhpcy5yZXBvcnRJZCkge1xuICAgICAgICAgICAgY29uc3QgcmVwb3J0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICByZXBvcnRMaW5rLmNsYXNzTmFtZSA9ICduYXYtaXRlbSc7XG4gICAgICAgICAgICByZXBvcnRMaW5rLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj1cIi9yZXBvcnQvJHt0aGlzLnJlcG9ydElkfS9cIj5cbiAgICAgICAgICAgICAgICAgICAgQW5hbHl6ZSAke3RoaXMucmVwb3J0SWQucmVwbGFjZSgnYW5hbHl6ZV8nLCAnJyl9XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIGRyb3BEb3duTWVudS5wcmVwZW5kKHJlcG9ydExpbmspO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZmV0Y2hSZXBvcnRTdW1tYXJ5KCkge1xuICAgICAgICBpZiAoIXRoaXMucmVwb3J0SWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHJlcG9ydCBJRCBhdmFpbGFibGUgZm9yIHN1bW1hcnkgZmV0Y2gnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBzdW1tYXJ5IGRhdGEgZm9yIHJlcG9ydDogJHt0aGlzLnJlcG9ydElkfWApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL2FuYWx5c2lzL3JlcG9ydC8ke3RoaXMucmVwb3J0SWR9L3N1bW1hcnlgKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggcmVwb3J0IHN1bW1hcnk6JywgZXJyb3JEYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oYEZhaWxlZCB0byBsb2FkIHJlcG9ydCBzdW1tYXJ5OiAke2Vycm9yRGF0YS5tZXNzYWdlfWAsICdlcnJvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzdW1tYXJ5RGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXBvcnQgc3VtbWFyeSBsb2FkZWQgc3VjY2Vzc2Z1bGx5OicsIHN1bW1hcnlEYXRhKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHN1bW1hcnlEYXRhO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyByZXBvcnQgc3VtbWFyeTonLCBlcnJvcik7XG4gICAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oJ0ZhaWxlZCB0byBsb2FkIHJlcG9ydCBzdW1tYXJ5JywgJ2Vycm9yJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGxvYWRSZXBvcnREYXRhKCkge1xuICAgICAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgY29uc3QgcmVzdWx0c1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0cy1zZWN0aW9uJyk7XG4gICAgICAgIGlmIChyZXN1bHRzU2VjdGlvbikge1xuICAgICAgICAgICAgcmVzdWx0c1NlY3Rpb24uaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj5Mb2FkaW5nIHJlcG9ydCBkYXRhLi4uPC9kaXY+JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZldGNoIHRoZSBzdW1tYXJ5IGRhdGFcbiAgICAgICAgY29uc3Qgc3VtbWFyeURhdGEgPSBhd2FpdCB0aGlzLmZldGNoUmVwb3J0U3VtbWFyeSgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFzdW1tYXJ5RGF0YSkge1xuICAgICAgICAgICAgLy8gU2hvdyBlcnJvciBzdGF0ZVxuICAgICAgICAgICAgaWYgKHJlc3VsdHNTZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1NlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3Itc3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz7imqDvuI8gVW5hYmxlIHRvIExvYWQgUmVwb3J0IERhdGE8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+VGhlIHJlcG9ydCBhbmFseXNpcyBtYXkgc3RpbGwgYmUgcHJvY2Vzc2luZyBvciB0aGUgZmlsZXMgYXJlIG5vdCB5ZXQgYXZhaWxhYmxlLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2Vjb25kYXJ5XCIgb25jbGljaz1cInJvdXRlTWFuYWdlci5sb2FkUmVwb3J0RGF0YSgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4taWNvblwiPvCflIQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV0cnkgTG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdG9yZSB0aGUgZGF0YSBmb3IgdXNlIGluIHJlbmRlcmluZ1xuICAgICAgICB0aGlzLnJlcG9ydFN1bW1hcnlEYXRhID0gc3VtbWFyeURhdGE7XG4gICAgICAgIFxuICAgICAgICAvLyBSZW5kZXIgdGhlIHJlc3VsdHMgVUkgd2l0aCB0aGUgbG9hZGVkIGRhdGFcbiAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHRzV2l0aERhdGEoc3VtbWFyeURhdGEpO1xuICAgIH1cblxuICAgIHJlbmRlclJlc3VsdHNXaXRoRGF0YShzdW1tYXJ5RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVuZGVyaW5nIHJlc3VsdHMgd2l0aCBkYXRhOicsIHN1bW1hcnlEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJlc3VsdHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHMtc2VjdGlvbicpO1xuICAgICAgICBpZiAoIXJlc3VsdHNTZWN0aW9uKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgeyBkYXRhLCBhdmFpbGFibGVBbmFseXNpcywgcmVwb3J0SWQgfSA9IHN1bW1hcnlEYXRhO1xuICAgICAgICBjb25zdCBtYXN0ZXIgPSBkYXRhLm1hc3RlclN1bW1hcnk7XG4gICAgICAgIGNvbnN0IHNlbyA9IGRhdGEuc2VvU3VtbWFyeTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGRhdGEuY29udGVudFN1bW1hcnk7XG4gICAgICAgIGNvbnN0IHZpc3VhbCA9IGRhdGEudmlzdWFsU3VtbWFyeTtcbiAgICAgICAgY29uc3QgdGVjaG5pY2FsID0gZGF0YS50ZWNobmljYWxTdW1tYXJ5O1xuICAgICAgICBjb25zdCBtYXN0ZXJTY3JhcGluZyA9IGRhdGEubWFzdGVyU2NyYXBpbmc7XG5cbiAgICAgICAgcmVzdWx0c1NlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPCEtLSBSZXN1bHRzIEhlYWRlciAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHRzLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxoMj5BbmFseXNpcyBDb21wbGV0ZTwvaDI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdHMtbWV0YVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZXRhLWljb25cIj7wn5OLPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0OiAke3N1bW1hcnlEYXRhLnJlcG9ydElkLnJlcGxhY2UoJ2FuYWx5emVfJywgJycpfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1ldGEtaWNvblwiPvCflZI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAke25ldyBEYXRlKHN1bW1hcnlEYXRhLnRpbWVzdGFtcCkudG9Mb2NhbGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZXRhLWljb25cIj7wn5SXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgJHttYXN0ZXI/LnRvdGFsQ29tcGFyaXNvbnMgfHwgMH0gQ29tcGFyaXNvbnNcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwhLS0gUXVpY2sgT3ZlcnZpZXcgQ2FyZHMgLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcnZpZXctc2VjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInNlY3Rpb24tdGl0bGVcIj7wn5OKIEFuYWx5c2lzIE92ZXJ2aWV3PC9oMz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcnZpZXctY2FyZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJ2aWV3LWNhcmQgc2ltaWxhcml0eS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhcmQtaWNvblwiPvCfjq88L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJkLXRpdGxlXCI+U2ltaWxhcml0eSBEaXN0cmlidXRpb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaW1pbGFyaXR5LWNoYXJ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpbWlsYXJpdHktYmFyIGhpZ2hcIiBzdHlsZT1cImhlaWdodDogJHttYXN0ZXIgPyAobWFzdGVyLmhpZ2hTaW1pbGFyaXR5IC8gbWFzdGVyLnRvdGFsQ29tcGFyaXNvbnMgKiAxMDApIDogMH0lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmFyLXZhbHVlXCI+JHttYXN0ZXI/LmhpZ2hTaW1pbGFyaXR5IHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJhci1sYWJlbFwiPkhpZ2g8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpbWlsYXJpdHktYmFyIG1vZGVyYXRlXCIgc3R5bGU9XCJoZWlnaHQ6ICR7bWFzdGVyID8gKG1hc3Rlci5tb2RlcmF0ZVNpbWlsYXJpdHkgLyBtYXN0ZXIudG90YWxDb21wYXJpc29ucyAqIDEwMCkgOiAwfSVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYXItdmFsdWVcIj4ke21hc3Rlcj8ubW9kZXJhdGVTaW1pbGFyaXR5IHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJhci1sYWJlbFwiPk1vZGVyYXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaW1pbGFyaXR5LWJhciBsb3dcIiBzdHlsZT1cImhlaWdodDogJHttYXN0ZXIgPyAobWFzdGVyLmxvd1NpbWlsYXJpdHkgLyBtYXN0ZXIudG90YWxDb21wYXJpc29ucyAqIDEwMCkgOiAwfSVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYXItdmFsdWVcIj4ke21hc3Rlcj8ubG93U2ltaWxhcml0eSB8fCAwfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYXItbGFiZWxcIj5Mb3c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJ2aWV3LWNhcmQgc2VvLWNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FyZC1pY29uXCI+8J+UjTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhcmQtdGl0bGVcIj5TRU8gUmlzayBBc3Nlc3NtZW50PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VvLXJpc2stY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaXNrLWxldmVsICR7bWFzdGVyPy50b3BTaW1pbGFyaXRpZXM/LlswXT8uc2VvUmlzaz8udG9Mb3dlckNhc2UoKSB8fCAnbG93J31cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHttYXN0ZXI/LnRvcFNpbWlsYXJpdGllcz8uWzBdPy5zZW9SaXNrIHx8ICdVTktOT1dOJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlzay1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaXNrLXN0YXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmlzay1udW1iZXJcIj4ke3Nlbz8ub3ZlcnZpZXc/LmNyaXRpY2FsSXNzdWVzIHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyaXNrLWxhYmVsXCI+Q3JpdGljYWwgSXNzdWVzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpc2stc3RhdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyaXNrLW51bWJlclwiPiR7c2VvPy5vdmVydmlldz8uaGlnaFByaW9yaXR5SXNzdWVzIHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyaXNrLWxhYmVsXCI+SGlnaCBQcmlvcml0eTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJ2aWV3LWNhcmQgYW5hbHlzaXMtY29tcGxldGVuZXNzLWNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FyZC1pY29uXCI+4pyFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FyZC10aXRsZVwiPkFuYWx5c2lzIENvbXBsZXRlbmVzczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbXBsZXRlbmVzcy1ncmlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbXBsZXRlbmVzcy1pdGVtICR7YXZhaWxhYmxlQW5hbHlzaXMudmlzdWFsID8gJ2NvbXBsZXRlJyA6ICdpbmNvbXBsZXRlJ31cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb21wbGV0ZW5lc3MtaWNvblwiPiR7YXZhaWxhYmxlQW5hbHlzaXMudmlzdWFsID8gJ+KchScgOiAn4p2MJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29tcGxldGVuZXNzLWxhYmVsXCI+VmlzdWFsPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21wbGV0ZW5lc3MtaXRlbSAke2F2YWlsYWJsZUFuYWx5c2lzLmNvbnRlbnQgPyAnY29tcGxldGUnIDogJ2luY29tcGxldGUnfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbXBsZXRlbmVzcy1pY29uXCI+JHthdmFpbGFibGVBbmFseXNpcy5jb250ZW50ID8gJ+KchScgOiAn4p2MJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29tcGxldGVuZXNzLWxhYmVsXCI+Q29udGVudDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tcGxldGVuZXNzLWl0ZW0gJHthdmFpbGFibGVBbmFseXNpcy50ZWNobmljYWwgPyAnY29tcGxldGUnIDogJ2luY29tcGxldGUnfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbXBsZXRlbmVzcy1pY29uXCI+JHthdmFpbGFibGVBbmFseXNpcy50ZWNobmljYWwgPyAn4pyFJyA6ICfinYwnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb21wbGV0ZW5lc3MtbGFiZWxcIj5UZWNobmljYWw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbXBsZXRlbmVzcy1pdGVtICR7YXZhaWxhYmxlQW5hbHlzaXMuc2VvID8gJ2NvbXBsZXRlJyA6ICdpbmNvbXBsZXRlJ31cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb21wbGV0ZW5lc3MtaWNvblwiPiR7YXZhaWxhYmxlQW5hbHlzaXMuc2VvID8gJ+KchScgOiAn4p2MJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29tcGxldGVuZXNzLWxhYmVsXCI+U0VPPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwhLS0gRGV0YWlsZWQgQW5hbHlzaXMgU2NvcmVzIC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjb3Jlcy1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPvCfk4ggQW5hbHlzaXMgU2NvcmVzPC9oMz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2NvcmVzLWdyaWRcIj5cbiAgICAgICAgICAgICAgICAgICAgJHtjb250ZW50Py5yZXN1bHRzPy5bMF0gPyBgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY29yZS1jYXJkIGNvbnRlbnQtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY29yZS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNjb3JlLWljb25cIj7wn5OdPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2NvcmUtdGl0bGVcIj5Db250ZW50IEFuYWx5c2lzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2NvcmUtdmFsdWVcIj4ke01hdGgucm91bmQoY29udGVudC5yZXN1bHRzWzBdLmF2Z1Njb3JlICogMTAwKX0lPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2NvcmUtYnJlYWtkb3duXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJyZWFrZG93bi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnJlYWtkb3duLWxhYmVsXCI+SmFjY2FyZCBTaW1pbGFyaXR5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJlYWtkb3duLWJhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJyZWFrZG93bi1maWxsXCIgc3R5bGU9XCJ3aWR0aDogJHtjb250ZW50LnJlc3VsdHNbMF0ubWV0cmljcy5qYWNjYXJkICogMTAwfSVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnJlYWtkb3duLXZhbHVlXCI+JHtNYXRoLnJvdW5kKGNvbnRlbnQucmVzdWx0c1swXS5tZXRyaWNzLmphY2NhcmQgKiAxMDApfSU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJyZWFrZG93bi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnJlYWtkb3duLWxhYmVsXCI+U2VtYW50aWMgTWF0Y2g8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJicmVha2Rvd24tYmFyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJlYWtkb3duLWZpbGxcIiBzdHlsZT1cIndpZHRoOiAke2NvbnRlbnQucmVzdWx0c1swXS5tZXRyaWNzLnNlbWFudGljICogMTAwfSVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnJlYWtkb3duLXZhbHVlXCI+JHtNYXRoLnJvdW5kKGNvbnRlbnQucmVzdWx0c1swXS5tZXRyaWNzLnNlbWFudGljICogMTAwKX0lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmAgOiAnJ31cblxuICAgICAgICAgICAgICAgICAgICAke3Zpc3VhbD8ucmVzdWx0cz8uWzBdID8gYFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2NvcmUtY2FyZCB2aXN1YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY29yZS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNjb3JlLWljb25cIj7wn46oPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2NvcmUtdGl0bGVcIj5WaXN1YWwgQW5hbHlzaXM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY29yZS12YWx1ZVwiPiR7TWF0aC5yb3VuZCh2aXN1YWwucmVzdWx0c1swXS5hdmdTY29yZSAqIDEwMCl9JTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjb3JlLWJyZWFrZG93blwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJicmVha2Rvd24taXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJyZWFrZG93bi1sYWJlbFwiPkxheW91dCBTaW1pbGFyaXR5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJlYWtkb3duLWJhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJyZWFrZG93bi1maWxsXCIgc3R5bGU9XCJ3aWR0aDogJHt2aXN1YWwucmVzdWx0c1swXS5tZXRyaWNzLmxheW91dCAqIDEwMH0lXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJyZWFrZG93bi12YWx1ZVwiPiR7TWF0aC5yb3VuZCh2aXN1YWwucmVzdWx0c1swXS5tZXRyaWNzLmxheW91dCAqIDEwMCl9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJlYWtkb3duLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJicmVha2Rvd24tbGFiZWxcIj5UeXBvZ3JhcGh5IE1hdGNoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJlYWtkb3duLWJhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJyZWFrZG93bi1maWxsXCIgc3R5bGU9XCJ3aWR0aDogJHt2aXN1YWwucmVzdWx0c1swXS5tZXRyaWNzLnR5cG9ncmFwaHkgKiAxMDB9JVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJicmVha2Rvd24tdmFsdWVcIj4ke01hdGgucm91bmQodmlzdWFsLnJlc3VsdHNbMF0ubWV0cmljcy50eXBvZ3JhcGh5ICogMTAwKX0lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmAgOiAnJ31cblxuICAgICAgICAgICAgICAgICAgICAke3RlY2huaWNhbD8ucmVzdWx0cz8uWzBdID8gYFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2NvcmUtY2FyZCB0ZWNobmljYWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY29yZS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNjb3JlLWljb25cIj7impnvuI88L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzY29yZS10aXRsZVwiPlRlY2huaWNhbCBBbmFseXNpczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjb3JlLXZhbHVlXCI+JHtNYXRoLnJvdW5kKHRlY2huaWNhbC5yZXN1bHRzWzBdLmF2Z1Njb3JlICogMTAwKX0lPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2NvcmUtYnJlYWtkb3duXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJyZWFrZG93bi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnJlYWtkb3duLWxhYmVsXCI+SFRNTCBTdHJ1Y3R1cmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJicmVha2Rvd24tYmFyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJlYWtkb3duLWZpbGxcIiBzdHlsZT1cIndpZHRoOiAke3RlY2huaWNhbC5yZXN1bHRzWzBdLmRldGFpbGVkU2NvcmVzLmh0bWxTdHJ1Y3R1cmUgKiAxMDB9JVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJicmVha2Rvd24tdmFsdWVcIj4ke01hdGgucm91bmQodGVjaG5pY2FsLnJlc3VsdHNbMF0uZGV0YWlsZWRTY29yZXMuaHRtbFN0cnVjdHVyZSAqIDEwMCl9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJlYWtkb3duLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJicmVha2Rvd24tbGFiZWxcIj5NZXRhIFRhZ3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJicmVha2Rvd24tYmFyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJlYWtkb3duLWZpbGxcIiBzdHlsZT1cIndpZHRoOiAke3RlY2huaWNhbC5yZXN1bHRzWzBdLmRldGFpbGVkU2NvcmVzLm1ldGFUYWdzICogMTAwfSVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnJlYWtkb3duLXZhbHVlXCI+JHtNYXRoLnJvdW5kKHRlY2huaWNhbC5yZXN1bHRzWzBdLmRldGFpbGVkU2NvcmVzLm1ldGFUYWdzICogMTAwKX0lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmAgOiAnJ31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8IS0tIEltYWdlcyBTZWN0aW9uIC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlcy1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPvCflrzvuI8gVmlzdWFsIFNjcmVlbnNob3RzIENvbXBhcmlzb248L2gzPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZXMtZ3JpZFwiPiBcbiAgICAgICAgICAgICAgICAgICAgJHttYXN0ZXJTY3JhcGluZy5zY3JhcGVkX3NpdGVzLmxlbmd0aCA/IG1hc3RlclNjcmFwaW5nLnNjcmFwZWRfc2l0ZXMubWFwKHNpdGUgPT4gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLWNhcmRcIj4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+JHtzaXRlLmRpcmVjdG9yeX08L2k+ICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjcmVlbnNob3QtbW9ja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9jay1icm93c2VyIHNob3ctc2Nyb2xsYmFyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJvd3Nlci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJvd3Nlci1jb250cm9sc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbnRyb2wgcmVkXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbnRyb2wgeWVsbG93XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbnRyb2wgZ3JlZW5cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVybC1iYXJcIj4ke3NpdGUucGFnZXNbMF0ucGFnZUlkfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnJvd3Nlci1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCIvXy9yZXBvcnQvJHtyZXBvcnRJZH0vJHtzaXRlLmRpcmVjdG9yeX0vJHtzaXRlLnBhZ2VzWzBdLnBhZ2VJZH0vc2NyZWVuc2hvdC5wbmdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YCkuam9pbignJykgOiBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm8taW1hZ2VzXCI+Tm8gaW1hZ2VzIGF2YWlsYWJsZSBmb3IgdGhpcyByZXBvcnQuPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPCEtLSBLZXkgSW5zaWdodHMgLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5zaWdodHMtc2VjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInNlY3Rpb24tdGl0bGVcIj7wn5KhIEtleSBJbnNpZ2h0czwvaDM+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluc2lnaHRzLWdyaWRcIj5cbiAgICAgICAgICAgICAgICAgICAgJHt2aXN1YWw/LnJlc3VsdHM/LlswXT8udG9wSW5zaWdodHMgPyBgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnNpZ2h0LWNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnNpZ2h0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5zaWdodC1pY29uXCI+8J+OqDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluc2lnaHQtdGl0bGVcIj5WaXN1YWwgRGVzaWduPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJpbnNpZ2h0LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Zpc3VhbC5yZXN1bHRzWzBdLnRvcEluc2lnaHRzLm1hcChpbnNpZ2h0ID0+IGA8bGk+JHtpbnNpZ2h0fTwvbGk+YCkuam9pbignJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gIDogJyd9XG5cbiAgICAgICAgICAgICAgICAgICAgJHttYXN0ZXI/LnRvcFNpbWlsYXJpdGllcz8uWzBdID8gYFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5zaWdodC1jYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5zaWdodC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluc2lnaHQtaWNvblwiPvCflI08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnNpZ2h0LXRpdGxlXCI+U2ltaWxhcml0eSBBbmFseXNpczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpbWlsYXJpdHktaW5zaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaW1pbGFyaXR5LXNjb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7TWF0aC5yb3VuZChtYXN0ZXIudG9wU2ltaWxhcml0aWVzWzBdLnNjb3JlICogMTAwKX0lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpbWlsYXJpdHktY2xhc3NpZmljYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHttYXN0ZXIudG9wU2ltaWxhcml0aWVzWzBdLmNsYXNzaWZpY2F0aW9uLnJlcGxhY2UoL18vZywgJyAnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2ltaWxhcml0eS1jb21wYXJpc29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7bWFzdGVyLnRvcFNpbWlsYXJpdGllc1swXS5jb21wYXJpc29uLnNwbGl0KCdfdnNfJykubWFwKHNpdGUgPT4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLnJlcGxhY2UoL18vZywgJyAnKS5yZXBsYWNlKC9jb20gXFxkKy8sICcuY29tJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5qb2luKCcgdnMgJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YCA6ICcnfVxuXG4gICAgICAgICAgICAgICAgICAgICR7Y29udGVudD8uZ2xvYmFsU3RhdHMgPyBgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnNpZ2h0LWNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnNpZ2h0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5zaWdodC1pY29uXCI+4pqhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5zaWdodC10aXRsZVwiPlBlcmZvcm1hbmNlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVyZm9ybWFuY2Utc3RhdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVyZi1zdGF0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGVyZi12YWx1ZVwiPiR7Y29udGVudC5nbG9iYWxTdGF0cy50b3RhbFByb2Nlc3NpbmdUaW1lfXM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGVyZi1sYWJlbFwiPlByb2Nlc3NpbmcgVGltZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVyZi1zdGF0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGVyZi12YWx1ZVwiPiR7TWF0aC5yb3VuZChjb250ZW50Lmdsb2JhbFN0YXRzLnByb2Nlc3NpbmdTcGVlZCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBlcmYtbGFiZWxcIj5QYWdlcy9NaW48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YCA6ICcnfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwhLS0gQWN0aW9ucyAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHRzLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3JlcG9ydC8ke3N1bW1hcnlEYXRhLnJlcG9ydElkfS9cIiBjbGFzcz1cImJ0bi1wcmltYXJ5IHZpZXctcmVwb3J0LWJ0blwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0bi1pY29uXCI+8J+ThDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgVmlldyBGdWxsIFJlcG9ydFxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLXNlY29uZGFyeSBuZXctYW5hbHlzaXMtYnRuXCIgaWQ9XCJuZXdBbmFseXNpc0J0blwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0bi1pY29uXCI+8J+UhDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgTmV3IEFuYWx5c2lzXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICAvLyBSZS1hdHRhY2ggZXZlbnQgbGlzdGVuZXJzIGFuZCBpbml0aWFsaXplIGFuaW1hdGlvbnNcbiAgICAgICAgdGhpcy5pbml0aWFsaXplUmVzdWx0c0ludGVyYWN0aW9ucygpO1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGlzIG1ldGhvZCBmb3IgYW5pbWF0aW9uc1xuICAgIC8vIEFkZCB0aGVzZSBhZGRpdGlvbmFsIEphdmFTY3JpcHQgZnVuY3Rpb25zIHRvIHJ1bl9yZXBvcnQuanNcbiAgICAvLyBUaGVzZSBlbmhhbmNlIHRoZSByZXN1bHRzIGludGVyZmFjZSB3aXRoIG1vcmUgaW50ZXJhY3Rpdml0eVxuXG4gICAgLy8gRW5oYW5jZWQgYW5pbWF0aW9uIG1ldGhvZCB3aXRoIGJldHRlciB0aW1pbmcgYW5kIGVmZmVjdHNcbiAgICBhbmltYXRlUmVzdWx0cygpIHtcbiAgICAgICAgLy8gU2V0IENTUyBjdXN0b20gcHJvcGVydGllcyBmb3IgdGFyZ2V0IHdpZHRocyBvbiBicmVha2Rvd24gYmFyc1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnJlYWtkb3duLWZpbGwnKS5mb3JFYWNoKGZpbGwgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0V2lkdGggPSBmaWxsLnN0eWxlLndpZHRoO1xuICAgICAgICAgICAgZmlsbC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10YXJnZXQtd2lkdGgnLCB0YXJnZXRXaWR0aCk7XG4gICAgICAgICAgICBmaWxsLnN0eWxlLndpZHRoID0gJzAnOyAvLyBSZXNldCB0byAwIGZvciBhbmltYXRpb25cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQW5pbWF0ZSBzaW1pbGFyaXR5IGJhcnMgd2l0aCBzdGFnZ2VyZWQgdGltaW5nXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbWlsYXJpdHktYmFyJykuZm9yRWFjaCgoYmFyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBiYXIuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1pbicpO1xuICAgICAgICAgICAgICAgIH0sIGluZGV4ICogMjAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgIC8vIEFuaW1hdGUgb3ZlcnZpZXcgY2FyZHMgd2l0aCBzdGFnZ2VyZWQgZW50cmFuY2VcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3ZlcnZpZXctY2FyZCcpLmZvckVhY2goKGNhcmQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnc2xpZGUtaW4nKTtcbiAgICAgICAgICAgICAgICB9LCBpbmRleCAqIDE1MCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMzAwKTtcblxuICAgICAgICAvLyBBbmltYXRlIHNjb3JlIGNhcmRzXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjb3JlLWNhcmQnKS5mb3JFYWNoKChjYXJkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ3NsaWRlLWluJyk7XG4gICAgICAgICAgICAgICAgfSwgaW5kZXggKiAyMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDYwMCk7XG5cbiAgICAgICAgLy8gQW5pbWF0ZSBicmVha2Rvd24gYmFycyBhZnRlciBzY29yZSBjYXJkcyBhcmUgdmlzaWJsZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5icmVha2Rvd24tZmlsbCcpLmZvckVhY2goKGZpbGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGwuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1pbicpO1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHRhcmdldCB3aWR0aCBmb3IgYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFdpZHRoID0gZmlsbC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykubWF0Y2goL3dpZHRoOlxccyooW147XSspLyk/LlsxXSB8fCAnMCUnO1xuICAgICAgICAgICAgICAgICAgICBmaWxsLnN0eWxlLndpZHRoID0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgfSwgaW5kZXggKiAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgIC8vIEFuaW1hdGUgYWN0aW9uIGl0ZW1zXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGlvbi1pdGVtJykuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZS1pbicpO1xuICAgICAgICAgICAgICAgIH0sIGluZGV4ICogMTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxMjAwKTtcblxuICAgICAgICAvLyBBbmltYXRlIGluc2lnaHQgY2FyZHNcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zaWdodC1jYXJkJykuZm9yRWFjaCgoY2FyZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdzbGlkZS1pbicpO1xuICAgICAgICAgICAgICAgIH0sIGluZGV4ICogMTUwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxNDAwKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgbWV0aG9kIHRvIGdldCByaXNrIGxldmVsIGNvbG9yIGNsYXNzZXNcbiAgICBnZXRSaXNrTGV2ZWxDbGFzcyhyaXNrTGV2ZWwpIHtcbiAgICAgICAgc3dpdGNoKHJpc2tMZXZlbD8udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgY2FzZSAnaGlnaCc6XG4gICAgICAgICAgICBjYXNlICdjcml0aWNhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdoaWdoJztcbiAgICAgICAgICAgIGNhc2UgJ21lZGl1bSc6XG4gICAgICAgICAgICBjYXNlICdtb2RlcmF0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdtZWRpdW0nO1xuICAgICAgICAgICAgY2FzZSAnbG93JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xvdyc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbG93JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBtZXRob2QgdG8gZm9ybWF0IHNpdGUgbmFtZXMgZm9yIGRpc3BsYXlcbiAgICBmb3JtYXRTaXRlTmFtZShzaXRlTmFtZSkge1xuICAgICAgICBpZiAoIXNpdGVOYW1lKSByZXR1cm4gJ1Vua25vd24gU2l0ZSc7XG4gICAgICAgIFxuICAgICAgICAvLyBSZW1vdmUgdGltZXN0YW1wIGFuZCBjb252ZXJ0IHVuZGVyc2NvcmVzIHRvIHNwYWNlc1xuICAgICAgICByZXR1cm4gc2l0ZU5hbWVcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fXFxkezR9XFxkezJ9XFxkezJ9X1xcZHs0fSQvLCAnJykgLy8gUmVtb3ZlIHRpbWVzdGFtcCBwYXR0ZXJuXG4gICAgICAgICAgICAucmVwbGFjZSgvXy9nLCAnICcpXG4gICAgICAgICAgICAucmVwbGFjZSgvY29tJC8sICcuY29tJylcbiAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAubWFwKHdvcmQgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpXG4gICAgICAgICAgICAuam9pbignICcpO1xuICAgIH1cblxuICAgIC8vIEFkZCBtZXRob2QgdG8gZ2V0IHNjb3JlIGNvbG9yIGJhc2VkIG9uIHBlcmNlbnRhZ2VcbiAgICBnZXRTY29yZUNvbG9yKHNjb3JlKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBNYXRoLnJvdW5kKHNjb3JlICogMTAwKTtcbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPj0gODApIHJldHVybiAnIzI3YWU2MCc7IC8vIEdyZWVuXG4gICAgICAgIGlmIChwZXJjZW50YWdlID49IDYwKSByZXR1cm4gJyNmMzljMTInOyAvLyBPcmFuZ2VcbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPj0gNDApIHJldHVybiAnI2U2N2UyMic7IC8vIERhcmsgb3JhbmdlXG4gICAgICAgIHJldHVybiAnI2U3NGMzYyc7IC8vIFJlZFxuICAgIH1cblxuICAgIC8vIEFkZCBtZXRob2QgdG8gY3JlYXRlIGFuaW1hdGVkIGNvdW50ZXJzIGZvciBudW1iZXJzXG4gICAgYW5pbWF0ZUNvdW50ZXIoZWxlbWVudCwgdGFyZ2V0VmFsdWUsIGR1cmF0aW9uID0gMTAwMCwgc3VmZml4ID0gJycpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzdGFydFZhbHVlID0gMDtcbiAgICAgICAgY29uc3QgaW5jcmVtZW50ID0gdGFyZ2V0VmFsdWUgLyAoZHVyYXRpb24gLyAxNik7IC8vIDYwZnBzXG4gICAgICAgIGxldCBjdXJyZW50VmFsdWUgPSBzdGFydFZhbHVlO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50VmFsdWUgKz0gaW5jcmVtZW50O1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA+PSB0YXJnZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IHRhcmdldFZhbHVlO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSBNYXRoLnJvdW5kKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gZGlzcGxheVZhbHVlICsgc3VmZml4O1xuICAgICAgICB9LCAxNik7XG4gICAgfVxuXG4gICAgLy8gQWRkIG1ldGhvZCB0byBoYW5kbGUgcmVzcG9uc2l2ZSBjaGFydCBhZGp1c3RtZW50c1xuICAgIGFkanVzdENoYXJ0c0ZvclZpZXdwb3J0KCkge1xuICAgICAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5pbm5lcldpZHRoIDw9IDQ4MDtcbiAgICAgICAgY29uc3QgaXNUYWJsZXQgPSB3aW5kb3cuaW5uZXJXaWR0aCA8PSA4MzI7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGp1c3Qgc2ltaWxhcml0eSBjaGFydCBoZWlnaHQgZm9yIG1vYmlsZVxuICAgICAgICBjb25zdCBzaW1pbGFyaXR5Q2hhcnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbWlsYXJpdHktY2hhcnQnKTtcbiAgICAgICAgc2ltaWxhcml0eUNoYXJ0cy5mb3JFYWNoKGNoYXJ0ID0+IHtcbiAgICAgICAgICAgIGlmIChpc01vYmlsZSkge1xuICAgICAgICAgICAgICAgIGNoYXJ0LnN0eWxlLmhlaWdodCA9ICcxMDBweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoYXJ0LnN0eWxlLmhlaWdodCA9ICcxMjBweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRqdXN0IHNjb3JlIGNhcmQgZm9udCBzaXplc1xuICAgICAgICBjb25zdCBzY29yZVZhbHVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY29yZS12YWx1ZScpO1xuICAgICAgICBzY29yZVZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmIChpc01vYmlsZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzIuNXJlbSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzNyZW0nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgbWV0aG9kIHRvIGNyZWF0ZSB0b29sdGlwIGZ1bmN0aW9uYWxpdHlcbiAgICBpbml0aWFsaXplVG9vbHRpcHMoKSB7XG4gICAgICAgIC8vIEFkZCB0b29sdGlwcyB0byBicmVha2Rvd24gYmFyc1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnJlYWtkb3duLWl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5icmVha2Rvd24tbGFiZWwnKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYnJlYWtkb3duLXZhbHVlJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChsYWJlbCAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBgJHtsYWJlbC50ZXh0Q29udGVudH06ICR7dmFsdWUudGV4dENvbnRlbnR9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgdG9vbHRpcHMgdG8gc2ltaWxhcml0eSBiYXJzXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaW1pbGFyaXR5LWJhcicpLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gYmFyLnF1ZXJ5U2VsZWN0b3IoJy5iYXItdmFsdWUnKTtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gYmFyLnF1ZXJ5U2VsZWN0b3IoJy5iYXItbGFiZWwnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHZhbHVlICYmIGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgYmFyLnRpdGxlID0gYCR7bGFiZWwudGV4dENvbnRlbnR9IFNpbWlsYXJpdHk6ICR7dmFsdWUudGV4dENvbnRlbnR9IGNvbXBhcmlzb25zYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIG1ldGhvZCB0byBoYW5kbGUgcHJpbnQtZnJpZW5kbHkgdmlld1xuICAgIHByZXBhcmVQcmludFZpZXcoKSB7XG4gICAgICAgIC8vIEFkZCBwcmludCBzdHlsZXMgZHluYW1pY2FsbHlcbiAgICAgICAgY29uc3QgcHJpbnRTdHlsZXMgPSBgXG4gICAgICAgICAgICBAbWVkaWEgcHJpbnQge1xuICAgICAgICAgICAgICAgIC5yZXN1bHRzLXNlY3Rpb24ge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC5vdmVydmlldy1jYXJkLFxuICAgICAgICAgICAgICAgIC5zY29yZS1jYXJkLFxuICAgICAgICAgICAgICAgIC5pbnNpZ2h0LWNhcmQsXG4gICAgICAgICAgICAgICAgLmFjdGlvbi1pdGVtIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWstaW5zaWRlOiBhdm9pZDtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC5yZXN1bHRzLWFjdGlvbnMge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC5zaW1pbGFyaXR5LWJhcixcbiAgICAgICAgICAgICAgICAuYnJlYWtkb3duLWZpbGwge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMzMzICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBgO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gcHJpbnRTdHlsZXM7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIGluaXRpYWxpemVSZXN1bHRzSW50ZXJhY3Rpb25zIG1ldGhvZCB0byBpbmNsdWRlIG5ldyBmZWF0dXJlc1xuICAgIGluaXRpYWxpemVSZXN1bHRzSW50ZXJhY3Rpb25zKCkge1xuICAgICAgICAvLyBOZXcgQW5hbHlzaXMgYnV0dG9uXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdBbmFseXNpc0J0bicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnROZXdBbmFseXNpcygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGFkZGl0aW9uYWwgZmVhdHVyZXNcbiAgICAgICAgdGhpcy5hZGp1c3RDaGFydHNGb3JWaWV3cG9ydCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVUb29sdGlwcygpO1xuICAgICAgICB0aGlzLnByZXBhcmVQcmludFZpZXcoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEhhbmRsZSB3aW5kb3cgcmVzaXplIGZvciByZXNwb25zaXZlIGFkanVzdG1lbnRzXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkanVzdENoYXJ0c0ZvclZpZXdwb3J0KCk7XG4gICAgICAgIH0sIDI1MCkpO1xuXG4gICAgICAgIC8vIEFuaW1hdGUgY2hhcnRzIGFuZCBwcm9ncmVzcyBiYXJzIG9uIGxvYWRcbiAgICAgICAgdGhpcy5hbmltYXRlUmVzdWx0cygpO1xuXG4gICAgICAgIC8vIEFkZCBjbGljayBoYW5kbGVycyBmb3IgZXhwYW5kYWJsZSBzZWN0aW9ucyAoaWYgbmVlZGVkIGluIGZ1dHVyZSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlY3Rpb24tdGl0bGUnKS5mb3JFYWNoKHRpdGxlID0+IHtcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JzsgLy8gS2VlcCBkZWZhdWx0IGZvciBub3dcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIG1ldGhvZCB0byBleHBvcnQgcmVzdWx0cyBkYXRhIChmb3IgZnV0dXJlIGVuaGFuY2VtZW50KVxuICAgIGV4cG9ydFJlc3VsdHNEYXRhKGZvcm1hdCA9ICdqc29uJykge1xuICAgICAgICBpZiAoIXRoaXMucmVwb3J0U3VtbWFyeURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbignTm8gcmVwb3J0IGRhdGEgYXZhaWxhYmxlIHRvIGV4cG9ydCcsICd3YXJuaW5nJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICByZXBvcnRJZDogdGhpcy5yZXBvcnRTdW1tYXJ5RGF0YS5yZXBvcnRJZCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogdGhpcy5yZXBvcnRTdW1tYXJ5RGF0YS50aW1lc3RhbXAsXG4gICAgICAgICAgICBzdW1tYXJ5OiB7XG4gICAgICAgICAgICAgICAgdG90YWxDb21wYXJpc29uczogdGhpcy5yZXBvcnRTdW1tYXJ5RGF0YS5kYXRhLm1hc3RlclN1bW1hcnk/LnRvdGFsQ29tcGFyaXNvbnMsXG4gICAgICAgICAgICAgICAgc2ltaWxhcml0eURpc3RyaWJ1dGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBoaWdoOiB0aGlzLnJlcG9ydFN1bW1hcnlEYXRhLmRhdGEubWFzdGVyU3VtbWFyeT8uaGlnaFNpbWlsYXJpdHksXG4gICAgICAgICAgICAgICAgICAgIG1vZGVyYXRlOiB0aGlzLnJlcG9ydFN1bW1hcnlEYXRhLmRhdGEubWFzdGVyU3VtbWFyeT8ubW9kZXJhdGVTaW1pbGFyaXR5LFxuICAgICAgICAgICAgICAgICAgICBsb3c6IHRoaXMucmVwb3J0U3VtbWFyeURhdGEuZGF0YS5tYXN0ZXJTdW1tYXJ5Py5sb3dTaW1pbGFyaXR5XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZW9SaXNrOiB0aGlzLnJlcG9ydFN1bW1hcnlEYXRhLmRhdGEubWFzdGVyU3VtbWFyeT8udG9wU2ltaWxhcml0aWVzPy5bMF0/LnNlb1Jpc2ssXG4gICAgICAgICAgICAgICAgc2NvcmVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucmVwb3J0U3VtbWFyeURhdGEuZGF0YS5jb250ZW50U3VtbWFyeT8ucmVzdWx0cz8uWzBdPy5hdmdTY29yZSxcbiAgICAgICAgICAgICAgICAgICAgdmlzdWFsOiB0aGlzLnJlcG9ydFN1bW1hcnlEYXRhLmRhdGEudmlzdWFsU3VtbWFyeT8ucmVzdWx0cz8uWzBdPy5hdmdTY29yZSxcbiAgICAgICAgICAgICAgICAgICAgdGVjaG5pY2FsOiB0aGlzLnJlcG9ydFN1bW1hcnlEYXRhLmRhdGEudGVjaG5pY2FsU3VtbWFyeT8ucmVzdWx0cz8uWzBdPy5hdmdTY29yZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdqc29uJykge1xuICAgICAgICAgICAgY29uc3QgZGF0YVN0ciA9IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpO1xuICAgICAgICAgICAgY29uc3QgZGF0YUJsb2IgPSBuZXcgQmxvYihbZGF0YVN0cl0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhQmxvYik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgICAgICBsaW5rLmRvd25sb2FkID0gYCR7dGhpcy5yZXBvcnRJZH1fc3VtbWFyeS5qc29uYDtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oJ1Jlc3VsdHMgZGF0YSBleHBvcnRlZCBzdWNjZXNzZnVsbHknLCAnc3VjY2VzcycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBVdGlsaXR5IGZ1bmN0aW9uIGZvciBkZWJvdW5jaW5nXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG4gICAgbGV0IHRpbWVvdXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGVkRnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgICBjb25zdCBsYXRlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIGZ1bmMoLi4uYXJncyk7XG4gICAgICAgIH07XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgIH07XG59XG5cbi8vIEdsb2JhbCBmdW5jdGlvbnMgZm9yIG9uY2xpY2sgaGFuZGxlcnNcbmZ1bmN0aW9uIGFkZFJvdXRlTGlzdCgpIHtcbiAgICByb3V0ZU1hbmFnZXIuYWRkUm91dGVMaXN0KCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJvdXRlTGlzdChsaXN0SW5kZXgpIHtcbiAgICByb3V0ZU1hbmFnZXIucmVtb3ZlUm91dGVMaXN0KGxpc3RJbmRleCk7XG59XG5cbmZ1bmN0aW9uIGFkZFJvdXRlKGxpc3RJbmRleCkge1xuICAgIHJvdXRlTWFuYWdlci5hZGRSb3V0ZShsaXN0SW5kZXgpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVSb3V0ZShsaXN0SW5kZXgsIHJvdXRlSW5kZXgpIHtcbiAgICByb3V0ZU1hbmFnZXIucmVtb3ZlUm91dGUobGlzdEluZGV4LCByb3V0ZUluZGV4KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0J1bGtJbnB1dChsaXN0SW5kZXgpIHtcbiAgICByb3V0ZU1hbmFnZXIucHJvY2Vzc0J1bGtJbnB1dChsaXN0SW5kZXgpO1xufVxuXG5mdW5jdGlvbiBzdGFydEFuYWx5c2lzKCkge1xuICAgIHJvdXRlTWFuYWdlci5zdGFydEFuYWx5c2lzKCk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbEFuYWx5c2lzKCkge1xuICAgIHJvdXRlTWFuYWdlci5jYW5jZWxBbmFseXNpcygpO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVUZXJtaW5hbCgpIHtcbiAgICByb3V0ZU1hbmFnZXIudG9nZ2xlVGVybWluYWwoKTtcbn1cblxuLy8gRXhwb3NlIHRvIGdsb2JhbCBzY29wZVxud2luZG93LnRvZ2dsZVRlcm1pbmFsID0gdG9nZ2xlVGVybWluYWw7XG5cbmZ1bmN0aW9uIGRvd25sb2FkUmVwb3J0KCkge1xuICAgIHJvdXRlTWFuYWdlci5kb3dubG9hZFJlcG9ydCgpO1xufVxuXG5mdW5jdGlvbiBzdGFydE5ld0FuYWx5c2lzKCkge1xuICAgIHJvdXRlTWFuYWdlci5zdGFydE5ld0FuYWx5c2lzKCk7XG59XG5cbi8vIEluaXRpYWxpemUgd2hlbiBET00gaXMgbG9hZGVkXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gICAgd2luZG93LnJvdXRlTWFuYWdlciA9IG5ldyBSb3V0ZUNvbXBhcmlzb25NYW5hZ2VyKCk7XG59KTtcblxuLy8gQWRkIG5vdGlmaWNhdGlvbiBzdHlsZXMgaWYgbm90IGFscmVhZHkgcHJlc2VudFxuY29uc3Qgbm90aWZpY2F0aW9uU3R5bGVzID0gYFxuLm5vdGlmaWNhdGlvbi1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDIwcHg7XG4gICAgcmlnaHQ6IDIwcHg7XG4gICAgei1pbmRleDogMTAwMDtcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuXG4ubm90aWZpY2F0aW9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmc6IDFyZW0gMS41cmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xuICAgIGFuaW1hdGlvbjogc2xpZGVJbiAwLjNzIGVhc2U7XG59XG5cbi5ub3RpZmljYXRpb24taW5mbyB7XG4gICAgYmFja2dyb3VuZDogI2QxZWNmMTtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNiZWU1ZWI7XG4gICAgY29sb3I6ICMwYzU0NjA7XG59XG5cbi5ub3RpZmljYXRpb24tc3VjY2VzcyB7XG4gICAgYmFja2dyb3VuZDogI2Q0ZWRkYTtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNjM2U2Y2I7XG4gICAgY29sb3I6ICMxNTU3MjQ7XG59XG5cbi5ub3RpZmljYXRpb24td2FybmluZyB7XG4gICAgYmFja2dyb3VuZDogI2ZmZjNjZDtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNmZmVlYmE7XG4gICAgY29sb3I6ICM4NTY0MDQ7XG59XG5cbi5ub3RpZmljYXRpb24tZXJyb3Ige1xuICAgIGJhY2tncm91bmQ6ICNmOGQ3ZGE7XG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjZjVjNmNiO1xuICAgIGNvbG9yOiAjNzIxYzI0O1xufVxuXG4ubm90aWZpY2F0aW9uLWNsb3NlIHtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgb3BhY2l0eTogMC43O1xuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xufVxuXG4ubm90aWZpY2F0aW9uLWNsb3NlOmhvdmVyIHtcbiAgICBvcGFjaXR5OiAxO1xufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlSW4ge1xuICAgIGZyb20ge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICAgIHRvIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbn1cbmA7XG5cbi8vIEluamVjdCBub3RpZmljYXRpb24gc3R5bGVzXG5pZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdub3RpZmljYXRpb24tc3R5bGVzJykpIHtcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUuaWQgPSAnbm90aWZpY2F0aW9uLXN0eWxlcyc7XG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBub3RpZmljYXRpb25TdHlsZXM7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59Il19
