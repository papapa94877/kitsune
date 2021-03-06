// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({9:[function(require,module,exports) {

},{}],29:[function(require,module,exports) {
function fn() {
    // categories nav
    (function () {
        var toggle = document.querySelector('.js-toggle');
        var labels = document.querySelectorAll('.acc label');

        if (toggle !== null) {
            toggle.addEventListener('click', function (e) {
                e.target.parentNode.classList.toggle('visible');
            });
        }

        if (labels.length) {
            labels = Array.prototype.slice.call(labels);

            labels.forEach(function (item) {
                item.addEventListener('click', function (e) {
                    var target = e.target;
                    var input = target.parentNode.querySelector('input[type="radio"]');

                    if (input !== null) {
                        e.preventDefault();
                        input.checked = !input.checked;
                    }
                });
            });
        }
    })();

    // Slider: swiperjs https://idangero.us/swiper/
    (function () {
        var slider = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: {
                prevEl: '.swiper-container .prev',
                nextEl: '.swiper-container .next'
            },
            breakpoints: {
                960: {
                    slidesPerView: 2
                },
                630: {
                    slidesPerView: 1
                }
            }
        });
    })();

    // TODO: remove // temp not-helpful
    (function () {
        var notHelpful = document.querySelector('input[name="not-helpful"]');
        var helpful = document.querySelector('input[name="helpful"]');
        var notHelpfulContainer = document.querySelector('#not-helpful-container');
        var helpfulContainer = document.querySelector('#helpful-container');

        function clear() {
            [notHelpfulContainer, helpfulContainer].filter(Boolean).forEach(function (item) {
                item.classList.remove('visible');
            });
        }

        function listener(e, container) {
            e.preventDefault();
            clear();
            container.classList.add('visible');
        }

        if (notHelpful !== null && notHelpfulContainer !== null) {
            notHelpful.addEventListener('click', function (e) {
                listener(e, notHelpfulContainer);
            }, false);
        }

        if (helpful !== null && helpfulContainer !== null) {
            helpful.addEventListener('click', function (e) {
                listener(e, helpfulContainer);
            }, false);
        }
    })();

    // TODO: remove // temp search related articles
    (function () {
        var search = document.getElementById('search-q2');
        var results = document.querySelector('.search-form-large .search-results');
        var visible = 'visible';

        if (search !== null && results !== null) {
            var hideResults = function hideResults() {
                results.classList.remove(visible);
            };

            var listener = function listener(e) {
                var target = e.target;

                if (target.value.length > 0) {
                    results.classList.add(visible);
                } else {
                    hideResults();
                }
            };

            search.setAttribute('autocomplete', 'off');
            search.addEventListener('input', listener);
            document.addEventListener('click', hideResults, false);
        }
    })();

    // Breadcrumbs dropdown
    (function () {
        var el = document.querySelectorAll('.breadcrumbs .step');
        var liWidth = 250;
        var columnLength = 4;
        var dropMenuSelector = '.drop-menu';
        var stepSelector = 'step';

        if (el.length) {
            init(el);
        }

        var state = {
            columns: 1,
            direction: false,
            transformLeft: 0
        };

        function toLeft(data) {
            return window.innerWidth - data.left < liWidth;
        }

        function setState(data, target) {
            var list = target.parentNode.querySelectorAll('.drop-menu ul li').length;
            var rightColumns = Math.floor((window.innerWidth - (data.left + liWidth)) / liWidth) + 1;
            var leftColumns = Math.floor(data.left / liWidth);

            state.direction = leftColumns > rightColumns || toLeft(data);

            state.columns = Math.min(Math.max(leftColumns, rightColumns), Math.floor(list / columnLength));

            if (data.right < liWidth && toLeft(data)) {
                state.transformLeft = liWidth - data.right + 10;
            } else {
                state.transformLeft = 0;
            }
        }

        function hoverListener(e) {
            var t = e.target;
            var wrap = t.parentNode;
            var dropMenu = t.parentNode.querySelector(dropMenuSelector);

            if (t.classList.contains(stepSelector) && dropMenu !== null) {
                var targetPos = t.getBoundingClientRect();

                setState(targetPos, t);

                wrap.setAttribute('data-columns', state.columns);
                wrap.setAttribute('data-direction', state.direction ? 'left' : 'right');
                dropMenu.style.transform = 'translateX(' + state.transformLeft + 'px)';
            }
        }

        function init(list) {
            list = Array.prototype.slice.call(list);

            if (!list.length) return;

            list.forEach(function (item) {
                item.addEventListener('mouseover', hoverListener, false);
                item.addEventListener('touch', hoverListener, false);
            });
        }
    })();
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(fn);
},{}],5:[function(require,module,exports) {
'use strict';

require('./styles/reset.scss');

require('./styles/main.scss');

require('./styles/buttons.scss');

require('./styles/header.scss');

require('./styles/footer.scss');

require('./styles/search.scss');

require('./styles/breadcrumbs.scss');

require('./styles/article.scss');

require('./styles/related.scss');

require('./styles/option-b.scss');

require('./scripts/script.js');
},{"./styles/reset.scss":9,"./styles/main.scss":9,"./styles/buttons.scss":9,"./styles/header.scss":9,"./styles/footer.scss":9,"./styles/search.scss":9,"./styles/breadcrumbs.scss":9,"./styles/article.scss":9,"./styles/related.scss":9,"./styles/option-b.scss":9,"./scripts/script.js":29}]},{},[5])