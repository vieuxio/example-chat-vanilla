goog.module('vieux.CultureMinistry');



/**
 *
 * @constructor
 */
function CultureMinistry() {
    /** @type {Object.<string, vieux.Culture>} */
    this.cults = {};

    goog.events.listen(document.body, CultureMinistry.eventTypes, this);
}


/**
 * Returns parent cults (if available) of a given DOM node.
 *
 *
 * @param {Node} child DOM node that will be used for finding parent cults.
 * @return {Array.<vieux.Culture>} Parent cults.
 */
CultureMinistry.prototype.getParentCults = function(child) {
    var node = child, cults = [], cult, ids;

    if (ids = node.getAttribute && node.getAttribute('data-cult')) {
        ids.split(',').forEach(function(id) {
            if (id) cults.push(this.cults[id]);
        }, this);

        return cults;
    }

    ids = [];

    do {
        if (cult = this.cults[node.id]) {
            cults.push(cult);
            ids.push(node.id);
        }
    } while (node = node.parentNode);

    child.setAttribute('data-cult', ids.join(','));
    return cults;
};


/**
 * Keeps event types.
 * @type {Array.<goog.events.EventType>}
 */
CultureMinistry.eventTypes = [
    goog.events.EventType.CLICK,
    goog.events.EventType.MOUSEOVER,
    goog.events.EventType.MOUSEOUT,
    goog.events.EventType.MOUSEMOVE,
    goog.events.EventType.MOUSEDOWN,
    goog.events.EventType.MOUSEUP,
    goog.events.EventType.SCROLL,
    goog.events.EventType.KEYUP,
    goog.events.EventType.KEYPRESS,
    goog.events.EventType.FOCUSIN,
    goog.events.EventType.FOCUSOUT,
    goog.events.EventType.TOUCHSTART,
    goog.events.EventType.TOUCHMOVE,
    goog.events.EventType.TOUCHEND
];


/**
 * @param {goog.events.BrowserEvent} e Browser event to be executed.
 */
CultureMinistry.prototype.handleEvent = function (e) {
    var cults = this.getParentCults(e.target),
        broken = false;

    do {
        if (broken) break;

        broken = this.callHandlers_(cults, e);
    } while (e.target = e.target.parentNode);
};


/**
 * Given a list of cults, checks whether any component would respond to the given event and if so, executes the
 * event handler defined in the component.
 *
 * @private
 *
 * @param {Array.<vieux.Culture>} cults Array of cults to look for handlers about the event's target.
 * @param {goog.events.BrowserEvent} e Browser event that will be executed for the target.
 */
CultureMinistry.prototype.callHandlers_ = function(cults, e) {
    var broken = false;

    for (var i = 0; i < cults.length; i++) {
        var cult = cults[i];
        var handlers = cult && cult.events && cult.events[e.type];

        if (!handlers) continue;

        var selectors = goog.object.getKeys(handlers);

        if (this.callHandler_(cult, e, handlers, selectors) === false) {
            broken = true;
            break;
        }
    }

    return broken;
};


/**
 * @private
 *
 * @param cult
 * @param e
 * @param handlers
 * @param selectors
 * @return {boolean}
 */
CultureMinistry.prototype.callHandler_ = function(cult, e, handlers, selectors){
    var rv = true;
    goog.array.forEach(selectors, function(selector) {
        // event's target equals to handler's selector
        if (this.matchesSelector(e.target, selector)) {
            rv = handlers[selector].call(cult, e);
        }
    }, this);
    return rv;
};




/**
 *
 * @param el
 * @param selector
 * @return {*}
 */
CultureMinistry.prototype.matchesSelector = function(el, selector) {
    return goog.array.indexOf(document.querySelectorAll(selector), el) >= 0;
};


/**
 * Set given component.
 * @param {vieux.Culture} cult Component which will be set to cults.
 */
CultureMinistry.prototype.set = function(cult) {
    this.cults[cult.getId()] = cult;
};


/**
 * Removes given component.
 * @param {vieux.Culture} cult Component which will be removed from cults.
 */
CultureMinistry.prototype.remove = function(cult) {
    delete this.cults[cult.getId()];
};


(function() {
    var counter = Math.floor(Math.random() * 2147483648);
    CultureMinistry.prototype.getUid = function() {
        return (counter++).toString(36);
    }
})();


(function() {
    var tempDiv = document.createElement('div');

    /**
     * Stripped down version of goog.dom.htmlToDocumentFragment. Its performance is fantastic across all browsers.
     *
     * This version won't work with <code><script></code> and <code><style></code> tags in IE.
     * Also, it requires only one element in the top hieararchy, which basically means you have to combine
     * your elements under one parent div, or you will only get the first element.
     *
     * @param {string} htmlString The HTML string to convert.
     * @return {!Node} The resulting element.
     */
    CultureMinistry.prototype.createElement = function(htmlString) {
        tempDiv.innerHTML = htmlString;
        return /** @type {!Node} */ (tempDiv.removeChild(tempDiv.firstChild));
    };
})();


exports = new CultureMinistry();
