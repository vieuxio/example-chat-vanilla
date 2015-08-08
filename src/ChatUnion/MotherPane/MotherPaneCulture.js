var util = require('util');

var Culture = require('../../vieux/Culture');
var MotherPaneRep = require('./MotherPaneRep');
var ChatPaneCulture = require('../ChatPane/ChatPaneCulture');
var ThreadList = require('../ThreadList/ThreadListCulture');



/**
 *
 * @constructor
 * @extends {Culture}
 */
function MotherPaneCulture() {
    this.rep = new MotherPaneRep();

    this.threadList = new ThreadList();

    MotherPaneCulture.super_.prototype.constructor.call(this);
}
util.inherits(MotherPaneCulture, Culture);


/**
 * @override
 */
MotherPaneCulture.prototype.bindRepEvents = function() {
    this.rep.on(this.rep.EventType.INITIAL_DATA, this.onInit.bind(this));
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


module.exports = MotherPaneCulture;

