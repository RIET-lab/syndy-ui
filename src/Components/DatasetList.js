import React, { useState, useEffect } from 'react';
import DataService from '../Api/DataService';
import './DatasetList.css'; // Import CSS file

function DatasetList() {
  const [datasets, setDatasets] = useState([]);
  const [expandedDatasetId, setExpandedDatasetId] = useState(null);
  const [sampleData, setSampleData] = useState({});

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = () => {
    DataService.listDatasets()
      .then(response => {
        setDatasets(response.data["topics"]);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  function filterData(data) {
    // Find indices where op returns true for any of the arrays
    const indicesToRemove = new Set();
    data.queries.forEach((element, index) => {
        if (data.claims[index].length === 0 || data.topics[index].length === 0) {
            indicesToRemove.add(index);
        }
    });

    // Filter each array to remove elements at the indices found
    data.queries = data.queries.filter((_, index) => !indicesToRemove.has(index));
    data.claims = data.claims.filter((_, index) => !indicesToRemove.has(index));
    data.topics = data.topics.filter((_, index) => !indicesToRemove.has(index));
    return data;
}

  const handleCardClick = (datasetId) => {
    if (expandedDatasetId === datasetId) {
      setExpandedDatasetId(null);
    } else {
      setExpandedDatasetId(datasetId);
      if (!sampleData[datasetId]) {
        DataService.sampleDataset(datasetId)
          .then(response => {
            response.data = filterData(response.data);
            setSampleData({ ...sampleData, [datasetId]: response.data });
          })
          .catch(error => {
            console.error('Error fetching sample data', error);
          });
      }
    }
  };

  const renderTable = (header, data) => (
    <table>
      <thead>
        <tr>
          <th>{header}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderSampleData = (data) => {
    return data.queries.map((query, index) => (
      <div key={index} className="sample-data-section">
        <h4>Query: {query}</h4>
        {renderTable('Claims', data.claims[index])}
        {renderTable('Topics', data.topics[index])}
      </div>
    ));
  };

  return (
    <div className="dataset-list">
      <h2>List of Datasets</h2>
      <button className="refresh-button" onClick={fetchDatasets}>Refresh</button>
      <div className="dataset-container">
        {datasets.map(dataset => (
          <div key={dataset} className={`dataset-card ${expandedDatasetId === dataset ? 'expanded' : ''}`} onClick={() => handleCardClick(dataset)}>
            <h3>{dataset}</h3>
            <p>ID: {dataset}</p>
            {expandedDatasetId === dataset && sampleData[dataset] && (
              <div className="dataset-sample">
                {renderSampleData(sampleData[dataset])}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatasetList;
