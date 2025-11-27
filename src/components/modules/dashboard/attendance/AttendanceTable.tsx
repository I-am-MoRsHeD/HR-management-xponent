'use client';
import DataTable, { Column } from "@/components/shared/DataTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { IAttendance } from "@/types/attendance.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import EditAttendanceDialog from "./EditAttendanceDialog";


const columns: Column<IAttendance>[] = [
    { header: 'Employee', accessor: 'employee' },
    { header: 'Date', accessor: 'date' },
    { header: 'Check In', accessor: 'checkIn' },
    { header: 'Check Out', accessor: 'checkOut' },
];

const attendances: IAttendance[] = [
    {
        id: "1",
        employeeId: "1",
        employee: "John Doe",
        date: "2025-01-15",
        checkIn: "09:12 AM",
        checkOut: "05:47 PM",
    },
    {
        id: "2",
        employeeId: "2",
        employee: "Jorina khatun",
        date: "2025-01-15",
        checkIn: "09:05 AM",
        checkOut: "06:10 PM",
    },
    {
        id: "3",
        employeeId: "3",
        employee: "Michael Adams",
        date: "2025-01-15",
        checkIn: "09:30 AM",
        checkOut: "",
    },
];


const AttendanceTable = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [attendance, setAttendance] = useState<IAttendance | null>();
    const [isDeleting, setIsDeleting] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleEdit = (attendance: IAttendance) => {
        setAttendance(attendance);
        setEditModalOpen(true);
    };
    const handleDelete = (attendance: IAttendance) => {
        setAttendance(attendance);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!attendance) return;

        setIsDeleting(false);
        handleRefresh();
    };

    return (
        <>
            <DataTable
                data={attendances as IAttendance[]}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(user) => user.id}
                emptyMessage="No users found"
            />

            {/* delete user dialog */}
            <DeleteConfirmationDialog
                open={deleteModalOpen}
                onOpenChange={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title='Delete attendance'
                isDeleting={isDeleting}
            />

            {/* edit user dialog */}
            <EditAttendanceDialog
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                attendance={attendance as IAttendance}
                onSuccess={handleRefresh}
            />
        </>
    );
};

export default AttendanceTable;