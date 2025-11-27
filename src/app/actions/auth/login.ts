'use server';

import { Prisma, Role } from "@/generated/prisma";
import { jwtHelpers } from "@/lib/jwtHelpers";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/zod/auth.validation";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";


export const login = async (values: Partial<Prisma.UserCreateInput>) => {
    const parsedData = loginSchema.safeParse(values);

    if (!parsedData.success) {
        return {
            error: parsedData.error.flatten().fieldErrors
        }
    };

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: parsedData?.data?.email,
        },
    });

    if (!user) {
        throw new Error("User not found!")
    };

    const comparePassword = await bcrypt.compare(parsedData?.data?.password, user.password);

    if (!comparePassword) {
        throw new Error('Password is incorrect!');
    };

    const jwtPayload = {
        email: user.email,
        role: user.role
    };

    const accessToken = jwtHelpers.generateToken(
        jwtPayload,
        process.env.JWT_ACCESS_SECRET as string,
        process.env.JWT_ACCESS_EXPIRES as string
    );

    (await cookies()).set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 60,
    });

    return {
        success: true,
        message: "Login successful",
        user,
    };
};