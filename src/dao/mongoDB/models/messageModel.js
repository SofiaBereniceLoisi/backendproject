import { Schema, model } from "mongoose";

const messageCollectionName = "message";

const messageSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
})

export const MessageModel = model(
    messageCollectionName,
    messageSchema
);