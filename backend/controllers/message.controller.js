import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [recieverId, senderId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [recieverId, senderId],
      });
    }

    const newMessage = new Message({
      recieverId,
      senderId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const recieverSocketId = getSocketId(recieverId);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error form setMessage controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const userId = req.user._id;

    const converstion = await Conversation.findOne({
      participants: { $all: [userId, userToChat] },
    }).populate("messages");

    if (!converstion) return res.status(200).json([]);

    const messages = converstion.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error form getMessage controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
