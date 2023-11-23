import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { encryptMessage } from "../utils/utils";

interface SendMailBody {
  Sender: string;
  Recipient: string;
  MessageBody: string;
  Subject: string;
}

export const sendMail: RequestHandler<
  unknown,
  unknown,
  SendMailBody,
  unknown
> = (req, res, next) => {
  const { Sender, Recipient, MessageBody, Subject } = req.body;
  // const Server = "http://127.0.0.1:5000/api";
  const Server = "https://2192-171-103-172-250.ngrok-free.app/api";

  const phishingLink = encryptMessage(Recipient, "phisingLink");
  // console.log("deCrypt: ", deCrypt);

  const htmlBody =
    "<p>" +
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

  const transporter = nodemailer.createTransport({
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
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error);
    } else {
      try {
        res.status(200).json({
          result: true,
          msg: "Send mail success",
        });
      } catch (error) {
        next(error);
      }
    }
  });
};
