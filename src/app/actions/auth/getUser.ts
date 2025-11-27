'use server';

import { prisma } from "@/lib/prisma";
import { jwtHelpers } from "@/lib/jwtHelpers";
import { cookies } from "next/headers";

export const getUser = async () => {
    try {

        const token = (await cookies()).get("accessToken")?.value;

        if (!token) {
            return { error: "Unauthorized" };
        }

        const decoded = jwtHelpers.verifyToken(
            token,
            process.env.JWT_ACCESS_SECRET as string
        ) as { email: string; role: string };

        if (!decoded?.email) {
            return { error: "Invalid token" };
        }

        const user = await prisma.user.findUnique({
            where: { email: decoded.email },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                designation: true,
                department: true,
                authToken: true,
            },
        });

        if (!user) {
            return { error: "User not found" };
        }

        return { user };

    } catch (err) {
        return { error: "Invalid or expired token" };
    }
};
