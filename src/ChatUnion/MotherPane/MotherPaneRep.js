var util = require('util');

var Representative = require('../../vieux/Representative');
var ChatRegime = require('../ChatRegime');



/**
 *
 * @constructor
 * @extends {Representative}
 */
function MotherPaneRep() {
    MotherPaneRep.super_.prototype.constructor.call(this);

    ChatRegime.on(ChatRegime.EventType.INITIAL_DATA, this.onInitialData.bind(this));
}
util.inherits(MotherPaneRep, Representative);


/**
 * Fires on initial fetch.
 */
MotherPaneRep.prototype.onInitialData = function() {
    this.activeThread = ChatRegime.activeThread;
    this.threads = ChatRegime.threads;

    this.threads.some(function(thread) {
        if (thread.user.username == this.activeThread.user.username) {
            thread.active = true;
        }
    }.bind(this));

    this.emit(this.EventType.INITIAL_DATA);
    ChatRegime.on(ChatRegime.EventType.UPDATE, this.onUpdate.bind(this));
};


MotherPaneRep.prototype.onUpdate = function(e) {
    e.data.some(function(data) {
        if (data.thread.user.username == this.activeThread.user.username) {
            this.activeThread.active = true;
        }
    }.bind(this));

    this.emit(e);
};


/**
 * @enum {string}
 */
MotherPaneRep.prototype.EventType = {
    INITIAL_DATA: 'initial-data',
    UPDATE: 'update'
};


module.exports = MotherPaneRep;
