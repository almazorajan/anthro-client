import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { EmployeeSheetComponent } from './components/employee-sheet/employee-sheet.component';

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
        EmployeeSheetComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }