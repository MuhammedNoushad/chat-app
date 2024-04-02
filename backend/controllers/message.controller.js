import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let converstion = await Conversation.findOne({
      participants: { $all: [recieverId, senderId] },
    });

    if (!converstion) {
      converstion = await Conversation.create({
        participants: [recieverId, senderId],
      });
    }

    const messages = new Message({
      recieverId,
      senderId,
      message,
    });

    if (message) {
      converstion.messages.push(message._id);
    }

    res.status(200).json(message);
  } catch (error) {
    console.log("Error form messageController", error.message);
    res.send(500).json({ error: "Internal server error" });
  }
};
