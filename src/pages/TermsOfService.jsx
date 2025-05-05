import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/markdown.css';

/**
 *
 */
export default function TermsOfService() {
  const [mdContent, setMdContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Adjust this path if you place privacy.md somewhere else
    fetch('/data/service.md')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load service.md (status ${res.status})`);
        }
        return res.text();
      })
      .then(text => setMdContent(text))
      .catch(err => {
        console.error(err);
        setError('Unable to load the Terms Of Service at this time.');
      });
  }, []);

  if (error) {
    return <div className="text-red-500 mt-10 text-center">{error}</div>;
  }

  if (!mdContent) {
    return <div className="text-gold mt-10 text-center">Loading Terms Of Service…</div>;
  }

  return (
    <div className="h-screen w-full overflow-y-auto no-scrollbar flex justify-center items-start">
      <div className="max-w-4xl mx-auto border border-gold rounded-xl shadow-2xl p-8 bg-dark/90 text-white my-10">
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
