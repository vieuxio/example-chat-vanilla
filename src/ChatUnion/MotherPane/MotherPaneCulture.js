goog.module('vchat.MotherPaneCulture');

var Culture = goog.require('vieux.Culture');
var MotherPaneRep = goog.require('vchat.MotherPaneRep');
var ChatPaneCulture = goog.require('vchat.ChatPaneCulture');
var ThreadList = goog.require('vchat.ThreadListCulture');



/**
 *
 * @constructor
 * @extends {Culture}
 */
function MotherPaneCulture() {
    this.rep = new MotherPaneRep();

    this.threadList = new ThreadList();

    MotherPaneCulture.base(this, 'constructor');
}
goog.inherits(MotherPaneCulture, Culture);


/**
 * @override
 */
MotherPaneCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.INITIAL_DATA, this.onInit, false, this);
};


MotherPaneCulture.prototype.onInit = function() {
    this.activeThread = new ChatPaneCulture(this.rep.activeThread);

    this.activeThread.render(this.getElement());
};


/**
 * @override
 */
MotherPaneCulture.prototype.templates_base = function() {
    return '<mother-pane id="' + this.getId() + '">' +
        this.threadList.getPlaceholder() +
        '</mother-pane>';
};


/**
 * @override
 */
MotherPaneCulture.prototype.disposeInternal = function() {
    this.activeThread.dispose();
};


exports = MotherPaneCulture;

