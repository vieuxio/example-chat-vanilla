var util = require('util');

var Culture = require('../../vieux/Culture');
var ChatBoxRep = require('./ChatBoxRep');



/**
 *
 * @constructor
 * @extends {Culture}
 */
function ChatBoxCulture() {
    this.rep = new ChatBoxRep();
    ChatBoxCulture.super_.prototype.constructor.call(this);
}
util.inherits(ChatBoxCulture, Culture);


ChatBoxCulture.prototype.render = function(opt_base) {
    ChatBoxCulture.super_.prototype.render.call(this, opt_base);
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

module.exports = ChatBoxCulture;

