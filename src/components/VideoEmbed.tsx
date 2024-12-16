import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';

interface VideoEmbedProps {
  videoId: string;
  title: string;
}

const VideoEmbed = ({ videoId, title }: VideoEmbedProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className={`relative ${
        isExpanded 
          ? 'fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4' 
          : ''
      }`}
    >
      <div 
        className={`relative ${
          isExpanded 
            ? isMobile 
              ? 'w-full aspect-video' 
              : 'w-full max-w-5xl aspect-video'
            : 'aspect-video'
        }`}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-lg shadow-sm"
        />
        <Button
          size="icon"
          variant="outline"
          className={`absolute top-2 right-2 bg-white/90 hover:bg-white ${
            isMobile ? 'w-8 h-8' : ''
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <Minimize2 className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
          ) : (
            <Maximize2 className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoEmbed; 