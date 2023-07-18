var aviaJS = aviaJS || {};
(function () {
  "use strict";
  if (!aviaJS.aviaJSHelpers) {
    class aviaJSHelpers {
      constructor() {}
      debounce(callback, wait, immediate) {
        var i;
        return function () {
          var e = this,
            t = arguments,
            l = function () {
              i = null;
              if (!immediate) {
                callback.apply(e, t);
              }
            },
            a = immediate && !i;
          clearTimeout(i);
          i = setTimeout(l, wait);
          if (a) {
            callback.apply(e, t);
          }
        };
      }
    }
    aviaJS.aviaJSHelpers = new aviaJSHelpers();
  }
  if (!aviaJS.aviaPlugins) {
    class aviaPlugins {
      plugins = [];
      defaultPlugin = { classFactory: null, selector: "" };
      constructor() {
        this.plugins = [];
      }
      register(classFactory, selector) {
        if ("function" != typeof classFactory) {
          return !1;
        }
        let newPlugin = Object.assign({}, this.defaultPlugin);
        if ("string" != typeof selector) {
          selector = "body";
        }
        newPlugin.classFactory = classFactory;
        newPlugin.selector = selector;
        this.plugins.push(newPlugin);
        this.check_bind();
      }
      check_bind() {
        if (document.readyState === "complete") {
          this.bind_plugins();
        } else {
          document.addEventListener(
            "readystatechange",
            this.bind_plugins.bind(this)
          );
        }
      }
      bind_plugins(e) {
        if (document.readyState !== "complete") {
          return;
        }
        let plugins = this.plugins;
        this.plugins = [];
        for (let plugin of plugins) {
          let elements = document.querySelectorAll(plugin.selector);
          for (let element of elements) {
            plugin.classFactory(element);
          }
        }
      }
    }
    aviaJS.aviaPlugins = new aviaPlugins();
  }
})();
