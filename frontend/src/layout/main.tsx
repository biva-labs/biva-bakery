import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import wa_link from "@/utils/wa-link";
import { PHONE } from "../../data/phone-data";

const data = {
  navMain: [
    {
      title: "HOME",
      url: "/",
      icon: null,
    },
    {
      title: "EVENTS",
      url: "/food#events",
      icon: null,
    },
    {
      title: "SERVICE",
      url: "/",
      icon: null,
    },
    {
      title: "SUPPORT",
      url: wa_link("Hey, I ran into an issue: ", PHONE["technical"]),
      icon: null,
      isExternal: true,
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
    isExternal?: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item, index) => (
            <React.Fragment key={item.title}>
              <SidebarMenuItem className="flex justify-center">
                {item.isExternal ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="justify-start"
                    >
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </a>
                ) : (
                  <Link to={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="justify-start"
                    >
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                )}
              </SidebarMenuItem>
              {index < items.length - 1 && (
                <div className="px-4">
                  <Separator />
                </div>
              )}
            </React.Fragment>
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
      <SidebarHeader >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {/* The 'a' tag needs no additional class here, as the positioning is controlled by the parent container or the image itself. */}
              <a href="#">
                <img

                  src="/biva-main-logo.webp"

                  alt="Biva Logo"
                  // MODIFICATION:
                  // 1. Removed 'scale-20' as it makes the image massive.
                  // 2. Used a standard width class like 'w-8' or 'w-10' for a typical logo size in a header/sidebar.
                  // 3. Ensure 'h-auto' to maintain aspect ratio.
                  className="w-16 h-auto"
                />
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
