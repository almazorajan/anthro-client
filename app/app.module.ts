import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { AppComponent } from './app.component';
import { CompanyComponent } from './components/company/company.component';
import { EmployeeAccreditationComponent } from './utility-components/employee-accreditation/employee-accreditation.component';
import { EmployeeAddressComponent } from './utility-components/employee-address/employee-address.component';
import { EmployeeContactsComponent } from './utility-components/employee-contacts/employee-contacts.component';
import { EmployeeEducationComponent } from './utility-components/employee-education/employee-education.component';
import { EmployeeEmploymentComponent } from './utility-components/employee-employment/employee-employment.component';
import { EmployeeFamilyComponent } from './utility-components/employee-family/employee-family.component';
import { EmployeeGovernmentComponent } from './utility-components/employee-government/employee-government.component';
import { EmployeePdfComponent } from './utility-components/employee-pdf/employee-pdf.component';
import { EmployeeInfoComponent } from './utility-components/employee-info/employee-info.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeePersonalComponent } from './utility-components/employee-personal/employee-personal.component';
import { EmployeeWorkHistoryComponent } from './utility-components/employee-work-history/employee-work-history.component';
import { EmploymentStatusComponent } from './components/employment-status/employment-status.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ModuleComponent } from './components/module/module.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PositionComponent } from './components/position/position.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UserComponent } from './components/user/user.component';
import { DatePickerComponent } from './utility-components/date-picker/date-picker.component';
import { ProviderService, LocalStorageService } from './services/services';
import { UserFilter, EmployeeFilter } from './pipes/pipes';

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule,
        HttpModule,
        AppRoutingModule,
        MyDatePickerModule],

    declarations: [
        AppComponent,
        CompanyComponent,
        EmploymentStatusComponent,
        LoginComponent,
        MainComponent,
        ModuleComponent,
        PageNotFoundComponent,
        PositionComponent,
        UploaderComponent,
        UserComponent,

        DatePickerComponent,
        EmployeeAccreditationComponent,
        EmployeeAddressComponent,
        EmployeeContactsComponent,
        EmployeeEducationComponent,
        EmployeeEmploymentComponent,
        EmployeeFamilyComponent,
        EmployeeGovernmentComponent,
        EmployeePdfComponent,
        EmployeeInfoComponent,
        EmployeeListComponent,
        EmployeePersonalComponent,
        EmployeeWorkHistoryComponent,

        UserFilter,
        EmployeeFilter],

    providers: [ProviderService, LocalStorageService],
    bootstrap: [AppComponent]
})

export class AppModule { }