/*
* user component v1
**/
import { Component, OnInit } from '@angular/core';
import { PositionService } from '../position/position.service';
import { UserService } from './user.service';
import { SweetAlertService, ToastrService } from '../../shared-services/services';
import { User, Position, Modal, Search } from '../../models/model';
import { UserFilter } from '../../pipes/pipe';

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
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.modal = new Modal("#mdlModalInfo");
        this.search = new Search();
        this.getAllUsers();
        this.getAllPositions();
    }

    positions: Position[] = [];
    users: User[] = [];
    selectedUser: User;
    originalUserInfo: User;
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
    search: Search;

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
        this.selectedUser.position.positionName = this.positions[0].positionName;
    }

    private identifyPositionName(position: Position): string {
        for(let i=0; i < this.positions.length; i++) {
            if(this.positions[i]._id === position._id)
                return this.positions[i].positionName;
        }
        return "";
    }

    confirmAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this user",
            confirmButtonText: "Yes, Add It",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.addUser();
                }
            }
        });
    }

    private addUser(): void {
        try {
            this.addingUser = true;
            this.isFormDisabled = true;
            this.selectedUser.position.positionName = this.identifyPositionName(this.selectedUser.position);

            this.userService.add(this.selectedUser).then((result) => {
                this.addingUser = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toastr.success(result.message);
                    this.getAllUsers();
                    this.getAllPositions();
                    this.modal.hide();
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.addingUser = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.addingUser = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    view(user: User): void {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedUser = user;

        if(!this.selectedUser.position) {
            this.selectedUser.position = this.positions[0];
        } else {
            this.selectedUser.position.positionName = this.identifyPositionName(this.selectedUser.position);
        }
    }

    edit(): void {
        this.operation = 2;
        this.isFormDisabled = false;
        this.originalUserInfo = Object.assign({}, this.selectedUser) as User;
    }

    cancelEdit(): void {
        this.selectedUser = Object.assign({}, this.originalUserInfo) as User;
        this.selectedUser.position.positionName = this.identifyPositionName(this.selectedUser.position);
        this.view(this.selectedUser);
    }

    confirmUpdate(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this user",
            confirmButtonText: "Yes, Update It",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.updateUser();
                } 
            }
        });
    }

    private updateUser(): void {
        try {
            this.updatingUser = true;
            this.isFormDisabled = true;

            this.userService.update(this.selectedUser).then((result) => {
                this.updatingUser = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toastr.success(result.message);
                    this.getAllUsers();
                    this.getAllPositions();
                    this.modal.hide();          
                } else {
                    this.toastr.error(result.message);           
                }
            })
            .catch((error) => {
                this.updatingUser = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.updatingUser = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    confirmDelete(user: User): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this user",
            confirmButtonText: "Yes, Delete It",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.deleteUser(user);
                }
            }
        });
    }

    private deleteUser(user: User): void {
        try {
            this.deletingUser = true;
            this.isFormDisabled = true;

            this.userService.delete(user).then((result) => {
                this.deletingUser = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toastr.success(result.message);
                    this.getAllUsers();
                    this.getAllPositions();
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.deletingUser = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.deletingUser = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }
}