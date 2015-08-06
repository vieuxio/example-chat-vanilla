goog.module('vchat.ChatRegime');

var EventTarget = goog.require('goog.events.EventTarget');
var ThreadUndertaker = goog.require('vchat.ThreadUndertaker');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');



/**
 * ChatRegime is responsible for dealing with all the business logic of the chat application.
 *
 * @constructor
 * @extends {EventTarget}
 */
function ChatRegime() {
    ChatRegime.base(this, 'constructor');

    this.undertaker = ThreadUndertaker;
    this.threads = /* Array.<ThreadStereotype> */[];
    this.activeThread = null;

    this.getThreads_();
    this.setupUpdates_();
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


ChatRegime.prototype.setupUpdates_ = function() {
    setTimeout(function() {
        this.undertaker.getUpdates(this.onUpdate.bind(this));
    }.bind(this), 1000);
};


ChatRegime.prototype.onInitialData = function(err, data) {
    if (err) return;

    this.threads = data.threads.map(function(thread) {
        return new ThreadStereotype(thread);
    });
    this.activeThread = this.threads[0];

    this.dispatchEvent(this.EventType.INITIAL_DATA);
};


ChatRegime.prototype.getThreadById = function(id) {
    return this.threads.filter(function(thread) {
        return thread.id == id;
    })[0];
};


ChatRegime.prototype.onUpdate = function(err, data) {
    if (err || !data.length) return this.setupUpdates_();

    data.forEach(function(data) {
        var correspondingThread = this.getThreadById(data.thread.id);
        correspondingThread.messages.push(data.thread.messages.slice(correspondingThread.messages.length));

        correspondingThread.unread = data.thread.id != this.activeThread.id;
    }, this);

    this.dispatchEvent({
        type: this.EventType.UPDATE,
        data: data
    });

    this.setupUpdates_();
};


ChatRegime.prototype.getUnreadCount = function() {
    return this.threads.filter(function(thread) {
        return thread.unread;
    }).length;
};


ChatRegime.prototype.setActive = function(thread) {
    this.activeThread = thread;
    this.activeThread.unread = false;

    this.dispatchEvent(this.EventType.SET_ACTIVE_THREAD);
};


ChatRegime.prototype.EventType = {
    INITIAL_DATA: 'initial data',
    SET_ACTIVE_THREAD: 'set active thread',
    UPDATE: 'update'
};

exports = new ChatRegime();
