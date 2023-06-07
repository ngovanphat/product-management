import classNames from "classnames";
import React from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

type Props = {
  isOpenSideBar: boolean;
  onMenuButtonClick(): void;
};

const NavBar = ({ isOpenSideBar, onMenuButtonClick }: Props) => {
  return (
    <nav
      className={classNames({
        "bg-white text-indigo-500": true,
        "flex items-center": true,
        "w-full fixed z-10 px-4 shadow-sm h-16": true,
      })}
    >
      <div className="font-bold text-lg flex items-center">
        <ComputerDesktopIcon className="w-10 h-10 mr-5" />
        Quản lý sản phẩm
      </div>
      <div className="flex-grow"></div>
      <button className="md:hidden" onClick={onMenuButtonClick}>
        {!isOpenSideBar ? (
          <Bars3Icon className="h-6 w-6" />
        ) : (
          <XMarkIcon className="w-6 h-6" />
        )}
      </button>
    </nav>
  );
};
export default NavBar;
