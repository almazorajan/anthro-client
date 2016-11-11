import { Component, OnInit } from '@angular/core';

import { PositionService } from '../position/position.service';
import { UserService } from './user.service';
import { SweetAlertService, ToastrService } from '../../shared-services/services';

import { User, Position, Modal } from '../../models/model';

@Component({
    selector: 'user-component',
    templateUrl: './app/components/user/user-page.html',
    providers: [
        UserService,
        PositionService,
        SweetAlertService,
        ToastrService
    ]
})

export class UserComponent implements OnInit {

    constructor(
        private userService: UserService,
        private positionService: PositionService,
        private swal: SweetAlertService,
        private toastr: ToastrService) { }

    ngOnInit() {

        this.modal = new Modal("#mdlModalInfo");
        this.getAllUsers();
        this.getAllPositions();

    }

    positions: Position[] = [];
    users: User[] = [];

    selectedUser: User;

    loadingPositions: boolean;
    loadingUsers: boolean;
    loadingCompanies: boolean;
    loadingEmploymentStatuses: boolean;
    addingUser: boolean;
    updatingUser: boolean;
    deletingUser: boolean;

    isFormDisabled: boolean;

    modal: Modal;

    operation: number = 0;

    getAllUsers(): void {

        try {

            this.users = [];

            this.loadingUsers = true;
            this.isFormDisabled = true;

            this.userService.getAll().then((result) => {

                this.loadingUsers = false;
                this.isFormDisabled = false;

                if(result.success) {

                    this.users = result.data as User[];
                    this.toastr.success(result.message);
                    
                } else {

                    this.toastr.error(result.message)

                }

            })
            .catch((error) => {

                this.loadingUsers = false;
                this.isFormDisabled = false;
                this.toastr.error(error);

            });

        } catch(e) {

            this.loadingUsers = false;
            this.isFormDisabled = false;
            this.toastr.error(e);

        }

    }   

    getAllPositions(): void {

        try {

            this.positions = [];

            this.loadingPositions = true;
            this.isFormDisabled = true;

            this.positionService.getAll().then((result) => {

                this.loadingPositions = false;
                this.isFormDisabled = false;

                if(result.success) {

                    this.positions = result.data as Position[];
                    this.toastr.success(result.message);

                } else {

                    this.toastr.error(result.message);

                }

            })
            .catch((error) => {

                this.loadingPositions = false;
                this.isFormDisabled = false;
                this.toastr.error(error);

            });

        } catch(e) {

            this.loadingPositions = false;
            this.isFormDisabled = false;
            this.toastr.error(e);

        }

    }

    add(): void {

        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedUser = new User();

        this.selectedUser.position = new Position();
        this.selectedUser.position._id = this.positions[0]._id;

    }

    confirmAdd(): void {

        // todo

    }

    private addUser(): void {

        // todo

    }

}