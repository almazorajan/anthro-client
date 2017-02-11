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
var employee_list_service_1 = require("./employee-list.service");
var company_service_1 = require("../company/company.service");
var employment_status_service_1 = require("../employment-status/employment-status.service");
var position_service_1 = require("../position/position.service");
var EmployeeListComponent = (function () {
    function EmployeeListComponent(swal, toastr, employeeListService, companyService, employmentStatusService, positionService) {
        this.swal = swal;
        this.toastr = toastr;
        this.employeeListService = employeeListService;
        this.companyService = companyService;
        this.employmentStatusService = employmentStatusService;
        this.positionService = positionService;
        this.searchFilter = "";
        this.loadingEmployees = false;
        this.loadingCompanies = false;
        this.loadingEmploymentStatuses = false;
        this.loadingPositions = false;
        this.isFormDisabled = false;
        this.readyToSave = false;
        this.addingEmployee = false;
        this.employees = [];
        this.displayedEmployees = [];
        this.companies = [];
        this.employmentStatuses = [];
        this.positions = [];
        this.relationships = [];
    }
    EmployeeListComponent.prototype.ngOnInit = function () {
        this.getAllEmployees();
    };
    EmployeeListComponent.prototype.getAllEmployees = function () {
        var _this = this;
        try {
            this.employees = [];
            this.loadingEmployees = true;
            this.isFormDisabled = true;
            this.employeeListService.getAllEmployees().then(function (result) {
                _this.loadingEmployees = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.employees = result.data;
                    _this.displayedEmployees = result.data;
                    console.log(result.data);
                    toastr.success(result.message);
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
                    //this.setDefaultCompany();
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
                    //this.setDefaultEmploymentStatus();
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
                    //this.setDefaultPosition();
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
    EmployeeListComponent.prototype.getRelationships = function () {
        try {
        }
        catch (e) {
            this.toastr.error(e);
        }
    };
    return EmployeeListComponent;
}());
EmployeeListComponent = __decorate([
    core_1.Component({
        selector: 'employee-list-component',
        templateUrl: './app/components/employee-list/employee-list-page.html',
        providers: [
            services_1.SweetAlertService,
            services_1.ToastrService,
            employee_list_service_1.EmployeeListService,
            company_service_1.CompanyService,
            employment_status_service_1.EmploymentStatusService,
            position_service_1.PositionService
        ]
    }),
    __metadata("design:paramtypes", [services_1.SweetAlertService,
        services_1.ToastrService,
        employee_list_service_1.EmployeeListService,
        company_service_1.CompanyService,
        employment_status_service_1.EmploymentStatusService,
        position_service_1.PositionService])
], EmployeeListComponent);
exports.EmployeeListComponent = EmployeeListComponent;
//# sourceMappingURL=employee-list.component.js.map