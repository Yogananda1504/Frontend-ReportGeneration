import { local } from "../base";

interface Department {
	_id: string; 
	count: number;
}

interface Branches{
	session:[String];
	branch:String;
}

export const getFacultyAttendance = async (
	employeeCode: string,
	startDate: Date,
	endDate: Date,
	subjectId?: string
) => {
	const payload = {
		employeeCode,
		startDate,
		endDate,
		...(subjectId ? { subjectId } : {}),
	};
	const response = await local.post("/api/faculty/facultyAttendance", payload);
	console.log(
		"These are the attendance details of the faculty : ",
		response.data
	);
	return response.data;
};

// Retrieves the faculty details and also the timetable of the faculty
export const getFacultyDetails = async (employeeCode: string) => {
	const response = await local.post("/faculty/details", { employeeCode });
	console.log("These are the  details of the faculty : ", response.data);
	return response.data;
};

export const getDepartments = async (): Promise<Department[]> => {
	const response = await local.get("/api/director/getDepartments");
	console.log("These are the available departments : ", response.data);
	return response.data;
};

export const getBranches = async ():Promise<Branches[]>=>{
	const response = await local.get("/api/director/getBranches");
	console.log("These are the available branches : ", response.data);
	return response.data;
}
