goog.module('vieux.Representative');

var EventTarget = goog.require('goog.events.EventTarget');



/**
 * Base Representative class.
 *
 * @constructor
 * @extends {EventTarget}
 */
function Representative() {
    Representative.base(this, 'constructor');
}
goog.inherits(Representative, EventTarget);


exports = Representative;
