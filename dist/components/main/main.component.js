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
var services_1 = require('../../shared-services/services');
var Session = (function () {
    function Session() {
    }
    return Session;
}());
var MainComponent = (function () {
    function MainComponent(swal, toastr, localStorage) {
        this.swal = swal;
        this.toastr = toastr;
        this.localStorage = localStorage;
    }
    MainComponent.prototype.ngOnInit = function () {
        console.log("main component.", new Date());
        this.session = new Session();
        this.session = this.localStorage.get("anthro.user-session");
        this.greetings = "Hi " + this.session.user.firstName;
        console.log(this.session);
    };
    MainComponent.prototype.signOut = function () {
        console.log("main component logout", new Date());
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main-component',
            templateUrl: './app/components/main/main-page.html',
            providers: [
                services_1.SweetAlertService,
                services_1.ToastrService,
                services_1.LocalStorageService
            ]
        }), 
        __metadata('design:paramtypes', [services_1.SweetAlertService, services_1.ToastrService, services_1.LocalStorageService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map