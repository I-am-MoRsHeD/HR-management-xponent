'use client'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role, User } from "@/types/user.interface";
import { assignTaskFormSchema } from "@/zod/assignTask.validation";
import { ITask } from "@/types/task.interface";
import { useEffect } from "react";
import { Star } from "lucide-react";

const users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
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
        password: 'password123',
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

interface UpdateTaskProps {
    task: ITask;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

const UpdateTaskDialog = ({ task, open, onClose, onSuccess }: UpdateTaskProps) => {
    const form = useForm<z.infer<typeof assignTaskFormSchema>>({
        resolver: zodResolver(assignTaskFormSchema),
        defaultValues: task,
    });

    useEffect(() => {
        if (task) {
            form.reset({
                title: task.title,
                employeeName: task.employeeName,
                assignAt: task.assignAt,
                completedAt: task.completedAt,
                performanceRating: task.performanceRating,
            });
        }
    }, [task, form]);

    const onSubmit = async (values: z.infer<typeof assignTaskFormSchema>) => {
        console.log(values);
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign task</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-xl mx-auto">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl><Input {...field} placeholder="Task title" readOnly /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="employeeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employee</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl className="w-full">
                                                <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    users?.map((user: User, idx: number) => (
                                                        <SelectItem aria-readonly key={idx} value={user?.id}>{user?.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="assignAt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>AssignAt</FormLabel>
                                        <FormControl><Input type="date" {...field} readOnly /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="completedAt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Completed At</FormLabel>
                                        <FormControl><Input type="date" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="performanceRating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Performance Rating</FormLabel>

                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <Star
                                                    key={rating}
                                                    className={`h-6 w-6 cursor-pointer ${rating <= field.value ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                                                        }`}
                                                    onClick={() => field.onChange(rating)}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            Selected: {field.value || "No rating"}
                                        </p>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <Button type="submit" className="w-full">Assign task</Button>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
};


export default UpdateTaskDialog;
