// 📂 src/components/chat/useChat.js
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Ensure the socket is created once and reused
const socket = io('https://ws.banes-lab.com', {
  path: '/socket.io/',
  transports: ['websocket'],
  secure: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 3000
});

/**
 * useChat Hook
 * @param {string} _channelId - The channel ID to join
 */
export default function useChat(_channelId) {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!_channelId) return;

    // Join the channel
    socket.emit('join', { channelId: _channelId });

    // Handle incoming messages from the backend
    socket.on('message', message => {
      console.log('Message received:', message);

      // ✅ Apply a local timestamp if not provided by the server
      if (message.serverTimestamp) {
        message.timestamp = new Date(message.serverTimestamp).toLocaleString(); // Convert ISO to readable format
      } else if (message.timestamp && message.timestamp.includes('T')) {
        message.timestamp = new Date(message.timestamp).toLocaleString(); // Format ISO string to readable format
      } else {
        message.timestamp = new Date().toLocaleString(); // ✅ Generate a local timestamp as fallback
      }

      setMessages(prevMessages => [...prevMessages, message]);

      // ✅ Scroll to the latest message
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    socket.on('connect_error', error => {
      console.error('Socket connection error:', error);
    });

    socket.on('reconnect', () => {
      console.log('Socket reconnected successfully.');
      socket.emit('join', { channelId: _channelId });
    });

    return () => {
      socket.off('message');
      socket.emit('leave', { channelId: _channelId });
    };
  }, [_channelId]);

  /**
   * Sends a message to the server
   * @param {Object} payload - Message data
   */
  function sendMessage(payload) {
    const serverTimestamp = new Date().toISOString(); // ✅ Always use ISO format for the server
    payload.serverTimestamp = serverTimestamp;
    socket.emit('sendMessage', payload, response => {
      console.log('Message sent successfully:', response);
    });
  }

  /**
   * Adds a local message directly to the messages state
   * @param {Object} message - The message object to be added
   */
  function addLocalMessage(message) {
    message.timestamp = new Date().toLocaleString(); // ✅ Local readable timestamp
    console.log('Formatted Local Message Timestamp:', message.timestamp); // Debugging log
    setMessages(prev => [...prev, message]);

    // ✅ Scroll to the latest message
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return {
    messages,
    sendMessage,
    chatEndRef,
    addLocalMessage
  };
}
