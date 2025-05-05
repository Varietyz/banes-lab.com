import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('https://ws.banes-lab.com', {
  path: '/socket.io/',
  transports: ['websocket'],
  withCredentials: true,
  secure: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 3000
});

// Listen for server version info (to detect restarts)
socket.on('serverInfo', ({ version }) => {
  const storedVersion = localStorage.getItem('serverVersion');
  if (storedVersion && storedVersion !== version) {
    console.log('Server restart detected. Reloading page...');
    window.location.reload();
  }
  localStorage.setItem('serverVersion', version);
});

/**
 * useChat Hook
 * @param {string} _channelId - The channel ID to join
 */
export default function useChat(_channelId) {
  const [messages, setMessages] = useState([]);
  const [authExpired, setAuthExpired] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!_channelId) return;
    socket.emit('joinChannel', { channelId: _channelId }, historicalMessages => {
      if (historicalMessages) {
        setMessages(historicalMessages);
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });

    socket.emit('authenticate');

    socket.on('tokenExpired', () => {
      console.warn('⏳ Session expired. Prompting re-login.');
      // Set state to show the auth modal instead of reloading immediately
      setAuthExpired(true);
    });

    // Listen for the server's authenticated event (after server-side cookie check)
    socket.on('authenticated', () => {
      console.log('✅ Authentication successful, joining channel...');
      socket.emit('joinChannel', { channelId: _channelId });
    });

    socket.on('channelNotFound', data => {
      console.warn('Channel not found, reloading page:', data.message);
      // Optionally, display an error message or prompt
      setAuthExpired(true);
    });

    socket.on('userNotFound', data => {
      console.warn('User not found, reloading page:', data.message);
      setAuthExpired(true);
    });

    // Listen for historical messages from the backend
    socket.on('historicalMessages', historicalMessages => {
      setMessages(historicalMessages);
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
      // Optionally reload to reinitialize authentication after reconnection
      window.location.reload();
      socket.emit('joinChannel', { channelId: _channelId });
    });

    return () => {
      socket.off('message', handleMessage);
      socket.emit('leave', { channelId: _channelId });
    };
  }, [_channelId]);

  /**
   * Sends a message to the server
   * @param {Object} payload - Message data
   */
  function sendMessage(payload) {
    const serverTimestamp = new Date().toISOString(); // Always use ISO format for the server
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
    message.timestamp = new Date().toLocaleString(); // Local readable timestamp
    setMessages(prev => [...prev, message]);
  }

  return {
    messages,
    sendMessage,
    chatEndRef,
    addLocalMessage,
    authExpired,
    resetAuth: () => setAuthExpired(false)
  };
}
