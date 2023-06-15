"use client";

import React, { PropsWithChildren, Suspense, useState } from "react";
import NavBar from "../organism/NavBar";
import SideBar from "../organism/SideBar";
import { Loading } from "../organism/Loading";

const Layout = (props: PropsWithChildren) => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header bg-white w-full">
      <div className="bg-white shadow-sm z-10">
        <NavBar
          isOpenSideBar={showSideBar}
          onMenuButtonClick={() => setShowSideBar(!showSideBar)}
        />
      </div>
      <div className="grid md:grid-cols-sidebar">
        <SideBar open={showSideBar} setOpen={setShowSideBar} />
        <Suspense fallback={<Loading size={50} />}>{props.children}</Suspense>
      </div>
    </div>
  );
};

export default Layout;
