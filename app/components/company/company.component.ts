import { Component, OnInit } from '@angular/core';
import { Company, Modal } from '../../models/models';
import { CompanyService } from '../../services/services';
import { SweetAlertService, ToastrService } from '../../shared-services/services';

@Component({
    selector: 'company-component',
    templateUrl: './app/components/company/company-page.html',
    providers: [
        SweetAlertService,
        ToastrService,
        CompanyService
    ]
})

export class CompanyComponent implements OnInit {

    constructor(
        private swal : SweetAlertService,
        private toastr : ToastrService,
        private companyService : CompanyService
    ) { }

    ngOnInit() {
        this.modal = new Modal("#mdlModalInfo");
        this.getAll();
    }

    operation : number = 0;
    companies : Company[] = [];
    selectedCompany : Company;
    originalCompanyInfo : Company;
    loadingCompanies : boolean;
    addingCompany : boolean;
    updatingCompany : boolean;
    deletingCompany : boolean;
    isFormDisabled : boolean;
    modal : Modal;

    getAll() : void {
        try {
            this.companies = [];
            this.loadingCompanies = true;
            this.isFormDisabled = true;

            this.companyService.getAll().then((result) => {
                this.loadingCompanies = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.companies = result.data as Company[];
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.loadingCompanies = true;
                this.isFormDisabled = true;
                this.toastr.error(error);
            });
        } catch(e) {
            this.loadingCompanies = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    view(company : Company) : void {
        this.operation = 0;
        this.isFormDisabled = true;        
        this.selectedCompany = company;
    }

    edit() : void {
        this.operation = 2;
        this.isFormDisabled = false;
        this.originalCompanyInfo = Object.assign({}, this.selectedCompany);
    }

    cancelEdit() : void {
        this.selectedCompany = Object.assign({}, this.originalCompanyInfo);
        this.view(this.selectedCompany);
    }

    add() : void {
        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedCompany = new Company();
    }

    confirmAdd() : void {
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be adding this module.",
            confirmButtonText: "Yes, add it!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.addCompany();
                }
            }
        });
    }

    private addCompany() : void {
        try {
            this.addingCompany = true;
            this.isFormDisabled = true;

            this.companyService.addCompany(this.selectedCompany).then((result) => {
                this.addingCompany = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toastr.success(result.message);
                    this.getAll();
                    this.modal.hide();
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.addingCompany = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.addingCompany = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    confirmUpdate() : void {
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be updating this company.",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.updateCompany();
                }
            }
        });
    }

    private updateCompany() : void {
        try {
            this.deletingCompany = true;
            this.isFormDisabled = true;

            this.companyService.updateCompany(this.selectedCompany).then((result) => {
                this.deletingCompany = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toastr.success(result.message);
                    this.modal.hide();
                    this.getAll();
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.deletingCompany = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.deletingCompany = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    confirmDelete(company : Company) : void {
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be deleting this module.",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) this.deleteCompany(company);
            }
        });
    }

    private deleteCompany(company : Company) : void {
        try {
            this.deletingCompany = true;
            this.isFormDisabled = true;

            this.companyService.deleteCompany(company).then((result) => {
                this.deletingCompany = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toastr.success(result.message);
                    this.getAll();
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.deletingCompany = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.deletingCompany = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }
}