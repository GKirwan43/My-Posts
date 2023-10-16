"use client";

import Navbar from "@/components/navigation/Navbar";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user }: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
