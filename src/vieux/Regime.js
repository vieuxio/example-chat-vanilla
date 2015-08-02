goog.module('vieux.Regime');

var EventTarget = goog.require('goog.events.EventTarget');



/**
 * Base Regime class.
 *
 * @constructor
 * @extends {EventTarget}
 */
function Regime() {
    Regime.base(this, 'constructor');
}
goog.inherits(Regime, EventTarget);


exports = Regime;
