goog.module('vieux.Culture');

var Ministry = goog.require('vieux.CultureMinistry');
var Disposable = goog.require('goog.Disposable');



/**
 * Base Culture class.
 *
 * @constructor
 * @extends {Disposable}
 */
function Culture() {
    Culture.base(this, 'constructor');
    window.sdf = Ministry;

    this.id = Ministry.getUid();

    Ministry.set(this);
    this.bindRepEvents();
}
goog.inherits(Culture, Disposable);

exports = Culture;


/**
 * Returns the dom element attached with the Component instance.
 * @return {?Element}
 */
Culture.prototype.getElement = function() {
    var rv = this.element;
    if (!rv) rv = this.element = document.getElementById(this.id);
    return rv;
};


/**
 * Returns base template of component
 * @return {string}
 */
Culture.prototype.getPlaceholder = function() {
    return this.templates_base();
};


/**
 * Listens to the model's events. This method should be overriden by the implementer, and should keep the model's event
 * listeners.
 * @protected
 */
Culture.prototype.bindRepEvents = function() {

};


/**
 * Returns children of component's element
 * @param {string} selector Expression which is searching in component element. This is kind of $ for selecting
 * dom element.
 * @return ({length: number})
 */
Culture.prototype.$$ = function (selector) {
    var rv = null, el = this.getElement();

    if (el) rv = el.querySelectorAll(selector);

    if (!rv.length) rv = null;

    return rv;
};


/**
 * Returns children of component's element
 * @param {string} selector Expression which is searching in component element. This is kind of $ for selecting
 * dom element.
 * @return {Element}
 */
Culture.prototype.$ = function (selector) {
    var rv = null, el = this.getElement();

    if (el) rv = el.querySelector(selector);

    return rv;
};


/**
 * This method should be called after the Culture is inserted into the document. Any work (rendering child
 * components, updating DOM, etc.) should be done in this method.
 *
 * @param {Element=} opt_base Optional element to render this item into.
 * @param {number=} opt_index Place to render element in base element's children list.
 */
Culture.prototype.render = function(opt_base, opt_index) {
    if (opt_base) {
        this.element = Ministry.createElement(this.getPlaceholder());
        opt_base.insertBefore(this.element, opt_base.childNodes[opt_index] || null);
    }
};


/**
 * Returns the id of this component.
 * @return {string} The id of this component.
 */
Culture.prototype.getId = function() {
    return this.id;
}


/**
 * Template of the root element. This method can be overridden if necessary. Other templates should be named with the
 * templates_ prefix as necessary. Also this template carries related component's id.
 * @return {string}
 */
Culture.prototype.templates_base = function() {
    return '<div id="' + this.id + '"></div>';
};


/**
 * @override
 */
Culture.prototype.disposeInternal = function() {
    Ministry.remove(this);
    this.element = null;
    this.id = null;
};
