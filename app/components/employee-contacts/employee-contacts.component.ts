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

    addPhoneNumber(): void {
        this.employee.phoneNumbers.unshift(new ContactNumber());
    }

    addLandline(): void {
        this.employee.landlines.unshift(new ContactNumber());
    }

    deletePhoneNumber(phoneNumber: ContactNumber): void {
        let index = this.employee.phoneNumbers.indexOf(phoneNumber);
        this.employee.phoneNumbers.splice(index, 1);
    }

    deleteLandline(landline: ContactNumber): void {
        let index = this.employee.landlines.indexOf(landline);
        this.employee.landlines.splice(index, 1);
    }
}
