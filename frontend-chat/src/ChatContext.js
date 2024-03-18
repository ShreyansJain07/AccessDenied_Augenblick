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
      }
  ]);
  const [cc,setCc] = useState(true)
  const [sentiment,setSentiment] = useState("Neutral");
  
  return (
    <ChatContext.Provider value={{ chatState, setChatState,sentiment,setSentiment,cc,setCc }}>
      {children}
    </ChatContext.Provider>
  );
};
