"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const indexController = (req, res, next) => {
    try {
        res.send("index");
    }
    catch (error) {
        next(error);
    }
};
exports.indexController = indexController;
//# sourceMappingURL=indexcontrollers.js.map