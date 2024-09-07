import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

interface WaitingRoomProps {
  setUserName: (userName: string) => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ setUserName }) => {
  const [userName, setUserNameState] = useState<string>('');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TextField label="Username" variant="outlined" value={userName} onChange={(e) => setUserNameState(e.target.value)} />
      <Button
        sx={{
          border: '1px solid black',
          borderRadius: '2rem',
        }}
        onClick={() => setUserName(userName)}
      >
        Join
      </Button>
    </Box>
  );
};

export default WaitingRoom;
