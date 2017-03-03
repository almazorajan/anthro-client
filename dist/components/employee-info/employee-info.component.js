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
var helpers_1 = require("../../helpers/helpers");
var services_1 = require("../../services/services");
var models_1 = require("../../models/models");
var EmployeeInfoComponent = (function () {
    function EmployeeInfoComponent() {
    }
    return EmployeeInfoComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Employee)
], EmployeeInfoComponent.prototype, "employee", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EmployeeInfoComponent.prototype, "positions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EmployeeInfoComponent.prototype, "companies", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EmployeeInfoComponent.prototype, "employmentStatuses", void 0);
EmployeeInfoComponent = __decorate([
    core_1.Component({
        selector: 'employee-info-component',
        templateUrl: './app/components/employee-list/employee-info.page.html',
        providers: [
            helpers_1.SwalHelper,
            helpers_1.ToastHelper,
            services_1.EmployeeService,
            services_1.CompanyService,
            services_1.EmploymentStatusService,
            services_1.PositionService,
        ]
    })
], EmployeeInfoComponent);
exports.EmployeeInfoComponent = EmployeeInfoComponent;
//# sourceMappingURL=employee-info.component.js.map