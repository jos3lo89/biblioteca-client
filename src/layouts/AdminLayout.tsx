import {
  Library,
  LayoutDashboard,
  UserPlus,
  BookMarked,
  Tag,
  CalendarRange,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  BookOpen,
  ChevronDown,
  ChevronRight,
  List,
  PlusCircle,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  label: string;
  path?: string;
  icon: any;
  children?: { label: string; path: string; icon: any }[];
}

/**
 * AdminLayout - Immersive administration environment with responsive sidebars and sub-menus.
 */
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const location = useLocation();
  const { logout } = useAuth();

  const navItems: NavItem[] = [
    { label: "Panel de Control", path: "/dashboard", icon: LayoutDashboard },
    { label: "Acervo Digital", path: "/books", icon: Library },
    { label: "Registrar Usuario", path: "/users/register", icon: UserPlus },
    {
      label: "Categorías",
      icon: Tag,
      children: [
        { label: "Listado", path: "/admin/categories", icon: List },
        {
          label: "Nueva Categoría",
          path: "/admin/categories/create",
          icon: PlusCircle,
        },
      ],
    },
    {
      label: "Gestión de Libros",
      icon: BookMarked,
      children: [
        { label: "Catálogo", path: "/admin/books", icon: List },
        {
          label: "Registrar Libro",
          path: "/admin/books/create",
          icon: PlusCircle,
        },
      ],
    },
    {
      label: "Períodos Académicos",
      path: "/admin/periods",
      icon: CalendarRange,
    },
    { label: "Matrículas", path: "/admin/enrollments", icon: ShieldCheck },
  ];

  // Auto-expand menu if child is active
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children?.some((child) => location.pathname === child.path)) {
        if (!expandedItems.includes(item.label)) {
          setExpandedItems((prev) => [...prev, item.label]);
        }
      }
    });
  }, [location.pathname]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  };

  const handleLogout = () => {
    logout.mutate();
    setIsMobileMenuOpen(false);
  };

  const NavLinkComponent = ({
    item,
    isMobile = false,
  }: {
    item: NavItem;
    isMobile?: boolean;
  }) => {
    const hasChildren = !!item.children;
    const isExpanded = expandedItems.includes(item.label);
    const isActive = item.path
      ? location.pathname === item.path
      : item.children?.some((c) => location.pathname === c.path);

    if (hasChildren) {
      return (
        <div className="space-y-1">
          <button
            onClick={() => toggleExpand(item.label)}
            className={cn(
              "group relative flex items-center h-12 w-full rounded-xl transition-all duration-300",
              isActive && !isExpanded
                ? "bg-white/5 text-white"
                : "text-slate-400 hover:text-white hover:bg-white/5",
            )}
          >
            <div className="w-12 h-12 shrink-0 flex items-center justify-center">
              <item.icon
                className={cn("w-5 h-5", isActive ? "text-[#b59a5d]" : "")}
              />
            </div>
            {(isMobile || isSidebarOpen) && (
              <>
                <span className="font-bold text-sm tracking-tight flex-1 text-left">
                  {item.label}
                </span>
                <div className="pr-4">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </>
            )}
          </button>

          {(isMobile || isSidebarOpen) && isExpanded && (
            <div className="pl-6 space-y-1 animate-in slide-in-from-top-2 duration-300">
              {item.children?.map((child) => {
                const isChildActive = location.pathname === child.path;
                return (
                  <Link
                    key={child.path}
                    to={child.path}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center h-10 px-4 rounded-lg text-sm font-medium transition-all group",
                      isChildActive
                        ? "text-[#b59a5d] bg-[#b59a5d]/10"
                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5",
                    )}
                  >
                    <child.icon className="w-3.5 h-3.5 mr-3" />
                    {child.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        to={item.path!}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
        className={cn(
          "group relative flex items-center h-12 rounded-xl transition-all duration-300 overflow-hidden",
          isActive
            ? "bg-[#b59a5d] text-[#0b1120] shadow-[0_8px_20px_rgba(181,154,93,0.2)]"
            : "text-slate-400 hover:text-white hover:bg-white/5",
        )}
      >
        <div className="w-12 h-12 shrink-0 flex items-center justify-center">
          <item.icon
            className={cn(
              "w-5 h-5",
              isActive
                ? "scale-110"
                : "group-hover:scale-110 transition-transform",
            )}
          />
        </div>
        {(isMobile || isSidebarOpen) && (
          <span className="font-bold text-sm tracking-tight transition-all duration-300 whitespace-nowrap">
            {item.label}
          </span>
        )}
        {isActive && !isMobile && isSidebarOpen && (
          <div className="absolute right-0 w-1.5 h-6 bg-[#0b1120]/20 rounded-l-full" />
        )}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-[#0b1120] text-slate-100 overflow-hidden font-sans">
      {/* 1. Mobile Shell */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0d1627] border-b border-white/5 px-6 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#b59a5d] text-[#0b1120]">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white uppercase italic">
            Acervo Admin
          </span>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] bg-[#0d1627] border-r border-white/10 p-0 text-slate-100 flex flex-col"
          >
            <SheetHeader className="px-6 py-6 border-b border-white/5 text-left">
              <SheetTitle className="text-lg font-bold tracking-tight text-white leading-none">
                Biblioteca <span className="text-[#b59a5d]">Virtual</span>
              </SheetTitle>
              <SheetDescription className="text-slate-500 text-xs text-left">
                Gestión Administrativa
              </SheetDescription>
            </SheetHeader>

            <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <NavLinkComponent key={item.label} item={item} isMobile />
              ))}
            </nav>

            <div className="p-4 border-t border-white/5">
              <ConfirmDialog
                title="¿Cerrar Panel Administrativo?"
                description="Se cerrará su sesión de acceso privilegiado."
                confirmText="Finalizar Sesión"
                variant="danger"
                onConfirm={handleLogout}
              >
                <button className="flex items-center w-full h-12 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors px-4 group">
                  <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="font-bold text-sm tracking-tight">
                    Cerrar Sesión
                  </span>
                </button>
              </ConfirmDialog>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* 2. Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex relative h-full bg-[#0d1627] border-r border-white/5 transition-all duration-500 ease-in-out z-50 flex-col shadow-2xl",
          isSidebarOpen ? "w-72" : "w-20",
        )}
      >
        <div className="h-20 flex items-center px-6 gap-3 border-b border-white/5 overflow-hidden whitespace-nowrap">
          <div className="p-2 rounded-xl bg-[#b59a5d] text-[#0b1120] shadow-[0_0_20px_rgba(181,154,93,0.3)]">
            <BookOpen className="w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#b59a5d]">
                Admin
              </h2>
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                Gestión Acervo
              </h1>
            </div>
          )}
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto scrollbar-none">
          {navItems.map((item) => (
            <NavLinkComponent key={item.label} item={item} />
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-4">
          <ConfirmDialog
            title="¿Cerrar Panel Administrativo?"
            description="Se cerrará su sesión de acceso privilegiado."
            confirmText="Finalizar Sesión"
            variant="danger"
            onConfirm={handleLogout}
          >
            <button
              className={cn(
                "flex items-center w-full h-12 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors overflow-hidden group",
                !isSidebarOpen && "justify-center",
              )}
            >
              <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              {isSidebarOpen && (
                <span className="font-bold text-sm tracking-tight transition-all duration-300">
                  Cerrar Sesión
                </span>
              )}
            </button>
          </ConfirmDialog>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center w-full h-10 rounded-lg bg-white/5 text-slate-500 hover:text-white transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden mt-16 lg:mt-0">
        <div className="h-1 bg-linear-to-r from-[#b59a5d] via-[#e2d1a4] to-transparent opacity-50" />
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full pb-20 text-slate-100">
            <Outlet />
          </div>
        </div>
        {/* Background Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none" />
      </main>
    </div>
  );
};

export default AdminLayout;
