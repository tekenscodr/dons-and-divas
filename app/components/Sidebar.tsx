'use client';
import { useRouter, usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "../actions/user";
import { useState, useEffect } from "react";

const navLists = [
  { name: 'Home', href: '/dashboard/' },
  { name: 'Sales', href: '/dashboard/sales' },
  { name: 'Appointment', href: '/dashboard/appointment' },

]

const adminNavLists = [
  ...navLists,
  { name: 'Product & Services', href: '/dashboard/product' },
  { name: 'Users', href: '/dashboard/users' },

]

const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div>
      <ul>
        {role === 'Admin' ? adminNavLists.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={cn('cursor-pointer px-3 py-3 rounded-md transition-colors duration-75 w-full block', {
                'bg-zinc-400/75': isActive(item.href),
                'hover:bg-zinc-500/75': true,
                'hover:!bg-zinc-400/75': isActive(item.href)
              })}
            >
              {item.name}
            </a>
          </li>
        )) : navLists.slice(0, 2).map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={cn('cursor-pointer px-3 py-3 rounded-md transition-colors duration-75 w-full block', {
                'bg-zinc-400/75': isActive(item.href),
                'hover:bg-zinc-500/75': true,
                'hover:!bg-zinc-400/75': isActive(item.href)
              })}
            >
              {item.name}
            </a>
          </li>
        ))}
        <Button
          className="mt-12"
          onClick={() => {
            localStorage.clear()
            router.push('/login');
            logout()
          }}
        >
          Logout
        </Button>
      </ul>
    </div>
  );
};

export default SideNav;