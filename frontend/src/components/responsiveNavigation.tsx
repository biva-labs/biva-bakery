import { Home, Calendar, Settings, BookOpen, HelpCircle, Hotel, UtensilsCrossed, Cake } from "lucide-react"
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
  SidebarTrigger,
} from "@/components/ui/sidebar"


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
]


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
]



export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="lg:hidden">
      <SidebarHeader className="border-b border-border p-4">
        <h2 className="text-xl font-bold text-green-950">THE BIVA</h2>
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
  )
}


export default function ResponsiveNavigation({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>

      <div className="lg:hidden">
        <AppSidebar />
      </div>
      
      <div className="min-h-screen w-full">

        <header className="bg-black backdrop-blur-md sticky top-0 left-0 w-full z-50">

          <div className="lg:hidden">
            <div className="flex items-center justify-between h-12 px-2 sm:px-4">
  
              <div className="flex items-center">
                <SidebarTrigger className="text-white p-2 rounded-md transition-colors" />
              </div>
              
   
              <div className="flex-1 flex justify-center">
                <h2 className="text-lg sm:text-xl font-bold text-white">THE BIVA</h2>
              </div>
              
  
              <div className="w-10 sm:w-12" />
            </div>
          </div>

          
          <div className="hidden lg:block">
            <div className="container mx-auto px-4">

              <div className="h-16 flex items-center justify-between border-b ">

                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-white tracking-wider">THE BIVA</h1>
                </div>
                
    
                
                <nav>
                  <ul className="flex items-center space-x-8">
                    {mainNavItems.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.url}
                          className="text-white  font-medium tracking-wide"
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


        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
} 