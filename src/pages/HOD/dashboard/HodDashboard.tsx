import React, { useState, useEffect } from 'react';
import InputSection from '../../../components/hod/InputSection';
import StudentReport from '../../../components/Reports/student/StudentReport';
import FacultyReport from '../../../components/Reports/faculty/FacultyReport';
import { getStudentDetails, getStudentsByDepartment } from '../../../api/services/Student';
import { getDepartments, getBranches, getDepartmentBranches } from '../../../api/services/director';
import { getFacultyByDepartment } from '../../../api/services/director';
import { DepartmentContext } from '../../../context/DepartmentContext';
import { FacultyContext } from '../../../context/FacultyContext';
import { ClassContext } from '../../../context/ClassContext';
import { ToastProvider } from '../../../context/ToastContext';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

interface Branch {
  session: [String];
  branch: String;
}

function HoDDashboard() {
  const { user } = useAuth(); // Assuming you have auth context with user data
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
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [departmentStudents, setDepartmentStudents] = useState([]);

  // Get HOD's department from user data
  const hodDepartment = user?.department;

  const handleUserTypeSelected = (type: string | null) => {
    if (type === 'faculty') {
      setShowStudentReport(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch branches for HOD's department
        if (hodDepartment) {
          const branchData = await getDepartmentBranches(hodDepartment);
          setBranches(branchData);
          
          // Fetch faculty only from HOD's department
          const facultyData = await getFacultyByDepartment(hodDepartment);
          setProfessors(facultyData);
          
          // Fetch students only from HOD's department
          const studentsData = await getStudentsByDepartment(hodDepartment);
          setDepartmentStudents(studentsData);
        }
        
        // Departments might still be needed for reference
        const deptData = await getDepartments();
        setDepartments(deptData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [hodDepartment]);

  const handleStudentSearch = async (enteredScholarNumber: string, enteredSemester: string) => {
    if (!hodDepartment) return;
    
    setScholarNumber(enteredScholarNumber);
    setSemester(enteredSemester);
    setIsLoadingReport(true);
    
    try {
      // First verify student is in HOD's department
      const student = departmentStudents.find(s => s.scholarNumber === enteredScholarNumber);
      if (!student || student.department !== hodDepartment) {
        throw new Error('Student not found in your department');
      }
      
      const details = await getStudentDetails(enteredScholarNumber, enteredSemester);
      setStudentDetails(details[0]);
      setShowStudentReport(true);
      setShowFacultyReport(false);
    } catch (error) {
      console.error('Error fetching student details:', error);
      // Show error to user
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleFacultyReport = (reportData: any) => {
    // Verify faculty is in HOD's department
    if (!reportData || !professors.some(p => p.employeeCode === reportData.employeeCode)) {
      console.error('Faculty member not in your department');
      return;
    }
    
    setFacultyReportData(reportData);
    setShowFacultyReport(true);
    setShowStudentReport(false);
  };

  return (
    <ToastProvider>
      <DepartmentContext.Provider value={{ departments: departments.filter(d => d.code === hodDepartment) }}>
        <FacultyContext.Provider value={{ 
          professors, 
          subjects, 
          setProfessors, 
          setSubjects 
        }}>
          <ClassContext.Provider value={{ branches, setBranches }}>
            <div className="min-h-screen bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {hodDepartment} Department Dashboard
                  </h1>
                  <p className="text-gray-600">Viewing data for your department only</p>
                </div>
                
                <div className="flex flex-col space-y-8">
                  {/* Input Section */}
                  <InputSection
                    onSubmit={handleStudentSearch}
                    onFacultyReport={handleFacultyReport}
                    onUserTypeSelected={handleUserTypeSelected}
                    isHoD={true}
                    department={hodDepartment}
                  />

                  {/* Loading State */}
                  {isLoadingReport && (
                    <div className="flex justify-center items-center p-12">
                      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                      <span className="ml-3 text-lg font-medium text-blue-600">Loading report data...</span>
                    </div>
                  )}

                  {/* Report Section */}
                  {!isLoadingReport && showStudentReport && (
                    <StudentReport
                      scholarNumber={scholarNumber}
                      studentDetails={studentDetails}
                      department={hodDepartment}
                    />
                  )}
                  {!isLoadingReport && showFacultyReport && facultyReportData && (
                    <FacultyReport
                      data={facultyReportData.data}
                      professorName={facultyReportData.professorName}
                      startDate={facultyReportData.startDate}
                      endDate={facultyReportData.endDate}
                      employeeCode={facultyReportData.employeeCode}
                      department={hodDepartment}
                    />
                  )}
                </div>
              </div>
            </div>
          </ClassContext.Provider>
        </FacultyContext.Provider>
      </DepartmentContext.Provider>
    </ToastProvider>
  );
}

export default HoDDashboard;