import React, { useState } from 'react';
import useChat from './useChat';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

/**
 * ChatBox Component
 * @param {object} props
 * @param {string} props.channelId - Identifier for the chat channel
 */
export default function ChatBox({ channelId }) {
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40); // initial ChatInput height
  const { messages, sendMessage, chatEndRef, addLocalMessage } = useChat(channelId);

  const handleSendMessage = message => {
    if (!message.trim()) return;
    const safeMessage = message.trim();
    const newMessage = {
      author: 'You',
      content: safeMessage,
      timestamp: new Date().toLocaleString(),
      channelId
    };

    addLocalMessage(newMessage);
    const messageToSend = { ...newMessage };
    delete messageToSend.timestamp;
    sendMessage(messageToSend);

    // reset after sending
    setInput('');
    setInputHeight(40);
  };

  return (
    // The parent container has no fixed height; it expands naturally.
    <section className="w-full max-w-4xl rounded-xl mt-12">
      <div className="flex flex-col">
        {/* Pass the dynamic input height so ChatMessages can reserve space */}
        <ChatMessages messages={messages} chatEndRef={chatEndRef} inputHeight={inputHeight} />
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSendMessage}
          setInputHeight={setInputHeight}
        />
      </div>
    </section>
  );
}
