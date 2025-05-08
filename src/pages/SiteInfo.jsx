import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/markdown.css';

/**
 *
 */
export default function SiteInfo() {
  const [mdContent, setMdContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Adjust this path if you place privacy.md somewhere else
    fetch('/data/site-info.md')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load site-info.md (status ${res.status})`);
        }
        return res.text();
      })
      .then(text => setMdContent(text))
      .catch(err => {
        console.error(err);
        setError('Unable to load the site information at this time.');
      });
  }, []);

  if (error) {
    return <div className="text-red-500 mt-10 text-center">{error}</div>;
  }

  if (!mdContent) {
    return <div className="text-gold mt-10 text-center">Loading Site Information…</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto border border-gold rounded-xl shadow-2xl p-8 bg-dark/90 text-white">
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
