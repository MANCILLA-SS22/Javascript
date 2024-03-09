// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"02I5Q":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "4f68ae3771eb84b3";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"fYjC8":[function(require,module,exports) {
//         $$$$$$$$$$$$$$$ Proyectos $$$$$$$$$$$$$$$
/* //Proyecto 1: Bankist
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [ // Las fechas se muestran con el formato toISOString()
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2023-05-27T17:01:17.194Z',
        '2023-07-23T23:36:17.929Z',
        '2023-07-18T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [ // Las fechas se muestran con el formato toISOString()
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};
const accounts = [account1, account2]; //Almacenamos la informacion de los 4 objetos en un array.

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

let currentAccount, timer;
let sorted = false;// For the btnSort, we fix this variable to false so the function displayMovements still recieve false, which means that it doesn't sort the array.

createUserNames(accounts);
function createUserNames (accs){
    accs.forEach(function(num_acc){
        num_acc.username = num_acc.owner.toLowerCase().split(" ").map(name => name[0]).join(""); // We create a new element (num_acc.username) that will contain the lower case letters of each owner's name
    })
}

function updateUI(acc){
    displayMovements(acc);
    calcDisplayBalance(acc);
    calcDisplaySummary(acc);
}

function formatMovementDate(date, locale){

    function calcDaysPassed(date1, date2){
        return Math.round(Math.abs(date2 - date1) / (1000*60*60*24));
    }

    const dayPassed = calcDaysPassed(new Date(), date);
    if (dayPassed === 0) return "Today";
    if (dayPassed === 1) return "Yesterday";
    if (dayPassed <= 7)  return `${dayPassed} days`;
    
    // // METODO 1
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    
    //METODO 2
    return new Intl.DateTimeFormat(locale).format(date)

}

function formatCur(value, locale, currency){
    return new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(value);
}

function displayMovements(acc, sort=false){

    containerMovements.innerHTML="";
    const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements;
    
    movs.forEach(function(mov, i) {
        const date = new Date(acc.movementsDates[i]); //Accedemos a las fechas que estan en account1.movementsDates[]
        const displayDate = formatMovementDate(date, acc.locale);

        const type = mov > 0 ? "deposit" : "withdrawal";    

        //METODO 1
        // const html = `
        //     <div class="movements__row">
        //         <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        //         <div class="movements__date">${displayDate}</div>
        //         <div class="movements__value">${mov.toFixed(2)}€</div>
        //     </div>`
        // containerMovements.insertAdjacentHTML("afterbegin", html);

        //METODO 2
        const formattedMov = formatCur(mov, acc.locale, acc.currency);
        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                <div class="movements__date">${displayDate}</div>
                <div class="movements__value">${formattedMov}</div>
            </div>`
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
}

function calcDisplayBalance(acc){
    acc.balance = acc.movements.reduce(function(acc, mov){
        return acc + mov;
    }, 0);

    //METODO 1
    // labelBalance.textContent = `${acc.balance.toFixed(2)}€`

    //METODO 2
    const formattedMov = formatCur(acc.balance, acc.locale, acc.currency);
    labelBalance.textContent = formattedMov;
}

function calcDisplaySummary(acc){
    // //METODO 1
    // const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    // labelSumIn.textContent = `${incomes.toFixed(2)}€`;

    // const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

    // const interest = acc.movements.filter(mov => mov > 0).map( deposit => (deposit*acc.interestRate)/100 ).filter((int) => int >= 1).reduce((acc, int) => acc + int, 0);
    // labelSumInterest.textContent = `${interest.toFixed(2)}€`;

    //METODO 2
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

    const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

    const interest = acc.movements.filter(mov => mov > 0).map( deposit => (deposit*acc.interestRate)/100 ).filter((int) => int >= 1).reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
}

function startLogOutTimer(){
    function tick(){
        const min = String(Math.trunc(tiempo / 60)).padStart(2, 0);
        const sec = String(tiempo % 60).padStart(2, 0);
        labelTimer.textContent = `${min}:${sec}`;
        if(tiempo === 0) {
            clearInterval(startLogOutTimer);
            labelWelcome.textContent = "Log in to get started"
            containerApp.style.opacity = 0;
        }
        tiempo--;
    }

    let tiempo = 20;
    tick(); //Llamamos a la funcion antes de que se ejecute el setInterval para que, al final se ejecuten al mismo tiempo. Ya que, de ejecutarse esta funcion dentro del setInterval, entonces obtendremos primero un '1' en la pantalla y luego iniciara el temporizador.
    return setInterval(tick, 1000); //Volvemos a llamar a la funcion tick en el setInterval para que cada segundo que pase, se vuelva a ejecutar.
}

btnLogin.addEventListener("click", function(evento){
    evento.preventDefault();
    
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value) //We verify if the username typed in the input is the same as the one in the array that is into "accounts". If so, we get the found object.

    if(currentAccount?.pin === Number(inputLoginPin.value)){ //We check if the pin in the object is the same as the one typed in the input. (We must write use "?." so that we can get an "undefined" and not an error)
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`; //If so, then we change the sentence in the upper right corner.
        containerApp.style.opacity = 100; //We do this so that we can see the menu with information.

        //METODO 1
        // const now = new Date();
        // const day = `${now.getDate()}`.padStart(2, 0);
        // const month = `${now.getMonth() + 1}`.padStart(2, 0);
        // const year = now.getFullYear();
        // const hour = `${now.getHours()}`.padStart(2, 0);
        // const min = `${now.getMinutes()}`.padStart(2, 0);
        // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

        //METODO 2
        const now = new Date();
        const options = {hour:"numeric", minute: "numeric", day: "numeric", month: "numeric", year: "numeric", }; //weekday: "numeric"

        // const locale = navigator.language;
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
        inputLoginUsername.value = inputLoginPin.value = ""; //Now we delete the written values in our inputs (user and PIN)
        inputLoginPin.blur(); //This work so that when we want to log in and finally press "enter", then our cursor will disappear.

        if (timer) {//Cuando iniciamos sesion, timer es undefined, por lo que no se ejecuta el if.
            clearInterval(timer)
        }
        timer = startLogOutTimer(); //pero cuando iniciamos sesion, ejecutamos la funcion del conteo y se almacena en timer. Posterior a eso, como ya existira timer, ahora si se ejecutara el if, el cual reiniciara el conteo.
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener("click", function(evento){
    evento.preventDefault();
    const amount = Number(inputTransferAmount.value); //Recuperamos el numero ingresado en el input donde introducimos el dinero
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value); //Recuperamos el objeto contenido en uno de los arrays de accounts, al verificar si el nombre de usuario existe dentro de los 4 arrays de accounts y si es igual al ingresado en el input.
    inputTransferAmount.value = inputTransferTo.value = "";

    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);

        clearInterval(timer); //Cuando iniciamos sesion, timer es undefined, por lo que no se ejecuta el if.
        timer = startLogOutTimer(); //pero cuando iniciamos sesion, ejecutamos la funcion del conteo y se almacena en timer. Posterior a eso, como ya existira timer, ahora si se ejecutara el if, el cual reiniciara el conteo.
    }
});

btnClose.addEventListener("click", function(evento){
    evento.preventDefault();

    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) { //We verify if the written values in the inputs are the same as those in the current object.
        const index = accounts.findIndex(acc => acc.username === currentAccount.username); //If so, we proceed to find the index of the object in the array "accounts"
        accounts.splice(index, 1);
        containerApp.style.opacity = 0; 
        console.log(accounts);
    }

    inputCloseUsername.value = inputClosePin.value = "";
});

btnLoan.addEventListener("click", function(evento){
    evento.preventDefault();

    const amount = Math.floor(inputLoanAmount.value)
    if (amount > 0 && currentAccount.movements.some(mov => (mov >= amount*0.1))) {
        
        setTimeout(function(){
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString());

            updateUI(currentAccount);

            clearInterval(timer);
            timer = startLogOutTimer();
        }, 2500);

    }
    inputLoanAmount.value = "";
});

btnSort.addEventListener("click", function(evento){
    evento.preventDefault();

    displayMovements(currentAccount.movements, !sorted); //When clicking the button, then that variable changes to true and the array is sorted.
    sorted =! sorted; //After that, we need to change the "sorted" variable to the opposite boolean value. We do this so that when we press the button again, this back to normal (unsorted).
})

labelBalance.addEventListener('click', function () {
    let valor = document.querySelectorAll('.movements__value'); 
    const movementsUI = Array.from(valor, function(el){   // Array.from(Array-like or iterable object, mapFunction, thisValue)
        return Number(el.textContent.replace('€', ''))
    });  console.log(movementsUI);
    // const movementsUI2 = [...document.querySelectorAll('.movements__value')];


    [...document.querySelectorAll(".movements__row")].forEach(function(row, i){
        if (i % 2 === 0) row.style.backgroundColor = "orangered";
        if (i % 3 === 0) row.style.backgroundColor = "blue";
    })
}); */ /* //Proyecto 2: Bankist_Advanced-DOM
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

function openModal(evento) {
    evento.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

//Metodo 2
btnsOpenModal.forEach(function(evento) {
    evento.addEventListener("click", openModal)
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Closing a card by using the keydown method in addEventListener
document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

//Finding coordenates and position, and use of scroll
btnScrollTo.addEventListener("click", function(evento){
    section1.scrollIntoView({behavior: "smooth"});
});

//Page navigation
document.querySelector(".nav__links").addEventListener("click", function(evento){
    evento.preventDefault();

    //Aqui usamos evento.target porque en este caso estamos utilizando el <ul> como elemento padre, y sus hijos son <li> y <a>. Ahora, con el addEventListener podemos hacer click en el elemento padre o incluso sus hijos y JS ejecutara la tarea deseada. Si usamos this como en el metodo 1, este solo funcionara para elelemento actual o el padre, es decir <ul>.
    if (evento.target.classList.contains("nav__link")) {
        const id = evento.target.getAttribute("href"); //Retorna unicamente el nombre del atriuto contenido en esa etiqueta. Si usamos const id = this.href, entonces tendremos el link completo que aparece en la barra de navegacion
        document.querySelector(id).scrollIntoView({behavior: "smooth"});
    }
});

// Building a Tabbed Component
tabsContainer.addEventListener('click', function (evento) {

    //Debemos añadir el closest(), ya que operations__tab-container tiene de hijos tres elementos botones con un span cada uno. Por lo que al presionar el boton, especificamente el texto (span), no funcionara correctamente el boton. Es por eso que agregamos el closest(), para que al presionar el boton, considere unicamente el elemento mas cercano con el nombre operations__tab (incluyendo su hijo <span>).  Cabe mencionar que, si precionamos donde esta el <div class="operations__tab-container"> entonces tendremos un null en consola, ya que no existe ningun elemento padre con el  class ".operations__tab". Para eso usamos el Guard clause, para que al no haber un click en el botton, simplemente salga de la funcion y no ejecute las lineas siguientes.
    const clicked = evento.target.closest('.operations__tab');  console.log(clicked);
    
    // Guard clause
    if (!clicked) return;

    //Realizamos un barrido en cada uno de los 3 botones y en cada uno de los 3 contenidos de texto. Dependiendo del boton seleccionado, a este se le eliminaran sus "active"
    tabs.forEach(evento => evento.classList.remove('operations__tab--active'));
    tabsContent.forEach(evento => evento.classList.remove('operations__content--active'));

    //Una vez eliminado los "active" en el boton y el contenido seleccinado, ahora se procede a "activar" el boton y su contenido seleccionado.
    clicked.classList.add('operations__tab--active');

    //Dependiendo del boton que se haya presionado, este realizara la animacion en el boton, y tambien se desplegara el contenido de texto del boton seleccionado.
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active'); 
});

//Passing Arguments to Event Handlers
function handleHover(evento) {
    //Recordar que cuando utilizamos bind(), la keyword "this" representa los parametros que le enviamos a la funcion, en este caso, 0.5 y 1.
    if (evento.target.classList.contains('nav__link')) {
        const link = evento.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');

        siblings.forEach(iter => { //Convertir a arrow function
            if (iter !== link) iter.style.opacity = this;
        });
    }
};

// Usamos bind para retornar una nueva funcion de esa funcion handleHover, y de esa forma, no tener que usar una funcion que llame a otra funcion.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation
function stickyNav(entries, observer){
    const [entry] = entries; //entries is always an array because the options in IntersectionObserver can have multiple thresholds, and for each threshold, there will be an entry in the array, even if there is only one threshold.
    // console.log(entry, observer);

    if (entry.isIntersecting) { //When the target isn't intersecting the root, then we want the sticky class to be applied.
        nav.classList.remove("sticky");
    }else{
        nav.classList.add("sticky");
    }
}

const options = {
    root: null, //We select null because we are interested in the entire viewport
    threshold: 0, //A value of 0 means that even a single visible pixel counts as the target being visible. That's to say, when the header shows a 0% of itself, then the function will get called .

    //We use getBoundingClientRect().height to calculate dynamically the height (for responsive webpages) of the nav without the needed of hard coding and tupe an specific height. It'll be 90px.
    rootMargin: `-${nav.getBoundingClientRect().height}px` //This value is in pixels and will be applied outside of the target element
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header);


// Revealing Elements on Scroll
const allSections = document.querySelectorAll(".section");

const revealSection = function(entries, observer){
    const [entry] = entries;     //console.log(entry)

    if(entry.isIntersecting === false) return;
    entry.target.classList.remove("section--hidden");

    observer.unobserve(entry.target);
};
const opciones = {
    root: null,
    threshold: 0.15, //We use something greater than zero because we don't want to show the section right as it enters the viewport, but a litte latter.
}

const sectionObserver = new IntersectionObserver(revealSection, opciones)

allSections.forEach(function(section){
    sectionObserver.observe(section);
    // section.classList.add("section--hidden");
});


//Lazy Loading Images
const imgTarget = document.querySelectorAll("img[data-src]");  // console.log(imgTarget);

const loadImg = function(entries, observer){
    const [entry] = entries;   //console.log(entry);

    if(entry.isIntersecting === false) return;

    //Replace the src ("imgs/grow-lazy.jpg") with data-src ("imgs/grow.jpg"). That's to say, src is the blur image and the data-src is the high-quality image.
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function(){
        entry.target.classList.remove("lazy-img");
    })

    observer.unobserve(entry.target)
}

const Opciones = {
    root: null,
    threshold: 0,
    rootMargin: "200px"
}

const imgObserver = new IntersectionObserver(loadImg, Opciones);
imgTarget.forEach(evento => imgObserver.observe(evento));


//Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
const maxSlide = slides.length;


function goToSlide(slide) {
    slides.forEach(function(evento, iter){
        evento.style.transform = `translateX(${100 * (iter - slide)}%)`; //0%, 100%, 200%
        // console.log(`${iter} , ${evento.style.transform}`);
    })
};

function nextSlide() {
    curSlide === maxSlide - 1 ? curSlide = 0 : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide)
};

function prevSlide() {
    curSlide === 0 ? curSlide = maxSlide - 1 : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide)
};

function createDots() {
    slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML('beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
};

function activateDot(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

function init(){
    createDots();
    goToSlide(0);
    activateDot(0);
}

init();
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (evento) {
    console.log(evento)
    if (evento.key === 'ArrowLeft') prevSlide();
    if (evento.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', function (evento) {
    if (evento.target.classList.contains('dots__dot')) {
        const slide = evento.target.dataset.slide;  //const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
    }
}); */ /* //Proyecto 3: Mapty

// Application architecture
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Parent class and child classes
class Workout{ 
    // date = new Date(); //This line and the next one are the same as the line 549 amd 550.
    // id = (Date.now() + "").slice(-10);  
    // clicks = 0;

    constructor(coords, distance, duration){
        this.date = new Date();
        this.id = (Date.now() + "").slice(-10);  //now() returns the number of milliseconds since midnight Jan 1, 1970
        this.clicks = 0;
        this.coords = coords;     // Must be an array [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _setDescription(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    _click(){
        this.clicks++;
    }
}

class Running extends Workout{
    type = "running"; //This property is gonna be available on all the instances
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription(); //We can't use this method on the Workout object becuase the "type" variable is defined in the child classes. Through this the scope chain this constructor methid will get access to all the methods of the parent class, and of course, that includes the _setDescription() which is in the Workout class.
    }

    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout{
    type = "cycling"; //This property is gonna be available on all the instances
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription(); //We can't use this method on the Workout object becuase the "type" variable is defined in the child classes. Through this the scope chain this constructor methid will get access to all the methods of the parent class, and of course, that includes the _setDescription() which is in the Workout class.
    }

    calcSpeed(){
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

class App{
    //We're gonna define the map and mapEvent as properties of the object and will use a private class field. Now, both of the will become private instances properties which are gonna be present  on all the instances created through this class.
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts = [];

    constructor(){
        //Get user's position
        this._getPosition();

        //Get data from local storage
        this._getLocalStorage();

        //Atach event handlers
        form.addEventListener("submit", this._newWorkout.bind(this));  //When we have event listeners inside of a class, you'll have to bind the this keywords all the time. Because if not, this._newWorkout will only point to the form. So we always want our this keywords to still point to the object itself (in this case, the app object, which is what "this" is currently pointing to).
        inputType.addEventListener("change",this._toggleElevaionField); //In _toggleElevaionField there aren't any this keyword, so we can avoid using the bind() method in inputType.addEventListener
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }

    _getPosition(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(  //First callback: It will be called on success.  Second callback: It will be called on error

                //JS will callback the _loadMap function here and pass in the position argument as soon as the curent position of the user is determined. This method is called by getCurrentPosition(), and this._loadMap is treated as a regular funcion call NOT AS A METHOD CALL. So, since this._loadMap is a  callback function, we're not calling it ourselves, it is to getCurrentPosition function that we'll call the callback funcion once that it gets its  current position of the user. So, when it calls the _loadMap function, then it does so as a regular function call. And, in a regular function,  the this keyword is set to undefined. To fix that, we bind (bind will simply return a new function) this function and finally the this keyword into bind points  to the current object so that the this is also inside of _loadMap(position). Bind() used when you want 'this' keyword in the method you are calling to point to the object.
                this._loadMap.bind(this), //First callback of getCurrentPosition. 
                function(){               //Second callback of getCurrentPosition. 
                alert("Coultn't get your position!")
            });
            // console.dir(this._loadMap);
        }; 
    }

    _loadMap(position){ //The getCurrentPosition method passes the GeolocationPosition object to the callback. That's why we don't need to put any parameter in this._loadMap. Into getCurrentPosition we don't invoke _loadMap. We just pass function's name so, there is no any parentheses and parameters. 
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel); //We use 'this.#map' and 'this.#mapEvent' because this is like a property that is defined on the object itself. It's no longer just a normal variable
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on("click", this._showForm.bind(this));
        this.#workouts.forEach(work => this._renderWorkoutMarker(work));

        //console.log(position);
        //console.log(latitude, longitude); 
        //console.log(`https://www.google.com.mx/maps/@${latitude},${longitude}`);
        // console.log(map);
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputCadence.focus();
    }

    _hideForm(){
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
        form.style.display = "none";
        form.classList.add("hidden");
        setTimeout(function(){
            form.style.display = "grid";
        }, 1000)
    }
    
    _toggleElevaionField(){
        inputElevation.closest('.form__row').classList.toggle("form__row--hidden");
        inputCadence.closest('.form__row').classList.toggle("form__row--hidden");
    }

    _newWorkout(event){
        event.preventDefault();

        function validInputs(...inputs){
            return inputs.every(inp => Number.isFinite(inp));
        }

        function allPositives(...inputs){
            return inputs.every(inp => inp > 0);
        }

        //Get data from form
        const type = inputType.value;
        const distance = Number(inputDistance.value);
        const duration = Number(inputDuration.value);
        const {lat, lng} = this.#mapEvent.latlng;    // console.log(this.#mapEvent); console.log(lat, lng);
        let workout;

        //If workout rining, creat runing object
        if (type === "running") {
            const cadence = Number(inputCadence.value);

            //Check if data is valid. (The reason why we did this cheking here inside of the parent if, is because if we did the same out of the if, then we would also want to check for the elevation. That's to say, only one of the cadence and elevation can be defined at the same time. They can't both be defined at the same time)
            if(!validInputs(distance, duration, cadence) || !allPositives(distance, duration, cadence)){
                return alert("Inputs have to be positive numbers!"); 
            }

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        //If workout cycling, creat cycling object
        if (type === "cycling") {
            const elevation = Number(inputElevation.value);

            //Check if data is valid. (The reason why we did this cheking here inside of the parent if, is because if we did the same out of the if, then we would also want to check for the elevation. That's to say, only one of the cadence and elevation can be defined at the same time. They can't both be defined at the same time)
            if(!validInputs(distance, duration, elevation) || !allPositives(distance, duration)){
                return alert("Inputs have to be positive numbers!"); 
            }

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        //Add new object to workout array
        this.#workouts.push(workout);      console.log(workout);

        //Render workout on map as marker
        this._renderWorkoutMarker(workout);

        //Render workout on list
        this._renderWorkout(workout);

        //Hide form + clear input fields
        this._hideForm();

        //Set local storage to all workouts
        this._setLocalStorage();
    }

    _renderWorkoutMarker(workout){
        L.marker(workout.coords)
        .addTo(this.#map) //There's no need to use the this keyword in this line because we're already using it in the "render workout on map as marker" line as a method of the this keyword. Besides that, we're calling it ourselves, so it's not a callback funcion of any other funcion in JS. And so therefore, the this keyword in this method here, will still be the current object. And so, no need to using bind in this case.
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        }))
        .setPopupContent(`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`)
        .openPopup()
    }

    _renderWorkout(workout){
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
    
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
        `;

        if(workout.type === 'running'){
            html += `
                    <div class="workout__details">
                        <span class="workout__icon">⚡️</span>
                        <span class="workout__value">${workout.pace.toFixed(1)}</span>
                        <span class="workout__unit">min/km</span>
                    </div>
                    <div class="workout__details">
                        <span class="workout__icon">🦶🏼</span>
                        <span class="workout__value">${workout.cadence}</span>
                        <span class="workout__unit">spm</span>
                    </div>
                </li>
            `;
        }
        if(workout.type === 'cycling'){
            html += `
                    <div class="workout__details">
                        <span class="workout__icon">⚡️</span>
                        <span class="workout__value">${workout.speed.toFixed(1)}</span>
                        <span class="workout__unit">km/h</span>
                    </div>
                    <div class="workout__details">
                        <span class="workout__icon">⛰</span>
                        <span class="workout__value">${workout.elevationGain}</span>
                        <span class="workout__unit">m</span>
                    </div>
                </li>
            `;
        }
        
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(event){
        const workoutEl = event.target.closest(".workout");   // console.log(workoutEl);

        if (!workoutEl) return;

        const workout = this.#workouts.find(event => event.id === workoutEl.dataset.id);      console.log(workoutEl.dataset.id);
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true, 
            pan: {duration: 1}
        });
        
        // workout._click(); // using the public interface
    }

    _setLocalStorage(){
        localStorage.setItem("workouts", JSON.stringify(this.#workouts));
    }

    _getLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'));
        console.log(data);

        if(!data) return;

        this.#workouts = data; //This method will be executed right at the begining. And data will always start with an empty array with that will be stored in this.#workouts
        this.#workouts.forEach(work => this._renderWorkout(work)); //We ise _renderWorkout instead of _renderWorkoutMarker because once our page is reloaded right at the beginning, the #map in the _renderWorkoutMarker is not yed defined. So, that's why we get an error. On the other hand, the method _renderWorkout doesn't have this variable (#map).

        //When we convert our objects to a string and then back to a script from object, we lose the prototype chain. So, the new objects that we recover from the local storage are now regular objects. They're now no longer objects that were created by the running class or by the cycling class. And therefore, they won't be able to inherit any of their methods.
    }

    _reset(){
        localStorage.removeItem("workouts");
        location.reload(); //location is basically a big object that contains a lot of methods and properties in the browser. 
    }
    
}

const app = new App();   
// console.log(app); */ //         $$$$$$$$$$$$$$$ Funciones $$$$$$$$$$$$$$$
/* //Ejemplo 1: Definicion de mi funcion
function saludar (){
    console.log("--> Hola !!");
}

 //Ejemplo 2: Llamado de mi funcion
for (let index = 0; index < 6; index++) {
    saludar();
} */ /* //Ejemplo 2: Definicion de mi funcion

function pedirNombre(){
    let nombreIngresado = prompt("Ingresar nombre");
    console.log("El nombre es: "+ nombreIngresado);
}

pedirNombre(); */ /* //Ejemplo 3: Como crear una funcion si necesito reiterar varias veces su funcionalidad

function pedirNombre(){
    let index = 0;
    let cantidad = 3;

    for (index; index < cantidad; index++) {
        let nombreIngresado = prompt("Ingresar nombre");
        alert("El nombre es: "+ nombreIngresado);
    }
}

pedirNombre(); */ /* //Ejemplo 4: Creacion de una funcion que recibe parametros
function verParametros(p1,p2){
    let res = p1 - p2;
    console.log("La resta es: ".concat(res));
}

let variable1 = parseFloat(prompt("Ingrese el valor de la variable 1: "));
let variable2 = parseFloat(prompt("Ingrese el valor de la variable 2: "));

verParametros(variable1, variable2); */ /* //Ejemplo 5: Creacion de una funcion que recibe parametros, esta calcula una resta aritmetica y devuelve su valor.
function resta(p1,p2){
    let res = p1 - p2;
    return res;
}

let variable1 = parseFloat(prompt("Ingrese el valor de la variable 1: "));
let variable2 = parseFloat(prompt("Ingrese el valor de la variable 2: "));

//let res = verParametros(variable1, variable2);
//console.log("El resultado es: " + res);

console.log("El resultado es: " + resta(variable1, variable2)); */ /* //Ejemplo 6: Uso de una funcion para validar una contrasena.

function passwordValidation(password, repeatPassword)
{
    if (password == "" || repeatPassword) 
    {
        console.log("Las contrasenas deben contener caracteres.");
    }

    if (password != repeatPassword) ;
    {
        console.log("Las contrasenas ingresadas no son iguales.");
    }

    if (password.length < 8);
    {
        console.log("La contrasena debe tener al menos 8 caracteres.");
    }

    if (password.length > 15);
    {
        console.log("La contrasena no debe tener mas de 15 caracteres.");
    }
} 

passwordValidation("123", "pass"); */ /* //Ejemplo 7: Uso del ambito de varaibles para cambiar el valor de variables globales
let res = 0;
function suma(num1, num2){
    res = num1 + num2;
}
suma(5,6);
console.log(res); */ /* //Ejemplo 8: Uso del ambito de varaibles para cambiar el valor de variables locales
let res = ""; //let resultado = undefined; let resultado = null;
function suma(num1, num2)
{
    let res = num1 + num2;
    return res; 
}
res = suma(5,6);
console.log(res); */ /* //Ejemplo 9: Creacion de variables anonimas y su uso.

const sum = function(a,b)
{
    return a + b;
};

const res = function(a,b)
{
    return a - b;
};

console.log( sum(15,20) );
console.log( res(15,5) ); */ /* //Ejemplo 10: Uso de finiciones flecha (Si es una funcion de una sola linea con retorno podemos evitar escribir el cuerpo.)

const add = (a, b) => {return a + b}; //Metodo 1 para utilizar flecha 
const subs = (a, b) => a - b;         //Metodo 2 para utilizar flecha

console.log( add(15,20));
console.log( subs(20,5));

//Ejemplo de practica - Si una funci�n es una sola l�nea con retorno y un par�metro puede evitar escribir los ().

const suma = (a,b) => a + b;
const resta = (a,b) => a - b;
const iva = x => x * 0.21;

let precioProducto = 500;
let descuento = 50;

let nuevoPrecio = resta( suma(precioProducto, iva(precioProducto)), descuento );
console.log(nuevoPrecio); */ //         $$$$$$$$$$$$$$$ Funciones de orde superior $$$$$$$$$$$$$$$
/* //Ejemplo 1: Desarrollo de una funcion para conseguir la abstraccion de la suma consecutiva de numeros dentro de un rango.

let total = 0;
function sumarRango(inicio, fin){
    for (let i = inicio; i <= fin; i++) {
        total += i;
    }
    return total;
}
console.log( sumarRango(1, 100) ) 
console.log("La suma total de 1 hasta 10 es: "+ total.toString()); */ /* //Ejemplo 2: Retorno de funciones y concepto sobre funciones con un esquema superior
function mayorQue(n) {
    return (m) => m > n
}

// Retorna    (m) => m>17     y nos queda     mayorDeEdad = (m) => m>17    donde (m) contendra el valor que le mandaremos desde la linea 28. En este caso, ahora la variable
// mayorDeEdad se convertira en una funcion, en la cual (m) sera el parametro al que le llegara el valor enviado desde la linea 32, que es 5.
let mayorDeEdad = mayorQue(17); 

// Como tenemos que \ mayorDeEdad = (m) => m>17 /. Entonces nos damos cuenta que en la funcion ahora tenemos el parametro (m) y no (n) como en la primera funcion, por lo que 
//ahora desde la linea 32 mandamos un 5, que se almacenara en ese variable (m) y obtendremos que  5>17, lo que resulta como un valor booleano, que se almacena en "res".
let numero = parseInt(5); 
let res = mayorDeEdad(numero); 

if (res) {
    console.log("El numero "+ numero+ " es mayor que 17."+ mayorDeEdad);
}else{
    console.log("El numero "+ numero+ " NO es mayor que 17."+ mayorDeEdad);
} */ /* //Ejemplo 3: Aplicacion de una funcion en CALL STACK
function multiply (x, y) {
 return x * y;
}
function printSquare (x) {
    let s = multiply(x,x);
    console.log(s);
}

printSquare(5); */ /* //Ejemplo 4: Retorno de funciones con un if.
function asignarOperacion (op) {
    if (op == "sumar") {
        return (a, b) => a + b
    }else if (op == "restar") {
        return (a, b) => a - b
    }
}
let suma = asignarOperacion ("sumar")
let resta = asignarOperacion ("restar")
console.log( suma(4, 6) ) // 10
console.log( resta(5, 3) ) // 2 */ /* //Ejemplo 5: Como podemos pasar por parametro una funcion (funcionalidad)
function porCadaElemento(elementos, funcionalidad){
    for (const unElemento of elementos) {
        funcionalidad(unElemento);
    }
}

function acumular(numero){
    total += numero;
}

let total = 0;
let numeros = [10, 20, 30, 40, 50];
porCadaElemento(numeros, console.log);
porCadaElemento(numeros, acumular);
console.log("El valor total de la suma de los elementos de "+ numeros.toString()+ " es: "+ total+"."); */ /* // Ejemplo 6.1: Default Parameters
const bookings = [];

const createBooking = function( flightNum, numPassengers = 1, price = (199*numPassengers) ){
    
    // Metodo utilizado en ES5 para establecer un valor inicial a esos parametros
    // numPassengers = numPassengers || 1;
    // price = price || 199
    const booking = {
        flightNum,
        numPassengers,
        price
    };
    console.log(booking);
    bookings.push(booking);
}

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 5);
createBooking("LH123", undefined, 1000); */ /* // Ejemplo 6.2: How Passing Arguments Works: Value vs Reference
const flight = 'LH234';
const jonas = {name: 'Jonas Schmedtmann', passport: 24739479284};

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 24739479284) {
        console.log('Checked in');
    } else {
        console.log('Wrong passport!');
    }
};

checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas); //When we try to copy an object, we're really only copying the reference to that object in the memory heap. They are both the same object in the memory heap

const newPassport = function(person){
    person.passport = Math.trunc(Math.random()*10000000000)
}

newPassport(jonas);
checkIn(flight, jonas); */ /* // Ejemplo 6.3: Functions Accepting Callback Functions
const oneWord = function (str) {
    const res = str.replace('/ /g', '').toLowerCase(); //     / /g sirve para capturar todos los elementos globales y no solamente 1. En este casi, queremos todos los espacios en blanco, y si no usamos esto, unicamente obtendremos el primer espacio en blanco.
    return res;
};

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' '); //El string tiene 4 palabras. Capturamos la 1era palabra con first, y las otras 3 las capturamos en una variable desestructurada (others), la cual devolvera un nuevo array con las 3 palabras restantes.
    const res = [first.toUpperCase(), ...others].join(' '); //Convertimos las letras de la 1era palabra a mayusculas, y a esa palabra, le unimos con ayuda del join(), las otras 3 que estan en el array generado con el split().
    return res;
};

// Higher-order function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
    console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5); */ /* // Ejemplo 6.4: Functions Returning Functions
const greet = function (greeting) {

    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};

//Llamamos a la funcion greet y le mandamos "hey". Despues, esta funcion retorna otra funcion que se almacena en greeterHey. Entonces, cuando en la linea de abajo volvemos a llamar a la funcion greeterHey, ahora ejecutaremos la funcion pero que esta almacenada en esta variable. O sea, la funcion del return.
const greeterHey = greet('Hey');
greeterHey('there');
greet('Hey')('there'); //Esto es lo mismo que las dos lineas de arriba.

// Esto es lo mismo que el procedimiento de arriba pero con arrow functions.
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hey')('there'); */ /* // Ejemplo 6.5: The call(), apply() and bind() Methods
const lufthansa = {airline: 'Lufthansa',iataCode: 'LH',bookings: [],
    book: function(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    }
};

const eurowings = {airline: 'Eurowings',iataCode: 'EW',bookings: []};
const swiss = {airline: 'Swiss Air Lines',iataCode: 'LX',bookings: []};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

// Call method: You can write a method that can be used on different objects. It takes arguments separately. No recive una lista de argumentos despues del this. Permitira que la palabra recerbada this apunte a eurowings.
const book = lufthansa.book; //Al hacer esto, ahora la funcion (metodo) del objeto lufthansa pasa a ser una funcion global, por lo que, no pudemos utilizarla asi nada mas y mandarle valores ya que esta funcion tiene "this", los cuales pertenecian al objeto lufthansa.
book.call(eurowings, 23, 'German mancilla'); 
book.call(lufthansa, 514, 'Chavez german');
// book(23, "res"); Esto NO funciona

// Apply method: You can write a method that can be used on different objects. It takes arguments as an array.
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
book.call(swiss, ...flightData);
console.log(swiss);



const bookEW = book.bind(eurowings); // Bind method: Allows us to manually set "this" for any function call. With the bind() method, an object can borrow a method from another object.
bookEW(23, "German Mancilla Chavez");

const bookEWX = book.bind(eurowings, 23);
bookEWX("German Mancilla Chavez");

// Bind method with eventListener:
lufthansa.planes = 300;             // Agregamos una nueva propiedad a lufthansa
lufthansa.buyPlane = function () {  // Agregamos un nuevo metodo a lufthansa
    this.planes++;                  // Ponemos el this para representar o llamar al objeto que dicha función está modificando.
    console.log(this);
    console.log(this.planes);
};                                  // lufthansa.buyPlane(); Esto despliega exacamente lo que queremos ver una vez que precionamos el boton del addEventListener().

//Al hacer esto, entonces decimos que, al hacer click, el console.log(this); retornara el boton. La razon de esto es porque en un event handler function, el "this" siempre 
//apunta al elemento donde se adjunta el handler. Por lo tanto, lufthansa.buyPlane es el handler function, y esta adjunto a la parte del querySelector, que seria el 
//elemento padre. Por eso, el console.log(this), muestra el elemento del boton. Ahora bien, en el handler function, necesitamos que el this de lufthansa.buyPlane apunte
//objeto de lufthansa, y no a la parte del querySelector. Para ello, tenemos que definirlo ahi mismo como se muestra en la linea que le sigue, y la manera de hacerlo es pasarle
//la funcion (bind) y no llamarla (call) porque el bind nos retornara una nueva funcion. Y finalmente, ahora el this apuntara a lufthansa y NO al boton del querySelector
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));


// Dos formas de devolver una funcion utilizando bind() y de la forma tradicional (devolviendo una funcion dentro de otra).
function addTax (rate, value){
    let res = value + value * rate;
    return res;
};

const addVAT = addTax.bind(null, 0.23); //Con el bind() obtendremos una nueva funcion
console.log("The result of addVAT is: "+ addVAT(100));

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};
const addVAT2 = addTaxRate(0.23);
console.log("The result of addVAT is: "+addVAT2(100)); */ /* // Ejemplo 6.6: Excercise with functions
// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter 'poll' object below. Your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
// 1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this: 
// What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)

// 1.2. Based on the input number, update the 'answers' array property. For example, if the option is 3, increase the value at position 3 of the array by one (1). Make sure 
// to check if the input is a number and if the number makes sense (e.g. answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 
// 'array', simply display the results array as it is, using cl(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
// 5. Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object!

// Test data for bonus: Data 1: [5, 2, 3]

const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"], // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),

    registerNewAnswer(){ // (1)
        const res = Number(prompt(`${this.question}\n${this.options.join("\n")}\n (Write option number)`)); // (1.1)
        typeof res === "number" && res < this.answers.length && this.answers[res]++; // (1.2) Si el primer if es verdadero, pasamos al siguiente, pero cuando lleguemos a un false, se corta el condicional (&& representa un if)
        console.log("Imprimos el objeto: ", poll);
        console.log("Imprimos el arreglo: ", this.answers);
        console.log("Imprimos el num seleccionado: ", res);

        this.displayResults();         //(4)
        this.displayResults("array");  //(4)
        this.displayResults("string"); //(4) 
    },
    
    displayResults(type = "array"){  //(3)
        if(type === "array"){
            console.log("Imprimimos el array con los valores", this.answers);
        }else if(type === "string"){
            console.log(`Poll results are ${this.answers.join(", ")}`);
        }
    }
};

document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll)) //(2)

//Usamos call() porque necesitamos un nuevo this. Es decir, usar la funcion de un objeto en otro. Despues, como this.answers necesita apuntar a otra direccion (ya que ahora 
//esta fuera de poll), dentro de los parentesis de call creamos y le pasamos un objeto con el mismo nombre (ya que sino aparece como undefined) y a ese objeto le añadimos el nuevo array 
//que queremos. Asi mismo, le pasamos un argumento para que se pueda ejecutar el condicional.
poll.displayResults.call({answers: [5, 2, 3]}, "string"); // (5) */ /* // Ejemplo 6.7: Immediately Invoked Function Expressions (IIFE)
//Se usa cuando queremos una funcion que se utilice de inmediato una vez, que no sea necesario guardarla ni darle yn nombre, y que finalmente desaparezca para no volverla a usar

const runOnce = function(){
    console.log("This will never run again");
};
runOnce();

(function(){ //Transformamos la declaracion que tenemos arriba, en una expresion.
    console.log("This will never run again");
})(); */ /* // Ejemplo 6.8: Closures
const secureBooking = function () {
    let passengerCount = 0;

    return function () {//Al momento de retornar esta funcion (hija), se tiene acceso a sus elementos o variables del padre. Em este caso, passengerCount, que es un global scope.
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker); */ /* // Ejemplo 6.9: More Closure Examples

//Example 1
let f; //Creamos una variable global que almacenara una funcion
const g = function () {
    const a = 23; //closure
    f = function () { //Podemos utilizar esta funcion repetidas ocaciones
        console.log(a * 2);
    };
};

const h = function () {
    const b = 777; //closure
    f = function () {
        console.log(b * 2);
    };
};

//Para poder acceder a f no podemos simplemente llamar a esa fucnion, ya que JS no la va a reconocer. Es decir, primero tenemos que llamar a su elemento padre y despues acceder a ella. En este caso, g y posteriormente h, son los padres de f.
g();
f();
console.dir(f);

h();
f();
console.dir(f);

//Example 2
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () { //setTimeout necesita de dos parametros, en este caso usaremos una funcion y el otro debe ser el tiempo.
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; //Si fijamos un valor en perGroup como variable global, de igual manera no se vera reflejado en el console.log porque al llamar la funcion, ejecutara la variable perGroup, la cual pisara a la que primero se creo con el valor de 1000.
boardPassengers(180, 3);


//Example 3
// Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element 
// is clicked. Do not select the h1 element again. Think about when exactly the callback function is executed, and what that means for the variables involved in this example.

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.querySelector('body').addEventListener("click", function(){
        header.style.color = 'blue';
    });
})();  */ //         $$$$$$$$$$$$$$$ Objetos $$$$$$$$$$$$$$$
/* // Ejemplo 1: Definicion de caracteristicas para un objeto y como podemos ver los datos dentro del objeto
let unPaciente = {DNI: "11222333", apellidos: "Mancilla", nombre: "German", edad: 36, altura: 170, peso: 72, generoBiologico: "Masculino", tipoSangre: "A+"};
console.log("El objeto contiene estos datos: ", unPaciente);
console.log("El paciente se llama: ", unPaciente.nombre);         //Forma 1 de seleccionar una variable de un objeto
console.log("El paciente se apellida: ", unPaciente["apellidos"]);//Forma 2 de seleccionar una variable de un objeto */ /* // Elemplo 2: Aignacion de valores
let unPaciente = {DNI: "11222333", apellidos: "Mancilla", nombre: "German", edad: 36, altura: 170, peso: 72, generoBiologico: "Masculino", tipoSangre: "A+"};
unPaciente.apellidos = "res";
unPaciente.nombre = "SS22";
unPaciente.DNI = 44555666;
unPaciente["edad"] = 33;
console.log("Los datos actualizados son: ", unPaciente); */ /* // Ejemplo 3: Definicion de un objeto sin datos definidos para sus propiedades.
let unPaciente = {DNI: undefined, apellidos: undefined, nombre: undefined, edad: undefined, altura: undefined, peso: undefined, generoBiologico: undefined, tipoSangre: undefined};
unPaciente.apellidos = "res";
unPaciente.nombre = "SS22";
unPaciente.DNI = 44555666;
unPaciente["edad"] = 33;
console.log("Los datos actualizados son: ", unPaciente); */ /* // Ejemplo 4: Definicion de una funcion constructora para un objeto
function paciente(DNI, apellidos, nombre, edad, altura, peso, generoBiologico, tipoSangre){
this.DNI = DNI;
this.apellidos = apellidos;
this.nombre = nombre;
this.edad = edad;
this.altura = altura; 
this.peso = peso;
this.generoBiologico = generoBiologico;
this.tipoSangre = tipoSangre;
this.obraSocial = undefined;};

let paciente1 = new paciente("44555666","Cosme","Pricilla",undefined,183,65,"femenino",undefined);
console.log("Los datos actualizados son: ", paciente1); */ /* // Ejemplo 5: Ejemplo de aplicacion de metodos de un objeto
function producto(nombre, precio, cantidad){
    //propiedades
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
    this.hayInventario = !!parseInt(cantidad); //this.hayInvenatrio = hayInventario; (ambas son correctas)
    
    //. !parseInt(cantidad) --> es un valor booleano, si el n�mero es 10, se convierte en false, si es 0 se convierte en true.
    //   Pero nosotros necesitamos el valor equivalente real, si ingres� 10 quiero que sea true, si ingres� 0 quiero que sea false. Por ello es que agregamos dos negaciones !!
    //. !!parseInt(cantidad) --> lo que conseguimos con la !! es consegui el inverso de un elemento inverso. O sea, el valor booleano true de un elemento.
    //   Podemos definir un par�metro como (hayInventario) y en este pasar desde la funci�n constructora a partir de la palabra reservada new. Tener en cuenta que esta segunda opci�n nos "obliga" a manejar este dato y su valor durante la carga de los datos que el usuario indique.    
    
    //metodos
    this.toString = function(){
        return this.nombre;
    };

    this.Stock = (cantidadIncrementada) => {
        return this.cantidad += this.cantidad + parseInt(cantidadIncrementada);
    };

    this.comprar = (cantidadComprada) => {
        return this.cantidad -= parseInt(cantidadComprada);
    };
};

let nombre = "Carne";
let precio = "200";
let cantidad = "5";
let unProducto1 = new producto(nombre, precio, cantidad);
console.log("Los valores que cargaste para el producto son: ", unProducto1); */ /* // Ejemplo 6: Uso de las construcciones IN y FOR-IN
function paciente(DNI, apellidos, nombre, edad){
this.DNI = DNI;
this.apellidos = apellidos;
this.nombre = nombre;
this.edad = edad;
};

let paciente1 = new paciente("44555666", "Cosme", "Pricilla", 24);

console.log("Existe la propiedad DNI dentro del objeto?", {resultado: "DNI" in paciente1});
//console.log("Existe la propiedad DNI dentro del objeto?", "DNI" in paciente1); //Esto es lo mismo que la linea de arriba

console.log("Existe la propiedad obraSocial dentro del objeto?", {resultado: "obraSocial" in paciente1});
//console.log("Existe la propiedad obraSocial dentro del objeto?", "obraSocial" in paciente1); //Esto es lo mismo que la linea de arriba

for(const iter in paciente1){ //Despues del const podemos poner cualquier nombre, el cual servira para iterar y buscar todas las propiedades del objeto.
    console.log("La propiedad ("+iter + ") tiene el valor de: "+ paciente1[iter]);
} */ /* // Ejemplo 7: Ejemplo practico con objetos y funciones 

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYeah: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,

    calcAge0: function (birthYeah) {
        return 2037 - birthYeah;
    },

    calcAge1: function () {
        return 3000 - this.birthYeah;
    },
    
    calcAge2: function () {
        return this.age = 4000 - this.birthYeah;
    },
    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge2() - this.birthYeah}years old ${jonas.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
    //  return `${jonas.firstName} is a ${this.calcAge2()}-year old ${jonas.job}, and he has ${jonas.hasDriversLicense ? 'a' : 'no'} driver's license.`
    }
};

console.log(jonas);
console.log("res1: ",jonas.calcAge0(1991));
console.log("res2: ",jonas.calcAge1());
console.log("res3: ",jonas.calcAge2());
console.log("res4: ",jonas.age);
console.log("res5: ",jonas.getSummary()); 

const measureKelvin = function () {
    const measurement = {type: 'temp', unit: 'celsius', value: parseInt(100),};
    console.table(measurement);
    const kelvin = measurement.value + 273;
    return kelvin;
};

console.log(measureKelvin()); */ /* // Ejemplo 8: Definicion de una clase y uso de los metodos dentro de una clase

class producto{
    //Metodo constructor de una clase
    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.hayInventario = !!parseInt(cantidad); //this.hayInvenatrio = hayInventario; (ambas son correctas)
    };

    //Metodos y funciones
    nombreProducto() {
        return this.nombre;
    }

    incrementarStock(cantidadIncrementada) {
        this.cantidad = this.cantidad + parseInt(cantidadIncrementada);
    }

    comprar(cantidadComprada){
        this.cantidad = this.cantidad - parseInt(cantidadComprada);
    }
}

let unProducto = new producto("Papa", 400, 50);
console.log("Los datos del producto son: ", unProducto);
console.log("El nombre del producto es: "+ unProducto.nombreProducto());

unProducto.incrementarStock(10);
console.log("Compre 10 kilos mas de papa y ahora tengo: ", unProducto);
unProducto.comprar(40); 
console.log("Compre 40 kilos mas de papa y ahora tengo:", unProducto); */ /* // Ejemplo 9: Literales de objeto mejoradas

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const openingHours = {
        [weekdays[3]]: {open: 12,close: 22,},
        [weekdays[4]]: {open: 11,close: 23,},
        [weekdays[5]]: {open: 0,close: 24,},
    };

    console.log(openingHours);

const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],
    fecharegistro: new Date(),
    poseeTaarjetaCredito: false, 
    poseeVehiculo: true,

    openingHours, //openingHours: openingHours,    Ambas son lo mismo

    order(starterIndex, mainIndex){  //order: function(starterIndex, mainIndex){   Ambas son lo mismo
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery({time, address, mainIndex, starterIndex}){
        return console.log(`Desestructuracion de un objecto usando funcion --> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderDeliveryX2({time="20:00", address, mainIndex=0, starterIndex=1}){
        return console.log(`Desestructuracion de un objecto usando funcion X2--> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    }
}; */ //         $$$$$$$$$$$$$$$ POO $$$$$$$$$$$$$$$
/* //Ejemplo 1: Constructor Functions, the "new" and the "this" Operator (do this)

// 1. New {} is created. We create a new instance (a new empty object) of the Person function.
// 2. function is called, this = {}. The this keyword will be set to this newly created object. That's to say, the "this" keyword points to the new empty object.
// 3. {} linked to prototype
// 4. function automatically return {} that empty object from the constructor function 

// NEVER DO THIS!
// function Person(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;

//     this.calcAge = function () {
//         console.log(2037 - this.birthYear);
//     };
// };

function Person(firstName, birthYear) { //Constructor function
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function () { //We create a new calcAge method with the prototype keyword to the Person object. So, we can use this method on the german or karla object even though it isn't on the object itself. The reason why we create this method outsite the constructor function, is becuase when creating it inside, this method is added to all the object created. So, it's best to add this method to every object just when necessary.
    console.log("My age is: ", 2037 - this.birthYear);
}; 

const german = new Person('German', 1991);
const karla = new Person('Karla', 2017);

german.calcAge();
karla.calcAge();

console.log("german is an instance of Person? ", german instanceof Person);
console.log(german, karla);    //Although we created a new calcAge method in both objects, they don't contain this method but we have access to it because of prototypal inherencce.

// Prototypal Inheritance on Built-In Objects
console.log("Person.prototype ", Person.prototype); //"prototype" let you to add properties and methods to JavaScript objects (in this case, the Person object). All the objects that are created through this function constructor function (Person), will inherit. So they will get access to all the methods and properties that arre defined on this prototype property.
console.log("german.__proto__ ", german.__proto__); //This is the prototype of german (not the prototype porperty) It is the same as: console.log(Person.prototype); 
console.log(german.__proto__.__proto__);            //It is the prototype property of object
console.log(german.__proto__ === Person.prototype); //It's true because the prototype of the german object is essentially the prototype property of the constructor function. (Person.prototype is actually not the prototype of Person, but it is what's gonna be used as the prototype of all the objects that are created with the person constructor function. )
console.dir(Person.prototype.constructor);

console.log(Person.prototype.isPrototypeOf(german));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';

console.log(german.species, karla.species);      //Both objects will inherit and will get access to this property from the prototype.
console.log(german.hasOwnProperty('firstName')); //This is true because "firstname" was created directly in the constructor function
console.log(german.hasOwnProperty('species'));   //This is false because the species property isn't directly in the object because of it's not its own property (the ones that are declared directly on the object itself, and not including the inherited properties).


const arr = [3, 6, 6, 5, 6, 9, 9]; //  new Array === []  whenever we create an array like this, it is indeed created by the array constructor.
console.log("Array.prototype ", Array.prototype)
console.log("arr.__proto__ ", arr.__proto__);
console.log(arr.__proto__.__proto__);
console.log(arr.__proto__ === Array.prototype); 

Array.prototype.unique = function () { //We create a new method (unique) into the object Array. Some methods like this are filter, some, map, etc.
    return [...new Set(this)];
};

console.log(arr.unique()); //Seeing in the MDN documentation, we can realize that every method (function) when using arrays, have the following sintaxis: Array.prototype.map().

const h1 = document.querySelector('h1'); console.dir(h1)
console.dir(function funciones(x){x + 1}); */ /* //Ejemplo 2: classes, Setters and Getters (assessors properties), static method and Object.create

//We need to create a constructor function. Whenever we create a new object (like a new instance using the new operator), this constructor will automatically be called.
class PersonCl{
    constructor(fullName, birthYear){ 
        this.fullName = fullName;
        this.birthYear = birthYear;
    }; 

    //Instance methods (Methods will be added to .prototype property and all instances can have access to them)
    calgAge(){ //All the methods that we write in the class (outside of the constructor), will be on the prototype on the object and not on the objects themselves.
        console.log("calgAge: ", 2037 - this.birthYear);
    };

    greet(){
        console.log(`greet:  ${this._fullName}`)
    }

    get age(){
        return `age: ${2037 - this.birthYear}`;
    }
    
    //Set a property that already exists.
    set fullName(name){ 
        //We're creating a setter for a property name that does already exists. So, fullName is already a property to set in the constructor function, but then we also have a 
        //setter here. Now what's gonna happen is that each time the constructor function is executed, so whenever we set the fullName on the this keyword, then actually the 
        //method (set fullName) is gonna be executed. And, that name that we pass in as fullName (German mancilla) will then become this name.
        //Now, When we're using setters which is trying to set a property that already exists, both the setter function here and the construction function have the exact same 
        //property name (fullName), and will get an error. So, to fix that, we need to create a new property name, that's to say, "fullName" must be a different name.
        //Having done so, then the "fullName" property in the object german won't exists, but the "_fillname" property will. If we aren't going to setter for a property name 
        //that does already exists, then there's no need to change the name of this variable.
        console.log("name ", name);
        name.includes(" ") ? this._fullName = name : `${name} is not a full name!`
    }

    get fullName(){
        return this._fullName;
    }

    static hey(){ //Static class methods are defined on the class itself. Staic are not available on instances
        console.log("Hello world");
        console.dir(this);
    }
    
}

const german = new PersonCl("German mancilla", 1998); //We use the this keyword as before, and will be set to the newly created empty object. So, when we create a new instance here, then the constructor function is gonna be called and that will return a new object and then that will be stored in "dani".

// This method is NOT inherited. So, we couldn't call the from method on an array like german.hey(); because it isn't in the prototype of the german object.
// PersonCl.hey = function(){
//     console.log("Hello world");
//     console.log(this)
// }
// german.hey(); //We will get an error because german doesn't inherit the hey() method

console.log(german);
console.dir(PersonCl);
german.calgAge();
german.greet();
console.log(german.age);
PersonCl.hey(); //That's exactly the object that is calling the method. So, whatever object is calling the method, will be the this keyword inside of that funcion. And here the this keyword  is simply the entire constructor function.
console.dir(PersonCl.hey)

console.log(german.__proto__);
console.log(german.__proto__ === PersonCl.prototype);

// 1. Classes are not hoisted even if they're class declarations. Functions declarations are hoisted, which means we can use them before they're declared in the code. With classes tgat doesn't work.
// 2. Class are first-class citizens. This means that we can pas them into functions and also return them from functions. (classes are just a special kind of functions behind the scenes)
// 3. Classes are executed in strict mode. And so even if we didn't activate it for our entire script, all the code that is in the class will be executed in strict mode.

const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

//Object.create 
// --> Here there's still the idea of prototypal inheritance. However, there are no prototypal properties involved and also no constructor funcionds and no new operator. So, we can use Object.create to manually set the prototype of an object to any other object that we want.
const PersonProto = {
    init(firstName, birthYear){ //This looks like the constructor function that we created in the last methods, but here this is isn't the case becasue we don't use the new operator to call this.
        this.firstName = firstName; //The this keyword will point to the mancilla object, and it does so because we explicitly called   mancilla.init("German", 1998);
        this.birthYear = birthYear;
        console.log(this); // === console.log(mancilla);
    },

    calgAge(){ //All the methods that we write in the class (outside of the constructor), will be on the prototype on the object and not on the objects themselves.
        console.log("calgAge: ", 2037 - this.birthYear);
    },
}

const mancilla = Object.create(PersonProto); //This will return a brand new object that is linked to the prototype that we passed in here. So, mancilla is right now an empty object and it'll be linked to the PersonProto object. PersonProto should be the prototype of mancilla.

console.log(PersonProto);
console.log(mancilla.__proto__);
console.log(mancilla.__proto__ === PersonProto);

// mancilla.name = "chavez"; //We can create properties manually like this
// mancilla.year = 2002;

mancilla.init("German", 1998);
mancilla.calgAge(); //The calcAge() method is called on an object, for example, on the mancilla object. This means that the 'this' keyword inside of the calcAge() method will reference mancilla object. The mancilla object has a property called birthYear, so this.birthYear inside of calcAge() will translate to mancilla.birthYear . */ /* //Ejemplo 3: Inheritance Between "Classes": Constructor Functions
function Person(firstName, birthYear) { //Constructor function
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function () { //We create a new calcAge method with the prototype keyword to the Person object. So, we can use this method on the german or karla object even though it isn't on the object itself. The reason why we create this method outsite the constructor function, is becuase when creating it inside, this method is added to all the object created. So, it's best to add this method to every object just when necessary.
    console.log("My age is: ", 2037 - this.birthYear);
}; 
                    
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function Student(firstName, birthYear, course){ //Child function of the Person function, and it will inherit everything of its parent funciton.
    //Person(firstName, birthYear); //❌❌❌ If we would want to avoid duplicating code (in this case, re-write firstName and birthYear in Student), the problem here is that we are now actually calling this person constructor function as a regular function call. So we are not using this new operator to call this person function constructor. And so therefore this function call here is simply a regular function call. And remember that in a regular function call, the this keyword is set to undefined. And so therefore that's why we get this error here, that it cannot set first name on undefined. So instead of simply calling the person function here, we need to manually set the this keyword as well.
    Person.call(this, firstName, birthYear); // ✔✔✔ We need to call the function and at the same time set the this keyword inside that function. To do that, we can simply use the call method, which will call the function but we'll be able to specify the this keywords as the first argument in the function. In the next line, we can the this keyword inside the Person function so simply be the this keyword inside this funcion. Now, the this keyword (Person.call) is going to be in the beggining, the empty object (german) that is being created by the new operator. And so it is on that new object where we want to set the first name and the birthYear property.
    this.course = course;
}

//Student.prototype = Person.prototype; //❌❌❌ We must not do this because if so, we're saying that the student's prototype property and the person's prototype property should be the exact same object.
Student.prototype = Object.create(Person.prototype); // ✔✔✔ We want to make Person.prototype the prototype of Student.prototype (inherit from it and should not be the same object). So, to link the two prototype objects, we do the following. That's because Object.create defines prototypes manually. Now, the Student.prototype object is an object that inherits from Person.prototype. We have to do this before any we add any more methods to the prototype object of student because Object.create, will return a new empty object.

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}; 

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const german = new Student("German", 2023, "Computer science");

german.introduce();
german.calcAge(); //This function from Person works in Student as well because this last one inherit the function from Person by using Student.prototype = Object.create(Person.prototype);
console.log(german.__proto__);
console.log(german.__proto__.__proto__);

console.log(german instanceof Student); //true
console.log(german instanceof Person);  //true. If we didn't have Student.prototype = Object.create(Person.prototype), then it should be false because german wouldn't inherit from Person but Student.
console.log(german instanceof Object);  //true. It is also an instance of Object because this is also in its prototype chain.

console.log(german); //We must realize that when open up the [[Prototype]] element, we'll see that is says Person instead of Student, but german is actually of the type Student. 
console.dir(Student); //This is the real prototype property of Student.
Student.prototype.constructor = Student;  
console.dir(Student.prototype.constructor); //Student.prototype.constructor is pointing back to Person, and the reason for that we set the prototype property of the student using Object.create(). So this make it so that the constructor of Student.prototype is still Person. (This will be best viewed using Firefox) */ /* //Ejemplo 4: Inheritance Between "Classes": ES6 Classes
class PersonCl{
    constructor(fullName, birthYear){ 
        this.fullName = fullName;
        this.birthYear = birthYear;
    }; 

    //Instance methods (Methods will be added to .prototype property and all instances can have access to them)
    calgAge(){ //All the methods that we write in the class (outside of the constructor), will be on the prototype on the object and not on the objects themselves.
        console.log("calgAge: ", 2037 - this.birthYear);
    };

    greet(){
        console.log(`greet:  ${this._fullName}`)
    }

    get age(){
        return `age: ${2037 - this.birthYear}`;
    }
    

    set fullName(name){  //Set a property that already exists.
        console.log("name ", name);
        name.includes(" ") ? this._fullName = name : `${name} is not a full name!`
    }

    get fullName(){
        return this._fullName;
    }

    static hey(){ //Static class methods are defined on the class itself. Staic are not available on instances
        console.log("Hello world");
        console.dir(this);
    }
}

class StudentCl extends PersonCl{
    constructor(fullName, birthYear, course){
        super(fullName, birthYear); //Always neets to happen first. super is basically the constructor function of the parent class. This is similar to use the "call" method in the Constructor Functions. We don't need to specify the name of the parent class again because that already happened in "extends PersonCl". Finally, we have to pass in the arguments for the constructor of the parent class (the parameters in the constructor funcion of PersonCl)
        this.course = course;
    }

    inroduce(){
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    calgAge(){
        console.log("Hello world");
    }
}

const german = new StudentCl("German mancilla", 1998, "Computer science");
console.log(german);
german.inroduce();
german.calgAge(); */ /* //Ejemplo 5: Inheritance Between "Classes": Object.create
const PersonProto = {
    init(firstName, birthYear){     //This looks like the constructor function that we created in the last methods, but here this is isn't the case becasue we don't use the new operator to call this.
        this.firstName = firstName; //The this keyword will point to the mancilla object, and it does so because we explicitly called   mancilla.init("German", 1998);
        this.birthYear = birthYear;
        // console.log(this);
    },

    calgAge(){ //All the methods that we write in the class (outside of the constructor), will be on the prototype on the object and not on the objects themselves.
        console.log("My age is: ", 2037 - this.birthYear);
    },
}

const mancilla = Object.create(PersonProto);
const SudentProto = Object.create(PersonProto);

SudentProto.init = function(firstName, birthYear, course){
    PersonProto.init.call(this, firstName, birthYear); //We do this so that we can avoid writing the same code (this.firstName = firstName and this.birthYear = birthYear).
    this.course = course;
}

SudentProto.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const karla = Object.create(SudentProto);
karla.init("Karla Marquez", 1998, "Computer science");
karla.introduce();
karla.calgAge();
console.log(karla); */ /* //Ejemplo 6: Another Class Example
class Account{
    constructor(owner, currency, pin, movements){
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        this.locale = navigator.language;
        this.movements = []; //We can create even more properties on any instance and properties tjat are not based on any inputs. 

        console.log(`Thanks for opening an account, ${owner}`); //We can even execute any code here in this constructor that we want. When someone opens a new account then will recieve this message. 
    }

    //The reason why we defined deposit and withdraw inside the class Account is because we want these two methods to be inherited by all the instances of the Account class. 
    //Methods put outside of the constructor(), but inside of the class's body are put in the prototype meaning they will be inherited by all of the instances of that class.
    deposit(val){
        this.movements.push(val)
    }

    withdraw(val){
        this.deposit(-val); //We can call other methods inside of a certain one. But we forcelly need to use the this keyword to be able to access this other method.
    }

    aproveLoan(){
        return true;
    }

    requestLoan(val){
        if (this.aproveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved for ${val}$`);
        }
    }
}

const acc1 = new Account("German", "EUR", 1111);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1); */ /* //Ejemplo 7: Encapsulation, Protected Properties and Methods
//Encapsulation basically means to keep some properties and methods private inside the class so that they are not accessible from outside of the class.
class Account{
    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.locale = navigator.language;
        
        //Protected propertyes
        this._pin = pin;
        this._movements = []; //We can create even more properties on any instance and properties that are not based on any inputs. This doen't actually make the property truly private because it's just a convention

        console.log(`Thanks for opening an account, ${owner}`); //We can even execute any code here in this constructor that we want. When someone opens a new account then will recieve this message. 
    }

    //Public interface
    getMovements(){ //if we still wanted to give access to the movements array from the outside then we would have to implement a public method for that
        return this._movements;
    }

    //The reason why we defined deposit and withdraw inside the class Account is because we want these two methods to be inherited by all the instances of the Account class. 
    //Methods put outside of the constructor(), but inside of the class's body are put in the prototype meaning they will be inherited by all of the instances of that class.
    deposit(val){
        this._movements.push(val)
    }

    withdraw(val){
        this.deposit(-val); //We can call other methods inside of a certain one. But we forcelly need to use the this keyword to be able to access this other method.
    }

    _aproveLoan(){ //This method shouldn't be part of the public API, but all the others should be.
        return true;
    }

    requestLoan(val){
        if (this._aproveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved for ${val}$`);
        }
    }
}

const acc1 = new Account("German", "EUR", 1111);

acc1._movements.push(250);
acc1._movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements()); //Someone can access the movements but they can't overwrite them.
console.log(acc1); */ /* //Ejemplo 8: Encapsulation: Private Class Fields and Methods

//Encapsulation basically means to keep some properties and methods private inside the class so that they are not accessible from outside of the class.
class Account{
    
    // 1) Public fields (instances). These public fields are gonna be presened on all the instances that we are creating through the class. (They're referenceable by the this keyword). So they're not on the prototype. Finally, these two instances are the same as the two ones on the Protected properties.
    locale = navigator.language;

    // 2) Private fields (instances). With this, properites are really truly not accessible from the outside.
    #movements = [] //The # makes a field private
    #pin;           //We cannot define a field in the constructor

    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;

        console.log(`Thanks for opening an account, ${owner}`); //We can even execute any code here in this constructor that we want. When someone opens a new account then will recieve this message. 
    }

    // 3) Public methods
    getMovements(){
        return this.#movements;
    }

    deposit(val){
        this.#movements.push(val)
        return this; //deposit returns undefined because we're not returning anything explicitly here. So, to fix that, we need to return this, because the this keyword here is the current object. This line of code will make the method chainable. Finally, you must keep in mind that we have to do the same thing in deposit(), withdraw() and requestLoan() because the three of them deal with a private property (#movements).
    }

    withdraw(val){
        this.deposit(-val); //We can call other methods inside of a certain one. But we forcelly need to use the this keyword to be able to access this other method.
        return this;
    }

    requestLoan(val){
        if (this.#aproveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved for ${val}$`);
            return this;
        }
    }

    static helper(){
        console.log("Hello world!")
    }

    // 4) Private methods. This is very useful to hide the implementations details from the outside.
    #aproveLoan(){ //This method shouldn't be part of the public API, but all the others should be.
        return true;
    }
}

const acc1 = new Account("German", "EUR", 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements()); //Someone can access the movements but they can't overwrite them 
console.log(acc1); 
Account.helper();
// console.log(acc1.#movements); //We'll get an error because this is private.

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements()); */ /* //Ejemplo 9:  Ejercicio de repaso numero 1: using constructor Functions, the "new" and the "this" Operator
// 1. Use a constructor function to implement a 'Car'. A car has a 'brand' and a 'speed' property. The 'speed' property is the current speed of the car in km/h
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them

//GOOD PRACTICE
function Car(brand, speed){
    this.brand = brand;
    this.speed = speed;
}

Car.prototype.accelerate = function(){
    this.speed = this.speed + 10;
    console.log(`${this.brand} is going at ${this.speed} km/h`)
}

Car.prototype.brake = function(){
    this.speed = this.speed - 5;
    console.log(`${this.brand} is going at ${this.speed} km/h`)
}

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();

//BAD PRACTICE
// function Car(brand, speed){
//     this.brand = brand;
//     this.speed = speed;

//     this.accelerate = function () {
//         this.speed = this.speed + 10;
//         console.log(`${this.brand} is going at ${this.speed} km/h`)
//     };

//     this.brake = function () {
//         this.speed = this.speed - 5;
//         console.log(`${this.brand} is going at ${this.speed} km/h`)
//     };
// }

// const bmw = new Car("BMW", 120);
// const mercedes = new Car("Mercedes", 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// bmw.brake(); */ /* //Ejemplo 10: Ejercicio de repaso numero 2: using classes, Setters and Getters
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6) methods, and with the getter and setter.
// § Data car 1: 'Ford' going at 120 km/h

class CarCl {
    constructor(brand, speed){
        this.brand = brand;
        this.speed = speed;
    }
    
    accelerate(){
        this.speed = this.speed + 10;
        console.log(`${this.brand} is going at ${this.speed} km/h`)
    }
    
    brake(){
        this.speed = this.speed - 5;
        console.log(`${this.brand} is going at ${this.speed} km/h`)
    }

    get speedUS(){
        return this.speed / 1.6;
    }

    set speedUS(speed){
        this.speed = speed*1.6;
    }
}

const ford = new CarCl("Ford", 120);
console.log(`${ford.speedUS} mi/h`);
ford.accelerate();
ford.speedUS = 50;
console.log(ford); */ /* //Ejemplo 11: Ejercicio de repaso numero 3: using Inheritance Between "Classes": Constructor Functions
1. Use a constructor function to implement an Electric Car (called 'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current
   battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 
   'Tesla going at 140 km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'!

function Car(brand, speed){
    this.brand = brand;
    this.speed = speed;
}

Car.prototype.accelerate = function(){
    this.speed = this.speed + 10;
    console.log(`${this.brand} is going at ${this.speed} km/h`)
}

Car.prototype.brake = function(){
    this.speed = this.speed - 5;
    console.log(`${this.brand} is going at ${this.speed} km/h`)
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function EV(brand, speed, charge){
    Car.call(this, brand, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype); //We want to make Car.prototype the prototype of EV.prototype (inherit from it and should not be the same object). So, to link the two prototype objects, we do the following. That's because Object.create defines prototypes manually. Now, the ev.prototype object is an object that inherits from Car.prototype. We have to do this before any we add any more methods to the prototype object of EV because Object.create, will return a new empty object.

EV.prototype.chargeBattery = function(chargeTo){ //We create a new method
    this.charge = chargeTo;
}

EV.prototype.accelerate = function(){ //We create a new method.
    this.speed += 20; 
    this.charge--;
    console.log(`Tesla going at ${this.speed}, with a charge of ${this.charge}`)
}

const tesla = new EV("Tesla", 129, 23);  
tesla.brake(); //Having used the Object.create(), now we can also access to the methods in the constructor function (car), from the EV function. If we don't use EV.prototype = Object.create(Car.prototype), then we won't be able to access to this method in Car.
tesla.chargeBattery(90);
tesla.accelerate(); // There are two methods with the same name (accelerate). So, the first one is in the tesla's object, and the second one in the constructor function (Car). When there are two or more methods or properties with the same name in a prototype chain, then JS will always use the first one. Finally, a child class can overwrite a methid that inherited from the parent class.

EV.prototype.constructor = EV;
console.log(tesla);
console.dir(EV.prototype.constructor); */ /* //Ejemplo 12: Ejercicio de repaso numero 4: using Inheritance Between "Classes": ES6 Classes and Object.create(), and using encapsulation.
// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!
// Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%

class CarCl{
    constructor(brand, speed){
        this.brand = brand;
        this.speed = speed;
    }
    accelerate(){
        this.speed = this.speed + 10;
        console.log(`${this.brand} is going at ${this.speed} km/h`);
        return this;
    }
    
    brake(){
        this.speed = this.speed - 5;
        console.log(`${this.brand} is going at ${this.speed} km/h`);
        return this;
    }

    get speedUS(){
        return this.speed / 1.6;
    }

    set speedUS(speed){
        this.speed = speed*1.6;
    }
}

class EVCl extends CarCl{
    #charge

    constructor(brand, speed, charge){
        super(brand, speed);
        this.#charge = charge;
    }
        
    chargeBattery(chargeTo){ //We create a new method
        this.#charge = chargeTo;
        return this;
    }
    
    accelerate(){ //We create a new method.
        this.speed += 20; 
        this.#charge--;
        console.log(`Tesla going at ${this.speed}, with a charge of ${this.#charge}`);
        return this;
    }
}

const rivian = new EVCl("Rivian", 120, 23);
console.log(rivian);
rivian.accelerate().accelerate().accelerate().brake().chargeBattery(50).accelerate();
console.log(rivian.speedUS); */ //         $$$$$$$$$$$$$$$ Arrays $$$$$$$$$$$$$$$
/* //Ejemplo 1: Declaracion y manejo de un array con numeros que vamos a operar entre ellos

const VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"]; console.log("Los datos del vector son: ", VECTOR_DE_CADENAS);
const VECTOR_DE_BANDERAS = [true, false, true, false];console.log("Los datos del vector son: ", VECTOR_DE_BANDERAS);
const VECTOR_HETEROGENEO = [2023, "german", true, 22]; console.log("Los datos del vector son: ", VECTOR_HETEROGENEO);
const MI_ARRAY_DE_NUMEROS = [10, 20, 50, 80]; console.log("Los datos del vector son: ", MI_ARRAY_DE_NUMEROS);

const res1 = MI_ARRAY_DE_NUMEROS[2] + MI_ARRAY_DE_NUMEROS[3]; console.log("El resultado es: "+ res1);
const res2 = VECTOR_DE_CADENAS[0] + " " + VECTOR_DE_CADENAS[2]; console.log("Los datos del vector son: ", res2);
const res3 = MI_ARRAY_DE_NUMEROS[0] + VECTOR_DE_CADENAS[2]; console.log("El resultado es: ", res3); */ /* //Ejemplo 2: Como recorremos un array
const VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
//for (let i = 0; i < VECTOR_DE_CADENAS.["length"]; i++) {
for (let i = 0; i < VECTOR_DE_CADENAS.length; i++) {
    console.log("El elemento en la posicion " + i + " es el nombre: "+ VECTOR_DE_CADENAS[i])    
} */ /* //Ejemplo 3: Como anadir elementos en x posicion sustituyendo el de esa misma posicion
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let nombre = "karla";
VECTOR_DE_CADENAS[2] = nombre;
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */ /* //Ejemplo 4: Recorrer un array con |for-of|
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    openingHours: {
        thu: {open: 12,close: 22,},
        fri: {open: 11,close: 23,},
        sat: {open: 0, close: 24,}, // Open 24 hours
    },
};

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const res of menu) {
//     console.log(res);
// }

// for (const item of menu.entries()) {
//     console.log(item);
// }

for (const item of menu.entries()) {
    console.log(`${item[0] + 1}: ${item[1]}`);
}

console.log("\n");

for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}: ${el}`);
} */ /* //Ejemplo 5: Conocer la cantidad de elementos que tiene nuestro array con  |.length()|
const VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
console.log("Cuantos elementos tengo en mi array?", VECTOR_DE_CADENAS.length);
console.log("Cual es la posicion de mi ultimo elemento dentro de mi array?", VECTOR_DE_CADENAS.length-1) */ /* //Ejemplo 6: Como anadir elementos a un array con  |.push()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
let nombre = "karla";
VECTOR_DE_CADENAS.push(nombre);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */ /* //Ejemplo 7: Como anadir elementos al principio de un array con |.unshift()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez"];
let nombre = "karla";
VECTOR_DE_CADENAS.unshift(nombre);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */ /* //Ejemplo 8: Como eliminar elementos en la primer posicion de un array con |.shift|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.shift();
console.log("El elemento recuperado es: ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */ /* //Ejemplo 9: Como eliminar elementos en la ultima posicion de un array con |.pop()|

let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.pop();
console.log("El elemento recuperado es: ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS); */ /* //Ejemplo 10: Como eliminar uno o mas elementos de un array con |.splice()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let elementoRecuperado = VECTOR_DE_CADENAS.splice(1,2); //1 = la posicion - 2 = cantidad de numeros a eliminar a partir de 1
console.log("Los elementos removidos dentro del array son ",elementoRecuperado);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS);

console.log("\n");

let VECTOR_DE_CADENAS1 = ["german", "mancilla", "chavez", "junior"];
let elementoRecuperado1 = VECTOR_DE_CADENAS1.splice(1,0, "karla", "res"); //1 = la posicion - 0 = cantidad de numeros a eliminar a partir de 1
//let elementoRecuperado1 = VECTOR_DE_CADENAS1.splice(1,0, ["marquez", "beatriz"]);
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS1);
console.log("Los elementos removidos dentro del array son ", elementoRecuperado1); */ /* //Ejemplo 11: Tomar un conjunto de elementos de dentro de un array y generar un nuevo array con ellos con |.slice()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior", "karla"];
console.log([...VECTOR_DE_CADENAS]);
let resultadoDelSlice = VECTOR_DE_CADENAS.slice(2, 5); //2 = esta posicion no se toma, sino la siguiente. 5 = limite que se toma en cuenta
console.log("La cadena generada con nombres es: ",resultadoDelSlice); */ /* //Ejemplo 12: Obtener una cadena con cada uno de sus elementos concatenados, separados con un caracter o cadena especial con |.join()|.
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let resultadoDelJoin = VECTOR_DE_CADENAS.join(", ");
console.log("Los nuevos nombres dentro del array son: ",VECTOR_DE_CADENAS);
console.log("La cadena generada con nombres es: ",resultadoDelJoin); */ /* //Ejemplo 13: Combinar los elementos de dos arrays con |.concat()|
let VECTOR_DE_CADENAS1 = ["german", "mancilla", "chavez"], VECTOR_DE_CADENAS2 = ["Karla", "beatriz", "marquez"];
let resultadoDelJoin = VECTOR_DE_CADENAS1.concat(VECTOR_DE_CADENAS2);
console.log("La cadena generada con nombres es: ",resultadoDelJoin); */ /* //Ejemplo 14: Conocer la posicion de un elemento dentro de un array (si existe o no) con |.indexof()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let posicionDeMancilla = VECTOR_DE_CADENAS.indexOf("chavez");
console.log("La cadena generada con nombres es: ",posicionDeMancilla);

let posicion = VECTOR_DE_CADENAS.indexOf("karla");
posicion != -1 ? console.log("El nombre esta en la posicion: ", posicion) : console.log("El nombre NO existe"); */ /* //Ejemplo 15: Conocer si existe o no un elemento dentro de un array (Valor booleano) con |.includes()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
let nombre = "mancilla"
let existe = VECTOR_DE_CADENAS.includes(nombre);

existe ? console.log("El nombre SI existe") : console.log("El nombre NO existe"); */ /* //Ejemplo 16: Tomar al array e invertir el orden de sus elementos con |.reverse()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
VECTOR_DE_CADENAS.reverse();
console.log("--> El array con los nombres cambiados de lugar es", VECTOR_DE_CADENAS); */ /* //Ejemplo 17: Retornar el elemento indexado de un array o el elemento contenido en x posicion |.at()|
let VECTOR_DE_CADENAS = ["german", "mancilla", "chavez", "Junior"];
console.log(VECTOR_DE_CADENAS.at(3).at(1)); //Obtenemos el elemento contenido en el array (Junior), y en el siguiente at, obtenemos la posicion de la letra. */ /* // Ejemplo 18: Metodo |.fill()| para llenar un array con cualquier tipo de dato
const array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4)); // Fill with 0 from position 2 until position 4  --> [1, 2, 0, 0]
console.log(array1.fill(5, 1));    // Fill with 5 from position 1 --> [1, 5, 5, 5]
console.log(array1.fill(6));       //Fill the array with only "6" --> [6, 6, 6, 6] */ /* //Ejemplo 19: Uso del metodo |new Array| para crear un arreglo de x cantidad de numeros y el metodo |Array.from()| para crear un array a partir de un objeto.
const res = new Array(1, 2, 3, 4, 5, 6, 7); // const res = [1, 2, 3, 4, 5, 6, 7];
const x = new Array(7); //Creamos un array vacio de 7 espacios de memoria.
x.fill(1);              //LLenamos el arreglo con puros "1".
console.log(x);

// Array.from(object, mapFunction, thisValue)
const y = Array.from({length: 7}, function(){
    return 1;
}); console.log(y);

const z = Array.from({length: 7}, function(_, i){
    return i + 1;
}); console.log(z); */ /* //Ejemplo 20: como iterar sobre los elementos de un array, no importa si posee valores simples u objetos, con |.foreach()|
class producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre.toUpperCase() +" ($"+ this.precio.toFixed(2) +")"
    };

    // convertirEnString = () => {
    //     return this.id + ". " + this.nombre +" ($"+ this.precio.toFixed(2) +")"
    // };
};

let misProductos = [
    new producto (1, "azucar", 283.25),
    new producto (2, "cafe", 340.33),
    new producto (3, "Mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
];

misProductos.forEach( function(mov, i, arr) { //El primer parametro siempre sera el contenido de ese array (mov), el segundo la posicion (i) y el tercero el array (arr)
    return console.log( "--> "+ mov.convertirEnString()+ " en la posicion "+ (i+1));
});

//Ejemplo aplicado a Map()
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map){ //En el caso de usar Map(), los tres parametros principales son el valor, la clave y al final el map (array).
    console.log(`${value}: ${key}`);
});

//Ejemplo aplicado a Set()
const currenciesIsUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]); //En el caso de Set(), no existe una clave, por eso se pone "_". lo que indica una variable innecesaria.
currenciesIsUnique.forEach(function(value, _, map){
    console.log(`${value}: ${value}`);
}); */ /* //Ejemplo 21: como para hallar un elemento dentro de la coleccion (el PRIMER elemento), con |.find()|
class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25),
    new producto (2, "cafe", 340.33),
    new producto (3, "Mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
];

// let nombreBuscado = "mermelada";
// let unProductoBuscado1 = misProductos.find(unProducto => {
//     return unProducto.nombre.includes( nombreBuscado.toUpperCase()); //El metodo includes() retorna true o false si existe algo en el array, y este seguira iterando aunque ya haya retornado algo. Ahora bien, con el includes, unicamente  retornara un elemento, puesto que es la funcion principal de find(), retornar lo primero que encuentre nada mas.    
// });

let nombreBuscado = "pan lactal";
let unProductoBuscado1 = misProductos.find(unProducto => unProducto.nombre === nombreBuscado.toUpperCase());

unProductoBuscado1 !== undefined ? console.log("El producto buscado es: "+ unProductoBuscado1.convertirEnString()) : console.log("No encontramos el producto con nombre: "+ nombreBuscado); */ /* //Ejemplo 22: como hallar todos los elementos dentro de la coleccion que cumplan con una condicion, con |.filter()|
class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25),
    new producto (2, "cafe", 340.33),
    new producto (3, "Mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "Mermelada de naranja", 189.88),
    new producto (10,"Mermelada de fresa", 356.24),
];

let nombreBuscado = "Mermelada";
let productoHallados = misProductos.filter( function(unProducto){     // let productoHallados = misProductos.filter( (unProducto) => unProducto.nombre.includes( nombreBuscado.convertirEnString() ));
    return unProducto.nombre.includes( nombreBuscado.toUpperCase() ); //Si el nombre buscado posee unicamente la palabra "Mermelada", entonces entonces retorna un true. Esto indica que no hay necesidad de tener que escribir "Mermelada de naranja" o similares.
});
console.log("Numero de productos hallados con el nombre "+ "'"+`${nombreBuscado}`+"'" +" son: "+ productoHallados.length+ " y tienen los siguientes nombres: ", productoHallados);

let preciosMayores = misProductos.filter( function(evento){
    return evento.precio > 400;
});
console.log("Los precios mayores a $400 son: preciosMayores", preciosMayores); */ /* //Ejemplo 23: como saber si un elemento dentro de la coleccion existe o no, con |.some()|

class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

let nombreBuscado = "AZUCAR";
let existe = misProductos.some( (unProducto) => {
    return unProducto.nombre === nombreBuscado.toUpperCase();
});

if (existe) {
    console.log("El producto buscado SI existe");
} else {
    console.log("El producto buscado NO existe");
} */ /* //Ejemplo 24: como saber si un elemento dentro de la coleccion existe o no, y que devuelva true o false si todo cumple la condicion. Con |.every()|
movements1 = [200, 450, 400, -3000, 650, 0, 70, 1300];  //false
movements2 = [200, 450, 100, 3000, 650, 130, 70, 1300]; //true
console.log(movements1.every(mov => mov > 0)); //
console.log(movements2.every(mov => mov > 0)); */ /* //Ejemplo 25: como enlistar solamente los nombres de los productos, con |.map()|
class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2);
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galletad de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

let nombres, preciosIncrementados;

nombres = misProductos.map( function(unProducto){
    return unProducto.nombre;
});
console.log("1. Los nombres del array son: ", nombres);

preciosIncrementados = misProductos.map( function(unProducto) {
    return incrementarPrecio(unProducto.precio, 10)
});
console.log("2. Los precios incrementados seran: ", preciosIncrementados);

preciosIncrementados = misProductos.map(function(unProducto) {
    return new producto (unProducto.id, unProducto.nombre, incrementarPrecio(unProducto.precio, 10));
});
console.log("3. Los precios incrementados en forma de array seran: ", preciosIncrementados);

preciosIncrementados = misProductos.map( function(unProducto) {
    return {id: unProducto.id, nombre: unProducto.nombre, precio: incrementarPrecio(unProducto.precio, 10)}
});
console.log("4. Los precios incrementados forma de objeto seran: ", preciosIncrementados);

function incrementarPrecio(precio, porcentaje){
    return precio + (precio * (porcentaje/100) )
} */ /* //Ejemplo 26: como calcular el valor total de una compra, con |.reduce()|
class producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galleta de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

let preciosTotales = misProductos.reduce( function(acumulador, unProducto){    //let preciosTotales = misProductos.reduce( (acumulador, unProducto) => acumulador + unProducto.precio, 0);
    return acumulador + unProducto.precio
}, 0);

console.log("El total de la suma es: "+ preciosTotales.toFixed(2));

//Valor maximo
const max = misProductos.reduce(function(acc, mov){
    return acc > mov.precio ? acc : mov.precio;
})
console.log(max); */ /* //Ejemplo 27: como re-ordenar nuestro array (es DESTRUCTIVO, cambia su posicion), con |.sort()|

class producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    convertirEnString () {
        return this.id + ". " + this.nombre +" en $"+ this.precio.toFixed(2)
    };
};

let misProductos = [
    new producto (1, "azucar", 283.25), 
    new producto (2, "cafe", 340.33),
    new producto (3, "mermelada de arandanos", 472.14),
    new producto (4, "Dulce de leche", 263.98),
    new producto (5, "pan lactal", 404.86),
    new producto (6, "galleta de vainilla", 2113.47),
    new producto (7, "manteca pan x 500g", 896.55),
    new producto (8, "leche entera x 1lt", 302.6),
    new producto (9, "mermelada de naranja", 189.88),
    new producto (10,"mermelada de fresa", 356.24),
];

// Utilizar una de las 6 opciones a la vez porque todas al mismo tiempo no funcionaran.
// misProductos.sort( (first, second) => first.id - second.id);                        console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => second.id - first.id);                        console.log("Forma descendente: ", misProductos);
// misProductos.sort( (first, second) => first.nombre.localeCompare(second.nombre));   console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => second.nombre.localeCompare(first.nombre));   console.log("Forma descendente: ", misProductos);
// misProductos.sort( (first, second) => first.precio - second.precio);                console.log("Forma ascendente: ", misProductos);
// misProductos.sort( (first, second) => second.precio - first.precio);                console.log("Forma descendente: ", misProductos); */ /* //Ejemplo 28: como crear una nueva matriz con todos los elementos de sub-array concatenados con |.flat()| y como mapear todos los elementos del array y crear un nuevo flat array con |.flatMap()|
const acc1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const acc2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const acc3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const acc4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const allAccounts = [acc1, acc2, acc3, acc4];

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [ [[1, 2], 3], [4, [5, 6]], 7, 8 ];
console.log(arrDeep.flat(2));

//flat ()
const overalBalance = allAccounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//flatMap()
const overalBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2); */ /* //Ejemplo 30: Ejercicio practico #1
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are 
// just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old. Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy")
// 4. Run the function for both test datasets

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

function checkDogs(dogsJulia, dogsKate){
    const dogsJuliaCorrected = dogsJulia.slice(); //We creat a new array (By setting the empty parenthesis) because we must not mutate the original array.
    // dogsJulia.slice(1, 3); Podemos usar esto tambien y obtendremos lo mismo que abajo
    dogsJuliaCorrected.splice(0, 1); //Borramos en la posicion 0, 1 elemento.
    dogsJuliaCorrected.splice(-2); //Borramos los ultimos dos elementos
    console.log(dogsJuliaCorrected);

    const newArray = dogsJuliaCorrected.concat(dogsKate);
    console.log(newArray);

    newArray.forEach(function(mov, key){
        const res = mov >=3 ? `Dog number ${key} is an adult, and is ${mov} years old` : `Dog number ${key+1} is still a puppy`
        console.log(res);
    });

}

checkDogs(dogsJulia, dogsKate); */ /* //Ejemplo 31: Ejercicio practico #2
// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little. Eating too much means the dog's current food portion is 
// larger than the recommended portion, and eating too little is the opposite. Eating an okay amount means the dog's current food portion is within a range 10% above and 
// 10% below the recommended portion. Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new 
// array, simply loop over the array. Forumla: recommendedFood = weight^0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners 
// array, and so this one is a bit tricky (on purpose)
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects ).

// Hints:
// Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended *1.10). Basically, the current portion 
// should be between 90% and 110% of the recommended portion.

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(function(evento){
    evento.recFood = Number((evento.weight ** 0.75 * 28).toFixed(4));
});

//2
const dogSarah = dogs.find(function(evento){
    return evento.owners.includes("Sarah");
});
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? "much" : "little"}`);

//3 
// const ownersEatTooMuch = dogs.filter(evento => evento.curFood > evento.recFood).map(evento => evento.owners).flat();
const ownersEatTooMuch = dogs.filter(evento => evento.curFood > evento.recFood).flatMap(evento => evento.owners);
const ownersEatTooLittle = dogs.filter(evento => evento.curFood < evento.recFood).flatMap(evento => evento.owners);

//4
console.log(`${ownersEatTooMuch.join(" and ") }'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ") }'s dogs eat too much!`);

//5
console.log(dogs.some(evento => evento.curFood === evento.recFood));

//6. 
function checkEatingOkey(evento){
    return evento => evento.curFood > evento.recFood * 0.9 && evento.curFood < evento.recFood * 1.1;
}
let ss = dogs.some(checkEatingOkey)
console.log(ss);

//7.
let res = dogs.filter(checkEatingOkey)
console.log(res);

//8.
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted); */ /* //Ejemplo 32: Ejercicio practico con foreach(), split() y join().
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

function createUserNames (accs){
    accs.forEach(function(num_acc){
        num_acc.username = num_acc.owner.toLowerCase().split(" ").map(name => name[0]).join(""); // We create a new element (num_acc.username) that will contain the lower case letters of each owner's name
    })
}

createUserNames(accounts);
console.log(accounts); */ /* //Ejemplo 33: Ejercicio practico con map(), filter() y reduce() y otros elementos de arrays
// Let's go back to Julia and Kate's study about dogs. This time they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages)
// 4. Run the function for both test datasets
// Test Data 1: [5, 2, 4, 1, 15, 8, 3]

let array = [5, 2, 4, 1, 15, 8, 3];

function calcAverageHumanAge(res){
    let newArray = res.map(function(event){
        if (event <= 2) {
            return 2 * event;
        }else if (event > 2) {
            return 16 + (event * 4);
        }
    });
    return newArray;
}


let newArray = calcAverageHumanAge(array);
console.log("The new array in human age is: ", newArray);

let arrayLess18 = newArray.filter(function(evento){
    return evento > 18;
});
console.log("The new array with dogs that are less than 18 is: ", arrayLess18);

let averageAge = arrayLess18.reduce(function(acc, mov, i){
    return (acc + mov);
}, 0);
console.log("The average human age of adult dogs is: ", (averageAge/arrayLess18.length)); */ /* //Ejemplo 34: Mas ejemplos con arrays
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};
const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};
const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};
const accounts = [account1, account2, account3, account4]; //Almacenamos la informacion de los 4 objetos en un array.
const mapa = accounts.map(function(evento){
    return evento.movements;
}); //console.log(mapa);

// 1.
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSum);

// 2.
//const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;
const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); //Debemos colocar ++count porque si no, el numero siempre se mantendra en 0.
// console.log(numDeposits1000);

// 3.
const { deposits, withdrawals } = accounts.flatMap(acc => acc.movements).reduce((acc, cur) => {        
        acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur;  //cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur);
        return acc;
    },{ deposits: 0, withdrawals: 0 });

//console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
function convertTitleCase(title) {
    
    function capitzalize(str){
        return str[0].toUpperCase() + str.slice(1); //En la posicion 0, cambiamos la letra a mayuscula, y luego concatenamos con el "+", el resto de la palabra en la posicion [1]
    }
    
    const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

    const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(evento => (exceptions.includes(evento) ? evento : capitzalize(evento)))
    .join(' ');
    return capitzalize(titleCase);
};

console.log(convertTitleCase('and here is another title with an EXAMPLE'));
console.log(convertTitleCase('this is a LONG title but not too long')); */ //         $$$$$$$$$$$$$$$ STRINGS & MODERN OPERATORS $$$$$$$$$$$$$$$
/* // Ejemplo 1: uso de los operadores Suggar Syntax con operaciones aritméticas sencillas como +, -, /, *. Te dejo para que investigues cómo se realizaría la potenciación (exponenciación).

// Operador adición ++ (en una sola unidad)
let num = 10;
console.log("--> El valor actual del nùmero es " + num);
num++;
console.log("--> El valor actual del nùmero es", {num}); 

// Operador sustracción -- (en una sola unidad)
let numB = 10;
console.log("--> El valor actual del nùmero es " + numB);
numB--;
console.log("--> El valor actual del nùmero es", {numB});

// Aplicar los mismos operadores pero con dos valores
let numeroUno = parseInt(prompt("Ingrese el numero 1"));
let numeroDOs = parseInt(prompt("Ingrese el numero 2"));

// Adición
numeroUno += numeroDOs;
console.log("--> El resultado de la suma de los dos valores es", {numeroUno});

// Sustracción
numeroUno -= numeroDOs;
console.log("--> El resultado de la resta de los dos valores es", {numeroUno});

// División
/* numeroUno /= numeroDOs;
console.log("--> El resultado de la división de los dos valores es", {numeroUno});

// Producto
numeroUno *= numeroDOs;
console.log("--> El resultado de la multiplicación de los dos valores es", {numeroUno}); */ /* // Ejemplo 2: Uso del operador ternario (simplificación de la estructura IF-ELSE)
let tempt = 31;
let diaCaluroso;

tempt > 30 ? (diaCaluroso = true) : (diaCaluroso = false);

alert("--> La evalaución resulto " + diaCaluroso); */ /* // Ejemplo 4: Operador lógico AND
let carrito = [];
let carritox2 = [{id: 10, nombre: "Play Station 5"}];

//(condición lógica) && (return si true);
// El return por default en caso de false, es false.

carrito.length == 0 && console.log("--> El carrito está vacío");
carritox2.length == 1 && console.log("--> El carritox2 está lleno"); */ /* // Ejemplo 5: Operador Lógico OR

// Tabla que ejemplifica algunos de los valores que corresponden a Falsy
console.log("Hola Mundo" || "Falsy"); // Hola Mundo
console.log(40 || "Falsy"); // 40
console.log(true || "Falsy"); // true
console.log(0 || "Falsy"); // Falsy
console.log("" || "Falsy"); // Falsy
console.log(null || "Falsy"); // Falsy
console.log(undefined || "Falsy"); // Falsy
console.log(NaN || "Falsy"); // Falsy
console.log(false || "Falsy"); // Falsy 

let numero = 15;
const numerSelected = numero || 0 ;
console.log("--> numerSelected", {numerSelected}); */ /* // Ejemplo 6: Nullish Coalescing
// Tabla que ejemplifica algunos de los valores que corresponden a Falsy
 console.log(0 ?? "Nullish"); // 0
console.log(40 ?? "Nullish"); // 40
console.log("Hola Mundo" ?? "Nullish"); // Hola Mundo
console.log("" ?? "Nullish"); // ""
console.log(NaN ?? "Nullish"); // NaN
console.log(true ?? "Nullish"); // true
console.log(false ?? "Nullish"); // false
console.log(null ?? "Nullish"); // Nullish
console.log(undefined ?? "Nullish"); // Nullish */ /* // Ejemplo 7: uso dep operador de acceso condicional ?
const usuarios = [];
const usuario = usuarios.find((u) => u.name == 100);

console.log(usuario.nombre || "El usuario no existe"); //Error: "No se pueden leer propiedades de NULL"
console.log(usuario?.nombre || "El usuario no existe"); //"El usuario no existe" */ /* // Ejemplo 8: Uso del acceso condicional con más de un atributo (propiedad)
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
        [days[3]]: {open: 12,close: 22,},
        [days[4]]: {open: 11,close: 23,},
        [days[5]]: {open: 0,close: 24,},
    };

const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],

    openingHours, //openingHours: openingHours,    Ambas son lo mismo

    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
};

for (const res of days) {
    const open = restaurant?.openingHours[res]?.open ?? "closed";
    console.log(`On ${res}, we open at ${open}`);
}

console.log(restaurant.order ?. (0,1) ?? "Error");
console.log(restaurant.orderNew ?. (0,1) ?? "Error"); */ /* // Ejemplo 9: Looping Objects: Object Keys, Values, and Entries
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
        [days[3]]: {open: 12,close: 22,},
        [days[4]]: {open: 11,close: 23,},
        [days[5]]: {open: 0,close: 24,},
    };

const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],

    openingHours, //openingHours: openingHours,    Ambas son lo mismo

    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
};

const properties1 = openingHours; console.log(properties1);
const properties = Object.keys(openingHours); console.log("Object.keys()", properties);
const values = Object.values(openingHours);  console.log("Object.values()", values);
const entries = Object.entries(openingHours);  console.log("Object.entries()", entries);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
    openStr = openStr + `${day}, `
}
console.log(openStr);

for (const [day, {open, close}] of entries) {
    console.log(`On ${day} we open at ${open} and close at ${close}`);
} */ /* // Ejemplo 10: Desestructuración de arrays y objetos
const restaurant = {
    Name: 'Classico-Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic-Bread', 'Caprese-Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    info: [
        {id: 1, nombre: "german"},
        {id: 2, nombre: "mancilla"}
    ],
    fecharegistro: new Date(),
    poseeTaarjetaCredito: false, 
    poseeVehiculo: true,

    openingHours: {
        thu: {open: 12,close: 22,},
        fri: {open: 11,close: 23,},
        sat: {open: 0,close: 24,},
    },

    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery: function({time, address, mainIndex, starterIndex}){
        return console.log(`Desestructuracion de un objecto usando funcion --> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderDeliveryX2: function({time="20:00", address, mainIndex=0, starterIndex=1}){
        return console.log(`Desestructuracion de un objecto usando funcion X2--> Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    }
};

const [first, , second] = restaurant.categories; 
console.log("Desestructuracion de un array: ",first, second);

const [starter, main] = restaurant.order(2,0); 
console.log("Desestructuracion usando funcion: ",starter, main);

const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested; 
console.log("Desestructuracion con Nested: ", i, j, k);

const [p=1, q=1, r=1] = [8, 9]; 
console.log("Desestructuracion con Default values: ", p, q, r);

const {Name, categories, openingHours, openingHours:{ sat }, info} = restaurant;
console.log("Desestructuracion de un objeto: ", Name, categories, openingHours, sat, info, {info}); //Deconstruimos el objeto y se crean nuevas variables, las cuales son las que estan entre los corchetes. Se debe de igualar con el nombre del objeto.


const {Name: restaurantName, categories: tags, openingHours: hours} = restaurant;
console.log("Desestructuracion de un objeto con uso del alias: ", restaurantName, tags, hours);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log("Cambiando el nombre de la variable en objeto: ", menu, starters);

let a = 111, b = 999;
const obj = {
    a: 23, b: 7, c: 14
};

({a, b} = obj);
console.log("Desestructuracion de un objeto con mutating variables: ",a, b);

const { fri: {open: x, close: y} } = openingHours;
console.log("Desestructuracion de un objeto con nested objects: ",x, y);

function desestructurar(item){
    const {Name, location} = item;
    console.log("Desestructuracion en parámetros", Name, location);
}
desestructurar(restaurant);

restaurant.orderDelivery({
    time: "22:30",
    address: "Tijuana, 22",
    mainIndex:"2", 
    starterIndex:"2"
});

restaurant.orderDeliveryX2({
    address: "Tijuana, 22",
    starterIndex:"1"
}); */ /* // Ejemplo 11: Aplicación de la desestructuración para el evento del click
window.addEventListener("click", (event) => {
    console.log(event.x, event.y);
});

window.addEventListener("click", ({ x, y }) => {
    console.log(x, y);
}); */ /* // Ejemplo 12: Operacion de spreading con Arrays
const nombres1 = ["Juan", "Julieta"], nombres2 = ["Carlos", "Mariela"];
const array = [...nombres1, ...nombres2]; // spread de los dos arrays dentro de otro
const nombresObjeto = {// spread del array en un objeto
    ...array,
};

console.log("--> El nuevo array es: " , array);
console.log("--> El spread de un string se define como: ", [...nombres1[0]]);
console.log("--> Si queremos agregar algo mas al array con spread, hacemos lo siguiente: ", [...array, "German"]);
console.log("--> El resultado del spread del array en un objeto es", nombresObjeto); // { '0': 'Juan', '1': 'Julieta', '2': 'Carlos', '3': 'Mariela' }
console.log("--> Acceder a una propiedad especìfica es: " + nombresObjeto["2"]);

console.log("\n");

const profile = {id_profile: 300, profile_name: "Operador", profile_created_date: new Date(), password: "123"};
const user = {id_name: 500, user_name: "Chaman", user_lastname: "Coderhouse", contact: {email: "chaman.profe@gamail.com", mobile: "1111454545"}};
const menus = {id_menus: 9, actions: ["Ver operadores", "Editar nóminas", "Otorgar permisos"]};
const userProfile = {...profile, id_profile: profile.id_profile, profile_name: profile.profile_name, password: undefined};
const allObjects = {...profile, ...user, ...menus};
console.log("--> Los datos de los objetos Perfil y Usuario", userProfile);
console.log("--> Los datos del objeto con el spread de todos los objetos es: ", allObjects);

console.log("\n");

const numeros = [4, 77, 92, 10, 3, -32, 54, 11];
console.log(Math.max(numeros)); // NaN
console.log("--> Spredading de Array: ", ...numeros, "y el Math.max es: ", Math.max(...numeros));
console.log("--> Equivalente a la anterior: ", Math.max(4, 77, 92, 10, 3, -32, 54, 11)); */ /* // Ejemplo 13: Rest parameters

sumar_1(10, 15, 30, 5, 13, 47, 98); // [10, 15, 30, 5, 13, 47, 98]
console.log("Res 2: ", sumar_2(10, 15, 30, 5) ) // 60

function sumar_1(...numeros) {
    console.log("Res 1: ", numeros);
}

function sumar_2(...numeros) {
    return numeros.reduce((acumulador, unProducto) => acumulador + unProducto, 0);
} */ /* // Ejemplo 14: Uso de Set
const orderSets = new Set(["res", "german", "mancilla", "chavez", "res", "ss22", "res,"])
console.log(orderSets);
console.log(orderSets.size);
console.log(orderSets.has("pizza"));
console.log(orderSets.has("german"));
orderSets.add("ps4");
orderSets.add("ps8")
orderSets.delete("res")
console.log(orderSets);

for (const order of orderSets) {
    console.log(order);
}

const staff = ["waiter", "chef", "waiter", "manager", "chef", "waiter"];
const staffUnique = [...new Set(staff)];
console.log(staffUnique); */ /* // Ejemplo 15: Uso de Map
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']).set('open', 11).set('close', 23).set(true, 'We are open :D').set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));
console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();

const time = 8;
console.log(rest.get( time > (rest.get('open') && time < rest.get('close')) ));

const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);
console.log(rest.get(arr)); */ /* // Ejemplo 16: Uso de Map con iteration

// Maps: Iteration
const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct 🎉'],
    [false, 'Try again!'],
]);         console.log(question);


openingHours = { thu: {open: 12,close: 22}, fri: {open: 11,close: 23}, sat: {open: 0,close: 24} }
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log("Convert object to map: ", hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
    if (typeof key === 'number'){
        console.log(`Answer ${key}: ${value}`);
    }
}

const answer = 3;
console.log(question.get(question.get('correct') === answer));

//Convert map to array
console.log([...question]);
console.log(question.entries());

console.log([...question.keys()]);
console.log([...question.values()]); */ /* // Ejemplo 17: Split and join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
    const names = name.split(' ');
    const namesUpper = [];

    for (const n of names) {
        namesUpper.push(n[0].toUpperCase() + n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann'); */ /* // Ejemplo 18: Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
    const str = number + ""; // Lo que esta a la derecha de number es para convertir el dato de tipo numero a string.
    const last = str.slice(-4);
    const res = last.padStart(str.length, '*');
    return res;
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747')); */ /* // Ejemplo 19: Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(3));

const planesInLine = function (n) {
    console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12); */ /* // Ejemplo 20: Working With Strings - Part 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas'));
console.log(typeof new String('jonas'));

console.log(typeof new String('jonas').slice(1)); */ /* // Ejemplo 21: Working With Strings - Part 2

const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
    console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
    const baggage = items.toLowerCase();

    if (baggage.includes('knife') || baggage.includes('gun')) {
        console.log('You are NOT allowed on board');
    } else {
        console.log('Welcome aboard!');
    }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection'); */ /* // Ejemplo 22: Working With Strings - Part 3

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


// console.log(flights.split("+"));
for (const iter of flights.split("+")) {
    // console.log(iter.split(";"));
    const [type, from, to, time] = iter.split(";");
    const output = `${type.startsWith('_Delayed') ? '🔴' : ""} ${type.replaceAll("_", " ")} from ${getCode(from)} to ${getCode(to)} (${time.replace(":", "h")})`.padStart(45);
    console.log(output);
}

function getCode(str){
    return str.slice(0, 3).toUpperCase();
} */ /* // Ejemplo 23: Exercise for Data Structures, Modern Operators and Strings (1)
// Suppose we get data from a web service about a certain game ('game' variable on next page). In this challenge we're gonna work with that data. Your tasks:

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        ['Neuer','Pavard','Martinez','Alaba','Davies','Kimmich','Goretzka','Coman','Muller','Gnarby','Lewandowski'],
        ['Burki','Schulz','Hummels','Akanji','Hakimi','Weigl','Witsel','Hazard','Brandt','Sancho','Gotze']
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski','Hummels'],
    date: 'Nov 9th, 2017',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    }
    
};

//1. Create one player array for each team (variables 'players1' and'players2')
const [players1,players2] = game.players;       //console.log(players1, players2);

//2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
const [gk, ...fieldPlayers] = players1;         //console.log(gk, fieldPlayers);

//3. Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...players1, ...players1];  //console.log(allPlayers);

//4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1]; //console.log(players1Final);

//5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
const {team1, x:draw, team2} = game.odds;   //console.log(team1, draw, team2);

//6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
function printGoals(...players){ //Debemos desestructurar lo que mandamos a esta funcion tambien porque, al ser 4 elementos los que recibe, y si no hacemos eso, entonces unicamente se enviara el primer elemento y no los demas. 
    //console.log(players, "and "+ `${players.length}` + " goals were scored");
}
printGoals(...game.scored);

//7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator. 
let res = game.team2 > game.team1 && "Team 2 is more likely to win!!";  //console.log(res);
let res2 = game.team2 < game.team1 && "Team 1 is more likely to win!!";  //console.log(res2);

//8. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
for (const [i, player] of game.scored.entries()) {
    //console.log(`Goal ${i + 1}: ${player}`);
}

//9. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
let average = 0;
for (const odd of Object.values(game.odds)) {
    average = average + odd/3;
}
//console.log(average);

//10. Print the 3 odds to the console, but in a nice formatted way, exactly like this: Odd of victory Bayern Munich: 1.33, Odd of draw: 3.25, Odd of victory Borrussia Dortmund: 6.5
//    Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names
for (const [team, odd] of Object.entries(game.odds)) {
    let res = ( team === "x" ? "draw" : ("victory "+ game[team]) ); // team retorna un string, en este caso, sera team1 y team2. Pero, al ser ambos de tipo STRING, quiere decir que vienen de esta forma "team1" y "team2". Por eso al final queda game[team], si necesidad de poner los "".
    //console.log(`Odd of ${res}: ${odd}`);
}

//11. Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value: { Gnarby: 1, Hummels: 1, Lewi: 2}
const scorers = {};
for (const player of game.scored) {
    scorers[player] ? scorers[player]++ : (scorers[player] = 1);//En la primer y segunda iteracion no existe nada. No es hasta la tercera iteracion cuando ahi se repite "Lewandowski", por lo que ahora en este caso, se le suma 1.
};      //console.log(scorers);

const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '↩️ Substitution'],
    [47, '⚽ GOAL'],
    [61, '↩️ Substitution'],
    [64, '🟨 Yellow card'],
    [69, '🟥 Red card'],
    [70, '↩️ Substitution'],
    [72, '↩️ Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🟨 Yellow card'],
]);


// 12. Create an array 'events' of the different game events that happened (no duplicates)
const events = new Set((gameEvents.values()));   console.log(events);

// 13. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
gameEvents.delete(64);   console.log(gameEvents.values());

// 14. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
console.log(`An event happened, on average, every ${(90/gameEvents.size)} minutes`);
const des = [...gameEvents.keys()].pop();

// 15. Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game: [FIRST HALF] 17: ⚽ GOAL
for (const [key, value] of gameEvents) {
    console.log( key < 45 ? `[FIRST HALF] ${key + ": " + value}` : `[SECOND HALF] ${key + ": " + value}` );
} */ /* // Ejemplo 24: Exercise for Data Structures, Modern Operators and Strings (2)
// Write a program that receives a list of variable (SEE BELOW) names written in underscore_case and convert them to camelCase.

// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

// Should produce this output (5 separate console.log outputs):
// underscoreCase    ✅
// firstName         ✅✅
// someVariable      ✅✅✅
// calculateAge      ✅✅✅✅
// delayedDeparture  ✅✅✅✅✅

// Hints:
// § Remember which character defines a new line in the textarea
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 


document.body.append(document.createElement('textarea'));

let btn = document.createElement("button");
btn.innerHTML = "Click Me";
document.body.append(btn);

document.querySelector("button").addEventListener("click", function(){
    const text = document.querySelector("textarea").value;
    const rows = text.split("\n");

    for (const [i, iter] of rows.entries()) {
        let [first, second] = iter.toLowerCase().trim().split("_");
        let output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;
        console.log(`${output.padEnd(20, " ")}${"✅".repeat(i + 1)}`);
    }
}); */ //         $$$$$$$$$$$$$$$ Numbers, dates, Intl and timers $$$$$$$$$$$$$$$
/* //Ejemplo 1: Conversion, Parseo y verificar si es un numero, indefinido o infinito
//Convertion
console.log(Number("23"));
console.log(+"23");
console.log(parseInt("23"));

//Parsing
console.log("\n");
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));
console.log(Number.parseInt('  2.5rem  '));
console.log(Number.parseFloat('  2.5rem  '));

// Check if value is NaN
console.log("\n");
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

// Checking if value is number
console.log("\n");
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));

// Checking if value is number
console.log("\n");
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0)); */ /* //Ejemplo 2: Acceso a propiedades del objeto Math, y metodo Min y Max. 
console.log("--> euler: "+ Math.E);
console.log("--> pi: "+ Math.PI);
console.log("--> sqrt: "+ Math.sqrt(25));
console.log("--> sqrt: "+ 25**(1/2));

const numeros = [55, 13, -25, 93, 4]; 
console.log("Los numeros SIN spread son: ",numeros);
console.log("Los numeros CON spread son: ",...numeros); //... pasan de un array a cada numero separado de manera individual
const minimo = Math.min(...numeros); 
const maximo = Math.max(...numeros);
console.log("El menor es: ", minimo);
console.log("El mayor es: ", maximo); */ /* //Ejemplo 3: Use of numeric separators
const diameter = 287_460_000_000;// 287,460,000,000
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.1415;
console.log(PI);

console.log(Number('230_000'));   //NaN
console.log(parseInt('230_000')); //230000 */ /* //Ejemplo 4: Aplicacion para metodo de redondeo con ceil, floor, round y Aplicacion para metodo de raiz cuadrada
console.log(Math.ceil(.95));   // Expected output: 1
console.log(Math.ceil(4));     // Expected output: 4
console.log(Math.ceil(7.004)); // Expected output: 8
console.log(Math.ceil(-7.004));// Expected output: -7

console.log("\n");

console.log(Math.trunc(20.49));  // Expected output: 20
console.log(Math.trunc(20.50));  // Expected output: 20
console.log(Math.trunc(-20.50)); // Expected output: -20
console.log(Math.trunc(-20.51)); // Expected output: -20

console.log("\n");

console.log(Math.floor(.95));    // Expected output: 0
console.log(Math.floor(4));      // Expected output: 4
console.log(Math.floor(7.004));  // Expected output: 7
console.log(Math.floor(-7.004)); // Expected output: -8

console.log("\n");

console.log(Math.round(20.49));   // Expected output: 20
console.log(Math.round(20.50));   // Expected output: 21
console.log(Math.round(-20.50));  // Expected output: -20
console.log(Math.round(-20.51));  // Expected output: -21

console.log("\n");

console.log(+Math.sqrt(9).toFixed(4));
console.log(+Math.sqrt(2).toFixed(6));
console.log(+(2.7).toFixed(0));
console.log(+(2.345).toFixed(2)); */ /* //Ejemplo 5: Uso del metodo random para la generacion de numeros psudo-aleatorios, entre [0, 1), entre [0, limite) y entre [limiteInferior, limiteSuperior).

for (let i = 0; i < 5; i++) {
    console.log(Math.random());
}

console.log("\n");

for (let i = 0; i < 5; i++) { 
    console.log(Math.random()*10);
}

console.log("\n");

let limiteInferior = parseInt(0); 
let limiteSuperior = parseInt(10);

for (let i = 0; i < 5; i++) {
    const x = generateRandomNumber(limiteInferior, limiteSuperior);
    console.log(x);
}

function generateRandomNumber (limiteInferior, limiteSuperior){
    return Math.trunc(Math.random()*(limiteSuperior-limiteInferior) + 1) + limiteInferior;  // De 1 a 10
    //return Math.trunc(Math.random()*(limiteSuperior-limiteInferior) + limiteInferior);    // De 0 a 9
} */ /* //Ejemplo 6: Uso de BigInt
console.log(2 ** 53 - 1); //The biggest number in JS
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1); //This numbers and the next three are unstable ones and must not be used.
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

// Operations
console.log(10000n + 10000n);
console.log(36286372637263726376237263726372632n * 10000000n);
// console.log(Math.sqrt(16n));

const huge = 20289830237283728378237n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');

// Divisions
console.log(11n / 3n); //It shows only the integer.
console.log(11 / 3);   //It shows the number with decimals. */ /* //Ejemplo 7: Obtener la fecha y hora actuales. Creacion de instancias de objetos Date con la clase date con fechas personalizadas. Y obtener datos de las fechas en formato STRING.
let fechaActual = new Date();  console.log("La fecha actual del sistema es: ", fechaActual);
let fecha1 = new Date(2023, 3, 22);  console.log("La fecha actual del sistema es: ", fecha1);
let fecha2 = new Date(2023, 11, 24, 23, 59, 59);  console.log("La fecha actual de navidad es: ", fecha2); 
let fecha3 = new Date("Aug 02 2023 18:05:41" );  console.log("La fecha actual de navidad es: ", fecha3); 
let fecha4 = new Date("December 17, 2021" ); console.log("La fecha actual de navidad es: ", fecha4); 

console.log("\n", "Los valores singulares de la fecha de navidad son: ",{
    year: fecha2.getFullYear(),
    month: fecha2.getMonth(),
    date: fecha2.getDate(), 
    week: fecha2.getDay(),
    hour: fecha2.getHours(),
    minute: fecha2.getMinutes(),
    second: fecha2.getSeconds(),
    isoString: fecha2.toISOString(),
    time: fecha2.getTime()
});

//Obtener los datos de las fechas en cadenas de texto (STRING)
console.log("\n"+ "toDateString: ", fechaActual.toDateString());
console.log("toLocalString: ", fechaActual.toLocaleString());
console.log("toLocalDateString: ", fechaActual.toLocaleDateString());
console.log("toTimeString: ", fechaActual.toTimeString());
console.log("toLocaleTimeString: ", fechaActual.toLocaleTimeString());

//Creamos una nueva fecha, y despues logeamos esa fecha sin necesidad de poner "new"
console.log("\n"+ new Date(1690259566417));
console.log(Date.now());

//Convertir una fecha a numero
const future = new Date(2037, 10, 19, 15, 23);
console.log("\n"+"La fecha convertida en milisegundos es: "+ (+future));

//Calcular la diferencia entre 2 fechas (diferencia = fechaSuperior - fechaInferior)
let fechaMiCumple = new Date(2024, 3, 22);
let hoy = new Date();
const diferencia = fechaMiCumple - hoy; // Marca de timempo (milisegundos)
const milisegundosPorDia = 86400000;    // 86400000mS = 86400s = 1440min = 24h
console.log("\n"+ "--> La diferencia de fechas entre hoy y mi cumpleanos es: " + Math.round((diferencia/milisegundosPorDia))); */ /* //Ejemplo 8: Internationalizing Dates (Intl)
const now = new Date();
const options = {
    hour:"numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long"
}

const locale = navigator.language;
const res = new Intl.DateTimeFormat(locale, options).format(now);
// const res = new Intl.DateTimeFormat("pt-PT", options).format(now);
console.log(res); */ /* //Ejemplo 9: Internationalizing Numbers (Intl)
const num = 3884764.23;

const options = {
    style: 'currency',
    unit: 'celsius',
    currency: 'EUR',
    // useGrouping: false,
};

console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(navigator.language,new Intl.NumberFormat(navigator.language, options).format(num)); */ //         $$$$$$$$$$$$$$$ DOM & EVENTOS $$$$$$$$$$$$$$$
/* //Ejemplo 1: Acceso a la variable global document y sus propiedades
console.log("Cual es nuestro documento? ", document.documentElement);
console.log("Cual es nuestro body? ", document.body);
console.log("Cual es nuestro head? ", document.head); */ /* //Ejemplo 2: Obtener un elemento del HTML a partir de su id, clase o etiqueta HTML. Y tambien acceder a un elemento con el querySelector y querySelectorAll
console.log("Acceder a un elemento con el querySelector", document.querySelector("#formulario_HTML .mb-3"));
console.log("Acceder a un elemento con el querySelectorAll", document.querySelectorAll("#formulario_HTML .mb-3"));
console.log("Obtener un elemento del HTML a partir de su id: ", document.getElementById("bienvenida"));
console.log("Obtener un elemento del HTML a partir de su clase: ",document.getElementsByClassName("texto"));
console.log("Obtener un elemento del HTML a partir de su etiqueta HTML: ", document.getElementsByTagName("p")); */ /* //Ejemplo 3: Recorrer una coleccion de nodos devueltos por alguna query
let items = document.getElementsByTagName("h1");
console.log("Los elementos de nuestra pagina que estan fabricados a partir de la etiqueta h1 son: ",items);

for (const unItem of items) {
    console.log("--> ", unItem);
} */ /* //Ejemplo 4: Como modificamos el contenido del texto de un nodo
let frase_obtenida = "Hola, bienvenidos a la clase de Javascript 😈";
let nodo = document.getElementById("titulo");
console.log("El texto original que modificaremos es: ", document.getElementById("titulo").innerText);
nodo.innerText = frase_obtenida;

document.getElementById("subtitulo").className = "coloreado";
document.getElementById('frase').classList.add('coloreadoX2');

document.getElementById("subtitulo").innerHTML = "<strong>Hola soy german!!</strong>";
document.getElementById("frase").innerText = "Hola";
document.getElementById("bienvenida").textContent = "Adios"; */ /* //Ejemplo 5: Crear una lista de elementos a partir del contenido de un array y luego eliminar nodos
let paises = ["Argentina", "Brazil", "Mexico", "Peru", "Suecia"];

let nodoPaises = document.getElementById("paises"); //Obtenemos el elemento "paises" del HTML
nodoPaises.innerHTML = ""; //Al dejar las comillas vacias, se borra el contenido del elemento "paises" en el HTML.

for (const unPais of paises) {
    let nuevoItem = document.createElement("li"); //Creamos un elemento "li" para el elemento "ul" del HTML
    nuevoItem.innerText = unPais; //Le agregamos el nombre que se encuentra en la posicin "unPais". Que va desde "Argentina" hasta "Suecia".
    nodoPaises.append(nuevoItem); //Una vez que creamos el nuevo elemento "li", es importante AGREGARLO, ya que unicamente lo creamos en la linea anterior.
}

let paisesRecuperados = document.querySelector("li");
console.log("-->", paisesRecuperados);
paisesRecuperados[2].remove(); */ /* //Ejemplo 6: Creacion de un elemento HTML en JS, añadicion de nodos en determinada posicion, y eliminacion de nodos.
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="res">Got it!</button>';
const body = document.querySelector('body');
body.append(message);                 //Sirve para colocar el nodo al final
// body.append(message.cloneNode(true)); //Sirve para duplicar el nodo y colocarlo debajo del principal
// body.prepend(message);                //Sirve para colocar el nodo al inicio
// body.after(message);                  //Cumple la misma funcion que body.append(message)
// body.before(message);                 //Cumple la misma funcion que body.prepend(message)

document.querySelector('.res').addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
}); */ /* //Ejemplo 7: Escribir dentro de los inputs a travez del .value
document.getElementById("nombres").value = "Cual es tu nombre?";
document.getElementById("apellidos").value = "Cual es tu apellido?"; */ /* //Ejemplo 8: Uso de plantillas
const producto = {id: 1001, nombre: "Carne asada", precio: 140};

//Creamos un elemento div 
let contenedor = document.createElement("div");

//Definimos el innerHTML del elemento con una plantilla de texto
contenedor.innerHTML = `<h3> ID: ${producto.id}</h3>
                        <p> Producto: ${producto.nombre}</p>
                        <b> $ ${producto.precio}</b>`;

//Agregamos el contenedor creado al body
document.body.appendChild(contenedor);

//Formas de concatenar o mostrar en pantalla
let concatenado = "id: "+ producto.id+" - Nombre: "+ producto.nombre + " - precio: $"+ producto.precio;   console.log("Concatenado", concatenado);
let plantilla = `id: ${producto.id} - Nombre: ${producto.nombre} - Precio: $${producto.precio}`;          console.log("Plantilla  ", plantilla);  */ /* //Ejemplo 9: Agregar un elemento con estilizado
//METODO 1
const producto1 = {id: 1001, nombre: "Carne asada", precio: 140};
let contenedor1 = document.createElement("div");
contenedor1.style.marginTop = "50px";
contenedor1.style.marginBottom = "50px";
contenedor1.style.padding = "40px";
contenedor1.style.borderRadius = "20px";
contenedor1.style.background = "rgb(1, 135, 108)";
contenedor1.style.color = "rgb(250, 255, 255)";
contenedor1.style.opacity = "0.8";
contenedor1.innerHTML = `<h3> ID: ${producto1.id}</h3><p> Producto: ${producto1.nombre}</p><b> $ ${producto1.precio}</b>`;
contenedor1.className = 'border pad';
document.getElementById("main").append(contenedor1); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
// document.body.appendChild(contenedor1);


//METODO 1.2
const producto2 = {id: 1001, nombre: "Carne asada", precio: 140};
let contenedor2 = document.createElement("div");
contenedor2.classList.add("res");
// contenedor2.textContent = "Hello world!";
contenedor2.innerHTML = `<h3> ID: ${producto2.id}</h3><p> Producto: ${producto2.nombre}</p><b> $ ${producto2.precio}</b>`;
contenedor2.className = 'border pad';
document.getElementById("main").append(contenedor2); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
// document.body.appendChild(contenedor2);


// METODO 2.1
document.addEventListener('DOMContentLoaded', function() {
    const producto3 = {id: 1001, nombre: "Carne asada", precio: 140};
    let contenedor3 = document.createElement("div");
    contenedor3.style.marginTop = "50px";
    contenedor3.style.marginBottom = "50px";
    contenedor3.style.padding = "40px";
    contenedor3.style.borderRadius = "20px";
    contenedor3.style.background = "rgb(1, 135, 108)";
    contenedor3.style.color = "rgb(250, 255, 255)";
    contenedor3.style.opacity = "0.8";
    contenedor3.innerHTML = `<h3> ID: ${producto3.id}</h3><p> Producto: ${producto3.nombre}</p><b> $ ${producto3.precio}</b>`;
    contenedor3.className = 'border pad';
    document.getElementById("main").append(contenedor3); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
    // document.body.appendChild(contenedor3);
}, true);


// METODO 2.2
document.addEventListener('DOMContentLoaded', function() {
    const producto4 = {id: 1001, nombre: "Carne asada", precio: 140};
    let contenedor4 = document.createElement("div");
    contenedor4.classList.add("res");
    // contenedor4.textContent = "Hello world!";
    contenedor4.innerHTML = `<h3> ID: ${producto4.id}</h3><p> Producto: ${producto4.nombre}</p><b> $ ${producto4.precio}</b>`;
    contenedor4.className = 'border pad';
    document.getElementById("main").append(contenedor4); //append coloca el hijo hasta el final, mientras que el prepend coloca el hijo hasta el inicio.
    // document.body.appendChild(contenedor4);
}, true); */ /* //Ejemplo 10: Agregar eventos a un nodo mediante el addEventListener y mediante la propiedad con el evento necesario

// METODO 1.1
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.addEventListener("click", function() {
    console.log("Hola");
});

//METODO 1.2
function saludar() {
    console.log("Hola, bienvenido!")
}
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.addEventListener("click", saludar);

//METODO 2.1
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.onclick = function() {
    console.log("Hola, bienvenido!")
};

// METODO 2.2
function saludar() {
    console.log("Hola!")
}
const btnInscribir = document.getElementById("btnInscribir");
btnInscribir.onclick = function(){
    saludar();
} */ /* //Ejemplo 11: Agregar eventos a un nodo mediante el atributo de evento de la etiqueta (No es recomendable usar en proyectos de produccion)
//Esto va en el HTML, dentro del form (Esto va en el HTML, NO en el documento .js)
//<button type="button" class="btn btn-primary" id="btnInscribir" onclick="alert('Hola Mundo!');">Inscribir</button> */ /* //Ejemplo 12: Agregar a un nodo el evento del movimiento del mouse, los eventos de keydown y keyup para un input, el evento change y el evento input.

//Uso del mousemove
const title = document.getElementsByTagName("h1")[0]; //[0] representa el numero de los h1 que se encuentran en el HTML. Como en este caso solo hay uno, entonces inicializa en 0 y asi sucesivamente, dependiendo del tipo de etiqueta que estemos utilizando.
console.log("--> H1", title);
title.addEventListener("mousemove",() => {
    console.log("--> El mouse se esta moviendo sobre el titulo de la pagina <--")
});

//Uso del mouseenter
const title2 = document.querySelector("h1");
const res = function(evento){
    alert("--> El mouse se esta moviendo solo una vez <--");
}

title2.addEventListener("mouseenter", res);
setTimeout(() => title2.removeEventListener("mouseenter", res), 3000);

//Uso del keydown
const input1 = document.getElementById("apellidos");  //Agregar a un nodo los eventos de keydown y keyup para un input.
input1.addEventListener("keydown",() => {
    console.log("--> La tecla bajo <--")
})

//Uso del keyup
input1.addEventListener("keyup",() => {
    console.log("--> La tecla subio <--")
})

//Uso del change
const input2 = document.getElementById("nombres"); //Agregar a un nodo el evento change.
input2.addEventListener("change",() => {
    console.log("--> El valor del input cambio <--", input2.value);
    input2.value = input2.value.trim();
});

//Uso del input
const input3 = document.getElementById("correo"); //Agregar a un nodo el evento change (Simulando un keylogger).
input3.addEventListener("input",() => {
    console.log("--> Ejecutaste el evento INPUT <--");
}); */ /* //Ejemplo 13: uso del evento submit para validar los inputs de un formulario.

//Para agregar opciones al select HTML del HTML cuando presionemos el recuadro.
class Ocupacion {
    constructor(numero, name) {
        this.numero = numero;
        this.nombre = name;
    }
}

const ocupaciones = [
    new Ocupacion(1, "Estudiante"),
    new Ocupacion(2, "Docente"),
    new Ocupacion(3, "Desarrollador"),
    new Ocupacion(4, "Administrador de proyectos"),
];

let ocupacionList = document.getElementById("ocupacion");

ocupaciones.forEach((unaOcupacion) => {
    let item = document.createElement("option");
    item.value = unaOcupacion.numero.toString();
    item.innerText = unaOcupacion.nombre;
    ocupacionList.append(item);
});

class Participante { //Uso de eventos para rellenar los espacios en blanco y desplegar la informacion
    constructor(numero, apellido, nombre, ocupacion, correo, quiereBoucher = false) {
        this.numero = numero;
        this.apellido = apellido;
        this.nombre = nombre;
        this.ocupacion = ocupacion;
        this.correo = correo;
        this.quiereBoucher = quiereBoucher;
    }
}

let participantes = [];

const formulario = document.getElementById("formulario_HTML");      console.log(formulario);
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();          //Cancelamos el comportamiento del evento
    validarFormulario(evento.target); //.target sirve para pasar el conjunto de items, elementos, componentes, inputs que tenga nuestro formulario dentro que contenga info
});                                   //Es decir, se accede a los elementos del formulario a donde pertenete submit y NO a informacion del submit. O sea, el objeto que "disparo" o "activo el evento."

function validarFormulario(data) {
    // console.log("--> Validando formulario", data); //Recivimos el conjunto de elementos, items, etc. recividos de la linea 1331 y despues los imprimimos.
    // const hijos = data.children; //Asignamos los elementos del formulario a una nueva variable. En ella se encuentran 4 divs, el form-check y el btnInscribir
    // console.log("--> Que hay dentro de children", hijos);

    // for (let i = 0; i < 4; i++) {
    //     const unHijo = hijos[i]; //Asignamos individualmente los elementos del formulario a una nueva variable para despues acceder a sus hijos. (En este caso, solo queremos tomar en cuenta los primros 4 elementos, que son 4 divs)
    //     const valor = unHijo.children[1].value; //Colocamos [1].value porque es donde se encuentra el label que queremos mostrar de los 4 divs del formulario, y despues guardamos ese elemento (hijo) en una nueva variable. En este caso. Son puros input's y el contenido que escribimos en ellos.
    //     console.log("--> El valor almacenado en el input " + unHijo.children[0].innerText + " es: " ,{valor}); //unHijo.children[0].innerText muestra la primer posicion que pertenece al label en cada div, y entonces al poner innerText, mostamos el nombre que le asignamos a cada uno entre los > <.
    // }

    // Recuperaremos de cada uno de los inputs, el valor que ingreso/selecciono el usaurio
    const apellidos = document.getElementById("apellidos").value;     console.log("Apellidos: "+ apellidos);
    const nombres = document.getElementById("nombres").value;         console.log("Nombres: "+ nombres);
    const ocupacion = document.getElementById("ocupacion").value;     console.log("Ocupacion: "+ ocupacion);
    const correo = document.getElementById("correo").value;           console.log("Correo: "+ correo);
    const participar = document.getElementById("participar").checked; console.log("Participar: "+ participar);// Mediante la propiedad checked accedemos al valor booleano true/false que representa si el radiobutton o el checkbox fue "tildado/seleccionado"

    // Instanciamos la creacion de un objeto con la forma de un Participante
    const unaOcupacion = ocupaciones.find((evento) => evento.numero.toString() === ocupacion);                         console.log("unaOcupacion", unaOcupacion);
    const unParticipante = new Participante(participantes.length+1,apellidos,nombres,unaOcupacion,correo,participar);  console.log("--> Un participante a ser anadido", unParticipante);

    // Anadimos un elemento a la lista de aprticipantes (aun no incorporamos un control sobre existentes o similar)
    participantes.push(unParticipante);           console.log("--> Que elementos posee mi array de participantes",participantes);

    // Pintar la lista en la interfaz de usuario (solo para demostrar en la interfaz el cambio anadido -- profundizaremos este tema a medida que avanzamos con las clases.)
    let lista = document.getElementById("listaParticipantes");
    lista.innerHTML = ""; //Borramos el innerHTML de 'lista' colocando las comillas vacias para limpiar su contenido.
    participantes.forEach((individual) => {
        let item = document.createElement("p");
        item.innerText = individual.apellido + ", " + individual.nombre;
        lista.append(item);
    });

    // Limpiar todos y cada uno de los inputs
    document.getElementById("apellidos").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("ocupacion").value = "0";// el valor de este por default es 0 porque es la primera opciOn del combo de selecciOn
    document.getElementById("correo").value = "";
    document.getElementById("participar").value = "off";// para bootstrap --> on: true y off: false 
} */ /* //Ejemplo 14: Finding coordenates and position, and use of scroll
btnScrollTo.addEventListener("click", function(evento){
    const s1coords = section1.getBoundingClientRect(); 
    console.log("Section position: ", s1coords);                              //Representa la posicion de la seccion
    console.log("Learn more botton position: ", evento.target.getBoundingClientRect()); //Representa la posicion del boton "learn more"
    console.log("Current scroll (X/Y): ", window.scrollX, window.scrollY);
    console.log("Height/width viewport: ", document.documentElement.clientHeight, document.documentElement.clientWidth);
    
    //Scrolling (method 1)
    // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

    //Scrolling (method 2)
    // window.scrollTo({
    //     left: s1coords.left + window.scrollX, 
    //     top: s1coords.top + window.scrollY,
    //     behavior: "smooth"
    // });

    //Scrolling (method 3)
    section1.scrollIntoView({behavior: "smooth"});
}); */ /* //Ejemplo 15: Creating and inserting elements, use of styles atributes, non-standard and classes
// Creating and inserting elements
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    message.parentElement.removeChild(message);
});


// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height = Number.parseInt(getComputedStyle(message).height, 10) + 50 + 'px'; //El segundo elemento en parseInt representa el radix (base del sistema numerico, en este caso 10 es decimal)
console.log(message.style.color);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty("--color-primary", "orange");


// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes
logo.clasName = 'jonas'; // Don't use because this will override all the existing classes and it will allow us only put one class on any element.*/ /* //Ejemplo 16: Use and difference between target and currentTarget
function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(){
    return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
}

//En el HTML, estos tres querySelector que tiene el nav, nav__links y nav__link, esan agrupados en ese orden de arriba hacia abajo (O sea, un arbol). Si presiono el elemento padre (nav), unicamente se ejecutara ese evento, pero si ejecuto el ultimo (nav__link), se ejecutaran los 3 eventos ya que debe pasar por sus elementos anteriores para llegar hasta ese ultimo evento.
//Recordar que en un EventListener el this siempre apunta al elemento en el cual se adjunta ese EventListener.
//Para el caso de los target y currentTarget, se puede apreciar la diferencia cuando se hace click en los elementos hijos. Por ejemeplo. Si presiono el nav, no habra ninguna diferencia ya que es el elemento padre. Pero si presionamos nav__links, los target y currentTarget de este hijo seran los mismos, mientras que, en cuando ahora se ejecute el nav, el target seguira siendo el mismo ejecutado en el nav__links, pero en el currentTarget ahi si tomara el target actual, o sea, el del nav.
document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV e.target: ', e.target);
    console.log('NAV e.currentTarget: ', e.currentTarget);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor(); 
    console.log('CONTAINER e.target: ', e.target, );
    console.log('CONTAINER e.currentTarget:', e.currentTarget);
});

document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor(); 
    console.log('LINK e.target: ', e.target);
    console.log('LINK e.currentTarget: ', e.currentTarget);

    // console.log(e.currentTarget === this);
    // e.stopPropagation();
}); */ /* //Ejemplo 17: Page navigation, uso de scrollIntoView y diferencia entre usar this y target en addEventListener.
//Metodo 1 (Esto es una mala practica cuando existen muchos elementos, porque tenemos muchas copias de la misma callback function, lo cual hara que la pagina sea mas lenta)
// document.querySelectorAll(".nav__link").forEach(function(evento){
//     evento.addEventListener("click", function(iter){
//         iter.preventDefault();

//         //Aqui usamos this en este addEventListener porque, estamos trabajando directamente con cada link (nav__link) por medio del foreach, por lo que, el this representa el elemento actual en el que se esta trabajando al precionar el boton
//         const id = this.getAttribute("href"); //Retorna unicamente el nombre del atriuto contenido en esa etiqueta. Si usamos const id = this.href, entonces tendremos el link completo que aparece en la barra de navegacion
//         document.querySelector(id).scrollIntoView({behavior: "smooth"});
//     })
// })

//Metodo 2
document.querySelector(".nav__links").addEventListener("click", function(evento){
    evento.preventDefault();

    //Aqui usamos evento.target porque en este caso estamos utilizando el <ul> como elemento padre, y sus hijos son <li> y <a>. Ahora, con el addEventListener podemos hacer click en el elemento padre o incluso sus hijos y JS ejecutara la tarea deseada. Si usamos this como en el metodo 1, este solo funcionara para elelemento actual o el padre, es decir <ul>.
    if (evento.target.classList.contains("nav__link")) {
        const id = evento.target.getAttribute("href"); //Retorna unicamente el nombre del atriuto contenido en esa etiqueta. Si usamos const id = this.href, entonces tendremos el link completo que aparece en la barra de navegacion
        document.querySelector(id).scrollIntoView({behavior: "smooth"});
    }
}); */ /* //Ejemplo 18: Use of childNodes, children, firstElementChild, lastElementChild, parentNode, parentElement and closest.
const h1 = document.querySelector("h1");

// Going downwards: child
console.log("h1.querySelectorAll('.highlight')", h1.querySelectorAll(".highlight")); //Muestra todos los hijos de h1 con el nombre highlight
console.log("h1.childNodes", h1.childNodes); // Retorna una lista de nodos de los nodos hijos de un elemento. En este caso, los hijos de h1. (Casi no se usa)
console.log("h1.children", h1.children); //Retorna una coleccion HTML de los elementos hijos de un elemento y solo funciona para hijos directos. En este caso, los elementos de h1. (Se usa mucho)
h1.firstElementChild.style.color = 'white'; //Este se usa para recuperar (y/o modificar) el primer elemento hijo.
h1.lastElementChild.style.color = 'orangered'; //Este se usa para recuperar (y/o modificar) el ultimo elemento hijo.

// Going upwards: parents (parentNode y parentElement nos permiten acceder al elemento del elemento que estamos usando. En este caso, <div class="header__title"> es padre de h1.)
console.log("h1.parentNode", h1.parentNode);  
console.log("h1.parentElement", h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //closese() se usa para seleccionar el elemento mas cercano a h1, por lo general es lo inverso al querySelector, ya que en lugar de buscar los elementos hijos, este busca los elementos padres.
console.log(h1.closest('.header'));

h1.closest('h1').style.background = 'var(--gradient-primary)';
console.log(h1.closest('h1'));

// Going sideways: siblings
console.log(h1.previousElementSibling); //Returns the previous element at the same node tree level
console.log(h1.nextElementSibling); //Returns the next element at the same node tree level
console.log(h1.previousSibling); //Returns the previous node at the same node tree level
console.log(h1.nextSibling); //Returns the next node at the same node tree level
console.log(h1.parentElement.children); //This allows access to the h1's parent and then it allows us to access to all its children, which are h1, h4, button and img.

[...h1.parentElement.children].forEach(function (evento) {
    if (evento !== h1) evento.style.transform = 'scale(0.5)';
}); */ /* //Ejemplo 19: Building a Tabbed Component
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (evento) {
    const clicked = evento.target.closest('.operations__tab');  console.log(clicked);
    
    // Guard clause
    if (!clicked) return;

    //Realizamos un barrido en cada uno de los 3 botones y en cada uno de los 3 contenidos de texto. Dependiendo del boton seleccionado, a este se le eliminaran sus "active"
    tabs.forEach(evento => evento.classList.remove('operations__tab--active'));
    tabsContent.forEach(evento => evento.classList.remove('operations__content--active'));

    //Una vez eliminado los "active" en el boton y el contenido seleccinado, ahora se procede a "activar" el boton y su contenido seleccionado.
    clicked.classList.add('operations__tab--active');

    //Dependiendo del boton que se haya presionado, este realizara la animacion en el boton, y tambien se desplegara el contenido de texto del boton seleccionado.
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active'); 
});

//Debemos añadir el closest(), ya que operations__tab-container tiene de hijos tres elementos botones con un span cada uno. Por lo que al presionar el boton, especificamente
//el texto (span), no funcionara correctamente el boton. Es por eso que agregamos el closest(), para que al presionar el boton, considere unicamente el elemento mas cercano
//con el nombre operations__tab (incluyendo su hijo <span>). 
//Cabe mencionar que, si precionamos donde esta el <div class="operations__tab-container"> entonces tendremos un null en consola, ya que no existe ningun elemento padre con el 
//class ".operations__tab". Para eso usamos el Guard clause, para que al no haber un click en el botton, simplemente salga de la funcion y no ejecute las lineas siguientes. */ /* // Ejemplo 20.1: Passing Arguments to Event Handlers (Method 1)

// Menu fade animation 
function handleHover(evento) {
    
    //Recordar que cuando utilizamos bind(), la keyword "this" representa los parametros que le enviamos a la funcion, en este caso, 0.5 y 1.
    console.log(this, evento.currentTarget);

    if (evento.target.classList.contains('nav__link')) {
        const link = evento.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(function(iter) {
            if (iter !== link) iter.style.opacity = this;
        });

        logo.style.opacity = this;
    }
};

// Usamos bind para retornar una nueva funcion de esa funcion handleHover, y de esa forma, no tener que usar una funcion que llame a otra funcion.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1)); */ /* // Ejemplo 20.2: Passing Arguments to Event Handlers (Method 2) 
// Menu fade animation
function handleHover(evento, opacity) {

    console.log(evento.currentTarget);

    if (evento.target.classList.contains('nav__link')) {
        const link = evento.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(function(iter){
            if (iter !== link) iter.style.opacity = opacity;
        });

        logo.style.opacity = opacity;
    }
};

//Debido a que addEventListener requiere una funcion como parametro, no podemos simplemente usar la funcion de handleHover directamente ahi porque esta al final del dia retorna un valor, lo cual es incorrecto cuando usamos addEventListener.
nav.addEventListener('mouseover', function(evento){
    handleHover(evento, 0.5);
    console.log(this);
});

nav.addEventListener('mouseout', function(evento){
    handleHover(evento, 1);
    console.log(this);
}); */ /* //Ejemplo 21: Sticky navigation

const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
    console.log(window.scrollY);
    window.scrollY > initialCoords.top ? nav.classList.add('sticky') : nav.classList.remove('sticky');
}); */ /* //Ejemplo 22.1: The Intersection Observer API

const obsCallback = function(entries, observer){ //Whenever the first section (our target) is intersecting the viewport at 10%, the function will get called and that's no matter if we're scrolling up or down.
    entries.forEach(evento => console.log(evento));
} 

const obsOptions = { 
    root: null,     //root is the element that the target is intersecting. We write null and we'll be able to observe our target element intersecting the entire wiewport (the entire rectangle which shows the current portion of the page)
    // threshold: 0.1,  //This is the percent of intersection at which the obersver callback will be called
    threshold: [0, 0.2] //0 means that our callback will trigger each time that the target element moves complitelly out of the view. and 1 when the 100% of the target is actually visible in the viewport.
}

//             new IntersectionObserver(callback,    options);
const IO_API = new IntersectionObserver(obsCallback, obsOptions); // Our "callback" and "options" will be pased into our so called IntersectionObserver object.
IO_API.observe(section1); //This is the target element that will intersect in root. */ /* //Ejemplo 22.2: The Intersection Observer API
const stickyNav = function(entries){
    const [entry] = entries; //entries is always an array because the options in IntersectionObserver can have multiple thresholds, and for each threshold, there will be an entry in the array, even if there is only one threshold.
    console.log(entry);

    if (!entry.isIntersecting) { //When the target isn't intersecting the root, then we want the sticky class to be applied.
        nav.classList.add("sticky");
    }else{
        nav.classList.remove("sticky");
    }
}

const options = {
    root: null, //We select null because we are interested in the entire viewport
    threshold: 0, //A value of 0 means that even a single visible pixel counts as the target being visible. That's to say, when the header shows a 0% of itself, then the function will get called .

    //We use getBoundingClientRect().height to calculate dynamically the height (for responsive webpages) of the nav without the needed of hard coding and tupe an specific height. It'll be 90px.
    rootMargin: `-${nav.getBoundingClientRect().height}px` //This value is in pixels and will be applied outside of the target element
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header); */ /* //Ejemplo 23: Revealing Elements on Scroll
const allSections = document.querySelectorAll(".section");

const revealSection = function(entries, observer){
    const [entry] = entries;     console.log(entry)

    if(entry.isIntersecting === false) return;
    entry.target.classList.remove("section--hidden");

    observer.unobserve(entry.target);
};
const opciones = {
    root: null,
    threshold: 0.15, //We use something greater than zero because we don't want to show the section right as it enters the viewport, but a litte latter.
}

const sectionObserver = new IntersectionObserver(revealSection, opciones)

allSections.forEach(function(section){
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
}); */ /* //Ejemplo 24: Lazy Loading Images
const imgTarget = document.querySelectorAll("img[data-src]");  // console.log(imgTarget);

const loadImg = function(entries, observer){
    const [entry] = entries;   //console.log(entry);

    if(entry.isIntersecting === false) return;

    //Replace the src ("imgs/grow-lazy.jpg") with data-src ("imgs/grow.jpg"). That's to say, src is the blur image and the data-src is the high-quality image.
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function(){
        entry.target.classList.remove("lazy-img");
    })

    observer.unobserve(entry.target)
}

const Opciones = {
    root: null,
    threshold: 0,
    rootMargin: "200px"
}

const imgObserver = new IntersectionObserver(loadImg, Opciones);
imgTarget.forEach(evento => imgObserver.observe(evento)); */ /* //Ejemplo 24: Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
const maxSlide = slides.length;


function goToSlide(slide) {
    slides.forEach(function(evento, iter){
        evento.style.transform = `translateX(${100 * (iter - slide)}%)`; //0%, 100%, 200%
        // console.log(`${iter} , ${evento.style.transform}`);
    })
};

function nextSlide() {
    curSlide === maxSlide - 1 ? curSlide = 0 : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide)
};

function prevSlide() {
    curSlide === 0 ? curSlide = maxSlide - 1 : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide)
};

function createDots() {
    slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML('beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
};

function activateDot(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

function init(){
    createDots();
    goToSlide(0);
    activateDot(0);
}

init();
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (evento) {
    console.log(evento)
    if (evento.key === 'ArrowLeft') prevSlide();
    if (evento.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', function (evento) {
    if (evento.target.classList.contains('dots__dot')) {
        const slide = evento.target.dataset.slide;  //const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
    }
}); */ /* //Ejemplo 25: Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (evento) {
    console.log('HTML parsed and DOM tree built!', evento);
});

window.addEventListener('load', function (evento) {
    console.log('Page fully loaded', evento);
});

window.addEventListener('beforeunload', function (evento) {
    evento.preventDefault();
    console.log(evento);
    evento.returnValue = '';
}); */ //         $$$$$$$$$$$$$$$ JSON & storage $$$$$$$$$$$$$$$
/* // Ejemplo 1: setItem en localStorage para crear datos en el local storage. getItem para recuperar informacion almacenada. Y buscar si existe algo o no.
localStorage.setItem("saludar", "Hola mundo");
localStorage.setItem("existe", true);
localStorage.setItem("cantidad", parseInt(155)); 

const mensaje = localStorage.getItem("saludar");
const isExistente = localStorage.getItem("existe");
const cantidad = localStorage.getItem("cantidad");
const res = localStorage.getItem("nombreUsuario"); // "nombreUsuario" no existe

console.log("Mensaje: ", {mensaje});
console.log("Existe el elemento almacenado? ", {isExistente});
console.log("Cuantos pedidos hiciste? ", {cantidad});
res ? console.log("Informacion recuperada", {res}) : console.log("Informacion NO recuperada", {res}); */ /* // Ejemplo 2: Crear informacion dentro del sessionStorage con el metodo setItem(), y recuperar info almacenada en el mismo con getItem().
sessionStorage.setItem("Bienvenida", "Hola mundo");
sessionStorage.setItem("EsValido", true);
sessionStorage.setItem("unNumero", 155);

const isValido = sessionStorage.getItem("unNumero") == 155 ? true : false;
console.log("Existe el producto buscado?", {isValido});
console.log("Que tipo de dato persiste sin convertirlo?", {resultado: typeof sessionStorage.getItem("EsValido")});
console.log("Que tipo de dato persiste convertiendolo?", {resultado: typeof isValido}); */ /* // Ejemplo 3: Como guardar elementos de un array y como recuperarlos
const MY_ARRAY = [100, 500, 963];
//console.log("Que tipo de dato mi array?", {resultado: typeof MY_ARRAY, MY_ARRAY});

localStorage.setItem("myArray", MY_ARRAY);

const valorRecuperado = localStorage.getItem("myArray"); //console.log(typeof valorRecuperado, valorRecuperado);
console.log("Que tipo de dato es recuperado?", {resultado: typeof valorRecuperado, valorRecuperado});

//COMO CONVERTIR CADA ELEMENTO DEL ARRAY (SABIENDO QUE SON NUMEROS) A NUMEROS NUEVAMENTE (METODO MANUAL)
const valorCambiado = localStorage.getItem("myArray").split(","); //console.log(typeof valorCambiado, valorCambiado);
console.log( "Que tipo de dato es valorCambiado?", {resultado: typeof valorCambiado, myArray: valorCambiado.filter((evento)=>parseInt(evento))} ); */ /* // Ejemplo 4: Como recorrer todos y cada uno de los elementos almacenados dentro de nuestro local storage o session storage
console.log("Recuperar todos los elementos de la local storage");
for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    console.log("En la clave <"+ clave+ "> esta este dato", {valor: localStorage.getItem(clave)});
}

console.log("\nRecuperar todos los elementos de la session storage");
for (let i = 0; i < sessionStorage.length; i++) {
    const clave = sessionStorage.key(i);
    console.log("En la clave <"+clave + "> esta este dato ",{valor: sessionStorage.getItem(clave)});
} */ /* // Ejemplo 5: eliminar elementos concretos, y tambien eliminar todos los elementos en local storage y el session storage.
// localStorage.removeItem("nombre"); 
localStorage.clear();
// sessionStorage.removeItem("Bienvenida")
// sessionStorage.clear(); */ /* // Ejemplo 6: Editar informacion ya existente dentro de nuestro local storage o session storage
const nombre = "german";
localStorage.setItem("saludar", nombre);
sessionStorage.setItem("unNumero", 8); */ /* // Ejemplo 7: Recibir los datos JSON
const cars = `[
    {
        "modelo": "Ford mustang",
        "production": "2010",
        "millaje": "12000"
    },
    {
        "modelo": "Honda accord",
        "production": "2021",
        "millaje": "4560"
    },
    {
        "modelo": "Nissan Sentra",
        "production": "2016",
        "millaje": "58200"
    }
]`;

//console.log(typeof cars);

const jsonData = JSON.parse(cars); //Convertimos a un object con parse 
const carrosNuevos = jsonData.filter((evento) => evento.production > 2010 && evento.millaje < 30000); //console.log(carrosNuevos);
const newCars = JSON.stringify(carrosNuevos); //Convertimos a un string con stringify

const fs = require('fs');
const carroNuevo = {
    modelo: "Mini Cooper",
    produccion: "2022",
    millaje: "500"
};
const newCar = JSON.stringify(carroNuevo);
fs.writeFileSync('cars.json', newCar, (error) => {
    if (error) throw error;
    console.log("Informacion recivida");
}); */ /* // Ejemplo 8: Almacenar informacion de un objeto con JSON, despues recuperaramos los objetos en forma de string (stringify) y luego en forma de object (parse)
class Carrera {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre.trim();
    }
}

const unaCarrera = new Carrera(100, "Analista de sistemas")
console.log("Los datos de la carrera antes de almacenarse son: ",{unaCarrera}); //Intancia de una clase que esta tipificada fuertemente

localStorage.setItem("carrera", JSON.stringify(unaCarrera));
const unaCarreraRecuperada = localStorage.getItem("carrera");
console.log("La carrera recuperada con stringify es: ", {unaCarreraRecuperada});

const recuperada = JSON.parse(localStorage.getItem("carrera"));
console.log("La carrera recuperada con parse es: ", {recuperada}); */ /* // Ejemplo 9: Almacenar un array de objetos en el local storage o session storage
class Carrera {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre.trim();
    }
}

const carreras = [
    new Carrera(1, "Analista en Sistemas de Computacion"),
    new Carrera(2, "Tec. Universitaria en celulosa y Papel"),
    new Carrera(3, "Tec. Universitaria en Tecnologias de la Informacion"),
];
console.log("Mi array sin convertir es: ", {carreras});

localStorage.setItem("carreras", JSON.stringify(carreras));
let res = localStorage.getItem("carreras");

console.log("Las carreras recuperadas en formato string (stringify) son: ", {res});

//objeto recuperado de un JSON, en el cual no vamos a tener metodos. Ya que el JSON solo perciste atributos y valores, no metodos ni mucho menos los recupera. 
const convertido = JSON.parse(res);
console.log("Las carreras recuperadas en formato object (parse) son: ", {convertido}); */ //         $$$$$$$$$$$$$$$ Asincronia, promesas, AJAX & FETCH $$$$$$$$$$$$$$$
/* // Ejemplo 1: Creacion de una funcionalidad asincriona con setTimeout 

const ingredients = ['olives', 'spinach', 'pepperoni'];
const pizzaTimer = setTimeout(function (ing1, ing2, ing3){
    return console.log(`Here is your pizza with ${ing1}, ${ing2} and ${ing3} 🍕`);
},1500, ...ingredients); //Tod0s los argumentos que pasemos despues del delay, seran argumentos de la funcion

console.log('Waiting...');

if (ingredients.includes('res')) clearTimeout(pizzaTimer);

// setInterval(function () {
//     const now = new Date();
//     console.log(now);
// }, 1000); */ /* // Ejemplo 2: Creacion de un countdown hacia abajo

const SEGUNDOS = 3;
for (let LEFT = 1; LEFT <= SEGUNDOS; LEFT++) {
    setTimeout(() => {
        console.log(((SEGUNDOS+1-LEFT).toString() + " segundos left"));
    }, LEFT*1000);
}  */ /* // Ejemplo 3: Aplicacion del modelo asincrono para momstrar a una de las letras de dos palabras

// for (let letra of "hola") {
//     setTimeout (() => {
//     console.log(letra)
//     }, 1000)
// }

// for (let letra of "mundo") {
//     setTimeout (() => {
//     console.log(letra)
//     }, 1500)
// }

for (let index = 0; index < "hola".length; index++) {
    setTimeout (() => {
    console.log("hola"[index])
    }, (index+1)*500)
} */ /* // Ejemplo 4: Uso del setInterval para ejecutar continuamente funcionalidades cada x cantidad de segundos.
setInterval(() => {
    console.log("Tic-Toc")
}, 1000) */ /* // Ejemplo 5: Ejemplo de como suspender un setInterval y clearTimeout
console.log("Inicio");

let counter = 0
const interval = setInterval(() => {
    counter++;
    console.log("Counter: ", counter);
    if (counter >= 5) {
    clearInterval(interval);
    console.log("Se removió el intervalo");
    }
}, 1000);

const fin = setTimeout(() => {//Esta nunca se llega a ejecutar
    console.log("fin");
}, 2000);
clearTimeout(fin); */ /* // Ejemplo 6: Como conocer los estados de una promesa
function eventoFuturo (){
    return new Promise( (resolve, reject) => {

    });
}
console.log( eventoFuturo() ) // Promise { <pending> } */ /* // Ejemplo 7: Uso de los resultados de una Promesa para cambiar sus estados
function eventoFuturo1(res){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            res ? resolve('Promesa resuelta') : reject('Promesa rechazada');
        }, 1000)
    })
}
//Devuelve pending porque la funcion se ejecutara y esperara 1500mS por el setTimeout, pero como no hay nada que haga que "espere" a que esto se resuelva, entonces no se mostrara nada.
console.log( eventoFuturo1(true) ) // Promise { <pending> }
console.log( eventoFuturo1(false) ) // Promise { <pending> } */ /* // Ejemplo 8: Uso del Then y Catch para catpturar los resultados y aprovechamiento de las posibilidades de respuestas de una promesa
function eventoFuturo (res) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            res ? resolve('Promesa resuelta') : reject('Promesa rechazada')
        }, 1000)
    });
}

console.log("1. Primer proseso");

eventoFuturo(true)
//eventoFuturo(false)
.then( (response) => {
    console.log(response) // Promesa resuelta
})
.catch( (error) => {
    console.log(error)
})
.finally( () => {
    console.log("Fin del proceso con true")
    //console.log("Fin del proceso con false")
}); */ /* // Ejemplo 9: Ejercicio con un array, usando then/catch/finally y tambien ASYNC/AWAIT
const productos = [
    {marca: "Nissan", modelo: 'Sentra', precio: 1500},
    {marca: "Toyota", modelo: 'Camry', precio: 2500},
    {marca: "Honda", modelo: 'Accord', precio: 3500}
];
// const BD = [];


function getDatos(){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            productos[0].precio === 15200 ? resolve(productos) : reject(new Error ("No existe")) ;
        }, 1500);
    });
}

// //Ejercicio usando then/catch/finally
// getDatos()
// .then( (response) => {
//     console.log(response) // Promesa resuelta
// })
// .catch( (error) => {
//     console.log(error)
// })
// .finally( () => {
//     console.log("Fin del proceso :)")
// });

//Ejercicio usando ASYNC/AWAIT
pedirPosts();
async function pedirPosts(){
    try{
        const datosFetched = await getDatos();
        console.log(datosFetched);
    }catch(error){
        console.log(error.message);
    }finally{
        console.log("Proceso terminado :)");
    }
}; */ /* // Ejemplo 10: Ejemplo del uso de Promesa para recuperar informacion de una base de datos

const BD_X = [
    {id: 1, nombre: 'Producto 1', precio: 1500},
    {id: 2, nombre: 'Producto 2', precio: 3500}
];
const BD_Y = [
    {id: 3, nombre: 'Producto 3', precio: 2000},
    {id: 4, nombre: 'Producto 4', precio: 3000}
];
//const BD = [];

function obtenerUsuarios(id){
    return new Promise( (resolve, reject) => {
        if (BD_X.find(evento => evento.id === id)) {
            console.log("El usuario existe");
            resolve(obtenerNombres(id))
        }else{
            reject("El usuario no existe")
        }
    });
}

function obtenerNombres(id){
    return new Promise( (resolve, reject) => {
        if (BD_Y.find(evento => evento.id === id)) {
            resolve("El nombre existe")
        }else{
            reject("El nombre no existe")
        }
    });
}

obtenerUsuarios(1)
.then((res) => {
    return res;
})
.then((data) => {
    console.log(data);
})
.catch((error) => {
    console.error(error);
}); */ /* // Ejemplo 11: fetch (método) sin aplicar los el then() y el catch(), y despues la plicación del método then() para ver que estructura posee una respuesta.
console.log( fetch('https://jsonplaceholder.typicode.com/posts') );

fetch('https://jsonplaceholder.typicode.com/posts')
.then((resp) =>
  console.log(resp)
); */ /* // Ejemplo 12: Obtener la información que se encuentra dentro del BODY de la RESPONSE, y recuperar un único objeto de la API
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
  });

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
  }); */ /* // Ejemplo 13: Cómo recuperar datos de una localizacion externa (http://) e una interna (.json) con rutas relativas

recuperarPosteos();

function recuperarPosteos() {
    let bodyTable = document.getElementById("tableBody"); // Pintar la tabla de carreras en la UI
    bodyTable.innerHTML = "";
    toggleLoadingContainer(true);
    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")  //Localizacion externa
    // fetch("/ApuntesDeClase/data/posts.json")                //Localizacion interna
        .then((resultado) => resultado.json()) // Obtuvimos la respuesta --> Tomar los datos del body (.json())
        .then((data) => {                      // Obtenemos la colección de posteos
            data.forEach((post) => {
            let record = document.createElement("tr");
            record.innerHTML = 
            `<tr>
            <td scope="row">${post.id}</td>
            <td scope="row">${post.title}</td>
            <td scope="row">${post.body}</td>
            </tr>`;
            bodyTable.append(record);
        });
    })
        .catch((error) => {
            let record = document.createElement("tr");
            record.innerHTML = 
            `<tr>
                <td colspan="3" scope="row">Ocurrio un error al recuperar los datos</td>
            </tr>`;
            bodyTable.append(record);
        })
        
        .finally(() => {
            toggleLoadingContainer(false);
        });
    }, 2000);
}

function toggleLoadingContainer(isLoading = false) {
    const loadingContainer = document.getElementById("loadingMessage");
    if (isLoading) {
        loadingContainer.classList.remove("visually-hidden");
    } else {
        loadingContainer.classList.add("visually-hidden");
    }
} */ /* // Ejemplo 14: Uso de ASYNC/AWAIT para crear funciones asincrónas que se comportan como si fueran sincronas
console.log("Previo a hacer la solicitud");
async function pedirPosts(){
    const respuesta = await fetch("./data/posts.json");  
    console.log("respuesta: ",respuesta);
    const data = await respuesta.json();  
    console.log("Data: ",data);
};

pedirPosts(); */ /* // Ejemplo 15: Uso de los parámetros de configuración para el método fetch (CREACIÓN DE UN RECURSO)
const CONFIGURACION = {
    method: "POST",
    body: JSON.stringify({
        title: "Nuestro posteo personal",
        body: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas 'Letraset', las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
        userId: 1,
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
};

fetch("https://jsonplaceholder.typicode.com/posts", CONFIGURACION)
.then((response) => response.json())
.then((data) => console.log(data)); */ /* // Ejemplo 16: Uso de los parámetros de configuración para el método fetch (MODIFICACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "PUT",// PUT/GETCH
  body: JSON.stringify({
    title: "Le cambio el título",
    body: "Un nuevo contenido para el body de este post",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};
//fetch("https://jsonplaceholder.typicode.com/posts/{id}", CONFIGURACION)
fetch("https://jsonplaceholder.typicode.com/posts/10", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */ /* // Ejemplo 17: Uso de los parámetros de configuración para el método fetch (ELIMINACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "DELETE",
};
//fetch("https://jsonplaceholder.typicode.com/posts/{id}", CONFIGURACION)
fetch("https://jsonplaceholder.typicode.com/posts/10", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */ /* // Ejemplo 18: Asynchronous JS, promises and ajax (old way)
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function getCountryDataAndNeighbour(country) {

    //AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render country 1
    renderCountry(data);

    //Get neighbour country
    const [neighbour] = data.borders;

    if(!neighbour) return;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function (){
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);

        renderCountry(data2, "neighbour")
    })

    });
};

function renderCountry(data, className = ''){
    //Metodo 1
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(data.population / 1000000).toFixed(1)} people</p>

            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    //Metodo 2
    // <p class="country__row"><span>🗣️</span>${Object.values(Object.values(data.currencies)[0])[0]}</p>
    // <p class="country__row"><span>💰</span>${Object.values(data.languages)[0]}</p>

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

getCountryDataAndNeighbour("russia");

// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 seconds passed');
//         setTimeout(() => {
//             console.log('3 second passed');
//             setTimeout(() => {
//                 console.log('4 second passed');
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000); */ /* // Ejemplo 19: Asynchronous JS, promises and ajax (new way);
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const request = fetch("https://restcountries.com/v3.1/name/russia");
console.log(request);

function getCountryData(country){
    //Country 1
    getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then(function(data){
        console.log(data);
        renderCountry(data[0]);
        const neighbour = data[0]?.borders?.[0]; //If we chose austrlia, then there won't be any key with the name "border" in the object, so we'll get an "undefined". That's why we use the Optional chaining (?.)
        // const neighbour = "frfsag"; //Line to execute an error
        console.log(neighbour);

        if (!neighbour) throw new Error("No neighbour found!");
        
        //Country 2
        return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, "Country not found")
        .then(function(data){
            return renderCountry(data[0], "neighbour");
        })
    })
    .catch(function(err){
        console.log(`${err} 😡😡😡`);
        renderError(`Something went wrong 😡😡😡 ${err.message}. Try again!`); //$ {err} = TypeError: Failed to fetch    {err.message} = Failed to fetch
    })
    .finally(function(){
        countriesContainer.style.opacity = 1;
    })
}

function getJSON(url, errorMsc = "Something went wrong"){
    return fetch(url)
    .then(function(response){
        console.log(response);

        if(!response.ok) throw new Error(`${errorMsc} (${response.status})`); //When we use "throw" in any of our methods, means that it will terminate the currecnt function, and the promise will immediately reject. So, the proimse returned by this first ".then" will be a rejected promise. And that rejection will then propagate all the way down to the catch handler, which we already have set up right down. 
        return response.json(); //json is a function that is available on all responses of the fetch method. json is an asyncronous function and it'll also return a new promise.
    })
}

function renderCountry(data, className = ''){
    //Metodo 1
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(data.population / 1000000).toFixed(1)} people</p>

            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    //Metodo 2
    // <p class="country__row"><span>🗣️</span>${Object.values(Object.values(data.currencies)[0])[0]}</p>
    // <p class="country__row"><span>💰</span>${Object.values(data.languages)[0]}</p>

    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
}

function renderError(msg){
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
}

btn.addEventListener("click", function(){
    getCountryData("russia");
    // getCountryData("australia"); 
    // getCountryData("gtrgt"); //Line to execute an error
}); */ /* //Ejemplo 20: Excercise no. 1

// In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that, you will use a second API to geocode coordinates. 
// So in this challenge, you’ll use an API on your own for the first time. Your tasks:
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API 
//    to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
//    promises to get the data. Do not use the 'getJSON' function we created, that is cheating 
// 3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message 
//    like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() 
//    does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

const countriesContainer = document.querySelector('.countries');

function whereAmI(lat, lng){
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(function(res){
        if(!res.ok) throw new Error(`Problem with geocoding (${res.status})`)
        return res.json();
    })
    .then(function(data){
        console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);
        return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
    })
    .then(function(res){
        if(!res.ok) throw new Error(`Country not found (${res.status})`)
        return res.json();
    })
    .then(function(data){
        return renderCountry(data[0])
    })
    .catch(function(err){
        console.log(`${err.message} 😈`);
    })
}

function renderCountry(data){
    //Metodo 1
    const html = `
    <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(data.population / 1000000).toFixed(1)} people</p>

            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

whereAmI(52.508, 13.381); // (Latitude, Longitude)
// whereAmI(19.037, 72.873);
// whereAmI("ukrj", "brths"); */ /* //Ejemplo 21: The Event Loop
console.log("Test start");

setTimeout(function(){ //This and the Promise.resolve() will be executed at the end. So, coat outside of any callback, will run first
    console.log("0 sec timer");
}, 0);

//This allow us to build a promise, so to create a promise that is immediately resolved.
Promise.resolve("Resolved promise 1")
.then(function(res){
    console.log(res);   
});

Promise.resolve("Resolved promise 2")
.then(function(res){
    for (let i = 0; i < 10000000; i++) {};
    console.log(res);
})

console.log("Test end"); */ /* //Ejemplo 22: Building a Simple Promise

const lotteryPromise = new Promise(function(resolve, reject){ //All of this will create new promise. As soon as the promise constructor runs, it will automatically execute this executor function that we pass in. And as it executes this function here, it will do so by passing in two other arguments. And those arguments are the resolve and reject functions.
    console.log("Lottery dray is happening...")
    setTimeout(function(){
        Math.random() >= 0.5 ? resolve("You win 💰") : reject(new Error ("You lost 💰"));
    }, 2000)
});

lotteryPromise.then(function(res){console.log(res)}).catch(function(err){console.error(err)}); */ /* //Ejemplo 23: Promisifying setTimeout
function wait(seconds){
    return new Promise(function(resolve){ //This doesn't need the reject function because it's impossible for the timer to fail. 
        setTimeout(resolve, seconds);
    })
} 

wait(1000)//This will create a promise that wait for one second at first, and after that second it will resolve.
.then(function() {
    console.log('1 second passed');
    return wait(1000); //Now we have to return a new promise
})
.then(function() {
    console.log('2 second passed');
    return wait(1000);
})
.then(function() {
    console.log('3 second passed');
    return wait(1000);
})
.then(function(){
    console.log('4 second passed');
}); */ /* //Ejemplo 24: Promisifying the Geolocation API
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function getPosition(){
    return new Promise(function(resolve, reject){
        // navigator.geolocation.getCurrentPosition( //If getCurrentPosition automatically calls the pos function, and if it also automatically passes in the position, then we can simply do the next line.
        //     pos => resolve(pos), 
        //     err => reject(err)); 
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

function whereAmI(){
    getPosition()
    .then(function(pos){
        console.log(pos)
        const {latitude: lat, longitude: lng} = pos.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`); //We return a new promise
    })
    .then(function(res){
        if(!res.ok) throw new Error(`Problem with geocoding (${res.status})`)
        return res.json(); //We return a new promise
    })
    .then(function(data){
        console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);
        return fetch(`https://restcountries.com/v3.1/name/${data.country}`); //We return a new promise
    })
    .then(function(res){
        if(!res.ok) throw new Error(`Country not found (${res.status})`)
        return res.json(); //We return a new promise
    })
    .then(function(data){
        return renderCountry(data[0]); //We return a new promise
    })
    .catch(function(err){
        console.log(`${err.message} 😈`);
    });
};

function renderCountry(data){
    const html = `
    <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(data.population / 1000000).toFixed(1)} people</p>

            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

btn.addEventListener("click", whereAmI); */ /* //Ejemplo 25: Excercise no. 2
// 1. Create a function 'createImage' which receives 'imgPath' as an input. This function returns a promise which creates a new image (use document.createElement('img')) and 
//    sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. 
//    The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the'error' event), reject the promise
// 2. Consume the promise using .then and also add an error handler
// 3. After the image has loaded, pause execution for 2 seconds using the 'wait' function we created earlier
// 4. After the 2 seconds have passed, hide the current image (set display CSS property to 'none'), and load a second image (Hint: Use the image element returned by the 
//    'createImage' promise to hide the current image. You will need a global variable for that)
// 5. After the second image has loaded, pause execution for 2 seconds again
// 6. After the 2 seconds have passed, hide the current image

// Test data: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to “Fast 3G” in the dev tools Network tab, otherwise images load too fast
const imgCountainer = document.querySelector(".images");

function createImage(imgPath){
    return new Promise(function(resolve, reject){
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener("load", function(){
            imgCountainer.append(img);
            resolve(img);
        });

        img.addEventListener("error", function(){
            reject(new Error("Image not found"));
        });
    })
}

function wait(seconds){
    return new Promise(function(resolve){ //This doesn't need the reject function because it's impossible for the timer to fail. 
        setTimeout(resolve, seconds);
    })
} 

let currentImg;
createImage("imgs/img-1.jpg")
.then(function(res){
    currentImg = res;
    console.log("Image 1 loaded");
    return wait(2000);
})
.then(function(){
    currentImg.style.display = "none";
    return createImage("imgs/img-2.jpg");
})
.then(function(img){
    currentImg = img;
    console.log("Image 2 loaded");
    return wait(2000);
})
.then(function(){
    currentImg.style.display = "none";
})
.catch(function(err){
    console.error(err);
}); */ /* //Ejemplo 26: Consuming Promises with Async/Await
//Running Promises in Parallel Consuming Promises with Async/Await
const countriesContainer = document.querySelector('.countries');

async function whereAmI(country){
    try{
        //Geolocation
        const pos = await getPosition();
        const {latitude: lat, longitude: lng} = pos.coords;
        
        //Revers geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if(!resGeo.ok) throw new Error("Problem getting location data");
        const dataGeo = await resGeo.json(); //This returns a new promise
        // console.log(resGeo);
        // console.log(dataGeo);
    
        //Country data
        const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`); //This will return a promise. So, await will stop decode execution at this point of the function until the promise is fulfull, and so until the data has been fetched. This isn't blocking the main threat of execution. So, it isn't blocking the call stack.
        if(!res.ok) throw new Error("Problem getting location country");
        const data = await res.json(); //This returns a new promise
        // console.log(res);
        // console.log(data);
    
        renderCountry(data[0]);

        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    }
    catch(err){
        console.error(`${err} 😈`);
        renderError(`😈 ${err.message}`);

        //Reject promise returned from async function 
        throw error;
    }
};

function getPosition(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

function renderCountry(data){
    const html = `
    <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(data.population / 1000000).toFixed(1)} people</p>

            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

function renderError(msg){
    countriesContainer.insertAdjacentText("beforeend", msg);
};

//Metodo 1 con async await, usando IIEF (Immediately Invoked Function Expressions)
console.log("1: Will get location");
(async function () {
    try {
        const city = await whereAmI();
        console.log(`2: ${city}`);
    } catch (err) {
        console.error(`2: ${err.message} 💥`);
    }
    console.log('3: Finished getting location');
})();

//Metodo 2 con then y catch
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location')); */ /* //Ejemplo 27: Running Promises in Parallel
async function get3Countries(c1, c2, c3){
    try {
        //If we use this method, then the 3 functions will run one after the other. So, if we use the second method, then the 3 functions wll run at the same time.
        const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
        const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
        const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
        console.log([data1.capital, data2.capital, data3.capital]);

        //This is a helper function on this promise constructor. So it's a static method. Now, this function takes in an array of promises and it will return a new promise (or also an array), which will then run all the promises in the array at the same time.
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v2/name/${c1}`), 
            getJSON(`https://restcountries.com/v2/name/${c2}`), 
            getJSON(`https://restcountries.com/v2/name/${c3}`)
        ]);
        console.log(data.map(event => event[0].capital))

    } catch (err) {
        console.log(err);
    }    
}

function getJSON(url, errorMsc = "Something went wrong"){
    return fetch(url)
    .then(function(response){
        // console.log(response);

        if(!response.ok) throw new Error(`${errorMsc} (${response.status})`); //When we use "throw" in any of our methods, means that it will terminate the currecnt function, and the promise will immediately reject. So, the proimse returned by this first ".then" will be a rejected promise. And that rejection will then propagate all the way down to the catch handler, which we already have set up right down. 
        return response.json(); //json is a function that is available on all responses of the fetch method. json is an asyncronous function and it'll also return a new promise.
    })
}

get3Countries("russia", "germany", "japan"); */ /* //Ejemplo 28: Other Promise Combinators: race, all, allSettled and any
//It recives an array of promises and it also return a promise. Now, this promise returned by race is settled as asoon as one of the input promises settle. (settled means that a value is available and it doesn't matter if the promise gor rejecetd or fulfilled). So, in Promise.race(), basically the first settled promise wins the race.
(async function(){
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v2/name/russia`),
        getJSON(`https://restcountries.com/v2/name/germany`),
        getJSON(`https://restcountries.com/v2/name/japan`)
    ]);

    console.log(res[0]);
})();

function getJSON(url, errorMsc = "Something went wrong"){
    return fetch(url)
    .then(function(response){
        // console.log(response);

        if(!response.ok) throw new Error(`${errorMsc} (${response.status})`); //When we use "throw" in any of our methods, means that it will terminate the currecnt function, and the promise will immediately reject. So, the proimse returned by this first ".then" will be a rejected promise. And that rejection will then propagate all the way down to the catch handler, which we already have set up right down. 
        return response.json(); //json is a function that is available on all responses of the fetch method. json is an asyncronous function and it'll also return a new promise.
    });
}

function timeout(sec){
    return new Promise(function(_, reject){
        setTimeout(function(){
            reject(new Error("Request took long time!!"));
        }, sec*1000)
    })
}

//Promise.race() takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles. So, it will run the method that first happens, and then the rest of the methods will be rejected. So, that basically will then abort the fetch that is happening
Promise.race([
    getJSON(`https://restcountries.com/v2/name/mexico`),
    timeout(10),
])
.then(res => console.log(res[0])).catch(err => console.error(err));

//It takes in an array of promises again, and it will simply return an array pf all the settled promises, no matter if the promises got rejected or not. The difference with between each other, is that Promise.all() will short circuit as soon as one promises rejects, but Promse.allSettled simply never short circuits. It will only return all the results of all the promises.
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
.then(res => console.log(res));

//It's a static method. Now, this function takes in an array of promises and it will return a new promise (or also an array), which will then run all the promises in the array at the same time.
Promise.all([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
.then(res => console.log(res)).catch(err => console.error(err));

// Promise.any() takes in an array of multiple promises and this one will then return the first fulfilled promise and it will simply ignore rejected promises. It's similar to Promise.race() with the difference that rejected promises are ignored, and so therefore the results of Promise.any() is always gonna be a fulfilled promise, unless of course all of them reject. 
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
])
.then(res => console.log(res)).catch(err => console.error(err)); */ /* //Ejemplo 29: Excercise no. 3
// Your tasks:
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the 'createImage' 
//    function from before). Compare the two versions, think about the big differences, and see which one you like more

// 2. Create an async function 'loadAll' that receives an array of image paths 'imgArr'
// 3. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
// 4. Check out the 'imgs' array in the console! Is it like you expected?
// 5. Use a promise combinator function to actually get the images from the array 
// 6. Add the 'parallel' class to all the images (it has some CSS styles)

// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg']. To test, turn off the 'loadNPause' function

const imgCountainer = document.querySelector(".images");

function createImage(imgPath){
    return new Promise(function(resolve, reject){
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener("load", function(){
            imgCountainer.append(img);
            resolve(img);
        });

        img.addEventListener("error", function(){
            reject(new Error("Image not found"));
        });
    })
}

function wait(seconds){
    return new Promise(function(resolve){ //This doesn't need the reject function because it's impossible for the timer to fail. 
        setTimeout(resolve, seconds);
    })
} 

async function loadNPause(){
    try {
        let img; 

        //Load image 1
        img = await createImage("imgs/img-1.jpg");
        console.log("Image 1 loaded");
        await wait(2000);
        img.style.display = "none";

        //Load image 2
        img = await createImage("imgs/img-2.jpg");
        console.log("Image 2 loaded");
        await wait(2000);
        img.style.display = "none";

        //Load image 3
        img = await createImage("imgs/img-3.jpg");
        console.log("Image 3 loaded");
        await wait(2000);
        img.style.display = "none";

    } catch (err) {
        console.log(err);
    }
}

async function loadAll(imgArr){
    try {
        const imgs = imgArr.map(async function(event){
            return await createImage(event)
        });
        console.log(imgs);

        const imgsEl = await Promise.all(imgs); //When we map the array of imgs by using async-await, we get a promise (fulfilled) and not the three images of each one. So, if we'd want to get the three images we'd have to use the Promise.all(imgs), because all the promises are stored in imgs.
        console.log(imgsEl);

        imgsEl.forEach(event => event.classList.add("parallel"));

    } catch (err) {
        console.log(err);
    }
}

// loadNPause();
loadAll(['imgs/img-1.jpg', 'imgs/img-2.jpg', 'imgs/img-3.jpg']); */ //         $$$$$$$$$$$$$$$ MODERN JAVASCRIPT DEVELOPMENT: MODULES AND TOOLING $$$$$$$$$$$$$$$
/* //Ejemplo 1: Importing and exporting modules
console.log("Importing modile");  //Variables that are declared inside of a module, are actually sculpt to the module. So basically inside a module, the module itself is like the top level scope. And so by default, this means that all top level variables are private inside of this variable.
import "./shoppingCart.js";       //All the modules are first executed before the rest of the code. */ /* //Ejemplo 2: Named exports
import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; //When we use named exports, we must use curly braces.
addToCart('bread', 5);
console.log(price, tq); */ /* //Ejemplo 3: Getting an arror by not exporting a module
console.log(shippingCost); //This will give us an error because we haven't exported the shippingCost variable from shoppingCart.js */ /* //Ejemplo 4: Import all the exports of a module at the same time into an object
import * as ShoppingCart from './shoppingCart.js'; //This will create an object containing everything that is exported from the module that we will specify here.
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice); */ /* //Ejemplo 5: Default exports
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js'; //We must avoid using named and default exports at the same time because this is a bad practice.
// import add from './shoppingCart.js'; //When we use named exports, we must not use curly braces.
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

//We do not see that empty object, that we export, but instead we have the array with the objects that we just added to the cart, by calling the add function. And so that proves
//that this import here, is in fact, not simply a copy of the value, that we exported here. Because if it was, then here we would simply get the empty array.
//Imports are not copies of the exports. They are instead like a live connection, and what this means is that I point to the same place of memory
console.log(cart); */ /* //Ejemplo 6: Top-Level await
//it's very important to remember that using top-level await, so await outside of any async function will block the entire module in a way that we really couldn't block code execution before.
const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // this await keyword here, which is now outside of an async function, is blocking the entire execution of this module.
const data = await res.json();
console.log("data", data);

async function getLastPost() { //calling an async is not necessary because it returns a new promise ( Promise {<pending>} )
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    return { 
        title: data.at(-1).title, 
        text: data.at(-1).body 
    };
};

const lastPost = getLastPost();
console.log("lastPost", lastPost);

const lastPost2 = await getLastPost();
console.log("lastPost2", lastPost2); */ /* //Ejemplo 7: The Module Pattern (old way)

// All of this data here is private because it is inside of the scope of the function. And so now all we have to do is to return some of this stuff in order to basically return a public API.
const ShoppingCart2 = (function(){
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    function addToCart (product, quantity) {
        cart.push({
            product: product, 
            quantity: product
        });
        console.log(`${quantity} ${product} added to cart (sipping cost is ${shippingCost})`);
    };

    function orderStock (product, quantity) {
        console.log(`${quantity} ${product} ordered from suplier`);
    };

    //we simply return an object, which contains the stuff that we want to make public here.
    return {
        addToCart,
        orderStock,
        cart,
        totalPrice,
        totalQuantity,
    };

}) ();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.orderStock('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); */ /* //Ejemplo 8: CommonJS Modules

// Export
exports.addTocart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
        `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    );
};

// Import
const { addTocart } = require('./shoppingCart.js'); */ /* //Ejemplo 9: Introduction to NPM
import add, { cart } from './shoppingCart';
add('pizza', 2);
add('bread', 5);
console.log(cart);


import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es';

const state = {
    cart: [
        { product: 'bread', quantity: 5 },
        { product: 'pizza', quantity: 5 },
    ],
    user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

//The goal of using Parcel is to bunddle the three modules together, which are script.js, shoppingCart.js and cloneDeep.js


if (module.hot) {
    module.hot.accept();
} */ 
},{}]},["02I5Q","fYjC8"], "fYjC8", "parcelRequire94c2")

//# sourceMappingURL=index.71eb84b3.js.map
