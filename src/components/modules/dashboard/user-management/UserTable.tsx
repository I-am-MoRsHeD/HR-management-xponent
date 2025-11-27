'use client';

import DataTable, { Column } from '@/components/shared/DataTable';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import { Role, User } from '@/types/user.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import EditUserFormDialog from './EditUserFormDialog';

const columns: Column<User>[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Designation', accessor: 'designation' },
    { header: 'Department', accessor: 'department' },
    { header: 'Role', accessor: 'role' },
    { header: 'Joining Date', accessor: (row) => new Date(row.joiningDate).toLocaleDateString() },
    { header: 'Salary', accessor: (row) => `₹ ${row.salary}` },
    { header: 'Contract Expire', accessor: (row) => new Date(row.contractExpire).toLocaleDateString() },
];

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
];
const UserTable = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [user, setUser] = useState<User | null>();
    const [isDeleting, setIsDeleting] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleEdit = (user: User) => {
        setUser(user);
        setEditModalOpen(true);
    };
    const handleDelete = (user: User) => {
        setUser(user);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!user) return;

        setIsDeleting(false);
        handleRefresh();
    };

    return (
        <>
            <DataTable
                data={users as User[]}
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
                title='Delete User'
                isDeleting={isDeleting}
            />

            {/* edit user dialog */}
            <EditUserFormDialog
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                user={user as User}
                onSuccess={handleRefresh}
            />
        </>
    );
};



export default UserTable;
