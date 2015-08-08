var util = require('util');

var Representative = require('../../vieux/Representative');
var ChatRegime = require('../ChatRegime');



/**
 *
 * @constructor
 * @extends {Representative}
 */
function ThreadListRep() {
    ThreadListRep.super_.prototype.constructor.call(this);

    ChatRegime.on(ChatRegime.EventType.INITIAL_DATA, this.onInitialData.bind(this));
}
util.inherits(ThreadListRep, Representative);


/**
 * Fires on initial fetch.
 */
ThreadListRep.prototype.onInitialData = function() {
    this.threads = ChatRegime.threads;

    this.emit(this.EventType.INITIAL_DATA);
    ChatRegime.on(ChatRegime.EventType.UPDATE, this.onUpdate.bind(this));
};


ThreadListRep.prototype.onUpdate = function(e) {
    this.emit(e);
};


/**
 * @enum {string}
 */
ThreadListRep.prototype.EventType = {
    INITIAL_DATA: 'initial-data',
    UPDATE: 'update'
};


module.exports = ThreadListRep;
