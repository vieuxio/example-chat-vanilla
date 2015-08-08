var util = require('util');

var Representative = require('../../vieux/Representative');

/**
 * @constructor
 * @extends {Representative}
 */
function RootRep() {
    RootRep.super_.prototype.constructor.call(this);
}
util.inherits(RootRep, Representative);


module.exports = RootRep;
