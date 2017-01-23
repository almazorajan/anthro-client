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
// @angular
var core_1 = require("@angular/core");
// classes
var model_1 = require("../../models/model");
// services
var module_service_1 = require("./module.service");
var services_1 = require("../../shared-services/services");
var ModuleComponent = (function () {
    function ModuleComponent(moduleService, swal, toastr) {
        this.moduleService = moduleService;
        this.swal = swal;
        this.toastr = toastr;
        this.loading = false;
        this.updatingModule = false;
        this.addingModule = false;
        this.deletingModule = false;
        this.modules = [];
        this.isFormDisabled = true;
        this.operation = 0; // 0 view, 1 add, 2 edit
    }
    ModuleComponent.prototype.ngOnInit = function () {
        this.mdlModalInfo = new model_1.Modal("#mdlModalInfo");
        this.getGroups();
        this.getAllModules();
    };
    ModuleComponent.prototype.getAllModules = function () {
        var _this = this;
        this.loading = true;
        this.modules = [];
        this.moduleService.getAll().then(function (result) {
            _this.loading = false;
            if (result.success) {
                _this.modules = result.data;
                _this.toastr.success(result.message);
                return;
            }
            _this.toastr.error(result.message);
        })
            .catch(function (error) {
            _this.loading = false;
            _this.toastr.error(error);
        });
    };
    ModuleComponent.prototype.getGroups = function () {
        this.groups = this.moduleService.getGroups();
    };
    ModuleComponent.prototype.add = function () {
        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedModule = new model_1.Module();
    };
    ModuleComponent.prototype.view = function (mod) {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedModule = mod;
    };
    ModuleComponent.prototype.edit = function () {
        this.operation = 2;
        this.isFormDisabled = false;
        this.originalData = this.selectedModule;
    };
    ModuleComponent.prototype.cancelEdit = function () {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedModule = this.originalData;
        this.originalData = null;
    };
    ModuleComponent.prototype.confirmAdd = function () {
        var _this = this;
        if (!this.selectedModule.moduleName.trim() && !this.selectedModule.link.trim()) {
            this.toastr.warn("Please provide all the required fields.");
            return;
        }
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be adding this module.",
            confirmButtonText: "Yes, update it!",
            callBack: function (isConfirm) {
                if (isConfirm)
                    _this.addModule();
            }
        });
    };
    ModuleComponent.prototype.addModule = function () {
        var _this = this;
        this.addingModule = true;
        this.isFormDisabled = true;
        this.moduleService.addModule(this.selectedModule).then(function (result) {
            _this.addingModule = false;
            _this.isFormDisabled = false;
            if (result.success) {
                _this.toastr.success(result.message);
                _this.mdlModalInfo.hide();
                _this.getAllModules();
                return;
            }
            _this.toastr.error(result.message);
        })
            .catch(function (error) {
            _this.addingModule = false;
            _this.isFormDisabled = false;
        });
    };
    ModuleComponent.prototype.confirmUpdate = function () {
        var _this = this;
        if (!this.selectedModule.moduleName.trim() && !this.selectedModule.link.trim()) {
            this.toastr.warn("Please provide all the required fields.");
            return;
        }
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be updating this module.",
            confirmButtonText: "Yes, update it!",
            callBack: function (isConfirm) {
                if (isConfirm)
                    _this.update();
            }
        });
    };
    ModuleComponent.prototype.update = function () {
        var _this = this;
        this.isFormDisabled = true;
        this.updatingModule = true;
        this.moduleService.updateModule(this.selectedModule).then(function (result) {
            _this.isFormDisabled = false;
            _this.updatingModule = false;
            _this.mdlModalInfo.hide();
            if (result.success) {
                _this.toastr.success(result.message);
                _this.getAllModules();
                return;
            }
            _this.toastr.error(result.message);
        })
            .catch(function (error) {
            _this.isFormDisabled = false;
            _this.updatingModule = false;
        });
    };
    ModuleComponent.prototype.confirmDelete = function (mod) {
        var _this = this;
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be deleting this module.",
            confirmButtonText: "Yes, delete it!",
            callBack: function (isConfirm) {
                if (isConfirm)
                    _this.delete(mod);
            }
        });
    };
    ModuleComponent.prototype.delete = function (mod) {
        var _this = this;
        this.isFormDisabled = true;
        this.deletingModule = true;
        this.moduleService.deleteModule(mod).then(function (result) {
            _this.isFormDisabled = false;
            _this.deletingModule = false;
            if (result.success) {
                _this.toastr.success(result.message);
                _this.getAllModules();
                return;
            }
            _this.toastr.error(result.message);
        })
            .catch(function (error) {
            _this.isFormDisabled = false;
            _this.deletingModule = false;
            _this.toastr.error(error);
        });
    };
    return ModuleComponent;
}());
ModuleComponent = __decorate([
    core_1.Component({
        selector: 'module-component',
        templateUrl: './app/components/module/module-page.html',
        providers: [
            module_service_1.ModuleService,
            services_1.SweetAlertService,
            services_1.ToastrService
        ]
    }),
    __metadata("design:paramtypes", [module_service_1.ModuleService,
        services_1.SweetAlertService,
        services_1.ToastrService])
], ModuleComponent);
exports.ModuleComponent = ModuleComponent;
//# sourceMappingURL=module.component.js.map