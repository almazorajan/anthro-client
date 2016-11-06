import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { EmployeeSheetComponent } from './components/employee-sheet/employee-sheet.component';
import { UserComponent } from './components/user/user.component';
import { ModuleComponent } from './components/module/module.component';
import { PositionComponent } from './components/position/position.component';

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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }