'use server';

import { Prisma, Role } from "@/generated/prisma";
import { jwtHelpers } from "@/lib/jwtHelpers";
import { prisma } from "@/lib/prisma";
import { createAccountSchema } from "@/zod/auth.validation";
import bcrypt from 'bcryptjs';


export const createAccount = async (values: Prisma.UserCreateInput) => {
    const parsedData = createAccountSchema.safeParse(values);

    if (!parsedData.success) {
        return {
            error: parsedData.error.flatten().fieldErrors
        }
    };

    const hashedPassword = await bcrypt.hash(parsedData?.data?.password, Number(process.env.BCRYPT_SALT_ROUNDS));

    const authToken = jwtHelpers.generateToken(
        { email: parsedData?.data?.email, role: parsedData?.data?.role as Role },
        process.env.JWT_ACCESS_SECRET as string,
        process.env.JWT_ACCESS_EXPIRES as string
    );

    const payload = {
        ...parsedData.data,
        password: hashedPassword,
        role: parsedData?.data?.role as Role,
        authToken
    }

    const result = await prisma.user.create({
        data: payload
    })

    return {
        success: true,
        message: "Account created successfully!",
        data: result
    }
};

