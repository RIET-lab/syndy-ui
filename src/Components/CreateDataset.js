import React, { useState } from 'react';
import DataService from '../Api/DataService';
import './CreateDataset.css'; // Import CSS file

function CreateDataset() {
  const [topic, setTopic] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    DataService.createDataset(topic)
      .then(response => {
        alert('Dataset creation started!');
        setTopic('');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="create-dataset">
      <form onSubmit={handleSubmit}>
        <label htmlFor="topic">Dataset Topic:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default CreateDataset;
