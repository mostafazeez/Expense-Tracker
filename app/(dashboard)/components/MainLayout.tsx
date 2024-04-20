"use client";

import { Layout, Menu } from "antd";
import React, { Suspense, useState } from "react";
import {
  PoundCircleOutlined,
  PlusOutlined,
  ProjectOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { handleLogout } from "../utils";

const { Sider, Content,Header } = Layout;

import "../../globals.css";
import Loading from "../loading";

const items = (router: AppRouterInstance) => [
  {
    icon: React.createElement(PlusOutlined),
    label: "Add Record",
    key: "1",
    onClick: () => router.push("/dashboard/add-expenses"),
  },
  {
    icon: React.createElement(ProjectOutlined),
    label: "Track Expense",
    key: "2",
    onClick: () => router.push("/dashboard/report"),
  },
  {
    icon: React.createElement(LogoutOutlined),
    label: "Logout",
    key: "3",
    onClick: () => handleLogout(),
  },
];

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathName = usePathname();

  const [hideText,SetHideText]=useState(false)

  const currentActiveTab = (() => {
    if (pathName.includes("add")) {
      return "1";
    } else if (pathName.includes("report")) {
      return "2";
    }

    return "1";
  })();

  const currentActiveTabTitle = (() => {
    if (pathName.includes("add")) {
      return "Add Record Page";
    } else if (pathName.includes("report")) {
      return "Reports";
    }
  })();

  const currentActiveTabSub = (() => {
    if (pathName.includes("add")) {
      return "Add expense or income record";
    } else if (pathName.includes("report")) {
      return "See your monthly expenses";
    }
  })();

  return (
    <Layout hasSider={true} className="h-screen ">
       <Sider className="h-full  p-2 z-50" breakpoint="md" onBreakpoint={(broken)=>SetHideText(broken)}>
       <div className="flex flex-row gap-2 bg-gray-600 p-2 rounded-md text-white text-md my-8 font-bold align-middle items-center justify-center">
         <PoundCircleOutlined />
         {!hideText&&<span> Expense Tracker</span>}
       </div>

       <Menu
         theme="dark"
         mode="inline"
         items={items(router)}
         selectedKeys={[currentActiveTab]}
       />
     </Sider>
       <Layout className="h-full">
        <Header className="bg-white">
          <div className="h-full flex flex-col gap-2 justify-center">
          <span className=" w-fit h-fit leading-3	text-xl font-bold">{currentActiveTabTitle}</span>
          <span className=" w-fit h-fit leading-3	text-md text-gray-600">{currentActiveTabSub}</span>
          </div>
          
        </Header>
   <Content className="w-full  max-h-full overflow-scroll">{children}</Content>
     
   </Layout>
    </Layout>
   
  );
};

export default MainLayout;
