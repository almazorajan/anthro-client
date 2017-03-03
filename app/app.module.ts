import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './components/company/company.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmploymentStatusComponent } from './components/employment-status/employment-status.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ModuleComponent } from './components/module/module.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PositionComponent } from './components/position/position.component';
import { UserComponent } from './components/user/user.component';

import { ProviderService, LocalStorageService } from './services/services';

import { UserFilter, EmployeeFilter } from './pipes/pipe';

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
        EmploymentStatusComponent,
        LoginComponent,
        MainComponent,
        ModuleComponent,
        PageNotFoundComponent,
        PositionComponent,
        UserComponent,

        UserFilter,
        EmployeeFilter],

    providers: [ProviderService, LocalStorageService],
    bootstrap: [AppComponent]
})

export class AppModule { }