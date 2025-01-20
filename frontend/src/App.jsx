import React, { useState } from 'react';
import {containsWordsIgnoreCase} from "./Logic"
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);


  const handlePost = () => {
    let precentage = containsWordsIgnoreCase(text);
    console.log(precentage);
    
    if (precentage >= 0.5) {
      const newMessage = {
        user: 'USER_NAME',
        location: 'USER_LOCATION',
        content: text,
      };
      setMessages([...messages, newMessage]);
    }
    setText('');
  };

  return (
    <div className="container">
      <div className="left-side">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="הקלד את ההודעה שלך..."
          className="input-text"
        />
        <button onClick={handlePost} className="post-button">POST</button>
      </div>

      <div className="right-side">
        {messages.map((msg, index) => (
          <div key={index} className="message-card">
            <h4>{msg.user} ({msg.location})</h4>
            <p>{msg.content}</p>
            <p className="warning">התראה! פוסט אובדני .</p>
            <button className="action-button">הפעל חקירה</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
