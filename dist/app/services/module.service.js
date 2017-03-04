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
var ModuleService = (function (_super) {
    __extends(ModuleService, _super);
    function ModuleService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModuleService.prototype.getGroups = function () {
        return [
            "",
            "Maintenance"
        ];
    };
    ModuleService.prototype.getAll = function () {
        return this.apiCall({
            verb: "post",
            uri: "module/getall"
        });
    };
    ModuleService.prototype.addModule = function (mod) {
        return this.apiCall({
            verb: "post",
            uri: "module/add",
            body: mod
        });
    };
    ModuleService.prototype.updateModule = function (mod) {
        return this.apiCall({
            verb: "post",
            uri: "module/update",
            body: mod
        });
    };
    ModuleService.prototype.deleteModule = function (mod) {
        return this.apiCall({
            verb: "post",
            uri: "module/delete",
            body: mod
        });
    };
    return ModuleService;
}(provider_service_1.ProviderService));
ModuleService = __decorate([
    core_1.Injectable()
], ModuleService);
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map