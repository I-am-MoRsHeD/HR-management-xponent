

export interface ITask {
    id: string;
    title: string;
    employeeId: string;
    employeeName : string;
    assignAt: string;
    completedAt?: string;
    performanceRating: number;
}