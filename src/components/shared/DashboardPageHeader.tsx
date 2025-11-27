'use client';
import React from "react";
import { LucideIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface DashboardPageHeaderProps {
    title: string;
    action?: {
        icon?: LucideIcon;
        label: string;
        onClick: () => void;
    };
    children?: React.ReactNode;
}

const DashboardPageHeader = ({
    title,
    action,
    children,
}: DashboardPageHeaderProps) => {
    const Icon = action?.icon || Plus;

    return (
        <div className="flex flex-row items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">{title}</h1>
            </div>
            {action && (
                <Button onClick={action.onClick}>
                    <Icon className="mr-2 h-4 w-4" />
                    {action.label}
                </Button>
            )}
            {children}
        </div>
    );
};

export default DashboardPageHeader;