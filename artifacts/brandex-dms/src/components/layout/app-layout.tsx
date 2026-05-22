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

function NavIcon({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      title={label}
      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
        active
          ? "bg-blue-600/15 text-blue-400"
          : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
      }`}
    >
      <Icon size={18} />
    </Link>
  );
}

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-16 flex-shrink-0 bg-[#0f172a] flex flex-col h-full border-r border-slate-800/60">
      {/* Logo */}
      <div className="h-14 flex items-center justify-center border-b border-slate-800/60 bg-[#0a1120] shrink-0">
        <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shadow-sm">
          <FileText size={13} className="text-white" />
        </div>
      </div>

      {/* Overview group */}
      <div className="flex-1 flex flex-col items-center py-4 gap-1 px-3">
        <div className="w-full flex flex-col items-center gap-1 mb-1">
          {NAV_OVERVIEW.map((item) => {
            const active =
              location === item.href ||
              (item.href !== "/" && location.startsWith(item.href));
            return (
              <NavIcon
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={active}
              />
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-6 h-px bg-slate-800/80 my-2" />

        {/* Billing group */}
        <div className="w-full flex flex-col items-center gap-1">
          {NAV_BILLING.map((item) => {
            const active = location.startsWith(item.href);
            return (
              <NavIcon
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={active}
              />
            );
          })}
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
