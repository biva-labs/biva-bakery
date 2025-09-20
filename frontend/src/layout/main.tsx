import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { X, House, Calendar, Notebook, Settings, HandFist } from "lucide-react";

import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const data = {
  navMain: [
    {
      title: "HOME",
      url: "/",
      icon: <House />,
    },
    {
      title: "EVENTS",
      url: "/food",
      icon: <Calendar />,
    },
    {
      title: "ABOUT US", // New "ABOUT US" section
      url: "/about",
      icon: <Notebook />,
    },
    {
      title: "SERVICE",
      url: "#",
      icon: <Settings />,
    },
    {
      title: "BOOKINGS",
      url: "#",
      icon: <Notebook />,
    },
    {
      title: "SUPPORT",
      url: "#",
      icon: <HandFist />,
    },
  ],
};

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: React.ReactNode;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link to={item.url}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">The Biva</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Button
          onClick={toggleSidebar}
          size="icon"
          aria-label="Close sidebar"
          variant="ghost"
          className="absolute right-3"
        >
          <X size={20} />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}

export default function Main() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      <AppSidebar />
      <SidebarInset className="mt-0 rounded-none p-0 bg-transparent">
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
