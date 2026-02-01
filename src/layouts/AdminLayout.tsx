import UserMenu from "@/components/common/UserMenu";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen relative">
      <UserMenu />
      <main className="container mx-auto py-10 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
