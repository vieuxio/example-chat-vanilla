goog.module('vchat.ThreadStereotype');

var UserStereotype = goog.require('vchat.UserStereotype');


/**
 * @constructor

 * @param {Object} thread JSON object for a thread
 */
function ThreadStereotype(thread) {
    this.id = thread.id;
    this.user = new UserStereotype(thread.user);
    this.messages = thread.messages;
    this.active = false;
}


exports = ThreadStereotype;
