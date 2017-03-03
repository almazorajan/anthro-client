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
var services_1 = require("../../services/services");
var services_2 = require("../../shared-services/services");
var model_1 = require("../../models/model");
var EmploymentStatusComponent = (function () {
    function EmploymentStatusComponent(swal, toastr, employmentStatusService) {
        this.swal = swal;
        this.toastr = toastr;
        this.employmentStatusService = employmentStatusService;
    }
    EmploymentStatusComponent.prototype.ngOnInit = function () {
        this.modal = new model_1.Modal("#mdlModalInfo");
        this.getAll();
    };
    EmploymentStatusComponent.prototype.getAll = function () {
        var _this = this;
        try {
            this.employmentStatuses = [];
            this.loadingEmploymentStatus = true;
            this.isFormDisabled = true;
            this.employmentStatusService.getAll().then(function (result) {
                _this.loadingEmploymentStatus = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.employmentStatuses = result.data;
                    _this.disableEmploymentStatuses(true);
                    _this.toggleAllEditMode(false);
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingEmploymentStatus = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.loadingEmploymentStatus = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    EmploymentStatusComponent.prototype.disableEmploymentStatuses = function (val) {
        for (var i = 0; i < this.employmentStatuses.length; i++) {
            this.employmentStatuses[i].disabled = val;
        }
    };
    EmploymentStatusComponent.prototype.toggleAllEditMode = function (val) {
        for (var i = 0; i < this.employmentStatuses.length; i++) {
            this.employmentStatuses[i].editMode = val;
        }
    };
    EmploymentStatusComponent.prototype.add = function () {
        this.isFormDisabled = false;
        this.selectedEmploymentStatus = new model_1.EmploymentStatus();
    };
    EmploymentStatusComponent.prototype.edit = function (employmentStatus) {
        employmentStatus.originalInfo = Object.assign({}, employmentStatus);
        employmentStatus.editMode = true;
        employmentStatus.disabled = false;
    };
    EmploymentStatusComponent.prototype.cancelEdit = function (employmentStatus) {
        employmentStatus.employmentStatus = employmentStatus.originalInfo.employmentStatus;
        employmentStatus.editMode = false;
        employmentStatus.disabled = true;
    };
    EmploymentStatusComponent.prototype.confirmAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this employment status",
            confirmButtonText: "Yes, Add It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.addEmploymentStatus();
                }
            }
        });
    };
    EmploymentStatusComponent.prototype.addEmploymentStatus = function () {
        var _this = this;
        try {
            this.isFormDisabled = true;
            this.addingEmploymentStatus = true;
            this.employmentStatusService.addEmploymentStatus(this.selectedEmploymentStatus).then(function (result) {
                _this.isFormDisabled = false;
                _this.addingEmploymentStatus = false;
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
                _this.isFormDisabled = false;
                _this.addingEmploymentStatus = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.isFormDisabled = false;
            this.addingEmploymentStatus = false;
            this.toastr.error(e);
        }
    };
    EmploymentStatusComponent.prototype.confirmSave = function (employmentStatus) {
        var _this = this;
        if (!employmentStatus.employmentStatus.trim()) {
            this.toastr.warn("Please provide an employment status.");
            return;
        }
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be updating this employment status.",
            confirmButtonText: "Yes, Update It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.updateEmploymentStatus(employmentStatus);
                }
            }
        });
    };
    EmploymentStatusComponent.prototype.updateEmploymentStatus = function (employmentStatus) {
        var _this = this;
        try {
            this.updatingEmploymentStatus = true;
            this.isFormDisabled = true;
            this.employmentStatusService.updateEmploymentStatus(employmentStatus).then(function (result) {
                _this.updatingEmploymentStatus = false;
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
                _this.updatingEmploymentStatus = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.updatingEmploymentStatus = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    EmploymentStatusComponent.prototype.confirmDelete = function (employmentStatus) {
        var _this = this;
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be deleting this employment status.",
            confirmButtonText: "Yes, Delete It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.deleteEmploymentStatus(employmentStatus);
                }
            }
        });
    };
    EmploymentStatusComponent.prototype.deleteEmploymentStatus = function (employmentStatus) {
        var _this = this;
        try {
            this.deletingEmploymentStatus = true;
            this.isFormDisabled = true;
            this.employmentStatusService.deletEmploymentStatus(employmentStatus).then(function (result) {
                _this.deletingEmploymentStatus = false;
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
                _this.deletingEmploymentStatus = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.deletingEmploymentStatus = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    return EmploymentStatusComponent;
}());
EmploymentStatusComponent = __decorate([
    core_1.Component({
        selector: 'employment-status-component',
        templateUrl: './app/components/employment-status/employment-status-page.html',
        providers: [
            services_2.SweetAlertService,
            services_2.ToastrService,
            services_1.EmploymentStatusService
        ]
    }),
    __metadata("design:paramtypes", [services_2.SweetAlertService,
        services_2.ToastrService,
        services_1.EmploymentStatusService])
], EmploymentStatusComponent);
exports.EmploymentStatusComponent = EmploymentStatusComponent;
//# sourceMappingURL=employment-status.component.js.map