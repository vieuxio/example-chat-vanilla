var util = require('util');

var Representative = require('../../vieux/Representative');



/**
 *
 * @constructor
 * @extends {Representative}
 */
function ChatBoxRep() {
    ChatBoxRep.super_.prototype.constructor.call(this);
}
util.inherits(ChatBoxRep, Representative);


module.exports = ChatBoxRep;
