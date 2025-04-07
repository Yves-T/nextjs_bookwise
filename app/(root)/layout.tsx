import { auth } from "@/auth";
import Header from "@/components/Header";
import prisma from "@/database/client";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  after(async () => {
    if (!session?.user?.id) {
      return;
    }

    // get user and see if last activity date is today
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(session?.user?.id),
      },
    });

    if (user) {
      if (
        user.lastActivityDate.toISOString().slice(0, 10) ===
        new Date().toISOString().slice(0, 10)
      ) {
        return;
      }
    }
    await prisma.user.update({
      where: {
        id: parseInt(session?.user?.id),
      },
      data: { lastActivityDate: new Date().toISOString() },
    });
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
