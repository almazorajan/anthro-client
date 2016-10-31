import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'login-component',
    templateUrl: './app/components/login/login-page.html'
})

export class LoginComponent implements OnInit {

    constructor(public toastr: ToastsManager) { }

    ngOnInit() {
        this.showSuccess();
    }

    showSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
    }

}