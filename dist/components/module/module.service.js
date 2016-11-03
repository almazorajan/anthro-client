"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var ModuleService = (function (_super) {
    __extends(ModuleService, _super);
    function ModuleService() {
        _super.apply(this, arguments);
    }
    ModuleService.prototype.getGroups = function () {
        return [
            "Maintenance"
        ];
    };
    ModuleService.prototype.addModule = function (_module) {
        return this.apiCall("post", "module/addmodule", _module);
    };
    ModuleService.prototype.updateModule = function (_module) {
        return this.apiCall("post", "module/updatemodule", _module);
    };
    ModuleService.prototype.deleteModule = function (_module) {
        return this.apiCall("post", "module/deletemodule", _module);
    };
    ModuleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ModuleService);
    return ModuleService;
}(services_1.Service));
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map