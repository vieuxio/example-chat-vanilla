goog.module('vchat.ChatPaneCulture');

var Culture = goog.require('vieux.Culture');
var ChatPaneRep = goog.require('vchat.ChatPaneRep');



/**
 * @constructor
 *
 * @extends {Culture}
 * @param {Object} thread Thread this pane will render.
 */
function ChatPaneCulture(thread) {
    this.rep = new ChatPaneRep(thread);

    ChatPaneCulture.base(this, 'constructor');
}
goog.inherits(ChatPaneCulture, Culture);


/**
 * @override
 */
ChatPaneCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.CHANGE_ACTIVE_THREAD, this.changeActiveThread, false, this);
    this.rep.listen(this.rep.EventType.UPDATE, this.changeActiveThread, false, this);
};


ChatPaneCulture.prototype.changeActiveThread = function() {
    this.getElement().innerHTML = this.templates_inner();

    var messages = this.$('messages');
    messages.scrollTop = messages.scrollHeight;
};


/**
 * @override
 */
ChatPaneCulture.prototype.templates_base = function() {
    return '<chat-pane id="' + this.getId() + '">' +
            this.templates_inner() +
        '</chat-pane>';
};


ChatPaneCulture.prototype.templates_inner = function() {
    var user = this.rep.thread.user;

    return '<img src="' + user.picture.thumbnail + '"/>' +
        '<username><strong>' + user.getFullName() + '</strong></username>' +
        '<messages>' +
        this.templates_messages() +
        '</messages>' +
        '<entry>' +
            '<img src="' + this.rep.owner.picture.thumbnail + '"/>' +
            '<reply>This demo is for demonstrating unread threads synchronisation, so we left message typing out ' +
                'for the sake of brevity.</reply>' +
        '</entry>';
};


ChatPaneCulture.prototype.templates_messages = function() {
    return this.rep.thread.messages.map(this.templates_message.bind(this)).join('');
};


/**
 * @param {string} message Message body
 * @return {string}
 */
ChatPaneCulture.prototype.templates_message = function(message) {
    return '<message>' + message + '</message>';
};

exports = ChatPaneCulture;

