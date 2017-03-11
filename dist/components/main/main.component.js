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
var router_1 = require("@angular/router");
var helpers_1 = require("../../helpers/helpers");
var services_1 = require("../../services/services");
var models_1 = require("../../models/models");
var MainComponent = (function () {
    function MainComponent(swal, toast, localStorage, positionService, userService, router) {
        this.swal = swal;
        this.toast = toast;
        this.localStorage = localStorage;
        this.positionService = positionService;
        this.userService = userService;
        this.router = router;
    }
    MainComponent.prototype.ngOnInit = function () {
        try {
            document.title = "Ad-haven";
            this.session = new models_1.Session();
            this.session = this.localStorage.get("anthro.user-session");
            this.currentUser = Object.assign({}, this.session.user);
            // check if there is a session.
            if (!this.session) {
                this.toast.error("No session detected. Proceeding to logout.");
                this.redirectToLogin();
                return;
            }
            // check the current route is valid.
            this.validRoute = this.isValidRoute(this.session);
            if (!this.validRoute) {
                this.toast.error("The page you are looking for is either inaccessible or does not exist.");
                this.redirectToLogin();
                return;
            }
            this.formatAvailableModules(this.session);
            this.getPositions();
            this.readyGreetings();
            this.userProfileModal = new models_1.Modal("#mdlUserProfile");
            this.userPasswordModal = new models_1.Modal("#mdlUserPassword");
        }
        catch (e) {
            this.toast.error(e);
            this.redirectToLogin();
        }
    };
    MainComponent.prototype.redirectToLogin = function () {
        this.router.navigate(["/login"]);
    };
    MainComponent.prototype.formatAvailableModules = function (session) {
        var _this = this;
        this.navigation = new models_1.Navigation();
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
                    var wgroup = new models_1.NavigationGroup();
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
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.loadingPositions = false;
                _this.userProfileDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.loadingPositions = false;
            this.userProfileDisabled = false;
            this.toast.error(e);
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
                    _this.userProfileModal.hide();
                    _this.toast.success(result.message);
                    _this.toast.info("Please re-login to continue.");
                    _this.redirectToLogin();
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.updatingUserProfile = false;
                _this.userProfileDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.updatingUserProfile = false;
            this.userProfileDisabled = false;
            this.toast.error(e);
        }
    };
    MainComponent.prototype.updatePassword = function () {
        var _this = this;
        try {
            this.updatingUserPassword = true;
            this.userProfileDisabled = true;
            this.userService.updatePassword(this.currentUser).then(function (result) {
                _this.updatingUserPassword = false;
                _this.userProfileDisabled = false;
                if (result.success) {
                    _this.userPasswordModal.hide();
                    _this.userProfileModal.hide();
                    _this.toast.success(result.message);
                    _this.toast.info("Please re-login to continue.");
                    _this.redirectToLogin();
                }
                else {
                    _this.toast.error(result.message);
                }
            })
                .catch(function (error) {
                _this.updatingUserPassword = false;
                _this.userProfileDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.updatingUserPassword = false;
            this.userProfileDisabled = false;
            this.toast.error(e);
        }
    };
    MainComponent.prototype.viewProfile = function () {
        this.originalUser = Object.assign({}, this.currentUser);
    };
    MainComponent.prototype.displayChangePassword = function () {
        this.currentUser.password = "";
        this.userProfileModal.hide();
        this.userPasswordModal.show();
    };
    MainComponent.prototype.displayUserProfile = function () {
        this.userPasswordModal.hide();
        this.userProfileModal.show();
    };
    MainComponent.prototype.cancelEdit = function () {
        this.userProfileModal.hide();
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
    MainComponent.prototype.confirmUpdatePassword = function () {
        var _this = this;
        if (!this.currentUser.password.trim()) {
            this.toast.info("A password is required.");
            return;
        }
        if (this.currentUser.password.length < 6) {
            this.toast.info("Password length should be greater than 6 characters.");
            return;
        }
        this.swal.confirm({
            title: "Are You Sure?",
            message: "you will be updating your password",
            confirmButtonText: "Yes, Update It",
            callBack: function (isConfirm) {
                if (isConfirm) {
                    _this.updatePassword();
                }
            }
        });
    };
    MainComponent.prototype.signOut = function () {
        this.localStorage.remove("anthro.user-session");
        this.redirectToLogin();
    };
    return MainComponent;
}());
MainComponent = __decorate([
    core_1.Component({
        selector: 'main-component',
        templateUrl: './app/components/main/main-page.html',
        providers: [
            helpers_1.SwalHelper,
            helpers_1.ToastHelper,
            services_1.LocalStorageService,
            services_1.PositionService,
            services_1.UserService
        ]
    }),
    __metadata("design:paramtypes", [helpers_1.SwalHelper,
        helpers_1.ToastHelper,
        services_1.LocalStorageService,
        services_1.PositionService,
        services_1.UserService,
        router_1.Router])
], MainComponent);
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map