import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, Accreditation, Modal } from '../../models/models';

@Component({
    selector: 'employee-accreditation-component',
    templateUrl: './app/components/employee-accreditation/employee-accreditation.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeAccreditationComponent {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;
}
