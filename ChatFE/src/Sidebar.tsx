// Sidebar.tsx
import React from "react";
import { List, ListItem, ListItemText, Box, Typography, Button } from "@mui/material";

interface SidebarProps {
  channels: string[];
  currentChannel: string;
  joinChannel: (channel: string) => void;
  leaveChannel: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ channels, currentChannel, joinChannel, leaveChannel }) => {
  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#2d2d2d",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ padding: "16px", textAlign: "center" }}>
        Channels
      </Typography>
      <List>
        {channels.map((channel) => (
          <ListItem
            button
            key={channel}
            selected={channel === currentChannel}
            onClick={() => joinChannel(channel)}
            sx={{
              "&:hover": {
                backgroundColor: "#3a3a3a",
              },
              backgroundColor: channel === currentChannel ? "#3a3a3a" : "inherit",
            }}
          >
            <ListItemText primary={channel} />
          </ListItem>
        ))}
      </List>
      {currentChannel && (
        <Box sx={{ padding: "16px", textAlign: "center", marginTop: "auto" }}>
          <Button variant="contained" color="secondary" onClick={leaveChannel}>
            Leave Channel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
