goog.module('vchat.ChatPaneRep');

var Representative = goog.require('vieux.Representative');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 * @constructor
 * @extends {Representative}
 *
 * @param {Object} thread The initial thread this Representative will operate on.
 */
function ChatPaneRep(thread) {
    ChatPaneRep.base(this, 'constructor');

    this.thread = thread;
    this.user = this.thread.user;

    ChatRegime.listen(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onSetActiveThread, false, this);
}
goog.inherits(ChatPaneRep, Representative);


ChatPaneRep.prototype.onSetActiveThread = function() {
    this.thread = ChatRegime.activeThread;

    this.dispatchEvent(this.EventType.CHANGE_ACTIVE_THREAD);
};


ChatPaneRep.prototype.EventType = {
    CHANGE_ACTIVE_THREAD: 'change active thread'
};


exports = ChatPaneRep;
