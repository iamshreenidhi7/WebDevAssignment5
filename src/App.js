import React, { useState } from 'react';
import './App.css';
import useFetch from './useFetch';

function App() {
  const [url, setUrl] = useState('https://api.escuelajs.co/api/v1/products');
  const { data, loading, error, refetch } = useFetch(url);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleFetch = () => {
    if (url.trim()) {
      refetch();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Custom Hook - useFetch Demo</h1>
        
        <div className="url-input-section">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter API URL"
            className="url-input"
          />
          <button onClick={handleFetch} className="fetch-button">
            Fetch Data
          </button>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <h3>Error occurred:</h3>
            <p>{error}</p>
            <button onClick={handleFetch} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {data && !loading && !error && (
          <div className="data-container">
            <h2>Fetched Data</h2>
            <div className="products-grid">
              {Array.isArray(data) ? (
                data.slice(0, 12).map((item, index) => (
                  <div key={item.id || index} className="product-card">
                    <div className="product-image">
                      <img 
                        src={item.images && item.images[0] ? item.images[0] : 'https://via.placeholder.com/300x200'} 
                        alt={item.title || 'Product'}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200';
                        }}
                      />
                    </div>
                    <div className="product-info">
                      <h3>{item.title || item.name || 'Untitled'}</h3>
                      <p className="product-description">
                        {item.description || 'No description available'}
                      </p>
                      <p className="product-price">
                        ${item.price || 'N/A'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="single-item">
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
