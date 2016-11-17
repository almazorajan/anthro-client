import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { EmployeeSheetComponent } from './components/employee-sheet/employee-sheet.component';
import { UserComponent } from './components/user/user.component';
import { ModuleComponent } from './components/module/module.component';
import { PositionComponent } from './components/position/position.component';
import { EmploymentStatusComponent } from './components/employment-status/employment-status.component';
import { CompanyComponent } from './components/company/company.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '404',
        component: PageNotFoundComponent
    },
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'employeesheet',
                component: EmployeeSheetComponent
            },
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'module',
                component: ModuleComponent
            },
            {
                path: 'position',
                component: PositionComponent
            },
            {
                path: 'employmentstatus',
                component: EmploymentStatusComponent
            },
            {
                path: 'company',
                component: CompanyComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }