import React, { useState, useEffect } from 'react';
import { useClassContext } from '../../context/ClassContext';
import axios from 'axios'; // Import axios for API calls
import { getSubjectsAccToSection } from '../../api/services/director';
import { ownerIdToEmpMap } from '../../api/services/director';
// When the user selects the Class option these fields will come up 
const ClassFields = () => {
	const { branches } = useClassContext();
	const [selectedBranch, setSelectedBranch] = useState('');
	const [availableSessions, setAvailableSessions] = useState<{ batch: string; sections: string[] }[]>([]);
	const [selectedSession, setSelectedSession] = useState('');
	const [availableSections, setAvailableSections] = useState<string[]>([]);
	const [selectedSection, setSelectedSection] = useState('');
	const [subjects, setSubjects] = useState<{ subCode: string; subjectName: string; subjectId: string; ownerId: string }[]>([]);
	const [ownerIdToEmpMap, setOwnerIdToEmpMap] = useState<any>([]); // Assuming this is the structure of the map
	useEffect(() => {
		const fetchOwnerIdToEmpMap = async () => {
			await ownerIdToEmpMap();
		};
		const data = fetchOwnerIdToEmpMap();
		if (data) {
			setOwnerIdToEmpMap(data);
		}
	}, []);

	// Handle branch change and update available sessions dynamically
	const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const branchValue = e.target.value;
		setSelectedBranch(branchValue);

		// Update sessions based on the selected branch
		const branchData = branches.find((branch) => branch.branch === branchValue);
		setAvailableSessions(branchData ? branchData.sessions : []);
		setSelectedSession('');
		setAvailableSections([]);
		setSubjects([]); // Reset subjects when branch changes
	};

	// Handle session change and update available sections dynamically
	const handleSessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const sessionValue = e.target.value;
		setSelectedSession(sessionValue);

		// Update sections based on the selected session
		const sessionData = availableSessions.find((session) => session.batch === sessionValue);
		setAvailableSections(sessionData ? sessionData.sections : []);
		setSubjects([]); // Reset subjects when session changes
	};

	// Handle section change and fetch subjects from the backend
	const handleSectionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const sectionValue = e.target.value;
		setSelectedSection(sectionValue);

		// Fetch subjects based on selected branch, session, and section
		if (selectedBranch && selectedSession && sectionValue) {
			try {
				const response = await getSubjectsAccToSection(
					selectedBranch,
					selectedSession,
					sectionValue
				);
				if (response && Array.isArray(response.subjects)) {
					setSubjects(response.subjects); // Ensure subjects are correctly set
				} else {
					setSubjects([]);
				}
			} catch (error) {
				console.error('Error fetching subjects:', error);
				setSubjects([]);
			}
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{/* Branch (Dynamic) */}
			<div className="flex flex-col">
				<label htmlFor="Branch" className="text-sm font-medium text-gray-700 mb-1">Branch</label>
				<select
					id="Branch"
					value={selectedBranch}
					onChange={handleBranchChange}
					className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm"
				>
					<option value="">Select Branch</option>
					{branches.map((item) => (
						<option key={item.branch} value={item.branch}>
							{item.branch}
						</option>
					))}
				</select>
			</div>

			{/* Session (Dynamic based on selected branch) */}
			<div className="flex flex-col">
				<label htmlFor="classSession" className="text-sm font-medium text-gray-700 mb-1">Session</label>
				<select
					id="classSession"
					value={selectedSession}
					onChange={handleSessionChange}
					className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm"
				>
					<option value="">Select Session</option>
					{availableSessions.map((session) => (
						<option key={session.batch} value={session.batch}>
							{session.batch}
						</option>
					))}
				</select>
			</div>

			{/* Section (Dynamic based on selected session) */}
			<div className="flex flex-col">
				<label htmlFor="classSection" className="text-sm font-medium text-gray-700 mb-1">Section</label>
				<select
					id="classSection"
					value={selectedSection}
					onChange={handleSectionChange}
					className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm"
				>
					<option value="">Select Section</option>
					{availableSections.map((section) => (
						<option key={section} value={section}>
							{section}
						</option>
					))}
				</select>
			</div>

			{/* Subject (Dynamic based on selected branch, session, and section) */}
			<div className="flex flex-col">
				<label htmlFor="classSubject" className="text-sm font-medium text-gray-700 mb-1">Subject</label>
				<select
					id="classSubject"
					className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border text-sm"
				>
					<option value="">Select Subject</option>
					{subjects.map((subject) => (
						<option key={subject.subjectId} value={subject.subjectId}>
							{subject.subjectName} {/* Correctly display subjectName */}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default ClassFields;