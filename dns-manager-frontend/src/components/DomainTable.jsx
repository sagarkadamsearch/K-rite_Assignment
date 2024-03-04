import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DomainTable() {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/domains');
      setDomains(response.data);
    } catch (error) {
      console.error('Error fetching domains:', error);
    }
  };

  const handleDeleteDomain = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/domains/${id}`);
      fetchDomains(); // Fetch updated domains after deletion
    } catch (error) {
      console.error('Error deleting domain:', error);
    }
  };

  return (
    <div>
      <h2>Domain Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Domain</th>
            <th>Type</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {domains.map((domain) => (
            <tr key={domain._id}>
              <td>{domain.domain}</td>
              <td>{domain.type}</td>
              <td>{domain.value}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDeleteDomain(domain._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DomainTable;
