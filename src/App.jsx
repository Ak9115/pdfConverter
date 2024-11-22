import React, { useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const App = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleError = (message) => {
    setError(message);
    setLoading(false);
    setPdfUrl(null);
  };

  const handleConvert = async () => {
    if (!file) {
      handleError('Please select a file to convert.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);
    setPdfUrl(null);

    try {
      const response = await axios.post(`${apiUrl}`, formData, {
        headers: {
          'Api-Key': `${apiKey}`,
        },
      });
      setPdfUrl(response.data.outputUrl);
    } catch (err) {
      console.error('Conversion error:', err);
      handleError('Failed to convert document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>DOCX to PDF Converter</h1>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <button onClick={handleConvert} disabled={loading}>
        {loading ? 'Converting...' : 'Convert to PDF'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pdfUrl && (
        <div>
          <h2>Conversion Successful!</h2>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
