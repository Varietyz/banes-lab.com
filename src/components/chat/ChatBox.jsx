// src/components/chat/ChatBox.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useChat from './useChat';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

/**
 *
 * @param root0
 * @param root0.channelId
 */
export default function ChatBox({ channelId }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Chat state (only used if authenticated)
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const { messages, sendMessage, chatEndRef, addLocalMessage } = useChat(channelId);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    console.log('📥 Sending login request...');

    try {
      const { data } = await axios.post(
        'https://ws.banes-lab.com:8040/api/login',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );

      console.log('✅ Received successful response:', data);
      localStorage.setItem('authToken', data.token);
      setIsAuthenticated(true);
      setAuthError('');
      window.location.reload();
    } catch (error) {
      console.error('❌ Error during login request:', error.response?.data || error.message);
      setAuthError(error.response?.data?.message || 'Login failed');
    }
  };

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
    setInput('');
    setInputHeight(40);
  };

  return (
    <section className="w-full max-w-4xl rounded-xl mt-12 relative">
      {/* Modal overlay shown if not authenticated */}
      {!isAuthenticated && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gold text-center mb-4">Chat Login</h2>
            {authError && <p className="text-red-500 text-center mb-4">{authError}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-gold"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gold text-dark font-bold rounded-full shadow hover:bg-accent transition duration-300">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Chat interface is rendered regardless but interaction is blocked by the modal if not logged in */}
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
