import { auth } from "@/auth";

import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import prisma from "@/database/client";
import "@/styles/admin.css";
import { role } from "@prisma/client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { role: role.ADMIN, id: parseInt(session?.user?.id) },
  });

  const isAdmin = !!user;

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
