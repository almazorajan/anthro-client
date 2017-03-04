import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { PositionService, CompanyService, EmploymentStatusService } from '../../services/services';
import { Employee, Position, EmploymentStatus, Company } from '../../models/models';

@Component({
    selector: 'employee-employment-component',
    templateUrl: './app/components/employee-employment/employee-employment.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeEmploymentComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private positionService: PositionService,
        private companyService: CompanyService,
        private employmentStatusService: EmploymentStatusService
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;

    positions: Position[];
    companies: Company[];
    employmentStatuses: EmploymentStatus[];
    loadingPositions: boolean = false;
    loadingCompanies: boolean = false;
    loadingEmploymentStatuses: boolean = false;

    ngOnInit() {
        this.getPositions();
        this.getCompanies();
        this.getEmploymentStatuses();
    }

    getPositions(): void {
        this.positions = [];
        this.loadingPositions = true;

        this.positionService.getAll().then((result) => {
            this.loadingPositions = false;
            if (result.success) {
                this.positions = result.data as Position[];
            } else {
                this.toast.error(result.message);
            }
        }).catch((e) => {
            this.loadingPositions = false;
            this.toast.error(e || e.message);
        });
    }
    
    getCompanies(): void {
        this.companies = [];
        this.loadingCompanies = true;

        this.companyService.getAll().then((result) => {
            this.loadingCompanies = false;
            if (result.success) {
                this.companies = result.data as Company[];
            } else {
                this.toast.error(result.message);
            }
        }).catch((e) => {
            this.loadingCompanies = false;
            this.toast.error(e || e.message);
        });
    }

    getEmploymentStatuses(): void {
        this.employmentStatuses = [];
        this.loadingEmploymentStatuses = true;

        this.employmentStatusService.getAll().then((result) => {
            this.loadingEmploymentStatuses = false;
            if (result.success) {
                this.employmentStatuses = result.data as EmploymentStatus[];
            } else {    
                this.toast.error(result.message);
            }
        }).catch((e) => {
            this.loadingEmploymentStatuses = false;
            this.toast.error(e || e.message);
        });
    }
}
