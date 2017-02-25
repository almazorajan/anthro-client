"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var Family = (function () {
    function Family() {
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.occupation = "";
        this.contactNumbers = [new model_1.ContactNumber()];
        this.emailAddresses = [new model_1.EmailAddress()];
        this.relationship = "";
    }
    Family.prototype.addContactNumber = function () {
        this.contactNumbers.push(new model_1.ContactNumber());
    };
    Family.prototype.deleteContactNumber = function (contactNumber) {
        var index = this.contactNumbers.indexOf(contactNumber);
        this.contactNumbers.splice(index, 1);
    };
    Family.prototype.addEmailAddress = function () {
        this.emailAddresses.push(new model_1.EmailAddress());
    };
    Family.prototype.deleteEmailAddres = function (emailAddress) {
        var index = this.emailAddresses.indexOf(emailAddress);
        this.emailAddresses.splice(index, 1);
    };
    return Family;
}());
exports.Family = Family;
//# sourceMappingURL=family.js.map