import React from 'react';

const FacultyFields = () => (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{/* Faculty Name */}
		<div className="flex flex-col">
			<label htmlFor="facultyName" className="text-sm font-medium text-gray-700 mb-1">Faculty Name</label>
			<input type="text" id="facultyName" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
		</div>
		{/* Subject */}
		<div className="flex flex-col">
			<label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-1">Subject</label>
			<input type="text" id="subject" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
		</div>
		{/* Department */}
		<div className="flex flex-col">
			<label htmlFor="facultyDepartment" className="text-sm font-medium text-gray-700 mb-1">Department</label>
			<input type="text" id="facultyDepartment" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
		</div>
		{/* Year */}
		<div className="flex flex-col">
			<label htmlFor="facultyYear" className="text-sm font-medium text-gray-700 mb-1">Year</label>
			<input type="text" id="facultyYear" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
		</div>
		{/* Section */}
		<div className="flex flex-col">
			<label htmlFor="facultySection" className="text-sm font-medium text-gray-700 mb-1">Section</label>
			<input type="text" id="facultySection" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
		</div>
	</div>
);

export default FacultyFields;
