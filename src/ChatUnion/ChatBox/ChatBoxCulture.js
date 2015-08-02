goog.module('vchat.ChatBoxCulture');

var ChatBoxRep = goog.require('vchat.ChatBoxRep');
var Culture = goog.require('vieux.Culture');



/**
 *
 * @constructor
 * @extends {Culture}
 */
function ChatBoxCulture() {
    this.rep = new ChatBoxRep();
    ChatBoxCulture.base(this, 'constructor');
}
goog.inherits(ChatBoxCulture, Culture);


ChatBoxCulture.prototype.render = function(opt_base) {
    ChatBoxCulture.base(this, 'render', opt_base);

};


/**
 * @override
 */
ChatBoxCulture.prototype.templates_base = function() {
    return '<culture id="' + this.getId() + '">' +
        this.templates_header() +
        this.templates_messages() +
        this.templates_footer() +
        '</culture>';
};


ChatBoxCulture.prototype.templates_header = function() {
    return '<header>Header</header>';
};


ChatBoxCulture.prototype.templates_footer = function() {
    return '<footer>Footer</footer>';
};


/**
 * @return {string} Main section template.
 */
ChatBoxCulture.prototype.templates_messages = function() {
    return '<messages>' +
        '</messages>';
};

exports = ChatBoxCulture;

