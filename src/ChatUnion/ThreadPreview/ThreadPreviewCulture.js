var util = require('util');
var helper = require('../../helper');

var Culture = require('../../vieux/Culture');
var ThreadPreviewRep = require('./ThreadPreviewRep');
var ThreadStereotype = require('../ThreadStereotype');


/**
 * @constructor
 * @extends {Culture}
 *
 * @param {ThreadStereotype} thread A thread Stereotype instance.
 */
function ThreadPreviewCulture(thread) {
    this.rep = new ThreadPreviewRep(thread);

    ThreadPreviewCulture.super_.prototype.constructor.call(this);
}
util.inherits(ThreadPreviewCulture, Culture);


/**
 * @override
 */
ThreadPreviewCulture.prototype.bindRepEvents = function() {
    function updateActiveThreads() { // normally this would be a method on the prototype but somehow closure compiler
                                     // fucks up.
        helper.enable(this.getElement(), 'active', this.rep.active);
        setUnread.call(this);
    }

    function update() {
        updateActiveThreads.call(this);

        this.$('last-message').innerText = this.rep.lastMessage;

        setUnread.call(this);
    }

    function setUnread() {
        helper.enable(this.getElement(), 'unread', this.rep.thread.unread);
    }

    this.rep.on(this.rep.EventType.UPDATE_ACTIVE_THREAD, updateActiveThreads.bind(this));
    this.rep.on(this.rep.EventType.UPDATE, update.bind(this));
};


/**
 * @override
 */
ThreadPreviewCulture.prototype.templates_base = function() {
    var active = this.rep.active ? 'active' : '';

    return '<thread-preview id="' + this.getId() + '" class="' + active + '">' +
            '<img src="' + this.rep.user.picture.thumbnail + '"/>' +
            '<span>' +
                '<strong>' + this.rep.user.getFullName() + '</strong><br/>' +
                '<last-message>' + this.rep.lastMessage + '</last-message>' +
            '</span>' +
        '</thread-preview>';
};


ThreadPreviewCulture.prototype.onClick = function() {
    this.rep.setActive();
};


ThreadPreviewCulture.prototype.events = {
    'click': {
        'thread-preview': ThreadPreviewCulture.prototype.onClick
    }
};

module.exports = ThreadPreviewCulture;
