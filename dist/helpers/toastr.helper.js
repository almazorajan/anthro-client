"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
toastr.options.timeOut = 2000;
toastr.options.extendedTimeOut = 2000;
toastr.options.newestOnTop = true;
var ToastrService = (function () {
    function ToastrService() {
    }
    ToastrService.prototype.warn = function (msg) {
        toastr.warning(msg, "Wait...");
    };
    ToastrService.prototype.info = function (msg) {
        toastr.info(msg, "Info");
    };
    ToastrService.prototype.success = function (msg) {
        toastr.success(msg, "Success!");
    };
    ToastrService.prototype.error = function (msg) {
        try {
            toastr.error((msg || msg.message).toString(), "Oops!");
        }
        catch (e) {
            toastr.error("Unable to parse " + msg, "Oops!");
        }
    };
    return ToastrService;
}());
ToastrService = __decorate([
    core_1.Injectable()
], ToastrService);
exports.ToastrService = ToastrService;
//# sourceMappingURL=toastr.helper.js.map