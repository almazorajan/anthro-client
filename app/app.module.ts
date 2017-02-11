import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CompanyComponent } from './components/company/company.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeSheetComponent } from './components/employee-sheet/employee-sheet.component';
import { EmploymentStatusComponent } from './components/employment-status/employment-status.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ModuleComponent } from './components/module/module.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PositionComponent } from './components/position/position.component';
import { UserComponent } from './components/user/user.component';

// providers
import { Service } from './shared-services/service';

// pipes
import { UserFilter, EmployeeFilter } from './pipes/pipe';

// shared-components
import { TableLoaderComponent } from './shared-components/components';

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule,
        HttpModule,
        AppRoutingModule],

    declarations: [
        AppComponent,
        CompanyComponent,
        EmployeeListComponent,
        EmployeeSheetComponent,
        EmploymentStatusComponent,
        LoginComponent,
        MainComponent,
        ModuleComponent,
        PageNotFoundComponent,
        PositionComponent,
        UserComponent,

        UserFilter,
        EmployeeFilter
    ],

    providers: [Service],
    bootstrap: [AppComponent]
})

export class AppModule { }