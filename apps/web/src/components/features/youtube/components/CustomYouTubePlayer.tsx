import React, { useRef, useEffect } from 'react';

interface CustomYouTubePlayerProps {
  videoId: string;
  onStateChange: (state: number) => void;
  width?: string | number;
  height?: string | number;
}

// YouTube Player States
const YT_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

export const CustomYouTubePlayer: React.FC<CustomYouTubePlayerProps> = ({
  videoId,
  onStateChange,
  width = '100%',
  height = '390',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  
  // Initialize player and setup message listener
  useEffect(() => {
    // Create custom iframe with specific parameters
    if (containerRef.current) {
      // Clear previous content
      containerRef.current.innerHTML = '';
      
      // Create iframe with specific attributes to block suggestions
      iframeRef.current = document.createElement('iframe');
      iframeRef.current.width = typeof width === 'number' ? `${width}px` : width;
      iframeRef.current.height = typeof height === 'number' ? `${height}px` : height;
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&showinfo=0&autohide=1&fs=1&playsinline=1&modestbranding=1&controls=1&hl=en&iv_load_policy=3&color=red&cc_load_policy=0`;
      iframeRef.current.frameBorder = '0';
      iframeRef.current.allowFullscreen = true;
      iframeRef.current.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      
      // Append iframe to container
      containerRef.current.appendChild(iframeRef.current);
      
      // Create YouTube API script
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }
    
    // Setup message listener for iframe events
    const handleMessage = (event: MessageEvent) => {
      if (event.source === (iframeRef.current?.contentWindow || null)) {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'onStateChange' && typeof data.info === 'number') {
            onStateChange(data.info);
          }
        } catch (e) {
          // Not a JSON message or not the expected format
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [videoId, width, height, onStateChange]);
  
  // Function to control the player (exposed for parent components)
  const playerApi = {
    playVideo: () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
          '*'
        );
      }
    },
    pauseVideo: () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*'
        );
      }
    },
    stopVideo: () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'stopVideo', args: [] }),
          '*'
        );
      }
    },
    // Add more methods as needed
  };
  
  // We directly expose the player API to parent components using a React ref
  React.useImperativeHandle(null, () => playerApi);
  
  return (
    <div className="relative">
      {/* Container for the YouTube iframe */}
      <div ref={containerRef} className="youtube-iframe-container" />
      
      {/* Custom overlay that always sits on top to block end screens and suggestions */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ zIndex: 10 }}>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent opacity-80" />
      </div>
    </div>
  );
};