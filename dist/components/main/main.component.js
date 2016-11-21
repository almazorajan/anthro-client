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
var router_1 = require('@angular/router');
var services_1 = require('../../shared-services/services');
var position_service_1 = require('../position/position.service');
var user_service_1 = require('../user/user.service');
var model_1 = require('../../models/model');
var MainComponent = (function () {
    function MainComponent(swal, toastr, localStorage, positionService, userService, router) {
        this.swal = swal;
        this.toastr = toastr;
        this.localStorage = localStorage;
        this.positionService = positionService;
        this.userService = userService;
        this.router = router;
    }
    MainComponent.prototype.ngOnInit = function () {
        try {
            this.session = new model_1.Session();
            this.session = this.localStorage.get("anthro.user-session");
            this.currentUser = Object.assign({}, this.session.user);
            // check if there is a session.
            if (!this.session) {
                this.toastr.error("No session detected. Proceeding to logout.");
                this.redirectToLogin();
                return;
            }
            // check the current route is valid.
            this.validRoute = this.isValidRoute(this.session);
            if (!this.validRoute) {
                this.toastr.error("The page you are looking for is either inaccessible or does not exist.");
                this.redirectToLogin();
                return;
            }
            this.formatAvailableModules(this.session);
            this.getPositions();
            this.readyGreetings();
            this.modal = new model_1.Modal("#mdlUserProfile");
        }
        catch (e) {
            this.toastr.error(e);
            this.redirectToLogin();
        }
    };
    MainComponent.prototype.redirectToLogin = function () {
        this.router.navigate(["/login"]);
    };
    MainComponent.prototype.formatAvailableModules = function (session) {
        var _this = this;
        this.navigation = new model_1.Navigation();
        this.navigation.withGroup = [];
        this.navigation.withoutGroup = [];
        session.user.position.modules.forEach(function (mod) {
            if (mod.group) {
                var isGroupExists = false;
                for (var i = 0; i < _this.navigation.withGroup.length; i++) {
                    if (_this.navigation.withGroup[i].group === mod.group) {
                        _this.navigation.withGroup[i].modules.push(mod);
                        isGroupExists = true;
                    }
                }
                if (!isGroupExists) {
                    var wgroup = new model_1.NavigationGroup();
                    wgroup.group = mod.group;
                    wgroup.modules = [];
                    wgroup.modules.push(mod);
                    _this.navigation.withGroup.push(wgroup);
                }
            }
            else {
                _this.navigation.withoutGroup.push(mod);
            }
        });
    };
    MainComponent.prototype.isValidRoute = function (session) {
        for (var i = 0; i < session.user.position.modules.length; i++) {
            if (session.user.position.modules[i].link === this.router.url) {
                return true;
            }
        }
        return false;
    };
    MainComponent.prototype.readyGreetings = function () {
        this.greetings = "Hi " + this.session.user.firstName;
    };
    MainComponent.prototype.getPositions = function () {
        var _this = this;
        try {
            this.positions = [];
            this.loadingPositions = true;
            this.userProfileDisabled = true;
            this.positionService.getAll().then(function (result) {
                _this.loadingPositions = false;
                _this.userProfileDisabled = false;
                if (result.success) {
                    _this.positions = result.data;
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingPositions = false;
                _this.userProfileDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.loadingPositions = false;
            this.userProfileDisabled = false;
            this.toastr.error(e);
        }
    };
    MainComponent.prototype.updateUser = function () {
        var _this = this;
        try {
            this.updatingUserProfile = true;
            this.userProfileDisabled = true;
            this.userService.update(this.currentUser).then(function (result) {
                _this.updatingUserProfile = false;
                _this.userProfileDisabled = false;
                if (result.success) {
                    _this.modal.hide();
                    _this.toastr.success(result.message);
                    _this.toastr.info("Please re-login to continue.");
                    _this.redirectToLogin();
                }
                else {
                    _this.toastr.error(result.message);
                }
            })
                .catch(function (error) {
                _this.updatingUserProfile = false;
                _this.userProfileDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.updatingUserProfile = false;
            this.userProfileDisabled = false;
            this.toastr.error(e);
        }
    };
    MainComponent.prototype.viewProfile = function () {
        this.originalUser = Object.assign({}, this.currentUser);
    };
    MainComponent.prototype.cancelEdit = function () {
        this.modal.hide();
        this.currentUser = Object.assign({}, this.originalUser);
        this.originalUser = null;
    };
    MainComponent.prototype.confirmUpdate = function () {
        var _this = this;
        this.swal.confirm({
            title: "Are You Sure?",
            message: "you will be updating your user information",
            confirmButtonText: "Yes, Update it",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.updateUser();
                }
            }
        });
    };
    MainComponent.prototype.signOut = function () {
        this.localStorage.remove("anthro.user-session");
        this.redirectToLogin();
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main-component',
            templateUrl: './app/components/main/main-page.html',
            providers: [
                services_1.SweetAlertService,
                services_1.ToastrService,
                services_1.LocalStorageService,
                position_service_1.PositionService,
                user_service_1.UserService
            ]
        }), 
        __metadata('design:paramtypes', [services_1.SweetAlertService, services_1.ToastrService, services_1.LocalStorageService, position_service_1.PositionService, user_service_1.UserService, router_1.Router])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map