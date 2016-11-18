"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// user-defined service
var service_1 = require('../../shared-services/service');
var EmployeeSheetService = (function () {
    function EmployeeSheetService(service) {
        this.service = service;
    }
    EmployeeSheetService.prototype.getAll = function () {
        return this.service.apiCall({
            verb: "post",
            uri: "employee/getAll"
        });
    };
    EmployeeSheetService.prototype.add = function (employee) {
        return this.service.apiCall({
            verb: "post",
            uri: "employee/add",
            body: employee
        });
    };
    EmployeeSheetService.prototype.update = function (employee) {
        return this.service.apiCall({
            verb: "post",
            uri: "employee/update",
            body: employee
        });
    };
    EmployeeSheetService.prototype.delete = function (employee) {
        return this.service.apiCall({
            verb: "post",
            uri: "employee/delete",
            body: employee
        });
    };
    EmployeeSheetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [service_1.Service])
    ], EmployeeSheetService);
    return EmployeeSheetService;
}());
exports.EmployeeSheetService = EmployeeSheetService;
//# sourceMappingURL=employee-sheet.service.js.map