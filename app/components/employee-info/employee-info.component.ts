import { Component, OnInit, Input } from '@angular/core';
import { SweetAlertService, ToastrService } from '../../shared-services/services';
import { EmployeeService } from '../../services/employee.service';
import { CompanyService, EmploymentStatusService, PositionService } from '../../services/services';
import { EmploymentStatus, Employee, Position, Company, Family, Education, Accreditation, WorkHistory, Modal, Address } from '../../models/model';

@Component({
    selector: 'employee-info-component',
    templateUrl: './app/components/employee-list/employee-info.page.html',
    providers: [
        SweetAlertService,
        ToastrService,
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