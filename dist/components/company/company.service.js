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
var core_1 = require("@angular/core");
var service_1 = require("../../shared-services/service");
var CompanyService = (function () {
    function CompanyService(service) {
        this.service = service;
    }
    CompanyService.prototype.getAll = function () {
        return this.service.apiCall({
            verb: "post",
            uri: "company/getall"
        });
    };
    CompanyService.prototype.addCompany = function (company) {
        return this.service.apiCall({
            verb: "post",
            uri: "company/add",
            body: company
        });
    };
    CompanyService.prototype.updateCompany = function (company) {
        return this.service.apiCall({
            verb: "post",
            uri: "company/update",
            body: company
        });
    };
    CompanyService.prototype.deleteCompany = function (company) {
        return this.service.apiCall({
            verb: "post",
            uri: "company/delete",
            body: company
        });
    };
    return CompanyService;
}());
CompanyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [service_1.Service])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map