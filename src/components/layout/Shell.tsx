"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Package, 
  Building2, 
  Users, 
  ArrowLeftRight, 
  ClipboardCheck, 
  FileText, 
  QrCode, 
  Settings, 
  Bell,
  Search,
  UserCircle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Package, label: "Patrimônios", href: "/assets" },
  { icon: Building2, label: "Empresas & Filiais", href: "/companies" },
  { icon: ArrowLeftRight, label: "Movimentações", href: "/movements" },
  { icon: ClipboardCheck, label: "Auditoria", href: "/audit" },
  { icon: FileText, label: "Documentos", href: "/documents" },
  { icon: QrCode, label: "Etiquetas & QR", href: "/labels" },
  { icon: Users, label: "Usuários", href: "/users" },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background dark">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tighter text-primary flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              R
            </div>
            INVENTÁRIO DO REI
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
            <Settings className="w-4 h-4" />
            Configurações
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Busca global de patrimônio..." 
                className="w-full bg-accent/50 border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-border"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right">
                <p className="text-xs font-semibold">Admin</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent border border-border flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <section className="flex-1 overflow-y-auto p-8 bg-background">
          {children}
        </section>
      </main>
    </div>
  );
}
