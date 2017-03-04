import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './components/company/company.component';
import { EmployeeAccreditationComponent } from './components/employee-accreditation/employee-accreditation.component';
import { EmployeeAddressComponent } from './components/employee-address/employee-address.component';
import { EmployeeContactsComponent } from './components/employee-contacts/employee-contacts.component';
import { EmployeeEducationComponent } from './components/employee-education/employee-education.component';
import { EmployeeEmploymentComponent } from './components/employee-employment/employee-employment.component';
import { EmployeeFamilyComponent } from './components/employee-family/employee-family.component';
import { EmployeeGovernmentComponent } from './components/employee-government/employee-government.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeePersonalComponent } from './components/employee-personal/employee-personal.component';
import { EmployeeWorkHistoryComponent } from './components/employee-work-history/employee-work-history.component';
import { EmploymentStatusComponent } from './components/employment-status/employment-status.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ModuleComponent } from './components/module/module.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PositionComponent } from './components/position/position.component';
import { UserComponent } from './components/user/user.component';
import { ProviderService, LocalStorageService } from './services/services';
import { UserFilter, EmployeeFilter } from './pipes/pipes';

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule,
        HttpModule,
        AppRoutingModule],

    declarations: [
        AppComponent,
        CompanyComponent,
        EmployeeAccreditationComponent,
        EmployeeAddressComponent,
        EmployeeContactsComponent,
        EmployeeEducationComponent,
        EmployeeEmploymentComponent,
        EmployeeFamilyComponent,
        EmployeeGovernmentComponent,
        EmployeeInfoComponent,
        EmployeeListComponent,
        EmployeePersonalComponent,
        EmployeeWorkHistoryComponent,
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