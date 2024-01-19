import React from 'react';
import DatasetList from './Components/DatasetList';
import CreateDataset from './Components/CreateDataset';
import './App.css'; // Import CSS file

function App() {
  return (
    <div className="App">
      <h1>SynDy</h1>
      <CreateDataset />
      <DatasetList />
    </div>
  );
}

export default App;

