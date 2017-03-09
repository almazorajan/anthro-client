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
var EmployeeEmploymentComponent = (function () {
    function EmployeeEmploymentComponent(swal, toast, positionService, companyService, employmentStatusService) {
        this.swal = swal;
        this.toast = toast;
        this.positionService = positionService;
        this.companyService = companyService;
        this.employmentStatusService = employmentStatusService;
        this.loadingPositions = false;
        this.loadingCompanies = false;
        this.loadingEmploymentStatuses = false;
    }
    EmployeeEmploymentComponent.prototype.ngOnInit = function () {
        this.getPositions();
        this.getCompanies();
        this.getEmploymentStatuses();
    };
    EmployeeEmploymentComponent.prototype.getPositions = function () {
        var _this = this;
        this.positions = [];
        this.loadingPositions = true;
        this.positionService.getAll().then(function (result) {
            _this.loadingPositions = false;
            if (result.success) {
                _this.positions = result.data;
            }
            else {
                _this.toast.error(result.message);
            }
        }).catch(function (e) {
            _this.loadingPositions = false;
            _this.toast.error(e || e.message);
        });
    };
    EmployeeEmploymentComponent.prototype.getCompanies = function () {
        var _this = this;
        this.companies = [];
        this.loadingCompanies = true;
        this.companyService.getAll().then(function (result) {
            _this.loadingCompanies = false;
            if (result.success) {
                _this.companies = result.data;
            }
            else {
                _this.toast.error(result.message);
            }
        }).catch(function (e) {
            _this.loadingCompanies = false;
            _this.toast.error(e || e.message);
        });
    };
    EmployeeEmploymentComponent.prototype.getEmploymentStatuses = function () {
        var _this = this;
        this.employmentStatuses = [];
        this.loadingEmploymentStatuses = true;
        this.employmentStatusService.getAll().then(function (result) {
            _this.loadingEmploymentStatuses = false;
            if (result.success) {
                _this.employmentStatuses = result.data;
            }
            else {
                _this.toast.error(result.message);
            }
        }).catch(function (e) {
            _this.loadingEmploymentStatuses = false;
            _this.toast.error(e || e.message);
        });
    };
    return EmployeeEmploymentComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Employee)
], EmployeeEmploymentComponent.prototype, "employee", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EmployeeEmploymentComponent.prototype, "operation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeeEmploymentComponent.prototype, "isFormDisabled", void 0);
EmployeeEmploymentComponent = __decorate([
    core_1.Component({
        selector: 'employee-employment-component',
        templateUrl: './app/components/employee-employment/employee-employment.page.html',
        providers: [
            helpers_1.SwalHelper,
            helpers_1.ToastHelper
        ]
    }),
    __metadata("design:paramtypes", [helpers_1.SwalHelper,
        helpers_1.ToastHelper,
        services_1.PositionService,
        services_1.CompanyService,
        services_1.EmploymentStatusService])
], EmployeeEmploymentComponent);
exports.EmployeeEmploymentComponent = EmployeeEmploymentComponent;
//# sourceMappingURL=employee-employment.component.js.map