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

    parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        }
        return null;
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

    get employmentStartDate() {
        let def = new Date().toISOString().substring(0, 10);

        try {
            if (!this.employee) {
                return def;
            }

            if (!typeof this.employee.startingDate) {
                return def;
            }

            this.employee.startingDate = new Date(this.employee.startingDate);
            return this.employee.startingDate.toISOString().substring(0, 10);
        } catch (e) {
            console.log(e);
        }

        return def;
    }

    set employmentStartDate(e) {
        try {
            let f: any = e.split('-');
            let d = new Date(Date.UTC(f[0], f[1] - 1, f[2]));
            this.employee.startingDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
        } catch (e) {
            console.log(e);
        }
    }
}
