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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_component_1 = require('./components/login/login.component');
var main_component_1 = require('./components/main/main.component');
var employee_sheet_component_1 = require('./components/employee-sheet/employee-sheet.component');
var user_component_1 = require('./components/user/user.component');
var module_component_1 = require('./components/module/module.component');
var position_component_1 = require('./components/position/position.component');
var employment_status_component_1 = require('./components/employment-status/employment-status.component');
var company_component_1 = require('./components/company/company.component');
var page_not_found_component_1 = require('./components/page-not-found/page-not-found.component');
var routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: '404',
        component: page_not_found_component_1.PageNotFoundComponent
    },
    {
        path: '**',
        redirectTo: "/404"
    },
    {
        path: 'main',
        component: main_component_1.MainComponent,
        children: [
            {
                path: 'employeesheet',
                component: employee_sheet_component_1.EmployeeSheetComponent
            },
            {
                path: 'user',
                component: user_component_1.UserComponent
            },
            {
                path: 'module',
                component: module_component_1.ModuleComponent
            },
            {
                path: 'position',
                component: position_component_1.PositionComponent
            },
            {
                path: 'employmentstatus',
                component: employment_status_component_1.EmploymentStatusComponent
            },
            {
                path: 'company',
                component: company_component_1.CompanyComponent
            }
        ]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map