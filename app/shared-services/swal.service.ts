/*
version: 1
Swal Service
**/

// @angular
import { Injectable } from '@angular/core';

declare var swal: any;

@Injectable() export class SweetAlert {

    confirm(title: string, message: string, callBack: (isConfirm: boolean) => void): void {

        swal({
            title: title,
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((isConfirm) => {

            callBack(isConfirm);
        
        })

    }

}