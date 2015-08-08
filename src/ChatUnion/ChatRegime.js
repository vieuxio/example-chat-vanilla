var util = require('util');

var EventEmitter = require('events').EventEmitter;
var ThreadUndertaker = require('./ThreadUndertaker');
var ThreadStereotype = require('./ThreadStereotype');



/**
 * ChatRegime is responsible for dealing with all the business logic of the chat application.
 *
 * @constructor
 * @extends {EventEmitter}
 */
function ChatRegime() {
    ChatRegime.super_.prototype.constructor.call(this);

    this.undertaker = ThreadUndertaker;
    this.threads = /* Array.<ThreadStereotype> */[];
    this.activeThread = null;

    this.getThreads_();
    this.setupUpdates_();
    this.getOwner_();
}
util.inherits(ChatRegime, EventEmitter);


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

    this.emit(this.EventType.INITIAL_DATA);
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

        if (!correspondingThread) return;

        correspondingThread.messages.push(data.thread.messages.slice(correspondingThread.messages.length));

        correspondingThread.unread = data.thread.id != this.activeThread.id;
    }, this);

    this.emit({
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

    this.emit(this.EventType.SET_ACTIVE_THREAD);
};


ChatRegime.prototype.getOwner_ = function() {
    this.undertaker.getOwner(function(err, owner) {
        this.owner = owner;
    }.bind(this));
};


ChatRegime.prototype.EventType = {
    INITIAL_DATA: 'initial-data',
    SET_ACTIVE_THREAD: 'set-active-thread',
    UPDATE: 'update'
};

module.exports = new ChatRegime();
