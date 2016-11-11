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
var position_service_1 = require('../position/position.service');
var user_service_1 = require('./user.service');
var services_1 = require('../../shared-services/services');
var model_1 = require('../../models/model');
var UserComponent = (function () {
    function UserComponent(userService, positionService, swal, toastr) {
        this.userService = userService;
        this.positionService = positionService;
        this.swal = swal;
        this.toastr = toastr;
        this.positions = [];
        this.users = [];
        this.operation = 0;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.modal = new model_1.Modal("#mdlModalInfo");
        this.getAllUsers();
        this.getAllPositions();
    };
    UserComponent.prototype.getAllUsers = function () {
        var _this = this;
        try {
            this.users = [];
            this.loadingUsers = true;
            this.isFormDisabled = true;
            this.userService.getAll().then(function (result) {
                _this.loadingUsers = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.users = result.data;
                    _this.toastr.success(result.message);
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingUsers = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.loadingUsers = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    UserComponent.prototype.getAllPositions = function () {
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
                    _this.toastr.success(result.message);
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingPositions = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.loadingPositions = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    UserComponent.prototype.add = function () {
        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedUser = new model_1.User();
        this.selectedUser.position = new model_1.Position();
        this.selectedUser.position._id = this.positions[0]._id;
    };
    UserComponent.prototype.confirmAdd = function () {
        // todo
    };
    UserComponent.prototype.addUser = function () {
        // todo
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'user-component',
            templateUrl: './app/components/user/user-page.html',
            providers: [
                user_service_1.UserService,
                position_service_1.PositionService,
                services_1.SweetAlertService,
                services_1.ToastrService
            ]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, position_service_1.PositionService, services_1.SweetAlertService, services_1.ToastrService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map