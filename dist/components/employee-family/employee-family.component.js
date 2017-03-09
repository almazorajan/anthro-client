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
        this.mainModal = new models_1.Modal("#" + this.mainModalId);
        this.familyModal = new models_1.Modal("#mdlFamilyInfo");
        this.getRelationships();
    };
    EmployeeFamilyComponent.prototype.getRelationships = function () {
        this.relationships = this.employeeService.getRelationships();
    };
    EmployeeFamilyComponent.prototype.deleteFamily = function (family) {
        var index = this.employee.family.indexOf(family);
        this.employee.family.splice(index, 1);
    };
    EmployeeFamilyComponent.prototype.copyFamily = function (family) {
        return JSON.parse(JSON.stringify(family));
    };
    EmployeeFamilyComponent.prototype.editFamily = function (family, index) {
        this.familyOperation = 1;
        this.isFamilyFormDisabled = false;
        this.currentIndex = index;
        this.family = this.copyFamily(family);
        this.originalFamilyInfo = this.copyFamily(this.family);
        this.familyModal.show();
    };
    EmployeeFamilyComponent.prototype.addFamily = function () {
        this.familyOperation = 2;
        this.isFamilyFormDisabled = false;
        this.family = new models_1.Family();
        this.family.relationship = this.relationships[0];
        this.familyModal.show();
    };
    EmployeeFamilyComponent.prototype.appendFamily = function () {
        this.employee.family.unshift(this.family);
        this.familyModal.hide();
    };
    EmployeeFamilyComponent.prototype.saveUpdate = function () {
        this.employee.family[this.currentIndex] = this.copyFamily(this.family);
        this.familyModal.hide();
    };
    EmployeeFamilyComponent.prototype.cancelAppendFamily = function () {
        this.family = new models_1.Family();
        this.familyModal.hide();
    };
    EmployeeFamilyComponent.prototype.cancelSaveFamily = function () {
        this.family = this.copyFamily(this.originalFamilyInfo);
        this.originalFamilyInfo = null;
        this.familyModal.hide();
    };
    EmployeeFamilyComponent.prototype.confirmAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this family information",
            confirmButtonText: "Yes, Add It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.appendFamily();
                }
            }
        });
    };
    EmployeeFamilyComponent.prototype.confirmSave = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this family information",
            confirmButtonText: "Yes, Update It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.saveUpdate();
                }
            }
        });
    };
    EmployeeFamilyComponent.prototype.confirmCancelSave = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this family information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.cancelSaveFamily();
                }
            }
        });
    };
    EmployeeFamilyComponent.prototype.confirmCancelAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this family information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.cancelAppendFamily();
                }
            }
        });
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
    return EmployeeFamilyComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EmployeeFamilyComponent.prototype, "mainModalId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EmployeeFamilyComponent.prototype, "operation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Employee)
], EmployeeFamilyComponent.prototype, "employee", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeeFamilyComponent.prototype, "isFormDisabled", void 0);
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