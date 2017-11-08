/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ce_polyfill_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ce_polyfill_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ce_polyfill_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(2);



//dependant on a-button
( function() {

  class Dialog extends HTMLElement {
    connectedCallback() {
      Object(__WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* addStyleSheet */])(this); //id, url
      this._regroupElements();
    }
    
    open(data) {
      //replace title, content, actions with data given
      data && this._updateContent(data);

      // move to document-level for z-indexing to work
      this.originalPos = {parent: this.parentElement, nextSibling: this.nextElementSibling};
      document.body.appendChild(this);
      document.body.style.overflow = 'hidden';
      this.classList.add('visible');
    }

    close() {
      // move back to the original position
      this.originalPos.parent.insertBefore(this, this.originalPos.nextSibling);
      document.body.style.overflow = '';
      this.classList.remove('visible');
    }
 
    _regroupElements() {
      let pageBlockerEl, containerEl;
      pageBlockerEl = document.createElement('div');
      pageBlockerEl.setAttribute('class', 'page-blocker');
      pageBlockerEl.addEventListener('click', () => {
        this.close();
      });
      this.appendChild(pageBlockerEl);

      containerEl = document.createElement('div');
      containerEl.setAttribute('class', 'container');
      this.appendChild(containerEl);

      Array.from(this.children).forEach(el => {
        if (el.tagName !== 'STYLE' && !el.isSameNode(containerEl) && !el.isSameNode(pageBlockerEl)) {
          containerEl.appendChild(el)
        }
      });
    }

    _updateContent(data) {
      let titleEl, contentEl, actionsEl;
      let appendEl = className  => {
        let el = document.createElement('div');
        el.classList.add(className);
        this.appendChild(el);
        return el;
      }
      if (data.title !== undefined) {
        titleEl = this.querySelector('.title') || appendEl('title');
        titleEl.innerHTML = data.title;
      }
      if (data.contents !== undefined) {
        contentEl = this.querySelector('.content') || appendEl('content');
        contentEl.innerHTML = data.contents;
      }
      if (data.actions !== undefined) {
        actionsEl = this.querySelector('.actions') || appendEl('actions');
        actionsEl.innerHTML = '';
        for (var key in data.actions) {
          let buttonEl = document.createElement('a-button');
          buttonEl.innerHTML = key;
          buttonEl.addEventListener('click', _ => {
            data.actions[key]();
            this.close();
          });
          actionsEl.appendChild(buttonEl);
        }
      }
    }
  }
  
  customElements.define('a-dialog', Dialog);
})();


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Custom Element Polyfill
 * It's Allen's customElemnts polyfill for better performance
 */
(function(){
  let __customElements = {};

  let applyCustomElement = function(el, klass) {
    if (el.tagName.match(/-/)) {
      // el.__proto__ = klass.prototype;
      Object.setPrototypeOf(el, klass.prototype);
      el._init && el._init();
      setTimeout(function(){
        el.connectedCallback && el.connectedCallback();
      })
    }
  };

  let CustomElements = { // polyfill of window.customElements. I only need .define
    define: function(name, klass) {
      __customElements[name] = klass;
      //this is called after window.onload
      Array.from(document.querySelectorAll(name)).forEach(function(el) {
        applyCustomElement(el, __customElements[name]);
      });
    }
  }

  let observer = new MutationObserver(function(mutationRecords) {
    mutationRecords.forEach(function(mutationRecord) {
      if (mutationRecord.type == 'childList') { // e.g. attribures, characterData
        Array.from(mutationRecord.removedNodes).forEach(function(node) {
          let nodeName = node.nodeName.toLowerCase();
          let klass = __customElements[nodeName];
          if (klass) { // Ha, this is a customElement
            applyCustomElement(node, klass);
          }
        });
        Array.from(mutationRecord.addedNodes).forEach(function(node) {
          node.disconnectedCallback && node.disconnectedCallback();
        });
      }
    })
  });

  if (!window.customElements) {
    window.customElements = CustomElements;
    window.addEventListener('load', function() {
      observer.observe(document.body, {childList: true});
    });
  }

  if (!Object.values) {
    Object.values = function(obj) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    }
  };
})();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addStyleSheet;
/* unused harmony export observeAttrChange */
/* unused harmony export animate */
function addStyleSheet(el, url) {
  let id = el.constructor.name.replace(/[A-Z]/g, function(char, index) {
    return (index !== 0 ? '-' : '') + char.toLowerCase();
  });
  url = url || `https://unpkg.com/@custom-elements/${id}/dist/style.css`;

  // ce-core.js injects ce-core.css, so no need to load
  if (!document.querySelector(`script[src$="ce-core.js"], script[src$="ce-core.min.js"], link.${id}`)) {
    let linkEl = document.createElement('link');
    linkEl.setAttribute('class', id);
    linkEl.setAttribute('rel', "stylesheet");
    linkEl.setAttribute('href', url);
    el.appendChild(linkEl);  //caution, style will be broken if the element is removed
    //document.head.appendChild(linkEl); 
  }
}

function observeAttrChange(el, callback) {
  var observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes') {
        let newVal = mutation.target.getAttribute(mutation.attributeName);
        callback(mutation.attributeName, newVal);
      }
    });
  });
  observer.observe(el, {attributes: true});
  return observer;
}

/**
 * common function for Javascript animation
 */
function animate({duration, draw, timing}) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction)

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
    

/***/ })
/******/ ]);