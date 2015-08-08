var util = require('util');

var EventEmitter = require('events').EventEmitter;

/**
 * Base Regime class.
 *
 * @constructor
 * @extends {EventEmitter}
 */
function Regime() {
    Regime.super_.prototype.constructor.call(this);
}
util.inherits(Regime, EventEmitter);


module.exports = Regime;
