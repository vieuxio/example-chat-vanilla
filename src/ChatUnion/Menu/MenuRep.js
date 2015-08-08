var util = require('util');

var Representative = require('../../vieux/Representative');
var ChatRegime = require('../ChatRegime');



/**
 *
 * @constructor
 * @extends {Representative}
 */
function MenuRep() {
    MenuRep.super_.prototype.constructor.call(this);
    this.unreadCount = ChatRegime.getUnreadCount();

    ChatRegime.on(ChatRegime.EventType.UPDATE, this.onUpdate.bind(this));
    ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onUpdate.bind(this));
}
util.inherits(MenuRep, Representative);


MenuRep.prototype.onUpdate = function() {
    this.unreadCount = ChatRegime.getUnreadCount();

    this.emit(this.EventType.UPDATE);
};


MenuRep.prototype.EventType = {
    UPDATE: 'update'
};


module.exports = MenuRep;
