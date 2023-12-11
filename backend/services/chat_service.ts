/**
 * @fileoverview Chat service this handle the business logic of chats
 */

import { deleteMessage, getAllMessages, saveMessage } from "../data-access/chat_model";
import * as crypto from 'crypto';

/**
 * ChatService is an object literal that handles chat business logic
 */
const ChatService = {
    /**
     * save , saves message to database
     * @param message this is the message being saved
     * @param projectID the chat room it was sent to
     * @param userID the user that sent it
     * @returns  message object if successfull and null if failed
     */
    save: async (message: string, projectID: string, userID: number) => {
        try {
            let result = await saveMessage(message, projectID, userID);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    /**
     * delete , deletes a message from the database based on message ID
     * @param messageID  ID of the message you want to delete
     * @returns  a message object of the deleted message
     */
    delete: async (messageID: string) => {
        try {
            let result = await deleteMessage(messageID);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    /**
     * getAll , gets messages in a project chat room
     * @param projectID this is the requested chat project room 
     * @returns  all messages in the chat room
     */
    getAll: async (projectID: string) => {
        try {
            let result = await getAllMessages(projectID);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    /**
     * randomChatID generates a random message ID to be used for live socket chats
     *              this is different from the ID generated in the database
     * @returns  a random string
     */
    randomChatID: () => {
        return crypto.randomBytes(10).toString("hex").slice(0, 10);
    },
    /**
     * send time gets time a socket message has been received
     * @returns  time iso string 
     */
    sendTime: () => {
        const result = new Date();
        return result.toISOString();
    }
};

export default ChatService;