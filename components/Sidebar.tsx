"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const navItems = [
  {
    name: "Dashboard",
    url: "/",
    icon: (active: boolean) => (
      <svg className={cn("w-6 h-6", active ? "text-white" : "text-neutral-600")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
      </svg>
    ),
  },
  {
    name: "Documents",
    url: "/documents",
    icon: (active: boolean) => (
      <svg className={cn("w-6 h-6", active ? "text-white" : "text-neutral-600")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: "Images",
    url: "/images",
    icon: (active: boolean) => (
      <svg className={cn("w-6 h-6", active ? "text-white" : "text-neutral-600")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Media",
    url: "/media",
    icon: (active: boolean) => (
      <svg className={cn("w-6 h-6", active ? "text-white" : "text-neutral-600")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Others",
    url: "/others",
    icon: (active: boolean) => (
      <svg className={cn("w-6 h-6", active ? "text-white" : "text-neutral-600")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/" className="flex items-center justify-center lg:justify-start">
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">Cloud Storage</h1>
            <p className="text-xs text-neutral-500">Premium Solution</p>
          </div>
        </div>

        <div className="lg:hidden w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        </div>
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => {
            const isActive = pathname === url;
            return (
              <Link key={name} href={url} className="lg:w-full">
                <li
                  className={cn(
                    "sidebar-nav-item",
                    isActive && "shad-active",
                  )}
                >
                  {icon(isActive)}
                  <p className="hidden lg:block">{name}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>

      <div className="hidden lg:block flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-brand-100 to-brand-200 rounded-3xl flex items-center justify-center mb-4">
            <svg className="w-16 h-16 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">Secure & Fast</h3>
          <p className="text-sm text-neutral-500">Your files are protected with enterprise-grade security</p>
        </div>
      </div>

      <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize text-neutral-800">{fullName}</p>
          <p className="caption text-neutral-500">{email}</p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
