import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { SweetAlertService, ToastrService, LocalStorageService } from '../../shared-services/services';

import { User, Modal } from '../../models/model';

@Component({
    selector: 'login-component',
    templateUrl: './app/components/login/login-page.html',
    providers: [
        SweetAlertService,
        ToastrService,
        LoginService,
        LocalStorageService
    ]
})

export class LoginComponent implements OnInit {

    constructor(
        private swal: SweetAlertService,
        private toastr: ToastrService,
        private loginService: LoginService,
        private localStorage: LocalStorageService,
        private router: Router
    ) { }

    rememberMe : boolean = false;
    isFormDisabled : boolean;
    attempingLogin : boolean;
    user : User;

    ngOnInit() {        
        document.title = "Ad-haven - Login";

        this.user = new User();

        let credential = this.localStorage.get<User>("athro.user-credential");

        if(credential) {
            this.rememberMe = true;
            this.user.userName = credential.userName;
            this.user.password = credential.password;
        }
    }

    attemptLogin() : void {
        try {
            this.attempingLogin = true;
            this.isFormDisabled = true;
            this.toastr.info("Attempting login.");

            this.loginService.attemptLogin(this.user).then((result) => {
                this.attempingLogin = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toastr.success(result.message);

                    if(this.rememberMe) {
                        this.localStorage.set("athro.user-credential", this.user);
                    }

                    this.localStorage.set<User>("anthro.user-session", result.data as User);
                    this.router.navigate(["/main/user"]);
                } else {
                    this.toastr.error(result.message);
                    this.user = new User();
                }
            })
            .catch((error) => {
                this.attempingLogin = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.attempingLogin = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }
}