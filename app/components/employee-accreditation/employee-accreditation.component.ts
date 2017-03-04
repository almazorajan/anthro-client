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

    addCertification(): void {
        if(this.isFormDisabled) return;
        this.employee.certifications.push(new Accreditation());
    }

    addLicensure(): void {
        if(this.isFormDisabled) return;
        this.employee.licensures.push(new Accreditation());
    }    

    deleteCertification(certification: Accreditation): void {
        if(this.isFormDisabled) return;
        let index = this.employee.certifications.indexOf(certification);
        this.employee.certifications.splice(index, 1);
    }

    deleteLicense(license: Accreditation): void {
        if(this.isFormDisabled) return;
        let index = this.employee.licensures.indexOf(license);
        this.employee.licensures.splice(index, 1);
    }
}
