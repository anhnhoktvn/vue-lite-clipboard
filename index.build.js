(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var clipboard = {};

    clipboard.install = function (Vue) {
        Vue.prototype.$toClipboard = function (text) {
            var textArea = document.createElement("textarea");
            textArea.style.position = 'fixed';
            textArea.style.padding = textArea.style.left = textArea.style.top = 0;
            textArea.style.height = textArea.style.width = '2em';
            textArea.style.boxShadow = textArea.style.outline = textArea.style.border = 'none';
            textArea.style.background = 'transparent';

            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
            document.body.removeChild(textArea);
        };
    };

    try {
        window.VueLiteClipboard = clipboard;
    } catch (err) {}

    var VueLiteClipboard = exports.VueLiteClipboard = clipboard;
});

