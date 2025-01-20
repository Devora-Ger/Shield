import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/default/calculateSuicidePost');
        setPosts(response.data);
      } catch (err) {
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getBackgroundColor = (percentage) => {
    if (percentage > 90) return 'red';
    if (percentage >= 70) return 'yellow';
    return 'green';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <h1>Post Reports</h1>
      <div className="post-list">
        {posts.map((post, index) => (
          <div
            key={index}
            className="post-card"
            style={{ backgroundColor: getBackgroundColor(post.suicidePercentage) }}
          >
            <h2>User: {post.username}</h2>
            <p>Content: {post.content}</p>
            <p>Suicide Percentage: {post.suicidePercentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
