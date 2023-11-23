"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipients = void 0;
const recipient_1 = __importDefault(require("../models/recipient"));
const utils_1 = require("../utils/utils");
const getRecipients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recipient } = req.query;
        console.log("recipient: ", recipient);
        const recipientAddress = (0, utils_1.decryptMessage)(recipient, "phisingLink");
        console.log("recipientAddress: ", recipientAddress);
        const isExistingRecipient = yield recipient_1.default.findOne({
            email: recipientAddress,
        }).exec();
        if (!isExistingRecipient) {
            const newRecipient = yield recipient_1.default.create({
                email: recipientAddress,
                lastclick: (0, utils_1.getUTC7Isodate)(),
            });
            if (!newRecipient) {
                res.status(400).json({
                    result: false,
                    msg: "Bad Request",
                });
            }
            res.status(404).send();
        }
        else {
            yield recipient_1.default.findOneAndUpdate({
                email: recipientAddress,
            }, {
                lastclick: (0, utils_1.getUTC7Isodate)(),
            }, { new: true }).exec();
            res.status(204).send();
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getRecipients = getRecipients;
//# sourceMappingURL=recipients.js.map