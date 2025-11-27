import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";
import type React from "react";
import { getUser } from "../actions/auth/getUser";
import { User } from "@/types/user.interface";

export const metadata: Metadata = {
  title: "ABC ERP - Enterprise Resource Planning",
  description: "Comprehensive ERP System for Business Management",
  generator: "v0.dev",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUser();

  return (
    <div lang="en" className="light">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <AppHeader user={user as Partial<User>} />
          <main className="p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
