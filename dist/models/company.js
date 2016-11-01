"use strict";
var model_1 = require('./model');
var Company = (function () {
    function Company() {
        this._id = "";
        this.companyName = "";
        this.companyAddress = new model_1.Address();
        this.contactNumbers = [new model_1.ContactNumber()];
        this.emailAddresses = [new model_1.EmailAddress()];
    }
    return Company;
}());
exports.Company = Company;
;
//# sourceMappingURL=company.js.map