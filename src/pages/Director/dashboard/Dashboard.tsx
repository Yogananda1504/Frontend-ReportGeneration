import React, { useState } from 'react';
import InputSection from '../../../components/director/InputSection';
import StudentReport from '../../../components/Reports/student/StudentReport';

function Dashboard() {
  const [showReport, setShowReport] = useState(false);
  const [scholarNumber, setScholarNumber] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-8">
          {/* Input Section */}
          <InputSection 
            onSubmit={(enteredScholarNumber) => {
              setScholarNumber(enteredScholarNumber);
              setShowReport(true);
            }} 
          />
          {/* Report Section */}
          {showReport && <StudentReport scholarNumber={scholarNumber} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
