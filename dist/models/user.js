"use strict";
var model_1 = require('./model');
var User = (function () {
    function User() {
        this.userName = "";
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.password = "";
        this.dateCreated = new Date();
        this.dateUpdated = new Date();
        this.position = new model_1.Position();
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map