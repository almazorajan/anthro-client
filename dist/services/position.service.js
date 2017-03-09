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
var provider_service_1 = require('./provider.service');
var PositionService = (function (_super) {
    __extends(PositionService, _super);
    function PositionService() {
        _super.apply(this, arguments);
    }
    PositionService.prototype.getAll = function () {
        return this.apiCall({
            verb: "post",
            uri: "position/getall"
        });
    };
    PositionService.prototype.addPosition = function (position) {
        return this.apiCall({
            verb: "post",
            uri: "position/add",
            body: position
        });
    };
    PositionService.prototype.updatePosition = function (position) {
        return this.apiCall({
            verb: "post",
            uri: "position/update",
            body: position
        });
    };
    PositionService.prototype.deletePosition = function (position) {
        return this.apiCall({
            verb: "post",
            uri: "position/delete",
            body: position
        });
    };
    PositionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PositionService);
    return PositionService;
}(provider_service_1.ProviderService));
exports.PositionService = PositionService;
//# sourceMappingURL=position.service.js.map