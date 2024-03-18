import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatState, setChatState] = useState([
    {
      id: 1,
      message: 'Hi, how can I help you?',
      sender: 'bot',
    },
    {
        id: 2,
        message: 'Hey bot',
        sender: 'user',
      },
      {
        id: 3,
        message: 'tell me your query',
        sender: 'bot',
      },
  ]);

  return (
    <ChatContext.Provider value={{ chatState, setChatState }}>
      {children}
    </ChatContext.Provider>
  );
};
