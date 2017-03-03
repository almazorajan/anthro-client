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
var EmployeeListComponent = (function () {
    function EmployeeListComponent(swal, toast, employeeService, companyService, employmentStatusService, positionService) {
        this.swal = swal;
        this.toast = toast;
        this.employeeService = employeeService;
        this.companyService = companyService;
        this.employmentStatusService = employmentStatusService;
        this.positionService = positionService;
        this.operation = 0;
        this.searchFilter = "";
        this.updatingEmployee = false;
        this.deletingEmployee = false;
        this.loadingEmployees = false;
        this.loadingCompanies = false;
        this.loadingEmploymentStatuses = false;
        this.loadingPositions = false;
        this.isFormDisabled = true;
        this.readyToSave = false;
        this.addingEmployee = false;
        this.employees = [];
        this.companies = [];
        this.employmentStatuses = [];
        this.positions = [];
        this.relationships = [];
    }
    EmployeeListComponent.prototype.ngOnInit = function () {
        this.getAllEmployees();
        this.getCompanies();
        this.getEmploymentStatuses();
        this.getPositions();
        this.getRelationships();
        this.modal = new models_1.Modal("#mdlModalInfo");
    };
    EmployeeListComponent.prototype.getAllEmployees = function () {
        var _this = this;
        try {
            this.employees = [];
            this.loadingEmployees = true;
            this.isFormDisabled = true;
            this.employeeService.getAllEmployees().then(function (result) {
                _this.loadingEmployees = false;
                _this.isFormDisabled = false;
                console.log(result);
                if (result.success) {
                    _this.employees = result.data;
                }
                else {
                    toastr.error(result.message);
                }
            })
                .catch(function (err) {
                _this.loadingEmployees = false;
                _this.isFormDisabled = false;
                toastr.error(err);
            });
        }
        catch (e) {
            this.loadingEmployees = false;
            this.isFormDisabled = false;
            toastr.error(e);
        }
    };
    EmployeeListComponent.prototype.getCompanies = function () {
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
    EmployeeListComponent.prototype.getEmploymentStatuses = function () {
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
    EmployeeListComponent.prototype.getPositions = function () {
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
    EmployeeListComponent.prototype.getRelationships = function () {
        try {
            this.relationships = this.employeeService.getRelationships();
        }
        catch (e) {
            this.toast.error(e);
        }
    };
    EmployeeListComponent.prototype.parseDate = function (dateString) {
        if (dateString) {
            return new Date(dateString);
        }
        return null;
    };
    EmployeeListComponent.prototype.add = function () {
        this.modal.show();
        this.operation = 2;
        this.isFormDisabled = false;
        this.currentEmployee = new models_1.Employee();
        this.currentEmployee.company = this.companies[0];
        this.currentEmployee.position = this.positions[0];
        this.currentEmployee.employmentStatus = this.employmentStatuses[0];
    };
    EmployeeListComponent.prototype.confirmAdd = function () {
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
    EmployeeListComponent.prototype.saveNewEmployee = function () {
        var _this = this;
        try {
            this.isFormDisabled = true;
            this.updatingEmployee = true;
            this.employeeService.addEmployee(this.currentEmployee).then(function (result) {
                _this.updatingEmployee = false;
                if (result.success) {
                    _this.operation = 0;
                    _this.isFormDisabled = false;
                    _this.currentEmployee = null;
                    _this.originalEmployeeInfo = null;
                    _this.modal.hide();
                    _this.getAllEmployees();
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
    EmployeeListComponent.prototype.view = function (employee) {
        this.operation = 0;
        this.isFormDisabled = true;
        this.currentEmployee = employee;
        if (!this.currentEmployee.cityAddress) {
            this.currentEmployee.cityAddress = new models_1.Address();
        }
        if (!this.currentEmployee.permanentAddress) {
            this.currentEmployee.permanentAddress = new models_1.Address();
        }
        if (!this.currentEmployee.provincialAddress) {
            this.currentEmployee.provincialAddress = new models_1.Address();
        }
        if (!this.currentEmployee.company) {
            this.currentEmployee.company = new models_1.Company();
        }
        this.computeAge(this.currentEmployee);
    };
    EmployeeListComponent.prototype.edit = function () {
        this.operation = 1;
        this.isFormDisabled = false;
        this.originalEmployeeInfo = JSON.parse(JSON.stringify(this.currentEmployee));
    };
    EmployeeListComponent.prototype.confirmSave = function () {
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
    EmployeeListComponent.prototype.confirmDelete = function () {
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
    EmployeeListComponent.prototype.saveUpdates = function () {
        var _this = this;
        try {
            this.isFormDisabled = true;
            this.updatingEmployee = true;
            this.employeeService.updateEmployee(this.currentEmployee).then(function (result) {
                _this.updatingEmployee = false;
                if (result.success) {
                    _this.operation = 0;
                    _this.isFormDisabled = false;
                    _this.currentEmployee = null;
                    _this.originalEmployeeInfo = null;
                    _this.modal.hide();
                    _this.getAllEmployees();
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
    EmployeeListComponent.prototype.deleteEmployee = function () {
        var _this = this;
        try {
            this.isFormDisabled = true;
            this.deletingEmployee = true;
            this.employeeService.deleteEmployee(this.currentEmployee).then(function (result) {
                _this.isFormDisabled = false;
                _this.deletingEmployee = false;
                if (result.success) {
                    _this.getAllEmployees();
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
    EmployeeListComponent.prototype.cancelEdit = function () {
        this.operation = 0;
        this.isFormDisabled = true;
        this.currentEmployee = JSON.parse(JSON.stringify(this.originalEmployeeInfo));
        this.originalEmployeeInfo = null;
    };
    EmployeeListComponent.prototype.addFamily = function () {
        if (this.isFormDisabled)
            return;
        this.currentEmployee.family.push(new models_1.Family());
    };
    EmployeeListComponent.prototype.addCertification = function () {
        if (this.isFormDisabled)
            return;
        this.currentEmployee.certifications.push(new models_1.Accreditation());
    };
    EmployeeListComponent.prototype.addLicensure = function () {
        if (this.isFormDisabled)
            return;
        this.currentEmployee.licensures.push(new models_1.Accreditation());
    };
    EmployeeListComponent.prototype.addEducation = function () {
        if (this.isFormDisabled)
            return;
        this.currentEmployee.educationHistory.push(new models_1.Education());
    };
    EmployeeListComponent.prototype.addWorkHistory = function () {
        if (this.isFormDisabled)
            return;
        this.currentEmployee.workHistory.push(new models_1.WorkHistory());
    };
    EmployeeListComponent.prototype.deleteFamily = function (family) {
        var index = this.currentEmployee.family.indexOf(family);
        this.currentEmployee.family.splice(index, 1);
    };
    EmployeeListComponent.prototype.deleteCertification = function (certification) {
        if (this.isFormDisabled)
            return;
        var index = this.currentEmployee.certifications.indexOf(certification);
        this.currentEmployee.certifications.splice(index, 1);
    };
    EmployeeListComponent.prototype.deleteLicense = function (license) {
        if (this.isFormDisabled)
            return;
        var index = this.currentEmployee.licensures.indexOf(license);
        this.currentEmployee.licensures.splice(index, 1);
    };
    EmployeeListComponent.prototype.deleteEducation = function (education) {
        if (this.isFormDisabled)
            return;
        var index = this.currentEmployee.educationHistory.indexOf(education);
        this.currentEmployee.educationHistory.splice(index, 1);
    };
    EmployeeListComponent.prototype.deleteWorkHistory = function (workHistory) {
        if (this.isFormDisabled)
            return;
        var index = this.currentEmployee.workHistory.indexOf(workHistory);
        this.currentEmployee.workHistory.splice(index, 1);
    };
    EmployeeListComponent.prototype.computeAge = function (employee) {
        try {
            var birthDate = new Date(employee.birthDate);
            var birthDay = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDay());
            var diff = Date.now() - birthDay.getTime();
            this.currentEmployee.age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
        }
        catch (e) {
            this.toast.error(e);
        }
    };
    EmployeeListComponent.prototype.togglePermanentAddress = function () {
        if (this.currentEmployee.cityAddress.isPermanent) {
            this.currentEmployee.provincialAddress.isPermanent = false;
        }
        if (this.currentEmployee.provincialAddress.isPermanent) {
            this.currentEmployee.cityAddress.isPermanent = false;
        }
    };
    return EmployeeListComponent;
}());
EmployeeListComponent = __decorate([
    core_1.Component({
        selector: 'employee-list-component',
        templateUrl: './app/components/employee-list/employee-list.page.html',
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
        services_1.EmploymentStatusService,
        services_1.PositionService])
], EmployeeListComponent);
exports.EmployeeListComponent = EmployeeListComponent;
//# sourceMappingURL=employee-list.component.js.map