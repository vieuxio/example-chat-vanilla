goog.module('vchat.ChatRegime');

var EventTarget = goog.require('goog.events.EventTarget');
var ThreadsUndertaker = goog.require('vchat.ThreadsUndertaker');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');



/**
 * ChatRegime is responsible for dealing with all the business logic of the chat application.
 *
 * @constructor
 * @extends {EventTarget}
 */
function ChatRegime() {
    ChatRegime.base(this, 'constructor');

    this.undertaker = ThreadsUndertaker;
    this.threads = /* Array.<ThreadStereotype> */[];
    this.activeThread = null;

    this.getThreads_();
}
goog.inherits(ChatRegime, EventTarget);


/**
 * Fetches initial threads
 *
 * @private
 */
ChatRegime.prototype.getThreads_ = function() {
    this.undertaker.getThreads(this.onInitialData.bind(this));
};


ChatRegime.prototype.onInitialData = function(err, data) {
    if (err) return;

    this.threads = data.threads.map(function(thread) {
        return new ThreadStereotype(thread);
    });
    this.activeThread = this.threads[0];

    this.dispatchEvent(this.EventType.INITIAL_DATA);
};


ChatRegime.prototype.setActive = function(thread) {
    this.activeThread = thread;

    this.dispatchEvent(this.EventType.SET_ACTIVE_THREAD);
};


ChatRegime.prototype.EventType = {
    INITIAL_DATA: 'initial data',
    SET_ACTIVE_THREAD: 'set active thread'
};

exports = new ChatRegime();
