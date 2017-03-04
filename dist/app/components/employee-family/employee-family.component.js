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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var helpers_1 = require("../../helpers/helpers");
var services_1 = require("../../services/services");
var models_1 = require("../../models/models");
var EmployeeFamilyComponent = (function () {
    function EmployeeFamilyComponent(swal, toast, employeeService) {
        this.swal = swal;
        this.toast = toast;
        this.employeeService = employeeService;
    }
    EmployeeFamilyComponent.prototype.ngOnInit = function () {
        this.getRelationships();
    };
    EmployeeFamilyComponent.prototype.getRelationships = function () {
        this.relationships = this.employeeService.getRelationships();
    };
    EmployeeFamilyComponent.prototype.viewFamilyInfo = function (family) {
        this.currentFamily = family;
    };
    EmployeeFamilyComponent.prototype.editFamilyInfo = function () {
        this.originalFamilyInfo = JSON.parse(JSON.stringify(this.currentFamily));
    };
    EmployeeFamilyComponent.prototype.addFamily = function () {
        if (!this.employee.family) {
            this.employee.family = [];
        }
        this.employee.family.unshift(new models_1.Family());
    };
    EmployeeFamilyComponent.prototype.confirmDelete = function (family) {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this family information",
            confirmButtonText: "Yes, Delete It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.deleteFamily(family);
                }
            }
        });
    };
    EmployeeFamilyComponent.prototype.deleteFamily = function (family) {
        var index = this.employee.family.indexOf(family);
        this.employee.family.splice(index, 1);
    };
    return EmployeeFamilyComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EmployeeFamilyComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EmployeeFamilyComponent.prototype, "operation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Employee)
], EmployeeFamilyComponent.prototype, "employee", void 0);
EmployeeFamilyComponent = __decorate([
    core_1.Component({
        selector: 'employee-family-component',
        templateUrl: './app/components/employee-family/employee-family.page.html',
        providers: [
            helpers_1.SwalHelper,
            helpers_1.ToastHelper,
            services_1.EmployeeService
        ]
    }),
    __metadata("design:paramtypes", [helpers_1.SwalHelper,
        helpers_1.ToastHelper,
        services_1.EmployeeService])
], EmployeeFamilyComponent);
exports.EmployeeFamilyComponent = EmployeeFamilyComponent;
//# sourceMappingURL=employee-family.component.js.map