import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Video {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [search, setSearch] = useState('');
  const API_KEY =  "http://www.omdbapi.com/apikey.aspx?VERIFYKEY=ebcf52e1-92b7-4111-9488-448345ea2823";

  useEffect(() => {
    if (search) {
      const fetchVideo = async () => {
        try {
          const response = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`);
          setVideos(response.data.Search || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchVideo();
    }
  }, [search]);

  return (
    <div>
      <h1>Video List</h1>
      <input 
        type='text' 
        placeholder='Search for Video'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {videos.length > 0 ? (
          videos.map((video) => (
            <li key={video.imdbID}>
              <h2>{video.Title} ({video.Year})</h2>
              {video.Poster !== 'N/A' && (
                <img src={video.Poster} alt={video.Title} />
              )}
              <p>IMDB ID: {video.imdbID}</p>
              <a href={`https://www.imdb.com/title/${video.imdbID}`} target="_blank" rel="noopener noreferrer">
                View on IMDB
              </a>           
            </li>
          ))
        ) : (
          <p>No video found</p>
        )}
      </ul>
    </div>
  );
};

export default VideoList;
