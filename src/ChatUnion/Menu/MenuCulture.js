goog.module('vchat.MenuCulture');

var Culture = goog.require('vieux.Culture');
var MenuRep = goog.require('vchat.MenuRep');
var Popover = goog.require('vchat.ThreadsPopoverCulture');



/**
 *
 * @constructor
 * @extends {Culture}
 */
function MenuCulture() {
    this.rep = new MenuRep();
    this.popover = new Popover();

    MenuCulture.base(this, 'constructor');
}
goog.inherits(MenuCulture, Culture);


/**
 * @override
 */
MenuCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.UPDATE, this.onUpdate, false, this);
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

exports = MenuCulture;
