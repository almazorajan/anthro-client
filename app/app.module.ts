import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { EmployeeSheetComponent } from './components/employee-sheet/employee-sheet.component';
import { UserComponent } from './components/user/user.component';
import { ModuleComponent } from './components/module/module.component';
import { PositionComponent } from './components/position/position.component';
import { EmploymentStatusComponent } from './components/employment-status/employment-status.component';
import { CompanyComponent } from './components/company/company.component';

// providers
import { Service } from './shared-services/service';

// pipes
import { UserFilter } from './pipes/pipe';

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
        LoginComponent,
        MainComponent,
        EmployeeSheetComponent,
        UserComponent,
        ModuleComponent,
        PositionComponent,
        EmploymentStatusComponent,
        CompanyComponent,
        UserFilter
    ],

    providers: [Service],
    bootstrap: [AppComponent]
})

export class AppModule { }