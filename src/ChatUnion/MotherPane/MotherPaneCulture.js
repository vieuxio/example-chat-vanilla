goog.module('vchat.MotherPaneCulture');

var Culture = goog.require('vieux.Culture');
var MotherPaneRep = goog.require('vchat.MotherPaneRep');
var ThreadPreviewCulture = goog.require('vchat.ThreadPreviewCulture');
var ChatPaneCulture = goog.require('vchat.ChatPaneCulture');


/**
 *
 * @constructor
 * @extends {Culture}
 */
function MotherPaneCulture() {
    this.rep = new MotherPaneRep();

    MotherPaneCulture.base(this, 'constructor');
}
goog.inherits(MotherPaneCulture, Culture);


/**
 * @override
 */
MotherPaneCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.INITIAL_DATA, this.onInit, false, this);
    this.rep.listen(this.rep.EventType.UPDATE, this.onUpdate, false, this);
};


MotherPaneCulture.prototype.onInit = function(e) {
    this.threadPreviewsById = {};
    this.threadPreviews = this.rep.threads.map(function(thread) {
        var culture = new ThreadPreviewCulture(thread);
        this.threadPreviewsById[thread.id] = culture;

        return culture;
    }, this);

    this.$('users-list').innerHTML = this.threadPreviews.map(function(threadPreview) {
        return threadPreview.getPlaceholder();
    }).join('');

    this.activeThread = new ChatPaneCulture(this.rep.activeThread);

    this.activeThread.render(this.getElement());
};


MotherPaneCulture.prototype.onUpdate = function(e) {
    var list = this.$('users-list');

    e.data.forEach(function(data) {
        var correspondingThreadPreview = this.threadPreviewsById[data.thread.id];

        list.insertBefore(correspondingThreadPreview.getElement(), list.children[0]);
    }, this);
};


/**
 * @override
 */
MotherPaneCulture.prototype.templates_base = function() {
    return '<mother-pane id="' + this.getId() + '">' +
        '<users-list>Users List</users-list>' +
        '</mother-pane>';
};


/**
 * @override
 */
MotherPaneCulture.prototype.disposeInternal = function() {
    this.threadPreviews.forEach(function(threadPreview) {
        threadPreview.dispose();
    });

    this.activeThread.dispose();
};


exports = MotherPaneCulture;

