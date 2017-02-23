"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var company_component_1 = require("./components/company/company.component");
var employee_list_component_1 = require("./components/employee-list/employee-list.component");
var employee_sheet_component_1 = require("./components/employee-sheet/employee-sheet.component");
var employment_status_component_1 = require("./components/employment-status/employment-status.component");
var login_component_1 = require("./components/login/login.component");
var main_component_1 = require("./components/main/main.component");
var module_component_1 = require("./components/module/module.component");
var page_not_found_component_1 = require("./components/page-not-found/page-not-found.component");
var position_component_1 = require("./components/position/position.component");
var user_component_1 = require("./components/user/user.component");
// providers
var service_1 = require("./shared-services/service");
var local_storage_service_1 = require("./shared-services/local-storage.service");
// pipes
var pipe_1 = require("./pipes/pipe");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            company_component_1.CompanyComponent,
            employee_list_component_1.EmployeeListComponent,
            employee_sheet_component_1.EmployeeSheetComponent,
            employment_status_component_1.EmploymentStatusComponent,
            login_component_1.LoginComponent,
            main_component_1.MainComponent,
            module_component_1.ModuleComponent,
            page_not_found_component_1.PageNotFoundComponent,
            position_component_1.PositionComponent,
            user_component_1.UserComponent,
            pipe_1.UserFilter,
            pipe_1.EmployeeFilter
        ],
        providers: [service_1.Service, local_storage_service_1.LocalStorageService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map