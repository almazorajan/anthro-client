import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { EmployeeService } from '../../services/services';
import { Employee, Family, Modal } from '../../models/models';

@Component({
    selector: 'employee-family-component',
    templateUrl: './app/utility-components/employee-family/employee-family.page.html',
    providers: [
        SwalHelper,
        ToastHelper,
        EmployeeService
    ]
})

export class EmployeeFamilyComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private employeeService: EmployeeService
    ) { }    
    
    @Input() mainModalId: string;
    @Input() operation: number;
    @Input() employee: Employee;
    @Input() isFormDisabled: boolean;
    
    currentIndex: number;
    familyOperation: number;
    isFamilyFormDisabled: boolean;
    relationships: string[];
    family: Family;
    originalFamilyInfo: Family;
    mainModal: Modal;
    familyModal: Modal;

    ngOnInit() {
        this.mainModal = new Modal(`#${this.mainModalId}`);
        this.familyModal = new Modal("#mdlFamilyInfo");
        this.getRelationships();
    }

    private getRelationships() {
        this.relationships = this.employeeService.getRelationships();
    }

    private deleteFamily(family: Family): void {
        let index = this.employee.family.indexOf(family);
        this.employee.family.splice(index, 1);
    }

    private copyFamily(family: Family): Family  {
        return JSON.parse(JSON.stringify(family)) as Family;
    }

    editFamily(family: Family, index: number) {
        this.familyOperation = 1;
        this.isFamilyFormDisabled = false;
        this.currentIndex = index;
        this.family = this.copyFamily(family);
        this.originalFamilyInfo = this.copyFamily(this.family);
        this.familyModal.show();
    }
    
    addFamily(): void {
        this.familyOperation = 2;
        this.isFamilyFormDisabled = false;
        this.family = new Family();
        this.family.relationship = this.relationships[0];
        this.familyModal.show();
    }

    private appendFamily(): void {
        this.employee.family.unshift(this.family);
        this.familyModal.hide();
    }

    private saveUpdate(): void {
        this.employee.family[this.currentIndex] = this.copyFamily(this.family);
        this.familyModal.hide();
    }

    private cancelAppendFamily(): void {
        this.family = new Family();
        this.familyModal.hide();
    }

    private cancelSaveFamily(): void {
        this.family = this.copyFamily(this.originalFamilyInfo);
        this.originalFamilyInfo = null;
        this.familyModal.hide();
    }    

    confirmAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this family information",
            confirmButtonText: "Yes, Add It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.appendFamily();
                }
            }
        });
    }

    confirmSave(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this family information",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.saveUpdate();
                }
            }
        });
    }    

    confirmCancelSave(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this family information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.cancelSaveFamily();
                }
            }
        });
    }

    confirmCancelAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this family information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.cancelAppendFamily();
                }
            }
        });
    }

    confirmDelete(family: Family): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this family information",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.deleteFamily(family);
                }
            }
        });
    }    
}
