var util = require('util');

var Representative = require('../../vieux/Representative');
var ChatRegime = require('../ChatRegime');



/**
 * @constructor
 * @extends {Representative}
 *
 * @param {Object} thread The initial thread this Representative will operate on.
 */
function ChatPaneRep(thread) {
    ChatPaneRep.super_.prototype.constructor.call(this);

    this.thread = thread;
    this.user = this.thread.user;
    this.owner = ChatRegime.owner;

    ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onSetActiveThread.bind(this));
    ChatRegime.on(ChatRegime.EventType.UPDATE, this.onUpdate.bind(this));
}
util.inherits(ChatPaneRep, Representative);


ChatPaneRep.prototype.onSetActiveThread = function() {
    this.thread = ChatRegime.activeThread;
    this.user = this.thread.user;

    this.emit(this.EventType.CHANGE_ACTIVE_THREAD);
};


ChatPaneRep.prototype.onUpdate = function(e) {
    e.data.some(function(data) {
        if (this.thread.id != data.thread.id) return;
        this.emit(e);

        return true;
    }, this);
};


ChatPaneRep.prototype.EventType = {
    CHANGE_ACTIVE_THREAD: 'change-active-thread',
    UPDATE: 'update'
};


module.exports = ChatPaneRep;
