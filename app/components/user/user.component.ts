import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { SweetAlertService } from '../../shared-services/swal.service';

@Component({
    selector: 'user-component',
    templateUrl: './app/components/user/user-page.html',
    providers: [
        UserService,
        SweetAlertService
    ]
})

export class UserComponent implements OnInit {

    ngOnInit() {
        this.swal.confirm("Are you sure?", "You won't be able to recover this.", (isConfirm) => {

        });
    }

    constructor(private userService: UserService, private swal: SweetAlertService) {

    }



}