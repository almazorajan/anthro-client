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
/*
* user component v1
**/
var core_1 = require("@angular/core");
var position_service_1 = require("../position/position.service");
var user_service_1 = require("./user.service");
var services_1 = require("../../shared-services/services");
var model_1 = require("../../models/model");
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
        this.search = new model_1.Search();
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
        this.selectedUser.position.positionName = this.positions[0].positionName;
    };
    UserComponent.prototype.identifyPositionName = function (position) {
        for (var i = 0; i < this.positions.length; i++) {
            if (this.positions[i]._id === position._id)
                return this.positions[i].positionName;
        }
        return "";
    };
    UserComponent.prototype.confirmAdd = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this user",
            confirmButtonText: "Yes, Add It",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.addUser();
                }
            }
        });
    };
    UserComponent.prototype.addUser = function () {
        var _this = this;
        try {
            this.addingUser = true;
            this.isFormDisabled = true;
            this.selectedUser.position.positionName = this.identifyPositionName(this.selectedUser.position);
            this.userService.add(this.selectedUser).then(function (result) {
                _this.addingUser = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.toastr.success(result.message);
                    _this.getAllUsers();
                    _this.getAllPositions();
                    _this.modal.hide();
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.addingUser = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.addingUser = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    UserComponent.prototype.view = function (user) {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedUser = user;
        if (!this.selectedUser.position) {
            this.selectedUser.position = this.positions[0];
        }
        else {
            this.selectedUser.position.positionName = this.identifyPositionName(this.selectedUser.position);
        }
    };
    UserComponent.prototype.edit = function () {
        this.operation = 2;
        this.isFormDisabled = false;
        this.originalUserInfo = Object.assign({}, this.selectedUser);
    };
    UserComponent.prototype.cancelEdit = function () {
        this.selectedUser = Object.assign({}, this.originalUserInfo);
        this.selectedUser.position.positionName = this.identifyPositionName(this.selectedUser.position);
        this.view(this.selectedUser);
    };
    UserComponent.prototype.confirmUpdate = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this user",
            confirmButtonText: "Yes, Update It",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.updateUser();
                }
            }
        });
    };
    UserComponent.prototype.updateUser = function () {
        var _this = this;
        try {
            this.updatingUser = true;
            this.isFormDisabled = true;
            this.userService.update(this.selectedUser).then(function (result) {
                _this.updatingUser = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.toastr.success(result.message);
                    _this.getAllUsers();
                    _this.getAllPositions();
                    _this.modal.hide();
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.updatingUser = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.updatingUser = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    UserComponent.prototype.confirmDelete = function (user) {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this user",
            confirmButtonText: "Yes, Delete It",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.deleteUser(user);
                }
            }
        });
    };
    UserComponent.prototype.deleteUser = function (user) {
        var _this = this;
        try {
            this.deletingUser = true;
            this.isFormDisabled = true;
            this.userService.delete(user).then(function (result) {
                _this.deletingUser = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.toastr.success(result.message);
                    _this.getAllUsers();
                    _this.getAllPositions();
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.deletingUser = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.deletingUser = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    return UserComponent;
}());
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
    __metadata("design:paramtypes", [user_service_1.UserService,
        position_service_1.PositionService,
        services_1.SweetAlertService,
        services_1.ToastrService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map