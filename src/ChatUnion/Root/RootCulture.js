goog.module('vchat.RootCulture');

var Culture = goog.require('vieux.Culture');
var RootRep = goog.require('vchat.RootRep');
var MenuCulture = goog.require('vchat.MenuCulture');
var MotherPaneCulture = goog.require('vchat.MotherPaneCulture');



/**
 * @constructor
 * @extends {Culture}
 */
function RootCulture() {
    this.rep = new RootRep();
    RootCulture.base(this, 'constructor');

    this.menu = new MenuCulture();
    this.motherPane = new MotherPaneCulture();
    this.chatBoxes = [];
}
goog.inherits(RootCulture, Culture);


/**
 * @override

 * @param {Element=} opt_base Optional element to render this item into.
 * @param {number=} opt_index Place to render element in base element's children list.
 */
RootCulture.prototype.render = function(opt_base, opt_index) {
    RootCulture.base(this, 'render', opt_base, opt_index);

    this.menu.render();
    this.chatBoxes.forEach(function(chatBox) {
        chatBox.render();
    });
};


/**
 * @override
 */
RootCulture.prototype.templates_base = function() {
    return '<root id="' + this.getId() + '">' +
        this.menu.getPlaceholder() +
        this.motherPane.getPlaceholder() +
            '<section id="chat-boxes"></section>' +
        '</root>';
};


/**
 * @override
 */
RootCulture.prototype.disposeInternal = function() {
    this.menu.dispose();
    this.chatBoxes.forEach(function(chatBox) {
        chatBox.dispose();
    });
};


exports = RootCulture;

