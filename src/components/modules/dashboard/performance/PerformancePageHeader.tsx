'use client';

import DashboardPageHeader from "@/components/shared/DashboardPageHeader";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import AssignTaskFormDialog from "./AssignTaskFormDialog";
import { Role, User } from "@/types/user.interface";

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

const PerformancePageHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [assignTaskDialogOpen, setAssignTaskDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        })
    };

    return (
        <div>
            <AssignTaskFormDialog
                users={users as User[]}
                open={assignTaskDialogOpen}
                onClose={() => setAssignTaskDialogOpen(false)}
                onSuccess={handleSuccess}
            />
            <DashboardPageHeader
                title="Performance"
                action={{
                    label: "Assign task",
                    onClick: () => setAssignTaskDialogOpen(true)
                }}
            />
        </div>
    );
};

export default PerformancePageHeader;