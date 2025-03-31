import { LazyMotion, domAnimation, m, AnimatePresence, useInView } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Initialize Socket.IO
const socket = io('https://ws.banes-lab.com', {
  path: '/socket.io/',
  transports: ['websocket'],
  secure: true
});

// Parent container – staggers child elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    // Delay each child's entrance
    transition: {
      ease: 'easeOut',
      staggerChildren: 0.15,
      when: 'beforeChildren'
    }
  }
};

// Child elements – fade, lift up slightly, and scale from 0.95
const childVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Chat messages pop in from below quickly
const chatMessageVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: 'easeOut' }
  }
};

/**
 * Contact Page
 */
export default function Contact() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const channelId = '1354249424326361201';

  // For optional "once-in-view" on some elements
  const widgetsRef = useRef(null);
  const widgetsInView = useInView(widgetsRef, {
    once: true,
    margin: '0px 0px -100px 0px'
  });

  // Listen for socket messages
  useEffect(() => {
    socket.on('message', message => {
      setMessages(prev => [...prev, message]);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => socket.off('message');
  }, []);

  // Send message to server
  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('sendMessage', { content: input, channelId });
      setInput('');
      const timestamp = new Date().toLocaleTimeString();
      setMessages(prev => [...prev, { author: 'You', content: input, timestamp }]);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Define your “widgets” data
  const widgets = [
    {
      icon: <FaDiscord className="text-[#5865F2] text-6xl mb-3" />,
      title: 'Discord Server',
      link: 'https://discord.gg/1112028351155142736',
      style: 'bg-[#5865F2]/10 border-[#5865F2]'
    },
    {
      icon: <FaLinkedin className="text-[#0077B5] text-6xl mb-3" />,
      title: 'LinkedIn Profile',
      link: 'https://www.linkedin.com/in/jay-baleine',
      style: 'bg-[#0077B5]/10 border-[#0077B5]'
    },
    {
      icon: <FaGithub className="text-[#333] text-6xl mb-3" />,
      title: 'GitHub Repositories',
      link: 'https://github.com/Varietyz',
      style: 'bg-[#333]/10 border-[#333]'
    },
    {
      icon: <FaEnvelope className="text-gold text-6xl mb-3" />,
      title: 'Direct Email',
      link: 'mailto:jay@banes-lab.com',
      style: 'bg-gold/10 border-gold'
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div className="h-screen overflow-y-auto no-scrollbar px-4 py-20 md:py-32 scroll-smooth">
        {/* Container with parent variants */}
        <m.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl xl:max-w-6xl mx-auto border border-gold rounded-xl shadow-2xl p-8 sm:p-12 md:p-16 bg-dark/90 backdrop-blur-sm">
          {/* Child #1: Heading */}
          <m.h2
            variants={childVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-gold text-center mb-4">
            Let&apos;s Connect
          </m.h2>

          {/* Child #2: Subheading paragraph */}
          <m.p variants={childVariants} className="text-center text-lg text-light/70 mb-12">
            I&apos;m eager to discuss projects, opportunities, or collaborations.
          </m.p>

          {/* Child #3: Widgets container with once-in-view trigger */}
          <m.div
            ref={widgetsRef}
            variants={childVariants}
            // We also tie the parent's fade to "once in view" if desired:
            animate={widgetsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {widgets.map((widget, i) => (
              <m.a
                key={i}
                variants={childVariants}
                href={widget.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center rounded-xl p-6 shadow-xl border ${widget.style} cursor-pointer hover:scale-105 transition-transform duration-300`}>
                {widget.icon}
                <h3 className="text-2xl font-semibold text-gold mt-4">{widget.title}</h3>
              </m.a>
            ))}
          </m.div>

          {/* Child #4: Chat Container */}
          <m.div
            variants={childVariants}
            className="w-full max-w-4xl border border-gold rounded-xl p-4 mt-12 bg-dark/90">
            <div className="h-96 overflow-y-auto mb-4 p-4 bg-black rounded-lg text-white no-scrollbar">
              <AnimatePresence>
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <m.div
                      key={index}
                      variants={chatMessageVariant}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className={`mb-3 ${msg.author === 'You' ? 'text-accent' : 'text-light'}`}>
                      <div
                        className={`p-2 rounded-xl ${
                          msg.author === 'You' ? 'bg-accent/30 ml-auto' : 'bg-gray-800'
                        } w-fit max-w-[80%]`}>
                        <strong className="text-gold">{msg.author}</strong>
                        <p className="mt-1">{msg.content}</p>
                        <small className="block text-xs text-right text-gray-400 mt-1">
                          {msg.timestamp || new Date().toLocaleTimeString()}
                        </small>
                      </div>
                    </m.div>
                  ))
                ) : (
                  <div className="text-center text-gray-400">
                    No messages yet. Start the conversation!
                  </div>
                )}
              </AnimatePresence>
              {/* Auto-scroll anchor */}
              <div ref={chatEndRef} />
            </div>

            {/* Input and Send Button */}
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-grow p-2 rounded bg-gray-800 text-white outline-none"
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-gold text-dark rounded hover:bg-accent transition-all duration-300">
                Send
              </button>
            </div>
          </m.div>
        </m.section>
      </div>
    </LazyMotion>
  );
}
