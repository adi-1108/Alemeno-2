import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/solid";
import { RectangleGroupIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "@/supabaseClient";
import { auth } from "@/firebase";
import { login, logout } from "@/store/userSlice";

export default function NavBar2() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth.signOut().then(() => console.log("User Signed out"));
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    if (user.user === null) navigate("/signin");
    const getStudentid = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("studentid")
        .eq("email", user.user.email)
        .single();

      return data.studentid;
    };

    const setStudentid = async () => {
      const studentid = await getStudentid();

      const updatedUser = { ...user.user, studentid: studentid };
      dispatch(login(updatedUser));
    };

    setStudentid();
    // const updatedUser = { ...user.user, studentid: studentid };
    // dispatch(login(updatedUser));
  }, []);

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
          className={`flex flex-col items-center justify-between py-4 ${
            isCollapsed ? "gap-1" : "gap-10"
          }`}
        >
          <Link href="" className="flex items-center gap-2" prefetch={false}>
            <span
              className={`text-2xl font-bold ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              SkillSphere
            </span>
          </Link>
          <div>
            <h1
              className={clsx(
                "font-bold text-lg px-4 py-2 rounded-lg bg-blue-200 shadow-xl",
                {
                  ["hidden"]: isCollapsed,
                }
              )}
            >
              Hello {user?.user?.displayName.split(" ").at(0)}
            </h1>
          </div>
          <Button
            size="icon"
            className="rounded-md bg-slate-700 p-1 transition-colors hover:scale-110"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronRightIcon
              className={`h-5 w-5 text-white transition-transform ${
                isCollapsed ? "" : "rotate-180"
              }`}
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

        <button
          onClick={handleLogout}
          className={clsx(
            "px-4 py-2 bg-red-500 hover:scale-110 transition-all text-white font-bold shadow-xl rounded-xl",
            {
              ["hidden"]: isCollapsed,
            }
          )}
        >
          Logout
        </button>
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
