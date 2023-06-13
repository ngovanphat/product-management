"use client";

import React, { PropsWithChildren, useState } from "react";
import NavBar from "../organism/NavBar";
import SideBar from "../organism/SideBar";

const Layout = (props: PropsWithChildren) => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header bg-black w-full">
      <div className="bg-white shadow-sm z-10">
        <NavBar
          isOpenSideBar={showSideBar}
          onMenuButtonClick={() => setShowSideBar(!showSideBar)}
        />
      </div>
      <div className="grid md:grid-cols-sidebar">
        <SideBar open={showSideBar} setOpen={setShowSideBar} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
