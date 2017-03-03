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
var helpers_1 = require("../../helpers/helpers");
var models_1 = require("../../models/models");
var PositionComponent = (function () {
    function PositionComponent(positionService, moduleService, swal, toast) {
        this.positionService = positionService;
        this.moduleService = moduleService;
        this.swal = swal;
        this.toast = toast;
        this.operation = 0;
        this.moduleSelector = false;
        this.addingPosition = false;
        this.updatingPosition = false;
        this.deletingPosition = false;
    }
    PositionComponent.prototype.ngOnInit = function () {
        this.modal = new models_1.Modal("#mdlModalInfo");
        this.getAllModules();
        this.getAllPositions();
    };
    PositionComponent.prototype.getAllModules = function () {
        var _this = this;
        try {
            this.modules = [];
            this.loadingModules = true;
            this.isFormDisabled = true;
            this.moduleService.getAll().then(function (result) {
                _this.loadingModules = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.modules = result.data;
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingModules = false;
                _this.isFormDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.loadingModules = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    };
    PositionComponent.prototype.getAllPositions = function () {
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
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingPositions = false;
                _this.isFormDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.loadingPositions = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    };
    PositionComponent.prototype.checkModules = function () {
        for (var i = 0; i < this.selectedPosition.modules.length; i++) {
            for (var j = 0; j < this.modules.length; j++) {
                if (this.selectedPosition.modules[i]._id === this.modules[j]._id) {
                    this.modules[j].selected = true;
                }
            }
        }
    };
    PositionComponent.prototype.view = function (position) {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedPosition = position;
        this.toggleModuleSelection(false);
        this.checkModules();
    };
    PositionComponent.prototype.add = function () {
        this.operation = 1;
        this.isFormDisabled = false;
        this.moduleSelector = false;
        this.toggleModuleSelection(false);
        this.selectedPosition = new models_1.Position();
    };
    PositionComponent.prototype.edit = function () {
        this.operation = 2;
        this.isFormDisabled = false;
        this.moduleSelector = false;
        this.originalPositionInfo = Object.assign({}, this.selectedPosition);
    };
    PositionComponent.prototype.cancelEdit = function () {
        this.selectedPosition = Object.assign({}, this.originalPositionInfo);
        this.view(this.selectedPosition);
    };
    PositionComponent.prototype.validPosition = function (position) {
        if (!this.selectedPosition.positionName.trim()) {
            this.toast.warn("Please provide a position name.");
            return false;
        }
        this.selectedPosition.modules = [];
        for (var i = 0; i < this.modules.length; i++) {
            if (this.modules[i].selected)
                this.selectedPosition.modules.push(this.modules[i]);
        }
        if (this.selectedPosition.modules.length <= 0) {
            this.toast.warn("Please select atleast one(1) module.");
            return false;
        }
        return true;
    };
    PositionComponent.prototype.confirmUpdate = function () {
        var _this = this;
        this.selectedPosition.modules = [];
        if (!this.validPosition(this.selectedPosition))
            return;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this position",
            confirmButtonText: "Yes, Update It",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.updatePosition();
                }
            }
        });
    };
    PositionComponent.prototype.updatePosition = function () {
        var _this = this;
        try {
            this.updatingPosition = true;
            this.isFormDisabled = true;
            this.positionService.updatePosition(this.selectedPosition).then(function (result) {
                _this.updatingPosition = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.toast.success(result.message);
                    _this.getAllPositions();
                    _this.getAllModules();
                    _this.modal.hide();
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.updatingPosition = false;
                _this.isFormDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.updatingPosition = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    };
    PositionComponent.prototype.confirmAdd = function () {
        var _this = this;
        this.selectedPosition.modules = [];
        if (!this.validPosition(this.selectedPosition))
            return;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding a new position",
            confirmButtonText: "Yes, Add It",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.addPosition();
                }
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
                    _this.toast.success(result.message);
                    _this.getAllPositions();
                    _this.getAllModules();
                    _this.toggleModuleSelection(false);
                    _this.selectedPosition = new models_1.Position();
                    return;
                }
                _this.toast.error(result.message);
            })
                .catch(function (error) {
                _this.addingPosition = false;
                _this.isFormDisabled = false;
                _this.toast.error(error.toString());
            });
        }
        catch (e) {
            this.addingPosition = false;
            this.isFormDisabled = false;
            this.toast.error((e || e.message).toString());
        }
    };
    PositionComponent.prototype.confirmDelete = function (position) {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this position",
            confirmButtonText: "Yes, Delete It",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.delete(position);
                }
            }
        });
    };
    PositionComponent.prototype.delete = function (position) {
        var _this = this;
        try {
            this.deletingPosition = true;
            this.isFormDisabled = true;
            this.positionService.deletePosition(position).then(function (result) {
                _this.deletingPosition = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.toast.success(result.message);
                    _this.getAllPositions();
                    _this.getAllModules();
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.deletingPosition = false;
                _this.isFormDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.deletingPosition = false;
            this.isFormDisabled = false;
        }
    };
    PositionComponent.prototype.toggleModuleSelection = function (val) {
        for (var i = 0; i < this.modules.length; i++) {
            this.modules[i].selected = val;
        }
    };
    return PositionComponent;
}());
PositionComponent = __decorate([
    core_1.Component({
        selector: 'position-component',
        templateUrl: './app/components/position/position.page.html',
        providers: [
            services_1.PositionService,
            services_1.ModuleService,
            helpers_1.SwalHelper,
            helpers_1.ToastHelper
        ]
    }),
    __metadata("design:paramtypes", [services_1.PositionService,
        services_1.ModuleService,
        helpers_1.SwalHelper,
        helpers_1.ToastHelper])
], PositionComponent);
exports.PositionComponent = PositionComponent;
//# sourceMappingURL=position.component.js.map