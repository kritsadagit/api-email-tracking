import { InferSchemaType, Schema, model } from "mongoose";

const recipientSchema = new Schema(
  {
    email: { type: String, required: true },
    lastclick: { type: String },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

type Recipient = InferSchemaType<typeof recipientSchema>;

export default model<Recipient>("Victim", recipientSchema);
