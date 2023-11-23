"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipientSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    lastclick: { type: String },
}, {
    timestamps: false,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Victim", recipientSchema);
//# sourceMappingURL=recipient.js.map