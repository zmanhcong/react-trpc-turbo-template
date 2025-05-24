import { useState } from 'react';
import { CustomPlayer } from '../components/CustomPlayer';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
}

// Hardcoded YouTube videos for testing
const hardcodedVideos: YouTubeVideo[] = [
  {
    id: 'DHcFBp266_E',
    title: 'Student Reaction Video 1',
    description: 'First video from the user-provided YouTube links.',
    thumbnailUrl: 'https://i.ytimg.com/vi/DHcFBp266_E/mqdefault.jpg',
    publishedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'TeNWKRnTRfE',
    title: 'Student Reaction Video 2',
    description: 'Second video from the user-provided YouTube links.',
    thumbnailUrl: 'https://i.ytimg.com/vi/TeNWKRnTRfE/mqdefault.jpg',
    publishedAt: '2023-01-02T00:00:00Z',
  },
  {
    id: 'WdYZTVDvhtc',
    title: 'Student Reaction Video 3',
    description: 'Third video from the user-provided YouTube links.',
    thumbnailUrl: 'https://i.ytimg.com/vi/WdYZTVDvhtc/mqdefault.jpg',
    publishedAt: '2023-01-03T00:00:00Z',
  },
  {
    id: 'xU6nWB1g7mw',
    title: 'Student Reaction Video 4',
    description: 'Fourth video from the user-provided YouTube links.',
    thumbnailUrl: 'https://i.ytimg.com/vi/xU6nWB1g7mw/mqdefault.jpg',
    publishedAt: '2023-01-04T00:00:00Z',
  },
]

export const YouTubePage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(hardcodedVideos[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use the hardcoded videos directly without API call
  const videos = hardcodedVideos;
  
  // Handle video selection
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        YouTube Learning Videos
      </h1>
      
      {isLoading ? (
        <div className="text-center p-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4">Loading videos...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {selectedVideo ? (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <CustomPlayer videoId={selectedVideo} />
                
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">
                    {videos.find(v => v.id === selectedVideo)?.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {videos.find(v => v.id === selectedVideo)?.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <p>No video selected</p>
              </div>
            )}
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg text-blue-700 mb-2">How This Works</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Watch videos for up to <span className="font-bold">10 minutes</span></li>
                <li>When time runs out, you'll need to complete a vocabulary quiz</li>
                <li>After completing the quiz, you can resume watching for another 10 minutes</li>
                <li>Learn English vocabulary while enjoying your favorite videos!</li>
              </ol>
            </div>
          </div>
          
          {/* Video List Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <h3 className="bg-blue-600 text-white font-bold p-3">
                Available Videos
              </h3>
              
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {videos.length > 0 ? (
                  videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => handleVideoSelect(video.id)}
                      className={`p-3 cursor-pointer transition-colors hover:bg-gray-100 flex ${
                        selectedVideo === video.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                      }`}
                    >
                      <div className="flex-shrink-0 w-24 h-16 mr-3">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{video.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(video.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No videos available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}