import React, { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  context: any;
  messages: any[];
}

interface ChatHistoryProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

const ChatHistory = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onDeleteSession,
}: ChatHistoryProps) => {
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  
  // Sort sessions by newest first
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (sessions.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        <p>No chat history yet</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Scroll shadow indicators */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      
      <ScrollArea className="h-[calc(85vh-8rem)] pr-4">
        <div className="space-y-2">
          {sortedSessions.map((session) => (
            <div
              key={session.id}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                ${session.id === currentSessionId
                  ? 'bg-primary/5 hover:bg-primary/10'
                  : 'hover:bg-gray-50'
                }`}
              onClick={() => onSelectSession(session.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session.title}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(session.timestamp), { addSuffix: true })}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSessionToDelete(session.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <AlertDialog open={!!sessionToDelete} onOpenChange={() => setSessionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat History</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (sessionToDelete) {
                  onDeleteSession(sessionToDelete);
                  setSessionToDelete(null);
                }
              }}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChatHistory; 