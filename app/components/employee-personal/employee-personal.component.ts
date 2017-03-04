import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, Modal } from '../../models/models';

@Component({
    selector: 'employee-personal-component',
    templateUrl: './app/components/employee-personal/employee-personal.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeePersonalComponent {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;
}
