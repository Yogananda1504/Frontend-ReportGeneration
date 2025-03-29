import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { Users, GraduationCap, Archive, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import StudentFields from './StudentFields';
import FacultyFields from './FacultyFields';
import ClassFields from './ClassFields';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../hooks/useAuth';
import { getStudentsByDepartment } from '../../api/services/Student';
import { getFacultyByDepartment } from '../../api/services/director';

export type UserType = 'student' | 'faculty' | 'class' | null;

interface InputSectionProps {
  onSubmit?: (scholarNumber: string, semester: string) => void;
  onFacultyReport?: (reportData: any) => void;
  onUserTypeSelected?: (type: UserType) => void;
  isHoD?: boolean;
  department?: string;
}

const HoDInputSection = ({ 
  onSubmit, 
  onFacultyReport, 
  onUserTypeSelected, 
  isHoD = false, 
  department = '' 
}: InputSectionProps) => {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [studentScholarNumber, setStudentScholarNumber] = useState('');
  const [studentSemester, setStudentSemester] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const facultyRef = useRef<any>(null);
  const toast = useToast();
  const { user } = useAuth();

  // Get department students if HOD
  const [departmentStudents, setDepartmentStudents] = useState([]);
  const [departmentFaculty, setDepartmentFaculty] = useState([]);

  useEffect(() => {
    if (isHoD && department) {
      // Fetch department-specific data
      const fetchDepartmentData = async () => {
        try {
          // These would be your API calls to get department-specific data
           const students = await getStudentsByDepartment(department);
          const faculty = await getFacultyByDepartment(department);
           setDepartmentStudents(students);
           setDepartmentFaculty(faculty);
        } catch (error) {
          console.error('Error fetching department data:', error);
        }
      };
      fetchDepartmentData();
    }
  }, [isHoD, department]);

  const handleFormSubmit = useCallback(async () => {
    if (isLoading) return;

    if (selectedType === 'student') {
      if (!studentScholarNumber.trim()) {
        toast.showError("Please enter a scholar number", "student-missing-field");
        return;
      }

      // Additional check for HOD - verify student is in their department
      {/*if (isHoD && department) {
        const student = departmentStudents.find(s => s.scholarNumber === studentScholarNumber);
        if (!student) {
          toast.showError("Student not found in your department", "student-not-in-department");
          return;
        }
      }
    */}

      setIsLoading(true);
      toast.showInfo("Fetching Student Details...", "student-report-loading");

      try {
        await onSubmit?.(studentScholarNumber, studentSemester);
        toast.showSuccess("Student data loaded successfully", "student-report-success");
      } catch (error) {
        toast.showError("Failed to fetch student details", "student-report-error");
        console.error("Error in student submission:", error);
      } finally {
        setIsLoading(false);
      }
    } else if (selectedType === 'faculty') {
      if (facultyRef.current?.submitAttendance) {
        setIsLoading(true);
        try {
          const report = await facultyRef.current.submitAttendance();
          
          // Additional check for HOD - verify faculty is in their department
         {/* if (isHoD && department && report) {
            const faculty = departmentFaculty.find(f => f.employeeCode === report.employeeCode);
            if (!faculty) {
              toast.showError("Faculty member not in your department", "faculty-not-in-department");
              return;
            }
          }
        */}

          if (report) {
            onFacultyReport?.(report);
          }
        } catch (error) {
          toast.showError("An unexpected error occurred", "faculty-report-unexpected-error");
          console.error("Error in faculty submission:", error);
        } finally {
          setIsLoading(false);
        }
      }
    } else if (selectedType === 'class') {
      // Handle class report generation with department restriction
      setIsLoading(true);
      try {
        // Your class report logic here
        // Ensure it respects department restrictions for HOD
      } catch (error) {
        toast.showError("Error generating class report", "class-report-error");
        console.error("Error in class submission:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [
    selectedType, 
    studentScholarNumber, 
    studentSemester, 
    onSubmit, 
    onFacultyReport, 
    isLoading, 
    toast,
    isHoD,
    department,
    departmentStudents,
    departmentFaculty
  ]);

  const debouncedSubmit = useMemo(() => debounce(handleFormSubmit, 300), [handleFormSubmit]);

  useEffect(() => {
    return () => {
      debouncedSubmit.cancel();
    };
  }, [debouncedSubmit]);

  // Reset loading state when switching between user types
  useEffect(() => {
    setIsLoading(false);
  }, [selectedType]);

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 flex justify-between items-center cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Input Section</h2>
          {isHoD && department && (
            <p className="text-sm text-gray-500 mt-1">
              Department: <span className="font-semibold">{department}</span>
            </p>
          )}
        </div>
        {isCollapsed ? <ChevronDown className="w-6 h-6 text-gray-500" /> : <ChevronUp className="w-6 h-6 text-gray-500" />}
      </div>

      {!isCollapsed && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            debouncedSubmit();
          }}
          className="p-6 pt-0"
        >
          {/* Department Notice for HOD */}
          {isHoD && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700">
                You are viewing data for <span className="font-semibold">{department}</span> department only
              </p>
            </div>
          )}

          {/* User Type Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <button
              type="button"
              onClick={() => {
                setSelectedType('student');
                onUserTypeSelected?.('student');
              }}
              className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
                selectedType === 'student'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
              }`}
            >
              <GraduationCap className="w-6 h-6 mr-2" />
              <span className="font-medium">Student</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedType('faculty');
                onUserTypeSelected?.('faculty');
              }}
              className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
                selectedType === 'faculty'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
              }`}
            >
              <Users className="w-6 h-6 mr-2" />
              <span className="font-medium">Faculty</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedType('class');
                onUserTypeSelected?.('class');
              }}
              className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
                selectedType === 'class'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
              }`}
            >
              <Archive className="w-6 h-6 mr-2" />
              <span className="font-medium">Class</span>
            </button>
          </div>

          {/* Dynamic Form Fields */}
          {selectedType === 'student' && (
            <StudentFields
              scholarNumber={studentScholarNumber}
              onScholarNumberChange={setStudentScholarNumber}
              semester={studentSemester}
              onSemesterChange={setStudentSemester}
              isHoD={isHoD}
              department={department}
            />
          )}
          {selectedType === 'faculty' && (
            <FacultyFields 
              ref={facultyRef} 
              isHoD={isHoD}
              department={department}
              departmentFaculty={departmentFaculty}
            />
          )}
          {selectedType === 'class' && (
            <ClassFields 
              isHoD={isHoD}
              department={department}
            />
          )}

          {/* Submit Button */}
          {selectedType && (
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
                  isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isLoading && (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                )}
                {isLoading ? 'Loading...' : 'Generate Report'}
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default HoDInputSection;