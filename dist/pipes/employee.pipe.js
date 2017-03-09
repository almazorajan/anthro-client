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
var EmployeeFilter = (function () {
    function EmployeeFilter() {
    }
    EmployeeFilter.prototype.transform = function (users, keyword) {
        return users.filter(function (item) {
            return item.employeeNumber.toLowerCase().indexOf(keyword.toLowerCase()) > -1
                || item.firstName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
                || item.middleName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
                || item.lastName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
                || item.position.positionName.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        });
    };
    EmployeeFilter = __decorate([
        core_1.Pipe({
            name: 'employeeFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], EmployeeFilter);
    return EmployeeFilter;
}());
exports.EmployeeFilter = EmployeeFilter;
//# sourceMappingURL=employee.pipe.js.map