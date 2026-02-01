import UserMenu from "@/components/common/UserMenu";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div className="relative">
      <UserMenu />
      {/* <main className="container mx-auto py-10 px-4"> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
