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
var PositionComponent = (function () {
    function PositionComponent(positionService, moduleService, swal, toastr) {
        this.positionService = positionService;
        this.moduleService = moduleService;
        this.swal = swal;
        this.toastr = toastr;
    }
    PositionComponent.prototype.ngOnInit = function () {
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