import React from 'react';
import DomainTable from './DomainTable';
import Chart from './Chart';
import AddDomainModal from './AddDomainModal';
import BulkUpload from './BulkUpload'; 

function Dashboard() {
  return (
    <div>
      <h2>DNS Management Dashboard</h2>
      <AddDomainModal />
      <DomainTable />
      {/* <Chart /> */}
      <BulkUpload />
    </div>
  );
}

export default Dashboard;
