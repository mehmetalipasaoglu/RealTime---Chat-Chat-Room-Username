import React from 'react';

interface Message {
  userName: string;
  message: string;
  timestamp: Date;
}

interface Props {
  messages: Message[];
}

const MessageContainer: React.FC<Props> = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} style={{ padding: '15px', backgroundColor: '#f0f0f0', margin: '10px 0', borderRadius: '15px' }}>
          <div style={{ fontWeight: 'bold', color: '#3f51b5' }}>{message.userName}</div>
          <div>{message.message}</div>
          <div style={{ fontSize: '0.8em', color: '#888' }}>{message.timestamp.toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
}

export default MessageContainer;
