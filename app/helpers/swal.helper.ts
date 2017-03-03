import { Injectable } from '@angular/core';
import { iSwal } from '../interfaces/interfaces';

declare var swal: SweetAlert.SweetAlertStatic;

@Injectable() export class SwalHelper {

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