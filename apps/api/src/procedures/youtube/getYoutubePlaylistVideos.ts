import { publicProcedure } from '@api/trpc';

// Define type for YouTube video data
export interface YouTubeVideo {
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
];

// Define the YouTube playlist procedure that returns hardcoded videos
export const getYoutubePlaylistVideos = publicProcedure
  .query(() => {
    try {
      // Return the hardcoded videos instead of fetching from API
      return {
        success: true,
        videos: hardcodedVideos,
      };
    } catch (error: any) {
      console.error('Error with hardcoded videos:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to retrieve videos',
      };
    }
  });
  
  // import { publicProcedure } from '@api/trpc';
// import { z } from 'zod';
// import axios from 'axios';

// // Define type for YouTube API response
// interface YouTubeVideo {
//   id: string;
//   title: string;
//   description: string;
//   thumbnailUrl: string;
//   publishedAt: string;
// }

// // Define the YouTube playlist procedure
// export const getYoutubePlaylistVideos = publicProcedure
//   .query(async () => {
//     try {
//       // Get API key and playlist ID from environment variables
//       const apiKey = process.env.YOUTUBE_API_KEY;
//       const playlistId = process.env.YOUTUBE_PLAYLIST_ID;

//       if (!apiKey || !playlistId) {
//         throw new Error('YouTube API key or playlist ID not configured');
//       }

//       // Fetch playlist items from YouTube Data API
//       const response = await axios.get(
//         `https://www.googleapis.com/youtube/v3/playlistItems`,
//         {
//           params: {
//             part: 'snippet,contentDetails',
//             maxResults: 50,
//             playlistId,
//             key: apiKey,
//           },
//         }
//       );

//       // Transform the response into a simpler format
//       const videos: YouTubeVideo[] = response.data.items.map((item: any) => ({
//         id: item.contentDetails.videoId,
//         title: item.snippet.title,
//         description: item.snippet.description,
//         thumbnailUrl: item.snippet.thumbnails.medium.url,
//         publishedAt: item.snippet.publishedAt,
//       }));

//       return {
//         success: true,
//         videos,
//       };
//     } catch (error: any) {
//       console.error('Error fetching YouTube playlist:', error.message);
//       return {
//         success: false,
//         error: error.message || 'Failed to fetch YouTube playlist',
//       };
//     }
//   });