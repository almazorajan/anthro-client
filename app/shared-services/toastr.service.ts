import { Injectable } from '@angular/core';

declare var toastr: Toastr;

toastr.options.timeOut = 2000;
toastr.options.extendedTimeOut = 2000;
toastr.options.newestOnTop = true;

@Injectable() export class ToastrService {

    warn(msg: string) {

        toastr.warning(msg, "Are you sure?");

    }

    success(msg: string) {

        toastr.success(msg, "Success!");

    }

    error(msg: string) {

        toastr.error(msg, "Oops!");

    }

}