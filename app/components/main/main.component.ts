import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService, ToastrService } from '../../shared-services/services';
import { UserService, LocalStorageService, PositionService } from '../../services/services';
import { User, Position, Module, Session, NavigationGroup, Navigation, Modal } from '../../models/models';

@Component({
    selector : 'main-component',
    templateUrl : './app/components/main/main-page.html',
    providers : [
        SweetAlertService,
        ToastrService,
        LocalStorageService,
        PositionService,
        UserService
    ]
})

export class MainComponent implements OnInit {

    constructor(
        private swal : SweetAlertService,
        private toastr : ToastrService,
        private localStorage : LocalStorageService,
        private positionService : PositionService,
        private userService : UserService,
        private router : Router
    ) { }

    private session : Session;
    loadingPositions : boolean;
    updatingUserProfile : boolean;
    updatingUserPassword : boolean;
    userProfileDisabled : boolean;
    currentUser : User;
    originalUser : User;
    greetings : string;
    navigation : Navigation;
    validRoute : boolean;
    positions : Position[];
    userProfileModal : Modal;
    userPasswordModal : Modal;
    
    ngOnInit() {
        try {
            this.session = new Session();
            this.session = this.localStorage.get<Session>("anthro.user-session");
            this.currentUser = Object.assign({}, this.session.user);

            // check if there is a session.
            if (!this.session) {
                this.toastr.error("No session detected. Proceeding to logout.");
                this.redirectToLogin();
                return;
            }

            // check the current route is valid.
            this.validRoute = this.isValidRoute(this.session);

            if (!this.validRoute) {
                this.toastr.error("The page you are looking for is either inaccessible or does not exist.");
                this.redirectToLogin();
                return;
            }

            this.formatAvailableModules(this.session);
            this.getPositions();
            this.readyGreetings();
            this.userProfileModal = new Modal("#mdlUserProfile");
            this.userPasswordModal = new Modal("#mdlUserPassword");
        } catch (e) {
            this.toastr.error(e);
            this.redirectToLogin();
        }
    }

    private redirectToLogin() : void {
        this.router.navigate(["/login"]);
    }

    private formatAvailableModules(session : Session) : void {
        this.navigation = new Navigation();
        this.navigation.withGroup = [];
        this.navigation.withoutGroup = [];

        session.user.position.modules.forEach((mod) => {
            if (mod.group) {
                let isGroupExists : boolean = false;

                for (let i = 0; i < this.navigation.withGroup.length; i++) {
                    if (this.navigation.withGroup[i].group === mod.group) {
                        this.navigation.withGroup[i].modules.push(mod);
                        isGroupExists = true;
                    }
                }

                if (!isGroupExists) {
                    let wgroup = new NavigationGroup();
                    wgroup.group = mod.group;
                    wgroup.modules = [];
                    wgroup.modules.push(mod);
                    this.navigation.withGroup.push(wgroup);
                }
            } else {
                this.navigation.withoutGroup.push(mod);
            }
        });
    }

    private isValidRoute(session : Session) : boolean {
        for (let i = 0; i < session.user.position.modules.length; i++) {
            if (session.user.position.modules[i].link === this.router.url) {
                return true;
            }
        }
        return false;
    }

    private readyGreetings() : void {
        this.greetings = "Hi " + this.session.user.firstName;
    }

    private getPositions() : void {
        try {
            this.positions = [];
            this.loadingPositions = true;
            this.userProfileDisabled = true;

            this.positionService.getAll().then((result) => {
                this.loadingPositions = false;
                this.userProfileDisabled = false;

                if(result.success) {
                    this.positions = result.data as Position[];
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.loadingPositions = false;
                this.userProfileDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.loadingPositions = false;
            this.userProfileDisabled = false;
            this.toastr.error(e);
        }
    }

    private updateUser() : void {
        try {
            this.updatingUserProfile = true;
            this.userProfileDisabled = true;

            this.userService.update(this.currentUser).then((result) => {
                this.updatingUserProfile = false;
                this.userProfileDisabled = false;

                if(result.success) {
                    this.userProfileModal.hide();
                    this.toastr.success(result.message);
                    this.toastr.info("Please re-login to continue.");
                    this.redirectToLogin();
                } else {
                    this.toastr.error(result.message)
                }
            })
            .catch((error) => {
                this.updatingUserProfile = false;
                this.userProfileDisabled = false;
                this.toastr.error(error)
            });
        } catch(e) {
            this.updatingUserProfile = false;
            this.userProfileDisabled = false;
            this.toastr.error(e);
        }
    }

    private updatePassword() : void {
        try {
            this.updatingUserPassword = true;
            this.userProfileDisabled = true;

            this.userService.updatePassword(this.currentUser).then((result) => {
                this.updatingUserPassword = false;
                this.userProfileDisabled = false;

                if(result.success) {
                    this.userPasswordModal.hide();
                    this.userProfileModal.hide();
                    this.toastr.success(result.message);
                    this.toastr.info("Please re-login to continue.");
                    this.redirectToLogin();
                } else {
                    this.toastr.error(result.message)
                }
            })
            .catch((error) => {
                this.updatingUserPassword = false;
                this.userProfileDisabled = false;
                this.toastr.error(error)
            });
        } catch(e) {
            this.updatingUserPassword = false;
            this.userProfileDisabled = false;
            this.toastr.error(e);
        }
    }

    viewProfile() : void {
        this.originalUser = Object.assign({}, this.currentUser);
    }

    displayChangePassword() : void {
        this.currentUser.password = "";
        this.userProfileModal.hide();
        this.userPasswordModal.show();
    }

    displayUserProfile() : void {
        this.userPasswordModal.hide();
        this.userProfileModal.show();
    }

    cancelEdit() : void {
        this.userProfileModal.hide();
        this.currentUser = Object.assign({}, this.originalUser);
        this.originalUser = null;
    }

    confirmUpdate() : void {
        this.swal.confirm({
            title : "Are You Sure?",
            message : "you will be updating your user information",
            confirmButtonText : "Yes, Update it",
            callBack : (isConfirm) => {
                if(isConfirm) {
                    this.updateUser();
                }
            }
        });
    }

    confirmUpdatePassword() : void {

        if(!this.currentUser.password.trim()) {
            this.toastr.info("A password is required.");
            return;
        }
        
        if(this.currentUser.password.length < 6) {
            this.toastr.info("Password length should be greater than 6 characters.");
            return;
        }

        this.swal.confirm({
            title : "Are You Sure?",
            message : "you will be updating your password",
            confirmButtonText : "Yes, Update It",
            callBack : (isConfirm) => {
                if(isConfirm) {
                    this.updatePassword();
                }
            }
        });
    }

    signOut() : void {
        this.localStorage.remove("anthro.user-session");
        this.redirectToLogin();
    }
}