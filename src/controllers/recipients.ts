import { RequestHandler } from "express";
import RecipientModel from "../models/recipient";
import { decryptMessage, getUTC7Isodate } from "../utils/utils";

interface RecipientQuery {
  recipient: string;
}

export const getRecipients: RequestHandler<
  unknown,
  unknown,
  unknown,
  RecipientQuery
> = async (req, res, next) => {
  try {
    const { recipient } = req.query;
    console.log("recipient: ", recipient);

    const recipientAddress = decryptMessage(recipient, "phisingLink");

    console.log("recipientAddress: ", recipientAddress);

    const isExistingRecipient = await RecipientModel.findOne({
      email: recipientAddress,
    }).exec();

    if (!isExistingRecipient) {
      const newRecipient = await RecipientModel.create({
        email: recipientAddress,
        lastclick: getUTC7Isodate(),
      });

      if (!newRecipient) {
        res.status(400).json({
          result: false,
          msg: "Bad Request",
        });
      }
      res.status(404).send();

    } else {
      await RecipientModel.findOneAndUpdate(
        {
          email: recipientAddress,
        },
        {
          lastclick: getUTC7Isodate(),
        },
        { new: true }
      ).exec();
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};
