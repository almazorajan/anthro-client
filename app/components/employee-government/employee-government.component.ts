import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, Modal } from '../../models/models';

@Component({
    selector: 'employee-government-component',
    templateUrl: './app/components/employee-government/employee-government.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeGovernmentComponent {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;
}
