import { useState, useEffect } from "react";
import { Typography,Box } from "@mui/material";
import WaitingRoom from "./WaitingRoom";
import { HubConnectionBuilder, LogLevel, HubConnection } from "@microsoft/signalr";
import Sidebar from "./Sidebar";
import ChatRoom from "./Chatrom";

interface Message {
  userName: string;
  message: string;
  timestamp: Date;
}

function App() {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChannel, setCurrentChannel] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const channels = ["Local 1", "Local 2", "Local 3", "Local 3", "Local 4", "Local 5", "Local 6", "Local 7", "Local 8", "Local 9"];

  const joinChannel = async (channel: string) => {
    if (currentChannel) {
      await leaveChannel();
    }

    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5207/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("JoinSpecificChatRoom", (userName: string, message: string) => {
        console.log(userName, message);
      });

      connection.on("ReceiveSpecificMessage", (userName: string, message: string) => {
        setMessages((messages) => [...messages, { userName, message, timestamp: new Date() }]);
      });

      await connection.start();
      console.log("Connection started");

      await connection.invoke("JoinSpecificChatRoom", { username: userName, chatRoom: channel });
      console.log("JoinSpecificChatRoom invoked");

      setConnection(connection);
      setCurrentChannel(channel);
    } catch (e) {
      console.log(e);
    }
  };

  const leaveChannel = async () => {
    try {
      await connection?.invoke("LeaveSpecificChatRoom", { username: userName, chatRoom: currentChannel });
      connection?.stop();
      setConnection(null);
      setMessages([]);
      setCurrentChannel("");
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {!userName ? (
        <WaitingRoom setUserName={setUserName} />
      ) : (
        <>
          <Sidebar
            channels={channels}
            currentChannel={currentChannel}
            joinChannel={joinChannel}
            leaveChannel={leaveChannel}
          />
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                fontStyle: "italic",
                padding: "10px",
              }}
            >
              Hello Chat App
            </Typography>
            {currentChannel ? (
              <ChatRoom messages={messages} sendMessage={sendMessage} />
            ) : (
              <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <Typography variant="h6">Select a channel to join the chat</Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;
