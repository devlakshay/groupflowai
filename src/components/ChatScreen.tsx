import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
  Avatar,
  Flex,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello, Rahul how can I help you?",
      sender: "bot",
      timestamp: "10:00 AM",
      avatar: "https://bit.ly/bot-avatar",
    },
    {
      id: 2,
      text: "I want to know that my reservation is confirmed or not",
      sender: "user",
      timestamp: "10:01 AM",
    },
    {
      id: 3,
      text: "Your reservation for one-day night stay on May 12th has been confirmed",
      sender: "bot",
      timestamp: "10:02 AM",
      avatar: "https://bit.ly/bot-avatar",
    },
    {
      id: 4,
      text: "Would you also like to reserve a table at the restaurant?",
      sender: "bot",
      timestamp: "10:03 AM",
      avatar: "https://bit.ly/bot-avatar",
    },
    {
      id: 5,
      text: "What times are available can you get to me",
      sender: "user",
      timestamp: "10:04 AM",
    },
    {
      id: 6,
      text: "You can choose any of the following times:",
      sender: "bot",
      timestamp: "10:05 AM",
      avatar: "https://bit.ly/bot-avatar",
    },
    {
      id: 7,
      text: "March 4 6:00pm",
      sender: "bot",
      timestamp: "10:06 AM",
      avatar: "https://bit.ly/bot-avatar",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInput("");
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
          onClick={handleSendMessage}
          colorScheme="blue"
          aria-label="Send message"
          icon={<FaPaperPlane />}
        />
      </HStack>
    </Flex>
  );
};

export default Chatbot;
