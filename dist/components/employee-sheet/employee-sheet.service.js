"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var service_1 = require("../../shared-services/service");
var EmployeeSheetService = (function (_super) {
    __extends(EmployeeSheetService, _super);
    function EmployeeSheetService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmployeeSheetService.prototype.getRelationships = function () {
        return [
            "Father",
            "Mother",
            "Spouse",
            "Child",
            "Sibling"
        ];
    };
    EmployeeSheetService.prototype.getEducationalLevels = function () {
        return [
            "Primary",
            "Secondary",
            "Tertiary"
        ];
    };
    EmployeeSheetService.prototype.add = function (employee) {
        return this.apiCall({
            verb: "post",
            uri: "employee/add",
            body: employee
        });
    };
    return EmployeeSheetService;
}(service_1.Service));
EmployeeSheetService = __decorate([
    core_1.Injectable()
], EmployeeSheetService);
exports.EmployeeSheetService = EmployeeSheetService;
//# sourceMappingURL=employee-sheet.service.js.map