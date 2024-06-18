import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: string;
  avatar?: string;
  type?: "text" | "image" | "audio";
  contentUrl?: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  const handleSendMessage = async (messageText: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
  };
  const handleResponseMessage = async (userInput: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userInput }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      const data = await response.json();
      const newMessage: Message = {
        id: messages.length + 1,
        text: data.text,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleSendMessageAndReceiveResponse = async () => {
    const messageText = input.trim();
    if (messageText) {
      handleSendMessage(messageText); // Send the user's message
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await handleResponseMessage(messageText); // Wait for the bot's response
      setInput(""); // Optionally clear the input field after sending the message
    }
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const botBgColor = useColorModeValue("gray.200", "gray.700");
  const userBgColor = useColorModeValue("blue.100", "blue.700");
  const userTextColor = useColorModeValue("black", "white");
  const timestampColor = useColorModeValue("gray.800", "gray.300");

  return (
    <Flex
      direction="column"
      h="600px"
      border="1px"
      borderColor="gray.200"
      borderRadius={30}
      overflow="hidden"
      bg={bgColor}
      justifyItems={"center"}
    >
      <VStack spacing={4} p={4} flex="1" overflowY="auto">
        {messages.map((message) => (
          <Flex
            key={message.id}
            alignItems="flex-start"
            alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}
          >
            {message.sender === "bot" && (
              <Avatar size="sm" src={message.avatar} mr={2} />
            )}
            <Box>
              <Text
                bg={message.sender === "user" ? userBgColor : botBgColor}
                color={userTextColor}
                borderRadius="15"
                p={3}
                wordBreak="break-word"
              >
                {message.text}
                <Text
                  fontSize="xs"
                  color={timestampColor}
                  textAlign="right"
                  mt={1}
                >
                  {message.timestamp}
                </Text>
              </Text>
              {message.type === "image" && (
                <Box mt={2}>
                  <img
                    src={message.contentUrl}
                    alt="Sent content"
                    style={{ borderRadius: "8px", maxWidth: "80%" }}
                  />
                </Box>
              )}
              {message.type === "audio" && (
                <Box mt={2}>
                  <audio controls>
                    <source src={message.contentUrl} type="audio/mpeg" />
                  </audio>
                </Box>
              )}
            </Box>
            {message.sender === "user" && (
              <Avatar size="sm" src={message.avatar} ml={2} />
            )}
          </Flex>
        ))}
      </VStack>
      <HStack p={4} borderTop="1px" borderColor="gray.200">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          flex="1"
        />
        <IconButton
          onClick={handleSendMessageAndReceiveResponse}
          colorScheme="blue"
          aria-label="Send message"
          icon={<FaPaperPlane />}
        />
      </HStack>
    </Flex>
  );
};

export default Chatbot;
