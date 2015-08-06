goog.module('vchat.ThreadsPopoverRep');

var Representative = goog.require('vieux.Representative');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 * @constructor
 *
 * @extends {Representative}
 */
function ThreadsPopoverRep() {
    ThreadsPopoverRep.base(this, 'constructor');

    this.visible = false;
}
goog.inherits(ThreadsPopoverRep, Representative);


ThreadsPopoverRep.prototype.toggle = function() {
    this.visible = !this.visible;
};


/**
 * @enum {string}
 */
ThreadsPopoverRep.prototype.EventType = {
    INITIAL_DATA: 'initial data',
    UPDATE: 'update'
};


exports = ThreadsPopoverRep;
