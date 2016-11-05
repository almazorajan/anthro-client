"use strict";
var Module = (function () {
    function Module(moduleInterface) {
        this.moduleInterface = moduleInterface;
    }
    Module.prototype.hasRequiredFields = function () {
        if (this.moduleName && this.link)
            return true;
        return false;
    };
    return Module;
}());
exports.Module = Module;
//# sourceMappingURL=module.js.map