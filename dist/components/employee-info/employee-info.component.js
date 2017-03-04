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
var EmployeeInfoComponent = (function () {
    function EmployeeInfoComponent(swal, toast, employeeService) {
        this.swal = swal;
        this.toast = toast;
        this.employeeService = employeeService;
        this.updatingEmployee = false;
        this.deletingEmployee = false;
        this.loadingCompanies = false;
        this.addingEmployee = false;
        this.modal = new models_1.Modal("#" + this.id);
    }
    EmployeeInfoComponent.prototype.addEmployee = function () {
        var _this = this;
        try {
            this.isFormDisabled = true;
            this.updatingEmployee = true;
            this.employeeService.addEmployee(this.employee).then(function (result) {
                _this.updatingEmployee = false;
                if (result.success) {
                    _this.onAdd(result);
                    _this.operation = 0;
                    _this.isFormDisabled = false;
                    _this.originalEmployeeInfo = null;
                    _this.modal.hide();
                    _this.toast.success(result.message);
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.updatingEmployee = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.updatingEmployee = false;
            this.toast.error(e);
        }
    };
    EmployeeInfoComponent.prototype.updateEmployee = function () {
        var _this = this;
        try {
            this.isFormDisabled = true;
            this.updatingEmployee = true;
            this.employeeService.updateEmployee(this.employee).then(function (result) {
                _this.updatingEmployee = false;
                if (result.success) {
                    _this.onUpdate(result);
                    _this.operation = 0;
                    _this.isFormDisabled = false;
                    _this.originalEmployeeInfo = null;
                    _this.modal.hide();
                    _this.toast.success(result.message);
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.updatingEmployee = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.updatingEmployee = false;
            this.toast.error(e);
        }
    };
    EmployeeInfoComponent.prototype.deleteEmployee = function () {
        var _this = this;
        try {
            this.isFormDisabled = true;
            this.deletingEmployee = true;
            this.employeeService.deleteEmployee(this.employee).then(function (result) {
                _this.isFormDisabled = false;
                _this.deletingEmployee = false;
                if (result.success) {
                    _this.onDelete(result);
                    _this.modal.hide();
                    _this.toast.success(result.message);
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.isFormDisabled = false;
                _this.deletingEmployee = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.isFormDisabled = false;
            this.deletingEmployee = false;
            this.toast.error(e);
        }
    };
    EmployeeInfoComponent.prototype.cancelUpdate = function () {
        this.operation = 0;
        this.isFormDisabled = true;
        this.employee = JSON.parse(JSON.stringify(this.originalEmployeeInfo));
    };
    EmployeeInfoComponent.prototype.edit = function () {
        this.operation = 1;
        this.isFormDisabled = false;
        this.originalEmployeeInfo = JSON.parse(JSON.stringify(this.employee));
    };
    EmployeeInfoComponent.prototype.confirmAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this employee information",
            confirmButtonText: "Yes, Update It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.addEmployee();
                }
            }
        });
    };
    EmployeeInfoComponent.prototype.confirmUpdate = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this employee information",
            confirmButtonText: "Yes, Update It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.updateEmployee();
                }
            }
        });
    };
    EmployeeInfoComponent.prototype.confirmCancelUpdate = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be reverting your changes",
            confirmButtonText: "Yes, Cancel It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.cancelUpdate();
                }
            }
        });
    };
    EmployeeInfoComponent.prototype.confirmDelete = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this employee information",
            confirmButtonText: "Delete",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.deleteEmployee();
                }
            }
        });
    };
    return EmployeeInfoComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EmployeeInfoComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Employee)
], EmployeeInfoComponent.prototype, "employee", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EmployeeInfoComponent.prototype, "operation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeeInfoComponent.prototype, "isFormDisabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], EmployeeInfoComponent.prototype, "onAdd", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], EmployeeInfoComponent.prototype, "onUpdate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], EmployeeInfoComponent.prototype, "onDelete", void 0);
EmployeeInfoComponent = __decorate([
    core_1.Component({
        selector: 'employee-info-component',
        templateUrl: './app/components/employee-info/employee-info.page.html',
        providers: [
            helpers_1.SwalHelper,
            helpers_1.ToastHelper
        ]
    }),
    __metadata("design:paramtypes", [helpers_1.SwalHelper,
        helpers_1.ToastHelper,
        services_1.EmployeeService])
], EmployeeInfoComponent);
exports.EmployeeInfoComponent = EmployeeInfoComponent;
//# sourceMappingURL=employee-info.component.js.map