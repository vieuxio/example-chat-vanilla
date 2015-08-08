var util = require('util');

var Representative = require('../../vieux/Representative');
var ThreadStereotype = require('../ThreadStereotype');
var ChatRegime = require('../ChatRegime');



/**
 * @constructor
 *
 * @extends {Representative}
 * @param {ThreadStereotype} thread A thread Stereotype
 */
function ThreadPreviewRep(thread) {
    ThreadPreviewRep.super_.prototype.constructor.call(this);

    this.thread = thread;
    this.user = thread.user;
    this.lastMessage = thread.messages.slice(-1);
    this.active = ChatRegime.activeThread == thread;

    ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onSetActiveThread.bind(this));
    ChatRegime.on(ChatRegime.EventType.UPDATE, this.onUpdate.bind(this));
}
util.inherits(ThreadPreviewRep, Representative);


ThreadPreviewRep.prototype.setActive = function() {
    ChatRegime.setActive(this.thread);
};


ThreadPreviewRep.prototype.onUpdate = function(e) {
    e.data.some(function(data) {
        if (data.thread.id != this.thread.id) return;

        this.lastMessage = this.thread.messages.slice(-1);

        this.emit(this.EventType.UPDATE);

        return true;
    }, this);
};


ThreadPreviewRep.prototype.onSetActiveThread = function() {
    var newActive = ChatRegime.activeThread == this.thread;

    if (this.active != newActive) {
        this.active = newActive;

        this.emit(this.EventType.UPDATE_ACTIVE_THREAD);
    }
};


ThreadPreviewRep.prototype.EventType = {
    UPDATE_ACTIVE_THREAD: 'update-active-thread',
    UPDATE: 'update'
};


module.exports = ThreadPreviewRep;
