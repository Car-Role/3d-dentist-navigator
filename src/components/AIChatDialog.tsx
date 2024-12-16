import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2, Image as ImageIcon, Send, X, Bot } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PrintingContext, { PrintingContextData } from './PrintingContext';
import ChatHistory, { ChatSession } from './ChatHistory';
import ChatMessage from './AIChatMessage';
import { nanoid } from 'nanoid';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

interface Message {
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
}

interface AIChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const systemPrompt = `You are a concise and efficient dental 3D printing assistant. Your primary goal is to help dentists quickly solve specific problems by first gathering the right context. Instead of providing long lists of potential solutions, focus on asking targeted follow-up questions to understand the exact issue.

Key Guidelines:
1. If the initial question lacks sufficient context, ask 2-3 specific follow-up questions
2. Once you have enough context, provide ONE specific solution that best matches the situation
3. Keep responses brief and actionable
4. Use bullet points sparingly - only for very short lists
5. Focus on the immediate problem at hand

When asking follow-up questions:
- Format each question with example responses in parentheses, like:
  "What is your layer height? (25μm, 50μm, 100μm)"
  "How many supports are you using? (Few: 1-5, Medium: 6-15, Many: 15+)"
  "What is your base exposure time? (30s, 45s, 60s)"

  - Start by acknowledging the issue
- Start by acknowledging the issue- If context is missing, say "To provide specific guidance, I need to know:" followed by 2-3 key questions
- Once you have sufficient context, provide ONE clear solution with specific steps
- Avoid lengthy explanations unless specifically requested

When providing solutions:
1. Start with "📋 SOLUTION:"
2. List specific steps with numbers
3. End with a "Note:" for any important warnings
4. Don't provide a recommendation to see the manufacturer's recommendations, instead provide that relavent information directly and be consise.

Format settings and values as:
- Settings: \`setting: value\`
- Example: \`Bottom Exposure: 45s\`
- Never use triple backticks (\`\`\`) for code blocks
- if there's a manufactor's structure it like this on a new line "manufacturer's name note: the note"

Areas of focus:
- Print quality issues
- Material handling
- Calibration problems
- Post-processing
- Safety concerns

Remember: Dentists need quick, specific solutions. Avoid general advice or long lists of possibilities. Get the context first, then provide targeted guidance.`;

const AIChatDialog = ({ open, onOpenChange }: AIChatDialogProps) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<PrintingContextData>({
    scanner: '',
    resin: '',
    currentPage: location.pathname,
    problemType: '',
  });
  
  // Chat history state
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('chatSessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSessionId, setCurrentSessionId] = useState<string>(nanoid());

  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const createNewSession = () => {
    const newSessionId = nanoid();
    setCurrentSessionId(newSessionId);
    setMessages([]);
    setContext({
      scanner: '',
      resin: '',
      currentPage: location.pathname,
      problemType: '',
    });
    setSelectedImages([]);
  };

  const loadSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
      setContext(session.context);
    }
  };

  const deleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (sessionId === currentSessionId) {
      createNewSession();
    }
  };

  const sendMessage = async () => {
    if ((!input.trim() && selectedImages.length === 0) || isLoading) return;

    const userMessage = input.trim();
    const userImages = [...selectedImages];
    setInput('');
    setSelectedImages([]);
    
    const newMessage: Message = {
      role: 'user',
      content: userMessage,
      images: userImages.length > 0 ? userImages : undefined,
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const contextString = `
Current Page: ${context.currentPage}
Scanner: ${context.scanner}
Resin: ${context.resin}
Problem Type: ${context.problemType}
`;

      const prompt = [
        systemPrompt,
        contextString,
        ...messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`),
        `User: ${userMessage}`
      ].join('\n\n');

      // If there are images, use multimodal capabilities
      let result;
      if (userImages.length > 0) {
        const imagesParts = await Promise.all(
          userImages.map(async (imageUrl) => {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            return {
              inlineData: {
                data: await blobToBase64(blob),
                mimeType: blob.type,
              },
            };
          })
        );

        result = await model.generateContent([prompt, ...imagesParts]);
      } else {
        result = await model.generateContent(prompt);
      }

      const response = result.response.text();
      const newAssistantMessage = { role: 'assistant' as const, content: response };
      setMessages(prev => [...prev, newAssistantMessage]);

      // Update or create session
      setSessions(prev => {
        const sessionIndex = prev.findIndex(s => s.id === currentSessionId);
        const updatedSession: ChatSession = {
          id: currentSessionId,
          title: userMessage.slice(0, 50) + (userMessage.length > 50 ? '...' : ''),
          timestamp: new Date(),
          context,
          messages: [...messages, newMessage, newAssistantMessage],
        };

        if (sessionIndex === -1) {
          return [...prev, updatedSession];
        }

        const newSessions = [...prev];
        newSessions[sessionIndex] = updatedSession;
        return newSessions;
      });

    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again or rephrase your question.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 border-b bg-white z-50 relative">
            <div className="flex items-center justify-between w-full">
              <TabsList className="bg-gray-100/50">
                <TabsTrigger value="chat" className="data-[state=active]:bg-white">Chat</TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-white">History</TabsTrigger>
              </TabsList>
              {activeTab === 'chat' && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={createNewSession}
                  className="text-gray-500 hover:text-gray-900"
                >
                  New Chat
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 data-[state=inactive]:hidden overflow-hidden">
            <div className="px-6 py-3 border-b bg-white z-40 relative">
              <PrintingContext context={context} onChange={setContext} />
            </div>

            <ScrollArea className="flex-1 px-6">
              <div className="max-w-3xl mx-auto py-6">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">How can I help you?</h3>
                    <p className="text-sm">
                      Ask me anything about dental 3D printing - from setup to troubleshooting.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <ChatMessage key={index} {...message} />
                    ))}
                  </div>
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 rounded-lg px-4 py-2 text-gray-900 shadow-sm">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-6 border-t bg-white mt-auto">
              <div className="max-w-3xl mx-auto">
                {selectedImages.length > 0 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto py-2">
                    {selectedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Selected ${index + 1}`}
                          className="h-20 w-20 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md 
                            hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="shrink-0"
                  >
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question here..."
                    className="flex-grow min-h-[2.5rem] max-h-32 bg-gray-50/50 border-gray-200 
                      focus:ring-primary/20 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={isLoading || (!input.trim() && selectedImages.length === 0)}
                    className="shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent 
            value="history" 
            className="flex-1 flex flex-col p-6 m-0 data-[state=inactive]:hidden overflow-hidden"
          >
            <div className="flex-1 overflow-hidden">
              <ChatHistory
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSelectSession={(sessionId) => {
                  loadSession(sessionId);
                  setActiveTab('chat');
                }}
                onDeleteSession={deleteSession}
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to convert blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]); // Remove data URL prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export default AIChatDialog; 