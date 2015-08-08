var util = require('util');

var EventEmitter = require('events').EventEmitter;

/**
 * Base Representative class.
 *
 * @constructor
 * @extends {EventEmitter}
 */
function Representative() {
    Representative.super_.prototype.constructor.call(this);
}
util.inherits(Representative, EventEmitter);


module.exports = Representative;
