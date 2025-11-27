'use client';

import { useState, useTransition } from "react";
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";
import CreatePayrollFormDialog from "./CreatePayrollFormDialog";
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

const PayrollPageHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [createPayrollDialogOpen, setCreatePayrollDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        })
    };

    return (
        <div>
            <CreatePayrollFormDialog
                users={users as User[]}
                open={createPayrollDialogOpen}
                onClose={() => setCreatePayrollDialogOpen(false)}
                onSuccess={handleSuccess}
            />
            <DashboardPageHeader
                title="Payroll"
                action={{
                    label: "Create Payroll",
                    onClick: () => setCreatePayrollDialogOpen(true)
                }}
            />
        </div>
    );
};

export default PayrollPageHeader;