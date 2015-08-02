goog.module('vchat.ChatBoxRep');

var Representative = goog.require('vieux.Representative');



/**
 *
 * @constructor
 * @extends {Representative}
 */
function ChatBoxRep() {
    ChatBoxRep.base(this, 'constructor');
}
goog.inherits(ChatBoxRep, Representative);


exports = ChatBoxRep;
