"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Modal = (function () {
    function Modal(id) {
        this.id = id;
    }
    Modal.prototype.show = function () {
        $(this.id).modal("show");
    };
    Modal.prototype.hide = function () {
        $(this.id).modal("hide");
    };
    return Modal;
}());
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map