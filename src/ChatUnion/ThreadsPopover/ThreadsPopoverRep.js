var util = require('util');

var Representative = require('../../vieux/Representative');
var ThreadStereotype = require('../ThreadStereotype');
var ChatRegime = require('../ChatRegime');



/**
 * @constructor
 *
 * @extends {Representative}
 */
function ThreadsPopoverRep() {
    ThreadsPopoverRep.super_.prototype.constructor.call(this);

    this.visible = false;
}
util.inherits(ThreadsPopoverRep, Representative);


ThreadsPopoverRep.prototype.toggle = function() {
    this.visible = !this.visible;
};


/**
 * @enum {string}
 */
ThreadsPopoverRep.prototype.EventType = {
    INITIAL_DATA: 'initial-data',
    UPDATE: 'update'
};


module.exports = ThreadsPopoverRep;
