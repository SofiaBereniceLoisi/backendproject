import { MessageModel } from "./models/messageModel.js";

export default class MessageManagerM {

    async getAllMessages() {
        try {
            return await MessageModel.find({});
        } catch (error) {
            throw new Error(error);
        }
    }

    async createMessage(msg){
        try {
            return MessageModel.create(msg);
        } catch (error) {
            throw new Error(error);
        }
    }

}
