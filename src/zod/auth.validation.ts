import { Role } from "@/types/user.interface";
import z from "zod";

export const formSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string().min(1),
    password: z.string().min(1),
    address: z.string().min(1).optional(),
    designation: z.string().min(1),
    department: z.string().min(1),
    role: z.enum(Object.values(Role)),
    joiningDate: z.string().min(1).optional(),
    salary: z.number().min(1).optional(),
    contractExpire: z.string().min(1).optional(),
});

export const createAccountSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string().min(1),
    password: z.string().min(1),
    designation: z.string().min(1),
    department: z.string().min(1),
    role: z.enum(Object.values(Role)),
    authToken: z.string().min(1)
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});
