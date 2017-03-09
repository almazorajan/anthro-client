"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var Family = (function () {
    function Family() {
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.occupation = "";
        this.contactNumbers = [new models_1.ContactNumber()];
        this.emailAddresses = [new models_1.EmailAddress()];
        this.relationship = "";
    }
    return Family;
}());
exports.Family = Family;
//# sourceMappingURL=family.js.map