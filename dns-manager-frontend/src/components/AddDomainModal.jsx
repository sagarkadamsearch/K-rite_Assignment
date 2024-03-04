import React, { useState } from 'react';
import axios from 'axios';

function AddDomainModal({ showModal, handleClose, fetchDomains }) {
  const [domain, setDomain] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');

  const handleAddDomain = async () => {
    try {
      await axios.post('http://localhost:3001/api/domains', { domain, type, value });
      fetchDomains(); // Fetch updated domains after adding
      handleClose(); // Close the modal
    } catch (error) {
      console.error('Error adding domain:', error);
    }
  };

  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Domain</h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="domain" className="form-label">
                  Domain:
                </label>
                <input type="text" className="form-control" id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Type:
                </label>
                <input type="text" className="form-control" id="type" value={type} onChange={(e) => setType(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="value" className="form-label">
                  Value:
                </label>
                <input type="text" className="form-control" id="value" value={value} onChange={(e) => setValue(e.target.value)} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAddDomain}>
              Add Domain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDomainModal;
