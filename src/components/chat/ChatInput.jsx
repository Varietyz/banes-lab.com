import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

/**
 * ChatInput Component
 * @param {object} props
 * @param {string} props.input - The current input message
 * @param {function} props.setInput - Function to update the input message
 * @param {function} props.onSend - Function to send the message
 * @param {function} props.setInputHeight - Function to update the parent's reserved space
 */
export default function ChatInput({ input, setInput, onSend, setInputHeight }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef(null);
  const MAX_HEIGHT = 250; // Maximum height for the textarea
  const MAX_CHARS = 2000; // Maximum allowed characters

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, MAX_HEIGHT);
      textareaRef.current.style.height = `${newHeight}px`;
      setInputHeight(newHeight); // inform parent of the new height
    }
  };

  const handleSendMessage = e => {
    e.preventDefault();
    // Check if message length is within limit before sending
    if (input.length > MAX_CHARS) {
      setError(`Message exceeds the maximum limit of ${MAX_CHARS} characters.`);
      return;
    }
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
      setError('');
      resizeTextarea();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleEmojiClick = emojiData => {
    if (emojiData?.emoji) {
      // Prevent appending if it would exceed the max limit
      if (input.length < MAX_CHARS) {
        setInput(prev => prev + emojiData.emoji);
        resizeTextarea();
        setTimeout(() => {
          if (textareaRef.current) {
            const len = textareaRef.current.value.length;
            textareaRef.current.focus();
            textareaRef.current.selectionStart = len;
            textareaRef.current.selectionEnd = len;
          }
        }, 0);
      }
    }
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  const charsLeft = MAX_CHARS - input.length;

  return (
    <div className="relative p-2" style={{ minHeight: '40px' }}>
      {showEmojiPicker && (
        <div className="absolute bottom-12 right-0 z-50 rounded-xl shadow-lg border border-gold bg-dark p-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" skinTonesDisabled={true} />
        </div>
      )}

      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        onChange={e => {
          const value = e.target.value;
          if (value.length <= MAX_CHARS) {
            setInput(value);
            setError('');
          } else {
            setError(`You can only type up to ${MAX_CHARS} characters.`);
          }
          resizeTextarea();
        }}
        onKeyDown={handleKeyDown}
        placeholder="Type your message and press Enter..."
        className="w-full p-2 pr-10 rounded bg-gray-800 text-white outline-none resize-none overflow-y-auto no-scrollbar transition-all duration-200"
        style={{ minHeight: '40px', maxHeight: `${MAX_HEIGHT}px` }}
        maxLength={MAX_CHARS}
      />

      <div className="text-right text-xs text-gray-400 mt-1">{charsLeft} characters left</div>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}

      <button
        type="button"
        onClick={() => setShowEmojiPicker(prev => !prev)}
        className="absolute bottom-10 right-3 bg-dark border border-gold rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-150">
        😀
      </button>
    </div>
  );
}
