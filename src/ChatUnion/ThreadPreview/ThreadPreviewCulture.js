goog.module('vchat.ThreadPreviewCulture');

var classlist = goog.require('goog.dom.classlist');
var Culture = goog.require('vieux.Culture');
var ThreadPreviewRep = goog.require('vchat.ThreadPreviewRep');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');
var Event = goog.require('goog.events.Event');


/**
 * @constructor
 * @extends {vieux.Culture}
 *
 * @param {ThreadStereotype} thread A thread Stereotype instance.
 */
function ThreadPreviewCulture(thread) {
    this.rep = new ThreadPreviewRep(thread);

    ThreadPreviewCulture.base(this, 'constructor');
}
goog.inherits(ThreadPreviewCulture, Culture);


/**
 * @override
 */
ThreadPreviewCulture.prototype.bindModelEvents = function() {
    function updateActiveThreads() { // normally this would be a method on the prototype but somehow closure compiler
                                     // fucks up.
        goog.dom.classlist.enable(this.getElement(), 'active', this.rep.active);
    }

    this.rep.listen(this.rep.EventType.UPDATE_ACTIVE_THREAD, updateActiveThreads, false, this);
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


exports = ThreadPreviewCulture;