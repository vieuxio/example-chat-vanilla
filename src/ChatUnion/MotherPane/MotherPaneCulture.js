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
MotherPaneCulture.prototype.bindModelEvents = function() {
    this.rep.listen(this.rep.EventType.INITIAL_DATA, this.onInit, false, this);
};


MotherPaneCulture.prototype.onInit = function(e) {
    this.threadPreviews = this.rep.threads.map(function(thread) {
        return new ThreadPreviewCulture(thread);
    });

    this.getChild('users-list')[0].innerHTML = this.threadPreviews.map(function(threadPreview) {
        return threadPreview.getPlaceholder();
    }).join('');

    this.activeThread = new ChatPaneCulture(this.rep.activeThread);

    this.activeThread.render(this.getElement());
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

