import {
  Home,
  Calendar,
  Settings,
  LucideMenu,
  BookOpen,
  HelpCircle,
  Hotel,
  UtensilsCrossed,
  X,
  Cake,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  {
    title: "HOME",
    url: "#",
    icon: Home,
  },
  {
    title: "EVENTS",
    url: "#",
    icon: Calendar,
  },
  {
    title: "SERVICE",
    url: "#",
    icon: Settings,
  },
  {
    title: "BOOKINGS",
    url: "#",
    icon: BookOpen,
  },
  {
    title: "SUPPORT",
    url: "#",
    icon: HelpCircle,
  },
];

const businessSections = [
  {
    title: "HOTEL",
    url: "#",
    icon: Hotel,
  },
  {
    title: "FOOD COURT",
    url: "#",
    icon: UtensilsCrossed,
  },
  {
    title: "BAKERY",
    url: "#",
    icon: Cake,
  },
];

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="offcanvas" className="relative lg:hidden">
      <SidebarHeader className="border-b border-border p-4">
        <h2 className="text-xl font-bold text-green-950">THE BIVA</h2>
        <button
          onClick={toggleSidebar}
          aria-label="Close sidebar"
          className="absolute top-3 right-3 p-1 rounded hover:bg-gray-100 z-50"
        >
          <X size={20} className="text-green-950" />
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Business Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessSections.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function ResponsiveNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="lg:hidden">
        <AppSidebar />
      </div>

      <div className="min-h-screen w-full">
        <header className="bg-black backdrop-blur-3xl sticky top-0 left-0 w-full z-50">
          <div className="lg:hidden">
            <div className="flex items-center justify-between h-12 px-2 sm:px-4">
              <div className="flex items-center">
                <CustomInlineTrigger />
              </div>

              <div className="flex-1 flex justify-center">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  THE BIVA
                </h2>
              </div>

              <div className="w-10 sm:w-12" />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="container mx-auto px-4">
              <div className="h-16 flex items-center justify-between border-b ">
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-white tracking-wider">
                    THE BIVA
                  </h1>
                </div>

                <nav>
                  <ul className="flex items-center space-x-8">
                    {mainNavItems.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.url}
                          className="text-white font-medium tracking-wide"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}

function CustomInlineTrigger({ className = "" }) {
  const { toggleSidebar, open } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      aria-label={open ? "Close menu" : "Open menu"}
      className={`text-white p-2 rounded-md transition-colors ${className}`}
    >
      <LucideMenu size={20} />
    </button>
  );
}
