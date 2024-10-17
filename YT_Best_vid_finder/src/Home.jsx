import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [link, setLink] = useState('');
  const [videos, setVideos] = useState([]);
  const [videoCount, setVideoCount] = useState(0);

  const handleInputChange = (e) => {
    setLink(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playlistLink: link }),
      });

      const data = await response.json();
      if (response.ok) {
        setVideos(data.videos);
        setVideoCount(data.videoCount);
      } else {
        console.error("Error fetching videos", data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="home">
      <header className="header">
        <h1 className="title">Best Video Finder</h1>
        <p className="description">
          Place the YouTube playlist link below to get the best videos of the playlist in ascending order. But as per YouTube rules, only a maximum of 100 videos can be shown.
        </p>
      </header>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter YouTube Playlist Link"
          value={link}
          onChange={handleInputChange}
          className="playlist-input"
        />
        <button onClick={handleButtonClick} className="go-button">
          Go
        </button>
      </div>

      <div className="video-list">
        {videoCount > 0 ? ( 
          <>
            <h2>Number of videos in the playlist: {videoCount}</h2>
            {videos.map((video, index) => (
              <div key={index} className="video-item">
                <h3>{video.title}</h3>
                <p>Views: {video.views}</p>
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              </div>
            ))}
          </>
        ) : (
          <p className="no-videos">No videos to display. *Please enter a valid playlist link.</p>
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Vikram A. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
