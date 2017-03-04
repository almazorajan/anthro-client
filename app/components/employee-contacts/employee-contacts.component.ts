import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, ContactNumber, Modal } from '../../models/models';

@Component({
    selector: 'employee-contacts-component',
    templateUrl: './app/components/employee-contacts/employee-contacts.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeContactsComponent {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;
}
