import React, { useState } from 'react';
import { useClassContext } from '../../context/ClassContext';

// When the user selects the Class option these fields will come up 
const ClassFields = () => {
	const { branches } = useClassContext();
	const [selectedBranch, setSelectedBranch] = useState('');
	const [selectedCourse, setSelectedCourse] = useState('');

	function handleBranchChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const branchValue = e.target.value;
		setSelectedBranch(branchValue);
		if (branchValue.toUpperCase().includes('MSC')) {
			setSelectedCourse('MSc');
		} else if (branchValue.includes('_')) {
			setSelectedCourse('M.Tech');
		}
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{/* Branch (Dynamic) */}
			<div className="flex flex-col">
				<label htmlFor="Branch" className="text-sm font-medium text-gray-700 mb-1">Branch</label>
				<select id="Branch" onChange={handleBranchChange} className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm">
					<option value="">Select Branch</option>
					{branches.map((item) => (
						<option key={item.branch} value={item.branch}>
							{item.branch}
						</option>
					))}
				</select>
			</div>
			{/* Course */}
			{selectedBranch !== 'MGMT' && (
				<div className="flex flex-col">
					<label htmlFor="course" className="text-sm font-medium text-gray-700 mb-1">Course</label>
					<select id="course" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm">
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
					{branches?.flatMap((item) =>
						item?.session?.map((session) => (
							<option key={`${item.branch}-${session}`} value={session}>
								{session}
							</option>
						))
					)}
				</select>
			</div>
		</div>
	);
};

export default ClassFields;