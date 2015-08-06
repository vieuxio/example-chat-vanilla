goog.module('vchat.MenuRep');

var Representative = goog.require('vieux.Representative');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 *
 * @constructor
 * @extends {Representative}
 */
function MenuRep() {
    MenuRep.base(this, 'constructor');
    this.unreadCount = ChatRegime.getUnreadCount();

    ChatRegime.listen(ChatRegime.EventType.UPDATE, this.onUpdate, false, this);
    ChatRegime.listen(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onUpdate, false, this);
}
goog.inherits(MenuRep, Representative);


MenuRep.prototype.onUpdate = function() {
    this.unreadCount = ChatRegime.getUnreadCount();

    this.dispatchEvent(this.EventType.UPDATE);
};


MenuRep.prototype.EventType = {
    UPDATE: 'update'
};


exports = MenuRep;
