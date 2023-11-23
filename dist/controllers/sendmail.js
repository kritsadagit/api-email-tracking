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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const utils_1 = require("../utils/utils");
const sendMail = (req, res, next) => {
    const { Sender, Recipient, MessageBody, Subject } = req.body;
    // const Server = "http://127.0.0.1:5000/api";
    const Server = "https://2192-171-103-172-250.ngrok-free.app/api";
    const phishingLink = (0, utils_1.encryptMessage)(Recipient, "phisingLink");
    // console.log("deCrypt: ", deCrypt);
    const htmlBody = "<p>" +
        MessageBody +
        "</p>" +
        `<a href="${Server}/recipients?recipient=${phishingLink}">` +
        "https://www.phishing-link.com" +
        "</a>";
    // +
    // '<img src = "' +
    // Server +
    // "/recipients/" +
    // Recipient +
    // '" style="display:none">';
    console.log("html: ", htmlBody);
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: "kritsada.buain@gmail.com",
            pass: "fvmp jnsj amlb nrvb",
        },
    });
    const mailOptions = {
        from: Sender,
        to: Recipient,
        subject: Subject,
        html: htmlBody,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transporter.sendMail(mailOptions, function (error, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error) {
                console.log(error);
            }
            else {
                try {
                    res.status(200).json({
                        result: true,
                        msg: "Send mail success",
                    });
                }
                catch (error) {
                    next(error);
                }
            }
        });
    });
};
exports.sendMail = sendMail;
//# sourceMappingURL=sendmail.js.map