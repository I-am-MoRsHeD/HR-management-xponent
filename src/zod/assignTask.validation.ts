import z from "zod";


export const assignTaskFormSchema = z.object({
    title: z.string().min(1),
    employeeId: z.string().min(1),
    employeeName: z.string(),
    assignAt: z.string().min(1),
    completedAt: z.string().optional(),
    performanceRating: z.number().min(1).max(5),
});