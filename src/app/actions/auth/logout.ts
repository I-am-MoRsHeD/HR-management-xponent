'use server';

import { cookies } from "next/headers";

export const logout = async () => {
    try {
        const cookieStore = await cookies();


        cookieStore.delete("accessToken");

        return { success: true, message: "Logged out successfully" };
    } catch (error) {
        return { error: "Failed to logout" };
    }
};
