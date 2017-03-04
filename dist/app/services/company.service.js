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
var CompanyService = (function (_super) {
    __extends(CompanyService, _super);
    function CompanyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompanyService.prototype.getAll = function () {
        return this.apiCall({
            verb: "post",
            uri: "company/getall"
        });
    };
    CompanyService.prototype.addCompany = function (company) {
        return this.apiCall({
            verb: "post",
            uri: "company/add",
            body: company
        });
    };
    CompanyService.prototype.updateCompany = function (company) {
        return this.apiCall({
            verb: "post",
            uri: "company/update",
            body: company
        });
    };
    CompanyService.prototype.deleteCompany = function (company) {
        return this.apiCall({
            verb: "post",
            uri: "company/delete",
            body: company
        });
    };
    return CompanyService;
}(provider_service_1.ProviderService));
CompanyService = __decorate([
    core_1.Injectable()
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map