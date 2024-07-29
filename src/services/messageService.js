import MessageManagerM from "../persistence/dao/mongoDB/messageManagerM.js";
const messageDao = new MessageManagerM();

export const getAllMessages = async () => {
    try {
       return await messageDao.getAllMessages()
    } catch (error) {
       throw new Error(error)
    }
}

export const createMessage = async (obj) => {
    try {
       return await messageDao.createMessage(obj);
    } catch (error) {
        throw new Error(error)
    }
}


