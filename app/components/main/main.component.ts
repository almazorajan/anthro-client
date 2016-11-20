import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService, ToastrService, LocalStorageService } from '../../shared-services/services';
import { PositionService } from '../position/position.service';
import { User, Position, Module, Session, NavigationGroup, Navigation } from '../../models/model';

@Component({
    selector: 'main-component',
    templateUrl: './app/components/main/main-page.html',
    providers: [
        SweetAlertService,
        ToastrService,
        LocalStorageService,
        PositionService
    ]
})

export class MainComponent implements OnInit {

    constructor(
        private swal: SweetAlertService,
        private toastr: ToastrService,
        private localStorage: LocalStorageService,
        private positionService: PositionService,
        private router: Router
    ) { }

    ngOnInit() {

        try {

            this.session = new Session();
            this.session = this.localStorage.get<Session>("anthro.user-session");
            this.currentUser = this.session.user;

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

            // format route.
            this.formatAvailableModules(this.session);
            this.getPositions();
            this.readyGreetings();

        } catch (e) {

            this.toastr.error(e);
            this.redirectToLogin();

        }

    }

    private session: Session;
    
    loadingPositions: boolean;
    userProfileDisabled: boolean;
    currentUser: User;
    greetings: string;
    navigation: Navigation;
    validRoute: boolean;
    positions: Position[];
    

    private redirectToLogin() {

        this.router.navigate(["/login"]);

    }

    private formatAvailableModules(session: Session): void {

        this.navigation = new Navigation();
        this.navigation.withGroup = [];
        this.navigation.withoutGroup = [];

        session.user.position.modules.forEach((mod) => {

            if (mod.group) {

                let isGroupExists: boolean = false;

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

    private isValidRoute(session: Session): boolean {

        for (let i = 0; i < session.user.position.modules.length; i++) {

            if (session.user.position.modules[i].link === this.router.url) {
                return true;
            }

        }

        return false;

    }

    private readyGreetings(): void {

        this.greetings = "Hi " + this.session.user.firstName;

    }

    private getPositions(): void {

        try {

            this.positions = [];
            this.loadingPositions = true;
            this.userProfileDisabled = true;

            this.positionService.getAll().then((result) => {

                this.loadingPositions = false;
                this.userProfileDisabled = false;

                if(result.success) {

                    this.positions = result.data as Position[];
                    this.toastr.success(result.message);

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

    signOut(): void {

        this.localStorage.remove("anthro.user-session");
        this.redirectToLogin();

    }

}