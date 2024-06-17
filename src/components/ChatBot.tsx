import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import Chatbot from "./ChatScreen";

interface Chat {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: string;
}

const ChatBot = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  return <Chatbot />;
};

export default ChatBot;
