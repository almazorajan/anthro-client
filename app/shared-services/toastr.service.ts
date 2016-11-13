import { Injectable } from '@angular/core';

declare var toastr: Toastr;

toastr.options.timeOut = 2000;
toastr.options.extendedTimeOut = 2000;
toastr.options.newestOnTop = true;

@Injectable() export class ToastrService {

    warn(msg: string): void {

        toastr.warning(msg, "Wait...");

    }

    info(msg: string): void {

        toastr.info(msg, "Info");

    }

    success(msg: string): void {

        toastr.success(msg, "Success!");

    }

    error(msg: any): void {

        try {

            toastr.error((msg || msg.message).toString(), "Oops!");
            
        } catch(e) {

            toastr.error("Unable to parse " + msg, "Oops!");

        }

    }

}