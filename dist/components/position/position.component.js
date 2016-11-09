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
var position_service_1 = require('./position.service');
var module_service_1 = require('../module/module.service');
var services_1 = require('../../shared-services/services');
var model_1 = require('../../models/model');
var PositionComponent = (function () {
    function PositionComponent(positionService, moduleService, swal, toastr) {
        this.positionService = positionService;
        this.moduleService = moduleService;
        this.swal = swal;
        this.toastr = toastr;
        this.operation = 0;
        this.moduleSelector = false;
        this.addingPosition = false;
        this.updatingPosition = false;
        this.deletingPosition = false;
    }
    PositionComponent.prototype.ngOnInit = function () {
        this.modal = new model_1.Modal("#mdlModalInfo");
        this.getAllModules();
        this.getAllPositions();
    };
    PositionComponent.prototype.getAllModules = function () {
        var _this = this;
        this.modules = [];
        this.loadingModules = true;
        this.isFormDisabled = true;
        this.moduleService.getAll().then(function (result) {
            _this.loadingModules = false;
            _this.isFormDisabled = false;
            if (result.success) {
                _this.modules = result.data;
                _this.toastr.success(result.message);
                return;
            }
            _this.toastr.error(result.message);
        })
            .catch(function (error) {
            _this.loadingModules = false;
            _this.isFormDisabled = false;
        });
    };
    PositionComponent.prototype.getAllPositions = function () {
        var _this = this;
        this.positions = [];
        this.loadingPositions = true;
        this.isFormDisabled = true;
        this.positionService.getAll().then(function (result) {
            _this.loadingPositions = false;
            _this.isFormDisabled = false;
            if (result.success) {
                _this.positions = result.data;
                _this.toastr.success(result.message);
                return;
            }
            _this.toastr.error(result.message);
        })
            .catch(function (error) {
            _this.loadingPositions = false;
            _this.isFormDisabled = false;
            _this.toastr.error(error);
        });
    };
    PositionComponent.prototype.add = function () {
        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedPosition = new model_1.Position();
    };
    PositionComponent.prototype.confirmAdd = function () {
        if (!this.selectedPosition.positionName.trim()) {
            this.toastr.warn("Please provide a position name.");
            return;
        }
        this.selectedPosition.modules = [];
        for (var i = 0; i < this.modules.length; i++) {
            if (this.modules[i].selected)
                this.selectedPosition.modules.push(this.modules[i]);
        }
        if (this.selectedPosition.modules.length <= 0) {
            this.toastr.warn("Please select atleast one(1) module.");
            return;
        }
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be adding a new position.",
            confirmButtonText: "Yes, Add",
            callBack: function (isConfirm) {
            }
        });
    };
    PositionComponent.prototype.addPosition = function () {
        var _this = this;
        try {
            this.addingPosition = true;
            this.isFormDisabled = true;
            this.positionService.addPosition(this.selectedPosition).then(function (result) {
                _this.addingPosition = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.modal.hide();
                    _this.toastr.success(result.message);
                    _this.getAllPositions();
                    _this.getAllModules();
                    _this.toggleModuleSelection(false);
                    return;
                }
                _this.toastr.error(result.message);
            })
                .catch(function (error) {
                _this.addingPosition = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error.toString());
            });
        }
        catch (e) {
            this.addingPosition = false;
            this.isFormDisabled = false;
            this.toastr.error((e || e.message).toString());
        }
    };
    PositionComponent.prototype.toggleModuleSelection = function (val) {
        for (var i = 0; i < this.modules.length; i++) {
            this.modules[i].selected = val;
        }
    };
    PositionComponent = __decorate([
        core_1.Component({
            selector: 'position-component',
            templateUrl: './app/components/position/position-page.html',
            providers: [
                position_service_1.PositionService,
                module_service_1.ModuleService,
                services_1.SweetAlertService,
                services_1.ToastrService
            ]
        }), 
        __metadata('design:paramtypes', [position_service_1.PositionService, module_service_1.ModuleService, services_1.SweetAlertService, services_1.ToastrService])
    ], PositionComponent);
    return PositionComponent;
}());
exports.PositionComponent = PositionComponent;
//# sourceMappingURL=position.component.js.map