"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var Position = (function () {
    function Position() {
        this._id = "";
        this.positionName = "";
        this.modules = [new models_1.Module()];
    }
    return Position;
}());
exports.Position = Position;
//# sourceMappingURL=position.js.map