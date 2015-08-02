goog.module('vchat.ThreadPreviewRep');

var Representative = goog.require('vieux.Representative');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 * @constructor
 *
 * @extends {Representative}
 * @param {ThreadStereotype} thread A thread Stereotype
 */
function ThreadPreviewRep(thread) {
    ThreadPreviewRep.base(this, 'constructor');

    this.thread = thread;
    this.user = thread.user;
    this.lastMessage = thread.messages.slice(-1);
    this.active = ChatRegime.activeThread == thread;

    ChatRegime.listen(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onSetActiveThread, false, this);
}
goog.inherits(ThreadPreviewRep, Representative);


ThreadPreviewRep.prototype.setActive = function() {
    ChatRegime.setActive(this.thread);
};


ThreadPreviewRep.prototype.onSetActiveThread = function() {
    var newActive = ChatRegime.activeThread == this.thread;

    if (this.active != newActive) {
        this.active = newActive;

        this.dispatchEvent(this.EventType.UPDATE_ACTIVE_THREAD);
    }
};


ThreadPreviewRep.prototype.EventType = {
    UPDATE_ACTIVE_THREAD: 'update active thread'
};


exports = ThreadPreviewRep;
