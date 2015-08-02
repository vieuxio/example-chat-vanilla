goog.module('vieux.Culture');

var DlgComponent = goog.require('tart.ui.DlgComponent');



/**
 * Base Culture class.
 *
 * @constructor
 * @extends {DlgComponent}
 */
function Culture() {
    Culture.base(this, 'constructor');
}
goog.inherits(Culture, DlgComponent);


exports = Culture;
