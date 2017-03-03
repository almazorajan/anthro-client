import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { CompanyService, EmploymentStatusService, PositionService, EmployeeService } from '../../services/services';
import { EmploymentStatus, Employee, Position, Company, Family, Education, Accreditation, WorkHistory, Modal, Address } from '../../models/models';

@Component({
    selector: 'employee-info-component',
    templateUrl: './app/components/employee-list/employee-info.page.html',
    providers: [
        SwalHelper,
        ToastHelper,
        EmployeeService,
        CompanyService,
        EmploymentStatusService,
        PositionService,
    ]
})

export class EmployeeInfoComponent {

    @Input() employee: Employee;
    @Input() positions: Position[];
    @Input() companies: Company[];
    @Input() employmentStatuses: EmploymentStatus[];

}