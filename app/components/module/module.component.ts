import { Component, OnInit } from '@angular/core';
import { Module, Modal } from '../../models/models';
import { ModuleService } from '../../services/services';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';

@Component({
    selector: 'module-component',
    templateUrl: './app/components/module/module-page.html',
    providers: [
        ModuleService,
        SwalHelper,
        ToastHelper
    ]
})

export class ModuleComponent implements OnInit {

    constructor(
        private moduleService: ModuleService, 
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }

    loading: boolean = false;
    updatingModule: boolean = false;
    addingModule: boolean = false;
    deletingModule: boolean = false;
    selectedModule: Module;
    originalData: Module;
    modules: Module[] = [];
    groups: string[];
    isFormDisabled: boolean = true;
    operation: number = 0; // 0 view, 1 add, 2 edit
    mdlModalInfo: Modal;

    ngOnInit() {
        this.mdlModalInfo = new Modal("#mdlModalInfo");
        this.getGroups();
        this.getAllModules();
    }

    getAllModules(): void {   
        this.loading = true;
        this.modules = [];

        this.moduleService.getAll().then((result) => {
            this.loading = false;

            if(result.success) {
                this.modules = result.data as Module[];
            } else {
                this.toast.error(result.message);
            }
        })
        .catch((error) => {
            this.loading = false;
            this.toast.error(error);
        });
    }

    getGroups(): void {
        this.groups = this.moduleService.getGroups();
    }

    add(): void {
        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedModule = new Module();
    }

     view(mod: Module): void {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedModule = mod;
    }

    edit(): void {
        this.operation = 2;
        this.isFormDisabled = false;
        this.originalData = this.selectedModule;
    }

    cancelEdit(): void {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedModule = this.originalData;
        this.originalData = null;
    }

    confirmAdd(): void {

        if(!this.selectedModule.moduleName.trim() && !this.selectedModule.link.trim()) {
            this.toast.warn("Please provide all the required fields.");
            return;
        }

        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this module.",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.addModule();
                }
            }
        });
    }

    addModule(): void {
        this.addingModule = true;
        this.isFormDisabled = true;

        this.moduleService.addModule(this.selectedModule).then((result) => {
            this.addingModule = false;
            this.isFormDisabled = false;

            if(result.success) {
                this.toast.success(result.message);
                this.mdlModalInfo.hide();
                this.getAllModules();   
            } else {
                this.toast.error(result.message);
            }
        })
        .catch((error) => {
            this.addingModule = false;
            this.isFormDisabled = false;
        });
    }

    confirmUpdate(): void {

        if(!this.selectedModule.moduleName.trim() && !this.selectedModule.link.trim()) {
            this.toast.warn("Please provide all the required fields.");
            return;
        }

        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be updating this module.",
            confirmButtonText: "Yes, update it!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.update();
                }
            }
        });
    }

    private update(): void {
        this.isFormDisabled = true;
        this.updatingModule = true;

        this.moduleService.updateModule(this.selectedModule).then((result) => {
            this.isFormDisabled = false;
            this.updatingModule = false;
            this.mdlModalInfo.hide();
            
            if(result.success) {
                this.toast.success(result.message);
                this.getAllModules();
                return;
            }

            this.toast.error(result.message);
        })
        .catch((error) => {
            this.isFormDisabled = false;
            this.updatingModule = false;
        });
    }

    confirmDelete(mod: Module): void {
        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be deleting this module.",
            confirmButtonText: "Yes, delete it!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.delete(mod);
                }
            }
        });
    }

    private delete(mod: Module): void {
        this.isFormDisabled = true;
        this.deletingModule = true;

        this.moduleService.deleteModule(mod).then((result) => {
            this.isFormDisabled = false;
            this.deletingModule = false;

            if(result.success) {
                this.toast.success(result.message);
                this.getAllModules();
                return;
            }
            
            this.toast.error(result.message);
        })
        .catch((error) => {
            this.isFormDisabled = false;
            this.deletingModule = false;
            this.toast.error(error);
        });
    }
}