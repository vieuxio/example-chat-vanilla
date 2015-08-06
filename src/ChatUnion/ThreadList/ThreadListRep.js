goog.module('vchat.ThreadListRep');

var Representative = goog.require('vieux.Representative');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 *
 * @constructor
 * @extends {Representative}
 */
function ThreadListRep() {
    ThreadListRep.base(this, 'constructor');

    ChatRegime.listen(ChatRegime.EventType.INITIAL_DATA, this.onInitialData, false, this);
}
goog.inherits(ThreadListRep, Representative);


/**
 * Fires on initial fetch.
 */
ThreadListRep.prototype.onInitialData = function() {
    this.threads = ChatRegime.threads;

    this.dispatchEvent(this.EventType.INITIAL_DATA);
    ChatRegime.listen(ChatRegime.EventType.UPDATE, this.onUpdate, false, this);
};


ThreadListRep.prototype.onUpdate = function(e) {
    this.dispatchEvent(e);
};


/**
 * @enum {string}
 */
ThreadListRep.prototype.EventType = {
    INITIAL_DATA: 'initial data',
    UPDATE: 'update'
};


exports = ThreadListRep;
