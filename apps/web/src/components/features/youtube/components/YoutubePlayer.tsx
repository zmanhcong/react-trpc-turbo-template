import React, { useState, useEffect, useRef } from 'react';
import { VocabularyQuiz } from './VocabularyQuiz';

interface YoutubePlayerProps {
  videoId: string;
}

// Add YouTube IFrame API type definition
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
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

// Maximum viewing time in seconds before showing the quiz (10 minutes)
const MAX_VIEWING_TIME = 20;
// const MAX_VIEWING_TIME = 10 * 60;

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(MAX_VIEWING_TIME);
  const [showQuiz, setShowQuiz] = useState(false);
  const timerRef = useRef<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Start timer when video starts playing
  const startTimer = () => {
    if (timerRef.current) return; // Already running
    
    timerRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          // Time's up - pause video and show quiz
          pauseVideo();
          setShowQuiz(true);
          clearTimer();
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };

  // Clear timer
  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Pause video
  const pauseVideo = () => {
    if (iframeRef.current) {
      // Using postMessage to control the YouTube iframe
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":[]}',
        '*'
      );
      setIsPlaying(false);
    }
  };

  // Play video
  const playVideo = () => {
    if (iframeRef.current) {
      // Using postMessage to control the YouTube iframe
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":[]}', 
        '*'
      );
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearTimer();
  }, []);

  // Initialize YouTube iframe API
  useEffect(() => {
    // Add YouTube iframe API script if not already loaded
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    };
    
    if (typeof window.YT === 'undefined') {
      loadYouTubeAPI();
    }
    
    // Create a new player iframe with custom parameters
    const playerContainer = document.getElementById('youtube-player-container');
    if (playerContainer) {
      playerContainer.innerHTML = '';
      
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '390';
      iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&showinfo=0&modestbranding=1&controls=1&color=red&iv_load_policy=3&playsinline=1&fs=1&origin=${encodeURIComponent(window.location.origin)}`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.frameBorder = '0';
      
      playerContainer.appendChild(iframe);
      iframeRef.current = iframe;
    }
  }, [videoId]);

  // Handle YouTube player events
  useEffect(() => {
    // Listen for messages from the YouTube iframe
    const onYouTubeStateChange = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange') {
          // Handle state changes
          if (data.info === YT_STATES.PLAYING) {
            setIsPlaying(true);
            startTimer();
          } else if (data.info === YT_STATES.PAUSED || data.info === YT_STATES.ENDED) {
            setIsPlaying(false);
            clearTimer();
          }
        }
      } catch (e) {
        // Not our message or not in expected format
      }
    };
    
    window.addEventListener('message', onYouTubeStateChange);
    
    return () => {
      window.removeEventListener('message', onYouTubeStateChange);
    };
  }, []);

  // Handle quiz completion
  const handleQuizComplete = () => {
    setShowQuiz(false);
    setTimeRemaining(MAX_VIEWING_TIME); // Reset timer
    // Resume video playback
    playVideo();
  };

  // Format time remaining as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      {/* YouTube Player Container */}
      <div className={`relative ${showQuiz ? 'opacity-30' : ''}`}>
        {/* YouTube iframe will be inserted here */}
        <div id="youtube-player-container" className="w-full h-[390px] bg-black"></div>
        
        {/* ↓↓↓ THIS IS THE KEY: Complete blocker div that sits on top of YouTube iframe */}
        <div className="absolute inset-0 pointer-events-none">
          {/* These are transparent blocks that block the YouTube suggestions */}
          <div className="absolute bottom-0 left-0 w-full h-28" style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}></div>
          <div className="absolute top-0 right-0 w-28 h-full" style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}></div>
          
          {/* This adds a subtle gradient overlay at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-30"></div>
        </div>
      </div>
      
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
      
      {/* Custom CSS is applied via className props instead */}
    </div>
  );
};