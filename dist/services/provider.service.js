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
var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());
var ProviderService = (function () {
    function ProviderService(http, localStorage) {
        this.http = http;
        this.localStorage = localStorage;
    }
    ProviderService.prototype.getApiEndPoint = function () {
        return this.http["post"]("/config", {}, new http_1.RequestOptions())
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProviderService.prototype.endpoint = function (apiEndPoint, uri) {
        var endpoint = "" + apiEndPoint + uri;
        return endpoint;
    };
    ProviderService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    ProviderService.prototype.apiCall = function (request) {
        var _this = this;
        var session = this.localStorage.get("anthro.user-session");
        var payload = {
            data: request.body,
            auth: {}
        };
        return this.getApiEndPoint().then(function (config) {
            if (session) {
                var headers = new http_1.Headers();
                headers.append("x-access-token", session.token);
                return _this.http[request.verb](_this.endpoint(config.api, request.uri), payload, new http_1.RequestOptions({ headers: headers }))
                    .toPromise()
                    .then(function (response) { return response.json(); })
                    .catch(_this.handleError);
            }
            else {
                return _this.http[request.verb](_this.endpoint(config.api, request.uri), payload)
                    .toPromise()
                    .then(function (response) { return response.json(); })
                    .catch(_this.handleError);
            }
        });
    };
    return ProviderService;
}());
ProviderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        local_storage_service_1.LocalStorageService])
], ProviderService);
exports.ProviderService = ProviderService;
//# sourceMappingURL=provider.service.js.map