import { Component, OnInit } from '@angular/core';

import { SweetAlertService, ToastrService, LocalStorageService } from '../../shared-services/services';

import { User, Position, Module } from '../../models/model';

class Session {

    token: string;
    user: User;
}

@Component({
    selector: 'main-component',
    templateUrl: './app/components/main/main-page.html',
    providers: [
        SweetAlertService,
        ToastrService,
        LocalStorageService
    ] 
})

export class MainComponent implements OnInit {

    constructor(
        private swal: SweetAlertService,
        private toastr: ToastrService,
        private localStorage: LocalStorageService
    ) {}

    ngOnInit() { 

        console.log("main component.", new Date());
        
        this.session = new Session();
        this.session = this.localStorage.get<Session>("anthro.user-session");

        this.greetings = "Hi " + this.session.user.firstName;

        console.log(this.session);

     }

     greetings: string;

     private session: Session;

     signOut() {

         console.log("main component logout", new Date());

     }

}