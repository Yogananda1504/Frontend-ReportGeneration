import React, { useState, useEffect } from 'react';
import { useClassContext } from '../../context/ClassContext';

interface ClassFieldsProps {
  isHoD?: boolean;
  department?: string;
}

const ClassFields = ({ isHoD = false, department = '' }: ClassFieldsProps) => {
  const { branches } = useClassContext();
  const [filteredBranches, setFilteredBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isCourseLocked, setIsCourseLocked] = useState(false);

  // Filter branches by department for HOD
  useEffect(() => {
    if (isHoD && department && branches) {
      const deptBranches = branches.filter(branch => 
        branch.branch.includes(department) || 
        branch.branch.toLowerCase().includes(department.toLowerCase())
      );
      setFilteredBranches(deptBranches);
    } else {
      setFilteredBranches(branches || []);
    }
  }, [branches, department, isHoD]);

  function handleBranchChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const branchValue = e.target.value;
    setSelectedBranch(branchValue);

    // Determine course based on branch selection
    if (branchValue.toUpperCase().includes('MSC')) {
      setSelectedCourse('MSc');
      setIsCourseLocked(true);
    } else if (branchValue.includes('_') || branchValue.toUpperCase().includes('MTECH')) {
      setSelectedCourse('M.Tech');
      setIsCourseLocked(true);
    } else {
      setIsCourseLocked(false);
    }
  }

  return (
    <div className="space-y-4">
      {isHoD && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-700">
            Viewing classes from <span className="font-semibold">{department}</span> department only
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Branch (Dynamic) */}
        <div className="flex flex-col">
          <label htmlFor="Branch" className="text-sm font-medium text-gray-700 mb-1">
            Branch {isHoD && <span className="text-xs text-gray-500">(Department filtered)</span>}
          </label>
          <select 
            id="Branch" 
            onChange={handleBranchChange} 
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm"
          >
            <option value="">Select Branch</option>
            {filteredBranches.map((item) => (
              <option key={item.branch} value={item.branch}>
                {item.branch}
              </option>
            ))}
          </select>
        </div>

        {/* Course */}
        {selectedBranch !== 'MGMT' && (
          <div className="flex flex-col">
            <label htmlFor="course" className="text-sm font-medium text-gray-700 mb-1">
              Course {isCourseLocked && <span className="text-blue-500 text-xs ml-1">(Fixed based on branch)</span>}
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => !isCourseLocked && setSelectedCourse(e.target.value)}
              disabled={isCourseLocked}
              className={`rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm ${isCourseLocked ? 'bg-gray-100' : ''}`}
            >
              <option value="">Select Course</option>
              <option value="MBA">MBA</option>
              <option value="MCA">MCA</option>
              <option value="MSc">MSc</option>
              <option value="M.Tech">M.Tech</option>
              <option value="B.Tech">B.Tech</option>
              <option value="B.Tech+M.Tech">B.Tech+M.Tech</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
        )}

        {/* Year */}
        <div className="flex flex-col">
          <label htmlFor="classYear" className="text-sm font-medium text-gray-700 mb-1">Year</label>
          <input type="text" id="classYear" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
        </div>

        {/* Section */}
        <div className="flex flex-col">
          <label htmlFor="classSection" className="text-sm font-medium text-gray-700 mb-1">Section</label>
          <input type="text" id="classSection" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
        </div>

        {/* Subject */}
        <div className="flex flex-col">
          <label htmlFor="classSubject" className="text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input type="text" id="classSubject" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
        </div>

        {/* Session (Dynamic example) */}
        <div className="flex flex-col">
          <label htmlFor="classSession" className="text-sm font-medium text-gray-700 mb-1">Session</label>
          <select id="classSession" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm">
            <option value="">Select Session</option>
            {filteredBranches?.flatMap((item) =>
              item?.session?.map((session: string) => (
                <option key={`${item.branch}-${session}`} value={session}>
                  {session}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ClassFields;