import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, Briefcase, Receipt, Settings } from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/clients", label: "Clients", icon: Users },
    { href: "/cases", label: "Cases", icon: Briefcase },
    { href: "/payments", label: "Payments", icon: Receipt },
  ];

  return (
    <div className="w-16 md:w-64 flex flex-col h-full bg-sidebar border-r border-sidebar-border text-sidebar-foreground transition-all duration-300">
      <div className="h-14 flex items-center justify-center md:justify-start md:px-6 border-b border-sidebar-border/50">
        <div className="font-bold text-lg hidden md:block text-sidebar-primary-foreground tracking-tight">Brandex DMS</div>
        <div className="font-bold text-xl md:hidden text-sidebar-primary-foreground">B</div>
      </div>
      <div className="flex-1 py-4 flex flex-col gap-1 px-2 md:px-3">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="hidden md:block">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="p-4 border-t border-sidebar-border/50">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2 w-full rounded-md transition-colors font-medium ${
            location === "/settings"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          }`}
        >
          <Settings className="h-5 w-5 shrink-0" />
          <span className="hidden md:block">Settings</span>
        </Link>
      </div>
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
