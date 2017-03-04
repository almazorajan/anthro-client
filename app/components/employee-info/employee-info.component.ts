import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { CompanyService, EmploymentStatusService, PositionService, EmployeeService } from '../../services/services';
import { EmploymentStatus, Employee, Position, Company, Family, Education, Accreditation, WorkHistory, Modal, Address } from '../../models/models';

@Component({
    selector: 'employee-info-component',
    templateUrl: './app/components/employee-info/employee-info.page.html',
    providers: [
        SwalHelper,
        ToastHelper,
        EmployeeService,
        CompanyService,
        EmploymentStatusService,
        PositionService,
    ]
})

export class EmployeeInfoComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private employeeService: EmployeeService,
        private companyService: CompanyService,
        private positionService: PositionService,
        private employmentStatusService: EmploymentStatusService
    ) { }    

    @Input() id: string;
    @Input() employee: Employee;
    @Input() operation: number;
    @Input() onAdd: Function;
    @Input() onUpdate: Function;
    @Input() onDelete: Function;

    originalEmployeeInfo: Employee;
    updatingEmployee: boolean = false;
    deletingEmployee: boolean = false;
    loadingCompanies: boolean = false;
    loadingEmploymentStatuses: boolean = false;
    loadingPositions: boolean = false;
    isFormDisabled: boolean = true;
    readyToSave: boolean = false;
    addingEmployee: boolean = false;
    employees: Employee[] = [];
    modal: Modal
    companies: Company[];
    positions: Position[];
    employmentStatuses: EmploymentStatus[];
    relationships: string[];

    ngOnInit() {
        this.getCompanies();
        this.getEmploymentStatuses();
        this.getPositions();
        this.getRelationships();
    }
  
    parseDate(dateString: string): Date {
        if(dateString) {
            return new Date(dateString);
        }
        return null;
    }

    add(): void {
        this.modal.show();
        this.operation = 2;
        this.isFormDisabled = false;
        this.employee = new Employee();
        this.employee.company = this.companies[0];
        this.employee.position = this.positions[0];
        this.employee.employmentStatus = this.employmentStatuses[0];
    }

    confirmAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this employee information",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.saveNewEmployee();
                }
            }
        });
    }

    saveNewEmployee(): void {
        try {
            this.isFormDisabled = true;
            this.updatingEmployee = true;

            this.employeeService.addEmployee(this.employee).then((result) => {
                this.updatingEmployee = false;
                
                if(result.success) {
                    this.onAdd(result);
                    this.operation = 0;
                    this.isFormDisabled = false;
                    this.originalEmployeeInfo = null;
                    this.modal.hide();
                    this.toast.success(result.message);
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.updatingEmployee = false;
                this.toast.error(error);
            });
        } catch(e) {
            this.updatingEmployee = false;
            this.toast.error(e);
        }
    }

    view(employee: Employee): void {
        this.operation = 0;
        this.isFormDisabled = true;
        this.employee = employee;

        if(!this.employee.cityAddress) {
            this.employee.cityAddress = new Address();
        }

        if(!this.employee.permanentAddress) {
            this.employee.permanentAddress = new Address();
        }

        if(!this.employee.provincialAddress) {
            this.employee.provincialAddress = new Address();
        }

        if(!this.employee.company) {
            this.employee.company = new Company();
        }

        this.computeAge(this.employee);
    }

    edit(): void {
        this.operation = 1;
        this.isFormDisabled = false;
        this.originalEmployeeInfo = JSON.parse(JSON.stringify(this.employee)) as Employee;
    }

    confirmSave(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this employee information",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.saveUpdates();
                }
            }
        });
    }

    confirmDelete(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this employee information",
            confirmButtonText: "Delete",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.deleteEmployee();
                }
            }
        });
    }

    private saveUpdates(): void {
        try {
            this.isFormDisabled = true;
            this.updatingEmployee = true;

            this.employeeService.updateEmployee(this.employee).then((result) => {
                this.updatingEmployee = false;
                
                if(result.success) {
                    this.onUpdate(result);
                    this.operation = 0;
                    this.isFormDisabled = false;                 
                    this.originalEmployeeInfo = null;
                    this.modal.hide();
                    this.toast.success(result.message);
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.updatingEmployee = false;
                this.toast.error(error);
            });
        } catch(e) {
            this.updatingEmployee = false;
            this.toast.error(e);
        }
    }

    private deleteEmployee(): void {
        try {
            this.isFormDisabled = true;
            this.deletingEmployee = true;

            this.employeeService.deleteEmployee(this.employee).then((result) => {
                this.isFormDisabled = false;
                this.deletingEmployee = false;

                if(result.success) {
                    this.onDelete(result);
                    this.modal.hide();
                    this.toast.success(result.message);
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.isFormDisabled = false;
                this.deletingEmployee = false;
                this.toast.error(error);
            });
        } catch(e) {
            this.isFormDisabled = false;
            this.deletingEmployee = false;
            this.toast.error(e);
        }
    }

    cancelEdit(): void {
        this.operation = 0;
        this.isFormDisabled = true;
        this.employee = JSON.parse(JSON.stringify(this.originalEmployeeInfo)) as Employee;
        this.originalEmployeeInfo = null;
    }

    addFamily(): void {
        if(this.isFormDisabled) return;
        this.employee.family.push(new Family());
    }

    addCertification(): void {
        if(this.isFormDisabled) return;
        this.employee.certifications.push(new Accreditation());
    }

    addLicensure(): void {
        if(this.isFormDisabled) return;
        this.employee.licensures.push(new Accreditation());
    }

    addEducation(): void {
        if(this.isFormDisabled) return;
        this.employee.educationHistory.push(new Education());
    }

    addWorkHistory(): void {
        if(this.isFormDisabled) return;
        this.employee.workHistory.push(new WorkHistory());
    }
    
    deleteFamily(family: Family): void {
        let index = this.employee.family.indexOf(family);
        this.employee.family.splice(index, 1);
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

    deleteEducation(education: Education): void {
        if(this.isFormDisabled) return;
        let index = this.employee.educationHistory.indexOf(education);
        this.employee.educationHistory.splice(index, 1);
    }

    deleteWorkHistory(workHistory: WorkHistory): void {
        if(this.isFormDisabled) return;
        let index = this.employee.workHistory.indexOf(workHistory);
        this.employee.workHistory.splice(index, 1);
    }

    computeAge(employee: Employee): void {
        try {
            var birthDate = new Date(employee.birthDate);
            var birthDay = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDay());
            var diff = Date.now() - birthDay.getTime();
            this.employee.age = Math.abs(new Date(diff).getUTCFullYear() - 1970);    
        } catch(e) {
            this.toast.error(e);
        }
    }

    togglePermanentAddress(): void {
        if (this.employee.cityAddress.isPermanent) {
            this.employee.provincialAddress.isPermanent = false;
        }

        if (this.employee.provincialAddress.isPermanent) {
            this.employee.cityAddress.isPermanent = false;
        }
    }

    private getCompanies(): void {
        try {
            this.companies = [];
            this.loadingCompanies = true;
            this.isFormDisabled = true;

            this.companyService.getAll().then((result) => {
                this.loadingCompanies = false;
                this.isFormDisabled = false;

                if (result.success) {
                    this.companies = result.data as Company[];
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.loadingCompanies = false;
                this.isFormDisabled = false;
                this.toast.error(error);
            });
        } catch (e) {
            this.loadingCompanies = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    }

    private getEmploymentStatuses(): void {
        try {
            this.employmentStatuses = [];
            this.loadingEmploymentStatuses = true;
            this.isFormDisabled = true;

            this.employmentStatusService.getAll().then((result) => {
                this.loadingEmploymentStatuses = false;
                this.isFormDisabled = false;

                if (result.success) {
                    this.employmentStatuses = result.data as EmploymentStatus[];
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.loadingEmploymentStatuses = false;
                this.isFormDisabled = false;
                this.toast.error(error);
            });
        } catch (e) {
            this.loadingEmploymentStatuses = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    }

    private getPositions(): void {
        try {
            this.positions = [];
            this.loadingPositions = true;
            this.isFormDisabled = true;

            this.positionService.getAll().then((result) => {
                this.loadingPositions = false;
                this.isFormDisabled = false;

                if (result.success) {
                    this.positions = result.data as Position[];
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.loadingPositions = false;
                this.isFormDisabled = false;
                this.toast.error(error);
            });
        } catch (e) {
            this.loadingPositions = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    }

    private getRelationships(): void {
        try {
            this.relationships = this.employeeService.getRelationships();
        } catch (e) {
            this.toast.error(e);
        }
    }
}