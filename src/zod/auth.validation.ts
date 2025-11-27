import { Role } from "@/types/user.interface";
import z from "zod";

export const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    password: z.string().min(1),
    address: z.string().min(1),
    designation: z.string().min(1),
    department: z.string().min(1),
    role: z.enum(Object.values(Role) as [string]),
    joiningDate: z.string().min(1),
    salary: z.number().min(1),
    contractExpire: z.string().min(1),
});
