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
var services_1 = require('../../services/services');
var helpers_1 = require('../../helpers/helpers');
var models_1 = require('../../models/models');
var LoginComponent = (function () {
    function LoginComponent(swal, toast, loginService, localStorage, router) {
        this.swal = swal;
        this.toast = toast;
        this.loginService = loginService;
        this.localStorage = localStorage;
        this.router = router;
        this.rememberMe = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        document.title = "Ad-haven - Login";
        this.user = new models_1.User();
        var credential = this.localStorage.get("athro.user-credential");
        if (credential) {
            this.rememberMe = true;
            this.user.userName = credential.userName;
            this.user.password = credential.password;
        }
    };
    LoginComponent.prototype.attemptLogin = function () {
        var _this = this;
        try {
            this.attempingLogin = true;
            this.isFormDisabled = true;
            this.toast.info("Attempting login.");
            this.loginService.attemptLogin(this.user).then(function (result) {
                _this.attempingLogin = false;
                _this.isFormDisabled = false;
                if (result.success) {
                    _this.toast.success(result.message);
                    if (_this.rememberMe) {
                        _this.localStorage.set("athro.user-credential", _this.user);
                    }
                    _this.localStorage.set("anthro.user-session", result.data);
                    _this.router.navigate(["/main/user"]);
                }
                else {
                    _this.toast.error(result.message);
                    _this.user = new models_1.User();
                }
            })
                .catch(function (error) {
                _this.attempingLogin = false;
                _this.isFormDisabled = false;
                _this.toast.error(error);
            });
        }
        catch (e) {
            this.attempingLogin = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-component',
            templateUrl: './app/components/login/login-page.html',
            providers: [
                helpers_1.SwalHelper,
                helpers_1.ToastHelper,
                services_1.LoginService,
                services_1.LocalStorageService
            ]
        }), 
        __metadata('design:paramtypes', [helpers_1.SwalHelper, helpers_1.ToastHelper, services_1.LoginService, services_1.LocalStorageService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map