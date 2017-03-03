import { Component, OnInit } from '@angular/core';
import { EmploymentStatusService } from '../../services/services';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { EmploymentStatus, Modal } from '../../models/models';

@Component({
    selector: 'employment-status-component',
    templateUrl: './app/components/employment-status/employment-status.page.html',
    providers: [
        SwalHelper,
        ToastHelper,
        EmploymentStatusService
    ]
})

export class EmploymentStatusComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private employmentStatusService: EmploymentStatusService
    ) { }

    employmentStatuses: EmploymentStatus[];
    selectedEmploymentStatus: EmploymentStatus;
    originalEmploymentStatusInfo: EmploymentStatus;
    loadingEmploymentStatus: boolean;
    addingEmploymentStatus: boolean;
    updatingEmploymentStatus: boolean;
    deletingEmploymentStatus: boolean;
    isFormDisabled: boolean;
    modal: Modal;

    ngOnInit() {
        this.modal = new Modal("#mdlModalInfo");
        this.getAll();
    }

    private getAll(): void {
        try {
            this.employmentStatuses = [];
            this.loadingEmploymentStatus = true;
            this.isFormDisabled = true;

            this.employmentStatusService.getAll().then((result) => {
                this.loadingEmploymentStatus = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.employmentStatuses = result.data as EmploymentStatus[];
                    this.disableEmploymentStatuses(true);
                    this.toggleAllEditMode(false);
                } else {
                    this.toast.error(result.message);
                } 
            })
            .catch((error) => {
                this.loadingEmploymentStatus = false;
                this.isFormDisabled = false;
                this.toast.error(error);
            });

        } catch(e) {
            this.loadingEmploymentStatus = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    }

    private disableEmploymentStatuses(val: boolean): void {
        for(let i=0; i < this.employmentStatuses.length; i++) {
            this.employmentStatuses[i].disabled = val;
        }
    }

    private toggleAllEditMode(val: boolean): void {
        for(let i=0; i < this.employmentStatuses.length; i++) {
            this.employmentStatuses[i].editMode = val;
        }
    }

    add(): void {
        this.isFormDisabled = false;
        this.selectedEmploymentStatus = new EmploymentStatus();
    }

    edit(employmentStatus: EmploymentStatus): void {
        employmentStatus.originalInfo = Object.assign({}, employmentStatus);
        employmentStatus.editMode = true;
        employmentStatus.disabled = false;
    }

    cancelEdit(employmentStatus: EmploymentStatus): void {
        employmentStatus.employmentStatus = employmentStatus.originalInfo.employmentStatus;
        employmentStatus.editMode = false;
        employmentStatus.disabled = true;
    }

    confirmAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this employment status",
            confirmButtonText: "Yes, Add It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.addEmploymentStatus();
                }
            }
        });
    }

    private addEmploymentStatus(): void {
        try {
            this.isFormDisabled = true;
            this.addingEmploymentStatus = true;

            this.employmentStatusService.addEmploymentStatus(this.selectedEmploymentStatus).then((result) => {
                this.isFormDisabled = false;
                this.addingEmploymentStatus = false;
                
                if(result.success) {
                    this.toast.success(result.message);
                    this.modal.hide();
                    this.getAll();
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.isFormDisabled = false;
                this.addingEmploymentStatus = false;
                this.toast.error(error);
            });
        } catch(e) {
            this.isFormDisabled = false;
            this.addingEmploymentStatus = false;
            this.toast.error(e);
        }
    }

    confirmSave(employmentStatus: EmploymentStatus): void {
        if(!employmentStatus.employmentStatus.trim()) {
            this.toast.warn("Please provide an employment status.");
            return;
        }

        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be updating this employment status.",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.updateEmploymentStatus(employmentStatus);
                }
            }
        });
    }

    private updateEmploymentStatus(employmentStatus: EmploymentStatus): void {
        try {
            this.updatingEmploymentStatus = true;
            this.isFormDisabled = true;

            this.employmentStatusService.updateEmploymentStatus(employmentStatus).then((result) => {
                this.updatingEmploymentStatus = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toast.success(result.message);
                    this.getAll();
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {              
                this.updatingEmploymentStatus = false;
                this.isFormDisabled = false;
                this.toast.error(error);
            });
        } catch(e) {
            this.updatingEmploymentStatus = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }

    }

    confirmDelete(employmentStatus: EmploymentStatus): void {
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be deleting this employment status.",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.deleteEmploymentStatus(employmentStatus);
                }
            }
        });        
    }

    private deleteEmploymentStatus(employmentStatus: EmploymentStatus): void {
        try {
            this.deletingEmploymentStatus = true;
            this.isFormDisabled = true;

            this.employmentStatusService.deletEmploymentStatus(employmentStatus).then((result) => {                
                this.deletingEmploymentStatus = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toast.success(result.message);
                    this.getAll();
                    this.modal.hide();
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.deletingEmploymentStatus = false;
                this.isFormDisabled = false;
                this.toast.error(error);
            });

        } catch(e) {
            this.deletingEmploymentStatus = false;
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    }

}