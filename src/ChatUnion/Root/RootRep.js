goog.module('vchat.RootRep');

var Representative = goog.require('vieux.Representative');



/**
 * @constructor
 * @extends {Representative}
 */
function RootRep() {
    RootRep.base(this, 'constructor');
}
goog.inherits(RootRep, Representative);


exports = RootRep;
