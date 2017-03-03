import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../services/services';
import { ModuleService } from '../../services/module.service';
import { SweetAlertService, ToastrService } from '../../shared-services/services';
import { Module, Position, Modal } from '../../models/model';

@Component({
    selector: 'position-component',
    templateUrl: './app/components/position/position-page.html',
    providers: [
        PositionService,
        ModuleService,
        SweetAlertService,
        ToastrService
    ]
})

export class PositionComponent implements OnInit {

    constructor(
        private positionService: PositionService,
        private moduleService: ModuleService,
        private swal: SweetAlertService,
        private toastr: ToastrService
    ) { }

    modules: Module[];
    positions: Position[];
    selectedPosition: Position;
    originalPositionInfo: Position;
    modal: Modal;
    operation: number = 0;
    moduleSelector: boolean = false;
    loadingModules: boolean;
    loadingPositions: boolean;
    addingPosition: boolean = false;
    updatingPosition: boolean = false;
    deletingPosition: boolean = false;
    isFormDisabled: boolean;

    ngOnInit() {
        this.modal = new Modal("#mdlModalInfo");
        this.getAllModules();
        this.getAllPositions();
    }

    getAllModules(): void {
        try {
            this.modules = [];
            this.loadingModules = true;
            this.isFormDisabled = true;

            this.moduleService.getAll().then((result) => {
                this.loadingModules = false;
                this.isFormDisabled = false;

                if (result.success) {
                    this.modules = result.data as Module[];
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.loadingModules = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.loadingModules = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    getAllPositions(): void {
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
        } catch(e) {
            this.loadingPositions = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    checkModules(): void {
        for (let i = 0; i < this.selectedPosition.modules.length; i++) {
            for (let j = 0; j < this.modules.length; j++) {
                if (this.selectedPosition.modules[i]._id === this.modules[j]._id) {
                    this.modules[j].selected = true;
                }
            }
        }
    }

    view(position: Position): void {
        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedPosition = position;
        this.toggleModuleSelection(false);
        this.checkModules();
    }

    add(): void {
        this.operation = 1;
        this.isFormDisabled = false;
        this.moduleSelector = false;
        this.toggleModuleSelection(false);
        this.selectedPosition = new Position();
    }

    edit(): void {
        this.operation = 2;
        this.isFormDisabled = false;
        this.moduleSelector = false;
        this.originalPositionInfo = Object.assign({}, this.selectedPosition);
    }

    cancelEdit(): void {
        this.selectedPosition = Object.assign({}, this.originalPositionInfo);
        this.view(this.selectedPosition);
    }

    private validPosition(position: Position): boolean {

        if (!this.selectedPosition.positionName.trim()) {
            this.toastr.warn("Please provide a position name.");
            return false;
        }

        this.selectedPosition.modules = [];

        for (let i = 0; i < this.modules.length; i++) {
            if (this.modules[i].selected)
                this.selectedPosition.modules.push(this.modules[i]);
        }

        if (this.selectedPosition.modules.length <= 0) {
            this.toastr.warn("Please select atleast one(1) module.");
            return false;
        }

        return true;
    }

    confirmUpdate(): void {

        this.selectedPosition.modules = [];

        if(!this.validPosition(this.selectedPosition))
            return;

        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this position",
            confirmButtonText: "Yes, Update It",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.updatePosition();
                }
            }
        });

    }

    private updatePosition(): void {

        try {
            this.updatingPosition = true;
            this.isFormDisabled = true;

            this.positionService.updatePosition(this.selectedPosition).then((result) => {
                this.updatingPosition = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toastr.success(result.message);
                    this.getAllPositions();
                    this.getAllModules();
                    this.modal.hide();
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.updatingPosition = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.updatingPosition = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    confirmAdd(): void {
        this.selectedPosition.modules = [];

        if(!this.validPosition(this.selectedPosition))
            return;

        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding a new position",
            confirmButtonText: "Yes, Add It",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.addPosition();
                }
            }
        });
    }

    private addPosition(): void {
        try {
            this.addingPosition = true;
            this.isFormDisabled = true;

            this.positionService.addPosition(this.selectedPosition).then((result) => {
                this.addingPosition = false;
                this.isFormDisabled = false;

                if (result.success) {
                    this.modal.hide();
                    this.toastr.success(result.message);
                    this.getAllPositions();
                    this.getAllModules();
                    this.toggleModuleSelection(false);
                    this.selectedPosition = new Position();
                    return;
                }

                this.toastr.error(result.message);
            })
            .catch((error) => {
                this.addingPosition = false;
                this.isFormDisabled = false;
                this.toastr.error(error.toString());
            });
        } catch (e) {
            this.addingPosition = false;
            this.isFormDisabled = false;
            this.toastr.error((e || e.message).toString());
        }
    }

    confirmDelete(position: Position): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this position",
            confirmButtonText: "Yes, Delete It",
            callBack: (isConfirm) => {

                if(isConfirm) {
                    this.delete(position);
                }
            }
        });
    }

    private delete(position: Position) {
        try {
            this.deletingPosition = true;
            this.isFormDisabled = true;
            
            this.positionService.deletePosition(position).then((result) => {
                this.deletingPosition = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.toastr.success(result.message);
                    this.getAllPositions();
                    this.getAllModules();
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.deletingPosition = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch(e) {
            this.deletingPosition = false;
            this.isFormDisabled = false;
        }
    }

    toggleModuleSelection(val: boolean) {
        for (let i = 0; i < this.modules.length; i++) {
            this.modules[i].selected = val;
        }
    }
}