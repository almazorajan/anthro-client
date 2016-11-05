/*
version: 1
Swal Service
**/

// @angular
import { Injectable } from '@angular/core';

interface iSwal {

    title: string;
    message: string;
    callBack(isConfirm: boolean): void;
    confirmButtonText?: string;

}

declare var swal: SweetAlert.SweetAlertStatic;

@Injectable() export class SweetAlertService {

    confirm(sweet: iSwal): void {

        swal({
            title: sweet.title,
            text: sweet.message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d9230f',
            confirmButtonText: sweet.confirmButtonText
        }, (isConfirm) => {

            sweet.callBack(isConfirm);
        
        });

    }

}