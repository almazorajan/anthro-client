"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require('./model');
var EmployeeModule = (function (_super) {
    __extends(EmployeeModule, _super);
    function EmployeeModule() {
        _super.apply(this, arguments);
        this.selected = false;
    }
    return EmployeeModule;
}(model_1.Module));
exports.EmployeeModule = EmployeeModule;
//# sourceMappingURL=employee-module.js.map