import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, Address, Modal } from '../../models/models';

@Component({
    selector: 'employee-address-component',
    templateUrl: './app/utility-components/employee-address/employee-address.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeAddressComponent {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;

    togglePermanentAddress(): void {
        if (this.employee.cityAddress.isPermanent) {
            this.employee.provincialAddress.isPermanent = false;
        }

        if (this.employee.provincialAddress.isPermanent) {
            this.employee.cityAddress.isPermanent = false;
        }
    }
}
