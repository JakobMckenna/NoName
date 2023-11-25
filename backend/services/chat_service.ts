import { deleteMessage, getAllMessages, saveMessage } from "../data-access/chat_model";
import * as crypto from 'crypto';
const ChatService = {
    save: async (message: string, projectID: string, userID: number) => {
        try {
            let result = await saveMessage(message, projectID, userID);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    delete:async (messageID: string)=>{
        try {
            let result = await deleteMessage(messageID);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getAll:async (projectID: string)=>{
        try {
            let result = await getAllMessages(projectID);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    randomChatID:()=>{
        return crypto.randomBytes(10).toString("hex").slice(0, 10);
    }
}

export default ChatService;