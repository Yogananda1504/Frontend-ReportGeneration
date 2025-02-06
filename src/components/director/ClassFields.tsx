// This will contain the department of the class, year,subject,faculty name .

import React from 'react';

// When the user selects the Class option these fields will come up 
const ClassFields = () => (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{/* Department */}
		<div className="flex flex-col">
			<label htmlFor="classDepartment" className="text-sm font-medium text-gray-700 mb-1">Department</label>
			<input type="text" id="classDepartment" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
		</div>
		{/* Year */}
		<div className="flex flex-col">
			<label htmlFor="classYear" className="text-sm font-medium text-gray-700 mb-1">Year</label>
			<input type="text" id="classYear" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
		</div>
		{/* Subject */}
		<div className="flex flex-col">
			<label htmlFor="classSubject" className="text-sm font-medium text-gray-700 mb-1">Subject</label>
			<input type="text" id="classSubject" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
		</div>
		{/* Faculty Name */}
		<div className="flex flex-col">
			<label htmlFor="classFacultyName" className="text-sm font-medium text-gray-700 mb-1">Faculty Name</label>
			<input type="text" id="classFacultyName" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm" />
		</div>
	</div>
);

export default ClassFields;

