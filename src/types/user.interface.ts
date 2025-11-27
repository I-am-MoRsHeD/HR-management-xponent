export enum Role {
    HR = "HR",
    MANAGER = "MANAGER",
    EMPLOYEE = "EMPLOYEE"
}


export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    designation: string;
    department: string;
    role: Role;
    joiningDate: string;
    salary: number;
    contractExpire: string;
}