import React, { useEffect, useState } from 'react';
import { getEmpCode } from '../../../api/services/Faculty';
import { getFacultyDetails } from '../../../api/services/director';
import { ToastContainer, toast } from 'react-toastify';
import { getSubjectsByProfessor } from '../../../api/services/Common';
import InputSection from '../../../components/faculty/InputSection';

export function Dashboard() {
  const [name, setName] = useState('');
  const [empCode, setEmpCode] = useState<String>('');
  const [empDetails, setEmpDetails] = useState<any>({});
  const [subjects, setSubjects] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      let userData = localStorage.getItem('user'); // assume user details saved under 'user'
      // Updated: decode the name to convert '%20' into spaces.
      let empName = userData ? decodeURIComponent(JSON.parse(userData).name) : null;
      console.log('empName', empName);
      if (empName) {
        setName(empName);
        let employeeCode = await getEmpCode(empName);
        setEmpCode(employeeCode as String);
        let details = await getFacultyDetails(employeeCode as string);
        setEmpDetails(details);
        let subjects = await getSubjectsByProfessor(employeeCode as string);
        setSubjects(subjects);
      } else {
        toast.error('Name not found');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Faculty Input Section */}
        <InputSection
          onTimetableSubmit={(data) => {
            console.log('Timetable submitted', data);
            // ...implement timetable submission logic...
          }}
          onSelfReportSubmit={(data) => {
            console.log('SelfReport submitted', data);
            // ...implement selfReport submission logic...
          }}
          onClassSubmit={(data) => {
            console.log('Class submitted', data);
            // ...implement class submission logic...
          }}
        />


      </div>
      <ToastContainer />
    </>
  );
}

