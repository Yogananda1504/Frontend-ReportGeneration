import React, { useState, useEffect } from 'react';
import InputSection from '../../../components/director/InputSection';
import StudentReport from '../../../components/Reports/student/StudentReport';
import FacultyReport from '../../../components/Reports/faculty/FacultyReport';
import { getStudentDetails } from '../../../api/services/Student';
import { getDepartments, getBranches } from '../../../api/services/director';
import { DepartmentContext } from '../../../context/DepartmentContext';
import { FacultyContext } from '../../../context/FacultyContext';
import { ClassContext } from '../../../context/ClassContext';
interface Branch {
  session: [String];
  branch: String;
}

function Dashboard() {
  const [showStudentReport, setShowStudentReport] = useState(false);
  const [showFacultyReport, setShowFacultyReport] = useState(false);
  const [scholarNumber, setScholarNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [facultyReportData, setFacultyReportData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);

  const handleUserTypeSelected = (type: string | null) => {
    if (type === 'faculty') {
      setShowStudentReport(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptData = await getDepartments();
        setDepartments(deptData);
        const branchData = await getBranches();
        setBranches(branchData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <DepartmentContext.Provider value={{ departments }}>
      <FacultyContext.Provider value={{ professors, subjects, setProfessors, setSubjects }}>
        <ClassContext.Provider value={{ branches, setBranches }}>
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col space-y-8">
                {/* Input Section */}
                <InputSection
                  onSubmit={async (enteredScholarNumber, enteredSemester) => {
                    setScholarNumber(enteredScholarNumber);
                    setSemester(enteredSemester);
                    try {
                      const details = await getStudentDetails(enteredScholarNumber, enteredSemester);
                      setStudentDetails(details[0]);
                      setShowStudentReport(true);
                      setShowFacultyReport(false);
                    } catch (error) {
                      console.error('Error fetching student details:', error);
                    }
                  }}
                  onFacultyReport={(reportData) => {
                    setFacultyReportData(reportData);
                    setShowFacultyReport(true);
                    setShowStudentReport(false);
                  }}
                  onUserTypeSelected={handleUserTypeSelected}
                />
                {/* Report Section */}
                {showStudentReport && (
                  <StudentReport
                    scholarNumber={scholarNumber}
                    studentDetails={studentDetails}
                  />
                )}
                {showFacultyReport && facultyReportData && (
                  <FacultyReport data={facultyReportData.data} />
                )}
              </div>
            </div>
          </div>
        </ClassContext.Provider>
      </FacultyContext.Provider>
    </DepartmentContext.Provider>
  );
}

export default Dashboard;
