"use client";
import TextStyles from "@/utils/textstyles";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  lable: string;
  children: React.ReactNode;
}

export default function NavLink({ href, lable, children }: NavLinkProps) {
  const pathname = usePathname();
  if (pathname.includes(href)) {
    return (
      <div className="w-full h-full">
        <Link href={href} className="w-full h-full">
          <div className="w-full h-full p-1">
            {href === "/profile" && (
              <SignedOut>
                <div className="w-full rounded-full bg-primary">{children}</div>
              </SignedOut>
            )}
            {children}
            <div className={TextStyles.LinkText}>{lable}</div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-1">
      <Link href={href}>
        <div>{children}</div>
        <div className={TextStyles.LinkText}>{lable}</div>
      </Link>
    </div>
  );
}
