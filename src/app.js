goog.module('vchat.app');

var RootCulture = goog.require('vchat.RootCulture');

new RootCulture().render(document.body);

[].slice.call(document.querySelectorAll('script')).forEach(function(s) {
    s.parentNode.removeChild(s);
});
