import { Schema, model } from 'mongoose';

const ticketsCollectionName = "tickets";

export const ticketSchema = new Schema({
  code: { type: String, required: true },
  purchase_datetime: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  products: [
    {
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      subtotal: { type: Number, required: true }
    }
  ],
  __v: { type: Number, select: false }
});

export const TicketModel = model(
  ticketsCollectionName,
  ticketSchema
);