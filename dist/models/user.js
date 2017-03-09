"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var User = (function () {
    function User() {
        this.userName = "";
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.password = "";
        this.dateCreated = new Date();
        this.dateUpdated = new Date();
        this.position = new models_1.Position();
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map