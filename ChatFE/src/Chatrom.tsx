import React from "react";
import { Box } from "@mui/material";
import MessageContainer from "./MessageContainer";
import SentMessageForm from "./SentMessagForm";

interface Message {
  userName: string;
  message: string;
  timestamp: Date;
}

interface Props {
  messages: Message[];
  sendMessage: (message: string) => void;
}

const ChatRoom: React.FC<Props> = ({ messages, sendMessage }) => {
  return (
    <Box sx={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ textAlign: "center", marginBottom: "10px", fontSize: "0.9em", color: "#666" }}>
        {new Date().toLocaleDateString()}
      </Box>
      <Box sx={{ flex: 1, overflowY: "auto", marginBottom: "20px" }}>
        <MessageContainer messages={messages} />
      </Box>
      <SentMessageForm sendMessage={sendMessage} />
    </Box>
  );
};

export default ChatRoom;
