// Mock data generator for single student attendance system

const studentDetails = {
    scholarNo: "2311201101",
    studentName: "QASEEMA FATIMA RIZVI",
    course: "B-tech",
    branch: "CSE",
    semester: "III",
    section: "01",
    session: "2023-27"
  };
  
  // 1. Overall Attendance Data (Semester-wise for all subjects)
  const overallAttendanceData = {
    studentInfo: { ...studentDetails },
    semesterSummary: {
      totalClasses: 230, // updated total classes
      attendedClasses: 200,
      overallPercentage: 87.0,
      subjectsData: [
        {
          subjectId: "66963f0bb7cadc536c558204",
          subjectName: "Data Structures",
          subjectCode: "CS-301",
          professorName: "Dr. Amit Kumar",
          totalClasses: 50,
          attendedClasses: 47,
          percentage: 94.0
        },
        {
          subjectId: "66963f0bb7cadc536c558205",
          subjectName: "Database Management",
          subjectCode: "CS-302",
          professorName: "Dr. Priya Singh",
          totalClasses: 50,
          attendedClasses: 42,
          percentage: 84.0
        },
        {
          subjectId: "66963f0bb7cadc536c558206",
          subjectName: "Computer Networks",
          subjectCode: "CS-303",
          professorName: "Dr. Rajesh Verma",
          totalClasses: 50,
          attendedClasses: 47,
          percentage: 94.0
        },
        {
          subjectId: "66963f0bb7cadc536c558207",
          subjectName: "Operating Systems",
          subjectCode: "CS-304",
          professorName: "Dr. Sarah Wilson",
          totalClasses: 50,
          attendedClasses: 44,
          percentage: 88.0
        },
        {
          subjectId: "66963f0bb7cadc536c558208",
          subjectName: "Software Engineering",
          subjectCode: "CS-305",
          professorName: "Dr. Mark Allen",
          totalClasses: 30,
          attendedClasses: 28,
          percentage: 93.33
        },
        {
          subjectId: "66963f0bb7cadc536c558209",
          subjectName: "Artificial Intelligence",
          subjectCode: "CS-306",
          professorName: "Dr. Nina Gupta",
          totalClasses: 30,
          attendedClasses: 26,
          percentage: 86.67
        }
      ]
    }
  };
  
  // 2. Daily Attendance Report (Date range based)
  const dailyAttendanceData = {
    studentInfo: { ...studentDetails },
    dateRange: {
      startDate: "2024-07-22",
      endDate: "2024-07-27"
    },
    dailyRecords: [
      {
        date: "2024-07-22",
        dayOfWeek: "Monday",
        classes: [
          {
            subjectId: "66963f0bb7cadc536c558204",
            subjectName: "Data Structures",
            subjectCode: "CS-301",
            professorName: "Dr. Amit Kumar",
            timing: "10:00 AM - 11:00 AM",
            isPresent: "1",
            timeIn: "09:55 AM",
            remarks: "On time"
          },
          {
            subjectId: "66963f0bb7cadc536c558205",
            subjectName: "Database Management",
            subjectCode: "CS-302",
            professorName: "Dr. Priya Singh",
            timing: "11:00 AM - 12:00 PM",
            isPresent: "1",
            timeIn: "10:58 AM",
            remarks: "On time"
          },
          {
            subjectId: "66963f0bb7cadc536c558206",
            subjectName: "Computer Networks",
            subjectCode: "CS-303",
            professorName: "Dr. Rajesh Verma",
            timing: "2:00 PM - 3:00 PM",
            isPresent: "0",
            timeIn: null,
            remarks: "Medical leave"
          }
        ]
      },
      {
        date: "2024-07-23",
        dayOfWeek: "Tuesday",
        classes: [
          {
            subjectId: "66963f0bb7cadc536c558204",
            subjectName: "Data Structures",
            subjectCode: "CS-301",
            professorName: "Dr. Amit Kumar",
            timing: "10:00 AM - 11:00 AM",
            isPresent: "1",
            timeIn: "09:57 AM",
            remarks: "On time"
          },
          {
            subjectId: "66963f0bb7cadc536c558207",
            subjectName: "Operating Systems",
            subjectCode: "CS-304",
            professorName: "Dr. Sarah Wilson",
            timing: "11:00 AM - 12:00 PM",
            isPresent: "1",
            timeIn: "10:59 AM",
            remarks: "On time"
          }
        ]
      },
      {
        date: "2024-07-24",
        dayOfWeek: "Wednesday",
        classes: [
          {
            subjectId: "66963f0bb7cadc536c558204",
            subjectName: "Data Structures",
            subjectCode: "CS-301",
            professorName: "Dr. Amit Kumar",
            timing: "10:00 AM - 11:00 AM",
            isPresent: "1",
            timeIn: "10:05 AM",
            remarks: "Slightly late"
          },
          {
            subjectId: "66963f0bb7cadc536c558205",
            subjectName: "Database Management",
            subjectCode: "CS-302",
            professorName: "Dr. Priya Singh",
            timing: "11:00 AM - 12:00 PM",
            isPresent: "1",
            timeIn: "10:58 AM",
            remarks: "On time"
          },
          {
            subjectId: "66963f0bb7cadc536c558208",
            subjectName: "Software Engineering",
            subjectCode: "CS-305",
            professorName: "Dr. Mark Allen",
            timing: "1:00 PM - 2:00 PM",
            isPresent: "1",
            timeIn: "12:55 PM",
            remarks: "On time"
          },
          {
            subjectId: "66963f0bb7cadc536c558209",
            subjectName: "Artificial Intelligence",
            subjectCode: "CS-306",
            professorName: "Dr. Nina Gupta",
            timing: "2:00 PM - 3:00 PM",
            isPresent: "0",
            timeIn: null,
            remarks: "Absent"
          }
        ]
      },
      {
        date: "2024-07-25",
        dayOfWeek: "Thursday",
        classes: [
          {
            subjectId: "66963f0bb7cadc536c558206",
            subjectName: "Computer Networks",
            subjectCode: "CS-303",
            professorName: "Dr. Rajesh Verma",
            timing: "10:00 AM - 11:00 AM",
            isPresent: "1",
            timeIn: "09:59 AM",
            remarks: "On time"
          },
          {
            subjectId: "66963f0bb7cadc536c558207",
            subjectName: "Operating Systems",
            subjectCode: "CS-304",
            professorName: "Dr. Sarah Wilson",
            timing: "11:00 AM - 12:00 PM",
            isPresent: "1",
            timeIn: "11:00 AM",
            remarks: "On time"
          }
        ]
      },
      {
        date: "2024-07-26",
        dayOfWeek: "Friday",
        classes: [
          {
            subjectId: "66963f0bb7cadc536c558208",
            subjectName: "Software Engineering",
            subjectCode: "CS-305",
            professorName: "Dr. Mark Allen",
            timing: "9:00 AM - 10:00 AM",
            isPresent: "1",
            timeIn: "8:55 AM",
            remarks: "On time"
          },
          {
            subjectId: "66963f0bb7cadc536c558209",
            subjectName: "Artificial Intelligence",
            subjectCode: "CS-306",
            professorName: "Dr. Nina Gupta",
            timing: "10:00 AM - 11:00 AM",
            isPresent: "1",
            timeIn: "9:58 AM",
            remarks: "On time"
          }
        ]
      }
      // Additional days can be added here
    ]
  };
  
  // 3. Monthly Attendance Summary
  const monthlyAttendanceSummary = {
    studentInfo: { ...studentDetails },
    academicYear: "2024-25",
    monthlySummary: [
      {
        month: "July 2024",
        overallSummary: {
          totalClassesInMonth: 100,
          totalAttendedClasses: 90,
          overallMonthlyPercentage: 90.0
        },
        subjectWiseAttendance: [
          {
            subjectId: "66963f0bb7cadc536c558204",
            subjectName: "Data Structures",
            subjectCode: "CS-301",
            professorName: "Dr. Amit Kumar",
            totalClasses: 25,
            attendedClasses: 24,
            percentage: 96.0,
            weekWiseBreakdown: [
              { week: "Week 1", attended: 6, total: 6 },
              { week: "Week 2", attended: 6, total: 6 },
              { week: "Week 3", attended: 6, total: 6 },
              { week: "Week 4", attended: 6, total: 6 },
              { week: "Week 5", attended: 0, total: 1 }
            ]
          },
          {
            subjectId: "66963f0bb7cadc536c558205",
            subjectName: "Database Management",
            subjectCode: "CS-302",
            professorName: "Dr. Priya Singh",
            totalClasses: 25,
            attendedClasses: 20,
            percentage: 80.0,
            weekWiseBreakdown: [
              { week: "Week 1", attended: 5, total: 6 },
              { week: "Week 2", attended: 5, total: 6 },
              { week: "Week 3", attended: 5, total: 6 },
              { week: "Week 4", attended: 5, total: 6 },
              { week: "Week 5", attended: 0, total: 1 }
            ]
          },
          {
            subjectId: "66963f0bb7cadc536c558206",
            subjectName: "Computer Networks",
            subjectCode: "CS-303",
            professorName: "Dr. Rajesh Verma",
            totalClasses: 25,
            attendedClasses: 24,
            percentage: 96.0,
            weekWiseBreakdown: [
              { week: "Week 1", attended: 6, total: 6 },
              { week: "Week 2", attended: 6, total: 6 },
              { week: "Week 3", attended: 6, total: 6 },
              { week: "Week 4", attended: 6, total: 6 },
              { week: "Week 5", attended: 0, total: 1 }
            ]
          },
          {
            subjectId: "66963f0bb7cadc536c558207",
            subjectName: "Operating Systems",
            subjectCode: "CS-304",
            professorName: "Dr. Sarah Wilson",
            totalClasses: 25,
            attendedClasses: 21,
            percentage: 84.0,
            weekWiseBreakdown: [
              { week: "Week 1", attended: 5, total: 6 },
              { week: "Week 2", attended: 5, total: 6 },
              { week: "Week 3", attended: 5, total: 6 },
              { week: "Week 4", attended: 5, total: 6 },
              { week: "Week 5", attended: 1, total: 1 }
            ]
          },
          {
            subjectId: "66963f0bb7cadc536c558208",
            subjectName: "Software Engineering",
            subjectCode: "CS-305",
            professorName: "Dr. Mark Allen",
            totalClasses: 15,
            attendedClasses: 14,
            percentage: 93.33,
            weekWiseBreakdown: [
              { week: "Week 1", attended: 3, total: 3 },
              { week: "Week 2", attended: 4, total: 4 },
              { week: "Week 3", attended: 4, total: 4 },
              { week: "Week 4", attended: 3, total: 3 }
            ]
          },
          {
            subjectId: "66963f0bb7cadc536c558209",
            subjectName: "Artificial Intelligence",
            subjectCode: "CS-306",
            professorName: "Dr. Nina Gupta",
            totalClasses: 15,
            attendedClasses: 13,
            percentage: 86.67,
            weekWiseBreakdown: [
              { week: "Week 1", attended: 3, total: 3 },
              { week: "Week 2", attended: 4, total: 4 },
              { week: "Week 3", attended: 3, total: 4 },
              { week: "Week 4", attended: 3, total: 4 }
            ]
          }
        ],
        trends: {
          bestAttendanceSubject: "Data Structures, Computer Networks",
          lowestAttendanceSubject: "Database Management, Operating Systems",
          consecutiveDaysPresent: 6,
          totalLeaves: 5
        }
      },
      {
        month: "August 2024",
        overallSummary: {
          totalClassesInMonth: 90,
          totalAttendedClasses: 78,
          overallMonthlyPercentage: 86.67
        },
        subjectWiseAttendance: [
          {
            subjectId: "66963f0bb7cadc536c558204",
            subjectName: "Data Structures",
            subjectCode: "CS-301",
            professorName: "Dr. Amit Kumar",
            totalClasses: 20,
            attendedClasses: 19,
            percentage: 95.0,
            weekWiseBreakdown: [
              { week: "Week 1", attended: 5, total: 5 },
              { week: "Week 2", attended: 5, total: 5 },
              { week: "Week 3", attended: 5, total: 5 },
              { week: "Week 4", attended: 4, total: 5 }
            ]
          },
          {
            subjectId: "66963f0bb7cadc536c558205",
            subjectName: "Database Management",
            subjectCode: "CS-302",
            professorName: "Dr. Priya Singh",
            totalClasses: 20,
            attendedClasses: 16,
            percentage: 80.0,
            weekWiseBreakdown: [
              { week: "Week 1", attended: 4, total: 5 },
              { week: "Week 2", attended: 4, total: 5 },
              { week: "Week 3", attended: 4, total: 5 },
              { week: "Week 4", attended: 4, total: 5 }
            ]
          },
          {
            subjectId: "66963f0bb7cadc536c558206",
            subjectName: "Computer Networks",
            subjectCode: "CS-303",
            professorName: "Dr. Rajesh Verma",
            totalClasses: 20,
            attendedClasses: 19,
            percentage: 95.0,
            weekWiseBreakdown: [
              { week: "Week 1", attended: 5, total: 5 },
              { week: "Week 2", attended: 5, total: 5 },
              { week: "Week 3", attended: 5, total: 5 },
              { week: "Week 4", attended: 4, total: 5 }
            ]
          },
          {
            subjectId: "66963f0bb7cadc536c558207",
            subjectName: "Operating Systems",
            subjectCode: "CS-304",
            professorName: "Dr. Sarah Wilson",
            totalClasses: 20,
            attendedClasses: 17,
            percentage: 85.0,
            weekWiseBreakdown: [
              { week: "Week 1", attended: 4, total: 5 },
              { week: "Week 2", attended: 4, total: 5 },
              { week: "Week 3", attended: 4, total: 5 },
              { week: "Week 4", attended: 5, total: 5 }
            ]
          }
        ],
        trends: {
          bestAttendanceSubject: "Data Structures, Computer Networks",
          lowestAttendanceSubject: "Database Management, Operating Systems",
          consecutiveDaysPresent: 5,
          totalLeaves: 8
        }
      }
      // Additional months can be added here
    ]
  };
  
  // Export the mock data
  export const mockAttendanceData = {
    studentDetails,
    overall: overallAttendanceData,
    daily: dailyAttendanceData,
    monthly: monthlyAttendanceSummary
  };