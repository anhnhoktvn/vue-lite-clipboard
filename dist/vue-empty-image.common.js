'use strict';

var Vue = require('vue');
Vue = 'default' in Vue ? Vue['default'] : Vue;

var version = '1.0.0';

var compatible = (/^2\./).test(Vue.version);
if (!compatible) {
    Vue.util.warn('VueEmptyImage ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version);
}

var config = {
    text_size: 10,
    fill_color: '#EEEEEE',
    text_color: '#AAAAAA'
}

function getTextSize(size) {
    return Math.max(config.text_size, Math.round([size.h, size.w].sort()[1] / 16))
}
function drawImage(val, size) {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    var text_size = getTextSize(size)
    var text = val

    canvas.width = size.w
    canvas.height = size.h
    context.fillStyle = config.fill_color
    context.fillRect(0, 0, size.w, size.h)
    context.fillStyle = config.text_color
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = 'bold ' + text_size + 'pt sans-serif'

    if (context.measureText(text).width / size.w > 1) {
        text_size = config.text_size / (context.measureText(text).width / size.w)
        context.font = 'bold ' + text_size + 'pt sans-serif'
    }

    context.fillText(text, size.w / 2, size.h / 2)
    return canvas.toDataURL("image/png")
}

function bind(el, binding) {
    var val = binding.value ? binding.value : binding.key
    var matches = val.match(/^(\d+)x(\d+)$/)

    if (!matches) return

    var size = {w: matches[1], h: matches[2]}
    el.title = val;
    el.alt = val

    var dataUrl = drawImage(val, size)

    if (el.tagName === "IMG") {
        el.src = dataUrl
    } else {
        el.style.backgroundImage = 'url("' + dataUrl + '")'
    }
}

var emptyImage = {
    bind: bind,
    componentUpdated: function(el, binding) {
        if (binding.modifiers.lazy) {
            if (binding.value === binding.oldValue) return;
        }

        bind(el, binding)
    }
};



var mixin = {
    directives: {
        emptyImage: emptyImage,
    },
};

exports.version = version;
exports.emptyImage = emptyImage;
exports.mixin = mixin;