/*
version: 1
Position Service
**/
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
// @angular
var core_1 = require('@angular/core');
// user-defined service
var service_1 = require('../../shared-services/service');
var PositionService = (function () {
    function PositionService(service) {
        this.service = service;
    }
    PositionService.prototype.getAll = function () {
        return this.service.apiCall({
            verb: "post",
            uri: "position/getall"
        });
    };
    PositionService.prototype.addPosition = function (position) {
        return this.service.apiCall({
            verb: "post",
            uri: "position/add",
            body: position
        });
    };
    PositionService.prototype.updatePosition = function (position) {
        return this.service.apiCall({
            verb: "post",
            uri: "position/update",
            body: position
        });
    };
    PositionService.prototype.deletePosition = function (position) {
        return this.service.apiCall({
            verb: "post",
            uri: "position/delete",
            body: position
        });
    };
    PositionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [service_1.Service])
    ], PositionService);
    return PositionService;
}());
exports.PositionService = PositionService;
//# sourceMappingURL=position.service.js.map