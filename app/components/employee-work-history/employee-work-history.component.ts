import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, WorkHistory, Modal } from '../../models/models';

@Component({
    selector: 'employee-work-history-component',
    templateUrl: './app/components/employee-work-history/employee-work-history.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeWorkHistoryComponent {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;
}