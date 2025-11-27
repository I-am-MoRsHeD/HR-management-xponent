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
import { attendanceFormSchema } from "@/zod/attendance.validation";

interface AddAttendanceProps {
    users: User[]
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

const AddAttendanceDialog = ({ users, open, onClose, onSuccess }: AddAttendanceProps) => {
    const form = useForm<z.infer<typeof attendanceFormSchema>>({
        resolver: zodResolver(attendanceFormSchema),
        defaultValues: {
            employeeId: "",
            date: "",
            checkIn: "",
            checkOut: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof attendanceFormSchema>) => {
        console.log(values);
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add attendance</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-xl mx-auto">
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
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl><Input type="date" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="checkIn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Check In</FormLabel>
                                        <FormControl><Input type="time" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="checkOut"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Check Out (optional)</FormLabel>
                                        <FormControl><Input type="time" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <Button type="submit" className="w-full">Add attendance</Button>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
};


export default AddAttendanceDialog;
