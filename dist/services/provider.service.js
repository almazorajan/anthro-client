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
var http_1 = require("@angular/http");
var local_storage_service_1 = require("./local-storage.service");
require("rxjs/add/operator/toPromise");
var ProviderService = (function () {
    function ProviderService(http, localStorage) {
        this.http = http;
        this.localStorage = localStorage;
        this.forDevelopment = false;
        this.developmentApi = "http://localhost:8090/";
        this.productionApi = "https://anthro-api.herokuapp.com/";
        if (this.forDevelopment)
            this.server = this.developmentApi;
        else
            this.server = this.productionApi;
    }
    ProviderService.prototype.endpoint = function (uri) {
        return "" + this.server + uri;
    };
    ProviderService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    ProviderService.prototype.apiCall = function (request) {
        var session = this.localStorage.get("anthro.user-session");
        var payload = {
            data: request.body,
            auth: {}
        };
        if (session) {
            var headers = new http_1.Headers();
            headers.append("x-access-token", session.token);
            return this.http[request.verb](this.endpoint(request.uri), payload, new http_1.RequestOptions({ headers: headers }))
                .toPromise()
                .then(function (response) { return response.json(); })
                .catch(this.handleError);
        }
        else {
            return this.http[request.verb](this.endpoint(request.uri), payload)
                .toPromise()
                .then(function (response) { return response.json(); })
                .catch(this.handleError);
        }
    };
    return ProviderService;
}());
ProviderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, local_storage_service_1.LocalStorageService])
], ProviderService);
exports.ProviderService = ProviderService;
//# sourceMappingURL=provider.service.js.map