import { useState, useEffect } from "react";

export default function FacultyInputSection() {
  const [scholarNumber, setScholarNumber] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    fetchFacultySubjects();
  }, []);

  const fetchFacultySubjects = async () => {
    try {
      const response = await fetch(`/api/facultySubjectList?employeeCode=0640`); // Replace with dynamic employeeCode
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Faculty Input</h2>

      {/* Scholar Number Input */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Scholar Number</label>
        <input
          type="text"
          value={scholarNumber}
          onChange={(e) => setScholarNumber(e.target.value)}
          placeholder="Enter Scholar Number"
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>

      {/* Subject Dropdown */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Subject</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full p-2 border rounded-lg mt-1"
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subjectName}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button className="w-full bg-blue-500 text-white p-2 rounded-lg">
        Submit
      </button>
    </div>
  );
}
