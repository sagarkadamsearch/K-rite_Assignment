import React, { useState } from 'react';
import axios from 'axios';

function BulkUpload({ fetchDomains }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://localhost:3001/api/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchDomains(); // Fetch updated domains after bulk upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Bulk Upload</h2>
      <input type="file" accept=".csv, .json" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>
        Upload File
      </button>
    </div>
  );
}

export default BulkUpload;
