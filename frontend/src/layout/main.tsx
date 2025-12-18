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
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import wa_link from "@/utils/wa-link";
import { PHONE } from "../../data/phone-data";
import { QUICK_LINKS } from "../../data/footer-data";

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
      title: "BOOK ROOMS",
      url: "/rooms",
      icon: null,
    },
    {
      title: "BOOK TABLE",
      url: "/table-reservation",
      icon: null,
    },
    {
      title: "ABOUT US",
      url: "/about",
      icon: null,
    },
    {
      title: "CONTACT US",
      url: "/contact",
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
      <SidebarGroupContent className="flex flex-col gap-2 pt-6">
        <SidebarMenu>
          {items.map((item, index) => (
            <React.Fragment key={item.title}>
              <SidebarMenuItem className="flex justify-center px-4">
                {item.isExternal ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="justify-start h-12 text-lg font-medium tracking-wide transition-all hover:bg-neutral-100 hover:text-neutral-900 rounded-md px-4"
                    >
                      <span className="outfit">{item.title}</span>
                    </SidebarMenuButton>
                  </a>
                ) : (
                  <Link to={item.url} className="w-full">
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="justify-start h-12 text-lg font-medium tracking-wide transition-all hover:bg-neutral-100 hover:text-neutral-900 rounded-md px-4"
                    >
                      <span className="outfit">{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                )}
              </SidebarMenuItem>
              {index < items.length - 1 && (
                <div className="px-6 opacity-30">
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
    <Sidebar collapsible="offcanvas" {...props} className="bg-white">
      <SidebarHeader className="border-b bg-white">
        <div className="flex items-center justify-between px-4 py-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent"
              >
                {/* The 'a' tag needs no additional class here, as the positioning is controlled by the parent container or the image itself. */}
                <a href="#">
                  <img

                    src="/biva-logo.webp"

                    alt="Biva Logo"
                    // MODIFICATION:
                    // 1. Removed 'scale-20' as it makes the image massive.
                    // 2. Used a standard width class like 'w-8' or 'w-10' for a typical logo size in a header/sidebar.
                    // 3. Ensure 'h-auto' to maintain aspect ratio.
                    className="w-16 h-auto scale-110"
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
            className="ml-auto"
          >
            <X size={24} className="text-neutral-800" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-[#002a3a] p-6 text-[#f4f4f5] flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl font-bold tracking-widest font-mono">BIVA</h4>
          <div className="h-1 w-12 bg-orange-400 rounded-full" />
          <p className="text-xs text-gray-300 leading-relaxed max-w-[200px]">
            Freshly baked happiness every day! Visit us for cakes, pastries, and more.
          </p>
        </div>
        <div className="space-y-3 text-sm text-gray-300">
          {QUICK_LINKS["address"].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <item.icon className="h-4 w-4 shrink-0 text-orange-400" />
              <span className="text-xs">{item.text}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#f4f4f5]/10 pt-4 text-center">
          <p className="text-[10px] text-gray-400">
            © {new Date().getFullYear()} Biva Bakery. All rights reserved.
          </p>
        </div>
      </SidebarFooter>
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
