import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/solid";
import { RectangleGroupIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export default function NavBar2() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="flex h-screen w-full bg-gradient-to-b ">
      <aside
        className={`group flex flex-col bg-white gap-4 border-r bg-background transition-all duration-300 ${
          isCollapsed
            ? "w-24 flex-col items-center px-2"
            : "w-64 flex-row items-center px-4 sm:py-5"
        }`}
        data-collapsed={isCollapsed}
      >
        <div
          className={`flex items-center justify-between py-4 ${isCollapsed ? "gap-1" : "gap-10"}`}
        >
          <Link href="" className="flex items-center gap-2" prefetch={false}>
            <span
              className={`text-2xl font-bold ${isCollapsed ? "hidden" : "block"}`}
            >
              SkillSphere
            </span>
          </Link>

          <Button
            size="icon"
            className="rounded-md bg-slate-700 p-1 transition-colors hover:scale-110"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronRightIcon
              className={`h-5 w-5 text-white transition-transform ${isCollapsed ? "" : "rotate-180"}`}
            />
          </Button>
        </div>

        <nav className="flex w-full flex-col items-center justify-center gap-2">
          {/* Course Listing page */}
          <Link
            to=""
            className={`hover:bg-muted flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isCollapsed
                ? "items-center"
                : "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground items-start"
            }`}
            prefetch={false}
          >
            <RectangleGroupIcon
              className={clsx("h-5 w-5 text-slate-900", {
                ["h-6 w-6"]: !isCollapsed,
                ["h-2,w-2"]: isCollapsed,
              })}
            />
            <span className={isCollapsed ? "hidden" : "block"}>Courses</span>
          </Link>

          {/* Student DashBoard */}
          <Link
            to="/dashboard"
            className={`hover:bg-muted flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isCollapsed
                ? "items-center"
                : "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground items-start"
            }`}
            prefetch={false}
          >
            <UserIcon
              className={clsx("h-5 w-5 text-slate-900", {
                ["h-6 w-6"]: !isCollapsed,
                ["h-2,w-2"]: isCollapsed,
              })}
            />
            <span className={isCollapsed ? "hidden" : "block"}>Dashboard</span>
          </Link>
        </nav>
      </aside>

      <main className="min-h-[calc(100vh-10%)] flex-1 overflow-hidden p-6">
        {location.pathname !== "/" ? (
          <button
            onClick={() => navigate(-1)}
            className="absolute rounded-full bg-white px-4 py-4"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        ) : (
          <></>
        )}
        <Outlet />
      </main>
    </div>
  );
}
