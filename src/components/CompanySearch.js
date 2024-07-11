import React, { useState } from 'react';
import Select from 'react-select';
import * as XLSX from 'xlsx';

const company = [
  { label: 'Capgemini', value: 'capgemini' },
  { label: 'Tata Consultancy Services', value: 'tcs' || 'tata'},
  { label: 'Accenture', value: 'accenture' },
  // Add more colleges here
];

const dummyData = {
  capgemini: [
    { tpo_id: 1, name: 'John Doe', email: 'john@harvard.edu', college_id: 'harvard', contact: '1234567890', location: 'USA', tenth: '95%', twelfth: '90%', diploma: '85%', engineering: '80%', CGPA: '3.8', tracker_question: 'Q1' },
    // Add more dummy data here
  ],
  tcs: [
    { tpo_id: 2, name: 'Jane Doe', email: 'jane@stanford.edu', college_id: 'stanford', contact: '0987654321', location: 'USA', tenth: '92%', twelfth: '89%', diploma: '87%', engineering: '83%', CGPA: '3.9' },
    // Add more dummy data here
  ],
  accenture: [
    { tpo_id: 3, name: 'Alice Smith', email: 'alice@mit.edu', college_id: 'mit', contact: '1122334455', location: 'USA', tenth: '94%', twelfth: '91%', diploma: '86%', engineering: '85%', CGPA: '4.0' },
    // Add more dummy data here
  ],
  // Add dummy data for other colleges similarly
};

const CompanySearch = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [data, setData] = useState([]);

  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption);
    setData(dummyData[selectedOption.value] || []);
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'College Data');
    XLSX.writeFile(wb, 'college_data.xlsx');
  };

  return (
    <div>
      <Select 
        options={company} 
        onChange={handleCompanyChange} 
        placeholder="Search for a college..."
      />
      {selectedCompany && data.length > 0 ? (
        <div>
          <table border="1">
            <thead>
              <tr>
                <th>TPO ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>College ID</th>
                <th>Contact</th>
                <th>Location</th>
                <th>10th%</th>
                <th>12th%</th>
                <th>Diploma</th>
                <th>Engineering%</th>
                <th>CGPA</th>
                {selectedCompany.value === 'capgemini' && <th>Tracker Question</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.tpo_id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.college_id}</td>
                  <td>{row.contact}</td>
                  <td>{row.location}</td>
                  <td>{row.tenth}</td>
                  <td>{row.twelfth}</td>
                  <td>{row.diploma}</td>
                  <td>{row.engineering}</td>
                  <td>{row.CGPA}</td>
                  {selectedCompany.value === 'capgemini' && <td>{row.tracker_question}</td>}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={downloadExcel}>Download as Excel</button>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CompanySearch;
