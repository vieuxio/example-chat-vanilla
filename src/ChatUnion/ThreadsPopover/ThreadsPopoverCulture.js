goog.module('vchat.ThreadsPopoverCulture');

var classlist = goog.require('goog.dom.classlist');
var Culture = goog.require('vieux.Culture');
var ThreadsPopoverRep = goog.require('vchat.ThreadsPopoverRep');
var ThreadPreviewCulture = goog.require('vchat.ThreadPreviewCulture');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');
var Event = goog.require('goog.events.Event');
var ThreadList = goog.require('vchat.ThreadListCulture');



/**
 * @constructor
 * @extends {vieux.Culture}
 */
function ThreadsPopoverCulture() {
    this.rep = new ThreadsPopoverRep();

    this.threadList = new ThreadList();

    ThreadsPopoverCulture.base(this, 'constructor');
}
goog.inherits(ThreadsPopoverCulture, Culture);


ThreadsPopoverCulture.prototype.toggle = function() {
    this.rep.toggle();
    goog.dom.classlist.enable(this.getElement(), 'visible', this.rep.visible);
};


/**
 * @override
 */
ThreadsPopoverCulture.prototype.templates_base = function() {
    var visible = this.rep.visible ? 'visible' : '';

    return '<threads-popover id="' + this.getId() + '" class="' + visible + '">' +
        this.threadList.getPlaceholder() +
        '</threads-popover>';
};


exports = ThreadsPopoverCulture;
