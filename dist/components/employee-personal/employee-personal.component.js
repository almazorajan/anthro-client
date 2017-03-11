"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var helpers_1 = require("../../helpers/helpers");
var models_1 = require("../../models/models");
var EmployeePersonalComponent = (function () {
    function EmployeePersonalComponent(swal, toast) {
        this.swal = swal;
        this.toast = toast;
        this.birthDate = {
            date: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDate()
            }
        };
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
            componentDisabled: this.isFormDisabled
        };
        console.log("sdfsdf");
    }
    EmployeePersonalComponent.prototype.ngOnChanges = function () {
        if (this.employee) {
            if (this.employee.birthDate) {
                var date = new Date(this.employee.birthDate);
                this.birthDate = {
                    date: {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate()
                    }
                };
            }
        }
    };
    EmployeePersonalComponent.prototype.ngOnInit = function () {
        console.log("dfdfd");
        // this.onDateChanged({
        //     date: {
        //         year: new Date(this.employee.birthDate).getFullYear(),
        //         month: new Date(this.employee.birthDate).getMonth() + 1,
        //         day: new Date(this.employee.birthDate).getDate()
        //     },
        //     jsdate: new Date(),
        //     formatted: "",
        //     epoc: 0
        // });
        // if (this.employee.birthDate) {
        //     this.birthDate = {
        //         date: {
        //             year: new Date(this.employee.birthDate).getFullYear(),
        //             month: new Date(this.employee.birthDate).getMonth() + 1,
        //             day: new Date(this.employee.birthDate).getDate()
        //         }
        //     };
        // }
    };
    // set birthDate(e) {
    //     try {
    //         var date = new Date(e.date.year, e.date.month, e.date.day);
    //         if (this.employee) {
    //             if (this.employee.birthDate) {
    //                 this.employee.birthDate = date;
    //             }
    //         }
    //         this.dateOfBirth = {
    //             date: {
    //                 year: date.getFullYear(),
    //                 month: date.getMonth() + 1,
    //                 day: date.getDate()
    //             }
    //         };
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    // get birthDate() {
    //     if (this.employee) {
    //         if (this.employee.birthDate) {
    //             var date = new Date(this.employee.birthDate);
    //             this.dateOfBirth = {
    //                 date: {
    //                     year: date.getFullYear(),
    //                     month: date.getMonth() + 1,
    //                     day: date.getDate()
    //                 }
    //             };
    //         }
    //     }
    //     return this.dateOfBirth;
    // }
    EmployeePersonalComponent.prototype.parseDate = function (dateString) {
        if (dateString) {
            return new Date(dateString);
        }
        return null;
    };
    EmployeePersonalComponent.prototype.computeAge = function (employee) {
        try {
            var birthDate = new Date(employee.birthDate);
            var birthDay = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDay());
            var diff = Date.now() - birthDay.getTime();
            this.employee.age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
        }
        catch (e) {
            this.toast.error(e);
        }
    };
    EmployeePersonalComponent.prototype.onDateChanged = function (event) {
        this.birthDate = {
            date: event.date
        };
    };
    return EmployeePersonalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Employee)
], EmployeePersonalComponent.prototype, "employee", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EmployeePersonalComponent.prototype, "operation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EmployeePersonalComponent.prototype, "isFormDisabled", void 0);
EmployeePersonalComponent = __decorate([
    core_1.Component({
        selector: 'employee-personal-component',
        templateUrl: './app/components/employee-personal/employee-personal.page.html',
        providers: [
            helpers_1.SwalHelper,
            helpers_1.ToastHelper
        ]
    }),
    __metadata("design:paramtypes", [helpers_1.SwalHelper,
        helpers_1.ToastHelper])
], EmployeePersonalComponent);
exports.EmployeePersonalComponent = EmployeePersonalComponent;
//# sourceMappingURL=employee-personal.component.js.map