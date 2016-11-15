import { Component, OnInit } from '@angular/core';

import { SweetAlertService, ToastrService, LocalStorageService } from '../../shared-services/services';

import { User, Position, Module } from '../../models/model';

class Session {

    token: string;
    user: User;

}

class NavigationGroup {
    group: string;
    modules: Module[];
}

class Navition {
    withGroup: NavigationGroup[];
    withoutGroup: Module[];
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

        this.formatAvailableModules(this.session);

     }
     
     private session: Session;

     greetings: string;
     navigation: Navition;

     private formatAvailableModules(session: Session) {

         this.navigation = new Navition();
         this.navigation.withGroup = [];
         this.navigation.withoutGroup = [];

         session.user.position.modules.forEach((mod) => {

            if(mod.group) {
                
                let isGroupExists: boolean = false;
                
                for(let i=0; i < this.navigation.withGroup.length; i++) {

                    if(this.navigation.withGroup[i].group === mod.group) {

                        this.navigation.withGroup[i].modules.push(mod);
                        isGroupExists = true;
                    
                    }

                }

                if(!isGroupExists) {

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
        
         console.log("navigation", this.navigation);

     }

     signOut() {

         console.log("main component logout", new Date());

     }

}