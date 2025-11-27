'use client'
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";
import { useState, useTransition } from "react";
import AddAttendenceDialog from "./AddAttendanceDialog";
import { Role, User } from "@/types/user.interface";
import { useRouter } from "next/navigation";

const users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9998887777',
        address: 'New York',
        designation: 'Developer',
        department: 'IT',
        role: Role.EMPLOYEE,
        joiningDate: '2023-01-01',
        salary: 40000,
        contractExpire: '2025-01-01'
    },
    {
        id: '2',
        name: 'Jorina khatun',
        email: 'john@example.com',
        phone: '9998887777',
        address: 'New York',
        designation: 'Developer',
        department: 'IT',
        role: Role.EMPLOYEE,
        joiningDate: '2023-01-01',
        salary: 30000,
        contractExpire: '2025-01-01'
    },
];

const AttendancePageHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        })
    };
    return (
        <div>
            <AddAttendenceDialog
                users={users as User[]}
                open={attendanceDialogOpen}
                onClose={() => setAttendanceDialogOpen(false)}
                onSuccess={handleSuccess}
            />
            <DashboardPageHeader
                title="Attendance"
                action={{
                    label: "Add attendance",
                    onClick: () => setAttendanceDialogOpen(true)
                }}
            />
        </div>
    );
};

export default AttendancePageHeader;