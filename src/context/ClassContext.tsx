import React, { createContext, useContext } from 'react';

interface Branches{
	session:[String];
	branch:String;
}



interface ClassContextType {
    branches: Branches[];
    setBranches: (branches: Branches[]) => void;
   
    // setProfessors: (professors: Professor[]) => void;
    // setSubjects: (subjects: Subject[]) => void;
}

export const ClassContext = createContext<ClassContextType>({
    branches: [],
    setBranches: () => { },
    // setProfessors: () => { },
    // setSubjects: () => { },
});

export const useClassContext = () => useContext(ClassContext);
