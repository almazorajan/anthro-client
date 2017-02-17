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
var core_1 = require("@angular/core");
var services_1 = require("../../shared-services/services");
var employee_sheet_service_1 = require("./employee-sheet.service");
var company_service_1 = require("../company/company.service");
var employment_status_service_1 = require("../employment-status/employment-status.service");
var position_service_1 = require("../position/position.service");
var model_1 = require("../../models/model");
var EmployeeSheetComponent = (function () {
    function EmployeeSheetComponent(swal, toastr, employeeSheetService, companyService, employmentStatusService, positionService) {
        this.swal = swal;
        this.toastr = toastr;
        this.employeeSheetService = employeeSheetService;
        this.companyService = companyService;
        this.employmentStatusService = employmentStatusService;
        this.positionService = positionService;
        this.loadingCompanies = false;
        this.loadingEmploymentStatuses = false;
        this.loadingPositions = false;
        this.isFormDisabled = false;
        this.readyToSave = false;
        this.addingEmployee = false;
        this.companies = [];
        this.employmentStatuses = [];
        this.positions = [];
        this.relationships = [];
        this.educationalLevels = [];
    }
    EmployeeSheetComponent.prototype.ngOnInit = function () {
        this.employee = new model_1.Employee();
        this.toastr.info("Loading resources...");
        this.getCompanies();
        this.getEmploymentStatuses();
        this.getPositions();
        this.getRelationships();
        this.getEducationalLevels();
    };
    EmployeeSheetComponent.prototype.setDefaultPosition = function () {
        if (this.positions.length <= 0) {
            return;
        }
        this.employee.position._id = this.positions[0]._id;
        this.employee.position.positionName = this.positions[0].positionName;
    };
    EmployeeSheetComponent.prototype.setDefaultCompany = function () {
        if (this.companies.length <= 0) {
            return;
        }
        this.employee.company._id = this.companies[0]._id;
        this.employee.company.companyName = this.companies[0].companyName;
        this.employee.company.companyAddress = this.companies[0].companyAddress;
        this.employee.company.emailAddress = this.companies[0].emailAddress;
    };
    EmployeeSheetComponent.prototype.setDefaultEmploymentStatus = function () {
        if (this.employmentStatuses.length <= 0) {
            return;
        }
        this.employee.employmentStatus._id = this.employmentStatuses[0]._id;
        this.employee.employmentStatus.employmentStatus = this.employmentStatuses[0].employmentStatus;
        this.employee.workHistory[0].employmentStatus._id = this.employmentStatuses[0]._id;
        this.employee.workHistory[0].employmentStatus.employmentStatus = this.employmentStatuses[0].employmentStatus;
    };
    EmployeeSheetComponent.prototype.getCompanies = function () {
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
                    _this.setDefaultCompany();
                    _this.toastr.success(result.message);
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingCompanies = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.loadingCompanies = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    EmployeeSheetComponent.prototype.getEmploymentStatuses = function () {
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
                    _this.setDefaultEmploymentStatus();
                    _this.toastr.success(result.message);
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingEmploymentStatuses = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.loadingEmploymentStatuses = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    EmployeeSheetComponent.prototype.getPositions = function () {
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
                    _this.setDefaultPosition();
                    _this.toastr.success(result.message);
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingPositions = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.loadingPositions = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    EmployeeSheetComponent.prototype.getRelationships = function () {
        try {
            this.relationships = this.employeeSheetService.getRelationships();
        }
        catch (e) {
            this.toastr.error(e);
        }
    };
    EmployeeSheetComponent.prototype.getEducationalLevels = function () {
        try {
            this.educationalLevels = this.employeeSheetService.getEducationalLevels();
        }
        catch (e) {
            this.toastr.error(e);
        }
    };
    EmployeeSheetComponent.prototype.isEmpty = function (str) {
        if (!str)
            return false;
        return str.trim().length <= 0;
    };
    EmployeeSheetComponent.prototype.isNameValid = function (employee) {
        try {
            if (!employee)
                return false;
            if (!employee.firstName)
                return false;
            if (!employee.lastName)
                return false;
            if (this.isEmpty(employee.firstName))
                return false;
            if (this.isEmpty(employee.lastName))
                return false;
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };
    EmployeeSheetComponent.prototype.isEmployeePositionValid = function (employee) {
        try {
            if (!employee)
                return false;
            if (!employee.position)
                return false;
            if (!employee.position._id)
                return false;
            if (!employee.position._id.trim())
                return false;
            if (this.positions.filter(function (position) { return position._id === employee.position._id; }).length !== 1)
                return false;
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };
    EmployeeSheetComponent.prototype.isEmploymentStatusValid = function (employee) {
        try {
            if (!employee)
                return false;
            if (!employee.employmentStatus)
                return false;
            if (!employee.employmentStatus._id)
                return false;
            if (!employee.employmentStatus._id.trim())
                return false;
            if (this.employmentStatuses.filter(function (employmentStatus) { return employmentStatus._id === employee.employmentStatus._id; }).length !== 1)
                return false;
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };
    EmployeeSheetComponent.prototype.isMartialStatusValid = function (employee) {
        try {
            if (!employee)
                return false;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };
    EmployeeSheetComponent.prototype.isValidFamily = function (employee) {
        var _this = this;
        try {
            if (!employee)
                return false;
            var uniqueRelationships = this.relationships.filter(function (relationship) {
                return relationship.toLowerCase().trim() === "father"
                    || relationship.toLowerCase().trim() === "mother"
                    || relationship.toLowerCase().trim() === "spouse";
            });
            uniqueRelationships.forEach(function (relationship) {
                var countOfRel = 0;
                _this.employee.family.forEach(function (family) {
                    if (family.relationship.toLowerCase().trim() === relationship.toLowerCase().trim()) {
                        countOfRel += 1;
                    }
                });
                if (countOfRel > 0) {
                    _this.toastr.error("Duplicate relationship: " + relationship + ". Only one can be set.");
                }
            });
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };
    EmployeeSheetComponent.prototype.addFamily = function () {
        this.employee.family.unshift(new model_1.Family());
    };
    EmployeeSheetComponent.prototype.addEducation = function () {
        this.employee.educationHistory.unshift(new model_1.Education());
    };
    EmployeeSheetComponent.prototype.addCertification = function () {
        this.employee.certifications.unshift(new model_1.Accreditation());
    };
    EmployeeSheetComponent.prototype.addLicensure = function () {
        this.employee.licensures.unshift(new model_1.Accreditation());
    };
    EmployeeSheetComponent.prototype.addWorkHistory = function () {
        this.employee.workHistory.unshift(new model_1.WorkHistory());
    };
    EmployeeSheetComponent.prototype.deleteEducation = function (education) {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this educational info",
            confirmButtonText: "Yes, Delete It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    var index = _this.employee.educationHistory.indexOf(education);
                    _this.employee.educationHistory.splice(index, 1);
                    _this.toastr.success("Successfully deleted educational info");
                }
            }
        });
    };
    EmployeeSheetComponent.prototype.deleteCertification = function (certification) {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this certification info",
            confirmButtonText: "Yes, Delete It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    var index = _this.employee.certifications.indexOf(certification);
                    _this.employee.certifications.splice(index, 1);
                    _this.toastr.success("Successfully deleted certification info");
                }
            }
        });
    };
    EmployeeSheetComponent.prototype.deleteLicensure = function (licensure) {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this licensure info",
            confirmButtonText: "Yes, Delete It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    var index = _this.employee.licensures.indexOf(licensure);
                    _this.employee.licensures.splice(index, 1);
                    _this.toastr.success("Successfully deleted certification info");
                }
            }
        });
    };
    EmployeeSheetComponent.prototype.deleteFamily = function (family) {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this family info",
            confirmButtonText: "Yes, Delete It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    var index = _this.employee.family.indexOf(family);
                    _this.employee.family.splice(index, 1);
                    _this.toastr.success("Successfully deleted family info");
                }
            }
        });
    };
    EmployeeSheetComponent.prototype.deleteWorkHistory = function (workHistory) {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this work history info",
            confirmButtonText: "Yes, Delete It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    var index = _this.employee.workHistory.indexOf(workHistory);
                    _this.employee.workHistory.splice(index, 1);
                    _this.toastr.success("Successfully deleted work history info");
                }
            }
        });
    };
    EmployeeSheetComponent.prototype.computeAge = function () {
        try {
            var splitBirthDay = this.employee.birthDate.toString().split("-");
            var birthDay = new Date(parseInt(splitBirthDay[0]), parseInt(splitBirthDay[1]), parseInt(splitBirthDay[2]));
            var diff = Date.now() - birthDay.getTime();
            this.employee.age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
        }
        catch (e) {
            this.toastr.error(e);
        }
    };
    EmployeeSheetComponent.prototype.isReadyToSave = function () {
        var condition1 = this.isNameValid(this.employee);
        var condition2 = this.employee.salary < 0;
        var condition3 = this.isEmployeePositionValid(this.employee);
    };
    EmployeeSheetComponent.prototype.addEmployee = function () {
        var _this = this;
        try {
            this.swal.confirm({
                title: "Are You Sure?",
                message: "You will be adding this employee info",
                confirmButtonText: "Yes, Add It!",
                callBack: function (isConfirm) {
                    if (isConfirm) {
                        _this.addingEmployee = true;
                        _this.employeeSheetService.add(_this.employee).then(function (result) {
                            _this.addingEmployee = false;
                            if (result.success) {
                                _this.employee = new model_1.Employee();
                                _this.setDefaultCompany();
                                _this.setDefaultEmploymentStatus();
                                _this.setDefaultPosition();
                                _this.toastr.success(result.message);
                            }
                            else {
                                _this.toastr.error(result.message);
                            }
                        })
                            .catch(function (error) {
                            _this.addingEmployee = false;
                            _this.toastr.error(error);
                        });
                    }
                }
            });
        }
        catch (e) {
            this.toastr.error(e);
            this.addingEmployee = false;
        }
    };
    return EmployeeSheetComponent;
}());
EmployeeSheetComponent = __decorate([
    core_1.Component({
        selector: 'employee-sheet-component',
        templateUrl: './app/components/employee-sheet/employee-sheet-page.html',
        styleUrls: [
            './app/components/employee-sheet/employee-sheet-style.css'
        ],
        providers: [
            services_1.SweetAlertService,
            services_1.ToastrService,
            employee_sheet_service_1.EmployeeSheetService,
            company_service_1.CompanyService,
            employment_status_service_1.EmploymentStatusService,
            position_service_1.PositionService
        ]
    }),
    __metadata("design:paramtypes", [services_1.SweetAlertService,
        services_1.ToastrService,
        employee_sheet_service_1.EmployeeSheetService,
        company_service_1.CompanyService,
        employment_status_service_1.EmploymentStatusService,
        position_service_1.PositionService])
], EmployeeSheetComponent);
exports.EmployeeSheetComponent = EmployeeSheetComponent;
//# sourceMappingURL=employee-sheet.component.js.map