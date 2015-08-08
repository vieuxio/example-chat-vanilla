var util = require('util');

var Culture = require('../../vieux/Culture');
var ThreadListRep = require('./ThreadListRep');
var ThreadPreviewCulture = require('../ThreadPreview/ThreadPreviewCulture');
var ChatPaneCulture = require('../ChatPane/ChatPaneCulture');



/**
 *
 * @constructor
 * @extends {Culture}
 */
function ThreadListCulture() {
    this.rep = new ThreadListRep();

    ThreadListCulture.super_.prototype.constructor.call(this);
}
util.inherits(ThreadListCulture, Culture);


/**
 * @override
 */
ThreadListCulture.prototype.bindRepEvents = function() {
    this.rep.on(this.rep.EventType.INITIAL_DATA, this.onInit.bind(this));
    this.rep.on(this.rep.EventType.UPDATE, this.onUpdate.bind(this));
};


ThreadListCulture.prototype.onInit = function(e) {
    this.threadPreviewsById = {};
    this.threadPreviews = this.rep.threads.map(function(thread) {
        var culture = new ThreadPreviewCulture(thread);
        this.threadPreviewsById[thread.id] = culture;

        return culture;
    }, this);

    this.getElement().innerHTML = this.threadPreviews.map(function(threadPreview) {
        return threadPreview.getPlaceholder();
    }).join('');
};


ThreadListCulture.prototype.onUpdate = function(e) {
    var list = this.getElement();

    e.data.forEach(function(data) {
        var correspondingThreadPreview = this.threadPreviewsById[data.thread.id];

        list.insertBefore(correspondingThreadPreview.getElement(), list.children[0]);
    }, this);
};


/**
 * @override
 */
ThreadListCulture.prototype.templates_base = function() {
    return '<thread-list id="' + this.getId() + '"></thread-list>';
};


/**
 * @override
 */
ThreadListCulture.prototype.disposeInternal = function() {
    this.threadPreviews.forEach(function(threadPreview) {
        threadPreview.dispose();
    });
};


module.exports = ThreadListCulture;

