import base from "../base";
// These are the api functions which interact with the backend
// They are used by the components to fetch and send data

export const getOverallAttendance = async (scholarNumber: string) => {
    const response = await base.post("/api/attendance/attendanceByScholarId", {
        scholarNumber
    });
    return response.data;
};

