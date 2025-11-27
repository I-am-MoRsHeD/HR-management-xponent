
export interface IAttendance {
    id: string;
    employeeId: string;
    employee: string;
    date: string;
    checkIn: string;
    checkOut?: string;
}