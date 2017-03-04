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
var provider_service_1 = require("./provider.service");
var EmployeeService = (function (_super) {
    __extends(EmployeeService, _super);
    function EmployeeService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmployeeService.prototype.getRelationships = function () {
        return [
            "Father",
            "Mother",
            "Spouse",
            "Child",
            "Sibling"
        ];
    };
    EmployeeService.prototype.getEducationalLevels = function () {
        return [
            "Primary",
            "Secondary",
            "Tertiary"
        ];
    };
    EmployeeService.prototype.addEmployee = function (employee) {
        return this.apiCall({
            verb: "post",
            uri: "employee/add",
            body: employee
        });
    };
    EmployeeService.prototype.getAllEmployees = function () {
        return this.apiCall({
            verb: "post",
            uri: "employee/getall"
        });
    };
    EmployeeService.prototype.updateEmployee = function (employee) {
        return this.apiCall({
            verb: "post",
            uri: "employee/update",
            body: employee
        });
    };
    EmployeeService.prototype.deleteEmployee = function (employee) {
        return this.apiCall({
            verb: "post",
            uri: "employee/delete",
            body: employee
        });
    };
    return EmployeeService;
}(provider_service_1.ProviderService));
EmployeeService = __decorate([
    core_1.Injectable()
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map