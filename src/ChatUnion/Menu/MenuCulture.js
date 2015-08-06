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


MenuCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.UPDATE, this.onUpdate, false, this);
};


MenuCulture.prototype.onUpdate = function() {
    this.$('button').innerHTML = this.templates_button();
};


/**
 * @override
 */
MenuCulture.prototype.templates_base = function() {
    var buttonTemplate = this.templates_button();

    return '<menu id="' + this.getId() + '">' +
        '<h1>Chat</h1>' +
            '<button>' + buttonTemplate + '</button>' +
        '</menu>';
};


MenuCulture.prototype.templates_button = function() {
    var count = this.rep.unreadCount || '';

    if (count) count = '(' + count + ')';

    return '<span>Threads ' + count + '</span>';
};


MenuCulture.prototype.EventType = {

};

exports = MenuCulture;
