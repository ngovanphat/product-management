import React from "react";

import {
  PlusCircleIcon,
  MinusCircleIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./SideBar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Thống kê",
    href: "/",
    icon: (
      <PresentationChartBarIcon className="w-6 h-6"></PresentationChartBarIcon>
    ),
  },
  {
    label: "Danh sách hàng hóa",
    href: "/product-list",
    icon: <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>,
  },
];
