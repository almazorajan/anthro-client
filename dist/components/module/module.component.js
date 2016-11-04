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
var core_1 = require('@angular/core');
var module_service_1 = require('./module.service');
var services_1 = require('../../shared-services/services');
var model_1 = require('../../models/model');
var ModuleComponent = (function () {
    function ModuleComponent(moduleService, swal, toastr) {
        this.moduleService = moduleService;
        this.swal = swal;
        this.toastr = toastr;
        this.loading = false;
        this.modules = [];
        this.isFormDisabled = true;
        this.operation = 0; // 0 view, 1 add, 2 edit
    }
    ModuleComponent.prototype.ngOnInit = function () {
        this.getGroups();
        this.getAllModules();
    };
    ModuleComponent.prototype.getAllModules = function () {
        var _this = this;
        this.loading = true;
        this.moduleService.getAll().then(function (result) {
            _this.modules = result.data;
            _this.loading = false;
            _this.toastr.success("Successfully loaded all modules");
        })
            .catch(function (error) {
            _this.loading = false;
            _this.toastr.error(error);
        });
    };
    ModuleComponent.prototype.getGroups = function () {
        this.groups = this.moduleService.getGroups();
    };
    ModuleComponent.prototype.view = function (mod) {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedModule = mod;
    };
    ModuleComponent.prototype.add = function () {
        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedModule = new model_1.Module();
    };
    ModuleComponent.prototype.edit = function () {
        this.operation = 2;
        this.isFormDisabled = false;
        this.originalData = Object.assign({}, this.selectedModule);
    };
    ModuleComponent.prototype.cancelEdit = function () {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedModule = Object.assign({}, this.originalData);
        this.originalData = null;
    };
    ModuleComponent.prototype.confirmUpdate = function () {
        this.swal.confirm("Are you sure?", "You will be updating the selected module", function (isConfirm) {
        });
    };
    ModuleComponent.prototype.confirmDelete = function (mod) {
        this.swal.confirm("Are you sure?", "You will be deleting the selected module", function (isConfirm) {
        });
    };
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
        __metadata('design:paramtypes', [module_service_1.ModuleService, services_1.SweetAlertService, services_1.ToastrService])
    ], ModuleComponent);
    return ModuleComponent;
}());
exports.ModuleComponent = ModuleComponent;
//# sourceMappingURL=module.component.js.map