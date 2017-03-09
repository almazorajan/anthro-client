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
        this.isFormDisabled = true;
        this.addingEmployee = false;
        this.employees = [];
        this.modal = new models_1.Modal("#mdlModalInfo");
    }
    ;
    EmployeeListComponent.prototype.ngOnInit = function () {
        this.getAllEmployees();
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
    EmployeeListComponent.prototype.view = function (employee) {
        this.currentEmployee = employee;
        this.isFormDisabled = true;
        this.operation = 0;
        this.modal.show();
    };
    EmployeeListComponent.prototype.add = function () {
        this.currentEmployee = new models_1.Employee();
        this.isFormDisabled = false;
        this.operation = 2;
        this.modal.show();
    };
    EmployeeListComponent.prototype.onAdd = function () {
        this.getAllEmployees();
        this.modal.hide();
    };
    EmployeeListComponent.prototype.onUpdate = function () {
        this.getAllEmployees();
        this.modal.hide();
    };
    EmployeeListComponent.prototype.onDelete = function () {
        this.getAllEmployees();
        this.modal.hide();
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