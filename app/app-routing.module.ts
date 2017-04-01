import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { CompanyComponent } from './components/company/company.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmploymentStatusComponent } from './components/employment-status/employment-status.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ModuleComponent } from './components/module/module.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { PositionComponent } from './components/position/position.component';
import { UserComponent } from './components/user/user.component';

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
                path: 'employeelist',
                component: EmployeeListComponent
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
            },
            {
                path: 'uploader',
                component: UploaderComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }