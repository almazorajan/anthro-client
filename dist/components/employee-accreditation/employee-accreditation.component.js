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
var EmployeeAccreditationComponent = (function () {
    function EmployeeAccreditationComponent(swal, toast, employeeService) {
        this.swal = swal;
        this.toast = toast;
        this.employeeService = employeeService;
        this.accreditationOperation = 0;
        this.isAccreditationFormDisabled = false;
    }
    EmployeeAccreditationComponent.prototype.ngOnInit = function () {
        this.accreditationModal = new models_1.Modal("#mdlAccreditationInfo");
        this.getAccreditationTypes();
        this.setDefaultAccreditationType();
    };
    EmployeeAccreditationComponent.prototype.getAccreditationTypes = function () {
        this.accreditationTypes = this.employeeService.getAccreditationTypes();
    };
    EmployeeAccreditationComponent.prototype.setDefaultAccreditationType = function () {
        this.accreditationType = this.accreditationTypes[0];
    };
    EmployeeAccreditationComponent.prototype.copyAccreditation = function (accreditation) {
        return JSON.parse(JSON.stringify(accreditation));
    };
    EmployeeAccreditationComponent.prototype.copyString = function (str) {
        return JSON.parse(JSON.stringify(str));
    };
    EmployeeAccreditationComponent.prototype.appendAccreditation = function () {
        if (this.accreditationType.toLowerCase() === "licensure")
            this.employee.licensures.unshift(this.copyAccreditation(this.accreditation));
        else
            this.employee.certifications.unshift(this.copyAccreditation(this.accreditation));
        this.accreditation = null;
        this.accreditationModal.hide();
    };
    EmployeeAccreditationComponent.prototype.updateAccreditation = function () {
        if (this.originalAccreditationType !== this.accreditationType) {
            if (this.accreditationType.toLowerCase() === "licensure") {
                this.employee.certifications.splice(this.accreditationIndex, 1);
                this.employee.licensures.unshift(this.copyAccreditation(this.accreditation));
            }
            if (this.accreditationType.toLowerCase() === "certificate") {
                this.employee.licensures.splice(this.accreditationIndex, 1);
                this.employee.certifications.unshift(this.copyAccreditation(this.accreditation));
            }
        }
        else {
            if (this.accreditationType.toLowerCase() === "licensure") {
                this.employee.licensures[this.accreditationIndex] = this.copyAccreditation(this.accreditation);
            }
            if (this.accreditationType.toLowerCase() === "certificate") {
                this.employee.certifications[this.accreditationIndex] = this.copyAccreditation(this.accreditation);
            }
        }
        this.accreditation = null;
        this.originalAccreditationInfo = null;
        this.accreditationModal.hide();
    };
    EmployeeAccreditationComponent.prototype.cancelAppendAccreditation = function () {
        this.accreditation = null;
        this.accreditationModal.hide();
    };
    EmployeeAccreditationComponent.prototype.deleteAccreditation = function (accreditations, accreditation) {
        var index = accreditations.indexOf(accreditation);
        accreditations.splice(index, 1);
    };
    EmployeeAccreditationComponent.prototype.parseDate = function (dateString) {
        if (dateString) {
            return new Date(dateString);
        }
        return null;
    };
    EmployeeAccreditationComponent.prototype.addAccreditation = function () {
        this.setDefaultAccreditationType();
        this.accreditationOperation = 2;
        this.isAccreditationFormDisabled = false;
        this.accreditation = new models_1.Accreditation();
        this.accreditationModal.show();
    };
    EmployeeAccreditationComponent.prototype.editAccreditation = function (accreditation, index, accreditationType) {
        this.accreditationOperation = 1;
        this.isAccreditationFormDisabled = false;
        this.accreditationIndex = index;
        this.accreditationType = this.copyString(accreditationType);
        this.originalAccreditationType = this.copyString(this.accreditationType);
        this.accreditation = this.copyAccreditation(accreditation);
        this.originalAccreditationInfo = this.copyAccreditation(this.accreditation);
        this.accreditationModal.show();
    };
    EmployeeAccreditationComponent.prototype.confirmAddAccreditation = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be Adding this family information",
            confirmButtonText: "Yes, Add It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.appendAccreditation();
                }
            }
        });
    };
    EmployeeAccreditationComponent.prototype.confirmCancelAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this accreditation information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.cancelAppendAccreditation();
                }
            }
        });
    };
    EmployeeAccreditationComponent.prototype.confirmUpdateAccreditation = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this accreditation information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.updateAccreditation();
                }
            }
        });
    };
    EmployeeAccreditationComponent.prototype.confirmDeleteAccreditation = function (accreditations, accreditation) {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this accreditation information",
            confirmButtonText: "Yes, Delete It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.deleteAccreditation(accreditations, accreditation);
                }
            }
        });
    };
    return EmployeeAccreditationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Employee)
], EmployeeAccreditationComponent.prototype, "employee", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EmployeeAccreditationComponent.prototype, "operation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeeAccreditationComponent.prototype, "isFormDisabled", void 0);
EmployeeAccreditationComponent = __decorate([
    core_1.Component({
        selector: 'employee-accreditation-component',
        templateUrl: './app/components/employee-accreditation/employee-accreditation.page.html',
        providers: [
            helpers_1.SwalHelper,
            helpers_1.ToastHelper
        ]
    }),
    __metadata("design:paramtypes", [helpers_1.SwalHelper,
        helpers_1.ToastHelper,
        services_1.EmployeeService])
], EmployeeAccreditationComponent);
exports.EmployeeAccreditationComponent = EmployeeAccreditationComponent;
//# sourceMappingURL=employee-accreditation.component.js.map