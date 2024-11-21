import React, { Profiler, useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    console.log(pdfUrl)

  },(pdfUrl,setPdfUrl))

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select a file to convert.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);
    setPdfUrl(null);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.pdfrest.com/pdf', // Replace with your API endpoint
      headers: {
        'Api-Key': 'e65f32fd-a174-46eb-8da1-af8818142f81', // Replace with your actual API key
        ...formData.getHeaders?.() || {}, // Support for Node environment
      },
      data: formData,
    };

    try {
      const response = await axios(config);
     // console.log(response.data)
      // Assuming the API responds with a URL to the converted PDF
      setPdfUrl(response.data.outputUrl); // Update key based on the API response
    } catch (error) {
      console.error('Conversion error:', error);
      setError('Failed to convert document.');
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