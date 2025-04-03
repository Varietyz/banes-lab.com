import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('https://ws.banes-lab.com', {
  path: '/socket.io/',
  transports: ['websocket'],
  secure: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 3000
});

socket.on('serverInfo', ({ version }) => {
  const storedVersion = localStorage.getItem('serverVersion');
  if (storedVersion && storedVersion !== version) {
    console.log('Server restart detected. Reloading page...');
    window.location.reload();
  }
  // Update the stored version
  localStorage.setItem('serverVersion', version);
});

/**
 * useChat Hook
 * @param {string} _channelId - The channel ID to join
 * @param userId
 */
export default function useChat(_channelId, userId) {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!_channelId) return;

    if (socket.userId) return;
    const token = localStorage.getItem('authToken');
    if (token) {
      socket.emit('authenticate', { token }); // ✅ Authenticate socket immediately if token exists
    }

    socket.on('tokenExpired', () => {
      console.warn('⏳ Session expired. Redirecting to login.');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('accountConfirmed');
      window.location.reload(); // Force re-login by refreshing the page
    });

    // Join the channel and request historical messages
    socket.on('authenticated', () => {
      // Wait for the server to confirm authentication
      console.log('✅ Authentication successful, joining channel...');
      socket.emit('joinChannel', { channelId: _channelId });
    });

    // Listen for historical messages from the backend
    socket.on('historicalMessages', historicalMessages => {
      setMessages(historicalMessages);

      // Scroll to the latest message
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    // Handle incoming messages from the backend
    const handleMessage = message => {
      console.log('Message received:', message);
      if (message.serverTimestamp) {
        message.timestamp = new Date(message.serverTimestamp).toLocaleString();
      } else if (message.timestamp && message.timestamp.includes('T')) {
        message.timestamp = new Date(message.timestamp).toLocaleString();
      } else {
        message.timestamp = new Date().toLocaleString();
      }

      setMessages(prevMessages => [...prevMessages, message]);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    socket.on('message', handleMessage);

    socket.on('connect_error', error => {
      console.error('❌ Socket connection error:', error);
    });

    socket.on('reconnect', () => {
      console.log('🔄 Socket reconnected successfully.');
      window.location.reload();
      socket.emit('join', { channelId: _channelId });
    });

    return () => {
      socket.off('message', handleMessage);
      socket.emit('leave', { channelId: _channelId });
    };
  }, [_channelId, userId]);

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
    setMessages(prev => [...prev, message]);
  }

  return {
    messages,
    sendMessage,
    chatEndRef,
    addLocalMessage
  };
}
