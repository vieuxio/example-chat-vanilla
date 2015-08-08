var util = require('util');

var Culture = require('../../vieux/Culture');
var MenuRep = require('./MenuRep');
var Popover = require('../ThreadsPopover/ThreadsPopoverCulture');



/**
 *
 * @constructor
 * @extends {Culture}
 */
function MenuCulture() {
    this.rep = new MenuRep();
    this.popover = new Popover();

    MenuCulture.super_.prototype.constructor.call(this);
}
util.inherits(MenuCulture, Culture);


/**
 * @override
 */
MenuCulture.prototype.bindRepEvents = function() {
    this.rep.on(this.rep.EventType.UPDATE, this.onUpdate.bind(this));
};


MenuCulture.prototype.onUpdate = function() {
    this.$('button').innerHTML = this.templates_button();
};


MenuCulture.prototype.onClickButton = function() {
    this.popover.toggle();
};


/**
 * @override
 */
MenuCulture.prototype.templates_base = function() {
    var buttonTemplate = this.templates_button();

    return '<menu id="' + this.getId() + '">' +
            '<h1>Chat</h1>' +
            '<button>' + buttonTemplate + '</button>' +
            this.popover.getPlaceholder() +
        '</menu>';
};


MenuCulture.prototype.templates_button = function() {
    var count = this.rep.unreadCount || '';

    if (count) count = '(' + count + ')';

    return '<span>Threads ' + count + '</span>';
};


MenuCulture.prototype.events = {
    'click': {
        'button': MenuCulture.prototype.onClickButton
    }
};

module.exports = MenuCulture;
