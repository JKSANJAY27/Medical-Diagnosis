// Chatbot.js
import React, { useState } from 'react';
import { ChatBox } from 'react-chatbox-component';
import 'react-chatbox-component/dist/style.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = async (message) => {
    setMessages([...messages, { text: message, user: 'user' }]);
    
    try {
      // Send message to backend
      const response = await fetch('/chatbot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();

      // Display the response from Google Gemini
      setMessages([...messages, { text: message, user: 'user' }, { text: data.response, user: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...messages, { text: message, user: 'user' }, { text: "Sorry, there was an error processing your request.", user: 'bot' }]);
    }
  };

  return (
    <ChatBox
      messages={messages}
      onSend={handleSend}
    />
  );
};

export default Chatbot;
