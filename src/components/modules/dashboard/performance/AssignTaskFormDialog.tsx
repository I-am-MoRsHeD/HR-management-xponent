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
import { User } from "@/types/user.interface";
import { assignTaskFormSchema } from "@/zod/assignTask.validation";

interface AssignTaskFormProps {
    users: User[]
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

const AssignTaskFormDialog = ({ users, open, onClose, onSuccess }: AssignTaskFormProps) => {
    const form = useForm<z.infer<typeof assignTaskFormSchema>>({
        resolver: zodResolver(assignTaskFormSchema),
        defaultValues: {
            title: "",
            employeeId: "",
            assignAt: ""
        },
    });

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
                                    <FormControl><Input {...field} placeholder="Task title" /></FormControl>
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
                                                {users?.length > 0 ? (
                                                    users?.map((user: User, idx: number) => (
                                                        <SelectItem key={idx} value={user?.id}>{user?.name}</SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="">No employee found!</SelectItem>
                                                )}
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
                                        <FormControl><Input type="date" {...field} /></FormControl>
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


export default AssignTaskFormDialog;
