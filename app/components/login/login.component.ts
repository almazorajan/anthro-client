import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, LocalStorageService } from '../../services/services';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { User, Session, Modal } from '../../models/models';

@Component({
    selector: 'login-component',
    templateUrl: './app/components/login/login-page.html',
    providers: [
        SwalHelper,
        ToastHelper,
        LoginService,
        LocalStorageService
    ]
})

export class LoginComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private loginService: LoginService,
        private localStorage: LocalStorageService,
        private router: Router
    ) { }

    rememberMe: boolean = false;
    isFormDisabled: boolean;
    attempingLogin: boolean;
    user: User;

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

    attemptLogin(): void {
        try {
            this.attempingLogin = true;
            this.isFormDisabled = true;
            this.toast.info("Attempting login.");
            
            this.loginService.attemptLogin(this.user).then((result) => {
                this.attempingLogin = false;
                this.isFormDisabled = false;
                
                if(result.success) {
                    this.toast.success(result.message);

                    if(this.rememberMe) {
                        this.localStorage.set("athro.user-credential", this.user);
                    }
                    console.log(result.data);
                    this.localStorage.set<Session>("anthro.user-session", result.data as Session);
                    this.router.navigate(["/main/user"]);
                } else {
                    this.toast.error(result.message);
                    this.user = new User();
                }
            })
            .catch((error) => {
                this.attempingLogin = false;
                this.isFormDisabled = false;
                this.toast.error(error);
            });
        } catch(e) {
            this.attempingLogin = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    }
}