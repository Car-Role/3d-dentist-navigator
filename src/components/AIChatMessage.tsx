import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
}

const ChatMessage = ({ role, content, images }: ChatMessageProps) => {
  const isUser = role === 'user';

  return (
    <div className={`flex items-start gap-3 mb-6 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary text-white' : 'bg-gray-100 text-primary'
      }`}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      
      <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
        <div
          className={`inline-block max-w-[85%] rounded-lg px-4 py-2 shadow-sm ${
            isUser
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-100 text-gray-900'
          }`}
        >
          {images && (
            <div className="flex flex-wrap gap-2 mb-3">
              {images.map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={img}
                  alt={`Uploaded ${imgIndex + 1}`}
                  className="max-w-[200px] rounded shadow-sm"
                />
              ))}
            </div>
          )}
          <div className={`prose ${isUser ? 'prose-invert' : ''} max-w-none text-left`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-3 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-3 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mb-3">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mb-2">{children}</h3>,
                code: ({ children }) => (
                  <code className="bg-gray-800/10 rounded px-1.5 py-0.5 text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-800/10 rounded-md p-3 overflow-x-auto my-3 text-sm font-mono">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic my-3 text-gray-600">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }) => (
                  <a 
                    href={href}
                    className="text-blue-500 hover:text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 