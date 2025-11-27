'use client';
import DataTable, { Column } from '@/components/shared/DataTable';
import { ITask } from '@/types/task.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import UpdateTaskDialog from './UpdateTask';

const tasks: ITask[] = [
    {
        id: "t1",
        title: "Prepare monthly sales report",
        employeeId: "2",
        employeeName: "John Doe",
        assignAt: "2025-01-18",
        completedAt: "2025-01-19",
        performanceRating: 4,
    },
    {
        id: "t2",
        title: "Fix UI bugs on dashboard",
        employeeId: "1",
        employeeName: "Sarah Smith",
        assignAt: "2025-01-18",
        completedAt: "",
        performanceRating: 0,
    },
    {
        id: "t3",
        title: "Optimize backend API speed",
        employeeId: "1",
        employeeName: "Michael Adams",
        assignAt: "2025-01-17",
        completedAt: "2025-01-18",
        performanceRating: 5,
    },
];


const columns: Column<ITask>[] = [
    { header: 'Title', accessor: 'title' },
    { header: 'Employee Name', accessor: 'employeeName' },
    { header: 'AssignAt', accessor: 'assignAt' },
    { header: 'CompletedAt', accessor: 'completedAt' },
    { header: 'Performace rating', accessor: 'performanceRating' },
];

const PerformanceTable = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [task, setTask] = useState<ITask | null>();
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleEdit = (task: ITask) => {
        setTask(task);
        setEditModalOpen(true);
    };

    return (
        <>
            <DataTable
                data={tasks}
                columns={columns}
                onEdit={handleEdit}
                getRowKey={(user) => user.id}
                emptyMessage="No tasks found"
            />

            <UpdateTaskDialog
                task={task as ITask}
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSuccess={handleSuccess}
            />
        </>
    );
};

export default PerformanceTable;