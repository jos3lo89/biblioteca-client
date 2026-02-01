import { useNavigate, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "../ui/button";

/**
 * UserMenu - Floating navigation trigger for the scholarly profile.
 */
const UserMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  if (
    !user ||
    location.pathname.includes("/reading") ||
    location.pathname === "/profile"
  )
    return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-1000">
      <Button
        onClick={() => navigate("/profile")}
        className="h-12 w-12 md:h-14 md:w-auto md:px-6 rounded-2xl bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.4)] text-[#b59a5d] hover:bg-[#b59a5d] hover:text-[#0b1120] transition-all hover:translate-y-[-2px] group"
      >
        <User className="w-5 h-5 shrink-0" />
        <span className="hidden md:inline ml-3 font-bold text-sm tracking-tight">
          {user.name}
        </span>
        <div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-[#b59a5d]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </Button>
    </div>
  );
};

export default UserMenu;
