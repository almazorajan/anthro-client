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
var models_1 = require("../../models/models");
var EmployeeEducationComponent = (function () {
    function EmployeeEducationComponent(swal, toast) {
        this.swal = swal;
        this.toast = toast;
    }
    EmployeeEducationComponent.prototype.ngOnInit = function () {
        this.educationModal = new models_1.Modal("#mdlEducationInfo");
    };
    EmployeeEducationComponent.prototype.copyEducation = function (education) {
        return JSON.parse(JSON.stringify(education));
    };
    EmployeeEducationComponent.prototype.appendEducation = function () {
        this.employee.educationHistory.push(this.copyEducation(this.education));
        this.educationModal.hide();
    };
    EmployeeEducationComponent.prototype.cancelAppendEducation = function () {
        this.education = null;
        this.educationModal.hide();
    };
    EmployeeEducationComponent.prototype.updateEducation = function () {
        this.employee.educationHistory[this.currentIndex] = this.copyEducation(this.education);
        this.originalEducationInfo = null;
        this.educationModal.hide();
    };
    EmployeeEducationComponent.prototype.cancelUpdateEducation = function () {
        this.education = this.copyEducation(this.originalEducationInfo);
        this.originalEducationInfo = null;
        this.educationModal.hide();
    };
    EmployeeEducationComponent.prototype.deleteEducation = function (education) {
        var index = this.employee.educationHistory.indexOf(education);
        this.employee.educationHistory.splice(index, 1);
        this.educationModal.hide();
    };
    EmployeeEducationComponent.prototype.parseDate = function (dateString) {
        if (dateString) {
            return new Date(dateString);
        }
        return null;
    };
    EmployeeEducationComponent.prototype.addEducation = function () {
        this.educationOperation = 2;
        this.isEducationFormDisabled = false;
        this.education = new models_1.Education();
        this.educationModal.show();
    };
    EmployeeEducationComponent.prototype.editEducation = function (education, index) {
        this.educationOperation = 1;
        this.isEducationFormDisabled = false;
        this.currentIndex = index;
        this.education = this.copyEducation(education);
        this.originalEducationInfo = this.copyEducation(this.education);
        this.educationModal.show();
    };
    EmployeeEducationComponent.prototype.confirmAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this education information",
            confirmButtonText: "Yes, Add It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.appendEducation();
                }
            }
        });
    };
    EmployeeEducationComponent.prototype.confirmUpdate = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this education information",
            confirmButtonText: "Yes, Update It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.updateEducation();
                }
            }
        });
    };
    EmployeeEducationComponent.prototype.confirmCancelAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this education information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.cancelAppendEducation();
                }
            }
        });
    };
    EmployeeEducationComponent.prototype.confirmCancelUpdate = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this education information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.cancelUpdateEducation();
                }
            }
        });
    };
    EmployeeEducationComponent.prototype.confirmDeleteEducation = function (education) {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this education information",
            confirmButtonText: "Yes, Delete It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.deleteEducation(education);
                }
            }
        });
    };
    return EmployeeEducationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Employee)
], EmployeeEducationComponent.prototype, "employee", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EmployeeEducationComponent.prototype, "operation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeeEducationComponent.prototype, "isFormDisabled", void 0);
EmployeeEducationComponent = __decorate([
    core_1.Component({
        selector: 'employee-education-component',
        templateUrl: './app/components/employee-education/employee-education.page.html',
        providers: [
            helpers_1.SwalHelper,
            helpers_1.ToastHelper
        ]
    }),
    __metadata("design:paramtypes", [helpers_1.SwalHelper,
        helpers_1.ToastHelper])
], EmployeeEducationComponent);
exports.EmployeeEducationComponent = EmployeeEducationComponent;
//# sourceMappingURL=employee-education.component.js.map