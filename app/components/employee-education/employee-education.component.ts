import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, Education, Modal } from '../../models/models';

@Component({
    selector: 'employee-education-component',
    templateUrl: './app/components/employee-education/employee-education.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeEducationComponent {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;

    deleteEducation(education: Education): void {
        if(this.isFormDisabled) return;
        let index = this.employee.educationHistory.indexOf(education);
        this.employee.educationHistory.splice(index, 1);
    }
}
