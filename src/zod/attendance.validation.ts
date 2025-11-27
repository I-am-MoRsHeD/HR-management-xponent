import z from "zod";

export const attendanceFormSchema = z.object({
    employeeId: z.string().min(1),
    date: z.string().min(1),
    checkIn: z.string().min(1),
    checkOut: z.string().optional()
});