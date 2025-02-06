import React from 'react';

const StudentFields = ({
  scholarNumber,
  onScholarNumberChange
}: {
  scholarNumber: string;
  onScholarNumberChange: (value: string) => void;
}) => {
  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="scholarNumber" className="text-sm font-medium text-gray-700 mb-1">
          Scholar Number
        </label>
        <input
          type="text"
          id="scholarNumber"
          value={scholarNumber}
          onChange={(e) => onScholarNumberChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm"
        />
      </div>
    </div>
  );
};

export default StudentFields;
