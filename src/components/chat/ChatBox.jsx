// src/components/chat/ChatBox.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useChat from './useChat';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

/**
 * ChatBox Component
 * @param {object} props
 * @param {string} props.channelId - The channel ID to use in the chat
 */
export default function ChatBox({ channelId }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError] = useState('');

  // Chat state (only used if authenticated)
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const { messages, sendMessage, chatEndRef, addLocalMessage } = useChat(channelId);

  // Check for token on mount (only confirmed tokens)
  useEffect(() => {
    axios
      .get('https://ws.banes-lab.com/api/checkAuth', { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

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
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    const messageToSend = { ...newMessage };
    delete messageToSend.timestamp;
    sendMessage(messageToSend);
    setInput('');
    setInputHeight(40);
  };

  return (
    <section className="w-full max-w-4xl rounded-xl mt-12 relative">
      {/* If not authenticated, show the OAuth login modal */}
      {!isAuthenticated && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gold text-center mb-4">🗨️ Chat Login</h2>
            {authError && <p className="text-red-500 text-center mb-4">{authError}</p>}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => (window.location.href = 'https://ws.banes-lab.com/api/auth/discord')}
                className="w-full py-2 bg-indigo-600 text-white font-bold rounded-full shadow hover:bg-indigo-700 transition duration-300">
                🔐 Login with Discord
              </button>

              <button
                onClick={() => (window.location.href = 'https://ws.banes-lab.com/api/auth/google')}
                className="w-full py-2 bg-red-600 text-white font-bold rounded-full shadow hover:bg-red-700 transition duration-300">
                🔐 Login with Google
              </button>

              <button
                onClick={() => (window.location.href = 'https://ws.banes-lab.com/api/auth/github')}
                className="w-full py-2 bg-gray-800 text-white font-bold rounded-full shadow hover:bg-gray-900 transition duration-300">
                🔐 Login with GitHub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat interface */}
      <div className="flex flex-col">
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
