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
var login_service_1 = require('./login.service');
var services_1 = require('../../shared-services/services');
var WebStorage_1 = require("angular2-localstorage/WebStorage");
var model_1 = require('../../models/model');
var LoginComponent = (function () {
    function LoginComponent(swal, toastr, loginService) {
        this.swal = swal;
        this.toastr = toastr;
        this.loginService = loginService;
        this.profile = "hello world";
    }
    LoginComponent.prototype.ngOnInit = function () {
        document.title = "Ad-haven - Login";
        this.user = new model_1.User();
        console.log(this.profile);
    };
    LoginComponent.prototype.attemptLogin = function () {
        var _this = this;
        try {
            this.attempingLogin = true;
            this.isFormDisabled = true;
            this.toastr.info("Attempting login.");
            this.loginService.attemptLogin(this.user).then(function (result) {
                if (result.success) {
                    _this.toastr.success(result.message);
                }
                else {
                    _this.toastr.error(result.message);
                    _this.user = new model_1.User();
                }
            })
                .catch(function (error) {
                _this.attempingLogin = false;
                _this.isFormDisabled = false;
                _this.toastr.error(error);
            });
        }
        catch (e) {
            this.attempingLogin = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    };
    __decorate([
        WebStorage_1.SessionStorage(), 
        __metadata('design:type', String)
    ], LoginComponent.prototype, "profile", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-component',
            templateUrl: './app/components/login/login-page.html',
            providers: [
                services_1.SweetAlertService,
                services_1.ToastrService,
                login_service_1.LoginService
            ]
        }), 
        __metadata('design:paramtypes', [services_1.SweetAlertService, services_1.ToastrService, login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map