var util = require('util');
var helper = require('../../helper');

var Culture = require('../../vieux/Culture');
var ThreadsPopoverRep = require('./ThreadsPopoverRep');
var ThreadList = require('../ThreadList/ThreadListCulture');



/**
 * @constructor
 * @extends {Culture}
 */
function ThreadsPopoverCulture() {
    this.rep = new ThreadsPopoverRep();

    // the following line should have worked better, but compiler fucks up renaming things, so.
    //this.threadList = new ThreadList();

    ThreadsPopoverCulture.super_.prototype.constructor.call(this);
}
util.inherits(ThreadsPopoverCulture, Culture);


ThreadsPopoverCulture.prototype.toggle = function() {
    this.rep.toggle();
    helper.enable(this.getElement(), 'visible', this.rep.visible);
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


module.exports = ThreadsPopoverCulture;
