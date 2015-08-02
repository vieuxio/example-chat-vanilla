goog.module('vchat.MotherPaneRep');

var Representative = goog.require('vieux.Representative');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 *
 * @constructor
 * @extends {Representative}
 */
function MotherPaneRep() {
    MotherPaneRep.base(this, 'constructor');

    ChatRegime.listen(ChatRegime.EventType.INITIAL_DATA, this.onInitialData, false, this);
}
goog.inherits(MotherPaneRep, Representative);


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

    this.dispatchEvent(this.EventType.INITIAL_DATA);
};


/**
 * @enum {string}
 */
MotherPaneRep.prototype.EventType = {
    INITIAL_DATA: 'initial data'
};


exports = MotherPaneRep;
