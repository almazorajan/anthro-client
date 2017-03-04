import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, Modal } from '../../models/models';

@Component({
    selector: 'employee-employment-component',
    templateUrl: './app/components/employee-employment/employee-employment.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeEmploymentComponent {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;
}
