/*
version: 1
Swal Service
**/

// @angular
import { Injectable } from '@angular/core';

declare var swal: SweetAlert.SweetAlertStatic;

@Injectable() export class SweetAlertService {

    confirm(title: string, message: string, callBack: (isConfirm: boolean) => void): void {

        swal({
            title: title,
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }, (isConfirm) => {

            callBack(isConfirm);
        
        });

    }

}