let clipboard = {};

clipboard.install = function(Vue) {
    Vue.prototype.$toClipboard = (text) => {
        let textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.padding = textArea.style.left = textArea.style.top = 0;
        textArea.style.height = textArea.style.width = '2em';
        textArea.style.boxShadow = textArea.style.outline = textArea.style.border = 'none';
        textArea.style.background = 'transparent';

        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            let successful = document.execCommand('copy');
            let msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
    };
};

try {
    window.VueLiteClipboard = clipboard;
} catch(err) {}

export let VueLiteClipboard = clipboard;