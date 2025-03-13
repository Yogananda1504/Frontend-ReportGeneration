import { local } from "../base";


export const getEmpCode = async (empName : string ) => {

    try {
        const response = await local.post(`/api/faculty/nameToEmpCode`,{name:empName});
        console.log(response.data);
        return response.data.empCode;
    } catch (error) {
        console.error("Error fetching Employee Code:", error);
        throw error;
    }

}