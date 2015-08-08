var util = require('util');

var Culture = require('../../vieux/Culture');
var RootRep = require('./RootRep');
var MenuCulture = require('../Menu/MenuCulture');
var MotherPaneCulture = require('../MotherPane/MotherPaneCulture');

/**
 * @constructor
 * @extends {Culture}
 */
function RootCulture() {
    this.rep = new RootRep();
    RootCulture.super_.prototype.constructor.call(this);

    this.menu = new MenuCulture();
    this.motherPane = new MotherPaneCulture();
    this.chatBoxes = [];
}
util.inherits(RootCulture, Culture);


/**
 * @override

 * @param {Element=} opt_base Optional element to render this item into.
 * @param {number=} opt_index Place to render element in base element's children list.
 */
RootCulture.prototype.render = function(opt_base, opt_index) {
    RootCulture.super_.prototype.render.call(this, opt_base, opt_index);

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


module.exports = RootCulture;

