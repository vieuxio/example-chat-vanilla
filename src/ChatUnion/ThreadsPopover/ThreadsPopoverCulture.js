goog.module('vchat.ThreadsPopoverCulture');

var classlist = goog.require('goog.dom.classlist');
var Culture = goog.require('vieux.Culture');
var ThreadsPopoverRep = goog.require('vchat.ThreadsPopoverRep');
var ThreadList = goog.require('vchat.ThreadListCulture');



/**
 * @constructor
 * @extends {Culture}
 */
function ThreadsPopoverCulture() {
    this.rep = new ThreadsPopoverRep();

    // the following line should have worked better, but compiler fucks up renaming things, so.
    //this.threadList = new ThreadList();

    ThreadsPopoverCulture.base(this, 'constructor');
}
goog.inherits(ThreadsPopoverCulture, Culture);


ThreadsPopoverCulture.prototype.toggle = function() {
    this.rep.toggle();
    classlist.enable(this.getElement(), 'visible', this.rep.visible);
};


/**
 * @override
 */
ThreadsPopoverCulture.prototype.templates_base = function() {
    var visible = this.rep.visible ? 'visible' : '';
    var threadList = new ThreadList(); // normally this shouldn't be here but the constructor, but compiler fucks up.

    return '<threads-popover id="' + this.getId() + '" class="' + visible + '">' +
        threadList.getPlaceholder() +
        '</threads-popover>';
};


exports = ThreadsPopoverCulture;
