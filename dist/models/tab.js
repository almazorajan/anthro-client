"use strict";
var Tab = (function () {
    function Tab(tab) {
        this.name = tab.name;
        this.href = tab.href;
        this.active = tab.active;
        this.badge = tab.badge;
    }
    Object.defineProperty(Tab.prototype, "ariaControls", {
        get: function () {
            return this.href.replace("#", "");
        },
        enumerable: true,
        configurable: true
    });
    return Tab;
}());
exports.Tab = Tab;
//# sourceMappingURL=tab.js.map