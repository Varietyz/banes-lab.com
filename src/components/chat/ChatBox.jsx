// src/components/chat/ChatBox.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useChat from './useChat';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

/**
 * ConfirmationModal Component
 * Displays an informational modal with "Confirm" and "Abort" buttons.
 * @param {object} props
 * @param {function} props.onConfirm - Called when the user confirms account creation.
 * @param {function} props.onAbort - Called when the user aborts the process.
 */
function ConfirmationModal({ onConfirm, onAbort }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gold text-center mb-4">Confirm Account Creation</h2>
        <p className="text-white text-center mb-4">
          Please note that your email is used solely for identification. We do not store your actual
          email password. For security reasons, we recommend that you create a dedicated password
          for this account. If you agree, please click "Confirm" to proceed. Otherwise, click
          "Abort" to cancel.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-gold text-dark font-bold rounded-full shadow hover:bg-accent transition duration-300">
            Confirm
          </button>
          <button
            onClick={onAbort}
            className="flex-1 py-2 border-2 border-gold text-gold font-bold rounded-full hover:bg-gray-700 transition duration-300">
            Abort
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * FinalConfirmationModal Component
 * Displays a final confirmation message after the user confirms.
 */
function FinalConfirmationModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gold text-center mb-4">Account Confirmed</h2>
        <p className="text-white text-center mb-4">
          Your account has been confirmed. Redirecting...
        </p>
      </div>
    </div>
  );
}

/**
 * ChatBox Component
 * @param {object} props
 * @param {string} props.channelId - The channel ID to use in the chat
 */
export default function ChatBox({ channelId }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Temporary token storage before confirmation
  const [tempToken, setTempToken] = useState('');

  // Chat state (only used if authenticated)
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const { messages, sendMessage, chatEndRef, addLocalMessage } = useChat(channelId);

  // Modal state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCompleted, setConfirmationCompleted] = useState(false);

  // Check for token on mount (only confirmed tokens)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
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
      // Store token and userId
      setTempToken(data.token);
      localStorage.setItem('userId', data.userId);

      if (!data.accountConfirmed) {
        // New user: show the confirmation modal.
        setShowConfirmation(true);
      } else {
        // Existing user: proceed without confirmation.
        localStorage.setItem('authToken', data.token); // <== Add this line.
        localStorage.setItem('accountConfirmed', 'true');
        window.location.reload();
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setAuthError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleConfirm = async () => {
    try {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        console.error('User ID not found; cannot create channel.');
        return;
      }
      const token = localStorage.getItem('authToken') || tempToken;

      if (!token) {
        console.error('No token found in localStorage.');
        return;
      }

      localStorage.setItem('authToken', tempToken);
      localStorage.setItem('accountConfirmed', 'true');

      setConfirmationCompleted(true);
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (err) {
      console.error('❌ Error creating channel:', err.response?.data || err.message);
    }
  };

  const handleAbort = () => {
    // On abort, clear the temporary token and close the modal
    setTempToken('');
    setShowConfirmation(false);
    console.log('User aborted account confirmation.');
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
      {/* If the confirmation modal should show, render it over everything */}
      {showConfirmation &&
        (confirmationCompleted ? (
          <FinalConfirmationModal />
        ) : (
          <ConfirmationModal onConfirm={handleConfirm} onAbort={handleAbort} />
        ))}

      {/* If not authenticated and not in confirmation, show login modal */}
      {!isAuthenticated && !showConfirmation && (
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
