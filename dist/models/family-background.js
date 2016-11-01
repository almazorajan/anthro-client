"use strict";
var model_1 = require('./model');
var FamilyBackground = (function () {
    function FamilyBackground() {
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.occupation = "";
        this.contactNumbers = [new model_1.ContactNumber()];
        this.emailAddresses = [new model_1.EmailAddress()];
    }
    FamilyBackground.prototype.addContactNumber = function () {
        this.contactNumbers.push(new model_1.ContactNumber());
    };
    FamilyBackground.prototype.deleteContactNumber = function (contactNumber) {
        var index = this.contactNumbers.indexOf(contactNumber);
        this.contactNumbers.splice(index, 1);
    };
    FamilyBackground.prototype.addEmailAddress = function () {
        this.emailAddresses.push(new model_1.EmailAddress());
    };
    FamilyBackground.prototype.deleteEmailAddres = function (emailAddress) {
        var index = this.emailAddresses.indexOf(emailAddress);
        this.emailAddresses.splice(index, 1);
    };
    return FamilyBackground;
}());
exports.FamilyBackground = FamilyBackground;
//# sourceMappingURL=family-background.js.map