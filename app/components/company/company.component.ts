import { Component, OnInit } from '@angular/core';
import { Company, Modal } from '../../models/models';
import { CompanyService } from '../../services/services';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';

@Component({
    selector: 'company-component',
    templateUrl: './app/components/company/company-page.html',
    providers: [
        SwalHelper,
        ToastHelper,
        CompanyService
    ]
})

export class CompanyComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private companyService: CompanyService
    ) { }

    operation: number = 0;
    companies: Company[] = [];
    selectedCompany: Company;
    originalCompanyInfo: Company;
    loadingCompanies: boolean;
    addingCompany: boolean;
    updatingCompany: boolean;
    deletingCompany: boolean;
    isFormDisabled: boolean;
    modal: Modal;

    ngOnInit() {
        this.modal = new Modal("#mdlModalInfo");
        this.getAll();
    }

    getAll(): void {
        try {
            this.companies = [];
            this.isFormDisabled = true;
            this.companyService
                .getAll()
                .then((result) => {
                    this.isFormDisabled = false;

                    if (result.success) {
                        this.companies = result.data as Company[];
                    } else {
                        this.toast.error(result.message);
                    }
                })
                .catch((error) => {
                    this.isFormDisabled = false;
                    this.toast.error(error);
                });
        } catch (e) {
            this.isFormDisabled = false;
            this.toast.error(e);
        }
    }

    view(company: Company): void {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedCompany = company;
    }

    edit(): void {
        this.operation = 2;
        this.isFormDisabled = false;
        this.originalCompanyInfo = Object.assign({}, this.selectedCompany);
    }

    cancelEdit(): void {
        this.selectedCompany = Object.assign({}, this.originalCompanyInfo);
        this.view(this.selectedCompany);
    }

    add(): void {
        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedCompany = new Company();
    }

    confirmAdd(): void {
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be adding this module.",
            confirmButtonText: "Yes, add it!",
            callBack: (isConfirm) => {
                if (isConfirm) {
                    this.addCompany();
                }
            }
        });
    }

    private addCompany(): void {
        try {
            this.toggleAddCompany(true);
            this.companyService
                .addCompany(this.selectedCompany)
                .then((result) => {
                    this.toggleAddCompany(false);
                    if (result.success) {
                        this.toast.success(result.message);
                        this.getAll();
                        this.modal.hide();
                    } else {
                        this.toast.error(result.message);
                    }
                })
                .catch((error) => {
                    this.toggleAddCompany(false);
                    this.toast.error(error);
                });
        } catch (e) {
            this.toggleAddCompany(false);
            this.toast.error(e);
        }
    }

    confirmUpdate(): void {
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be updating this company.",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if (isConfirm) {
                    this.updateCompany();
                }
            }
        });
    }

    private updateCompany(): void {
        try {
            this.toggleUpdateControls(true);
            this.companyService
                .updateCompany(this.selectedCompany)
                .then((result) => {
                    this.toggleUpdateControls(false);
                    if (result.success) {
                        this.toast.success(result.message);
                        this.modal.hide();
                        this.getAll();
                    } else {
                        this.toast.error(result.message);
                    }
                })
                .catch((error) => {
                    this.toggleUpdateControls(false);
                    this.toast.error(error);
                });
        } catch (e) {
            this.toggleUpdateControls(false);
            this.toast.error(e);
        }
    }

    confirmDelete(company: Company): void {
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be deleting this module.",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if (isConfirm) this.deleteCompany(company);
            }
        });
    }

    private deleteCompany(company: Company): void {
        try {
            this.toggleDeleteControls(true);
            this.companyService
                .deleteCompany(company)
                .then((result) => {
                    this.toggleDeleteControls(false);
                    if (result.success) {
                        this.toast.success(result.message);
                        this.getAll();
                    } else {
                        this.toast.error(result.message);
                    }
                })
                .catch((error) => {
                    this.toggleDeleteControls(false);
                    this.toast.error(error);
                });
        } catch (e) {
            this.toggleDeleteControls(false);
            this.toast.error(e);
        }
    }

    private toggleUpdateControls(bool: boolean) {
        this.updatingCompany = bool;
        this.isFormDisabled = bool;
    }

    private toggleDeleteControls(bool: boolean) {
        this.deletingCompany = bool;
        this.isFormDisabled = bool;
    }

    private toggleAddCompany(bool: boolean) {
        this.addingCompany = bool;
        this.isFormDisabled = bool;
    }
}