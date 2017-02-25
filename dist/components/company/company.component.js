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
var model_1 = require("../../models/model");
var company_service_1 = require("./company.service");
var services_1 = require("../../shared-services/services");
var CompanyComponent = (function () {
    function CompanyComponent(swal, toastr, companyService) {
        this.swal = swal;
        this.toastr = toastr;
        this.companyService = companyService;
        this.operation = 0;
        this.companies = [];
    }
    CompanyComponent.prototype.ngOnInit = function () {
        this.modal = new model_1.Modal("#mdlModalInfo");
        this.getAll();
    };
    CompanyComponent.prototype.getAll = function () {
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
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingCompanies = true;
                _this.isFormDisabled = true;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.loadingCompanies = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    CompanyComponent.prototype.view = function (company) {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedCompany = company;
    };
    CompanyComponent.prototype.edit = function () {
        this.operation = 2;
        this.isFormDisabled = false;
        this.originalCompanyInfo = Object.assign({}, this.selectedCompany);
    };
    CompanyComponent.prototype.cancelEdit = function () {
        this.selectedCompany = Object.assign({}, this.originalCompanyInfo);
        this.view(this.selectedCompany);
    };
    CompanyComponent.prototype.add = function () {
        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedCompany = new model_1.Company();
    };
    CompanyComponent.prototype.confirmAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be adding this module.",
            confirmButtonText: "Yes, add it!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.addCompany();
                }
            }
        });
    };
    CompanyComponent.prototype.addCompany = function () {
        var _this = this;
        try {
            this.addingCompany = true;
            this.isFormDisabled = true;
            this.companyService.addCompany(this.selectedCompany).then(function (result) {
                _this.addingCompany = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.toastr.success(result.message);
                    _this.getAll();
                    _this.modal.hide();
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.addingCompany = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.addingCompany = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    CompanyComponent.prototype.confirmUpdate = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be updating this company.",
            confirmButtonText: "Yes, Update It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.updateCompany();
                }
            }
        });
    };
    CompanyComponent.prototype.updateCompany = function () {
        var _this = this;
        try {
            this.deletingCompany = true;
            this.isFormDisabled = true;
            this.companyService.updateCompany(this.selectedCompany).then(function (result) {
                _this.deletingCompany = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.toastr.success(result.message);
                    _this.modal.hide();
                    _this.getAll();
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.deletingCompany = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.deletingCompany = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    CompanyComponent.prototype.confirmDelete = function (company) {
        var _this = this;
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be deleting this module.",
            confirmButtonText: "Yes, Delete It!",
            callBack: function (isConfirm) {
                if (isConfirm)
                    _this.deleteCompany(company);
            }
        });
    };
    CompanyComponent.prototype.deleteCompany = function (company) {
        var _this = this;
        try {
            this.deletingCompany = true;
            this.isFormDisabled = true;
            this.companyService.deleteCompany(company).then(function (result) {
                _this.deletingCompany = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.toastr.success(result.message);
                    _this.getAll();
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.deletingCompany = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.deletingCompany = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    return CompanyComponent;
}());
CompanyComponent = __decorate([
    core_1.Component({
        selector: 'company-component',
        templateUrl: './app/components/company/company-page.html',
        providers: [
            services_1.SweetAlertService,
            services_1.ToastrService,
            company_service_1.CompanyService
        ]
    }),
    __metadata("design:paramtypes", [services_1.SweetAlertService,
        services_1.ToastrService,
        company_service_1.CompanyService])
], CompanyComponent);
exports.CompanyComponent = CompanyComponent;
//# sourceMappingURL=company.component.js.map