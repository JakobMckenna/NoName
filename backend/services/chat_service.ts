import { deleteMessage, saveMessage } from "../data-access/chat_model";

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
    }
}

export default ChatService;