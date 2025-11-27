'use client'
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";
import { useState, useTransition } from "react";
import CreateUserFormDialog from "./CreateUserFormDialog";
import { useRouter } from "next/navigation";


const UserManagementHeader = () => {
    const router = useRouter();
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [, startTransition] = useTransition();

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        })
    };

    return (
        <div>
            <CreateUserFormDialog
                open={isFormDialogOpen}
                onClose={() => setIsFormDialogOpen(false)}
                onSuccess={handleSuccess}
            />

            <DashboardPageHeader
                title="User Management"
                action={{
                    label: "Create User",
                    onClick: () => setIsFormDialogOpen(true)
                }}
            />
        </div>
    );
};

export default UserManagementHeader;