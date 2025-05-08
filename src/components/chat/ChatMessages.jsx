// src/components/chat/ChatMessages.jsx
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * ChatMessages Component
 * @param {object} props
 * @param {Array} props.messages - Array of message objects
 * @param {object} props.chatEndRef - Ref for auto-scrolling to the latest message
 */
export default function ChatMessages({ messages, chatEndRef }) {
  const [height, setHeight] = useState(384); // Default height
  const resizerRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll just the messages box when messages change
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  // Mouse-handler for dragging to resize the chat box
  const handleMouseDown = e => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = height;

    const onMouseMove = eMove => {
      const newHeight = Math.max(250, startHeight + (eMove.clientY - startY));
      setHeight(newHeight);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div>
      {/* Scrollable chat container */}
      <div
        ref={containerRef}
        className="overflow-y-auto p-4 bg-[#14141411] border border-gold rounded-lg text-white no-scrollbar"
        style={{
          height: `${height}px`,
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const safeContent =
              typeof msg.content === 'string' && msg.content.trim() !== ''
                ? msg.content.trim()
                : '*(Empty message)*';

            return (
              <div
                key={index}
                className={`mb-3 ${msg.author === 'You' ? 'text-accent' : 'text-light'}`}>
                <div
                  className={`p-2 rounded-xl ${
                    msg.author === 'You' ? 'bg-accent/30 ml-auto' : 'bg-gray-800'
                  } w-fit max-w-[85%]`}>
                  <strong className="text-gold">{msg.author}</strong>
                  <div className="mt-1 prose prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{safeContent}</ReactMarkdown>
                  </div>
                  <small className="block text-xs text-right text-gray-400 mt-1">
                    {msg.timestamp || 'No timestamp available'}
                  </small>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-400">No messages yet. Start the conversation!</div>
        )}
        {/* Marker at the bottom so chatEndRef.scrollIntoView() scrolls this box */}
        <div ref={chatEndRef} />
      </div>

      {/* Resizer handle */}
      <div
        ref={resizerRef}
        onMouseDown={handleMouseDown}
        className="h-1 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] bg-gold cursor-row-resize mx-auto transition-all duration-300 ease-in-out"
        style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}
      />
    </div>
  );
}
