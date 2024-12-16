import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import AIChatDialog from './AIChatDialog';
import { cn } from '@/lib/utils';

const AIChatFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex items-center gap-3">
        <div
          className={cn(
            "text-sm font-medium text-white bg-primary px-4 py-2 rounded-full shadow-lg transition-all duration-200 transform",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
          )}
        >
          Need help?
        </div>
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <HelpCircle className="h-6 w-6" />
          )}
        </Button>
      </div>

      <AIChatDialog 
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default AIChatFAB; 