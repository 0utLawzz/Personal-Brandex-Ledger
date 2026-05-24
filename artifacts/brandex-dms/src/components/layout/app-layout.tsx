import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, Briefcase, Receipt, Settings, FileText } from "lucide-react";

const NAV_OVERVIEW = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/cases", label: "Cases", icon: Briefcase },
];
const NAV_BILLING = [
  { href: "/payments", label: "Payments", icon: Receipt },
];
const ALL_NAV = [...NAV_OVERVIEW, ...NAV_BILLING];

function isActive(href: string, location: string) {
  return href === "/" ? location === "/" : location.startsWith(href);
}

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="hidden md:flex w-16 flex-shrink-0 bg-[#0f172a] flex-col h-full border-r border-slate-800/60">
      {/* Logo */}
      <div className="h-14 flex items-center justify-center border-b border-slate-800/60 bg-[#0a1120] shrink-0">
        <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shadow-sm">
          <FileText size={13} className="text-white" />
        </div>
      </div>

      {/* Overview nav */}
      <div className="flex-1 flex flex-col items-center py-4 gap-1 px-3">
        <div className="w-full flex flex-col items-center gap-1 mb-1">
          {NAV_OVERVIEW.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                isActive(item.href, location)
                  ? "bg-blue-600/15 text-blue-400"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
              }`}
            >
              <item.icon size={18} />
            </Link>
          ))}
        </div>

        <div className="w-6 h-px bg-slate-800/80 my-2" />

        <div className="w-full flex flex-col items-center gap-1">
          {NAV_BILLING.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                isActive(item.href, location)
                  ? "bg-blue-600/15 text-blue-400"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
              }`}
            >
              <item.icon size={18} />
            </Link>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="flex items-center justify-center pb-4 border-t border-slate-800/60 pt-4">
        <Link
          href="/settings"
          title="Settings"
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            location === "/settings"
              ? "bg-blue-600/15 text-blue-400"
              : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
          }`}
        >
          <Settings size={18} />
        </Link>
      </div>
    </aside>
  );
}

export function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a] border-t border-slate-700/60 flex items-stretch h-14 safe-area-bottom">
      {ALL_NAV.map((item) => {
        const active = isActive(item.href, location);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
              active ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <item.icon size={20} strokeWidth={active ? 2.2 : 1.8} />
            <span className={`text-[10px] font-medium tracking-wide ${active ? "text-blue-400" : "text-slate-500"}`}>
              {item.label}
            </span>
            {active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full" />
            )}
          </Link>
        );
      })}
      <Link
        href="/settings"
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
          location === "/settings" ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
        }`}
      >
        <Settings size={20} strokeWidth={location === "/settings" ? 2.2 : 1.8} />
        <span className={`text-[10px] font-medium tracking-wide ${location === "/settings" ? "text-blue-400" : "text-slate-500"}`}>
          Settings
        </span>
        {location === "/settings" && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full" />
        )}
      </Link>
    </nav>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden pb-14 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
