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
// private classes
var Session = (function () {
    function Session() {
    }
    return Session;
}());
var NavigationGroup = (function () {
    function NavigationGroup() {
    }
    return NavigationGroup;
}());
var Navition = (function () {
    function Navition() {
    }
    return Navition;
}());
var MainComponent = (function () {
    function MainComponent(swal, toastr, localStorage, router) {
        this.swal = swal;
        this.toastr = toastr;
        this.localStorage = localStorage;
        this.router = router;
    }
    MainComponent.prototype.ngOnInit = function () {
        this.session = new Session();
        this.session = this.localStorage.get("anthro.user-session");
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
        // format route.
        this.formatAvailableModules(this.session);
        this.greetings = "Hi " + this.session.user.firstName;
    };
    MainComponent.prototype.redirectToLogin = function () {
        this.router.navigate(["/login"]);
    };
    MainComponent.prototype.formatAvailableModules = function (session) {
        var _this = this;
        this.navigation = new Navition();
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
                    var wgroup = new NavigationGroup();
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
        __metadata('design:paramtypes', [services_1.SweetAlertService, services_1.ToastrService, services_1.LocalStorageService, router_1.Router])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map