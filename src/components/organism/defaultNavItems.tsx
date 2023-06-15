import React from "react";

import {
  PlusCircleIcon,
  MinusCircleIcon,
  PresentationChartBarIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./SideBar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Lịch sử bán hàng",
    href: "/order-list",
    icon: <DocumentChartBarIcon className="w-6 h-6" />,
  },
  {
    label: "Danh sách hàng hóa",
    href: "/product-list",
    icon: <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>,
  },
  {
    label: "Thống kê",
    href: "/",
    icon: (
      <PresentationChartBarIcon className="w-6 h-6"></PresentationChartBarIcon>
    ),
  },
];
