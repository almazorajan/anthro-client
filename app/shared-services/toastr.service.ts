import { Injectable } from '@angular/core';

declare var toastr: Toastr;

toastr.options.timeOut = 2000;
toastr.options.extendedTimeOut = 2000;
toastr.options.newestOnTop = true;

@Injectable() export class ToastrService {

    warn(msg: string) {

        toastr.warning(msg, "Wait...");

    }

    success(msg: string) {

        toastr.success(msg, "Success!");

    }

    error(msg: any) {

        try {

            toastr.error((msg || msg.message).toString(), "Oops!");
            
        } catch(e) {

            toastr.error("Unable to parse " + msg, "Oops!");

        }

    }

}