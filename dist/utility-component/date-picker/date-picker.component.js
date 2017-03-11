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
var DateModel = (function () {
    function DateModel() {
    }
    return DateModel;
}());
var DatePickerComponent = (function () {
    function DatePickerComponent() {
        this.dateChange = new core_1.EventEmitter();
        this.onUpdate = new core_1.EventEmitter();
        this.years = [];
        this.days = [];
        this.months = [];
        this.dateModel = new DateModel();
        this.availableMonths = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        this.getYears();
        this.getMonths(this.years[0]);
        this.getDays(this.months[0], this.years[0]);
    }
    DatePickerComponent.prototype.ngOnChanges = function () {
        if (this.date) {
            this.date = new Date(this.date);
            this.dateModel.day = Number(this.date.getDate());
            this.dateModel.month = String(this.months[this.date.getMonth()]);
            this.dateModel.year = this.date.getFullYear();
            this.getMonths(this.dateModel.year);
            this.getDays(this.dateModel.month, this.dateModel.year);
        }
    };
    DatePickerComponent.prototype.getDays = function (month, year) {
        var limit = 31; // default
        var isFeb = month.toLowerCase().indexOf("feb") > -1;
        var isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        var isEven = this.months.indexOf(month) % 2 === 0;
        if (isFeb) {
            limit = 28;
        }
        if (isFeb && isLeapYear) {
            limit = 29;
        }
        else {
            if (!isEven) {
                limit = 30;
            }
        }
        this.days = [];
        for (var i = 1; i <= limit; i++) {
            this.days.push(i);
        }
        this.days.reverse();
        if (this.days.indexOf(this.dateModel.day) <= -1) {
            this.dateModel.day = this.days[0];
            this.onDateChange();
        }
    };
    DatePickerComponent.prototype.getMonths = function (year) {
        this.months = [];
        var limit = this.availableMonths.length;
        if (year === new Date().getFullYear()) {
            limit = new Date().getMonth() + 1;
        }
        for (var i = 0; i < limit; i++) {
            this.months.push(this.availableMonths[i]);
        }
        this.months.reverse();
        if (this.months.indexOf(this.dateModel.month) <= -1) {
            this.dateModel.month = this.months[0];
            this.onDateChange();
        }
    };
    DatePickerComponent.prototype.getYears = function () {
        this.years = [];
        var currentYear = new Date().getFullYear();
        var limit = 80;
        for (var i = currentYear - limit; i <= currentYear; i++) {
            this.years.push(i);
        }
        this.years.reverse();
    };
    DatePickerComponent.prototype.onDateChange = function () {
        var newDate = new Date(this.dateModel.year, this.availableMonths.indexOf(this.dateModel.month), this.dateModel.day);
        this.dateChange.emit(newDate);
        this.onUpdate.emit(newDate);
    };
    return DatePickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DatePickerComponent.prototype, "date", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatePickerComponent.prototype, "dateChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatePickerComponent.prototype, "onUpdate", void 0);
DatePickerComponent = __decorate([
    core_1.Component({
        selector: 'date-picker-component',
        templateUrl: './app/utility-component/date-picker/date-picker.page.html',
        providers: []
    }),
    __metadata("design:paramtypes", [])
], DatePickerComponent);
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=date-picker.component.js.map