import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { EmployeeService } from '../../services/services';
import { Employee, Accreditation, Modal } from '../../models/models';

@Component({
    selector: 'employee-accreditation-component',
    templateUrl: './app/utility-components/employee-accreditation/employee-accreditation.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeAccreditationComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private employeeService: EmployeeService
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;

    accreditationIndex: number;
    accreditation: Accreditation;
    originalAccreditationInfo: Accreditation;
    accreditationType: string;
    originalAccreditationType: string;
    accreditationTypes: string[];
    accreditationModal: Modal;  
    accreditationOperation: number = 0;
    isAccreditationFormDisabled: boolean = false;

    ngOnInit() {
        this.accreditationModal = new Modal("#mdlAccreditationInfo");
        this.getAccreditationTypes();
        this.setDefaultAccreditationType();
    }

    private getAccreditationTypes(): void {
        this.accreditationTypes = this.employeeService.getAccreditationTypes();
    }

    private setDefaultAccreditationType(): void {
        this.accreditationType = this.accreditationTypes[0];
    }

    private copyAccreditation(accreditation: Accreditation): Accreditation {
        return JSON.parse(JSON.stringify(accreditation)) as Accreditation;
    }

    private copyString(str: string): string {
        return JSON.parse(JSON.stringify(str)) as string;
    }

    private appendAccreditation(): void {
    
        if (this.accreditationType.toLowerCase() === "licensure")
            this.employee.licensures.unshift(this.copyAccreditation(this.accreditation));
        else
            this.employee.certifications.unshift(this.copyAccreditation(this.accreditation));    

        this.accreditation = null;
        this.accreditationModal.hide();
    }    

    private updateAccreditation(): void {

        if (this.originalAccreditationType !== this.accreditationType) {
            if (this.accreditationType.toLowerCase() === "licensure") {
                this.employee.certifications.splice(this.accreditationIndex, 1);
                this.employee.licensures.unshift(this.copyAccreditation(this.accreditation));
            }

            if (this.accreditationType.toLowerCase() === "certificate") {      
                this.employee.licensures.splice(this.accreditationIndex, 1);
                this.employee.certifications.unshift(this.copyAccreditation(this.accreditation));
            }
        } else {
            if (this.accreditationType.toLowerCase() === "licensure") { 
                this.employee.licensures[this.accreditationIndex] = this.copyAccreditation(this.accreditation);
            }

            if (this.accreditationType.toLowerCase() === "certificate") {
                this.employee.certifications[this.accreditationIndex] = this.copyAccreditation(this.accreditation);
            }
        }

        this.accreditation = null;
        this.originalAccreditationInfo = null;
        this.accreditationModal.hide();
    }

    private cancelAppendAccreditation(): void {
        this.accreditation = null;
        this.accreditationModal.hide();
    }    

    private deleteAccreditation(accreditations: Accreditation[], accreditation: Accreditation): void {
        let index = accreditations.indexOf(accreditation);
        accreditations.splice(index, 1);
    }    

    parseDate(dateString: string): Date {
        if(dateString) {
            return new Date(dateString);
        }
        return null;
    }    

    addAccreditation(): void {
        this.setDefaultAccreditationType();
        this.accreditationOperation = 2;
        this.isAccreditationFormDisabled = false;
        this.accreditation = new Accreditation();
        this.accreditationModal.show();
    }

    editAccreditation(accreditation: Accreditation, index: number, accreditationType: string): void {
        this.accreditationOperation = 1;
        this.isAccreditationFormDisabled = false;
        this.accreditationIndex = index;
        this.accreditationType = this.copyString(accreditationType);
        this.originalAccreditationType = this.copyString(this.accreditationType);
        this.accreditation = this.copyAccreditation(accreditation);
        this.originalAccreditationInfo = this.copyAccreditation(this.accreditation);
        this.accreditationModal.show();
    }
    
    confirmAddAccreditation(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be Adding this family information",
            confirmButtonText: "Yes, Add It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.appendAccreditation();
                }
            }
        });
    }  

    confirmCancelAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this accreditation information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.cancelAppendAccreditation();
                }
            }
        });
    }  

    confirmUpdateAccreditation(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this accreditation information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.updateAccreditation();
                }
            }
        });
    }

    confirmDeleteAccreditation(accreditations: Accreditation[], accreditation): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this accreditation information",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.deleteAccreditation(accreditations, accreditation);
                }
            }
        });
    }   
}
