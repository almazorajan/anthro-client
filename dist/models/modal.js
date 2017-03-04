"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Modal = (function () {
    function Modal(id) {
        this.id = id;
    }
    Object.defineProperty(Modal.prototype, "id", {
        get: function () {
            return this._id.replace("#", "");
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Modal.prototype.show = function () {
        $(this._id).modal("show");
    };
    Modal.prototype.hide = function () {
        $(this._id).modal("hide");
    };
    return Modal;
}());
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map