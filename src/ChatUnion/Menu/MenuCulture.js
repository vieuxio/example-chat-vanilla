goog.module('vchat.MenuCulture');

var Culture = goog.require('vieux.Culture');
var MenuRep = goog.require('vchat.MenuRep');



/**
 *
 * @constructor
 * @extends {Culture}
 */
function MenuCulture() {
    this.rep = new MenuRep();

    MenuCulture.base(this, 'constructor');
}
goog.inherits(MenuCulture, Culture);


/**
 * @override
 */
MenuCulture.prototype.templates_base = function() {
    return '<menu id="' + this.getId() + '">' +
        '<h1>Chat</h1>' +
            '<button>Threads</button>' +
        '</menu>';
};


exports = MenuCulture;
