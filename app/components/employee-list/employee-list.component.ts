import { Component, OnInit } from '@angular/core';
import { SweetAlertService, ToastrService } from '../../shared-services/services';
import { EmployeeService, CompanyService, EmploymentStatusService, PositionService } from '../../services/services';
import { EmploymentStatus, Employee, Position, Company, Family, Education, Accreditation, WorkHistory, Modal, Address } from '../../models/model';

@Component({
    selector: 'employee-list-component',
    templateUrl: './app/components/employee-list/employee-list.page.html',
    providers: [
        SweetAlertService,
        ToastrService,
        EmployeeService,
        CompanyService,
        EmploymentStatusService,
        PositionService,
    ]
})

export class EmployeeListComponent implements OnInit {

    constructor(
        private swal: SweetAlertService,
        private toastr: ToastrService,
        private employeeService: EmployeeService,
        private companyService: CompanyService,
        private employmentStatusService: EmploymentStatusService,
        private positionService: PositionService
    ) { }

    operation: number = 0;
    originalEmployeeInfo: Employee;
    currentEmployee: Employee;
    searchFilter: string = "";
    updatingEmployee: boolean = false;
    deletingEmployee: boolean = false;
    loadingEmployees: boolean = false;
    loadingCompanies: boolean = false;
    loadingEmploymentStatuses: boolean = false;
    loadingPositions: boolean = false;
    isFormDisabled: boolean = true;
    readyToSave: boolean = false;
    addingEmployee: boolean = false;
    employees: Employee[] = [];
    companies: Company[] = [];
    employmentStatuses: EmploymentStatus[] = [];
    positions: Position[] = [];
    relationships: string[] = [];
    modal: Modal;

    ngOnInit() {
        this.getAllEmployees();
        this.getCompanies();
        this.getEmploymentStatuses();
        this.getPositions();
        this.getRelationships();
        this.modal = new Modal("#mdlModalInfo");
    }

    private getAllEmployees(): void {
        try {
            this.employees = [];
            this.loadingEmployees = true;
            this.isFormDisabled = true;

            this.employeeService.getAllEmployees().then((result) => {
                this.loadingEmployees = false;
                this.isFormDisabled = false;
                
                console.log(result);

                if(result.success) {
                    this.employees = result.data as Employee[];
                } else {
                    toastr.error(result.message);
                }
            })
            .catch((err) => {
                this.loadingEmployees = false;
                this.isFormDisabled = false;
                toastr.error(err);
            });
        } catch (e) {
            this.loadingEmployees = false;
            this.isFormDisabled = false;
            toastr.error(e);
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
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.loadingCompanies = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch (e) {
            this.loadingCompanies = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
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
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.loadingEmploymentStatuses = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch (e) {
            this.loadingEmploymentStatuses = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
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
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.loadingPositions = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch (e) {
            this.loadingPositions = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    private getRelationships(): void {
        try {
            this.relationships = this.employeeService.getRelationships();
        } catch (e) {
            this.toastr.error(e);
        }
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
        this.currentEmployee = new Employee();
        this.currentEmployee.company = this.companies[0];
        this.currentEmployee.position = this.positions[0];
        this.currentEmployee.employmentStatus = this.employmentStatuses[0];
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

            this.employeeService.addEmployee(this.currentEmployee).then((result) => {
                this.updatingEmployee = false;
                
                if(result.success) {
                    this.operation = 0;
                    this.isFormDisabled = false;
                    this.currentEmployee = null;
                    this.originalEmployeeInfo = null;
                    this.modal.hide();
                    this.getAllEmployees();
                    this.toastr.success(result.message);
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.updatingEmployee = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.updatingEmployee = false;
            this.toastr.error(e);
        }
    }

    view(employee: Employee): void {
        this.operation = 0;
        this.isFormDisabled = true;
        this.currentEmployee = employee;

        if(!this.currentEmployee.cityAddress) {
            this.currentEmployee.cityAddress = new Address();
        }

        if(!this.currentEmployee.permanentAddress) {
            this.currentEmployee.permanentAddress = new Address();
        }

        if(!this.currentEmployee.provincialAddress) {
            this.currentEmployee.provincialAddress = new Address();
        }

        if(!this.currentEmployee.company) {
            this.currentEmployee.company = new Company();
        }

        this.computeAge(this.currentEmployee);
    }

    edit(): void {
        this.operation = 1;
        this.isFormDisabled = false;
        this.originalEmployeeInfo = JSON.parse(JSON.stringify(this.currentEmployee)) as Employee;
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

            this.employeeService.updateEmployee(this.currentEmployee).then((result) => {
                this.updatingEmployee = false;
                
                if(result.success) {
                    this.operation = 0;
                    this.isFormDisabled = false;
                    this.currentEmployee = null;
                    this.originalEmployeeInfo = null;
                    this.modal.hide();
                    this.getAllEmployees();
                    this.toastr.success(result.message);
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.updatingEmployee = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.updatingEmployee = false;
            this.toastr.error(e);
        }
    }

    private deleteEmployee(): void {
        try {
            this.isFormDisabled = true;
            this.deletingEmployee = true;

            this.employeeService.deleteEmployee(this.currentEmployee).then((result) => {
                this.isFormDisabled = false;
                this.deletingEmployee = false;

                if(result.success) {
                    this.getAllEmployees();
                    this.modal.hide();
                    this.toastr.success(result.message);
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.isFormDisabled = false;
                this.deletingEmployee = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.isFormDisabled = false;
            this.deletingEmployee = false;
            this.toastr.error(e);
        }
    }

    cancelEdit(): void {
        this.operation = 0;
        this.isFormDisabled = true;
        this.currentEmployee = JSON.parse(JSON.stringify(this.originalEmployeeInfo)) as Employee;
        this.originalEmployeeInfo = null;
    }

    addFamily(): void {
        if(this.isFormDisabled) return;
        this.currentEmployee.family.push(new Family());
    }

    addCertification(): void {
        if(this.isFormDisabled) return;
        this.currentEmployee.certifications.push(new Accreditation());
    }

    addLicensure(): void {
        if(this.isFormDisabled) return;
        this.currentEmployee.licensures.push(new Accreditation());
    }

    addEducation(): void {
        if(this.isFormDisabled) return;
        this.currentEmployee.educationHistory.push(new Education());
    }

    addWorkHistory(): void {
        if(this.isFormDisabled) return;
        this.currentEmployee.workHistory.push(new WorkHistory());
    }
    
    deleteFamily(family: Family): void {
        let index = this.currentEmployee.family.indexOf(family);
        this.currentEmployee.family.splice(index, 1);
    }

    deleteCertification(certification: Accreditation): void {
        if(this.isFormDisabled) return;
        let index = this.currentEmployee.certifications.indexOf(certification);
        this.currentEmployee.certifications.splice(index, 1);
    }

    deleteLicense(license: Accreditation): void {
        if(this.isFormDisabled) return;
        let index = this.currentEmployee.licensures.indexOf(license);
        this.currentEmployee.licensures.splice(index, 1);
    }

    deleteEducation(education: Education): void {
        if(this.isFormDisabled) return;
        let index = this.currentEmployee.educationHistory.indexOf(education);
        this.currentEmployee.educationHistory.splice(index, 1);
    }

    deleteWorkHistory(workHistory: WorkHistory): void {
        if(this.isFormDisabled) return;
        let index = this.currentEmployee.workHistory.indexOf(workHistory);
        this.currentEmployee.workHistory.splice(index, 1);
    }

    computeAge(employee: Employee): void {
        try {
            var birthDate = new Date(employee.birthDate);
            var birthDay = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDay());
            var diff = Date.now() - birthDay.getTime();
            this.currentEmployee.age = Math.abs(new Date(diff).getUTCFullYear() - 1970);    
        } catch(e) {
            this.toastr.error(e);
        }
    }

    togglePermanentAddress(): void {
        if (this.currentEmployee.cityAddress.isPermanent) {
            this.currentEmployee.provincialAddress.isPermanent = false;
        }

        if (this.currentEmployee.provincialAddress.isPermanent) {
            this.currentEmployee.cityAddress.isPermanent = false;
        }
    }
}