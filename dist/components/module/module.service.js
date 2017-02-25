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
var services_1 = require("../../shared-services/services");
var ModuleService = (function () {
    function ModuleService(service) {
        this.service = service;
    }
    ModuleService.prototype.getGroups = function () {
        return [
            "",
            "Maintenance"
        ];
    };
    ModuleService.prototype.getAll = function () {
        return this.service.apiCall({
            verb: "post",
            uri: "module/getall"
        });
    };
    ModuleService.prototype.addModule = function (_module) {
        return this.service.apiCall({
            verb: "post",
            uri: "module/add",
            body: _module
        });
    };
    ModuleService.prototype.updateModule = function (_module) {
        return this.service.apiCall({
            verb: "post",
            uri: "module/update",
            body: _module
        });
    };
    ModuleService.prototype.deleteModule = function (_module) {
        return this.service.apiCall({
            verb: "post",
            uri: "module/delete",
            body: _module
        });
    };
    return ModuleService;
}());
ModuleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [services_1.Service])
], ModuleService);
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map