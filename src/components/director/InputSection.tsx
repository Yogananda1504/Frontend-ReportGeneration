import React, { useState } from 'react';
import { Users, GraduationCap, Archive, ChevronDown, ChevronUp } from 'lucide-react';
import StudentFields from './StudentFields';
import FacultyFields from './FacultyFields';
import ClassFields from './ClassFields';

export type UserType = 'student' | 'faculty' | 'class' | null;

interface InputSectionProps {
  onSubmit?: (scholarNumber: string) => void;
}

const InputSection = ({ onSubmit }: InputSectionProps) => {
	const [selectedType, setSelectedType] = useState<UserType>(null);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [studentScholarNumber, setStudentScholarNumber] = useState('');

	return (
		<div className="bg-white rounded-lg shadow-lg">
			<div className="p-6 flex justify-between items-center cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
				<h2 className="text-2xl font-bold text-gray-900">Input Section</h2>
				{isCollapsed ? <ChevronDown className="w-6 h-6 text-gray-500" /> : <ChevronUp className="w-6 h-6 text-gray-500" />}
			</div>

			{!isCollapsed && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (selectedType === 'student') {
							onSubmit?.(studentScholarNumber);
						}
					}}
					className="p-6 pt-0"
				>
					{/* User Type Selection */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
						<button
							onClick={() => setSelectedType('student')}
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
							onClick={() => setSelectedType('faculty')}
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
							onClick={() => setSelectedType('class')}
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
						/>
					)}
					{selectedType === 'faculty' && <FacultyFields />}
					{selectedType === 'class' && <ClassFields />}

					{/* Submit Button */}
					{selectedType && (
						<div className="mt-6">
							<button
								type="submit"
								className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
							>
								Submit
							</button>
						</div>
					)}
				</form>
			)}
		</div>
	);
};

export default InputSection;
