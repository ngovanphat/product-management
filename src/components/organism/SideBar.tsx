import React, { useRef } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";
import { defaultNavItems } from "./defaultNavItems";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
};

const SideBar = ({ open, navItems = defaultNavItems, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });
  return (
    <div
      className={classNames({
        "flex flex-col justify-between": true,
        "bg-indigo-700 text-zinc-50": true,
        "md:w-full md:sticky md:top-16 md:z-0 top-0 fixed z-20": true,
        "md:h-[calc(100vh_-_64px)] h-full w-[300px]": true,
        "transition-transform .3s ease-in-out md:translate-x-0": true,
        "-translate-x-full": !open,
      })}
      ref={ref}
    >
      <nav className="md:sticky top-0 md:top-16 py-10">
        {/**Nav items */}
        <ul className="py-2 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} onClick={() => setOpen(false)}>
              <li
                className={classNames({
                  "text-indigo-100 hover:bg-indigo-900": true,
                  "flex gap-4 items-center": true,
                  "transition-colors duration-300": true,
                  "rounded-md p-2 mx-2": true,
                })}
              >
                {item.icon} {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
