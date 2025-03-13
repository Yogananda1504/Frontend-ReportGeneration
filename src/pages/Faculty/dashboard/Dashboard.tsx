import React, { useEffect, useState } from 'react';
import { getEmpCode } from '../../../api/services/Faculty';
import { getFacultyDetails, getFacultyAttendance } from '../../../api/services/director';
import { ToastContainer, toast } from 'react-toastify';
import { getSubjectsByProfessor } from '../../../api/services/Common';
import InputSection from '../../../components/faculty/InputSection';
import FacultyReport from '../../../components/Reports/faculty/FacultyReport';

export function Dashboard() {
  const [name, setName] = useState('');
  const [empCode, setEmpCode] = useState<String>('');
  const [empDetails, setEmpDetails] = useState<any>({});
  const [subjects, setSubjects] = useState<any>([]);
  const [showFacultyReport, setShowFacultyReport] = useState(false);
  const [facultyReportData, setFacultyReportData] = useState<any>([]);
  const [reportStartDate, setReportStartDate] = useState(null);
  const [reportEndDate, setReportEndDate] = useState<string>(new Date().toISOString());

  useEffect(() => {
    const fetchData = async () => {
      let userData = localStorage.getItem('user'); // assume user details saved under 'user'
      // Updated: decode the name to convert '%20' into spaces.
      let empName = userData ? decodeURIComponent(JSON.parse(userData).name) : null;
      console.log('empName', empName);
      if (empName) {
        setName(empName);
        let employeeCode = await getEmpCode(empName);
        console.log("employeeCode:", employeeCode);
        setEmpCode(employeeCode);
        console.log("Fetching the faculty details");
        let details = await getFacultyDetails(employeeCode);
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
          onSelfReportSubmit={async (formData) => {
            console.log('SelfReport submitted', formData);
            try {
              const attendance = await getFacultyAttendance(
                empCode as string,
                formData.startDate ?? null,
                formData.endDate ?? new Date(),
                formData.subjectId
              );
              const effectiveEndDate = new Date(formData.endDate && formData.endDate !== '' ? formData.endDate : undefined).toISOString();
              setReportStartDate(formData.startDate);
              setReportEndDate(effectiveEndDate);
              setFacultyReportData({
                data: attendance.data, // updated to extract data property from backend response
                professorName: name,
                startDate: formData.startDate ?? null,
                endDate: effectiveEndDate,
                employeeCode: empCode as string
              });
              setShowFacultyReport(true);
            } catch (error) {
              toast.error('Error fetching attendance data');
              console.error(error);
            }
          }}
          onClassSubmit={(data) => {
            console.log('Class submitted', data);
            // ...implement class submission logic...
          }}
        />
        {showFacultyReport && facultyReportData && (
          <FacultyReport
            data={facultyReportData.data}
            professorName={facultyReportData.professorName}
            startDate={facultyReportData.startDate}
            endDate={facultyReportData.endDate}
            employeeCode={facultyReportData.employeeCode}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

