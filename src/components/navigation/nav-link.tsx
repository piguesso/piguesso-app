"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <Link href={href}>
          <div>
            <div className="w-full rounded-full bg-primary py-1">
              {children}
            </div>
            <div>{lable}</div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Link href={href}>
        <div className={"py-1"}>{children}</div>
        <div>{lable}</div>
      </Link>
    </div>
  );
}
