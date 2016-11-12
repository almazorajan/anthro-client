import { Component, OnInit } from '@angular/core';

import { LoginService } from './login.service';
import { SweetAlertService, ToastrService } from '../../shared-services/services';

import { User, Modal } from '../../models/model';

@Component({
    selector: 'login-component',
    templateUrl: './app/components/login/login-page.html',
    providers: [
        SweetAlertService,
        ToastrService,
        LoginService
    ]
})

export class LoginComponent implements OnInit {

    constructor(
        private swal: SweetAlertService,
        private toastr: ToastrService,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        
        document.title = "Ad-haven - Login";

        this.user = new User();

    }

    attempingLogin: boolean;
    user: User;

}