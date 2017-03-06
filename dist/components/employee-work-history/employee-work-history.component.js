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
var EmployeeWorkHistoryComponent = (function () {
    function EmployeeWorkHistoryComponent(swal, toast, employmentStatusService) {
        this.swal = swal;
        this.toast = toast;
        this.employmentStatusService = employmentStatusService;
        this.loadingEmploymentStatuses = false;
    }
    EmployeeWorkHistoryComponent.prototype.ngOnInit = function () {
        this.workHistoryModal = new models_1.Modal("#mdlWorkHistory");
        this.getAllEmploymentStatus();
    };
    EmployeeWorkHistoryComponent.prototype.getAllEmploymentStatus = function () {
        var _this = this;
        this.isWorkHistoryFormDisabled = true;
        this.employmentStatuses = [];
        this.employmentStatusService.getAll().then(function (result) {
            _this.isWorkHistoryFormDisabled = false;
            if (result.success) {
                _this.employmentStatuses = result.data;
            }
            else {
                _this.toast.error(result.message);
            }
        }).catch(function (e) {
            _this.isWorkHistoryFormDisabled = false;
            _this.toast.error(e || e.message);
        });
    };
    EmployeeWorkHistoryComponent.prototype.copyWorkHistory = function (workHistory) {
        return JSON.parse(JSON.stringify(workHistory));
    };
    EmployeeWorkHistoryComponent.prototype.appendWorkHistory = function () {
        this.employee.workHistory.unshift(this.copyWorkHistory(this.workHistory));
        this.workHistoryModal.hide();
    };
    EmployeeWorkHistoryComponent.prototype.cancelEditWorkHistory = function () {
        this.workHistory = this.copyWorkHistory(this.originalWorkHistory);
        this.originalWorkHistory = null;
        this.workHistoryModal.hide();
    };
    EmployeeWorkHistoryComponent.prototype.updateWorkHistory = function () {
        this.employee.workHistory[this.currentIndex] = this.copyWorkHistory(this.workHistory);
        this.originalWorkHistory = null;
        this.workHistoryModal.hide();
    };
    EmployeeWorkHistoryComponent.prototype.cancelUpdateWorkHistory = function () {
        this.workHistory = this.copyWorkHistory(this.originalWorkHistory);
        this.originalWorkHistory = null;
        this.workHistoryModal.hide();
    };
    EmployeeWorkHistoryComponent.prototype.parseDate = function (dateString) {
        if (dateString) {
            return new Date(dateString);
        }
        return null;
    };
    EmployeeWorkHistoryComponent.prototype.resolveEmploymentStatus = function (workHistory) {
        if (workHistory) {
            if (workHistory.employmentStatus) {
                for (var key in this.employmentStatuses) {
                    var employmentStatus = this.employmentStatuses[key];
                    if (workHistory.employmentStatus._id === employmentStatus._id) {
                        return workHistory.employmentStatus.employmentStatus;
                    }
                }
            }
        }
        return "Employment Status unidentified";
    };
    EmployeeWorkHistoryComponent.prototype.addWorkHistory = function () {
        this.workHistoryOperation = 2;
        this.isWorkHistoryFormDisabled = false;
        this.workHistory = new models_1.WorkHistory();
        this.workHistoryModal.show();
    };
    EmployeeWorkHistoryComponent.prototype.editWorkHistory = function (workHistory, index) {
        this.workHistoryOperation = 1;
        this.isWorkHistoryFormDisabled = false;
        this.currentIndex = index;
        this.workHistory = this.copyWorkHistory(this.workHistory);
        this.originalWorkHistory = this.copyWorkHistory(this.workHistory);
        this.workHistoryModal.show();
    };
    EmployeeWorkHistoryComponent.prototype.confirmAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this work history information",
            confirmButtonText: "Yes, Add It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.appendWorkHistory();
                }
            }
        });
    };
    EmployeeWorkHistoryComponent.prototype.confirmUpdateWorkHistory = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this work history information",
            confirmButtonText: "Yes, Update It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.updateWorkHistory();
                }
            }
        });
    };
    EmployeeWorkHistoryComponent.prototype.confirmCancelUpdate = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this work history information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.cancelUpdateWorkHistory();
                }
            }
        });
    };
    EmployeeWorkHistoryComponent.prototype.confirmCancelAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this work history information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.appendWorkHistory();
                }
            }
        });
    };
    EmployeeWorkHistoryComponent.prototype.confirmCancelEdit = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this work history information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.cancelEditWorkHistory();
                }
            }
        });
    };
    return EmployeeWorkHistoryComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Employee)
], EmployeeWorkHistoryComponent.prototype, "employee", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EmployeeWorkHistoryComponent.prototype, "operation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeeWorkHistoryComponent.prototype, "isFormDisabled", void 0);
EmployeeWorkHistoryComponent = __decorate([
    core_1.Component({
        selector: 'employee-work-history-component',
        templateUrl: './app/components/employee-work-history/employee-work-history.page.html',
        providers: [
            helpers_1.SwalHelper,
            helpers_1.ToastHelper,
            services_1.EmploymentStatusService
        ]
    }),
    __metadata("design:paramtypes", [helpers_1.SwalHelper,
        helpers_1.ToastHelper,
        services_1.EmploymentStatusService])
], EmployeeWorkHistoryComponent);
exports.EmployeeWorkHistoryComponent = EmployeeWorkHistoryComponent;
//# sourceMappingURL=employee-work-history.component.js.map