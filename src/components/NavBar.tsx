"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

type NavProps = {
  children: ReactNode;
  className?: string;
};

export function Nav({ children, className }: NavProps) {
  return (
    <nav
      className={cn("bg-white text-black flex justify-center px-4", className)}
    >
      {children}
    </nav>
  );
}

export function Navlink(props: Omit<ComponentProps<typeof Link>, "classname">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 text text-black font-bold hover:bg-[#f2efff]",
        pathname === props.href && "bg-[#f2efff] text-black",
      )}
    />
  );
}
