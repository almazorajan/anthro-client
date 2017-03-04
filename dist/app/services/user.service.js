"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var provider_service_1 = require("./provider.service");
var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserService.prototype.getAll = function () {
        return this.apiCall({
            verb: "post",
            uri: "user/getall"
        });
    };
    UserService.prototype.add = function (user) {
        return this.apiCall({
            verb: "post",
            uri: "user/add",
            body: user
        });
    };
    UserService.prototype.update = function (user) {
        return this.apiCall({
            verb: "post",
            uri: "user/update",
            body: user
        });
    };
    UserService.prototype.updatePassword = function (user) {
        return this.apiCall({
            verb: "post",
            uri: "user/updatepassword",
            body: user
        });
    };
    UserService.prototype.delete = function (user) {
        return this.apiCall({
            verb: "post",
            uri: "user/delete",
            body: user
        });
    };
    return UserService;
}(provider_service_1.ProviderService));
UserService = __decorate([
    core_1.Injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map