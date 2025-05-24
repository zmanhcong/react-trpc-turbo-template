import React, { useRef, useEffect, useState } from 'react';
import { VocabularyQuiz } from './VocabularyQuiz';

interface CustomPlayerProps {
  videoId: string;
}

// Maximum viewing time before quiz
const MAX_VIEWING_TIME = 20; // 20 seconds for testing
// const MAX_VIEWING_TIME = 10 * 60; // 10 minutes for production

export const CustomPlayer: React.FC<CustomPlayerProps> = ({ videoId }) => {
  const [timeRemaining, setTimeRemaining] = useState(MAX_VIEWING_TIME);
  const [showQuiz, setShowQuiz] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize the player
  useEffect(() => {
    // Create the container for our custom player
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      // Create an overlay div that will block YouTube suggestions
      const overlay = document.createElement('div');
      overlay.className = 'absolute inset-0 bg-black opacity-0 z-10';
      overlay.id = 'youtube-overlay';
      containerRef.current.appendChild(overlay);
      
      // Create the iframe with special attributes to minimize YouTube branding
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.border = 'none';
      
      // Special parameters to disable related videos
      const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&showinfo=0&modestbranding=1&controls=1&disablekb=0&enablejsapi=1&iv_load_policy=3&fs=0&origin=${encodeURIComponent(window.location.origin)}`;
      iframe.src = iframeSrc;
      
      iframe.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture';
      iframe.frameBorder = '0';
      iframe.allowFullscreen = false; // Prevent fullscreen
      
      // Add the iframe to the container
      containerRef.current.appendChild(iframe);
      
      // Set up event listener for messages from the iframe
      const handleMessage = (event: MessageEvent) => {
        try {
          if (typeof event.data === 'string') {
            const data = JSON.parse(event.data);
            if (data.event === 'onStateChange') {
              if (data.info === 0) { // Video ended
                setVideoEnded(true);
                // Show overlay to block suggestions
                const overlay = document.getElementById('youtube-overlay');
                if (overlay) {
                  overlay.style.opacity = '1';
                  overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
                  overlay.style.display = 'flex';
                  overlay.style.alignItems = 'center';
                  overlay.style.justifyContent = 'center';
                  overlay.style.flexDirection = 'column';
                  
                  // Add replay button
                  const replayButton = document.createElement('button');
                  replayButton.innerText = 'Watch Again';
                  replayButton.className = 'bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full';
                  replayButton.onclick = () => {
                    // Reload iframe to restart video
                    iframe.src = iframeSrc;
                    overlay.style.opacity = '0';
                    setVideoEnded(false);
                    // Remove the button
                    while (overlay.firstChild) {
                      overlay.removeChild(overlay.firstChild);
                    }
                  };
                  
                  overlay.appendChild(replayButton);
                }
              } else if (data.info === 1) { // Video playing
                // Start timer
                startTimer();
              } else if (data.info === 2) { // Video paused
                // Clear timer
                clearTimer();
              }
            }
          }
        } catch (e) {
          // Not our message
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [videoId]);
  
  // Timer functions
  const startTimer = () => {
    if (timerRef.current) return;
    
    timerRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          // Time's up - show quiz
          setShowQuiz(true);
          clearTimer();
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };
  
  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  // Handle quiz completion
  const handleQuizComplete = () => {
    setShowQuiz(false);
    setTimeRemaining(MAX_VIEWING_TIME); // Reset timer
  };
  
  // Format time remaining as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="relative w-full">
      {/* Custom YouTube Player */}
      <div 
        ref={containerRef} 
        className="relative w-full" 
        style={{ 
          paddingBottom: '56.25%', /* 16:9 aspect ratio */
          height: 0,
          backgroundColor: '#000'
        }}
      ></div>
      
      {/* Time Remaining Display */}
      <div className="mt-2 text-center text-lg font-medium">
        Time remaining: <span className={timeRemaining < 60 ? 'text-red-500' : ''}>{formatTime(timeRemaining)}</span>
      </div>
      
      {/* Quiz Overlay */}
      {showQuiz && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20 p-4">
          <div className="w-full max-w-xl">
            <VocabularyQuiz onQuizComplete={handleQuizComplete} />
          </div>
        </div>
      )}
    </div>
  );
};