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
    function EmployeeInfoComponent(swal, toast, employeeService, companyService, positionService, employmentStatusService) {
        this.swal = swal;
        this.toast = toast;
        this.employeeService = employeeService;
        this.companyService = companyService;
        this.positionService = positionService;
        this.employmentStatusService = employmentStatusService;
        this.updatingEmployee = false;
        this.deletingEmployee = false;
        this.loadingCompanies = false;
        this.loadingEmploymentStatuses = false;
        this.loadingPositions = false;
        this.isFormDisabled = true;
        this.readyToSave = false;
        this.addingEmployee = false;
        this.employees = [];
    }
    EmployeeInfoComponent.prototype.ngOnInit = function () {
        this.getCompanies();
        this.getEmploymentStatuses();
        this.getPositions();
        this.getRelationships();
    };
    EmployeeInfoComponent.prototype.parseDate = function (dateString) {
        if (dateString) {
            return new Date(dateString);
        }
        return null;
    };
    EmployeeInfoComponent.prototype.add = function () {
        this.modal.show();
        this.operation = 2;
        this.isFormDisabled = false;
        this.employee = new models_1.Employee();
        this.employee.company = this.companies[0];
        this.employee.position = this.positions[0];
        this.employee.employmentStatus = this.employmentStatuses[0];
    };
    EmployeeInfoComponent.prototype.confirmAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this employee information",
            confirmButtonText: "Yes, Update It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.saveNewEmployee();
                }
            }
        });
    };
    EmployeeInfoComponent.prototype.saveNewEmployee = function () {
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
    EmployeeInfoComponent.prototype.view = function (employee) {
        this.operation = 0;
        this.isFormDisabled = true;
        this.employee = employee;
        if (!this.employee.cityAddress) {
            this.employee.cityAddress = new models_1.Address();
        }
        if (!this.employee.permanentAddress) {
            this.employee.permanentAddress = new models_1.Address();
        }
        if (!this.employee.provincialAddress) {
            this.employee.provincialAddress = new models_1.Address();
        }
        if (!this.employee.company) {
            this.employee.company = new models_1.Company();
        }
        this.computeAge(this.employee);
    };
    EmployeeInfoComponent.prototype.edit = function () {
        this.operation = 1;
        this.isFormDisabled = false;
        this.originalEmployeeInfo = JSON.parse(JSON.stringify(this.employee));
    };
    EmployeeInfoComponent.prototype.confirmSave = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this employee information",
            confirmButtonText: "Yes, Update It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.saveUpdates();
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
    EmployeeInfoComponent.prototype.saveUpdates = function () {
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
    EmployeeInfoComponent.prototype.cancelEdit = function () {
        this.operation = 0;
        this.isFormDisabled = true;
        this.employee = JSON.parse(JSON.stringify(this.originalEmployeeInfo));
        this.originalEmployeeInfo = null;
    };
    EmployeeInfoComponent.prototype.addFamily = function () {
        if (this.isFormDisabled)
            return;
        this.employee.family.push(new models_1.Family());
    };
    EmployeeInfoComponent.prototype.addCertification = function () {
        if (this.isFormDisabled)
            return;
        this.employee.certifications.push(new models_1.Accreditation());
    };
    EmployeeInfoComponent.prototype.addLicensure = function () {
        if (this.isFormDisabled)
            return;
        this.employee.licensures.push(new models_1.Accreditation());
    };
    EmployeeInfoComponent.prototype.addEducation = function () {
        if (this.isFormDisabled)
            return;
        this.employee.educationHistory.push(new models_1.Education());
    };
    EmployeeInfoComponent.prototype.addWorkHistory = function () {
        if (this.isFormDisabled)
            return;
        this.employee.workHistory.push(new models_1.WorkHistory());
    };
    EmployeeInfoComponent.prototype.deleteFamily = function (family) {
        var index = this.employee.family.indexOf(family);
        this.employee.family.splice(index, 1);
    };
    EmployeeInfoComponent.prototype.deleteCertification = function (certification) {
        if (this.isFormDisabled)
            return;
        var index = this.employee.certifications.indexOf(certification);
        this.employee.certifications.splice(index, 1);
    };
    EmployeeInfoComponent.prototype.deleteLicense = function (license) {
        if (this.isFormDisabled)
            return;
        var index = this.employee.licensures.indexOf(license);
        this.employee.licensures.splice(index, 1);
    };
    EmployeeInfoComponent.prototype.deleteEducation = function (education) {
        if (this.isFormDisabled)
            return;
        var index = this.employee.educationHistory.indexOf(education);
        this.employee.educationHistory.splice(index, 1);
    };
    EmployeeInfoComponent.prototype.deleteWorkHistory = function (workHistory) {
        if (this.isFormDisabled)
            return;
        var index = this.employee.workHistory.indexOf(workHistory);
        this.employee.workHistory.splice(index, 1);
    };
    EmployeeInfoComponent.prototype.computeAge = function (employee) {
        try {
            var birthDate = new Date(employee.birthDate);
            var birthDay = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDay());
            var diff = Date.now() - birthDay.getTime();
            this.employee.age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
        }
        catch (e) {
            this.toast.error(e);
        }
    };
    EmployeeInfoComponent.prototype.togglePermanentAddress = function () {
        if (this.employee.cityAddress.isPermanent) {
            this.employee.provincialAddress.isPermanent = false;
        }
        if (this.employee.provincialAddress.isPermanent) {
            this.employee.cityAddress.isPermanent = false;
        }
    };
    EmployeeInfoComponent.prototype.getCompanies = function () {
        var _this = this;
        try {
            this.companies = [];
            this.loadingCompanies = true;
            this.isFormDisabled = true;
            this.companyService.getAll().then(function (result) {
                _this.loadingCompanies = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.companies = result.data;
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingCompanies = false;
                _this.isFormDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.loadingCompanies = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    };
    EmployeeInfoComponent.prototype.getEmploymentStatuses = function () {
        var _this = this;
        try {
            this.employmentStatuses = [];
            this.loadingEmploymentStatuses = true;
            this.isFormDisabled = true;
            this.employmentStatusService.getAll().then(function (result) {
                _this.loadingEmploymentStatuses = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.employmentStatuses = result.data;
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingEmploymentStatuses = false;
                _this.isFormDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.loadingEmploymentStatuses = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    };
    EmployeeInfoComponent.prototype.getPositions = function () {
        var _this = this;
        try {
            this.positions = [];
            this.loadingPositions = true;
            this.isFormDisabled = true;
            this.positionService.getAll().then(function (result) {
                _this.loadingPositions = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.positions = result.data;
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingPositions = false;
                _this.isFormDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.loadingPositions = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    };
    EmployeeInfoComponent.prototype.getRelationships = function () {
        try {
            this.relationships = this.employeeService.getRelationships();
        }
        catch (e) {
            this.toast.error(e);
        }
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
            helpers_1.ToastHelper,
            services_1.EmployeeService,
            services_1.CompanyService,
            services_1.EmploymentStatusService,
            services_1.PositionService,
        ]
    }),
    __metadata("design:paramtypes", [helpers_1.SwalHelper,
        helpers_1.ToastHelper,
        services_1.EmployeeService,
        services_1.CompanyService,
        services_1.PositionService,
        services_1.EmploymentStatusService])
], EmployeeInfoComponent);
exports.EmployeeInfoComponent = EmployeeInfoComponent;
//# sourceMappingURL=employee-info.component.js.map